import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080/v1"
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
