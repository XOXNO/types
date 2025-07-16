export enum EventGuestStatus {
  PENDING = 'pending', //payment in progress or pending
  PENDING_APPROVAL = 'pendingApproval', // not approved by admin yet
  INVITE_CLAIMED = 'inviteClaimed', //invitation claimed, but no ticket yet
  PARTIALLY_ACTIVE = 'partiallyActive', //has valid ticket, but questionnaire not filled
  REJECTED = 'rejected', //rejected by admin
  ACTIVE = 'active', // valid ticket & questionnaire filled, ready for scanning his ticket
  COMPLETED = 'completed', // all tickets checked in
  PARTIALLY_COMPLETED = 'partiallyCompleted', // he has checked in some tickets but not all
}
