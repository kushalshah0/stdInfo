import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "./firebase";
import { toast } from "react-toastify";
import Dashboard from "./Dashboard";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Logged in Successfully", {
        position: "top-center",
        autoClose: 1000,
      });
     setUser(true);
    } catch (error) {
      toast.error("Invalid email or password", {
        position: "top-center",
        autoClose: 1500,
      });
    }
  };

  return ( !user ? <Dashboard/> : 
    <div className="App">
        <div className="auth-wrapper">
          <div className="auth-inner">
    <form onSubmit={handleSubmit}>
      <h3>Login</h3>

      <div className="mb-3">
        {/* <label>Email address</label> */}
        <input
          type="email"
          className="form-control"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="mb-3">
        {/* <label>Password</label>  */}
        <input
          type="password"
          className="form-control"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className="d-grid">
        <button type="submit" className="btn btn-primary">Go</button>
      </div>
    </form>
    </div>
    </div>
    </div>
  );
}

export default Login;