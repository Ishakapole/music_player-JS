document.addEventListener('DOMContentLoaded', () => {
  const themeToggleButton = document.querySelector('a[onclick="toggleTheme()"]');
  const body = document.body;
  const storedTheme = localStorage.getItem('theme');

  if (storedTheme) {
    body.classList.add(storedTheme);
  }

  themeToggleButton.addEventListener('click', () => {
    if (body.classList.contains('light-mode')) {
      body.classList.remove('light-mode');
      localStorage.setItem('theme', 'dark-mode');
    } else {
      body.classList.add('light-mode');
      localStorage.setItem('theme', 'light-mode');
    }
  });
});
let currentTrackIndex = 0;
let isPlaying = false;
let updateTimer;
let playlists = {}; // Store playlists

const trackList = [
  {
    name: "The Night We Met",
    artist: "Lord Huron",
    image: "images/image1.jpg",
    path: "songs/The-Night-We-Met.mp3",
    lyrics: "Lyrics for The Night We Met..."
  },
  {
    name: "Nahin Milta",
    artist: "Bayaan",
    image: "images/image2.jpg",
    path: "songs/Nahin milta.mp3",
    lyrics: "Lyrics for Nahin Milta..."
  },
  {
    name: "Rewrite The Stars",
    artist: "Anne-Marie & James Arthur",
    image: "images/image3.jpg",
    path: "songs/Rewrite the stars.mp3",
    lyrics: "Lyrics for Rewrite The Stars..."
  },
  {
    name: "End of Beginning",
    artist: "Djo",
    image: "images/image4.jpg",
    path: "songs/End of Beginning.mp3",
    lyrics: "Lyrics for End of Beginning..."
  },
  {
    name: "I Wanna Be Yours",
    artist: "Arctic Monkeys",
    image: "images/image5.jpg",
    path: "songs/I wanna be yours.mp3",
    lyrics: "Lyrics for I Wanna Be Yours..."
  },
  {
    name: "Until I Found You",
    artist: "Stephen Sanchez",
    image: "images/image6.jpg",
    path: "songs/Until i found you.mp3",
    lyrics: "Lyrics for Until I Found You..."
  },
  {
    name: "Perfect",
    artist: "Ed Sheeran",
    image: "images/image7.jpg",
    path: "songs/Perfect.mp3",
    lyrics: "Lyrics for Perfect..."
  },
  {
    name: "Car’s Outside",
    artist: "James Arthur",
    image: "images/image8.jpg",
    path: "songs/Car's outside.mp3",
    lyrics: "Lyrics for Car’s Outside..."
  },
  {
    name: "Somewhere Only We Know",
    artist: "Keane",
    image: "images/image9.jpg",
    path: "songs/Somewhere only we know.mp3",
    lyrics: "Lyrics for Somewhere Only We Know..."
  },
  {
    name: "Tum Ho",
    artist: "Mohit Chauhan",
    image: "images/image10.jpg",
    path: "songs/Tum ho.mp3",
    lyrics: "Lyrics for Tum Ho..."
  }
];

const currTrack = document.createElement('audio');
const trackArt = document.querySelector('.track-art');
const trackName = document.querySelector('.track-name');
const trackArtist = document.querySelector('.track-artist');
const playPauseButton = document.querySelector('.playpause-track');
const nextButton = document.querySelector('.next-track');
const prevButton = document.querySelector('.prev-track');
const seekSlider = document.querySelector('.seek_slider');
const volumeSlider = document.querySelector('.volume_slider');
const currTime = document.querySelector('.current-time');
const totalDuration = document.querySelector('.total-duration');
const lyricsContainer = document.getElementById('lyrics');
const playlistContainer = document.getElementById('playlist');
const usernameDisplay = document.getElementById('usernameDisplay'); // Username display

const loadTrack = (index) => {
  clearInterval(updateTimer);
  resetValues();
  currTrack.src = trackList[index].path;
  currTrack.load();
  trackArt.style.backgroundImage = `url(${trackList[index].image})`;
  trackName.textContent = trackList[index].name;
  trackArtist.textContent = trackList[index].artist;
  updateTimer = setInterval(setUpdate, 1000);
  currTrack.addEventListener('ended', nextTrack);
  lyricsContainer.textContent = trackList[index].lyrics;
};

