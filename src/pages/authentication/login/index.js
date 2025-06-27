// import logo from "assets/images/logo.svg"
// import images
// import profile from "assets/images/profile-img.png"
// availity-reactstrap-validation
// import { AvField, AvForm } from "availity-reactstrap-validation"
import myachery from "assets/images/myachery/logo 3.png"
// import gmail from "assets/images/myachery/gmail.png"
// import google from "assets/images/myachery/Google.png"
// import facebook from "assets/images/myachery/Facebook.png"
// import ladBg from "assets/images/myachery/achery-lad.png"
import React from "react"
import { Link, useHistory } from "react-router-dom"
import { useDispatch } from "react-redux"
import { login as loginAction } from "store/slice/authentication"
import { AuthenticationService } from "services"
import { useFormik } from "formik"
import * as Yup from "yup"
import { toast } from "react-hot-toast"
import { Helmet } from "react-helmet-async"
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Alert,
} from "reactstrap"

const Login = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Please enter your email"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Please enter your password"),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const { data } = await AuthenticationService.login(values)
        dispatch(loginAction(data))
        history.push("/dashboard")
      } catch (error) {
        toast.error(error.response?.data?.message || "Login failed")
      } finally {
        setSubmitting(false)
      }
    },
  })

  return (
    <React.Fragment>
      <Helmet>
        <title>Login | MyArchery.id</title>
      </Helmet>
      <div className="home-btn d-none d-sm-block">
        <Link to="/" className="text-dark">
          <i className="fas fa-home h2" />
        </Link>
      </div>
      <div className="account-pages my-5 pt-sm-5">
        <Container>
          <Row className="justify-content-center">
            <Col md={8} lg={6} xl={5}>
              <Card className="overflow-hidden">
                <div className="bg-primary bg-soft">
                  <Row>
                    <Col xs={7}>
                      <div className="text-primary p-4">
                        <h5 className="text-primary">Welcome Back !</h5>
                        <p>Masukkan email dan kata sandi Anda untuk mengakses panel admin.</p>
                      </div>
                    </Col>
                  </Row>
                </div>
                <CardBody className="pt-0">
                  <div>
                    <Link to="/">
                      <div className="avatar-md profile-user-wid mb-4">
                        <span className="avatar-title rounded-circle bg-light">
                          <img
                            src={myachery}
                            alt=""
                            className="rounded-circle"
                            height="34"
                          />
                        </span>
                      </div>
                    </Link>
                  </div>
                  <div className="p-2">
                    <form className="form-horizontal" onSubmit={formik.handleSubmit}>
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

                      <div className="mb-3">
                        <label htmlFor="password">Password</label>
                        <input
                          id="password"
                          name="password"
                          type="password"
                          className="form-control"
                          placeholder="Enter password"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.password}
                        />
                        {formik.touched.password && formik.errors.password ? (
                          <Alert color="danger" className="mt-2">
                            {formik.errors.password}
                          </Alert>
                        ) : null}
                      </div>

                      <div className="mt-3 d-grid">
                        <button
                          className="btn btn-primary btn-block"
                          type="submit"
                          disabled={formik.isSubmitting}
                        >
                          {formik.isSubmitting ? "Logging in..." : "Log In"}
                        </button>
                      </div>

                      <div className="mt-4 text-center">
                        <Link
                          to="/forgot-password"
                          className="text-muted"
                        >
                          <i className="mdi mdi-lock me-1" /> Forgot your
                          password?
                        </Link>
                      </div>
                    </form>
                  </div>
                </CardBody>
              </Card>
              <div className="mt-5 text-center">
                <p>
                  Don&apos;t have an account ?{" "}
                  <Link to="/register" className="fw-medium text-primary">
                    Register
                  </Link>
                </p>
                {/* <p>
                  © {new Date().getFullYear()} Skote. Crafted with{" "}
                  <i className="mdi mdi-heart text-danger" /> by Themesbrand
                </p> */}
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default Login
