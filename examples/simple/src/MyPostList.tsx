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
                <code>{storeKey}.perPage</code> {perPage}
            </button>
        </div>
    );
};

export const MyPostList1 = () => <MyPostList storeKey="list1" />;
export const MyPostList2 = () => <MyPostList storeKey="list2" />;

export const MyPostLists = ({ disableSync }) => {
    const { perPage: perPage1, setPerPage: setPerPage1 } = useListController({
        resource: 'posts',
        storeKey: 'list1',
        disableSyncWithLocation: disableSync,
    });
    const { perPage: perPage2, setPerPage: setPerPage2 } = useListController({
        resource: 'posts',
        storeKey: 'list2',
        disableSyncWithLocation: disableSync,
    });

    return (
        <div>
            <h2>disableSync: {disableSync ? 'true' : 'false'}</h2>
            <h1>This is the key: "list1"</h1>
            <button onClick={() => setPerPage1(perPage1 + 1)}>
                <code>list1.perPage</code> {perPage1}
            </button>
            <br />
            <h1>This is the key: "list2"</h1>
            <button onClick={() => setPerPage2(perPage2 + 1)}>
                <code>list2.perPage</code> {perPage2}
            </button>
        </div>
    );
};
