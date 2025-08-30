// Local imports
import { ComingSoon, Layout } from '../components/Shared';
import { DashboardIcon, InsightsIcon } from '../assets/icons';

import { MarketData } from '../panels/UserPanel/MarketData';

// SIDEMENU ROUTES
export const sideMenuRoutes = (role) => {
  return [
    {
      path: '/dashboard',
      text: 'Dashboard',
      icon: <DashboardIcon height={19} width={19} />,
      element: (
        <Layout>
          <ComingSoon />
        </Layout>
      ),
    },
    {
      path: '/market-data',
      text: 'Market Data',
      icon: <InsightsIcon height={19} width={19} />,
      element: (
        <Layout>
          <MarketData />
        </Layout>
      ),
    },
  ];
};
