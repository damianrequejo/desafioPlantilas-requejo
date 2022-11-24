let products = []
class ProductControler {
    constructor() {
    }
    getAll(req, res) {
        try {
            res.render("products", {products: products, empty: products.length === 0 ? true : false})
        } catch (error) {
            console.log("Error en función Obtener Todos los productos", error);
        }
    }
    getById(req, res) {
        try {
            const { id } = req.params
            if (isNaN(id)) {
                res.status(400).json({ Error: "Debe ingresar un número" })
            }
            const product = products.filter(filterProduct => filterProduct.id === Number(id))
            if (!product[0]) {
                res.status(404).json({ Error: "El producto ingresado no existe" })
            }
            res.status(200).json(product)
        } catch (error) {
            console.log("Error en función Obtener Un Producto", error);
        }
    }
    addProduct(req, res) {
        try {
            const { title, price, thumbnail } = req.body
            const product = { title: title, price: price, thumbnail: thumbnail }
            if (products.length === 0) {
                product.id = 1
            }
            else {
                const lastId = products[products.length - 1].id
                product.id = lastId + 1
            }
            products.push(product)
            console.log(products);
            res.redirect("/")
        } catch (error) {
            console.log("Error en función Agregar Producto", error);
        }
    }
    updateProduct(req, res) {
        try {
            const { id } = req.params
            const { title, price, thumbnail } = req.body
            if (isNaN(id)) {
                res.status(400).json({ Error: "Debe ingresar un número" })
            }
            const index = products.findIndex(product => product.id === Number(id))
            if (index === -1) {
                res.status(404).json({ Error: "El producto ingresado no existe" })
            }
            const productUpdated = { title: title, price: price, thumbnail: thumbnail, id: Number(id) }
            products[index] = productUpdated
            res.status(200).json({ productUpdated })
        } catch (error) {
            console.log("Error en función Agregar Producto", error)
        }
    }
    deleteById(req, res) {
        try {
            const { id } = req.params
            if (isNaN(id)) {
                res.status(400).json({ Error: "Debe ingresar un número" })
            }
            const product = products.filter(filterProduct => filterProduct.id === Number(id))
            if (!product) {
                res.status(404).json({ Error: "El producto ingresado no existe" })
            }
            products = products.filter(filterProduct => filterProduct.id !== Number(id))
            res.status(200).json(`El producto ${id} se ha eliminado exitosamente`)
        } catch (error) {
            console.log("Error en funcion Borrar Un Producto", error);
        }
    }
}

module.exports = ProductControler