import EditLogo from './EditLogo.jsx'
import TrashLogo from './TrashLogo.jsx'
import CheckLogo from './CheckLogo.jsx'
import CloseLogo from './CloseLogo.jsx'
import PackagesLogo from './PackagesLogo.jsx'
import {useState} from 'react'
function Producto({producto,index,eliminarProducto,editarProducto}){
  const [editando,setEditando] = useState(false);
  const toggleEditando = ()=>setEditando(!editando);
  const handleSubmit = (data)=>{
    setEditando(false);
    editarProducto({imagen:data.imagen,categoria:data.categoria,rating:data.rating,existencias:data.existencias,descuento:data.descuento,descripcion:data.descripcion},data.key); 
  }
  return (
    <li key={index}>
        {editando ? 
          <form className="grid-areas-producto-layout grid-cols-producto-layout grid-rows-producto-layout">
            <input type="hidden" id="key" name="key" value={key} />
            <input type="text" id="imgUrl" name="imgUrl" className="grid-in-imagen" value={producto.image}/>
            <div className="grid-in-info-pro grid-areas-info-producto grid-cols-info-producto grid-rows-info-producto">
              <input type="text" id="titulo" name="titulo" className="grid-in-titulo" value={producto.titulo}/>
              <input type="text" id="precio" name="precio" className="grid-in-precio" value={producto.precio}/>
              <input type="text" id="categoria" name="categoria" className="grid-in-categoria" value={producto.categoria}/>
              <input type="text" id="rating" name="rating" className="grid-in-rating" value={producto.rating}/>
              <input type="text" id="existencias" name="existencias" className="grid-in-existencias" value={producto.existencias}/>
              <input type="text" id="descuento" name="descuento" className="grid-in-descuento" value={producto.descuento}/>
              <input type="text" id="descripcion" name="descripcion" className="grid-in-descripcion" value={producto.descripcion}/>
            </div>
            <div className="grid-in-imagen z-100">
            <button type="submit" >
              <CheckLogo classN="text-cl5 fill-current w-[92px] cursor-pointer opacity-0 hover:opacity-100"/>
            </button>
            <CloseLogo onClick={()=>setEditando(false)} classN="text-cl5 fill-current w-[92px] cursor-pointer opacity-0 hover:opacity-100" />
            </div>
          </form>
          :
      <div className="grid grid-areas-producto-layout grid-cols-producto-layout grid-rows-producto-layout relative gap-[2px] font-permark text-[12px] bg-cl2 border-cl3 overflow-hidden">
          {/*
        <div id="botonesProducto" className="absolute top-0 right-0" >
          <EditLogo onClick={()=>setEditando(true)} classN="text-cl5 fill-current w-[92px] cursor-pointer opacity-0 hover:opacity-100" />
          <TrashLogo onClick={()=>eliminarProducto(key)} classN="text-cl5 fill-current w-[92px] cursor-pointer opacity-0 hover:opacity-100" />
        </div>
          */}
        {producto.imagen != "" ?  <img src={producto.imagen} className="grid-in-imagen w-full h-full" /> : <PackagesLogo classN="text-cl5 fill-current grid-in-imagen w-full h-full px-[5px]" /> }
      
          <div id="infoProducto" className="grid grid-in-info-pro grid-areas-info-producto grid-cols-info-producto grid-rows-info-producto">
          <span className="grid-in-titulo" >{producto.titulo}</span>
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
