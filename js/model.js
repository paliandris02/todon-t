export const state = {
  tasks: [],
};

const createTaskObject = function (data) {
  if (!data.shortName || !data.description) {
    throw new Error("Data is empty");
  }
  return {
    id: crypto.randomUUID(),
    shortName: data.shortName,
    description: data.description,
    dueDate: data.dueDate,
    isDone: false,
  };
};

export const loadTask = function (data) {
  try {
    const task = createTaskObject(data);
    state.tasks.unshift(task);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const deleteTask = function (id) {
  const indexOfTask = state.tasks.findIndex((task) => task.id === id);
  console.log("delete happened");
  state.tasks.splice(indexOfTask, 1);
};

export const changeDoneStateTask = function (id) {
  const task = state.tasks.find((task, i, arr) => {
    console.log(arr, id);
    return task.id === id;
  });

  console.log(task);
  if (!task.isDone) {
    task.isDone = true;
    return;
  }
  task.isDone = false;
};
