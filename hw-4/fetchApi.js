export default class Fetch {
  async getData(url) {
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
  async addData(url, name, info, isCompleted, isImportant) {
    try {
      const data = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({
          name: name,
          info: info,
          isCompleted: isCompleted,
          isImportant: isImportant,
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8'
        }
      });
      const parsedData = await data.json();
      return parsedData;
    } catch (error) {
      throw new Error(error);
    }

  }
  async changeData(url, id, name, info, isCompleted, isImportant) {
    try {
      const resource = `${url}/${id}`
      const data = await fetch(resource, {
        method: 'PUT',
        body: JSON.stringify({
          name: name,
          info: info,
          isCompleted: isCompleted,
          isImportant: isImportant,
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8'
        }
      });
      const parsedData = await data.json();
      return parsedData;
    } catch (error) {
      throw new Error(error);
    }
  }
  async changeDataPartially(url, info, id) {
    try {
      const resource = `${url}/${id}`
      const data = await fetch(resource, {
        method: 'PATCH',
        body: JSON.stringify({
          info: info,
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8'
        }
      });
      const parsedData = await data.json();
      return parsedData;
    } catch (error) {
      throw new Error(error);
    }
  }
  async deleteData(url, id) {
    try {
      const resource = `${url}/${id}`
      const data = await fetch(resource, {
        method: 'DELETE',
      });
      const parsedData = await data.json();
      return parsedData;
    } catch (error) {
      throw new Error(error);
    }
  }
}




