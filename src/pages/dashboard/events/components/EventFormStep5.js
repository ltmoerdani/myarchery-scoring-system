import React from "react";
import { useSelector } from "react-redux";
import { getEventsStore } from "store/slice/events";
import parse from "html-react-parser";
import { selectConstants } from "constants/index";

import { Col, Label, Row, Alert, Collapse } from "reactstrap";
import { Accordion, CheckboxInput, DatetimeInput, SwitchInput } from "components";

import styles from "../styles";

export function EventFormStep5() {
  const { eventDescription } = useSelector(getEventsStore);
  const constants = selectConstants();

  return (
    <div className="event-form-step-5">
      <div className="preview-section">
        {parse(eventDescription || "")}
      </div>
    </div>
  );
}

export default EventFormStep5;

function Alert500({ errors }) {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <Alert color="danger">
      <div className="mt-2">
        <p>500 Internal Server Error</p>
        <p>
          <a onClick={() => setIsOpen((state) => !state)}>
            <u>Pesan selengkapnya</u>
          </a>
        </p>
      </div>

      <Collapse isOpen={isOpen}>
        <pre>{errors.message}</pre>
      </Collapse>
    </Alert>
  );
}
