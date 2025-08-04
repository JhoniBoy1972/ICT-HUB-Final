// Sample resource data (you can replace or load dynamically from Firebase later)
const resources = [
  { title: "Grade 2 English Workbook", url: "https://example.com/english-workbook" },
  { title: "Maths Practice Sheets", url: "https://example.com/maths-sheets" },
  { title: "Science Revision Notes", url: "https://example.com/science-notes" }
];

const list = document.getElementById("resourceList");

resources.forEach(resource => {
  const li = document.createElement("li");
  const a = document.createElement("a");
  a.href = resource.url;
  a.textContent = resource.title;
  a.className = "text-blue-600 hover:underline";
  a.target = "_blank";
  li.appendChild(a);
  list.appendChild(li);
});
