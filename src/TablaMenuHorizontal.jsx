import React from "react";
import { Table, Button, OverlayTrigger, Popover } from "react-bootstrap";

const TablaMenuHorizontal = ({ menu, onRehacerMenu, onSeleccionarComida }) => {
  const dias = Object.keys(menu.comidas);

  return (
    <div>
      <Table bordered responsive>
        <thead>
          <tr>
            <th></th>
            {dias.length > 0 && dias.map((dia) => (
              <th
                key={dia}
                style={{ textTransform: "capitalize", textAlign: "center" }}
              >
                <OverlayTrigger
                  trigger="click"
                  placement="bottom"
                  rootClose
                  overlay={
                    <Popover id={`popover-${dia}`}>
                      <Popover.Header as="h3">
                        Que deseas cambiar?
                      </Popover.Header>
                      <Popover.Body className="d-flex justify-content-around align-items-center">
                        <Button
                          size="sm"
                          variant="outline-danger"
                          onClick={() => onRehacerMenu(dia, "almuerzo")}
                          className="me-2"
                        >
                          Almuerzo
                        </Button>
                        <Button
                          size="sm"
                          variant="outline-danger"
                          onClick={() => onRehacerMenu(dia, "cena")}
                        >
                          Cena
                        </Button>
                      </Popover.Body>
                    </Popover>
                  }
                >
                  <strong>{dia}</strong>
                </OverlayTrigger>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {/* Fila almuerzo */}
          <tr>
            <th>Almuerzo</th>
            {dias.map((dia) => {
              const comida = menu.comidas[dia].almuerzo;
              return (
                <td key={`${dia}-almuerzo`}>
                  <div>
                    <strong>Principal:</strong>{" "}
                    <p onClick={() => onSeleccionarComida(comida.principal)}>
                      {comida.principal.nombre}
                    </p>
                    <strong>Guarnición:</strong>{" "}
                    <p onClick={() => onSeleccionarComida(comida.guarnicion)}>
                      {comida.guarnicion.nombre}
                    </p>
                  </div>
                </td>
              );
            })}
          </tr>

          {/* Fila cena */}
          <tr>
            <th>Cena</th>
            {dias.map((dia) => {
              const comida = menu.comidas[dia].cena;
              return (
                <td key={`${dia}-cena`}>
                  <div>
                    <strong>Principal:</strong>{" "}
                    <p onClick={() => onSeleccionarComida(comida.principal)}>
                      {comida.principal.nombre}
                    </p>
                    <strong>Guarnición:</strong>{" "}
                    <p onClick={() => onSeleccionarComida(comida.guarnicion)}>
                      {comida.guarnicion.nombre}
                    </p>
                  </div>
                </td>
              );
            })}
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default TablaMenuHorizontal;
