document.addEventListener('DOMContentLoaded', function() {
    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Function to load tasks from localStorage
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]'); // Retrieve tasks from Local Storage
        storedTasks.forEach(taskText => addTask(taskText, false)); // Add tasks to DOM without saving again
    }

    // Function to save tasks to localStorage
    function saveTasks(tasks) {
        localStorage.setItem('tasks', JSON.stringify(tasks)); // Store tasks in Local Storage
    }

    // Function to add a new task
    function addTask(taskText, save = true) {
        if (taskText !== "") {  // Ensure taskText is not empty
            const li = document.createElement('li'); // Create a new list item
            li.textContent = taskText; // Set text for the task
            
            // Create a remove button for the task
            const removeButton = document.createElement('button');
            removeButton.textContent = 'Remove';
            removeButton.classList.add('remove-btn');

            // Remove task from the DOM and Local Storage when clicked
            removeButton.addEventListener('click', function() {
                taskList.removeChild(li);  // Remove task from DOM

                // Remove task from Local Storage
                const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
                const updatedTasks = storedTasks.filter(task => task !== taskText); // Remove task from array
                saveTasks(updatedTasks); // Save updated tasks to Local Storage
            });

            // Append the remove button to the task
            li.appendChild(removeButton);
            // Append the new task to the task list
            taskList.appendChild(li);

            // Save tasks to Local Storage if the task is new
            if (save) {
                const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
                storedTasks.push(taskText); // Add new task
                saveTasks(storedTasks); // Save updated tasks to Local Storage
            }

            // Clear the input field after task is added
            taskInput.value = '';
        } else {
            alert('Please enter a task.');
        }
    }

    // Event listeners for the button and input field
    addButton.addEventListener('click', function() {
        const taskText = taskInput.value.trim(); // Get task text
        addTask(taskText);
    });

    // Allow task addition with "Enter" key
    taskInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            const taskText = taskInput.value.trim();
            addTask(taskText);
        }
    });

    // Load tasks from Local Storage when page loads
    loadTasks();
});

