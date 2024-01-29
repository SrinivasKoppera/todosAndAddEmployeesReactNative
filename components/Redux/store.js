import {createStore, applyMiddleware, combineReducers} from 'redux';
import todosReducer from './reducer';
import employeeReducer from './employeesReducer';
import fruitsReducer from './fruitsReducer';
import {thunk} from 'redux-thunk';

const rootReducer = combineReducers({
  todosList: todosReducer,
  employesList: employeeReducer,
  fruitsList: fruitsReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
