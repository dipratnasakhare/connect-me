import { HStack, Switch, useColorMode } from "@chakra-ui/react";

export const Darkmode = () => {

  const { toggleColorMode } = useColorMode();

  return (
    <HStack>
      <Switch onChange={toggleColorMode} colorScheme="teal" size="lg" />
    </HStack>
  );
};