const resetValues = () => {
  currTime.textContent = "00:00";
  totalDuration.textContent = "00:00";
  seekSlider.value = 0;
};

const playpauseTrack = () => {
  if (!isPlaying) playTrack();
  else pauseTrack();
};

const playTrack = () => {
  currTrack.play();
  isPlaying = true;
  playPauseButton.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
};

const pauseTrack = () => {
  currTrack.pause();
  isPlaying = false;
  playPauseButton.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
};

const nextTrack = () => {
  if (currentTrackIndex < trackList.length - 1) currentTrackIndex += 1;
  else currentTrackIndex = 0;
  loadTrack(currentTrackIndex);
  playTrack();
};

const prevTrack = () => {
  if (currentTrackIndex > 0) currentTrackIndex -= 1;
  else currentTrackIndex = trackList.length - 1;
  loadTrack(currentTrackIndex);
  playTrack();
};

const seekTo = () => {
  let seekto = currTrack.duration * (seekSlider.value / 100);
  currTrack.currentTime = seekto;
};

const setVolume = () => {
  currTrack.volume = volumeSlider.value / 100;
};

const setUpdate = () => {
  let seekPosition = 0;
  if (!isNaN(currTrack.duration)) {
    seekPosition = currTrack.currentTime * (100 / currTrack.duration);
    seekSlider.value = seekPosition;
    let currentMinutes = Math.floor(currTrack.currentTime / 60);
    let currentSeconds = Math.floor(currTrack.currentTime - currentMinutes * 60);
    let durationMinutes = Math.floor(currTrack.duration / 60);
    let durationSeconds = Math.floor(currTrack.duration - durationMinutes * 60);
    if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
    if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
    if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
    if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }
    currTime.textContent = currentMinutes + ":" + currentSeconds;
    totalDuration.textContent = durationMinutes + ":" + durationSeconds;
  }
};

document.getElementById('toggle-lyrics-btn').addEventListener('click', function() {
  const lyricsContainer = document.getElementById('lyrics-container');
  
  // Toggle visibility
  if (lyricsContainer.classList.contains('hidden')) {
    lyricsContainer.classList.remove('hidden');
  } else {
    lyricsContainer.classList.add('hidden');
  }
});

// Function to update the lyrics (you can call this when a song is selected)
function updateLyrics(newLyrics) {
  document.getElementById('lyrics').innerText = newLyrics;
}


const toggleFavorite = () => {
  const favoriteButton = document.querySelector('.favorite-track');
  const isFavorited = favoriteButton.classList.toggle('favorited');
  if (isFavorited) {
    favoriteButton.style.color = 'yellow';
  } else {
    favoriteButton.style.color = '';
  }
};

const home = () => {
  alert("Home button clicked");
};

const openSearchModal = () => {
  document.getElementById('searchModal').style.display = 'block';
};

const closeSearchModal = () => {
  document.getElementById('searchModal').style.display = 'none';
};

const searchTracks = () => {
  const query = document.getElementById('searchInput').value.toLowerCase();
  const results = trackList.filter(track =>
    track.name.toLowerCase().includes(query) ||
    track.artist.toLowerCase().includes(query)
  );
  const searchResults = document.getElementById('searchResults');
  if (results.length === 0) {
    searchResults.innerHTML = '<p>Song not found</p>';
  } else {
    searchResults.innerHTML = results.map(track =>
      `<p onclick="playTrackFromSearch(${trackList.indexOf(track)})">${track.name} by ${track.artist}</p>`
    ).join('');
  }
};

const playTrackFromSearch = (index) => {
  currentTrackIndex = index;
  loadTrack(currentTrackIndex);
  playTrack();
};

const openSignUpModal = () => {
  document.getElementById('signUpModal').style.display = 'block';
};

const closeSignUpModal = () => {
  document.getElementById('signUpModal').style.display = 'none';
};

