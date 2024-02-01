import { Request, Response, Router } from "express";

import { body, validationResult } from "express-validator";
import { inputValidationMiddleware } from "../middlewares/input-validation-middleware";
import { ProductType } from "../repositories/db";
import { productsService } from "../domain/products-service";

export const productsRouter = Router({});
const titleValidation = body("title")
  .trim()
  .notEmpty()
  .withMessage("Field can't be empty!!!")
  .isLength({
    min: 3,
    max: 20,
  })
  .withMessage("title length should be from 3 to 10 symbols.");

productsRouter.get("/", async (req: Request, res: Response) => {
  const foundProducts: ProductType[] = await productsService.findProducts(
    req.query.title?.toString()
  );

  res.send(foundProducts);
});

productsRouter.get("/:id", async (req: Request, res: Response) => {
  let product = await productsService.findProductById(+req.params.id);
  if (product) {
    res.send(product);
  } else {
    res.send(404);
  }
});
productsRouter.post(
  "/",
  titleValidation,
  inputValidationMiddleware,
  async (req: Request, res: Response) => {
    const newProduct: ProductType = await productsService.createProduct(
      req.body.title
    );
    res.status(201).send(newProduct);
  }
);

productsRouter.put(
  "/:id",
  titleValidation,
  inputValidationMiddleware,
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) res.status(400).json({ errors: errors.array() });

    const isUpdated = await productsService.updateProduct(
      +req.params.id,
      req.body.title
    );
    if (isUpdated) {
      const updatedProduct = productsService.findProductById(+req.params.id);
      res.send(updatedProduct);
    } else {
      res.status(404);
    }
  }
);
productsRouter.delete("/:id", async (req: Request, res: Response) => {
  const isDeleted = await productsService.deleteProduct(+req.params.id);
  isDeleted ? res.send(204) : res.send(404);
});
