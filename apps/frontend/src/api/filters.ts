import api from "./axios.config";

export const fetchFilters = async () => {
  const { data } = await api.get("/filters");
  return data;
};
