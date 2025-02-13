import jwt from "jsonwebtoken";
import { ObjectId, mongoose } from "mongodb";
import { getDbConnection } from "../db";

export const updateUserInfoRoute = {
  path: "/api/users/:userId",
  method: "put",
  handler: async (req, res) => {
    const { authorization } = req.headers;
    const { userId } = req.params;

    const updates = (({ favoriteFood, hairColor, bio }) => ({
      favoriteFood,
      hairColor,
      bio,
    }))(req.body);

    if (!authorization) {
      return res.status(401).json({ message: "No authorization header sent" });
    }

    const token = authorization.split(" ")[1];

    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err)
        return res.status(401).json({ message: "Unable to verify token" });

      const { id } = decoded;

      if (id !== userId) {
        return res
          .status(403)
          .json({ message: "Not allowed to update that user's data" });
      }

      /* const db = getDbConnection("react-auth-db");
      const result = await db
        .collection("users")
        .findOneAndUpdate(
          { _id: new ObjectId(req.params.id) },
          { $set: { info: updates } },
          { returnOriginal: false }
        );
      console.log(`Result: ${result}`);
      const { email, isVerified, info } = result; */

      try {
        const db = getDbConnection("react-auth-db");
        console.log(id);
        const result = await db
          .collection("users")
          .findOneAndUpdate(
            { _id: new ObjectId(id) },
            { $set: { info: updates } },
            { returnOriginal: false }
          );
        console.log("Update result:", result);

        const { email, isVerified, info } = result;

        jwt.sign(
          {
            id,
            email,
            info,
            isVerified,
          },
          process.env.JWT_SECRET,
          {
            expiresIn: "2d",
          },
          (err, token) => {
            if (err) {
              return res.status(200).json(err);
            }
            res.status(200).json({ token });
          }
        );
      } catch (error) {
        console.error("Error updating user:", error);
      } finally {
        //await db.close();
      }
    });
  },
};
