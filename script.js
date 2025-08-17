const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');
const clearBtn = document.getElementById('clearBtn');

let tasks = JSON.parse(localStorage.getItem('tasks') || '[]');

function save() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function render() {
  taskList.innerHTML = '';
  tasks.forEach((t, i) => {
    const li = document.createElement('li');
    li.className = 'task' + (t.done ? ' completed' : '');
    const label = document.createElement('label');
    const cb = document.createElement('input');
    cb.type = 'checkbox';
    cb.checked = t.done;
    cb.addEventListener('change', () => {
      tasks[i].done = !tasks[i].done;
      save(); render();
    });
    const span = document.createElement('span');
    span.textContent = t.text;
    label.appendChild(cb);
    label.appendChild(span);
    const del = document.createElement('button');
    del.textContent = 'Delete';
    del.className = 'delete';
    del.addEventListener('click', () => {
      tasks.splice(i, 1);
      save(); render();
    });
    li.appendChild(label);
    li.appendChild(del);
    taskList.appendChild(li);
  });
}

addBtn.addEventListener('click', () => {
  const text = taskInput.value.trim();
  if (!text) return;
  tasks.push({ text, done: false });
  taskInput.value = '';
  save(); render();
});

taskInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') addBtn.click();
});

clearBtn.addEventListener('click', () => {
  tasks = tasks.filter(t => !t.done);
  save(); render();
});

render();
