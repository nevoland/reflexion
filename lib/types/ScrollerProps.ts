import type { Location } from "./Location";

export type ScrollerProps = {
  name: Location;
  onAutoScrollStart: (
    location: Location,
    verticalSpeed?: number,
    horizontalSpeed?: number,
  ) => void;
  onAutoScrollStop: () => void;
};
