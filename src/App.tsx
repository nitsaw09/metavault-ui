import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Welcome from './screens/Welcome';
import WalletCreationWizard from './screens/WalletCreationWizard';
import ImportWalletWizard from './screens/ImportWalletWizard';
import Wallet from './screens/Wallet';
import Login from './screens/Login';

const App: React.FC = () => {
  return (
    <Router>
        <header className='text-center' style={{ background: '#fff', padding: 0 }}>
          <img src="./logo.png" alt="Logo" style={{ width: 150, height: 'auto', marginTop: 25 }} />
        </header>
        <Switch>
          <Route exact path="/" component={Welcome} />
          <Route path="/Login" component={Login} />
          <Route path="/create-wallet" component={WalletCreationWizard} />
          <Route path="/import-wallet" component={ImportWalletWizard} />
          <Route path="/wallet" component={Wallet} />
        </Switch>
    </Router>
  );
};

export default App;