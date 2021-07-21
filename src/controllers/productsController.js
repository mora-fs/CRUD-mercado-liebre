const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const multerController= require('./multerController');

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	// Root - Show all products
	index: (req, res) => {
		const todosLosProductos= {
			todosProductos: products
		}
		return res.render('products', todosLosProductos)
	},

	// Detail - Detail from one product
	detail: (req, res) => {
		const idProducto= req.params.id;
		const productoParam= products.find(product=>product.id==idProducto)
		const detalleProducto= {
			detalleProducto: productoParam
		}
		return res.render('detail', detalleProducto)
	},

	// Create - Form to create
	create: (req, res) => {
		return res.render('product-create-form')
	},
	
	// Create -  Method to store
	store: (req, res) => {
		const ultimoProducto= products[products.length - 1];
		productToCreate= req.body;
		productToCreate.id= ultimoProducto.id + 1;
		newProductImageFile= req.file;
		productToCreate.image= newProductImageFile.filename;
		products.push(productToCreate);
		fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2))

		const todosLosProductos= {
			todosProductos: products
		}
		res.render('products', todosLosProductos)
	},

	// Update - Form to edit
	edit: (req, res) => {
		const idPeticionProductoEditar= req.params.id;
		const productoEditable= products.find((product)=>product.id==idPeticionProductoEditar)
		if (!productoEditable){
			return res.send('Error, no se encontró el producto')
		}
		const editandoProducto= {
			productoEdit: productoEditable
		}
		return res.render('product-edit-form', editandoProducto)
	},
	// Update - Method to update
	update: (req, res) => {
		const indiceProducto= products.findIndex(product=> product.id == req.params.id)
		products[indiceProducto] = { ...products[indiceProducto], ...req.body };
		fs.writeFileSync(productsFilePath, JSON.stringify(products, null));
		return res.send('El producto se ha editado satisfactoriamente')
	},
	// Delete - Delete one product from DB
	destroy : (req, res) => {
		const idToDelete= req.params.id;
		const productsPostDelete= products.filter(product=> product.id != idToDelete);
		fs.writeFileSync(productsFilePath, JSON.stringify(productsPostDelete, null, 2));
		
		const todosLosProductos= {
			todosProductos: products
		}
		return res.redirect(303, '/')
		//res.render('products', todosLosProductos)
	},
};

module.exports = controller;