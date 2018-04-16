import Config from '../../Config';

let jwtDecode = require('jwt-decode');

/**
 * This class handles the OAUTH 2 token received from the API.
 */
export default class Token
{
    constructor()
    {
        this.accessTokenName = 'access_token';
        this.refreshTokenName = 'refresh_token';
    }

    /**
     * Get the access token.
     *
     * @returns {string}
     */
    getAccessToken()
    {
        return document.cookie.replace(/(?:(?:^|.*;\s*)access_token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    }

    /**
     * Get the refresh token.
     *
     * @returns {string}
     */
    getRefreshToken()
    {
        return document.cookie.replace(/(?:(?:^|.*;\s*)refresh_token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    }

    /**
     * Decode the token.
     *
     * @return {Object}
     */
    decode()
    {
        return jwtDecode(this.getAccessToken());
    }

    /**
     * Wheter the token is expired or not.
     *
     * @returns {boolean}
     */
    isExpired()
    {
        return this.decode().exp < Math.ceil(new Date().getTime() / 1000);
    }

    /**
     * Remove the cookie.
     */
    remove()
    {
        document.cookie = this.accessTokenName + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        document.cookie = this.refreshTokenName +'=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    }

    /**
     * Save the JSON web token.
     *
     * @param response
     */
    save(response)
    {
        let accessTokenCookie = this.accessTokenName + "=" + response.body.access_token + "; path=/;";
        let refreshTokenCookie = this.refreshTokenName + "=" + response.body.refresh_token + "; path=/;";

        // If production send only over HTTPS
        if(Config.env !== 'local')
        {
            accessTokenCookie += " Secure;";
            refreshTokenCookie += " Secure;";
        }

        document.cookie = accessTokenCookie;
        document.cookie = refreshTokenCookie;
    }
}
