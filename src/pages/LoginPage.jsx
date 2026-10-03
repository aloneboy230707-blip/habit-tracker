import React from "react";

function LoginPage({ login }) {
  return (
    <div className="login-box">
      <h1 className="app-title">
        Habit Tracker
      </h1>

      <button onClick={login}>
        Login with Google
      </button>
    </div>
  );
}

export default LoginPage;