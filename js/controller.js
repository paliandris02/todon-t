import * as model from "./model.js";
import taskView from "./taskView.js";

//

const controllTasks = function () {
  try {
    const shortNameAndDescription = taskView.getDataFromInpurt();

    taskView.clearInputs();

    model.loadTask(shortNameAndDescription);

    console.log(model.state.tasks);

    taskView.render(model.state.tasks);
  } catch (error) {
    taskView.renderError();
    console.log(error);
  }
};
const controllDeleteTask = function (id) {
  try {
    model.deleteTask(id);
    taskView.render(model.state.tasks);
  } catch (error) {
    throw error;
  }
};

const controllDoneStateTask = function (id) {
  try {
    model.changeDoneStateTask(id);
    taskView.render(model.state.tasks);
  } catch (error) {
    throw error;
  }
};
const controllSaveTasks = function () {
  if (!model.state.tasks) return;
  model.addToLocalStrorage();
};
const controllLoadFromLocalStorage = function () {
  model.getFromLocalStorage();
  taskView.render(model.state.tasks);
};
const init = function () {
  controllLoadFromLocalStorage();
  taskView.addHandlerRender(controllTasks);
  taskView.addHandlerDelete(controllDeleteTask);
  taskView.addHandlerDoneState(controllDoneStateTask);
  taskView.addHandlerSaveTasks(controllSaveTasks);
};
init();
