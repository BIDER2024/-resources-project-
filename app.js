const resources = {
    'כישורים אישיים': [
        'חוסן נפשי', 'ביטחון עצמי', 'גמישות מחשבתית', 
        'יצירתיות', 'מודעות עצמית', 'יכולת למידה'
    ],
    'כישורים חברתיים': [
        'תקשורת בינאישית', 'אמפתיה', 'עבודת צוות', 
        'מנהיגות', 'יכולת השפעה', 'יצירת קשרים'
    ],
    'כישורים מקצועיים': [
        'מומחיות תחומית', 'ניהול זמן', 'פתרון בעיות', 
        'חשיבה אנליטית', 'יזמות', 'קבלת החלטות'
    ],
    'משאבים רגשיים': [
        'ויסות רגשי', 'אופטימיות', 'הנעה עצמית', 
        'התמודדות עם לחץ', 'חוסן רגשי', 'מוטיבציה'
    ]
};

const resourceDetails = {
    'חוסן נפשי': {
        מחקר: 'מחקרים מראים שיפור של 40-65% בחוסן הנפשי באמצעות התערבויות מובנות',
        כלים: [
            'תרגול מיינדפולנס יומי (20 דקות)',
            'יומן הכרת תודה',
            'תרגילי נשימה מובנים',
            'מדיטציה מודרכת'
        ],
        פעולות: [
            'זיהוי וכתיבת 3 הצלחות יומיות',
            'פיתוח שגרת בוקר מחזקת',
            'יצירת רשת תמיכה',
            'תרגול התמודדות הדרגתי'
        ]
    },
    'ביטחון עצמי': {
        מחקר: 'מחקרי פסיכולוגיה חיובית מראים שיפור של 55% בביטחון העצמי דרך תיעוד הצלחות ותרגול יומי',
        כלים: [
            'יומן הצלחות יומי',
            'תרגולי אסרטיביות',
            'הצבת יעדים קטנים',
            'תרגילי העצמה'
        ],
        פעולות: [
            'לקיחת אחריות על משימה חדשה בשבוע',
            'יציאה מדורגת מאזור הנוחות',
            'חגיגת הישגים קטנים',
            'התנסות שבועית בדבר חדש'
        ]
    }
};

function getCirclePosition(index, total, radius, centerX, centerY) {
    const angle = (index * 2 * Math.PI) / total;
    return {
        x: centerX + radius * Math.cos(angle - Math.PI / 2),
        y: centerY + radius * Math.sin(angle - Math.PI / 2)
    };
}

function getRatingColor(rating) {
    switch(rating) {
        case 1: return '#FF9999';
        case 2: return '#FFD699';
        case 3: return '#99FF99';
        case 4: return '#9999FF';
        default: return '#CCCCCC';
    }
}

