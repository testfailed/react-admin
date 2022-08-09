import * as React from 'react';
import { useListController } from 'react-admin';

export const MyPostList = ({
    storeKey,
    disableSyncWithLocation = false,
}: {
    storeKey: string;
    disableSyncWithLocation?: boolean;
}) => {
    const { perPage, setPerPage } = useListController({
        resource: 'posts',
        disableSyncWithLocation,
        storeKey,
    });
    return (
        <div>
            <h2>List "{storeKey}"</h2>
            <button onClick={() => setPerPage(perPage + 1)}>
                <code>{storeKey}.perPage</code> {perPage}
            </button>
        </div>
    );
};

export const MyPostList1 = () => <MyPostList storeKey="list1" />;
export const MyPostList2 = () => <MyPostList storeKey="list2" />;

export const MyPostLists = ({ disableSync }) => {
    return (
        <div>
            <h2>disableSync: {disableSync ? 'true' : 'false'}</h2>
            <MyPostList
                storeKey="list1"
                disableSyncWithLocation={disableSync}
            />
            <MyPostList
                storeKey="list2"
                disableSyncWithLocation={disableSync}
            />
        </div>
    );
};
