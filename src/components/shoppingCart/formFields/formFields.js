import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";

export const FormFields = (props) => {
  const [email, setEmail] = useState("");
  const [lname, setLname] = useState("");
  const [fname, setFname] = useState("");

  const fillNames = async () => {
    if (Cookies.get("token")) {
      await props.verifyUser().then((response) => {
        setEmail(response.data.user.email);
        setFname(
          response.data.user.fname.replace(/\b\w/g, (l) => l.toUpperCase())
        );
        setLname(
          response.data.user.lname.replace(/\b\w/g, (l) => l.toUpperCase())
        );
      });
    }
  };

  useEffect(() => {
    fillNames();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <input
        type="text"
        name="First Name"
        value={fname}
        className={props.styles}
        readOnly
      />
      <input
        type="text"
        name="Last Name"
        value={lname}
        className={props.styles}
        readOnly
      />
      <input
        type="text"
        name="Email"
        value={email}
        className={props.styles}
        readOnly
      />
    </>
  );
};
