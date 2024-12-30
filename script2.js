// Select elements
const banner = document.querySelector('.banner');
const slider = document.querySelector('.slider');
const model = document.querySelector('.model');
const content = document.querySelector('.content');
const author = document.querySelector('.author');
const audio = document.getElementById('audio');

// Create a container for the buttons
const buttonContainer = document.createElement('div');
buttonContainer.style.position = 'absolute';
buttonContainer.style.top = '10px';
buttonContainer.style.right = '10px';
buttonContainer.style.display = 'flex';
buttonContainer.style.gap = '10px';
buttonContainer.style.zIndex = '10';

// Define the buttons
const buttons = [
    { src: './images/rewind.png', alt: 'Rewind', id: 'rewind' },
    { src: './images/play.png', alt: 'Play/Pause', id: 'playPause' },
    { src: './images/fastf.png', alt: 'Fast Forward', id: 'fastForward' }
];

buttons.forEach(button => {
    const imgButton = document.createElement('img');
    imgButton.src = button.src;
    imgButton.alt = button.alt;
    imgButton.id = button.id;
    imgButton.style.width = '50px';
    imgButton.style.height = '50px';
    imgButton.style.cursor = 'pointer';
    buttonContainer.appendChild(imgButton);
});

// Append the button container to the banner
banner.appendChild(buttonContainer);

// Add event listeners for the buttons
let isPlaying = false;
let rewindActive = false;
let fastForwardActive = false;
let rewindInterval = null;

// Play/Pause functionality
document.getElementById('playPause').addEventListener('click', () => {
    if (isPlaying) {
        audio.pause();
        isPlaying = false;
    } else {
        audio.play();
        isPlaying = true;
    }
});

// Rewind functionality
document.getElementById('rewind').addEventListener('click', () => {
    if (rewindActive) {
        clearInterval(rewindInterval);
        rewindInterval = null;
        rewindActive = false;
        if (isPlaying) audio.play();
    } else {
        rewindInterval = setInterval(() => {
            audio.currentTime = Math.max(0, audio.currentTime - 0.5);
        }, 50);
        rewindActive = true;
        if (!isPlaying) audio.pause();
    }
});

// Fast Forward functionality
document.getElementById('fastForward').addEventListener('click', () => {
    if (fastForwardActive) {
        audio.playbackRate = 1;
        fastForwardActive = false;
        if (!isPlaying) audio.pause();
    } else {
        audio.playbackRate = 5;
        fastForwardActive = true;
        if (!isPlaying) audio.play();
    }
});

// Hide elements with CSS classes when audio ends
audio.addEventListener('ended', () => {
    [slider, model, content, author, buttonContainer].forEach(el => {
        el.classList.add('disappear');
    });

    // Redirect to another website after animations
    setTimeout(() => {
        window.location.href = 'index3.html'; // Replace with your target URL
    }, 7000); // Matches the animation duration
});
