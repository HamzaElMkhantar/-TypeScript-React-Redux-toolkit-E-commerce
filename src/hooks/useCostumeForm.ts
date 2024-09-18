import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, useForm, UseFormReturn } from "react-hook-form";
import { ZodSchema } from "zod";

const useCostumeForm = <T extends FieldValues>(
  schema: ZodSchema<T>
): UseFormReturn<T> => {
  const methods = useForm<T>({
    mode: "onBlur",
    resolver: zodResolver(schema),
  });
  return methods;
};

export default useCostumeForm;
