export const buttonListDummyData = [
    {
        id: '1',
        name: 'All Sports',
        icon: ''
    },
    {
        id: '2',
        name: 'Football',
        icon: '⚽️'
    },
    {
        id: '3',
        name: 'Basketball',
        icon: '🏀'
    },
    {
        id: '4',
        name: 'Tennis',
        icon: '🎾'
    },
    {
        id: '5',
        name: 'Am. Football',
        icon: '🏈'
    },
    {
        id: '6',
        name: 'Hockey',
        icon: '🏒'
    },
    {
        id: '7',
        name: 'Baseball',
        icon: '⚾️'
    },
]

export const predictionsDummyData = [
    {
      sport: "Football",
      league: "Ligue 1",
      timeAgo: "12m",
      user: {
        name: "John Wayne",
        username: "johnwayne",
        avatar: "https://i.pravatar.cc/150?img=3",
        verified: true,
        winRate: "84%",
        tips: 1250,
      },
      match: {
        home: "RC Lens",
        away: "Paris SG",
      },
      prediction: {
        title:
          "Player To Score A Goal At Any Time: Mateta, Jean-Philippe – Yes",
        odd: 2.56,
      },
      stats: {
        likes: 44,
      },
    },
    {
      sport: "Football",
      league: "Ligue 1",
      timeAgo: "12m",
      user: {
        name: "John Wayne",
        username: "johnwayne",
        avatar: "https://i.pravatar.cc/150?img=3",
        verified: true,
        winRate: "84%",
        tips: 1250,
      },
      match: {
        home: "RC Lens",
        away: "Paris SG",
      },
      prediction: {
        title:
          "Player To Score A Goal At Any Time: Mateta, Jean-Philippe – Yes",
        odd: 2.56,
      },
      stats: {
        likes: 44,
      },
    },
    {
      sport: "Football",
      league: "Ligue 1",
      timeAgo: "12m",
      user: {
        name: "John Wayne",
        username: "johnwayne",
        avatar: "https://i.pravatar.cc/150?img=3",
        verified: true,
        winRate: "84%",
        tips: 1250,
      },
      match: {
        home: "RC Lens",
        away: "Paris SG",
      },
      prediction: {
        title:
          "Player To Score A Goal At Any Time: Mateta, Jean-Philippe – Yes",
        odd: 2.56,
      },
      stats: {
        likes: 44,
      },
    },
  ]

export const savedPredictionsDummyData = [
  {
    sport: "Football",
    league: "Ligue 1",
    timeAgo: "12m",
    user: {
      name: "John Wayne",
      username: "johnwayne",
      avatar: "https://i.pravatar.cc/150?img=3",
      verified: true,
      winRate: "84%",
      tips: 1250,
    },
    match: {
      home: "RC Lens",
      away: "Paris SG",
    },
    prediction: {
      title:
        "Player To Score A Goal At Any Time: Mateta, Jean-Philippe – Yes",
      odd: 2.56,
    },
    stats: {
      likes: 44,
    },
  },
  {
    sport: "Basketball",
    league: "USA / NBA",
    timeAgo: "44m",
    user: {
      name: "John Wayne",
      username: "johnwayne",
      avatar: "https://i.pravatar.cc/150?img=3",
      verified: true,
      winRate: "87%",
      tips: 101,
    },
    match: {
      home: "Boston Celtics",
      away: "Milwaukee Bucks",
    },
    prediction: {
      title: "Over/Under – Over 225.5 Points",
      odd: 2.55,
    },
    stats: {
      likes: 430,
    },
  },
  {
    sport: "Football",
    league: "Spain / La Liga",
    timeAgo: "1h",
    user: {
      name: "John Wayne",
      username: "johnwayne",
      avatar: "https://i.pravatar.cc/150?img=3",
      verified: true,
      winRate: "46%",
      tips: 258,
    },
    match: {
      home: "Barcelona",
      away: "Athletic Club",
    },
    prediction: {
      title: "Barcelona",
      odd: 1.24,
    },
    stats: {
      likes: 0,
    },
  },
];

