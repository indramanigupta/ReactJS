import { getDbConnection } from "../db";

const becrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

export const loginRoute = {
  path: "/api/login",
  method: "post",
  handler: async (req, res) => {
    const { email, password } = req.body;

    const db = getDbConnection("react-auth-db");
    const user = await db.collection("users").findOne({ email });

    if (!user) return res.sendStatus(401);
    const { _id: id, isVerified, passwordHash, info } = user;

    const isCorrect = await becrypt.compare(password, passwordHash);
    if (isCorrect) {
      jwt.sign(
        { id, isVerified, email, info },
        process.env.JWT_SECRET,
        { expiresIn: "2d" },
        (err, token) => {
          if (err) {
            res.status(500).json(err);
          }
          console.log(token);
          res.status(200).json(token);
        }
      );
    } else {
      res.status(401);
    }
  },
};
