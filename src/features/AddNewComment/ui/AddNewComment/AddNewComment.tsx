import { classNames } from 'shared/lib/classNames/classNames';
import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import Input from 'shared/ui/Input/Input';
import Button, { ButtonTheme } from 'shared/ui/Button/Button';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { addNewCommentActions, addNewCommentReducer } from '../../model/slice/addNewCommentSlice';
import { getAddNewCommentError, getAddNewCommentText } from '../../model/selectors/addNewCommentSelectors';
import cls from './AddNewComment.module.scss';

export interface addNewCommentProps {
    className?: string;
    onSendComment: (text: string) => void
}

const initialReducer: ReducersList = {
    addNewComment: addNewCommentReducer,
};

function AddNewComment(props: addNewCommentProps) {
    const {
        className,
        onSendComment,
    } = props;
    const { t } = useTranslation('article');
    const dispatch = useAppDispatch();
    const commentText = useSelector(getAddNewCommentText);
    const commentError = useSelector(getAddNewCommentError);

    const onChangeCommentText = useCallback((value: string) => {
        dispatch(addNewCommentActions.setText(value));
    }, [dispatch]);

    const onSendHandler = useCallback(() => {
        onSendComment(commentText);
        onChangeCommentText('');
    }, [commentText, onChangeCommentText, onSendComment]);

    return (
        <DynamicModuleLoader reducers={initialReducer}>
            <div className={classNames(cls.AddNewComment, {}, [className])}>
                <Input
                    className={cls.input}
                    value={commentText}
                    onChange={onChangeCommentText}
                    placeholder={t('add_new_comment')}
                />
                <Button
                    onClick={onSendHandler}
                    theme={ButtonTheme.OUTLINE}
                >
                    {t('send')}
                </Button>
            </div>
        </DynamicModuleLoader>

    );
}
export default memo(AddNewComment);