// Current user profile (for Profile landing & Edit)
export const currentUserProfile = {
  displayName: "XCV",
  username: "bettinggod",
  email: "johndoe@gmail.com",
  phone: "+39 801 234 5678",
  phoneVerified: false,
  country: "England",
  countryCode: "GB",
  joinDate: "05 Jan, 2025",
  bio: "Data-driven punter. I bet on stats, trends & form, not gut. Big accas & smart singles. No sure things, just sharp analysis & calculated risks.",
  avatar: "https://i.pravatar.cc/150?img=3",
  verified: false,
  followingCount: 12,
  followersCount: 643,
};

// Users shown on Following page (list of people you follow / search)
export const followingListDummyData = [
  {
    id: "1",
    name: "John Wayne",
    username: "johnwayne",
    avatar: "https://i.pravatar.cc/150?img=3",
    verified: true,
    bio: "Data-driven punter. I bet on stats, trends & form, not gut. Big accas & smart singles. No sure things, just sharp analysis & calculated risks.",
    winRate: "84%",
    winRateColor: "green" as const,
    tipsCount: 1250,
    isFollowing: true,
  },
  {
    id: "2",
    name: "Jack Clouseau",
    username: "jacktips",
    avatar: "https://i.pravatar.cc/150?img=5",
    verified: false,
    bio: "Sports betting strategist 🎯 Turning odds into opportunities. Live for the thrill, stats, and the next big win 💰 #BetSmart #PuntersLife",
    winRate: "49%",
    winRateColor: "red" as const,
    tipsCount: 38,
    isFollowing: false,
  },
  {
    id: "3",
    name: "Jack Clouseau",
    username: "jacktips",
    avatar: "https://i.pravatar.cc/150?img=5",
    verified: false,
    bio: "Just a punter chasing value bets and good vibes 🍀 Football addict ⚽ Odds whisperer 💬 Wins, losses, lessons, all part of the game!",
    winRate: "53%",
    winRateColor: "yellow" as const,
    tipsCount: 38,
    isFollowing: true,
  },
  {
    id: "4",
    name: "Andres Munoz",
    username: "andresss",
    avatar: "https://i.pravatar.cc/150?img=8",
    verified: false,
    bio: "Sports betting analyst | Data-driven punter 📈 Focused on long-term profit, discipline, and the edge hidden in the numbers 📊",
    winRate: "78%",
    winRateColor: "green" as const,
    tipsCount: 258,
    isFollowing: false,
  },
];

// Settings & Preferences rows
export const settingsPreferencesRows = [
  { key: "language", label: "Language", value: "English", icon: "language" },
  { key: "changePassword", label: "Change Password", icon: "lock" },
  { key: "notifications", label: "Notifications Settings", icon: "bell" },
  { key: "verifyAccount", label: "Verify Your Account", icon: "badge" },
  { key: "oddsFormat", label: "Odds Format", value: "Decimal Odds (2.50)", icon: "chart" },
  { key: "timezone", label: "Timezone", value: "Africa/Lagos (UTC +01:00)", icon: "globe" },
  { key: "bookiesFor", label: "Bookies For", value: "Netherlands", icon: "bookies", flag: "🇳🇱" },
];

// Support rows
export const supportRows = [
  { key: "privacy", label: "Privacy Policy", icon: "support" },
  { key: "terms", label: "Terms of Use", icon: "support" },
  { key: "helpCentre", label: "Help Centre", icon: "support" },
  { key: "community", label: "Community Guidelines", icon: "support" },
  { key: "reportBug", label: "Report a bug", icon: "bug" },
  { key: "featureSuggestion", label: "Feature Suggestion", icon: "bug" },
];

