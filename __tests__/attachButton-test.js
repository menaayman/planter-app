import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import AttachButton from '../src/components/attachButton';
import {configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({adapter: new Adapter()});

import {shallow} from 'enzyme';

test('should works', () => {
  expect(true).toBeTruthy();
});
it('renders correctly', () => {
  renderer.create(<AttachButton />).toJSON();
});
/*
it('should return a text', () => {
  const instanceOf = renderer.create(<AttachButton />).getInstance();
  instanceOf.menna('akn m7slsh 7aga :D');
  expect(instanceOf.state.file).toEqual();
});
*/
