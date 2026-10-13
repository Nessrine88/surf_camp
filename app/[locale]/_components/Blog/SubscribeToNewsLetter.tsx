"use client";

import { ReactEventHandler, useState } from "react";

const SubscribeToNewsLetter = () => {
  const [email, setEmail] = useState("");
  const [hasSignedUp, setHasSignedUp] = useState(false);
  const onChange = (e: any) => {
    setEmail(e.target.value);
  };
  const onSubmit = (e: any) => {
    e.preventDefault();
    console.log("already submitted");
    if (email.length) {
      setHasSignedUp(true);
    }
  };

  return (
    <section className="newsletter">
      {hasSignedUp ? (
        <h4 className="newslzetter__info">
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
      )}
    </section>
  );
};

export default SubscribeToNewsLetter;
