
// ============================================
// 1. SELECT HTML ELEMENTS
// ============================================

const todoForm = document.querySelector("#todo-form");
const taskInput = document.querySelector("#task-input");
const taskList = document.querySelector("#task-list");

const itemsLeft = document.querySelector("#items-left");
const clearCompletedBtn = document.querySelector("#clear-completed");

const filterButtons = document.querySelectorAll(".filter-btn");

// ============================================
// 2. TASK DATA
// ============================================

let tasks = [];

let currentFilter = "all";

// ============================================
// 3. DISPLAY TASKS ON THE PAGE
// ============================================

function renderTasks() {

    // Clear the existing task list
    taskList.textContent = "";

    // Filter tasks depending on the selected filter
    let filteredTasks = tasks.filter(function(task) {

        if (currentFilter === "active") {
            return !task.completed;
        }

        if (currentFilter === "completed") {
            return task.completed;
        }

        return true;
    });

    // Create HTML elements for each task
    filteredTasks.forEach(function(task) {

        // Create a list item
        const li = document.createElement("li");

        // Store the task ID on the list item
        li.dataset.id = task.id;

        // Create the task text
        const span = document.createElement("span");
        span.classList.add("task-text");

        // Display the task text safely
        span.textContent = task.text;

        // Show completed tasks with a line through them
        if (task.completed) {
            span.classList.add("completed");
        }

        // Create the delete button
        const deleteButton = document.createElement("button");

        deleteButton.textContent = "Delete";
        deleteButton.classList.add("delete-btn");

        // Add elements to the list item
        li.appendChild(span);
        li.appendChild(deleteButton);

        // Add the list item to the page
        taskList.appendChild(li);

    });

    updateCounter();
}

// ============================================
// 4. UPDATE TASK COUNTER
// ============================================

function updateCounter() {

    const activeCount = tasks.filter(function(task) {
        return !task.completed;
    }).length;

    itemsLeft.textContent =
        `${activeCount} ${activeCount === 1 ? "item" : "items"} left`;
}
// Display the initial task list
renderTasks();

// ============================================
// 5. ADD NEW TASKS
// ============================================

todoForm.addEventListener("submit", function(event) {

    // Prevent the page from refreshing
    event.preventDefault();

    // Get the user's input and remove extra spaces
    const taskText = taskInput.value.trim();

    // Do not allow empty tasks
    if (taskText === "") {
        return;
    }

    // Create a new task object
    const newTask = {
        id: Date.now(),
        text: taskText,
        completed: false
    };

    // Store the task in our array
    tasks.push(newTask);

    // Clear the input field
    taskInput.value = "";

    // Display the updated task list
    renderTasks();

});

// ============================================
// 6. FILTER TASKS
// ============================================

filterButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        // Get the selected filter
        currentFilter = button.dataset.filter;

        // Update the active filter appearance
        filterButtons.forEach(function(filterButton) {
            filterButton.classList.remove("active");
        });

        button.classList.add("active");

        // Display the filtered tasks
        renderTasks();

    });

});

// ============================================
// 7. COMPLETE AND DELETE TASKS
// EVENT DELEGATION
// ============================================

taskList.addEventListener("click", function(event) {

    // Find the task container that was clicked
    const taskItem = event.target.closest("li");

    // Stop if no task was clicked
    if (!taskItem) {
        return;
    }

    // Get the task ID
    const taskId = Number(taskItem.dataset.id);

    // Check if the Delete button was clicked
    if (event.target.classList.contains("delete-btn")) {

        tasks = tasks.filter(function(task) {
            return task.id !== taskId;
        });

    } else if (event.target.classList.contains("task-text")) {

        // Find the task and toggle its completed status
        tasks = tasks.map(function(task) {

            if (task.id === taskId) {
                task.completed = !task.completed;
            }

            return task;
        });

    }

    // Redraw the list
    renderTasks();

});

// ============================================
// 8. CLEAR COMPLETED TASKS
// ============================================

clearCompletedBtn.addEventListener("click", function() {

    // Keep only tasks that are not completed
    tasks = tasks.filter(function(task) {
        return !task.completed;
    });

    // Update the page
    renderTasks();

});

// ============================================
// 9. EDIT TASKS
// BONUS FEATURE
// ============================================

taskList.addEventListener("dblclick", function(event) {

    if (!event.target.classList.contains("task-text")) {
        return;
    }

    const taskItem = event.target.closest("li");
    const taskId = Number(taskItem.dataset.id);

    const task = tasks.find(function(item) {
        return item.id === taskId;
    });

    const originalText = task.text;

    // Create an editing input
    const editInput = document.createElement("input");
    editInput.type = "text";
    editInput.value = originalText;

    // Replace the task text with the input
    taskItem.replaceChild(editInput, event.target);

    editInput.focus();

    // Save the edited task
    function saveEdit() {
        const newText = editInput.value.trim();

        if (newText !== "") {
            task.text = newText;
        }

        renderTasks();
    }

    // Cancel editing
    function cancelEdit() {
        renderTasks();
    }

    editInput.addEventListener("keydown", function(keyEvent) {

        if (keyEvent.key === "Enter") {
            saveEdit();
        }

        if (keyEvent.key === "Escape") {
            cancelEdit();
        }

    });

});
