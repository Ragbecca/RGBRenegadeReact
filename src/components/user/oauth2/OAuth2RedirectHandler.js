import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { parseJwt } from "../../../misc/Helpers";
import AuthContext from "../../../context/AuthContext";
import { useContext, useState } from "react";
import { createTokenOAuth2 } from "../../../api/AuthApi";
import { toast } from "react-hot-toast";

const OAuth2RedirectHandler = () => {
  const authContext = useContext(AuthContext);
  const location = useLocation();
  const nav = useNavigate();
  const [isLoading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  function getUrlParameter(name) {
    name = name.replace(/[[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)");

    var results = regex.exec(location.search);
    return results === null
      ? ""
      : decodeURIComponent(results[1].replace(/\+/g, " "));
  }

  const token = getUrlParameter("token");
  const error = getUrlParameter("error");

  useEffect(() => {
    async function tokenCreator() {
      const data = parseJwt(token);
      const username = data.sub;
      const oAuth2User = { token, username };
      await createTokenOAuth2(oAuth2User)
        .then((response) => {
          const { token, refreshToken, imgUrl, name } = response.data;
          const data = parseJwt(token);
          const roles = "ROLE_USER";
          const user = { data, token, refreshToken, imgUrl, roles, name };
          authContext.userLogin(user);
          setHasError(false);
        })
        .catch((error) => {
          setHasError(true);
          toast(error.response.data.message);
        });
      setLoading(false);
    }
    if (token) {
      tokenCreator();
    } else {
      setHasError(false);
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    if (!isLoading) {
      if (hasError) {
        return nav("/login");
      } else {
        return nav("/profile");
      }
    }
  }, [isLoading]);
};

export default OAuth2RedirectHandler;
