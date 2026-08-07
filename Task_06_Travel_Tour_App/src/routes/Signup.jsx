import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import signupImg from "../assets/about.png";
import Footer from "../components/Footer";
import SignupForm from "../components/SignupForm";

function Signup() {
  return (
    <>
      <Navbar />
      <Hero
        cName="hero-mid"
        heroImg={signupImg}
        title="Sign Up"
        text="Build your travel profile and start planning with Trippy."
        btnClass="hide"
      />
      <SignupForm />
      <Footer />
    </>
  );
}

export default Signup;
