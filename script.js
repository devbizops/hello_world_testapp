// DOM elements
const nameInput = document.getElementById('nameInput');
const greetBtn = document.getElementById('greetBtn');
const resetBtn = document.getElementById('resetBtn');
const greetingText = document.getElementById('greetingText');
const greetingSubtext = document.getElementById('greetingSubtext');
const greetingDisplay = document.getElementById('greetingDisplay');

// Greeting messages
const greetings = [
    "Hello",
    "Hi there",
    "Welcome",
    "Greetings",
    "Hey",
    "Good to see you",
    "Nice to meet you"
];

const subtexts = [
    "Great to have you here!",
    "Hope you're having a wonderful day!",
    "Thanks for stopping by!",
    "You're looking great today!",
    "What a pleasure to see you!",
    "Hope your day is going well!",
    "You're absolutely amazing!"
];

// Emojis for variety
const emojis = ["👋", "😊", "🎉", "✨", "🌟", "💫", "🎊", "🙌"];

// Initialize the app
function init() {
    // Add event listeners
    greetBtn.addEventListener('click', handleGreet);
    resetBtn.addEventListener('click', handleReset);
    nameInput.addEventListener('keypress', handleKeyPress);
    
    // Add some initial animation
    setTimeout(() => {
        greetingDisplay.style.transform = 'scale(1.02)';
        setTimeout(() => {
            greetingDisplay.style.transform = 'scale(1)';
        }, 200);
    }, 1000);
}

// Handle greeting button click
function handleGreet() {
    const name = nameInput.value.trim();
    
    if (!name) {
        showError('Please enter your name first!');
        return;
    }
    
    // Generate personalized greeting
    const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)];
    const randomSubtext = subtexts[Math.floor(Math.random() * subtexts.length)];
    const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
    
    // Update greeting with animation
    animateGreeting(`${randomGreeting}, ${name}! ${randomEmoji}`, randomSubtext);
    
    // Store name in localStorage
    localStorage.setItem('lastName', name);
    
    // Add success animation
    addSuccessAnimation();
}

// Handle reset button click
function handleReset() {
    nameInput.value = '';
    greetingText.textContent = 'Hello, World! 👋';
    greetingSubtext.textContent = 'Welcome to your new app';
    
    // Remove stored name
    localStorage.removeItem('lastName');
    
    // Add reset animation
    addResetAnimation();
}

// Handle Enter key press
function handleKeyPress(event) {
    if (event.key === 'Enter') {
        handleGreet();
    }
}

// Animate greeting change
function animateGreeting(newGreeting, newSubtext) {
    // Fade out
    greetingText.style.opacity = '0';
    greetingSubtext.style.opacity = '0';
    
    setTimeout(() => {
        // Update content
        greetingText.textContent = newGreeting;
        greetingSubtext.textContent = newSubtext;
        
        // Fade in
        greetingText.style.opacity = '1';
        greetingSubtext.style.opacity = '1';
        
        // Add bounce animation
        greetingDisplay.style.transform = 'scale(1.05)';
        setTimeout(() => {
            greetingDisplay.style.transform = 'scale(1)';
        }, 200);
    }, 300);
}

// Show error message
function showError(message) {
    // Create error element
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    errorDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #ff6b6b;
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        z-index: 1000;
        animation: slideInRight 0.3s ease-out;
    `;
    
    document.body.appendChild(errorDiv);
    
    // Remove after 3 seconds
    setTimeout(() => {
        errorDiv.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => {
            document.body.removeChild(errorDiv);
        }, 300);
    }, 3000);
}

// Add success animation
function addSuccessAnimation() {
    // Add confetti effect
    createConfetti();
    
    // Add success sound (if available)
    playSuccessSound();
}

// Add reset animation
function addResetAnimation() {
    greetingDisplay.style.transform = 'rotate(5deg)';
    setTimeout(() => {
        greetingDisplay.style.transform = 'rotate(-5deg)';
        setTimeout(() => {
            greetingDisplay.style.transform = 'rotate(0deg)';
        }, 200);
    }, 200);
}

// Create confetti effect
function createConfetti() {
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57'];
    
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.style.cssText = `
                position: fixed;
                width: 10px;
                height: 10px;
                background: ${colors[Math.floor(Math.random() * colors.length)]};
                left: ${Math.random() * 100}vw;
                top: -10px;
                border-radius: 50%;
                pointer-events: none;
                z-index: 999;
                animation: confettiFall 3s linear forwards;
            `;
            
            document.body.appendChild(confetti);
            
            // Remove confetti after animation
            setTimeout(() => {
                if (confetti.parentNode) {
                    document.body.removeChild(confetti);
                }
            }, 3000);
        }, i * 50);
    }
}

// Play success sound (optional)
function playSuccessSound() {
    // This is a simple beep using Web Audio API
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
        oscillator.frequency.setValueAtTime(1000, audioContext.currentTime + 0.1);
        
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.2);
    } catch (e) {
        // Silently fail if audio is not supported
    }
}

// Load saved name on page load
function loadSavedName() {
    const savedName = localStorage.getItem('lastName');
    if (savedName) {
        nameInput.value = savedName;
        handleGreet();
    }
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    @keyframes confettiFall {
        to {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
        }
    }
    
    #greetingText, #greetingSubtext {
        transition: opacity 0.3s ease;
    }
`;
document.head.appendChild(style);

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    init();
    loadSavedName();
});

// Add some fun Easter eggs
let clickCount = 0;
greetingDisplay.addEventListener('click', () => {
    clickCount++;
    if (clickCount === 5) {
        greetingText.textContent = 'You found the secret! 🎉';
        greetingSubtext.textContent = 'You\'re awesome for clicking so much!';
        clickCount = 0;
    }
});
