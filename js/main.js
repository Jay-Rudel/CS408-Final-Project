// This is the server connection for my API
const serverLocation = "https://mu7w9u3n75.execute-api.us-east-2.amazonaws.com/items";

function loadItems() {
    // Connecting with the database
    fetch(serverLocation)
        .then(res => res.json())
        .then(data => {
            console.log("DATA FROM SERVER:", data);
            const table = document.getElementById("TableData");

            // Checking to see if there is data for us to display
            if (data.length === 0) {
                table.innerHTML = '<tr><td colspan="6">There are no photographers to list</td></tr>';
                return;
            }

            table.innerHTML = "";

            // Checking each item and then adding them to the table.
            data.forEach(item => {
                // if(item.id == "Jay" || item.id == "Dee" || item.id == "Enid"){
                //     const row = `<tr>
                //                     <td>${item.id}</td>
                //                     <td>${item.contactInfo}</td>
                //                     <td>${item.speciality}</td>
                //                     <td>${item.helped}</td>
                //                     <td>${item.rate}</td>
                //                     <td>Unable to Delete</td>
                //                 </tr>`;
                //     // Cant delete These three.
                // table.innerHTML += row;
                // }
                // else{
                    const row = `<tr>
                                    <td>${item.id}</td>
                                    <td>${item.contactInfo}</td>
                                    <td>${item.speciality}</td>
                                    <td>${item.helped}</td>
                                    <td>${item.rate}</td>
                                    <td><button class="btn" onclick="deleteItem('${item.id}')">Delete</button></td>
                                </tr>`;

                table.innerHTML += row;
                // }
                
            });
        }); // Cleaning all the closing brackets.
}


// The following is how a new item is added to the table;
document.getElementById("simpleApply").onsubmit = function (e) {
    e.preventDefault();

    // the values that want to be added
    const id = document.getElementById("newId").value;
    const contactInfo = document.getElementById("contactInfo").value;
    const speciality= document.getElementById("speciality").value;
    const helped = 0;
    const rate = document.getElementById("rate").value;

    // Connecting and putting them into the database
    fetch(serverLocation, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, contactInfo, speciality, helped, rate })
    }).then(() => loadItems());

    document.getElementById("simpleApply").reset();
};

// The following function is used to delete a new item
function deleteItem(id) {
    fetch(`${serverLocation}/${id}`, { method: "DELETE" }).then(() => loadItems());
}

document.getElementById("customInformation").onsubmit = function (e) {
    e.preventDefault(); //Prevents page reload

    const id = document.getElementById("CInewName").value;
    const contactInfo = document.getElementById("CInewContactInfo").value;
    const speciality= document.getElementById("CInewSpeciality").value;
    const helped = document.getElementById("CInewCustomClientNum").value;
    const rate = document.getElementById("CInewPrice").value;

    // Connecting and putting them into the database
    fetch(serverLocation, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, contactInfo, speciality, helped, rate })
    });

    document.getElementById("customInformation").reset(); //resets the form
};

// Very first load
loadItems();