import { UI } from "./UI.js";

class TodoList extends UI {
  constructor(props) {
    super(props);
    this.input = null;
    this.btnSubmit = null;
    this.list = null;
    this.listTasks = null;
    this.clearListBtn = null;
    this.editBtn = null;
    this.saveBtn = null;
    this.deleteBtn = null;

    this.disabledBtn = false;

    this.tasksArr = [];
  }
  initialize() {
    this.handleElements();
    this.submitInput();
    this.removeAll();
    this.editList();
    this.saveList();
    this.delete();
  }
  handleElements() {
    this.input = this.getElement(this.UiSelectors.input);
    this.btnSubmit = this.getElement(this.UiSelectors.btnSubmit);
    this.list = this.getElement(this.UiSelectors.list);
    this.listTasks = this.getElement(this.UiSelectors.listTasks);
    this.clearListBtn = this.getElement(this.UiSelectors.clearList);
    this.editBtn = this.getElement(this.UiSelectors.editBtn);
    this.saveBtn = this.getElement(this.UiSelectors.saveBtn);
    this.deleteBtn = this.getElement(this.UiSelectors.deleteBtn);
  }
  submitInput() {
    this.btnSubmit.addEventListener("click", () => {
      const task = this.input.value;
      if (task) {
        const newTask = document.createElement("input");
        newTask.setAttribute("readonly", "");
        newTask.setAttribute("task", "");
        newTask.setAttribute("id", `${this.tasksArr.length}`);

        newTask.value = task;

        const checkbox = document.createElement("input");
        checkbox.setAttribute("type", `checkbox`);
        checkbox.setAttribute("id", `${this.tasksArr.length}`);

        const freshTask = {
          newTask,
          checkbox,
        };

        this.tasksArr.push(freshTask);

        this.clearList();
        this.refreshList();
        this.input.value = "";
      } else {
        alert("Write some task");
      }
    });
  }
  clearList() {
    this.listTasks.remove();
    const listTasks = document.createElement("div");
    listTasks.setAttribute("data-list_tasks", "");
    this.list.appendChild(listTasks);
    this.listTasks = this.getElement(this.UiSelectors.listTasks);

    this.disabledBtn = false;
    this.controlButtons();
  }
  refreshList() {
    this.tasksArr.forEach((item) => {
      this.listTasks.appendChild(item.checkbox, item.newTask);
      this.listTasks.appendChild(item.newTask);
    });
  }
  removeAll() {
    this.clearListBtn.addEventListener("click", () => {
      this.tasksArr = [];
      this.clearList();
    });
  }
  editList() {
    this.editBtn.addEventListener("click", () => {
      this.disabledBtn = true;
      this.controlButtons();
      this.modifyList();
    });
  }
  modifyList() {
    if (this.disabledBtn) {
      const listTasksDOM = document.querySelectorAll("[task]");
      [...listTasksDOM].forEach((item) => item.removeAttribute("readonly"));
      this.deleteBtn.setAttribute("disabled", true);
    } else {
      const listTasksDOM = document.querySelectorAll("[task]");
      [...listTasksDOM].forEach((item) => item.setAttribute("readonly", ""));
      this.deleteBtn.removeAttribute("disabled");
    }
  }
  controlButtons() {
    if (this.disabledBtn) {
      this.editBtn.setAttribute("disabled", true);
      this.saveBtn.removeAttribute("disabled");
    } else {
      this.saveBtn.setAttribute("disabled", true);
      this.editBtn.removeAttribute("disabled");
    }
  }

  saveList() {
    this.saveBtn.addEventListener("click", () => {
      this.disabledBtn = false;
      this.controlButtons();
      this.modifyList();
      this.refreshList();
    });
  }
  delete() {
    this.deleteBtn.addEventListener("click", () => {
      if (!this.tasksArr.length) return;

      const checkboxes = [...document.querySelectorAll("[type=checkbox]")];
      const tasks = [...document.querySelectorAll("[task]")];

      const checkboxArr = checkboxes.filter((item) => item.checked === false);
      const newTaskArr = [];

      tasks.map((newTask) => {
        checkboxArr.map((checkbox) => {
          if (newTask.getAttribute("id") === checkbox.getAttribute("id")) {
            newTaskArr.push({ newTask, checkbox });
          }
        });
      });

      this.tasksArr = newTaskArr;
      this.clearList();
      this.refreshList();
    });
  }
}

window.onload = function () {
  const todo = new TodoList();

  todo.initialize();
};
