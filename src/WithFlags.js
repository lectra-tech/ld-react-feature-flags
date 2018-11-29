import React, { Component } from 'react';

import { camelize } from './helpers/tools';
import { FlagsContext } from './FlagsContext';

const WithFlags = key => (ComponentA, ComponentB = undefined) =>
  class togglerHOC extends Component {
    render() {
      return (
        <FlagsContext.Consumer>
          {ldClient => {
            const flagValue = ldClient.variation(key, false);
            this.camelFlag = camelize(key);
            const featureProps = {
              [this.camelFlag]: flagValue
            };
            return (() => {
              if (flagValue === true && ComponentA) {
                return <ComponentA {...this.props} flags={featureProps} />;
              }
              if (flagValue === false && ComponentB) {
                return <ComponentB {...this.props} flags={featureProps} />;
              }
              if (typeof flagValue === 'string' && ComponentA) {
                return <ComponentA {...this.props} flags={featureProps} />;
              }
              return <React.Fragment />;
            })();
          }}
        </FlagsContext.Consumer>
      );
    }
  };

export default WithFlags;
