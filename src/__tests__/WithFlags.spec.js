import React from 'react';
import { mount } from 'enzyme';

const HBeta = () => <h4>for beta users</h4>;
const HStandard = () => <h4>for standard user</h4>;

beforeEach(() => {
  jest.resetModules();
});

const getComponentWithContext = context => {
  // mock out the context you're using in the component
  jest.doMock('../FlagsContext', () => {
    return {
      FlagsContext: {
        Consumer: props => props.children(context)
      }
    };
  });

  // you need to re-require after calling jest.doMock.
  // return the updated Component module that now includes the mocked context
  return require('../WithFlags').default;
};

describe('WithFlags', () => {
  describe('flags as boolean', () => {
    it('should return the component or element when flags is active (true)', () => {
      const WithFlags = getComponentWithContext({
        variation: jest.fn(() => true)
      });
      const HeaderFeatureFlipped = WithFlags('beta-only')(HBeta);
      const wrapper = mount(<HeaderFeatureFlipped />);
      expect(wrapper.find('h4').length).toBe(1);
      expect(wrapper.text()).toBe('for beta users');
    });

    it('should return nothing when flags is inactive (false) and Component B is missing', () => {
      const WithFlags = getComponentWithContext({
        variation: jest.fn(() => false)
      });
      const HeaderFeatureFlipped = WithFlags('beta-only')(HBeta);
      const wrapper = mount(<HeaderFeatureFlipped />);
      expect(wrapper.find('h4').length).toBe(0);
    });

    it('should return the component B when flags is inactive (false)', () => {
      const WithFlags = getComponentWithContext({
        variation: jest.fn(() => false)
      });
      const HeaderFeatureFlipped = WithFlags('beta-only')(HBeta, HStandard);
      const wrapper = mount(<HeaderFeatureFlipped />);
      expect(wrapper.find('h4').length).toBe(1);
      expect(wrapper.text()).toBe('for standard user');
    });

    it('should return the component A when flags is active (true)', () => {
      const WithFlags = getComponentWithContext({
        variation: jest.fn(() => true)
      });
      const HeaderFeatureFlipped = WithFlags('beta-only')(HBeta, HStandard);
      const wrapper = mount(<HeaderFeatureFlipped />);
      expect(wrapper.find('h4').length).toBe(1);
      expect(wrapper.text()).toBe('for beta users');
    });
  });

  describe('flags as string', () => {
    it('should return null when flags is active (string) and there is no component', () => {
      const WithFlags = getComponentWithContext({
        variation: jest.fn(() => 'red')
      });
      const HeaderFeatureFlipped = WithFlags('font-color')();
      const wrapper = mount(<HeaderFeatureFlipped />);
      expect(wrapper.find('h4').length).toBe(0);
    });

    it('should return the component A when flags is active (string)', () => {
      const WithFlags = getComponentWithContext({
        variation: jest.fn(() => 'red')
      });
      const HeaderFeatureFlipped = WithFlags('font-color')(HBeta);
      const wrapper = mount(<HeaderFeatureFlipped />);
      expect(wrapper.find('h4').length).toBe(1);
      expect(wrapper.text()).toBe('for beta users');
    });

    it('should return the component A and not the component B when flags is active (string)', () => {
      const WithFlags = getComponentWithContext({
        variation: jest.fn(() => 'red')
      });
      const HeaderFeatureFlipped = WithFlags('font-color')(HBeta, HStandard);
      const wrapper = mount(<HeaderFeatureFlipped />);
      expect(wrapper.find('h4').length).toBe(1);
      expect(wrapper.text()).toBe('for beta users');
    });
  });

  describe('flags as JSON object', () => {
    it('should return null when flags is active (json) and there is no component', () => {
      const WithFlags = getComponentWithContext({
        variation: jest.fn(() => ({ test1: 1, test2: 2 }))
      });
      const HeaderFeatureFlipped = WithFlags('multi-variant-json')();
      const wrapper = mount(<HeaderFeatureFlipped />);
      expect(wrapper.find('h4').length).toBe(0);
    });

    it('should return the component A when flags is active (json)', () => {
      const WithFlags = getComponentWithContext({
        variation: jest.fn(() => ({ test1: 1, test2: 2 }))
      });
      const HeaderFeatureFlipped = WithFlags('multi-variant-json')(HBeta);
      const wrapper = mount(<HeaderFeatureFlipped />);
      expect(wrapper.find('HBeta').prop('flags').multiVariantJson).toEqual({
        test1: 1,
        test2: 2
      });
      expect(wrapper.find('h4').length).toBe(1);
      expect(wrapper.text()).toBe('for beta users');
    });

    it('should return the component A and not the component B when flags is active (json)', () => {
      const WithFlags = getComponentWithContext({
        variation: jest.fn(() => ({ test1: 1, test2: 2 }))
      });
      const HeaderFeatureFlipped = WithFlags('multi-variant-json')(
        HBeta,
        HStandard
      );
      const wrapper = mount(<HeaderFeatureFlipped />);
      expect(wrapper.find('HBeta').prop('flags').multiVariantJson).toEqual({
        test1: 1,
        test2: 2
      });
      expect(wrapper.find('h4').length).toBe(1);
      expect(wrapper.text()).toBe('for beta users');
    });
  });
});
