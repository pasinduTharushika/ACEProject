import React, { useState } from "react";
//import { Grid, TextField, Button } from "@material-ui/core";
import { TextField, Button } from "@mui/material";
import { InputBase, Stack, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/auth.service";
//import "bulma/css/bulma.min.css";
import "./ACEUserloging.css";
import { isVariableDeclarationList } from "typescript";

const LoginPage = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleClick = (e: any) => {
    e.preventDefault();
    setLoading(true);
    if (validation()) {
      login(userName, password)
        .then(
          (response) => {
            return navigate("/ACEdashboard");
          },
          (error) => {
            const resMessage =
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString();
            setMessage(resMessage);
          }
        )
        .finally(() => {
          setLoading(false);
        });
    }

    function validation() {
      debugger;
      if (userName === null || userName === "") {
        setMessage("Please enter Email.");
        return false;
      }
      if (password === null || password === "") {
        setMessage("Please enter Password.");
        return false;
      }
      return true;
    }
  };

  return(
    <div className="Auth-form-container">
     <div className="columns is-centered">
     <div className="column is-4-desktop">
     <form className="Auth-form">
      <div className="Auth-form-content">
        <h3 className="Auth-form-title">Sign In</h3>
        <div className="form-group mt-3">
          <label>Email address</label>
          <input
            type="email"
            className="form-control mt-1"
            placeholder="Enter email"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
        <div className="form-group mt-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control mt-1"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="d-grid gap-2 mt-3">
        <button
          className="btn btn-primary"
          onClick={handleClick}
          >
             Login
          </button>
        </div>
        <p className="forgot-password text-right mt-2">
          Forgot <a href="#">password?</a>
          Need an Account?
                  <span className="line">
                    <a href="/ACEUserregister">Sign Up</a>
                  </span>
        </p>
         {message && <span className="err">{message}</span>}
      </div>
    </form>

     </div>
     </div>
   
  </div>

  );

  
};

export default LoginPage;
