/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable import/no-named-as-default */
/* eslint-disable import/named */
import React from 'react';
import { shallow } from 'enzyme';
import { FollowModal } from '../FollowModal';

const renderComponent = (args) => {
  const defaultProps = {
    userLists: [
      {
        id: 1,
        username: 'carlos',
        image: 'image',
        firstName: 'carlos',
        lastName: 'gringo',
      }
    ],
    type: '',
    show: true,
    close: jest.fn(),
    target: {
      parentNode: {}
    }
  };
  const props = { ...defaultProps, ...args };
  return shallow(<FollowModal {...props} />);
};

// const Wrapper = renderComponent();
// const div = Wrapper.find('div');

let Wrapper;
let div;

describe('FollowModal Component Tests', () => {
  it('should pop up the component', () => {
    Wrapper = renderComponent();
    div = Wrapper.find('div');
    expect(Wrapper.exists()).toBe(true);
  });
  it('should find div of this component', () => {
    Wrapper = renderComponent();
    div = Wrapper.find('div');
    expect(div.length).toEqual(9);
  });
  it('should update props', () => {
    Wrapper = renderComponent();
    Wrapper.setProps({ show: false });
    expect(Wrapper).toHaveLength(1);
  });
  it('should update props', () => {
    Wrapper = renderComponent();
    Wrapper.setProps({ userLists: [] });
    expect(Wrapper).toHaveLength(1);
  });

  it('should close Modal on click new user', () => {
    Wrapper = renderComponent();
    const myFun = jest.fn().mockImplementation(() => undefined);
    const instance = Wrapper.instance();
    Wrapper.instance().clearState = myFun;
    const link = Wrapper.find('.body-follow-user');
    link.simulate('click');
    const updateState = instance.clearState();
    expect(updateState).toBe(undefined);
    expect(myFun).toHaveBeenCalledTimes(1);
  });
  it('should close Modal', () => {
    Wrapper = renderComponent();
    const myFun = jest.fn().mockImplementation(() => undefined);
    const instance = Wrapper.instance();
    Wrapper.instance().handleCloseClick = myFun;
    const mockedEvent = {
      target: {
        parentNode: { classList: { contains: jest.fn(() => true) } },
        classList: { contains: jest.fn(() => true) }
      }
    };
    const link = Wrapper.find('.list-modal');
    link.simulate('click', mockedEvent);
    const updateState = instance.handleCloseClick('e');
    expect(updateState).toBe(undefined);
    expect(myFun).toHaveBeenCalledTimes(1);
  });
});
