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
      taskView.render(model.state.search.filteredTasks);
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
const controllSearch = function (btnDoneFilter) {
  try {
    const query = taskView.getSearchQuery();

    if (!btnDoneFilter && !query) {
      taskView.render(model.state.root.tasks);
      console.log(btnDoneFilter);
      return;
    }
    // bug: kétszer hívja meg a handlert ezért a state-t azonnal visszaállitja
    const isDone = btnDoneFilter.dataset.filter;

    model.state.search.filters.query = query;

    if (isDone === "done") {
      if (!model.state.search.filters.isDone) {
        model.state.search.filters.isDone = true;
      } else {
        model.state.search.filters.isDone = null;
      }
    }
    // Todo: undone case
    console.log(model.state.search.filters);
    model.loadSearchResult();
    if (model.state.search.filteredTasks.length === 0) {
      throw new Error("No result");
    }
    taskView.render(model.state.search.filteredTasks);
  } catch (error) {
    console.log(error);
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

  taskView.addHandlerDoneFilter(controllSearch);
  taskView.addHandlerDoneFilter(controllSearch);
};
init();
