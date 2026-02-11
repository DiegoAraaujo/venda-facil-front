let onLogout: (() => void) | null = null;

export const registerLogout = (fn: () => void) => {
  onLogout = fn;
};

export const triggerLogout = () => {
  if (onLogout) {
    onLogout();
  }
};
