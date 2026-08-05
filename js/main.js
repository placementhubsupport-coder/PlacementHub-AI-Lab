/**
 * PlacementHub AI Lab — Global Main Script
 * Handles navigation highlighting, global command palette, and UI state setup.
 */

import { initCmdKPalette, showToast } from './components.js';

document.addEventListener('DOMContentLoaded', () => {
  // Highlight active sidebar links
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const sidebarLinks = document.querySelectorAll('.wf-sidebar-link');
  
  sidebarLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    } else if (href && !href.startsWith('#')) {
      link.classList.remove('active');
    }
  });

  // Initialize Cmd+K universal search palette
  initCmdKPalette();

  // Attach listener to system status dot / indicator
  const statusIndicator = document.querySelector('.wf-status-indicator');
  if (statusIndicator) {
    statusIndicator.style.cursor = 'pointer';
    statusIndicator.addEventListener('click', () => {
      showToast('All PlacementHub AI Lab services (Embedding, LLM, Vector Index) are operating normally.', 'success', 3500);
    });
  }
});
