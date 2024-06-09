const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  apellido: { type: String, required: true },
  correo: { type: String, required: true },
  contrasena: { type: String, required: true },
  rol: { type: String, required: true },
  telefono: { type: String },
  direccion: { type: String }
});

const Usuario = mongoose.model('Usuario', usuarioSchema,'usuarios');
module.exports = Usuario;
