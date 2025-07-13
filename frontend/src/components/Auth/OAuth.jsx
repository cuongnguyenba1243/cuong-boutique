import { AiFillGoogleCircle } from "react-icons/ai";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { app } from "../../Firebase";
import { SignInWithGoogle } from "../../store/slice/authSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const OAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const auth = getAuth(app);
  const handleGoogleClick = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
    try {
      const resultsFromGoogle = await signInWithPopup(auth, provider);

      toast
        .promise(
          dispatch(
            SignInWithGoogle({
              name: resultsFromGoogle.user.displayName,
              email: resultsFromGoogle.user.email,
            }),
          ),
          {
            pending: "Loading",
          },
        )
        .then((res) => {
          if (!res.error) {
            toast.success("Logged in successfully!");
            navigate("/");
          }
        });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <button
      type="button"
      onClick={handleGoogleClick}
      className="mt-2 flex w-full cursor-pointer items-center justify-center rounded-lg bg-gradient-to-r from-pink-400 to-orange-400 py-2 text-white outline-none transition-all duration-200 hover:opacity-90"
    >
      <AiFillGoogleCircle className="mr-2 h-6 w-6" />
      Continue with Google
    </button>
  );
};
export default OAuth;
