package com.EMS.EMS.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
//import lombok.Data;
import jakarta.validation.constraints.NotBlank;

import jakarta.validation.constraints.NotNull;

//@Data
@Entity
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message =
            "Employee name is required")
    private String name;

    @NotBlank(message =
            "Email is required")
    private String email;

    @NotBlank(message =
            "Phone number is required")
    private String phone;

    @NotNull(message =
            "Salary is required")
    private Double salary;

    @NotBlank(message =
            "Job role is required")

    @Column(name = "job_role")
    private String jobRole;

    @Column(name = "joining_date")
    private String joiningDate;

    private String gender;

    @NotBlank(message =
            "Status is required")
    private String status;

    @ManyToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "department_id")
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private Department department;

    @OneToOne(
            cascade =
                    CascadeType.ALL
    )

    @JoinColumn(
            name = "user_id"
    )

    private User user;

    public void setId(Long id) {
        this.id = id;
    }

    public Department getDepartment() {
        return department;
    }

    public void setDepartment(Department department) {
        this.department = department;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public Double getSalary() {
        return salary;
    }

    public void setSalary(Double salary) {
        this.salary = salary;
    }

    public String getJobRole() {
        return jobRole;
    }

    public void setJobRole(String jobRole) {
        this.jobRole = jobRole;
    }

    public String getJoiningDate() {
        return joiningDate;
    }

    public void setJoiningDate(String joiningDate) {
        this.joiningDate = joiningDate;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
