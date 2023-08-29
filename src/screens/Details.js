import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import {
  Flex,
  VStack,
  Heading,
  Text,
  Image,
  Tag,
  Divider,
} from "@chakra-ui/react";

function Details() {
  const { id } = useParams();
  const [data, setData] = useState();

  useEffect(() => {
    window.myApi.send("id-query", id);
  }, [id]);

  window.myApi.receive("sql-return-id", (data) => {
    // console.log(`Received data from main process`);
    // console.log(data[0]);
    setData(data[0]);
    window.myApi.removeListeners("sql-return-id");
  });

  return (
    <Flex w="auto" justify="center" p={[0, 10, 10]}>
      <VStack spacing={4}>
        <Flex direction={["column", "column", "row"]} spacing={4}>
          <Image
            objectFit={"contain"}
            w={200}
            src={data && data.c08}
            mr={8}
            alt="poster"
          />
          <VStack spacing={4}>
            <Heading>{data && data.c00}</Heading>
            <Divider />
            <Text m={2}>{data && data.c01}</Text>
            <Divider />
            <Tag colorScheme="facebook">Date: {data && data.premiered}</Tag>
            <Tag colorScheme="whatsapp">Rating: {data && data.rating}</Tag>
          </VStack>
        </Flex>
        <Image src={data && data.c20} objectFit={"cover"} alt="fanart" />
      </VStack>
    </Flex>
  );
}

export default Details;