// DOM Elements
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');
const emptyState = document.getElementById('emptyState');
const taskCount = document.getElementById('taskCount');

// Load tasks on page load
document.addEventListener('DOMContentLoaded', loadTasks);

// Event listeners
addTaskBtn.addEventListener('click', addTask);
taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTask();
});

// Load all tasks from API
async function loadTasks() {
    try {
        const response = await fetch('/api/tasks');
        const data = await response.json();
        renderTasks(data.tasks);
    } catch (error) {
        console.error('Error loading tasks:', error);
    }
}

// Add a new task
async function addTask() {
    const title = taskInput.value.trim();
    
    if (!title) {
        taskInput.focus();
        return;
    }
    
    try {
        const response = await fetch('/api/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title }),
        });
        
        if (response.ok) {
            taskInput.value = '';
            await loadTasks();
        }
    } catch (error) {
        console.error('Error adding task:', error);
    }
}

// Toggle task completion
async function toggleTask(taskId, completed) {
    try {
        const response = await fetch(`/api/tasks/${taskId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ completed: !completed }),
        });
        
        if (response.ok) {
            await loadTasks();
        }
    } catch (error) {
        console.error('Error toggling task:', error);
    }
}

// Delete a task
async function deleteTask(taskId) {
    try {
        const response = await fetch(`/api/tasks/${taskId}`, {
            method: 'DELETE',
        });
        
        if (response.ok) {
            await loadTasks();
        }
    } catch (error) {
        console.error('Error deleting task:', error);
    }
}

// Render tasks to the DOM
function renderTasks(tasks) {
    taskList.innerHTML = '';
    
    if (tasks.length === 0) {
        emptyState.classList.remove('hidden');
        taskCount.textContent = '0 tasks';
        return;
    }
    
    emptyState.classList.add('hidden');
    taskCount.textContent = `${tasks.length} task${tasks.length !== 1 ? 's' : ''}`;
    
    tasks.forEach(task => {
        const li = document.createElement('li');
        li.className = `task-item ${task.completed ? 'completed' : ''}`;
        
        li.innerHTML = `
            <div class="checkbox ${task.completed ? 'checked' : ''}" onclick="toggleTask(${task.id}, ${task.completed})"></div>
            <span class="task-text">${escapeHtml(task.title)}</span>
            <button class="delete-btn" onclick="deleteTask(${task.id})">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M6 6L14 14M6 14L14 6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                </svg>
            </button>
        `;
        
        taskList.appendChild(li);
    });
}

// Utility function to escape HTML
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
