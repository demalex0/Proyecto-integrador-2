import { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router";
import Swal from "sweetalert2";

const ProductDetail = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [producto, setProducto] = useState({});
  const productosLs = JSON.parse(localStorage.getItem("productos")) || [];

  const buscarProducto = () => {
    const productoFiltrado = productosLs.find(
      (producto) => producto.id === Number(params.id)
    );
    setProducto(productoFiltrado);
  };

  const agregarProductoCarrito = () => {
    const usuarioLogeado =
      JSON.parse(sessionStorage.getItem("usuarioLogeado")) || null;
    const carritoLs = JSON.parse(localStorage.getItem("carrito")) || [];

    if (!usuarioLogeado) {
      Swal.fire({
        icon: "info",
        title: "Debes iniciar sesión para poder comprar",
        text: "En breve serás redirigido a iniciar tu sesión",
      });
      setTimeout(() => {
        navigate("/login");
      }, 500);
      return;
    }

    const productoExisteCarrito = carritoLs.find(
      (prod) => prod.id === Number(params.id)
    );

    if (productoExisteCarrito) {
      Swal.fire({
        icon: "info",
        title: "El producto ya existe en el carrito",
        text: "Para modificar la cantidad, debes ir al carrito",
      });
      return;
    }

    carritoLs.push(producto);
    localStorage.setItem("carrito", JSON.stringify(carritoLs));
    Swal.fire({
      icon: "success",
      title: "Producto añadido al carrito con éxito",
      text: "Puedes ajustar la cantidad desde el carrito.",
    });
  };

  const comprarProductoMP = () => {
    const usuarioLogeado =
      JSON.parse(sessionStorage.getItem("usuarioLogeado")) || null;

    if (!usuarioLogeado) {
      Swal.fire({
        icon: "info",
        title: "Debes iniciar sesión para poder comprar",
        text: "En breve serás redirigido a iniciar tu sesión",
      });
      setTimeout(() => {
        navigate("/login");
      }, 500);
      return;
    }

    Swal.fire({
      icon: "success",
      title: "Compra realizada con éxito",
      text: "Gracias por tu compra, revisa los detalles en tu cuenta.",
    });
  };

  useEffect(() => {
    buscarProducto();
  }, []);

  return (
    <>
      <Container className="my-5">
        <Row>
          <Col sm="12" md="6" className="col-img-detalle-producto text-center">
            <img
              src={producto.image}
              alt={producto.description}
              style={{ maxWidth: "100%", height: "auto" }}
            />
          </Col>
          <Col sm="12" md="6">
            <h2>{producto.title}</h2>
            <p>Código: {producto.id}</p>
            <p>Categoría: {producto.categoria}</p>
            <p>Precio: ${producto.price}</p>
            <p>Descripción: {producto.description}</p>
            <p>Stock Disponible: {producto.stock}</p>
            <Button
              className="mx-3"
              variant="warning"
              onClick={agregarProductoCarrito}
            >
              Agregar al Carrito
            </Button>
            <Button
              variant="success"
              size="lg"
              className="py-1"
              onClick={comprarProductoMP}
            >
              Comprar
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ProductDetail;
