import React from 'react';
import { Button, ScrollView, StyleSheet, Text, TextInput, TouchableHighlight, View } from 'react-native';
import { StackNavigator, createStackNavigator } from 'react-navigation';


const TestForm = () => {
    return (
      <View style={styles.formContainer}>
        <CompTextInput
          name='Single Text Input'
          placeHolder='Input PlaceHolder'/>
        <CompMultiSelection
            name='Multiple Selection'
            options={['First Option', 'Second Option', 'Third Option', 'Option Accepts Input']}
            valuesAcceptInput={['Option Accepts Input']}/>
        <CompSingleSelection
          name='Single Selection'
          options={['First Option', 'Second Option', 'Third Option', 'Option Accepts Multiline']}
          valuesAcceptInput={['Option Accepts Multiline']}
          hasMultiline={true}/>
      </View>
    );
}

const PetForm = () => {
    return (
      <View style={styles.formContainer}>
        <CompSingleSelection
          name='Type'
          options={['Dog', 'Cat', 'Other']}
          valuesAcceptInput={['Other']} />
        <CompTextInput
          name='Breed'/>
        <CompTextInput
          name='Age'/>
        <CompSingleSelection
            name='Gender'
            options={['Male', 'Female', 'Unknown']} />
      </View>
    );
}

const PersonalForm = () => {
  return(
    <View>
      <View style={styles.formContainer}>
        <CompTextInput name='First Name'/>
        <CompTextInput name='Last Name'/>
        <CompTextInput name='Middle Initial' placeHolder='(Optional)'/>
        <CompSingleSelection
          name='Have you ever used another name(s)?'
          options={['No', 'Yes']}
          default='No'
          valuesAcceptInput={['Yes']}
          hasMultiline={true} />
      </View>
      <View style={styles.formContainer}>
        <CompTextInput name='Main Telephone'/>
        <CompTextInput name='Alt. Telephone' placeHolder='(Optional)'/>
        <CompTextInput name= 'Email Address' />
      </View>
      <View style={styles.formContainer}>
        <CompTextInput name='SSN'/>
        <CompTextInput name='Drivers License #'/>
        <CompSingleSelection
          name='Have you ever been exposed to bed bugs or a similar bug infestation?'
          options={['No', 'Yes, explain:']}
          default='No'
          valuesAcceptInput={['Yes, explain:']}
          hasMultiline={true} />
      </View>
    </View>
  );
}

export default class App extends React.Component {
 render() {
   return <RootStack />;
 }
}

class FormNavigator extends React.Component {

  constructor (props)
  {
    super(props);
    this.state = {
      formGroups: [{
        groupName: 'Personal Info',
        forms: [{
          name: 'Personal Info',
          form: PersonalForm()
        },{
          name: 'Test Form',
          form: TestForm()
        }]
      },{
        groupName: 'Test Form Group',
        forms: [{
          name:'Test Form',
          form: TestForm()
        }]
      },{
        groupName: 'Pets',
        forms: [],
        dynamicForm: {
            name: 'Pet',
            form: PetForm()
        }
      }],
    }
  }

  addForm(groupName)
  {
    let newFormGroups = this.state.formGroups;
    for (i = 0; i < newFormGroups.length; i++)
    {
      if (newFormGroups[i].groupName === groupName)
      {
        console.log(groupName);
        let newForm = newFormGroups[i].dynamicForm;
        if (newForm != null)
        {
          newFormGroups[i].forms.push({name: newForm.name, form: newForm.form});
        }
        break;
      }
    }
    this.setState({formGroups: newFormGroups});
  }

  render() {
    return (this.state.formGroups.map((group) =>
      <View style={styles.formContainer} key={group.groupName}>
        
        {group.forms.map((form) =>
          <Button
            title={form.name}
            style={styles.navButton}
            onPress={() => this.props.navigation.navigate('Form', {
              name: form.name,
              renderForm: form.form,
            })}
            key={form.name}
          />)}
        {(group.dynamicForm != null) ?
          <Button
            title={'Add ' + group.dynamicForm.name}
            onPress={() => this.addForm(group.groupName)}
            style={styles.navButton} /> : null}
      </View>
    ));
  }
}

class Form extends React.Component {

  render() {
    const { navigation } = this.props;
    const renderForm = navigation.getParam('renderForm', TestForm())
    const name = navigation.getParam('name', 'REQUIRES NAME')

    return (
      <ScrollView>
        <View>
          <View style={styles.headContainer}>
            <Text style={styles.headText}>{name}</Text>
          </View>
          {renderForm}
          <Button
            style={styles.navButton}
            title='Save'
            onPress={() => this.props.navigation.goBack()} />
          </View>
      </ScrollView>

    );
  }
}

class CompTextInput extends React.Component{
  constructor (props) {
    super(props);
    this.state = {value: ''};
  }

