// Load JSON data
async function loadJSON(url) {
    const response = await fetch(url);
    return response.json();
}

// Populate projects
async function populateProjects() {
    const projects = await loadJSON('projects.json');
    const projectsGrid = document.querySelector('.projects-grid');

    projects.forEach(project => {
        const projectElement = document.createElement('div');
        projectElement.classList.add('project-item');
        projectElement.innerHTML = `
            <img src="${project.image}" alt="${project.title}">
            <div class="project-item-content">
                <h3>${project.title}</h3>
                <button class="learn-more">Learn More</button>
            </div>
        `;
        projectsGrid.appendChild(projectElement);
    });

    // Add modal functionality
    addModalFunctionality(projects);
}

// Populate team members
async function populateTeam() {
    const team = await loadJSON('team.json');
    const teamGrid = document.querySelector('.team-grid');

    team.forEach(member => {
        const memberElement = document.createElement('div');
        memberElement.classList.add('team-member');
        memberElement.innerHTML = `
            <img src="${member.image}" alt="${member.name}">
            <div class="team-member-content">
                <h3>${member.name}</h3>
                <p>${member.role}</p>
            </div>
        `;
        teamGrid.appendChild(memberElement);
    });
}

// Add modal functionality
function addModalFunctionality(projects) {
    const modal = document.getElementById('modal');
    const modalTitle = document.getElementById('modal-title');
    const modalImage = document.getElementById('modal-image');
    const modalDescription = document.getElementById('modal-description');
    const modalTechnologies = document.getElementById('modal-technologies');
    const modalHowItWorks = document.getElementById('modal-how-it-works');
    const closeBtn = document.getElementsByClassName('close')[0];

    document.querySelectorAll('.learn-more').forEach((button, index) => {
        button.addEventListener('click', () => {
            const project = projects[index];
            modalTitle.textContent = project.title;
            modalImage.src = project.image;
            modalImage.alt = project.title;
            modalDescription.textContent = project.description;
            modalTechnologies.innerHTML = project.technologies.map(tech => `<li>${tech}</li>`).join('');
            modalHowItWorks.textContent = project.howItWorks;
            modal.style.display = 'block';
        });
    });

    closeBtn.onclick = () => {
        modal.style.display = 'none';
    };

    window.onclick = (event) => {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    };
}

// Creative cursor follower
function initCursorFollower() {
    const follower = document.getElementById('cursor-follower');
    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animate() {
        let distX = mouseX - followerX;
        let distY = mouseY - followerY;
        
        followerX += distX * 0.4;
        followerY += distY * 0.4;

        follower.style.left = followerX + 'px';
        follower.style.top = followerY + 'px';

        requestAnimationFrame(animate);
    }

    animate();
}

// Initialize everything when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    populateProjects();
    populateTeam();
    initCursorFollower();

    // P5.js background
    new p5(sketch);
});

// P5.js sketch
function sketch(p) {
    let particles = [];

    p.setup = function() {
        let canvas = p.createCanvas(p.windowWidth, p.windowHeight);
        canvas.position(0, 0);
        canvas.style('z-index', '-1');
        for (let i = 0; i < 100; i++) {
            particles.push(new Particle(p));
        }
    }

    p.draw = function() {
        p.background(26, 26, 26);
        for (let particle of particles) {
            particle.update();
            particle.display();
        }
    }

    p.windowResized = function() {
        p.resizeCanvas(p.windowWidth, p.windowHeight);
    }

    class Particle {
        constructor(p) {
            this.p = p;
            this.x = p.random(p.width);
            this.y = p.random(p.height);
            this.size = p.random(1, 5);
            this.speedX = p.random(-1, 1);
            this.speedY = p.random(-1, 1);
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.x < 0 || this.x > this.p.width) this.speedX *= -1;
            if (this.y < 0 || this.y > this.p.height) this.speedY *= -1;
        }

        display() {
            this.p.noStroke();
            this.p.fill(231, 76, 60, 150);
            this.p.ellipse(this.x, this.y, this.size);
        }
    }
}

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('nav');

menuToggle.addEventListener('click', () => {
    nav.classList.toggle('active');
});