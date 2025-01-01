import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

//Applying schema based validation using zod
//------------------------------------------------

// We can use zod to define the schema of the data object to help us with type management and autocompletion
// We can call it anything we want but it is a good practice to name it schema
const schema = z.object({
  name: z.string().min(3, { message: "You can specify your customized message in the case of error" }),
  age: z
    .number({ invalid_type_error: "Age field is required!" })
    .min(18, { message: "Age must be at least 18 years old!" }),
});

// zod has a method to extract the type of the schema object
// We can use it to define the type of the data object
// The following line return a TypeScript type which is similar interface FormData {name: string; age: number;}
type FormData = z.infer<typeof schema>;

const Form = () => {
  // De structure the useForm and grab the register and handleSubmit functions
  // You can always print the formState to see what it contains
  // Destructuring useForm to grab register and handleSubmit functions and formState object
  const {
    register,
    handleSubmit,
    // Destructuring formState to grab errors object. This is called
    // nested destructuring in javascript
    formState: { errors, isValid },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  return (
    <form onSubmit={handleSubmit((data) => console.log(data))}>
      <div className="mb-3">
        <label htmlFor="name" className="form-label"></label>
        <input id="name" type="text" className="form-control" {...register("name")} />
        {/* zod will take care of error messages based on the defined schema */}
        {errors.name && <p className="text-danger">{errors.name.message}</p>}
      </div>
      <div className="mb-3">
        <label htmlFor="age" className="form-label"></label>
        {/* To instruct react-hook-form to treat the age as a number, we need to pass valueAsNumber: true */}
        <input id="age" type="number" className="form-control" {...register("age", { valueAsNumber: true })} />
        {/* zod will take care of error messages based on the defined schema */}
        {errors.age && <p className="text-danger">{errors.age.message}</p>}
      </div>

      <button disabled={!isValid} className="btn btn-primary" type="submit">
        Submit
      </button>
    </form>
  );
};

export default Form;
