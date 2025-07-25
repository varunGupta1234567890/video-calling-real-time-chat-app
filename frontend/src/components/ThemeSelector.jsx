// import { PaletteIcon } from "lucide-react";
// import { useThemeStore } from "../store/useThemeStore";
// import { THEMES } from "../constants";
// import { useState } from "react";

// const ThemeSelector = () => {
//   const { theme, setTheme } = useThemeStore();
//   const [showDropdown, setShowDropdown] = useState(false);

//   return (
//     <div className="position-relative">
//       {/* DROPDOWN TRIGGER */}
//       <button
//         className="btn btn-light btn-sm rounded-circle"
//         onClick={() => setShowDropdown((prev) => !prev)}
//       >
//         <PaletteIcon size={18} />
//       </button>

//       {/* DROPDOWN CONTENT */}
//       {showDropdown && (
//         <div
//           className="dropdown-menu show p-2 shadow position-absolute end-0 mt-2 border rounded"
//           style={{ width: "240px", maxHeight: "320px", overflowY: "auto", backgroundColor: "#f8f9fa", zIndex: 1050 }}
//         >
//           {THEMES.map((themeOption) => (
//             <button
//               key={themeOption.name}
//               className={`w-100 btn btn-sm d-flex align-items-center justify-content-between mb-2 ${
//                 theme === themeOption.name ? "btn-primary text-white" : "btn-outline-secondary"
//               }`}
//               onClick={() => {
//                 setTheme(themeOption.name);
//                 setShowDropdown(false);
//               }}
//             >
//               <div className="d-flex align-items-center gap-2">
//                 <PaletteIcon size={16} />
//                 <span className="small">{themeOption.label}</span>
//               </div>
//               <div className="d-flex gap-1 ms-2">
//                 {themeOption.colors.map((color, i) => (
//                   <span
//                     key={i}
//                     className="rounded-circle"
//                     style={{
//                       width: "10px",
//                       height: "10px",
//                       backgroundColor: color,
//                     }}
//                   ></span>
//                 ))}
//               </div>
//             </button>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default ThemeSelector;



import { PaletteIcon } from "lucide-react";
import { useThemeStore } from "../store/useThemeStore";
import { THEMES } from "../constants";
import { useState } from "react";

const ThemeSelector = () => {
  const { theme, setTheme } = useThemeStore();
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div className="position-relative " >
      {/* DROPDOWN TRIGGER */}
      <button
        className="btn btn-outline-secondary btn-sm rounded-circle btn btn-light rounded-circle p-2"
        onClick={() => setShowDropdown((prev) => !prev)}
        title="Switch Theme"
      >
        <PaletteIcon size={18} />
      </button>

      {/* DROPDOWN MENU */}
      {showDropdown && (
        <div
          className="dropdown-menu show p-2 shadow position-absolute end-0 mt-2 border rounded"
          style={{
            width: "240px",
            maxHeight: "320px",
            overflowY: "auto",
            backgroundColor: "var(--bs-body-bg)",
            zIndex: 1050,
          }}
        >
          {THEMES.map((themeOption) => (
            <button
              key={themeOption.name}
              className={`w-100 btn btn-sm d-flex align-items-center justify-content-between mb-2 ${
                theme === themeOption.name ? "btn-primary text-white" : "btn-outline-secondary"
              }`}
              onClick={() => {
                setTheme(themeOption.name);
                setShowDropdown(false);
              }}
            >
              <div className="d-flex align-items-center gap-2">
                <PaletteIcon size={16} />
                <span className="small">{themeOption.label}</span>
              </div>
              <div className="d-flex gap-1 ms-2">
                {themeOption.colors.map((color, i) => (
                  <span
                    key={i}
                    className="rounded-circle"
                    style={{
                      width: "10px",
                      height: "10px",
                      backgroundColor: color,
                    }}
                  ></span>
                ))}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ThemeSelector;

