export default class XMLHTTP {
  async getData(url) {
    try {
      const response = await this.sendRequest('GET', url);
      const parsedData = JSON.parse(response);
      return parsedData;
    } catch (error) {
      throw new Error(error);
    }
  }

  async addData(url, name, info, isCompleted, isImportant) {
    try {
      const requestBody = JSON.stringify({
        name: name,
        info: info,
        isCompleted: isCompleted,
        isImportant: isImportant,
      });
      const response = await this.sendRequest('POST', url, requestBody);
      const parsedData = JSON.parse(response);
      return parsedData;
    } catch (error) {
      throw new Error(error);
    }
  }

  async changeData(url, id, name, info, isCompleted, isImportant) {
    try {
      const resource = `${url}/${id}`;
      const requestBody = JSON.stringify({
        name: name,
        info: info,
        isCompleted: isCompleted,
        isImportant: isImportant,
      });
      const response = await this.sendRequest('PUT', resource, requestBody);
      const parsedData = JSON.parse(response);
      return parsedData;
    } catch (error) {
      throw new Error(error);
    }
  }

  async changeDataPartially(url, info, id) {
    try {
      const resource = `${url}/${id}`;
      const requestBody = JSON.stringify({
        info: info,
      });
      const response = await this.sendRequest('PATCH', resource, requestBody);
      const parsedData = JSON.parse(response);
      return parsedData;
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteData(url, id) {
    try {
      const resource = `${url}/${id}`;
      const response = await this.sendRequest('DELETE', resource);
      const parsedData = JSON.parse(response);
      return parsedData;
    } catch (error) {
      throw new Error(error);
    }
  }

  sendRequest(method, url, body = null) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(method, url, true);
      xhr.setRequestHeader('Content-type', 'application/json; charset=UTF-8');

      xhr.onload = function () {
        if (xhr.status === 200 || xhr.status === 201) {
          resolve(xhr.responseText);
        } else {
          reject(`XHR error: ${xhr.status} ${xhr.statusText}`);
        }
      };

      xhr.onerror = function () {
        reject('Network error');
      };

      xhr.send(body);
    });
  }
}