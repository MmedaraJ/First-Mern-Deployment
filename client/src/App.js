import './App.css';
import {
  BrowserRouter,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Main from './views/Main';
import Detail from './views/Detail';
import Update from './views/Update';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route path="/update/product/:id">
              <Update />
          </Route>
          <Route exact path="/products/:id">
            <Detail/>
          </Route>
          <Route exact path="/products">
            <Main/>
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
