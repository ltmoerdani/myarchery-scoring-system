import React from "react";
import { Card, CardBody } from "reactstrap";
import { ButtonBlue } from "components/ma";
import { useParams } from "react-router-dom";

function ManageEliminationDetail() {
  const { eventId } = useParams();

  return (
    <Card>
      <CardBody>
        <h4>Detail Eliminasi</h4>
        <ButtonBlue onClick={() => window.history.back()}>
          Kembali
        </ButtonBlue>
      </CardBody>
    </Card>
  );
}

export default ManageEliminationDetail;
