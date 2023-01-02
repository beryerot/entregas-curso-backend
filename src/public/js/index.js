const socket = io()
const realtimeProducts = document.getElementById('products')
const addBtn = document.getElementById('addBtn')
const addForm = document.getElementById('addProductForm')
const deleteID = document.getElementById('deleteID')
const deleteBtn = document.getElementById('deleteBtn')
const deleteForm = document.getElementById('deleteForm')

socket.on('connect', () =>{
    console.log(socket.id);
})

addBtn.addEventListener('click', (e) => {

    e.preventDefault()
    const title = document.getElementById('title').value
    const description = document.getElementById('description').value
    const code = document.getElementById('code').value
    const price = document.getElementById('price').value
    const stock = document.getElementById('stock').value
    const category = document.getElementById('category').value
    if(title.length > 0 && description.length > 0 && price.length > 0 && code.length > 0 && stock.length > 0 && category.length > 0) {    
    socket.emit('addProduct', { title, description, code, price, stock, category })
    console.log('Product Added!!')
    addForm.reset()}else{
        alert('There are empty fields')
    }
})

deleteBtn.addEventListener('click', (e) => {
    e.preventDefault()
    socket.emit('deleteProduct', {id: deleteID.value})
    deleteForm.reset()
})

socket.on('showProducts', data => {
    let products = ''
    data.forEach(product => {
        products += `<div>
        <p><strong>Id: </strong>${product.id}</p>
        <p><strong>Title: </strong>${product.title}</p>
        <p><strong>Description: </strong>${product.description}</p>
        <p><strong>Price: </strong> $${product.price}</p>
        <p><strong>Stock: </strong>${product.stock}</p>
        <p><strong>Category: </strong>${product.category}</p>
        <hr>
    </div>`
    })
    realtimeProducts.innerHTML = products
})