import React from 'react';
import ReactDOM from 'react-dom';
import { FlagsProvider } from 'ld-react-feature-flags';
import '../node_modules/highlight.js/styles/monokai-sublime.css';
import './index.css';
import App from './App';

import { CLIENT_SIDE_ID } from './constants';

const user1 = {
  key: 'auth0Id_1',
  country: 'France',
  firstName: 'John',
  lastName: 'Doe',
  name: 'j.doe@lectra.com'
};

ReactDOM.render(
  <FlagsProvider user={user1} clientkey={CLIENT_SIDE_ID}>
    <App />
  </FlagsProvider>,
  document.getElementById('root')
);
