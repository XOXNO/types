import { ApiProperty } from '@nestjs/swagger';

export class EventCountByLocation {
  @ApiProperty({
    description: 'City name.',
    example: 'New York',
    type: String,
  })
  city!: string;

  @ApiProperty({
    description: 'Country name.',
    example: 'United States',
    type: String,
  })
  country!: string;

  @ApiProperty({
    description: 'Number of events in this location.',
    example: 100,
    type: 'integer',
  })
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
    type: 'integer',
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
    type: 'integer',
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
