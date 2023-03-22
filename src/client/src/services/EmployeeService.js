import axios from 'axios';

export let db = new Array(0);

// if (localStorage.getItem("ems_db") === undefined) {
//   localStorage.setItem("ems_db", []);
// } else {
//   db = localStorage.getItem("ems_db");
// }

const axiosInstance = axios.create({
  baseURL: "https://ems.rathod.dev/v1"
});

class EmployeeService {

  saveOne(employee) {
    return axiosInstance.post("/employee/save_one", employee);
  }

  readOne(employeeId) {
    return axiosInstance.get(`/employee/read_one/${employeeId}`);
  }

  readAll() {
    return axiosInstance.get(`/employee/read_all`);
  }

  editOne(employee, employeeId) {
    return axiosInstance.put(`/employee/edit_one/${employeeId}`, employee);
  }

  removeOne(employeeId) {
    return axiosInstance.delete(`/employee/remove_one/${employeeId}`);
  }
}

export default new EmployeeService()
