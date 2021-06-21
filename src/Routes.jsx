import { Provider } from 'react-redux';
import { Route, Router, Switch, Redirect } from 'react-router-dom';
import { configureStore, history } from './store/configureStore';
import {PAGE_PATHS} from "./constants/PagePaths";
import { Home } from './pages/Home';
import { View } from './pages/View';
import { Create } from './pages/Create';
import { Update } from './pages/Update';



const store = configureStore();

const Routes = () => {
    return (
      <Provider store={store}>
        <Router history={history}>
          <Switch>
            <Redirect exact from={"/"} to={PAGE_PATHS.HOME} />
              <Route path={PAGE_PATHS.HOME} exact component={Home} />
              <Route path={PAGE_PATHS.VIEW} exact component={View} />
              <Route path={PAGE_PATHS.CREATE} exact component={Create} />
              <Route path={PAGE_PATHS.EDIT} exact component={Update} />

            </Switch>
        </Router>
      </Provider>
    );
  };

  export default Routes;