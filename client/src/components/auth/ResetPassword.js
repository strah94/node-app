import React, { useEffect, useState, useContext } from "react";
import AuthContext from "../../context/auth/authContext";

const ResetPassword = (props) => {
  const authContext = useContext(AuthContext);

  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [passwordReset, setPasswordReset] = useState(true);

  const { resetPassword } = authContext;

  const onChange = (e) => {
    e.target.name === "password"
      ? setPassword(e.target.value)
      : setPasswordConfirm(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== passwordConfirm) {
      alert("Passwords don't match");
    } else {
      const id = props.match.params.id;
      resetPassword(password, id);
      setPasswordReset(false);
    }
  };

  return (
    <div className="form-container">
      {passwordReset ? (
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="password"> Enter new Password</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={onChange}
              required
              minLength="6"
            />
          </div>
          <div className="form-group">
            <label htmlFor="passwordConfirm"> Confirm Password </label>
            <input
              type="password"
              name="passwordConfirm"
              value={passwordConfirm}
              onChange={onChange}
              required
              minLength="6"
            />
          </div>
          <input
            type="submit"
            value="RESET PASSWORD"
            className="btn btn-primary btn-block"
          />
        </form>
      ) : (
        <h1>PASSWORD HAS BEEN RESETED!</h1>
      )}
    </div>
  );
};
export default ResetPassword;
