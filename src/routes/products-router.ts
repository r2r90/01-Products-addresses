import {Request, Response, Router} from "express";
import {productsRepository} from "../repositories/products-repository";


export const productsRouter = Router({})

productsRouter.get('/', (req: Request, res: Response) => {
    const foundProducts = productsRepository.findProducts(req.query.title?.toString())
    res.send(foundProducts)
})

productsRouter.get('/:id', (req: Request, res: Response) => {
    let product = productsRepository.getProductById(+req.params.id)
    if (product) {
        res.send(product)
    } else {
        res.send(404)
    }
})
productsRouter.post('/', (req: Request, res: Response) => {
    const newProduct = productsRepository.createProduct(req.body.title)
    res.status(201).send(newProduct)

})
productsRouter.put('/:id', (req: Request, res: Response) => {
    const isUpdated = productsRepository.updateProduct(+req.params.id, req.body.title)
    if (isUpdated) {
        const updatedProduct = productsRepository.findProductById(+req.params.id)
        res.send(updatedProduct)
    } else {
        res.status(404)
    }
})
productsRouter.delete('/:id', (req: Request, res: Response) => {
    const isDeleted = productsRepository.deleteProduct(+req.params.id)
    isDeleted ? res.send(204) : res.send(404)
})
