import { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginPage() {

  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    username: "",
    password: ""
  });

  const handleChange = (e) => {

    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value
    });
  };

  const handleLogin = async (e) => {

    e.preventDefault();

    const response = await fetch(
      "http://localhost:8081/api/auth/login",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify(loginData)
      }
    );

    const data = await response.json();
    
    
// SAVE TOKEN
localStorage.setItem(
  "token",
  data.token
);

// SAVE ROLE
localStorage.setItem(
  "role",
  data.user.role
);

localStorage.setItem(
  "user",
  JSON.stringify(data.user)
)


// EMPLOYEE LOGIN
if (data.user.role === "EMPLOYEE") {

  navigate("/employee");
}

// MANAGER LOGIN
else if (data.user.role === "MANAGER") {

  navigate("/manager");
}

else if (
  data.user.role === "ADMIN"
) {

  navigate("/admin");
}

else {

  alert("Invalid Credentials");
}
  
  
   
  };

  return (

    <div style={{
      width: "300px",
      margin: "100px auto",
      padding: "20px",
      border: "1px solid gray",
      borderRadius: "10px"
    }}>

      <h2>Login</h2>

      <form onSubmit={handleLogin}>

        <input
          type="text"
          name="username"
          placeholder="Enter Username"
          onChange={handleChange}
        />

        <br /><br />

        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          onChange={handleChange}
        />

        <br /><br />

        <button type="submit">
          Login
        </button>

      </form>

    </div>
  );
}

export default LoginPage;