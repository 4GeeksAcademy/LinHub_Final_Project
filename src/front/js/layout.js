import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import { useTheme, ThemeProvider, createTheme } from '@mui/material/styles';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

import { Home } from "./pages/home";
import { LogIn } from "./pages/logIn";
import { SignUp } from "./pages/signUp";
import { UserCourse } from "./pages/usercourse";
import { Exercise } from "./pages/exercises/exercise";
import { UserProfile } from "./pages/userprofile";
import { UploadFile } from "./pages/UploadFile";
import { Chat } from "./pages/chats";

import injectContext from "./store/appContext";

const ColorModeContext = React.createContext({ toggleColorMode: () => { } });


function MyApp() {
    const theme = useTheme();
    const colorMode = React.useContext(ColorModeContext);
    return (
        <Box
            sx={{
                display: 'flex',
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: 'background.default',
                color: 'text.primary',
                borderRadius: 1,
                p: 3,
            }}
        >
            {theme.palette.mode} mode
            <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
                {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
        </Box>
    );
}

export function ToggleColorMode() {
    const [mode, setMode] = React.useState('light');
    const colorMode = React.useMemo(
        () => ({
            toggleColorMode: () => {
                setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
            },
        }),
        [],
    );


    const theme = React.useMemo(
        () =>
            createTheme({
                palette: {
                    mode,
                },
            }),
        [mode],
    );
}

//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    if (!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL />;

    return (
        <div>
            <ColorModeContext.Provider value={colorMode}>
                <ThemeProvider theme={theme}>
                    <BrowserRouter basename={basename}>
                        <ScrollToTop>
                            <Routes>
                                <Route element={<Home />} path="/" />
                                <Route element={<LogIn />} path="/login" />
                                <Route element={<SignUp />} path="/signup" />
                                <Route element={<UserCourse />} path="/usercourse" />
                                <Route element={<Exercise />} path="/exercise/:id" />
                                <Route element={<UserProfile />} path="/userprofile" />
                                <Route element={<UploadFile />} path="/uploadfile" />
                                <Route element={<Chat />} path="/chat/:id" />
                            </Routes>
                        </ScrollToTop>
                    </BrowserRouter>
                </ThemeProvider>
            </ColorModeContext.Provider>
        </div>
    );
};


export default injectContext(Layout);
