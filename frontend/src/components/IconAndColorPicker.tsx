import { useState } from "react";
import { boardColorRamps, boardIcons } from "../lists/boardIconsList";

export default function IconAndColorPicker({
  icon,
  iconColor,
  onChange,
}: {
  icon: string;
  iconColor: string;
  onChange: (field: "icon" | "iconColor", value: string) => void;
}) {
  const [hovering, setHovering] = useState({ icon: "", iconColor: "" });
  function updateHovering(field: string, value: string) {
    setHovering((prev) => ({ ...prev, [field]: value }));
  }

  return (
    <div>
      <p>Icon & Color</p>
      <div className="flex justify-between mb-2">
        {Object.entries(boardIcons).map(([name, Icon]) => (
          <div
            key={name}
            onMouseEnter={() => updateHovering("icon", name)}
            onMouseLeave={() => updateHovering("icon", "")}
            onClick={() => onChange("icon", name)}
            className={`p-2 rounded-md border border-border cursor-pointer ${icon === name && "border-text"} ${hovering.icon === name && "bg-border"}`}
          >
            <Icon />
          </div>
        ))}
      </div>
      <div className="flex justify-between">
        {Object.entries(boardColorRamps).map(([name, colors]) => (
          <div
            key={name}
            onMouseEnter={() => updateHovering("iconColor", name)}
            onMouseLeave={() => updateHovering("iconColor", "")}
            onClick={() => onChange("iconColor", name)}
            className={`h-10.5 w-10.5 rounded-md border border-border cursor-pointer ${iconColor === name && "border-text"}`}
            style={{
              backgroundColor:
                hovering.iconColor === name ? colors.fg : colors.bg,
            }}
          />
        ))}
      </div>
    </div>
  );
}
