var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export default class Controller {
    constructor(url, dataFetcher) {
        this.url = url;
        this.dataFetcher = dataFetcher;
    }
    getData() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.dataFetcher.getData(this.url);
            console.log('Getting data:');
            return response;
        });
    }
    addData(formData) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.dataFetcher.addData(this.url, formData);
            console.log('Adding data:');
            return response;
        });
    }
    changeData(formData) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.dataFetcher.changeData(this.url, formData);
            console.log('Changing data:');
            return response;
        });
    }
    changeDataPartially(formData) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.dataFetcher.changeDataPartially(this.url, formData);
            console.log('Changing data partially:');
            return response;
        });
    }
    deleteData(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.dataFetcher.deleteData(this.url, id);
            console.log('Deleted data.');
            return response;
        });
    }
}
//# sourceMappingURL=controller.js.map