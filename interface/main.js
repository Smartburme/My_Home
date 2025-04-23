/* General Styles */
body {
  margin: 0;
  font-family: Arial, sans-serif;
  background: linear-gradient(135deg, #0f2027, #203a43, #2c5364);
  color: white;
  overflow-x: hidden;
}

/* Menu Toggle */
.menu-toggle {
  position: fixed;
  top: 20px;
  left: 20px;
  background: transparent;
  color: white;
  border: none;
  font-size: 28px;
  z-index: 1001;
  cursor: pointer;
}

/* Slide Menu */
.slide-menu {
  position: fixed;
  left: -250px;
  top: 0;
  width: 250px;
  height: 100%;
  background-color: rgba(0,0,0,0.9);
  transition: 0.3s;
  padding-top: 60px;
  z-index: 1000;
}

.slide-menu ul {
  list-style: none;
  padding: 0;
}

.slide-menu ul li {
  padding: 15px 20px;
  border-bottom: 1px solid #444;
}

.slide-menu ul li a {
  color: white;
  text-decoration: none;
}

/* Search Bar */
.search-bar {
  padding: 80px 20px 10px;
}

.search-bar input {
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 8px;
  background-color: rgba(255,255,255,0.1);
  color: white;
}

/* View Buttons */
.view-system {
  display: flex;
  justify-content: space-around;
  padding: 10px 20px;
}

.view-btn {
  padding: 10px 15px;
  background-color: rgba(255,255,255,0.1);
  border: none;
  border-radius: 5px;
  color: white;
  cursor: pointer;
}

/* Content Area */
.content-area {
  padding: 20px;
  text-align: center;
}

.text-bottom {
  margin-top: 40px;
  text-align: center;
  font-size: 14px;
  color: #ccc;
}

/* Icon Buttons at the Bottom */
.icon-bottom {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background: rgba(0,0,0,0.9);
  display: flex;
  justify-content: space-around;
  padding: 10px 0;
  z-index: 1001;
}

.icon-bottom button {
  background: none;
  border: none;
  color: white;
  font-size: 16px;
  cursor: pointer;
}

.icon-bottom button:hover {
  color: #1e90ff;
}

/* Floating Animation */
#floating-animation {
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: -1;
  top: 0;
  left: 0;
}

/* Upload Modal */
.upload-modal {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.7);
  display: none;
  justify-content: center;
  align-items: center;
  z-index: 2000;
}

.upload-modal-content {
  background: white;
  border-radius: 10px;
  padding: 20px;
  width: 90%;
  max-width: 400px;
}

.upload-modal input, .upload-modal textarea {
  width: 100%;
  padding: 10px;
  margin: 10px 0;
}
