import { MongoClient } from "mongodb";

let client;

export const initializeDbConnection = async () => {
  const uri = "mongodb://localhost:27017/";
  client = await MongoClient.connect(
    uri //, {
    //useNewUrlParser: true,
    //useUnifiedTopology: true,
    //}
  );
};

export const getDbConnection = (dbName) => {
  const db = client.db(dbName);
  return db;
};
