export const AuditionsColumnData = [
  { name: 'title', title: 'Project' },
  { name: 'description', title: 'Description' },
  { name: 'purpose', title: 'Purpose' },
  { name: 'status', title: 'Status' },
  { name: 'action', title: 'Action' },
];

export const AuditionsRowData = [
  {
    id: 1,
    auditionId: 'AUD005',
    title: 'solo drama 2',
    description: 'demo description for solo drama 2',
    role_info: 'Actor will act solo 2',
    deadline: '2025-07-24T13:41:00',
    status: 'open',
    attachments: 'file',
  },
  {
    id: 2,
    auditionId: 'AUD0054',
    title: 'solo drama 3',
    description: 'demo description for solo drama 2',
    role_info: 'Actor will act solo 2',
    deadline: '2025-07-24T13:41:00',
    status: 'open',
    attachments: 'file',
  },
];

export const AuditionsColumnExtensionsData = [
  { columnName: 'auditionId', width: 100 },
  { columnName: 'title', width: 150 },
  { columnName: 'role_info', width: 120 },
  { columnName: 'status', width: 100 },
  { columnName: 'deadline', width: 120 },
];

export const ActorBookingColumnData = [
  { name: 'audition', title: 'Audition' },
  { name: 'location', title: 'Location' },
  { name: 'type', title: 'Type' },
  { name: 'status', title: 'Status' },
  { name: 'action', title: 'Action' },
];
export const ActorBookingEditColumnData = [
  { name: 'location', title: 'Location' },
  { name: 'type', title: 'Type' },
];

export const ActorBookingRowData = [
  {
    audition: 1,
    location: 'London',
    type: 'self_tape',
    status: 'scheduled',
  },
  {
    audition: 2,
    location: 'England',
    type: 'rehearsal',
    status: 'completed',
  },
  {
    audition: 3,
    location: 'Birmingham',
    type: 'canceled',
    status: 'canceled',
  },
];

export const ActorBookingColumnExtensionsData = [
  { columnName: 'audition', width: 100 },
  { columnName: 'location', width: 120 },
  { columnName: 'type', width: 120 },
  { columnName: 'status', width: 120 },
];

export const StockDataColumnData = [
  { name: 'id', title: '' },
  { name: 'time', title: 'Time' },
  { name: 'symbol', title: 'Symbol' },
  { name: 'open', title: 'Open' },
  { name: 'high', title: 'High' },
  { name: 'low', title: 'Low' },
  { name: 'close', title: 'Close' },
  { name: 'change', title: 'CHANGE' },
  { name: 'ma7', title: 'MA(7)' },
  { name: 'ma25', title: 'MA(25)' },
  { name: 'ma99', title: 'MA(99)' },
  { name: 'ma7-ma25', title: 'MA(7)-MA(25)' },
  { name: 'ma7-ma99', title: 'MA(7)-MA(99)' },
  { name: 'ma25-ma99', title: 'MA(25)-MA(99)' },
];
export const StockDataColumnExtensionsData = [
  { columnName: 'id', width: 80 },
  { columnName: 'time', width: 220 },
  { columnName: 'symbol', width: 150 },
  { columnName: 'open', width: 100 },
  { columnName: 'high', width: 100 },
  { columnName: 'low', width: 100 },
  { columnName: 'close', width: 100 },
  { columnName: 'change', width: 100 },
  { columnName: 'ma7', width: 100 },
  { columnName: 'ma25', width: 100 },
  { columnName: 'ma99', width: 100 },
  { columnName: 'ma7-ma25', width: 100 },
  { columnName: 'ma7-ma99', width: 100 },
  { columnName: 'ma25-ma99', width: 120 },
];
