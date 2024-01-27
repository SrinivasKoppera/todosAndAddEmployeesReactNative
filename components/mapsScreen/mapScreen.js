import {useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import {TextInput, Card, Button} from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import {useDispatch, useSelector} from 'react-redux';
import {addEmployeAction} from '../Redux/employeActions';
import {State} from 'react-native-gesture-handler';

const MapScreen = ({navigation}) => {
  const dispatch = useDispatch();

  const ref_input_2 = useRef();
  const ref_input_3 = useRef();
  const ref_input_4 = useRef();
  const ref_input_5 = useRef();

  const [employeeName, setEmployeeName] = useState('');
  const [salary, setSalary] = useState('');
  const [emp_id, setEmpID] = useState('');
  const [employeeRole, setEmployeeRole] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, updateDatePicker] = useState(false);

  //++++++   Date Picker Function Start ++++++ //
  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    updateDatePicker(false);
    setDate(currentDate);
  };
  const selectDateOfJoining = () => {
    updateDatePicker(true);
  };
  //+++++++++  Date Picker Function End ++++++//

  //------- ON CHANGE INPUT FIELD VALUES FUNCTION START  -------- //

  const onChangeInptValue = (inputType, text) => {
    if (inputType === 'name') {
      setEmployeeName(text);
    } else if (inputType === 'salary') {
      setSalary(text);
    } else if (inputType === 'id') {
      setEmpID(text);
    } else if (inputType === 'role') {
      setEmployeeRole(text);
    }
  };

  //------- ON CHANGE INPUT FIELD VALUES FUNCTION END  -------- //

  //'''''''   ON SUBMIT FORM FUNCTION START   ''''''''''' //

  const onSubmitForm = () => {
    const formData = {employeeName, salary, emp_id, employeeRole, date};
    if (
      employeeName !== '' &&
      salary !== '' &&
      emp_id !== '' &&
      employeeRole !== '' &&
      date !== ''
    ) {
      dispatch(addEmployeAction(formData));
      setEmployeeName('');
      setSalary('');
      setEmpID('');
      setEmployeeRole('');
      setDate(new Date());
      navigation.navigate('CHAT');
    } else {
      Alert.alert('Please Enter the Valid Data');
    }
  };

  //'''''''   ON SUBMIT FORM FUNCTION END   ''''''''''' //

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior="padding"
      keyboardVerticalOffset={undefined}>
      <ScrollView>
        <Card style={styles.cardStyle}>
          <Text style={styles.employeeCardStyle}>EMPLOYEES DETAILS</Text>
          <TextInput
            value={employeeName}
            style={styles.employeeInputStyle}
            label="Employee Name"
            mode="outlined"
            placeholder="Please Enter Your Name"
            autoFocus={true}
            returnKeyType="next"
            onSubmitEditing={() => ref_input_2.current.focus()}
            onChangeText={text => onChangeInptValue('name', text)}

            // onChangeText={text => setText(text)}
          />
          <TextInput
            value={salary}
            style={styles.employeeInputStyle}
            label="Salary"
            mode="outlined"
            placeholder="Please Enter Your Salary"
            returnKeyType="next"
            ref={ref_input_2}
            onSubmitEditing={() => ref_input_3.current.focus()}
            onChangeText={text => onChangeInptValue('salary', text)}
            // onChangeText={text => setText(text)}
          />
          <TextInput
            value={emp_id}
            style={styles.employeeInputStyle}
            label="Employee ID"
            mode="outlined"
            placeholder="Please Enter Your ID"
            returnKeyType="next"
            ref={ref_input_3}
            onSubmitEditing={() => ref_input_4.current.focus()}
            onChangeText={text => onChangeInptValue('id', text)}
            // onChangeText={text => setText(text)}
          />
          <TextInput
            value={employeeRole}
            style={styles.employeeInputStyle}
            label="Employee Role"
            mode="outlined"
            placeholder="Please Enter Your Role"
            returnKeyType="next"
            ref={ref_input_4}
            onSubmitEditing={() => ref_input_5.current.focus()}
            onChangeText={text => onChangeInptValue('role', text)}
            // onChangeText={text => setText(text)}
          />
          <TextInput
            value={date.toLocaleDateString()}
            style={styles.employeeInputStyle}
            label="Date of Joining"
            mode="outlined"
            placeholder="Employee Date of Join"
            editable={false}
            right={
              <TextInput.Icon icon="calendar" onPress={selectDateOfJoining} />
            }
            ref={ref_input_5}
            // onChangeText={text => setText(text)}
          />
          {showDatePicker && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode="date"
              onChange={onChangeDate}
            />
          )}
          <Button
            labelStyle={{fontSize: 18, fontWeight: '700'}}
            mode="contained"
            style={{marginTop: 20, marginBottom: 20}}
            onPress={() => onSubmitForm()}>
            ADD
          </Button>
        </Card>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'plum',
    paddingLeft: 10,
    paddingRight: 10,
  },
  cardStyle: {
    padding: 10,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  employeeCardStyle: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '800',
    margin: 20,
  },
  employeeInputStyle: {
    minWidth: '90%',
    maxWidth: '90%',
    margin: 5,
  },
});
export default MapScreen;
