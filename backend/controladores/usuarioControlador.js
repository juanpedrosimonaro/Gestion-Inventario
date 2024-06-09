const Usuario = require('../modelos/usuarioModelo'); // Importa el modelo Usuario

const editarPerfil = async (req, res) => {
  if(req.body._id == req.usuario._id){
    try {
      const usuarioActualizado = await Usuario.findByIdAndUpdate(
        req.usuario._id,
        req.body,
        { new: true }
      );
      if (!usuarioActualizado) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }
      res.status(200).json(usuarioActualizado);
    } catch (error) {
      res.status(500).json({ error: 'Error al actualizar el usuario' });
    }
  } else {
    res.status(403).json({ error: 'El perfil no le pertenece al usuario' });
  }
};

const obtenerUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.find();
    res.status(200).json(usuarios);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los usuarios' });
  }
};


const editarUsuario = async (req, res) => {
  try {
    const usuarioActualizado = await Usuario.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!usuarioActualizado) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.status(200).json(usuarioActualizado);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el usuario' });
  }
};

/*const eliminarUsuario = async (req, res) => {
  try {
    const usuarioEliminado = await Usuario.findByIdAndDelete(req.params.id);
    if (!usuarioEliminado) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.status(200).json({ message: 'Usuario eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el usuario' });
  }
};*/

module.exports = {
  editarPerfil,
  obtenerUsuarios,
  editarUsuario,
//  eliminarUsuario
}
