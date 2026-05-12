import { useState } from "react";

function AddEmployeeForm({

  fetchEmployees,

  setShowAddEmployee
}) {

  const [employeeData, setEmployeeData] = useState({

    name: "",
    email: "",
    phone: "",
    salary: "",
    jobRole: "",
    joiningDate: "",
    gender: "",
    status: "",
    user: {

  username: "",

  password: "",

  role: "EMPLOYEE"
},

    department: {
   departmentId: 3
}

  });

  const handleChange = (e) => {

    setEmployeeData({

      ...employeeData,

      [e.target.name]: e.target.value
    });
  };

  const addEmployee = async (e) => {

    e.preventDefault();

    console.log(employeeData);

    const response = await fetch(
      "http://localhost:8081/api/employees",
      {

        method: "POST",

        headers: {

          "Content-Type": "application/json",

        //   Authorization:
        //     "Bearer " + localStorage.getItem("token")
        },

        body: JSON.stringify(employeeData)
      }
    );

    if (response.ok) {

      alert("Employee Added Successfully");

      fetchEmployees();

      setShowAddEmployee(false);


     


      setEmployeeData({

        name: "",
        email: "",
        phone: "",
        salary: "",
        jobRole: "",
        joiningDate: "",
        gender: "",
        status: "",
        user: {

  username: "",

  password: "",

  role: "EMPLOYEE"
},

       department: {
   departmentId: 3
}

      });

    } else {

      const errorText = await response.text();

      console.log(errorText);

      alert("Error while adding employee");
    }
  };

  return (

    <div className="card shadow mt-5">

      <div className="card-body">

<div
  className= "d-flex justify-content-between align-items-center mb-4"
>

<h3>

  Add Employee

</h3>


<button

  type="button"

  className="btn-close"

  onClick={() => {

    setShowAddEmployee(false);

    setEmployeeData({

      name: "",
      email: "",
      phone: "",
      salary: "",
      jobRole: "",
      joiningDate: "",
      gender: "",
      status: "",

      user: {

        username: "",
        password: "",
        role: "EMPLOYEE"
      },

      department: {
        departmentId: 3
      }
    });
  }}

>

</button>



</div>



        <form onSubmit={addEmployee}>

          <div className="row">

            <div className="col-md-6 mb-3">

              <input
                type="text"
                name="name"
                placeholder="Enter Name *"
                className="form-control"
                value={employeeData.name}
                onChange={handleChange}
                required
              />



            </div>

            <div className="col-md-6 mb-3">

              <input
                type="email"
                name="email"
                placeholder="Enter Email *"
                className="form-control"
                value={employeeData.email}
                onChange={handleChange}
                required
              />

            </div>

            <div className="col-md-6 mb-3">


<input
  type="text"

  placeholder="Enter Username *"

  className="form-control"

  autoComplete="off"

  value={
    employeeData.user.username
  }

  onChange={(e) =>

    setEmployeeData({

      ...employeeData,

      user: {

        ...employeeData.user,

        username:
        e.target.value
      }
    })
  }

  required
/>

</div>


<div className="col-md-6 mb-3">

<input
  type="password"

  placeholder="Enter Password *"

  className="form-control"

   autoComplete="new-password"

  value={
    employeeData.user.password
  }

  onChange={(e) =>

    setEmployeeData({

      ...employeeData,

      user: {

        ...employeeData.user,

        password:
        e.target.value
      }
    })
  }

  required
/>

</div>


            <div className="col-md-6 mb-3">

              <input
                type="text"
                name="phone"
                placeholder="Enter 10 Digit Phone Number *"
                className="form-control"
                maxLength="10"
                value={employeeData.phone}

                onChange={(e) => {

                  const value = e.target.value;

                  if (/^\d*$/.test(value) && value.length <= 10) {

                    setEmployeeData({

                      ...employeeData,

                      phone: value
                    });
                  }
                }}

                required
              />

            </div>

            <div className="col-md-6 mb-3">

              <input
                type="number"
                name="salary"
                placeholder="Enter Salary *"
                className="form-control"
                min="1"
                value={employeeData.salary}
                onChange={handleChange}
                required
              />

            </div>

            <div className="col-md-6 mb-3">

              <input
                type="text"
                name="jobRole"
                placeholder="Enter Job Role *"
                className="form-control"
                value={employeeData.jobRole}
                onChange={handleChange}
                required
              />

            </div>

            <div className="col-md-6 mb-3">

              <label className="mb-1">
                Joining Date *
              </label>

              <input
  type="date"
  name="joiningDate"
  className="form-control"
  value={employeeData.joiningDate}
  onChange={handleChange}
  required
/>

            </div>

            <div className="col-md-6 mb-3">

              <select
                name="gender"
                className="form-control"
                value={employeeData.gender}
                onChange={handleChange}
                required
              >

                <option value="">
                  Select Gender *
                </option>

                <option value="Male">
                  Male
                </option>

                <option value="Female">
                  Female
                </option>

              </select>

            </div>

            <div className="col-md-6 mb-3">

  <select
    name="status"
    className="form-control"
    value={employeeData.status}
    onChange={handleChange}
    required
  >

    <option value="">
      Select Status *
    </option>

    <option value="Active">
      Active
    </option>

    <option value="Inactive">
      Inactive
    </option>

  </select>

</div>

<div className="col-md-6 mb-3">

  <select
    className="form-control"

    value={employeeData.department.departmentId}

    onChange={(e) =>

      setEmployeeData({

        ...employeeData,

        department: {
          departmentId: Number(e.target.value)
        }
      })
    }
  >

    <option value="1">
      HR
    </option>

    <option value="2">
      IT
    </option>

    <option value="3">
      Finance
    </option>

    <option value="4">
      Software Engineer
    </option>

  </select>

</div>

          </div>

          <button
            type="submit"
            className="btn btn-success"
          >

            Add Employee

          </button>

        </form>

      </div>

    </div>
  );
}

export default AddEmployeeForm;