import {Router} from 'express'
import CartManager from '../cart_manager.js'

const router = Router()
const cartManager = new CartManager('carts.json')

router.get('/', async (req, res) => {

    const carts = await cartManager.get()
    res.json({carts})
})

router.get('/:id', async (req, res) => {
    const id = parseInt(req.params.id)
    const cart = await cartManager.getByID(id)
    res.json({cart})
})


router.post('/', async (req, res) => {

    const newCart = await cartManager.create()

    res.json({status: 'success', newCart})
})

router.post('/:cid/product/:pid', async (req, res) => {

    const cartID = parseInt(req.params.cid)
    const productID = parseInt(req.params.pid)

    const cart = await cartManager.addProduct(cartID, productID)
    
    res.json({status: 'success', cart})
})

export default router
