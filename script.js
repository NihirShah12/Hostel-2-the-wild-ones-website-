const leaderboardData = [
    { competition: "Guest Reviews", standings: 1, points: 98, gcCompetitionName: "ReviewMaster", category: "Overall" },
    { competition: "Customer Satisfaction", standings: 2, points: 92, gcCompetitionName: "Satisfaction Champ", category: "Overall" },
    { competition: "Occupancy Rate", standings: 3, points: 85, gcCompetitionName: "Occupancy Guru", category: "Overall" },
    { competition: "Social Media Engagement", standings: 4, points: 75, gcCompetitionName: "Socialite", category: "Overall" },
    { competition: "Tech Challenge", standings: 1, points: 100, gcCompetitionName: "Tech Wizard", category: "Tech" },
    { competition: "Coding Contest", standings: 2, points: 95, gcCompetitionName: "Code Master", category: "Tech" },
    { competition: "Cultural Fest", standings: 1, points: 90, gcCompetitionName: "Cultural Guru", category: "Culturals" },
    { competition: "Sports Competition", standings: 2, points: 80, gcCompetitionName: "Sports Star", category: "Sports" },
];

const leaderboardTable = document.getElementById("leaderboard");
const leaderboardBody = document.getElementById("leaderboard-body");
const filterSelect = document.getElementById("filter");


const overallTab = document.getElementById("overall-tab");
const techTab = document.getElementById("tech-tab");
const culturalsTab = document.getElementById("culturals-tab");
const sportsTab = document.getElementById("sports-tab");

const tabButtons = document.querySelectorAll(".tab-button");

function generateLeaderboard(categoryFilter = "Overall") {
    leaderboardBody.innerHTML = '';

    const selectedFilter = filterSelect.value;

    let filteredData = [...leaderboardData];

    if (categoryFilter !== "Overall") {
        filteredData = filteredData.filter(entry => entry.category === categoryFilter);
    }


    filteredData.sort((a, b) => {
        if (selectedFilter === 'points') {
            if (a.points !== b.points) {
                return b.points - a.points;
            }
  
            return a.standings - b.standings;
        } else if (selectedFilter === 'standings') {
            if (a.standings !== b.standings) {
                return a.standings - b.standings;
            }
   
            return b.points - a.points;
        }
    });

    for (const entry of filteredData) {
        const row = leaderboardBody.insertRow();
        const competitionCell = row.insertCell(0);
        const standingsCell = row.insertCell(1);
        const pointsCell = row.insertCell(2);
        const gcCompetitionNameCell = row.insertCell(3);

        competitionCell.innerHTML = entry.competition;
        standingsCell.innerHTML = entry.standings;
        pointsCell.innerHTML = entry.points;
        gcCompetitionNameCell.innerHTML = entry.gcCompetitionName;
    }
}


tabButtons.forEach(tabButton => {
    tabButton.addEventListener('click', () => {
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabButton.classList.add('active');
        const category = tabButton.getAttribute('data-category');
        generateLeaderboard(category);
    });
});

filterSelect.addEventListener('change', () => {
    const activeTab = document.querySelector('.tab-button.active');
    const category = activeTab.getAttribute('data-category');
    generateLeaderboard(category);
});

generateLeaderboard();
