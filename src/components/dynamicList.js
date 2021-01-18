import React, {Component} from 'react';
import {Container, Content, List, ListItem, Text} from 'native-base';
import {globalStyles} from './global.js';

export default class DynamicList extends Component {
  render() {
    const {items} = this.props;

    return (
      <Container style={globalStyles.container}>
        <Content>
          <List
            dataArray={items}
            renderRow={(item) => (
              <ListItem>
                <Text>{item}</Text>
              </ListItem>
            )}></List>
        </Content>
      </Container>
    );
  }
}
