import { Footer } from "./components/Footer/Footer";
import { Navbar } from "./components/Navbar/Navbar";
import { RouteBox } from "./routes/RouteBox";
import { ButtomNavbar } from "./components/Navbar/ButtomNavbar";

import { Flex, Box, Text, Image, Icon } from "@chakra-ui/react";




function App() {


  return (
    <div className="App">
      <Flex display={["grid"]}>
        <Box display={["none", "none", "none", "flex"]} h="80px">
          <Navbar />
        </Box>
        <Box >
          <RouteBox />
        </Box>
        
        <Box display={["grid", "grid", "grid", "none"]}>
          <ButtomNavbar />
        </Box>
     
      </Flex>
    </div>
  );
}

export default App;
