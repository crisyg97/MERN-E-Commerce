import logo from './logo.svg';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import './App.css';
import Home from './containers/Home'
import Signin from './containers/signin'
import Signup from '-/cointainers/signup'

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact component={Home} ></Route>
          <Route path="/signin" exact component={Signin} ></Route>
          <Route path="/signup" exact component={Signup} ></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
