import { Container, Stack } from "@mui/material";
import React from "react";
import styled from "@emotion/styled";

export default function Logo({ width = 200, height = 200 }) {
  return (
    <Stack
      sx={{
        justifyContent: "center",
        alignItems: "center",
        mb: 2,
      }}
    >
      <Image src={`https://picsum.photos/${width}/${height}`} alt="logo" />
    </Stack>
  );
}

const Image = styled.img`
  object-fit: cover;
  border-radius: 50%;
  border: 1px solid #ccc;
  background-color: #fff;
  box-shadow: 0 0 0 1px #fff;
  transition: all 0.3s ease-in-out;
  cursor: pointer;
`;
