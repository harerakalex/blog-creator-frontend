/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable import/no-named-as-default */
/* eslint-disable import/named */
import React from 'react';
import { mount } from 'enzyme';
import DisabledStarComponent from '../DisabledStarComponent';

const renderDisabledStar = () => mount(<DisabledStarComponent />);

const Wrapper = renderDisabledStar();
const div = Wrapper.find('div');

describe('StarRating Component Tests', () => {
  it('should render the component', () => {
    expect(Wrapper.exists()).toBe(true);
  });
  it('should find all DIV in this component', () => {
    expect(div.length).toEqual(7);
  });
  it('should test changeRating', () => {
    const myFun = jest.fn().mockImplementation(() => undefined);
    const instance = Wrapper.instance();
    Wrapper.instance().changeRating = myFun;
    div.at(2).simulate('click');
    const updateState = instance.changeRating(3);
    expect(updateState).toBe(undefined);
    expect(myFun).toHaveBeenCalledTimes(1);
  });
});
