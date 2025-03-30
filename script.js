document.addEventListener("DOMContentLoaded", () => {
    const taskInput = document.getElementById("task-input");
    const addTaskBtn = document.getElementById("add-task");
    const taskList = document.getElementById("task-list");
    const darkModeToggle = document.getElementById("dark-mode-toggle");

    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.forEach(task => addTaskToDOM(task));
    }

    function saveTasks() {
        const tasks = Array.from(document.querySelectorAll("li")).map(li => ({
            text: li.querySelector(".task-text").textContent,
            completed: li.classList.contains("completed")
        }));
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    function addTaskToDOM(task) {
        const li = document.createElement("li");
        li.innerHTML = `<input type='checkbox' ${task.completed ? "checked" : ""}>
                        <div class='task-text'>${task.text}</div>
                        <button class='delete-task'>❌</button>`;
        if (task.completed) li.classList.add("completed");
        
        li.querySelector("input").addEventListener("change", () => {
            li.classList.toggle("completed");
            saveTasks();
        });
        
        li.querySelector(".delete-task").addEventListener("click", () => {
            li.remove();
            saveTasks();
        });
        
        taskList.appendChild(li);
    }

    addTaskBtn.addEventListener("click", () => {
        if (taskInput.value.trim()) {
            addTaskToDOM({ text: taskInput.value, completed: false });
            saveTasks();
            taskInput.value = "";
        }
    });

    darkModeToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
    });

    loadTasks();
});
