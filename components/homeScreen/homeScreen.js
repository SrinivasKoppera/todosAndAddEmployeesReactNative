import {
  SafeAreaView,
  StatusBar,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
  Text,
  Alert,
} from 'react-native';
import {Card, FAB} from 'react-native-paper';
import ActionSheet from 'react-native-actions-sheet';
import {useEffect, useRef, useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {TextInput as PaperTextInput} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {
  addTodoAction,
  deleteTodoAction,
  getSingleTodoAction,
  updateTodoAction,
  searchTodoAction,
} from '../Redux/actions';
import EditIcon from 'react-native-vector-icons/AntDesign';
import DateTimePicker from '@react-native-community/datetimepicker';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const [date, setDate] = useState(new Date());
  const [title, setTitle] = useState('');
  const [todo, setTodo] = useState('');
  const [searchedValue, setSearchedValue] = useState('');

  const [showDateTimePicker, updateShowDateTimePicker] = useState(false);

  let filteredSearchList = useSelector(state => state.todosList.filteredList);
  const actionSheetRef = useRef();
  let todosList = useSelector(state => state.todosList.todos);
  const singleTodoObj = useSelector(state => state.todosList.singleTodo);

  const renderMainList =
    filteredSearchList.length === 0 ? todosList : filteredSearchList;

  // console.log('This is Main Screen main list :', renderMainList);

  const onChangeTitleValue = title => {
    setTitle(title);
  };
  const onChangeTodoValue = todo => {
    setTodo(todo);
  };

  const onSubmitTodo = () => {
    // console.log('This is todo submit: ', todoState);
    const todoState = {title, todo, date};
    if (todoState.title !== '' && todoState.todo !== '') {
      if (todoState.id !== undefined) {
        dispatch(updateTodoAction(todoState));
      } else {
        dispatch(addTodoAction(todoState));
      }
      setTitle('');
      setTodo('');
      setDate(new Date());
      actionSheetRef.current?.hide();
    } else {
      Alert.alert('Please Enter Todo Details');
    }
  };

  const deleteTodo = id => {
    dispatch(deleteTodoAction(id));
  };

  useEffect(() => {
    // updateTodoState(singleTodoObj);
    dispatch(searchTodoAction(searchedValue));
  }, [searchedValue, dispatch]);

  const serachTodobyTitle = text => {
    if (text.trim() === '') {
      filteredSearchList = [];
    }
    setSearchedValue(text);
  };

  const getSingleTodo = id => {
    // const modifiedDate = singleTodoObj.date.toLocaleDateString();
    console.log(singleTodoObj);
    dispatch(getSingleTodoAction(id));
    setTitle(singleTodoObj.title);
    setTodo(singleTodoObj.todo);
    // setDate(modifiedDate);
    actionSheetRef.current?.show();
  };

  const todosRenderItem = (eachTodo, index) => {
    const dateFormate = eachTodo.date.toLocaleDateString();
    return (
      <Card style={styles.todoCard} key={index}>
        <View style={styles.one}>
          <Text style={styles.todoTitle}>{eachTodo.title}</Text>
          <Text style={styles.dateStyle}>{dateFormate}</Text>
        </View>
        <View style={styles.two}>
          <Text numberOfLines={3}>{eachTodo.todo}</Text>
        </View>
        <View style={styles.iconsContainer}>
          <EditIcon
            name="edit"
            size={25}
            onPress={() => getSingleTodo(index)}
          />
          <Icon name="delete" size={25} onPress={() => deleteTodo(index)} />
        </View>
      </Card>
    );
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    updateShowDateTimePicker(false);
    setDate(currentDate);
  };

  const showDatePicker = () => {
    updateShowDateTimePicker(true);
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        <TextInput
          style={styles.textInputStyle}
          placeholder="Search Todo by title...."
          value={searchedValue}
          onChangeText={text => serachTodobyTitle(text)}
          // autoCorrect={false}
          focusable={false}
        />
        {todosList.length === 0 ? (
          <View style={styles.noTodosContainer}>
            <Text style={styles.noTodosHeading}>You have no TODOs</Text>
          </View>
        ) : (
          <ScrollView>
            <View style={styles.todosContainer}>
              {renderMainList?.map((eachTodo, index) =>
                todosRenderItem(eachTodo, index),
              )}
            </View>
          </ScrollView>
        )}
        <FAB
          icon="plus"
          style={styles.fab}
          onPress={() => actionSheetRef.current?.show()}
        />
        <ActionSheet ref={actionSheetRef}>
          <View style={styles.actionSheetContainer}>
            <Text style={styles.todosMainHeading}>Write Your Todo Here</Text>
            <View>
              <PaperTextInput
                placeholder="Enter todo title"
                mode="outlined"
                label="Title"
                value={title}
                style={{minWidth: '80%', maxWidth: '80%', marginBottom: 16}}
                onChangeText={text => onChangeTitleValue(text)}
              />
              <PaperTextInput
                placeholder="Enter Todo here"
                mode="outlined"
                label="Todo"
                style={{minWidth: '80%', maxWidth: '80%', marginBottom: 16}}
                value={todo}
                onChangeText={todo => onChangeTodoValue(todo)}
              />
              <PaperTextInput
                placeholder="Select Date"
                mode="outlined"
                label="Todo Date"
                value={date.toLocaleDateString()}
                // onChangeText={date => onChangeDateValue(date)}
                editable={false}
                right={
                  <PaperTextInput.Icon
                    icon="calendar"
                    onPress={showDatePicker}
                  />
                }
                style={{minWidth: '80%', maxWidth: '80%'}}
              />
              {showDateTimePicker && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={date}
                  mode="date"
                  onChange={onChange}
                />
              )}
              <Icon
                style={styles.sendIcon}
                name="send-circle"
                size={55}
                color="#FF5733"
                onPress={() => onSubmitTodo()}
              />
            </View>
          </View>
        </ActionSheet>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: 'plum',
  },
  textInputStyle: {
    borderWidth: 1,
    borderRadius: 5,
    minWidth: '80%',
    marginTop: '3%',
    alignSelf: 'center',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    cursor: 'pointer',
  },
  actionSheetContainer: {
    height: '65%',
    alignItems: 'center',
  },
  todosMainHeading: {
    color: '#FF5733',
    fontSize: 16,
    fontWeight: '600',
    margin: 10,
  },
  sendIcon: {
    textAlign: 'center',
    margin: 15,
  },
  noTodosContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '50%',
  },
  noTodosHeading: {
    fontSize: 20,
    fontWeight: '800',
  },
  todosContainer: {
    margin: 15,
    // width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  todoCard: {
    padding: 5,
    width: 160,
    height: 160,
    margin: 6,
    backgroundColor: 'lightblue',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  one: {justifyContent: 'flex-start'},
  two: {justifyContent: 'center'},
  todoTitle: {
    fontWeight: '500',
    fontSize: 14,
    textAlign: 'center',
    margin: 5,
    color: '#000',
  },
  iconsContainer: {
    marginTop: 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dateStyle: {
    textAlign: 'right',
    fontSize: 10,
    fontWeight: '800',
  },
});
