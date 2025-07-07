export enum EventCategory {
  FESTIVAL = 'festival',
  CONFERENCE = 'conference',
  NETWORKING = 'networking',
  MEETUP = 'meetup',
  WEB3 = 'web3',
  ENTERTAINMENT = 'entertainment',
}

export enum FestivalSubCategory {
  MUSIC = 'music',
  ARTS_AND_CULTURE = 'arts-and-culture',
  FOOD_AND_DRINK = 'food-and-drink',
  LIFESTYLE_AND_WELLNESS = 'lifestyle-and-wellness',
  LOCAL_AND_COMMUNITY = 'local-and-community',
}

export enum ConferenceSubCategory {
  TECHNOLOGY_AND_INNOVATION = 'technology-and-innovation',
  BUSINESS_AND_FINANCE = 'business-and-finance',
  HEALTHCARE_AND_SCIENCE = 'healthcare-and-science',
  EDUCATION_AND_LEARNING = 'education-and-learning',
  MARKETING_AND_MEDIA = 'marketing-and-media',
}

export enum NetworkingSubCategory {
  INDUSTRY_SPECIFIC = 'industry-specific',
  CAREER_DEVELOPMENT = 'career-development',
  INVESTOR_AND_STARTUPS = 'investor-and-startups',
  SOCIAL_IMPACT = 'social-impact',
  PERSONAL_DEVELOPMENT = 'personal-development',
}

export enum MeetupSubCategory {
  HOBBIES_AND_INTERESTS = 'hobbies-and-interests',
  PROFESSIONAL_GROUPS = 'professional-groups',
  SOCIAL_GATHERING = 'social-gathering',
  EDUCATION_AND_SKILLS = 'education-and-skills',
  FAMILY_AND_KIDS = 'family-and-kids',
}

export enum Web3SubCategory {
  BLOCKCHAIN_AND_CRYPTOCURRENCY = 'blockchain-and-cryptocurrency',
  METAVERSE_AND_VR = 'metaverse-and-vr',
  DEFI_AND_FINANCE = 'defi-and-finance',
  DAO_AND_GOVERNANCE = 'dao-and-governance',
  WEB3_STARTUPS = 'web3-startups',
}

export enum EntertainmentSubCategory {
  LIVE_MUSIC = 'live-music',
  COMEDY_SHOWS = 'comedy-shows',
  THEATRE_AND_PERFORMANCE = 'theatre-and-performance',
  MOVIES = 'movies',
  NIGHTLIFE_AND_CLUBBING = 'nightlife-and-clubbing',
}

export enum EventSubCategory {
  // Festival subcategories
  MUSIC = 'music',
  ARTS_AND_CULTURE = 'arts-and-culture',
  FOOD_AND_DRINK = 'food-and-drink',
  LIFESTYLE_AND_WELLNESS = 'lifestyle-and-wellness',
  LOCAL_AND_COMMUNITY = 'local-and-community',

  // Conference subcategories
  TECHNOLOGY_AND_INNOVATION = 'technology-and-innovation',
  BUSINESS_AND_FINANCE = 'business-and-finance',
  HEALTHCARE_AND_SCIENCE = 'healthcare-and-science',
  EDUCATION_AND_LEARNING = 'education-and-learning',
  MARKETING_AND_MEDIA = 'marketing-and-media',

  // Networking subcategories
  INDUSTRY_SPECIFIC = 'industry-specific',
  CAREER_DEVELOPMENT = 'career-development',
  INVESTOR_AND_STARTUPS = 'investor-and-startups',
  SOCIAL_IMPACT = 'social-impact',
  PERSONAL_DEVELOPMENT = 'personal-development',

  // Meetup subcategories
  HOBBIES_AND_INTERESTS = 'hobbies-and-interests',
  PROFESSIONAL_GROUPS = 'professional-groups',
  SOCIAL_GATHERING = 'social-gathering',
  EDUCATION_AND_SKILLS = 'education-and-skills',
  FAMILY_AND_KIDS = 'family-and-kids',

  // Web3 subcategories
  BLOCKCHAIN_AND_CRYPTOCURRENCY = 'blockchain-and-cryptocurrency',
  METAVERSE_AND_VR = 'metaverse-and-vr',
  DEFI_AND_FINANCE = 'defi-and-finance',
  DAO_AND_GOVERNANCE = 'dao-and-governance',
  WEB3_STARTUPS = 'web3-startups',

  // Entertainment subcategories
  LIVE_MUSIC = 'live-music',
  COMEDY_SHOWS = 'comedy-shows',
  THEATRE_AND_PERFORMANCE = 'theatre-and-performance',
  MOVIES = 'movies',
  NIGHTLIFE_AND_CLUBBING = 'nightlife-and-clubbing',
}

// Type to link categories with their subcategories
export interface CategorySubcategoryMap {
  [EventCategory.FESTIVAL]: FestivalSubCategory;
  [EventCategory.CONFERENCE]: ConferenceSubCategory;
  [EventCategory.NETWORKING]: NetworkingSubCategory;
  [EventCategory.MEETUP]: MeetupSubCategory;
  [EventCategory.WEB3]: Web3SubCategory;
  [EventCategory.ENTERTAINMENT]: EntertainmentSubCategory;
}
