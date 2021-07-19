import React, { useState, useContext, useEffect } from "react";
import AuthContext from "../../context/auth/authContext";

const ForgotPassword = () => {
  const authContext = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [mailSent, setMailSent] = useState(false);

  const { sendMail } = authContext;

  const onChange = (e) => {
    setEmail(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    sendMail(email);
    setMailSent(true);
  };
  return (
    <div className="form-container">
      {!mailSent && (
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="email"> Enter Email Address</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={onChange}
              required
            />
          </div>

          <input
            type="submit"
            value="SEND"
            className="btn btn-primary btn-block"
          />
        </form>
      )}
    </div>
  );
};

export default ForgotPassword;
