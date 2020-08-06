import './App.css';

import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import ListEmployeeComponent from '../component/ListEmployeeComponent';
import HeaderComponent from '../component/HeaderComponent.jsx';
import FooterComponent from '../component/FooterComponent';
import CreateEmployeeComponent from '../component/CreateEmployeeComponent';
import UpdateEmployeeComponent from '../component/UpdateEmployeeComponent';
import ViewEmployeeComponent from '../component/ViewEmployeeComponent';

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <HeaderComponent />
        <div className="container">
          <Switch>
            <Route path="/" exact component={ListEmployeeComponent} />
            <Route path="/employees" component={ListEmployeeComponent} />
            <Route path="/add-employee/:id" component={CreateEmployeeComponent} />
            <Route path="/view-employee/:id" component={ViewEmployeeComponent} />
            {/* <Route path="/update-employee/:id" component={UpdateEmployeeComponent} /> */}
          </Switch>
        </div>
        <FooterComponent />
      </BrowserRouter>
    </div>
  );
};

export default App;
