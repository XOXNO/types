import { TagPriority, TagCategory } from '../../enums/tag-priority.enum';

export interface PrioritizedTag {
  tag: string;
  priority: TagPriority;
  lastUsed?: number; // Unix timestamp
  createdAt: number; // Unix timestamp
  category: TagCategory;
}

export class TagManager {
  private static readonly MAX_TAGS = 58; // Leave 2 tags buffer

  static prioritizeTags(tags: PrioritizedTag[]): PrioritizedTag[] {
    return tags.sort((a, b) => {
      // 1. Priority first (lower number = higher priority)
      if (a.priority !== b.priority) {
        return a.priority - b.priority;
      }

      // 2. Last used (more recent = higher priority)
      const aLastUsed = a.lastUsed || a.createdAt;
      const bLastUsed = b.lastUsed || b.createdAt;
      return bLastUsed - aLastUsed;
    });
  }

  static selectTagsForDevice(allTags: PrioritizedTag[]): string[] {
    const prioritized = this.prioritizeTags(allTags);
    const selected = prioritized.slice(0, this.MAX_TAGS);
    return selected.map((t) => t.tag);
  }

  static categorizeTags(tags: string[]): PrioritizedTag[] {
    return tags.map((tag) => {
      const now = Math.floor(Date.now() / 1000);

      // Determine category and priority based on tag pattern
      if (
        tag.startsWith('user:') ||
        tag.startsWith('addr:') ||
        tag.startsWith('chain:')
      ) {
        return {
          tag,
          priority: TagPriority.CRITICAL,
          category: TagCategory.USER_IDENTITY,
          createdAt: now,
        };
      }

      if (tag.startsWith('pref:')) {
        return {
          tag,
          priority: TagPriority.CRITICAL,
          category: TagCategory.PREFERENCES,
          createdAt: now,
        };
      }

      if (tag.startsWith('event:')) {
        // TODO: Check if event is active/upcoming vs past
        return {
          tag,
          priority: TagPriority.HIGH, // Assume active for now
          category: TagCategory.ACTIVE_EVENT,
          createdAt: now,
        };
      }

      if (tag.startsWith('creator:')) {
        return {
          tag,
          priority: TagPriority.MEDIUM,
          category: TagCategory.ACTIVE_CREATOR,
          createdAt: now,
        };
      }

      if (tag.startsWith('status:')) {
        return {
          tag,
          priority: TagPriority.LOW, // Status tags are least important
          category: TagCategory.EVENT_STATUS,
          createdAt: now,
        };
      }

      // Default for unknown tag patterns
      return {
        tag,
        priority: TagPriority.MEDIUM,
        category: TagCategory.ACTIVE_EVENT,
        createdAt: now,
      };
    });
  }
}
