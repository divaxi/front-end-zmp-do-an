import { OpenAPI } from "../api";

const inittokens = (_request: RequestInit) => {
  console.log("interceptors request");
};

const requestwithtokens = () => {
  OpenAPI.interceptors.request.use((request) => {
    inittokens(request);
    return request;
  });
};

export default requestwithtokens;
