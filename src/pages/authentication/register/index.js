import React, { useState } from "react";
import { Container, Row, Col, Card, CardBody, Form, Input, Button, Label } from "reactstrap";
import { Link } from "react-router-dom";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <React.Fragment>
      <div className="account-pages my-5 pt-sm-5">
        <Container>
          <Row className="justify-content-center">
            <Col md={8} lg={6} xl={5}>
              <Card className="overflow-hidden">
                <CardBody className="pt-0">
                  <h3 className="text-center mt-4">
                    <Link to="/" className="logo logo-admin">
                      <img src="logo.png" height="30" alt="logo" />
                    </Link>
                  </h3>
                  <div className="p-3">
                    <Form className="form-horizontal" onSubmit={handleSubmit}>
                      <div className="mb-3">
                        <Label className="form-label">Name</Label>
                        <Input
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className="form-control"
                          placeholder="Enter name"
                          type="text"
                          required
                        />
                      </div>

                      <div className="mb-3">
                        <Label className="form-label">Email</Label>
                        <Input
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="form-control"
                          placeholder="Enter email"
                          type="email"
                          required
                        />
                      </div>

                      <div className="mb-3">
                        <Label className="form-label">Password</Label>
                        <Input
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          className="form-control"
                          placeholder="Enter password"
                          type="password"
                          required
                        />
                      </div>

                      <div className="mt-4">
                        <Button
                          color="primary"
                          className="w-100 waves-effect waves-light"
                          type="submit"
                        >
                          Register
                        </Button>
                      </div>

                      <div className="mt-4 text-center">
                        <p className="mb-0">
                          Already have an account ?{" "}
                          <Link to="/login" className="text-primary">
                            Login
                          </Link>
                        </p>
                      </div>
                    </Form>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
}

export default Register;
