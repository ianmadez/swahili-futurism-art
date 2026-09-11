document.addEventListener('DOMContentLoaded', () => {
    // Tab Navigation & Sync (Desktop & Mobile Drawer)
    const navButtons = document.querySelectorAll('.nav-btn');
    const previewTabs = document.querySelectorAll('.preview-tab');
    const burgerBtn = document.getElementById('burgerBtn');
    const mobileDrawer = document.getElementById('mobileDrawer');

    // Mobile Hamburger Toggle
    if (burgerBtn && mobileDrawer) {
        burgerBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            burgerBtn.classList.toggle('open');
            mobileDrawer.classList.toggle('open');
        });

        // Close drawer when tapping outside
        document.addEventListener('click', (e) => {
            if (!mobileDrawer.contains(e.target) && !burgerBtn.contains(e.target)) {
                burgerBtn.classList.remove('open');
                mobileDrawer.classList.remove('open');
            }
        });
    }

    navButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const target = btn.getAttribute('data-tab');

            // Close mobile drawer upon selection
            if (burgerBtn && mobileDrawer) {
                burgerBtn.classList.remove('open');
                mobileDrawer.classList.remove('open');
            }

            // Sync active state across all instances of this tab's button
            navButtons.forEach(b => {
                if (b.getAttribute('data-tab') === target) {
                    b.classList.add('active');
                } else {
                    b.classList.remove('active');
                }
            });

            previewTabs.forEach(t => t.classList.remove('active'));
            const targetEl = document.getElementById(target);
            if (targetEl) targetEl.classList.add('active');

            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });

    // Viewport Device Switcher (Desktop / Tablet / Mobile)
    const deviceBtns = document.querySelectorAll('.device-btn');
    const wireframeStage = document.getElementById('wireframeStage');

    if (deviceBtns && wireframeStage) {
        deviceBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                deviceBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const device = btn.getAttribute('data-device');
                wireframeStage.className = `wireframe-viewport-stage device-${device}`;
            });
        });
    }

    // Parallax Tilt & Dynamic Specular Reflection for Glass Elements
      const tiltElements = document.querySelectorAll('.tilt-interactive, .tilt-btn');

      tiltElements.forEach(elem => {
        elem.addEventListener('mousemove', (e) => {
          const rect = elem.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;

          const rotateX = ((y - centerY) / centerY) * -12;
          const rotateY = ((x - centerX) / centerX) * 12;

          elem.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;

          const light = elem.querySelector('.glass-specular-light');
          if (light) {
            light.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.95) 0%, transparent 60%)`;
          }
        });

        elem.addEventListener('mouseleave', () => {
          elem.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
          const light = elem.querySelector('.glass-specular-light');
          if (light) {
            light.style.background = 'linear-gradient(90deg, transparent 0%, #FFFFFF 50%, transparent 100%)';
          }
        });
      });

    // Individual 3D Parallax Tilt for Mounted Artwork Cards
    const artCards = document.querySelectorAll('.art-frame-card');

    artCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -8;
            const rotateY = ((x - centerX) / centerX) * 8;

            card.style.transform = `perspective(1100px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(24px) scale(1.02)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });

    // Contained Mouse-Wheel & Drag Horizontal Scroll for Gallery Wall
    const scrollContainer = document.getElementById('wallScroll');
    if (scrollContainer) {
        // Intercept mouse-wheel over the wall and scroll horizontally
        scrollContainer.addEventListener('wheel', (e) => {
            if (e.deltaY !== 0) {
                e.preventDefault();
                scrollContainer.scrollLeft += e.deltaY * 1.6;
            }
        }, { passive: false });

        // Click-to-Drag for Desktop with drag-threshold protection
        let isDown = false;
        let startX, scrollLeft;
        let hasDragged = false;

        scrollContainer.addEventListener('mousedown', (e) => {
            isDown = true;
            hasDragged = false;
            startX = e.pageX - scrollContainer.offsetLeft;
            scrollLeft = scrollContainer.scrollLeft;
        });

        scrollContainer.addEventListener('mouseleave', () => { isDown = false; });
        scrollContainer.addEventListener('mouseup', () => { isDown = false; });

        scrollContainer.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            const x = e.pageX - scrollContainer.offsetLeft;
            const walk = (x - startX) * 1.6;
            if (Math.abs(walk) > 5) {
                hasDragged = true;
                e.preventDefault();
            }
            scrollContainer.scrollLeft = scrollLeft - walk;
        });

        // Prevent opening the modal if the user was dragging the wall
        artCards.forEach(card => {
            card.addEventListener('click', (e) => {
                if (hasDragged) {
                    e.stopImmediatePropagation();
                    e.preventDefault();
                    hasDragged = false;
                }
            }, true);
        });
    }

    // Live 20-minute countdown simulation
    let seconds = 19 * 60 + 48;
    const timerClock = document.getElementById('timerClock');
    if (timerClock) {
        setInterval(() => {
            if (seconds > 0) {
                seconds--;
                const mins = Math.floor(seconds / 60);
                const secs = seconds % 60;
                timerClock.textContent = `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
            }
        }, 1000);
    }

    // Rich Curatorial Modal Inspector
    const modal = document.getElementById('artModal');
    const closeModal = document.getElementById('closeModal');

    artCards.forEach(card => {
        card.addEventListener('click', () => {
            const rawPrice = parseFloat(card.getAttribute('data-rawprice')) || 0;
            const isSold = card.getAttribute('data-status') === 'Sold';

            document.getElementById('modalImg').src = card.getAttribute('data-img');
            document.getElementById('modalTitle').textContent = card.getAttribute('data-title');
            document.getElementById('modalArtist').textContent = card.getAttribute('data-artist');
            document.getElementById('modalMedium').textContent = card.getAttribute('data-medium');
            document.getElementById('modalDims').textContent = card.getAttribute('data-dims');
            document.getElementById('modalYear').textContent = card.getAttribute('data-year');
            document.getElementById('modalDesc').textContent = card.getAttribute('data-desc');
            document.getElementById('modalBio').textContent = card.getAttribute('data-bio');
            document.getElementById('modalPrice').textContent = card.getAttribute('data-price');
            
            const statusTag = document.getElementById('modalStatusTag');
            const splitBlock = document.getElementById('modalSplitBlock');
            const actionBtn = document.getElementById('modalActionBtn');

            if (isSold) {
                statusTag.textContent = 'Acquired / Private Collection';
                statusTag.style.color = 'var(--text-muted)';
                splitBlock.style.display = 'none';
                actionBtn.textContent = 'In Archive · Private Collection';
                actionBtn.disabled = true;
                actionBtn.style.opacity = '0.5';
                actionBtn.style.cursor = 'not-allowed';
            } else {
                statusTag.textContent = 'Original Piece · Available';
                statusTag.style.color = 'var(--accent-clay)';
                splitBlock.style.display = 'flex';
                
                const artistShare = Math.round(rawPrice * 0.7);
                const residencyShare = Math.round(rawPrice * 0.3);
                document.getElementById('modalArtistShare').textContent = `$${artistShare.toLocaleString()} USD`;
                document.getElementById('modalResidencyShare').textContent = `$${residencyShare.toLocaleString()} USD`;

                actionBtn.textContent = 'Reserve Artwork (20:00 Hold)';
                actionBtn.disabled = false;
                actionBtn.style.opacity = '1';
                actionBtn.style.cursor = 'pointer';
            }

            modal.classList.add('open');
        });
    });

    closeModal.addEventListener('click', () => modal.classList.remove('open'));
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.classList.remove('open');
    });
});