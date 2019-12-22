import React, { Component } from 'react';
import {
    ScrollView,
    Text,
    View,
    Button,
    Image
} from 'react-native';
import { Slider } from 'react-native-elements';
import config from '../config.json'

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
        fetch(config.backend + '/api/getDevices/')
        .then(res => res.json())
        .then(res => {
            this.setState({list : res.data});
        })
        .catch(error => {
            this.setState({list : {error: true}});
        });
      }

    render() {
        const { list } = this.state;
        let room_num = -1;

        return (
            <ScrollView>
              <Button
              title="Refresh"
              onPress={this.getItems}/>
                {!!list.loading && <Text>Loading</Text>}
                {!!list.length &&
                   list.map((item) => {
                        room_num++;
                        let device_num = -1;
                        return(
                        <View>
                        <Text style={{bold: 'true', fontSize: 30}}>{item.room}</Text>
                        {/* printing devices */}
                        {item.devices.map((device) => {
                            device_num++;
                            if(device.type == 'heater') return <Heater device={{device}} device_num={{device_num}} room={{room_num}}/>;
                            if(device.type == 'light') return <Light device={{device}} device_num={{device_num}} room={{room_num}}/>;
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

class Heater extends Component {
  constructor(props){
    super(props);
    this.state = {
      temperature: this.props.device.device.data.temperature
    }
  }

  componentDidMount() {
    this.setState({temperature: this.props.device.device.data.temperature});
  }

  changeTemp = (newValue) => {
    fetch(config.backend + '/api/changeTemp/?room=' + this.props.room.room_num + '&device=' + this.props.device_num.device_num + '&value=' + newValue)
    .then(res => res.json())
    .then(res=> {
      this.setState({temperature: res.temperature});
    });
  };

  render() {
    return (
    <View style={{backgroundColor: '#e8e3e3', marginTop: 5, marginBottom: 5}}>
        <View style={{flex: 1, flexDirection: 'row'}}>
        <Text style={{ margin: 5, bold: 'true'}}>{this.props.device.name} {"\n"}</Text>
        <Image
          source={{uri: 'https://img.icons8.com/windows/32/000000/air-conditioner.png'}}
          style={{marginLeft:5, width:30, height:30}}
        />
        </View>
            <Slider
                style={{marginLeft: 10, marginRight: 10, width:'100%'}}
                value={parseInt(this.state.temperature)}
                step={1}
                minimumValue={10}
                maximumValue={30}
                onValueChange={this.changeTemp}
            />
            <Text style={{marginLeft: 10, marginRight: 10}}>Value: {this.state.temperature}</Text>        
    </View>
    );
  }
  }  

  class Light extends Component {
    constructor(props){
      super(props);
      this.state = {
        state: this.props.device.device.data.state
      }
    }

    changeLight = () => {
      console.log('change light');
      fetch(config.backend + '/api/changeLight/?room=' + this.props.room.room_num + '&device=' + this.props.device_num.device_num)
      .then(res => res.json())
      .then(res => {
        console.log(res);
        this.setState({state: res.state});
      });
    };

    render(){
    return (
    <View style={{backgroundColor: '#e8e3e3', marginTop: 5, marginBottom: 5}}>
        <View style={{flex: 1, flexDirection: 'row'}}>
        <Text style={{margin: 5, bold: 'true'}}>{this.props.device.name} {"\n"}</Text>
        <Image
          source={{uri: 'https://img.icons8.com/pastel-glyph/50/000000/light.png'}}
          style={{marginLeft:5, width:30, height:30}}
        />
        </View>
        <Button onPress={this.changeLight} title={(this.state.state) ? 'Turn off' : 'Turn on'}>
        </Button>
    </View>
    );
    }
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