import React from 'react';
import './index.css';
import Home from './Home';
import BarclayPage from './Component/pages/BarclayPage';
import VanquisPage from './Component/pages/VanquisPage';
import NotEligiblePage from './Component/pages/NotEligiblePage';
import { Route, Switch } from 'react-router-dom';
import NoMatch from './NoMatch';

const App = props => {

    return (
      <div>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/pages/Barclay" component={BarclayPage} />
          <Route path="/pages/Vanquis" component={VanquisPage} />
          <Route path="/pages/NotEligible" component={NotEligiblePage} />
          <Route component={NoMatch} />
        </Switch>
      </div>
    );
  
}

export default App;