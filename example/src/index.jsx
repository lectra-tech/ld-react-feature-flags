import { createRoot } from 'react-dom/client';
import { FlagsProvider } from '@lectra/ld-react-feature-flags';
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

const root = createRoot(document.getElementById('root'));

root.render(
  <FlagsProvider user={user1} clientkey={CLIENT_SIDE_ID}>
    <App />
  </FlagsProvider>
);
