const player = document.getElementById('player');
const mainWorld = document.getElementById('main-world');
const miniGameScreen = document.getElementById('mini-game-screen');
const miniGameBanner = document.getElementById('mini-game-banner');
const exitButton = document.getElementById('exit-button');
const miniGameAreas = document.querySelectorAll('.mini-game-area');
const archeryGame = document.getElementById('archery-game');
const runningGame = document.getElementById('running-game');
const swimmingGame = document.getElementById('swimming-game');
const obstacleGame = document.getElementById('obstacle-game');
const memoryGame = document.getElementById('memory-game');
const shootingGame = document.getElementById('shooting-game');

let playerX = 0;
let playerY = 0;
let currentGame = null;
let score = 0;
const beatenGames = new Set(); // Track beaten games

// Initialize player position
player.style.top = `${playerY}px`;
player.style.left = `${playerX}px`;

// Player Movement
document.addEventListener('keydown', (event) => {
    const speed = 10;
    if (currentGame === null) {
        // Main world movement
        switch (event.key) {
            case 'ArrowUp':
                playerY -= speed;
                break;
            case 'ArrowDown':
                playerY += speed;
                break;
            case 'ArrowLeft':
                playerX -= speed;
                break;
            case 'ArrowRight':
                playerX += speed;
                break;
        }
        player.style.top = `${playerY}px`;
        player.style.left = `${playerX}px`;

        // Check if player enters a mini-game area
        miniGameAreas.forEach(area => {
            const rect = area.getBoundingClientRect();
            if (
                playerX >= rect.left &&
                playerX <= rect.right &&
                playerY >= rect.top &&
                playerY <= rect.bottom &&
                !beatenGames.has(area.dataset.game) // Prevent replaying beaten games
            ) {
                startMiniGame(area.dataset.game);
            }
        });
    } else if (currentGame === 'running') {
        // Running game movement
        const runningPlayer = document.getElementById('running-player');
        let runningPlayerX = parseFloat(runningPlayer.style.left || 0);
        let runningPlayerY = parseFloat(runningPlayer.style.top || 0);
        switch (event.key) {
            case 'ArrowUp':
                runningPlayerY -= speed;
                break;
            case 'ArrowDown':
                runningPlayerY += speed;
                break;
            case 'ArrowLeft':
                runningPlayerX -= speed;
                break;
            case 'ArrowRight':
                runningPlayerX += speed;
                break;
        }
        runningPlayer.style.top = `${runningPlayerY}px`;
        runningPlayer.style.left = `${runningPlayerX}px`;
    } else if (currentGame === 'swimming') {
        // Swimming game movement
        const swimmingPlayer = document.getElementById('swimming-player');
        let swimmingPlayerX = parseFloat(swimmingPlayer.style.left || 0);
        let swimmingPlayerY = parseFloat(swimmingPlayer.style.top || 0);
        switch (event.key) {
            case 'ArrowUp':
                swimmingPlayerY -= speed;
                break;
            case 'ArrowDown':
                swimmingPlayerY += speed;
                break;
            case 'ArrowLeft':
                swimmingPlayerX -= speed;
                break;
            case 'ArrowRight':
                swimmingPlayerX += speed;
                break;
        }
        swimmingPlayer.style.top = `${swimmingPlayerY}px`;
        swimmingPlayer.style.left = `${swimmingPlayerX}px`;
    } else if (currentGame === 'obstacle') {
        // Obstacle course movement
        const obstaclePlayer = document.getElementById('obstacle-player');
        let obstaclePlayerX = parseFloat(obstaclePlayer.style.left || 0);
        let obstaclePlayerY = parseFloat(obstaclePlayer.style.top || 0);
        switch (event.key) {
            case 'ArrowUp':
                obstaclePlayerY -= speed;
                break;
            case 'ArrowDown':
                obstaclePlayerY += speed;
                break;
            case 'ArrowLeft':
                obstaclePlayerX -= speed;
                break;
            case 'ArrowRight':
                obstaclePlayerX += speed;
                break;
        }
        obstaclePlayer.style.top = `${obstaclePlayerY}px`;
        obstaclePlayer.style.left = `${obstaclePlayerX}px`;
    }
});

