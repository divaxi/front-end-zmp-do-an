import appConfig from "../../app-config.json";

export const templateStorage = "currentTemplate";

export function getConfig<T>(getter: (config: typeof appConfig) => T) {
  return getter(appConfig);
}
