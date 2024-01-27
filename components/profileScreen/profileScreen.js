import {View, Text, StyleSheet} from 'react-native';

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={{fontWeight: '800', fontSize: 22}}>
        This is Profile Screen
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'plum',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ProfileScreen;
