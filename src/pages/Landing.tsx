import { useState } from "react";
import { RTSPViewer } from "./RTSPViewer";
import { Navbar } from "../components/Navbar";

import googleIcon from "../assets/googleicon.webp";

import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase/firebase";

export const Landing = () => {
    const [loggedIn, setLoggedIn] = useState<boolean>(false);

    const signInWithGoogle = async () => {
        await signInWithPopup(auth, provider);
        setLoggedIn(true);
    }

    if(loggedIn) {
        return (
            <>
                <Navbar />
                <RTSPViewer />
            </>
        )
    }

    return(
        <div>
            <Navbar />
            <div className="flex flex-col items-center space-y-4">
                <h1>Hello, please sign in to access your RTSP Stream</h1>
                <div className="cursor-pointer flex flex-row items-center justify-center border-2 border-gray-600 px-2 rounded-2xl">
                    <img src={googleIcon} width={30} />
                    <button
                        onClick={signInWithGoogle}
                    >
                            Sign In with Google
                    </button>
                </div>
            </div>
        </div>
    )
}