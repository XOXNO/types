export enum EventScanStatus {
  ERROR = 'error',
  SUCCESS = 'success',
  SELECT = 'select',
}

export enum EventScanMessage {
  // The main QR type is not supported
  INVALID_QR_TYPE = 'qr-type-invalid',
  // INTERNAL - Check QR validity flow
  VALID_QR = 'qr-valid',
  // QR Data decrypt fails
  INVALID_QR = 'qr-invalid',
  // Offline QR not found into DB
  INVITATION_NOT_FOUND = 'invitation-not-found',
  // Offline QR has been declined or canceled
  INVITATION_NOT_VALID = 'invitation-not-valid',
  // Event ID was not found
  EVENT_NOT_FOUND = 'event-not-found',
  // User not part of the guests
  GUEST_NOT_FOUND = 'guest-not-found',
  // User not part of the guests
  GUEST_VALID = 'guest-valid',
  // The QR code has expired for this guest, scan another one!
  QR_CODE_EXPIRED = 'qr-code-expired',
  // The guest was already scanned
  CHECK_IN_COMPLETED = 'check-in-completed',
  // The guest status is not active or partially_completed!
  GUEST_NOT_ACTIVE = 'guest-not-active',
  // The guest has no more eligible tickets
  NO_TICKETS_AVAILABLE = 'no-tickets-available',
  // The guest has no more eligible tickets
  TICKETS_NOT_VALID = 'tickets-no-valid',
  // User already scanned the ticket
  GUEST_IS_IN = 'guest-already-in',
  // Check in approved - CAN ENTRY THE EVENT
  VALID_CHECK_IN = 'valid-check-in',
  // Ask the gate person to select tickets to check-in
  SELECT_TICKETS = 'select-tickets',
  // INTERNAL - Tickets validated
  TICKETS_VALID = 'tickets-valid',
}
