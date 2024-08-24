import { AddNewCommentSchema } from '../types/addNewComment';
import { addNewCommentActions, addNewCommentReducer } from './addNewCommentSlice';

describe('addNewCommentSlice', () => {
    test('set text', () => {
        const state: DeepPartial<AddNewCommentSchema> = {
            text: '',
        };
        expect(addNewCommentReducer(state as AddNewCommentSchema, addNewCommentActions.setText('hello')))
            .toEqual({ text: 'hello' });
    });
});
