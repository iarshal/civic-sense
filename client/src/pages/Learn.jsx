import { useState, useEffect, useRef } from 'react';
import './Learn.css';

const modules = [
    {
        id: 'cleanliness',
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="28" height="28">
                <path d="M12 2L12 6" />
                <path d="M9 6h6l1 6H8l1-6z" />
                <path d="M8 12c-1 4-2 8-2 9a1 1 0 001 1h10a1 1 0 001-1c0-1-1-5-2-9" />
                <path d="M6 16h12" />
            </svg>
        ),
        title: 'Public Cleanliness',
        tagline: 'A clean India starts with you',
        color: '#27AE60',
        description: 'Learn about the importance of cleanliness in public spaces and how small habits can transform our communities.',
        notes: [
            { heading: 'Waste Segregation Basics', text: 'Green bins for wet/biodegradable waste (food scraps, vegetable peels). Blue bins for dry recyclable waste (plastic, paper, glass). Red/yellow for hazardous waste (batteries, chemicals, medical waste). NEVER mix medical or sanitary waste with regular waste — they require separate disposal under the Solid Waste Management Rules 2016.' },
            { heading: 'Swachh Bharat Mission', text: 'Launched in 2014, covering both Gramin (rural) and Urban India — it is a nationwide initiative, not limited to rural areas. It promotes toilet construction, behavioural change in sanitation, and community cleanliness drives.' },
            { heading: 'Plastic Waste Management', text: 'Plastic carry bags below 75 microns (updated to 120 microns in 2021) are banned under the Plastic Waste Management Rules 2016. Extended Producer Responsibility (EPR) makes manufacturers responsible for collecting and recycling waste from their products.' },
            { heading: 'Composting and Biogas', text: 'About 40-60% of Indian municipal waste is organic and compostable. Home composting diverts massive waste from landfills. Well-maintained biogas plants are nearly odourless and generate free cooking gas from kitchen waste.' },
            { heading: 'Water and Drain Management', text: 'Never dump kitchen waste, cooking oil, or soapy water into open drains — it causes blockages, waterlogging, and waterborne diseases. Used cooking oil should be collected for recycling into biodiesel. Blocked drains during monsoon season are a community responsibility.' },
            { heading: 'Burning Waste is Dangerous', text: 'Burning plastic releases carcinogenic dioxins and furans, banned under the Air Prevention and Control of Pollution Act. Even biodegradable waste should follow Leave No Trace principles in parks and protected areas.' },
            { heading: 'Construction and Debris', text: 'Construction and demolition waste must be managed by the generator — not dumped on public roads. Municipal corporations can impose fines for non-compliance. Report illegal dumping to local authorities.' },
            { heading: 'Polluter Pays Principle', text: 'Those who generate waste (e.g., Diwali crackers, festival debris) are legally and ethically responsible for cleaning it up. The Water Prevention and Control of Pollution Act 1974 holds local bodies and industries responsible for river pollution.' },
            { heading: 'Community Action', text: 'Decentralized processing (ward-level composting + material recovery) is the most sustainable urban waste solution. Student-led green clubs in schools and community cleanliness drives create lasting behavioural change.' },
        ],
        points: [
            'Dispose of waste properly — always use dustbins or carry waste home',
            'Separate wet and dry waste for efficient recycling',
            'Avoid spitting, littering, or dumping waste in public places',
            'Participate in community cleanliness drives and Swachh Bharat initiatives',
            'Report illegal dumping to local municipal authorities'
        ]
    },
    {
        id: 'traffic',
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="28" height="28">
                <rect x="6" y="1" width="12" height="22" rx="3" />
                <circle cx="12" cy="6" r="2" />
                <circle cx="12" cy="12" r="2" />
                <circle cx="12" cy="18" r="2" />
            </svg>
        ),
        title: 'Traffic Behaviour',
        tagline: 'Safe roads, safe lives',
        color: '#E74C3C',
        description: 'Understand traffic rules, road safety, and responsible driving habits that can save lives every day.',
        notes: [
            { heading: 'Signal Rules', text: 'Yellow means PREPARE TO STOP, not speed up. Red means absolute stop — no exceptions. In India, you give way to traffic from your right at roundabouts. Vehicles already in a roundabout have right of way.' },
            { heading: 'Emergency Vehicles', text: 'When an ambulance or fire truck approaches with sirens, pull to the LEFT on Indian roads to create a free corridor. The golden hour (first 60 minutes after injury) can save a life. Under the Good Samaritan Law 2016, rescuers cannot be detained, harassed, or forced to pay.' },
            { heading: 'Drink Driving', text: 'India has one of the strictest Blood Alcohol Concentration (BAC) limits globally at 0.03% (30mg per 100ml blood). Even one drink can put you over the limit. Alcohol impairs reflexes and judgement at any amount.' },
            { heading: 'Vulnerable Road Users', text: 'Cyclists are legitimate road users — give at least 1.5m clearance when overtaking. Pedestrians ALWAYS have right of way at zebra crossings. School zone speed limits (25 km/h) exist because children are unpredictable.' },
            { heading: 'Helmet and Seatbelt Safety', text: 'An unfastened helmet flies off on impact and provides virtually no protection. Airbags deploy at 300 km/h and can be fatal to children on front seats — children under 12 must be in the back seat.' },
            { heading: 'Phone Usage', text: 'Any phone interaction while driving increases accident risk by 4x. Even at red lights, distracted drivers miss signal changes. The law prohibits phone use while driving.' },
            { heading: 'Lane Discipline and Parking', text: 'Frequent lane changes create unpredictable movements that multiply accident risk. Double parking on a 2-lane road halves capacity and creates cascading jams kilometres away. Never block fire hydrants — firefighters need access to water supply.' },
            { heading: 'Special Signals', text: 'A truck left indicator on a single-lane road often signals safe to overtake (Indian convention). L-plate indicates a learner driver — maintain extra distance. Warning bells at railway crossings mean STOP regardless of gate position.' },
            { heading: 'Legal Requirements', text: 'Third-party vehicle insurance is mandatory. PUC (Pollution Under Control) certificate violations carry fines up to Rs 10,000. Driving on footpaths is illegal under the Motor Vehicles Act. High beam within city limits is a violation.' },
            { heading: 'Noise and Road Rage', text: 'Silence zones around hospitals and schools are legally enforced — unnecessary honking is punishable. Road rage has caused deaths in India — de-escalation is always the safest response.' },
        ],
        points: [
            'Always follow traffic signals — red means stop, no exceptions',
            'Wear helmets and seatbelts — they save lives in accidents',
            'Give way to emergency vehicles like ambulances and fire trucks',
            'Do not use your phone while driving or riding',
            'Respect pedestrian crossings and speed limits in school zones'
        ]
    },
    {
        id: 'publicSpaces',
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="28" height="28">
                <path d="M3 21h18" />
                <path d="M5 21V7l7-4 7 4v14" />
                <rect x="9" y="13" width="6" height="8" />
                <path d="M9 9h6" />
            </svg>
        ),
        title: 'Respecting Public Spaces',
        tagline: 'Shared spaces, shared responsibility',
        color: '#8E44AD',
        description: 'Public spaces belong to everyone. Learn how to respect parks, monuments, transport, and community areas.',
        notes: [
            { heading: 'Queue Discipline', text: 'Cutting lines is disrespectful. Politely enforcing queue discipline protects everyone\'s dignity and right to fair service. This is a fundamental civic value that impacts daily life in government offices, temples, hospitals, and public transport.' },
            { heading: 'Heritage Protection', text: 'Defacing protected monuments is a criminal offence under AMASRA 1958, punishable by up to 2 years imprisonment. Carved graffiti causes irreversible damage to heritage. War memorials deserve utmost respect — climbing or joking there is deeply inappropriate.' },
            { heading: 'Public Transport Etiquette', text: 'Let people EXIT before ENTERING elevators, trains, and buses — blocking exits creates dangerous bottlenecks. Use headphones for music — playing speakers in public transport violates others\' right to peace. Priority seats exist for elderly, pregnant, and disabled persons.' },
            { heading: 'Noise and Silence Zones', text: 'Loudspeakers cannot operate between 10 PM and 6 AM under Noise Pollution Rules 2000. Libraries, hospitals, and religious places are silence zones. Phone conversations should be taken outside in quiet spaces.' },
            { heading: 'Public Hygiene', text: 'Public spitting spreads tuberculosis (India has the world\'s highest burden). Public urination fines range from Rs 5,000-10,000. Leave public toilets as you would want to find them. Disfiguring currency notes is a criminal offence under RBI Act Section 35A.' },
            { heading: 'Disability and Inclusion', text: 'The Supreme Court ruled that persons with disabilities are exempt from standing during the National Anthem. People with speech impediments, mobility issues, or other disabilities deserve patience and accommodation in all public spaces.' },
            { heading: 'Street Vendors and Public Access', text: 'The Street Vendors Act 2014 provides for organized vending through designated zones, balancing hawkers\' livelihood rights with pedestrian access. Child begging is often run by exploitation rackets — contact Childline 1098 instead of giving money.' },
            { heading: 'Shared Resources', text: 'The tragedy of the commons means shared resources degrade when everyone uses but no one maintains them. Public Wi-Fi, parks, community halls, and beaches require fair and considerate use from all.' },
            { heading: 'Democracy in Practice', text: 'In housing societies and community meetings, true democracy means majority rules but minority voices must be heard. Positive feedback for honest government officers encourages good governance. Animal Birth Control (ABC) programmes are the humane solution for stray animal management.' },
        ],
        points: [
            'Wait in queues — cutting lines is disrespectful to others',
            'Keep noise levels down in libraries, hospitals, and public transport',
            'Do not deface or vandalise monuments, walls, or public property',
            'Let people exit before entering elevators, trains, and buses',
            'Respect rules and signage at public gardens, beaches, and religious places'
        ]
    },
    {
        id: 'socialEtiquette',
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="28" height="28">
                <path d="M16 4c0 1.1.9 2 2 2a2 2 0 002-2 2 2 0 00-2-2c-1.1 0-2 .9-2 2z" />
                <path d="M6 4a2 2 0 110 4 2 2 0 010-4z" />
                <path d="M2 17l4-4 2 2 4-4 4 4 2-2 4 4" />
                <path d="M2 22h20" />
            </svg>
        ),
        title: 'Social Etiquette',
        tagline: 'Kindness is the best civic sense',
        color: '#2980B9',
        description: 'Good social behaviour builds strong communities. Learn to interact with empathy, respect, and decency.',
        notes: [
            { heading: 'Respecting Service Workers', text: 'Delivery drivers, domestic helpers, security guards, and restaurant staff deserve empathy and respect. Acknowledge tough conditions (rain, heat). Address everyone by name — dismissive terms reflect poorly on your character, not theirs.' },
            { heading: 'Labour Rights Awareness', text: 'Security guards are protected by the Minimum Wages Act and deserve regulated hours and weekly offs. Service charges at restaurants are voluntary per Ministry of Consumer Affairs — different from GST. Know your consumer rights.' },
            { heading: 'Food Waste Crisis', text: 'India wastes 68 million tonnes of food annually while 189 million are undernourished. Use RSVP culture for events, cook with 20% buffer, and donate leftovers to reduce waste. The India Global Hunger Index rank (111th) demands mindful consumption.' },
            { heading: 'Challenging Discrimination', text: 'Caste-based discrimination violates Article 15 and 17 of the Constitution in ALL contexts — personal, social, and professional. Regional accent mockery, gender discrimination, and religious stereotyping are harmful forms of prejudice. Bystander intervention against harassment is a civic duty.' },
            { heading: 'Mental Health Awareness', text: 'Take depression and anxiety seriously. Listen without judgement and encourage professional help. Telling someone to just think positive is dismissive and harmful. Mental health awareness is a modern civic value.' },
            { heading: 'Elder Care and Inclusivity', text: 'Proactive help for the elderly is a core social value — carry bags, assist with lifts, and check on isolated seniors. Include minority families in community celebrations. True democracy means every voice is heard.' },
            { heading: 'Consumer Awareness', text: 'Always check medicine expiry dates — both pharmacist (legal duty) and consumer (self-responsibility) should verify. Railway berth etiquette: upper berths anytime, lower and middle berths shared as seats until 9 PM.' },
            { heading: 'Standing Against Wrong', text: 'Dr. Ambedkar taught that dignity is non-negotiable regardless of power dynamics. Challenge sexism, casteism, and religious mockery respectfully but firmly. Silence in the face of injustice normalizes it.' },
        ],
        points: [
            'Treat service workers — delivery persons, helpers, drivers — with respect',
            'Say "please", "thank you", and "sorry" — basic courtesy matters',
            'Stand against discrimination based on caste, gender, or religion',
            'Help the elderly, disabled, and those in need when you can',
            'Avoid food wastage at events and restaurants — take only what you need'
        ]
    },
    {
        id: 'digitalCivics',
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="28" height="28">
                <rect x="2" y="3" width="20" height="14" rx="2" />
                <path d="M8 21h8" />
                <path d="M12 17v4" />
                <path d="M7 8h4" />
                <path d="M7 11h6" />
            </svg>
        ),
        title: 'Digital Civic Behaviour',
        tagline: 'Be responsible online',
        color: '#E67E22',
        description: 'The internet is a public space too. Learn responsible digital behaviour and online ethics.',
        notes: [
            { heading: 'Fighting Misinformation', text: 'Always verify health claims, political news, and viral forwards from official sources (WHO, ICMR, government websites). Deepfake technology can create convincingly false videos. Verify through multiple credible sources before believing or sharing.' },
            { heading: 'Data Protection Rights', text: 'The Digital Personal Data Protection Act 2023 gives Indian citizens rights to access, correct, and erase personal data held by organizations, and to withdraw consent. Lock biometrics through mAadhaar app if your Aadhaar is compromised.' },
            { heading: 'Cybercrime Awareness', text: 'Phishing: government agencies NEVER request sensitive data through email links. OTP fraud: banks NEVER ask for OTPs — if anyone asks, contact the bank directly. Report cybercrimes at cybercrime.gov.in.' },
            { heading: 'Privacy and Consent', text: 'Ask permission before posting someone\'s photo online. Using someone else\'s photo as your profile without consent violates privacy rights. The right to be forgotten allows individuals to request deletion of personal data.' },
            { heading: 'Digital Content Rights', text: 'Film piracy (including cam prints) is a criminal offence under the Copyright Act 1957 with up to 3 years imprisonment. Pirated e-books deny authors their rightful earnings. Creating social media accounts in a celebrity\'s name is impersonation under IT Act Section 66D.' },
            { heading: 'Online Safety', text: 'Public Wi-Fi is vulnerable to man-in-the-middle attacks — use mobile data for banking. Unnecessary app permissions (camera, contacts for a calculator) are red flags for data harvesting. VPNs are legal in India but do not make illegal content legal.' },
            { heading: 'Digital Wellbeing', text: 'Collaborative screen time limit-setting is more effective than device bans. Parents modeling healthy digital habits is the strongest influence on children. Cyberbullying is punishable under the IT Act — document evidence and report.' },
            { heading: 'Fighting Fake News and Hate', text: 'Fake political accounts and propaganda undermine democracy — report regardless of political affiliation. Online hate speech is punishable under IPC sections 153A, 295A and has triggered real-world violence in India. Fake reviews (positive or negative) deceive consumers.' },
        ],
        points: [
            'Verify information before sharing — stop the spread of fake news',
            'Do not engage in cyberbullying, trolling, or online harassment',
            'Respect privacy — do not share personal data without consent',
            'Use constructive language in online discussions and debates',
            'Report phishing, scams, and harmful content to the platform'
        ]
    },
    {
        id: 'moralValues',
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="28" height="28">
                <path d="M12 2L15 8.5 22 9.5 17 14.5 18 21.5 12 18 6 21.5 7 14.5 2 9.5 9 8.5z" />
            </svg>
        ),
        title: 'Everyday Moral Values',
        tagline: 'Character is what you do when no one is watching',
        color: '#16A085',
        description: 'Build strong moral character through honesty, integrity, and compassion in your daily life.',
        notes: [
            { heading: 'Honesty and Integrity', text: 'Return extra change, report found items, and be truthful in all dealings. Resume fraud is dishonest and takes opportunities from qualified candidates. Integrity means doing the right thing even when nobody is watching and it is inconvenient.' },
            { heading: 'Indian Philosophical Foundations', text: 'Ahimsa (non-violence) extends to physical, verbal, emotional, and mental violence against all living beings. Vasudhaiva Kutumbakam teaches universal brotherhood beyond national and religious boundaries. Nishkama Karma (Bhagavad Gita) means acting with integrity without attachment to results.' },
            { heading: 'Anti-Corruption Stand', text: 'Every bribe paid strengthens the corruption ecosystem. The Whistle Blowers Protection Act 2014 provides legal protection to those who expose corruption. Refusing bribes and reporting through anti-corruption helplines is moral courage.' },
            { heading: 'Compassion for All Life', text: 'Indian tradition emphasizes universal animal compassion — not selective kindness based on cultural preference. The Seva (selfless service) tradition means serving others without expectation of reward. Gratitude for honest service reinforces a culture of integrity.' },
            { heading: 'Environmental Stewardship', text: 'Ancient concepts like Prithvi Sukta (Rig Veda) and reverence for rivers, trees, and mountains as sacred make environmental conservation a deep moral duty in Indian tradition, not just a modern idea.' },
            { heading: 'Standing for Justice', text: 'Dr. Ambedkar taught that dignity is non-negotiable regardless of power dynamics. True patriotism means loving your country enough to improve it through honest criticism and civic participation. Moral courage means challenging injustice regardless of the wrongdoer\'s power.' },
            { heading: 'The Golden Rule', text: 'Do not do to others what you would not have them do to you — this principle exists in Hinduism, Buddhism, Jainism, Islam, Christianity, and Sikhism. Caste discrimination is the deepest moral stain in Indian society — opposing it is both moral and constitutional duty.' },
            { heading: 'Building Character', text: 'Children who learn to earn develop stronger character, financial literacy, and life skills. Peer pressure resistance is a mark of moral strength. Forgiveness frees the forgiver from anger but does not mean tolerating repeated wrong. As Dr. Kalam taught, passionate purpose transforms both individual and society.' },
        ],
        points: [
            'Be honest in all dealings — return extra change, report found items',
            'Show compassion towards animals and the environment',
            'Forgive genuinely when someone apologises sincerely',
            'Stand up against corruption — do not give or accept bribes',
            'Take responsibility for your mistakes instead of blaming others'
        ]
    }
];

