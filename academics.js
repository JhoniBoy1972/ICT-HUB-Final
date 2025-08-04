const grades = [
  {grade: '2', desc: 'Start your ICT journey with fun and simple projects designed for beginners.'},
  {grade: '3', desc: 'Explore basic computer skills and creative projects to build your foundation.'},
  {grade: '4', desc: 'Learn simple programming concepts and improve your digital creativity.'},
  {grade: '5', desc: 'Develop problem-solving skills with intermediate-level ICT projects.'},
  {grade: '6', desc: 'Start building real-world projects and understand key ICT principles.'},
  {grade: '7', desc: 'Enhance your coding skills and learn to organize your projects efficiently.'},
  {grade: '8', desc: 'Explore data management and advanced programming techniques.'},
  {grade: '9', desc: 'Work on collaborative projects and deepen your ICT knowledge.'},
  {grade: '10', desc: 'Prepare for ICT exams with focused projects and study resources.'},
  {grade: '11', desc: 'Master complex ICT concepts and complete your final year projects confidently.'},
];

const container = document.getElementById('grades-container');

grades.forEach(({grade, desc}) => {
  const card = document.createElement('a');
  card.href = `login.html?grade=${grade}`; // Redirect to single login page with grade param
  card.className = 'block bg-white rounded-lg shadow-lg border border-gray-200 hover:shadow-xl transition p-8 text-center';
  card.innerHTML = `
    <h3 class="text-2xl font-semibold text-orange-600 mb-2">Grade ${grade}</h3>
    <p class="text-gray-700">${desc}</p>
  `;
  container.appendChild(card);
});
