import React, { Component } from 'react';
import { View, ScrollView, StyleSheet, Platform, Text, Button } from 'react-native';
import { StackNavigator, createStackNavigator } from 'react-navigation'
import t from 'tcomb-form-native'; // 0.6.9

const INPUT_COLOR = '#6E797F';
const INPUT_FONT_FAM = 'serif';
const INPUT_SIZE = 23;

const ERROR_COLOR = 'red';

const Form = t.form.Form;

const Personal = t.struct({
  first: t.String,
  last: t.String,
  initial: t.maybe(t.String),
  birthDate: t.Date
});

//const Login = t.struct({

//})







class FormPersonal extends React.Component {
  handleSubmit = () => {
    //const value = this._form.getValue();
    //console.log('value: ', value);
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.mainContainer}>
        <ScrollView style={styles.container}>
          <View style={styles.headContainer}>
            <Text style={styles.headText}>Personal Info</Text>
          </View>
            <Form
              ref={'name'}
              type={Personal}
              options={options}
            />
          <View style={styles.footContainer}/>
          <Button
            title="Sign Up!"
            onPress={() => this.props.navigation.navigate('Form_Main')}
          />
        </ScrollView>
      </View>
    );
  }
}

class FormMain extends React.Component {
  render() {
    return (
      <View>
        <Button
          title="Personal Info"
          onPress={() => this.props.navigation.navigate('Form_Personal')}
        />
      </View>
    );
  }
}

const formStyles = {
  ...Form.stylesheet,

  fieldset: {
    backgroundColor: '#fcfeff',

    borderWidth: 2,
    borderColor: '#f4f4f4',
    borderRadius: 5,

    padding: 10,
    margin: 20,
  },

  formGroup: {
    normal: {
      marginBottom: 20,
    },
  },
  controlLabel: {

    normal: {
      padding: 5,
      marginLeft: 15,
      marginBottom: 20,
      justifyContent: 'center',

      color: '#5D737F',
      fontSize: 21,
      fontWeight: '100',

    },
    // the style applied when a validation error occours
    error: {
      color: 'red',
      fontSize: 21,
      margin: 7,
      fontWeight: '100'
    },
  },

  textbox: {
    normal:
    {
      marginLeft: 15,
      marginRight: 15,
      padding: 10,
      fontFamily: INPUT_FONT_FAM,
      fontSize: INPUT_SIZE,
      color: INPUT_COLOR,
      backgroundColor: 'transparent',
      borderRadius: 10,
    }
  },

  select: {
    normal: Platform.select({
      android: {
        marginLeft: 20,
        color: INPUT_COLOR,
      },
      ios: {}
    }),
    // the style applied when a validation error occours
    error: Platform.select({
      android: {
        paddingLeft: 7,
      },
      ios: {}
    })
  },

  dateValue: {
    normal: {
      color: INPUT_COLOR,
      fontSize: INPUT_SIZE,
      fontFamily: INPUT_FONT_FAM,
      padding: 7,
      marginLeft: 20,
    },
    error: {
      color: ERROR_COLOR,
      fontSize: INPUT_SIZE,
      padding: 7,
      marginBottom: 5
    },
  }
};

const options = {
  fields: {
    first:
    {
      label: 'First Name',
    },
    last:
    {
      label: 'Last Name',
    },
    initial:
    {
      label: 'Middle Initial',
      placeholder: '(Optional)'
    },
    sex:
    {
      label: 'Sex',
      nullOption: {value: '', text: 'Choose your sex'}
    },
    birthDate: {
      config:
      {
        dialogMode: 'spinner',
        format: (date) => date.getMonth() + '/' + date.getDate() + '/' + date.getFullYear(),
        defaultValueText: 'Tap to enter'
      },
      label: 'Date of Birth',
      mode: 'date'
    }
  },
  stylesheet: formStyles,
};

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: 'transparent',
  },

  headContainer: {
    marginTop: 30,
    padding: 20,
    alignItems: 'center',
  },

  footContainer: {

  },

  headText: {
    fontSize: 32,
    color: '#6E797F',
  }
});
const RootStack = createStackNavigator(
  {
    Form_Main: {
      screen: FormMain,
    },
    Form_Personal: {
      screen: FormPersonal,
    },
  },
  {
    initialRouteName: 'Form_Main',
  }
);
export default class App extends React.Component {
 render() {
   return <RootStack />;
 }
}
