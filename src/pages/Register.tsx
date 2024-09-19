import { FieldErrors, SubmitHandler } from "react-hook-form";
import { Form, Button, Container, Spinner } from "react-bootstrap";
import { signUpSchema, TSingUpType } from "@validations";
import { Input } from "@components/form";
import useCostumeForm from "@hooks/useCostumeForm";
import useCheckEmailAvailability from "../hooks/useCheckEmailAvailability";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { actAuthRegister, cleanUpRegister } from "@store/auth/authSlice";
import { useEffect } from "react";
import {  useNavigate } from "react-router-dom";
type TStatus = "idle" | "checking" | "available" | "notAvailable" | "failed";

function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getFieldState,
    trigger,
  } = useCostumeForm<TSingUpType>(signUpSchema);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.auth);

  const submitForm: SubmitHandler<TSingUpType> = (data) => {
    const { firstName, lastName, email, password } = data;
    dispatch(actAuthRegister({ firstName, lastName, email, password }));
  };

  const {
    emailAvailabilityStatus,
    enteredEmail,
    checkEmailAvailability,
    resetCheckEmailAvailability,
  } = useCheckEmailAvailability();
  const emailOnBlurHandler = async (
    event: React.FocusEvent<HTMLInputElement>
  ) => {
    await trigger("email");
    const value = event.target.value;
    const { isDirty, invalid } = getFieldState("email");
    console.log({ isDirty, invalid, value });
    if (isDirty && !invalid && enteredEmail !== value) {
      // checking
      checkEmailAvailability(value);
    }

    if (enteredEmail && isDirty && invalid) {
      resetCheckEmailAvailability();
    }
  };
  useEffect(() => {
    if (loading === "pending") {
      navigate("/login?message=success");
    }

    // return () => {
    //   dispatch(cleanUpRegister())
    // }
  }, [loading, navigate]);

  // not working clean up states
  useEffect(() => {
    return () => {
      dispatch(cleanUpRegister());
    };
  }, [dispatch]);

  const handleEmailErrStatus = (err: FieldErrors, status: TStatus) => {
    const error = err.email?.message;
    if (error) {
      return error as string;
    } else if (status === "notAvailable") {
      return "this email already in use.";
    } else if (status === "failed") {
      return "Internal Server Error";
    } else {
      return "";
    }
  };

  // if(accessToken){
  //   return <Navigate to="/" />
  // }
  return (
    <Container>
      {error && (
        <div className="alert alert-danger mt-2" role="alert">
          {error}
        </div>
      )}
      <h3 style={{ textAlign: "center" }} className="my-3">
        User Registration
      </h3>
      <Form
        autoComplete="off"
        onSubmit={handleSubmit(submitForm)}
        className="col-md-6 m-auto"
      >
        <Input
          label="First Name"
          name="firstName"
          register={register}
          error={errors.firstName?.message}
        />
        <Input
          label="Last Name"
          name="lastName"
          register={register}
          error={errors.lastName?.message}
        />
        <Input
          label="Email address"
          name="email"
          register={register}
          error={handleEmailErrStatus(errors, emailAvailabilityStatus)}
          onBlur={emailOnBlurHandler}
          formText={
            emailAvailabilityStatus === "checking"
              ? "We're currently checking the availability of this email address, Please wait a moment."
              : ""
          }
          success={
            emailAvailabilityStatus === "available"
              ? "this email available for use"
              : ""
          }
          disabled={emailAvailabilityStatus === "checking"}
        />
        <Input
          label="Password"
          name="password"
          type="password"
          register={register}
          error={errors.password?.message}
        />
        <Input
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          register={register}
          error={errors.confirmPassword?.message}
        />

        {loading === "pending" ? (
          <Spinner animation="border" variant="primary" />
        ) : (
          <Button
            variant="primary"
            type="submit"
            disabled={emailAvailabilityStatus === "checking"}
          >
            Submit
          </Button>
        )}
      </Form>
    </Container>
  );
}

export default Register;
