// Float3D Animation for elements with .view-btn
document.querySelectorAll('.view-btn').forEach(btn => {
  btn.addEventListener('mousemove', e => {
    const { left, top, width, height } = btn.getBoundingClientRect();
    const x = e.clientX - left - width / 2;
    const y = e.clientY - top - height / 2;
    btn.style.transform = `rotateX(${-y / 10}deg) rotateY(${x / 10}deg)`;
  });

  btn.addEventListener('mouseleave', () => {
    btn.style.transform = 'rotateX(0deg) rotateY(0deg)';
  });
});

// Slide Menu Animation
function toggleMenu() {
  const menu = document.getElementById('slideMenu');
  menu.classList.toggle('open');
}
