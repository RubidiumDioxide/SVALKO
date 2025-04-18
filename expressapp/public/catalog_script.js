var addState = false; 
var editState = false; 
var capturedRow = {};  

function changeAddState(){
    addState = !addState; 
    reRender(); 
}

function changeEditState(rowElement){
    const part = getRowData(rowElement); 

    if(part.ID != capturedRow.ID){
        capturedRow = part;  

        Object.keys(part).forEach(key =>
            {
                const input =  document.getElementById(key + "_edit_input"); 

                if(input != null)
                    input.value = part[key]; 
            }
        )
    }

    editState = !editState; 
    
    reRender(); 
}

function reRender(){
    const addForm = document.getElementById("add_form");
    
    if(addState == true)
        addForm.style.display = "block"; 
    else
        addForm.style.display = "none"; 

    const editForm = document.getElementById("edit_form");
    
    if(editState == true)
        editForm.style.display = "block"; 
    else
        editForm.style.display = "none"; 
}

async function GetParts() {
    $.ajax({
        url: "./api/parts", 
        type: "GET",
        success: function (response) {
            console.log("Response:", response);
    
            const parts = response; 
            const templateUrl = "partials/part.hbs";
    
            fetch(templateUrl)
                .then(response => response.text())
                .then(templateText => {
                    const template = Handlebars.compile(templateText);
    
                    const resultHTML = parts.map(part => {
                        return template(part); 
                    }).join('');
    
                    document.getElementById("result").innerHTML = resultHTML;
                })
                .catch(templateError => {
                    console.error("Template fetch error:", templateError);
                });
        },
        error: function (xhr, status, error) {
            console.error("Error:", error);
        }
    });
}

async function SearchParts(e) {
    e.preventDefault(); 

    var name = document.getElementById("name_search_input").value; 
    var partNumber = document.getElementById("partNumber_search_input").value; 
    var manufacturer = document.getElementById("manufacturer_search_input").value; 

    let queryParams = new URLSearchParams();
        
    if(name != "") queryParams.append('name', name);
    if(partNumber != "") queryParams.append('partNumber', partNumber);
    if(manufacturer != "") queryParams.append('manufacturer', manufacturer);
    
    let uri = `./api/parts/search/?${queryParams.toString()}`;

    $.ajax({
        url: uri, 
        type: "GET",
        success: function (response) {
            console.log("Response:", response);
    
            const parts = response; 
            const templateUrl = "partials/part.hbs";
    
            fetch(templateUrl)
                .then(response => response.text())
                .then(templateText => {
                    const template = Handlebars.compile(templateText);
    
                    const resultHTML = parts.map(part => {
                        return template(part); 
                    }).join('');
    
                    document.getElementById("result").innerHTML = resultHTML;
                })
                .catch(templateError => {
                    console.error("Template fetch error:", templateError);
                });
        },
        error: function (xhr, status, error) {
            console.error("Error:", error);
        }
    });
}

async function SortParts(e, column){
    e.preventDefault(); 
    
    $.ajax({
        url: `./api/parts/sort/${column}`, 
        type: "GET",
        success: function (response) {
            console.log("Response:", response);
    
            const parts = response; 
            const templateUrl = "partials/part.hbs";
    
            fetch(templateUrl)
                .then(response => response.text())
                .then(templateText => {
                    const template = Handlebars.compile(templateText);
    
                    const resultHTML = parts.map(part => {
                        return template(part); 
                    }).join('');
    
                    document.getElementById("result").innerHTML = resultHTML;
                })
                .catch(templateError => {
                    console.error("Template fetch error:", templateError);
                });
        },
        error: function (xhr, status, error) {
            console.error("Error:", error);
        }
    });
}

async function AddPart(e) {
    e.preventDefault(); 

    const part = getAddFormData();

    $.ajax({
        url: `./api/parts`, 
        type: "POST",
        contentType: "application/json", 
        data: JSON.stringify(part),
    success: function (response) {
        console.log("Response:", response); 
        GetParts(); 
    },
    error: function (xhr, status, error) {
        console.error("Error:", error);
    }
    });
}

async function deletePart(rowElement){
    const id = getRowId(rowElement); 
    
    $.ajax({
        url: `./api/parts/${id}`, 
        type: "DELETE", 
    success: function (response) {
        console.log("Response:", response); 
        GetParts(); 
    },
    error: function (xhr, status, error) {
        console.error("Error:", error);
    }
    });
}

async function editPart(e){
    e.preventDefault(); 

    const part = getEditFormData(); 
    const id = capturedRow.ID; 

    $.ajax({
        url: `./api/parts/${id}`, 
        type: "PUT",
        contentType: "application/json", 
        data: JSON.stringify(part),
    success: function (response) {
        console.log("Response:", response); 
        GetParts(); 
    },
    error: function (xhr, status, error) {
        console.error("Error:", error);
    }
    });
}

function getRowData(rowElement) {
    const row = rowElement.closest('tr'); 

    if (!row) {
      console.error('Button is not inside a table row.');
      return;
    }

    const id = row.querySelector('td:nth-child(1)')?.textContent.trim() || ''; 
    const name = row.querySelector('td:nth-child(2)')?.textContent.trim() || ''; 
    const manufacturer = row.querySelector('td:nth-child(3)')?.textContent.trim() || '';
    const partNumber = row.querySelector('td:nth-child(4)')?.textContent.trim() || '';
    const category = row.querySelector('td:nth-child(5)')?.textContent.trim() || '';
    const price = row.querySelector('td:nth-child(6)')?.textContent.trim() || '';
    const quantity = row.querySelector('td:nth-child(7)')?.textContent.trim() || '';
    
    return {
        ID : id,
        Name : name, 
        Manufacturer : manufacturer, 
        PartNumber : partNumber, 
        Category : category, 
        Price : price, 
        Quantity : quantity 
    }
}

function getRowId(rowElement) {
    const row = rowElement.closest('tr'); 

    if (!row) {
      console.error('Button is not inside a table row.');
      return;
    }

    const id = row.querySelector('td:nth-child(1)')?.textContent.trim() || ''; 

    return id; 
}
  
function getEditFormData(){
    return {
        ID : null, 
        Name : document.getElementById("Name_edit_input").value,
        Manufacturer : document.getElementById("Manufacturer_edit_input").value,
        PartNumber : document.getElementById("PartNumber_edit_input").value,
        Category : document.getElementById("Category_edit_input").value,
        Price : document.getElementById("Price_edit_input").value,
        Quantity : document.getElementById("Quantity_edit_input").value 
    }
}

function getAddFormData(){
    return {
        ID : null, 
        Name : document.getElementById("Name_add_input").value,
        Manufacturer : document.getElementById("Manufacturer_add_input").value,
        PartNumber : document.getElementById("PartNumber_add_input").value,
        Category : document.getElementById("Category_add_input").value,
        Price : document.getElementById("Price_add_input").value,
        Quantity : document.getElementById("Quantity_add_input").value 
    }
}


// первичная загрузка 
GetParts(); 
reRender(); 