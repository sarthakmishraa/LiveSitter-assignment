import { useState, useEffect, useRef } from "react";
import Hls from 'hls.js';

export const VideoPlayer = ({ streamUrl }: any) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(1);
    const [playbackRate, setPlaybackRate] = useState(1);
    const [showSettings, setShowSettings] = useState(false);

    const videoRef = useRef<any>();

    const handlePlayPause = () => {
        if (isPlaying) {
        videoRef.current.pause();
        } else {
        videoRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    const handleVolumeChange = (event: any) => {
        const newVolume = event.target.value;
        setVolume(newVolume);
        videoRef.current.volume = newVolume;
    };

    const handlePlaybackRateChange = (event: any) => {
        const newRate = event.target.value;
        setPlaybackRate(newRate);
        videoRef.current.playbackRate = newRate;
    };

    const handleFullscreen = () => {
        if (videoRef.current.requestFullscreen) {
            videoRef.current.requestFullscreen();
        }
    };

    useEffect(() => {
    if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(streamUrl);
        hls.attachMedia(videoRef.current);
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
        videoRef.current.play();
        setIsPlaying(true);
        });
    } else if (videoRef.current.canPlayType('application/vnd.apple.mpegurl')) {
        videoRef.current.src = streamUrl;
        videoRef.current.addEventListener('loadedmetadata', () => {
        videoRef.current.play();
        setIsPlaying(true);
        });
    }
    }, [streamUrl]);

    return(
        <div>
            <video
                ref={ videoRef }
                controls={ false }
            />

            <div>
                <button onClick={handlePlayPause} className="px-2 py-1 mx-2 border-2 border-gray-600 rounded-md bg-black text-white hover:bg-white hover:text-black">
                    { isPlaying ? 'Pause' : 'Play' }
                </button>
                <button onClick={handleFullscreen} className="px-2 py-1 mx-2 border-2 border-gray-600 rounded-md bg-black text-white hover:bg-white hover:text-black">
                    Fullscreen
                </button>
                <button onClick={() => setShowSettings(!showSettings)} className="px-2 py-1 mx-2 border-2 border-gray-600 rounded-md bg-black text-white hover:bg-white hover:text-black">
                    { !showSettings ? <p>Settings</p> : <p>Hide</p> }
                </button>
            </div>

            { showSettings && (
                <div className="my-4 flex flex-row space-x-4 justify-between items-center p-2 border-2 border-gray-600 rounded-md">
                    <div>
                        <label>Volume: </label>
                        <input type="range" min="0" max="1" step="0.01" value={volume} onChange={handleVolumeChange} />
                    </div>

                    <div>
                        <label>Playback Speed: </label>
                        <select className="border-2 border-gray-600 p-1 rounded-md" value={ playbackRate } onChange={ handlePlaybackRateChange }>
                            <option value="0.5">0.5x</option>
                            <option value="1">1x (Normal)</option>
                            <option value="1.5">1.5x</option>
                            <option value="2">2x</option>
                        </select>
                    </div>

                    <button onClick={() => setShowSettings(false)} className="px-2 py-1 border-2 border-gray-600 rounded-md bg-black text-white hover:bg-white hover:text-black">Close</button>
                </div>
            )}
        </div>
    )
}