import expect from 'expect';
import nock from 'nock';
import fetch from 'isomorphic-fetch';
import {arrayOf, normalize} from 'normalizr';
import merge from 'lodash/object/merge';
import * as actions from '../../scripts/actions/users';
import * as types from '../../scripts/constants/ActionTypes';
import {CLIENT_ID} from '../../scripts/constants/Config';
import {songSchema, userSchema} from '../../scripts/constants/Schemas';
import {mockStore} from '../TestUtils';

describe('users actions', () => {
    describe('fetchUserIfNeeded', () => {
        afterEach(() => {
            nock.cleanAll();
        });

        it('should not fetch if user is already loaded', (done) => {
            const expectedActions = [];
            const store = mockStore({entities: {users: {100: {id: 100, description: 'foo'}}}}, []);
            store.dispatch(actions.fetchUserIfNeeded(100));
            done();
        });
    });

    describe('receiveSongs', () => {
        it('should create RECEIVE_SONGS action', () => {
            const entities = {users: {1: {name: 'Ain\'t Nobody'}, 2: {name: 'Firestone'}}}
            const songs = [1, 2];
            const playlist = 'kygo';
            expect(actions.receiveSongs(songs, entities, playlist)).toEqual({type: types.RECEIVE_SONGS, entities, nextUrl: null, songs, playlist});
        });
    });

    describe('receiveUserFollowings', () => {
        it('should create RECEIVE_USER_FOLLOWINGS action', () => {
            const entities = {
                users: {
                    1: {
                        id: 1,
                        followings: [2, 3, 4]
                    },
                    2: {id: 2},
                    3: {id: 3},
                    4: {id: 4}
                }
            };
            expect(actions.receiveUserFollowings(entities)).toEqual({
                type: types.RECEIVE_USER_FOLLOWINGS,
                entities
            });
        });
    });

    describe('receiveUser', () => {
        it('should create RECEIVE_USER action', () => {
            const entities = {users: { 200: {id: 200, username: 'kygo'}}};
            expect(actions.receiveUser(entities)).toEqual({type: types.RECEIVE_USER, entities});
        });
    });

    describe('receiveUserProfiles', () => {
        it('should create RECEIVE_USER_PROFILES action', () => {
            const entities = {users: { 1: { profiles: [{service: 'facebook'}, {service: 'twitter'}]}}};
            expect(actions.receiveUserProfiles(entities)).toEqual({type: types.RECEIVE_USER_PROFILES, entities});
        });
    });

    describe('requestUser', () => {
        it('should create REQUEST_USER action', () => {
            const userId = 200;
            expect(actions.requestUser(userId)).toEqual({type: types.REQUEST_USER, userId});
        });
    });
});
