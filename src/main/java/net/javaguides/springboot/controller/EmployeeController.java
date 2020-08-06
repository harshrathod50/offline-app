package net.javaguides.springboot.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import net.javaguides.springboot.exception.ResourceNotFoundException;
import net.javaguides.springboot.model.Employee;
import net.javaguides.springboot.repository.EmployeeRepository;

@CrossOrigin("*")
@RestController
@RequestMapping("/v1/employee")
public class EmployeeController {
  @Autowired
  private EmployeeRepository employeeRepository;

  @PostMapping("/save_one")
  public ResponseEntity<Employee> saveOne(@RequestBody Employee employee) {
    return ResponseEntity.ok(employeeRepository.save(employee));
  }

  @GetMapping("/read_one/{employeeId}")
  public ResponseEntity<Employee> readOne(@PathVariable Long employeeId) {
    Employee employee = employeeRepository
	    .findById(employeeId)
      .orElseThrow(() -> new ResourceNotFoundException("Employee not exist with id :" + employeeId));
    return ResponseEntity.ok(employee);
  }

  @GetMapping("/read_all")
  public ResponseEntity<List<Employee>> readAll() {
    return ResponseEntity.ok(employeeRepository.findAll());
  }

  @PutMapping("/edit_one/{employeeId}")
  public ResponseEntity<Employee> editOne(@PathVariable Long employeeId, @RequestBody Employee employeeDetails) {
    Employee employee = employeeRepository
      .findById(employeeId)
      .orElseThrow(() -> new ResourceNotFoundException("Employee not exist with id :" + employeeId));
    employee.setFirstName(employeeDetails.getFirstName());
    employee.setLastName(employeeDetails.getLastName());
    employee.setEmailId(employeeDetails.getEmailId());
    Employee updatedEmployee = employeeRepository.save(employee);
    return ResponseEntity.ok(updatedEmployee);
  }

  @DeleteMapping("/remove_one/{employeeId}")
  public ResponseEntity<Map<String, Boolean>> removeOne(@PathVariable Long employeeId) {
    Employee employee = employeeRepository
      .findById(employeeId)
      .orElseThrow(() -> new ResourceNotFoundException("Employee not exist with id :" + employeeId));
    employeeRepository.delete(employee);
    Map<String, Boolean> response = new HashMap<>();
    response.put("deleted", Boolean.TRUE);
    return ResponseEntity.ok(response);
  }
}
