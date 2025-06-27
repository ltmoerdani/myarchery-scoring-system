// availity-reactstrap-validation
// Remove unused imports
// import { AvField, AvForm } from "availity-reactstrap-validation";
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Helmet } from 'react-helmet-async';
import {
  Alert, Button, Card, CardBody, Col, Container, Row
} from "reactstrap";
import avatar from "assets/images/users/avatar-man.png";
import Breadcrumb from "components/Common/Breadcrumb";
import { useFormik } from "formik";
import * as Yup from "yup";

const UserProfile = ({ resetProfileFlag, success, editProfile, error }) => {
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [idx, setIdx] = useState(1)

  useEffect(() => {
    if (localStorage.getItem("authUser")) {
      const obj = JSON.parse(localStorage.getItem("authUser"))
      if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
        setName(obj.displayName)
        setEmail(obj.email)
        setIdx(obj.uid)
      } else if (
        process.env.REACT_APP_DEFAULTAUTH === "fake" ||
        process.env.REACT_APP_DEFAULTAUTH === "jwt"
      ) {
        setName(obj.username)
        setEmail(obj.email)
        setIdx(obj.uid)
      }
      setTimeout(() => {
        resetProfileFlag();
      }, 3000);
    }
  }, [success, resetProfileFlag])

  const formik = useFormik({
    initialValues: {
      username: name,
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Username is required"),
    }),
    onSubmit: (values) => {
      editProfile({ ...values, idx });
    },
  });

  return (
    <div className="page-content">
      <Helmet>
        <title>Profile | MyArchery</title>
      </Helmet>
      <Container fluid>
        <Breadcrumb title="MyArchery" breadcrumbItems={[{title: "Profile"}]} />

        <Row>
          <Col lg="12">
            {error && (
              <Alert color="danger">{error}</Alert>
            )}
            {success && (
              <Alert color="success">{success}</Alert>
            )}

            <Card>
              <CardBody>
                <div className="d-flex align-items-center">
                  <div className="me-3">
                    <img
                      src={avatar}
                      alt=""
                      className="avatar-md rounded-circle img-thumbnail"
                    />
                  </div>
                  <div>
                    <h5 className="mb-1">{name}</h5>
                    <p className="mb-1">{email}</p>
                    <p className="mb-0 text-muted">Id no: #{idx}</p>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>

        <h4 className="card-title mb-4">Change Username</h4>

        <Card>
          <CardBody>
            <form onSubmit={formik.handleSubmit}>
              <div className="mb-3">
                <label htmlFor="username" className="form-label">
                  Username
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  className="form-control"
                  placeholder="Enter username"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.username}
                />
                {formik.touched.username && formik.errors.username ? (
                  <Alert color="danger" className="mt-2">
                    {formik.errors.username}
                  </Alert>
                ) : null}
              </div>
              <div className="text-center mt-4">
                <Button type="submit" color="danger">
                  Update Username
                </Button>
              </div>
            </form>
          </CardBody>
        </Card>
      </Container>
    </div>
  )
}

UserProfile.propTypes = {
  resetProfileFlag: PropTypes.func.isRequired,
  success: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool
  ]),
  editProfile: PropTypes.func.isRequired,
  error: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool
  ]),
};

export default UserProfile

