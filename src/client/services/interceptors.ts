import {
  AuthControllerLoginV1Response,
  OpenAPI,
  StaffsControllerFindByIdV1Response,
} from "../api";
import { refreshToken } from "./auth";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  exp: number;
}

interface AuthState {
  auth: AuthControllerLoginV1Response | undefined;
  staff: StaffsControllerFindByIdV1Response | undefined;
}

let isRefreshing = false;

const checkRefreshToken = async (
  _request: RequestInit,
  setAuth?: (state: AuthState | undefined) => void
) => {
  const token = OpenAPI.TOKEN;
  if (token && !isRefreshing) {
    const decodedToken = jwtDecode<DecodedToken>(token as string);
    const currentTime = Date.now() / 1000;
    if (decodedToken.exp < currentTime) {
      try {
        isRefreshing = true;
        OpenAPI.TOKEN = OpenAPI.REFRESH_TOKEN;
        const newToken = await refreshToken();
        isRefreshing = false;
        OpenAPI.TOKEN = newToken.token;
        OpenAPI.REFRESH_TOKEN = newToken.refreshToken;
      } catch {
        OpenAPI.TOKEN = undefined;
        OpenAPI.REFRESH_TOKEN = undefined;
        setAuth?.(undefined);
      }
    }
  }
};

const requestwithtokens = (
  setAuth?: (state: AuthState | undefined) => void
) => {
  OpenAPI.interceptors.request.use((request) => {
    checkRefreshToken(request, setAuth);
    return request;
  });
};

export default requestwithtokens;
