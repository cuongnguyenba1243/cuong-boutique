import icons from "../../utilities/icon";
import path from "../../utilities/path";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const { TbBrandFacebook, IoLogoInstagram, RiTwitterXLine } = icons;

const TopHeader = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="bg-gray-500 text-white">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        <div className="hidden items-center space-x-4 md:flex">
          <a href={path.SOCIAL_MEDIA} className="hover:text-gray-300">
            <TbBrandFacebook className="h-5 w-5" />
          </a>
          <a href={path.SOCIAL_MEDIA} className="hover:text-gray-300">
            <IoLogoInstagram className="h-5 w-5" />
          </a>
          <a href={path.SOCIAL_MEDIA} className="hover:text-gray-300">
            <RiTwitterXLine className="h-5 w-5" />
          </a>
        </div>
        <div className="flex-grow text-center text-sm">
          <span>We ship worldwide - Fast and reliable shipping!</span>
        </div>
        <div className="hidden text-sm md:block">
          {user ? (
            <p className="">
              Hello{" "}
              <Link to={path.PROFILE} className="underline">
                {user.name}
              </Link>
            </p>
          ) : (
            <div className="flex items-center justify-center gap-4">
              <Link
                to={path.LOGIN}
                className="border-r pr-4 hover:text-gray-200"
              >
                Login
              </Link>
              <Link to={path.REGISTER} className="hover:text-gray-200">
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default TopHeader;
