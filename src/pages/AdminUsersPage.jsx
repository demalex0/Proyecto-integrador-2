import React, { useEffect, useState } from "react";
import TableC from "../components/table/TableC";
import { Container } from "react-bootstrap";
import { Link } from "react-router";

const AdminUsersPage = () => {
  const [usuarios, setUsuarios] = useState([]);
  const usuarioLog = JSON.parse(sessionStorage.getItem("usuarioLogeado"));

  const obtenerUsuarios = () => {
    const usuariosLs = JSON.parse(localStorage.getItem("usuarios")) || [];
    setUsuarios(usuariosLs);
  };

  useEffect(() => {
    obtenerUsuarios();
  }, []);

  if (!usuarioLog || usuarioLog.rol !== "admin") {
    return (
      <Container className="text-center my-5">
        <h1 className="text-danger">No tienes acceso a esta página.</h1>
        <Link className="btn btn-secondary" to="/">
          Volver al Inicio
        </Link>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <div className="d-flex justify-content-end mb-3">
        <Link
          className="btn btn-primary btn-sm w-auto"
          to="/admin/users/create"
        >
          Agregar Usuario
        </Link>
      </div>

      <TableC
        array={usuarios}
        idPage="users"
        funcionReseteador={obtenerUsuarios}
      />
    </Container>
  );
};

export default AdminUsersPage;
