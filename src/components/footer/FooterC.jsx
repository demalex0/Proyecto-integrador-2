import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import "./FooterC.css";

const Footer = () => {
  return (
    <footer className="footer py-4">
      <Container>
        <Row className="text-center">
          <Col>
            <h5>Síguenos en nuestras redes sociales</h5>
            <div className="d-flex justify-content-center">
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                cclassName="facebook-icon"
              >
                <FaFacebook size={30} />
              </a>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="instagram-icon"
              >
                <FaInstagram size={30} />
              </a>
              <a
                href="https://www.twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="twitter-icon"
              >
                <FaTwitter size={30} />
              </a>
              <a
                href="https://www.youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="youtube-icon"
              >
                <FaYoutube size={30} />
              </a>
            </div>
          </Col>
        </Row>
        <Row className="mt-3 text-center">
          <Col>
            <p>&copy; 2025 Todos los derechos reservados.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
