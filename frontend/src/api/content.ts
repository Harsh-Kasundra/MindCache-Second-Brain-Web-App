import api from "./axios";

export const fetchContentStats = async () => {
  const res = await api.get("/content/stats");
  return res.data;
};

export const getRecentContents = async () => {
  const res = await api.get("/content?limit=3&sort=desc");
  return res.data;
};
