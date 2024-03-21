import React, { createContext, useEffect, useContext, useState } from "react";
import { lightColors, darkColors } from "./colors";

import { useColorScheme } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const ThemeContext = createContext({
  dark: false,
  colors: lightColors,
  setScheme: () => {},
});

export const ThemeProvier = (props) => {
  const colorScheme = useColorScheme();
  const [isDark, setIsDark] = useState(colorScheme == "dark");
  useEffect(() => {
    // setIsDark(colorScheme == "dark");
    AsyncStorage.getItem("theme")
      .then((theme) => {
        setIsDark(theme === "dark");
      })
      .catch((error) => console.error(error));
  }, [colorScheme]);

  const onSchemeChange = (scheme) => {
    // Store the theme preference in AsyncStorage
    AsyncStorage.setItem("theme", scheme)
      .then(() => {
        setIsDark(scheme === "dark");
      })
      .catch((error) => console.error(error));
  };

  const defaultTheme = {
    dark: isDark,
    colors: isDark ? darkColors : lightColors,
    setScheme: onSchemeChange,
  };
  return (
    <ThemeContext.Provider value={defaultTheme}>
      {props.children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
