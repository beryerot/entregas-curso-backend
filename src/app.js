import express from 'express'
import productRouter from './routers/products_router.js'
import cartRouter from './routers/cart_router.js'
import viewsRouter from './routers/views_router.js'
import handlebars from 'express-handlebars'
import __dirname from './utils.js'
import { Server } from "socket.io"


const app = express()

app.use(express.static(__dirname + '/public'))

// Inicializamos el Motor de Plantilla:
app.engine('handlebars', handlebars.engine())
// Indicamos donde estan las vistas:
app.set('views', __dirname + '/views')

// Indicamos que motor de plantillar usar:
app.set('view engine', 'handlebars')

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/api/products', productRouter)
app.use('/api/carts', cartRouter)
app.use('/static', express.static('public'))
app.use('/', viewsRouter)

app.use((req,res,next)=>{
    req.io = socketServer
    next()
})

const httpServer = app.listen(8080, () => console.log('Server on port 8080'))
const io = new Server(httpServer)

io.on('connection', socket =>{
    socket.on('msg_front', message => console.log(message));
    /* socket.emit('msg_individual', 'Este msj solo lo recibe el socket')
    socket.broadcast.emit('msg_resto','Este msj lo recibe todos menos el socket actual')
    socketServer.emit('msg_all','Mensaje a todos') */
})



export default io