import React from "react";
import PropTypes from "prop-types";
import { Row, Col } from "reactstrap";
import parse from "html-react-parser";

function NewEventPreview({ formData }) {
  return (
    <Row>
      <Col lg={4}>
        <img
          className="rounded"
          alt="Event Preview"
          width="100%"
          src={formData.poster ? URL.createObjectURL(formData.poster) : "/images/no-image.jpeg"}
        />
      </Col>

      <Col lg={8}>
        <table className="table">
          <tbody>
            <tr>
              <td>Tanggal Lomba</td>
              <td>
                {formData.eventStartDatetime} s/d {formData.eventEndDatetime}
              </td>
            </tr>
            <tr>
              <td>Tanggal Pendaftaran</td>
              <td>
                {formData.registrationStartDatetime} s/d {formData.registrationEndDatetime}
              </td>
            </tr>
            <tr>
              <td colSpan={2}>
                <i className="bx bx-map" /> {formData.location}
              </td>
            </tr>
            <tr>
              <td colSpan={2}>{parse(formData.description || "")}</td>
            </tr>
          </tbody>
        </table>
      </Col>
    </Row>
  );
}

NewEventPreview.propTypes = {
  formData: PropTypes.object.isRequired,
};

export default NewEventPreview;
