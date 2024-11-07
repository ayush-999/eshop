import { lazy } from "react";

export const ProfileInformation = lazy(() =>
  import("./Routes").then((module) => ({ default: module.ProfileInformation }))
);

export const ManageAddresses = lazy(() =>
  import("./Routes").then((module) => ({ default: module.ManageAddresses }))
);
