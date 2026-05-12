package com.EMS.EMS.service;

import com.EMS.EMS.entity.Department;
import com.EMS.EMS.repository.DepartmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DepartmentService {

    @Autowired
    private DepartmentRepository repository;

    // ADD Department
    public Department saveDepartment(Department department) {
        return repository.save(department);
    }

    // GET All Departments
    public List<Department> getAllDepartments() {
        return repository.findAll();
    }

    // DELETE Department
    public void deleteDepartment(Long id) {
        repository.deleteById(id);
    }
}