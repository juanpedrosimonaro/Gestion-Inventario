import { useState } from 'react';
import Logo from './Logo.jsx';
import useNotification from './useNotification.jsx';
import { useAuth } from './AuthProvider.jsx';

function PaginaRegistro() {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const Notification = useNotification(message)
  const ErrorNotification = useNotification(error,"error")

  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [repeticionCon, setRepeticionCon] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const { registro } = useAuth();

  const handleRegistro = async (event) => {
    event.preventDefault();
    if(contrasena == repeticionCon)
      registro(correo, contrasena, nombre, apellido);
  };


  return (
    <>
      {/*<img src={gestionLogo} className="logo fill-cl3" alt="Gestion logo" />*/}
      <div className="flex flex-row place-content-center gap-[20px] items-center">
        <Logo classN="text-cl5 fill-current w-[92px]" />
        <h1 className="text-[40px] font-permark text-cl5">TiendaPro</h1>
      </div>
      <h1 className="text-[40px] font-permark text-cl5">Registro de Usuario</h1>
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
        <button type="submit">Registrarse</button>
      </form>
      {Notification}
      {ErrorNotification}
    </>
  )
}

export default PaginaRegistro
