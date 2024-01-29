import {
  ADD_FRUITS_INTO_LIST,
  ON_CHANGE_TEXT_VALUE,
  ON_DELETE_FRUIT_ITEM,
} from './actions';

const initialfruitsState = {
  fruitsList: [{fruitName: '', fruitPrice: '', fruitQuantity: ''}],
};

const fruitsReducer = (state = initialfruitsState, action) => {
  switch (action.type) {
    case ADD_FRUITS_INTO_LIST:
      return {...state, fruitsList: [...state.fruitsList, action.payload]};
    case ON_CHANGE_TEXT_VALUE: {
      const {fieldName, fieldValue, fieldIndex} = action.payload;
      const afterChangeValuesFruitsList = state.fruitsList.map(
        (eachItem, index) => {
          if (fieldIndex === index) {
            const objectKeysArray = Object.keys(eachItem);
            for (const key of objectKeysArray) {
              if (fieldName === key) {
                return {...eachItem, [fieldName]: fieldValue};
              }
            }
          }
          return eachItem;
        },
      );
      return {...state, fruitsList: afterChangeValuesFruitsList};
    }
    case ON_DELETE_FRUIT_ITEM: {
      const afterDeleteItemFromFruitsList = state.fruitsList.filter(
        (_, index) => index !== action.payload,
      );
      return {...state, fruitsList: afterDeleteItemFromFruitsList};
    }
    default:
      return state;
  }
};

export default fruitsReducer;
