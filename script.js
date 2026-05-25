// Video Playlist Data
const videos = [
    {
        title: 'Big Buck Bunny - Animasi 3D Berkualitas Tinggi',
        url: 'https://commondatastorage.googleapis.com/gtv-videos-library/sample/BigBuckBunny.mp4',
        description: 'Video animasi 3D klasik yang menampilkan karakter bunny lucu dengan grafis stunning. Sempurna untuk melihat kemampuan animasi 3D modern. Diproduksi oleh Blender Foundation.',
        views: 5200000,
        likes: 420000,
        duration: '9:56'
    },
    {
        title: 'Bar Animation Studio - Showcase Profesional',
        url: 'https://commondatastorage.googleapis.com/gtv-videos-library/sample/ForBiggerBlazes.mp4',
        description: 'Showcase profesional dari Bar Animation Studio yang menampilkan karya-karya terbaik animasi 3D untuk komersial dan film.',
        views: 3800000,
        likes: 280000,
        duration: '12:34'
    },
    {
        title: '3D Effects Showcase - Efek Visual Menakjubkan',
        url: 'https://commondatastorage.googleapis.com/gtv-videos-library/sample/ElephantsDream.mp4',
        description: 'Koleksi efek visual 3D yang memukau termasuk particle effects, lighting, dan simulasi fisika yang realistis.',
        views: 2900000,
        likes: 220000,
        duration: '8:45'
    },
    {
        title: 'Animation Design Trends - Tren Desain Terkini',
        url: 'https://commondatastorage.googleapis.com/gtv-videos-library/sample/ForBiggerBlazes.mp4',
        description: 'Eksplorasi tren terkini dalam dunia animasi 3D dan motion graphics. Dari character design hingga environment modeling.',
        views: 1500000,
        likes: 180000,
        duration: '11:22'
    },
    {
        title: 'Motion Graphics Masterclass - Panduan Lengkap',
        url: 'https://commondatastorage.googleapis.com/gtv-videos-library/sample/BigBuckBunny.mp4',
        description: 'Masterclass lengkap tentang motion graphics, mencakup teknik animasi, timing, dan storytelling visual.',
        views: 4100000,
        likes: 350000,
        duration: '15:10'
    },
    {
        title: 'Premium 3D Collection - Konten Eksklusif',
        url: 'https://commondatastorage.googleapis.com/gtv-videos-library/sample/ElephantsDream.mp4',
        description: 'Koleksi premium dari studio-studio animasi 3D terkemuka dunia dengan kualitas sinematik dan detail yang luar biasa.',
        views: 2200000,
        likes: 310000,
        duration: '10:33'
    }
];

// DOM Elements
const videoPlayer = document.getElementById('videoPlayer');
const playBtn = document.getElementById('playBtn');
const pauseBtn = document.getElementById('pauseBtn');
const fullscreenBtn = document.getElementById('fullscreenBtn');
const videoTitle = document.getElementById('videoTitle');
const videoDescription = document.getElementById('videoDescription');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initializePlayer();
    setupEventListeners();
});

// Initialize Player
function initializePlayer() {
    playBtn.style.backgroundColor = '#e50914';
    // Load first video
    if (videos.length > 0) {
        loadVideoInfo(0);
    }
}

// Setup Event Listeners
function setupEventListeners() {
    // Play/Pause buttons
    playBtn.addEventListener('click', () => {
        videoPlayer.play();
        updateButtonStates();
    });

    pauseBtn.addEventListener('click', () => {
        videoPlayer.pause();
        updateButtonStates();
    });

    // Fullscreen
    fullscreenBtn.addEventListener('click', toggleFullscreen);

    // Video events
    videoPlayer.addEventListener('play', updateButtonStates);
    videoPlayer.addEventListener('pause', updateButtonStates);
    videoPlayer.addEventListener('ended', () => {
        playNextVideo();
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', handleKeyboardShortcuts);

    // Smooth scroll for nav links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href !== '#player') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });

    // Intersection Observer for animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeIn 0.6s ease-in';
            }
        });
    });

    document.querySelectorAll('.category-card, .playlist-item').forEach(el => {
        observer.observe(el);
    });
}

