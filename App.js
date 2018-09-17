import React, { Component } from 'react';
import { View, ScrollView, StyleSheet, Platform, Text, TextInput, Button } from 'react-native';
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
  formList: [PersonalForm, ContactForm]
};

function singleTextInput(singleText) {
  let value = '';
  return (
    <View style ={styles.formCompContainer}>
      <Text style={styles.formSectionTitle}>{('title' in singleText) ? singleText.title : ''}</Text>
      <TextInput
        style={styles.textInput}
        placeHolder={('placeholder' in singleText) ? singleText.placeHolder : ''}
        onChangeText={(text) => {this.value=text}}
        value={this.value}
      />
    </View>
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
        return (singleTextInput(formComp));
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
    fontWeight: '100',
  },

  textInput: {
    padding: 5,
    marginLeft: 15,
    marginBottom: 20,
    justifyContent: 'center',

    color: '#5D737F',
    fontSize: 21,
    fontWeight: '100',
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
