import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import { Home } from "./pages/home";
import { LogIn } from "./pages/logIn";
import { SignUp } from "./pages/signUp";
import { UserCourse } from "./pages/usercourse";
import { Exercise } from "./pages/exercises/exercise";
import { UserProfile } from "./pages/userprofile";
import { UploadFile } from "./pages/UploadFile";
import { Chat } from "./pages/chats";

import injectContext from "./store/appContext";

//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    if (!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL />;

    return (
        <div>
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
        </div>
    );
};


export default injectContext(Layout);
