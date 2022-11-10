import React from "react";
import { useAuth } from "../../contexts/authContext";
import { addNamedDocument, getDocument } from "../../config/firebase";
import { IoMale, IoFemale, IoMaleFemale } from "react-icons/io5";

export default function AskGender() {
    const [gender, setGender] = React.useState('');
    const [error, setError] = React.useState('');
    const { user, setUser } = useAuth();

    return (
        <>
            <div className="my-2">
                You are
                <div className="my-1">
                    <label className="btn btn-default py-1 bg-secondary hover:bg-primary w-full" htmlFor="male">
                        <IoMale size={32} />
                        Male
                    </label>
                    <input type="radio" name="gender" hidden className="radio radio-accent" id="male" onClick={(event) => setGender(event.target.id)} />
                </div>
                <div className="my-1">
                    <label className="btn btn-default py-1 bg-secondary hover:bg-primary w-full" htmlFor="female">
                        <IoFemale size={32} />
                        Female
                    </label>
                    <input type="radio" name="gender" hidden className="radio radio-accent" id="female" onClick={(event) => setGender(event.target.id)} />
                </div>
                <div className="my-1">
                    <label className="btn btn-default py-1 bg-secondary hover:bg-primary w-full" htmlFor="others">
                        <IoMaleFemale size={32} />
                        Others
                    </label>
                    <input type="radio" name="gender" hidden className="radio radio-accent" id="others" onClick={(event) => setGender(event.target.id)} />
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
                        if (gender === '') {
                            setError('Please Select Your Gender');
                        } else {
                            try {
                                await addNamedDocument('users', {
                                    gender: gender
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