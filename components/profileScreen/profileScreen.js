import {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  FlatList,
} from 'react-native';
import {Button, Card, TextInput} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {addFruitsAction, onChangeTextValueAction} from '../Redux/actions';

const ProfileScreen = () => {
  const dispatch = useDispatch();
  const allFruitsInputList = useSelector(state => state.fruitsList.fruitsList);
  const addItemFunction = () => {
    const emptyFruitsObj = {fruitName: '', fruitPrice: '', fruitQuantity: ''};
    dispatch(addFruitsAction(emptyFruitsObj));
  };

  const dispatchOnChangeInputValue = (name, textValue, index) => {
    dispatch(
      onChangeTextValueAction({
        fieldName: name,
        fieldValue: textValue,
        fieldIndex: index,
      }),
    );
  };

  const addInputFieldsFunction = ({item, index}) => {
    const length = allFruitsInputList.length;
    return (
      <View>
        <Card style={styles.cardStyle} key={index}>
          <TextInput
            value={item.fruitName || ''}
            style={styles.inputFieldStyle}
            label="Name"
            mode="outlined"
            placeholder="Please Enter Fruit Name"
            // autoFocus={true}
            // returnKeyType="next"
            // onSubmitEditing={() => ref_input_2.current.focus()}
            // onChangeText={text => onChangeInptValue('name', text)}
            onChangeText={text =>
              dispatchOnChangeInputValue('fruitName', text, index)
            }
          />
          <TextInput
            value={item.fruitPrice || ''}
            style={styles.inputFieldStyle}
            label="Price"
            mode="outlined"
            placeholder="Please Enter Price"
            // returnKeyType="next"
            // onSubmitEditing={() => ref_input_2.current.focus()}
            // onChangeText={text => onChangeInptValue('name', text)}

            onChangeText={text =>
              dispatchOnChangeInputValue('fruitPrice', text, index)
            }
          />
          <TextInput
            value={item.fruitQuantity || ''}
            style={styles.inputFieldStyle}
            label="Quantity"
            mode="outlined"
            placeholder="Please Enter Quantity"
            // returnKeyType="next"
            // onSubmitEditing={() => ref_input_2.current.focus()}
            // onChangeText={text => onChangeInptValue('name', text)}

            onChangeText={text =>
              dispatchOnChangeInputValue('fruitQuantity', text, index)
            }
          />
        </Card>
        {length - 1 === index ? (
          <Button
            style={styles.addItemBtnStyles}
            mode="contained"
            onPress={() => addItemFunction()}>
            Add Item
          </Button>
        ) : null}
      </View>
    );
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <Card>
        <FlatList
          data={allFruitsInputList}
          renderItem={addInputFieldsFunction}
          keyExtractor={(_, index) => index.toString()}
        />
      </Card>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'plum',
  },
  cardStyle: {
    padding: 10,
    margin: 10,
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
  inputFieldStyle: {
    minWidth: '90%',
    maxWidth: '90%',
    margin: 5,
  },
  addItemBtnStyles: {
    margin: 20,
  },
});

export default ProfileScreen;
