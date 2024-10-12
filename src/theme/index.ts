import { extendTheme } from "native-base";

/**
 * Trong cac component co the dung useTheme
 */

export const colorTheme = {
  primary: {
    50: "#E3F2FD", // Light Blue
    100: "#BBDEFB", // Light Blue
    200: "#90CAF9", // Light Blue
    300: "#64B5F6", // Blue
    400: "#42A5F5", // Blue
    500: "#2196F3", // Blue
    600: "#1E88E5", // Blue
    700: "#1976D2", // Darker Blue
    800: "#1565C0", // Dark Blue
    900: "#0D47A1", // Deep Blue
  },
};
const appTheme = extendTheme({ colors: colorTheme });
export type AppThemeType = typeof appTheme;
declare module "native-base" {
  interface ICustomTheme extends AppThemeType {}
}
export default appTheme;
