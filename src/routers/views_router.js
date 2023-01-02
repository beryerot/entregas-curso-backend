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
    let products = await productManager.get()
    io.on('connection', socket => {
        console.log('New client connected')
        socket.emit('showProducts', products)

        socket.on('addProduct', async data => {
            let products = await productManager.get()
            const productAdded = await productManager.add( data.title, data.description, data.price, data.code, data.stock, data.category )
            products.push(productAdded)
            io.emit('showProducts', products)
        })
        
        socket.on('deleteProduct', async data => {
            let products = await productManager.get()
            await productManager.delete(data.id)
            products = products.filter(prod => prod.id != data.id)
            io.emit('showProducts', products)
        })
    })
    res.render('realTimeProducts', {products})
})

export default router