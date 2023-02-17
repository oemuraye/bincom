let table = document.querySelector(".data");
const msgWarning = document.querySelector(".msg");


const onSubmit = (e) => {
  e.preventDefault();

  const lga_id = document.querySelector("#lga_id").value;

  if (lga_id === "none") {
    msgWarning.textContent = "Select an Option";
    setTimeout(() => {
      msgWarning.textContent = "";
    }, 3000);
    return;
  }

  getLgaResults(lga_id);

}

const getLgaResults = async (lga_id) => {
  try {
    showSpinner();

    const response = await fetch("/result/lga", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        lga_id,
      }),
    });
    const data_results = await response.json();
    
    if (table.innerHTML !== "") {
      table.innerHTML = "";
    }    

    getFilteredPoll(data_results)
    
    removeSpinner();
  } catch (error) {
    msgWarning.textContent = "Try Again: Something went wrong";
    setTimeout(() => {
      msgWarning.textContent = "";
    }, 3000);
    removeSpinner();
  }
}

const getFilteredPoll = (data_results) => {
  const pollingUnit = data_results.polling_unit_id
  const pollingUnitResults = data_results.polling_unit_results

  if (pollingUnit.length === 0) {
    table.innerHTML = `<p>No Result was found</p>`
  } else {
    pollingUnit.forEach((pollingUnitID) => {
      const results = pollingUnitResults.filter(
        (pollResults) => (pollResults.polling_unit_uniqueid = pollingUnitID)
      );
      displayPollingResults(results);
    });
  }
}



const displayPollingResults = async (results) => {
  let tableRows = "";
  
  const pdp = results.filter((element) => element.party_abbreviation === "PDP")
  
  pdp.forEach((element) => {

    tableRows += `
      <tr>
          <td>${element.polling_unit_uniqueid}</td>
          <td>${element.party_score}</td>
          <td>${element.party_abbreviation}</td>
      </tr>
    `;
  })
  table.innerHTML += tableRows;
}


const showSpinner = () => {
  document.querySelector(".loader").classList.add("show");
}

const removeSpinner = () => {
  document.querySelector(".loader").classList.remove("show");
}

document.querySelector("#lga-form").addEventListener("submit", onSubmit);

