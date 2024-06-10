import { useState } from 'react';
import Logo from './Logo.jsx';
import useNotification from './useNotification.jsx';
import { useAuth } from './AuthProvider.jsx';

function PaginaLogin() {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const Notification = useNotification(message)
  const ErrorNotification = useNotification(error,"error")
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const { login } = useAuth();

  const handleLogin = async (event) => {
    event.preventDefault();
    login(correo, contrasena);
  };


  return (
    <>
      <div className="flex flex-row place-content-center gap-[20px] items-center">
        <Logo classN="text-cl5 fill-current w-[92px]" />
        <h1 className="text-[40px] font-permark text-cl5">TiendaPro</h1>
      </div>
      <h1 className="text-[40px] font-permark text-cl5">Inicio de Sesión</h1>
      <form className="flex flex-col place-content-center gap-[20px] justify-center items-start" onSubmit={handleLogin}>
        <div>
          <input
            type="text"
            value={correo}
            placeholder="Correo"
            onChange={(e) => setCorreo(e.target.value)}
          />
        </div>
        <div>
          <input
            type="password"
            value={contrasena}
            placeholder="Contraseña"
            onChange={(e) => setContrasena(e.target.value)}
          />
        </div>
        <button type="submit">Iniciar Sesión</button>
      </form>
      {Notification}
      {ErrorNotification}
    </>
  )
}

export default PaginaLogin
