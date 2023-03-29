import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import { useEffect, useState } from "react";
import Comida from "./Comida";

function App() {
  const [comidas, setComidas] = useState();

  const [menus, setMenus] = useState([]);

  const [comidaSeleccionada, setComidaSeleccionada] = useState();
  const [mostrarDatos, setMostrarDatos] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3000/Comidas")
      .then((response) => response.json())
      .then((comidas) => {
        setComidas(comidas);
      });
    if (JSON.parse(localStorage.getItem("menus")).length > 0) {
      setMenus(JSON.parse(localStorage.getItem("menus")));
    }
  }, []);

  function generarMenu() {
    const menus = [];
    for (let i = 0; i < 14; i++) {
      const id = Math.floor(Math.random() * (comidas.length - 0 + 1) + 0);
      menus.push(comidas[id]);
    }
    setMenus(menus);
    localStorage.setItem("menus", JSON.stringify(menus));
  }

  function rehacerMenu(dia) {
    let idMenu = Math.floor(Math.random() * (comidas.length - 0 + 1) + 0);
    menus.forEach((menuDiario) => {
      if (menuDiario.id === idMenu) {
        idMenu = Math.floor(Math.random() * (comidas.length - 0 + 1) + 0);
      }
    });
    const nuevosMenus = menus.map((c, i) => {
      if (i === dia) {
        return comidas[idMenu];
      } else {
        return c;
      }
    });
    setMenus(nuevosMenus);
    localStorage.setItem("menus", JSON.stringify(menus));
  }

  function mostrarComponente(comida) {
    setMostrarDatos(true);
    setComidaSeleccionada(comida);
  }

  return (
    <Container className="p-0 mx-auto mt-2 m-0">
      <Row className="text-center w-100">
        <Col xs={7} md={8}>
          <h1>Genera tu menu</h1>
        </Col>
        <Col xs={5} md={4} className="m-auto">
          <Button variant="outline-success" onClick={generarMenu}>
            Generar
          </Button>
        </Col>
      </Row>

      <Row>
        <Col className="m-4">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Comidas</th>
                <OverlayTrigger
                  trigger="click"
                  key="bottom lunes"
                  placement="bottom"
                  overlay={
                    <Popover id="popover-positioned-bottom-lun">
                      <Popover.Header as="h3">Rehacer menu</Popover.Header>
                      <Popover.Body>
                        <Row>
                          <Col onClick={() => rehacerMenu(0)}>Almuerzo</Col>
                          <Col onClick={() => rehacerMenu(7)}>Cena</Col>
                        </Row>
                      </Popover.Body>
                    </Popover>
                  }
                >
                  <th>Lunes</th>
                </OverlayTrigger>
                <OverlayTrigger
                  trigger="click"
                  key="bottom martes"
                  placement="bottom"
                  overlay={
                    <Popover id="popover-positioned-bottom-mar">
                      <Popover.Header as="h3">Rehacer menu</Popover.Header>
                      <Popover.Body>
                        <Row>
                          <Col onClick={() => rehacerMenu(1)}>Almuerzo</Col>
                          <Col onClick={() => rehacerMenu(8)}>Cena</Col>
                        </Row>
                      </Popover.Body>
                    </Popover>
                  }
                >
                  <th>Martes</th>
                </OverlayTrigger>
                <OverlayTrigger
                  trigger="click"
                  key="bottom miercoles"
                  placement="bottom"
                  overlay={
                    <Popover id="popover-positioned-bottom-mie">
                      <Popover.Header as="h3">Rehacer menu</Popover.Header>
                      <Popover.Body>
                        <Row>
                          <Col onClick={() => rehacerMenu(2)}>Almuerzo</Col>
                          <Col onClick={() => rehacerMenu(9)}>Cena</Col>
                        </Row>
                      </Popover.Body>
                    </Popover>
                  }
                >
                  <th>Miercoles</th>
                </OverlayTrigger>
                <OverlayTrigger
                  trigger="click"
                  key="bottom jueves"
                  placement="bottom"
                  overlay={
                    <Popover id="popover-positioned-bottom-jue">
                      <Popover.Header as="h3">Rehacer menu</Popover.Header>
                      <Popover.Body>
                        <Row>
                          <Col onClick={() => rehacerMenu(3)}>Almuerzo</Col>
                          <Col onClick={() => rehacerMenu(10)}>Cena</Col>
                        </Row>
                      </Popover.Body>
                    </Popover>
                  }
                >
                  <th>Jueves</th>
                </OverlayTrigger>
                <OverlayTrigger
                  trigger="click"
                  key="bottom viernes"
                  placement="bottom"
                  overlay={
                    <Popover id="popover-positioned-bottom-vie">
                      <Popover.Header as="h3">Rehacer menu</Popover.Header>
                      <Popover.Body>
                        <Row>
                          <Col onClick={() => rehacerMenu(4)}>Almuerzo</Col>
                          <Col onClick={() => rehacerMenu(11)}>Cena</Col>
                        </Row>
                      </Popover.Body>
                    </Popover>
                  }
                >
                  <th>Viernes</th>
                </OverlayTrigger>
                <OverlayTrigger
                  trigger="click"
                  key="bottom sabado"
                  placement="bottom"
                  overlay={
                    <Popover id="popover-positioned-bottom-sab">
                      <Popover.Header as="h3">Rehacer menu</Popover.Header>
                      <Popover.Body>
                        <Row>
                          <Col onClick={() => rehacerMenu(5)}>Almuerzo</Col>
                          <Col onClick={() => rehacerMenu(12)}>Cena</Col>
                        </Row>
                      </Popover.Body>
                    </Popover>
                  }
                >
                  <th>Sabado</th>
                </OverlayTrigger>
                <OverlayTrigger
                  trigger="click"
                  key="bottom domingo"
                  placement="bottom"
                  overlay={
                    <Popover id="popover-positioned-bottom-dom">
                      <Popover.Header as="h3">Rehacer menu</Popover.Header>
                      <Popover.Body>
                        <Row>
                          <Col onClick={() => rehacerMenu(6)}>Almuerzo</Col>
                          <Col onClick={() => rehacerMenu(13)}>Cena</Col>
                        </Row>
                      </Popover.Body>
                    </Popover>
                  }
                >
                  <th>Domingo</th>
                </OverlayTrigger>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Almuerzo</td>
                {menus.slice(0, 7).map((comida, i) => {
                  return (
                    <td key={i} onClick={() => mostrarComponente(comida)}>
                      {comida.nombre}
                    </td>
                  );
                })}
              </tr>
              <tr>
                <td>Cena</td>
                {menus.slice(7, 14).map((comida, i) => (
                  <td key={i} onClick={() => mostrarComponente(comida)}>
                    {comida.nombre}
                  </td>
                ))}
              </tr>
            </tbody>
          </Table>
        </Col>
      </Row>

      <Row>
        <Col className="m-0 p-0">
          {mostrarDatos && <Comida datosComida={comidaSeleccionada} />}
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
