import {Request, Response, Router} from "express";

const addresses = [{id: 1, value: 'Goujon 16'}, {id: 2, title: 'Amsterdam 69'}]

export const addressesRouter = Router()

addressesRouter.get('/', (req: Request, res: Response) => {
    res.send(addresses)
})
addressesRouter.get('/:id', (req: Request, res: Response) => {
    let address = addresses.find((address) => address.id === +req.params.id)
    if (address) {
        res.send(address)
    } else {
        res.send(404)
    }
})