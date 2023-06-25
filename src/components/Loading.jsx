import { styled } from "@mui/material";

export default function Loading() {
  return (
    <Wrapper>
      <div className="snipper">
        <div className="loader"></div>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled("div")(() => ({
  width: "100%",
  height: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",

  ".snipper": {
    width: 100,
    height: 100,
    position: "relative",
    margin: "100px auto",
  },

  ".loader": {
    width: "100%",
    height: "100%",
    borderRadius: "50%",
    border: "8px solid transparent",
    borderTopColor: "#fff",
    animation: "spin 1s linear infinite",
  },

  "@keyframes spin": {
    to: {
      transform: "rotate(360deg)",
    },
  },

  ".loader:before": {
    content: '""',
    position: "absolute",
    top: 5,
    left: 5,
    right: 5,
    bottom: 5,
    borderRadius: "50%",
    border: "8px solid transparent",
    borderTopColor: "#fff",
    animation: "spin 1s linear infinite",
  },

  ".loader:after": {
    content: '""',
    position: "absolute",
    top: 15,
    left: 15,
    right: 15,
    bottom: 15,
    borderRadius: "50%",
    border: "8px solid transparent",
    borderTopColor: "#fff",
    animation: "spin 1s linear infinite",
  },

  ".loader:nth-child(1)": {
    animationDelay: "-0.45s",
  },

  ".loader:nth-child(2)": {
    animationDelay: "-0.3s",
  },

  ".loader:nth-child(3)": {
    animationDelay: "-0.15s",
  },

  ".loader:nth-child(4)": {
    animationDelay: "0s",
  },

  ".loader:nth-child(5)": {
    animationDelay: "0.15s",
  },

  ".loader:nth-child(6)": {
    animationDelay: "0.3s",
  },

  ".loader:nth-child(7)": {
    animationDelay: "0.45s",
  },
}));
