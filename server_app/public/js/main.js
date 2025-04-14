// public/js/main.js

document.addEventListener('DOMContentLoaded', () => {
  fetchParts();
});

class partModel{}

const fetchParts = async () => {
  try {
    var parts; 

    await fetch('/api/parts/')
        .then(response => response.json())
        .then(data => {parts = data}); 

      console.log(parts);
      displayParts(parts);
  } catch (error) {
      console.error('Error fetching:', error);
  }
};

const displayParts = (parts) => {
  const partListDiv = document.getElementById('partList');
  partListDiv.innerHTML = '';

  parts.map(part => {
      partListDiv.innerHTML += `<p>ID: ${part.ID} Name: ${part.Name} Manufacturer: ${part.Manufacturer} Part Number: ${part.PartNumber} Price: ${part.Price} Quantity: ${part.Qunatity}</p>`;
  });
};
