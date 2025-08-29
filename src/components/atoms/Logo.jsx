import { useEffect, useState } from "react";

export default function Logo({ alt, sources, className, storeDomainLoading, ...rest }) {

  const [current, setCurrent] = useState(sources[0]);

  // if the prop URLs change, restart at the first source
  useEffect(() => {
    setCurrent(sources[0])
  }, [sources]);

  // on error, advance to the next URL in the list
  const handleError = () => {
    const idx = sources.indexOf(current);
    if (idx < sources.length - 1 && !storeDomainLoading) {
      setCurrent(sources[idx + 1]);
    }
  };

  return (
    <img
      src={current}
      alt={alt}
      onError={handleError}
      className={className}
      {...rest}
    />
  );
}
