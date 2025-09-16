import React, { useState } from "react";
import "./App.css";

function App() {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    dob: ""
  });

  // Refs to target inputs for custom validation messages
  //const phoneRef = useRef(null);
  //const dobRef = useRef(null);

  const handleChange = (e) => {
    const { id, value } = e.target;

    

    setFormData({ ...formData, [id]: value });
  };

  const validateForm = () => {
    const { username, email, phone, dob } = formData;

    if (!username) {
      alert("Please fill out the Username field.");
      return false;
    }
    if (!email) {
      alert("Please fill out the Email Address field.");
      return false;
    }
    if (!email.includes("@")) {
      alert("Invalid email. Please check your email address.");
      return false;
    }
    if (!phone) {
      alert("Please fill out the Phone Number field.");
      return false;
    }
    if (phone.length !== 10 || isNaN(phone)) {
      alert("Invalid phone number. Please enter a 10-digit phone number.");
      return false;
    }
    if (!dob) {
      alert("Please fill out the Date of Birth field.");
      return false;
    }
    const today = new Date();
    const enteredDate = new Date(dob);
    if (enteredDate > today) {
      alert("Invalid Date of Birth. Date cannot be in the future.");
      return false;
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check basic HTML validation
    if (!e.target.checkValidity()) {
      e.target.reportValidity();
      return;
    }

    // Custom validation
    if (validateForm()) {
      alert("Form submitted successfully!");
      setShowModal(false);
      setFormData({ username: "", email: "", phone: "", dob: "" });
    }
  };

  return (
    <div className="App">
      <h1>User Details Modal</h1>
      <button onClick={() => setShowModal(true)}>Open Form</button>

      {showModal && (
        <div className="modal" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Fill Details</h2>
            <form onSubmit={handleSubmit} noValidate>
              <label>Username:</label>
              <input
                id="username"
                type="text"
                value={formData.username}
                onChange={handleChange}
                required
              />

              <label>Email Address:</label>
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
              />

                <label>Phone Number:</label>
              <input
                id="phone"
                value={formData.phone}
                onChange={handleChange}
              />

              <label>Date of Birth:</label>
              <input
                type="date"
                id="dob"
                value={formData.dob}
                onChange={handleChange}
              />

              <button type="submit" className="submit-button">
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
