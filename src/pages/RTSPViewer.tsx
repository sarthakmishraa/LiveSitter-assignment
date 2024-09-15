import { useState } from "react";

import { auth } from "../firebase/firebase"
import { useAuthState } from "react-firebase-hooks/auth";

import { VideoPlayer } from "../components/VideoPlayer";

export const RTSPViewer = () => {
    const [user] = useAuthState(auth);
    const [streamUrl, setStreamUrl] = useState<string|null>(null);
    const [start, setStart] = useState<boolean>(false);

    return(
        <div className="space-y-4 text-xl px-80 flex flex-col">
            <p className="text-xl">Hi { user?.displayName }</p>
            <div className="space-y-4 text-center text-semibold">
            <h4 className="font-semibold">RTSP Stream Viewer</h4>
            </div>
            <div className="flex flex-col items-center">
            <input
                type="text"
                placeholder="Enter URL"
                className="p-2 m-2 border-b-2 rounded-md w-3/6 border-gray-800"
                onChange={(event) => setStreamUrl(event.target.value)}
            />
            <button
                className="bg-black text-xl text-white w-3/6 p-2 m-2 rounded-md cursor-pointer hover:bg-gray-800"
                onClick={() => setStart(true)}
            >
                    Play
                </button>
            </div>
            <div>
            { start && <VideoPlayer streamUrl={ streamUrl } />}
            </div>
        </div>
    )
}