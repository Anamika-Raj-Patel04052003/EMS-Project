package com.EMS.EMS.controller;

import com.EMS.EMS.entity.Employee;
import com.EMS.EMS.service.EmployeeService;

import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/employees")
@CrossOrigin
public class EmployeeController {

    @Autowired
    private EmployeeService service;

    // GET ALL EMPLOYEES
    @GetMapping
    public List<Employee> getAllEmployees() {

        return service.getAllEmployees();
    }

    // GET EMPLOYEE BY ID
    @GetMapping("/{id}")
    public Employee getEmployeeById(
            @PathVariable Long id
    ) {

        return service.getEmployeeById(id);
    }

    // ADD EMPLOYEE
    @PostMapping
    public Employee addEmployee(
            @Valid
            @RequestBody Employee emp
    ) {

        return service.saveEmployee(emp);
    }

    // UPDATE EMPLOYEE
    @PutMapping("/{id}")
    public Employee updateEmployee(

            @PathVariable Long id,

            @RequestBody Employee employee
    ) {

        Employee existingEmployee =
                service.getEmployeeById(id);

        existingEmployee.setName(
                employee.getName()
        );

        existingEmployee.setEmail(
                employee.getEmail()
        );

        existingEmployee.setPhone(
                employee.getPhone()
        );

        existingEmployee.setSalary(
                employee.getSalary()
        );

        existingEmployee.setJobRole(
                employee.getJobRole()
        );

        existingEmployee.setJoiningDate(
                employee.getJoiningDate()
        );

        existingEmployee.setStatus(
                employee.getStatus()
        );

        // Gender update nahi hoga 😎

        if (employee.getDepartment() != null) {

            existingEmployee.setDepartment(
                    employee.getDepartment()
            );
        }

        return service.saveEmployee(
                existingEmployee
        );
    }

    // DELETE EMPLOYEE
    @DeleteMapping("/{id}")
    public void deleteEmployee(
            @PathVariable Long id
    ) {

        service.deleteEmployee(id);
    }

    // DEPARTMENT ANALYTICS
    @GetMapping("/department-analytics")
    public List<Object[]> getDepartmentAnalytics() {

        return service.getDepartmentAnalytics();
    }
}