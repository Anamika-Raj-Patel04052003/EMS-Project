package com.EMS.EMS.repository;

import com.EMS.EMS.entity.Attendance;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface AttendanceRepository
        extends JpaRepository<Attendance, Long> {

    @Query(
            "SELECT COUNT(a) FROM Attendance a"
    )
    Long getTotalAttendance();

    @Query(
            "SELECT COUNT(a) FROM Attendance a " +
                    "WHERE a.status='Present'"
    )
    Long getPresentCount();

    @Query(
            "SELECT COUNT(a) FROM Attendance a " +
                    "WHERE a.status='Absent'"
    )
    Long getAbsentCount();

    // EMPLOYEE ATTENDANCE
    List<Attendance>
    findByEmployee_Id(Long employeeId);
}

