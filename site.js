(() => {
    'use strict';

    let currentImages = [];
    let currentIndex = -1;

    function getTriggerImage(trigger) {
        if (!trigger) return null;
        return trigger.matches('img') ? trigger : trigger.querySelector('img');
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
                    src: image.currentSrc || image.src,
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
        const clickedSource = clickedImage.currentSrc || clickedImage.src;
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

/* =========================================================
   COSTUME COLLECTION SLIDESHOW
   ========================================================= */

const costumeCollections = {
    oliver: {
        title: "Oliver Costume Collection",

        images: [
            {
                src: "images/OLIVER_PICTURES_2024/PXL_20230518_224648376.jpg",
                alt: "Oliver costume collection"
            },
            {
                src: "images/OLIVER_PICTURES_2024/PXL_20230518_231845061.jpg",
                alt: "Oliver costume collection"
            },
            {
                src: "images/OLIVER_PICTURES_2024/PXL_20230518_224835940.jpg",
                alt: "Oliver costume collection"
            },
            {
                src: "images/OLIVER_PICTURES_2024/PXL_20230518_221001130.jpg",
                alt: "Oliver costume collection"
            },
            {
                src: "images/OLIVER_PICTURES_2024/350135086_1276239403320229_6535926009654029367_n.jpg",
                alt: "Oliver costume collection"
            },
            {
                src: "images/OLIVER_PICTURES_2024/350276177_158665467179224_5782369682716649734_n copy.jpg",
                alt: "Oliver costume collection"
            }
        ]
    },

    "peter-pan": {
        title: "Peter Pan Costume Collection",

        images: [
            {
                src: "images/PETER_PAN_25/660A6536.JPG",
                alt: "Peter Pan costume collection"
            },
            {
                src: "images/PETER_PAN_25/660A6870.JPG",
                alt: "Peter Pan costume collection"
            }
        ]
    },

    "christmas-carol": {
        title: "A Christmas Carol Costume Collection",

        images: [
            {
                src: "images/A_Chistmas_Carol_Pictures/660A0001.JPG",
                alt: "A Christmas Carol costume collection"
            },
            {
                src: "images/A_Chistmas_Carol_Pictures/660A0010.JPG",
                alt: "A Christmas Carol costume collection"
            },
            {
                src: "images/A_Chistmas_Carol_Pictures/660A0091.JPG",
                alt: "A Christmas Carol costume collection"
            },
            {
                src: "images/A_Chistmas_Carol_Pictures/660A0123.JPG",
                alt: "A Christmas Carol costume collection"
            },
            {
                src: "images/A_Chistmas_Carol_Pictures/660A0277.JPG",
                alt: "A Christmas Carol costume collection"
            },
            {
                src: "images/A_Chistmas_Carol_Pictures/660A9277.JPG",
                alt: "A Christmas Carol costume collection"
            },
            {
                src: "images/A_Chistmas_Carol_Pictures/660A9530.JPG",
                alt: "A Christmas Carol costume collection"
            }
        ]
    }
};


const costumeGalleryModal =
    document.getElementById("costumeGalleryModal");

const costumeGalleryImage =
    document.getElementById("costumeGalleryImage");

const costumeGalleryTitle =
    document.getElementById("costumeGalleryTitle");

const costumeGalleryCaption =
    document.getElementById("costumeGalleryCaption");

const costumeGalleryCounter =
    document.getElementById("costumeGalleryCounter");


let activeCostumeCollection = null;
let activeCostumeImageIndex = 0;


function updateCostumeGallery() {
    if (!activeCostumeCollection) {
        return;
    }

    const collection =
        costumeCollections[activeCostumeCollection];

    const currentImage =
        collection.images[activeCostumeImageIndex];

    costumeGalleryTitle.textContent = collection.title;
    costumeGalleryImage.src = currentImage.src;
    costumeGalleryImage.alt = currentImage.alt;

    costumeGalleryCaption.textContent = currentImage.alt;

    costumeGalleryCounter.textContent =
        `${activeCostumeImageIndex + 1} of ${collection.images.length}`;
}


function openCostumeGallery(collectionName) {
    const collection = costumeCollections[collectionName];

    if (!collection || collection.images.length === 0) {
        return;
    }

    activeCostumeCollection = collectionName;
    activeCostumeImageIndex = 0;

    updateCostumeGallery();
    costumeGalleryModal.showModal();
}


function closeCostumeGallery() {
    costumeGalleryModal.close();

    activeCostumeCollection = null;
    activeCostumeImageIndex = 0;

    costumeGalleryImage.src = "";
}


function navigateCostumeGallery(direction) {
    if (!activeCostumeCollection) {
        return;
    }

    const images =
        costumeCollections[activeCostumeCollection].images;

    activeCostumeImageIndex =
        (
            activeCostumeImageIndex
            + direction
            + images.length
        ) % images.length;

    updateCostumeGallery();
}


document
    .querySelectorAll(".costume-gallery-trigger")
    .forEach((trigger) => {

        trigger.addEventListener("click", (event) => {
            event.preventDefault();

            openCostumeGallery(
                trigger.dataset.costumeGallery
            );
        });

    });


document
    .querySelector("[data-costume-gallery-close]")
    ?.addEventListener("click", closeCostumeGallery);


document
    .querySelectorAll("[data-costume-gallery-nav]")
    .forEach((button) => {

        button.addEventListener("click", () => {
            navigateCostumeGallery(
                Number(button.dataset.costumeGalleryNav)
            );
        });

    });


costumeGalleryModal?.addEventListener("click", (event) => {
    if (event.target === costumeGalleryModal) {
        closeCostumeGallery();
    }
});


document.addEventListener("keydown", (event) => {
    if (!costumeGalleryModal?.open) {
        return;
    }

    if (event.key === "ArrowRight") {
        navigateCostumeGallery(1);
    }

    if (event.key === "ArrowLeft") {
        navigateCostumeGallery(-1);
    }

    if (event.key === "Escape") {
        closeCostumeGallery();
    }
});

const videoGalleryModal =
    document.getElementById("videoGalleryModal");

const videoGalleryPlayer =
    document.getElementById("videoGalleryPlayer");

const videoGalleryModalTitle =
    document.getElementById("videoGalleryModalTitle");

const videoGalleryCloseButton =
    document.querySelector("[data-video-close]");

function openVideoGallery(videoSource, videoTitle) {
    if (!videoGalleryModal || !videoGalleryPlayer || !videoSource) {
        return;
    }

    videoGalleryModalTitle.textContent =
        videoTitle || "On Stage Video";

    videoGalleryPlayer.src = videoSource;
    videoGalleryPlayer.load();

    videoGalleryModal.showModal();

    videoGalleryPlayer.play().catch(() => {
        // The visitor can use the native play control if autoplay is blocked.
    });
}

function closeVideoGallery() {
    if (!videoGalleryModal || !videoGalleryPlayer) {
        return;
    }

    videoGalleryPlayer.pause();
    videoGalleryPlayer.removeAttribute("src");
    videoGalleryPlayer.load();
    videoGalleryModal.close();
}

document
    .querySelectorAll(".video-gallery-card")
    .forEach((videoCard) => {
        videoCard.addEventListener("click", () => {
            openVideoGallery(
                videoCard.dataset.videoSrc,
                videoCard.dataset.videoTitle
            );
        });
    });

videoGalleryCloseButton?.addEventListener(
    "click",
    closeVideoGallery
);

videoGalleryModal?.addEventListener("click", (event) => {
    if (event.target === videoGalleryModal) {
        closeVideoGallery();
    }
});

videoGalleryModal?.addEventListener("cancel", (event) => {
    event.preventDefault();
    closeVideoGallery();
});
