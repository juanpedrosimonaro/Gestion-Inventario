const Producto = require('../modelos/productoModelo'); // Importa el modelo Producto

const crearProducto = async (req, res) => {
  //const {titulo, descripcion, precio, existencia, descuento, imagen, rating, categoria} = req.body;
  try {
    const nuevoProducto = await Producto.create(/*{titulo, descripcion, precio, existencia, descuento, imagen, rating, categoria}*/ req.body);
    res.status(201).json(nuevoProducto);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el producto' });
  }
};

const obtenerProductos = async (req, res) => {
  try {
    const productos = await Producto.find();
    res.status(200).json(productos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los productos' });
  }
};


const editarProducto = async (req, res) => {
  try {
    const productoActualizado = await Producto.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!productoActualizado) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    res.status(200).json(productoActualizado);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el producto' });
  }
};

const eliminarProducto = async (req, res) => {
  try {
    const productoEliminado = await Producto.findByIdAndDelete(req.params.id);
    if (!productoEliminado) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    res.status(200).json({ message: 'Producto eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el producto' });
  }
};

module.exports = {
  crearProducto,
  obtenerProductos,
  editarProducto,
  eliminarProducto 
}
