function App() {
    const [showDevelopmentPlan, setShowDevelopmentPlan] = React.useState(false);
    const [planData, setPlanData] = React.useState(null);

    const handleCompletePlan = (situation, ratings, notes) => {
        setPlanData({ situation, ratings, notes });
        setShowDevelopmentPlan(true);
    };

    const handleResetPlan = () => {
        setShowDevelopmentPlan(false);
        setPlanData(null);
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
            {!showDevelopmentPlan ? (
                <>
                    <div className="pt-12 pb-6 text-center">
                        <h1 className="text-5xl font-bold text-blue-800 mb-4">
                            עכשיו גלה את משאביך
                        </h1>
                        <h2 className="text-2xl text-gray-600">
                            מאת רות בידרמן
                        </h2>
                    </div>

                    <div className="max-w-6xl mx-auto px-4 py-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                            <div className="intro-card p-8">
                                <h3 className="text-2xl font-bold text-blue-700 mb-4">
                                    מהי מפת המשאבים?
                                </h3>
                                <p className="text-lg text-gray-700">
                                    מפת המשאבים האישית היא כלי ייחודי המאפשר לך לזהות ולמפות את החוזקות, 
                                    הכישורים והיכולות העומדים לרשותך. באמצעות המפה תוכל/י לקבל תמונה מקיפה 
                                    של המשאבים שלך בארבעה תחומים מרכזיים: אישי, מקצועי, חברתי ורגשי.
                                </p>
                            </div>

                            <div className="intro-card p-8">
                                <h3 className="text-2xl font-bold text-blue-700 mb-4">
                                    למה זה חשוב?
                                </h3>
                                <p className="text-lg text-gray-700">
                                    מחקרים מראים שזיהוי וטיפוח משאבים אישיים מגביר חוסן נפשי, משפר ביצועים 
                                    ומעצים את תחושת המסוגלות. הבנת המשאבים העומדים לרשותנו מאפשרת לנו 
                                    להתמודד טוב יותר עם אתגרים ולממש את הפוטנציאל שלנו.
                                </p>
                            </div>
                        </div>

                        <ResourceMap onCompletePlan={handleCompletePlan} />
                    </div>
                </>
            ) : (
                <DevelopmentPlan 
                    situation={planData.situation} 
                    ratings={planData.ratings}
                    notes={planData.notes}
                    onReset={handleResetPlan}
                />
            )}
        </div>
    );
}

// Render the app
ReactDOM.render(
    <App />,
    document.getElementById('root')
);
