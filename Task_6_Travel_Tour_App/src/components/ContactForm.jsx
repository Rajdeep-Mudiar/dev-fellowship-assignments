import "./ContactFormStyles.css";

function ContactForm() {
  return (
    <div className="form-container">
      <h1>Send a message to us!</h1>
      <form>
        <input type="text" placeholder="Name" />
        <input type="email" placeholder="Email" />
        <input type="subject" placeholder="Subject" />
        <textarea placeholder="Message" rows="4"></textarea>
        <button>Submit</button>
      </form>
    </div>
  );
}

export default ContactForm;
