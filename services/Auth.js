import auth0 from 'auth0-js';

class Auth {
  webAuth = new auth0.WebAuth({
    domain: 'decentclothes.auth0.com',
    clientID: 'Hgt3J1Pq7p9Ok3OPU1E09JQx2qVM2fsz',
    redirectUri: `${window.location.origin}`,
    responseType: 'token id_token',
    scope: 'openid profile',
  });

  constructor() {}
}

export default new Auth();
