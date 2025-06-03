import { OpenAPI, type LoginResponseDto } from "../api";
import { refreshToken } from "./auth";
import { jwtDecode } from "jwt-decode";
interface DecodedToken {
  exp: number;
}

let isRefreshing = false;

const checkRefreshToken = async (
  _request: RequestInit,
  setAuth?: (auth: LoginResponseDto | null) => void
) => {
  const token = OpenAPI.TOKEN;
  if (token && !isRefreshing) {
    const decodedToken = jwtDecode<DecodedToken>(token as string);
    const currentTime = Date.now() / 1000;
    if (decodedToken.exp < currentTime) {
      isRefreshing = true;
      OpenAPI.TOKEN = OpenAPI.REFRESH_TOKEN;
      const newToken = await refreshToken();
      isRefreshing = false;
      if (newToken) {
        OpenAPI.TOKEN = newToken.token;
        OpenAPI.REFRESH_TOKEN = newToken.refreshToken;
      } else {
        OpenAPI.TOKEN = undefined;
        OpenAPI.REFRESH_TOKEN = undefined;
        setAuth?.(null);
      }
    }
  }
};

const requestwithtokens = (
  setAuth?: (auth: LoginResponseDto | null) => void
) => {
  OpenAPI.interceptors.request.use((request) => {
    checkRefreshToken(request, setAuth);
    return request;
  });
};

export default requestwithtokens;
