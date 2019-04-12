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
    public static getAccessToken(): string
    {
        return document.cookie
            .replace(/(?:(?:^|.*;\s*)access_token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    }

    /**
     * Get the refresh token.
     */
    public static getRefreshToken(): string
    {
        return document.cookie
            .replace(/(?:(?:^|.*;\s*)refresh_token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    }

    /**
     * Decode the token.
     */
    public static decode(): any
    {
        return JwtDecode(Token.getAccessToken());
    }

    /**
     * Whether the token is expired or not.
     *
     * @returns {boolean}
     */
    public static isExpired(): boolean
    {
        return Token.decode().exp < Math.ceil(new Date().getTime() / 1000);
    }

    /**
     * Remove the cookie.
     */
    public remove(): void
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
    public save(accessToken: string, refreshToken: string = ''): void
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
