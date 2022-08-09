import React, { useState } from 'react';
import { Admin, Resource, CustomRoutes, defaultTheme } from 'react-admin';
import { render } from 'react-dom';
import { Route } from 'react-router-dom';

import green from '@mui/material/colors/green';
import yellow from '@mui/material/colors/yellow';
import orange from '@mui/material/colors/orange';
import purple from '@mui/material/colors/purple';

import authProvider from './authProvider';
import {
    MyPostList,
    MyPostList1,
    MyPostList2,
    MyPostLists,
} from './MyPostList';
import dataProvider from './dataProvider';
import i18nProvider from './i18nProvider';
import Layout from './Layout';
import posts from './posts';

const App = () => {
    const [condition, setCondition] = useState(false);
    const theme = !condition
        ? {
              ...defaultTheme,
              palette: {
                  primary: green,
                  secondary: orange,
                  background: {
                      paper: '#ff6699',
                      default: '#66ff33',
                  },
              },
          }
        : {
              ...defaultTheme,
              palette: {
                  primary: yellow,
                  secondary: green,
                  background: {
                      paper: '#ff6699',
                      default: '#6633ff',
                  },
              },
          };

    React.useEffect(() => {
        setInterval(() => {
            setCondition(v => !v);
        }, 40000);
    }, []);

    return (
        <React.StrictMode>
            <Admin
                authProvider={authProvider}
                dataProvider={dataProvider}
                i18nProvider={i18nProvider}
                title="Example Admin"
                layout={Layout}
                theme={theme}
            >
                <Resource name="posts" {...posts} />
                <CustomRoutes>
                    <Route path="/mypostlist1" element={<MyPostList1 />} />
                </CustomRoutes>
                <CustomRoutes>
                    <Route path="/mypostlist2" element={<MyPostList2 />} />
                </CustomRoutes>
                <CustomRoutes>
                    <Route
                        path="/mypostlist+list1"
                        element={<MyPostList storeKey="list1" />}
                    />
                </CustomRoutes>
                <CustomRoutes>
                    <Route
                        path="/mypostlist+list2"
                        element={<MyPostList storeKey="list2" />}
                    />
                </CustomRoutes>
                <CustomRoutes>
                    <Route
                        path="/mypostlist+list3+unsync"
                        element={
                            <MyPostList
                                storeKey="list3"
                                disableSyncWithLocation={true}
                            />
                        }
                    />
                </CustomRoutes>
                <CustomRoutes>
                    <Route
                        path="/dual+unsync"
                        element={<MyPostLists disableSync={true} />}
                    />
                </CustomRoutes>
                <CustomRoutes>
                    <Route
                        path="/dual+sync"
                        element={<MyPostLists disableSync={false} />}
                    />
                </CustomRoutes>
            </Admin>
        </React.StrictMode>
    );
};

render(<App />, document.getElementById('root'));
