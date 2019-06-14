/* eslint-disable @typescript-eslint/no-explicit-any */
import {model, property} from '@loopback/repository';

/**
 * The model class is generated from OpenAPI schema - Rating
 * Rating
 */
@model({name: 'Rating'})
export class Rating {
  constructor(data?: Partial<Rating>) {
    if (data != null && typeof data === 'object') {
      Object.assign(this, data);
    }
  }

  /**
   *
   */
  @property({required: false})
  ratingId: number;

  /**
   *
   */
  @property({required: true})
  userId: number;

  /**
   *
   */
  @property({required: true})
  placeId: string;

  /**
   *
   */
  @property({required: true})
  visited: boolean;

  /**
   *
   */
  @property({required: true})
  rating: string;
}
