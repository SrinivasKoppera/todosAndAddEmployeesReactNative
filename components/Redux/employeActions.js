export const ADD_EMPLOYEE = 'ADD_EMPLOYEE';
export const FILTER_EMPLOYEE = 'FILTER_EMPLOYEE';
export const DELETE_EMPLOYEE = 'DELETE_EMPLOYEE';

export const addEmployeAction = formData => {
  return {
    type: ADD_EMPLOYEE,
    payload: formData,
  };
};

export const filterAction = filterValue => {
  return {
    type: FILTER_EMPLOYEE,
    payload: filterValue,
  };
};

export const deleteEmployeeAction = deleteId => {
  return {
    type: DELETE_EMPLOYEE,
    payload: deleteId,
  };
};
