// availity-reactstrap-validation
import { AvField, AvForm } from "availity-reactstrap-validation";
import React, { useEffect, useState } from "react";
import { Helmet } from 'react-helmet-async';
import {
  Alert, Button, Card, CardBody, Col, Container, Media, Row
} from "reactstrap";
import avatar from "assets/images/users/avatar-man.png";
import Breadcrumb from "components/Common/Breadcrumb";
import { useFormik } from "formik";
import * as Yup from "yup";

const UserProfile = props => {
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
        props.resetProfileFlag();
      }, 3000);
    }
  }, [props.success])

  const formik = useFormik({
    initialValues: {
      username: name,
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Username is required"),
    }),
    onSubmit: (values) => {
      props.editProfile({ ...values, idx });
    },
  });

  return (
    <React.Fragment>
      <div className="page-content">
        <Helmet>
          <title>Profile | MyArchery</title>
        </Helmet>
        <Container fluid>
          <Breadcrumb title="MyArchery" breadcrumbItems={[{title: "Profile"}]} />

          <Row>
            <Col lg="12">
              {props.error && props.error ? (
                <Alert color="danger">{props.error}</Alert>
              ) : null}
              {props.success? (
                <Alert color="success">{props.success}</Alert>
              ) : null}

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
    </React.Fragment>
  )
}

export default UserProfile

