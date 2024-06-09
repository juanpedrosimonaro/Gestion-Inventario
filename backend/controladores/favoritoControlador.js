const Favorito = require('../modelos/favoritoModelo'); // Importa el modelo Favorito

const crearFavorito = async (req, res) => {
  try {
    const nuevoFavorito = await Favorito.create({usuarioId:req.usuario._id,productoId:req.body.productoId});
    res.status(201).json(nuevoFavorito);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el favorito' });
  }
};

const obtenerFavoritos = async (req, res) => {
  try {
    const favoritos = await Favorito.find({usuarioId:req.usuario._id});
    res.status(200).json(favoritos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los favoritos' });
  }
};

const eliminarFavorito = async (req, res) => {
  try {
    const favoritoEliminado = await Favorito.findOneAndDelete({usuarioId:req.usuario._id,productoId:req.params.id});
    if (!favoritoEliminado) {
      return res.status(404).json({ message: 'Favorito no encontrado' });
    }
    res.status(200).json({ message: 'Favorito eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el favorito' });
  }
};

module.exports = {
  crearFavorito,
  obtenerFavoritos,
  eliminarFavorito
}
