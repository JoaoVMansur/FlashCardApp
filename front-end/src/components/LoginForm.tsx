import "../Styles/Login.css";
import "react-router-dom";

function loginForm() {
  return (
    <div className="LoginFormPage">
      <form>
        <h1 id="loginTitle">Login</h1>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            placeholder="user name"
            name="username"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            placeholder="password"
            name="password"
            required
          />
        </div>
        <button className="loginPageButtons loginButton" type="submit">
          Login
        </button>
      </form>
      <button className="loginPageButtons createAccountButton">
        Create Account
      </button>
    </div>
  );
}
export default loginForm;
