import { AccountsPage } from "@/pages";
import CampaignsPage from "@/pages/CampaignsPage/CampaignsPage";
import ProfilesPage from "@/pages/ProfilesPage/ProfilesPage";
import { RouteProps } from "react-router-dom";

export enum RoutesNames {
  ACCOUNTS = "accounts",
  PROFILES = "profiles",
  CAMPAINGS = "campaigns",
}

export const routePaths: Record<RoutesNames, string> = {
  [RoutesNames.ACCOUNTS]: "/",
  [RoutesNames.PROFILES]: "/profiles/",
  [RoutesNames.CAMPAINGS]: "/profiles/campaigns/",
};
export type AppRoutesProps = RouteProps;

export const routeConfig: Record<RoutesNames, AppRoutesProps> = {
  [RoutesNames.ACCOUNTS]: {
    path: routePaths.accounts,
    element: <AccountsPage />,
  },
  [RoutesNames.PROFILES]: {
    path: `${routePaths.profiles}:id`,
    element: <ProfilesPage />,
  },
  [RoutesNames.CAMPAINGS]: {
    path: `${routePaths.campaigns}:id`,
    element: <CampaignsPage />,
  },
};
