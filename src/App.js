import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import { useEffect, useState } from "react";
import Comida from "./Comida";
import { ButtonGroup } from "react-bootstrap";
import TablaMenuHorizontal from "./TablaMenuHorizontal";

const apiUrl = process.env.REACT_APP_API_URL;

function App() {
  const [comidas, setComidas] = useState(null);


  const [comidaSeleccionada, setComidaSeleccionada] = useState();
  const [mostrarDatos, setMostrarDatos] = useState(false);

  const cargarMenuDesdeBackend = () => {
    fetch(`${apiUrl}/Planes/Generar`)
      .then((response) => response.json())
      .then((data) => {
        setComidas(data);
        localStorage.setItem("comidas", JSON.stringify(data));
      })
      .catch((error) => {
        console.error("Error al cargar el menú", error);
      });
  };

  useEffect(() => {
    const comidasLocal = localStorage.getItem("comidas");
    if (comidasLocal) {
      setComidas(JSON.parse(comidasLocal));
    } else {
      cargarMenuDesdeBackend();
    }
  }, []);

  const onRehacerMenu = async (dia, tipo) => {
    const nuevoMenu = await cambiarComidaEnServidor(comidas.id, dia, tipo);
    if (nuevoMenu) {
      setComidas(nuevoMenu);
    } else {
      alert("No se pudo cambiar la comida");
    }
  };

  const cambiarComidaEnServidor = async (menuId, dia, comida) => {
    try {
      const response = await fetch(`${apiUrl}/Planes/cambiarComida/${menuId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ dia, comida }),
      });
      const dataActualizada = await response.json();
      return dataActualizada;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const seleccionarComida = (datosComida) => {
    setComidaSeleccionada(datosComida);
    setMostrarDatos(true);
  };

  return (
    <Container className="p-0 mx-auto mt-2 m-0">
      <Row className="text-center w-100">
        <Col xs={4} md={6}>
          <h1>Genera tu menu</h1>
        </Col>
        <Col xs={3} md={3} className="m-auto">
          <Button variant="outline-success">
            Agregar Comida
          </Button>
        </Col>
        <Col xs={3} md={3} className="m-auto">
          <Button variant="outline-success" onClick={cargarMenuDesdeBackend}>
            Actualizar Menu
          </Button>
        </Col>
      </Row>

      <Row>
        <Col className="m-4">
          {comidas && (
            <TablaMenuHorizontal
              menu={comidas}
              onRehacerMenu={onRehacerMenu}
              onSeleccionarComida={seleccionarComida}
            />
          )}
        </Col>
      </Row>

      <Row>
        <Col className="m-0 p-0">
          {mostrarDatos && comidaSeleccionada && (
            <Comida
              datosComida={comidaSeleccionada}
              show={mostrarDatos}
              onHide={() => setMostrarDatos(false)}
            />
          )}
        </Col>
      </Row>
      <style type="text/css">
        {`
        .seleccionable{
          cursor: pointer;
        }
        .fondoGris{
          background: #21130d;
        }
        `}
      </style>
    </Container>
  );
}

export default App;
