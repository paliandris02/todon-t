export const state = {
  root: {
    tasks: [],
  },
  search: {
    searchedTasks: [],
  },
};

const createTaskObject = function (data) {
  if (!data.shortName || !data.description) {
    throw new Error("Inputs are empty");
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
    state.root.tasks.unshift(task);
    //UNSHIFT -> PUSH? GITHUB PAGES BUG
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const deleteTask = function (id) {
  const indexOfTask = state.root.tasks.findIndex((task) => task.id === id);
  console.log("delete happened");
  state.root.tasks.splice(indexOfTask, 1);
};

export const changeDoneStateTask = function (id) {
  const task = state.root.tasks.find((task, i, arr) => {
    return task.id === id;
  });

  if (!task.isDone) {
    task.isDone = true;
    return;
  }
  task.isDone = false;
};

export const addToLocalStrorage = function () {
  // if (state.root.tasks.length === 0) return;
  localStorage.setItem("tasks", JSON.stringify(state.root.tasks));
};

export const getFromLocalStorage = function () {
  try {
    const tasksFromLocalStorage = JSON.parse(localStorage.getItem("tasks"));
    if (!tasksFromLocalStorage) return;
    state.root.tasks = JSON.parse(localStorage.getItem("tasks"));
  } catch (error) {
    console.error(error);
  }
};

export const loadSearchResult = function (query) {
  state.search.searchedTasks = state.root.tasks.filter((task) => {
    return task.shortName.toLowerCase().includes(query.toLowerCase());
  });
};
