import React from 'react';
import './style.scss';

function SignIn() {
  return (
    <div id="sign-modal">
      <h1>Wellcome</h1>
      <form>
        <div className="input-wrapper">
          <label htmlFor="email">Email</label>
          <input type="text" name="email" placeholder="Enter your email here" />
        </div>
        <div className="input-wrapper">
          <label htmlFor="email">Password</label>
          <input type="password" name="password" placeholder="Enter your password here" />
        </div>
        <button type="submit" className="button">Login</button>
        <footer>
          <button type="button" className="link">sign up</button>
          <button type="button" className="link">Forget Password?</button>
        </footer>
      </form>
    </div>
  );
}

export default SignIn;
