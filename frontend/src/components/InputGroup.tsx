const textSizeClasses = {
  sm: "text-sm",
  base: "text-base",
  lg: "text-lg",
  xl: "text-xl",
};

export default function InputGroup({
  name,
  type = "text",
  textSize = "sm",
}: {
  name: string;
  type?: string;
  textSize?: keyof typeof textSizeClasses;
}) {
  function createLabelText(name: string) {
    return name[0].toUpperCase() + name.slice(1).replaceAll("-", " ");
  }
  return (
    <div>
      <label htmlFor={name} className={textSizeClasses[textSize]}>
        {createLabelText(name)}
      </label>
      <input
        type={type}
        name={name}
        id={name}
        className="block bg-text rounded-md text-surface px-2 py-2 w-full"
      />
    </div>
  );
}
