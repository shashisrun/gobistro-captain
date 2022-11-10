import { useAuth } from "../../contexts/authContext";
import { addNamedDocument, getDocument } from "../../config/firebase";
import { IoFitness } from "react-icons/io5";
export default function ShowBMI() {
    const { user, setUser } = useAuth();
    const bmi = user.profile.weight / ((user.profile.height / 100) ** 2)
    return (
        <>
            <div className={`flex flex-col items-center ${bmi > 18.5 || bmi < 25 ? 'text-green-500' : 'text-red-500' }`}>
                <IoFitness size={300} />
                <h2 className="text-2xl font-bold">
                    Your BMI is {bmi.toFixed(2)}!
                </h2>
                <h2 className="text-xl">
                    {bmi < 18.5 ? "You're in the underweight range" : null}
                    {bmi >= 18.5 && bmi < 25 ? "You're in the healthy weight range" : null}
                    {bmi > 30 ? "You're in the over weight range" : null}
                </h2>
            </div>
            <div className="my-2">
                <button
                    className="btn btn-primary w-full"
                    onClick={async (event) => {
                        event.preventDefault();
                            try {
                                await addNamedDocument('users', {
                                    bmi: user.profile.weight / ((user.profile.height / 100) ** 2)
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