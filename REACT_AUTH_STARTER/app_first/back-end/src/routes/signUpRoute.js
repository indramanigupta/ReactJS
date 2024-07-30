//import { bcrypt } from "bcryptjs";
//import { jwt } from "jsonwebtoken";
import { getDbConnection } from "../db";

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

export const signUpRoute = {
  path: "/api/signup",
  method: "post",
  handler: async (req, res) => {
    const { email, password } = req.body;

    const db = getDbConnection("react-auth-db");
    const user = await db.collection("users").findOne({ email });

    const saltRounds = 10;
    const secretKey = "JWT_SECRET";

    if (user) {
      res.sendStatus(409);
    }

    const salt = bcrypt.genSaltSync(saltRounds);
    const passwordHash = bcrypt.hashSync(password, salt);

    const startingInfo = {
      hairColor: " ",
      favoriteFood: " ",
      bio: " ",
    };

    const result = await db.collection("users").insertOne({
      email,
      passwordHash,
      info: startingInfo,
      isVerified: false,
    });

    const { insertedId } = result;

    jwt.sign(
      {
        id: insertedId,
        email,
        info: startingInfo,
        isVerified: false,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "2d",
      },
      (err, token) => {
        if (err) {
          return res.status(500).send(err);
        }
        res.status(200).json({ token });
      }
    );
  },
};
