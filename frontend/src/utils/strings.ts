export function isSingular(num: number) {
  return num.toString().endsWith("1") && !num.toString().endsWith("11");
}

export function formatDate(date: Date) {
  const now = new Date();
  return Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "2-digit",
    ...(now.getFullYear() !== date.getFullYear() && { year: "numeric" }),
  }).format(date);
}
