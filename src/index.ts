import express from "express";
import { productsRouter } from "./routes/products-router";
import { runDb } from "./repositories/db";

const app = express();
app.use(express.json());

const port = 3001;

app.use("/products", productsRouter);
/*app.use("/addresses", addressesRouter);*/

// start app
const startApp = async () => {
  await runDb();
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
};

startApp();
