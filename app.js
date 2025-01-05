// Daily predictions data
const predictions = [
    {
        category: "Weather",
        prediction: "Sunny with a high of 25°C.",
    },
    {
        category: "Sports",
        prediction: "Team A is likely to win against Team B.",
    },
    {
        category: "Stock Market",
        prediction: "Tech stocks expected to rise by 2% today.",
    },
    {
        category: "Trivia",
        prediction: "90% of people prefer coffee over tea in the mornings!",
    },
];

// Function to display predictions
function displayPredictions() {
    const container = document.getElementById("predictions-container");
    container.innerHTML = ""; // Clear loading text

    predictions.forEach((item) => {
        const div = document.createElement("div");
        div.className = "prediction";
        div.innerHTML = `
            <h2>${item.category}</h2>
            <p>${item.prediction}</p>
        `;
        container.appendChild(div);
    });
}

// Load predictions on page load
displayPredictions();