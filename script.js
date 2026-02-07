
Action: file_editor view /app/portfolio-export/script.js
Observation: /app/portfolio-export/script.js:
1|// Star Field Animation
2|const canvas = document.getElementById('starfield');
3|const ctx = canvas.getContext('2d');
4|let stars = [];
5|let animationFrameId;
6|
7|function resizeCanvas() {
8|    canvas.width = window.innerWidth;
9|    canvas.height = window.innerHeight;
10|}
11|
12|function createStars(count) {
13|    stars = [];
14|    for (let i = 0; i < count; i++) {
15|        stars.push({
16|            x: Math.random() * canvas.width,
17|            y: Math.random() * canvas.height,
18|            radius: Math.random() * 1.5,
19|            opacity: Math.random(),
20|            speed: Math.random() * 0.5 + 0.1,
21|            twinkleSpeed: Math.random() * 0.02 + 0.01
22|        });
23|    }
24|}
25|
26|function drawStars() {
27|    ctx.clearRect(0, 0, canvas.width, canvas.height);
28|    
29|    stars.forEach(star => {
30|        ctx.beginPath();
31|        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
32|        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
33|        ctx.fill();
34|
35|        // Twinkle effect
36|        star.opacity += star.twinkleSpeed;
37|        if (star.opacity >= 1 || star.opacity <= 0.3) {
38|            star.twinkleSpeed = -star.twinkleSpeed;
39|        }
40|
41|        // Slow drift
42|        star.y += star.speed;
43|        if (star.y > canvas.height) {
44|            star.y = 0;
45|            star.x = Math.random() * canvas.width;
46|        }
47|    });
48|
49|    animationFrameId = requestAnimationFrame(drawStars);
50|}
51|
52|// Initialize starfield
53|resizeCanvas();
54|createStars(200);
55|drawStars();
56|
57|window.addEventListener('resize', () => {
58|    resizeCanvas();
59|    createStars(200);
60|});
61|
62|// Smooth scroll function
63|function scrollToSection(sectionId) {
64|    const element = document.getElementById(sectionId);
65|    if (element) {
66|        element.scrollIntoView({ behavior: 'smooth' });
67|    }
68|}
69|
70|// Add scroll animations
71|const observerOptions = {
72|    threshold: 0.1,
73|    rootMargin: '0px 0px -100px 0px'
74|};
75|
76|const observer = new IntersectionObserver((entries) => {
77|    entries.forEach(entry => {
78|        if (entry.isIntersecting) {
79|            entry.target.style.opacity = '1';
80|            entry.target.style.transform = 'translateY(0)';
81|        }
82|    });
83|}, observerOptions);
84|
85|// Observe all project cards
86|document.querySelectorAll('.project-card').forEach(card => {
87|    card.style.opacity = '0';
88|    card.style.transform = 'translateY(20px)';
89|    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
90|    observer.observe(card);
91|});
92|
93|// Clean up on page unload
94|window.addEventListener('beforeunload', () => {
95|    cancelAnimationFrame(animationFrameId);
96|});
