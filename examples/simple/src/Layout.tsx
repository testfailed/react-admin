import * as React from 'react';
import { forwardRef, memo } from 'react';
import { ReactQueryDevtools } from 'react-query/devtools';
import {
    AppBar,
    Layout,
    Logout,
    UserMenu,
    useLocaleState,
    useUserMenu,
    Menu,
} from 'react-admin';
import {
    MenuItem,
    MenuItemProps,
    ListItemIcon,
    CssBaseline,
} from '@mui/material';
import Language from '@mui/icons-material/Language';

const SwitchLanguage = forwardRef<HTMLLIElement, MenuItemProps>(
    (props, ref) => {
        const [locale, setLocale] = useLocaleState();
        const { onClose } = useUserMenu();

        return (
            <MenuItem
                ref={ref}
                {...props}
                sx={{ color: 'text.secondary' }}
                onClick={event => {
                    setLocale(locale === 'en' ? 'fr' : 'en');
                    onClose();
                }}
            >
                <ListItemIcon sx={{ minWidth: 5 }}>
                    <Language />
                </ListItemIcon>
                Switch Language
            </MenuItem>
        );
    }
);

const MyMenu = () => (
    <Menu>
        <Menu.DashboardItem />
        <Menu.Item to="/posts" primaryText="Posts" />
        <Menu.Item to="/mypostlist1" primaryText="MyPostList1" />
        <Menu.Item to="/mypostlist2" primaryText="MyPostList2" />
        <Menu.Item to="/mypostlist+list1" primaryText="MyPostList + list1" />
        <Menu.Item to="/mypostlist+list2" primaryText="MyPostList + list2" />
        <Menu.Item
            to="/mypostlist+list3+unsync"
            primaryText="MyPostList + list3 + unsync"
        />
        <Menu.Item to="/dual+unsync" primaryText="dual unsynch" />
        <Menu.Item to="/dual+sync" primaryText="dual synch" />
    </Menu>
);

const MyUserMenu = () => (
    <UserMenu>
        <SwitchLanguage />
        <Logout />
    </UserMenu>
);

const MyAppBar = memo(props => <AppBar {...props} userMenu={<MyUserMenu />} />);

export default props => (
    <>
        <CssBaseline />
        <Layout {...props} appBar={MyAppBar} menu={MyMenu} />
        <ReactQueryDevtools
            initialIsOpen={false}
            toggleButtonProps={{ style: { width: 20, height: 30 } }}
        />
    </>
);
