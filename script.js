
const videos = [
    {
        id: "dQw4w9WgXcQ",
        title: "Rick Astley - Never Gonna Give You Up (Official Video)",
        channel: "Rick Astley",
        views: "1.4B views",
        time: "16 years ago",
        duration: "3:32"
    },
    {
        id: "9bZkp7q19f0",
        title: "PSY - GANGNAM STYLE(강남스타일) M/V",
        channel: "officialpsy",
        views: "4.8B views",
        time: "12 years ago",
        duration: "4:12"
    },
    {
        id: "kJQP7kiw5Fk",
        title: "Luis Fonsi - Despacito ft. Daddy Yankee",
        channel: "LuisFonsiVEVO",
        views: "8.2B views",
        time: "7 years ago",
        duration: "4:41"
    },
    {
        id: "JGwWNGJdvx8",
        title: "Ed Sheeran - Shape of You (Official Video)",
        channel: "Ed Sheeran",
        views: "6.0B views",
        time: "8 years ago",
        duration: "3:53"
    },
    {
        id: "fJ9rUzIMcZQ",
        title: "Queen - Bohemian Rhapsody (Official Video Remastered)",
        channel: "Queen Official",
        views: "1.9B views",
        time: "14 years ago",
        duration: "5:55"
    },
    {
        id: "hTWKbfoikeg",
        title: "Nirvana - Smells Like Teen Spirit (Official Music Video)",
        channel: "Nirvana",
        views: "1.7B views",
        time: "13 years ago",
        duration: "5:01"
    }
];

let sidebarCollapsed = false;
let currentVideos = [...videos];

function init() {
    console.log('Initializing YouTube clone...');
    renderVideos(currentVideos);
    setupEventListeners();
    checkScreenSize();
}

function renderVideos(videosToRender) {
    const videoGrid = document.getElementById('videoGrid');
    if (!videoGrid) {
        console.error('Video grid not found');
        return;
    }
    
    videoGrid.innerHTML = '';
    
    videosToRender.forEach((video, index) => {
        const videoCard = createVideoCard(video, index);
        videoGrid.appendChild(videoCard);
    });
}

function createVideoCard(video, index) {
    const videoCard = document.createElement('div');
    videoCard.className = 'video-card';
    videoCard.setAttribute('tabindex', index === 0 ? '0' : '-1');
    
    const thumbnailUrls = [
        `https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`,
        `https://img.youtube.com/vi/${video.id}/hqdefault.jpg`,
        `https://img.youtube.com/vi/${video.id}/mqdefault.jpg`
    ];
    
    videoCard.innerHTML = `
        <div class="video-thumbnail">
            <img src="${thumbnailUrls[0]}" alt="${video.title}" loading="lazy" 
                 onerror="this.onerror=null; this.src='${thumbnailUrls[1]}'; if(this.src.includes('hqdefault') && this.complete && this.naturalWidth === 0) this.src='${thumbnailUrls[2]}';">
            <div class="video-duration">${video.duration}</div>
        </div>
        <div class="video-info">
            <div class="video-title">${video.title}</div>
            <div class="video-channel">${video.channel}</div>
            <div class="video-meta">${video.views} • ${video.time}</div>
        </div>
    `;
    
    videoCard.addEventListener('click', (e) => {
        e.preventDefault();
        console.log('Video card clicked:', video.title);
        openVideoModal(video);
    });
    
    videoCard.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            openVideoModal(video);
        }
    });
    
    return videoCard;
}

function openVideoModal(video) {
    console.log('Opening modal for:', video.title);
    
    const videoModal = document.getElementById('videoModal');
    const modalVideo = document.getElementById('modalVideo');
    const modalTitle = document.getElementById('modalTitle');
    const modalChannel = document.getElementById('modalChannel');
    const modalViews = document.getElementById('modalViews');
    const modalTime = document.getElementById('modalTime');
    
    if (!videoModal || !modalVideo) {
        console.error('Modal elements not found');
        return;
    }
    
    const embedUrl = `https://www.youtube.com/embed/${video.id}?autoplay=1&rel=0&modestbranding=1`;
    
    modalVideo.src = embedUrl;
    modalTitle.textContent = video.title;
    modalChannel.textContent = video.channel;
    modalViews.textContent = video.views;
    modalTime.textContent = video.time;
    
    videoModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    const modalClose = document.getElementById('modalClose');
    if (modalClose) {
        modalClose.focus();
    }
}

function closeVideoModal() {
    console.log('Closing modal');
    
    const videoModal = document.getElementById('videoModal');
    const modalVideo = document.getElementById('modalVideo');
    
    if (!videoModal) {
        console.error('Modal not found');
        return;
    }
    
    videoModal.classList.remove('active');
    if (modalVideo) {
        modalVideo.src = '';
    }
    document.body.style.overflow = '';
}

