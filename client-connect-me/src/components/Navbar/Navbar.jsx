import React from "react";
import { AiFillHome } from "react-icons/ai";
import { BsSearch } from "react-icons/bs";
import { ImMail2 } from "react-icons/im";

import "./style/Navbar.css";

export const Navbar = () => {
  const logoSrc = "https://cdn-icons-png.flaticon.com/512/5075/5075642.png";
  const size = "30px"

  const navbar = [AiFillHome, BsSearch, ImMail2]
  return (
    <>
      <div>
        <div>
          {" "}
          <img width={size} src={logoSrc} alt="" />
        </div>

      {navbar.map((Logo)=>{
        return(
          <div>
          <Logo size={size}/>
        </div>
        )
      })}
      </div>
      <div className={"mainBody"}>
        <div className={"header"}>
          <img className="logo" src={logoSrc} alt="" />
          <nav>
            <ul>
              <li>
                <a href="#">Home</a>
              </li>
              <li>
                <a href="#">About</a>
              </li>
              <li>
                <a href="#">Services</a>
              </li>
              <li>
                <a href="#">Term</a>
              </li>
              <li>
                <a href="#">Contact</a>
              </li>
            </ul>
          </nav>
          <div className={"clear"}></div>
        </div>
      </div>
    </>
  );
};
