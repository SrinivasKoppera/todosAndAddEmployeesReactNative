import {
  ADD_TODO,
  DELETE_TODO,
  GET_SINGLE_TODO,
  UPDATE_TODO,
  SEARCH_TODO,
} from './actions';

const initialState = {
  todos: [],
  singleTodo: {},
  filteredList: [],
};

const todosReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TODO: {
      const isExits = state.todos.find(
        eachTodo => eachTodo.title === action.payload.title,
      );
      //
      if (isExits === undefined) {
        return {
          ...state,
          todos: [...state.todos, action.payload],
        };
      } else {
        return {...state};
      }
    }
    case DELETE_TODO: {
      const deleteId = action.payload;
      const updateTodos = state.todos.filter(
        (todo, index) => index !== deleteId,
      );
      return {...state, todos: updateTodos};
    }
    case GET_SINGLE_TODO: {
      const editTodoId = action.payload;
      const editTodo = state.todos.find(
        (eachTodo, index) => index === editTodoId,
      );
      // console.log('This is from Reducer: ', editTodo);
      return {
        ...state,
        singleTodo: {
          title: editTodo.title,
          todo: editTodo.todo,
          id: action.payload,
        },
      };
    }
    case UPDATE_TODO: {
      const newTodo = [...state.todos];
      const updatedTodo = newTodo.map((todo, index) => {
        if (index === action.payload.id) {
          return {
            title: action.payload.title,
            todo: action.payload.todo,
          };
        } else {
          return todo;
        }
      });
      return {
        ...state,
        todos: updatedTodo,
      };
    }
    case SEARCH_TODO: {
      const filteredTodos = state.todos.filter(todos =>
        todos.title.includes(action.payload),
      );
      console.log('This is from Reducer : ', action.payload);
      return {...state, filteredList: filteredTodos};
    }
    default:
      return state;
  }
};

export default todosReducer;
