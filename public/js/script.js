// Add reaction to confession
async function addReaction(confessionId, reactionType, buttonElement) {
  try {
    const card = buttonElement.closest('.confession-card, .confession-item');
    const allButtons = card.querySelectorAll('.reaction-btn, .reaction-button');
    
    // Disable all buttons temporarily
    allButtons.forEach(btn => btn.disabled = true);
    
    const response = await fetch(`/confessions/${confessionId}/react`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ reactionType })
    });
    
    const data = await response.json();
    
    if (data.success) {
      // Update all reaction counts
      document.getElementById(`like-${confessionId}`).textContent = data.reactions.like;
      document.getElementById(`love-${confessionId}`).textContent = data.reactions.love;
      document.getElementById(`laugh-${confessionId}`).textContent = data.reactions.laugh;
      
      // Update active states
      allButtons.forEach(btn => {
        btn.classList.remove('active');
        if (data.userReaction && btn.dataset.reaction === data.userReaction) {
          btn.classList.add('active');
        }
      });
      
      // Add animation
      buttonElement.classList.add('reaction-pulse');
      setTimeout(() => {
        buttonElement.classList.remove('reaction-pulse');
      }, 300);
    } else {
      showNotification('Failed to add reaction', 'error');
    }
    
    // Re-enable buttons
    allButtons.forEach(btn => btn.disabled = false);
  } catch (err) {
    console.error('Error adding reaction:', err);
    showNotification('Failed to add reaction', 'error');
    
    // Re-enable buttons on error
    const card = buttonElement.closest('.confession-card, .confession-item');
    const allButtons = card.querySelectorAll('.reaction-btn, .reaction-button');
    allButtons.forEach(btn => btn.disabled = false);
  }
}

// Edit confession
function editConfession(confessionId, currentText) {
  const modalBody = document.getElementById('modal-body');
  modalBody.innerHTML = `
    <h3><i class="fas fa-edit"></i> Edit Confession</h3>
    <form action="/confessions/${confessionId}?_method=PUT" method="POST">
      <textarea name="text" required maxlength="500">${currentText}</textarea>
      <input 
        type="password" 
        name="secretCode" 
        placeholder="Enter Secret Code" 
        minlength="4" 
        required
      >
      <small class="form-hint">
        <i class="fas fa-info-circle"></i>
        Enter the secret code you used when creating this confession
      </small>
      <button type="submit">
        <i class="fas fa-save"></i>
        Update Confession
      </button>
    </form>
  `;
  document.getElementById('modal').style.display = 'block';
  document.body.style.overflow = 'hidden';
}

// Delete confession
function deleteConfession(confessionId) {
  const modalBody = document.getElementById('modal-body');
  modalBody.innerHTML = `
    <h3><i class="fas fa-trash-alt"></i> Delete Confession</h3>
    <p>Are you sure you want to delete this confession? This action cannot be undone.</p>
    <form action="/confessions/${confessionId}?_method=DELETE" method="POST">
      <input 
        type="password" 
        name="secretCode" 
        placeholder="Enter Secret Code" 
        minlength="4" 
        required
      >
      <small class="form-hint">
        <i class="fas fa-info-circle"></i>
        Enter the secret code you used when creating this confession
      </small>
      <button type="submit" class="delete-btn">
        <i class="fas fa-trash"></i>
        Delete Confession
      </button>
    </form>
  `;
  document.getElementById('modal').style.display = 'block';
  document.body.style.overflow = 'hidden';
}

// Close modal
function closeModal() {
  document.getElementById('modal').style.display = 'none';
  document.body.style.overflow = 'auto';
}

// Close modal when clicking outside
window.onclick = function(event) {
  const modal = document.getElementById('modal');
  if (event.target === modal) {
    modal.style.display = 'none';
  }
}

// Close modal with Escape key
document.addEventListener('keydown', function(event) {
  if (event.key === 'Escape') {
    closeModal();
  }
});

// Auto-hide alerts after 5 seconds
document.addEventListener('DOMContentLoaded', function() {
  const alerts = document.querySelectorAll('.alert');
  alerts.forEach(alert => {
    setTimeout(() => {
      alert.style.transition = 'opacity 0.5s';
      alert.style.opacity = '0';
      setTimeout(() => {
        alert.remove();
      }, 500);
    }, 5000);
  });
});

// Show notification
function showNotification(message, type = 'success') {
  const notification = document.createElement('div');
  notification.className = `alert alert-${type}`;
  notification.innerHTML = `
    <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
    <span>${message}</span>
  `;
  
  const container = document.querySelector('.container');
  container.insertBefore(notification, container.firstChild);
  
  setTimeout(() => {
    notification.style.transition = 'opacity 0.5s';
    notification.style.opacity = '0';
    setTimeout(() => notification.remove(), 500);
  }, 3000);
}

// Smooth scroll to top
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
