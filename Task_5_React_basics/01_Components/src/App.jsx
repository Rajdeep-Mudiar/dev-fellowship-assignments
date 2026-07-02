import { useState } from "react";
import "./App.css";
import Welcome from "./Welcome";
import Button from "./Button";
import ArrowFunction from "./ArrowFunction";
import { Export } from "./Export";
import { HelloWorld, HelloworldWithoutJSX } from "./WithoutJSX";
import { UserProfile } from "./UserProfile";
import { ContactForm } from "./ContactForm";
import { StyledForm } from "./StyledForm";
import { CandidateProfile } from "./CandidateProfile";

function App() {
  return (
    <div>
      <h1>Hello World</h1>
      <Welcome />
      <Button />
      <Welcome />
      <Button />
      <ArrowFunction />
      <Export />
      <HelloWorld />
      <HelloworldWithoutJSX />
      <HelloWorld />
      <UserProfile />
      <ContactForm />
      <StyledForm />
      <CandidateProfile />
    </div>
  );
}

export default App;
