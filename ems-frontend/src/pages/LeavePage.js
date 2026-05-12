
import { useState } from "react";

function LeavePage() {

  const user = JSON.parse(

  localStorage.getItem(
    "user"
  )
);

  const [leave, setLeave] = useState({

    startDate: "",
    endDate: "",
    reason: ""
  });

  

  const handleChange = (e) => {

    setLeave({

      ...leave,

      [e.target.name]:
      e.target.value
    });
  };

  const applyLeave = async (e) => {

    e.preventDefault();

    const leaveData = {

      ...leave,

      status: "Pending",


     employee: {
  id: user.employeeId
}
    };

    await fetch(
      "http://localhost:8081/api/leaves",
      {

        method: "POST",

        headers: {
          "Content-Type":
          "application/json"
        },

        body: JSON.stringify(
          leaveData
        )
      }
    );

    alert("Leave Applied");

    setLeave({

      startDate: "",
      endDate: "",
      reason: ""
    });
  };

  return (

<div
  style={{

    minHeight: "100vh",

    background:
      "#eef2f7",

    padding: "40px"
  }}
>

<div className="container">

<div
  className="shadow-lg"

  style={{

    background: "white",

    borderRadius: "20px",

    padding: "40px"
  }}
>

<form onSubmit={applyLeave}>

<h1 className="fw-bold mb-4">

  Apply Leave

</h1>

<div className="mb-3">

<label className="form-label">

Leave Reason

</label>

<input
  type="text"

  name="reason"

  value={leave.reason}

  onChange={handleChange}

  className="form-control"

  placeholder="Enter leave reason"
/>

</div>

<div className="mb-3">

<label className="form-label">

Start Date

</label>

<input
  type="date"

  name="startDate"

  value={leave.startDate}

  onChange={handleChange}

  className="form-control"
/>

</div>

<div className="mb-3">

<label className="form-label">

End Date

</label>

<input
  type="date"

  name="endDate"

  value={leave.endDate}

  onChange={handleChange}

  className="form-control"
/>

</div>

<button
  type="submit"

  className=
  "btn btn-primary px-4"
>

  Apply Leave

</button>

</form>

</div>

</div>

</div>
  );
}

export default LeavePage;