  render() {
    return(
      <View style={styles.formCompContainer}>
        <Text style={styles.formCompTitle}>{this.props.name}</Text>
        <TextInput
          style={styles.textInput}
          onChange={(newVal) => {this.props.state = newVal}}
          placeHolder={this.props.placeHolder}
          multiline={this.props.multiline}
        />
      </View>
    );
  }
}

class CompSingleSelection extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      value: this.props.default,
      inputValue: '',
    };
    this.selectedValue = '';
  }

  _onChange = (newVal) => {
    newVal = (this.state.value === newVal) ? '' : newVal;
    this.selectedValue = newVal;
    this.setState({value: newVal});
  }

  render() {

    return (
      <View style={styles.formCompContainer}>
        <Text style={styles.formCompTitle}>{this.props.name}</Text>
        {this.props.options.map((option) =>
          <CompSingleOption
            name={option}
            key={option}
            onChange={this._onChange}
            selectedValue={this.selectedValue}
            input={(this.props.valuesAcceptInput && this.props.valuesAcceptInput.indexOf(option) > -1) ? (
              <TextInput
                style={(this.props.hasMultiline) ? styles.multilineTextInput : styles.textInput}
                onChangeText={(inputValue) => this.setState({inputValue})}
                value={this.state.inputValue}
                multiline={this.props.hasMultiline}
              />) : null}
          />)}
      </View>
    );
  }
}

class CompMultiSelection extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      values: new Array(),
      inputValue: ''
    };
  }

  _onChange = (newVal) => {

    let valIndex = this.state.values.indexOf(newVal);
    let prevValues = new Array();

    if (valIndex > -1){
      prevValues.splice(valIndex,1);
    }
    else {
      prevValues.push(newVal);
    }

    this.setState({values: prevValues});
  }

  render() {
    return (
      <View style={styles.formCompContainer}>
        <Text style={styles.formCompTitle}>{this.props.name}</Text>
        {this.props.options.map((option) =>
          <CompMultiOption
            name={option}
            onChange={this._onChange}
            key={option}
            input={(this.props.valuesAcceptInput.indexOf(option) > -1) ? (
              <TextInput
                style={(this.props.hasMultiline) ? styles.multilineTextInput : styles.textInput}
                onChangeText={(inputValue) => this.setState({inputValue})}
                value={this.state.inputValue}
                multiline={this.props.hasMultiline}
              />) : null}
          />)}
      </View>
    );
  }
}

class CompSingleOption extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
    };

    this.showInput = false;
  }

  _onPress = () => {
      this.props.onChange(this.props.name);
  }

  render() {
    return (
      <TouchableHighlight onPress={this._onPress} underlayColor='#e5e5e5' >
        <View>
          <View style={styles.multiOption}>
            <View style={styles.multiOptionIcon} backgroundColor={(this.props.selectedValue === this.props.name) ? '#5D737F' : styles.multiOptionIcon.backgroundColor}/>
            <Text style={styles.multiOptionLabel}>{this.props.name}</Text>
          </View>
          {(this.props.selectedValue === this.props.name) ? this.props.input : null}
        </View>
      </TouchableHighlight>
    );
  }
}

class CompMultiOption extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selected: false,
      inputValue: '',
    };
    this.showInput = false;
  }

  _onPress = () => {
      this.setState({selected: !this.state.selected});
      this.props.onChange(this.props.name);
  }

  render() {
    let input =
      <TextInput
        style={styles.textInput}
        onChangeText={(inputValue) => this.setState({inputValue})}
        value={this.state.inputValue}
      />;
    return (
      <TouchableHighlight onPress={this._onPress} underlayColor='#e5e5e5' >
        <View>
          <View style={styles.multiOption}>
            <View style={styles.multiOptionIcon} backgroundColor={(this.state.selected) ? '#5D737F' : styles.multiOptionIcon.backgroundColor}/>
            <Text style={styles.multiOptionLabel}>{this.props.name}</Text>
          </View>
          {(this.props.input != null && this.state.selected) ? this.props.input : null}
        </View>
      </TouchableHighlight>
    );
  }
}

const RootStack = createStackNavigator(
  {
    FormNavigator: FormNavigator,
    Form: Form,
  },
  {
    initialRouteName: 'FormNavigator',
  }
);

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: 'transparent',
  },

  headContainer: {
    marginTop: 20,
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

  formCompTitle: {
    padding: 5,
    marginLeft: 15,
    marginBottom: 15,
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

  multilineTextInput: {
    padding: 5,
    marginLeft: 15,
    marginBottom: 20,
    justifyContent: 'center',

    color: '#5D737F',
    fontSize: 18,
    fontWeight: '100',
  },

  headText: {
    fontSize: 32,
    color: '#6E797F',
  },

  multiOption: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingLeft: 10,
  },

  multiOptionIcon: {
    height: 25,
    width: 25,
    margin: 10,
    backgroundColor: '#e5e5e5',
    borderRadius: 15,
  },

  multiOptionLabel: {
    color: '#5D737F',
    fontSize: 18,
    fontFamily: 'serif',
    marginLeft: 15,
    marginBottom: 5,
  },

  navButton: {

  }
});
