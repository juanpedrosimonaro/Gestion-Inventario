import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(null);
  const [usuarioData, setUsuarioData] = useState(null);
  const navigate = useNavigate();

  const login = async (correo, contrasena) => {
    try {
      const response = await axios.post('/api/auth/login', { correo, contrasena });
      if (response.data.accessToken) {
        const token = response.data.accessToken;
        setAuthToken(token);
        // Decodificar el JWT para obtener el rol del usuario
        const usuario = jwtDecode(token)//JSON.parse(atob(token.split('.')[1]));
        setUsuarioData(usuario);
        navigate(`/${usuario.rol}`, {replace:true})

      }
    } catch (error) {
      console.error('Error de autenticación', error);
    }
  };

  const registro = async (correo, nombre, apellido, contrasena) => {
    try {
      const response = await axios.post('/api/auth/registro',{correo, nombre, apellido, contrasena})
      const token = response.data.accessToken;
      setAuthToken(token);
      // Decodificar el JWT para obtener el rol del usuario
      const usuario = jwtDecode(token)//JSON.parse(atob(token.split('.')[1]));
      setUsuarioData(usuario);
      navigate("/usuario", {replace:true});
    } catch (error) {
      console.error('Error en el registro', error);
    }

  };

  const logout = () => {
    setAuthToken(null);
    setUsuarioData(null);
  };

  const value = {
    authToken,
    usuarioData,
    login,
    registro,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
