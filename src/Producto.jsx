import EditLogo from './EditLogo.jsx'
import TrashLogo from './TrashLogo.jsx'
import CheckLogo from './CheckLogo.jsx'
import CloseLogo from './CloseLogo.jsx'
import PackagesLogo from './PackagesLogo.jsx'
import {useState} from 'react'
function Producto({producto,index,eliminarProducto,editarProducto,setMessage}){
  const [editando,setEditando] = useState(false);
  const handleSubmit = (e)=>{
    setEditando(false);
    editarProducto({
      imagen:e.target.imagen.value,
      titulo:e.target.titulo.value,
      precio:Number(e.target.precio.value),
      categoria:e.target.categoria.value,
      rating:Number(e.target.rating.value),
      existencia:Number(e.target.existencia.value),
      descuento:Number(e.target.descuento.value),
      descripcion:e.target.descripcion.value
    },Number(e.target.key.value)); 
    setMessage("El Producto se ha editado exitosamente");
    setTimeout(() => setMessage(''), 5000);
  }
  return (
    <li key={index}>
      {editando ? 
        <form className="grid grid-areas-producto-layout grid-cols-producto-layout grid-rows-producto-layout relative gap-[2px] font-permark text-[12px] bg-cl2 border-cl3 overflow-hidden" onSubmit={handleSubmit}>
          <input type="hidden" id="key" name="key" defaultValue={index} />
          <input type="text" id="imagen" name="imagen" className="grid-in-imagen" defaultValue={producto.imagen}/>
          <div className="grid grid-in-info-pro grid-areas-info-producto grid-cols-info-producto grid-rows-info-producto p-[5px]">
            <input type="text" id="titulo" name="titulo" className="grid-in-titulo overflow-hidden" defaultValue={producto.titulo}/>
            <input type="text" id="precio" name="precio" className="grid-in-precio flex justify-content-center items-center text-center" defaultValue={producto.precio}/>
            <input type="text" id="categoria" name="categoria" className="grid-in-categoria" defaultValue={producto.categoria}/>
            <input type="text" id="rating" name="rating" className="grid-in-rating" defaultValue={producto.rating}/>
            <input type="text" id="existencia" name="existencia" className="grid-in-existencia" defaultValue={producto.existencia}/>
            <input type="text" id="descuento" name="descuento" className="grid-in-descuento" defaultValue={producto.descuento}/>
            <input type="text" id="descripcion" name="descripcion" className="grid-in-descripcion overflow-hidden text-[8px]" defaultValue={producto.descripcion}/>
          </div>
          <div className="absolute top-0 right-0 flex flex-row gap-[10px]">
            <button type="submit" className="all-unset" >
              <CheckLogo classN="text-cl5 fill-current w-[20px] cursor-pointer hover:text-cl4"/>
            </button>
            <CloseLogo handlerClick={()=>setEditando(false)} classN="text-cl5 fill-current w-[20px] cursor-pointer hover:text-cl4" />
          </div>
        </form>
          :
      <div className="grid grid-areas-producto-layout grid-cols-producto-layout grid-rows-producto-layout relative gap-[2px] font-permark text-[12px] bg-cl2 border-cl3 overflow-hidden rounded-lg">
        <div id="botonesProducto" className="absolute top-0 right-0 flex flex-row gap-[10px]" >
          <EditLogo handlerClick={()=>setEditando(true)} classN="text-cl5 fill-current w-[20px] cursor-pointer hover:text-cl4" />
          <TrashLogo handlerClick={()=>eliminarProducto(index)} classN="text-cl5 fill-current w-[20px] cursor-pointer hover:text-cl4" />
        </div>
        {producto.imagen != "" ?  <img src={producto.imagen} className="grid-in-imagen w-full h-full" /> : <PackagesLogo classN="text-cl5 fill-current grid-in-imagen w-full h-full" /> }
      
        <div id="infoProducto" className="grid grid-in-info-pro grid-areas-info-producto grid-cols-info-producto grid-rows-info-producto p-[5px]">
          <span className="grid-in-titulo overflow-hidden" >{producto.titulo}</span>
          <span className="grid-in-precio flex justify-content-center items-center text-center" >${producto.precio}</span>
          <span className="grid-in-categoria" >{producto.categoria}</span>
          <span className="grid-in-rating" >⭐{producto.rating}</span>
          <span className="grid-in-existencias" >📦 {producto.existencia}</span>
          <span className="grid-in-descuento" >⬇ {producto.descuento}%</span>
          <span className="grid-in-descripcion overflow-hidden text-[8px]" >{producto.descripcion}</span>
        </div> 
      </div>
        }
    </li>
  )
}

export default Producto