function DevelopmentPlan({ situation = '', ratings = {}, notes = {}, onReset }) {
    const [developmentPlan, setDevelopmentPlan] = React.useState(null);

    React.useEffect(() => {
        const generatePlan = () => {
            const validRatings = Object.fromEntries(
                Object.entries(ratings).filter(([_, rating]) => 
                    typeof rating === 'number' && !isNaN(rating)
                )
            );

            const weakResources = Object.entries(validRatings)
                .filter(([_, rating]) => rating <= 2)
                .map(([resource, rating]) => ({ resource, rating }));

            const plan = {
                מצב_משאבים: {
                    סך_חזקים: Object.values(validRatings).filter(r => r > 2).length,
                    סך_חלשים: weakResources.length,
                    פירוט: weakResources
                },
                תוכנית_שבועית: weakResources.map(({ resource, rating }) => ({
                    משאב: resource,
                    דירוג: rating,
                    מטרה: `שיפור ${resource}`,
                    פעולות: [
                        ...(resourceDetails[resource]?.פעולות || []).slice(0, 2),
                        'בחירת מטרה ספציפית לשבוע'
                    ],
                    כלים: resourceDetails[resource]?.כלים || []
                })),
                הערות_כלליות: [
                    'התמקד/י בפעולה אחת קטנה בכל משאב',
                    'עקוב/י אחר ההתקדמות ביומן',
                    'העניק/י לעצמך סבלנות ועידוד'
                ]
            };

            setDevelopmentPlan(plan);
        };

        generatePlan();
    }, [ratings]);

    const handlePrint = () => {
        window.print();
    };

    if (!developmentPlan || developmentPlan.תוכנית_שבועית.length === 0) {
        return (
            <div className="p-6 bg-white rounded-lg shadow-lg text-center">
                <h2 className="text-2xl font-bold mb-6 text-blue-700">תוכנית פיתוח אישית</h2>
                <p>לא נמצאו משאבים הדורשים חיזוק</p>
                <button 
                    onClick={onReset}
                    className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                    חזרה למפת המשאבים
                </button>
            </div>
        );
    }

    return (
        <div className="p-6 bg-white rounded-lg shadow-lg print:p-0">
            <div className="flex justify-between items-center mb-6 print:hidden">
                <button 
                    onClick={onReset}
                    className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300"
                >
                    חזרה למפת המשאבים
                </button>
                <button 
                    onClick={handlePrint}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                    הדפס תוכנית
                </button>
            </div>

            <h2 className="text-2xl font-bold mb-6 text-blue-700 print:text-center">
                תוכנית פיתוח אישית
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 print:grid-cols-1">
                <div className="bg-white p-4 rounded-lg shadow-lg print:shadow-none">
                    <h3 className="text-xl font-bold mb-4 text-blue-700">מצב המשאבים</h3>
                    <div className="space-y-4">
                        <p>
                            <span className="font-semibold">סה"כ משאבים חזקים:</span>{' '}
                            {developmentPlan.מצב_משאבים.סך_חזקים}
                        </p>
                        <p>
                            <span className="font-semibold">סה"כ משאבים הדורשים חיזוק:</span>{' '}
                            {developmentPlan.מצב_משאבים.סך_חלשים}
                        </p>
                    </div>
                </div>

                <div className="bg-white p-4 rounded-lg shadow-lg print:shadow-none">
                    <h3 className="text-xl font-bold mb-4 text-blue-700">סיטואציה</h3>
                    <p>{situation}</p>
                </div>
            </div>

            <div className="mt-6">
                <h3 className="text-xl font-semibold mb-4 text-blue-700">תוכנית שבועית</h3>
                {developmentPlan.תוכנית_שבועית.map((item, index) => (
                    <div 
                        key={index} 
                        className="bg-white p-4 rounded-lg shadow-lg mb-4 print:shadow-none print:border-b print:border-gray-200"
                    >
                        <h4 className="text-lg font-bold mb-3 text-blue-700">
                            {item.משאב} (דירוג: {item.דירוג})
                        </h4>
                        <div className="grid grid-cols-2 gap-4 print:grid-cols-1">
                            <div>
                                <h5 className="font-semibold mb-2">פעולות:</h5>
                                <ul className="list-disc list-inside">
                                    {item.פעולות.map((action, i) => (
                                        <li key={i}>{action}</li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <h5 className="font-semibold mb-2">כלים:</h5>
                                <ul className="list-disc list-inside">
                                    {item.כלים.map((tool, i) => (
                                        <li key={i}>{tool}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                ))}

                <div className="mt-6 bg-white p-4 rounded-lg shadow-lg print:shadow-none">
                    <h3 className="text-xl font-bold mb-4 text-blue-700">הערות כלליות</h3>
                    <ul className="list-disc list-inside">
                        {developmentPlan.הערות_כלליות.map((note, index) => (
                            <li key={index}>{note}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

function ResourceMap({ onCompletePlan }) {
    const [situation, setSituation] = React.useState('');
    const [activeResource, setActiveResource] = React.useState(null);
    const [ratings, setRatings] = React.useState({});
    const [notes, setNotes] = React.useState({});
    const [isComplete, setIsComplete] = React.useState(false);

    React.useEffect(() => {
        const allResources = Object.values(resources).flat();
        const allRated = allResources.every(resource => ratings[resource] !== undefined);
        
        if (allRated && situation.trim() !== '') {
            setIsComplete(true);
        } else {
            setIsComplete(false);
        }
    }, [ratings, situation]);

    const handleRatingChange = (resource, rating) => {
        setRatings(prev => ({
            ...prev,
            [resource]: rating
        }));
    };

    const handleNoteChange = (resource, note) => {
        setNotes(prev => ({
            ...prev,
            [resource]: note
        }));
    };

    const handleCompletePlan = () => {
        onCompletePlan(situation, ratings, notes);
    };

    return (
        <div className="p-4 max-w-6xl mx-auto">
            <div className="mb-8">
                <div className="mb-6">
                    <label className="block text-xl text-gray-700 mb-2">
                        הסיטואציה שברצוני לבחון:
                    </label>
                    <input
                        type="text"
                        value={situation}
                        onChange={(e) => setSituation(e.target.value)}
                        className="w-full p-3 border rounded-lg text-lg"
                        placeholder="תאר/י את הסיטואציה..."
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-9 bg-white p-4 rounded-lg shadow-lg relative">
                    <div className="absolute left-4 top-4 bg-white p-4 rounded-lg shadow-md z-10">
                        <h3 className="text-lg font-bold mb-2">עוצמת משאב:</h3>
                        {[
                            { level: 1, color: '#FF9999', text: 'חלש' },
                            { level: 2, color: '#FFD699', text: 'בינוני' },
                            { level: 3, color: '#99FF99', text: 'חזק' },
                            { level: 4, color: '#9999FF', text: 'חזק מאוד' }
                        ].map((item) => (
                            <div key={item.level} className="flex items-center mb-1">
                                <div 
                                    className="w-4 h-4 ml-2"
                                    style={{ backgroundColor: item.color }}
                                />
                                <span className="text-sm">
                                    {`${item.text} (${item.level})`}
                                </span>
                            </div>
                        ))}
                    </div>

                    <svg viewBox="0 0 600 600" className="w-full h-full">
                        {[4, 3, 2, 1].map((level) => (
                            <g key={
