var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export default class XMLHTTP {
    getData(url) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.sendRequest('GET', url);
                const parsedData = JSON.parse(response);
                return parsedData;
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    addData(url, formData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const requestBody = JSON.stringify({
                    name: formData.name,
                    info: formData.info,
                    isCompleted: formData.isCompleted,
                    isImportant: formData.isImportant,
                });
                const response = yield this.sendRequest('POST', url, requestBody);
                const parsedData = JSON.parse(response);
                return parsedData;
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    changeData(url, formData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const resource = new URL(`${url}/${formData.id}`);
                const requestBody = JSON.stringify({
                    name: formData.name,
                    info: formData.info,
                    isCompleted: formData.isCompleted,
                    isImportant: formData.isImportant,
                    id: formData.id,
                });
                const response = yield this.sendRequest('PUT', resource, requestBody);
                const parsedData = JSON.parse(response);
                return parsedData;
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    changeDataPartially(url, formData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const resource = new URL(`${url}/${formData.id}`);
                const requestBody = JSON.stringify({
                    info: formData.info,
                });
                const response = yield this.sendRequest('PATCH', resource, requestBody);
                const parsedData = JSON.parse(response);
                return parsedData;
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    deleteData(url, id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const resource = new URL(`${url}/${id}`);
                const response = yield this.sendRequest('DELETE', resource);
                const parsedData = JSON.parse(response);
                return parsedData;
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    sendRequest(method, url, body = null) {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open(method, url, true);
            xhr.setRequestHeader('Content-type', 'application/json; charset=UTF-8');
            xhr.onload = function () {
                if (xhr.status === 200 || xhr.status === 201) {
                    resolve(xhr.responseText);
                }
                else {
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
//# sourceMappingURL=xmlHTTP.js.map