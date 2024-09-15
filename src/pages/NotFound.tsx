import { Link } from "react-router-dom";

export const NotFound = () => {
    return(
        <div className="py-40 text-2xl text-center font-semibold">
            <h1 className="py-4 text-red-600">404: Page Not Found</h1>
            <Link className="underline" to="/">Go back to home</Link>
        </div>
    )
}