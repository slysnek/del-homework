import { AddTaskForm, ChangeTaskForm, ChangeTaskPartiallyForm, ITasksResponse } from './types';

export default class XMLHTTP {
  async getData(url: URL): Promise<ITasksResponse[]> {
    try {
      const response = await this.sendRequest('GET', url);
      const parsedData = JSON.parse(response);
      return parsedData;
    } catch (error) {
      throw new Error(error);
    }
  }

  async addData(url: URL, formData: AddTaskForm): Promise<ITasksResponse> {
    try {
      const requestBody = JSON.stringify({
        name: formData.name,
        info: formData.info,
        isCompleted: formData.isCompleted,
        isImportant: formData.isImportant,
      });
      const response = await this.sendRequest('POST', url, requestBody);
      const parsedData = JSON.parse(response);
      return parsedData;
    } catch (error) {
      throw new Error(error);
    }
  }

  async changeData(url: URL, formData: ChangeTaskForm): Promise<ITasksResponse> {
    try {
      const resource = new URL(`${url}/${formData.id}`);
      const requestBody = JSON.stringify({
        name: formData.name,
        info: formData.info,
        isCompleted: formData.isCompleted,
        isImportant: formData.isImportant,
        id: formData.id,
      });
      const response = await this.sendRequest('PUT', resource, requestBody);
      const parsedData = JSON.parse(response);
      return parsedData;
    } catch (error) {
      throw new Error(error);
    }
  }

  async changeDataPartially(url: URL, formData: ChangeTaskPartiallyForm): Promise<ITasksResponse> {
    try {
      const resource = new URL(`${url}/${formData.id}`);
      const requestBody = JSON.stringify({
        info: formData.info,
      });
      const response = await this.sendRequest('PATCH', resource, requestBody);
      const parsedData = JSON.parse(response);
      return parsedData;
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteData(url: URL, id: string): Promise<void> {
    try {
      const resource = new URL(`${url}/${id}`);
      const response = await this.sendRequest('DELETE', resource);
      const parsedData = JSON.parse(response);
      return parsedData;
    } catch (error) {
      throw new Error(error);
    }
  }

  sendRequest(method: string, url: URL, body: string | null = null): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(method, url, true);
      xhr.setRequestHeader('Content-type', 'application/json; charset=UTF-8');

      xhr.onload = function (): void {
        if (xhr.status === 200 || xhr.status === 201) {
          resolve(xhr.responseText);
        } else {
          reject(`XHR error: ${xhr.status} ${xhr.statusText}`);
        }
      };

      xhr.onerror = function (): void {
        reject('Network error');
      };

      xhr.send(body);
    });
  }
}
