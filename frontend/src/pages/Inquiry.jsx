import { Link, useParams } from "react-router-dom";
import { useState } from "react";

function Inquiry({ spaces, isLoading, error }) {
  const { spaceId } = useParams();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    visitDate: "",
    teamSize: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");

  if (isLoading) {
    return (
      <main>
        <p>Loading inquiry form...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main>
        <p>{error}</p>
      </main>
    );
  }

  const space = spaces.find((item) => item.id === Number(spaceId));

  if (!space) {
    return (
      <main>
        <h1>Space not found</h1>
        <Link to="/">Return to browse</Link>
      </main>
    );
  }
  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const nextErrors = {};

    if (!formData.name.trim()) {
      nextErrors.name = "Please enter your name.";
    }

    if (!formData.email.includes("@gmail.com")) {
      nextErrors.email = "Please enter a valid email address.";
    }

    if (!formData.visitDate) {
      nextErrors.visitDate = "Please select a visit date.";
    }

    if (Number(formData.teamSize) < 1) {
      nextErrors.teamSize = "Team size must be at least 1.";
    }

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setSubmitError("");

    try {
      const response = await fetch("http://localhost:3000/api/inquiries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          spaceId: Number(spaceId),
          ...formData,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Could not send inquiry.");
      }

      setIsSubmitted(true);
    } catch (requestError) {
      setSubmitError(requestError.message);
    }
  }

if (isSubmitted) {
  return (
    <main className="inquiry-page">
      <div className="confirmation" role="status">
        <h1>Inquiry sent</h1>

        <p>
          Thank you, {formData.name}. Your inquiry about {space.name} has been
          received.
        </p>

        <p>We will contact you at {formData.email}.</p>

        <Link className="primary-link" to={`/spaces/${space.id}`}>
          Return to space details
        </Link>
      </div>
    </main>
  );
}
  return (
    <main className="inquiry-page">
      <Link className="back-link" to={`/spaces/${space.id}`}>
        <span aria-hidden="true">&larr;</span> Back to space details
      </Link>

      <h1>Inquire about {space.name}</h1>
      <p>Complete the form to ask about availability in {space.city}.</p>
      <form className="inquiry-form" onSubmit={handleSubmit} noValidate>
        <div className="form-control">
          <label htmlFor="name">Full name</label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "name-error" : undefined}
          />
          {errors.name && (
            <p id="name-error" className="form-error" role="alert">
              {errors.name}
            </p>
          )}
        </div>

        <div className="form-control">
          <label htmlFor="email">Email address</label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
          />
          {errors.email && (
            <p id="email-error" className="form-error" role="alert">
              {errors.email}
            </p>
          )}
        </div>

        <div className="form-control">
          <label htmlFor="phone">Phone number</label>
          <input
            id="phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>

        <div className="form-control">
          <label htmlFor="visitDate">Preferred visit date</label>
          <input
            id="visitDate"
            name="visitDate"
            type="date"
            value={formData.visitDate}
            onChange={handleChange}
            aria-invalid={Boolean(errors.visitDate)}
            aria-describedby={errors.visitDate ? "visitDate-error" : undefined}
          />
          {errors.visitDate && (
            <p id="visitDate-error" className="form-error" role="alert">
              {errors.visitDate}
            </p>
          )}
        </div>

        <div className="form-control">
          <label htmlFor="teamSize">Team size</label>
          <input
            id="teamSize"
            name="teamSize"
            type="number"
            min="1"
            value={formData.teamSize}
            onChange={handleChange}
            aria-invalid={Boolean(errors.teamSize)}
            aria-describedby={errors.teamSize ? "teamSize-error" : undefined}
          />
          {errors.teamSize && (
            <p id="teamSize-error" className="form-error" role="alert">
              {errors.teamSize}
            </p>
          )}
        </div>

        <div className="form-control">
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
          />
        </div>
        {submitError && (
          <p className="form-error" role="alert">
            {submitError}
          </p>
        )}
        <button type="submit">Send inquiry</button>
      </form>
    </main>
  );
}

export default Inquiry;
