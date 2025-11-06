/**
 * @typedef Freelancer
 * @property {string} name
 * @property {string} occupation
 * @property {number} rate
 */

// Constants
const NAMES = ["Alice", "Bob", "Carol", "David", "Eve", "Frank", "Grace", "Henry"];
const OCCUPATIONS = ["Writer", "Teacher", "Programmer", "Designer", "Consultant", "Tutor"];
const MIN_RATE = 30;
const MAX_RATE = 100;
const NUM_FREELANCERS = 5;

// Function to generate random freelancer
function generateFreelancer() {
    const randomName = NAMES[Math.floor(Math.random() * NAMES.length)];
    const randomOccupation = OCCUPATIONS[Math.floor(Math.random() * OCCUPATIONS.length)];
    const randomRate = Math.floor(Math.random() * (MAX_RATE - MIN_RATE + 1)) + MIN_RATE;
    
    return {
        name: randomName,
        occupation: randomOccupation,
        rate: randomRate
    };
}

// Initialize state
let freelancers = Array.from({ length: NUM_FREELANCERS }, generateFreelancer);

// Function to calculate average rate
function calculateAverageRate() {
    if (freelancers.length === 0) return 0;
    
    const total = freelancers.reduce((sum, freelancer) => sum + freelancer.rate, 0);
    return (total / freelancers.length).toFixed(2);
}

// Initialize average rate state
let averageRate = calculateAverageRate();

// Component for single freelancer
function Freelancer({ name, occupation, rate }) {
    const freelancerElement = document.createElement('tr');
    freelancerElement.className = 'freelancer';
    freelancerElement.innerHTML = `
        <td class="name">${name}</td>
        <td class="occupation">${occupation}</td>
        <td class="rate">$${rate}/hr</td>
    `;
    return freelancerElement;
}

// Component for freelancers array
function FreelancerRows() {
    const tbody = document.createElement('tbody');
    tbody.id = 'FreelancerRows';
    
    freelancers.forEach(freelancer => {
        tbody.appendChild(Freelancer(freelancer));
    });
    
    return tbody;
}

// Component for average rate
function AverageRate() {
    const averageElement = document.createElement('div');
    averageElement.className = 'average-rate';
    averageElement.innerHTML = `
        <h2>Average Starting Rate: $${averageRate}/hr</h2>
        <p>Based on ${freelancers.length} freelancers</p>
    `;
    return averageElement;
}

// Main app component
function App() {
    const appElement = document.createElement('div');
    appElement.id = 'app';
    appElement.innerHTML = `
        <header>
            <h1>Freelancer Forum</h1>
        </header>
        <main>
            <section class="average-section"></section>
            <section class="freelancers-section">
                <h2>Available Freelancers</h2>
                <table class="freelancers-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Occupation</th>
                            <th>Hourly Rate</th>
                        </tr>
                    </thead>
                </table>
            </section>
        </main>
    `;
    
    return appElement;
}

// Render function
function render() {
    const $app = document.getElementById('app');
    
    if (!$app) {
        // Create app if it doesn't exist
        const app = App();
        document.body.appendChild(app);
    }
    
    // Update average rate section
    const averageSection = document.querySelector('.average-section');
    if (averageSection) {
        averageSection.replaceWith(AverageRate());
    } else {
        document.querySelector('main').insertBefore(AverageRate(), document.querySelector('.freelancers-section'));
    }
    
    // Update freelancers table
    const table = document.querySelector('.freelancers-table');
    if (table) {
        const existingTbody = table.querySelector('tbody');
        if (existingTbody) {
            existingTbody.replaceWith(FreelancerRows());
        } else {
            table.appendChild(FreelancerRows());
        }
    }
}

// Add some CSS for styling
const style = document.createElement('style');
style.textContent = `
    #app {
        font-family: Arial, sans-serif;
        max-width: 800px;
        margin: 0 auto;
        padding: 20px;
    }
    
    header {
        text-align: center;
        margin-bottom: 30px;
    }
    
    h1 {
        color: #333;
        border-bottom: 2px solid #007bff;
        padding-bottom: 10px;
    }
    
    .average-rate {
        background: #f8f9fa;
        padding: 20px;
        border-radius: 8px;
        margin-bottom: 30px;
        text-align: center;
        border-left: 4px solid #007bff;
    }
    
    .average-rate h2 {
        margin: 0;
        color: #007bff;
    }
    
    .freelancers-table {
        width: 100%;
        border-collapse: collapse;
        margin-top: 20px;
    }
    
    .freelancers-table th {
        background: #007bff;
        color: white;
        padding: 12px;
        text-align: left;
    }
    
    .freelancers-table td {
        padding: 12px;
        border-bottom: 1px solid #ddd;
    }
    
    .freelancers-table tr:hover {
        background: #f5f5f5;
    }
    
    .rate {
        color: #28a745;
        font-weight: bold;
    }
    
    .name {
        font-weight: bold;
    }
    
    .occupation {
        color: #666;
    }
`;
document.head.appendChild(style);

// Initial render
render();

// Optional: Add new freelancers every 5 seconds to demonstrate dynamic updates
setInterval(() => {
    freelancers.push(generateFreelancer());
    averageRate = calculateAverageRate();
    render();
}, 5000);