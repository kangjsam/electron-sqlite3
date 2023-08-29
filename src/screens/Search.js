import React, { useState } from "react";
import { Link } from "react-router-dom";

import {
  Flex,
  VStack,
  Heading,
  Text,
  Input,
  HStack,
  Box,
  Icon,
  Badge,
} from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";

function Search() {
  const [search, setSearch] = useState("");
  const [data, setData] = useState();

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    window.myApi.send("search-query", search);
    setSearch("");
  };

  window.myApi.receive("sql-return-search", (data) => {
    // console.log(`Received data from main process`);
    // console.table(data);
    setData(data);
    window.myApi.removeListeners("sql-return-search");
  });

  return (
    <Flex w="auto" justify="center" p={[0, 10, 10]}>
      <VStack spacing={4}>
        <Heading>Search Movies</Heading>
        <Text>Search Movies with query.</Text>
        <form onSubmit={handleSubmit}>
          <Input
            w="300px"
            type="text"
            value={search}
            onChange={handleSearch}
            placeholder="Input query and press enter."
          ></Input>
        </form>
        {data ? <Text>Total - {data.length}</Text> : <></>}
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

export default Search;