// Rankings leaderboard data
export const rankingsDummyData = [
  {
    id: "1",
    name: "John Wayne",
    username: "johnwayne",
    avatar: "https://i.pravatar.cc/150?img=3",
    verified: true,
    winRate: 98,
    tipsCount: 1024,
    rank: 1,
  },
  {
    id: "2",
    name: "Jack Closeau",
    username: "jacktips",
    avatar: "https://i.pravatar.cc/150?img=5",
    verified: true,
    winRate: 96,
    tipsCount: 1250,
    rank: 2,
  },
  {
    id: "3",
    name: "Alani Mann",
    username: "alanibetting",
    avatar: "https://i.pravatar.cc/150?img=8",
    verified: true,
    winRate: 95,
    tipsCount: 865,
    rank: 3,
  },
  {
    id: "4",
    name: "Andres Munoz",
    username: "andresss",
    avatar: "https://i.pravatar.cc/150?img=12",
    verified: true,
    winRate: 94,
    tipsCount: 767,
    rank: 4,
  },
  {
    id: "5",
    name: "Cenk Tosun",
    username: "cenkkk",
    avatar: "https://i.pravatar.cc/150?img=15",
    verified: true,
    winRate: 94,
    tipsCount: 829,
    rank: 5,
  },
  {
    id: "6",
    name: "Maria Santos",
    username: "mariabets",
    avatar: "https://i.pravatar.cc/150?img=20",
    verified: true,
    winRate: 92,
    tipsCount: 542,
    rank: 6,
  },
  {
    id: "7",
    name: "David Kim",
    username: "davidtips",
    avatar: "https://i.pravatar.cc/150?img=33",
    verified: true,
    winRate: 91,
    tipsCount: 623,
    rank: 7,
  },
  {
    id: "8",
    name: "Emma Wilson",
    username: "emmawins",
    avatar: "https://i.pravatar.cc/150?img=25",
    verified: true,
    winRate: 90,
    tipsCount: 456,
    rank: 8,
  },
];

// Rankings filter options
export const rankingsFilterOptions = {
  sports: [
    { value: "all", label: "All Sports" },
    { value: "football", label: "Football" },
    { value: "basketball", label: "Basketball" },
    { value: "tennis", label: "Tennis" },
    { value: "hockey", label: "Hockey" },
    { value: "baseball", label: "Baseball" },
  ],
  timeframe: [
    { value: "all-time", label: "All-Time" },
    { value: "this-month", label: "This Month" },
    { value: "this-week", label: "This Week" },
    { value: "last-30-days", label: "Last 30 Days" },
    { value: "last-90-days", label: "Last 90 Days" },
  ],
  sortBy: [
    { value: "tips", label: "No. of Tips" },
    { value: "winrate", label: "Win Rate" },
    { value: "followers", label: "Followers" },
  ],
};

export const onboardingScreensData = [
  {
    title: "Win Money By Predicting Correctly",
    description:
      "Top 3 predictors each month get 50k, 35k, and 15k respectively",
    imageSrc: "/images/onboarding/onBoarding1.svg",
    imageAlt: "Win Money By Predicting Correctly",
  },
  {
    title: "Save Tips for Later",
    description:
      "Save the Tips you like, so you can easily revisit them whenever you're ready.",
    imageSrc: "/images/onboarding/onBoarding2.svg",
    imageAlt: "Save Tips for Later",
  },
  {
    title: "Track Your Performance",
    description:
      "Monitor your prediction accuracy and improve your skills over time with detailed statistics.",
    imageSrc: "/images/onboarding/onBoarding3.svg",
    imageAlt: "Track Your Performance",
  },
  {
    title: "Follow Your Favorite Tipsters",
    description:
      "Stay updated with your favorite Tipsters and get notified when they share new predictions.",
    imageSrc: "/images/onboarding/onBoarding4.svg",
    imageAlt: "Follow Your Favorite Tipsters",
  },
 
]