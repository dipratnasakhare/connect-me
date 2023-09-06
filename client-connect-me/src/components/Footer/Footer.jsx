import React from "react";
import footercss from "./style/Footer.module.css";
export const Footer = () => {
  const footer = [
    "Connect me",
    "About",
    "Blog",
    "Helps",
    "Api",
    "Privacy",
    "Terms",
    "Contact",
  ];

  return (
    <footer>
      <div className={footercss.mainDiv}>
        <div>
          {footer.map((ele) => (
            <p>{ele}</p>
          ))}
        </div>
      </div>{" "}
      <div className={footercss.copyRight}>
        <div>
          <p> © 2023 Connect Me from Dipratna</p>
        </div>{" "}
      </div>
    </footer>
  );
};
