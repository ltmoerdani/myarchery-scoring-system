// availity-reactstrap-validation
import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { AuthenticationService } from "services";
import { toast } from "react-hot-toast";
import { Helmet } from "react-helmet-async";
import {
  Card,
  CardBody,
  Col,
  Container,
  Row,
  Alert,
} from "reactstrap";
import myachery from "assets/images/myachery/logo 3.png";

const ForgetPasswordPage = () => {
  const history = useHistory();

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Please enter your email"),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        await AuthenticationService.forgotPassword(values);
        toast.success("Password reset instructions have been sent to your email");
        history.push("/login");
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to send reset instructions");
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <React.Fragment>
      <Helmet>
        <title>Forget Password | MyArchery.id</title>
      </Helmet>

      <div className="account-pages my-5 pt-sm-5">
        <Container>
          <Row className="justify-content-center">
            <Col md={8} lg={6} xl={5}>
              <Card className="overflow-hidden">
                <CardBody className="pt-0">
                  <div className="p-2">
                    <div className="text-center mt-4">
                      <Link to="/">
                        <img src={myachery} alt="" height="50" />
                      </Link>
                    </div>

                    <div className="p-2">
                      <div className="text-center mb-4">
                        <h5>Reset Password</h5>
                        <p className="text-muted">
                          Masukkan alamat email Anda dan instruksi akan dikirimkan kepada Anda!
                        </p>
                      </div>

                      <form
                        className="form-horizontal"
                        onSubmit={formik.handleSubmit}
                      >
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
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default ForgetPasswordPage;
