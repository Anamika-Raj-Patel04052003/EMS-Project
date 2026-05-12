import AddEmployeeForm
from "./AddEmployeeForm";

import {
  useEffect,
  useState
} from "react";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid
} from "recharts";


import jsPDF from "jspdf";

import autoTable
from "jspdf-autotable";

import * as XLSX
from "xlsx";

import { saveAs }
from "file-saver";


import {
  useNavigate
} from "react-router-dom";

function ManagerDashboard() {

  const navigate = useNavigate();

const [employees, setEmployees] = useState([]);

const [showEmployees, setShowEmployees]= useState(false);

const [searchTerm, setSearchTerm] = useState("");

const [selectedEmployee, setSelectedEmployee]= useState(null);

const [showAddEmployee, setShowAddEmployee]= useState(false);

const [presentCount, setPresentCount]= useState(0);

const [absentCount, setAbsentCount]= useState(0);

const [totalAttendance, setTotalAttendance]= useState(0);

const [departmentData, setDepartmentData] = useState([]);

const chartData = [
{
    name: "Present",
    value: presentCount
  },

  {
    name: "Absent",
    value: absentCount
  }
];

  // LOGOUT
  const handleLogout = () => {

    localStorage.removeItem("role");

    navigate("/");
  };



const editEmployee = (emp) => {

  setSelectedEmployee(emp);
};


const updateEmployee = async () => {

  const response = await fetch(

    `http://localhost:8081/api/employees/${selectedEmployee.id}`,

    {

      method: "PUT",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify(selectedEmployee)
    }
  );

  if (response.ok) {

    alert("Employee Updated");

    fetchEmployees();

    setSelectedEmployee(null);

  } else {

    alert("Update Failed");
  }
};


const deleteEmployee = async (id) => {

  const confirmDelete =
    window.confirm(
      "Are you sure to delete employee?"
    );

  if (!confirmDelete) return;

  const response = await fetch(

    `http://localhost:8081/api/employees/${id}`,

    {
      method: "DELETE"
    }
  );

  if (response.ok) {

    alert("Employee Deleted");

    fetchEmployees();

  } else {

    alert("Delete Failed");
  }
};


const downloadPDF = () => {

  const doc = new jsPDF();

  doc.text(
    "Employee Report",
    14,
    15
  );

  autoTable(doc, {

    startY: 25,

    head: [[
  "ID",
  "Name",
  "Email",
  "Phone",
  "Salary",
  "Role",
  "Joining Date",
  "Gender",
  "Status",
  "Department"
]],

   body: employees.map((emp) => [

  emp.id,

  emp.name,

  emp.email,

  emp.phone,

  emp.salary,

  emp.jobRole,

  emp.joiningDate,

  emp.gender,

  emp.status,

  emp.department
    ?.departmentName
])
  });

  doc.save(
    "employee-report.pdf"
  );
};



const downloadExcel = () => {

  const excelData =
    employees.map((emp) => ({
  ID: emp.id,

  Name: emp.name,

  Email: emp.email,

  Phone: emp.phone,

  Salary: emp.salary,

  Role: emp.jobRole,

  JoiningDate:
    emp.joiningDate,

  Gender: emp.gender,

  Status: emp.status,

  Department:
    emp.department
      ?.departmentName
}));

  const worksheet =
    XLSX.utils.json_to_sheet(
      excelData
    );

  const workbook =
    XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(
    workbook,
    worksheet,
    "Employees"
  );

  const excelBuffer =
    XLSX.write(workbook, {

      bookType: "xlsx",

      type: "array"
    });

  const fileData =
    new Blob(
      [excelBuffer],
      {
        type:
"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8"
      }
    );

  saveAs(
    fileData,
    "employee-report.xlsx"
  );
};



  // FETCH EMPLOYEES
  const fetchEmployees = async () => {

    const response = await fetch(
      "http://localhost:8081/api/employees"
    );

    const data = await response.json();

    setEmployees(data);
  };


const fetchAnalytics = async () => {

  // PRESENT COUNT
  const presentResponse =
    await fetch(
      "http://localhost:8081/api/attendance/present"
    );

  const presentData =
    await presentResponse.json();

  setPresentCount(presentData);

  // ABSENT COUNT
  const absentResponse =
    await fetch(
      "http://localhost:8081/api/attendance/absent"
    );

  const absentData =
    await absentResponse.json();

  setAbsentCount(absentData);

  // TOTAL ATTENDANCE
  const totalResponse =
    await fetch(
      "http://localhost:8081/api/attendance/total"
    );

  const totalData =
    await totalResponse.json();

  setTotalAttendance(totalData);
};


const fetchDepartmentAnalytics =
async () => {

  const response =
    await fetch(
      "http://localhost:8081/api/employees/department-analytics"
    );

  const data =
    await response.json();

  const formattedData =
    data.map((item) => ({

      department: item[0],

      employees: item[1]
    }));

    setDepartmentData(
      formattedData
    );
};



 useEffect(() => {

    fetchEmployees();

    fetchAnalytics();

    fetchDepartmentAnalytics();

}, []);


  return (

    <div className="d-flex">

      {/* SIDEBAR */}

      <div
        className="text-white p-3"
style={{
  width: "300px",
  minHeight: "100vh",
  background: "linear-gradient(to bottom, #1e293b, #0f172a)"
}}
      >

        <h3 className="mb-4">
          Empify
        </h3>

        <ul className="list-unstyled">

          <li className="mb-3">
            Dashboard
          </li>

          <li className="mb-3">
            Employees
          </li>

          <li className="mb-3">
            Attendance
          </li>

          <li className="mb-3">

  <button

    className="btn btn-light"

    onClick={() =>
      navigate("/manager-leaves")
    }
  >

    Leaves

  </button>

</li>

        </ul>

        <button
          className="btn btn-danger"
          onClick={handleLogout}
        >
          Logout
        </button>

      </div>

      {/* MAIN CONTENT */}

<div
  style={{
    flex: 1,
    backgroundColor: "#eef2f7",
    minHeight: "100vh",
    padding: "40px"
  }}
>

        <h1>
          Manager Dashboard
        </h1>

        <button
  className=
  "btn btn-success mt-3"

  onClick={downloadPDF}
>

  Download Employee Report

</button>

<button
  className=
  "btn btn-primary mt-3 ms-3"

  onClick={downloadExcel}
>

  Download Excel Report

</button>


        {/* CARDS */}

        <div className="row mt-4">

          <div className="col-md-4">

            <div className= "card shadow text-center">

              <div className= "card-body">

                <h5>
                  Total Employees
                </h5>

                <h2>
                  {employees.length}
                </h2>

              </div>

            </div>

          </div>

          <div className="col-md-4">

            <div className= "card shadow text-center">

              <div className= "card-body">

                <h5>
                  Departments
                </h5>

                <h2>3</h2>

              </div>

            </div>

          </div>

          <div className="col-md-4">

            <div className= "card shadow text-center">

              <div className= "card-body">

                <h5>
                  Attendance
                </h5>

                <h2>
                        {totalAttendance}
                </h2>

              </div>

            </div>

          </div>

        </div>


{/* CHART */}

<div className="row mt-5">


<div className="col-md-4">

<div className="card shadow">

  <div className="card-body">

    <h3 className="mb-4">
      Attendance Statistics
    </h3>

    <PieChart
      width={250}
      height={220}
    >

      <Pie
        data={chartData}

        dataKey="value"

        outerRadius={100}

        fill="#8884d8"

        label
      >

        {chartData.map((entry, index) => (

          <Cell
            key={index}
          />

        ))}

      </Pie>
      

      <Tooltip />

      <Legend />

    </PieChart>

  </div>

 </div>
</div>

<div className="col-md-4">

<div className="card shadow">

  <div className="card-body">

    <h3 className="mb-4">
      Attendance Bar Analytics
    </h3>

    <BarChart
      width={250}
      height={220}
      data={chartData}
    >

      <CartesianGrid strokeDasharray="3 3" />

      <XAxis dataKey="name" />

      <YAxis />

      <Tooltip />

      <Legend />

      <Bar
        dataKey="value"
        fill="#0d6efd"
      />

    </BarChart>

  </div>
</div>
</div>



<div className="col-md-4">

<div className="card shadow">

  <div className="card-body">

    <h3 className="mb-4">
      Department Analytics
    </h3>

    <BarChart
      width={250}
      height={220}
      data={departmentData}
    >

      <CartesianGrid strokeDasharray="3 3" />

      <XAxis dataKey="department" />

      <YAxis />

      <Tooltip />

      <Legend />

      <Bar
        dataKey="employees"
        fill="#198754"
      />

    </BarChart>

  </div>
</div>
</div>
</div>

<button
   className= "btn btn-success mt-4 me-3"

  onClick={() =>
    setShowAddEmployee(true)
  }
>

  Add Employee

</button>


{
  showAddEmployee && (

    <div
  className="modal fade show"

  style={{
    display: "block",

    backgroundColor: "rgba(0,0,0,0.5)"
  }}
>

  <div className= "modal-dialog modal-lg">

  <div className= "modal-content p-4">

<AddEmployeeForm

  fetchEmployees={
    fetchEmployees
  }

  setShowAddEmployee={
    setShowAddEmployee
  }
/>
</div>

</div>

</div>

  )
}


<button
  className="btn btn-dark mt-4"

  onClick={() =>
    setShowEmployees(
      !showEmployees
    )
  }
>

  {
    showEmployees

    ? "Hide Employees"

    : "Show Employees"
  }

</button>



        {/* EMPLOYEE TABLE */}

        {
  showEmployees && (

        <div className=
        "card shadow mt-5">

          <div className=
          "card-body">

            <h3 className="mb-3">
              Employees List
            </h3>

            <input
  type="text"

  placeholder="Search Employee 😎"

  className="form-control mb-3"

  value={searchTerm}

  onChange={(e) =>
    setSearchTerm(e.target.value)
  }
/>

            <table className=
            "table table-bordered table-hover">

              <thead className=
              "table-dark">

                <tr>

                 <th>ID</th>
<th>Name</th>
<th>Email</th>
<th>Phone</th>
<th>Salary</th>
<th>Role</th>
<th>Joining Date</th>
<th>Gender</th>
<th>Status</th>
<th>Department</th>
<th>Actions</th>

                </tr>

              </thead>

              <tbody>

                {employees

.filter((emp) =>

  emp.name
    .toLowerCase()

    .includes(
      searchTerm.toLowerCase()
    )

  ||

  emp.email
    .toLowerCase()

    .includes(
      searchTerm.toLowerCase()
    )

  ||

  emp.jobRole
    ?.toLowerCase()

    .includes(
      searchTerm.toLowerCase()
    )
)

.map((emp) => (

                  <tr key={emp.id}>

                    <td>{emp.id}</td>

<td>{emp.name}</td>

<td>{emp.email}</td>

<td>{emp.phone}</td>

<td>{emp.salary}</td>

<td>{emp.jobRole}</td>

<td>{emp.joiningDate}</td>

<td>{emp.gender}</td>

<td>{emp.status}</td>

<td>
  {emp.department?.departmentName}
</td>

<td>

 <button
  className=
  "btn btn-primary btn-sm me-2"

  onClick={() =>
    editEmployee(emp)
  }
>
  Edit
</button>

 <button
  className= "btn btn-danger btn-sm"

  onClick={() =>
    deleteEmployee(emp.id)
  }
>

    Delete

  </button>

</td>

                  </tr>
                ))}

              </tbody>

            </table>

{
  selectedEmployee && (

    <div
  className="modal fade show"

  style={{
    display: "block",

    backgroundColor:
      "rgba(0,0,0,0.5)"
  }}
>

    <div className=
"modal-dialog modal-lg">

<div className=
"modal-content p-4">

      <h3>Edit Employee</h3>

      <input
  type="text"
  className="form-control mb-2"
  value={selectedEmployee.name}

  onChange={(e) =>
    setSelectedEmployee({

      ...selectedEmployee,

      name: e.target.value
    })
  }
/>

      <input
  type="email"
  className="form-control mb-2"
  value={selectedEmployee.email}

  onChange={(e) =>
    setSelectedEmployee({

      ...selectedEmployee,

      email: e.target.value
    })
  }
/>

<input
  type="text"

  className="form-control mb-2"

  maxLength="10"

  value={selectedEmployee.phone}

  onChange={(e) => {

    const value = e.target.value;

    // ONLY 10 DIGIT NUMBER
    if (/^\d*$/.test(value)
        && value.length <= 10) {

      setSelectedEmployee({

        ...selectedEmployee,

        phone: value
      });
    }
  }}
/>

<input
  type="number"
  className="form-control mb-2"
  value={selectedEmployee.salary}

  onChange={(e) =>
    setSelectedEmployee({

      ...selectedEmployee,

      salary: e.target.value
    })
  }
/>

<input
  type="text"

  className="form-control mb-2"

  placeholder="Enter Role"

  value={selectedEmployee.jobRole}

  onChange={(e) =>
    setSelectedEmployee({

      ...selectedEmployee,

      jobRole: e.target.value
    })
  }
/>


<input
  type="date"
  className="form-control mb-2"
  value={selectedEmployee.joiningDate}

  onChange={(e) =>
    setSelectedEmployee({

      ...selectedEmployee,

      joiningDate: e.target.value
    })
  }
/>


<select
  className="form-control mb-2"

  value={selectedEmployee.status}

  onChange={(e) =>
    setSelectedEmployee({

      ...selectedEmployee,

      status: e.target.value
    })
  }
>
  <option value="">Select Status</option>

  <option value="Active">Active</option>

  <option value="Inactive">Inactive</option>
</select>

<select
  className="form-control mb-2"

  value={
    selectedEmployee.department?.departmentId || ""
  }

  onChange={(e) =>
    setSelectedEmployee({

      ...selectedEmployee,

      department: {

        departmentId: Number(e.target.value)
      }
    })
  }
>
  <option value="">
    Select Department
  </option>

  <option value="1">HR</option>

  <option value="3">IT</option>
</select>

<button
  className="btn btn-success"

  onClick={updateEmployee}
>

  Update Employee

</button>

    </div>
     </div>

        </div>
    
  )
}


          </div>

        </div>
        
  )
}
      </div>

    </div>
    
  );
}

export default ManagerDashboard;