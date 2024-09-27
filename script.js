const taskInput = document.getElementById('taskInput');
const addButton = document.getElementById('addButton');
const taskList = document.getElementById('taskList');

let tasks = [];
let currentEditIndex = -1;

// Function to add or edit task
function addOrEditTask() {
    const taskText = taskInput.value.trim();
    if (taskText === '') {
        alert('Please enter a task!');
        return;
    }

    if (currentEditIndex === -1) {
        tasks.push({ text: taskText, completed: false });
    } else {
        tasks[currentEditIndex].text = taskText;
        currentEditIndex = -1;
    }
    
    taskInput.value = '';
    renderTasks();
}

// Add event listener for Add button
addButton.addEventListener('click', addOrEditTask);

// Add event listener for Enter key press
taskInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        addOrEditTask();
    }
});

// Function to render tasks in the list
function renderTasks() {
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span class="${task.completed ? 'completed' : ''}">${task.text}</span>
            <div>
                <button onclick="toggleCompletion(${index})">${task.completed ? 'Undo' : 'Complete'}</button>
                <button class="editButton" onclick="editTask(${index})">Edit</button>
                <button onclick="deleteTask(${index})">Delete</button>
            </div>
        `;
        taskList.appendChild(li);
    });
}

// Function to delete a task
function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks();
}

// Function to edit a task
function editTask(index) {
    taskInput.value = tasks[index].text;
    currentEditIndex = index;
}

// Function to toggle task completion
function toggleCompletion(index) {
    tasks[index].completed = !tasks[index].completed;
    renderTasks();
}
