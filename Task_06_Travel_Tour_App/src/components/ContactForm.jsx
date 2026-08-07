import "./ContactFormStyles.css";

function ContactForm() {
  return (
    <div className="form-container contact-layout">
      <div className="form-copy">
        <p className="section-label">Contact</p>
        <h1>Send a message to us!</h1>
        <p className="section-text">
          Tell us where you want to go, when you want to travel, or what kind of
          trip you want to build.
        </p>
      </div>
      <form className="contact-card">
        <div className="field-row">
          <input type="text" placeholder="Name" />
          <input type="email" placeholder="Email" />
        </div>
        <input type="text" placeholder="Subject" />
        <textarea placeholder="Message" rows="5"></textarea>
        <button type="submit">Submit Enquiry</button>
      </form>
    </div>
  );
}

export default ContactForm;
