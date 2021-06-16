import { Config } from '../../Config';
import { Cookie } from '../Utils/Cookie';
import JwtDecode  from 'jwt-decode';

/**
 * This class handles the OAUTH 2 token received from the API.
 */
export class Token
{
    /**
     * Access token name.
     */
    protected static accessTokenName: string = 'access_token';

    /**
     * Refresh token name.
     */
    protected static refreshTokenName: string = 'refresh_token';

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
    public static remove(): void
    {
        Cookie.delete(Token.accessTokenName);
        Cookie.delete(Token.refreshTokenName);
    }

    /**
     * Save the JSON web token.
     *
     * @param accessToken
     * @param refreshToken
     */
    public static save(accessToken: string, refreshToken: string = ''): void
    {
        let accessTokenCookie = Token.accessTokenName + "=" + accessToken
            + "; Path=/; SameSite=None;";
        let refreshTokenCookie = Token.refreshTokenName + "=" + refreshToken
            + "; Path=/; SameSite=None;";

        // Use 'Secure' everyone except on local environments that are not using https.
        if(Config.env !== 'local' || (Config.env === 'local' && location.protocol === 'https:')) {
            accessTokenCookie += " Secure;";
            refreshTokenCookie += " Secure;";
        }

        document.cookie = accessTokenCookie;
        document.cookie = refreshTokenCookie;
    }
}
