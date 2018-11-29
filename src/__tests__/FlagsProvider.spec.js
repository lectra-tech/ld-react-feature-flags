import React from 'react';
import { shallow } from 'enzyme';
import FlagsProvider from '../FlagsProvider';

jest.mock('ldclient-js', () => {
  return {
    initialize: jest.fn().mockImplementation(() => {
      return Promise.resolve({
        on: (event, cb) => {
          cb();
        }
      });
    })
  };
});

describe('FlagsProvider', () => {
  let props;
  beforeEach(() => {
    props = {
      user: {
        key: 'auth0|OSS117',
        country: 'France',
        firstName: 'ambre',
        lastName: 'lectra',
        name: 'ambre@lectra.com'
      },
      clientkey: 'azerty'
    };
  });

  it('is truthy', () => {
    expect(FlagsProvider).toBeTruthy();
  });

  it('should update the state when flags are loaded on componentDidMount and then render his children', async () => {
    const loadingComp = <div>Wait for it...</div>;
    const wrapper = await shallow(
      <FlagsProvider {...props} loadingComponent={loadingComp}>
        <h1>whatever node</h1>
      </FlagsProvider>
    );

    expect(wrapper.state('isFlagsLoaded')).toEqual(false);
    await wrapper.instance().componentDidMount();
    wrapper.update();
    await expect(wrapper.state('isFlagsLoaded')).toEqual(true);
    await expect(wrapper.find('h1').length).toBe(1);
  });

  it('should return an error message if flags are not loaded', async () => {
    const wrapper = await shallow(
      <FlagsProvider {...props}>
        <h1>whatever node</h1>
      </FlagsProvider>
    );

    expect(wrapper.state('isFlagsLoaded')).toEqual(false);
    await expect(wrapper.text()).toEqual('');
  });

  it('should return customized load message if flags are not loaded', async () => {
    const props2 = {
      ...props,
      loadingComponent: <div>Loading please wait</div>
    };

    const wrapper = await shallow(
      <FlagsProvider {...props2}>
        <h1>whatever node</h1>
      </FlagsProvider>
    );

    expect(wrapper.state('isFlagsLoaded')).toEqual(false);
    await expect(wrapper.text()).toEqual('Loading please wait');
  });
});
