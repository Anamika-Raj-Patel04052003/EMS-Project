package com.EMS.EMS.entity;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
public class LeaveRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private Long leaveId;

    private LocalDate startDate;

    private LocalDate endDate;

    private String reason;

    private String status;

    @ManyToOne
    @JoinColumn(name = "employee_id")

    private Employee employee;

    // GETTERS

    public Long getLeaveId() {
        return leaveId;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public LocalDate getEndDate() {
        return endDate;
    }

    public String getReason() {
        return reason;
    }

    public String getStatus() {
        return status;
    }

    public Employee getEmployee() {
        return employee;
    }

    // SETTERS

    public void setLeaveId(Long leaveId) {
        this.leaveId = leaveId;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public void setEmployee(Employee employee) {
        this.employee = employee;
    }
}