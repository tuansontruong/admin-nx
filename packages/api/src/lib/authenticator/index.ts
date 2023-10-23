const { expressjwt: jwt } = require("express-jwt");
const jwksRsa = require("jwks-rsa");
const jwtAuthz = require("express-jwt-authz");
import "dotenv/config.js";

import { AuthenticationClient, ManagementClient } from "auth0";

const oAuth = new AuthenticationClient({
  domain: `${process.env.AUTH0_DOMAIN}`,
  clientId: `${process.env.AUTH0_CLIENTID}`,
  clientSecret: `${process.env.AUTH0_CLIENTSECRET}`,
}).oauth;

var management = new ManagementClient({
  domain: `${process.env.AUTH0_DOMAIN}`,
  clientId: `${process.env.AUTH0_CLIENTID}`,
  clientSecret: `${process.env.AUTH0_CLIENTSECRET}`,
});

// Create middleware for checking the JWT
const checkJWT = jwt({
  // Dynamically provide a signing key based on the kid in the header and the signing keys provided by the JWKS endpoint.
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`,
  }),
  // Validate the audience and the issuer.
  audience: process.env.AUTH0_AUDIENCE,
  issuer: `https://${process.env.AUTH0_DOMAIN}/`,
  algorithms: ["RS256"],
});

const checkPermissions = (permissions: string[]) =>
  jwtAuthz(permissions, {
    customScopeKey: "permissions",
    customUserKey: "auth",
  });

export { oAuth, management, checkJWT, checkPermissions };
