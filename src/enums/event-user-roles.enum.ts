export enum EventUserRoles {
  EVENT_MANAGER = 'event-manager',
  EVENT_COHOST = 'event-cohost',
  CHECK_IN_MANAGER = 'check-in-manager',
  EVENT_READER = 'event-reader',
}

export enum EventUserRolePermission {
  EVENT_READER_VIEW = 'event-reader-view',
  EVENT_MANAGER_EDIT_PAGE = 'event-manager-edit-page',
  EVENT_MANAGER_CREATE_TICKET = 'event-manager-create-ticket',
  EVENT_MANAGER_EDIT_TICKET = 'event-manager-edit-ticket',
  EVENT_MANAGER_DELETE_TICKET = 'event-manager-delete-ticket',
  EVENT_MANAGER_EDIT_GUEST = 'event-manager-edit-guest',
  EVENT_MANAGER_CREATE_STAGE = 'event-manager-create-stage',
  EVENT_MANAGER_EDIT_STAGE = 'event-manager-edit-stage',
}
