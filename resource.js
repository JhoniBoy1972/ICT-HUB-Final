document.addEventListener("DOMContentLoaded", () => {
  const resources = [
    {
      title: "Science Notes - Grade 10",
      description: "A PDF file with summaries of key chapters.",
      link: "https://example.com/science-grade10.pdf"
    },
    {
      title: "ICT Theory Revision",
      description: "Includes past papers and model answers.",
      link: "https://example.com/ict-revision.pdf"
    },
    {
      title: "Business Studies - Diagrams",
      description: "Visual guide for key concepts.",
      link: "https://example.com/business-diagrams.pdf"
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
