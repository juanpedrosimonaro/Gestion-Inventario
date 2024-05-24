import Producto from './Producto.jsx'
function ListaProductos({productos,setProductos}){
  const editarProducto = (productoEditado,index)=>{
    setProductos([...productos.slice(0,index-1),productoEditado,...productos.slice(index+1)])
  }
  const eliminarProducto = (index)=>{
    setProductos([...productos.slice(0,index-1),...productos.slice(index+1)])
  }
  return (
    <ul>
      {productos.map((producto,index)=><Producto producto={producto} key={index} eliminarProducto={eliminarProducto} editarProducto={editarProducto}/>)} 
    </ul>
  )

}
