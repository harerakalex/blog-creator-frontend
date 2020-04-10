export const getToken = () => localStorage.getItem('token');
const setAxiosConfig = () => {
  const axiosConfig = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: getToken()
    }
  };
  return axiosConfig;
};

export default setAxiosConfig;
