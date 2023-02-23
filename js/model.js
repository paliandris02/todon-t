export const state = {
  tasks: [],
};

const createTaskObject = function (data) {
  return {
    id: crypto.randomUUID(),
    shortName: data.shortName,
    description: data.description,
    dueDate: data.dueDate,
    isDone: false,
  };
};

export const loadTask = function (data) {
  const task = createTaskObject(data);

  try {
    state.tasks.unshift(task);
  } catch (error) {
    console.log(error);
    throw error;
  }
};
