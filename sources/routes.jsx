import {default as React, Component} from 'react';

import {Router, Route} from './router.jsx';
import Heroes from './Heroes.jsx';

export default (() => {
  return (<Router>
    <Route>
      <Heroes/>
    </Route>
  </Router>);
});
