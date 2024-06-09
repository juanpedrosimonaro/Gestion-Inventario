import EditLogo from './EditLogo.jsx'
import TrashLogo from './TrashLogo.jsx'
import CheckLogo from './CheckLogo.jsx'
import CloseLogo from './CloseLogo.jsx'
import PackagesLogo from './PackagesLogo.jsx'
import {useState} from 'react'
function Usuario({usuario,index,editarUsuario,setMessage}){
  const [editando,setEditando] = useState(false);
  const handleSubmit = (e)=>{
    setEditando(false);
    editarUsuario({
      _id:e.target._id.value,
      nombre:e.target.nombre.value,
      apellido:e.target.apellido.value,
      correo:e.target.correo.value,
      rol:e.target.rol.value,
      telefono:e.target.telefono.value,
      direccion:e.target.direccion.value,
    },Number(e.target.key.value)); 
    setMessage("El Usuario se ha editado exitosamente");
    setTimeout(() => setMessage(''), 5000);
  }
  return (
    <li key={index}>
      {editando ? 
        <form className="grid grid-areas-info-usuario grid-cols-info-usuario grid-rows-info-usuario p-[5px] relative gap-[5px] font-permark text-[12px] bg-cl2 border-cl3 overflow-hidden rounded-lg w-[283px] h-[262px]" onSubmit={handleSubmit}>
          <input type="hidden" id="key" name="key" defaultValue={index} />
          <input type="hidden" id="_id" name="_id" defaultValue={usuario._id} />
          {/*<input type="text" id="imagen" name="imagen" className="grid-in-imagen" defaultValue={usuario.imagen}/>*/}
          <input type="text" id="nombre" name="nombre" placeholder="Nombre" className="grid-in-nombre overflow-hidden" defaultValue={usuario.nombre}/>
          <input type="text" id="apellido" name="apellido" placeholder="Apellido" className="grid-in-apellido flex justify-content-center items-center text-center" defaultValue={usuario.apellido}/>
          <input type="text" id="correo" name="correo" placeholder="Correo" className="grid-in-correo" defaultValue={usuario.correo}/>
          <select id="rol" name="rol" className="grid-in-rol" >
            <option value="administrador" selected={usuario.rol == "administrador"}>Administrador</option>
            <option value="usuario" selected={usuario.rol == "usuario"}>Usuario</option>
          </select>
          <input type="text" id="telefono" name="telefono" placeholder="Telefono" className="grid-in-telefono" defaultValue={usuario.telefono}/>
          <input type="text" id="direccion" name="direccion" placeholder="Dirección" className="grid-in-direccion" defaultValue={usuario.direccion}/>
          <div className="absolute top-0 right-0 flex flex-row gap-[10px]">
            <button type="submit" className="all-unset" >
              <CheckLogo classN="text-cl5 fill-current w-[20px] cursor-pointer hover:text-cl4"/>
            </button>
            <CloseLogo handlerClick={()=>setEditando(false)} classN="text-cl5 fill-current w-[20px] cursor-pointer hover:text-cl4" />
          </div>
        </form>
          :
      <div className="grid grid-areas-info-usuario grid-cols-info-usuario grid-rows-info-usuario p-[5px] relative gap-[5px] font-permark text-[12px] bg-cl2 border-cl3 overflow-hidden rounded-lg w-[283px] h-[262px]">
        <div id="botonesUsuario" className="absolute top-0 right-0 flex flex-row gap-[10px]" >
          <EditLogo handlerClick={()=>setEditando(true)} classN="text-cl5 fill-current w-[20px] cursor-pointer hover:text-cl4" />
        </div>
        {/*usuario.imagen != "" ?  <img src={usuario.imagen} className="grid-in-imagen w-full h-full" /> : <PackagesLogo classN="text-cl5 fill-current grid-in-imagen w-full h-full" /> */}
          <span className="grid-in-nombre" >{usuario.nombre}</span>
          <span className="grid-in-apellido" >{usuario.apellido}</span>
          <span className="grid-in-correo" >{usuario.correo}</span>
          <span className="grid-in-rol" >{usuario.rol}</span>
          <span className="grid-in-telefono" >{usuario.telefono}</span>
          <span className="grid-in-direccion" >{usuario.direccion}</span>
      </div>
        }
    </li>
  )
}

export default Usuario
