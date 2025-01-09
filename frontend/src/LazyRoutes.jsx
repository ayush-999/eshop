import { lazy } from "react";

export const ProfileInformation = lazy(() =>
  import("./Routes").then((module) => ({ default: module.ProfileInformation }))
);

export const ManageAddresses = lazy(() =>
  import("./Routes").then((module) => ({ default: module.ManageAddresses }))
);

export const ManageWallet = lazy(() =>
  import("./Routes").then((module) => ({ default: module.ManageWallet }))
);

export const MyOrder = lazy(() =>
  import("./Routes").then((module) => ({ default: module.MyOrder }))
);

export const OrderDetailsPage = lazy(() =>
  import("./Routes").then((module) => ({ default: module.OrderDetailsPage }))
);

export const CartPage = lazy(() =>
  import("./Routes").then((module) => ({ default: module.CartPage }))
);
