import React from "react";
import FormAdmin from "../components/Form/FormAdmin";
import { Container } from "react-bootstrap";

const AdminCreateUpdateProduct = () => {
  const idParams = new URLSearchParams(location.search).get("id");
  return (
    <>
      <h2 className="text-center mt-5">
        {idParams ? "Editar Producto" : "Crear Producto"}
      </h2>
      <Container className="d-flex justify-content-center my-5">
        <FormAdmin />
      </Container>
    </>
  );
};

export default AdminCreateUpdateProduct;
