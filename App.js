import React, { Component } from 'react';
import {
  Button,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} from 'react-native';
import { StackNavigator, createStackNavigator } from 'react-navigation'

const PersonalForm = [
  {
    type: 'singleTextInput',
    title: 'First Name',
  },
  {
    type: 'singleTextInput',
    title: 'Last Name',
  },
  {
    type: 'singleTextInput',
    title: 'Middle Initial',
    placeHolder: '(Optional)',
    required: false,
  }
];

const TestForm = [
  {
    type: 'multiSelector',
    title: 'This is a test',
    choices: ['oops', 'thanks', 'bye'],
  }
]

const ContactForm = [
  {
    type: 'singleTextInput',
    title: 'Email',
  },
  {
    type: 'singleTextInput',
    title: 'Main Phone #',
  },
  {
    type: 'singleTextInput',
    title: 'Alt. Phone #',
    placeHolder: '(Optional)',
    required: false,
  }
];

const PersonalPage = {
  title: 'Personal Info',
  formList: [PersonalForm, ContactForm, TestForm]
};

function singleTextInput(singleText) {
  let value = '';
  return (
      <TextInput
        style={styles.textInput}
        placeHolder={('placeholder' in singleText) ? singleText.placeHolder : ''}
        onChangeText={(text) => {this.value=text}}
        value={this.value}
      />
  );
}

function multiSelect(multiSelector) {
  let value = '';
  select = (newVal) =>
  {
    this.value = newVal;
    //alert(newVal);
  };

  return (
    multiSelector.choices.map((choice) => {
      return(

        <TouchableHighlight onPress={this.select(choice)}>
          <View style={styles.multiChoice}>
            <Image
              style={styles.multiChoiceIcon}
              source={require('./assets/multiChoiceIcon.png')}
            />
            <Text style={styles.multiChoiceLabel}>{choice}</Text>
          </View>
        </TouchableHighlight>

      );
    })

  );
}

class FormPage extends React.Component {
  constructor() {
    super();
    this.page = PersonalPage;
  }

  renderComponent (formComp) {
    switch (formComp.type) {
      case 'singleTextInput':
        return (
          <View style={styles.formCompContainer}>
          <Text
          fontSize={('fontSize' in formComp) ? formComp.fontSize : styles.formSectionTitle}
          style={styles.formSectionTitle}>
            {('title' in formComp) ? formComp.title : ''}
          </Text>
            {singleTextInput(formComp)}
          </View>
        );
        break;
      case 'multiSelector':
        return (
          <View style={styles.formCompContainer}>
          <Text
          fontSize={('fontSize' in formComp) ? formComp.fontSize : styles.formSectionTitle}
          style={styles.formSectionTitle}>
            {('title' in formComp) ? formComp.title : ''}
          </Text>
            {multiSelect(formComp)}
          </View>
        );
        break;
    }
  }

  renderForm (form) {
    return (
      <View style={styles.formContainer}>
        {form.map((formComp) => this.renderComponent(formComp))}
      </View>
    );
  }

  render() {
    return (
      <ScrollView>
        <View style={styles.headContainer}>
          <Text style={styles.headText}>{this.page.title}</Text>
        </View>
          {this.page.formList.map((form) => this.renderForm(form))}
        <View style={styles.footContainer}>
          <Button
            title="Submit"
            onPress={() => this.props.navigation.navigate('Form_Main')}
          />
        </View>
      </ScrollView>
    );
  }
}

class FormMain extends React.Component {

  render() {
    return (
      <View>
        <Button
          title="Personal Info"
          onPress={() => this.props.navigation.navigate('Form_Page')}
        />
      </View>
    );
  }
}


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

  formContainer: {
    backgroundColor: '#fcfeff',

    borderWidth: 2,
    borderColor: '#f4f4f4',
    borderRadius: 5,

    padding: 10,
    margin: 20,
  },

  formCompContainer: {
    backgroundColor: 'transparent'
  },

  formSectionTitle: {
    padding: 5,
    marginLeft: 15,
    marginBottom: 20,
    justifyContent: 'center',

    color: '#5D737F',
    fontSize: 21,
  },

  textInput: {
    padding: 5,
    marginLeft: 15,
    marginBottom: 20,
    justifyContent: 'center',

    color: '#5D737F',
    fontSize: 21,
    fontFamily: 'serif',
  },

  multiChoice: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  multiChoiceIcon: {
    height: 30,
    width: 30,
    margin: 10,
    color: 'blue'
  },

  multiChoiceLabel: {
    color: '#5D737F',
    fontSize: 21,
    fontFamily: 'serif'
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
    Form_Page: {
      screen: FormPage,
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