// Update Button States
function updateButtonStates() {
    if (videoPlayer.paused) {
        playBtn.style.backgroundColor = '#e50914';
        pauseBtn.style.backgroundColor = '#666';
    } else {
        playBtn.style.backgroundColor = '#666';
        pauseBtn.style.backgroundColor = '#e50914';
    }
}

// Play Next Video
function playNextVideo() {
    const currentIndex = videos.findIndex(v => v.url === videoPlayer.src);
    if (currentIndex < videos.length - 1) {
        playVideo(currentIndex + 1);
    }
}

// Toggle Fullscreen
function toggleFullscreen() {
    const elem = videoPlayer;
    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen();
    } else if (elem.mozRequestFullScreen) {
        elem.mozRequestFullScreen();
    } else if (elem.msRequestFullscreen) {
        elem.msRequestFullscreen();
    }
}

// Load Video Information
function loadVideoInfo(index) {
    if (index >= 0 && index < videos.length) {
        const video = videos[index];
        videoPlayer.src = video.url;
        videoTitle.textContent = video.title;
        videoDescription.textContent = video.description;

        // Update stats
        document.querySelector('.video-stats').innerHTML = `
            <span class="stat">👁️ ${formatNumber(video.views)} Views</span>
            <span class="stat">👍 ${formatNumber(video.likes)} Likes</span>
            <span class="stat">💬 ${formatNumber(Math.floor(video.likes * 0.3))} Komentar</span>
        `;

        // Update meta
        document.querySelector('.video-meta').innerHTML = `
            <span class="meta-item">⏱️ ${video.duration} menit</span>
            <span class="meta-item">📺 1080p HD</span>
            <span class="meta-item">⭐ Rating: ${(4.5 + Math.random() * 0.5).toFixed(1)}/5</span>
        `;

        // Auto play
        videoPlayer.play();
        updateButtonStates();

        // Scroll to player
        document.querySelector('.player-section').scrollIntoView({ behavior: 'smooth' });
    }
}

// Play Video Function
function playVideo(index) {
    loadVideoInfo(index);
}

// Format Number
function formatNumber(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
}

// Handle Keyboard Shortcuts
function handleKeyboardShortcuts(e) {
    if (e.target === document.body || e.target === videoPlayer) {
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
                e.preventDefault();
                toggleFullscreen();
                break;
            case 'arrowleft':
                e.preventDefault();
                videoPlayer.currentTime = Math.max(0, videoPlayer.currentTime - 5);
                showNotification('⏪ Rewind 5s');
                break;
            case 'arrowright':
                e.preventDefault();
                videoPlayer.currentTime = Math.min(videoPlayer.duration, videoPlayer.currentTime + 5);
                showNotification('⏩ Forward 5s');
                break;
            case 'arrowup':
                e.preventDefault();
                videoPlayer.volume = Math.min(videoPlayer.volume + 0.1, 1);
                showNotification(`🔊 Volume: ${Math.round(videoPlayer.volume * 100)}%`);
                break;
            case 'arrowdown':
                e.preventDefault();
                videoPlayer.volume = Math.max(videoPlayer.volume - 0.1, 0);
                showNotification(`🔉 Volume: ${Math.round(videoPlayer.volume * 100)}%`);
                break;
            case 'm':
                e.preventDefault();
                videoPlayer.muted = !videoPlayer.muted;
                showNotification(videoPlayer.muted ? '🔇 Muted' : '🔊 Unmuted');
                break;
        }
    }
}

// Show Notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        background: rgba(0,0,0,0.8);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        font-weight: bold;
        z-index: 1000;
        animation: slideInUp 0.3s ease;
        pointer-events: none;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 2000);
}

// Add CSS for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInUp {
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

// Console Info
console.log('%c🎬 AnimaHub - 3D Animation Streaming Platform', 'color: #e50914; font-size: 16px; font-weight: bold;');
console.log('%c⌨️ Keyboard Shortcuts:', 'color: #e50914; font-weight: bold;');
console.log('SPACE - Play/Pause');
console.log('F - Fullscreen');
console.log('← - Rewind 5s');
console.log('→ - Forward 5s');
console.log('↑ - Volume Up');
console.log('↓ - Volume Down');
console.log('M - Mute/Unmute');
console.log('%c📊 Videos Available: ' + videos.length, 'color: #e50914; font-weight: bold;');