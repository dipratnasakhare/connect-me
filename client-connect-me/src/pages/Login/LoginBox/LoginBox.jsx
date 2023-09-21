import {
  Flex,
  Box,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Button,
  Text,
  useToast,
  Center,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

import { auth, provider } from "../FireBase/FireBase";
import { signInWithPopup } from "firebase/auth";

export const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const toast = useToast();
  const [serverLoading, SetServerLoading] = useState(false);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const HandelGoogleLogin = async () => {
    try {
      signInWithPopup(auth, provider).then((ele) => {
        setEmail(ele.user.email);
        HandelLogin();
      });
    } catch (err) {
      console.log(err);
      SetServerLoading(false);
      toast({
        position: "top",
        title: "Something is wrong please try later",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }

    // HandelLogin();
    // });
  };

  const HandelLogin = async () => {
    let data = { email };
    const url = `${process.env.REACT_APP_SERVER_CONNECT_ME}/user/google`
    try {
      const res = await axios.post(url, data);

      console.log(res.data);

      // if (res.data.user) {
      // navigate("/");
      // localStorage.setItem("Reach_me", JSON.stringify(res.data));
      // } else {
      //   toast({
      //     position: "top",
      //     description: "User not found",
      //     status: "success",
      //     duration: 2000,
      //     isClosable: true,
      //   });
      // }
    } catch (error) {
      console.log(error);
    }
  };

  const HandelLoginButton = async () => {


    console.log(email, password)


    const data = { email, password };
    try {
      SetServerLoading(true);
      let x = await axios.post(
        `${process.env.REACT_APP_SERVER_CONNECT_ME}/user/login`,
        data
      );

      if (x.data.msg === "User not found") {
        toast({
          position: "top",
          description: x.data.msg,
          status: x.data.status,
          duration: 2000,
          isClosable: true,
        });
        SetServerLoading(false);
        return;
      }
      localStorage.setItem("Reach_me", JSON.stringify(x.data));
      SetServerLoading(false);
      toast({
        position: "top",
        description: x.data.msg,
        status: x.data.status,
        duration: 2000,
        isClosable: true,
      });
      if (x.data.msg !== "Wrong password") {
        navigate("/");
      }
    } catch (err) {
      console.log(err);
      SetServerLoading(false);
      toast({
        position: "top",
        title: "Something is wrong please try later",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <Flex
      // justify={"center"}
      // m="auto"
      // backgroundSize={"cover"}
      // backgroundRepeat={"none"}
      // backgroundImage={
      //   "https://images.pexels.com/photos/7130473/pexels-photo-7130473.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
      // }
      >
        <Stack
          border={"1px solid black"}
          borderRadius="3%"
          spacing={4}
          w={["90%", "80%", "70%", "60%"]}
          m="auto"
          boxShadow={"lg"}
          mt="1rem"
          mb="3rem"
        >
          <Flex p={6} flexDirection="column" gap={5}>
            <Stack>
              <Stack align={"center"}>
                <Text
                  mb="15px"
                  fontSize="2xl"
                  fontFamily="monospace"
                  fontWeight="bold"
                >
                  Login in connect me
                </Text>
              </Stack>
              <Box>
                <Stack>
                  <FormLabel>
                    {" "}
                    <Text>Email address</Text>
                  </FormLabel>
                  <Input
                    type="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <FormLabel>
                    <Text>Password</Text>
                  </FormLabel>
                  <InputGroup>
                    <Input
                      type={showPassword ? "text" : "Password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <InputRightElement h={"full"}>
                      <Button
                        variant={"ghost"}
                        onClick={() =>
                          setShowPassword((showPassword) => !showPassword)
                        }
                      >
                        {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                      </Button>
                    </InputRightElement>
                  </InputGroup>

                  <Box>
                    <Text
                      onClick={() => navigate("/Forgot_Password")}
                      color="blue"
                    >
                      Forgot Password
                    </Text>
                  </Box>

                  <Stack spacing={10} pt={2}>
                    <Button
                      isLoading={serverLoading}
                      loadingText="Submitting"
                      size="lg"
                      bg="cyan.400"
                      _hover="none"
                      color={"white"}
                      onClick={() => HandelLoginButton()}
                    >
                      <Text>Login</Text>
                    </Button>
                  </Stack>

                  <Button
                    w={"full"}
                    variant={"outline"}
                    leftIcon={<FcGoogle />}
                    onClick={HandelGoogleLogin}
                  >
                    <Center>
                      <Text>Sign in with Google</Text>
                    </Center>
                  </Button>
                </Stack>
              </Box>
            </Stack>

            <Flex gap="5">
              <Box alignContent={"center"} display="grid">
                {" "}
                <Text color="gray.500">Create Account </Text>
              </Box>
              <Box>
                <Button
                  _hover="none"
                  onClick={() => navigate("/signup")}
                  colour="blue"
                >
                  <Text>SignUp</Text>
                </Button>
              </Box>
            </Flex>
          </Flex>
        </Stack>
      </Flex>
    </>
  );
};
