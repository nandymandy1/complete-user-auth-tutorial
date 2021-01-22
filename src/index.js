import cors from "cors";
import consola from "consola";
import express from "express";
import mongoose from "mongoose";
import { json } from "body-parser";

// Import Application Constants
import { DB, PORT } from "./constants";

// Router exports
import userApis from "./apis/users";

// Initialize express application
const app = express();

// Apply Application Middlewares
app.use(cors());
app.use(json());

// Inject Sub router and apis
app.use("/users", userApis);

const main = async () => {
  try {
    // Connect with the database
    await mongoose.connect(DB, {
      useNewUrlParser: true,
      useFindAndModify: true,
      useUnifiedTopology: true,
    });
    consola.success("DATABASE CONNECTED...");
    // Start application listening for request on server
    app.listen(PORT, () => consola.success(`Sever started on port ${PORT}`));
  } catch (err) {
    consola.error(`Unable to start the server \n${err.message}`);
  }
};

main();
