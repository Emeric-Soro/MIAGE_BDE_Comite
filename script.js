 // Données des Comités
        const groups = [
            { image: 'img/Innovation.png', title: 'Comité Innovation', description: 'Groupe dédié à l\'innovation : projets, prototypes et ateliers pour développer de nouvelles idées.', link: 'https://chat.whatsapp.com/LceqHrYQjd8C0SYFCxKVWq' },
            { image: 'img/communication.png', title: 'Comité Communication', description: 'Gestion des annonces, réseaux sociaux, supports visuels et communication interne de l\'école.', link: 'https://chat.whatsapp.com/LECoPqcGxy0HJAYCzU9iHC?mode=wwt' },
            { image: 'img/vie_etudiante.png', title: 'Comité Vie Etudiante', description: 'Organisation des activités sociales, soutien étudiant et initiatives pour améliorer le quotidien des étudiants.', link: 'https://chat.whatsapp.com/Fgkdz2ZEVNq57BLuJMCG33' },
            { image: 'img/academie.png', title: 'Comité Académie', description: 'Soutien pédagogique : tutorat, ateliers, conférences et amélioration des parcours académiques.', link: 'https://chat.whatsapp.com/GAfeWSBmM6HBus9fZJLZcO?mode=ems_copy_t' },
            { image: 'img/culture_sport.png', title: 'Comité Culture et Sport', description: 'Coordonne événements culturels, compétitions sportives et activités de loisirs pour la communauté étudiante.', link: 'https://chat.whatsapp.com/LAyx32JVGK68OxtN28ep3s' },
            { image: 'img/logistique_evenementiel.png', title: 'Comité Logistique et Evénementiel', description: 'Gère la logistique des événements : matériel, lieux, planning et coordination sur le terrain.', link: 'https://chat.whatsapp.com/Bf7uh9jPes91zaVobFxj4Z' },
            { image: 'img/relation_exterieures.png', title: 'Comité Relations Extérieures', description: 'Développement des partenariats, relations entreprises, sponsors et opportunités d\'échanges externes.', link: 'https://chat.whatsapp.com/ET66bWeSUOA2dc8LJsKWDm' },
        ];

        // Effet de frappe pour le titre
        function typeWriter(element, text, speed = 100) {
            let i = 0;
            element.innerHTML = '';
            const cursor = document.createElement('span');
            cursor.className = 'typing-cursor';
            
            function type() {
                if (i < text.length) {
                    element.innerHTML = text.substring(0, i + 1);
                    element.appendChild(cursor);
                    i++;
                    setTimeout(type, speed);
                } else {
                    setTimeout(() => cursor.remove(), 1000);
                }
            }
            type();
        }

        // Effet de frappe pour le sous-titre
        function typeWriterSubtitle(element, text, delay = 2000) {
            setTimeout(() => {
                let i = 0;
                element.innerHTML = '';
                function type() {
                    if (i < text.length) {
                        element.innerHTML += text.charAt(i);
                        i++;
                        setTimeout(type, 50);
                    }
                }
                type();
            }, delay);
        }

        // Créer des particules
        function createParticles() {
            const particlesContainer = document.getElementById('particles');
            for (let i = 0; i < 70; i++) {
                const particle = document.createElement('div');
                particle.className = 'particle';
                particle.style.width = Math.random() * 8 + 4 + 'px';
                particle.style.height = particle.style.width;
                particle.style.left = Math.random() * 100 + '%';
                particle.style.top = Math.random() * 100 + '%';
                particle.style.animationDelay = Math.random() * 8 + 's';
                particle.style.animationDuration = (Math.random() * 6 + 6) + 's';
                particlesContainer.appendChild(particle);
            }
        }

        // Créer les cartes avec animation de texte
        function createCards() {
            const grid = document.getElementById('cardsGrid');
            
            groups.forEach((group, index) => {
                const card = document.createElement('div');
                card.className = 'card';
                card.innerHTML = `
                    <div class="card-icon"><img src="${group.image}" alt="${group.title}" class="card-img" loading="lazy"></div>
                    <h2 class="card-title"></h2>
                    <p class="card-description"></p>
                    <a href="${group.link}" class="whatsapp-btn" target="_blank">
                        <span class="whatsapp-icon">📱</span>
                        <span class="btn-text">Rejoindre le Comité</span>
                    </a>
                `;
                grid.appendChild(card);

                // Animation d'apparition des cartes
                setTimeout(() => {
                    card.classList.add('visible');
                    
                    // Effet de frappe pour le titre de la carte
                    setTimeout(() => {
                        const title = card.querySelector('.card-title');
                        typeWriter(title, group.title, 80);
                    }, 200);

                    // Effet de frappe pour la description
                    setTimeout(() => {
                        const description = card.querySelector('.card-description');
                        typeWriter(description, group.description, 30);
                    }, 800);
                }, index * 200);
            });
        }

        // Observer pour les animations au scroll
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        // Mouvement des boutons au mouvement de la souris
        document.addEventListener('mousemove', (e) => {
            const cards = document.querySelectorAll('.card');
            cards.forEach(card => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                if (x > 0 && x < rect.width && y > 0 && y < rect.height) {
                    const xPercent = (x / rect.width - 0.5) * 10;
                    const yPercent = (y / rect.height - 0.5) * 10;
                    card.style.transform = `translateY(-15px) scale(1.03) rotateY(${xPercent}deg) rotateX(${-yPercent}deg)`;
                }
            });
        });

        // Effet de clic sur les boutons
        document.addEventListener('click', (e) => {
            if (e.target.closest('.whatsapp-btn')) {
                const btn = e.target.closest('.whatsapp-btn');
                btn.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    btn.style.transform = '';
                }, 200);
            }
        });

        // Initialisation
        window.addEventListener('DOMContentLoaded', () => {
            createParticles();
            // Remplacer le titre animé par le logo principal
            const mainTitleEl = document.getElementById('main-title');
            if (mainTitleEl) {
                mainTitleEl.innerHTML = `<img src="img/BDE_MIAGE.png" alt="BDE MIAGE" class="main-logo">`;
                // donner l'effet d'apparition au logo
                mainTitleEl.style.opacity = '0';
                mainTitleEl.style.transition = 'opacity 0.8s ease';
                requestAnimationFrame(() => {
                    mainTitleEl.style.opacity = '1';
                });
            }
            typeWriterSubtitle(document.getElementById('subtitle'), "Rejoignez un comité et participer a la vie de l'école", 2000);
            createCards();
        });