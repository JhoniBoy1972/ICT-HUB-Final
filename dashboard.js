// Firebase config (use your config here)
const firebaseConfig = {
  apiKey: "AIzaSyB-8y76WQuco9fjQzmgg0iTMw6UenH2fus",
  authDomain: "ict-hub-651ee.firebaseapp.com",
  projectId: "ict-hub-651ee",
  storageBucket: "ict-hub-651ee.appspot.com",
  messagingSenderId: "563022016498",
  appId: "1:563022016498:web:2b5978884ec332d005456b",
  measurementId: "G-4VT9G1NVY7"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// Cloudinary config
const cloudName = "dixmsdtwc"; // Replace with your Cloudinary cloud name
const unsignedUploadPreset = "uploadschool"; // Replace with your unsigned preset name

const uploadForm = document.getElementById('upload-form');
const uploadStatus = document.getElementById('upload-status');
const projectsContainer = document.getElementById('projects-container');

// Ensure user is logged in
auth.onAuthStateChanged(user => {
  if (!user) {
    window.location.href = "login.html";
    return;
  }
  loadProjects();
  loadStudentProjects();
  loadResources();
});

uploadForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const title = document.getElementById('project-title').value.trim();
  const description = document.getElementById('project-desc').value.trim();
  const fileInput = document.getElementById('project-file');
  const file = fileInput.files[0];

  if (!title || !file) {
    alert("Please fill the title and select a file.");
    return;
  }

  // Check project upload limit (max 4)
  const userEmail = auth.currentUser.email;
  const snapshot = await db.collection("projects").where('studentEmail', '==', userEmail).get();
  if (snapshot.size >= 4) {
    alert("You have reached the maximum upload limit of 4 projects.");
    return;
  }

  uploadStatus.textContent = "Uploading file, please wait...";
  uploadStatus.classList.remove("hidden");
  uploadStatus.classList.remove("text-green-600");
  uploadStatus.classList.add("text-yellow-600");

  try {
    // Prepare Cloudinary upload
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', unsignedUploadPreset);

    // Upload to Cloudinary
    const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/upload`, {
      method: 'POST',
      body: formData
    });

    const data = await response.json();
    if (data.error) throw new Error(data.error.message);

    const fileURL = data.secure_url;
    const publicId = data.public_id;

    // Save project data to Firestore
    await db.collection("projects").add({
      studentEmail: userEmail,
      title,
      description,
      fileURL,
      publicId,
      status: "In progress",
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
    });

    uploadStatus.textContent = "Project uploaded successfully!";
    uploadStatus.classList.remove("text-yellow-600");
    uploadStatus.classList.add("text-green-600");
    uploadForm.reset();

    loadProjects(); // Refresh project list
  } catch (error) {
    console.error("Upload failed:", error);
    uploadStatus.textContent = "Upload failed: " + error.message;
    uploadStatus.classList.remove("text-yellow-600");
    uploadStatus.classList.add("text-red-600");
  }
});

async function loadProjects() {
  if (!projectsContainer) return;

  projectsContainer.innerHTML = "Loading your projects...";
  const userEmail = auth.currentUser.email;
  const snapshot = await db.collection("projects")
    .where('studentEmail', '==', userEmail)
    .orderBy('createdAt', 'desc')
    .get();

  if (snapshot.empty) {
    projectsContainer.innerHTML = "<p>No projects uploaded yet.</p>";
    return;
  }

  projectsContainer.innerHTML = "";
  snapshot.forEach(doc => {
    const project = doc.data();
    const docId = doc.id;

    const div = document.createElement('div');
    div.className = "bg-white p-4 rounded-xl shadow-md flex flex-col space-y-2";

    div.innerHTML = `
      <h3 class="font-semibold text-lg">${project.title}</h3>
      <p class="text-gray-600">${project.description || "No description provided."}</p>
      <p>Status: <strong>${project.status}</strong></p>
      <div class="space-x-4">
        <button class="download-btn bg-yellow-500 text-white px-4 py-1 rounded hover:bg-yellow-600 transition">Download</button>
        <button class="delete-btn bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 transition">Delete</button>
      </div>
    `;

    // Download button handler
    div.querySelector(".download-btn").addEventListener("click", () => {
      window.open(project.fileURL, "_blank");
    });

    // Delete button handler
    div.querySelector(".delete-btn").addEventListener("click", async () => {
      const confirmed = confirm(`Are you sure you want to delete the project "${project.title}"?`);
      if (!confirmed) return;

      try {
        await db.collection("projects").doc(docId).delete();
        alert("Project deleted successfully.");
        loadProjects(); // Refresh list
      } catch (error) {
        console.error("Error deleting project:", error);
        alert("Failed to delete project. Try again.");
      }
    });

    projectsContainer.appendChild(div);
  });
}


function loadStudentProjects() {
  const container = document.getElementById('grade-content');
  if (!container) return;
  const userEmail = auth.currentUser.email;

  db.collection("projects")
    .where('studentEmail', '==', userEmail)
    .orderBy('createdAt', 'desc')
    .get()
    .then(snapshot => {
      if (snapshot.empty) {
        container.innerHTML += `
          <div class="mt-6 bg-white p-4 rounded-xl shadow-md">
            <h3 class="font-semibold text-lg text-orange-700">Uploaded Projects</h3>
            <p class="text-gray-600">No projects uploaded yet.</p>
          </div>
        `;
        return;
      }

      let projectHTML = `
        <div class="mt-6 bg-white p-4 rounded-xl shadow-md">
          <h3 class="font-semibold text-lg text-orange-700 mb-2">Uploaded Projects</h3>
      `;

      snapshot.forEach(doc => {
        const p = doc.data();
        projectHTML += `
          <div class="mb-4 border-b pb-3">
            <h4 class="font-semibold">${p.title}</h4>
            <p class="text-sm text-gray-600">${p.description || "No description"}</p>
            <a href="${p.fileURL}" target="_blank" class="text-yellow-600 hover:underline text-sm">View File</a>
            <p class="text-sm text-gray-700">Status: <strong>${p.status}</strong></p>
          </div>
        `;
      });

      projectHTML += `</div>`;
      container.innerHTML += projectHTML;
    })
    .catch(err => {
      console.error("Error loading student projects:", err);
    });
}

function loadResources() {
  const container = document.getElementById("resourceList");
  if (!container) return;

  db.collection("resources").orderBy("createdAt", "desc").get().then(snapshot => {
    if (snapshot.empty) {
      container.innerHTML = "<p class='text-gray-600'>No resources available.</p>";
      return;
    }

    container.innerHTML = "";
    snapshot.forEach(doc => {
      const r = doc.data();
      const div = document.createElement("div");
      div.className = "bg-white p-4 rounded-xl shadow-md flex justify-between items-center";

      div.innerHTML = `
        <div>
          <h3 class="font-semibold text-lg">${r.title}</h3>
          <p class="text-sm text-gray-600">${r.description || "No description"}</p>
        </div>
        <a href="${r.fileURL}" target="_blank" class="text-yellow-600 font-medium hover:underline">Open</a>
      `;

      container.appendChild(div);
    });
  }).catch(error => {
    console.error("Error loading resources:", error);
  });
}
