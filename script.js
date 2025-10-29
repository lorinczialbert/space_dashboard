// This makes sure our code only runs after the HTML page is fully loaded
window.addEventListener('DOMContentLoaded', () => {
    fetchNasaApod();
    fetchNextLaunch();
    fetchCrew();
});

// --- 1. Fetch NASA Picture of the Day (APOD) ---
async function fetchNasaApod() {
    const apiKey = '0u9IHoRizWYgvfdzFZld2IN1RvY5q2OfloTDLooK'; // !!! PASTE YOUR KEY HERE !!!
    const url = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`;

    // Select the new HTML elements
    const loader = document.querySelector('#apod .loader');
    const content = document.querySelector('#apod .widget-content');
    
    try {
        const response = await fetch(url);
        const data = await response.json();
        
        // Put the data into our HTML
        document.getElementById('apod-image').src = data.hdurl;
        document.getElementById('apod-image').alt = data.title;
        document.getElementById('apod-title').textContent = data.title;
        document.getElementById('apod-explanation').textContent = data.explanation;

        // --- UPGRADE ---
        loader.style.display = 'none';    // Hide the loader
        content.style.display = 'block';  // Show the content

    } catch (error) {
        console.error('Error fetching APOD:', error);
        loader.textContent = 'Error loading APOD data.'; // Show error in loader
    }
}

// --- 2. Fetch SpaceX Next Launch ---
async function fetchNextLaunch() {
    const url = 'https://api.spacexdata.com/v5/launches/next';

    // Select the new HTML elements
    const loader = document.querySelector('#next-launch .loader');
    const content = document.querySelector('#next-launch .widget-content');

    try {
        const response = await fetch(url);
        const data = await response.json();

        // Put the data into our HTML
        document.getElementById('launch-name').textContent = data.name;
        document.getElementById('launch-date').textContent = new Date(data.date_utc).toLocaleString();
        document.getElementById('launch-details').textContent = data.details || 'No details available.';

        // --- UPGRADE ---
        loader.style.display = 'none';    // Hide the loader
        content.style.display = 'block';  // Show the content

    } catch (error) {
        console.error('Error fetching next launch:', error);
        loader.textContent = 'Error loading launch data.';
    }
}

// --- 3. Fetch SpaceX Crew ---
async function fetchCrew() {
    const url = 'https://api.spacexdata.com/v4/crew';
    
    // Select the new HTML elements
    const loader = document.querySelector('#crew .loader');
    const content = document.querySelector('#crew .widget-content');
    const listEl = document.getElementById('crew-list');

    try {
        const response = await fetch(url);
        const data = await response.json();
        listEl.innerHTML = ''; // Clear list

        data.forEach(member => {
            const li = document.createElement('li');
            li.innerHTML = `
                <img src="${member.image}" alt="${member.name}">
                <div>
                    <strong>${member.name}</strong>
                    <br>
                    <span>${member.agency}</span>
                    <br>
                    <a href="${member.wikipedia}" target="_blank">View Bio &rarr;</a>
                </div>
            `;
            listEl.appendChild(li);
        });

        // --- UPGRADE ---
        loader.style.display = 'none';    // Hide the loader
        content.style.display = 'block';  // Show the content

    } catch (error)
    {
        console.error('Error fetching crew:', error);
        loader.textContent = 'Error loading crew data.';
    }
}