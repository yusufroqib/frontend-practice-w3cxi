import ConnectedAccount from "./ConnectedAccount";
import ConnectedNetwork from "./ConnectedNetwork";
import {  Container, Flex } from "@chakra-ui/react";
import WalletBalance from "./WalletBalance";

const Navigation = () => {
  return (
    <nav>
      <Container minW={"960px"} py={4}>
        <Flex direction={"row"} justifyContent={"space-between"} gap={16}>
          <ConnectedAccount />
          <ConnectedNetwork />
          <WalletBalance/>
        </Flex>
      </Container>
    </nav>
  );
};

export default Navigation;
