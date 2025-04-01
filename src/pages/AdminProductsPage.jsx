import React, { useEffect, useState } from "react";
import TableC from "../components/table/TableC";
import { Container } from "react-bootstrap";
import { Link } from "react-router";

const AdminProductsPage = () => {
  const [productos, setProductos] = useState([]);
  const usuarioLog = JSON.parse(sessionStorage.getItem("usuarioLogeado"));

  const obtenerProductos = () => {
    const productosLs = JSON.parse(localStorage.getItem("productos")) || [];
    setProductos(productosLs);
  };

  useEffect(() => {
    obtenerProductos();
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
          to="/admin/products/createUpdate"
        >
          Agregar Producto
        </Link>
      </div>
      <TableC
        array={productos}
        idPage="products"
        funcionReseteador={obtenerProductos}
      />
    </Container>
  );
};

export default AdminProductsPage;
