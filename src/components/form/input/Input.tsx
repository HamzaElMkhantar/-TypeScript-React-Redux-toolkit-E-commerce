import { Form } from "react-bootstrap";
import { Path, FieldValues, UseFormRegister } from "react-hook-form";

type TInputProps<TFieldValue extends FieldValues> = {
  label: string;
  name: Path<TFieldValue>;
  type?: "text" | "number" | "email" | "password";
  register: UseFormRegister<TFieldValue>;
  error: string | undefined;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  formText?: string;
  success?: string;
  disabled?: boolean;
}; 
const Input = <TFieldValue extends FieldValues>({
  label,
  name,
  type = "text",
  register,
  error,
  onBlur,
  formText,
  success,
  disabled
}: TInputProps<TFieldValue>) => {
  const onBlurHandler = (e: React.FocusEvent<HTMLInputElement>) => {
    if (onBlur) {
      onBlur(e);
      register(name).onBlur(e);
    } else {
      register(name).onBlur(e);
    }
  };
  return (
    <Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Label>{label}</Form.Label>
      <Form.Control
        type={type}
        {...register(name)}
        onBlur={onBlurHandler}
        isInvalid={!!error}
        isValid={success ? true : false}
        disabled={disabled}
      />
      <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
      <Form.Control.Feedback type="valid">{success}</Form.Control.Feedback>
      {formText && <Form.Text muted>{formText}</Form.Text>} 
    </Form.Group>
  );
};

export default Input;
