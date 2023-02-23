import * as model from "./model.js";
import taskView from "./taskView.js";

//

const controllTasks = function () {
  try {
    const shortNameAndDescription = taskView.getDataFromInpurt();

    taskView.clearInputs();

    console.log(shortNameAndDescription);
    model.loadTask(shortNameAndDescription);
    console.log(model.state.tasks);
    taskView.render(model.state.tasks);
  } catch (error) {
    taskView.renderError();
    console.log(error);
  }
};

const init = function () {
  taskView.addHandlerRender(controllTasks);
};
init();
