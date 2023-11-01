import express, { Request, Response } from "express";
import { Request as JWTRequest } from "express-jwt";
import { checkJWT, checkPermissions } from "./lib/authenticator";
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
  res.send(req.auth);
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
