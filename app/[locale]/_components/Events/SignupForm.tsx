"use client";
import { useState } from "react";
import TextInput from "../TextInput";
import axios from "axios";
import { allDataFilledIn } from "@/utils/validations.utils";
import { generateSignupPayload } from "@/utils/stapi-utils";

const SignupForm = ({ headline, infoText, buttonLabel, price, eventId=null }: any) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const [hasSignedUp, setHasSignedUp] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const onChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const BASE_URL = (
  process.env.NEXT_PUBLIC_STRAPI_URL ||
  "https://surf-camp-strapi.onrender.com/"
).replace(/\/+$/, "");
  const onSubmit = async (e: any) => {
    e.preventDefault();
    const payload = generateSignupPayload(formData,eventId)
    setShowError(false);

if(allDataFilledIn(formData)){
    try {
      if (formData.email.length) {
        await axios.post(
          `${BASE_URL}/api/participants`,
          payload
        );
        setHasSignedUp(true);
      }
    } catch (error: any) {
      setShowError(true);
      setErrorMessage(
        error.response?.data?.error?.message ||
          "Could not sign up. Please try again later."
      );
    }
} else{ setErrorMessage("Please fill out all fields")}
  };

  return (
    <section className="signup-form">
      {showError ? (
        <h4 className="signup-form__error">{errorMessage}</h4>
      ) : hasSignedUp ? (
        <h4 className="signup-form__thanks">Thank you for signing up. We will get in touch soon!</h4>
      ) : (
        <>
          <div className="signup-form__info">
            <h3 className="signup-form__headline">{headline}</h3>
           <h5> {infoText}</h5>
          </div>
          <form className="signup-form__form" onSubmit={onSubmit}>
            <div className="signup-form__name-container">
              <TextInput
                inputName="firstName"
                value={formData.firstName}
                onChange={onChange}
                label="First Name"
              />
              <TextInput
                inputName="lastName"
                value={formData.lastName}
                onChange={onChange}
                label="Last Name"
              />
            </div>
            <TextInput
              inputName="email"
              value={formData.email}
              onChange={onChange}
              label="Email"
            />
            <TextInput
              inputName="phone"
              value={formData.phone}
              onChange={onChange}
              label="Phone Number"
            />
            <button type="submit" className="btn btn--beige btn--medium">
              {buttonLabel || "Stay in touch"}
            </button>
            { price && (
                <div className="signup-form__pricing">
                        <h3>Pricing</h3>
                        <p className="copy">Single Room : <span className="bold">{price.singlePrice}$ per person </span></p>
                        <p className="copy">Shared Room : <span className="bold">{price.sharedPrice}$ per person </span></p>
                
                </div>
                
            )}
          </form>
        </>
      )}
    </section>
  );
};

export default SignupForm;