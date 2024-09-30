import { useContext } from "react"
import {Web3Context} from "../../context/Web3Context"
import { Card, Heading, Text } from "@chakra-ui/react";

const ConnectedAccount = () => {
 const {acctState} = useContext(Web3Context);
 return(
      <Card padding={5}>
          <Heading>
               Connected Account
          </Heading>
          <Text padding={2}>
          {acctState.selectedAccount}
          </Text>
      </Card>
 )
}

export default ConnectedAccount