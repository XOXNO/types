export interface EventGuestDataSearchResult {
  id: string;
  wallet: string;
  eventId: string;
  status: string;
  createdAt: number;
  registration: {
    email: string;
    name: string;
    phone: string;
  };
}
