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
  return (
    <div>
      <p>Icon & Color</p>
      <div className="flex justify-between mb-2">
        {Object.entries(boardIcons).map(([name, Icon]) => (
          <div
            key={name}
            onClick={() => onChange("icon", name)}
            className={`p-2 rounded-md border border-border ${icon === name && "border-text"}`}
          >
            <Icon />
          </div>
        ))}
      </div>
      <div className="flex justify-between">
        {Object.entries(boardColorRamps).map(([name, colors]) => (
          <div
            key={name}
            onClick={() => onChange("iconColor", name)}
            className={`h-10.5 w-10.5 rounded-md border border-border ${iconColor === name && "border-text"}`}
            style={{ backgroundColor: colors.bg }}
          />
        ))}
      </div>
    </div>
  );
}
