import React, {useEffect} from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './AuthProvider';
import RoleBasedRoute from './RoleBasedRoute';
import PaginaLogin from './PaginaLogin';
import PaginaRegistro from './PaginaRegistro';
import PaginaUsuarioPerfil from './PaginaUsuarioPerfil';
import TiendaProLayout from './TiendaProLayout'


const App = () => {
  //const {Logout} = useAuth()
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<TiendaProLayout />} />
          <Route path="/login" element={<PaginaLogin />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/registro" element={<PaginaRegistro />} />

          <Route
            path="/usuario"
            element={
              <RoleBasedRoute allowedRoles={['usuario']}>
                <TiendaProLayout />
              </RoleBasedRoute>
            }
          />
          <Route
            path="/usuario/perfil"
            element={
              <RoleBasedRoute allowedRoles={['usuario']}>
                <PaginaUsuarioPerfil />
              </RoleBasedRoute>
            }
          />
          <Route
            path="/administrador"
            element={
              <RoleBasedRoute allowedRoles={['administrador']}>
                <Navigate to="/administrador/gestionProductos" />
              </RoleBasedRoute>
            }
          />
          <Route
            path="/administrador/gestionProductos"
            element={
              <RoleBasedRoute allowedRoles={['administrador']}>
                <TiendaProLayout modo="producto" />
              </RoleBasedRoute>
            }
          />
          <Route
            path="/administrador/gestionUsuarios"
            element={
              <RoleBasedRoute allowedRoles={['administrador']}>
                <TiendaProLayout modo="usuario" />
              </RoleBasedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

const Logout = () => {
  const { logout } = useAuth();
  useEffect(() =>{
    logout()
  },[logout]);
  return <Navigate to="/" />
}

export default App;
