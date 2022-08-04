import * as React from 'react';
import { Fragment, memo } from 'react';
import BookIcon from '@mui/icons-material/Book';
import { styled } from '@mui/material/styles';
import {
    BulkDeleteButton,
    BulkDeleteWithConfirmButton,
    BulkDeleteWithUndoButton,
    Datagrid,
    DeleteButton,
    DeleteWithConfirmButton,
    DeleteWithUndoButton,
    List,
    SearchInput,
    TextField,
    useRefresh,
} from 'react-admin'; // eslint-disable-line import/no-unresolved

export const PostIcon = BookIcon;

const postFilter = [<SearchInput source="q" alwaysOn />];

const StyledDatagrid = styled(Datagrid)(({ theme }) => ({
    '& .title': {
        maxWidth: '20em',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
    },
    '& .hiddenOnSmallScreens': {
        [theme.breakpoints.down('lg')]: {
            display: 'none',
        },
    },
    '& .column-tags': {
        minWidth: '9em',
    },
    '& .publishedAt': { fontStyle: 'italic' },
}));

const PostListBulkActions = memo(({ children, ...props }) => {
    const refresh = useRefresh();
    return (
        <Fragment>
            <BulkDeleteButton
                {...props}
                label="Bulk Delete Button"
                mutationMode="undoable"
                mutationOptions={{
                    onSuccess: () => {
                        console.log('success BulkDeleteButton[undoable]');
                        refresh();
                    },
                    meta: { test: 'BulkDeleteButton_meta' },
                }}
            />
            <BulkDeleteWithConfirmButton
                {...props}
                label="Bulk Delete With ConfirmButton"
                mutationMode="pessimistic"
                mutationOptions={{
                    onSuccess: () => {
                        console.log('success BulkDeleteWithConfirmButton');
                        refresh();
                    },
                    meta: { test: 'BulkDeleteWithConfirmButton_meta' },
                }}
            />
            <BulkDeleteWithUndoButton
                {...props}
                label="Bulk Delete With Undo Button"
                mutationOptions={{
                    onSuccess: () => {
                        console.log('success BulkDeleteWithUndoButton');
                        refresh();
                    },
                    meta: { test: 'BulkDeleteWithUndoButton_meta' },
                }}
            />
        </Fragment>
    );
});

const rowClick = (id, resource, record) => {
    if (record.commentable) {
        return 'edit';
    }

    return 'show';
};

const PostPanel = ({ id, record, resource }) => (
    <div dangerouslySetInnerHTML={{ __html: record.body }} />
);

const PostList = () => {
    const refresh = useRefresh();
    return (
        <List
            filters={postFilter}
            sort={{ field: 'published_at', order: 'DESC' }}
        >
            <StyledDatagrid
                bulkActionButtons={<PostListBulkActions />}
                rowClick={rowClick}
                expand={PostPanel}
                optimized
            >
                <TextField source="id" />
                <TextField source="title" cellClassName="title" />
                <DeleteButton
                    label="Delete Button"
                    mutationMode="undoable"
                    mutationOptions={{
                        onSuccess: () => {
                            console.log('success DeleteButton[undoable]');
                            refresh();
                        },
                        meta: {
                            test: 'DeleteButton_meta',
                        },
                    }}
                />
                <DeleteWithConfirmButton
                    label="Delete With Confirm Button"
                    mutationMode="undoable"
                    mutationOptions={{
                        onSuccess: () => {
                            console.log('success DeleteWithConfirmButton');
                            refresh();
                        },
                        meta: {
                            test: 'DeleteWithConfirmButton_meta',
                        },
                    }}
                />
                <DeleteWithUndoButton
                    label="Delete With Undo Button"
                    mutationOptions={{
                        onSuccess: () => {
                            console.log('success DeleteWithUndoButton');
                            refresh();
                        },
                        meta: {
                            test: 'DeleteWithUndoButton_meta',
                        },
                    }}
                />
            </StyledDatagrid>
        </List>
    );
};

export default PostList;
