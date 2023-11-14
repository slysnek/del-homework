import Fetch from './fetchApi';
import { AddTaskForm, ChangeTaskForm, ChangeTaskPartiallyForm, ITasksResponse } from './types';
import XMLHTTP from './xmlHTTP';

export default class Controller {
  url: URL;
  dataFetcher: Fetch | XMLHTTP;

  constructor(url: URL, dataFetcher: Fetch | XMLHTTP) {
    this.url = url;
    this.dataFetcher = dataFetcher;
  }

  async getData(): Promise<ITasksResponse[]> {
    const response = await this.dataFetcher.getData(this.url);
    console.log('Getting data:');
    return response;
  }
  async addData(formData: AddTaskForm): Promise<ITasksResponse> {
    const response = await this.dataFetcher.addData(this.url, formData);
    console.log('Adding data:');
    return response;
  }
  async changeData(formData: ChangeTaskForm): Promise<ITasksResponse> {
    const response = await this.dataFetcher.changeData(this.url, formData);
    console.log('Changing data:');
    return response;
  }
  async changeDataPartially(formData: ChangeTaskPartiallyForm): Promise<ITasksResponse> {
    const response = await this.dataFetcher.changeDataPartially(this.url, formData);
    console.log('Changing data partially:');
    return response;
  }
  async deleteData(id: string): Promise<void> {
    const response = await this.dataFetcher.deleteData(this.url, id);
    console.log('Deleted data.');
    return response;
  }
}
