import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';

const data = [
  {label: 'A to Z', value: 'AtoZ'},
  {label: 'Z to A', value: 'ZtoA'},
  {label: 'Salary - High to Low', value: 'HTL'},
  {label: 'Salary - Low to High', value: 'LTH'},
  {label: 'Date of Joining', value: 'DOJ'},
];

const DropdownComponent = props => {
  const {onFilterChange} = props;
  // console.log('This is Dropdown :', onFilterChange);
  // const dispatch = useDispatch();
  // const [filteredValue, setFilteredValue] = useState(null);
  let filteredValue;
  const [isFocus, setIsFocus] = useState(false);

  const onChangeHandle = () => {
    // dispatch(filterAction(filteredValue));
    onFilterChange(filteredValue);
  };
  return (
    <View style={styles.container}>
      <Dropdown
        style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={data}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? 'Filter here' : '...'}
        searchPlaceholder="Search..."
        value={filteredValue}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={item => {
          filteredValue = item.value;
          setIsFocus(false);
          onChangeHandle();
        }}
      />
    </View>
  );
};

export default DropdownComponent;

const styles = StyleSheet.create({
  container: {
    // backgroundColor: 'white',
    padding: 16,
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
