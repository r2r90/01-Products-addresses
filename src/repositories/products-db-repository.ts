import { productCollection, ProductType } from "./db";

export const productsRepository = {
  async findProducts(title: string | null | undefined): Promise<ProductType[]> {
    const filter: any = {};
    if (title) {
      filter.title = { $regex: title };
    }
    return productCollection.find(filter).toArray();
  },

  async findProductById(id: number): Promise<ProductType | null> {
    return await productCollection.findOne({
      id: id,
    });
  },

  async createProduct(newProduct: ProductType): Promise<ProductType> {
    const result = await productCollection.insertOne(newProduct);
    return newProduct;
  },

  async updateProduct(id: number, title: string): Promise<boolean> {
    const result = await productCollection.updateOne(
      { id: id },
      { $set: { title: title } }
    );
    return result.matchedCount === 1;
  },
  async deleteProduct(id: number): Promise<boolean> {
    let result = await productCollection.deleteOne({ id: id });
    return result.deletedCount === 1;
  },
};
