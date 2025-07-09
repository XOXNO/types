export interface EventInvitationDataSearchResult {
  id: string;
  claimedBy: string;
  eventId: string;
  status: string;
  createdAt: number;
  claimedAt: number;
  email: string;
  name: string;
  isClaimed: boolean;
  isUsed: boolean;
}
