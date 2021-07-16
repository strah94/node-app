import React, { useContext, useState } from "react";
import AuthContext from "../../context/auth/authContext";

const Register = () => {
  const authContext = useContext(AuthContext);
  const { register, error, clearErrors, isAuthenticated } = authContext;

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (email === "" || password === "") {
      alert("Please enter all fields");
    } else {
      register({
        firstName,
        lastName,
        email,
        password,
      });
    }
  };

  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    password: "",
    email: "",
  });

  const { firstName, lastName, password, email } = user;

  return (
    <div className="form-container">
      <h1>
        Account <span className="text-primary">Register</span>
      </h1>

      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="firstName"> First Name</label>
          <input
            type="text"
            name="firstName"
            value={firstName}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastName"> Last Name</label>
          <input
            type="text"
            name="lastName"
            value={lastName}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email"> Email Address</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password"> Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={onChange}
            required
            minLength="6"
          />
        </div>
        <input
          type="submit"
          value="Register"
          className="btn btn-primary btn-block"
        />
      </form>
    </div>
  );
};

export default Register;
