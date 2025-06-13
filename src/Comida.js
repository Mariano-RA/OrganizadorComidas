import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";


function Comida({ datosComida, show, onHide }) {
  const [receta, setReceta] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!datosComida?.id || !show) return;

    fetch(`http://localhost:3000/Recetas/${datosComida.id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Error al cargar la receta");
        return res.json();
      })
      .then(setReceta)
      .catch((e) => setError(e.message));
  }, [datosComida, show]);

  return (
    <Modal show={show} onHide={onHide} size="xl" centered >
      <Modal.Header closeButton>
        <Modal.Title>{receta ? receta.nombre : "Cargando..."}</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ height: "70vh" }}>
        {error && <div>Error: {error}</div>}
        {!receta && !error && <div>Cargando receta...</div>}

        {receta && (
          <div className="d-flex h-100">
            <div className="me-3 overflow-y-auto h-100">
              <h5>Ingredientes:</h5>
              <ListGroup className="tamañoIngredientes">
                {receta.ingredientes.map((ingrediente) => (
                  <ListGroup.Item key={ingrediente.id}>
                    <p>{ingrediente.cantidad} {ingrediente.nombre}</p>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </div>
            <div className="h-100 overflow-y-auto">
              <h5>Pasos:</h5>
              <ListGroup numbered className="tamañoIngredientes">
                {receta.pasos.map((paso, index) => (
                  <ListGroup.Item key={index}>{paso}</ListGroup.Item>
                ))}
              </ListGroup>
            </div>
          </div>
        )}
      </Modal.Body>
      <style type="text/css">
        {`
          .tamañoIngredientes {
            max-height: 250px;
          }
        `}
      </style>
    </Modal>
  );
}

export default Comida;