function toggleSidebar() {
    console.log('Toggling sidebar');
    
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.getElementById('mainContent');
    
    if (!sidebar || !mainContent) {
        console.error('Sidebar or main content not found');
        return;
    }
    
    const isDesktop = window.innerWidth >= 1024;
    const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;
    const isMobile = window.innerWidth < 768;
    
    if (isMobile) {
        const isActive = sidebar.classList.contains('active');
        sidebar.classList.toggle('active');
        
        let overlay = document.querySelector('.sidebar-overlay');
        if (!isActive) {
            if (!overlay) {
                overlay = document.createElement('div');
                overlay.className = 'sidebar-overlay';
                overlay.addEventListener('click', toggleSidebar);
                document.body.appendChild(overlay);
            }
            setTimeout(() => overlay.classList.add('active'), 10);
            document.body.classList.add('sidebar-open');
        } else {
            if (overlay) {
                overlay.classList.remove('active');
                setTimeout(() => {
                    if (overlay.parentNode) {
                        overlay.parentNode.removeChild(overlay);
                    }
                }, 300);
            }
            document.body.classList.remove('sidebar-open');
        }
    } else {
        sidebarCollapsed = !sidebarCollapsed;
        document.body.classList.toggle('sidebar-collapsed', sidebarCollapsed);
        
        if (sidebarCollapsed || isTablet) {
            sidebar.style.width = '72px';
            mainContent.style.marginLeft = '72px';
        } else {
            sidebar.style.width = '240px';
            mainContent.style.marginLeft = '240px';
        }
    }
}

function searchVideos() {
    const searchInput = document.getElementById('searchInput');
    if (!searchInput) return;
    
    const query = searchInput.value.toLowerCase().trim();
    
    if (query === '') {
        currentVideos = [...videos];
    } else {
        currentVideos = videos.filter(video => 
            video.title.toLowerCase().includes(query) ||
            video.channel.toLowerCase().includes(query)
        );
    }
    
    renderVideos(currentVideos);
}

function checkScreenSize() {
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.getElementById('mainContent');
    
    if (!sidebar || !mainContent) return;
    
    const isDesktop = window.innerWidth >= 1024;
    const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;
    const isMobile = window.innerWidth < 768;
    
    sidebar.classList.remove('active');
    document.body.classList.remove('sidebar-collapsed', 'sidebar-open');
    
    const overlay = document.querySelector('.sidebar-overlay');
    if (overlay && overlay.parentNode) {
        overlay.parentNode.removeChild(overlay);
    }
    
    if (isMobile) {
        sidebar.style.width = '240px';
        mainContent.style.marginLeft = '0';
    } else if (isTablet) {
        sidebar.style.width = '72px';
        mainContent.style.marginLeft = '72px';
        sidebarCollapsed = true;
    } else {
        sidebar.style.width = sidebarCollapsed ? '72px' : '240px';
        mainContent.style.marginLeft = sidebarCollapsed ? '72px' : '240px';
    }
}

function setupEventListeners() {
    console.log('Setting up event listeners');
    
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    if (hamburgerBtn) {
        hamburgerBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleSidebar();
        });
    }
    
    const modalClose = document.getElementById('modalClose');
    const modalOverlay = document.getElementById('modalOverlay');
    
    if (modalClose) {
        modalClose.addEventListener('click', (e) => {
            e.preventDefault();
            closeVideoModal();
        });
    }
    
    if (modalOverlay) {
        modalOverlay.addEventListener('click', (e) => {
            e.preventDefault();
            closeVideoModal();
        });
    }
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const videoModal = document.getElementById('videoModal');
            if (videoModal && videoModal.classList.contains('active')) {
                closeVideoModal();
            }
        }
    });
    
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', searchVideos);
        searchInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                searchVideos();
            }
        });
    }
    
    const searchBtn = document.querySelector('.search-btn');
    if (searchBtn) {
        searchBtn.addEventListener('click', (e) => {
            e.preventDefault();
            searchVideos();
        });
    }
    
    window.addEventListener('resize', checkScreenSize);
    
    const sidebarItems = document.querySelectorAll('.sidebar-item');
    sidebarItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            sidebarItems.forEach(si => si.classList.remove('active'));
            item.classList.add('active');
            
            if (window.innerWidth < 768) {
                setTimeout(() => {
                    const sidebar = document.getElementById('sidebar');
                    if (sidebar && sidebar.classList.contains('active')) {
                        toggleSidebar();
                    }
                }, 150);
            }
        });
    });
}

document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        const videoModal = document.getElementById('videoModal');
        if (videoModal && videoModal.classList.contains('active')) {
            closeVideoModal();
        }
    }
});

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}