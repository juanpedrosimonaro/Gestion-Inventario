const express = require('express');
const mongoose = require('mongoose');
const authControlador = require('./controladores/authControlador');
const productoControlador = require('./controladores/productoControlador');
const favoritoControlador = require('./controladores/favoritoControlador');
const usuarioControlador = require('./controladores/usuarioControlador');
const jwt = require('jsonwebtoken')
require("dotenv").config();


const app = express();

app.use(express.json());
mongoose.connect(process.env.MONGO_URI);

// Middlewares
const autenticarJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, usuario) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.usuario = usuario;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

const autorizarAdministrador = (req, res, next) => {
  if (req.usuario.rol === 'administrador') {
    next();
  } else {
    res.sendStatus(403);
  }
};

const autorizarUsuario = (req, res, next) => {
  if (req.usuario.rol === 'usuario') {
    next();
  } else {
    res.sendStatus(403);
  }
};

// Rutas
app.post('/auth/login', authControlador.login);
app.post('/auth/registro', authControlador.registro);

app.get('/productos',productoControlador.obtenerProductos);
app.post('/producto', autenticarJWT, autorizarAdministrador, productoControlador.crearProducto);
app.put('/producto/:id', autenticarJWT, autorizarAdministrador, productoControlador.editarProducto);
app.delete('/producto/:id', autenticarJWT, autorizarAdministrador, productoControlador.eliminarProducto);

app.get('/favoritos', autenticarJWT, autorizarUsuario,favoritoControlador.obtenerFavoritos);
app.post('/favorito', autenticarJWT, autorizarUsuario, favoritoControlador.crearFavorito);
app.delete('/favorito/:id', autenticarJWT, autorizarUsuario, favoritoControlador.eliminarFavorito);

app.get('/usuarios', autenticarJWT, autorizarAdministrador, usuarioControlador.obtenerUsuarios);
app.put('/usuario/perfil', autenticarJWT, autorizarUsuario, usuarioControlador.editarPerfil);
app.put('/usuario/:id', autenticarJWT, autorizarAdministrador, usuarioControlador.editarUsuario);
//app.delete('/api/usuario/:id', autenticarJWT, autorizarAdministrador, usuarioControlador.eliminarUsuario);

const PORT = 3000//process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
