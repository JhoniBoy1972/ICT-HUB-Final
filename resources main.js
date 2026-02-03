document.addEventListener("DOMContentLoaded", () => {
  const resources = [
    {
    title: "ICT Past Papers & Marking Schemes Ordinary level",
      description: "School and national exam past papers with official marking schemes.",
      link: "https://www.google.com/amp/s/pastpapers.wiki/gce-o-l-information-communication-technology-past-papers-with-answers/%3famp"
    },
    {
      title: "ICT Practical Workbook",
      description: "Hands-on exercises for Word, Excel, PowerPoint, and basic programming concepts.",
      link: "http://www.edupub.gov.lk/BooksDownload.php"
    },
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