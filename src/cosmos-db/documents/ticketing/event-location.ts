import { ApiProperty } from '@nestjs/swagger';

export class EventCountByLocation {
  city!: string;
  country!: string;
  eventCount!: number;
}

export class EventLocationCities {
  @ApiProperty({
    description: 'City',
    example: 'New York',
    type: String,
  })
  city!: string;
  @ApiProperty({
    description: 'Event count',
    example: 100,
    type: Number,
  })
  eventCount!: number;
}

export class EventCountGroupedByCountry {
  @ApiProperty({
    description: 'Country',
    example: 'United States',
    type: String,
  })
  country!: string;
  @ApiProperty({
    description: 'Event count',
    example: 100,
    type: Number,
  })
  eventCount!: number;
  @ApiProperty({
    type: EventLocationCities,
    isArray: true,
    description: 'Cities',
    example: [
      {
        city: 'New York',
        eventCount: 50,
      },
    ],
  })
  cities!: EventLocationCities[];
}
