
import {auth,provider} from "../FireBase/FireBase";
import {signInWithPopup} from "firebase/auth";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUpImageText = [
  {
    img: "https://cdn-icons-png.flaticon.com/512/2504/2504739.png",
    text: "Sign In with Goole",
  },
];

export const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [value, setValue] = useState("")
  const [serverLoading, SetServerLoading] = useState(false);
  const navigate = useNavigate();
  const [data, setdata] = useState({
    email: "",
    password: "",
    userName: "",
    mobileNo: "",
    userType: "Client",
    userId: "",
    profilePicture: "",
    coverPicture: "",
    followers:[],
    followings:[],
  });

  const HandelGoogleSignup = () => {
    signInWithPopup(auth, provider).then((ele) => {
       setValue(ele.user.email)
       let obj = data
        obj.email = ele.user.email
        setdata(obj)
        handleSignup()
    })
  }

  const HandelFormChange = (e) => {
    let { name, value } = e.target;
    setdata({
      ...data,
      [name]: value,
    });
  };

  const handleSignup = async () => {
    try {
      SetServerLoading(true);
      let x = await axios.post(
        `${process.env.REACT_APP_MAIN_SERVER_URL}/user/register`,
        data
      );
      SetServerLoading(false);
     
    } catch (err) {
      console.log(err);
      SetServerLoading(false);
     
    }
  };

  return (
    <>
      <div
        // justify={"center"}
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
              <div >
                <p
                 
                >
                  Sign Up to Style Capsule
                </p>
              </div>
              <div>
                <div>
                  <div>
                    <div>
                      <label>
                        <p>User Name</p>
                      </label>
                      <input
                        name="userName"
                        onChange={(e) => HandelFormChange(e)}
                        type="text"
                        value={data.userName}
                      />
                    </div>
                  </div>
                  <label>
                    <p>Phone Number</p>
                  </label>
                  <input
                    name="mobileNo"
                    onChange={(e) => HandelFormChange(e)}
                    type="number"
                    value={data.mobileNo}
                  />
                  <label>
                    <p>Email address</p>
                  </label>
                  <input
                    name="email"
                    onChange={(e) => HandelFormChange(e)}
                    type="email"
                    value={data.email}
                  />
                  <label>
                    <p>Password</p>
                  </label>
                  <div>
                    <input
                      name="password"
                      onChange={(e) => HandelFormChange(e)}
                      type={showPassword ? "text" : "Password"}
                      value={data.password}
                    />
                    <div h={"full"}>
                      <button
                        variant={"ghost"}
                        onClick={() =>
                          setShowPassword((showPassword) => !showPassword)
                        }
                      >
                        submit
                        {/* {showPassword ? <ViewIcon /> : <ViewOffIcon />} */}
                      </button>
                    </div>
                  </div>

                  <div >
                    <button
                    
                    >
                      <p>Sign up</p>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div>
              {SignUpImageText.map(({ img, text }) => {
                return (
                  <div>
                    <div>
                      {" "}
                      <img m="auto" w="50%" src={img} onClick={HandelGoogleSignup} />
                    </div>
                    <div textAlign={"center"}>
                      <p> {text}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div gap="5">
              <p color="gray.500">Have Trouble logging in ? </p>
              <p style={{ color: "red" }}>Get help</p>
            </div>
            <div gap="5">
              <div alignContent={"center"} display="grid">
                {" "}
                <p color="gray.500">Already a User ? </p>
              </div>
              <div>
                <button onClick={() => navigate("/login")} colour="blue">
                  <p>Login</p>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
