import React from "react";
import { useAuth } from "../../contexts/authContext";
import { addNamedDocument, getDocument } from "../../config/firebase";

export default function AskHeight() {
    const [height, setHeight] = React.useState('');
    const [error, setError] = React.useState('');
    const { user, setUser } = useAuth();

    return (
        <>
            <div className="my-2">
                <input type="text" placeholder="Enter your height (cm)" className="input w-full bg-secondary"
                    value={height}
                    onChange={(event) => setHeight(event.target.value)}
                />
            </div>
            <div className="my-1">
                {error}
            </div>
            <div className="my-2">
                <button
                    className="btn btn-primary w-full"
                    onClick={async (event) => {
                        event.preventDefault();
                        if (height === '') {
                            setError('Please enter a valid height');
                        } else {
                            try {
                                await addNamedDocument('users', {
                                    height: parseInt(height)
                                }, user.uid)
                                const profile = await getDocument('users', user.uid);
                                setUser({ ...user, profile: profile });
                            } catch (error) {
                                console.log(error);
                            }
                        }
                    }
                    }
                >Next</button>
            </div>
        </>
    )
}