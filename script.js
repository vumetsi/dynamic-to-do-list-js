document.addEventListener('DOMContentLoaded', function() {
    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Function to add a new task
    function addTask() {
        const taskText = taskInput.value.trim();  // Get the task text and remove extra spaces
        
        if (taskText !== "") {  // Ensure the task text is not empty
            const li = document.createElement('li');  // Create a new list item
            li.textContent = taskText;  // Set the text of the list item
            
            // Create a remove button for the task
            const removeButton = document.createElement('button');
            removeButton.textContent = 'Remove';
            removeButton.classList.add('remove-btn');
            
            // Remove task when remove button is clicked
            removeButton.addEventListener('click', function() {
                taskList.removeChild(li);  // Remove the task from the list
            });
            
            // Append the remove button to the list item
            li.appendChild(removeButton);
            // Append the list item to the task list
            taskList.appendChild(li);

            // Clear the input field after adding the task
            taskInput.value = '';
        } else {
            alert('Please enter a task.');
        }
    }

    // Event listeners for the button and input field
    addButton.addEventListener('click', addTask);

    taskInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            addTask();  // Add task if Enter key is pressed
        }
    });
});
