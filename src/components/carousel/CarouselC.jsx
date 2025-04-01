import Carousel from "react-bootstrap/Carousel";
import "./CarouselC.css";

const CarouselC = () => {
  return (
    <Carousel fade>
      <Carousel.Item>
        <img src="./img/carrousel1.png" alt="material1" className="w-100" />
        <Carousel.Caption></Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img src="./img/carrousel2.png" alt="material2" className="w-100" />
        <Carousel.Caption></Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img src="./img/carrousel3.png" alt="material3" className="w-100" />
        <Carousel.Caption></Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};

export default CarouselC;
