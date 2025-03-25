/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = "#0a7ea4";
const tintColorDark = "#fff";

export const Colors = {
  light: {
    text: "#11181C",
    background: "rgba(222,222,222,0.2)",
    tint: tintColorLight,
    icon: "#687076",
    tabIconDefault: "#687076",
    tabIconSelected: tintColorLight,
    inputBackground: "rgba(255, 255, 255, 0.79)",
    inputBorder: "rgba(87, 91, 88, 0.79)",
  },
  dark: {
    text: "#ECEDEE",
    background: "rgba(4, 25, 12, 0.72)",
    tint: tintColorDark,
    icon: "#9BA1A6",
    tabIconDefault: "#9BA1A6",
    tabIconSelected: tintColorDark,
    inputBackground: "rgba(85, 100, 90, 0.79)",
    inputBorder: "rgba(84, 85, 84, 0.79)",
  },
};
