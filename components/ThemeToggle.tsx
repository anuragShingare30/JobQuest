"use client";
import { LuSunMedium } from "react-icons/lu";
import { IoMoonOutline } from "react-icons/io5";
import React from "react";


let themes = {
    dark: "night",
    light: "winter",
    };



function ThemeToggle() {
    let [theme, setTheme] = React.useState(themes.light); 

    function toggleTheme(){
        let newTheme = theme === themes.light ? themes.dark : themes.light;
        document.documentElement.setAttribute("data-theme", newTheme);
        setTheme(newTheme);
    }

    return (
        <button className="btn btn-sm btn-outline" onClick={toggleTheme}>
            {theme === "night" ? (
                <LuSunMedium className="h-4 w-4"/> 
            ) : (
                <IoMoonOutline className="w-4 h-4"/>
            )}
        </button>
    );
};

export { ThemeToggle };