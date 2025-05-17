import React, { createContext, useContext, useEffect, useState } from "react";
import { TemplateType } from "@/types";
import { templateStorage } from "@/utils/template";
import { app } from "@/../app-phongkham-config.json";

interface TemplateContextProps {
  currentTemplate?: TemplateType | null;

  setTemplate: (template: TemplateType) => void;
}

const TemplateContext = createContext<TemplateContextProps>({
  currentTemplate: null,
  setTemplate: () => {},
});

const TemplateProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentTemplate, setCurrentTemplate] = useState<TemplateType | null>();

  useEffect(() => {
    const saved = localStorage.getItem(templateStorage) as TemplateType | null;
    if (saved) {
      setCurrentTemplate(saved);
    } else {
      // Nếu không có thì lưu mặc định vào localStorage
      localStorage.setItem(templateStorage, app.template);
    }
  }, []);

  const setTemplate = (template: TemplateType) => {
    setCurrentTemplate(template);
    localStorage.setItem(templateStorage, template);
  };

  return (
    <TemplateContext.Provider value={{ currentTemplate, setTemplate }}>
      {children}
    </TemplateContext.Provider>
  );
};

export const useTemplate = () => useContext(TemplateContext);
export default TemplateProvider;
