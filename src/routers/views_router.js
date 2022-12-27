import express from 'express'
import ProductManager from '../product_manager.js'
import io from '../app.js'

const router = express.Router()
const productManager = new ProductManager('products.json')

router.get('/', async (req, res) => {
    const products = await productManager.get()
    res.render('index', {products})
})

router.get('/realtimeproducts', async (req, res) => {
    const products = await productManager.get()

    io.on('connection', socket => {
        console.log('New client connected')
    
})
res.render('realTimeProducts', {products})
})


export default router