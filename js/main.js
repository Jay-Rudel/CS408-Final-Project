// This is the server connection for my API
const serverLocation = "https://mu7w9u3n75.execute-api.us-east-2.amazonaws.com/items";

function loadItems() {
    // Connecting with the database
    fetch(serverLocation)
        .then(res => res.json())
        .then(data => {

            const table = document.getElementById("TableData");

            // Checking to see if there is data for us to display
            if (data.length === 0) {
                table.innerHTML = '<tr><td colspan="4">There is no data to display</td></tr>';
                return;
            }

            table.innerHTML = "";

            // Checking each item and then adding them to the table.
            data.forEach(item => {
                const row = `<tr>
                                    <td>${item.id}</td>
                                    <td>${item.name}</td>
                                    <td>${item.price}</td>
                                    <td><button class="btn" onclick="deleteItem('${item.id}')">Delete</button></td>
                                </tr>`;

                table.innerHTML += row;
            });
        }); // Cleaning all the closing brackets.
}

// The following is how a new item is added to the table;
document.getElementById("itemForm").onsubmit = function (e) {
    e.preventDefault();

    // The three values that we want to add to the database
    const id = document.getElementById("newID").value;
    const name = document.getElementById("newProduct").value;
    const price = Number(document.getElementById("newPrice").value);

    // Connecting and putting them into the database
    fetch(serverLocation, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, name, price })
    }).then(() => loadItems());

    document.getElementById("itemForm").reset();
};

// The following function is used to delete a new item
function deleteItem(id) {
    fetch(`${serverLocation}/${id}`, { method: "DELETE" }).then(() => loadItems());
}

// Very first load
loadItems();



function CustomDataSaveFromFormPage(e){
    e.preventDefault(); //Prevents page reload



    document.getElementById("customInformation").reset(); //resets the form
}