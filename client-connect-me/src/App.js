import { Navbar } from "./components/Navbar/Navbar";
import { RouteBox } from "./routes/RouteBox";
import { ButtomNavbar } from "./components/Navbar/ButtomNavbar";
import { SearchNavbar } from "./components/Navbar/SearchNavbar";

import { Flex, Box } from "@chakra-ui/react";
import { useParams } from "react-router-dom";

function App() {
  return (
    <Box className="App">
      <Box border={'1px solid red'}>
        <SearchNavbar />
      </Box>

      <Flex display={["grid"]}>
        <Box display={["none", "none", "none", "flex"]} h="80px">
          <Navbar />
        </Box>

        <Box w={["90%", "80%", "70%", "60%"]} m="auto" mt={90}>
          <RouteBox />
        </Box>

        <Box display={["grid", "grid", "grid", "none"]}>
          <ButtomNavbar />
        </Box>
      </Flex>
    </Box>
  );
}

export default App;
