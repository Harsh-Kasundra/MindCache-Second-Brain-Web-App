export type ContentStats = {
  total: number;
  instagram: number;
  twitter: number;
  youtube: number;
};

export type ContentProps = {
  content_id: string;
  content_type: string;
  content_title: string;
  content_createdAt: string;
  content_description: string;
  content_tag: string;
  content_link: string;
};

export type TaskProps = {
  task_id: string;
  task_title: string;
  task_description: string;
  task_due_date: string;
  task_due_time?: string;
  task_type: string;
  task_priority: "Low" | "Medium" | "High";
  completed: boolean;
  user_id: string;
  task_createdAt: string;
};
