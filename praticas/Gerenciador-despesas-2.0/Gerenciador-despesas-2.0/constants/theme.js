export const lightTheme = {
  background: "#f5f7fb",
  surface: "#ffffff",
  surfaceAlt: "#eef4ff",
  text: "#1f2937",
  muted: "#6b7280",
  border: "#dfe7f3",
  primary: "#2f6fed",
  primarySoft: "#dfeaff",
  alert: "#ff4d4f",
  chip: "#eeeeee",
  chipText: "#333333",
  shadow: "rgba(15, 23, 42, 0.12)",
};

export const darkTheme = {
  background: "#101827",
  surface: "#172033",
  surfaceAlt: "#1d2a41",
  text: "#f3f4f6",
  muted: "#b9c2d1",
  border: "#2f405d",
  primary: "#6ea8fe",
  primarySoft: "#27395d",
  alert: "#ff7a7a",
  chip: "#24314a",
  chipText: "#edf4ff",
  shadow: "rgba(0, 0, 0, 0.38)",
};

export function getTheme(isDark) {
  return isDark ? darkTheme : lightTheme;
}
