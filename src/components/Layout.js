import React from "react";
import { Container } from "@chakra-ui/react";
import Header from "./Header";

export default function LayoutPage(props) {
  return (
    <Container maxW="container.lg">
      <Header />
      {props.children}
    </Container>
  );
}