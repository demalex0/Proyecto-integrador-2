import { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import Swal from "sweetalert2";

const UserCartPage = () => {
  const [productos, setProductos] = useState([]);

  const obtenerProductos = () => {
    const productosLs = JSON.parse(localStorage.getItem("carrito")) || [];
    const productosConCantidad = productosLs.map((producto) => ({
      ...producto,
      cantidad: producto.cantidad || 1,
    }));
    setProductos(productosConCantidad);
  };

  const handleChangeQuantity = (id, value) => {
    const productosActualizados = productos.map((producto) =>
      producto.id === id ? { ...producto, cantidad: Number(value) } : producto
    );
    setProductos(productosActualizados);

    localStorage.setItem("carrito", JSON.stringify(productosActualizados));
  };

  const eliminarProductorCarrito = (idProducto) => {
    Swal.fire({
      title: "Estas seguro que quieres eliminar este producto?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, estoy seguro!",
      cancelButtonText: "No, quiero eliminarlo!",
    }).then((result) => {
      if (result.isConfirmed) {
        const productosLs = JSON.parse(localStorage.getItem("carrito")) || [];
        const carritoActualizado = productosLs.filter(
          (prod) => prod.id !== idProducto
        );
        localStorage.setItem("carrito", JSON.stringify(carritoActualizado));

        obtenerProductos();

        Swal.fire({
          title: "Producto Eliminado con exito del carrito",
          icon: "success",
        });
      }
    });
  };

  const handleClickPay = (ev) => {
    ev.preventDefault();
    Swal.fire({
      title: "Gracias por tu compra!",
      text: "Te enviaremo por mail el comprobante de tu compra",
      icon: "success",
    });
  };

  useEffect(() => {
    obtenerProductos();
  }, []);

  let totalFinal = 0;
  for (let i = 0; i < productos.length; i++) {
    totalFinal += productos[i].price * productos[i].cantidad;
  }

  return (
    <>
      {productos.length ? (
        <Container className="my-5">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Precio</th>
                <th>Cantidad</th>
                <th>Total</th>
                <th>eliminar</th>
              </tr>
            </thead>
            <tbody>
              {productos.map((producto, i) => (
                <tr key={producto.id}>
                  <td>{i + 1}</td>
                  <td className="w-25">{producto.title}</td>
                  <td>${producto.price}</td>
                  <td className="w-25">
                    <input
                      type="number"
                      className="w-25"
                      value={producto.cantidad}
                      onChange={(ev) =>
                        handleChangeQuantity(producto.id, ev.target.value)
                      }
                    />
                  </td>
                  <td>${(producto.price * producto.cantidad).toFixed(2)}</td>
                  <td className="text-ceter">
                    <Button
                      variant="danger"
                      onClick={() => eliminarProductorCarrito(producto.id)}
                    >
                      Eliminar
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <h4 className="text-end text-danger fw-bold">
            Total Final: ${totalFinal.toFixed(2)}
          </h4>
          <Button onClick={handleClickPay}>Comprar</Button>
        </Container>
      ) : (
        <h1 className="text-center">
          No hay productos cargados en el carrito todavia
        </h1>
      )}
    </>
  );
};

export default UserCartPage;
