var addState = false; 

function changeAddState(){
    addState = !addState; 
    reRender(); 
}

function reRender(){
    const addForm = document.getElementById("add_form");
    
    if(addState == true){
        addForm.style.display = "block"; 
    }
    else{
        addForm.style.display = "none"; 
    }
}

async function GetParts() {
    try {
        const response = await fetch("./api/parts", {
            method: "GET",
            headers: { "Accept": "application/json" }
        });

        console.log("Response Status:", response.status);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Response Data:", data); 

        const parts = data; 
       
        const resultHTML =  parts.map(part => 
          `<tr>
            <td>${part.Name}</td>
            <td>${part.Manufacturer}</td>
            <td>${part.PartNumber}</td>
            <td>${part.Category}</td>
            <td>${part.Price}</td>
            <td>${part.Quantity}</td>
          </tr>`).join('');

        document.getElementById("result").innerHTML = resultHTML;

    } catch (error) {
        console.error("Fetch error:", error);
    }
}

async function SearchParts(e) {
    e.preventDefault(); 

    var name = document.getElementById("name_search_input").value; 
    var partNumber = document.getElementById("partNumber_search_input").value; 
    var manufacturer = document.getElementById("manufacturer_search_input").value; 

    try {
        let queryParams = new URLSearchParams();
        
        if(name != "") queryParams.append('name', name);
        if(partNumber != "") queryParams.append('partNumber', partNumber);
        if(manufacturer != "") queryParams.append('manufacturer', manufacturer);
        
        let uri = `./api/parts/search/?${queryParams.toString()}`;

        const response = await fetch(uri, {
            method: "GET",
            headers: { "Accept": "application/json" }
        });

        console.log("Response Status:", response.status);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Response Data:", data); 

        const parts = data; 
       
        const resultHTML =  parts.map(part => 
          `<tr>
            <td>${part.Name}</td>
            <td>${part.Manufacturer}</td>
            <td>${part.PartNumber}</td>
            <td>${part.Category}</td>
            <td>${part.Price}</td>
            <td>${part.Quantity}</td>
          </tr>`).join('');

        document.getElementById("result").innerHTML = resultHTML;

    } catch (error) {
        console.error("Fetch error:", error);
    }
}

async function AddPart(e) {
    e.preventDefault(); 

    const addBody = {
        name : document.getElementById("name_add_input").value,  
        partNumber : document.getElementById("partNumber_add_input").value, 
        manufacturer : document.getElementById("manufacturer_add_input").value, 
        category : document.getElementById("category_add_input").value,  
        price : document.getElementById("price_add_input").value,  
        quantity : document.getElementById("quantity_add_input").value 
    }

    try {
        let uri = `./api/parts`;
        
        const response = await fetch(uri, {
            method: "POST",
            body: JSON.stringify(addBody),  
            headers: { 
                "Accept": "application/json", 
                "Content-Type": "application/json" 
            }
        });

        console.log("Response Status:", response.status);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        GetParts();
    } catch (error) {
        console.error("Fetch error:", error);
    }
}

// первичная загрузка 
GetParts(); 
reRender(); 