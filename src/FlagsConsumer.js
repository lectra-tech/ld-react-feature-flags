import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { FlagsContext } from './FlagsContext';
import { camelize } from './helpers/tools';

export default class FlagsConsumer extends Component {
  static propTypes = {
    children: PropTypes.any,
    flag: PropTypes.string.isRequired,
    renderOn: PropTypes.func,
    fallbackRender: PropTypes.func
  };

  static defaultProps = {
    renderOn: undefined,
    fallbackRender: undefined
  };

  renderChildrenOrRenderOn = (featureProps, children, renderOn) => {
    if (renderOn) {
      return renderOn(featureProps);
    }
    if (children && typeof children) {
      return React.cloneElement(children, { flag: featureProps });
    }
    return React.Fragment;
  };

  render() {
    const { flag, children, renderOn, fallbackRender } = this.props;
    return (
      <FlagsContext.Consumer>
        {ldClient => {
          const flagValue = ldClient.variation(flag, false);
          const featureProps = {
            [camelize(flag)]: flagValue
          };
          return (() => {
            if (flagValue === true) {
              return this.renderChildrenOrRenderOn(
                featureProps,
                children,
                renderOn
              );
            }
            if (flagValue === false) {
              return fallbackRender ? fallbackRender(featureProps) : null;
            }
            if (typeof flagValue !== 'boolean') {
              return this.renderChildrenOrRenderOn(
                featureProps,
                children,
                renderOn
              );
            }
            return null;
          })();
        }}
      </FlagsContext.Consumer>
    );
  }
}
