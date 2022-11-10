import React from "react";
import { useAuth } from "../../contexts/authContext";
import { addNamedDocument, getDocument, getDocuments } from "../../config/firebase";

export default function Plans() {
    const [plans, setPlans] = React.useState([]);
    const [selectedPlan, setSelectedPlan] = React.useState();
    const [error, setError] = React.useState('');
    const { user, setUser } = useAuth();

    React.useEffect(() => {
        getDocuments('plans').then((data) => {
            setPlans(data);
        });
    }, [])

    return (
        <>
            <div className="my-2">
                Select a Plan
                <div className="my-3">
                    {plans.map((plan, index) => {
                        return(
                            <>
                                <div tabIndex={0} className="collapse collapse-plus border border-base-300 bg-base-100 rounded-box" key={index}>
                                    <div className="collapse-title text-xl font-medium">
                                        {plan.name}
                                    </div>
                                    <div className="collapse-content">
                                        <p>{plan.description}</p>
                                        <div className="flex flex-row items-center flex-wrap">
                                            <button className="btn btn-primary mx-2 my-2"
                                                onClick={() => {
                                                    const chosenPlan = { plan: plan, planType: 'monthly', amount: plan.monthlyFee }
                                                    setSelectedPlan(chosenPlan);
                                                }}
                                            >
                                                {`INR ${plan.monthlyFee} per month`}
                                            </button>
                                            <spna className="text-xl font-bold">
                                                or
                                            </spna>
                                            <button className="btn btn-primary mx-2 my-2"
                                                onClick={() => {
                                                    const chosenPlan = { plan: plan, planType: 'yearly', amount: plan.yearlyFee }
                                                    setSelectedPlan(chosenPlan);
                                                }}
                                            >
                                                {`INR ${plan.yearlyFee} per month`}
                                            </button>

                                        </div>
                                    </div>
                                </div>
                            </>
                        )
                    })}
                </div>
            </div>
            <div className="my-1">
                {error}
            </div>
            {}
            <div className="my-2">
                <button
                    className="btn btn-primary w-full"
                    onClick={async (event) => {
                        event.preventDefault();
                        if (selectedPlan) {
                            try {
                                await addNamedDocument('users', {
                                    workoutFrequency: workoutFrequency
                                }, user.uid)
                                const profile = await getDocument('users', user.uid);
                                setUser({ ...user, profile: profile });
                            } catch (error) {
                                console.log(error);
                            }
                        } else {
                            setError('Please Select a Plan');
                        }
                    }
                    }
                >Next</button>
            </div>
        </>
    )
}