const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	index: (req, res) => {
		const productosVisitados= products.filter(product=>product.category=='visited');
		const productosOfertados= products.filter(product=>product.category=='in-sale');
		const categoriasIndex= {
			visiteds: productosVisitados, 
			sales: productosOfertados
		}
		res.render('index', categoriasIndex);
	},
	search: (req, res) => {
		// Do the magic
	},
};

module.exports = controller;
