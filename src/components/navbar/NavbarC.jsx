import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink, useNavigate } from "react-router";
import "bootstrap/dist/css/bootstrap.min.css";
import "./NavbarC.css";

const NavbarC = () => {
  const usuarioLog = JSON.parse(sessionStorage.getItem("usuarioLogeado"));
  const navigate = useNavigate();

  const logoutUser = () => {
    const usuariosLs = JSON.parse(localStorage.getItem("usuarios")) || [];
    const usuario = usuariosLs.find((user) => user.id === usuarioLog.id);
    if (usuario) {
      usuario.login = false;
      localStorage.setItem("usuarios", JSON.stringify(usuariosLs));
    }
    sessionStorage.removeItem("usuarioLogeado");

    setTimeout(() => {
      navigate("/");
    }, 1000);
  };

  return (
    <>
      <Navbar expand="lg" className="navbar">
        <Container fluid>
          <NavLink
            to={
              usuarioLog?.rol === "usuario"
                ? "/user"
                : usuarioLog?.rol === "admin"
                ? "/admin"
                : "/"
            }
            className="navbar-brand"
          >
            <img
              src="./img/logo3.png"
              alt="logo"
              width="100"
              className="logo-hover"
            />
          </NavLink>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            {usuarioLog ? (
              usuarioLog.rol === "usuario" ? (
                <Nav className="ms-auto">
                  <NavLink className="nav-link" to="/user">
                    Inicio
                  </NavLink>
                  <NavLink className="nav-link" to="/user/cart">
                    Carrito
                  </NavLink>
                  <NavLink className="nav-link" to="/user/fav">
                    Favoritos
                  </NavLink>
                  <NavLink className="nav-link" to="/user/galery">
                    Galería
                  </NavLink>
                </Nav>
              ) : usuarioLog.rol === "admin" ? (
                <Nav className="ms-auto">
                  <NavLink className="nav-link" to="/admin">
                    Inicio
                  </NavLink>
                  <NavLink className="nav-link" to="/admin/users">
                    Panel Usuario
                  </NavLink>
                  <NavLink className="nav-link" to="/admin/products">
                    Panel Productos
                  </NavLink>
                  <NavLink className="nav-link" to="/user">
                    Vista Usuario
                  </NavLink>
                </Nav>
              ) : null
            ) : (
              <Nav className="ms-auto">
                <NavLink className="nav-link" to="/">
                  Inicio
                </NavLink>
                <NavLink className="nav-link" to="/aboutUs">
                  Sobre Nosotros
                </NavLink>
                <NavLink className="nav-link" to="/contact">
                  Contacto
                </NavLink>
              </Nav>
            )}

            {usuarioLog ? (
              <Nav className="ms-auto">
                <NavLink className="nav-link" to="#" onClick={logoutUser}>
                  Cerrar Sesión
                </NavLink>
              </Nav>
            ) : (
              <Nav className="ms-auto">
                <NavLink className="nav-link" to="/login">
                  Iniciar Sesión
                </NavLink>
                <NavLink className="nav-link" to="/register">
                  Registrarse
                </NavLink>
              </Nav>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default NavbarC;
