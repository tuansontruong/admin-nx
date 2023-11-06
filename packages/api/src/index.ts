import express, { Response } from "express";
import { Request as JWTRequest } from "express-jwt";
import { checkJWT } from "./lib/authenticator";
import { login } from "./apps/login";
import { roles } from "./apps/roles";
import { errorHandler } from "./middlewares";

require("dotenv").config();
var cors = require("cors");
const bodyParser = require("body-parser");

/******************** INIT SERVER ********************/
const app = express();

// Parse incoming request bodies in a middleware before your handlers, available under the req.body property.
// 'urlencoded' parse request type `application/x-www-form-urlencoded`
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(cors());

/* ******************* INTERNAL API ******************* */
// app.get(
//   "/",
//   checkJWT,
//   checkPermissions(["read:users", "write:users"]),
//   (err: Error, req: JWTRequest, res: Response) => {
//     if(err.name === "UnauthorizedError") {
//       res.status(401).send("invalid token...");
//     }
//     res.send(req.auth);
//   }
// );

app.get("/validate-token", checkJWT, (req: JWTRequest, res: Response) => {
  let roles: string[] = [];

  // just return needed data
  if (req.auth) {
    roles = req.auth[`${process.env.AUTH0_AUDIENCE}/roles`].map(
      (role: string) => role.toLowerCase()
    );
    delete req.auth[`${process.env.AUTH0_AUDIENCE}/roles`];
    delete req.auth["permissions"];
  }

  const creds = { ...req.auth, roles: roles };
  res.send(creds);
});

app.use("/api/login", login);
app.use("/api/roles", roles);

/* ******************* ERROR HANDLER ******************* */
app.use(errorHandler);

/* ******************* START SERVER ******************* */
const port = process.env.PORT || 3002;
app.listen(port, () => {
  console.log(`Server running attt http://localhost:${port}`);
});
