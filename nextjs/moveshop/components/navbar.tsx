import {
    Box,
    Button,
    Divider,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    styled,
    Toolbar
} from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";

const drawerWidth = 240;

export default function Navbar() {
    const BootstrapButton = styled(Button)({
        boxShadow: 'none',
        textTransform: 'none',
        padding: '6px 12px',
        border: '1px solid',
        borderRadius: '100px',
        lineHeight: 1.5,
        borderColor: '#00adb2',
        backgroundColor: 'transparent',
        color: '#00adb2',
        '&:hover': {
            borderColor: '#0062cc',
            boxShadow: 'none',
        },
        '&:active': {
            boxShadow: 'none',
            borderColor: '#005cbf',
        },
        '&:focus': {
            boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
        },
    })


    // api에서 메뉴 받아오기
    const menu = {
        'default': [
            {
                id: 1,
                auth: false,
                text: 'collections',
            },
            {
                id: 2,
                auth: false,
                text: 'minting',
            }
        ],
        'personal': [
            {
                id: 3,
                auth: true,
                text: 'my page',
            }
        ],
    }

    return (
        <>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <Drawer
                    sx={{
                        width: drawerWidth,
                        flexShrink: 0,
                        '& .MuiDrawer-paper': {
                            width: drawerWidth,
                            boxSizing: 'border-box',
                        },
                    }}
                    variant="permanent"
                    anchor="left"
                >
                    <Toolbar>
                        <BootstrapButton variant="contained">Connect wallet</BootstrapButton>
                    </Toolbar>
                    <Divider />
                    <List>
                        {menu.default.map(menu => (
                            <ListItem key={menu.id} disablePadding>
                                <ListItemButton>
                                    <ListItemText primary={menu.text} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                    <Divider />
                    <List>
                        {menu.personal.map( menu => (
                            <ListItem key={menu.id} disablePadding>
                                <ListItemButton>
                                    <ListItemText primary={menu.text} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </Drawer>
            </Box>
        </>
    )
}
