// create new trainer
async function authenticateAndRedirect() {
  const password = prompt("Please enter the password:");
  try {
    const response = await fetch("/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password }),
    });

    if (response.ok) {
      window.location.href = "/new";
    } else {
      alert("Incorrect password!");
    }
  } catch (error) {
    alert("Authentication failed. Please try again.");
  }
}

// release pokemon from trainer
async function authenticateAndRelease(pokemonName, trainerName, form) {
  const password = prompt("Please enter the password to release this Pokemon:");
  try {
    const response = await fetch("/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password }),
    });

    if (response.ok) {
      form.submit();
    } else {
      alert("Incorrect password! Cannot release Pokemon.");
    }
  } catch (error) {
    alert("Authentication failed. Please try again.");
  }
}

// add pokemon to trainer
async function authenticateAndAdd(trainerName, form) {
  const password = prompt("Please enter the password to add this Pokemon:");
  try {
    const response = await fetch("/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password }),
    });

    if (response.ok) {
      form.submit();
    } else {
      alert("Incorrect password! Cannot add Pokemon.");
    }
  } catch (error) {
    alert("Authentication failed. Please try again.");
  }
}
