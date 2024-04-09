import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const LogIn = () => {
    const { store, actions } = useContext(Context);
    const { userName, password } = store;
    return (
        <div className="bg-gradient-to-t min-h-lvh from-violet-500 to-transparent flex justify-items-center">
            <div className="container" >
                hola
            </div>
        </div >
    );
}