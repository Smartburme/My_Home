// main-bottom.js

// Functionality for bottom navigation
document.addEventListener('DOMContentLoaded', function() {

  const navItems = document.querySelectorAll('.navigation a');

  // Handle navigation item click event
  navItems.forEach(item => {
    item.addEventListener('click', function(e) {
      e.preventDefault(); // Prevent default anchor link behavior
      const selectedItem = e.target.closest('a').getAttribute('href');
      console.log('Navigating to:', selectedItem);
      
      // Example action: Show alert or redirect
      window.location.href = selectedItem;
    });
  });

  // Add functionality for floating button (add new post)
  const addButton = document.querySelector('.add-button');
  addButton.addEventListener('click', function() {
    console.log("Add new post clicked");
    // You can replace this with actual functionality like opening an upload dialog
    alert("Open photo/video upload dialog");
  });

});
