/* eslint-disable @typescript-eslint/no-explicit-any */
import {operation, param, requestBody} from '@loopback/rest';
import {Rating} from '../models/rating.model';
const path = require('path');
const fs = require('fs');
const lib = path.join(path.dirname(fs.realpathSync(__filename)), '../lib');

const uuidv1 = require('uuid/v1');

// TODO use process.env
const dbUrl = 'http://root:password@192.168.1.3:5984';
let nano = null;
try {
  nano = require('nano')(dbUrl);
} catch (e) {
  const msg = 'db.js: unable to connect to ' + dbUrl + ': reason - ' + e;
  console.log(msg);
  throw new Error(msg);
}
const ratingsDB = nano.db.use('ratings');

/**
 * The controller class is generated from OpenAPI spec with operations tagged
 * by rating
 *
 */
export class RatingController {
  constructor() {}

  /**
   * Return ratings by user ID
   *

   * @param userId User ID of ratings to return
   * @returns successful operation
   */
  @operation('get', '/rating/{userId}')
  async getRating(
    @param({name: 'userId', in: 'path'}) userId: number,
  ): Promise<Rating[]> {
    return new Promise(function(resolve, reject) {
      ratingsDB.view(
        'user-id',
        'user-id-view',
        {key: userId},
        (err: any, body: any) => {
          if (err) {
            reject(err);
          }
          resolve(body.rows);
        },
      );
    });
  }

  /**
   * Create Rating by logged in user.
   *
   * @param _requestBody Created rating object
   */
  @operation('post', '/rating')
  async createRating(@requestBody() _requestBody: Rating): Promise<any> {
    return new Promise(function(resolve, reject) {
      const ratingId = uuidv1();
      _requestBody.ratingId = ratingId;
      ratingsDB.insert(_requestBody, (err: any, body: any) => {
        if (err) {
          reject(err);
        }
        resolve(body);
      });
    });
  }
}
