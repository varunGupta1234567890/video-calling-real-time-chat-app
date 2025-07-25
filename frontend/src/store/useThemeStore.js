// import { create } from "zustand";

// export const useThemeStore = create((set) => ({
//   theme: localStorage.getItem("streamify-theme") || "coffee",
//   setTheme: (theme) => {
//     localStorage.setItem("streamify-theme", theme);
//     set({ theme });
//   },
// }));

// store/useThemeStore.js
// import { create } from "zustand";

// export const useThemeStore = create((set) => ({
//   theme: localStorage.getItem("theme") || "light",
//   setTheme: (newTheme) => {
//     localStorage.setItem("theme", newTheme);
//     set({ theme: newTheme });
//   },
// }));
// useThemeStore.js
import { create } from "zustand";

export const useThemeStore = create((set) => ({
  theme: "harddarkblue", // 🔵 default 
  setTheme: (theme) => set({ theme }),
}));


