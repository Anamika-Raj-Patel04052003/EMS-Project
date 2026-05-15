import { useState, useEffect } from "react";

function AddManagerForm({

  fetchEmployees,

  setShowAddEmployee
}) {

  const [departments, setDepartments] = useState([]);

  const [employeeData, setEmployeeData] = useState({

    name: "",

    email: "",

    phone: "",

    salary: "",

    jobRole: "",

    joiningDate: "",

    gender: "",

    status: "",

    photo: "",

    user: {

      username: "",

      password: "",

      role: "MANAGER"
    },

    department: {

      departmentId: ""
    }
  });

  // FETCH DEPARTMENTS

  useEffect(() => {

    fetchDepartments();

  }, []);

  const fetchDepartments = async () => {

    try {

      const response = await fetch(

        "http://localhost:8081/api/departments"
      );

      const data = await response.json();

      setDepartments(data);

    } catch (error) {

      console.log(error);
    }
  };

  // HANDLE CHANGE

  const handleChange = (e) => {

    setEmployeeData({

      ...employeeData,

      [e.target.name]: e.target.value
    });
  };

  // ADD MANAGER

  const addEmployee = async (e) => {

    e.preventDefault();

    console.log(employeeData);

    const response = await fetch(

      "http://localhost:8081/api/managers",

      {

        method: "POST",

        headers: {

          "Content-Type": "application/json"
        },

        body: JSON.stringify(employeeData)
      }
    );

    if (response.ok) {

      alert("Manager Added Successfully 😎");

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

        photo: "",

        user: {

          username: "",

          password: "",

          role: "MANAGER"
        },

        department: {

          departmentId: ""
        }
      });

    } else {

      const errorText = await response.text();

      console.log(errorText);

      alert("Error while adding manager");
    }
  };

  return (

    <div className="card shadow mt-5">

      <div className="card-body">

        <div
          className="d-flex justify-content-between align-items-center mb-4"
        >

          <h3>
            Add Manager
          </h3>

          <button

            type="button"

            className="btn-close"

            onClick={() => {

              setShowAddEmployee(false);
            }}
          >

          </button>

        </div>

        <form onSubmit={addEmployee}>

          <div className="row">

            {/* NAME */}

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

            {/* EMAIL */}

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

            {/* USERNAME */}

            <div className="col-md-6 mb-3">

              <input

                type="text"

                placeholder="Enter Username *"

                className="form-control"

                autoComplete="off"

                value={employeeData.user.username}

                onChange={(e) =>

                  setEmployeeData({

                    ...employeeData,

                    user: {

                      ...employeeData.user,

                      username: e.target.value
                    }
                  })
                }

                required
              />

            </div>

            {/* PASSWORD */}

            <div className="col-md-6 mb-3">

              <input

                type="password"

                placeholder="Enter Password *"

                className="form-control"

                autoComplete="new-password"

                value={employeeData.user.password}

                onChange={(e) =>

                  setEmployeeData({

                    ...employeeData,

                    user: {

                      ...employeeData.user,

                      password: e.target.value
                    }
                  })
                }

                required
              />

            </div>

            {/* PHONE */}

            <div className="col-md-6 mb-3">

              <input

                type="text"

                placeholder="Enter 10 Digit Phone Number *"

                className="form-control"

                maxLength="10"

                value={employeeData.phone}

                onChange={(e) => {

                  const value = e.target.value;

                  if (/^\d*$/.test(value)
                    && value.length <= 10) {

                    setEmployeeData({

                      ...employeeData,

                      phone: value
                    });
                  }
                }}

                required
              />

            </div>

            {/* SALARY */}

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

            {/* ROLE */}

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

            {/* JOINING DATE */}

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

            {/* GENDER */}

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

            {/* STATUS */}

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

            {/* DEPARTMENT */}

            <div className="col-md-6 mb-3">

              <select

                className="form-control"

                value={employeeData.department.departmentId}

                onChange={(e) =>

                  setEmployeeData({

                    ...employeeData,

                    department: {

                      departmentId:
                        Number(e.target.value)
                    }
                  })
                }

                required
              >

                <option value="">
                  Select Department
                </option>

                {

                  departments.map((dept) => (

                    <option

                      key={dept.departmentId}

                      value={dept.departmentId}
                    >

                      {dept.departmentName}

                    </option>
                  ))
                }

              </select>

            </div>

            {/* PHOTO */}

            <div className="col-md-6 mb-3">

              <input

                type="file"

                className="form-control"

                accept="image/*"

                onChange={(e) => {

                  const file = e.target.files[0];

                  const reader = new FileReader();

                  reader.readAsDataURL(file);

                  reader.onloadend = () => {

                    setEmployeeData({

                      ...employeeData,

                      photo: reader.result
                    });
                  };
                }}

                required
              />

            </div>

          </div>

          <button

            type="submit"

            className="btn btn-success"
          >

            Add Manager

          </button>

        </form>

      </div>

    </div>
  );
}

export default AddManagerForm;