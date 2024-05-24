import Producto from './Producto.jsx'
function ListaProductos({productos,setProductos}){
  const editarProducto = (productoEditado,index)=>{
    setProductos([...productos.slice(0,index-1),productoEditado,...productos.slice(index+1)])
  }
  const eliminarProducto = (index)=>{
    setProductos([...productos.slice(0,index-1),...productos.slice(index+1)])
  }
  return (
    <ul className="flex flex-row flex-wrap w-[968px] p-[30px] gap-[25px]">
      {productos.map((producto,index)=>(<Producto producto={producto} index={index} eliminarProducto={eliminarProducto} editarProducto={editarProducto}/>))} 
    </ul>
  )

}

export default ListaProductos
