import { Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { Link, useNavigate } from "react-router";
import Swal from "sweetalert2";

const TableC = ({ array, idPage, funcionReseteador }) => {
  const navigate = useNavigate();

  const validarSesion = () => {
    const usuarioLog = JSON.parse(sessionStorage.getItem("usuarioLogeado"));

    if (!usuarioLog) {
      Swal.fire({
        title: "Debes iniciar sesión",
        icon: "info",
      });

      setTimeout(() => {
        navigate("/login");
      }, 500);
      return false;
    }
    return true;
  };

  const borrarProducto = (idProducto) => {
    if (!validarSesion()) return;

    Swal.fire({
      title: "¿Estás seguro de que quieres eliminar este producto?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        const productosLs = JSON.parse(localStorage.getItem("productos")) || [];
        const productosActualizados = productosLs.filter(
          (producto) => producto.id !== idProducto
        );

        localStorage.setItem(
          "productos",
          JSON.stringify(productosActualizados)
        );
        funcionReseteador();

        Swal.fire("Producto eliminado con éxito", "", "success");
      }
    });
  };

  const deshabilitarHabilitarProducto = (idProducto) => {
    if (!validarSesion()) return;

    const productosLs = JSON.parse(localStorage.getItem("productos")) || [];
    const productosActualizados = productosLs.map((producto) =>
      producto.id === idProducto
        ? {
            ...producto,
            status: producto.status === "enable" ? "disabled" : "enable",
          }
        : producto
    );

    localStorage.setItem("productos", JSON.stringify(productosActualizados));
    funcionReseteador();
    Swal.fire({
      title: `Producto ${
        productosActualizados.find((prod) => prod.id === idProducto).status ===
        "enable"
          ? "habilitado"
          : "deshabilitado"
      } con éxito!`,
      icon: "success",
    });
  };

  const renderFila = (element, index) => (
    <tr key={element.id}>
      <td>{index + 1}</td>
      {idPage === "products" ? (
        <>
          <td className="w-25">{element.title}</td>
          <td className="w-25">{element.description}</td>
          <td className="text-center">${element.price}</td>
          <td>
            <img src={element.image} alt={element.description} width={50} />
          </td>
        </>
      ) : (
        <>
          <td>{element.nombreUsuario}</td>
          <td className="w-25">{element.emailUsuario}</td>
          <td>{element.rol}</td>
        </>
      )}
      <td>
        <Button variant="danger" onClick={() => borrarProducto(element.id)}>
          Eliminar
        </Button>
        <Button
          className="mx-2"
          variant={element.status === "enable" ? "warning" : "info"}
          onClick={() => deshabilitarHabilitarProducto(element.id)}
        >
          {element.status === "enable" ? "Deshabilitar" : "Habilitar"}
        </Button>
        <Link
          to={
            JSON.parse(sessionStorage.getItem("usuarioLogeado"))
              ? `/admin/products/createUpdate?id=${element.id}`
              : "#"
          }
          className="btn btn-success"
        >
          Editar
        </Link>
      </td>
    </tr>
  );

  return (
    <Table striped bordered hover size="sm">
      <thead>
        <tr>
          {idPage === "products" ? (
            <>
              <th>ID</th>
              <th>Nombre</th>
              <th>Descripcion</th>
              <th>Precio</th>
              <th>Imagen</th>
              <th>Acciones</th>
            </>
          ) : (
            <>
              <th>ID</th>
              <th>Nombre</th>
              <th>Email</th>
              <th>Rol</th>
              <th>Acciones</th>
            </>
          )}
        </tr>
      </thead>
      <tbody>{array.map((element, i) => renderFila(element, i))}</tbody>
    </Table>
  );
};

export default TableC;
