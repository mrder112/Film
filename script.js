// Функция для открытия видео в модальном окне
function openVideo(videoId) {
  const modal = document.getElementById('videoModal');
  const videoFrame = document.getElementById('videoFrame');
  videoFrame.src = `https://rutube.ru/play/embed/${videoId}/?skinColor=fdd835`;
  modal.style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

// Функция для закрытия видео
function closeVideo() {
  const modal = document.getElementById('videoModal');
  const videoFrame = document.getElementById('videoFrame');
  videoFrame.src = '';
  modal.style.display = 'none';
  document.body.style.overflow = 'auto';
}

// Закрытие модального окна при клике вне видео
window.onclick = function(event) {
  const modal = document.getElementById('videoModal');
  if (event.target == modal) {
    closeVideo();
  }
} 