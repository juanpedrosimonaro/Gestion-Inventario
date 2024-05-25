import {useRef,useEffect} from 'react';
import Producto from './Producto.jsx';
import PlusLogo from './PlusLogo.jsx';
function ListaProductos({productos,setProductos,busqueda,opcionesBusqueda,setMessage}){
  const productosRef = useRef(productos);
  const editarProducto = (productoEditado,index)=>{
    setProductos([...productos.slice(0,index),productoEditado,...productos.slice(index+1)]);
    setMessage("El Producto se ha editado exitosamente");
    setTimeout(() => setMessage(''), 5000);
  }

  const eliminarProducto = (index)=>{
    setProductos([...productos.slice(0,index),...productos.slice(index+1)]);
    setMessage("El Producto se ha borrado exitosamente");
    setTimeout(() => setMessage(''), 5000);
  }

  const handleSubmit = (e)=>{
    debugger
    e.preventDefault()
    setProductos([...productos,{
      imagen:e.target.imagen.value,
      titulo:e.target.titulo.value,
      precio:Number(e.target.precio.value),
      categoria:e.target.categoria.value,
      rating:Number(e.target.rating.value),
      existencia:Number(e.target.existencia.value),
      descuento:Number(e.target.descuento.value),
      descripcion:e.target.descripcion.value
    }])
    setMessage("El Producto se ha agregado exitosamente");
    setTimeout(() => setMessage(''), 5000);
  }


  var filteredResult = productos.filter(producto=>producto.titulo.toLowerCase().includes(busqueda.toLowerCase()));

  return (
    <ul className="flex flex-row flex-wrap w-[968px] p-[30px] gap-[25px]">
      {filteredResult.length != 0 ? filteredResult.map((producto,index)=>(<Producto producto={producto} index={index} eliminarProducto={eliminarProducto} editarProducto={editarProducto} setMessage={setMessage} />)) : <li key="no-result">No hay resultados que mostrar</li>} 
      <li>
        <form className="grid grid-areas-producto-layout grid-cols-producto-layout grid-rows-producto-layout relative gap-[2px] font-permark text-[12px] bg-cl2 border-cl3 overflow-hidden" onSubmit={handleSubmit}>
          <input type="hidden" id="key" name="key" />
          <input type="text" id="imagen" name="imagen" placeholder="Imagen" className="grid-in-imagen" />
          <div className="grid grid-in-info-pro grid-areas-info-producto grid-cols-info-producto grid-rows-info-producto p-[5px]">
            <input type="text" id="titulo" name="titulo" placeholder="Titulo" className="grid-in-titulo overflow-hidden" />
            <input type="text" id="precio" name="precio" placeholder="Precio" className="grid-in-precio flex justify-content-center items-center text-center" />
            <input type="text" id="categoria" name="categoria" placeholder="Categoria" className="grid-in-categoria" />
            <input type="text" id="rating" name="rating" placeholder="Rating" className="grid-in-rating" />
            <input type="text" id="existencia" name="existencia" placeholder="Existencia" className="grid-in-existencia" />
            <input type="text" id="descuento" name="descuento" placeholder="Descuento" className="grid-in-descuento" />
            <input type="text" id="descripcion" name="descripcion" placeholder="Descripcion" className="grid-in-descripcion overflow-hidden text-[8px]" />
          </div>
          <div className="absolute top-0 right-0 flex flex-row gap-[10px]">
            <button type="submit" className="all-unset" >
              <PlusLogo classN="text-cl5 fill-current w-[20px] cursor-pointer hover:text-cl4"  />
            </button>
          </div>
        </form>
      </li>
    </ul>
  )

}

export default ListaProductos
