const mongoose = require('mongoose');

const favoritoSchema = new mongoose.Schema({
  usuarioId: {type:mongoose.Schema.Types.ObjectId,ref:'Usuario'},
  productoId: {type:mongoose.Schema.Types.ObjectId,ref:'Producto'}
})

const Favorito = mongoose.model('Favorito', favoritoSchema,'favoritos');
module.exports = Favorito;
