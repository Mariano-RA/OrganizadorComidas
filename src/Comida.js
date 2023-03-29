import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";

function Comida({ datosComida }) {
  let ingredientes;
  let receta;

  function configurarDatos(datosComida) {
    let valIngredientes = datosComida.ingredientes.slice(2).slice(0, -2);
    ingredientes = valIngredientes.split("', '");

    let valReceta = datosComida.receta.slice(2).slice(0, -2);
    receta = valReceta.split("', '");
  }
  configurarDatos(datosComida);

  return (
    <Container>
      <Row>
        <Col className="text-center align-self-center p-0 m-0">
          <h4 className="">{datosComida.nombre}</h4>
        </Col>

        <Col>
          <h3>Ingredientes:</h3>
          <ListGroup className="tamañoIngredientes overflow-auto">
            {ingredientes.map((ingrediente, index) => (
              <ListGroup.Item key={index}>{ingrediente}</ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col>
          <h3>Receta:</h3>
          <ListGroup numbered className="tamañoIngredientes overflow-auto">
            {receta.map((paso, index) => (
              <ListGroup.Item key={index}>{paso}</ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>

      <style type="text/css">
        {`
        .tamañoIngredientes{
          height: 250px;
        }
        `}
      </style>
    </Container>
  );
}

export default Comida;