// Start Mini-Game
function startMiniGame(game) {
    currentGame = game;
    mainWorld.style.display = 'none';
    miniGameScreen.style.display = 'block';
    miniGameBanner.textContent = `${game.charAt(0).toUpperCase() + game.slice(1)} Game`;
    miniGameBanner.style.display = 'block';
    exitButton.style.display = 'block';

    // Hide all mini-games
    document.querySelectorAll('.mini-game').forEach(game => game.style.display = 'none');

    // Show the selected mini-game
    document.getElementById(`${game}-game`).style.display = 'block';

    // Initialize the mini-game
    if (game === 'archery') {
        startArchery();
    } else if (game === 'running') {
        startRunning();
    } else if (game === 'swimming') {
        startSwimming();
    } else if (game === 'obstacle') {
        startObstacle();
    } else if (game === 'memory') {
        startMemory();
    } else if (game === 'shooting') {
        startShooting();
    }
}

// Exit Mini-Game
exitButton.addEventListener('click', () => {
    mainWorld.style.display = 'block';
    miniGameScreen.style.display = 'none';
    currentGame = null;
    score = 0; // Reset score
    player.style.display = 'block'; // Ensure main player is visible
    player.style.top = `${playerY}px`; // Reset player position
    player.style.left = `${playerX}px`;
});

// Mark a game as beaten
function markGameAsBeaten(game) {
    beatenGames.add(game);
    miniGameAreas.forEach(area => {
        if (area.dataset.game === game) {
            area.classList.add('beaten');
        }
    });
}

// Archery Game
function startArchery() {
    for (let i = 0; i < 5; i++) {
        const target = document.createElement('div');
        target.className = 'target';
        target.style.top = `${Math.random() * 80}vh`;
        target.style.left = `${Math.random() * 80}vw`;
        archeryGame.appendChild(target);

        // Move target horizontally
        let direction = Math.random() > 0.5 ? 1 : -1;
        setInterval(() => {
            const left = parseFloat(target.style.left);
            if (left <= 0 || left >= window.innerWidth - 30) {
                direction *= -1;
            }
            target.style.left = `${left + direction * 2}px`;
        }, 20);

        // Click to remove target
        target.addEventListener('click', () => {
            target.remove();
            score++;
            if (score >= 5) {
                alert('You won the Archery Game!');
                markGameAsBeaten('archery');
                exitButton.click();
            }
        });
    }
}

// Running Race
function startRunning() {
    const runningPlayer = document.getElementById('running-player');
    runningPlayer.style.display = 'block'; // Ensure running player is visible
    runningPlayer.style.top = '0px';
    runningPlayer.style.left = '0px';

    // Check if player reaches the finish line
    const checkWin = setInterval(() => {
        const runningPlayerY = parseFloat(runningPlayer.style.top || 0);
        if (runningPlayerY + 50 >= window.innerHeight - 10) {
            alert('You won the Running Race!');
            clearInterval(checkWin);
            markGameAsBeaten('running');
            exitButton.click();
        }
    }, 100);
}

// Swimming
function startSwimming() {
    const swimmingPlayer = document.getElementById('swimming-player');
    swimmingPlayer.style.display = 'block'; // Ensure swimming player is visible
    swimmingPlayer.style.top = '0px';
    swimmingPlayer.style.left = '0px';

    const coins = document.querySelectorAll('.coin');
    coins.forEach(coin => {
        coin.addEventListener('click', () => {
            coin.remove();
            score++;
            if (score >= 2) {
                alert('You won the Swimming Game!');
                markGameAsBeaten('swimming');
                exitButton.click();
            }
        });
    });

    // Move waves
    const wave = document.querySelector('.wave');
    let waveDirection = 1;
    setInterval(() => {
        const left = parseFloat(wave.style.left || 0);
        if (left <= -100 || left >= 0) {
            waveDirection *= -1;
        }
        wave.style.left = `${left + waveDirection * 2}px`;
    }, 20);
}

