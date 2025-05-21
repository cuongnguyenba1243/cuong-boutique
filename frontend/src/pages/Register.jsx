import { Link } from "react-router-dom";
import registerImage from "../assets/register.jpg";
import path from "../utilities/path";
import { registerUser } from "../store/slice/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import {
  FIELD_REQUIRED_MESSAGE,
  EMAIL_RULE,
  EMAIL_RULE_MESSAGE,
  PASSWORD_RULE,
  PASSWORD_RULE_MESSAGE,
} from "../utilities/validators";
import FieldErrorAlert from "../components/Form/FieldErrorAlert";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleRegister = (data) => {
    const { name, email, password } = data;

    toast
      .promise(dispatch(registerUser({ name, email, password })), {
        pending: "Loading...",
      })
      .then((res) => {
        if (!res.error) {
          reset();
          navigate(path.LOGIN);
          toast.success(
            "Registration successfully! Please check yout email to verify",
          );
        }
      });
  };

  return (
    <div className="flex">
      {/* Left  */}
      <div className="flex w-full flex-col items-center justify-center p-8 md:w-1/2 md:p-12">
        <form
          onSubmit={handleSubmit(handleRegister)}
          className="w-full max-w-md rounded-lg border bg-white p-8 shadow-sm"
        >
          <div className="mb-6 flex justify-center">
            <h2 className="text-xl font-medium">Cuong Boutique</h2>
          </div>
          <h2 className="mb-6 text-center text-2xl font-bold">Hey there! 👋</h2>
          <p className="mb-6 text-center">
            Enter your username email and password to sign up
          </p>
          <div className="mb-4">
            <label className="mb-2 block text-sm font-semibold">Name</label>
            <input
              type="text"
              {...register("name", {
                required: FIELD_REQUIRED_MESSAGE,
              })}
              className="w-full rounded border p-2"
              placeholder="Enter your name"
            />
            <FieldErrorAlert errors={errors} fieldName={"name"} />
          </div>
          <div className="mb-4">
            <label className="mb-2 block text-sm font-semibold">Email</label>
            <input
              type="text"
              {...register("email", {
                required: FIELD_REQUIRED_MESSAGE,
                pattern: {
                  value: EMAIL_RULE,
                  message: EMAIL_RULE_MESSAGE,
                },
              })}
              className="w-full rounded border p-2"
              placeholder="Enter your email address"
            />
            <FieldErrorAlert errors={errors} fieldName={"email"} />
          </div>
          <div className="mb-4">
            <label className="mb-2 block text-sm font-semibold">Password</label>
            <input
              type="password"
              {...register("password", {
                required: FIELD_REQUIRED_MESSAGE,
                pattern: {
                  value: PASSWORD_RULE,
                  message: PASSWORD_RULE_MESSAGE,
                },
              })}
              className="w-full rounded border p-2"
              placeholder="Enter your password"
            />
            <FieldErrorAlert errors={errors} fieldName={"password"} />
          </div>
          <button
            type=""
            className="w-full rounded-lg bg-black p-2 font-semibold text-white transition hover:bg-gray-800"
          >
            Sign up
          </button>
          <p className="mt-6 text-center text-sm">
            Already have an account?
            <Link to={path.LOGIN} className="pl-1 text-blue-500 underline">
              Login
            </Link>
          </p>
          <p className="mt-6 text-center text-sm">
            <Link to={path.HOME} className="pl-1 text-blue-500 underline">
              &lt; Home
            </Link>
          </p>
        </form>
      </div>

      {/* Right */}
      <div className="hidden w-1/2 bg-gray-800 md:block">
        <div className="flex h-full flex-col items-center justify-center">
          <img
            src={registerImage}
            alt="register"
            className="h-[750px] w-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};
export default Register;
