import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {auth,provider} from "../FireBase/FireBase";
import {signInWithPopup} from "firebase/auth";

import logincss from './Login.module.css'

export const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [serverLoading, SetServerLoading] = useState(false);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const SignInImageText = [
    {
      img: "https://cdn-icons-png.flaticon.com/512/2504/2504739.png",
      text: "Sign In with Goole",
    },
  ];

  const HandelGoogleSignup = () => {
    signInWithPopup(auth, provider).then((ele) => {
      setEmail(ele.user.email)
      HandelLogin()
    })
  }

  const HandelLogin = async () => {
    let data = {email}
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_SERVER_REACH_ME}/user/google`, data
      );
      if(res.data.user){
        navigate("/");
        localStorage.setItem("Reach_me", JSON.stringify(res.data));
      }else{
        // toast({
        //   position: "top",
        //   description: "User not found",
        //   status: "success",
        //   duration: 2000,
        //   isClosable: true,
        // });
      }
    } catch (error) {
      console.log(error);
    }
  }

  const HandelLoginButton = async () => {
    const data = { email, password };
    try {
      SetServerLoading(true);
      let x = await axios.post(
        `${process.env.REACT_APP_MAIN_SERVER_URL}/user/login`,
        data
      );

      if(x.data.msg === "User not found"){
        // toast({
        //   position: "top",
        //   description: x.data.msg,
        //   status: x.data.status,
        //   duration: 2000,
        //   isClosable: true,
        // });
        SetServerLoading(false);
        return
      }
      localStorage.setItem("Reach_me", JSON.stringify(x.data));
      SetServerLoading(false);
      // toast({
      //   position: "top",
      //   description: x.data.msg,
      //   status: x.data.status,
      //   duration: 2000,
      //   isClosable: true,
      // });
      if (x.data.msg !== "Wrong password") {
        navigate("/");
      }
    } catch (err) {
      console.log(err);
      SetServerLoading(false);
      // toast({
      //   position: "top",
      //   title: "Something is wrong please try later",
      //   status: "error",
      //   duration: 2000,
      //   isClosable: true,
      // });
    }
  };

  return (
    <>
      <div
      className={logincss.mainDiv}
        // justify={"logincss"}
        // m="auto"
        // backgroundSize={"cover"}
        // backgroundRepeat={"none"}
        // backgroundImage={
        //   "https://images.pexels.com/photos/7130473/pexels-photo-7130473.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        // }
      >
        <div
        
        >
          <div >
            <div>
              <div>
                <p
                >
                  Login to Reach me
                </p>
              </div>
              <div>
                <div>
                  <label>
                    {" "}
                    <p>Email address</p>
                  </label>
                  <input
                    type="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <label>
                    <p>Password</p>
                  </label>
                    <input
                      type={showPassword ? "text" : "Password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                      <button
                        onClick={() =>
                          setShowPassword((showPassword) => !showPassword)
                        }
                      >
                        b
                        {/* {showPassword ? <ViewIcon /> : <ViewOffIcon />} */}
                      </button>
                  

                  <div>
                    <p
                      onClick={() => navigate("/Forgot_Password")}
                    >
                      Forgot Password
                    </p>
                  </div>

                  <div>
                    <button
                      // isLoading={serverLoading}
                      // loadingText="Submitting"
                      // size="lg"
                      // bg={"blue.500"}
                      // _hover="none"
                      // color={"white"}
                      onClick={() => HandelLoginButton}
                    >
                      <p>Login</p>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div>
              {SignInImageText.map(({ img, text }) => {
                return (
                  <div>
                    <div>
                      {" "}
                      <img  width="50%" src={img} onClick={HandelGoogleSignup} />
                    </div>
                    <div textAlign={"center"}>
                      <p>{text}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div>
              <div>
                {" "}
                <p >Create Account </p>
              </div>
              <div>
                <button
                  onClick={() => navigate("/signup")}
                >
                  <p>SignUp</p>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
