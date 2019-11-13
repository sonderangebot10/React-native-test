import React, { Component } from 'react';
import {
    TextInput,
    Text,
    View,
    ScrollView,
    Button,
    Picker
} from 'react-native';
import { Container, Header, Content, Accordion } from "native-base";

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
        // fetch('/api/getDevices/')
        // .then(res => res.json())
        // .then(res => {
        //     this.setState({list : res.data});
        // })
        // .catch(error => {
        //     this.setState({list : {error: true}});
        // });

        setTimeout(() => {
            this.setState({list : res.data});
          }, 1000)
      }

    render() {
        const { list } = this.state;
        return (
            <ScrollView>
                {!!list.loading && <Text>Loading</Text>}
                {!!list.length &&(
                   list.map((item) => {
                        return(
                        <View>
                        <Text style={{bold: 'true', fontSize: 30}}>{item.room}</Text>
                        {/* printing devices */}
                        {item.devices.map((device) => {
                            if(device.type == 'heater' || 'light') return OldDevice(device);
                            return(DeviceError(device));
                        })}
                        <AddNew />
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
            <TextInput style={{margin: 5 }} placeholder='Room name' />
            <Button
            title="Add"/>
            </View>
            }
            </ScrollView>
                )
    }
}

function AddNew() {
return(
    <View style={{backgroundColor: '#e8e3e3', marginTop: 5, marginBottom: 5}}>
        <TextInput style={{margin: 5 }} placeholder='Device name' />
        <Button
        title="Add"/>
    </View>
)
}

  function OldDevice(device) {
      return(
      <View style={{backgroundColor: '#e8e3e3', marginTop: 5, marginBottom: 5}}>
        <TextInput style={{margin: 5 }} placeholder='Device name' value={device.name} />
        <Picker
            selectedValue={'Heater'}>
            <Picker.Item label="Heater" value="heater" />
            <Picker.Item label="Light" value="light" />
        </Picker>
        <TextInput style={{margin: 5 }} placeholder='Endpoint url'/>
        <Button
        title="Save"/>
      </View>
      )
  }

const res = {data :[{
    room: 'Livingroom',
    devices: [{name: 'F500', type: 'heater', data: {temperature: '21'}},
              {name: 'LED100', type: 'light', data: {state: false}}],
  }, {
    room: 'Bedroom',
    devices: [{name: 'LED150', type: 'light', data: {state: true}}]
  }]};