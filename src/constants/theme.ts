export interface ThemeColorPalette {
  primary: string;
  primaryDeep: string;
  primarySoft: string;
  secondary: string;
  secondaryDeep: string;
  secondarySoft: string;
  accent: string;
  background: string;
  backgroundElement: string;
  text: string;
  textMuted: string;
  border: string;
}

export const Colors: {
  light: ThemeColorPalette;
  dark: ThemeColorPalette;
} = {
  light: {
    primary: "#019b41", // Primary: GR8 & Glovo Golden-Amber (from global.css)
    primaryDeep: "#15e66b",
    primarySoft: "#FDF1D2",
    secondary: "#00A64C", // Secondary: GardaState Store Green (from global.css)
    secondaryDeep: "#007A37",
    secondarySoft: "#EBF8F2",
    accent: "#F5911E", // Accent: Huduma Credit Orange
    background: "#FFFFFF", // NativeTabs backgroundColor
    backgroundElement: "#FDF1D2", // NativeTabs indicatorColor (warm cream active circle)
    text: "#141414", // NativeTabs selected label & icon color
    textMuted: "#687076", // NativeTabs unselected label & icon color
    border: "#F0F1F3",
  },
  dark: {
    primary: "#019b41",
    primaryDeep: "#E2A41B",
    primarySoft: "#3A2E10",
    secondary: "#00C45A",
    secondaryDeep: "#00A64C",
    secondarySoft: "#0F2E1E",
    accent: "#FF9F2E",
    background: "#14171A",
    backgroundElement: "#2A2415",
    text: "#F9FAFB",
    textMuted: "#9CA3AF",
    border: "#262A30",
  },
};
