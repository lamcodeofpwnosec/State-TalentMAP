import { isArray } from 'lodash';
import * as SystemMessages from './SystemMessages';

const expectedMessages = [
  'NO_ASSIGNMENT_DATE',
  'NO_ASSIGNMENT_POSITION',
  'NO_BID_CYCLE',
  'NO_BIRTHDAY',
  'NO_BUREAU',
  'NO_CREATE_DATE',
  'NO_COLA',
  'NO_DANGER_PAY',
  'NO_DATE',
  'NO_EMAIL',
  'NO_END_DATE',
  'NO_GRADE',
  'NO_LANGUAGES',
  'NO_UPDATE_DATE',
  'NO_ORG',
  'NO_POSITION_DESCRIPTION',
  'NO_POSITION_NUMBER',
  'NO_POSITION_POC',
  'NO_POSITION_TITLE',
  'NO_POSITION_WEB_SITE',
  'NO_POST',
  'NO_POST_DIFFERENTIAL',
  'NO_REST_RELAXATION',
  'NO_SKILL',
  'NO_TOUR_OF_DUTY',
  'NO_USER_LISTED',
  'NO_USER_SKILL_CODE',

  'GENERAL_SAVED_SEARCH_ERROR',

  'DELETE_BID_ITEM_SUCCESS',
  'DELETE_BID_ITEM_ERROR',
  ['ADD_BID_ITEM_SUCCESS'], // array denotes that it is a function
  'ADD_BID_ITEM_ERROR',

  'ACCEPT_BID_SUCCESS',
  'ACCEPT_BID_ERROR',
  'DECLINE_BID_SUCCESS',
  'DECLINE_BID_ERROR',

  'SUBMIT_BID_SUCCESS',
  'SUBMIT_BID_ERROR',
];

describe('SystemMessages', () => {
  it('should have all expected messages defined', () => {
    expectedMessages.forEach((msg) => {
      expect(isArray(msg) ? SystemMessages[msg]() : SystemMessages[msg]).toBeDefined();
    });
  });

  it('should have all expected messages that accept parameters defined', () => {
    const messages = [
      'UPDATED_SAVED_SEARCH_SUCCESS',
      'NEW_SAVED_SEARCH_SUCCESS',
    ];

    messages.forEach((message) => {
      expect(SystemMessages[message]('name')).toBeDefined();
    });
  });

  it('returns a defined value for DELETE_FAVORITE_SUCCESS()', () => {
    expect(SystemMessages.DELETE_FAVORITE_SUCCESS({ title: 'a', position_number: '1' })).toBeDefined();
  });

  it('returns a defined value for ADD_FAVORITE_SUCCESS()', () => {
    expect(SystemMessages.ADD_FAVORITE_SUCCESS({ position_number: '1' })).toBeDefined();
  });

  it('returns a defined value for ADD_FAVORITE_SUCCESS()', () => {
    expect(SystemMessages.GET_NOW_AVAILABLE(3)).toBeDefined();
  });

  it('returns a defined value for ADD_FAVORITE_SUCCESS() when value > 1', () => {
    expect(SystemMessages.GET_POSITIONS_ADDED(3)).toBeDefined();
  });

  it('returns a defined value for ADD_FAVORITE_SUCCESS() when value <= 1', () => {
    expect(SystemMessages.GET_POSITIONS_ADDED(1)).toBeDefined();
  });
});
