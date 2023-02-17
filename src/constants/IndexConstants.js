export const API_BASE_URL_AUTH = 'http://localhost:8080';
export const API_BASE_URL_RESOURCE = 'http://localhost:8081';
export const ACCESS_TOKEN = 'accessToken';

export const OAUTH2_REDIRECT_URI = 'http://localhost:3000/oauth2/redirect'

export const GOOGLE_AUTH_URL = API_BASE_URL_AUTH + '/oauth2/authorize/google?redirect_uri=' + OAUTH2_REDIRECT_URI;
export const GITHUB_AUTH_URL = API_BASE_URL_AUTH + '/oauth2/authorize/github?redirect_uri=' + OAUTH2_REDIRECT_URI;