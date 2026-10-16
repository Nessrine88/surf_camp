"use client";

import axios from "axios";
import { ReactEventHandler, useState } from "react";

const SubscribeToNewsLetter = () => {
  const [email, setEmail] = useState("");
  const [hasSignedUp, setHasSignedUp] = useState(false);
  const [showError, setShowError] = useState(false);
  const onChange = (e: any) => {
    setEmail(e.target.value);
  };
  const onSubmit = async(e: any) => {
    e.preventDefault();
    try {
    if (email.length) {
      setHasSignedUp(true);
      await axios.post(`${process.env.NEXT_PUBLIC_STRAPI_URL}api/newsletter-signups`, {
        data: {
          email
        }
      })
      setHasSignedUp(true)
    }  
    } catch (error) {
      setShowError(true)
    }
  };

  return (
    <section className="newsletter">
      {
        showError ? ( <h4 className="newsletter__thanks">
          Could not signing up for our newsletter
        </h4>) :  hasSignedUp ? 
  
      (
        <h4 className="newsletter__thanks">
          Thankyou for signing up for our newsletter
        </h4>
      ) : (
        <>
          <div className="newsletter__info">
            <h4>Subscribe to our newsletter</h4>
            <p className="copy">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Asperiores delectus, doloremque consequatur pariatur magni,
              debitis, assumenda cupiditate nam culpa similique quia sint
              maiores architecto hic esse voluptatibus minima nisi
              exercitationem.
            </p>
          </div>
          <form className="form newsletter__form" onSubmit={onSubmit}>
            <input
              type="email"
              className="newsletter__email input"
              placeholder="Enter Your E-mail address"
              value={email}
              onChange={onChange}
            />
            <button
              type="submit"
              className="newsletter__subscribe btn btn--medium btn--turquoise"
            >
              SUBSCRIBE
            </button>
          </form>
        </>
      )    }
    </section>
  );
};

export default SubscribeToNewsLetter;
