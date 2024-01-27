export const ADD_TODO = 'ADD_TODO';
export const DELETE_TODO = 'DELETE_TODO';
export const GET_SINGLE_TODO = 'GET_SINGLE_TODO';
export const UPDATE_TODO = 'UPDATE_TODO';
export const SEARCH_TODO = 'SEARCH_TODO';

export const addTodoAction = todo => {
  return {
    type: ADD_TODO,
    payload: todo,
  };
};

export const deleteTodoAction = id => {
  return {
    type: DELETE_TODO,
    payload: id,
  };
};

export const getSingleTodoAction = id => {
  // console.log('This is Action: ', id);
  return {
    type: GET_SINGLE_TODO,
    payload: id,
  };
};

export const updateTodoAction = todo => {
  return {
    type: UPDATE_TODO,
    payload: todo,
  };
};

export const searchTodoAction = text => {
  return {
    type: SEARCH_TODO,
    payload: text,
  };
};
