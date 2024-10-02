const reel1 = document.getElementById('reel1');
const reel2 = document.getElementById('reel2');
const reel3 = document.getElementById('reel3');
const message = document.getElementById('message');
const coinsDisplay = document.getElementById('coins');
const spinButton = document.getElementById('spin');

let coins = 100;
const symbols = ['🍒', '🍋', '🔔', '⭐', '🍉', '🍇'];

spinButton.addEventListener('click', spin);

function spin() {
    if (coins <= 0) {
        message.textContent = 'Not enough coins!';
        return;
    }

    // Disable the spin button during the spin
    spinButton.disabled = true;
    spinButton.style.opacity = '0.5'; // Optional: make the button look disabled
    coins -= 10;
    coinsDisplay.textContent = `Coins: ${coins}`;

    let spinCount = 20; // Number of times the reels will "spin"
    let speed = 100; // Speed of the spin

    const spinInterval = setInterval(() => {
        // Update the reels with random symbols as they "spin"
        reel1.textContent = getRandomSymbol();
        reel2.textContent = getRandomSymbol();
        reel3.textContent = getRandomSymbol();
        spinCount--;

        // Stop spinning after a certain number of spins
        if (spinCount === 0) {
            clearInterval(spinInterval);

            // Settle on final result
            const result1 = getRandomSymbol();
            const result2 = getRandomSymbol();
            const result3 = getRandomSymbol();

            reel1.textContent = result1;
            reel2.textContent = result2;
            reel3.textContent = result3;

            checkWin(result1, result2, result3);

            // Re-enable the spin button after the spin is complete
            spinButton.disabled = false;
            spinButton.style.opacity = '1'; // Restore button appearance
        }
    }, speed);
}

function getRandomSymbol() {
    return symbols[Math.floor(Math.random() * symbols.length)];
}

function checkWin(r1, r2, r3) {
    if (r1 === r2 && r2 === r3) {
        if (r1 === '🔔') {
            message.textContent = 'JACKPOT! +100 coins!';
            coins += 100;
        } else {
            message.textContent = 'Big Win! +50 coins!';
            coins += 50;
        }
    } else if (r1 === r2 || r2 === r3 || r1 === r3) {
        message.textContent = 'Small Win! +20 coins!';
        coins += 20;
    } else {
        message.textContent = 'No Win!';
    }

    coinsDisplay.textContent = `Coins: ${coins}`;
}
