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
    renderOn: () => null,
    fallbackRender: () => null
  };

  render() {
    return (
      <FlagsContext.Consumer>
        {ldClient => {
          const flagValue = ldClient.variation(this.props.flag, false);
          const featureProps = {
            [camelize(this.props.flag)]: flagValue
          };
          return (() => {
            if (flagValue === true) {
              return this.props.renderOn(featureProps) || this.props.children;
            }
            if (flagValue === false) {
              return this.props.fallbackRender(featureProps) || null;
            }
            if (typeof flagValue === 'string') {
              return this.props.renderOn(featureProps) || this.props.children;
            }
            return null;
          })();
        }}
      </FlagsContext.Consumer>
    );
  }
}
