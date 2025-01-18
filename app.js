// Matches list you provided
const matches = [
    { home: "Brentford", away: "Liverpool" },
    { home: "Leicester City", away: "Fulham" },
    { home: "West Ham United", away: "Crystal Palace" },
    { home: "Arsenal", away: "Aston Villa" },
    { home: "Leganés", away: "Atlético Madrid" },
    { home: "Getafe", away: "Barcelona" },
    { home: "Real Betis", away: "Deportivo Alavés" },
    { home: "Bologna", away: "Monza" },
    { home: "Juventus", away: "Milan" },
    { home: "Atalanta", away: "Napoli" },
    { home: "1. FC Heidenheim", away: "FC St. Pauli" },
    { home: "FC Bayern München", away: "VfL Wolfsburg" },
    { home: "Holstein Kiel", away: "TSG Hoffenheim" },
    { home: "VfB Stuttgart", away: "SC Freiburg" },
    { home: "VfL Bochum 1848", away: "RB Leipzig" },
    { home: "Bayer 04 Leverkusen", away: "Borussia M'gladbach" },
    { home: "RC Lens", away: "Paris Saint-Germain" },
    { home: "Stade Rennais", away: "Stade Brestois" },
    { home: "Olympique Lyonnais", away: "Toulouse" },
    { home: "Rio Ave", away: "Sporting" },
    { home: "Santa Clara", away: "Estoril Praia" },
    { home: "PEC Zwolle", away: "PSV Eindhoven" },
    { home: "Beşiktaş", away: "Samsunspor" },
    { home: "Club Brugge KV", away: "K. Beerschot V.A" },
    { home: "Levante UD", away: "Granada" },
    { home: "Dunkerque", away: "Lorient" }
];

// Updated prediction logic
function predictMatchOutcome(home, away) {
    // Dummy data for team performance (goals scored / conceded per match)
    const teamStats = {
        "Brentford": { home: { attack: 1.3, defense: 1.4 }, away: { attack: 1.1, defense: 1.2 } },
        "Liverpool": { home: { attack: 2.2, defense: 1.0 }, away: { attack: 2.0, defense: 1.1 } },
        "Leicester City": { home: { attack: 1.7, defense: 1.5 }, away: { attack: 1.2, defense: 1.4 } },
        "Fulham": { home: { attack: 1.3, defense: 1.5 }, away: { attack: 1.1, defense: 1.3 } },
        "West Ham United": { home: { attack: 1.5, defense: 1.3 }, away: { attack: 1.2, defense: 1.4 } },
        "Crystal Palace": { home: { attack: 1.2, defense: 1.3 }, away: { attack: 1.1, defense: 1.5 } },
        "Arsenal": { home: { attack: 2.1, defense: 1.0 }, away: { attack: 1.9, defense: 1.2 } },
        "Aston Villa": { home: { attack: 1.7, defense: 1.2 }, away: { attack: 1.4, defense: 1.3 } },
        "Leganés": { home: { attack: 1.2, defense: 1.6 }, away: { attack: 1.0, defense: 1.5 } },
        "Atlético Madrid": { home: { attack: 1.8, defense: 0.8 }, away: { attack: 1.6, defense: 1.0 } },
        "Getafe": { home: { attack: 1.4, defense: 1.5 }, away: { attack: 1.2, defense: 1.3 } },
        "Barcelona": { home: { attack: 2.4, defense: 1.0 }, away: { attack: 2.3, defense: 1.2 } },
        "Real Betis": { home: { attack: 1.7, defense: 1.2 }, away: { attack: 1.4, defense: 1.5 } },
        "Deportivo Alavés": { home: { attack: 1.1, defense: 1.4 }, away: { attack: 0.9, defense: 1.6 } },
        // Add other teams' stats here...
    };

    // Home and Away performance
    const homeStats = teamStats[home]?.home || { attack: 1.0, defense: 1.0 };
    const awayStats = teamStats[away]?.away || { attack: 1.0, defense: 1.0 };

    // Calculate Expected Goals (based on attacking strength vs. opponent defense)
    const homeExpectedGoals = (homeStats.attack / awayStats.defense).toFixed(2);
    const awayExpectedGoals = (awayStats.attack / homeStats.defense).toFixed(2);

    // Generate 3 most probable scorelines based on expected goals
    const predictedScores = [
        `${home}: ${Math.round(homeExpectedGoals)} - ${away}: ${Math.round(awayExpectedGoals)}`,
        `${home}: ${Math.round(homeExpectedGoals) + 1} - ${away}: ${Math.round(awayExpectedGoals)}`,
        `${home}: ${Math.round(homeExpectedGoals)} - ${away}: ${Math.round(awayExpectedGoals) + 1}`
    ];

    return {
        match: `${home} vs ${away}`,
        homeExpectedGoals,
        awayExpectedGoals,
        predictedScores
    };
}

// Function to display matches and add "Start Prediction" button
function displayMatches() {
    const matchesContainer = document.getElementById('matches');
    
    matches.forEach(match => {
        const matchDiv = document.createElement('div');
        matchDiv.classList.add('match-container');
        
        // Displaying match name and Start Prediction button
        matchDiv.innerHTML = `
            <div>
                <div class="match-header">${match.home} vs ${match.away}</div>
                <div class="match-details">Click to start prediction</div>
            </div>
            <button class="button" onclick="startPrediction('${match.home}', '${match.away}')">Start Prediction</button>
            <div class="prediction-result" id="result-${match.home}-${match.away}">
                <div class="loader"></div> <span>Loading prediction...</span>
            </div>
        `;
        
        matchesContainer.appendChild(matchDiv);
    });
}

// Function to start the prediction when the button is clicked
function startPrediction(home, away) {
    const resultDiv = document.getElementById(`result-${home}-${away}`);
    resultDiv.style.display = 'block'; // Show the prediction result container
    
    // Simulate a slight delay before displaying results
    setTimeout(() => {
        const prediction = predictMatchOutcome(home, away);
        resultDiv.innerHTML = `
            <p><strong>Prediction:</strong></p>
            <ul>
                <li>Home Expected Goals: ${prediction.homeExpectedGoals}</li>
                <li>Away Expected Goals: ${prediction.awayExpectedGoals}</li>
            </ul>
            <p><strong>Exact Score Predictions:</strong></p>
            <ul>
                ${prediction.predictedScores.map(score => `<li>${score}</li>`).join('')}
            </ul>
        `;
    }, 2000); // Simulate 2 seconds delay for realistic response
}

// Display matches when the page loads
window.onload = displayMatches;
