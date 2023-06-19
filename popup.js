let currentKey;

chrome.storage.sync.get(null, function (items) {
  const container = document.getElementById("savedItems");
  if (Object.keys(items).length === 0) {
    container.textContent = "No saved items yet.";
    return;
  }

  for (let key in items) {
    let itemDiv = document.createElement("div");
    itemDiv.className = "list-group-item";
    itemDiv.onclick = () => displayDetail(key, items[key]);

    let deleteButton = document.createElement("button");
    deleteButton.className = "btn btn-sm btn-danger float-right";
    deleteButton.innerHTML = '<i class="fa fa-trash"></i>';
    deleteButton.onclick = (e) => {
      e.stopPropagation();
      chrome.storage.sync.remove(key, function () {
        itemDiv.remove();
      });
    };

    let titleDiv = document.createElement("a");
    titleDiv.textContent = items[key].title;
    titleDiv.href = items[key].url;
    titleDiv.target = "_blank";
    titleDiv.className = "font-weight-bold d-block";

    let textDiv = document.createElement("div");
    textDiv.textContent = items[key].text;
    textDiv.className = "truncate";

    itemDiv.appendChild(deleteButton);
    itemDiv.appendChild(titleDiv);
    itemDiv.appendChild(textDiv);

    container.appendChild(itemDiv);
  }

  document.getElementById("backButton").onclick = () => {
    document.getElementById("detailContainer").style.display = "none";
    document.getElementById("listContainer").style.display = "block";
  };

  document.getElementById("updateButton").onclick = () => {
    const updatedData = {
      title: document.getElementById("detailTitle").textContent,
      url: document.getElementById("detailTitle").href,
      text: document.getElementById("detailText").value,
    };

    chrome.storage.sync.set({ [currentKey]: updatedData }, function () {
      location.reload();
    });
  };
});

function displayDetail(key, item) {
  document.getElementById("detailContainer").style.display = "block";
  document.getElementById("listContainer").style.display = "none";

  document.getElementById("detailTitle").textContent = item.title;
  document.getElementById("detailTitle").href = item.url;
  document.getElementById("detailText").value = item.text;

  currentKey = key;
}
