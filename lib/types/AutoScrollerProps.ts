import type { Location } from "./Location";

export type AutoScrollerProps = {
  location: Location;
  onAutoScrollStart: (location: Location, speed?: number) => void;
  onAutoScrollStop: () => void;
};
