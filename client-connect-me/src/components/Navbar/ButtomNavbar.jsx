import  React , { useState } from "react";
import { Icon } from "@chakra-ui/react";

import {
  FiHome,
  FiTrendingUp,
  FiCompass,
  FiStar,
  FiSettings,
} from "react-icons/fi";
import {
  BottomNavigation,
  BottomNavigationItem,
} from "chakra-ui-bottom-navigation";
import { useNavigate } from "react-router-dom";

export const ButtomNavbar = () => {

    const [index, setIndex] = useState("value");

    const navigate = useNavigate()
    const LinkItems = [
        { name: 'Home', icon: FiHome ,route:"/" },
        { name: 'Trending', icon: FiTrendingUp, route:"/trending" },
        { name: 'Explore', icon: FiCompass , route:"/explore"},
        { name: 'Favourites', icon: FiStar ,route:"/favourites" },
        { name: 'Settings', icon: FiSettings , route:"/settings" },
      ]
//   const logoSrc = "https://cdn-icons-png.flaticon.com/512/5075/5075642.png";
  return (

    <div className="App">
      <BottomNavigation
        colorScheme="cyan"
        variant="float"
        showLabel="if-active"
        color={"black"} 
        onChange={(newIndex) => {
            setIndex(newIndex);
          }}
      >
        {LinkItems.map((ele) => {
          return (
            <BottomNavigationItem   pt="3" pb="2">
              <Icon
              onClick={()=>navigate(ele.route)}
                mr="3"
                fontSize="20"
                _groupHover={{
                  color: "white",
                }}
                as={ele.icon}
              />
           
            </BottomNavigationItem>
          );
        })}
      </BottomNavigation>
    </div>
  );
}

