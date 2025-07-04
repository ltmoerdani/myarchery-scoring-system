import React from "react"
import { Helmet } from "react-helmet-async";

// availity-reactstrap-validation
import { Form, Input, Button, Container, Row, Col, CardBody, Card, Label } from "reactstrap"
import { Link } from "react-router-dom"

// import images
import profileImg from "../../../assets/images/profile-img.png"
import logoImg from "../../../assets/images/logo.svg"
import avatar from "../../../assets/images/users/avatar-man.png"

const LockScreen = () => {
  const handleValidSubmit = (event) => {
    event.preventDefault();
    // Handle form submission
  };

  return (
    <React.Fragment>
      <Helmet>
        <title>Lock screen | MyArchery.id</title>
      </Helmet>
      <div className="home-btn d-none d-sm-block">
        <Link to="/" className="text-dark">
          <i className="fas fa-home h2" />
        </Link>
      </div>
      <div className="account-pages my-5 pt-sm-5">
        <Container>
          <Row className="justify-content-center">
            <Col md="8" lg="6" xl="5">
              <Card className="overflow-hidden">
                <div className="bg-primary bg-soft">
                  <Row>
                    <Col xs="7">
                      <div className="text-primary p-4">
                        <h5 className="text-primary">Lock screen</h5>
                        <p>Enter your password to unlock the screen!</p>
                      </div>
                    </Col>
                    <Col xs="5" className="align-self-end">
                      <img src={profileImg} alt="" className="img-fluid" />
                    </Col>
                  </Row>
                </div>
                <CardBody className="pt-0">
                  <div>
                    <Link to="/">
                      <div className="avatar-md profile-user-wid mb-4">
                        <span className="avatar-title rounded-circle bg-light">
                          <img
                            src={logoImg}
                            alt=""
                            className="rounded-circle"
                            height="34"
                          />
                        </span>
                      </div>
                    </Link>
                  </div>
                  <div className="p-2">
                    <Form
                      className="form-horizontal"
                      onSubmit={handleValidSubmit}
                    >
                      <div className="user-thumb text-center mb-4">
                        <img
                          src={avatar}
                          className="rounded-circle img-thumbnail avatar-md"
                          alt="thumbnail"
                        />
                        <h5 className="font-size-15 mt-3">Maria Laird</h5>
                      </div>

                      <div className="mb-3">
                        <Label className="form-label">Password</Label>
                        <Input
                          name="password"
                          className="form-control"
                          placeholder="Enter password"
                          type="password"
                          required
                        />
                      </div>

                      <div className="text-end">
                        <Col xs="12" className="text-end">
                          <Button color="primary" className=" w-md " type="submit">
                            Unlock
                          </Button>
                        </Col>
                      </div>
                    </Form>
                  </div>
                </CardBody>
              </Card>
              <div className="mt-5 text-center">
                <p>
                  Not you ? return{" "}
                  <Link
                    to="/login"
                    className="fw-medium text-primary"
                  >
                    {" "}
                      Sign In{" "}
                  </Link>{" "}
                </p>
                <p>
                  © 2021 MyArchery. Crafted with{" "}
                  <i className="mdi mdi-heart text-danger" /> by Themesbrand
                  </p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}
export default LockScreen
