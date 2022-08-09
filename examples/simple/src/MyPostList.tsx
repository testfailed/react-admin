import * as React from 'react';
import { useListController } from 'react-admin';

export const MyPostList = ({ storeKey }) => {
    const { perPage, setPerPage } = useListController({
        resource: 'posts',
        storeKey,
    });

    return (
        <div>
            <h1>This is the key: "{storeKey}"</h1>
            <button onClick={() => setPerPage(perPage + 1)}>
                Inc perPage - {perPage}
            </button>
        </div>
    );
};
