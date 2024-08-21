import { addNewCommentSchema } from '../types/addNewComment';
import { addNewCommentActions, addNewCommentReducer } from './addNewCommentSlice';

describe('addNewCommentSlice', () => {
    test('set text', () => {
        const state: DeepPartial<addNewCommentSchema> = {
            text: '',
        };
        expect(addNewCommentReducer(state as addNewCommentSchema, addNewCommentActions.setText('hello')))
            .toEqual({ text: 'hello' });
    });
});
