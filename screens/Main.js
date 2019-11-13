import React, { Component } from 'react';
import { Text } from 'react-native';
import { Container, Header, Content, Tab, Tabs, Body } from 'native-base';

import Tab1 from './Account';
import Tab2 from './Dashboard';
import Tab3 from './Modify';
import Tab4 from './About';

export default class Main extends Component {
    constructor(props) {
        super(props);
        console.log(!!this.props.onLogoutPress);
    }

    render() {
        return (
        <Container>
            <Header hasTabs>
                <Body style={{alignItems: 'center', justifyContent:'flex-end'}}>
                    <Text style={{fontSize: 40, fontWeight: 'bold', color:'white'}}>HomeSwitch</Text>
                </Body>
            </Header>
            <Tabs>
              <Tab heading="Account" style={{padding: 20}}>
                <Tab1 {...this.props}/>
              </Tab>
              <Tab heading="Dashboard" style={{padding: 20}}>
                <Tab2 />
              </Tab>
              <Tab heading="Modify" style={{padding: 20}}>
                <Tab3 />
              </Tab>
              <Tab heading="About" style={{padding: 20}}>
                <Tab4 />
              </Tab>
            </Tabs>
        </Container>
        )
    }
}