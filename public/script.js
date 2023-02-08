const onSubmit = (e) => {
  e.preventDefault();

  const lga_id = document.querySelector("#lga_id").value;

  if (lga_id === "none") {
    alert("Select an Option");
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
    const data = await response.json();
    console.log(data);

    
    removeSpinner();
  } catch (error) {
    document.querySelector(".msg").textContent = error;
  }
}



const showSpinner = () => {
  document.querySelector(".loader").classList.add("show");
}

const removeSpinner = () => {
  document.querySelector(".loader").classList.remove("show");
}

document.querySelector("#lga-form").addEventListener("submit", onSubmit);

