import api from "./axios";

export const getTask = async () => {
  const res = await api.get("/task");
  return res.data;
};

export const markDoneTask = async (task_id: string, completed: boolean) => {
  const res = await api.patch(`/task/${task_id}/done`, {
    completed: completed,
  });
  return res.data;
};
