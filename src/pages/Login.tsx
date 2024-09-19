import { Input } from "@components/form";
import useCostumeForm from "@hooks/useCostumeForm";
import { TLoginType, loginSchema } from "@validations";
import { Form, Button, Container, Alert } from "react-bootstrap";
import { SubmitHandler } from "react-hook-form";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { actAuthLogin, cleanUpLogin } from "@store/auth/authSlice";
import { useEffect } from "react";

function Login() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [searchParam, setSearchParams] = useSearchParams();
  const successParam = searchParam.get("message") === "success" || null;
  const { error, loading, user, accessToken } = useAppSelector(
    (state) => state.auth
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useCostumeForm<TLoginType>(loginSchema);

  console.log({ error, loading, user, accessToken });
  const submitForm: SubmitHandler<TLoginType> = (data) => {
    if (successParam) {
      setSearchParams("");
    }
    const { email, password } = data;
    dispatch(actAuthLogin({ email, password }))
      .unwrap()
      .then(() => navigate("/"));
  };

  useEffect(() => {
    return () => {
      dispatch(cleanUpLogin());
    };
  }, [dispatch]);

  // if(accessToken){
  //   return <Navigate to="/" />
  // }
  return accessToken ? (
    <Navigate to="/" />
  ) : (
    <Container>
      {successParam && (
        <Alert className="alert-success mt-2 text-center" role="alert">
          Register success
        </Alert>
      )}
      {error && (
        <Alert className="alert-danger mt-2 text-center" role="alert">
          {error}
        </Alert>
      )}
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
