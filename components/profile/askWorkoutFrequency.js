import React from "react";
import { useAuth } from "../../contexts/authContext";
import { addNamedDocument, getDocument } from "../../config/firebase";

export default function AskWorkoutFrequency() {
    const [workoutFrequency, setWorkoutFrequency] = React.useState(0);
    const [error, setError] = React.useState('');
    const { user, setUser } = useAuth();

    return (
        <>
            <div className="my-2">
                How many times do you train in a gym per week
                <div className="my-3">
                    <input type="range" min="0" max="7" value={workoutFrequency} className="range" step="1" onChange={(event) => setWorkoutFrequency(parseInt(event.target.value))} />
                    <div className="w-full flex justify-between text-xs px-2">
                        <span className="rotate-90 my-5">Zero</span>
                        <span className="rotate-90 my-5">1 Day</span>
                        <span className="rotate-90 my-5">2 Days</span>
                        <span className="rotate-90 my-5">3 Days</span>
                        <span className="rotate-90 my-5">4 Days</span>
                        <span className="rotate-90 my-5">5 Days</span>
                        <span className="rotate-90 my-5">6 Days</span>
                        <span className="rotate-90 my-5">Everyday</span>
                    </div>

                </div>
            </div>
            <div className="my-1">
                {error}
            </div>
            <div className="my-2">
                <button
                    className="btn btn-primary w-full"
                    onClick={async (event) => {
                            event.preventDefault();
                            try {
                                await addNamedDocument('users', {
                                    workoutFrequency: workoutFrequency
                                }, user.uid)
                                const profile = await getDocument('users', user.uid);
                                setUser({ ...user, profile: profile });
                            } catch (error) {
                                console.log(error);
                            }
                        }
                    }
                >Next</button>
            </div>
        </>
    )
}