import { ShipConfig } from "./types";

export const initialFleet = {
  small: {
    units: 2,
    symbol: "🟠",
  },
  large: {
    units: 3,
    symbol: "🔵",
  },
};

export const fleetForGridSize: { [size: number]: ShipConfig[] } = {
  4: [
    { type: "small", count: 1, length: 2 },
    { type: "large", count: 1, length: 3 },
  ],
  5: [
    { type: "small", count: 2, length: 2 },
    { type: "large", count: 1, length: 3 },
  ],
  6: [
    { type: "small", count: 2, length: 2 },
    { type: "large", count: 2, length: 3 },
  ],
};
