import fs from 'fs'

class ProductManager {

    constructor(path) {
        this.path = path
    }


    read = () => {
        if(fs.existsSync(this.path)){
            return fs.promises.readFile(this.path, 'utf-8').then(r => JSON.parse(r))
        }
        return []
    }


    getNextID = list => {
        const count = list.length
        return (count > 0) ? list[count-1].id + 1 : 1
    }

    write = list => {
        return fs.promises.writeFile(this.path, JSON.stringify(list))
    }

    get = async () => {
        const data = await this.read()

        return data
    }

    getByID = async (id) => {
        const data = await this.read()

        return data.find(p => p.id == id)
    }

    #newProduct(id,title,description,price,code,stock, category, status, thumbnails){
        const newProduct={
            id: id,
            title,
            description,
            price,
            thumbnails,
            code,
            stock,
            category,
            status
        }
        return newProduct;
    }

    add = async (title, description, price, code, stock, category, status = true, thumbnails = []) => {
        const list = await this.read()
        const error = 'There are empty fields'
        const nextID = this.getNextID(list)
        const newProduct= this.#newProduct(nextID,title,description,price,code,stock, category, status, thumbnails)
        if (Object.values(newProduct).includes(undefined)){ 
            return error}else{
        list.push(newProduct)
        await this.write(list)
        return newProduct}

        
    }

    update = async (id, obj) => {
        obj.id = id
        const list = await this.read()

        const idx = list.findIndex(e => e.id == id)
        if (idx < 0) return

        list[idx] = obj

        await this.write(list)
    }

    delete = async (id) => {
        
        const list = await this.read()

        const idx = list.findIndex(e => e.id == id)
        
        if (idx < 0) return
        list.splice(idx, 1)

        await this.write(list)
    }

}

export default ProductManager