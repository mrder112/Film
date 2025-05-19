// Здесь может быть другой JavaScript код, если он понадобится в будущем 

document.addEventListener('DOMContentLoaded', function() {
    const reviewCards = document.querySelectorAll('.review-card');
    let currentlyPlayingVideo = null;

    // Обработчики для карточек отзывов
    reviewCards.forEach(card => {
        const video = card.querySelector('video');
        const playButton = card.querySelector('.play-button');
        const pauseButton = card.querySelector('.pause-button');
        const expandButton = card.querySelector('.expand-button');
        const reviewText = card.querySelector('.review-text');

        // Обработка кнопок воспроизведения/паузы
        playButton.addEventListener('click', (e) => {
            e.stopPropagation();
            
            // Останавливаем предыдущее видео, если оно есть
            if (currentlyPlayingVideo && currentlyPlayingVideo !== video) {
                currentlyPlayingVideo.pause();
                const prevPlayButton = currentlyPlayingVideo.parentElement.querySelector('.play-button');
                const prevPauseButton = currentlyPlayingVideo.parentElement.querySelector('.pause-button');
                prevPlayButton.style.display = 'flex';
                prevPauseButton.style.display = 'none';
            }
            
            // Воспроизводим новое видео
            video.play();
            currentlyPlayingVideo = video;
            playButton.style.display = 'none';
            pauseButton.style.display = 'flex';
        });

        pauseButton.addEventListener('click', (e) => {
            e.stopPropagation();
            video.pause();
            currentlyPlayingVideo = null;
            pauseButton.style.display = 'none';
            playButton.style.display = 'flex';
        });

        // Сброс состояния видео при его окончании
        video.addEventListener('ended', () => {
            video.currentTime = 0;
            currentlyPlayingVideo = null;
            pauseButton.style.display = 'none';
            playButton.style.display = 'flex';
        });

        // Обработка кнопки разворачивания текста
        if (expandButton && reviewText) {
            expandButton.addEventListener('click', (e) => {
                e.stopPropagation();
                reviewText.classList.toggle('expanded');
                expandButton.classList.toggle('expanded');
            });
        }
    });
}); 