// Obstacle Course
function startObstacle() {
    const obstaclePlayer = document.getElementById('obstacle-player');
    obstaclePlayer.style.display = 'block'; // Ensure obstacle player is visible
    obstaclePlayer.style.top = '0px';
    obstaclePlayer.style.left = '0px';

    const obstacles = document.querySelectorAll('.obstacle');
    const checkCollision = setInterval(() => {
        obstacles.forEach(obstacle => {
            const rect = obstacle.getBoundingClientRect();
            if (
                obstaclePlayer.offsetLeft + 50 >= rect.left &&
                obstaclePlayer.offsetLeft <= rect.right &&
                obstaclePlayer.offsetTop + 50 >= rect.top &&
                obstaclePlayer.offsetTop <= rect.bottom
            ) {
                alert('You hit an obstacle! Game over.');
                clearInterval(checkCollision);
                exitButton.click();
            }
        });

        // Check if player reaches the end
        if (obstaclePlayer.offsetLeft + 50 >= window.innerWidth - 100 && obstaclePlayer.offsetTop + 50 >= window.innerHeight - 100) {
            alert('You won the Obstacle Course!');
            clearInterval(checkCollision);
            markGameAsBeaten('obstacle');
            exitButton.click();
        }
    }, 100);
}

// Memory Game
function startMemory() {
    const cards = document.querySelectorAll('.memory-card');
    let flippedCards = [];
    let matchedPairs = 0;

    cards.forEach(card => {
        card.addEventListener('click', () => {
            if (flippedCards.length < 2 && !card.classList.contains('flipped')) {
                card.classList.add('flipped');
                card.style.backgroundColor = 'white';
                card.textContent = card.dataset.value;
                flippedCards.push(card);

                if (flippedCards.length === 2) {
                    const [card1, card2] = flippedCards;
                    if (card1.dataset.value === card2.dataset.value) {
                        matchedPairs++;
                        if (matchedPairs === 2) {
                            alert('You won the Memory Game!');
                            markGameAsBeaten('memory');
                            exitButton.click();
                        }
                    } else {
                        setTimeout(() => {
                            card1.classList.remove('flipped');
                            card2.classList.remove('flipped');
                            card1.style.backgroundColor = 'purple';
                            card2.style.backgroundColor = 'purple';
                            card1.textContent = '';
                            card2.textContent = '';
                        }, 1000);
                    }
                    flippedCards = [];
                }
            }
        });
    });
}

// Shooting Gallery
function startShooting() {
    const shootingPlayer = document.getElementById('shooting-player');
    shootingPlayer.style.display = 'block'; // Ensure shooting player is visible
    shootingPlayer.style.top = '0px';
    shootingPlayer.style.left = '0px';

    for (let i = 0; i < 5; i++) {
        const target = document.createElement('div');
        target.className = 'shooting-target';
        target.style.top = `${Math.random() * 80}vh`;
        target.style.left = `${Math.random() * 80}vw`;
        shootingGame.appendChild(target);

        // Move target vertically
        let direction = Math.random() > 0.5 ? 1 : -1;
        setInterval(() => {
            const top = parseFloat(target.style.top);
            if (top <= 0 || top >= window.innerHeight - 30) {
                direction *= -1;
            }
            target.style.top = `${top + direction * 2}px`;
        }, 20);

        // Click to shoot target
        target.addEventListener('click', () => {
            target.remove();
            score++;
            if (score >= 5) {
                alert('You won the Shooting Gallery!');
                markGameAsBeaten('shooting');
                exitButton.click();
            }
        });
    }
}
