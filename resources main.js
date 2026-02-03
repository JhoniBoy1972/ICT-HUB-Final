document.addEventListener("DOMContentLoaded", () => {
  const resources = [
    {
      title: "ICT Theory Notes (Grades 10–11)",
      description: "Structured theory notes covering hardware, software, networking, and data representation.",
      link: "https://example.com/ict-theory-notes.pdf"
    },
    {
      title: "ICT Past Papers & Marking Schemes",
      description: "School and national exam past papers with official marking schemes.",
      link: "https://example.com/ict-past-papers.pdf"
    },
    {
      title: "ICT Practical Workbook",
      description: "Hands-on exercises for Word, Excel, PowerPoint, and basic programming concepts.",
      link: "https://example.com/ict-practical-workbook.pdf"
    },
    {
      title: "ICT Revision Diagrams & Mind Maps",
      description: "Visual summaries for databases, logic gates, networks, and system components.",
      link: "https://example.com/ict-diagrams.pdf"
    }
  ];

  const resourceList = document.getElementById("resourceList");

  resources.forEach(resource => {
    const card = document.createElement("div");
    card.className = "bg-white p-4 rounded-xl shadow-md flex justify-between items-center";

    card.innerHTML = `
      <div>
        <h3 class="font-semibold text-lg">${resource.title}</h3>
        <p class="text-sm text-gray-600">${resource.description}</p>
      </div>
      <a href="${resource.link}" target="_blank" class="text-yellow-600 font-medium hover:underline">Open</a>
    `;

    resourceList.appendChild(card);
  });
});