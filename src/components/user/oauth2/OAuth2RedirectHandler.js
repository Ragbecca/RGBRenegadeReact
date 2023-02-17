import { useLocation, useNavigate } from 'react-router-dom'
import { parseJwt } from '../../../misc/Helpers';
import AuthContext from '../../../context/AuthContext';
import { useContext } from 'react';
import { createTokenOAuth2 } from '../../../api/AuthApi';

const OAuth2RedirectHandler = () => {
    const authContext = useContext(AuthContext);
    const nav = useNavigate();
    const location = useLocation();

    function getUrlParameter(name) {
        name = name.replace(/[[]/, '\\[').replace(/[\]]/, '\\]');
        var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');

        var results = regex.exec(location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    };

    const token = getUrlParameter('token');
    const error = getUrlParameter('error');

    if (token) {
        const data = parseJwt(token);
        const username = data.sub;
        const oAuth2User = { token, username };
        createTokenOAuth2(oAuth2User).then(response => {
            const { token, refreshToken, imgUrl, name } = response.data;
            const data = parseJwt(token);
            const user = { data, token, refreshToken, imgUrl, name };
            authContext.userLogin(user);
        });
        return nav("/profile", { from: location })
    } else {
        return nav("/login", { from: location, error: error });
    }
}

export default OAuth2RedirectHandler;