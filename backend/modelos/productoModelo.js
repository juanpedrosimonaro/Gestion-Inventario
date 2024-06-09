const mongoose = require('mongoose');

const productoSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  descripcion: { type: String },
  precio: { type: Number, required: true },
  existencia: { type: Number, required: true },
  descuento: { type: Number, required: true },
  imagen: { type: String, required:true }, 
  rating: { type: Number, required:true },
  categoria: { type: String, required:true }
});

const Producto = mongoose.model('Producto', productoSchema,'productos');
module.exports = Producto;
