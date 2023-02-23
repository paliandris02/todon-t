class TaskView {
  _data;
  _parentEl = document.querySelector(".task-list");
  _btnAdd = document.querySelector(".add-task");

  addHandlerRender(handler) {
    this._btnAdd.addEventListener("click", handler);
  }

  render(data) {
    if (!data) {
      console.log("Error in view render");
      return;
    }
    this._data = data;
    const markup = this._generateMarkup();
    this._clearParentEl();
    if (!this._parentEl) {
      console.log(this._parentEl);
      console.log("parentel error");
    }
    this._parentEl.insertAdjacentHTML("afterbegin", markup);
  }
  _generateMarkup() {
    let tasks = "";
    for (const task of this._data) {
      tasks += this._generateMarkupTask(task);
    }
    return tasks;
  }
  _clearParentEl() {
    this._parentEl.innerHTML = "";
  }
  _generateMarkupTask(task) {
    return `    <div class="task">
    <div class="task-title">${task.shortName}</div>
    <div class="btn-del">
      <ion-icon
        class="del-icon"
        name="close-circle-outline"
      ></ion-icon>
    </div>
    <div class="task-time-created">${task.dueDate}</div>
    <div class="task-description">${task.description}</div>
  </div>`;
  }
  getDataFromInpurt() {
    return {
      shortName: document.querySelector(".create-task-title").value,
      description: document.querySelector(".create-task-description").value,
      dueDate: document.querySelector(".task-datetime").value,
    };
  }
  clearInputs() {
    document.querySelector(".create-task-title").value = "";
    document.querySelector(".create-task-description").value = "";
    document.querySelector(".task-datetime").value = "";
  }
}
export default new TaskView();
