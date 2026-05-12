
        package com.EMS.EMS.service;

import com.EMS.EMS.entity.Attendance;
import com.EMS.EMS.repository.AttendanceRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AttendanceService {

    @Autowired
    private AttendanceRepository repository;

    public Attendance saveAttendance(
            Attendance attendance
    ) {

        return repository.save(attendance);
    }

    public List<Attendance> getAllAttendance() {

        return repository.findAll();
    }

    public Long getTotalAttendance() {

        return repository
                .getTotalAttendance();
    }

    public Long getPresentCount() {

        return repository
                .getPresentCount();
    }

    public Long getAbsentCount() {

        return repository
                .getAbsentCount();
    }

    // EMPLOYEE ATTENDANCE
    public List<Attendance>
    getAttendanceByEmployee(Long employeeId) {

        return repository
                .findByEmployee_Id(employeeId);
    }
}
