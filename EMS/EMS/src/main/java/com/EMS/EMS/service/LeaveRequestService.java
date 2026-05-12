package com.EMS.EMS.service;

import com.EMS.EMS.entity.LeaveRequest;

import com.EMS.EMS.repository.LeaveRequestRepository;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LeaveRequestService {

    @Autowired
    private LeaveRequestRepository repository;

    public LeaveRequest saveLeave(
            LeaveRequest leave
    ) {

        return repository.save(leave);
    }

    public List<LeaveRequest> getAllLeaves() {

        return repository.findAll();
    }

    public List<LeaveRequest>
    getLeavesByEmployee(Long employeeId) {

        return repository
                .findByEmployee_Id(employeeId);
    }

    public LeaveRequest
    getLeaveById(Long id) {

        return repository
                .findById(id)
                .orElse(null);
    }
}