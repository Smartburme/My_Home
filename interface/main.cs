// Firebase Config (Replace with your real config)
const firebaseConfig = {
  apiKey: "YOUR-API-KEY",
  authDomain: "smart-burme-app.firebaseapp.com",
  projectId: "smart-burme-app",
  storageBucket: "smart-burme-app.appspot.com",
  messagingSenderId: "SENDER-ID",
  appId: "APP-ID"
};
firebase.initializeApp(firebaseConfig);

// Slide Menu Toggle
const menuToggle = document.getElementById("menu-toggle");
const slideMenu = document.getElementById("slide-menu");
menuToggle.addEventListener("click", () => {
  slideMenu.style.left = slideMenu.style.left === "0px" ? "-250px" : "0px";
});

// View System
document.getElementById("view-for-you").onclick = () => {
  document.getElementById("content").innerHTML = "<h2>For You</h2><p>Recommended content...</p>";
};
document.getElementById("view-newfeed").onclick = () => {
  document.getElementById("content").innerHTML = "<h2>Newfeed</h2><p>Latest posts...</p>";
};
document.getElementById("view-friends").onclick = () => {
  document.getElementById("content").innerHTML = "<h2>Friends</h2><p>Friend posts...</p>";
};

// Icon Bottom Events
document.getElementById("reload").onclick = () => location.reload();
document.getElementById("post").onclick = () => alert("Post clicked");
document.getElementById("chatting").onclick = () => alert("Chatting clicked");
document.getElementById("friends").onclick = () => alert("Friends clicked");

// 3D Animation
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById("floating-animation").appendChild(renderer.domElement);

const geometry = new THREE.SphereGeometry(0.5, 32, 32);
const material = new THREE.MeshBasicMaterial({ color: 0x00ffcc });
const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

camera.position.z = 2;

function animate() {
  requestAnimationFrame(animate);
  sphere.rotation.x += 0.01;
  sphere.rotation.y += 0.01;
  renderer.render(scene, camera);
}
animate();

// Open Upload Modal
function openUploadModal() {
  document.getElementById("upload-modal").style.display = "flex";
}

// Close Upload Modal
function closeUploadModal() {
  document.getElementById("upload-modal").style.display = "none";
}

// Upload Media to Firebase
function uploadMedia() {
  const file = document.getElementById("media-file").files[0];
  const caption = document.getElementById("media-caption").value;
  if (!file) return alert("Please select a file.");

  const storageRef = firebase.storage().ref("posts/" + file.name);
  const uploadTask = storageRef.put(file);

  uploadTask.on("state_changed", null, (error) => {
    alert("Upload failed: " + error.message);
  }, async () => {
    const url = await uploadTask.snapshot.ref.getDownloadURL();
    const db = firebase.firestore();
    await db.collection("posts").add({
      url,
      caption,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });
    alert("Upload successful");
    closeUploadModal();
  });
}
