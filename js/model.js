export const state = {
  tasks: [
    {
      id: 1,
      //todo:unique id
      shortName: "Interview K&H",
      description: "Aaslfmkmaksdkks skamdk",
      dateCreated: 921978498918,
      isDone: false,
    },
  ],
};

const createTaskObject = function (data) {
  return {
    id: crypto.randomUUID(),
    shortName: data.shortName,
    description: data.description,
    dateCreated: data.dateCreated,
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
