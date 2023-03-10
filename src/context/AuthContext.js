import React, { Component, useContext } from "react";
import { toast } from "react-hot-toast";
import { renewToken, logout } from "../api/AuthApi";
import { parseJwt } from "../misc/Helpers";

const AuthContext = React.createContext();

class AuthProvider extends Component {
  state = {
    user: null,
  };

  componentDidMount() {
    const user = localStorage.getItem("user");
    this.setState({ user });
  }

  userIsAdmin = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user.roles[0] === "ROLE_ADMIN") {
      return true;
    } else {
      return false;
    }
  };

  getUser = () => {
    return JSON.parse(localStorage.getItem("user"));
  };

  changeAvatarURL = (avatarURL) => {
    const user = JSON.parse(localStorage.getItem("user"));
    user.imgUrl = avatarURL;
    this.setState({ user });
    localStorage.setItem("user", JSON.stringify(user));
  };

  userIsAuthenticated = (fromEffect) => {
    let user = localStorage.getItem("user");
    if (!user) {
      return false;
    }
    user = JSON.parse(user);

    if (Date.now() > user.data.exp * 1000) {
      if (fromEffect) {
        renewToken(user.refreshToken)
          .then((response) => {
            if (response.status === 500) {
              toast("Renew Token has been expired. Login again!");
              this.userLogout();
              return false;
            }
            const { token, refreshToken } = response.data;
            const data = parseJwt(token);
            const user = { data, token, refreshToken };
            this.userLogin(user);
          })
          .catch((error) => {
            toast(error);
            this.userLogout();
            return false;
          });
      }
    }
    return true;
  };

  userLogin = (user) => {
    localStorage.setItem("user", JSON.stringify(user));
    this.setState({ user });
  };

  userLogout = () => {
    localStorage.removeItem("user");
    this.setState({ user: null });
  };

  render() {
    const { children } = this.props;
    const { user } = this.state;
    const {
      getUser,
      userIsAuthenticated,
      userLogin,
      userLogout,
      changeAvatarURL,
      userIsAdmin,
    } = this;

    return (
      <AuthContext.Provider
        value={{
          user,
          getUser,
          userIsAuthenticated,
          userLogin,
          userLogout,
          changeAvatarURL,
          userIsAdmin,
        }}
      >
        {children}
      </AuthContext.Provider>
    );
  }
}

export default AuthContext;

export function useAuthContext() {
  return useContext(AuthContext);
}

export { AuthProvider };
