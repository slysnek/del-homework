export interface ITasksResponse {
  name: string;
  info: string;
  isCompleted: boolean;
  isImportant: boolean;
  id: number;
}
export type AddTaskForm = {
  name?: string;
  info?: string;
  isCompleted?: string;
  isImportant?: string;
};
export type ChangeTaskForm = AddTaskForm & {
  id?: string;
};
export type ChangeTaskPartiallyForm = Omit<ChangeTaskForm, 'name' | 'isCompleted' | 'isImportant'>;
