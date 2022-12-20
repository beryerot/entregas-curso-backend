import {Router} from 'express'
import ProductManager from '../product_manager.js'

const router = Router()
const productManager = new ProductManager('products.json')

router.get('/', async (req, res) => {

    const products = await productManager.get()
    const limit = req.query.limit

    if(!limit) res.json({products})
    else res.json(products.splice(0, limit))
})

router.post('/', async (req, res) => {

    const {title, description, price, thumbnails, code, stock, category, status} = req.body
    const addProduct = await productManager.add(title, description, price, code, stock, category, status, thumbnails)
    res.send(addProduct)
})

router.delete('/:pid', async (req, res) => {

    const id = parseInt(req.params.pid)
    const deleteProduct = req.body

    const product = await productManager.getByID(id)
    if(!product) return res.status(404).send('Product not found')

    for (const key of Object.keys(deleteProduct)) {
        product[key] = deleteProduct[key]
    }

    await productManager.delete(id)

    res.json({status: 'success', deleteProduct})
})

router.put('/:pid', async (req, res) => {

    const id = parseInt(req.params.pid)
    const productToUpdate = req.body

    const product = await productManager.getByID(id)
    if(!product) return res.status(404).send('Product not found')

    for (const key of Object.keys(productToUpdate)) {
        product[key] = productToUpdate[key]
    }

    await productManager.update(id, product)

    res.json({status: 'success', product})
})

export default router
