import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import PickerList from '../src/components/pickerList';
import {configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({adapter: new Adapter()});

import {shallow} from 'enzyme';

test('should works', () => {
  expect(true).toBeTruthy();
});
it('renders correctly', () => {
  renderer.create(<PickerList />).toJSON();
});
it('should return a text', () => {
  const instanceOf = renderer.create(<PickerList />).getInstance();
  instanceOf.onValueChange(2);
  expect(instanceOf.state.selected).toEqual(2);
});
