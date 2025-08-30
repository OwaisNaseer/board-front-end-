import {
  SettingsIcon,
  SubscriptionIcon,
  ChargeIcon,
  BillingIcon,
} from '../assets/icons';

export const data = {
  stats: [
    {
      name: 'Total Bookings',
      amount: '312',
      percentage: 4.5,
      metrics: 10,
    },
    {
      name: 'New Members',
      amount: '1,245',
      percentage: 3.2,
      metrics: 15,
    },
    {
      name: 'Active Subscriptions',
      amount: '896',
      percentage: -1.8,
      metrics: -5,
    },
    {
      name: 'Engagement Rate',
      amount: '72.4%',
      percentage: 2.7,
      metrics: 8,
    },
    {
      name: 'Total Revenue',
      amount: '$12,345.67',
      percentage: 5.1,
      metrics: 20,
    },
  ],
  quickActions: [
    { name: 'Invoice', link: '#', icon: '#' },
    { name: 'Estimate', link: '#', icon: '#' },
    { name: 'Credit memo', link: '#', icon: '#' },
    { name: 'Client', link: '#', icon: '#' },
    { name: 'Item', link: '#', icon: '#' },
  ],
  accountActions: [
    { name: 'Profile', link: '#', icon: <SettingsIcon active={true} /> },
    { name: 'Subscription', link: '#', icon: <SubscriptionIcon /> },
    { name: 'Billing', link: '#', icon: <BillingIcon /> },
    { name: 'Change Password', link: '#', icon: <ChargeIcon /> },
  ],
  latestInvoices: [
    { title: "Harry's INV-3", amount: '$10,000.00', timeStamp: '3 days ago' },
    { title: "Harry's INV-3", amount: '$10,000.00', timeStamp: '4 days ago' },
    { title: "Harry's INV-3", amount: '$10,000.00', timeStamp: '5 days ago' },
  ],
  invoicesOverview: [
    { name: 'Draft', color: 'bg-neutral-1300', value: 12 },
    { name: 'Sent', color: 'bg-blue-900', value: 1 },
    { name: 'Open', color: 'bg-teal-300', value: 2 },
    { name: 'Paid', color: 'bg-green-500', value: 2 },
  ],
  estimatesOverview: [
    { name: 'Draft', color: 'bg-neutral-1300', value: 12 },
    { name: 'Sent', color: 'bg-blue-900', value: 1 },
    { name: 'Open', color: 'bg-teal-300', value: 2 },
    { name: 'Approved', color: 'bg-neutral-500', value: 5 },
    { name: 'Rejected', color: 'bg-red-500', value: 2 },
  ],
  overviews: [
    { title: 'Estimates', value: 4 },
    { title: 'Invoices', value: 10 },
    { title: 'Clients', value: 12 },
  ],
};
