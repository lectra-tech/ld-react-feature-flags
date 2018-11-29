import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { initialize as Client } from 'ldclient-js';

import { FlagsContext } from './FlagsContext';

export default class FlagsProvider extends Component {
  static propTypes = {
    children: PropTypes.any,
    user: PropTypes.shape({
      key: PropTypes.string
    }).isRequired,
    clientkey: PropTypes.string.isRequired,
    bootstrap: PropTypes.object,
    onFlagsChange: PropTypes.func,
    loadingComponent: PropTypes.element
  };

  static defaultProps = {
    bootstrap: {},
    onFlagsChange: undefined,
    loadingComponent: <div />
  };

  constructor() {
    super();
    this.ldClient = null;
    this.state = {
      isFlagsLoaded: false
    };
  }

  async componentDidMount() {
    const { clientkey, user, bootstrap, onFlagsChange } = this.props;
    this.ldClient = await Client(clientkey, user, bootstrap);
    await this.LDReadyEvent(this.ldClient);

    if (onFlagsChange) {
      this.ldClient.on('change', changes => {
        onFlagsChange(changes);
      });
    }

    this.setState({
      isFlagsLoaded: true
    });
  }

  LDReadyEvent(ldclient) {
    return new Promise(resolve => {
      this.ldClient.on('ready', () => {
        resolve();
      });
    });
  }

  render() {
    const { children, loadingComponent } = this.props;
    return this.state.isFlagsLoaded ? (
      <FlagsContext.Provider value={this.ldClient}>
        {children}
      </FlagsContext.Provider>
    ) : (
      loadingComponent
    );
  }
}
