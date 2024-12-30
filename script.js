window.onload = () => {
    const countdownContainer = document.createElement('div');
    countdownContainer.id = 'countdown';

    const timeUnits = [
        { id: 'days', label: 'Days' },
        { id: 'hours', label: 'Hours' },
        { id: 'minutes', label: 'Minutes' },
        { id: 'seconds', label: 'Seconds' },
    ];

    timeUnits.forEach(({ id, label }) => {
        const elem = document.createElement('div');
        elem.innerHTML = `<span id="${id}">00</span> <div>${label}</div>`;
        countdownContainer.appendChild(elem);
    });

    document.body.appendChild(countdownContainer);

    const animatedImage = document.getElementById('animatedImage');
    const cake = document.getElementById('cake');
    const velas = document.querySelectorAll('.velas');
    const fuego = document.querySelectorAll('.fuego');

    if (animatedImage) animatedImage.style.display = 'none';
    if (cake) cake.style.display = 'none';
    if (velas) velas.forEach((v) => (v.style.display = 'none'));
    if (fuego) fuego.forEach((f) => (f.style.display = 'none'));

    const targetDate = new Date('December 1, 2024 00:00:00');
    let isCountdownComplete = false;
    let isAnimating = false;

    const countdownInterval = setInterval(() => {
        const now = new Date();
        const timeLeft = targetDate - now;

        if (timeLeft <= 0) {
            clearInterval(countdownInterval);
            countdownContainer.innerHTML = '';
            isCountdownComplete = true;
            if (animatedImage) {
                animatedImage.style.display = 'block';
                animatedImage.classList.add('show');
            }
            if (cake) cake.style.display = 'block';
            if (velas) velas.forEach((v) => (v.style.display = 'block'));
            if (fuego) fuego.forEach((f) => (f.style.display = 'block'));

            showConfetti();
            return;
        }

        const timeValues = {
            days: Math.floor(timeLeft / (1000 * 60 * 60 * 24)),
            hours: Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
            minutes: Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60)),
            seconds: Math.floor((timeLeft % (1000 * 60)) / 1000),
        };

        Object.entries(timeValues).forEach(([unit, value]) => {
            const elem = document.getElementById(unit);
            if (elem) elem.innerText = value;
        });
    }, 1000);

    const showPaperSequentially = (paperContents, currentIndex = 0) => {
        if (currentIndex >= paperContents.length) {
            isAnimating = false;
            return;
        }

        const { strings, delay } = paperContents[currentIndex];
        const newPaper = document.createElement('div');
        newPaper.classList.add('paper');
        document.body.appendChild(newPaper);

        const paperContent = document.createElement('div');
        paperContent.classList.add('paper-content');
        newPaper.appendChild(paperContent);

        const teks = document.createElement('div');
        teks.classList.add('teks');
        paperContent.appendChild(teks);

        addPolaroidsAfterPaper(currentIndex);

        new TypeIt(teks, {
            strings,
            startDelay: 1000,
            speed: 100,
            waitUntilVisible: true,
            afterComplete: () => {
                setTimeout(() => {
                    if (currentIndex < paperContents.length - 1) {
                        newPaper.classList.add('slide-out');

                        newPaper.addEventListener('animationend', () => {
                            newPaper.remove();
                            showPaperSequentially(paperContents, currentIndex + 1);
                        });
                    } else {
                        showPaperSequentially(paperContents, currentIndex + 1);
                    }
                }, delay);
            },
        }).go();

        newPaper.style.display = 'block';
    };

    const addPolaroidsAfterPaper = (setIndex) => {
        const polaroids = [
            ['./images/polaroid1.png', './images/polaroid2.png'],
            ['./images/polaroid3.png', './images/polaroid4.png'],
            ['./images/polaroid5.png', './images/polaroid6.png'],
            ['./images/polaroid7.png', './images/polaroid8.png'],
            ['./images/polaroid9.png', './images/polaroid10.png'],
        ];

        const [leftImageSrc, rightImageSrc] = polaroids[setIndex] || ['', ''];

        if (!leftImageSrc || !rightImageSrc) return;

        const leftImage = document.createElement('div');
        leftImage.classList.add('corner-image', 'left');
        leftImage.innerHTML = `<img src="${leftImageSrc}" alt="Left Image">`;
        document.body.appendChild(leftImage);

        const rightImage = document.createElement('div');
        rightImage.classList.add('corner-image', 'right');
        rightImage.innerHTML = `<img src="${rightImageSrc}" alt="Right Image">`;
        document.body.appendChild(rightImage);

        leftImage.classList.add('show');
        rightImage.classList.add('show');
    };

    const triggerAnimations = () => {
        if (isAnimating) return;
        isAnimating = true;

        if (animatedImage) animatedImage.classList.add('hide');
        if (cake) cake.style.display = 'none';
        if (velas) velas.forEach((v) => (v.style.display = 'none'));
        if (fuego) fuego.forEach((f) => (f.style.display = 'none'));

        setTimeout(() => {
            if (countdownContainer) countdownContainer.style.display = 'none';

            const paperContents = [
                { 
                    strings: [
                        "Another year of ur life completed.",
                        "The beginning of the years yet to come.",
                        "A start to another year of your beautiful life,",
                        "Filled with happiness, love, pleasure, joy, fun, and much more.",
                        "Also sadness, sorrow, because of me probably.",
                        "But no matter what, a <b>PERFECT YEAR</b>",
                        "For my <b>PERFECT ESHI.</b>"
                    ], 
                    delay: 5000 
                },
                { 
                    strings: [
                        "No matter how it goes,",
                        "I wish for your happiness and peace.",
                        "No matter what, I promise to be there for you,",
                        "Especially on days that aren't as perfect as you.",
                        "You deserve everything that u wish for.",
                        "I wish to give u that everything."
                    ], 
                    delay: 5000 
                },
                { 
                    strings: [
                        "You are the most amazing woman I've met in my life.",
                        "You light up the room and my world when ur present.",
                        "You have the purest heart with so much love to give.",
                        "You are beautiful in every way I could look at u.",
                        "You are <b>PERFECT, MY LOVE.</b>"
                    ], 
                    delay: 5000 
                },
                { 
                    strings: [
                        "I hope you are presented with all the happiness in the world.",
                        "I hope you always stay as the <i>hehehe</i> girl.",
                        "I hope your smile never fades away.",
                        "I hope your world presents u with all that you desire.",
                        "I hope you can achieve all that u hope to achieve.",
                        "I hope for your good health.",
                        "I hope to stand by ur side every day."
                    ], 
                    delay: 5000 
                },
                { 
                    strings: [
                        "On this special day, I hope u enjoy the most.",
                        "I wish u the very best,",
                        "Today,",
                        "And the rest of ur life.<br>",
                        "<b>I LOVE U, MY PERFECT ESHI!!!</b>"
                    ], 
                    delay: 5000 
                },
            ];
            
            showPaperSequentially(paperContents);
        }, 2000);
    };

    let clickedForMusic = false;

    document.body.addEventListener('click', () => {
        if (isCountdownComplete) {
            if (!clickedForMusic) {
                clickedForMusic = true;
                const audio = new Audio('./music/29 スパークル.mp3');
                audio.play();
                triggerAnimations();

                audio.onended = () => {
                    fadeOutImagesAndFifthPaper();
                    setTimeout(() => {
                        window.location.href = './index2.html';
                    }, 2000);
                };
            }
        }
    });

    const fadeOutImagesAndFifthPaper = () => {
        const images = [animatedImage, cake, ...velas, ...fuego];
        const fifthPaper = document.querySelectorAll('.paper')[4];

        images.forEach((image) => {
            if (image) {
                image.classList.add('fade-out');
            }
        });

        if (fifthPaper) {
            fifthPaper.classList.add('fade-out');
        }

        setTimeout(() => {
            images.forEach((image) => {
                if (image) {
                    image.style.display = 'none';
                }
            });
            if (fifthPaper) {
                fifthPaper.style.display = 'none';
            }
        }, 2000);
    };

    const showConfetti = () => {
        const confettiContainer = document.getElementById('confetti-container');
        const confettiPlayer = document.getElementById('confetti');
        if (confettiContainer && confettiPlayer) {
            confettiContainer.style.display = 'flex';
            confettiPlayer.stop();
            confettiPlayer.play();
            setTimeout(() => confettiContainer.style.display = 'none', 5000);
        }
    };
};
