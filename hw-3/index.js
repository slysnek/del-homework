const taskButton = document.querySelector('.task-button');
const clearButton = document.querySelector('.clear');
const consoleList = document.querySelector('.console-list');
const consoleWindow = document.querySelector('.console-window');

clearButton.addEventListener('click', clearConsole);
taskButton.addEventListener('click', startTasking);

function clearConsole() {
  consoleList.innerHTML = '';
}

function startTasking() {
  console.log('first timeout in 1s');
  setTimeout(() => {
    console.log('1 timeout working');
    Promise.resolve().then(() => {
      console.log('1 promise resolved');
    });
    requestAnimationFrame(() => {
      consoleWindow.style.background = 'whitesmoke';
      consoleWindow.style.color = 'rgb(10, 10, 10)';
      const message = document.createElement('li');
      message.textContent = 'changed style - render';
      consoleList.appendChild(message);
      console.log('changed style - render');
    })
  }, 1000);
  console.log('second timeout in 2s');
  setTimeout(() => {
    console.log('2 timeout working');
    Promise.resolve().then(() => {
      console.log('2 promise resolved');
    });
    Promise.reject().catch(() => {
      console.log('2.1 promise rejected');
    });
  }, 2000);
  console.log('third timeout in 3s');
  setTimeout(() => {
    console.log('3 timeout working');
    Promise.resolve().then(() => {
      console.log('3 promise resolved');
    });
    requestAnimationFrame(() => {
      consoleWindow.style.background = 'rgb(10, 10, 10)';
      consoleWindow.style.color = 'whitesmoke';
      const message = document.createElement('li');
      message.textContent = 'changed style - render';
      consoleList.appendChild(message);
      console.log('changed style - render');
    })
  }, 3000);
}
