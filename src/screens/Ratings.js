import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import {
  Flex,
  VStack,
  Heading,
  Text,
  HStack,
  Icon,
  Badge,
  Box,
} from "@chakra-ui/react";

import { CheckIcon } from "@chakra-ui/icons";

function Ratings() {
  const [data, setData] = useState();

  useEffect(() => {
    window.myApi.send(
      "ratings-query",
      "select idMovie, c00, c01, c08, c20, rating from movie_view order by rating desc limit 30"
    );
  }, []);

  window.myApi.receive("sql-return-ratings", (data) => {
    // console.log(`Received data from main process`);
    // console.table(data);
    setData(data);
    window.myApi.removeListeners("sql-return-ratings");
  });

  return (
    <Flex w="auto" justify="center" p={[0, 10, 10]}>
      <VStack>
        <Heading>Ratings</Heading>
        <Text>Total : {data && data.length}</Text>
        {data &&
          data.map((i) => (
            <HStack key={i.idMovie} align={"top"} p={2}>
              <Box color={"green.400"} px={2}>
                <Icon as={CheckIcon} />
              </Box>
              <HStack align={"start"}>
                <Link to={`/details/${i.idMovie}`}>
                  <Text fontWeight={600}>{i.c00}</Text>
                </Link>
                <Badge>{i.rating}</Badge>
              </HStack>
            </HStack>
          ))}
      </VStack>
    </Flex>
  );
}

export default Ratings;