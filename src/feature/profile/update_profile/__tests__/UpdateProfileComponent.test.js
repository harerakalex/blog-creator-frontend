/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { shallow } from 'enzyme';
import { UpdateProfileComponent } from '../UpdateProfileComponent';

const renderProfile = () => {
  const initialProps = {
    authenticated: {
      username: 'someone'
    },
    user: {},
    bio: {},
    image: {},
    preview: {},
    handleChange: jest.fn(),
    handleFileUpload: jest.fn(),
    closeModal: jest.fn(),
    handleSubmit: jest.fn(),
    handleOnClick: jest.fn(),
    updateProfile: jest.fn(),
    displayModal: jest.fn(),
    show: true
  };
  const props = { ...initialProps };
  return shallow(<UpdateProfileComponent {...props} />);
};

describe('Update Profile Component Tests', () => {
  const wrapper = renderProfile();
  global.URL.createObjectURL = jest.fn();

  it('should render the Update profile component', () => {
    expect(wrapper.length).toEqual(1);
  });

  it('should submit without any data', () => {
    const form = wrapper.find('form');
    const fakeEvent = { preventDefault: () => true };
    form.simulate('submit', fakeEvent);
  });

  it('should fill up and submit the form', () => {
    const bio = wrapper.find('textarea');
    const image = wrapper.find('input[type="file"]');
    const form = wrapper.find('form');

    bio.simulate('change', {
      target: {
        value: 'someone special',
        id: 'bio'
      }
    });
    expect(wrapper.state('bio')).toEqual(
      'someone special'
    );

    image.simulate('change', {
      target: {
        files: [
          'someone.jpeg'
        ]
      }
    });
    expect(wrapper.state('image')).toEqual(
      'someone.jpeg'
    );
    const fakeEvent = { preventDefault: () => true };
    form.simulate('submit', fakeEvent);
  });

  it('should close the modal', () => {
    const fakeEvent = { preventDefault: () => false };
    const closeButton = wrapper.find('i');

    closeButton.simulate('click', fakeEvent);

    expect(wrapper.state('bio')).toEqual('someone special');
  });
});
