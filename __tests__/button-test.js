import React from 'react';
import Flatbutton from '../src/components/button';
import 'react-native';
import renderer from 'react-test-renderer';
import {configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({adapter: new Adapter()});

import {shallow} from 'enzyme';

test('should works', () => {
  expect(true).toBeTruthy();
});
it('renders correctly', () => {
  renderer.create(<Flatbutton />);
});
/*
it('should return a text', () => {
  const instanceOf = renderer.create(<Flatbutton />).getInstance();
  instanceOf.onPress();
  expect(instanceOf.state.selected).toEqual();
});
*/
