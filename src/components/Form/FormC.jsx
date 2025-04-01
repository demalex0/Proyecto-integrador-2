import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./FormC.css";
import { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

const FormC = ({ idPage }) => {
  const navigate = useNavigate();
  const [errores, setErrores] = useState({});

  const [registro, setRegistro] = useState({
    usuario: "",
    email: "",
    contrasenia: "",
    repContrasenia: "",
    check: false,
  });

  const [inicioSesion, setInicioSesion] = useState({
    usuario: "",
    contrasenia: "",
  });

  const handleChangeFormRegister = (ev) => {
    const value =
      ev.target.type === "checkbox" ? ev.target.checked : ev.target.value;
    setRegistro({ ...registro, [ev.target.name]: value });
  };

  const registroUsuario = (ev) => {
    ev.preventDefault();
    const { usuario, email, contrasenia, repContrasenia, check } = registro;
    let nuevoError = {};

    if (!usuario) {
      nuevoError.usuario = "Campo Usuario vacío.";
    }

    if (usuario && email && contrasenia && repContrasenia && check) {
      if (contrasenia === repContrasenia) {
        const usuariosLs = JSON.parse(localStorage.getItem("usuarios")) || [];

        const rol = email.includes("admin") ? "admin" : "usuario";

        const nuevoUsuario = {
          id: usuariosLs[usuariosLs.length - 1]?.id + 1 || 1,
          nombreUsuario: usuario,
          emailUsuario: email,
          contrasenia,
          tyc: check,
          rol,
          login: false,
          status: "enable",
        };

        usuariosLs.push(nuevoUsuario);
        localStorage.setItem("usuarios", JSON.stringify(usuariosLs));

        Swal.fire({
          title: "Registro exitoso",
          text: "Serás redirigido al inicio de tu sesión.",
          icon: "success",
        });

        setRegistro({
          usuario: "",
          email: "",
          contrasenia: "",
          repContrasenia: "",
          check: false,
        });

        setTimeout(() => {
          navigate("/login");
        }, 1000);
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Las contraseñas no coinciden.",
        });
      }
    }
    setErrores(nuevoError);
  };

  const handleChangeFormLogin = (ev) => {
    setInicioSesion({ ...inicioSesion, [ev.target.name]: ev.target.value });
  };

  const iniciarSesionUsuario = (ev) => {
    ev.preventDefault();
    const usuariosLs = JSON.parse(localStorage.getItem("usuarios")) || [];
    const { usuario, contrasenia } = inicioSesion;

    const usuarioExiste = usuariosLs.find(
      (user) => user.nombreUsuario === usuario
    );

    if (!usuarioExiste) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Usuario y/o contraseña incorrectos.",
      });
      return;
    }

    if (usuarioExiste.contrasenia === contrasenia) {
      usuarioExiste.login = true;
      localStorage.setItem("usuarios", JSON.stringify(usuariosLs));
      sessionStorage.setItem("usuarioLogeado", JSON.stringify(usuarioExiste));

      if (usuarioExiste.rol === "usuario") {
        navigate("/user");
      } else if (usuarioExiste.rol === "admin") {
        navigate("/admin");
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Rol desconocido. Contacta al administrador.",
        });
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Usuario y/o contraseña incorrectos.",
      });
    }
  };

  return (
    <Container className="d-flex justify-content-center my-5 vh-100">
      <Form className="w-25">
        <Form.Group className="mb-3" controlId="formBasicUsuario">
          <Form.Label>Nombre del Usuario</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingresa un nombre de usuario."
            value={
              idPage === "register" ? registro.usuario : inicioSesion.usuario
            }
            onChange={
              idPage === "register"
                ? handleChangeFormRegister
                : handleChangeFormLogin
            }
            name="usuario"
            className={
              errores.usuario ? "form-control is-invalid" : "form-control"
            }
          />
          {errores.usuario && (
            <Form.Text className="text-danger">{errores.usuario}</Form.Text>
          )}
        </Form.Group>

        {idPage === "register" && (
          <>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email del Usuario</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Ingresa tu email."
                value={registro.email}
                onChange={handleChangeFormRegister}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                placeholder="Coloca una contraseña."
                name="contrasenia"
                value={registro.contrasenia}
                onChange={handleChangeFormRegister}
                className={
                  errores.contrasenia
                    ? "form-control is-invalid"
                    : "form-control"
                }
              />
              {errores.contrasenia && (
                <Form.Text className="text-danger">
                  {errores.contrasenia}
                </Form.Text>
              )}
              <ul className="lista-contrasenia">
                <li>Debe incluir una letra mayúscula.</li>
                <li>Debe incluir una letra minúscula.</li>
                <li>Debe incluir un número.</li>
                <li>Debe incluir un carácter especial (@, $, +).</li>
              </ul>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicRepPassword">
              <Form.Label>Repetir Contraseña</Form.Label>
              <Form.Control
                type="password"
                placeholder="Repite tu contraseña."
                name="repContrasenia"
                value={registro.repContrasenia}
                onChange={handleChangeFormRegister}
                className={
                  errores.repContrasenia
                    ? "form-control is-invalid"
                    : "form-control"
                }
              />
              {errores.repContrasenia && (
                <Form.Text className="text-danger">
                  {errores.repContrasenia}
                </Form.Text>
              )}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check
                type="checkbox"
                label="Aceptar términos y condiciones."
                name="check"
                checked={registro.check}
                onChange={handleChangeFormRegister}
              />
            </Form.Group>
          </>
        )}

        {idPage === "login" && (
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              type="password"
              placeholder="Coloca una contraseña."
              name="contrasenia"
              value={inicioSesion.contrasenia}
              onChange={handleChangeFormLogin}
              className={
                errores.contrasenia ? "form-control is-invalid" : "form-control"
              }
            />
            {errores.contrasenia && (
              <Form.Text className="text-danger">
                {errores.contrasenia}
              </Form.Text>
            )}
          </Form.Group>
        )}

        <Button
          variant="primary"
          type="submit"
          onClick={
            idPage === "register" ? registroUsuario : iniciarSesionUsuario
          }
        >
          {idPage === "register" ? "Registrar" : "Iniciar Sesión"}
        </Button>
      </Form>
    </Container>
  );
};

export default FormC;
