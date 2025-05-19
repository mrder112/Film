// Здесь может быть другой JavaScript код, если он понадобится в будущем 

document.addEventListener('DOMContentLoaded', function() {
    const reviewsScroll = document.querySelector('.reviews-scroll');
    const prevButton = document.querySelector('.reviews-nav-button.prev');
    const nextButton = document.querySelector('.reviews-nav-button.next');
    let isDown = false;
    let startX;
    let scrollLeft;
    let isDragging = false;
    let touchStartX;
    let touchEndX;

    // Функция для прокрутки к следующему/предыдущему отзыву
    function scrollToReview(direction) {
        const cardWidth = reviewsScroll.querySelector('.review-card').offsetWidth + 20; // 20px - gap
        const currentScroll = reviewsScroll.scrollLeft;
        const targetScroll = direction === 'next' 
            ? currentScroll + cardWidth 
            : currentScroll - cardWidth;
        
        reviewsScroll.scrollTo({
            left: targetScroll,
            behavior: 'smooth'
        });
    }

    // Обработчики для кнопок
    prevButton.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        scrollToReview('prev');
    });
    
    nextButton.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        scrollToReview('next');
    });

    // Функция для обработки начала перетаскивания
    function handleDragStart(e) {
        isDown = true;
        isDragging = false;
        startX = e.type === 'mousedown' ? e.pageX : e.touches[0].pageX;
        scrollLeft = reviewsScroll.scrollLeft;
        reviewsScroll.style.cursor = 'grabbing';
        e.preventDefault();
    }

    // Функция для обработки перетаскивания
    function handleDragMove(e) {
        if (!isDown) return;
        e.preventDefault();
        isDragging = true;
        const x = e.type === 'mousemove' ? e.pageX : e.touches[0].pageX;
        const walk = (startX - x);
        reviewsScroll.scrollLeft = scrollLeft + walk;
    }

    // Функция для обработки окончания перетаскивания
    function handleDragEnd(e) {
        if (!isDown) return;
        isDown = false;
        reviewsScroll.style.cursor = 'grab';
        
        if (!isDragging) {
            return;
        }
        
        e.preventDefault();
    }

    // Функция для обработки свайпа на мобильных устройствах
    function handleTouchStart(e) {
        touchStartX = e.touches[0].clientX;
    }

    function handleTouchMove(e) {
        if (!touchStartX) return;
        touchEndX = e.touches[0].clientX;
    }

    function handleTouchEnd(e) {
        if (!touchStartX || !touchEndX) return;
        
        const swipeDistance = touchStartX - touchEndX;
        const minSwipeDistance = 50; // Минимальное расстояние для свайпа
        
        if (Math.abs(swipeDistance) > minSwipeDistance) {
            if (swipeDistance > 0) {
                scrollToReview('next');
            } else {
                scrollToReview('prev');
            }
        }
        
        touchStartX = null;
        touchEndX = null;
    }

    // Добавляем обработчики событий для мыши
    reviewsScroll.addEventListener('mousedown', handleDragStart);
    reviewsScroll.addEventListener('mousemove', handleDragMove);
    reviewsScroll.addEventListener('mouseup', handleDragEnd);
    reviewsScroll.addEventListener('mouseleave', handleDragEnd);

    // Добавляем обработчики событий для сенсорных устройств
    reviewsScroll.addEventListener('touchstart', handleTouchStart, { passive: true });
    reviewsScroll.addEventListener('touchmove', handleTouchMove, { passive: true });
    reviewsScroll.addEventListener('touchend', handleTouchEnd, { passive: true });

    // Предотвращаем стандартное поведение для предотвращения выделения текста
    reviewsScroll.addEventListener('selectstart', (e) => {
        if (isDown) {
            e.preventDefault();
        }
    });

    // Остальной код для обработки видео и отзывов
    const reviewCards = document.querySelectorAll('.review-card');
    let currentlyPlayingVideo = null;

    reviewCards.forEach(card => {
        const video = card.querySelector('video');
        const playButton = card.querySelector('.play-button');
        const expandButton = card.querySelector('.expand-button');
        const reviewText = card.querySelector('.review-text');
        const videoCircle = card.querySelector('.video-circle');

        if (video && playButton) {
            video.addEventListener('click', (e) => {
                if (isDragging) return;
                e.stopPropagation();
                if (!video.paused) {
                    video.pause();
                    currentlyPlayingVideo = null;
                    videoCircle.classList.remove('is-playing');
                }
            });

            playButton.addEventListener('click', (e) => {
                if (isDragging) return;
                e.stopPropagation();
                if (currentlyPlayingVideo && currentlyPlayingVideo !== video) {
                    currentlyPlayingVideo.pause();
                    const prevCard = currentlyPlayingVideo.closest('.review-card');
                    if (prevCard) {
                        prevCard.querySelector('.video-circle').classList.remove('is-playing');
                    }
                }
                video.play();
                currentlyPlayingVideo = video;
                videoCircle.classList.add('is-playing');
            });

            video.addEventListener('ended', () => {
                video.currentTime = 0;
                currentlyPlayingVideo = null;
                videoCircle.classList.remove('is-playing');
            });
        }

        if (expandButton && reviewText) {
            expandButton.addEventListener('click', (e) => {
                if (isDragging) return;
                e.stopPropagation();
                reviewText.classList.toggle('expanded');
                expandButton.classList.toggle('expanded');
            });

            reviewText.addEventListener('click', (e) => {
                if (isDragging) return;
                e.stopPropagation();
                reviewText.classList.toggle('expanded');
                expandButton.classList.toggle('expanded');
            });
        }
    });
}); 