(() => {
    'use strict';

    let currentImages = [];
    let currentIndex = -1;

    function getTriggerImage(trigger) {
        if (!trigger) return null;
        return trigger.matches('img') ? trigger : trigger.querySelector('img');
    }

    function getImageSource(image) {
        if (!image) return '';

        const source = image.dataset.fullSrc || image.currentSrc || image.src;

        try {
            return new URL(source, document.baseURI).href;
        } catch (error) {
            return source;
        }
    }

    function getGroupTriggers(trigger) {
        const group = trigger.dataset.lightboxGroup;
        const allTriggers = Array.from(document.querySelectorAll('[data-lightbox]'));

        if (!group) return [trigger];
        return allTriggers.filter((item) => item.dataset.lightboxGroup === group);
    }

    function buildImageList(trigger) {
        return getGroupTriggers(trigger)
            .map((item) => {
                const image = getTriggerImage(item);
                if (!image) return null;
                return {
                    src: getImageSource(image),
                    alt: image.alt || 'Popup preview'
                };
            })
            .filter(Boolean);
    }

    function updateLightbox(modal) {
        const image = modal.querySelector('#lightboxImage');
        if (!image || currentIndex < 0 || currentIndex >= currentImages.length) return;

        image.src = currentImages[currentIndex].src;
        image.alt = currentImages[currentIndex].alt;

        const navigationButtons = modal.querySelectorAll('[data-lightbox-nav]');
        navigationButtons.forEach((button) => {
            button.hidden = currentImages.length < 2;
        });
    }

    function openLightbox(trigger) {
        const modal = document.getElementById('imageModal');
        const clickedImage = getTriggerImage(trigger);
        if (!modal || !clickedImage) return;

        currentImages = buildImageList(trigger);
        const clickedSource = getImageSource(clickedImage);
        currentIndex = currentImages.findIndex((item) => item.src === clickedSource);

        if (currentIndex < 0) {
            currentImages.unshift({
                src: clickedSource,
                alt: clickedImage.alt || 'Popup preview'
            });
            currentIndex = 0;
        }

        updateLightbox(modal);

        if (typeof modal.showModal === 'function') {
            modal.showModal();
        } else {
            modal.setAttribute('open', '');
        }
    }

    function closeLightbox() {
        const modal = document.getElementById('imageModal');
        if (!modal) return;

        if (typeof modal.close === 'function' && modal.open) {
            modal.close();
        } else {
            modal.removeAttribute('open');
        }
    }

    function navigateLightbox(direction) {
        const modal = document.getElementById('imageModal');
        if (!modal || currentImages.length === 0) return;

        currentIndex = (
            currentIndex + direction + currentImages.length
        ) % currentImages.length;

        updateLightbox(modal);
    }

    document.addEventListener('click', (event) => {
        const closeButton = event.target.closest('[data-lightbox-close]');
        if (closeButton) {
            event.preventDefault();
            closeLightbox();
            return;
        }

        const navigationButton = event.target.closest('[data-lightbox-nav]');
        if (navigationButton) {
            event.preventDefault();
            navigateLightbox(Number(navigationButton.dataset.lightboxNav));
            return;
        }

        const trigger = event.target.closest('[data-lightbox]');
        if (trigger) {
            event.preventDefault();
            openLightbox(trigger);
            return;
        }

        const modal = document.getElementById('imageModal');
        if (modal && event.target === modal) {
            closeLightbox();
        }
    });

    document.addEventListener('keydown', (event) => {
        const trigger = event.target.closest?.('[data-lightbox]');
        if (trigger && (event.key === 'Enter' || event.key === ' ')) {
            event.preventDefault();
            openLightbox(trigger);
            return;
        }

        const modal = document.getElementById('imageModal');
        if (!modal || !modal.open) return;

        if (event.key === 'ArrowRight') {
            event.preventDefault();
            navigateLightbox(1);
        } else if (event.key === 'ArrowLeft') {
            event.preventDefault();
            navigateLightbox(-1);
        } else if (event.key === 'Escape') {
            closeLightbox();
        }
    });
})();
