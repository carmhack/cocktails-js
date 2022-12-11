const PATH = "./assets/data.json";
const DELAY = 300;

async function getCocktails(path) {
    const response = await fetch(path);
    const result = await response.json();
    renderButtons(result);
}

function renderButtons(data) {
    const buttonsContainer = document.querySelector("#buttons");
    buttonsContainer.innerHTML = "";

    data.forEach(cocktail => {
        const button = document.createElement("button");
        button.innerText = cocktail.name;
        button.id = cocktail.name.replaceAll(" ", "-");
        button.addEventListener("click", function() {
            const cocktailName = this.id.replace("-", " ");
            renderIngredients(data, cocktailName);
        });
        buttonsContainer.appendChild(button);
    })
}

function renderIngredients(data, cocktailName) {
    const ingredientsContainer = document.querySelector("#ingredients");
    ingredientsContainer.innerHTML = "";

    const ingredients = data.find(cocktail => cocktail.name === cocktailName).ingredients;
    
    let totalParts = 0;
    ingredients.forEach(({ part }) => {
        totalParts += part;
    });

    let timeout = 0;
    for(let i = 0; i < ingredients.length; i++) {
        const { part, name, color } = ingredients[i];
        const height = (100 / totalParts) * part;
        const ingredient = document.createElement("div");
        ingredient.classList.add("ingredient");
        ingredient.innerText = `${part} part of ${name}`;
        ingredient.style = `background-color: ${color}; height: ${height}%; animation-delay: ${timeout}ms;`;
        ingredientsContainer.insertAdjacentElement("afterbegin", ingredient);
        timeout += DELAY;
    }
}

getCocktails(PATH);