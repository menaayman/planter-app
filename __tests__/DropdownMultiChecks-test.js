import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import App from '../src/components/DropdownMultiCheck';
import {configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({adapter: new Adapter()});

import {shallow} from 'enzyme';

test('should works', () => {
  expect(true).toBeTruthy();
});
it('renders correctly', () => {
  renderer.create(<App />).toJSON();
});
it('should return a text', () => {
  const instanceOf = renderer.create(<App />).getInstance();
  instanceOf.onSelectedItemsChange([1, 2, 3, 4]);
  expect(instanceOf.state.selectedItems).toEqual([1, 2, 3, 4]);
});
