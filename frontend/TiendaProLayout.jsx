import { useState, useEffect } from 'react';
import Logo from './Logo.jsx';
import FilterLogo from './FilterLogo.jsx';
import PackagesLogo from './PackagesLogo.jsx';
import EditLogo from './EditLogo.jsx';
import TrashLogo from './TrashLogo.jsx';
import MenuFiltro from './MenuFiltro.jsx';
import ListaProductos from './ListaProductos.jsx';
import ListaUsuarios from './ListaUsuarios.jsx';
import useLocalStorage from './useLocalStorage.jsx';
import useNotification from './useNotification.jsx';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useAuth } from './AuthProvider.jsx';

function TiendaProLayout({modo="producto"}) {
  const [productos,setProductos] = useState([]) //useLocalStorage("productos");
  const [usuarios,setUsuarios] = useState([])
  const [opcionesFiltro,setOpcionesFiltro] = useState({});
  const [busqueda,setBusqueda] = useState("");
  const [criterio,setCriterio] = useState("titulo");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const Notification = useNotification(message)
  const ErrorNotification = useNotification(error,"error");
  const { usuarioData, authToken } = useAuth();

  useEffect(()=>{
    if(modo == "producto" && productos.length == 0){
      axios.get("/api/productos").then(res=>setProductos(res.data)).catch(e=>setError(e));
    }
    if(usuarioData != null && usuarioData.rol == "administrador" ){
      axios.get("/api/usuarios",{headers: {"Authorization": `Bearer ${authToken}`}}).then(res=>setUsuarios(res.data)).catch(e=>setError(e))
    }
  }
  ,[])

  return (
    <>
      <div className="flex flex-row place-content-center gap-[20px] items-center">
        <Logo classN="text-cl5 fill-current w-[92px]" />
        <h1 className="text-[40px] font-permark text-cl5">TiendaPro</h1>
        <input type="text" placeholder="Buscar..." className="bg-cl3 text-cl5 justify-self-end relative w-[150px] placeholder-cl5" value={busqueda} onChange={(e)=>setBusqueda(e.target.value)} /> 
        <select onChange={(e)=>setCriterio(e.target.value)} >
          <option value="titulo" selected={true}>Titulo</option>
          <option value="descripcion" >Descripcion</option>
          <option value="categoria" >Categoria</option>
        </select>
        {usuarioData != null ?  (<><Link to="/logout">Cerrar Sesión</Link>{usuarioData.rol=="administrador" && ( modo=="producto" ? (<Link to="/administrador/gestionUsuarios">Gestionar Usuarios</Link>) : (<Link to="/administrador/gestionProductos">Gestionar Productos</Link>))}</>) : (<><Link to="/login">Iniciar Sesión</Link><Link to="/registro">Registrarse</Link></>) }
      </div>
      <div className="flex flex-row gap-[20px] justify-center items-start">
        { modo == "producto" && productos.length != 0 ? (
          <>
            <FilterLogo classN="text-cl5 hidden fill-current" />
            <MenuFiltro productos={productos} opcionesFiltro={opcionesFiltro} setOpcionesFiltro={setOpcionesFiltro}  /> 
            <ListaProductos productos={productos} setProductos={setProductos} setMessage={setMessage} setError={setError} busqueda={busqueda} opcionesFiltro={opcionesFiltro} criterio={criterio} />
          </>
        ) : modo == "usuario" && usuarios.length != 0 && (
          <ListaUsuarios usuarios={usuarios} setUsuarios={setUsuarios} setMessage={setMessage} setError={setError} />
        )}
      </div>
      {Notification}
      {ErrorNotification}
    </>
  )
}

export default TiendaProLayout
