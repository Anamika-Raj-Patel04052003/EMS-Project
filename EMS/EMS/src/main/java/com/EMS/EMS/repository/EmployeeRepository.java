package com.EMS.EMS.repository;

import com.EMS.EMS.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;


public interface EmployeeRepository extends JpaRepository<Employee, Long> {

    @Query(
            "SELECT e.department.departmentName, COUNT(e) " +
                    "FROM Employee e " +
                    "GROUP BY e.department.departmentName"
    )

    List<Object[]> getDepartmentAnalytics();

    Employee findByUserUserId(Long userId);



}
