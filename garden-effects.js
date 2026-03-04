class GardenEffects {
    constructor() {
        this.container = document.createElement('div');
        this.container.className = 'garden-effects-container';
        document.body.appendChild(this.container);

        this.init();
    }

    init() {
        // Start spawning
        setInterval(() => this.spawnPetal(), 800);

        // Initial butterflies
        for (let i = 0; i < 4; i++) {
            this.spawnButterfly();
        }

        // Slowly add more butterflies if needed
        setInterval(() => {
            if (this.container.querySelectorAll('.butterfly').length < 6) {
                this.spawnButterfly();
            }
        }, 10000);
    }

    spawnPetal() {
        if (this.container.classList.contains('in-modal')) {
            if (Math.random() > 0.3) return; // Skip 70% of petals to reduce amount
        }
        const petal = document.createElement('div');
        const type = Math.floor(Math.random() * 3) + 1;
        petal.className = `petal petal-${type}`;

        const startX = Math.random() * window.innerWidth;
        const xEnd = (Math.random() - 0.5) * 400; // Sway range
        const rotEnd = Math.random() * 720 + 360;
        const duration = Math.random() * 5 + 5;

        petal.style.left = `${startX}px`;
        petal.style.setProperty('--x-end', `${xEnd}px`);
        petal.style.setProperty('--rot-end', `${rotEnd}deg`);
        petal.style.animation = `fall ${duration}s linear forwards`;

        this.container.appendChild(petal);

        setTimeout(() => petal.remove(), duration * 1000);
    }

    spawnButterfly() {
        const butterfly = document.createElement('div');
        const colors = ['', 'butterfly-blue', 'butterfly-gold', 'butterfly-purple'];
        const colorClass = colors[Math.floor(Math.random() * colors.length)];
        butterfly.className = `butterfly ${colorClass}`;

        butterfly.innerHTML = `
            <div class="butterfly-wing left"></div>
            <div class="butterfly-wing right"></div>
        `;

        this.container.appendChild(butterfly);
        this.animateButterfly(butterfly);
    }

    animateButterfly(el) {
        let x = Math.random() * window.innerWidth;
        let y = Math.random() * window.innerHeight;
        let angle = Math.random() * Math.PI * 2;
        let speed = Math.random() * 1 + 0.5;

        const move = () => {
            // Slight random direction change
            angle += (Math.random() - 0.5) * 0.2;

            x += Math.cos(angle) * speed;
            y += Math.sin(angle) * speed;

            // Screen wrap/bounce
            if (x < -50) x = window.innerWidth + 50;
            if (x > window.innerWidth + 50) x = -50;
            if (y < -50) y = window.innerHeight + 50;
            if (y > window.innerHeight + 50) y = -50;

            // Rotation based on movement
            const deg = (angle * 180 / Math.PI) + 90;
            el.style.transform = `translate(${x}px, ${y}px) rotate(${deg}deg)`;

            requestAnimationFrame(move);
        };

        requestAnimationFrame(move);
    }
}

// Spark the magic
document.addEventListener('DOMContentLoaded', () => {
    new GardenEffects();
});
