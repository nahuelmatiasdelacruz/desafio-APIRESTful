// Clase: Productos

class Productos{
    constructor(title,price,thumbnail){
        this.title = title;
        this.price = price;
        this.thumbnail = thumbnail;
    }
    productos = [
        {
            id: 1,
            title: "Placa de video",
            price: 200,
            thumbnail: "http://api.com/thumbnail.png"
        }
    ];
    getProductos(){
        return this.productos;
    }
    getProductById(id){
        const product = this.productos.find(producto =>producto.id == id);
        if(product == undefined){
            return {error: "Producto no encontrado"};
        }else{
            return product;
        }
    }
    addProduct(product){
        if(this.productos.length > 0){
            const auxId = this.productos[this.productos.length - 1].id+1;
            const obj = {
                id: auxId,
                title: product.title,
                price: product.price,
                thumbnail: product.thumbnail
            }
            this.productos.push(obj);
            return obj;
        }else{
            const obj = {
                id: 1,
                title: product.title,
                price: product.price,
                thumbnail: product.thumbnail
            }
            this.productos.push(obj);
            return obj;
        }
    }
    updateProduct(product){
        const obj = {
            id: product.id,
            title: product.title,
            price: product.price,
            thumbnail: product.thumbnail
        }
        const products = this.productos.find(producto=>producto.id === product.id);
        if(products==undefined){
            return {error: "No existe producto con ese ID"};
        }else{
            const filteredProducts = this.productos.filter(producto=>producto.id!==product.id);
            filteredProducts.push(obj);
            this.productos = filteredProducts;
            return {success: "Se ha actualizado el producto",products: this.productos};
        }
    }
    deleteProduct(id){
        const products = this.productos.find(producto=>producto.id==id);
        if(products==undefined){
            return {error: "No existe producto con ese id"};
        }else{
            const filteredProducts = this.productos.filter(producto=>producto.id!=id);
            console.log(filteredProducts);
            this.productos = filteredProducts;
            return {success: `Se ha eliminado el producto con el id: ${id}`,productosNuevos: this.productos};
        }
    }
}

// Constantes
const bodyParser = require('body-parser');
const express = require("express");
const { Router } = express;
const app = express();
const PORT = 8080;
const productos = new Productos();

//Routers
const routerProductos = Router();
app.use("/api/productos/",routerProductos);

routerProductos.use(express.urlencoded({extended: true}));
routerProductos.use(express.json());

// Configuraciones
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static("public"));

app.listen(PORT,()=>{
    console.log(`Server listening on port ${PORT}`);
});

app.get("/",(req,res)=>{
    res.render("index.html");
});

// Petciones
routerProductos.get("/",(req,res)=>{
    res.json(productos.getProductos());
});
routerProductos.get("/:id",(req,res)=>{
    res.json(productos.getProductById(req.params.id));
});
routerProductos.post("/",(req,res)=>{
    const result = productos.addProduct(req.body);
    res.json(result);
});
routerProductos.put("/",(req,res)=>{
    const result = productos.updateProduct(req.body);
    res.json(result);
});
routerProductos.delete("/:id",(req,res)=>{
    const result = productos.deleteProduct(req.params.id);
    res.json(result);
});