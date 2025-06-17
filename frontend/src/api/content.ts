import api from "./axios";

export const fetchContentStats = async () => {
  const res = await api.get("/content/stats");
  return res.data;
};

export const getRecentContents = async () => {
  const res = await api.get("/content?limit=3&sort=desc");
  return res.data;
};

export const getAllContent = async (page = 1, limit = 6, type?: string) => {
  const res = await api.get(
    `/content?page=${page}&limit=${limit}${type ? `&type=${type}` : ""}`,
  );
  return res.data;
};
