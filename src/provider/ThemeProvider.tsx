import React, { createContext, useContext, useEffect } from "react";
import { useTemplate } from "./TemplateProvider";

/**
 * Props cho ThemeContext
 * @interface ThemeContextProps
 * @property {string} theme - Template theme hiện tại
 */
interface ThemeContextProps {
  theme: string;
}

/**
 * Context để quản lý theme trong ứng dụng
 * @constant ThemeContext
 */
const ThemeContext = createContext<ThemeContextProps>({
  theme: "default",
});

/**
 * Provider component để quản lý theme
 * @component ThemeProvider
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Các component con
 */
const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const { currentTemplate } = useTemplate();

  useEffect(() => {
    // Áp dụng các class CSS khác nhau tùy thuộc vào template
    if (currentTemplate) {
      const root = document.documentElement;

      // Xóa tất cả các class template trước đó
      root.classList.remove("template1", "template2", "template3");

      // Thêm class theo template hiện tại - các CSS variables đã được định nghĩa trong tailwind.scss
      root.classList.add(currentTemplate);
    }
  }, [currentTemplate]);

  return (
    <ThemeContext.Provider value={{ theme: currentTemplate || "default" }}>
      {children}
    </ThemeContext.Provider>
  );
};

/**
 * Hook để sử dụng theme context
 * @returns {ThemeContextProps} Theme context
 */
export const useTheme = () => useContext(ThemeContext);

export default ThemeProvider;
