package com.EMS.EMS.controller;

import com.EMS.EMS.entity.Department;
import com.EMS.EMS.service.DepartmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/departments")
@CrossOrigin
public class DepartmentController {

    @Autowired
    private DepartmentService service;

    // GET all departments
    @GetMapping
    public List<Department> getAllDepartments() {
        return service.getAllDepartments();
    }

    // ADD department
    @PostMapping
    public Department addDepartment(@RequestBody Department department) {
        return service.saveDepartment(department);
    }

    // DELETE department
    @DeleteMapping("/{id}")
    public void deleteDepartment(@PathVariable Long id) {
        service.deleteDepartment(id);
    }
}
