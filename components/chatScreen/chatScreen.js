import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import DropdownComponent from './dropDown';
import {Card} from 'react-native-paper';
import {useEffect, useState} from 'react';
import {filterAction, deleteEmployeeAction} from '../Redux/employeActions';

const ChatScreen = () => {
  const [currentFilter, setCurrentFilter] = useState(null);
  const dispatch = useDispatch();

  const employeeList = useSelector(state => state.employesList.employeesList);
  const filterList = useSelector(state => state.employesList.filteredList);
  // console.log('This is CUrrent filter Value :', currentFilter);
  // console.log('This is Filter List : ', filterList);
  // console.log('This is Employee List : ', employeeList);

  const showingEmployeeListData =
    currentFilter === null ? employeeList : filterList;

  const handleFilterChange = filterValue => {
    setCurrentFilter(filterValue);
  };

  useEffect(() => {
    if (currentFilter !== null) {
      dispatch(filterAction(currentFilter));
    }
  }, [currentFilter, dispatch]);

  const deleteEmployee = deleteID => {
    dispatch(deleteEmployeeAction(deleteID));
  };
  const renderItem = item => {
    const dateOfJoining = item.date.toLocaleDateString();
    return (
      <Card style={styles.employeeCardStyle} key={item.emp_id}>
        <Card.Cover
          source={{
            uri: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
          }}
          style={styles.cardProfileImage}
        />
        <Card.Content>
          <Text numberOfLines={1}>
            <Text>EMPLOYEE ID:</Text> {item.emp_id}
          </Text>
          <Text numberOfLines={1}>
            <Text>NAME:</Text> {item.employeeName}
          </Text>
          <Text numberOfLines={1}>
            <Text>SALARY:</Text> {item.salary}
          </Text>
          <Text numberOfLines={1}>
            <Text>ROLE:</Text> {item.employeeRole}
          </Text>
          <Text numberOfLines={1}>
            <Text>DOJ:</Text> {dateOfJoining}
          </Text>
          <TouchableOpacity
            style={styles.deleteBtn}
            onPress={() => deleteEmployee(item.emp_id)}>
            <Text style={styles.deleteText}>Delete</Text>
          </TouchableOpacity>
        </Card.Content>
      </Card>
    );
  };

  const noEmployesData = () => {
    return (
      <View>
        <Text style={{fontSize: 20, fontWeight: '700'}}>
          You have no Employees Data
        </Text>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <ScrollView>
        <DropdownComponent onFilterChange={handleFilterChange} />
        <View style={styles.employeeListContainer}>
          {showingEmployeeListData.length === 0
            ? noEmployesData()
            : showingEmployeeListData.map(eachEmployee =>
                renderItem(eachEmployee),
              )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'plum',
  },
  employeeListContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  employeeCardStyle: {
    width: 180,
    height: 240,
    margin: 5,
  },
  cardProfileImage: {
    width: 180,
    height: 100,
  },
  deleteBtn: {
    backgroundColor: 'red',
    borderRadius: 5,
    marginTop: 8,
  },
  deleteText: {
    color: '#fff',
    textAlign: 'center',
    padding: 5,
  },
});

export default ChatScreen;
