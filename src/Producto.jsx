import EditLogo from './EditLogo.jsx'
import TrashLogo from './TrashLogo.jsx'
import CheckLogo from './CheckLogo.jsx'
import CloseLogo from './CloseLogo.jsx'
import {useState} from 'react'
function Producto({producto,key,eliminarProducto,editarProducto}){
  const [editando,setEditando] = useState(false);
  const toggleEditando = ()=>setEditando(!editando);
  const handleSubmit = (data)=>{
    setEditando(false);
    editarProducto({imagen:data.imagen,categoria:data.categoria,rating:data.rating,existencias:data.existencias,descuento:data.descuento,descripcion:data.descripcion},data.key); 
  }
  return (
    <li key={key}>
        {editando ? 
          <form>
            <input type="hidden" id="key" name="key" value={key} />
            <input type="text" id="imgUrl" name="imgUrl" value={producto.image}/>
            <input type="text" id="titulo" name="titulo" value={producto.titulo}/>
            <input type="text" id="precio" name="precio" value={producto.precio}/>
            <input type="text" id="categoria" name="categoria" value={producto.categoria}/>
            <input type="text" id="rating" name="rating" value={producto.rating}/>
            <input type="text" id="existencias" name="existencias" value={producto.existencias}/>
            <input type="text" id="descuento" name="descuento" value={producto.descuento}/>
            <input type="text" id="descripcion" name="descripcion" value={producto.descripcion}/>
            <button type="submit" class="invisble">
              <CheckLogo classN="text-cl5 fill-current w-[92px] cursor-pointer opacity-0 hover:opacity-100"/>
            </button>
            <CloseLogo onClick={()=>setEditando(false)} classN="text-cl5 fill-current w-[92px] cursor-pointer opacity-0 hover:opacity-100" />
          </form>
          :
      <div id="botonesProducto">
        <EditLogo onClick={()=>setEditando(true)} classN="text-cl5 fill-current w-[92px] cursor-pointer opacity-0 hover:opacity-100" />
        <TrashLogo onClick{()=>eliminarProducto(key)} classN="text-cl5 fill-current w-[92px] cursor-pointer opacity-0 hover:opacity-100" />
      </div>
      <img src={producto.image} />
      <div id="infoProducto">
        <span >producto.titulo</span>
        <span >producto.precio</span>
        <span >producto.categoria</span>
        <span >producto.rating</span>
        <span >producto.existencias</span>
        <span >producto.descuento</span>
        <span >producto.descripcion</span>
      </div> 
        }
    </li>
  )
}
