import Card from "react-bootstrap/Card";
import { Link } from "react-router";
import "./CardC.css";

const CardC = ({ urlImage, alt, titulo, description, idProducto, precio }) => {
  return (
    <>
      <Card>
        <Card.Img variant="top" src={urlImage} alt={alt} />
        <Card.Body>
          <Card.Title className="text-truncate">{titulo}</Card.Title>
          <Card.Text>${precio}</Card.Text>
          <Card.Text className="text-truncate">{description}</Card.Text>
          <div className="text-center">
            <Link
              to={`/productDetail/${idProducto}`}
              className="btn btn-primary"
            >
              Ver Mas
            </Link>
          </div>
        </Card.Body>
      </Card>
    </>
  );
};

export default CardC;
