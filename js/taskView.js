class TaskView {
  _data;
  _parentEl = document.querySelector(".task-list");
  _btnAdd = document.querySelector(".add-task-text");
  _inputShortName = document.querySelector(".create-task-title");
  _inputDescription = document.querySelector(".create-task-description");
  _inputDateTime = document.querySelector(".task-datetime");

  //
  addHandlerRender(handler) {
    this._btnAdd.addEventListener("click", handler);
  }
  //
  addHandlerDelete(handler) {
    this._parentEl.addEventListener("click", function (e) {
      if (!e.target.classList.contains("del-icon")) {
        return;
      }
      const task = e.target.closest(".task");
      if (!task) return;

      const id = task.dataset.id;
      if (!id) return;

      handler(id);
    });
  }
  addHandlerDoneState(handler) {
    this._parentEl.addEventListener("click", function (e) {
      if (e.target.classList.contains("del-icon")) {
        return;
      }
      const task = e.target.closest(".task");
      if (!task) return;

      const id = task.dataset.id;
      if (!id) return;
      handler(id);
    });
  }

  render(data) {
    if (!data) {
      console.log("Error in view render");
      return;
    }
    this._data = data;
    const markup = this._generateMarkup();
    this._clearParentEl();

    this._parentEl.insertAdjacentHTML("afterbegin", markup);
  }
  //
  _generateMarkup() {
    let tasks = "";
    for (const task of this._data) {
      tasks += this._generateMarkupTask(task);
    }
    return tasks;
  }
  //
  _clearParentEl() {
    this._parentEl.innerHTML = "";
  }
  //
  _generateMarkupTask(task) {
    return `    <div data-id=${task.id} class="task ${
      task.isDone ? "done" : "undone"
    }">
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
  //
  getDataFromInpurt() {
    return {
      shortName: this._inputShortName.value,
      description: this._inputDescription.value,
      dueDate: this._inputDateTime.value,
    };
  }
  //
  clearInputs() {
    this._inputShortName.value = "";
    this._inputDescription.value = "";
    this._inputDateTime.value = "";
  }
  //
  renderError() {
    if (!this._inputShortName.value || this._inputShortName.value.length > 20) {
      this._dispalyBorderForBadinput(this._inputShortName);
    }
    if (
      !this._inputDescription.value ||
      this._inputDescription.value.length > 30
    ) {
      this._dispalyBorderForBadinput(this._inputDescription);
    }
  }
  //
  _dispalyBorderForBadinput(el) {
    el.classList.add("bad-input");
    setTimeout(() => {
      el.classList.remove("bad-input");
    }, 5000);
  }
}
export default new TaskView();