function Learn() {
    const [expandedModules, setExpandedModules] = useState(new Set());

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            },
            { threshold: 0.1 }
        );

        document.querySelectorAll('.learn-reveal').forEach(el => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    const toggleModule = (id) => {
        setExpandedModules(prev => {
            const next = new Set(prev);
            if (next.has(id)) {
                next.delete(id);
            } else {
                next.add(id);
            }
            return next;
        });
    };

    return (
        <div className="learn-page">
            <section className="learn-hero">
                <div className="container">
                    <span className="badge badge-accent learn-reveal">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16" style={{ marginRight: '6px', verticalAlign: 'middle' }}>
                            <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
                            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
                        </svg>
                        Learning Modules
                    </span>
                    <h1 className="learn-reveal">Explore <span className="text-gradient">Civic Values</span></h1>
                    <p className="learn-reveal">6 comprehensive modules with detailed notes to help you become a more responsible and aware citizen. Read the notes before attempting the quiz!</p>
                </div>
            </section>

            <section className="learn-modules section">
                <div className="container">
                    <div className="modules-grid">
                        {modules.map((mod, index) => (
                            <div
                                key={mod.id}
                                className={`module-card ${expandedModules.has(mod.id) ? 'expanded' : ''}`}
                                style={{ '--module-color': mod.color }}
                            >
                                <div className="module-header" onClick={() => toggleModule(mod.id)}>
                                    <div className="module-icon-wrapper">
                                        <span className="module-icon">{mod.icon}</span>
                                    </div>
                                    <div className="module-header-text">
                                        <h3>{mod.title}</h3>
                                        <p className="module-tagline">{mod.tagline}</p>
                                    </div>
                                    <div className={`module-toggle ${expandedModules.has(mod.id) ? 'open' : ''}`}>
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="18" height="18">
                                            <path d="M6 9l6 6 6-6" />
                                        </svg>
                                    </div>
                                </div>

                                <div className={`module-content ${expandedModules.has(mod.id) ? 'show' : ''}`}>
                                    <p className="module-desc">{mod.description}</p>

                                    {mod.notes && (
                                        <div className="module-notes">
                                            <h4>
                                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16" style={{ marginRight: '6px', verticalAlign: 'middle' }}>
                                                    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                                                    <polyline points="14 2 14 8 20 8" />
                                                    <line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" />
                                                    <polyline points="10 9 9 9 8 9" />
                                                </svg>
                                                Study Notes — Read Before Quiz
                                            </h4>
                                            <div className="notes-list">
                                                {mod.notes.map((note, i) => (
                                                    <div key={i} className="note-item">
                                                        <strong>{note.heading}:</strong> {note.text}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    <div className="module-points">
                                        <h4>
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16" style={{ marginRight: '6px', verticalAlign: 'middle' }}>
                                                <polyline points="9 11 12 14 22 4" />
                                                <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
                                            </svg>
                                            Key Takeaways
                                        </h4>
                                        <ul>
                                            {mod.points.map((point, i) => (
                                                <li key={i}>
                                                    <span className="point-check">
                                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" width="14" height="14">
                                                            <polyline points="20 6 9 17 4 12" />
                                                        </svg>
                                                    </span>
                                                    {point}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Learn;
