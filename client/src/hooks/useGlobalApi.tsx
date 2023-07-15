import { Lenghts } from "../components/Interface";
export const Host = {
  name: "http://localhost:3001/",
};

const useGlobalApi = () => {
  const getHost = () => {
    return Host.name;
  };
  return [getHost] as const;
};
export default useGlobalApi;
