import { Box, Flex, Image, Text, Spacer } from "@chakra-ui/react";
import { AiOutlineHeart } from "react-icons/ai";
import { BsChat, BsBookmark } from "react-icons/bs";
import { FiSend } from "react-icons/fi";

import React from "react";

export const Home = () => {
  const array = new Array(10).fill(0);

  const obj = {
    post_id: "123456789",
    user_id: "user123",
    userName: "happyharuu",
    userProfile:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ",
    username: "example_user",
    caption: "This is an example caption for the post.",
    image_url:
      "https://images.unsplash.com/photo-1612865547334-09cb8cb455da?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
    video_url: "https://www.kapwing.com/videos/64fd8fa2002ca6001ef430de",
    location: {
      name: "Example Location",
      latitude: 123.456,
      longitude: -789.012,
    },
    hashtags: ["tag1", "tag2"], // List of hashtags used in the post
    likes_count: 1000,
    comments_count: 50,
    timestamp: "2023-09-10T12:00:00Z",
  };

  return (
    <Box>
      {array.map((ele) => {
        return (
          <Box
            m="auto"
            w={["99%", "90%", "90%", "50%"]}
            border={"1px solid black"}
            p="10px"
            mb="5rem"
          >
            <Flex gap="2">
              <Box>
                <Image w="70px" borderRadius={"50%"} src={obj.userProfile} />
              </Box>

              <Box>
                <Box>
                  {" "}
                  <Text>
                    {obj.userName} * {obj.timestamp}
                  </Text>
                  <Text>Sabrina Carpenter * Feather (Speed Up)</Text>
                </Box>
              </Box>
            </Flex>

            <Box p="5px" w="90%" m="auto">
              <Image m="auto" h="70vh" src={obj.image_url} />
            </Box>

            <Flex gap="10px">
              <Box>
                <AiOutlineHeart size="30px" />
              </Box>

              <Box>
                <BsChat size="25px" />
              </Box>

              <Box>
                <FiSend size="25px" />
              </Box>

              <Spacer />

              <Box>
                <BsBookmark size="25px" />
              </Box>
            </Flex>

            <Box>
              <Text>{obj.likes_count}</Text>
            </Box>

            <Box>
              <Text>{obj.caption}</Text>
            </Box>
          </Box>
        );
      })}
    </Box>
  );
};
