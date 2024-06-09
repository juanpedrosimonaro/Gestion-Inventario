import {useEffect} from 'react';
import {useAuth} from './AuthProvider';
import Usuario from './Usuario.jsx';
import PlusLogo from './PlusLogo.jsx';
import axios from 'axios'

function ListaUsuarios({usuarios,setUsuarios,/*busqueda,opcionesBusqueda,*/setMessage}){

  const { usuarioData, authToken } = useAuth();

  const editarUsuario = (usuarioEditado,index)=>{ axios.put(`/api/usuario/${usuarioEditado._id}`,usuarioEditado,{headers: {"Authorization": `Bearer ${authToken}`}}).then(res=>{ 
      setUsuarios(prevUsuarios=>[...prevUsuarios.slice(0,index),res.data,...prevUsuarios.slice(index+1)]);
      setMessage("El Usuario se ha editado exitosamente");
      setTimeout(() => setMessage(''), 5000);
    }).catch(e=>setError(e))
  }

/*
  const eliminarUsuario = (index)=>{
    setUsuarios([...usuarios.slice(0,index),...usuarios.slice(index+1)]);
    setMessage("El Usuario se ha borrado exitosamente");
    setTimeout(() => setMessage(''), 5000);
  }

  const handleSubmit = (e)=>{
    e.preventDefault()
    setUsuarios([...usuarios,{
      nombre:e.target.nombre.value,
      apellido:e.target.apellido.value,
      correo:e.target.correo.value,
      rol:e.target.rol.value,
      telefono:e.target.telefono.value,
      direccion:e.target.direccion.value,
    }])
    e.target.nombre.value="";
    e.target.apellido.value="";
    e.target.correo.value="";
    e.target.rol.value="";
    e.target.telefono.value="";
    e.target.direccion.value="";
    setMessage("El Usuario se ha agregado exitosamente");
    setTimeout(() => setMessage(''), 5000);
  }*/

  // filtrar opcionesBusqueda
  //var filteredResult = usuarios.filter(usuario=>usuario.titulo.toLowerCase().includes(busqueda.toLowerCase())) .filter(usuario=>Object.keys(opcionesBusqueda).reduce((prev,cur)=> prev && opcionesBusqueda[cur].some(op=>cur != "categoria" ? op.max >= usuario[cur] && op.min <= usuario[cur] : op == usuario[cur]),true));

  return (
    <ul className="flex flex-row flex-wrap w-[968px] p-[30px] gap-[25px]">
      {/*filteredResult*/usuarios.length != 0 ? /*filteredResult*/usuarios.map((usuario,index)=>(<Usuario usuario={usuario} index={index} editarUsuario={editarUsuario} setMessage={setMessage} />)) : <li key="no-result">No hay resultados que mostrar</li>} 
    </ul>
  )

}

export default ListaUsuarios
