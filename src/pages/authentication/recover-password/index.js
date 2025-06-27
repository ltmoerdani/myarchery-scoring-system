import React from "react"
import { Link, useHistory } from "react-router-dom"
import {
  Card,
  CardBody,
  Col,
  Container, Row,
  Alert
} from "reactstrap"
import logo from "../../../assets/images/logo.svg"
// import images
import profile from "../../../assets/images/profile-img.png"
import { Helmet } from "react-helmet-async"
import { useFormik } from "formik"
import * as Yup from "yup"
import { AuthenticationService } from "services"
import { toast } from "react-hot-toast"

const RecoverPassword = () => {
  const history = useHistory()

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Please enter your email"),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        await AuthenticationService.forgotPassword(values)
        toast.success("Password reset instructions have been sent to your email")
        history.push("/login")
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to send reset instructions")
      } finally {
        setSubmitting(false)
      }
    },
  })

  return (
    <React.Fragment>
      <Helmet>
        <title>Recover Password | MyArchery.id</title>
      </Helmet>
      <div className="account-pages my-5 pt-sm-5">
        <Container>
          <Row className="justify-content-center">
            <Col md={8} lg={6} xl={5}>
              <Card className="overflow-hidden">
                <div className="bg-primary bg-soft">
                  <Row>
                    <Col xs={7}>
                      <div className="text-primary p-4">
                        <h5 className="text-primary"> Reset Password</h5>
                        <p>Re-Password with MyArchery.</p>
                      </div>
                    </Col>
                    <Col xs={5} className="align-self-end">
                      <img
                        src={profile}
                        alt=""
                        className="img-fluid"
                      />
                    </Col>
                  </Row>
                </div>
                <CardBody className="pt-0">
                  <div>
                    <Link to="/">
                      <div className="avatar-md profile-user-wid mb-4">
                        <span className="avatar-title rounded-circle bg-light">
                          <img
                            src={logo}
                            alt=""
                            className="rounded-circle"
                            height="34"
                          />
                        </span>
                      </div>
                    </Link>
                  </div>

                  <div className="p-2">
                    <div className="text-center mb-4">
                      <h5>Reset Password</h5>
                      <p className="text-muted">
                        Enter your email and we'll send you instructions to reset your password.
                      </p>
                    </div>

                    <form onSubmit={formik.handleSubmit}>
                      <div className="mb-3">
                        <label htmlFor="email">Email</label>
                        <input
                          id="email"
                          name="email"
                          className="form-control"
                          placeholder="Enter email"
                          type="email"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.email}
                        />
                        {formik.touched.email && formik.errors.email ? (
                          <Alert color="danger" className="mt-2">
                            {formik.errors.email}
                          </Alert>
                        ) : null}
                      </div>

                      <div className="mt-3 d-grid">
                        <button
                          className="btn btn-primary btn-block"
                          type="submit"
                          disabled={formik.isSubmitting}
                        >
                          {formik.isSubmitting ? "Sending..." : "Reset Password"}
                        </button>
                      </div>
                    </form>
                  </div>
                </CardBody>
              </Card>
              <div className="mt-5 text-center">
                <p>
                  Remember your password?{" "}
                  <Link to="/login" className="fw-medium text-primary">
                    Login
                  </Link>
                </p>
                <p>
                  © {new Date().getFullYear()} MyArchery. Crafted with{" "}
                  Remember It ? {" "}
                  <Link
                    to="/login"
                    className="fw-medium text-primary"
                  >
                    {" "}
                    Sign In here
                  </Link>{" "}
                </p>
                <p>
                  © {new Date().getFullYear()} MyArchery. Crafted with{" "}
                  <i className="mdi mdi-heart text-danger"></i> by Themesbrand
                  </p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default RecoverPassword
