import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';

import Navigation from '../index';

describe('<Navigation />', () => {
  it('renders Navigation component with 2 elements', () => {
    const wrapper = shallow(
      <Navigation />
    );
    expect(wrapper.find('li').length).toEqual(2);
  });
  it('renders Navigation component with serlected current', () => {
    const wrapper = shallow(
      <Navigation />
    );
    expect(wrapper.find('li').length).toEqual(2);
  });
});