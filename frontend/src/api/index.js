import authorizeAxiosInstance from "../utilities/authorizeAxios";

export const refreshTokenApi = async () => {
  const response = await authorizeAxiosInstance.get(
    `${import.meta.env.VITE_BACKEND_URL}/api/users/refresh-token`,
  );

  return response.data;
};
