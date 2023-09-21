import {
  Flex,
  Box,
  Text,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Center,
  useToast,
} from "@chakra-ui/react";
import { auth, provider } from "../FireBase/FireBase";
import { signInWithPopup } from "firebase/auth";

import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import axios from "axios";
import { FcGoogle } from "react-icons/fc";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const toast = useToast();
  const [serverLoading, SetServerLoading] = useState(false);
  const navigate = useNavigate();
  const [data, setdata] = useState({
    email: "",
    password: "",
    userName: "",
    // user: "",
  });

  

  const HandelGoogleSignup = () => {
    try {
      signInWithPopup(auth, provider).then((ele) => {
        let obj = data;
        obj.email = ele["_tokenResponse"].email;
        obj.profilePicture = ele["_tokenResponse"].photoUrl;
        obj.user = {
          firstName: ele["_tokenResponse"].firstName,
          lastName: ele["_tokenResponse"].lastName,
        };
        // obj.email = ele.user.email;

        setdata(obj);
        handleSignup();
      });
    } catch (err) {
      console.log(err);
    }
  };

  const HandelFormChange = (e) => {
    let { name, value } = e.target;
    setdata({
      ...data,
      [name]: value,
    });
  };

  const handleSignup = async () => {
    const url = `${process.env.REACT_APP_SERVER_CONNECT_ME}/user/register`;
    try {
      let x = await axios.post(
        url,
        data
      );

      toast({
        position: "top",
        description: x.data.msg,
        status: x.data.status,
        duration: 2000,
        isClosable: true,
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
  };

  return (
    <>
      <Flex>
        <Stack
          borderRadius="3%"
          spacing={4}
          w={["90%", "80%", "70%", "60%"]}
          m="auto"
          boxShadow={"lg"}
          mt="1rem"
          mb="3rem"
          border={"1px solid black"}
        >
          <Flex p={6} flexDirection="column" gap={5}>
            <Stack>
              <Stack textAlign={"center"}>
                <Text
                  mb="10px"
                  fontSize="2xl"
                  fontFamily="monospace"
                  fontWeight="bold"
                >
                  Sign Up in connect me
                </Text>
              </Stack>
              <Box>
                <Stack>
                  <FormLabel>
                    <Text>User Name</Text>
                  </FormLabel>
                  <Input
                    name="userName"
                    onChange={(e) => HandelFormChange(e)}
                    type="text"
                    value={data.userName}
                  />
                  <FormLabel>
                    <Text>Email address</Text>
                  </FormLabel>
                  <Input
                    name="email"
                    onChange={(e) => HandelFormChange(e)}
                    type="email"
                    value={data.email}
                  />

                  <FormLabel>
                    <Text>Password</Text>
                  </FormLabel>
                  <InputGroup>
                    <Input
                      name="password"
                      onChange={(e) => HandelFormChange(e)}
                      type={showPassword ? "text" : "Password"}
                      value={data.password}
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

                  <Stack spacing={10} pt={2}>
                    <Button
                      isLoading={serverLoading}
                      loadingText="Submitting"
                      size="lg"
                      bg="cyan.400"
                      color={"white"}
                      onClick={handleSignup}
                      _hover="none"
                    >
                      <Text>Sign up</Text>
                    </Button>
                  </Stack>

                  <Button
                    w={"full"}
                    variant={"outline"}
                    leftIcon={<FcGoogle />}
                    onClick={HandelGoogleSignup}
                  >
                    <Center>
                      <Text>Sign in with Google</Text>
                    </Center>
                  </Button>
                </Stack>
              </Box>
            </Stack>

            <Flex gap="5">
              <Text color="gray.500">Have Trouble logging in ? </Text>
              <Text style={{ color: "red" }}>Get help</Text>
            </Flex>
            <Flex gap="5">
              <Box alignContent={"center"} display="grid">
                {" "}
                <Text color="gray.500">Already a User ? </Text>
              </Box>
              <Box>
                <Button onClick={() => navigate("/login")} colour="blue">
                  <Text>Login</Text>
                </Button>
              </Box>
            </Flex>
          </Flex>
        </Stack>
      </Flex>
    </>
  );
};
