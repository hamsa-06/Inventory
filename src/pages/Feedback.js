import React, { useState } from "react";
import Sidebar from '../components/Sidebar';  // Import the Sidebar component

const FeedbackSupport = () => {
  const [feedback, setFeedback] = useState({
    type: "",
    message: "",
    email: "",
  });

  const [faqActive, setFaqActive] = useState(null);

  const faqs = [
    {
      question: "How do I add a new inventory item?",
      answer: "Go to the Inventory Management page and click on 'Add New Stock'. Fill in the required details and save.",
    },
    {
      question: "How do I set up expiry alerts?",
      answer: "Expiry alerts are enabled automatically. You can manage alerts in the Dashboard settings.",
    },
    {
      question: "Can I generate a report?",
      answer: "Yes, reports can be generated from the Dashboard by selecting 'Generate Report'.",
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Feedback submitted successfully!");
    setFeedback({ type: "", message: "", email: "" });
  };

  return (
    <div style={styles.pageContainer}>
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div style={styles.mainContent}>
        {/* Header Section */}
        <header style={styles.header}>
          <h1 style={styles.title}>Feedback & Support</h1>
          <p style={styles.subtitle}>We're here to help! Browse FAQs or leave us a message.</p>
        </header>

        {/* FAQ Section */}
        <section style={styles.faqSection}>
          <h2 style={styles.sectionTitle}>FAQs</h2>
          {faqs.map((faq, index) => (
            <div
              key={index}
              style={styles.faqItem}
              onClick={() => setFaqActive(index === faqActive ? null : index)}
            >
              <div style={styles.faqQuestion}>
                <span style={styles.faqIcon}>?</span>
                {faq.question}
              </div>
              {faqActive === index && <div style={styles.faqAnswer}>{faq.answer}</div>}
            </div>
          ))}
        </section>

        {/* Feedback Form Section */}
        <section style={styles.formSection}>
          <h2 style={styles.sectionTitle}>Submit Your Feedback</h2>
          <form onSubmit={handleSubmit} style={styles.form}>
            <label style={styles.label}>Feedback Type</label>
            <select
              style={styles.input}
              value={feedback.type}
              onChange={(e) => setFeedback({ ...feedback, type: e.target.value })}
              required
            >
              <option value="" disabled>
                Select Type
              </option>
              <option value="Bug Report">Bug Report</option>
              <option value="Feature Request">Feature Request</option>
              <option value="General Feedback">General Feedback</option>
            </select>

            <label style={styles.label}>Message</label>
            <textarea
              style={styles.textarea}
              value={feedback.message}
              onChange={(e) => setFeedback({ ...feedback, message: e.target.value })}
              required
            ></textarea>

            <label style={styles.label}>Email (Optional)</label>
            <input
              type="email"
              style={styles.input}
              value={feedback.email}
              onChange={(e) => setFeedback({ ...feedback, email: e.target.value })}
            />

            <button type="submit" style={styles.button}>
              Submit Feedback
            </button>
          </form>
        </section>

        {/* Contact Section */}
        <footer style={styles.footer}>
          <h2 style={styles.sectionTitle}>Contact Support</h2>
          <p>Email: <a href="mailto:support@inventorymanagement.com" style={styles.link}>support@inventorymanagement.com</a></p>
          <p>Phone: <a href="tel:+919000009345" style={styles.link}>+91 90000 09345</a></p>
        </footer>
      </div>
    </div>
  );
};

const styles = {
  pageContainer: {
    display: 'flex', // Flexbox layout for the sidebar and main content
    height: '100vh',
  },
  mainContent: {
    flex: 1,
    padding: '20px',
    background: '#fff',
    marginLeft: '0', // Removed sidebar spacing
    overflowY: 'auto',
    boxSizing: 'border-box', // Ensures consistent padding inside the content
  },
  header: {
    textAlign: "center",
    marginBottom: "40px",
  },
  title: {
    fontSize: "2.5rem",
    marginBottom: "10px",
    fontWeight: "bold",
    color: "#333",
  },
  subtitle: {
    fontSize: "1.2rem",
    color: "#555",
  },
  faqSection: {
    marginBottom: "40px",
  },
  sectionTitle: {
    fontSize: "1.7rem",
    marginBottom: "20px",
    color: "#333",
  },
  faqItem: {
    marginBottom: "15px",
    cursor: "pointer",
    padding: "10px",
    borderRadius: "5px",
    background: "#f0f4f7",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
    transition: "0.3s ease",
  },
  faqQuestion: {
    fontWeight: "bold",
    color: "#333",
  },
  faqAnswer: {
    marginTop: "10px",
    paddingLeft: "20px",
    color: "#555",
    background: "#fff",
    borderLeft: "3px solid #007BFF",
    padding: "10px 0",
  },
  faqIcon: {
    marginRight: "10px",
    color: "#007BFF",
    fontSize: "1.5rem",
  },
  formSection: {
    marginBottom: "40px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  label: {
    marginBottom: "5px",
    fontWeight: "bold",
  },
  input: {
    marginBottom: "15px",
    padding: "12px",
    fontSize: "1rem",
    borderRadius: "5px",
    border: "1px solid #ccc",
    outline: "none",
    transition: "0.3s ease",
  },
  textarea: {
    marginBottom: "15px",
    padding: "12px",
    fontSize: "1rem",
    borderRadius: "5px",
    border: "1px solid #ccc",
    outline: "none",
    minHeight: "100px",
    transition: "0.3s ease",
  },
  button: {
    padding: "12px 20px",
    fontSize: "1.1rem",
    borderRadius: "5px",
    border: "none",
    backgroundColor: "#007BFF",
    color: "#fff",
    cursor: "pointer",
    transition: "0.3s ease",
  },
  footer: {
    textAlign: "center",
    marginTop: "40px",
    borderTop: "1px solid #ddd",
    paddingTop: "20px",
  },
  link: {
    color: "#007BFF",
    textDecoration: "none",
  },
};

export default FeedbackSupport;
