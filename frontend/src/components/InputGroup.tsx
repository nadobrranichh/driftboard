export default function InputGroup({
  name,
  type = "text",
}: {
  name: string;
  type?: string;
}) {
  function createLabelText(name: string) {
    return name[0].toUpperCase() + name.slice(1).replaceAll("-", " ");
  }
  return (
    <div>
      <label htmlFor={name} className="text-sm">
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
