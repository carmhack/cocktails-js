const PATH = "./assets/data.json";

async function getCocktails(path) {
    const response = await fetch(path);
    const result = await response.json();
    renderButtons(result);
}

function renderButtons(data) {
    const buttonsContainer = document.querySelector("#buttons");

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

    for(let i = 0; i < ingredients.length; i++) {
        const { part, name, color } = ingredients[i];

        const height = (100 / totalParts) * part;
        const ingredient = document.createElement("div");
        ingredient.classList.add("ingredient");
        ingredient.innerText = `${part} part of ${name}`;

        ingredient.style.backgroundColor = color;
        ingredient.style.height = `${height}%`;
        ingredient.style.setProperty('--order', i+1);

        ingredientsContainer.insertAdjacentElement("afterbegin", ingredient);
    }
}

getCocktails(PATH);