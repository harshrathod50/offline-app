import React, { Component } from 'react';

import EmployeeService, { db } from '../services/EmployeeService';


class ListEmployeeComponent extends Component {

  constructor(props) {
    super(props)
    this.state = {
      employees: []
    }
    this.addEmployee = this.addEmployee.bind(this);
    this.editEmployee = this.editEmployee.bind(this);
    this.deleteEmployee = this.deleteEmployee.bind(this);
  }

  viewEmployee(id) {
    this.props.history.push(`/view-employee/${id}`);
  }

  addEmployee() {
    this.props.history.push('/add-employee/_add');
  }

  editEmployee(id) {
    this.props.history.push(`/add-employee/${id}`);
  }

  deleteEmployee(id) {
    EmployeeService.removeOne(id).then((response) => {
      this.setState({
        employees: this.state.employees.filter((employee) => employee.id !== id)
      })
    }).catch((error) => {
      if (error.message === "Network Error") {
        this.setState({
          employees: this.state.employees.filter((employee) => employee.id !== id)
        });
      }
    });
  }

  componentDidMount() {
    EmployeeService.readAll().then((response) => {
      this.setState({ employees: response.data});
    }).catch((error) => {
      if (error.message === "Network Error") {
        this.setState({ employees: db });
      }
    });
  }

  render() {
    return (
      <div>
        <h2 className="text-center">Employees List</h2>
        <div className="row">
          <button className="btn btn-primary" onClick={this.addEmployee}>Add Employee</button>
        </div>
        <br />
        <br />
        <div className="row">
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>Employee First Name</th>
                <th>Employee Last Name</th>
                <th>Employee Email Id</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
            {this.state.employees.map((employee) => (
              <tr key={employee.id}>
                <td>{employee.firstName}</td>
                <td>{employee.lastName}</td>
                <td>{employee.emailId}</td>
                <td>
                  <button
                    onClick={() => this.editEmployee(employee.id)}
                    className="btn btn-info"
                  >
                    Update
                  </button>
                  <button
                    style={{ marginLeft: "10px" }}
                    onClick={() => this.deleteEmployee(employee.id)}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                  <button
                    style={{ marginLeft: "10px" }}
                    onClick={() => this.viewEmployee(employee.id)}
                    className="btn btn-info"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default ListEmployeeComponent;
