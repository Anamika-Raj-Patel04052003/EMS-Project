import { useState } from "react";

function EditManagerForm({

  manager,

  fetchManagers,

  setShowEditManager
}) {

  const [updatedManager,
    setUpdatedManager] = useState(manager);

  const handleChange = (e) => {

    setUpdatedManager({

      ...updatedManager,

      [e.target.name]:
      e.target.value
    });
  };

const updateManager = async (e) => {

  e.preventDefault();

  try {

    const response = await fetch(

      `http://localhost:8081/api/managers/${manager.managerId}`,

      {

        method: "PUT",

        headers: {

          "Content-Type":
          "application/json"
        },

        body: JSON.stringify(
          updatedManager
        )
      }
    );

    if(response.ok){

      alert(
        "Manager Updated 😎"
      );

      fetchManagers();

      setShowEditManager(false);

    } else {

      const errorText =
        await response.text();

      console.log(errorText);

      alert(
        "Update Failed ❌"
      );
    }

  } catch(error){

    console.log(error);

    alert(
      "Backend server not running ❌"
    );
  }
};

  return (

    <div className="card shadow mt-4">

      <div className="card-body">

        <h3>
          Edit Manager
        </h3>

<form onSubmit={updateManager}>

<div className="row">

<div className="col-md-6">

<input
type="text"
name="name"
className="form-control mb-3"
placeholder="Name"
value={updatedManager.name}
onChange={handleChange}
/>

<input
type="email"
name="email"
className="form-control mb-3"
placeholder="Email"
value={updatedManager.email}
onChange={handleChange}
/>

<input
type="text"
name="phone"
className="form-control mb-3"
placeholder="Phone"
value={updatedManager.phone}
onChange={handleChange}
/>

<input
type="text"
name="jobRole"
className="form-control mb-3"
placeholder="Job Role"
value={updatedManager.jobRole}
onChange={handleChange}
/>

<select
name="gender"
className="form-control mb-3"
value={updatedManager.gender}
onChange={handleChange}
>

<option value="">
Select Gender
</option>

<option value="Male">
Male
</option>

<option value="Female">
Female
</option>

</select>

</div>

<div className="col-md-6">

<input
type="number"
name="salary"
className="form-control mb-3"
placeholder="Salary"
value={updatedManager.salary}
onChange={handleChange}
/>

<input
type="date"
name="joiningDate"
className="form-control mb-3"
value={updatedManager.joiningDate}
onChange={handleChange}
/>

<select
name="status"
className="form-control mb-3"
value={updatedManager.status}
onChange={handleChange}
>

<option value="">
Select Status
</option>

<option value="Active">
Active
</option>

<option value="Inactive">
Inactive
</option>

</select>

<input

type="text"

name="photo"

className="form-control mb-3"

placeholder="Photo URL/Base64"

value={updatedManager.photo}

onChange={handleChange}

/>

<button
className="btn btn-primary"
>

Update Manager

</button>

</div>

</div>

</form>

      </div>

    </div>
  );
}

export default EditManagerForm;