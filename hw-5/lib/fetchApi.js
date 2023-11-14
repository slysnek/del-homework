var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export default class Fetch {
    getData(url) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield fetch(url, {
                    method: 'GET',
                });
                const parsedData = yield data.json();
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
                const data = yield fetch(url, {
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
                const parsedData = yield data.json();
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
                const resource = `${url}/${formData.id}`;
                const data = yield fetch(resource, {
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
                const parsedData = yield data.json();
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
                const resource = `${url}/${formData.id}`;
                const data = yield fetch(resource, {
                    method: 'PATCH',
                    body: JSON.stringify({
                        info: formData.info,
                    }),
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                    },
                });
                const parsedData = yield data.json();
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
                const resource = `${url}/${id}`;
                const data = yield fetch(resource, {
                    method: 'DELETE',
                });
                if (!data.ok) {
                    throw new Error("Task doesn't exist");
                }
                const parsedData = yield data.json();
                return parsedData;
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
}
//# sourceMappingURL=fetchApi.js.map