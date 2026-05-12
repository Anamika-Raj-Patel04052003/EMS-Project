package com.EMS.EMS.controller;

import com.EMS.EMS.entity.Attendance;
import com.EMS.EMS.service.AttendanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/attendance")
@CrossOrigin
public class AttendanceController {

    @Autowired
    private AttendanceService service;

    @GetMapping
    public List<Attendance> getAllAttendance() {
        return service.getAllAttendance();
    }

    @PostMapping
    public Attendance markAttendance(
            @RequestBody Attendance attendance) {

        return service.saveAttendance(attendance);
    }

    @GetMapping("/total")

    public Long getTotalAttendance() {

        return service
                .getTotalAttendance();
    }

    @GetMapping("/present")

    public Long getPresentCount() {

        return service
                .getPresentCount();
    }

    @GetMapping("/absent")

    public Long getAbsentCount() {

        return service
                .getAbsentCount();
    }

    @GetMapping("/employee/{employeeId}")

    public List<Attendance> getAttendanceByEmployee(

            @PathVariable Long employeeId
    ) {

        return service
                .getAttendanceByEmployee(employeeId);}
}
