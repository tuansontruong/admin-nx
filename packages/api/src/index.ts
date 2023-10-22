import express, { Request, Response } from "express";
// set dependencies
const { expressjwt: jwt } = require("express-jwt");
const jwksRsa = require("jwks-rsa");
const bodyParser = require("body-parser");
require("dotenv").config();

import { AuthenticationClient } from "auth0";
const jwtAuthz = require("express-jwt-authz");

const auth0 = new AuthenticationClient({
  domain: `${process.env.AUTH0_DOMAIN}`,
  clientId: `${process.env.AUTH0_CLIENTID}`,
  clientSecret: `${process.env.AUTH0_CLIENTSECRET}`,
});

const app = express();
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
const port = process.env.PORT || 3000;

// Create middleware for checking the JWT
const checkJwt = jwt({
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

app.get(
  "/",
  checkJwt,
  jwtAuthz(["read:users", "write:users"], {
    customScopeKey: "permissions",
    customUserKey: "auth"
  }),
  (req: Request, res: Response) => {
    res.send("Hello, TypeScript Express!");
  }
);

app.post("/login", async (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
    const data = await auth0.oauth.passwordGrant({
      username,
      password,
      audience: process.env.AUTH0_AUDIENCE,
    });
    return res.status(200).json({
      succeed: data,
    });
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      succeed: error,
    });
  }
});

app.listen(port, () => {
  console.log(`Server running attt http://localhost:${port}`);
});
