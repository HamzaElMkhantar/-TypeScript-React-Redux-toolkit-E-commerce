import { SubmitHandler } from "react-hook-form";
import { Form, Button, Container } from "react-bootstrap";
import { signUpSchema, TSingUpType } from "@validations";
import { Input } from "@components/form";
import useCostumeForm from "@hooks/useCostumeForm";
import useCheckEmailAvailability from "../hooks/useCheckEmailAvailability";

function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getFieldState,
    trigger,
  } = useCostumeForm<TSingUpType>(signUpSchema);

  const submitForm: SubmitHandler<TSingUpType> = (data) => {
    console.log(data);
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
  return (
    <Container>
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
          error={
            errors.email?.message
              ? errors.email?.message
              : emailAvailabilityStatus === "notAvailable"
              ? "this email already in use."
              : emailAvailabilityStatus === "failed"
              ? "Internal Server Error"
              : ""
          }
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

        <Button
          variant="primary"
          type="submit"
          disabled={emailAvailabilityStatus === "checking"}
        >
          Submit
        </Button>
      </Form>
    </Container>
  );
}

export default Register;
