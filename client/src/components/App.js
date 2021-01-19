import React from 'react';
import { BrowserRouter as Router , Route, Switch} from 'react-router-dom';
import Header from './Header';
import Landing from './Landing';

const App = () => {
    return (
      <div>
        <Router>
          <div>
            <Header />
            <Switch>
              <Route path="/" component={Landing} />
            </Switch>
          </div>
        </Router>
      </div>
    );
}

export default App;
