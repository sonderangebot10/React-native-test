import React, { Component } from 'react';
import {
    Text,
    TextInput,
    View,
    ScrollView,
    Button,
    ActivityIndicator
} from 'react-native';
import { userService } from '../services/user.service';

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
        username: '',
        password: '',
        submitted: false,
        loading: false,
        error: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

handleSubmit(e) {
  e.preventDefault();

  this.setState({ submitted: true });
  const { username, password } = this.state;

  if (!(username && password)) {
      this.setState({ error:"Fields cannot be empty" })
      return;
  }

  this.setState({ loading: true });

  setTimeout(() => {
    if(userService.login(username, password) != ''){
      this.props.onLoginPress();
    }
    else this.setState({ error: "Wrong login information", loading: false })
  }, 1000)

  // (userService.login(username, password))
  // .then(
  //     user => {
  //       const { from } = this.props.location.state || { from: { pathname: "/" } };
  //       this.props.history.push(from);
  //     },
  //     error => this.setState({ error, loading: false })
  // );
}
  
  render() {
    const { username, password, submitted, loading, error } = this.state;
      return (
        <View> 
        <View style={{
          flex: 2,
          flexDirection: 'column',
          justifyContent: 'flex-end',
          alignItems: 'center',
        }}> 
          <Text style={{fontSize: 47, fontWeight: 'bold', paddingBottom: 50 }}>HomeSwitch</Text>
          <View style={{ borderRadius: 15, width: 300, backgroundColor: 'rgba(29,225,45,0.5)', padding:20, marginBottom: 50}}><Text>Username: test{"\n"}Password: test</Text></View>
          <View style={{width: 300}}>
            <Text 
                style={{fontSize: 27}}>
                Login
            </Text>
            <TextInput style={{margin: 5 }} autoCapitalize = 'none' placeholder='Username' name="username" editable={loading ? false : true} value={username} onChangeText={(text) => this.setState({username: text})} />
            <TextInput style={{margin: 5 }} autoCapitalize = 'none' placeholder='Password' name="password" editable={loading ? false : true} value={password} onChangeText={(text) => this.setState({password: text})} secureTextEntry={true} />
            <View style={{margin:7}} />
            {!loading && <Button 
              raised
              // onPress={this.props.onLoginPress}
              onPress={this.handleSubmit}
              title="Submit"/>
            }
            {loading &&
            <ActivityIndicator size="small" color="#0000ff" />
            }
          </View>
        </View>
        <View style={{ flex: 1, justifyContent: 'flex-start'}}>
        {!!error && 
          <View style={{ borderRadius: 15, width: 300, backgroundColor: 'rgba(226,33,33,0.5)', padding: 20, marginTop: 50}}><Text>{error}</Text></View>
          }
        </View>
        </View>
          )
  }
}