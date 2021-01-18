import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import Desc from '../src/components/multilinesInput';
import {configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({adapter: new Adapter()});

import {shallow} from 'enzyme';

test('should works', () => {
  expect(true).toBeTruthy();
});
it('renders correctly', () => {
  renderer.create(<Desc />).toJSON();
});
it('should return a text', () => {
  const instanceOf = renderer.create(<Desc />).getInstance();

  instanceOf._handleChange('Menna');
  expect(instanceOf.state.val).toEqual('Menna');
});
