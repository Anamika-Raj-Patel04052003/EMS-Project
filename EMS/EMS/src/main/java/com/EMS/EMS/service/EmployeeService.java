package com.EMS.EMS.service;

import com.EMS.EMS.entity.Department;
import com.EMS.EMS.entity.Employee;

import com.EMS.EMS.repository.DepartmentRepository;
import com.EMS.EMS.repository.EmployeeRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmployeeService {

    @Autowired
    private EmployeeRepository repo;

    @Autowired
    private DepartmentRepository departmentRepository;

    @Autowired
    private EmailService emailService;

    // GET ALL EMPLOYEES
    public List<Employee> getAllEmployees() {

        return repo.findAll();
    }

    // SAVE EMPLOYEE
    public Employee saveEmployee(Employee emp) {

        Department department =

                departmentRepository.findById(

                        emp.getDepartment()
                                .getDepartmentId()

                ).orElseThrow(

                        () -> new RuntimeException(
                                "Department not found"
                        )
                );

        emp.setDepartment(department);

        // SAVE EMPLOYEE
        Employee savedEmployee =
                repo.save(emp);

        // EMAIL SUBJECT
        String subject =
                "EMS Login Credentials";

        // EMAIL BODY
        String body =

                "Welcome to EMS\n\n"

                        + "Username: "

                        + savedEmployee.getUser()
                        .getUsername()

                        + "\nPassword: "

                        + savedEmployee.getUser()
                        .getPassword();

        // SEND EMAIL
        emailService.sendEmail(

                savedEmployee.getEmail(),

                subject,

                body
        );

        return savedEmployee;
    }

    // DELETE EMPLOYEE
    public void deleteEmployee(Long id) {

        repo.deleteById(id);
    }

    // GET EMPLOYEE BY ID
    public Employee getEmployeeById(Long id) {

        return repo.findById(id)
                .orElse(null);
    }

    // ANALYTICS
    public List<Object[]> getDepartmentAnalytics() {

        return repo.getDepartmentAnalytics();
    }
}

