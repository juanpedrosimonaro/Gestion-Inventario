import {useRef,useEffect} from 'react'
import Producto from './Producto.jsx'
function ListaProductos({productos,setProductos,busqueda,opcionesBusqueda}){
  const productosRef = useRef(productos);
  const editarProducto = (productoEditado,index)=>{
    debugger;
    setProductos([...productos.slice(0,index),productoEditado,...productos.slice(index+1)])
  }

  const eliminarProducto = (index)=>{
    setProductos([...productos.slice(0,index),...productos.slice(index+1)])
  }
  var filteredResult = productos.filter(producto=>producto.titulo.toLowerCase().includes(busqueda.toLowerCase()))
  return (
    <ul className="flex flex-row flex-wrap w-[968px] p-[30px] gap-[25px]">
      {filteredResult.length != 0 ? filteredResult.map((producto,index)=>(<Producto producto={producto} index={index} eliminarProducto={eliminarProducto} editarProducto={editarProducto}/>)) : <li>No hay resultados que mostrar</li>} 
    </ul>
  )

}

export default ListaProductos
