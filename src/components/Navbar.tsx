import favicon from "../assets/LSfavicon.ico";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

export const Navbar = () => {
    const [user] = useAuthState(auth);

    const signOutFromGoogle = async () => {
        await signOut(auth);
        window.location.reload();
    };

    return(
        <div className="flex flex-row justify-between space-y-4 px-80 py-20">
            <div className="flex items-center space-x-2">
                <img src={favicon} width={60} />
                <h1 className="text-2xl font-bold text-left">
                    <a href="https://livesitter.com/">LiveSitter</a>
                </h1>
            </div>
            {
                user &&
                <div>
                    <button
                        onClick={signOutFromGoogle}
                        className="px-2 py-1 border-2 border-gray-600 rounded-md bg-black text-white hover:bg-white hover:text-black"
                    >
                            Sign Out
                    </button>
                </div>
            }
        </div>
    )
}