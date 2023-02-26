import * as model from "./model.js";
import taskView from "./taskView.js";

//

const controllTasks = function () {
  try {
    const shortNameAndDescription = taskView.getDataFromInpurt();

    taskView.clearInputs();

    model.loadTask(shortNameAndDescription);

    taskView.render(model.state.root.tasks);
  } catch (error) {
    taskView.renderError();
    console.log(error);
  }
};
const controllDeleteTask = function (id) {
  try {
    model.deleteTask(id);
    taskView.render(model.state.root.tasks);
  } catch (error) {
    throw error;
  }
};

const controllDoneStateTask = function (id) {
  try {
    model.changeDoneStateTask(id);
    if (taskView.getSearchQuery() !== "") {
      taskView.render(model.state.search.searchedTasks);
      return;
    }
    taskView.render(model.state.root.tasks);
  } catch (error) {
    throw error;
  }
};
const controllSaveTasks = function () {
  if (!model.state.root.tasks) return;
  model.addToLocalStrorage();
};
const controllLoadFromLocalStorage = function () {
  model.getFromLocalStorage();
  if (!model.state.root.tasks) return;
  taskView.render(model.state.root.tasks);
};
const controllSearch = function () {
  try {
    const query = taskView.getSearchQuery();
    model.loadSearchResult(query);
    console.log(model.state.search.searchedTasks.length === 0);
    if (model.state.search.searchedTasks.length === 0) {
      throw new Error("No result");
    }
    taskView.render(model.state.search.searchedTasks);
  } catch (error) {
    taskView.renderSearchError(error);
  }
};
const init = function () {
  controllLoadFromLocalStorage();
  taskView.addHandlerRender(controllTasks);
  taskView.addHandlerDelete(controllDeleteTask);
  taskView.addHandlerDoneState(controllDoneStateTask);
  taskView.addHandlerSaveTasks(controllSaveTasks);
  taskView.addHandlerSearch(controllSearch);
};
init();
