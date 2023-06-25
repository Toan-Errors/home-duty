import axiosInstance from "./axios";
import jwtDecode from "jwt-decode";

function isValidToken(token) {
  if (!token) return false;

  const decodedToken = jwtDecode(token);
  const currentTime = Date.now() / 1000;

  return decodedToken.exp > currentTime;
}

function handleTokenExpired(exp) {
  let expiredTimer = null;
  window.clearTimeout(expiredTimer);
  const currentTime = Date.now() / 1000;
  const timeLeft = exp * 1000 - currentTime;
  expiredTimer = window.setTimeout(() => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    window.location.reload();
  });
}

function setSession(accessToken) {
  if (accessToken) {
    localStorage.setItem("accessToken", accessToken);
    axiosInstance.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  } else {
    localStorage.removeItem("accessToken");
    delete axiosInstance.defaults.headers.common.Authorization;
  }
}

export { isValidToken, handleTokenExpired, setSession };
