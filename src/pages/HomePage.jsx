import { Col, Container, Row } from "react-bootstrap";
import CarouselC from "../components/carousel/CarouselC";
import CardC from "../components/card/CardC";
import { useEffect, useState } from "react";

const HomePage = () => {
  const [productos, setProductos] = useState([]);

  const productosStatic = [
    {
      id: 1,
      title: "Monitor Gamer Curvo LG Ultragear",
      description:
        "Monitor curvo con resolución QHD 5120x1440, 200Hz, FreeSync Premium Pro.",
      price: 2000000,
      image:
        "https://imagenes.compragamer.com/productos/compragamer_Imganen_general_41065_Monitor_Gamer_Curvo_LG_Ultragear_45GR75DC-B_45__QHD_5120_1440_1500R_200Hz_FreeSync_Premium_Pro_1ms__GtG__395e3fe1-grn.jpg",
      categoria: "Monitores",
      stock: "25",
      status: "enable",
    },
    {
      id: 2,
      title: "Auriculares Logitech Astro A30",
      description: "Auriculares inalámbricos con tecnología Lightspeed.",
      price: 300000,
      image:
        "https://imagenes.compragamer.com/productos/compragamer_Imganen_general_39652_Auriculares_Logitech_Astro_A30_Navy_Red_Wireless_Lightspeed_PC_XBOX_938556f9-grn.jpg",
      categoria: "Auriculares",
      stock: "52",
      status: "enable",
    },
    {
      id: 3,
      title: "Notebook Asus TUF A15 FA507NVR-HQ111W 15.6",
      description:
        "Notebook con procesador R7, 16GB RAM, SSD 1TB, RTX4060, pantalla WQHD IPS 165Hz.",
      price: 1700000,
      image:
        "https://imagenes.compragamer.com/productos/compragamer_Imganen_general_43314_Notebook_Asus_TUF_A15_FA507NVR-HQ111W_15.6__R7-7435HS_16GB_SSD_1TB_RTX4060_WQHD_IPS_165Hz_G-SYNC_Mecha_Gray_Win11__36f22c03-grn.jpg",
      categoria: "Notebooks",
      stock: "45",
      status: "enable",
    },
    {
      id: 4,
      title: "Procesador AMD Ryzen 9",
      description:
        "Procesador con 16 núcleos y tecnología avanzada, sin cooler incluido.",
      price: 500000,
      image:
        "https://imagenes.compragamer.com/productos/compragamer_Imganen_general_44784_Procesador_AMD_Ryzen_9_9950X3D_5.7GHz_Turbo_AM5_-_No_Incluye_Cooler_aad152f9-grn.jpg",
      categoria: "Procesadores",
      stock: "80",
      status: "enable",
    },
    {
      id: 5,
      title: "Placa de Video ASUS ROG RTX 5090",
      description: "Tarjeta gráfica potente de última generación.",
      price: 3000000,
      image:
        "https://imagenes.compragamer.com/productos/compragamer_Imganen_general_44381_Placa_de_Video_ASUS_ROG_GeForce_RTX_5090_32GB_GDDR7_ASTRAL_OC_4f5661fd-grn.jpg",
      categoria: "Placas de video",
      stock: "69",
      status: "enable",
    },
    {
      id: 6,
      title: "Motherboard ASUS ROG STRIX",
      description:
        "Motherboard diseñada para gamers con soporte WiFi integrado.",
      price: 418180,
      image:
        "https://imagenes.compragamer.com/productos/compragamer_Imganen_general_37910_Mother_ASUS_ROG_STRIX_B650E-F_GAMING_WIFI_5f7d216c-grn.jpg",
      categoria: "Motherboards",
      stock: "55",
      status: "enable",
    },
    {
      id: 7,
      title: "Silla Gamer Noblechairs EPIC Fallout Nuka Cola Edition",
      description:
        "La silla Gamer Noblechairs EPIC Fallout Edición Nuka Cola es una edición especial inspirada en el icónico universo de Fallout. Diseñada para ofrecer comodidad y estilo, esta silla combina detalles llamativos con materiales de alta calidad.",
      price: 708000,
      image:
        "https://imagenes.compragamer.com/productos/compragamer_Imganen_general_39444_Silla_Gamer_Noblechairs_EPIC_Fallout_Nuka_Cola_Edition__sin_almohadones___Peso_MAX._120kg__bff4f718-grn.jpg",
      categoria: "Sillas Gamer",
      stock: "15",
      status: "enable",
    },
    {
      id: 8,
      title: "Impresora Multifunción HP LaserJet Pro",
      description:
        "Impresora con funciones avanzadas de copia, escaneo y WiFi.",
      stock: "55",
      price: 526390,
      image:
        "https://imagenes.compragamer.com/productos/compragamer_Imganen_general_41466_Impresora_Multifuncion_HP_LaserJet_Pro_MFP_4103fdw_Imprime_Blanco_y_Negro_Copia_Escanea_WiFi_b3429919-grn.jpg",
      categoria: "Impresoras",
      status: "enable",
    },
  ];

  useEffect(() => {
    const productosExistentes = JSON.parse(localStorage.getItem("productos"));
    if (!productosExistentes || productosExistentes.length === 0) {
      localStorage.setItem("productos", JSON.stringify(productosStatic));
      setProductos(productosStatic);
    } else {
      const productosActivos = productosExistentes.filter(
        (producto) => producto.status !== "disabled"
      );
      setProductos(productosActivos);
    }
  }, []);

  const eliminarProducto = (idProducto) => {
    const productosLs = JSON.parse(localStorage.getItem("productos")) || [];
    const productosActualizados = productosLs.filter(
      (producto) => producto.id !== idProducto
    );

    localStorage.setItem("productos", JSON.stringify(productosActualizados));
    setProductos(
      productosActualizados.filter((producto) => producto.status !== "disabled")
    );
  };

  const deshabilitarProducto = (idProducto) => {
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
    setProductos(
      productosActualizados.filter((producto) => producto.status !== "disabled")
    );
  };

  return (
    <>
      <CarouselC />
      <Container className="my-5">
        <Row>
          {productos.map((producto) => (
            <Col sm="12" md="6" lg="3" key={producto.id} className="my-3">
              <CardC
                urlImage={producto.image}
                alt={producto.description}
                titulo={producto.title}
                descripcion={producto.description}
                precio={producto.price}
                idProducto={producto.id}
                onEliminar={() => eliminarProducto(producto.id)}
                onDeshabilitar={() => deshabilitarProducto(producto.id)}
              />
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default HomePage;
