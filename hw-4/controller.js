export default class Controller {

  constructor(url, dataFetcher) {
    this.url = url;
    this.dataFetcher = dataFetcher;
  }

  async getData() {
    const response = await this.dataFetcher.getData(this.url);
    console.log('Getting data:');
    return response;
  }
  async addData(name, info, isCompleted, isImportant) {
    const response = await this.dataFetcher.addData(this.url, name, info, isCompleted, isImportant);
    console.log('Adding data:');
    return response;
  }
  async changeData(id, name, info, isCompleted, isImportant) {
    const response = await this.dataFetcher.changeData(this.url, id, name, info, isCompleted, isImportant)
    console.log('Changing data:');
    return response;
  }
  async changeDataPartially(info, id) {
    const response = await this.dataFetcher.changeDataPartially(this.url, info, id)
    console.log('Changing data partially:');
    return response;
  }
  async deleteData(id) {
    const response = await this.dataFetcher.deleteData(this.url, id);
    console.log('Deleted data.');
    return response;
  }

}
