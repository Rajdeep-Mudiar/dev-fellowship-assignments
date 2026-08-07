import "./SignupFormStyles.css";

function SignupForm() {
  return (
    <div className="signup-container signup-layout">
      <div className="signup-copy">
        <p className="section-label">Sign Up</p>
        <h1>Create your travel profile.</h1>
        <p className="section-text">
          Join the Trippy community to save itineraries, get tailored offers,
          and plan your next escape faster.
        </p>
        <ul className="signup-points">
          <li>Personal trip recommendations</li>
          <li>Priority access to new destinations</li>
          <li>Saved wish lists and booking updates</li>
        </ul>
      </div>
      <form className="signup-card">
        <div className="field-row">
          <input type="text" placeholder="First name" />
          <input type="text" placeholder="Last name" />
        </div>
        <input type="email" placeholder="Email address" />
        <input type="password" placeholder="Password" />
        <input type="password" placeholder="Confirm password" />
        <button type="submit">Create Account</button>
      </form>
    </div>
  );
}

export default SignupForm;
