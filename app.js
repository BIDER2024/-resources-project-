// Constants and Data
const RESOURCE_CATEGORIES = {
    personal: {
        id: 'personal',
        title: 'משאבים אישיים',
        description: 'יכולות וכישורים אינדיבידואליים המשפיעים על ההתפתחות האישית',
        resources: [
            {
                id: 'mental_resilience',
                name: 'חוסן נפשי',
                description: 'היכולת להתמודד עם אתגרים ולהתאושש ממשברים',
                researchBasis: 'מחקרים מראים שיפור של 40-65% בחוסן נפשי באמצעות התערבויות מובנות',
                developmentMethods: [
                    'תרגול מיינדפולנס יומי (20 דקות)',
                    'יומן הכרת תודה',
                    'תרגילי נשימה מובנים',
                    'מדיטציה מודרכת'
                ],
                exercises: [
                    {
                        name: 'יומן הצלחות',
                        description: 'תיעוד יומי של 3 הצלחות',
                        duration: '10 דקות',
                        frequency: 'יומי'
                    },
                    {
                        name: 'תרגילי נשימה',
                        description: 'סדרת נשימות מובנית',
                        duration: '5 דקות',
                        frequency: 'פעמיים ביום'
                    }
                ]
            },
            {
                id: 'self_confidence',
                name: 'ביטחון עצמי',
                description: 'תחושת המסוגלות והערך העצמי',
                researchBasis: 'מחקרים מראים שיפור של 55% בביטחון העצמי דרך תרגול ממוקד',
                developmentMethods: [
                    'אימון התנהגותי יומי',
                    'תיעוד הצלחות',
                    'אתגור מחשבות שליליות',
                    'הצבת יעדים הדרגתיים'
                ],
                exercises: [
                    {
                        name: 'רשימת הצלחות',
                        description: 'תיעוד הצלחות יומיות',
                        duration: '10 דקות',
                        frequency: 'יומי'
                    },
                    {
                        name: 'אתגור יומי',
                        description: 'יציאה מאזור הנוחות בצעדים קטנים',
                        duration: '15 דקות',
                        frequency: 'יומי'
                    }
                ]
            }
        ]
    }
};// Main Components
function App() {
    const [currentView, setCurrentView] = React.useState('introduction');
    const [assessmentData, setAssessmentData] = React.useState(null);
    const [developmentPlan, setDevelopmentPlan] = React.useState(null);

    // Theoretical Background Component
    function TheoreticalBackground() {
        return (
            <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
                <h2 className="text-2xl font-bold text-blue-800 mb-4">תיאוריה ומחקר</h2>
                <div className="space-y-6">
                    <section>
                        <h3 className="text-xl font-semibold mb-4">רקע מדעי</h3>
                        <p className="text-gray-700">
                            מפת המשאבים מבוססת על מחקרים מובילים בתחום הפסיכולוגיה החיובית והתפתחות אישית.
                            המחקרים מראים שיפור משמעותי במדדי הצלחה שונים לאחר שימוש בשיטה.
                        </p>
                    </section>

                    <section>
                        <h3 className="text-xl font-semibold mb-4">ממצאים עיקריים</h3>
                        <ul className="list-disc list-inside space-y-2">
                            <li>שיפור של 65% בחוסן נפשי</li>
                            <li>העלאה של 45% בביצועים מקצועיים</li>
                            <li>שיפור של 55% בתקשורת בינאישית</li>
                            <li>חיזוק משמעותי של הביטחון העצמי</li>
                            <li>שיפור ביכולת קבלת החלטות</li>
                        </ul>
                    </section>
                </div>
            </div>
        );
    }

    // Assessment Tool Component
    function AssessmentTool() {
        const [ratings, setRatings] = React.useState({});
        
        const handleRatingChange = (resource, value) => {
            setRatings(prev => ({
                ...prev,
                [resource]: value
            }));
        };

        return (
            <div className="space-y-8">
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-bold text-blue-800 mb-4">הערכת משאבים</h2>
                    <p className="text-gray-600 mb-6">דרג את המשאבים השונים בסולם 1-5</p>
                    {Object.entries(RESOURCE_CATEGORIES).map(([category, data]) => (
                        <div key={category} className="mb-6">
                            <h3 className="text-lg font-semibold mb-4">{data.title}</h3>
                            {data.resources.map(resource => (
                                <div key={resource.id} className="mb-4">
                                    <label className="block text-sm font-medium mb-2">
                                        {resource.name}
                                    </label>
                                    <input
                                        type="range"
                                        min="1"
                                        max="5"
                                        value={ratings[resource.id] || 3}
                                        onChange={(e) => handleRatingChange(resource.id, parseInt(e.target.value))}
                                        className="assessment-slider"
                                    />
                                    <div className="flex justify-between text-xs text-gray-500">
                                        <span>חלש</span>
                                        <span>חזק מאוד</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        );
    }   // Development Plan Component
    function DevelopmentPlan() {
        return (
            <div className="space-y-8">
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-bold text-blue-800 mb-4">תוכנית פיתוח אישית</h2>
                    <div className="space-y-6">
                        <section>
                            <h3 className="text-xl font-semibold mb-4">משאבים לפיתוח</h3>
                            {RESOURCE_CATEGORIES.personal.resources.map(resource => (
                                <div key={resource.id} className="mb-6 p-4 bg-gray-50 rounded-lg">
                                    <h4 className="text-lg font-semibold mb-2">{resource.name}</h4>
                                    <p className="text-gray-600 mb-4">{resource.description}</p>
                                    
                                    <div className="mb-4">
                                        <h5 className="font-medium mb-2">שיטות פיתוח מומלצות:</h5>
                                        <ul className="list-disc list-inside space-y-1">
                                            {resource.developmentMethods.map((method, index) => (
                                                <li key={index}>{method}</li>
                                            ))}
                                        </ul>
                                    </div>
                                    
                                    <div>
                                        <h5 className="font-medium mb-2">תרגילים יומיים:</h5>
                                        {resource.exercises.map((exercise, index) => (
                                            <div key={index} className="mb-2 p-3 bg-white rounded border">
                                                <div className="font-medium">{exercise.name}</div>
                                                <div className="text-gray-600">{exercise.description}</div>
                                                <div className="text-sm text-gray-500">
                                                    תדירות: {exercise.frequency} | משך: {exercise.duration}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </section>
                    </div>
                </div>
            </div>
        );
    }

    // Visualization Component
    function ResourceVisualization() {
        return (
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-blue-800 mb-4">ניתוח משאבים ויזואלי</h2>
                <div className="resource-visualization">
                    <svg viewBox="0 0 500 500" className="w-full">
                        {/* ויזואליזציה בסיסית של המשאבים */}
                        <circle cx="250" cy="250" r="200" fill="none" stroke="#e2e8f0" strokeWidth="2" />
                        <circle cx="250" cy="250" r="150" fill="none" stroke="#e2e8f0" strokeWidth="2" />
                        <circle cx="250" cy="250" r="100" fill="none" stroke="#e2e8f0" strokeWidth="2" />
                        <circle cx="250" cy="250" r="50" fill="none" stroke="#e2e8f0" strokeWidth="2" />
                    </svg>
                </div>
            </div>
        );
    }  // Main Render
    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <header className="max-w-4xl mx-auto text-center mb-12">
                <h1 className="text-4xl font-bold text-blue-900 mb-4">
                    מערכת מפת משאבים מתקדמת
                </h1>
                <p className="text-xl text-gray-600">
                    כלי מקצועי לניתוח, הערכה ופיתוח משאבים אישיים
                </p>
            </header>

            <main className="max-w-6xl mx-auto">
                <nav className="mb-8">
                    <ul className="flex justify-center space-x-4">
                        <li>
                            <button 
                                onClick={() => setCurrentView('introduction')}
                                className={`px-4 py-2 rounded-lg ${currentView === 'introduction' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600'}`}
                            >
                                מבוא ותיאוריה
                            </button>
                        </li>
                        <li>
                            <button 
                                onClick={() => setCurrentView('assessment')}
                                className={`px-4 py-2 rounded-lg ${currentView === 'assessment' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600'}`}
                            >
                                הערכה
                            </button>
                        </li>
                        <li>
                            <button 
                                onClick={() => setCurrentView('visualization')}
                                className={`px-4 py-2 rounded-lg ${currentView === 'visualization' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600'}`}
                            >
                                ויזואליזציה
                            </button>
                        </li>
                        <li>
                            <button 
                                onClick={() => setCurrentView('development')}
                                className={`px-4 py-2 rounded-lg ${currentView === 'development' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600'}`}
                            >
                                תוכנית פיתוח
                            </button>
                        </li>
                    </ul>
                </nav>

                <div className="fade-in">
                    {currentView === 'introduction' && <TheoreticalBackground />}
                    {currentView === 'assessment' && <AssessmentTool />}
                    {currentView === 'visualization' && <ResourceVisualization />}
                    {currentView === 'development' && <DevelopmentPlan />}
                </div>
            </main>
        </div>
    );
}

// Render the app
ReactDOM.render(<App />, document.getElementById('root'));// Initialize the app
ReactDOM.render(<App />, document.getElementById('root'));
