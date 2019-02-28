import Config    from '../../Config';
import JwtDecode from 'jwt-decode';

/**
 * This class handles the OAUTH 2 token received from the API.
 */
export default class Token
{
    /**
     * Access token name.
     */
    protected accessTokenName: string = 'access_token';

    /**
     * Refresh token name.
     */
    protected refreshTokenName: string = 'refresh_token';

    /**
     * Get the access token.
     */
    getAccessToken(): string
    {
        return document.cookie
            .replace(/(?:(?:^|.*;\s*)access_token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    }

    /**
     * Get the refresh token.
     */
    getRefreshToken(): string
    {
        return document.cookie
            .replace(/(?:(?:^|.*;\s*)refresh_token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    }

    /**
     * Decode the token.
     */
    decode(): any
    {
        return JwtDecode(this.getAccessToken());
    }

    /**
     * Wheter the token is expired or not.
     *
     * @returns {boolean}
     */
    isExpired(): boolean
    {
        return this.decode().exp < Math.ceil(new Date().getTime() / 1000);
    }

    /**
     * Remove the cookie.
     */
    remove(): void
    {
        document.cookie = this.accessTokenName + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        document.cookie = this.refreshTokenName +'=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    }

    /**
     * Save the JSON web token.
     *
     * @param accessToken
     * @param refreshToken
     */
    save(accessToken: string, refreshToken: string = ''): void
    {
        let accessTokenCookie = this.accessTokenName + "=" + accessToken + "; path=/;";
        let refreshTokenCookie = this.refreshTokenName + "=" + refreshToken + "; path=/;";

        // If production send only over HTTPS
        if(Config.env !== 'local') {
            accessTokenCookie += " Secure;";
            refreshTokenCookie += " Secure;";
        }

        document.cookie = accessTokenCookie;
        document.cookie = refreshTokenCookie;
    }
}
