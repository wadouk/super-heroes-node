import {default as React, Component} from 'react';

import {Router, Route} from './router.jsx';
import Heroes from './Heroes.jsx';
import Hero from './Hero.jsx';

export default (() => {
  return (<Router>
    <Route path={/^(\?page=(\d+))?$/}>
      <Heroes/>
    </Route>
    <Route path={/^hero\/(\d+)$/}>
      <Hero/>
    </Route>
  </Router>);
});
