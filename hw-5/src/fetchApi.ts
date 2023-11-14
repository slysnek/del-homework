import { AddTaskForm, ChangeTaskForm, ChangeTaskPartiallyForm, ITasksResponse } from './types';

export default class Fetch {
  async getData(url: URL): Promise<ITasksResponse[]> {
    try {
      const data = await fetch(url, {
        method: 'GET',
      });
      const parsedData = await data.json();
      return parsedData;
    } catch (error) {
      throw new Error(error);
    }
  }
  async addData(url: URL, formData: AddTaskForm): Promise<ITasksResponse> {
    try {
      const data = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({
          name: formData.name,
          info: formData.info,
          isCompleted: formData.isCompleted,
          isImportant: formData.isImportant,
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });
      const parsedData = await data.json();
      return parsedData;
    } catch (error) {
      throw new Error(error);
    }
  }
  async changeData(url: URL, formData: ChangeTaskForm): Promise<ITasksResponse> {
    try {
      const resource = `${url}/${formData.id}`;
      const data = await fetch(resource, {
        method: 'PUT',
        body: JSON.stringify({
          name: formData.name,
          info: formData.info,
          isCompleted: formData.isCompleted,
          isImportant: formData.isImportant,
          id: formData.id,
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });
      const parsedData = await data.json();
      return parsedData;
    } catch (error) {
      throw new Error(error);
    }
  }
  async changeDataPartially(url: URL, formData: ChangeTaskPartiallyForm): Promise<ITasksResponse> {
    try {
      const resource = `${url}/${formData.id}`;
      const data = await fetch(resource, {
        method: 'PATCH',
        body: JSON.stringify({
          info: formData.info,
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });
      const parsedData = await data.json();
      return parsedData;
    } catch (error) {
      throw new Error(error);
    }
  }
  async deleteData(url: URL, id: string): Promise<void> {
    try {
      const resource = `${url}/${id}`;
      const data = await fetch(resource, {
        method: 'DELETE',
      });
      if (!data.ok) {
        throw new Error("Task doesn't exist");
      }
      const parsedData = await data.json();
      return parsedData;
    } catch (error) {
      throw new Error(error);
    }
  }
}
