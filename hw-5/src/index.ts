import Controller from './controller.js';
import Fetch from './fetchApi.js';
import { AddTaskForm, ChangeTaskForm, ChangeTaskPartiallyForm } from './types';
import XMLHTTP from './xmlHTTP.js';

const url = new URL('http://37.220.80.108/tasks');

let controller = new Controller(url, new XMLHTTP());

const select = document.querySelector('.select-fetcher') as HTMLSelectElement;
const getDataButton = document.querySelector('.controller-wrapper__get-data-button') as Element;
const addDataButton = document.querySelector('.add-form__button') as Element;
const changeDataButton = document.querySelector('.change-form__button') as Element;
const changeInfoButton = document.querySelector('.change-partially-form__button') as Element;
const deleteDataButton = document.querySelector('.delete-form__button') as Element;

const list = document.querySelector('.task-list') as Element;

select.addEventListener('change', (e) => {
  if (e.target) {
    changeFetcher((e.target as HTMLSelectElement).value);
  }
});
getDataButton.addEventListener('click', displayTask);
addDataButton.addEventListener('click', addTask);
changeDataButton.addEventListener('click', changeTask);
changeInfoButton.addEventListener('click', changeTaskPartially);
deleteDataButton.addEventListener('click', deleteTask);

function changeFetcher(fetchType: string): void {
  console.log(fetchType);
  controller = fetchType === 'Fetch' ? new Controller(url, new Fetch()) : new Controller(url, new XMLHTTP());
  console.log(controller);
}

function displayTaskInfo(innerList: HTMLUListElement): void {
  innerList.classList.contains('hidden') ? innerList.classList.remove('hidden') : innerList.classList.add('hidden');
}

async function displayTask(): Promise<void> {
  list.innerHTML = '';
  const data = await controller.getData();
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
}

async function addTask(): Promise<void> {
  const form = document.querySelector('.add-form') as HTMLFormElement;
  if (form.checkValidity()) {
    list.innerHTML = '';

    form.addEventListener('submit', (e) => e.preventDefault());
    const formData = new FormData(form);
    const isImportant = document.querySelector('#isImportant') as HTMLInputElement;
    const isCompleted = document.querySelector('#isCompleted') as HTMLInputElement;

    formData.append('isImportant', isImportant.checked ? 'true' : 'false');
    formData.append('isCompleted', isCompleted.checked ? 'true' : 'false');

    const formDataObject: AddTaskForm = {};

    formData.forEach((val, key) => {
      formDataObject[key as keyof AddTaskForm] = String(val);
    });

    const data = await controller.addData(formDataObject);

    console.log(data);
    const infoMessage = document.createElement('p');
    infoMessage.textContent = `Created task with title "${data.name}", body "${data.info}", id ${data.id}. Important: ${data.isImportant}. Completed: ${data.isCompleted}`;
    list.appendChild(infoMessage);

    form.reset();
  }
}

async function changeTask(): Promise<void> {
  const form = document.querySelector('.change-form') as HTMLFormElement;
  if (form.checkValidity()) {
    list.innerHTML = '';

    form.addEventListener('submit', (e) => e.preventDefault());
    const formData = new FormData(form);
    const isImportant = document.querySelector('#isStillImportant') as HTMLInputElement;
    const isCompleted = document.querySelector('#isStillCompleted') as HTMLInputElement;

    formData.append('isImportant', isImportant.checked ? 'true' : 'false');
    formData.append('isCompleted', isCompleted.checked ? 'true' : 'false');

    const formDataObject: ChangeTaskForm = {};

    formData.forEach((val, key) => {
      formDataObject[key as keyof ChangeTaskForm] = String(val);
    });

    const data = await controller.changeData(formDataObject);

    console.log(data);
    const infoMessage = document.createElement('p');
    if (data) {
      infoMessage.textContent = `Changed task with id "${data.id}". New name: "${data.name}", new info:  "${data.info}". Important: ${data.isImportant}. Completed: ${data.isCompleted}`;
    }

    list.appendChild(infoMessage);
    infoMessage.textContent = `Couldn't change the task. Perhaps it doesn't exist?`;
    form.reset();
  }
}

async function changeTaskPartially(): Promise<void> {
  const form = document.querySelector('.change-partially-form') as HTMLFormElement;
  if (form.checkValidity()) {
    list.innerHTML = '';

    form.addEventListener('submit', (e) => e.preventDefault());
    const formData = new FormData(form);

    const formDataObject: ChangeTaskPartiallyForm = {};

    formData.forEach((val, key) => {
      formDataObject[key as keyof ChangeTaskPartiallyForm] = String(val);
    });

    const data = await controller.changeDataPartially(formDataObject);

    console.log(data);
    const infoMessage = document.createElement('p');
    if (data) {
      infoMessage.textContent = `Changed info for task with id "${data.id} partially". New info: "${data.info}".`;
    }
    infoMessage.textContent = `Couldn't change the task's info. Perhaps it doesn't exist?`;
    list.appendChild(infoMessage);

    form.reset();
  }
}

async function deleteTask(): Promise<void> {
  const form = document.querySelector('.delete-form') as HTMLFormElement;
  if (form.checkValidity()) {
    list.innerHTML = '';

    form.addEventListener('submit', (e) => e.preventDefault());

    const formData = new FormData(form);
    const taskIdToDelete = formData.get('id') as string;
    const taskElement = document.createElement('p');
    try {
      await controller.deleteData(taskIdToDelete);
      taskElement.textContent = `Task with id ${taskIdToDelete} is deleted`;
    } catch (error) {
      taskElement.textContent = `Couldn't delete the task. Perhaps it doesn't exist?`;
    }
    list.appendChild(taskElement);
  }
}
