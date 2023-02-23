import * as model from "./model.js";
import taskView from "./taskView.js";

//

const controllTasks = function () {
  try {
    const shortNameAndDescription = taskView.getDataFromInpurt();
    taskView.clearInputs();

    model.loadTask(shortNameAndDescription);

    taskView.render(model.state.tasks);
  } catch (error) {
    console.log(error);
  }
};

const init = function () {
  taskView.addHandlerRender(controllTasks);
};
init();