const signUpConfirmation = document.getElementById('signUpConfirmation');
const loginConfirmation = document.getElementById('loginConfirmation');

const signUp = () => {
  const username = document.getElementById('signUpUsername').value;
  const password = document.getElementById('signUpPassword').value;
  if (username && password) {
    console.log(`User signed up with username: ${username} and password: ${password}`);
    usernameDisplay.textContent = `Welcome, ${username}`; // Display username
    signUpConfirmation.textContent = 'You have successfully signed up!';
    signUpConfirmation.classList.add('confirmation-message');
    closeSignUpModal();
  } else {
    alert('Please fill in all fields.');
  }
};

const openLoginModal = () => {
  document.getElementById('loginModal').style.display = 'block';
};

const closeLoginModal = () => {
  document.getElementById('loginModal').style.display = 'none';
};

const login = () => {
  const username = document.getElementById('loginUsername').value;
  const password = document.getElementById('loginPassword').value;
  if (username && password) {
    console.log(`User logged in with username: ${username} and password: ${password}`);
    usernameDisplay.textContent = `Welcome, ${username}`; // Display username
    loginConfirmation.textContent = 'You have successfully logged in!';
    loginConfirmation.classList.add('confirmation-message');
    closeLoginModal();
  } else {
    alert('Please fill in all fields.');
  }
};

const loadPlaylist = () => {
  playlistContainer.innerHTML = ''; // Clear existing items
  trackList.forEach((track, index) => {
    const playlistItem = document.createElement('li');
    playlistItem.textContent = `${index + 1}. ${track.name} - ${track.artist}`;
    playlistItem.addEventListener('click', () => {
      currentTrackIndex = index;
      loadTrack(currentTrackIndex);
      playTrack();
    });
    playlistContainer.appendChild(playlistItem);
  });
};

window.onload = () => {
  loadTrack(currentTrackIndex);
  loadPlaylist(); // Call function to load playlist
};

const openTopChartsModal = () => {
  const topChartsContainer = document.getElementById('topChartsContainer');
  topChartsContainer.innerHTML = ''; // Clear existing content

  trackList.forEach(track => {
    const songItem = document.createElement('div');
    songItem.classList.add('song-item');
    
    songItem.innerHTML = `
      <img src="${track.image}" alt="${track.name}">
      <div>${track.name}</div>  
      <div>${track.artist}</div>
    `;
    
    topChartsContainer.appendChild(songItem);
  });

  document.getElementById('topChartsModal').style.display = 'block';
};

const closeTopChartsModal = () => {
  document.getElementById('topChartsModal').style.display = 'none';
};

function toggleTheme() {
  const body = document.querySelector('body');
  if (body.getAttribute('data-theme') === 'light') {
    body.setAttribute('data-theme', 'dark');
  } else {
    body.setAttribute('data-theme', 'light');
  }
}

document.addEventListener('DOMContentLoaded', function() {
  // Check if a theme is already set in localStorage
  const savedTheme = localStorage.getItem('theme') || 'light';
  document.body.setAttribute('data-theme', savedTheme);
});

// Add event listener for the theme toggle button
document.getElementById('theme-toggle').addEventListener('click', toggleTheme);

// JavaScript for theme toggle  
document.getElementById('theme-toggle').addEventListener('click', function () {
  document.body.classList.toggle('dark-mode');
});

document.addEventListener('DOMContentLoaded', () => {
  const themeToggle = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');
  const body = document.body;

  // Check the current theme from local storage
  const currentTheme = localStorage.getItem('theme') || 'light';
  body.dataset.theme = currentTheme;
  themeIcon.className = currentTheme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';

  themeToggle.addEventListener('click', () => {
    if (body.dataset.theme === 'light') {
      body.dataset.theme = 'dark';
      themeIcon.className = 'fas fa-moon';
      localStorage.setItem('theme', 'dark');
    } else {
      body.dataset.theme = 'light';
      themeIcon.className = 'fas fa-sun';
      localStorage.setItem('theme', 'light');
    }
  });
});


