document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    const startButton = document.getElementById('startButton');
    const audio = new Audio('https://www.youtube.com/watch?v=vCqAubadBk8');
    const basketImage = new Image();
    basketImage.src = '/Users/kluivertaligwoekwe/Desktop/NOT COOKING/PENGUIN.png'; // Adjust the path as needed

    let gameStarted = false;
    let chips = [];
    let basket = { x: canvas.width / 2 - 50, y: canvas.height - 100, width: 100, height: 100 };
    let score = 0;
    let gameEnded = false;

    class Chip {
        constructor(x, y, radius, image, speed) {
            this.x = x;
            this.y = y;
            this.radius = radius;
            this.image = new Image();
            this.image.src = image;
            this.speed = speed;
            this.missed = false;
        }

        draw() {
            ctx.drawImage(this.image, this.x - this.radius, this.y - this.radius, this.radius * 2, this.radius * 2);
        }

        update() {
            this.y += this.speed;
            if (this.y - this.radius > canvas.height) {
                this.missed = true;
                endGame();
            }
        }

        reset() {
            this.y = -this.radius;
            this.x = Math.random() * (canvas.width - this.radius * 2) + this.radius;
            this.missed = false;
        }
    }

    function initChips(num) {
        chips = [];
        for (let i = 0; i < num; i++) {
            let radius = 20;
            let x = Math.random() * (canvas.width - radius * 2) + radius;
            let y = Math.random() * canvas.height - canvas.height;
            let image = '/Users/kluivertaligwoekwe/Desktop/NOT COOKING/CHIP 1 (left).png'; // Adjust path as needed
            let speed = Math.random() * 2 + 1;
            chips.push(new Chip(x, y, radius, image, speed));
        }
    }

    function drawScore() {
        ctx.font = '20px Arial';
        ctx.fillStyle = '#000';
        ctx.fillText('Score: ' + score, 10, 20);
    }

    function drawChips() {
        chips.forEach(chip => {
            chip.draw();
            chip.update();
        });
    }

    function drawBasket() {
        ctx.drawImage(basketImage, basket.x, basket.y, basket.width, basket.height);
    }

    function checkChipCollision() {
        chips.forEach(chip => {
            if (!chip.missed && chip.y + chip.radius > basket.y && chip.x > basket.x && chip.x < basket.x + basket.width) {
                score += 10;
                chip.reset();
            }
        });
    }

    function generateCode() {
        return Math.floor(1000000 + Math.random() * 9000000).toString();
    }

    function endGame() {
        gameEnded = true;
        gameStarted = false;
        audio.pause();
        audio.currentTime = 0;
        cancelAnimationFrame(animationId);
        if (score >= 800) {
            const code = generateCode();
            alert(`Eggcelent! Redeem the code ${code} for a 20% Off Your Next Purchase!`);
        } else {
            alert('Do Not Be Too Salty! Your final score is: ' + score);
        }
    }

    let animationId;
    function gameLoop() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawScore();
        drawChips();
        drawBasket();
        checkChipCollision();
        if (gameStarted && !gameEnded) {
            animationId = requestAnimationFrame(gameLoop);
        }
    }

    startButton.addEventListener('click', function() {
        gameStarted = true;
        gameEnded = false;
        score = 0;
        canvas.style.display = 'block';
        initChips(10);
        audio.play().catch(() => {
            document.addEventListener('click', () => {
                audio.play();
            }, { once: true });
        });
        gameLoop();
    });

    window.addEventListener('mousemove', function(e) {
        const rect = canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        basket.x = mouseX - basket.width / 2;
    });

    // Animation to make chips bounce
    const chipImages = document.querySelectorAll('[id^=chip]');
    chipImages.forEach((chip, index) => {
        chip.style.animation = `bounce 2s infinite ${index * 0.1}s`;
    });

    // Add image moving from right to left
    const movingImage = document.createElement('img');
    movingImage.src = '/Users/kluivertaligwoekwe/Desktop/NOT COOKING/PENGUIN 3.png'; // Adjust the path as needed
    movingImage.classList.add('moving-across');
    document.body.appendChild(movingImage);

    // Handle watermark link click
    const watermarkLink = document.getElementById('watermarkLink');
    const popupMessage = document.getElementById('popupMessage');

    watermarkLink.addEventListener('click', function(e) {
        e.preventDefault();
        popupMessage.style.display = 'block';
        setTimeout(() => {
            popupMessage.style.display = 'none';
        }, 3000); // Hide the message after 3 seconds
    });
});















    





