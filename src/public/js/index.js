const socket = io()
const productsDOM = document.getElementById('products')
const deleteID = document.getElementById('deleteID')
const deleteBtn = document.getElementById('deleteBtn')
const prodTitle = document.getElementById('title')
const prodDescription = document.getElementById('description')
const prodCode = document.getElementById('code')
const prodPrice = document.getElementById('price')
const prodStock = document.getElementById('stock')
const prodCategory = document.getElementById('category')
const addBtn = document.getElementById('addBtn')

socket.on('showProducts', data => {
    let products = ''
    data.forEach(product => {
        products += `<div>
        <p>ID: ${product.id}</p>
        <p>Title: ${product.title}</p>
        <p>Price: $${product.price}</p>
        <br>
    </div>`
    })
    productsDOM.innerHTML = products
})