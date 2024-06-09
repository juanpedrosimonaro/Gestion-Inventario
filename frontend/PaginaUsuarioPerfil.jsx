import { useState, useEffect } from 'react';
import Logo from './Logo.jsx';
import useNotification from './useNotification.jsx';
import { useAuth } from './AuthProvider.jsx';

function PaginaRegistro() {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const Notification = useNotification(message)
  const ErrorNotification = useNotification(error,"error")

  const { usuarioData, login } = useAuth();
  const [correo, setCorreo] = useState(usuarioData.correo);
  const [contrasena, setContrasena] = useState('');
  const [repeticionCon, setRepeticionCon] = useState('');
  const [nombre, setNombre] = useState(usuarioData.nombre);
  const [apellido, setApellido] = useState(usuarioData.apellido);
  const [direccion, setDireccion] = useState(usuarioData.direccion||'');
  const [telefono, setTelefono] = useState(usuarioData.telefono||'');

  const handleRegistro = async (event) => {
    event.preventDefault();
    if(contrasena == repeticionContrasena)
      axios.put(`/api/producto/${usuarioData._id}`,{nombre,apellido,correo,contrasena,direccion,telefono},{headers: {"Authorization": `Bearer ${authToken}`}}).then(res=>login(correo,contrasena)) 
  };


  return (
    <>
      {/*<img src={gestionLogo} className="logo fill-cl3" alt="Gestion logo" />*/}
      <div className="flex flex-row place-content-center gap-[20px] items-center">
        <Logo classN="text-cl5 fill-current w-[92px]" />
        <h1 className="text-[40px] font-permark text-cl5">TiendaPro</h1>
      </div>
      <h1 className="text-[40px] font-permark text-cl5">Editar Perfil</h1>
      <form className="flex flex-col gap-[20px] justify-center items-start" onSubmit={handleRegistro}>
        <input
          type="text"
          value={correo}
          placeholder="Correo"
          onChange={(e) => setCorreo(e.target.value)}
        />
        <input
          type="password"
          value={contrasena}
          placeholder="Contraseña"
          onChange={(e) => setContrasena(e.target.value)}
        />
        <input
          type="password"
          value={repeticionCon}
          placeholder="Repetir Contraseña"
          onChange={(e) => setRepeticionCon(e.target.value)}
        />
        <input
          type="text"
          value={nombre}
          placeholder="Nombre"
          onChange={(e) => setNombre(e.target.value)}
        />
        <input
          type="text"
          value={apellido}
          placeholder="Apellido"
          onChange={(e) => setApellido(e.target.value)}
        />
        <input
          type="text"
          value={direccion}
          placeholder="Direccion"
          onChange={(e) => setDireccion(e.target.value)}
        />
        <input
          type="text"
          value={telefono}
          placeholder="Direccion"
          onChange={(e) => setTelefono(e.target.value)}
        />
        <button type="submit">Editar Perfil</button>
      </form>
      {Notification}
      {ErrorNotification}
    </>
  )
}

export default PaginaRegistro
