import React, { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { App, SnackbarProvider } from "zmp-ui";
import {
  ModalLoaderProvider,
  TemplateProvider,
  ThemeProvider,
} from "@/provider";
import { templateStorage } from "@/utils/template";
import { app } from "@/../app-phongkham-config.json";
import { useAtom } from "jotai";
import { authState } from "@/state";
import { OpenAPI } from "@/client/api";
import { router } from "@/router";
import { LoadingSpinner } from "./loading-spinner";
import requestwithtokens from "@/client/services/interceptors";
import { SWRConfig } from "swr";
import { optionsSWR } from "@/utils/swrConfig";

const MyApp = () => {
  const [auth, setAuth] = useAtom(authState);

  useEffect(() => {
    OpenAPI.TOKEN = auth?.auth?.token;
    OpenAPI.REFRESH_TOKEN = auth?.auth?.refreshToken;
    requestwithtokens(setAuth);
  }, [auth, setAuth]);

  localStorage.setItem(templateStorage, app.template);
  return (
    <App>
      <SWRConfig value={optionsSWR}>
        <SnackbarProvider>
          <ModalLoaderProvider>
            <TemplateProvider>
              <ThemeProvider>
                <LoadingSpinner />
                <RouterProvider router={router} />
              </ThemeProvider>
            </TemplateProvider>
          </ModalLoaderProvider>
        </SnackbarProvider>
      </SWRConfig>
    </App>
  );
};
export default MyApp;
