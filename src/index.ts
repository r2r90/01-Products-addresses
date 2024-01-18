import express, {Request, Response} from 'express'
import bodyParser from "body-parser";
import {productsRouter} from "./routes/products-router";
import {addressesRouter} from "./routes/addresses-router";


const app = express()
const parserMiddelware = bodyParser({})
app.use(parserMiddelware)
const port = 3001

app.get('/', (req: Request, res: Response) => {
    let helloMessage = 'Hello world !';
    res.send(helloMessage)
})


app.use('/products', productsRouter)
app.use('/addresses', addressesRouter)


// start app
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})



