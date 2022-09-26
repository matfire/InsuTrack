import { Account, Client, Databases, Functions } from "appwrite";

const client = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_URL)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT);

const account = new Account(client);
const database = new Databases(client);
const functions = new Functions(client);

const createSamplingRecord = async (data) => {
  return await database.createDocument(
    process.env.NEXT_PUBLIC_DB_NAME,
    process.env.NEXT_PUBLIC_SAMPLING_TABLE,
    "unique()",
    data
  );
};

const sendVerificationEmail = async () => {};

const verifyEmail = async () => {};

export default client;
export {
  account,
  database,
  createSamplingRecord,
  functions,
  sendVerificationEmail,
  verifyEmail,
};
