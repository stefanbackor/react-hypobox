/**
 * Testing our link component
 */

import A from '../index';

import expect from 'expect';
import { shallow } from 'enzyme';
import React from 'react';

describe('<A />', () => {
  it('should render its children', () => {
    const children = (<h1>Test</h1>);
    const renderedComponent = shallow(
      <A href="/">
        {children}
      </A>
    );
    expect(renderedComponent.contains(children)).toEqual(true);
  });

  it('should adopt the className', () => {
    const renderedComponent = shallow(<A className="test" href="/">Test</A>);
    expect(renderedComponent.find('a').hasClass('test')).toEqual(true);
  });

  it('should adopt the href', () => {
    const renderedComponent = shallow(<A href="mxstbr.com">Test</A>);
    expect(renderedComponent.prop('href')).toEqual('mxstbr.com');
  });

  it('should adopt the target', () => {
    const renderedComponent = shallow(<A target="_blank" href="/">Test</A>);
    expect(renderedComponent.prop('target')).toEqual('_blank');
  });
});
