function CreateTableFromJSON() {
       fetch('http://localhost:3000/api/league')  
        .then(  
            function(response) {  
            if (response.status !== 200) {  
                console.log('Looks like there was a problem. Status Code: ' +  
                response.status);  
                return;  
            }

            // Examine the text in the response  
            response.json().then(function(data) {  
                console.log(data);  
            });  
            }  
        )  
        .catch(function(err) {  
            console.log('Fetch Error :-S', err);  
        });


// get reference to body   
var body = document.getElementsByTagName("body")[0];

// create elements <table> and a <tbody>
var tbl     = document.createElement("table");
var table = document.createElement("tbody");

// Create an empty <tr> element and add it to the 1st position of the table:
var row = table.insertRow(0);

// Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
var cell1 = row.insertCell(0);
var cell2 = row.insertCell(1);

// Add some text to the new cells:
cell1.innerHTML = "NEW CELL1";
cell2.innerHTML = "NEW CELL2";

};