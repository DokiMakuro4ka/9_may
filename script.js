const canvas = document.getElementById("fireworksCanvas");
const ctx = canvas.getContext("2d");

let width = window.innerWidth;
let height = window.innerHeight;

canvas.width = width;
canvas.height = height;

window.addEventListener("resize", () => {
    width = window.innerWidth;
    height = window.innerHeight;

    canvas.width = width;
    canvas.height = height;
});

const particles = [];

class Particle {

    constructor(x, y, color, angle, speed, size) {

        this.x = x;
        this.y = y;

        this.color = color;

        this.angle = angle;
        this.speed = speed;

        this.size = size;

        this.alpha = 1;

        this.gravity = 0.06;

        this.decay = 0.012 + Math.random() * 0.02;
    }

    update() {

        this.speed *= 0.985;

        this.x += Math.cos(this.angle) * this.speed;

        this.y += Math.sin(this.angle) * this.speed + this.gravity;

        this.alpha -= this.decay;

        return this.alpha > 0;
    }

    draw() {

        ctx.save();

        ctx.globalAlpha = this.alpha;

        ctx.beginPath();

        ctx.fillStyle = this.color;

        ctx.shadowColor = this.color;
        ctx.shadowBlur = 20;

        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);

        ctx.fill();

        ctx.restore();
    }
}

function createExplosion(x, y) {

    const colors = [
        "#ffcc00",
        "#ff8800",
        "#ff4444",
        "#ffffff",
        "#ffd700"
    ];

    const count = 80 + Math.random() * 40;

    for (let i = 0; i < count; i++) {

        const angle = Math.random() * Math.PI * 2;

        const speed = 2 + Math.random() * 8;

        const size = 2 + Math.random() * 4;

        const color = colors[Math.floor(Math.random() * colors.length)];

        particles.push(
            new Particle(
                x,
                y,
                color,
                angle,
                speed,
                size
            )
        );
    }
}

/* Автосалют */

function autoFirework() {

    const x = Math.random() * width;

    const y = Math.random() * height * 0.6;

    createExplosion(x, y);

    if (Math.random() > 0.6) {

        setTimeout(() => {

            createExplosion(
                x + Math.random() * 100 - 50,
                y + Math.random() * 50 - 25
            );

        }, 200);
    }
}

setInterval(autoFirework, 1800);

/* Старт */

for (let i = 0; i < 6; i++) {

    setTimeout(() => {

        autoFirework();

    }, i * 400);
}

/* Анимация */

function animate() {

    requestAnimationFrame(animate);

    ctx.fillStyle = "rgba(0,0,0,0.15)";

    ctx.fillRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {

        const particle = particles[i];

        if (particle.update()) {

            particle.draw();

        } else {

            particles.splice(i, 1);

            i--;
        }
    }
}

animate();

/* Клик */

document.body.addEventListener("click", (e) => {

    createExplosion(
        e.clientX,
        e.clientY
    );
});

/* Цветок */

const flower = document.querySelector(".flower");

flower.addEventListener("click", (e) => {

    e.stopPropagation();

    const rect = flower.getBoundingClientRect();

    const x = rect.left + rect.width / 2;

    const y = rect.top + rect.height / 2;

    for (let i = 0; i < 5; i++) {

        setTimeout(() => {

            createExplosion(x, y);

        }, i * 150);
    }
});

/* Таймер */

function updateTimer() {

    const nextVictoryDay = new Date("May 9, 2027 00:00:00");

    const now = new Date();

    const diff = nextVictoryDay - now;

    const days = Math.floor(diff / 1000 / 60 / 60 / 24);

    const hours = Math.floor(
        (diff / 1000 / 60 / 60) % 24
    );

    const minutes = Math.floor(
        (diff / 1000 / 60) % 60
    );

    const seconds = Math.floor(
        (diff / 1000) % 60
    );

    document.getElementById("days").textContent =
        String(days).padStart(2, "0");

    document.getElementById("hours").textContent =
        String(hours).padStart(2, "0");

    document.getElementById("minutes").textContent =
        String(minutes).padStart(2, "0");

    document.getElementById("seconds").textContent =
        String(seconds).padStart(2, "0");
}

updateTimer();

setInterval(updateTimer, 1000);