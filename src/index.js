import dotenv from "dotenv";
import mongoConnection from "./db/index.js";
dotenv.config({ path: "./env" });

mongoConnection
  .then(() => {
    const port = process.env.PORT || 4600;
    app.listen(port, (req, res) => {
      console.log(`Server is listing on port http://localhost:${port}`);

      res.send(`Server is listing on port http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.log("MongoDB connection failed.", error);
  });
