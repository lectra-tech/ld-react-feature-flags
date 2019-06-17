import React from 'react';
import { mount } from 'enzyme';

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
  return require('../FlagsConsumer').default;
};

describe('Flags', () => {
  describe('flags as boolean', () => {
    it('should return the component or element given by renderOn props when flags is active (true)', () => {
      const Flags = getComponentWithContext({
        variation: jest.fn(() => true)
      });
      const wrapper = mount(
        <Flags flag="beta-only" renderOn={flag => <h4>for beta users</h4>} />
      );
      expect(wrapper.find('h4').length).toBe(1);
    });

    it('should return the component or element given by children props when flags is active (true) and there no renderProps defined', () => {
      const Flags = getComponentWithContext({
        variation: jest.fn(() => true)
      });
      const wrapper = mount(
        <Flags
          flag="beta-only"
          fallbackRender={flag => (
            <h4 className="fallbackRender">for regular users</h4>
          )}
        >
          <h4 className="children">for beta users</h4>
        </Flags>
      );
      expect(wrapper.find('h4.fallbackRender').length).toBe(0);
      expect(wrapper.find('h4.children').length).toBe(1);
    });

    it('should return the component or element given by renderOn props when both renderOn and children props are defined and flags is active (true)', () => {
      const Flags = getComponentWithContext({
        variation: jest.fn(() => true)
      });
      const wrapper = mount(
        <Flags
          flag="beta-only"
          renderOn={flag => <h4 className="renderOn">for beta users</h4>}
          fallbackRender={flag => (
            <h4 className="fallbackRender">for regular users</h4>
          )}
        >
          <h4 className="children">for beta users</h4>
        </Flags>
      );
      expect(wrapper.find('h4.renderOn').length).toBe(1);
      expect(wrapper.find('h4.children').length).toBe(0);
      expect(wrapper.find('h4.fallbackRender').length).toBe(0);
    });

    it('should return nothing when flags is inactive (false) and there no fallbackRender props defined', () => {
      const Flags = getComponentWithContext({
        variation: jest.fn(() => false)
      });
      const wrapper = mount(
        <Flags
          flag="beta-only"
          renderOn={flag => <h4 className="renderOn">for beta users</h4>}
        >
          <h4 className="children">for beta users</h4>
        </Flags>
      );
      expect(wrapper.find('h4').length).toBe(0);
    });

    it('should return the component or element given by fallbackRender props when flags is inactive (false)', () => {
      const Flags = getComponentWithContext({
        variation: jest.fn(() => false)
      });
      const wrapper = mount(
        <Flags
          flag="beta-only"
          renderOn={flag => <h4 className="renderOn">for beta users</h4>}
          fallbackRender={flag => (
            <h4 className="fallbackRender">for regular users</h4>
          )}
        >
          <h4 className="children">for beta users</h4>
        </Flags>
      );
      expect(wrapper.find('h4.renderOn').length).toBe(0);
      expect(wrapper.find('h4.renderOn').length).toBe(0);
      expect(wrapper.find('h4.fallbackRender').length).toBe(1);
    });

    it('should return the component or element given by renderOn props when flags is active (true)', () => {
      const Flags = getComponentWithContext({
        variation: jest.fn(() => true)
      });
      const wrapper = mount(
        <Flags flag="beta-only" renderOn={flag => <h4>for beta users</h4>} />
      );
      expect(wrapper.find('h4').length).toBe(1);
    });
  });

  describe('flags as string', () => {
    it('should return the component or element given by renderOn props when flags is active (string)', () => {
      const Flags = getComponentWithContext({
        variation: jest.fn(() => 'red')
      });
      const wrapper = mount(
        <Flags flag="beta-only" renderOn={flag => <h4>for beta users</h4>} />
      );
      expect(wrapper.find('h4').length).toBe(1);
    });

    it('should return the component or element given by children props when flags is active (string) and there no renderProps defined', () => {
      const Flags = getComponentWithContext({
        variation: jest.fn(() => 'red')
      });
      const wrapper = mount(
        <Flags
          flag="beta-only"
          fallbackRender={flag => (
            <h4 className="fallbackRender">for regular users</h4>
          )}
        >
          <h4 className="children">for beta users</h4>
        </Flags>
      );
      expect(wrapper.find('h4.fallbackRender').length).toBe(0);
      expect(wrapper.find('h4.children').length).toBe(1);
    });

    it('should return the component or element given by renderOn props when both renderOn and children props are defined and flags is active (string)', () => {
      const Flags = getComponentWithContext({
        variation: jest.fn(() => 'red')
      });
      const wrapper = mount(
        <Flags
          flag="beta-only"
          renderOn={flag => <h4 className="renderOn">for beta users</h4>}
          fallbackRender={flag => (
            <h4 className="fallbackRender">for regular users</h4>
          )}
        >
          <h4 className="children">for beta users</h4>
        </Flags>
      );
      expect(wrapper.find('h4.renderOn').length).toBe(1);
      expect(wrapper.find('h4.children').length).toBe(0);
      expect(wrapper.find('h4.fallbackRender').length).toBe(0);
    });

    it('should return the component or element given by renderOn props when flags is active (string)', () => {
      const Flags = getComponentWithContext({
        variation: jest.fn(() => 'red')
      });
      const wrapper = mount(
        <Flags flag="beta-only" renderOn={flag => <h4>for beta users</h4>} />
      );
      expect(wrapper.find('h4').length).toBe(1);
    });
  });

  describe('flags as JSON', () => {
    it('should return the component or element given by renderOn props when flags is active (json)', () => {
      const Flags = getComponentWithContext({
        variation: jest.fn(() => ({ test1: 1, test2: 2 }))
      });
      const wrapper = mount(
        <Flags
          flag="multi-variant-json"
          renderOn={flag => <h4>for beta users</h4>}
        />
      );
      expect(wrapper.find('h4').length).toBe(1);
    });

    it('should return the component or element given by children props when flags is active (json) and there no renderProps defined', () => {
      const Flags = getComponentWithContext({
        variation: jest.fn(() => ({ test1: 1, test2: 2 }))
      });
      const wrapper = mount(
        <Flags
          flag="multi-variant-json"
          fallbackRender={flag => (
            <h4 className="fallbackRender">for regular users</h4>
          )}
        >
          <h4 className="children">for beta users</h4>
        </Flags>
      );
      expect(wrapper.find('h4.fallbackRender').length).toBe(0);
      expect(wrapper.find('h4.children').prop('flag').multiVariantJson).toEqual(
        {
          test1: 1,
          test2: 2
        }
      );
      expect(wrapper.find('h4.children').length).toBe(1);
    });

    it('should return the component or element given by renderOn props when both renderOn and children props are defined and flags is active (json)', () => {
      const Flags = getComponentWithContext({
        variation: jest.fn(() => ({ test1: 1, test2: 2 }))
      });
      const wrapper = mount(
        <Flags
          flag="multi-variant-json"
          renderOn={flag => <h4 className="renderOn">for beta users</h4>}
          fallbackRender={flag => (
            <h4 className="fallbackRender">for regular users</h4>
          )}
        >
          <h4 className="children">for beta users</h4>
        </Flags>
      );
      expect(wrapper.find('h4.renderOn').length).toBe(1);
      expect(wrapper.find('h4.children').length).toBe(0);
      expect(wrapper.find('h4.fallbackRender').length).toBe(0);
    });

    it('should return the component or element given by renderOn props when flags is active (json)', () => {
      const Flags = getComponentWithContext({
        variation: jest.fn(() => ({ test1: 1, test2: 2 }))
      });
      const wrapper = mount(
        <Flags
          flag="multi-variant-json"
          renderOn={flag => <h4>for beta users</h4>}
        />
      );
      expect(wrapper.find('h4').length).toBe(1);
    });
  });
});
