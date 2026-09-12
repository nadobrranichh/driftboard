import { useEffect, useState } from "react";

export default function useMediaQuery(query: string) {
  const [isMatching, setIsMatching] = useState(
    window.matchMedia(query).matches,
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);

    function handleChange() {
      setIsMatching(mediaQuery.matches);
    }

    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [query]);

  return isMatching;
}
