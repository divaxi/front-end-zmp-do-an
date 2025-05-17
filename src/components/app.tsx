import React from "react";
import { RouterProvider } from "react-router-dom";
import { App, SnackbarProvider } from "zmp-ui";
import {
  ModalLoaderProvider,
  TemplateProvider,
  ThemeProvider,
} from "@/provider";
import { useRouterTemplate } from "@/hooks";
import LoadingTemplate from "./loading-template";
import { templateStorage } from "@/utils/template";
import { app } from "@/../app-phongkham-config.json";
import { useAtomValue } from "jotai";
import { authState } from "@/state";
import { OpenAPI } from "@/client/api";

const MyApp = () => {
  const { accessToken } = useAtomValue(authState);
  OpenAPI.TOKEN = accessToken;
  localStorage.setItem(templateStorage, app.template);
  const router = useRouterTemplate();
  if (!router) {
    return <LoadingTemplate />;
  }
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
