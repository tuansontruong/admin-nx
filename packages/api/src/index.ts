import express, { Request, Response } from "express";
import { checkJWT, checkPermissions } from "./lib/authenticator";
import { login } from "./apps/login";

require('dotenv').config();
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

/* ******************* INTERNAL API ******************* */
app.get(
  "/",
  checkJWT,
  checkPermissions(["read:users", "write:users"], {
    customScopeKey: "permissions",
    customUserKey: "auth",
  }),
  (req: Request, res: Response) => {
    res.send("Hello, TypeScript Express!");
  }
);
app.use('/api/login', login);

/* ******************* START SERVER ******************* */
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running attt http://localhost:${port}`);
});
