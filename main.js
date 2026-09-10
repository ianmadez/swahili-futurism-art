document.addEventListener('DOMContentLoaded', () => {
  // Elements: Acquisition Drawer
  const purchaseModal = document.getElementById('purchaseModal');
  const closeModalBtn = document.getElementById('closeModal');
  const modalPieceTitle = document.getElementById('modalPieceTitle');
  const modalPieceMedium = document.getElementById('modalPieceMedium');
  const modalPieceDimensions = document.getElementById('modalPieceDimensions');
  const modalPiecePrice = document.getElementById('modalPiecePrice');
  const modalArtistSplit = document.getElementById('modalArtistSplit');
  const modalResidencySplit = document.getElementById('modalResidencySplit');
  const modalPaymentBtn = document.getElementById('modalPaymentBtn');

  // Filter Buttons
  const filterBtns = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.artwork-card');

  // Open Acquisition Modal
  document.querySelectorAll('.action-btn:not(.disabled)').forEach(btn => {
    btn.addEventListener('click', () => {
      const title = btn.getAttribute('data-title');
      const priceStr = btn.getAttribute('data-price');
      const medium = btn.getAttribute('data-medium');
      const dimensions = btn.getAttribute('data-dimensions');
      const paymentLink = btn.getAttribute('data-payment-link');

      // Calculate 70/30 Split
      const numericPrice = parseFloat(priceStr.replace(/[^0-9.]/g, '')) || 0;
      const artistAmount = (numericPrice * 0.7).toLocaleString('en-US', { minimumFractionDigits: 2 });
      const residencyAmount = (numericPrice * 0.3).toLocaleString('en-US', { minimumFractionDigits: 2 });

      modalPieceTitle.textContent = title;
      modalPieceMedium.textContent = medium;
      modalPieceDimensions.textContent = dimensions;
      modalPiecePrice.textContent = priceStr;
      modalArtistSplit.textContent = `$${artistAmount} USD`;
      modalResidencySplit.textContent = `$${residencyAmount} USD`;
      modalPaymentBtn.href = paymentLink || '#';

      purchaseModal.classList.add('active');
      purchaseModal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    });
  });

  // Close Acquisition Modal
  const closeAcquisitionModal = () => {
    purchaseModal.classList.remove('active');
    purchaseModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  closeModalBtn.addEventListener('click', closeAcquisitionModal);

  // Filter Functionality
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      cards.forEach(card => {
        if (filterValue === 'all') {
          card.classList.remove('hidden');
        } else if (filterValue === 'available') {
          if (card.getAttribute('data-status') === 'available') {
            card.classList.remove('hidden');
          } else {
            card.classList.add('hidden');
          }
        }
      });
    });
  });

  // Terms & Privacy Modals
  const termsModal = document.getElementById('termsModal');
  const privacyModal = document.getElementById('privacyModal');
  const openTermsBtn = document.getElementById('openTerms');
  const openPrivacyBtn = document.getElementById('openPrivacy');
  const closeTermsBtn = document.querySelector('.terms-close');
  const closePrivacyBtn = document.querySelector('.privacy-close');

  openTermsBtn.addEventListener('click', () => {
    termsModal.classList.add('active');
    termsModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  });

  openPrivacyBtn.addEventListener('click', () => {
    privacyModal.classList.add('active');
    privacyModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  });

  const closeLegalModal = (modal) => {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  closeTermsBtn.addEventListener('click', () => closeLegalModal(termsModal));
  closePrivacyBtn.addEventListener('click', () => closeLegalModal(privacyModal));

  // Global Backdrop Click Handler
  [purchaseModal, termsModal, privacyModal].forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeLegalModal(modal);
      }
    });
  });

  // Escape Key Listener
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeAcquisitionModal();
      closeLegalModal(termsModal);
      closeLegalModal(privacyModal);
    }
  });
});