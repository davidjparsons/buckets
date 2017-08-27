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
        })


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


(function(){
       //do get request
       //build inner body of html
})();


        // var myBooks = [
        //     {
        //         "Book ID": "1",
        //         "Book Name": "Computer Architecture",
        //         "Category": "Computers",
        //         "Price": "125.60"
        //     },
        //     {
        //         "Book ID": "2",
        //         "Book Name": "Asp.Net 4 Blue Book",
        //         "Category": "Programming",
        //         "Price": "56.00"
        //     },
        //     {
        //         "Book ID": "3",
        //         "Book Name": "Popular Science",
        //         "Category": "Science",
        //         "Price": "210.40"
        //     }
        // ]
        
    // EXTRACT VALUE FOR HTML HEADER. 
            // ('Book ID', 'Book Name', 'Category' and 'Price')
            var col = [];
            for (var i = 0; i < myBooks.length; i++) {
                for (var key in myBooks[i]) {
                    if (col.indexOf(key) === -1) {
                        col.push(key);
                    }
                }
            }

            // CREATE DYNAMIC TABLE.
            var table = document.createElement("table");

            // CREATE HTML TABLE HEADER ROW USING THE EXTRACTED HEADERS ABOVE.

            var tr = table.insertRow(-1);                   // TABLE ROW.

            for (var i = 0; i < col.length; i++) {
                var th = document.createElement("th");      // TABLE HEADER.
                th.innerHTML = col[i];
                tr.appendChild(th);
            }

            // ADD JSON DATA TO THE TABLE AS ROWS.
            for (var i = 0; i < myBooks.length; i++) {

                tr = table.insertRow(-1);

                for (var j = 0; j < col.length; j++) {
                    var tabCell = tr.insertCell(-1);
                    tabCell.innerHTML = myBooks[i][col[j]];
                }
            }

            // FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
            var divContainer = document.getElementById("showData");
            divContainer.innerHTML = "";
            divContainer.appendChild(table);
        }