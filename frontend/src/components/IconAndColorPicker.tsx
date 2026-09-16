import { useState } from "react";
import { boardColorRamps, boardIcons } from "../lists/boardIconsList";
import { motion } from "framer-motion";
import { fade } from "../motion/variants";
import { hoverScale, tapScale } from "../motion/value-presets";

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
    <motion.div variants={fade({ withStagger: true })}>
      <p>Icon & Color</p>
      <motion.div variants={fade()} className="flex justify-between mb-2">
        {Object.entries(boardIcons).map(([name, Icon]) => (
          <motion.div
            key={name}
            whileHover={hoverScale}
            whileTap={tapScale}
            onMouseEnter={() => updateHovering("icon", name)}
            onMouseLeave={() => updateHovering("icon", "")}
            onClick={() => onChange("icon", name)}
            className={`p-2 rounded-md border border-border cursor-pointer ${icon === name && "border-text"} ${hovering.icon === name && "bg-border"}`}
          >
            <Icon />
          </motion.div>
        ))}
      </motion.div>
      <motion.div variants={fade()} className="flex justify-between">
        {Object.entries(boardColorRamps).map(([name, colors]) => (
          <motion.div
            key={name}
            whileHover={hoverScale}
            whileTap={tapScale}
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
      </motion.div>
    </motion.div>
  );
}
