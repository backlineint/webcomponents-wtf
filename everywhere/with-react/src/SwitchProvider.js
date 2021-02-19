import { useEffect, useRef } from "react";

import "@generic-components/components/switch.js";

const SwitchProvider = ({ checked, handleToggle, children }) => {
  const switchRef = useRef();

  useEffect(() => {
    switchRef.current.addEventListener("checked-changed", (e) => {
      handleToggle(switchRef.current.__checked);
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  // Can't add handleToggle as a dependency above because it would result in
  // this hook being called multiple times

  return (
    <generic-switch checked={checked} ref={switchRef}>
      {children}
    </generic-switch>
  );
};

export default SwitchProvider;
