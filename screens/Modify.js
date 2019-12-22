import React, { Component } from 'react';
import {
    TextInput,
    Text,
    View,
    ScrollView,
    Button,
    Picker,
    Alert
} from 'react-native';
import config from '../config.json';

export default class Account extends Component {
    constructor(props){
        super(props);
        this.state = {
          list: []
        }
      }

    componentDidMount() {
        this.setState({list: {loading: true}});
        this.getItems();
    }

    getItems = () => {
        console.log('GET ITEMS');
        fetch(config.backend + '/api/getDevices/')
        .then(res => res.json())
        .then(res => {
            this.setState({list : res.data});
        })
        .catch(error => {
            this.setState({list : {error: true}});
        });
      }

    addRoom = () => {
        console.log(this.state.room_name);
        fetch(config.backend + '/api/addRoom/?room_name=' + this.state.room_name)
        .then(res => this.getItems());
    }

    render() {
        const { list } = this.state;
        let room = -1;
        return (
            <ScrollView>
                {!!list.loading && <Text>Loading</Text>}
                {!!list.length &&(
                   list.map((item) => {
                       room++;
                        return(
                        <View>
                        <Text style={{bold: 'true', fontSize: 30}}>{item.room}</Text>
                        {/* printing devices */}
                        {item.devices.map((device) => {
                            if(device.type == 'heater' || 'light') return OldDevice(device);
                            return(DeviceError(device));
                        })}
                        <AddNew room={{room}} refresh={this.getItems}/>
                        <View
                        style={{
                            paddingBottom: 10,
                            paddingBottom: 10,
                            borderBottomColor: 'black',
                            borderBottomWidth: 2,
                        }}
                        />
                        </View>
                        )
                    })
                )
                }
            {!!list.length &&
            <View style={{paddingBottom: 40}}>
            <TextInput style={{margin: 5 }} 
            placeholder='Room name' 
            onChangeText={text => this.setState({ room_name: text })}/>
            <Button
            title="Add"
            onPress={this.addRoom}/>
            </View>
            }
            </ScrollView>
                )
    }
}

function AddNew(props) {
const [device_type, setDevice_type] = React.useState('');
const [device_name, setDevice_name] = React.useState('');

const handleChange = event => {
    setDevice_type(event.target.value);
};

const addDevice = () => {
    console.log('ADD DEVICE: ' + props.room.room + " " + device_type + " " + device_name);
    fetch(config.backend + '/api/addDevice/?room=' + props.room.room + '&type=' + device_type + '&name=' + device_name)
    .then(res => props.refresh());
}

return(
    <View style={{backgroundColor: '#e8e3e3', marginTop: 5, marginBottom: 5}}>
        <TextInput 
            style={{margin: 5 }} 
            placeholder='Device name'
            onChangeText={text => setDevice_name(text)}/>
        <Picker
            style={{height: 50, width: 100}}
            selectedValue={device_type}
            onValueChange={(itemValue, itemIndex) =>
                setDevice_type(itemValue)
              }>
            <Picker.Item label="Heater" value="heater" />
            <Picker.Item label="Light" value="light" />
        </Picker>
        <Button
        title="Add"
        onPress={addDevice}/>
    </View>
)
}

  function OldDevice(device) {
    const ns_msg = () => {
        Alert.alert(
            'Error',
            'Not Supported Yet',
            [
              {text: 'OK', onPress: () => console.log('OK Pressed')},
            ],
            {cancelable: false},
          );
    }

      return(
      <View style={{backgroundColor: '#e8e3e3', marginTop: 5, marginBottom: 5}}>
        <TextInput style={{margin: 5 }} placeholder='Device name' value={device.name} />
        <Picker
            selectedValue={device.type}>
            <Picker.Item label="Heater" value="heater" />
            <Picker.Item label="Light" value="light" />
        </Picker>
        <TextInput 
            style={{margin: 5 }} 
            placeholder='Endpoint url'/>
        <Button
        title="Save"
        onPress={ns_msg}/>
      </View>
      )
  }