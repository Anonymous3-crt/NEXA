import { createContext, useContext } from 'react';

export const CommandPaletteContext = createContext(null);

export function useCommandPalette() {
  return useContext(CommandPaletteContext);
}
