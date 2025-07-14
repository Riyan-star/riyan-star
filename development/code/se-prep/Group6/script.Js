// Wait for the page to fully load
document.addEventListener("DOMContentLoaded", () => {
  loadRecipes();
  attachButtonListeners();
});

// Load recipes from JSON file
function loadRecipes() {
  fetch('recipes.json')
    .then(response => response.json())
    .then(data => {
      displayRecipes(data);
    })
    .catch(error => console.error("Error loading recipes:", error));
}

// Function to display recipes in the container
function displayRecipes(recipes) {
  let container = document.getElementById("recipesContainer");
  container.innerHTML = "";

  recipes.forEach(recipe => {
    let card = document.createElement("div");
    card.classList.add("recipe-card");

    card.innerHTML = `
      <h3>${recipe.name}</h3>
      <p><strong>Category:</strong> ${recipe.category}</p>
      <p><strong>Ingredients:</strong> ${recipe.ingredients}</p>
      <p><strong>Instructions:</strong> ${recipe.instructions}</p>
      <button class="delete-btn" onclick="deleteRecipe('${recipe.name}')">Delete</button>
    `;

    container.appendChild(card);
  });
}

// Handle recipe form submission
let form = document.getElementById("recipeForm");

form.addEventListener("submit", function(event) {
  event.preventDefault();

  let name = document.getElementById("name").value;
  let category = document.getElementById("category").value;
  let ingredients = document.getElementById("ingredients").value;
  let instructions = document.getElementById("instructions").value;

  // For now, just log it to console — can't add directly to JSON file from frontend
  console.log("New Recipe Submitted:");
  console.log({
    name,
    category,
    ingredients,
    instructions
  });

  alert("Recipe submitted successfully (check console)!");

  form.reset();
});

// Delete recipe card by name
function deleteRecipe(recipeName) {
  let confirmDelete = confirm(`Are you sure you want to delete "${recipeName}"?`);
  if (confirmDelete) {
    alert(`"${recipeName}" removed (frontend only).`);
    // In real API, you'd make a DELETE request here
    loadRecipes(); // Re-load from JSON (static for now)
  }
}

// Attach listeners for other buttons
function attachButtonListeners() {
  // Edit button
  document.getElementById("editBtn").addEventListener("click", () => {
    alert("Edit functionality is not implemented yet.");
  });

  // Filter by Category button
  document.getElementById("filterBtn").addEventListener("click", () => {
    let selectedCategory = prompt("Enter category to filter (Breakfast, Lunch, Dinner, Snack):");
    if (selectedCategory) {
      fetch('recipes.json')
        .then(response => response.json())
        .then(data => {
          let filtered = data.filter(recipe => recipe.category.toLowerCase() === selectedCategory.toLowerCase());
          if (filtered.length > 0) {
            displayRecipes(filtered);
          } else {
            alert("No recipes found for that category.");
          }
        });
    }
  });

  // Favourites button
  document.getElementById("favouritesBtn").addEventListener("click", () => {
    alert("Favourites feature is not implemented yet.");
  });

  // Form Delete button (clear form inputs)
  document.querySelector(".delete-btn").addEventListener("click", () => {
    form.reset();
  });
}