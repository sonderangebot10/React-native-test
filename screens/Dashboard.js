import React, { Component } from 'react';
import {
    ScrollView,
    Text,
    View,
    Button,
    Image
} from 'react-native';
import { Slider } from 'react-native-elements';

export default class Account extends Component {
    constructor(props){
        super(props);
        this.state = {
          list: [],
          value: 21
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
                {!!list.length &&
                   list.map((item) => {
                        return(
                        <View>
                        <Text style={{bold: 'true', fontSize: 30}}>{item.room}</Text>
                        {/* printing devices */}
                        {item.devices.map((device) => {
                            if(device.type == 'heater') return Heater(device);
                            if(device.type == 'light') return Light(device);
                            return(DeviceError(device));
                        })}
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
                }
            </ScrollView>
                )
    }
}

function Heater(device) {
    return (
    <View style={{backgroundColor: '#e8e3e3', marginTop: 5, marginBottom: 5}}>
        <View style={{flex: 1, flexDirection: 'row'}}>
        <Text style={{ margin: 5, bold: 'true'}}>{device.name} {"\n"}</Text>
        <Image
          source={{uri: 'https://img.icons8.com/windows/32/000000/air-conditioner.png'}}
          style={{marginLeft:5, width:30, height:30}}
        />
        </View>

            {/* Type: {device.type} {"\n"} */}
            <Slider
                style={{marginLeft: 10, marginRight: 10}}
                value={device.data.temperature}
            />
            <Text style={{margin: 5 }}>Value: 21°C</Text>
            {/* Temperature: {device.data.temperature} */}
        
    </View>
    );
  }  

  function Light(device) {
    return (
    <View style={{backgroundColor: '#e8e3e3', marginTop: 5, marginBottom: 5}}>
        <View style={{flex: 1, flexDirection: 'row'}}>
        <Text style={{margin: 5, bold: 'true'}}>{device.name} {"\n"}</Text>
        <Image
          source={{uri: 'https://img.icons8.com/pastel-glyph/50/000000/light.png'}}
          style={{marginLeft:5, width:30, height:30}}
        />
        </View>
        <Button
            title={device.data.state ? "On" : "Off"}/>
    </View>
    );
  } 

  function DeviceError(device) {
    return (
    <View style={{paddingBottom: 10}}>
        <Text>
            Device: {device.name} {"\n"}
            Device not configured
        </Text>
    </View>
    );
  }

const res = {data :[{
    room: 'Livingroom',
    devices: [{name: 'F500', type: 'heater', data: {temperature: '21'}},
              {name: 'LED100', type: 'light', data: {state: false}}],
  }, {
    room: 'Bedroom',
    devices: [{name: 'LED150', type: 'light', data: {state: true}}]
  }]};