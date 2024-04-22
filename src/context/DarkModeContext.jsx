import { createContext, useContext, useEffect } from "react";
import { useLocalStorageState } from "../hooks/useLocalStorageState";

const DarkModeContext = createContext();

//مكون عبارة عن مزود مخصص يتلقى الأبناء حيث نخزن الحالة
function DarkModeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useLocalStorageState(
    window.matchMedia("(prefers-color-scheme:dark)").matches,
    "isDarkMode"
  );

  function toggleDarkMode() {
    setIsDarkMode((isDark) => !isDark);
  }

  useEffect(
    function () {
      if (isDarkMode) {
        document.documentElement.classList.add("dark-mode");
        document.documentElement.classList.remove("light-mode");
      } else {
        document.documentElement.classList.add("light-mode");
        document.documentElement.classList.remove("dark-mode");
      }
    },
    [isDarkMode]
  );

  return (
    /*تمرير القيمة كغرض*/
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
}

//نقوم بانشاء خطاف مخصص ليستثمر السياق  المخصص الذي تم إنشاؤه
function useDarkMode() {
  //  تخزين ذلك في السياق العام باستخدام خطاف السياق
  const context = useContext(DarkModeContext);
  if (context === undefined)
    throw new Error("DarkModeContext was used outside the DarkModeProvider");
  return context;
}

export { DarkModeProvider, useDarkMode };
