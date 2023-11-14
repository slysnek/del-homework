var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Controller from './controller.js';
import Fetch from './fetchApi.js';
import XMLHTTP from './xmlHTTP.js';
const url = new URL('http://37.220.80.108/tasks');
let controller = new Controller(url, new XMLHTTP());
const select = document.querySelector('.select-fetcher');
const getDataButton = document.querySelector('.controller-wrapper__get-data-button');
const addDataButton = document.querySelector('.add-form__button');
const changeDataButton = document.querySelector('.change-form__button');
const changeInfoButton = document.querySelector('.change-partially-form__button');
const deleteDataButton = document.querySelector('.delete-form__button');
const list = document.querySelector('.task-list');
select.addEventListener('change', (e) => {
    if (e.target) {
        changeFetcher(e.target.value);
    }
});
getDataButton.addEventListener('click', displayTask);
addDataButton.addEventListener('click', addTask);
changeDataButton.addEventListener('click', changeTask);
changeInfoButton.addEventListener('click', changeTaskPartially);
deleteDataButton.addEventListener('click', deleteTask);
function changeFetcher(fetchType) {
    console.log(fetchType);
    controller = fetchType === 'Fetch' ? new Controller(url, new Fetch()) : new Controller(url, new XMLHTTP());
    console.log(controller);
}
function displayTaskInfo(innerList) {
    innerList.classList.contains('hidden') ? innerList.classList.remove('hidden') : innerList.classList.add('hidden');
}
function displayTask() {
    return __awaiter(this, void 0, void 0, function* () {
        list.innerHTML = '';
        const data = yield controller.getData();
        console.log(data);
        data.map((task) => {
            const taskElement = document.createElement('li');
            const innerList = document.createElement('ul');
            const info = document.createElement('li');
            const isCompleted = document.createElement('li');
            const isImportant = document.createElement('li');
            const id = document.createElement('li');
            taskElement.classList.add('task-list__task');
            innerList.classList.add('hidden');
            taskElement.textContent = task.name;
            info.textContent = `Info: ${task.info}`;
            isCompleted.textContent = `Completed: ${task.isCompleted}`;
            isImportant.textContent = `Important: ${task.isImportant}`;
            id.textContent = `Id: ${task.id}`;
            taskElement.appendChild(innerList);
            innerList.appendChild(info);
            innerList.appendChild(isCompleted);
            innerList.appendChild(isImportant);
            innerList.appendChild(id);
            taskElement.addEventListener('click', () => {
                displayTaskInfo(innerList);
            });
            list.appendChild(taskElement);
        });
    });
}
function addTask() {
    return __awaiter(this, void 0, void 0, function* () {
        const form = document.querySelector('.add-form');
        if (form.checkValidity()) {
            list.innerHTML = '';
            form.addEventListener('submit', (e) => e.preventDefault());
            const formData = new FormData(form);
            const isImportant = document.querySelector('#isImportant');
            const isCompleted = document.querySelector('#isCompleted');
            formData.append('isImportant', isImportant.checked ? 'true' : 'false');
            formData.append('isCompleted', isCompleted.checked ? 'true' : 'false');
            const formDataObject = {};
            formData.forEach((val, key) => {
                formDataObject[key] = String(val);
            });
            const data = yield controller.addData(formDataObject);
            console.log(data);
            const infoMessage = document.createElement('p');
            infoMessage.textContent = `Created task with title "${data.name}", body "${data.info}", id ${data.id}. Important: ${data.isImportant}. Completed: ${data.isCompleted}`;
            list.appendChild(infoMessage);
            form.reset();
        }
    });
}
function changeTask() {
    return __awaiter(this, void 0, void 0, function* () {
        const form = document.querySelector('.change-form');
        if (form.checkValidity()) {
            list.innerHTML = '';
            form.addEventListener('submit', (e) => e.preventDefault());
            const formData = new FormData(form);
            const isImportant = document.querySelector('#isStillImportant');
            const isCompleted = document.querySelector('#isStillCompleted');
            formData.append('isImportant', isImportant.checked ? 'true' : 'false');
            formData.append('isCompleted', isCompleted.checked ? 'true' : 'false');
            const formDataObject = {};
            formData.forEach((val, key) => {
                formDataObject[key] = String(val);
            });
            const data = yield controller.changeData(formDataObject);
            console.log(data);
            const infoMessage = document.createElement('p');
            if (data) {
                infoMessage.textContent = `Changed task with id "${data.id}". New name: "${data.name}", new info:  "${data.info}". Important: ${data.isImportant}. Completed: ${data.isCompleted}`;
            }
            list.appendChild(infoMessage);
            infoMessage.textContent = `Couldn't change the task. Perhaps it doesn't exist?`;
            form.reset();
        }
    });
}
function changeTaskPartially() {
    return __awaiter(this, void 0, void 0, function* () {
        const form = document.querySelector('.change-partially-form');
        if (form.checkValidity()) {
            list.innerHTML = '';
            form.addEventListener('submit', (e) => e.preventDefault());
            const formData = new FormData(form);
            const formDataObject = {};
            formData.forEach((val, key) => {
                formDataObject[key] = String(val);
            });
            const data = yield controller.changeDataPartially(formDataObject);
            console.log(data);
            const infoMessage = document.createElement('p');
            if (data) {
                infoMessage.textContent = `Changed info for task with id "${data.id} partially". New info: "${data.info}".`;
            }
            infoMessage.textContent = `Couldn't change the task's info. Perhaps it doesn't exist?`;
            list.appendChild(infoMessage);
            form.reset();
        }
    });
}
function deleteTask() {
    return __awaiter(this, void 0, void 0, function* () {
        const form = document.querySelector('.delete-form');
        if (form.checkValidity()) {
            list.innerHTML = '';
            form.addEventListener('submit', (e) => e.preventDefault());
            const formData = new FormData(form);
            const taskIdToDelete = formData.get('id');
            const taskElement = document.createElement('p');
            try {
                yield controller.deleteData(taskIdToDelete);
                taskElement.textContent = `Task with id ${taskIdToDelete} is deleted`;
            }
            catch (error) {
                taskElement.textContent = `Couldn't delete the task. Perhaps it doesn't exist?`;
            }
            list.appendChild(taskElement);
        }
    });
}
//# sourceMappingURL=index.js.map