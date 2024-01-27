import {ADD_EMPLOYEE, FILTER_EMPLOYEE, DELETE_EMPLOYEE} from './employeActions';

const initialEmployeState = {
  employeesList: [],
  filteredList: [],
};

const employeeReducer = (state = initialEmployeState, action) => {
  switch (action.type) {
    case ADD_EMPLOYEE: {
      const formObj = action.payload;
      const employeID = formObj.emp_id;
      const isExits = state.employeesList.find(
        eachEmployee => eachEmployee.emp_id === employeID,
      );
      if (!isExits) {
        return {...state, employeesList: [...state.employeesList, formObj]};
      } else {
        return {...state};
      }
    }
    case FILTER_EMPLOYEE: {
      const filterValue = action.payload;
      const copyEmployeesList = state.employeesList.slice();
      if (filterValue === 'AtoZ') {
        const accendingOrderFilter = copyEmployeesList.sort((a, b) =>
          a.employeeName.localeCompare(b.employeeName),
        );
        return {...state, filteredList: accendingOrderFilter};
      } else if (filterValue === 'ZtoA') {
        const sortedDataDescending = copyEmployeesList.sort((a, b) =>
          b.employeeName.localeCompare(a.employeeName),
        );
        return {...state, filteredList: sortedDataDescending};
      } else if (filterValue === 'HTL') {
        const sortedDataBySalaryHTL = copyEmployeesList.sort(
          (a, b) => parseInt(b.salary) - parseInt(a.salary),
        );
        return {...state, filteredList: sortedDataBySalaryHTL};
      } else if (filterValue === 'LTH') {
        const sortedDataBySalaryLTH = copyEmployeesList.sort(
          (a, b) => parseInt(a.salary) - parseInt(b.salary),
        );
        return {...state, filteredList: sortedDataBySalaryLTH};
      } else if (filterValue === 'DOJ') {
        const sortedDataByDateOfJoining = copyEmployeesList.sort(
          (a, b) => new Date(a.date) - new Date(b.date),
        );
        return {...state, filteredList: sortedDataByDateOfJoining};
      }
    }
    case DELETE_EMPLOYEE: {
      const deleteId = action.payload;
      const afterDeleteEmployeeList = state.employeesList.filter(
        eachEmployee => eachEmployee.emp_id !== deleteId,
      );
      return {
        ...state,
        employeesList: afterDeleteEmployeeList,
        filteredList: afterDeleteEmployeeList,
      };
    }
    default:
      return state;
  }
};

export default employeeReducer;
