function IsNumber(value) {
    value = parseInt(value);

    return typeof value === 'number';
}

async function GetData() {
    let url = "https://cvrapi.dk/api?serach=&country=dk&vat=";
    let vat = document.getElementById("vat-input").value;
    
    
    let myheaders = new Headers();
    myheaders.append("Content-Type", "application/json");
    
    if (IsNumber(vat)) {
        url += vat;
        console.log("URL", url);
        
        return await jQuery.ajax
        ({
            type: "GET",
            dataType: "jsonp",
            url: "//cvrapi.dk/api?search=" + vat + "&country=dk",
          success: function (response)
          {
            return response;
          }
        });
    } else {
        alert("VAT Input must be a number.")
        return null;
    }
}

async function BuildTable() {
    let data = await GetData();

    console.log("data", data, data.length);

    if (!data) {
        console.log("No data");
        return;
    } else {
        var table = document.getElementById("vat-table");

        var row = document.createElement("tr");

        var cellVat = document.createElement("td");
        var textVat = document.createTextNode(data.vat);
        cellVat.appendChild(textVat);
        row.appendChild(cellVat);

        var cellName = document.createElement("td");
        var textName = document.createTextNode(data.name);
        cellName.appendChild(textName);
        row.appendChild(cellName);

        var cellAddress = document.createElement("td");
        var textAddress = document.createTextNode(data.address);
        cellAddress.appendChild(textAddress);
        row.appendChild(cellAddress);

        var cellZip = document.createElement("td");
        var textZip = document.createTextNode(data.zipcode);
        cellZip.appendChild(textZip);
        row.appendChild(cellZip);

        var cellCity = document.createElement("td");
        var textCity = document.createTextNode(data.city);
        cellCity.appendChild(textCity);
        row.appendChild(cellCity);

        var cellPhone = document.createElement("td");
        var textPhone = document.createTextNode(data.phone);
        cellPhone.appendChild(textPhone);
        row.appendChild(cellPhone);

        var cellEMail = document.createElement("td");
        var textEMail = document.createTextNode(data.email);
        cellEMail.appendChild(textEMail);
        row.appendChild(cellEMail);

        var cellStart = document.createElement("td");
        var textStart = document.createTextNode(data.startdate);
        cellStart.appendChild(textStart);
        row.appendChild(cellStart);

        var cellEmployees = document.createElement("td");
        var textEmployees = document.createTextNode(data.employees);
        cellEmployees.appendChild(textEmployees);
        row.appendChild(cellEmployees);

        table.appendChild(row);
    }
}

async function BuildTableFromDB() {
    let url = "//localhost/cvr-opgave/api.php"

    const response = await jQuery.ajax
    ({
        type: "GET",
        dataType: "json",
        url: url,
      success: function (response)
      {
        return response;
      }
    });

    for (let i = 0; i < response.length; i++) {
        var table = document.getElementById("vat-table");

        var row = document.createElement("tr");

        var cellVat = document.createElement("td");
        var textVat = document.createTextNode(response[i]["cvr"]);
        cellVat.appendChild(textVat);
        row.appendChild(cellVat);

        var cellName = document.createElement("td");
        var textName = document.createTextNode(response[i]["name"]);
        cellName.appendChild(textName);
        row.appendChild(cellName);

        var cellAddress = document.createElement("td");
        var textAddress = document.createTextNode(response[i]["address"]);
        cellAddress.appendChild(textAddress);
        row.appendChild(cellAddress);

        var cellZip = document.createElement("td");
        var textZip = document.createTextNode(response[i]["zipcode"]);
        cellZip.appendChild(textZip);
        row.appendChild(cellZip);

        var cellCity = document.createElement("td");
        var textCity = document.createTextNode(response[i]["city"]);
        cellCity.appendChild(textCity);
        row.appendChild(cellCity);

        var cellPhone = document.createElement("td");
        var textPhone = document.createTextNode(response[i]["phone"]);
        cellPhone.appendChild(textPhone);
        row.appendChild(cellPhone);

        var cellEMail = document.createElement("td");
        var textEMail = document.createTextNode("");
        cellEMail.appendChild(textEMail);
        row.appendChild(cellEMail);

        var cellStart = document.createElement("td");
        var textStart = document.createTextNode(response[i]["startdate"]);
        cellStart.appendChild(textStart);
        row.appendChild(cellStart);

        var cellEmployees = document.createElement("td");
        var textEmployees = document.createTextNode("");
        cellEmployees.appendChild(textEmployees);
        row.appendChild(cellEmployees);

        var cellIndustryDesc = document.createElement("td");
        var textIndustryDesc = document.createTextNode("");
        cellIndustryDesc.appendChild(textIndustryDesc);
        row.appendChild(cellIndustryDesc);

        table.appendChild(row);        
    }
}

async function UploadTable() {
    let rows = document.getElementById("vat-table").rows;
    let url = "//localhost/cvr-opgave/api.php"
    let myheaders = new Headers();
    myheaders.append("Content-Type", "application/json");

    for (i = 1; i < rows.length; i++) {
        let row = rows[i];

        let cellCvr = row.cells[0].innerHTML;
        let cellName = row.cells[1].innerHTML;
        let celladdress = row.cells[2].innerHTML;
        let cellZipcode = row.cells[3].innerHTML;
        let cellCity = row.cells[4].innerHTML;
        let cellPhone = row.cells[5].innerHTML;
        let cellStartdate = row.cells[7].innerHTML;

        const response = await fetch(url, {
            method: "POST",
            body: JSON.stringify({
                cvr: cellCvr,
                name: cellName,
                startdate: cellStartdate,
                address: celladdress,
                zipcode: cellZipcode,
                city: cellCity,
                phone: cellPhone
            }),
            headers: myheaders
        })
        .then((response) => response.json)
        .then((data) => {
            console.log("Data", data);
            return data;
        })
        .catch((error) => console.error(error));
    }
}

window.onload = function () {
    document.getElementById("search-button").onclick = function () {
        BuildTable();
    }
    document.getElementById("upload-table-button").onclick = function () {
        UploadTable();
    }
    document.getElementById("current-button").onclick = function () {
        BuildTableFromDB();
    }
}