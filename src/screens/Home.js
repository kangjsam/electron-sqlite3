import React from "react";
import { Link } from "react-router-dom";

import { Flex, VStack, Heading, Stack, Button } from "@chakra-ui/react";

function Home() {
  return (
    <Flex w="auto" justify="center" p={[0, 10, 10]}>
      <VStack>
        <Heading>Welcome Home!</Heading>
        <Heading>Electon + React + Sqlite3 + Chakra-UI</Heading>
        <Flex h="25vh" align="center" justify="center">
          <Stack direction="row" spacing={10}>
            <Link to="/search">
              <Button colorScheme="facebook">Search</Button>
            </Link>
            <Link to="/latest">
              <Button colorScheme="whatsapp">Latest</Button>
            </Link>
            <Link to="/ratings">
              <Button colorScheme="twitter">Ratings</Button>
            </Link>
          </Stack>
        </Flex>
      </VStack>
    </Flex>
  );
}

export default Home;