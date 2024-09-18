import { Input } from "@components/form";
import useCostumeForm from "@hooks/useCostumeForm";
import { TLoginType, loginSchema } from "@validations";
import { Form, Button, Container } from "react-bootstrap";
import { SubmitHandler } from "react-hook-form";

function Login() {
  const { register, handleSubmit, formState: {errors} } =  useCostumeForm<TLoginType>(loginSchema)

  const submitForm: SubmitHandler<TLoginType> = (data) => console.log(data);
  return (
    <Container>
      <h3 style={{ textAlign: "center" }} className="my-3">
        Login
      </h3>
      <Form onSubmit={handleSubmit(submitForm)} className="col-md-6 m-auto">
      <Input
          label="Email address"
          name="email"
          register={register}
          error={errors.email?.message}
        />
          <Input
          label="Confirm Password"
          name="password"
          type="password"
          register={register}
          error={errors.password?.message}
        />
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
}

export default Login;
