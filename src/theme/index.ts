import { extendTheme } from "native-base";

/**
 * Trong cac component co the dung useTheme
 */

export const colorTheme = {
  primary: {
    50: "#F8FDFE",
    100: "#E3F5FC",
    200: "#CDEDFA",
    300: "#B7E6F8",
    400: "#A1DEF5",
    500: "#8CD7F3",
    600: "#76CFF1",
    700: "#5DA3BE",
    800: "#44778A",
    900: "#2B4B57",
  },
};
const appTheme = extendTheme({ colors: colorTheme });
export type AppThemeType = typeof appTheme;
declare module "native-base" {
  interface ICustomTheme extends AppThemeType {}
}
export default appTheme;
