import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Employees from './pages/Employees';
import EmployeesForm from './pages/Employees/Form';
import EmployeesDetail from './pages/Employees/Detail';


const Routes: React.FC = () => {
  return (
      <Switch>
          <Route path="/" exact  component={Employees} />
          <Route path="/funcionarios_cadastro" exact component={EmployeesForm} />
          <Route path="/funcionarios_cadastro/:id" exact component={EmployeesForm} />
          <Route path="/funcionarios/:id" exact component={EmployeesDetail} />
      </Switch>
  )
}

export default Routes;