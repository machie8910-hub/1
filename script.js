// Video data
const videos = [
    {
        title: 'Video Tutorial JavaScript',
        url: 'https://www.w3schools.com/html/mov_bbb.mp4',
        description: 'Panduan lengkap belajar JavaScript dari dasar hingga mahir',
        views: 2500,
        likes: 450
    },
    {
        title: 'Web Development Tips',
        url: 'https://www.w3schools.com/html/movie.mp4',
        description: 'Tips dan trik menjadi web developer profesional di era digital',
        views: 5200,
        likes: 920
    },
    {
        title: 'CSS Advanced Techniques',
        url: 'https://www.w3schools.com/html/mov_bbb.mp4',
        description: 'Teknik CSS lanjutan untuk membuat desain responsif dan modern',
        views: 3800,
        likes: 680
    },
    {
        title: 'HTML5 Fundamentals',
        url: 'https://www.w3schools.com/html/mov_bbb.mp4',
        description: 'Fondasi HTML5 yang lengkap untuk pemula',
        views: 4100,
        likes: 750
    }
];

// Get DOM elements
const videoPlayer = document.getElementById('videoPlayer');
const playBtn = document.getElementById('playBtn');
const pauseBtn = document.getElementById('pauseBtn');
const fullscreenBtn = document.getElementById('fullscreenBtn');
const videoTitle = document.getElementById('videoTitle');
const videoDescription = document.getElementById('videoDescription');

// Play button functionality
playBtn.addEventListener('click', () => {
    videoPlayer.play();
    playBtn.style.backgroundColor = '#666';
    pauseBtn.style.backgroundColor = '#e50914';
});

// Pause button functionality
pauseBtn.addEventListener('click', () => {
    videoPlayer.pause();
    pauseBtn.style.backgroundColor = '#666';
    playBtn.style.backgroundColor = '#e50914';
});

// Fullscreen button functionality
fullscreenBtn.addEventListener('click', () => {
    if (videoPlayer.requestFullscreen) {
        videoPlayer.requestFullscreen();
    } else if (videoPlayer.webkitRequestFullscreen) {
        videoPlayer.webkitRequestFullscreen();
    } else if (videoPlayer.mozRequestFullScreen) {
        videoPlayer.mozRequestFullScreen();
    } else if (videoPlayer.msRequestFullscreen) {
        videoPlayer.msRequestFullscreen();
    }
});

// Update UI when video is playing
videoPlayer.addEventListener('play', () => {
    playBtn.style.backgroundColor = '#666';
    pauseBtn.style.backgroundColor = '#e50914';
});

// Update UI when video is paused
videoPlayer.addEventListener('pause', () => {
    pauseBtn.style.backgroundColor = '#666';
    playBtn.style.backgroundColor = '#e50914';
});

// Play video function
function playVideo(index) {
    if (index >= 0 && index < videos.length) {
        const video = videos[index];
        videoPlayer.src = video.url;
        videoTitle.textContent = video.title;
        videoDescription.textContent = video.description;
        
        // Update stats
        document.querySelector('.video-stats').innerHTML = `
            <span class="stat">👁️ ${video.views.toLocaleString()} Views</span>
            <span class="stat">👍 ${video.likes.toLocaleString()} Likes</span>
            <span class="stat">💬 ${Math.floor(video.likes * 0.3)} Komentar</span>
        `;
        
        // Auto play
        videoPlayer.play();
        playBtn.style.backgroundColor = '#666';
        pauseBtn.style.backgroundColor = '#e50914';
        
        // Scroll to player
        document.querySelector('.player-section').scrollIntoView({ behavior: 'smooth' });
    }
}

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if (e.target === document.body) {
        switch(e.key.toLowerCase()) {
            case ' ':
                e.preventDefault();
                if (videoPlayer.paused) {
                    videoPlayer.play();
                } else {
                    videoPlayer.pause();
                }
                break;
            case 'f':
                fullscreenBtn.click();
                break;
            case 'arrowleft':
                videoPlayer.currentTime -= 5;
                break;
            case 'arrowright':
                videoPlayer.currentTime += 5;
                break;
            case 'arrowup':
                videoPlayer.volume = Math.min(videoPlayer.volume + 0.1, 1);
                break;
            case 'arrowdown':
                videoPlayer.volume = Math.max(videoPlayer.volume - 0.1, 0);
                break;
        }
    }
});

// Initialize
window.addEventListener('DOMContentLoaded', () => {
    playBtn.style.backgroundColor = '#e50914';
    
    // Add smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Add animation to category cards on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeIn 0.6s ease-in';
            }
        });
    });

    document.querySelectorAll('.category-card').forEach(card => {
        observer.observe(card);
    });
});

// Add CSS animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// Console info
console.log('🎬 StreamHub - Video Streaming Platform');
console.log('Keyboard shortcuts:');
console.log('Space - Play/Pause');
console.log('F - Fullscreen');
console.log('Arrow Left - Rewind 5s');
console.log('Arrow Right - Forward 5s');
console.log('Arrow Up - Volume Up');
console.log('Arrow Down - Volume Down');