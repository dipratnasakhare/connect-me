import React from "react";
import {
  CloseButton,
  Image,
  Box,
  Flex,
  Icon,
  useColorModeValue,
  Text,
  Drawer,
  DrawerContent,
  useDisclosure,
} from "@chakra-ui/react";

import {
  FiHome,
  FiTrendingUp,
  FiCompass,
  FiStar,
  FiSettings,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const LinkItems = [
  { name: "Home", icon: FiHome, route: "/" },
  { name: "Trending", icon: FiTrendingUp, route: "/trending" },
  { name: "Explore", icon: FiCompass, route: "/explore" },
  { name: "Favourites", icon: FiStar, route: "/favourites" },
  { name: "Settings", icon: FiSettings, route: "/settings" },
];

const logoSrc = "https://cdn-icons-png.flaticon.com/512/5075/5075642.png";

const SidebarContent = ({ onClose, ...rest }) => {
  return (
    <Box
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={["100%", "30", "30", "60"]}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">

        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          <Image w={"14"} src={logoSrc} />
        </Text>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem key={link.name} icon={link.icon} route={link.route}>
          <Text display={["flex", "none", "none", "flex"]}>{link.name}</Text>
        </NavItem>
      ))}
    </Box>
  );
};

const NavItem = ({ icon, children, route, ...rest }) => {
  const navigate = useNavigate();

  return (
    <Box
      onClick={() => navigate(route)}
      as="a"
      style={{ textDecoration: "none" }}
      _focus={{ boxShadow: "none" }}
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: "cyan.400",
          color: "white",
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: "white",
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Box>
  );
};



export const Navbar = () => {
  const { isOpen, onClose } = useDisclosure();


  return (
    <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: "none", md: "block", lg: "block" }}
      />
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>

    </Box>
  );
};
