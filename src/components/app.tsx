import React from "react";
import { RouterProvider } from "react-router-dom";
import { App, SnackbarProvider } from "zmp-ui";
import {
  ModalLoaderProvider,
  TemplateProvider,
  ThemeProvider,
} from "@/provider";
import { templateStorage } from "@/utils/template";
import { app } from "@/../app-phongkham-config.json";
import { useAtomValue } from "jotai";
import { authState } from "@/state";
import { OpenAPI } from "@/client/api";
import { router } from "@/router";

const MyApp = () => {
  const { accessToken } = useAtomValue(authState);
  OpenAPI.TOKEN = accessToken;
  localStorage.setItem(templateStorage, app.template);
  return (
    <App>
      <SnackbarProvider>
        <ModalLoaderProvider>
          <TemplateProvider>
            <ThemeProvider>
              <RouterProvider router={router} />
            </ThemeProvider>
          </TemplateProvider>
        </ModalLoaderProvider>
      </SnackbarProvider>
    </App>
  );
};
export default MyApp;
