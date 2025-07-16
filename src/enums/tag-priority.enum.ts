export enum TagPriority {
  CRITICAL = 1, // Never remove (user identity, preferences)
  HIGH = 2, // Recent/active events, main creators
  MEDIUM = 3, // Older events, less active creators
  LOW = 4, // Very old events, inactive creators
}

export enum TagCategory {
  USER_IDENTITY = 'user_identity', // user:, addr:, chain:
  PREFERENCES = 'preferences', // pref:
  ACTIVE_EVENT = 'active_event', // event: (current/upcoming)
  PAST_EVENT = 'past_event', // event: (completed)
  ACTIVE_CREATOR = 'active_creator', // creator: (recent activity)
  INACTIVE_CREATOR = 'inactive_creator', // creator: (old)
  EVENT_STATUS = 'event_status', // status:
}
