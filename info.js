// JavaScript to toggle the ingredient list
const ingredientHeaders = document.querySelectorAll('.ingredient-header');

ingredientHeaders.forEach((ingredientHeader) => {
    ingredientHeader.addEventListener('click', () => {
        const ingredientList = ingredientHeader.nextElementSibling;
        const ingredientContainer = ingredientHeader.parentElement;

        if (ingredientList.style.display === 'none' || ingredientList.style.display === '') {
            ingredientList.style.display = 'block';
            ingredientContainer.classList.add('open');
        } else {
            ingredientList.style.display = 'none';
            ingredientContainer.classList.remove('open');
        }
    });
});

// JavaScript to handle ingredient button selection
const ingredientButtons = document.querySelectorAll('.ingredient-button');

ingredientButtons.forEach((button) => {
    button.addEventListener('click', () => {
        button.classList.toggle('selected');
    });
});

// Add code for the profile icon and dropdown here
const profileIcon = document.querySelector('.profile-icon');
const profileDropdown = document.querySelector('.profile-dropdown');

profileIcon.addEventListener('click', () => {
    profileDropdown.classList.toggle('show');
});

// Close the profile dropdown when clicking outside of it
window.addEventListener('click', (event) => {
    if (!event.target.matches('.profile-icon')) {
        const dropdowns = document.getElementsByClassName('profile-dropdown');
        for (let i = 0; i < dropdowns.length; i++) {
            const openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
});

/* --------------------------------------- Left Search Bar -------------------------------------------- */
// Get references to the search input and ingredient buttons
const searchInput = document.getElementById('search-ing');
const buttons = document.querySelectorAll('.ingredient-button');
const duplicateButtonContainer = document.querySelector('.duplicate-button-container'); // Reference to the duplicate button container

// Initialize a variable to store the currently highlighted button
let highlightedButton = null;
let highlightedButtonBackgroundColor = ''; // Store the button's original background color

// Add an event listener to the search input for input events
searchInput.addEventListener('input', function () {
    const searchTerm = searchInput.value.trim().toLowerCase();

    // Loop through each button and check if it matches the search term
    buttons.forEach(button => {
        const buttonValue = button.value.toLowerCase();

        if (buttonValue === searchTerm) {
            // Change the background color and text color of the matching button
            button.style.backgroundColor = 'orange';
            button.style.color = 'white';

            // Store the highlighted button and its background color
            highlightedButton = button;
            highlightedButtonBackgroundColor = 'orange';

            // Clone the matching button and append it to the duplicate-button container
            const clonedButton = button.cloneNode(true);
            duplicateButtonContainer.appendChild(clonedButton);
        } 
    });
});

// Add an event listener to the search input for the "Enter" key press
searchInput.addEventListener('keyup', function (event) {
    if (event.key === 'Enter') {
        // Prevent the form from submitting (if it's in a form)
        event.preventDefault();
        // Clear the search input
        searchInput.value = '';
    }
});



// Function to create or remove the duplicated input button with the same text as the original.
function toggleDuplicateButton(originalButton, buttonContainer) {
    const isButtonVisible = buttonContainer.contains(originalButton);

    if (isButtonVisible) {
        // If the button is visible, remove it from duplicate-button.
        buttonContainer.removeChild(originalButton);
        // Change the background color of the original button to white and text color to black.
        originalButton.style.backgroundColor = 'white';
        originalButton.style.color = 'black';
    } else {
        // If the button is not visible, create and append a cloned input button with the "selected" class and toggle the "selected" class on the original button.
        const clonedButton = originalButton.cloneNode(true);
        clonedButton.addEventListener('click', () => {
            toggleDuplicateButton(clonedButton, buttonContainer);
            // Change the background color of the original button to white and text color to black.
            originalButton.style.backgroundColor = 'white';
            originalButton.style.color = 'black';
        });
        buttonContainer.appendChild(clonedButton);
        // Change the background color of the original button to orange and text color to white.
        originalButton.style.backgroundColor = 'orange';
        originalButton.style.color = 'white';
    }
}

// Add event listeners to all buttons with the "ingredient-button" class
const originalButtons = document.querySelectorAll('.ingredient-button');

originalButtons.forEach((button) => {
    button.addEventListener('click', () => {
        const buttonContainer = document.querySelector('.ingredients-duplicate .duplicate-button-container');
        toggleDuplicateButton(button, buttonContainer);
    });
});


    const selectedIngredients = new Set();
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];

    // Sample recipes database (you can replace this with your own data)
    const recipes = [
    {
        name: "Grilled Garlic Cheese Grits" , 
        description: "We love grits, this is another good way to serve them. A great alternative to a baked potato when served with grilled steak or chicken. I belive this recipe could be made with instant grits.The 2 1/2 hours for refrigeration is not include in time. The recipe comes from Tast of Homes Light and Tasty." , 
        ingredients:['water', 'grits', 'salt', 'cheddar cheese', 'garlic', 'olive oil']  , 
        quantity:["4   cups    water","1   cup   uncooked old fashion grits","1   teaspoon    salt","4   ounces   shredded cheddar cheese","1 -2   clove    garlic, minced ","1   tablespoon    olive oil"]  , 
        serving_size: "1 (155 g)" , 
        servings: "8" , 
        steps:['I a sauce pan, bring water to a boil; slowly add grits and salt, stirring constantly; Reduce heat:simmer, uncovered, for 40-45 minutes or untill thickened, stirrin occasionally.', 'Add cheese and garlic; stir until cheese is melted, Spray 9-inch baking dish with nonstick cooking spray; Cover and refrigerate for 2 to 2 1/2 hours or until frim.', 'Before starting the grill, coat the grill rack with nonstick cooking spray; Cut the grits into 3-inch squares; Brush both sides with olive oil.', 'Grill, covered, over medium heat for 4 to 6 minutes on each side or until lightly browned.']   
        },
        {
        name: "Simple Shrimp and Andouille Jambalaya" , 
        description: "Simple, easy and very tasty for when you are in the mood for jambalaya. My kids loved it! From Cooks Illustrated Quick Recipe Cookbook." , 
        ingredients:['onion', 'red bell pepper', 'garlic cloves', 'large shrimp', 'salt', 'hot pepper sauce', 'vegetable oil', 'andouille sausage', 'long grain rice', 'bay leaves', 'diced tomatoes', 'clam juice', 'fresh parsley']  , 
        quantity:["1   medium    onion, chopped coarse ","1   medium    red bell pepper, chopped coarse ","5   medium    garlic cloves, chopped coarse ","1   lb   extra large shrimp, shelled and deveined ","  salt","  hot pepper sauce","1   tablespoon    vegetable oil","3/4  lb    andouille sausage, halved lengthwise and then cut into 1/4 inch slices ","1 1/2  cups    long grain rice","4       bay leaves","1 (14   ounce) can   diced tomatoes, briefly drained ","2 (8   ounce) bottles   clam juice","1/4  cup    fresh parsley, chopped "]  , 
        serving_size: "1 (366 g)" , 
        servings: "4" , 
        steps:['In a food processor, pulse the onion, red pepper and garlic until chopped very fine, ten to twelve 1-second pulses, scraping down the sides of the bowl as necessary; set aside.', 'Season the shrimp with salt and hot pepper sauce to taste.', 'Heat the oil in a large Dutch oven over medium high heat until shimmering. Add the shrimp in a single layer and cook, without stirring, for 30 seconds. Using tongs, flip the shrimp and cook for another 30 seconds. Transfer the shrimp to a medium bowl and set aside.', 'Add the sausage to the pan and cook, stirring occasionally, until lightly browned, about 3 minutes. Using a slotted spoon, transfer the sausage to a second bowl.', 'Scrape the veggies from the food processor into the empty pot and cook, stirring frequently, until softened, about 3 minutes. Stir in the rice and continue to stir until the grains are coated with the fat, about 1 minute.', 'Add the bay leaves, tomatoes, clam juice, and 1 cup water and bring to a boil.', 'Stir in the sausage, cover, and reduce the heat to low.', 'Cook until the rice is tender, 17 to 20 minutes.', 'Off the heat, stir in the shrimp and parsley with a fork (do not mush the rice), cover the pot, and allow to sit for 2 minutes or until the shrimp is heated through.', 'Discard the bay leaves and adjust the seasoning with salt and hot pepper sauce to taste. Serve immediately.']   
        },
        {
        name: "Crock Pot Italian Zucchini" , 
        description: "This is a good recipe for weight watchers. It is 0 points" , 
        ingredients:['white beans', 'canned black beans', 'tomatoes', 'onion', 'celery', 'white wine vinegar', 'italian parsley', 'table salt', 'black pepper', 'olive oil']  , 
        quantity:["1   cup   canned white beans, rinsed and drained ","1   cup    canned black beans, rinsed and drained ","1   large    tomatoes, diced ","1   small    onion, diced ","1   stalk    celery, diced ","1   tablespoon    white wine vinegar","2   tablespoons    Italian parsley, minced ","1/8  teaspoon    table salt, to taste ","1/8  teaspoon    black pepper, to taste ","1 -2   teaspoon    olive oil, to taste "]  , 
        serving_size: "1 (244 g)" , 
        servings: "4" , 
        steps:['In a large bowl, combine beans, tomato, onion and celery.', 'Gently stir in vinegar and sprinkle with parsley; season to taste and serve.']   
        },
        {
        name: "Beef Stew With Dried Cherries" , 
        description: "This is a fabulous stew that came from one of the Seattle Junior League cookbooks.  Ive tweaked it a bit over the years.  It fills the house with an amazing aroma and tastes as good as it smells.  This takes a while to make, so I often do it on a weekend afternoon and then reheat it later in the week. Although the recipe calls for dried sour cherries, I have also made it with dried bings." , 
        ingredients:['zucchini', 'yellow squash', 'diced tomatoes', 'onion', 'garlic', 'green bell pepper', 'italian seasoning', 'water', 'salt and pepper']  , 
        quantity:["2       zucchini, sliced ","2   small    yellow squash, sliced ","2 -3   cans    diced tomatoes","1       onion, chopped ","4   cloves    garlic, crushed ","1       green bell pepper, chopped ","2   teaspoons    italian seasoning","1   cup    water or 1   cup    vegetable broth","  salt and pepper"]  , 
        serving_size: "1 (358 g)" , 
        servings: "8" , 
        steps:['Put all ingredients in the crock pot and cook on low for 6-8 hours.']   
        },
        {
        name: "Hot Sweet Almond Brittle" , 
        description: "This is one of our standard holiday gift recipes.  The addition of the salt, cumin and coriander really add an appealing complexity and the cayenne gives it a kick!" , 
        ingredients:['beef stew meat', 'flour', 'salt', 'allspice', 'cinnamon', 'black pepper', 'vegetable oil', 'onions', 'dried sour cherries', 'sugar', 'water', 'dry red wine', 'beef stock', 'mushroom']  , 
        quantity:["3   lbs    beef stew meat","3   tablespoons    flour","1   teaspoon    salt","1/2  teaspoon    allspice","1/2  teaspoon    cinnamon","1/2  teaspoon    black pepper","1   tablespoon    vegetable oil","3   cups    onions, thinly sliced ","1   cup    dried sour cherries","2   tablespoons    sugar","2   tablespoons    water","1   cup    dry red wine","1   cup    beef stock","1   lb    mushroom, quartered "]  , 
        serving_size: "1 (832 g)" , 
        servings: "1" , 
        steps:['Preheat oven to 350Â°F.', "Cut beef into 1 inch cubes.  Combine flour, salt, allspice, cinnamon and pepper in a plastic bag.  Add beef cubes to bag and shake, coating pieces evenly.  Spray a heavy nonstick skillet with nonstick vegetable spray and heat over medium high heat.  Add 1/3 of the beef cubes and cook until browned on all sides, stirring frequently (about 5 minutes).  Don't crowd the skillet.  Transfer meat to a heavy Dutch oven.  Repeat with remaining meat in two more batches, ending with all of the browned meat in the Dutch oven.", 'Reduce heat to medium.  Add oil to skillet.  Add onions and cherries.  Cook over medium heat until onions are soft and light brown, about 10 minutes (you are basically making caramelized onions).  Stir frequently, scraping up all the browned bits from the meat and incorporating into the onions. Mix in the sugar, vinegar and water.  Increase heat to medium high and cook until onions brown, stirring frequently, about 5 minutes.', 'Add onion mixture to the beef in the Dutch oven. Mix in wine, stock and mushrooms.  Cover and bake until the beef is tender, about 2 hours.  Uncover stew during last 30 minutes of baking if the liquid is still too thin.  Add a small amount of beef stock or red wine is it is too dry.', 'Serve with rice or noodles to sop up the great sauce.', 'Can be made ahead and reheated before serving.']   
        },
        {
        name: "Retro Chicken &amp; Chips Casserole" , 
        description: "From Cooking Light Magazine, 11/05. This is comfort food, and its great for potlucks. You can cheat, and buy the chicken already roasted & chopped!!" , 
        ingredients:['slivered almonds', 'cider vinegar', 'sugar', 'sugar', 'salt', 'ground cumin', 'ground coriander', 'cayenne pepper']  , 
        quantity:["12   ounces    slivered almonds","1/4  cup    cider vinegar","2   cups    sugar","1   tablespoon    sugar","2   teaspoons    salt","2   teaspoons    ground cumin","1   teaspoon    ground coriander","3/4  teaspoon    cayenne pepper"]  , 
        serving_size: "1 (85 g)" , 
        servings: "6" , 
        steps:['Preheat oven to 375Â°F  Place almonds in single layer in a 15 x 10 jelly roll pan.  Bake 6-9 minutes, or until golden brown.  (Watch carefully after 5 minutes, the nuts go from golden to scorched in no time). Remove from oven and place nuts on a plate to cool.  Set aside.', 'While the almonds cool, mix the salt, cumin coriander, cayenne and 1 T. sugar in a small bowl.  In a heavy 3 quart saucepan, heat vinegar and 2 cups sugar to boiling over medium heat. Continue to cook over medium heat until the mixture is a light to medium amber color, stirring occasionally.  This will probably take between 10 and 15 minutes, depending on your stove and how heavy the pan is.  While the sugar is cooking, spray the jelly roll pan with nonstick cooking spray. Place the jelly roll pan on a trivet or cooling rack.  Keep the cooking spray out and have two forks ready for spreading the hot candy in the pan.', 'When the sugar mixture is the right color, remove from heat.  Stir spice mixture into sugar. Add the almonds and stir to coat evenly.  Work fast- this sets up quickly. Immediately pour the mixture onto the prepared pan. Spray the forks with cooking spray and use them to spread the almond mixture into roughly a single layer in the pan.', 'Cool brittle completely on jelly roll pan on a wire rack. With hands, break brittle into small pieces.  Store in tightly covered jar or tin for up to two weeks.']   
        },
        {
        name: "Asparagus  Omelette Wraps" , 
        description: "These wraps make a lovely breakfast, light lunch or entrÃ©e. This recipe was originally from a free health magazine. Makes at least 8 wraps. Serve with a little hollandaise sauce if desired. Can easily use parmesan cheese in place of the pecorino and any herbs of your preference" , 
        ingredients:['chicken breasts', 'green onion', 'red bell pepper', 'parsley', 'mayonnaise', 'sour cream', 'lemon juice', 'dijon mustard', 'salt %26 pepper', 'cheddar cheese', 'potato chips']  , 
        quantity:["4   cups   roasted chopped chicken breasts","1/4  cup   chopped green onion","1/4  cup   chopped red bell pepper","2   tablespoons   minced parsley","1/2  cup    mayonnaise","1/4  cup    sour cream","2   tablespoons    lemon juice","2   teaspoons    Dijon mustard","  salt \u0026 pepper, to taste ","8   ounces   shredded cheddar cheese","10   ounces    potato chips, crushed "]  , 
        serving_size: "1 (499 g)" , 
        servings: "4" , 
        steps:['In large bowl, combine chicken, green onion, bell pepper, and parsley.', 'In small bowl, whisk together mayonnaise, sour cream, lemon juice, Dijon mustard, salt, &amp; pepper.', 'Stir mayonnaise mixture into chicken mixture; mix well.', 'Pour into an 11x7 dish. Top with cheese &amp; potato chips.', 'Bake 15 minutes, until bubbly.']   
        },
        {
        name: "Potato-Crab Chowder" , 
        description: "Soup for the soul!" , 
        ingredients:['eggs', 'milk', 'fresh sage', 'fresh thyme', 'garlic cloves', 'pecorino cheese', 'asparagus', 'extra virgin olive oil']  , 
        quantity:["8       eggs","1/2  cup    milk","1   tablespoon    fresh sage, roughly chopped  (updated from bunch that auto appeared)","1   teaspoon    fresh thyme, chopped ","2       garlic cloves, chopped ","1/4  cup    pecorino cheese, grated  (can subsitute your preference for cheese)","24   stalks    asparagus","2   tablespoons    extra virgin olive oil"]  , 
        serving_size: "1 (362 g)" , 
        servings: "6" , 
        steps:['Beat the eggs in a bowl. Add the milk, sage, thyme, garlic, pecorino and season with cracked black pepper.', 'Lay the asparagus lengthways in a pan with just enough salted boiling water to cover the spears. Cook for 2 minutes until they are tender but still crisp.', 'Heat a large non stick flat pan with a little olive oil. Pour a ladle of the egg mixture into the pan and roll the pan around until the egg is thinly layered over the base and it is cooked on one side. Reduce the heat and flip to cook the egg on the other side.', 'Repeat until all the egg mixture is used up.', 'Fill the crepes with asparagus and serve with an extra sprinkle of grated pecorino.', 'Note: To prepare asparagus take the tender stalk in both hands; gently hold the spear end of the stalk with one hand while you snap the bottom end off with the other hand. Then trim the broken end with a sharp knife and the asparagus is ready to cook.']   
        },
        {
        name: "Sweet and Simple Sloppy Joes" , 
        description: "Easy and kid-friendly recipe that I always have ingredients on hand to make.  I use onion powder in place of diced onion to ensure the kids will eat them, but feel free to use diced onions instead.   Serve on hamburger buns with a side salad and dinner is ready!" , 
        ingredients:['butter', 'onion', 'garlic', 'potatoes', 'flour', 'milk', 'black pepper', 'nutmeg', 'creamed corn', 'low sodium chicken broth', 'lump crabmeat', 'cayenne pepper', 'parsley']  , 
        quantity:["2   tablespoons    butter","1   medium    onion","2   tablespoons   minced garlic","3   cups    potatoes, skin on, 1 inch cubed ","3   tablespoons    flour","2   cups    milk","1/2  teaspoon    black pepper","1/4  teaspoon    nutmeg","1 (14   ounce) can   creamed corn","1 (14   ounce) can   low sodium chicken broth","1 (8   ounce) can   lump crabmeat","1   dash    cayenne pepper","1   pinch    parsley"]  , 
        serving_size: "1 (103 g)" , 
        servings: "4" , 
        steps:['Saute onion&amp; garlic in melted butter in large sauce pan for 4 minutes.', 'Add potato and saute 1 minute.', 'Sprinkle in flour, cook for 1 minute stirring constantly.', 'Add milk, pepper, nutmeg, corn and broth.', 'Bring to a simmer over med heat stirring frequently.', 'Cover and reduce heat to low for a 20 minute simmer.', 'Stir in crab meat and parsley, cook 5 minutes.', 'Serve or pour into crock pot on low or warm.']   
        },
        {
        name: "Golden Chocolate Chip Muffins" , 
        description: "From King Arthur Flour." , 
        ingredients:['lean ground beef', 'ketchup', 'heinz chili sauce', 'white vinegar', 'sugar', 'prepared yellow mustard', 'onion powder']  , 
        quantity:["1   lb    lean ground beef","1/2  cup    ketchup","2   tablespoons    Heinz Chili Sauce","1   teaspoon    white vinegar","1   teaspoon    sugar","1   teaspoon    prepared yellow mustard","1/2  teaspoon    onion powder"]  , 
        serving_size: "1 (94 g)" , 
        servings: "12" , 
        steps:['Brown ground beef  with onion powder in a frying pan, drain any grease.', 'Mix all other ingredients together and stir into browned beef.', 'Simmer for about 20 minutes.', 'Serve on soft rolls or hamburger buns.']   
        },
        {
        name: "Potato Chip Chocolate Chip Cookies" , 
        description: "There are many claims as to the origins of this cookie. I only know they are just plain good." , 
        ingredients:['butter', 'granulated sugar', 'baking powder', 'salt', 'vanilla extract', 'eggs', 'milk', 'whole wheat flour', 'chocolate chips', 'decorator sugar']  , 
        quantity:["1/2  cup    butter","1   cup    granulated sugar","2   teaspoons    baking powder","1/2  teaspoon    salt","1   teaspoon    vanilla extract","2   large    eggs","1/2  cup    milk","2   cups    whole wheat flour","2   cups    chocolate chips"," coarse decorator sugar, for topping "]  , 
        serving_size: "1 (28 g)" , 
        servings: "54" , 
        steps:['Preheat the oven to 350Â°F Lightly grease (or line with muffin cups, and grease the muffin cups) a standard-size muffin pan.', 'Beat together the butter, sugar, baking powder, salt, and vanilla until fluffy. Beat in the eggs one at a time; then stir in the milk. Mix in the flour, then the chocolate chips.', 'Spoon the batter into the muffin cups; theyâ€™ll be quite full. Sprinkle each muffin with a little coarse sugar. Bake the muffins for 25 minutes, or until a cake tester inserted into the center of one comes out without crumbs clinging to it (a little chocolate is OK!).']   
        },
        {
        name: "Steak Au Poivre" , 
        description: "An American-French restaurant classic." , 
        ingredients:['all-purpose flour', 'baking soda', 'nutmeg', 'margarine', 'sugar', 'dark brown sugar', 'egg', 'egg white', 'vanilla', 'potato chips', 'semi-sweet chocolate chips']  , 
        quantity:["1 3/4  cups    all-purpose flour","1/2  teaspoon    baking soda","1/2  teaspoon   grated nutmeg","1/2  lb   cool margarine, cut into small pieces ","1   cup    sugar","3/4  cup   packed dark brown sugar","1   large    egg, room temperature ","1   large    egg white, room temperature ","2   teaspoons    vanilla","4   ounces    potato chips, crushed  (about 6 cups, my favorite is Ruffles)","3   cups    semi-sweet chocolate chips or 3   cups    bittersweet chocolate chips"]  , 
        serving_size: "1 (610 g)" , 
        servings: "4" , 
        steps:['Position racks in the top and bottom thirds of the oven; preheat oven to 350Â°.', 'In a bowl, whisk the flour, baking soda, and nutmeg until combined; set aside.', 'Put margarine in a big bowl; beat with an electric mixer on medium speed until softened.', 'Add in both sugars; continue beating until combined but grainy, with no bits of margarine visible, about 2 minutes.', 'Beat in the egg, then the egg white and vanilla.', 'Turn off the beaters; add in the flour mixture, and beat at low speed until a sticky and thick but nonetheless soft batter forms, about 20 seconds.', 'Remove the beaters and stir in the crushed potato chips and chocolate chips with a wooden spoon, just until evenly distributed.', 'Drop by rounded tablespoonfuls onto 2 large ungreased nonstick baking sheets, spacing 2 inches apart.', 'Bake for 8 minutes, then reverse the baking sheets front to back and top to bottom.', 'Continue baking for about 7 more minutes, or until the cookies are browned and somewhat firm to touch.', 'Cool on baking sheets for 2 minutes; transfer to wire racks to cool completely.']   
        },
        {
        name: "Mushroom Ravioli" , 
        description: "From Cooking Light, with slight midifications.  Vegetarian meal hubby will actually eat!" , 
        ingredients:['unsalted beef stock', 'onion', 'carrot', 'bay leaf', 'thyme', 'whole black peppercorn', 'black peppercorns', 'green peppercorn', 'new york strip steaks', 'vegetable oil', 'unsalted butter', 'shallots', 'cognac', 'dry white wine', 'parsley']  , 
        quantity:["4   cups    unsalted beef stock","1   small    onion, chopped ","1   small    carrot, chopped ","1       bay leaf","1   sprig    thyme","1   teaspoon    whole black peppercorn","1   tablespoon   coarsely crushed black peppercorns","1   tablespoon   coarsely crushed green peppercorn","4 (8 -10   ounce)    New York strip steaks, cut 1 inch thick, trimmed of excess fat  (8-10 oz. each)","1   tablespoon    vegetable oil","4   tablespoons    unsalted butter, cut into 4 pieces ","2   tablespoons   very finely minced shallots","4   tablespoons    cognac or 4   tablespoons    brandy","1/2  cup    dry white wine","2   teaspoons   finely chopped parsley"]  , 
        serving_size: "1 (250 g)" , 
        servings: "2" , 
        steps:['Add beef stock, onion, carrot, bay leaf, thyme, and whole black peppercorns in a medium saucepan; bring to a boil over high heat.', 'Decrease heat to medium and, maintaining a lively simmer, let stock reduce in volume to about Â½ cup.', 'Strain the reduction sauce through a fine mesh strainer into a small bowl, pressing lightly on the vegetables to extract any liquid.', 'Discard the solids and set sauce aside.', 'Meanwhile, combine the crushed black and green peppercorns; firmly press the  mixture into the steaks, both the top and bottom sides, coating them evenly.', 'Let the pepper-studded steaks rest at room temperature for 30 minutes.', 'Preheat oven to 200Â°.', 'Place a cast iron skillet (just large enough to hold the steaks) over med-high heat and let it warm for 4 minutes.', 'Generously salt the top of each steak.', 'Pour the oil into the skillet, coating it evenly; when the oil is hot, add the steaks, salt side down; move them slightly after 30 seconds to help browning.', 'Cook for 3 minutes per side for medium-rare; make sure to salt the second side of each steak before flipping.', 'When the steaks are done, put them in a pan or on a platter and hold them in the warmed oven (the steaks will continue to cook in the oven, so undercook them a bit).', 'Pour off all but 1 tablespoon of fat in the skillet; return skillet to medium heat, adding 1 tablespoon of the butter and shallots.', 'Stir until shallots are softened, about 1 minute.', 'Add in the cognac and white wine, scraping with a wooden spatula to loosen any browned bits.', 'Increase heat to high and reduce liquid by half; add the reduced beef broth and reduce liquid by half again; the sauce should begin to thicken slightly.', 'Add any juices that have accumulated beneath the steaks you are holding in the oven and whisk in the remaining 3 tablespoons butter, parsley, and salt to taste.', 'Place steak on dinner plates; spoon shallots and sauce evenly over and around each one; serve immediately.', '*Note: Only use dried green peppercorns; do not use green peppercorns in brine; if dried green peppercorns are not available, double the amount of black peppercorns.']   
        },
        {
        name: "Layered Ice Cream &quot;cake&quot;" , 
        description: "I just came up with this recipe spur of the moment. Im only 12 (by the way Im using my moms account) and I LOVE to create, cook, bake,and eat! I think this would be a great after-school snack for your kids (its super quick) or just a tasty uplifting treat when your day has been yucky. Hope you like! please give me some suggestions!!! :)" , 
        ingredients:['button mushrooms', 'portabella mushrooms', 'olive oil', 'butter', 'shallots', 'garlic cloves', 'salt', 'wonton wrappers', 'cornstarch', '1%25 low-fat milk', 'all-purpose flour', 'fresh parmesan cheese', 'fresh chives', 'salt', 'fresh ground black pepper']  , 
        quantity:["","0.5 (8   ounce) package   button mushrooms","0.5 (6   ounce) package  presliced portabella mushrooms","1   teaspoon    olive oil","1   teaspoon    butter","2   tablespoons   finely chopped shallots","2       garlic cloves, chopped ","1/8  teaspoon    salt","14       wonton wrappers","1   teaspoon    cornstarch","","1/2  cup    1% low-fat milk","1   tablespoon    all-purpose flour","2   tablespoons   grated fresh parmesan cheese","1   tablespoon   chopped fresh chives","1/8  teaspoon    salt","1   dash    fresh ground black pepper"]  , 
        serving_size: "1 (138 g)" , 
        servings: "1" , 
        steps:['To prepare ravioli, place mushrooms in food processor; pulse 10 times or until finely chopped.', 'Heat oil and butter in a large nonstick skillet over medium-high heat. Add shallots and garlic, and sautÃ© for 2 minutes.', 'Add mushrooms and 1/8 teaspoon salt; cook 5 minutes or until moisture evaporates, stirring occasionally.', 'Working with 1 wonton wrapper at a time (cover remaining wrappers with a damp towel to keep them from drying), spoon about 2 teaspoons mushroom mixture into center of each wrapper.', 'Moisten edges of dough with water; bring 2 opposite corners together. Pinch edges together to seal, forming a triangle.', 'Place ravioli on a large baking sheet sprinkled with cornstarch.', 'To prepare sauce, combine milk and flour in a small saucepan over medium-low heat; stir with a whisk.', 'Cook 4 minutes or until slightly thickened, stirring frequently. Remove from heat; stir in cheese, 1 tablespoon chives, 1/8 teaspoon salt, and pepper. Set aside; keep warm.', 'Cook ravioli in boiling water 2 minutes or until tender. Drain. Serve with sauce. Garnish with fresh chives, if desired.']   
        },
        {
        name: "Santa Fe-Tastic Chicken Tortilla Soup" , 
        description: "This is Rachel Rays.  It is so awesome, I cant think of a single modification....it is perfect.  It is more time consuming than most tortilla soups because of the roasted veggies, but it is totally worth it.  If you wanted to go vegetarian, leave out the chicken, there is so much to this soup it would be great that way." , 
        ingredients:['shortcake cups', 'ice cream', 'hot fudge', 'whipped cream', 'strawberry']  , 
        quantity:["2 -3      individual sponge shortcake cups","1   scoop    ice cream (any flavor)","  hot fudge, warmed ","  whipped cream"," sliced strawberry"]  , 
        serving_size: "1 (895 g)" , 
        servings: "4" , 
        steps:['Put the number of shortcake cups you want to use on a plate. Remember that this is either two or three layered depending on your preference!', 'Scoop hot fudge into each individual cup.', "Next add 1-2 slices of strawberries onto each cup's hot fudge.", 'Then top them all off with a scoop of ice cream.', "Stack them on top of each other (make sure that their stacked pretty good or else it may topple over - This parts a lil messy but trust me, it's definitely worth it!).", "Add the whipped cream and voila! you have made my easy peasy lemon squeasy treat that you and your kids'll love!", 'Enjoy.', "P.S. normal strawberry shortcakes you'll just use your fingers to eat with (well at least i do!) but with this you'll need a fork or spoon. Plus, make sure you serve right away or you put it in the fridge/freezer. You don't want it to completely melt on you!", ':).']   
        },
        {
        name: "Scarletts Crock Pot Cheese (And Prawn) Fondue 2 Die 4!" , 
        description: "Ideal for long hot summer days when you dont feel like cooking and of course the beauty of using a slow cooker (crock pot) is that it doesnt heat the kitchen! The prawns are optional for vegetarian but if you eat fish please add them!  This is sooo fantastic! Serve with crusty bread or crudites or pretzels!  YUM!" , 
        ingredients:['vegetable oil', 'vegetable oil', 'corn on the cob', 'red bell pepper', 'chicken breast tenders', 'poultry seasoning', 'cumin', 'salt and pepper', 'zucchini', 'yellow onion', 'garlic cloves', 'chipotle chile in adobo', 'stewed tomatoes', 'tomato sauce', 'chicken stock', 'blue corn tortilla chips', 'cheddar cheese', 'sour cream', 'red onion', 'cilantro', 'avocado', 'lemon%2c juice of']  , 
        quantity:["  vegetable oil, plus ","2   tablespoons    vegetable oil","3   ears    corn on the cob","1       red bell pepper, split and seeded ","1   lb    chicken breast tenders","1   teaspoon    poultry seasoning, 1/3 palm full ","1   teaspoon    cumin, 1/3 palm full ","  salt and pepper","1   medium    zucchini, small dice ","1   medium    yellow onion, chopped ","3       garlic cloves, chopped ","1 -2       chipotle chile in adobo, chopped  (medium to hot heat level)","1 (28   ounce) can   stewed tomatoes","1 (8   ounce) can   tomato sauce","3   cups    chicken stock","4   cups    blue corn tortilla chips, broken up into large pieces ","1   cup   shredded cheddar cheese or 1   cup    monterey jack pepper cheese","1/2  cup    sour cream","","1/4     raw red onion, chopped ","2 -3   tablespoons   chopped cilantro or 2 -3   tablespoons    fresh parsley leaves","1      ripe avocado, diced and dressed with ","1/2      lemon, juice of"]  , 
        serving_size: "1 (74 g)" , 
        servings: "6" , 
        steps:['Heat a grill pan to high and a soup pot to medium high.', 'Drizzle oil on corn and place on grill. Add red pepper to grill with corn. Char vegetables 10 minutes, total, turning occasionally. Remove to cool, 5 minutes.', 'Remove charred skin from the pepper.', 'While vegetables cook, dice chicken. Add 2 tablespoons oil to hot soup pot. Add chicken to pot. Season with poultry seasoning, cumin, salt and pepper. Lightly brown chicken on each side. Add zucchini, onions and garlic and chipotle peppers. Cook vegetables with chicken 5 to 7 minutes to soften. Add tomatoes, tomato sauce and stock.', 'Bring soup to a bubble, reduce heat to medium low.', 'Scrape corn off cob and add to soup.', 'Chop grilled red pepper and stir into soup.', 'Can simmer for about an hour or serve right away.  This just gets better with time.', 'Add chips to soup in handfuls and stir.', 'Serve soup immediately with scatter of shredded cheese and a dollop of sour cream.', 'Top with any or all of the suggested garnishes. Best with big chunks of avacado.']   
        },
        {
        name: "Mashed Plantains With Leeks and Fresh Herbs" , 
        description: "Adapted from: Slow Cooker Cookbook by Gina Steer." , 
        ingredients:['butter', 'shallots', 'prawns', 'garlic clove', 'gruyere', 'cornflour', 'pear cider', 'hot pepper sauce', 'fresh parsley', 'vegetables']  , 
        quantity:["1   tablespoon    butter","2       shallots, peeled, finely chopped ","6   ounces   raw prawns, peeled ","1       garlic clove, peeled ","350   g    gruyere or 350   g    swiss cheese, grated ","2   teaspoons    cornflour","150   ml    apple cider or 150   ml    light beer","3   drops    hot pepper sauce","  fresh parsley (to garnish)","  French bread or   pretzel, to dip "]  , 
        serving_size: "1 (622 g)" , 
        servings: "4" , 
        steps:['Preheat the cooker to high whilst preparing the ingredients.', 'Heat butter until melted.', 'saute the shallots for 3 minutes.', 'rinse the prawns and dry on kitchen paper.', 'add prawns to shallots cook for 3 minutes.', 'remove from pan, drain and reserve.', 'Rub inside of pre-heated pot with garlic clove.', 'Place grated cheese in pot.', 'Blend cornflour, cider and hot pepper sauce and pour in, stir and cover.', 'Cook on LOW for 1 hour or until cheese has melted.', 'Stir in prawns and shallots and either use immediately or keep for 2 hours.', 'Sprinkle with parsley (optional) and serve with crudites, bread, pretzels or whatever you fancy.', 'SO EASY AND SOOOO DELICIOUS! YOU WILL NOT BE DISAPPOINTED!', 'Scarlett.', 'xxxxxxxxx.']   
        },
        {
        name: "Kosher Jewish  Pickles" , 
        description: "Adapted from Bon Appetite magazine. Plantains are those big bananas in the supermarket. Often used in Caribbean cooking. They are a starch and must be cooked before eating. In this recipe they are an alternative to mashed potatoes. The original recipe basically had more  butter and sour cream. Increase those if you want a richer dish." , 
        ingredients:['water', 'low sodium chicken broth', 'plantains', 'unsalted butter', 'extra virgin olive oil', 'leek', 'fresh thyme', 'fresh italian parsley', 'sour cream', 'ground cumin', 'pecans', 'butter']  , 
        quantity:["7   cups    water","1   cup    low sodium chicken broth","2   large   unpeeled semi-ripe plantains, ends trimmed, each cut cross-wise into thirds  (yellow with black)","1/2  tablespoon    unsalted butter","1   tablespoon    extra virgin olive oil","1/2  large    leek, finely chopped  (white and pale green parts only)","4   teaspoons    fresh thyme, minced ","2   teaspoons    fresh Italian parsley, minced ","1/4  cup    sour cream","1   tablespoon    ground cumin","1   tablespoon   chopped pecans","1   tablespoon    butter"]  , 
        serving_size: "1 (408 g)" , 
        servings: "15" , 
        steps:['Bring 7 cups water and broth to boil in heavy, large pot. Add plantains. Reduce heat to medium, cover and simmer until plantains are very tender and yellow-orange (some may begin to come out of peel), about 20 minutes. Drain, reserving 1 cup cooking liquid. Cool plantains 10 minutes. Remove peel using hands or small paring knife. Transfer plantains to large glass bowl. Add 1/2 cup of reserved cooking liquid and mash plantains until smooth, adding more liquid by tablespoonfuls to thin mixture, if desired. Set aside.', 'Melt butter with olive oil in medium nonstick skillet over medium heat. Add leek and sautÃ© until tender but not browned, about 6 minutes. Stir in thyme and parsley. Add leek mixture to mashed plantains; stir to blend. (Can be made 1 hour ahead. Let stand at room temperature. Microwave on high until heated through before continuing.).', 'Mix sour cream and cumin into hot plantains. Season with salt and pepper. If using last tablespoon of butter, cut into small cubes. Scatter butter and pecans over; serve.']   
        },
        {
        name: "Mexican Macaroni and Beef" , 
        description: "Those of you who had the pleasure of growing up on the East Coast of the United States may have had one of these traditional Kosher pickles, made primarily by Jewish businesses. They are by no means your store bought pickles.  They are even better then your favorite delis pickles.  These pickles are what all other pickles are founded on; quality.  " , 
        ingredients:['pickling cucumbers', 'kosher salt', 'garlic', 'coriander seed', 'black peppercorns', 'fresh dill', 'ice', 'grape leaves', 'water']  , 
        quantity:["20 -25      mildly ripe firm pickling cucumbers","1/4  cup    kosher salt","1   head    garlic, peeled and broken up into cloves ","1   tablespoon    coriander seed","1   tablespoon    black peppercorns","1   bunch    fresh dill","1/2  lb    ice","3       grape leaves","16   cups    water"]  , 
        serving_size: "1 (205 g)" , 
        servings: "6" , 
        steps:['Cut 1/16" off the ends of the cucumbers and scrub very well (leaving the blossom end on can lead to spoilage).', 'Soak the cucumbers in ice water for a couple of hours.', 'When cucumbers are almost done soaking, Mix the salt and water.', 'Sterilize or wash your giant pickle jar (about a gallon) from the food warehouse.  Make sure you have properly disposed of all the lousy pickles that use to be in it, I Recommend your compost heap or the garbage. Wash the jar or sterilize it so it no longer stinks like the vinegar they used to make there inferior pickles.', "Now it gets real easy.  Pack as many of your pickles into the jar as you can.  Use the rest for a salad or something.  stick in all the dill (you can chop it, but it does not matter), all the garlic cloves, all the seeds, then stop, and look at your beautiful jar. If you have the grape leaves, stick them in at this time.  I don't ever use them, but my buddy does.", 'Pour the salt water in the jar.  All the way up to the top minus an inch, or a half inch or so.  If you are short water, add some.', 'Tightly cover the jar with the lid that came on the giant pickle jar.  Cover it tightly, as hard as you can turn, stop, then tighten again just to make sure.  Stand back, and look at the beauty of what you have made.', 'Place jar UPSIDE down, with a towel over it (to keep it dark), in a cool (65-58Â°F) place in your home.  Put a plate under the jar to see if it leaks.', "The next day (24 hours later) check to see if the jar leaked.  If it did, it means you didn't follow my instructions.  Tighten the lid (if needed) and TURN IT UPRIGHT, cover it with the towel, and ignore it. Walk away.", 'Leave in cool dark place for five days.  If you want to leave them for a full week, more power to you.  Both time frames will result in a great authentic Kosher pickle.', 'Enjoy, then leave feedback on this recipe.']   
        },
        {
        name: "Pantry Clearing Chili Bean Soup" , 
        description: "DO NOT be scared of making pickles.  This is easy, and I will give it to you in laymans terms.  " , 
        ingredients:['elbow macaroni', 'ground beef', 'onion', 'chili without beans', 'cottage cheese', 'corn chips', 'salt', 'chili powder', 'buttered bread crumb']  , 
        quantity:["1   cup    elbow macaroni, uncooked ","1/2  lb    ground beef","1/4  cup    onion, chopped ","1 (19   ounce) can  gebhard\u0027s chili without beans","1   cup    cottage cheese","1/2  cup    corn chips, coarsely crushed ","1/2  teaspoon    salt","1/2  teaspoon    chili powder","1   cup    buttered bread crumb"]  , 
        serving_size: "1 (388 g)" , 
        servings: "8" , 
        steps:['Cook macaroni according to package directions.', 'Lightly brown beef in skillet; add onion and cook until tender.', 'Stir in chili con carne, cottage cheese, corn chips, salt, chili powder and macaroni.', 'Spoon into a buttered 12 x 7 1/2 x 2-inch baking dish.', 'Sprinkle with bread crumbs and bake at 350 for 30 minutes.']   
        },
        {
        name: "Ras El Hanout" , 
        description: "In a good authentic Kosher pickle there is no vinegar.  None, not a drop.  What kind of pickle has no vinegar?  A good one.  Think of it this way, a pickle with vinegar is a pickle that could have been really good, but the maker decided to cheat, and quicken the process.  " , 
        ingredients:['onion', 'green pepper', 'carrots', 'celery rib', 'frozen corn', 'black beans', 'pink beans', 'crushed pineapple in juice', 'french lentils', 'diced tomatoes with juice', 'tomato soup', 'water', 'chili powder', 'garlic powder', 'cumin', 'cayenne pepper', 'liquid smoke']  , 
        quantity:["1       onion, chopped ","1       green pepper, chopped ","2       carrots, slice into disks ","1       celery rib, sliced ","1   cup    frozen corn","1 (14 1/2  ounce) can   black beans, drained and rinsed ","1 (14 1/2  ounce) can   pink beans, drained and rinsed ","0.5 (20   ounce) can   crushed pineapple in juice","1/2  cup    French lentils or 1/2  cup    lentils","1 (28   ounce) can   diced tomatoes with juice","1 (10 1/2  ounce) can   tomato soup","1 1/2  cups    water","2   tablespoons    chili powder","1/2  teaspoon    garlic powder","1/2  teaspoon    cumin","1/4  teaspoon    cayenne pepper","3   dashes    liquid smoke"]  , 
        serving_size: "1 (2 g)" , 
        servings: "24" , 
        steps:['Mix together all ingredients in your crockpot.', 'Cook 4 hours on high.', 'Enjoy.']   
        },
        {
        name: "Silky Chocolate Kefir Tarts" , 
        description: "How long is the process?  5 days, from start to finish.  Too many for you?  Then its time to move on.  Want a fantastic, authentic, Kosher/Jewish pickles?  You have found your recipe.  " , 
        ingredients:['coriander', 'ginger', 'cardamom', 'cumin', 'cinnamon', 'turmeric', 'black pepper', 'mace', 'cayenne pepper', 'clove']  , 
        quantity:["4   tablespoons    coriander","2   tablespoons    ginger","2   tablespoons    cardamom","1 1/2  tablespoons    cumin","1 1/2  teaspoons    cinnamon","1   tablespoon    turmeric","1   tablespoon    black pepper","1 1/2  teaspoons    mace","1 1/2  teaspoons    cayenne pepper","3/4  teaspoon    clove"]  , 
        serving_size: "1 (174 g)" , 
        servings: "6" , 
        steps:['Combine all ingredients and mix well.  Store in an airtight jar.']   
        },
        {
        name: "Mushroom Lasagna: Gluten Free and Pasta Free!" , 
        description: "Let us begin." , 
        ingredients:['bittersweet chocolate chips', 'sugar', 'flour', 'kosher salt', 'eggs', 'kefir', 'vanilla', 'pie crusts']  , 
        quantity:["1 1/2  cups    bittersweet chocolate chips","1 1/2  cups    sugar","1/4  cup    flour","1/2  teaspoon    kosher salt","6       eggs","1   cup   organic whole milk plain lifeway kefir","1 1/2  tablespoons    vanilla","1 (9   inch)    pie crusts or 6 (4   inch)    tart shells"]  , 
        serving_size: "1 (525 g)" , 
        servings: "4" , 
        steps:['Let all of the ingredients come to room temperature. Using a double boiler, melt the chocolate.', 'In a large mixing bowl, whisk together the eggs, fefir and vanilla.', 'Mix the dry ingredients together in a medium bowl, and stir into egg mixture. Whisk until combined. Slowly add the melted chocolate and whisk until smooth.', 'Pour into pie crust or tart shells. Bake at 325 for about 30 min, until top is crackled and custard  jiggles slightly.', 'Serve warm or cold with vanilla whipped cream.', 'Tip: If mixture "curdles" slightly after adding the chocolate it just means that the mix was too cold for the chocolate to blend in . Just place the mixing bowl into a bath of warm water and whisk until it comes together.']   
        },
        {
        name: "Simple Garlic &amp; Pepper Rack of Lamb" ,  
        description: " description" ,
        ingredients:['fresh mushrooms', 'margarine', 'olive oil', 'eggs', 'garlic salt', 'italian seasoning', 'parsley flakes', 'ricotta cheese', 'part-skim mozzarella cheese', 'italian cheese blend', 'pasta sauce']  , 
        quantity:["16   ounces   sliced fresh mushrooms (white, baby Portobello or a combination of the two)","1   tablespoon    margarine (I use Smart Balance )","1   tablespoon    olive oil","1       eggs or 3   tablespoons   flax seed meal mixed with 1 t. water","1/2  teaspoon    garlic salt (use garlic powder if watching your salt intake)","1/2  teaspoon    italian seasoning","1   tablespoon    parsley flakes","15   ounces    ricotta cheese (if using low-fat, strain in cheesecloth lined colander)","2   cups   shredded part-skim mozzarella cheese, divided as instructed below ","1/2  cup   shredded and divided Italian cheese blend, Romano Parmesan \u0026 Asiago should be included in the blend ","2 1/2-3 1/2  cups    pasta sauce, depending on how much extra sauce you want to serve with the lasagna, and for possible bread stick d "]  , 
        serving_size: "1 (7 g)" , 
        servings: "2" , 
        steps:['Preheat oven to 350 degrees. Saute mushrooms in margarine and olive oil in a large skillet until lightly browned and moisture is released from the mushrooms.', 'Place half of the cooked mushrooms in the bottom of an 8 x 8 casserole dish and spread out evenly. Sprinkle with 1/4 cup Mozzarella. Place in oven for 5-10 min., just long enough to slightly melt the cheese. This creates a firm bottom layer.', 'In a large mixing bowl, lightly beat the egg. Stir in garlic salt or powder, Italian seasoning (crush it between your fingers as you add it) and parsley flakes. Add Ricotta, 1 cup Mozzarella, and 1/4 cup Italian cheese blend. Mix well.', 'Spread 3/4 cup pasta sauce over the mushrooms/melted cheese bottom layer.', 'Top with Ricotta mixture and spread evenly all the way to the edges to seal it.', 'Place remaining mushrooms on top of Ricotta layer, and cover with 3/4 cup sauce. Top with 3/4 cup Mozzarella and 1/4 cup Italian cheese blend.', "Cover with foil, making sure the foil is tight enough so that it's not touching the cheese.", 'Bake for 45 minutes, then remove foil. Return to oven for 10-15 minutes, or until cheese is bubbly.', 'Heat remaining pasta sauce to serve with the meal.', 'Allow lasagna to stand for at least 10 minutes before cutting. I ladle a small amount of sauce onto the plate, and then place a serving of lasagna on top of it.', 'Makes 4, four inch by four inch servings.']   
        },
        {
        name: "Chocolate Biscuits" , 
        description: "P.S.  The jar. I get my jar(s) by buying a big jar of crap pickles from a food warehouse.  Then I wash it and pour some boiling water in it, and it is ready for use.  I also boil the cap just in case, but have made many batches without ever using boiling water and I have never taken ill.  Only reason I do use the boiling water on occasion is because my wife is around." , 
        ingredients:['heavy cream', 'vanilla bean', 'sugar', 'eggs', 'egg yolks', 'dark brown sugar', 'fresh raspberry', 'vanilla bean', 'baking chocolate', 'pralines', 'pecans', 'coffee beans', 'bananas', 'butter', 'brandy', 'brown sugar']  , 
        quantity:["3   cups    heavy cream","1   piece    vanilla bean, pierced ","1/4  cup    sugar","3       eggs","3       egg yolks","1/2  cup    dark brown sugar","  fresh raspberry","","1       vanilla bean","4 1/2  ounces    baking chocolate","4 1/2  ounces    pralines","1   cup    pecans, finely chopped  or 1   cup    brazil nut","3   ounces    coffee beans, finely ground  (Espresso, French Roast, etc.)","2       bananas","1   tablespoon    butter","2   tablespoons    brandy","2   teaspoons    brown sugar"]  , 
        serving_size: "1 (539 g)" , 
        servings: "1" , 
        steps:['Preheat oven to 300Â°F.', 'In top of double boiler over hot water, heat cream,  vanilla bean and sugar to almost boiling.', 'Lower heat and simmer for 1 minute.   Remove from heat. Beat eggs and egg yolks.', 'Pour cream mixture in a thin stream  into eggs, stirring constantly.', 'Return to double boiler.', 'Cook over medium  heat, stirring with a wooden spoon, for 3 to 4 minutes or until custard coats  back of spoon.', 'Remove vanilla bean.', 'Pour into 6 custard dishes or 4 to 5 cup  flame proof serving dish.', 'Set dishes in a large pan of hot water on middle rack of oven.', '(Hot water should be level with custard.)  Bake for 35 to 45 minutes,  or until center of custard is set.  Remove custard from water and cool.', 'Cover  and chill.', 'To serve, sift brown sugar on top of creme.  Place dish into bowl of crushed ice.  Leaving door open, place under broiler at least 6" from flame  until hard crust of caramelized sugar is formed.', 'Serve immediately or chill  until serving time.  Pass bowl of fresh raspberries along with creme for the  perfect topping.', 'Add a spoonful of whipped creme to the custard, if desired.', 'VARIATIONS, FLAVORED CREME BRULEE:', 'Vanilla Bean:', 'Add 1 pod for 3 cups of cream.', 'Break it open lengthwise or simply pierce it, and put it into liquid before it boils.', 'Chocolate:', 'Add 4 1/2 oz cooking chocolate for each 3 cups of cream, melted in  warm liquid.', 'Praline:', 'Add 4 1/2oz pralines to each 3 cups of cream after it is cooked.', 'Nuts:', 'Add 1 cup finely chopped pecans or brazil nuts for 3 cups cream after it  is cooled.', 'Coffee:', 'Use 3 oz coffee beans (Espresso, French Roast, etc -- ) finely ground,  then grilled in a pan of 3 cups cream.', 'Add to boiling liquid; infuse for 15  minutes, then strain.', 'Bananas:', 'Mash 2 soft bananas; saute in 1 tbsp butter.', 'Add 2 tbsp brandy and 2  tsp brown sugar.', 'Cook for 5 minutes.', 'Pat down on bottom of creme brulee pan  before adding liquid.', 'NOTES :', 'Use a double boiler to scald the cream unless you have a heavy  saucepan.   Use very low heat.  Milk scorches easily and, when scorched, should  be thrown out.', 'Beat eggs or egg yolks with a wire whisk or beater.   Add sugar gradually and continue whipping until it is thoroughly mixed inches.', 'NEVER add eggs directly to a hot mixture. (unless you like scrambled eggs in cream.)  Pour some of the hot liquid into the eggs while stirring briskly, then  return the warmed combination to the remaining hot liquid in the pan.', 'Stir the custard constantly over low heat until it acquires body.   Test it  by letting it run off the back of a spoon; if a light coating clings to the  spoon, the custard is finished.', 'Stir the custard occasionally as it cools to prevent a surface skin from  forming.   When it is cool, chill it, covered lightly with a clean dish towel, in the refrigerator.']   
        },
        {
        name: "Ridiculously Easy Chicago-Style Pizza Pie" , 
        description: "Gebhards Chili recipe from newspaper." , 
        ingredients:['racks of lamb', 'oil', 'garlic', 'peppercorn', 'salt']  , 
        quantity:["2       racks of lamb (frenched \u0026 fatty skin removed if desired)","1 -2   tablespoon    oil","2   tablespoons   minced garlic (a sweeter flavour is obtained by using roasted bulbs of garlic mashed)"," freshly ground mix of coloured peppercorn (pink, green \u0026 black)","  salt"]  , 
        serving_size: "1 (343 g)" , 
        servings: "4" , 
        steps:["Preheat oven to 350'F.", 'Heat oil in pan and sear lamb racks on all sides starting with the meat side first.', 'Remove from pan and spread with garlic.', 'Sprinkle on the pepper mix and then sprinkle with salt.', 'Place on a shallow pan and place in oven.', 'Roast for about 20-30mins or until cooked to your preference.', 'Remove from oven and cover with tin foil or leave in turned off oven to rest for 5mins.', 'Either slice or leave whole to serve, depending on size.']   
        },
        {
        name: "Makrout a Louz - Algerian Almond Cakes #2" , 
        description: "December 26 and the last thing I want to see as another store.  Desparation leads to inspiration and this was the result. A soupy chili with a complex flavor that is part spicy and smokey with slightly sweet undertones from the pineapple.  Since this was a pantry clearing experiment, you should feel free to do the same.  Replace the pink beans with kidney beans or use red peppers instead of green ones." , 
        ingredients:['self rising flour', 'butter', 'superfine sugar', 'chocolate chips', 'milk']  , 
        quantity:["2   cups   sifted self rising flour","1/4  cup    butter","1   tablespoon    superfine sugar","1/3  cup    chocolate chips","2/3  cup    milk"]  , 
        serving_size: "1 (921 g)" , 
        servings: "1" , 
        steps:['Lightly grease a cookie sheet.', 'Place flour in a bowl and add the butter cut into small pieces, Rub the butter into the flour with fingertips until the mixture looks like fine bread crumbs.', 'Stir in the superfine sugar and chocolate chips.', 'Mix in enough milk to form a soft dough. You may not have to use all the milk.', 'On a floured surface roll the dough to form a rectangle 4x6 inches and 1 inch thick.', 'Cut the dough into 9 squares.', 'Place on cookie sheet spacing them well apart.', 'Brush with a little milk and bake in a preheated 425Â°F oven for 10-12 minutes, until biscuits are risen and golden.', 'Let cool slightly and serve warm with a bit of whipped cream or a hazelnut spread.']   
        },
        {
        name: "Shrimp Stir-Fry" , 
        description: "There are as many different recipes for this as there are Moroccan cooks; this is the blend I learned in culinary school and its darn tasty.  This recipe assumes you are using all pre- ground spices, but its even better if you start with whole spices, toast them, and grind yourself." , 
        ingredients:['frozen pie crusts', 'italian sausage', 'onion', 'mushrooms', 'mozzarella cheese', 'parmesan cheese', 'pizza sauce', 'italian seasoning', 'parmesan cheese']  , 
        quantity:["1 (9   inch)    frozen pie crusts, thawed ","1   lb    Italian sausage, sliced or crumbled ","1   small    onion, sliced ","4   ounces    mushrooms, sliced ","1   cup    mozzarella cheese, shredded ","1/4  cup    parmesan cheese, shredded ","1 (15   ounce) can   pizza sauce","1/2  teaspoon    italian seasoning","2   teaspoons    parmesan cheese, grated "]  , 
        serving_size: "1 (397 g)" , 
        servings: "4" , 
        steps:['Preheat oven to 400Â°F.', "Bake the  pie crust according to your package's directions.  I usually prick the bottom and sides of the crust all over with a fork and bake it for 10 minutes, or until it becomes slightly golden.  Remove, and set aside.", "Brown the sausage for about 5 minutes in a large pan over medium-high heat.  Add the onion and mushrooms and cook for a further 5 minutes, or until the sausage is cooked and the onions are soft and translucent.  Drain of any excess fat. (You can add salt &amp; pepper at this point depending on how salty/spicy your sausage is- I usually don't).", 'Sprinkle the mozzarella and parmesan on the bottom of your pie crust.  Top the cheese with the sausage mixture, and spread it out evenly.  Next, spread the pizza sauce over the top, making sure the filling is completely covered.  Finally, you can sprinkle the Italian seasoning and grated cheese on top, if you wish.', 'Bake for 30 minutes.  Let cool for at least 5 minutes before serving.']   
        },
        {
        name: "Double Pork, Double Cheese Burgers" , 
        description: "The perfect dessert for a special occasion, or just when your sweet tooth is clamoring for attention. I like using organic plain kefir as a substitute for milk for a flavorful twist." , 
        ingredients:['ground almonds', 'granulated sugar', 'lemons%2c zest of', 'eggs', 'cornflour', 'sugar syrup', 'icing sugar']  , 
        quantity:["","3   cups    ground almonds","1   cup    granulated sugar","3       lemons, zest of, finely grated ","3   small   medium eggs","","3   tablespoons    cornflour (maize or cornstarch)","","2   cups   of light sugar syrup","2 1/2  cups    icing sugar (confectioners sugar)"]  , 
        serving_size: "1 (435 g)" , 
        servings: "4" , 
        steps:['Place the first 4 ingredients in a large bowl and mix well - traditionally with your hand.', 'Dust work top with a little cornflour and roll mixture into a sausage shape - approximately the thickness of a frankfurter or average thumb!', 'Cut the sausage into 3cm pieces. Do this at an angle to create lozange or diamond shapes.', 'Bake on middle shelf at approx 170c until set &amp; still pale - about 12-14 minutes THEY SHOULD NOT BE DARK.', 'When cooled slightly, drop one by one into the syrup. Hold on a fork and allow excess to dribble off before slowly dropping into the sugar. Re-dip with sugar 15 mins later and pop into paper cases.', 'For the syrup you can make it easily by putting 2 cups of water and 1 cup of sugar in a pan and boiling for 10 minutes It needs to be nice and light - just enough to hold the icing sugar on.']   
        },
        {
        name: "Brain Cookies With Blood Glaze" , 
        description: "Sauteed mushrooms replace traditional lasagna noodles, and their rich flavor and texture more than make up for the absence of meat. Use 3 T. flax seed meal mixed with 1 T. water for egg-free preparation (as noted in the ingredients). Gluten free pasta is available, but because Im severely vitamin D deficient as a result of Celiac Disease which went undiagnosed for many years, I came up with this in order to take advantage of the vitamin D in mushrooms. The cheese and pasta sauce are the two critical ingredients that will make or break this dish. We have two sauces created by local restaurants that are available in many Ohio grocery stores: LaRosas and Annarinos. They tie for first place as the best all-purpose sauce Ive ever tasted. You might consider looking in your area for a good locally produced sauce ... but maybe were just really lucky around here! I use Mario Batali Italian Four Cheese Blend because its outstanding and loaded with flavor." , 
        ingredients:['large shrimp', 'soy sauce', 'garlic clove', 'vegetable oil', 'red bell pepper', 'onion', 'snow peas', 'water', 'pepper', 'rice']  , 
        quantity:["500   g    large shrimp, peeled and deveined  (i used allready cooked shrimp)","3   tablespoons    soy sauce","1       garlic clove, finely chopped ","2   tablespoons    vegetable oil","1   small    red bell pepper, coarsely chopped  (capsicum)","1   small    onion, coarsely chopped ","16       snow peas, ends trimmed and rinsed  (mangetouts)","2   tablespoons    water","1   pinch    pepper","2 (200   g)   straight to wok rice (unsure about size but i used 2 packets, can just have this on boiled or steamed rice)"]  , 
        serving_size: "1 (52 g)" , 
        servings: "24" , 
        steps:['combine shrimp, 2tbsp of the soy sauce and the garlic - stir with a wooden spoon until evenly coated and set aside for ten minutes.', 'add vegetable oil to wok / large frypan and set over a medium-high heat.', 'when oil is hot add red pepper and onion.', 'cook stirring constantly until the pepper is slightly softened , about 3 minutes.', 'at this point i added my straight to wok rice an heated through, if you are not doing this skip to the next step.', 'add the snow peas and shrimp mixture.', 'continue stirring and turning until shrimp turn pink and are cooked through ( i used allreay cooked shrimp) and the snow peas are tender but still crisp about 3 minutes more.', 'remove from heat and add remaining tbsp of soy sauce, water and the pepper.', 'serve imediately (on a bed of rice if you have not used straight to wok rice).']   
        },
        {
        name: "Delicious Lime Cheesecake Ice Cream" , 
        description: "This is an ideal way of cooking racks of lamb when you dont want a crumbed coating.  I like to serve this with a salad & potatoes (done however takes your fancy on the day!)or with steamed vegetables such as broccoli, cauliflower & carrots and a jacket baked potato, with a horror of horrors......gravy made with a pkt mix! LOL" , 
        ingredients:['bacon', 'ground pork', 'garlic clove', 'thyme', 'kosher salt', 'fresh ground pepper', 'red onions', 'olive oil', 'hamburger buns', 'unsalted butter', 'camembert cheese', 'gorgonzola', 'arugula', 'tomatoes']  , 
        quantity:["1/2  cup   finely chopped bacon","1 1/2  lbs    ground pork","1   large    garlic clove, minced ","2   teaspoons   finely chopped thyme","1   teaspoon    kosher salt","1/2  teaspoon    fresh ground pepper","4   slices    red onions (1/2-inch thick)","  olive oil, for drizzling ","4       hamburger buns or 4       ciabatta rolls","2   tablespoons    unsalted butter, melted ","6   ounces    camembert cheese, cut into eight slices  (1/3-inch-thick)","2   ounces    gorgonzola, cut into four slices  (1/3-inch-thick)","  arugula","4       tomatoes, slices "]  , 
        serving_size: "1 (120 g)" , 
        servings: "4" , 
        steps:['In a skillet, cook the bacon over moderate heat, stirring until cooked through, about 3 minutes.', 'Transfer the bacon to paper towels to drain and let cool.', 'In a large bowl, mix the bacon with the ground pork, garlic, thyme, salt and pepper.', 'Shape into four 1-inch-thick patties.', 'Light a grill.', 'Drizzle the onion slices with olive oil and grill over moderately high heat until lightly charred, about 2 minutes per side.', 'Transfer to a platter.', 'Brush the cut sides of the buns with the melted butter and grill, cut sides down, until toasted, about 1 minute.', 'Turn and grill for 30 seconds longer.', 'Transfer the buns to the platter.', 'Grill the burgers until charred outside and cooked through, about 5 minutes per side.', 'Arrange 2 Camembert slices and a Gorgonzola slice on each burger and cook until the cheese is melted, 1 minute.', 'On the bottom halves of the buns, layer the arugula, tomato, burgers and grilled onion.', 'Close the burgers and serve.', '*The burgers can be refrigerated overnight. Bring to room temperature before grilling.']   
        },
        {
        name: "Pinto Bean Soup With Fresh Salsa" , 
        description: "This is from  Small Cakes and Cookies cookbook. Wonderful book with all chocolate recipes in it." , 
        ingredients:['unsalted butter', 'sugar', 'all-purpose flour', 'baking soda', 'salt', 'eggs', 'walnuts', 'vanilla', 'red food coloring', 'blue food coloring', 'icing sugar', 'red food coloring']  , 
        quantity:["","1   cup    unsalted butter, softened ","1   cup    sugar","3   cups    all-purpose flour","1/2  teaspoon    baking soda","1/2  teaspoon    salt","2   large    eggs","1/2  cup   very finely chopped walnuts or 1/2  cup    pecans","1   teaspoon    vanilla","5   drops    red food coloring","9   drops    blue food coloring","","2   cups    icing sugar","35   drops    red food coloring"]  , 
        serving_size: "1 (658 g)" , 
        servings: "6" , 
        steps:['Preheat the oven to 350 degrees F.', 'Line 2 large baking sheets with parchment paper and set aside.', 'In a large bowl, cream together the butter and sugar.', 'Into a separate bowl, sift together the flour, baking soda, and salt.', 'Alternating with the eggs, add the flour mixture to the butter mixture, beating well after the each addition.', 'Fold in the nuts, vanilla, and red and blue food coloring, being careful not to overmix the dough.', 'Place the dough in batches in a potato grinder and push the dough out onto the prepared baking sheets in long tubes of dough.', 'With your fingers, loosely pat and arrange the dough strands into clumps resembling brains, pushing to form 2 hemispheres and shaping into a walnut-like shape.', 'Bake until golden brown on the bottom, 12 to 14 minutes.', 'Remove from the oven and transfer to a wire rack to cool.', 'To make the blood glaze: in a small bowl, combine the icing sugar with the food coloring to make a thick glaze, whisking together.', 'Drizzle the "blood" onto the cookies and serve either warm or at room temperature.']   
        },
        {
        name: "Roasted Shrimp Cocktail" , 
        description: "Chicago-style pizza is great, but it can be a pain to make and way too expensive to buy from a restaurant... so I came up with this easy-to-make recipe.  The best Chicago pizzas usually feature cornbread crusts, but the pie crusts make a surprisingly tasty substitute!  I use this recipe by Dan-Amer #1 for the sausage (http://www.food.com/recipe/homemade-bulk-italian-sausage-chicago-style-329000), but store-bought sausage should work just as well." , 
        ingredients:['egg yolks', 'caster sugar', 'cream cheese', 'lime curd', 'double cream', 'milk']  , 
        quantity:["3      free range egg yolks","3   ounces    caster sugar","50   g    cream cheese","3   tablespoons    lime curd","150   ml    double cream","150   ml    milk"]  , 
        serving_size: "1 (115 g)" , 
        servings: "6" , 
        steps:['Beat egg yolks with caster sugar and cream cheese until smooth. Add  lime curd, milk and cream. mix well until sugar is fully incorporated.', "Churn in an ice cream maker for approx 20 minutes. Remove from churner &amp;  place in a container &amp; freeze for at least 1 hour. Allow to 'sit' for a couple of minutes before serving."]   
        },
        {
        name: "Caramel Butter Brie" , 
        description: "Delicious little diamonds of tangy almond delight! Easy to make and very much appreciated by all. Perfect for Eid celebrations or any special (or not so special!) ocassion." , 
        ingredients:['dried pinto beans', 'water', 'vegetable oil', 'yellow onions', 'salt', 'fresh ground black pepper', 'garlic cloves', 'chicken stock', 'plum tomatoes', 'red onion', 'fresh cilantro', 'lime%2c juice of', 'salt %26 freshly ground black pepper', 'crema']  , 
        quantity:["1 1/2  cups    dried pinto beans","7   cups    water","1/4  cup    vegetable oil","2       yellow onions, diced ","1   teaspoon    salt","1/2  teaspoon    fresh ground black pepper","4       garlic cloves, minced ","6   cups    vegetable stock or 6   cups    water","","3      ripe plum tomatoes, diced  (Roma)","1/2  small    red onion, finely diced  (Spanish)","1/4  cup   coarsely chopped fresh cilantro","1       lime, juice of","  salt \u0026 freshly ground black pepper","  crema or   sour cream"]  , 
        serving_size: "1 (77 g)" , 
        servings: "8" , 
        steps:['Sort through the beans and discard any misshapen beans or stones. Rinse well. Place the beans in a saucepan and add the water. Bring to a boil, reduce the heat to medium low, cover and simmer until the smallest bean is cooked through and creamy inside, about 1 Â½ hours. Remove from the heat and set aside.', 'In a large saucepan over medium heat, warm the vegetable oil. Add the onions, salt and pepper and sautÃ© until the onions are lightly browned, about 10 minutes. Add the garlic and sautÃ© for 1 to 2 minutes longer. Add the beans and their liquid and the stock or water. Bring to a boil, reduce the heat to medium and simmer uncovered, stirring occasionally, until the beans start to break apart, 20 to 30 minutes. Remove the beans from the heat and let cool slightly.', 'For the salsa:', 'In a bowl, stir together the tomatoes, onion, cilantro, lime juice and salt and pepper to taste. Cover and refrigerate until you are ready to serve.', 'Working in batches, transfer the bean mixture to a blender and puree until smooth. Transfer the puree to a clean saucepan and reheat over reheat over low heat, stirring frequently, until hot. (If not serving immediately, keep warm over very low heat, stirring often).', 'Ladle the soup into warmed shallow bowls and top each serving with a spoonful of salsa and a dollop of crema or sour cream.']   
        },
        {
        name: "Tiramisu Piemontese" ,  
        description: " description" , 
        ingredients:['shrimp', 'olive oil', 'kosher salt', 'fresh ground black pepper']  , 
        quantity:["2   lbs    shrimp","1   tablespoon    olive oil","1/2  teaspoon    kosher salt","1/2  teaspoon    fresh ground black pepper"]  , 
        serving_size: "1 (115 g)" , 
        servings: "12" , 
        steps:['Preheat the oven to 400 degrees F.', 'Peel and devein the shrimp, leaving the tails on.', 'Place them on a sheet pan with the olive oil, salt, and pepper and spread them in 1 layer. (I added a little Garlic salt too).', 'Roast for 8 to10 minutes, just until pink and firm and cooked through.', 'Set aside to cool.']   
        },
        {
        name: "Hemingway Special- a Caribbean Inspired Cocktail" , 
        description: "This is for the lemon ones - more traditionally they are lime...." , 
        ingredients:['butter', 'light brown sugar', 'white sugar', 'heavy whipping cream', 'nutmeg', 'brie cheese', 'pecans']  , 
        quantity:["1/4  cup    butter","1/4  cup    light brown sugar","1/4  cup    white sugar","1/4  cup    heavy whipping cream","1/8  teaspoon    nutmeg, ground ","12   ounces    brie cheese, wheel ","1/2  cup    pecans, toasted "]  , 
        serving_size: "1 (166 g)" , 
        servings: "1" , 
        steps:['Preheat oven to 350 degrees.', 'Melt butter, brown sugar and white sugar in heavy saucepan over low heat and stir until sugars are dissolved.', 'Gradually whisk in heavy cream and continue whisking until smooth.', 'Add nutmeg.', 'Bring to a boil over medium heat and cook for 5 minutes.', 'Place wheel of Brie on a pie plate and pour caramel over the top, letting it drip down the sides.', 'Bake for 10 minutes or until Brie is soft.', 'Remove from oven and sprinkle with toasted pecans.', 'Let stand 5 minutes before serving.']   
        },
        {
        name: "New Orleans Skillet Baked Cornbread" ,  
        description: " description" , 
        ingredients:['mascarpone', 'eggs', 'sugar', 'marsala wine', 'espresso coffee', 'ladyfingers', 'unsweetened cocoa powder', 'sweetened cocoa powder']  , 
        quantity:["700   g    mascarpone","6      very fresh eggs (essential!!, 5 if eggs are particularly large)","100   g    sugar","1/2  cup    marsala wine","250   ml   freshly brewed espresso coffee (not too strong, slightly diluted, (or more)","600   g    ladyfingers (or savoiardi, if available, biscuits, enough to cover 2 layers)"," pure unsweetened cocoa powder","  sweetened cocoa powder"]  , 
        serving_size: "1 (81 g)" , 
        servings: "8" , 
        steps:['Separate eggs. Beat together yolks, sugar, wine and mascarpone until the mixture attains a smooth creamy texture.', 'Whip the eggwhite vigorously until it becomes solid--if available, electric whip will help immensely. (do this patiently with "high energy", if it is not solid enough the end result will be soggy and soupy!).', 'Carefully fold in the whipped eggwhite into the mascarpone/york mixture, blend them well and evenly.', 'Mix 2 teaspoonful of sugar into the coffee, then pour in a container large enough to dip savoiardi/lady fingers comfortably.', 'Dip each pieces of biscuits into the coffee quickly, (wet the entire surface for a moment but not until it gets soggy all the way through) lay them neatly in one layer at the bottom of a large square/rectangular baking dish (or 2 medium).', 'Pour half of the cream (mascarpone/egg mixture) evenly over the savoiardi, then sprinkle the sweetened cocoa powder to cover the surface.', 'Lay another layer of savoiardi on top, repeat with the cream, then top it off with unsweetened pure cocoa powder.', 'Chill it in the fridge for a couple of hours before serving.']   
        },
        {
        name: "Crab &amp; Fresh Basil Stuffed Mushrooms" , 
        description: "You can freeze these and then put the syrup and icing sugar on later. I like to make a few things in advance so Im not cooking 24/7 just before Eid etc. I also make these with a mix of 250g desiccated coconut + 100g ground almonds - just as tasty & a fraction of the cost!" , 
        ingredients:['white rum', 'maraschino juice', 'lime%2c juice of', 'grapefruit juice', 'blue curacao', 'pineapple juice']  , 
        quantity:["2   ounces    white rum","1/4  ounce    maraschino juice, can use grenadine ","1/2      lime, juice of","1   ounce    grapefruit juice","1   ounce    blue curacao","2   ounces    pineapple juice"]  , 
        serving_size: "1 (185 g)" , 
        servings: "8" , 
        steps:['Squeeze lime juice into a shaker.', 'Add remaining ingredients and shake briefly.', 'Pour into a frosty glass filled with crushed ice.']   
        },
        {
        name: "Absolutely Delightful Scalloped Potatoes" , 
        description: "I addapted this out of a childrens cookbook. Everyone loved it so much that I have to make it once a week now, lol. You can just serve it with boil in the bag rice which is what the original recipe suggests." , 
        ingredients:['yellow cornmeal', 'flour', 'sugar', 'baking powder', 'salt', 'allspice', 'fresh ground white pepper', 'egg', 'milk', 'vegetable shortening', 'shortening']  , 
        quantity:["1   cup    yellow cornmeal","1   cup    flour","1   tablespoon    sugar","4   teaspoons    baking powder","1   teaspoon    salt","1/8  teaspoon    allspice","1/8  teaspoon    fresh ground white pepper","1   large    egg","1   cup    milk","1/4  cup    vegetable shortening","1 1/2  tablespoons    bacon (approx) or 1 1/2  tablespoons    sausage drippings (approx)"]  , 
        serving_size: "1 (205 g)" , 
        servings: "6" , 
        steps:['Place an iron skillet (or other baking dish) 2/3 full with water on the floor of your oven before preheating to achieve a crisp crust and moist interior.', 'Preheat oven to 425 degrees Sift dry ingredients together into a large mixing bowl.', 'Add egg, milk, and 1/4 cup shortening and beat with a wooden spoon until smooth, about 1 minute.', 'Grease an 8 or 9 inch skillet or heavy square baking pan with the shortening or bacon drippings.', 'Pour batter into pan and place in oven.', 'Bake 25-30 minutes until light golden brown on top.', 'To serve, take skillet to table and cut bread into wedges; top with butter and/or honey if desired.']   
        },
        {
        name: "Thanksgiving Mashed Potatoes" , 
        description: "Food and Wine Magazine, June /07 edition. These burgers pair well with the crisp, coriander-inflected Lagunitas Brewing Companyâ€™s Sonoma Farmhouse Saison, modeled after the widely distributed Belgian beer Saison Dupontâ€”also a great match. Chef Sang Yoon  will almost always choose ale over Riesling and this is one of his beer-friendly recipes." , 
        ingredients:['monterey jack cheese', 'plain breadcrumbs', 'kosher salt', 'green onions', 'fresh basil', 'tabasco sauce', 'dry white wine', 'fresh lemon juice', 'garlic clove', 'egg', 'fresh crabmeat', 'button mushrooms', 'cooking oil']  , 
        quantity:["3   cups    monterey jack cheese, shredded  (about 3/4 pound)","1/2  cup    plain breadcrumbs","1/8  teaspoon    kosher salt","2       green onions, sliced thin ","2   teaspoons    fresh basil, finely chopped ","12   drops    Tabasco sauce","2   tablespoons    dry white wine","2   tablespoons    fresh lemon juice","1   small    garlic clove, crushed ","1   large    egg, lightly beaten ","1   lb    fresh crabmeat (canned crab meat can be used, but i recommend fresh crab)","48   medium    button mushrooms","  cooking oil"]  , 
        serving_size: "1 (538 g)" , 
        servings: "5" , 
        steps:['Combine cheese, breadcrumbs, salt, green onions and basil in a medium mixing bowl.', 'Combine Tabasco sauce, wine, lemon juice, garlic and egg in a separate bowl. Add to the breadcrumb mixture; Add crab meat to bread crumb mixture and fold until blended; Refrigerate for at least an hour, or overnight.', 'Pre-heat the oven to 400Â° degrees F.', 'Remove mushroom stems out of the caps. Take a small handful of stuffing in your palm and mold into a round ball (wet hands will keep it from sticking). Place stuffing firmly inside the mushroom cap, being careful not to break the mushroom. Place stuffed mushrooms on an oiled cookie sheet about a half inch apart. (At this point, the mushrooms can be refrigerated and baked later).', 'Bake for 15 â€“ 20 minutes or until the stuffing is lightly browned and serve. They can also be reheated if not served immediately.']   
        },
        {
        name: "So Easy Blackberry Sauce" , 
        description: "A great halloween cookie" , 
        ingredients:['potatoes', 'cream of mushroom soup', 'cream of chicken soup', 'evaporated milk', 'salt and pepper', 'cheddar cheese']  , 
        quantity:["4 -5      thinly sliced potatoes","1 (10   ounce) can   cream of mushroom soup","1 (10   ounce) can   cream of chicken soup","1/2-3/4     of one can evaporated milk (12 ounce)","  salt and pepper","2   cups    cheddar cheese"]  , 
        serving_size: "1 (77 g)" , 
        servings: "12" , 
        steps:['Grease well a 3 qt casserole dish.', 'Heat soups and evaporated milk in saucepan and stir until blended well.', 'Cover bottom of dish with one layer of potatoes.', 'Sprinkle with salt and pepper.', 'Pour enough soup mixture over potatoes just to cover.', 'Sprinkle with cheese.', 'Repeat layers (potatoes-salt and pepper-soup-cheese)ending with cheese.', 'Cover and bake in 350 oven for 1 hr - 1 and 1/2 hours.', '(Can also be microwaved for 45 minutes).']   
        },
        {
        name: "Chicken Vegetable Soup Low Carb/Low Fat" , 
        description: "This is a fabulous ice cream recipe. It is THE simplest thing to put together & makes a wonderful treat.... To jazz it up sometimes I add some finely grated lime zest" , 
        ingredients:['potatoes', 'butter', 'salt', 'milk', 'chicken gravy', 'black pepper']  , 
        quantity:["5   large    potatoes (washed)","1/2  cup    butter or 1/2  cup    margarine","1   teaspoon    salt","1 1/2  cups    milk","1 1/2  cups    chicken gravy","1   teaspoon    black pepper"]  , 
        serving_size: "1 (298 g)" , 
        servings: "8" , 
        steps:['Bake the potatoes and when ready, mash them in a mixing bowl.  Add the remaining ingredients and keep mashing them until they are creamy.  Serve topped with country gravy or gravy of choice.']   
        },
        {
        name: "Kickin Shrimp Dip" ,  
        description: " description" , 
        ingredients:['frozen blackberries', 'cranberry sauce', 'sugar', 'water', 'flour']  , 
        quantity:["8   ounces    frozen blackberries","1 (15   ounce) can   cranberry sauce","1/3  cup    sugar","3/4  cup    water","1/4  cup    flour"]  , 
        serving_size: "1 (72 g)" , 
        servings: "10" , 
        steps:['Put the cranberry sauce and the blackberries in the pan.', 'Heat, stirring until the cranberry sauce melts or dissolves or whatever you want to call it.', 'Stir in the sugar.', 'Bring the sauce and berries to a boil.', 'Mix the water and flour in a cup and pour into the sauce.', 'It will thicken really quick.', 'Stir, take it off the stove.', 'Serve hot or warm, on waffles or pancakes or ice cream or pork.']   
        },
        {
        name: "Moms Upside-Down Pizza" , 
        description: "Time to make doesnt include churning/freezing time ;)" , 
        ingredients:['skinless chicken breasts', 'carrots', 'celery', 'parsnip', 'leek', 'green beans', 'parsley', 'garlic clove', 'chicken stock', 'water', 'salt %26 pepper']  , 
        quantity:["500   g    skinless chicken breasts","3       carrots, chopped ","4       celery, chopped ","1       parsnip, chopped ","1       leek, chopped ","1   cup    green beans, chopped ","2   tablespoons    parsley, chopped finely ","1       garlic clove, crushed ","3 -4   tablespoons    chicken stock","8   cups    water","  salt \u0026 pepper"]  , 
        serving_size: "1 (273 g)" , 
        servings: "8" , 
        steps:['Bring water to boil.', 'In the meantime, cut up all the vegetables into small cubes.', 'Cut the chicken into 1cm cubes.', 'Add the vegetables and garlic and stock and boil on high heat for 5 minutes, reduce heat and simmer for 15 minutes.', 'Add chicken and bring to boil for 2 minutes, then reduce heat and simmer for 20 minutes or longer.', 'Soup is ready when all ingredients have sunk to the bottom!']   
        },
        {
        name: "Alabama White Barbecue BBQ Sauce" , 
        description: "Despite its creamy taste, this simply prepared soup is surprisingly low in fat. A cantina cook might well make up a batch from the previous dayâ€™s leftover beans. It is the perfect antidote to a blustery day, and the fresh, sharp garnish contrasts nicely with the natural richness of the beans." , 
        ingredients:['cream cheese', 'sour cream', 'old bay seasoning', 'lemon juice', 'cayenne pepper', 'worcestershire sauce', 'chili powder', 'cooked shrimp']  , 
        quantity:["8   ounces    cream cheese, softened ","8   ounces    sour cream","2   tablespoons    Old Bay Seasoning","2   tablespoons    lemon juice","1/2  teaspoon    cayenne pepper","2   tablespoons    Worcestershire sauce","1/2  teaspoon    chili powder","12   ounces    cooked shrimp, minced "]  , 
        serving_size: "1 (43 g)" , 
        servings: "6" , 
        steps:['Mix together, adjusting seasonings to taste. Add shrimp last.', 'Chill several hours before serving.']   
        },
        {
        name: "Cherry Pound Cake" , 
        description: "This recipe for shrimp cocktail is way better than any cold recipe I have ever tried! I saw it on Food Network by Ina of Barefoot Contessa... The shrimp is so flavorful!! The original recipe also included a cocktail sauce, but they were so good, we didnt even need sauce!" , 
        ingredients:['ground beef', 'onion', 'tomato sauce', 'spaghetti sauce mix', 'sour cream', 'mozzarella cheese', 'crescent roll dough']  , 
        quantity:["2   lbs    ground beef","1   cup    onion, chopped ","15   ounces    tomato sauce","1 1/4  ounces    spaghetti sauce mix","8   ounces    sour cream","8   ounces    mozzarella cheese, shredded ","8   ounces    crescent roll dough"]  , 
        serving_size: "1 (230 g)" , 
        servings: "6" , 
        steps:['Preheat oven to 350.', 'Brown meat and onion in a large skillet and drain.', 'Stir in tomato sauce and mix, cook over low heat for 10 minutes.', 'Spoon mixture into lightly greased 13X9 dish, top with sour cream and sprinkle with cheese.', 'Unroll crescent rolls and place over cheese.', 'Bake, uncovered, for 20 to 25 minutes until done.']   
        },
        {
        name: "Festive Striped Cookies" , 
        description: "This makes a wonderful sweet/salty appetizer to spread over crackers.  Once you cut into this the soft cheese kind of oozes out and its fabulous to spread over apple slices also." , 
        ingredients:['mayonnaise', 'cider vinegar', 'fresh lemon juice', 'black pepper', 'cayenne pepper']  , 
        quantity:["1   cup    mayonnaise, i use hellmans but try your favorite ","1   cup    cider vinegar, I use Heinz ","1   tablespoon    fresh lemon juice, can use bottled but fresh is the bomb ","1 -1 1/2  tablespoon    black pepper, depends on you ","1/4  teaspoon    cayenne pepper, here\u0027s the zing but not too much really "]  , 
        serving_size: "1 (862 g)" , 
        servings: "1" , 
        steps:['Mix all ingredients together and refrigerate for 8 hours for best result (you can use it pretty quickly however in a pinch).  Brush lightly or marinate over chicken, turkey or pork.  If brushing lightly do last few minutes of grilling.  Can be used as a dipping sauce as well.', 'This amount easily covers 6 pieces of chicken so you can adjust accordingly if you are marinating or just brushing it on.']   
        },
        {
        name: "Spicy Hot &amp; Sour Garlic Saute" , 
        description: "One of the most celebrated delicious Italian desserts, and my Roman partner Cristiano introduced me to the best possible recipe!!" , 
        ingredients:['butter', 'sugar', 'eggs', 'almond extract', 'flour', 'baking powder', 'salt', 'evaporated milk', 'maraschino cherries', 'icing sugar']  , 
        quantity:["1 1/4  cups    butter, softened ","2 3/4  cups    sugar","5       eggs","1   teaspoon    almond extract","3   cups    flour","1   teaspoon    baking powder","1/4  teaspoon    salt","1   cup    evaporated milk, undiluted ","2   cups    maraschino cherries, well drained ","  icing sugar"]  , 
        serving_size: "1 (40 g)" , 
        servings: "4" , 
        steps:['Beat butter, sugar, eggs and extract in large bowl on low speed of electronic mixer until blended, then on high speed 5 minutes until light and fluffy.', 'Combine flour, baking powder and salt.', 'Add dry ingredients alternately with evaporated milk to creamed mixture,mixing lightly after each addition.', 'Fold in cherries.', 'Turn batter into greased and floured bundt or tube pan.', 'Bake at 350Â° for 55 minutes.', 'Cover loosely with foil, shiny side out; continue baking 15-20 minutes, until toothpick inserted in center comes out clean.', 'Let cool in pan for 5 minutes; invert cake onto rack and let cool completely.', 'Sprinkle with icing sugar to finish.']   
        },
        {
        name: "Chicken Parm Meatball Subs" ,  
        description: " description" , 
        ingredients:['butter', 'sugar', 'egg', 'vanilla extract', 'flour', 'salt', 'flaked coconut', 'baking powder', 'green food coloring', 'dried cranberries', 'red food coloring', 'almond extract']  , 
        quantity:["1   cup    butter, softened ","1   cup    sugar","1   large    egg, lightly beaten ","1   teaspoon    vanilla extract","2 1/2  cups    flour","1/2  teaspoon    salt","1/3  cup    flaked coconut","1 1/2  teaspoons    baking powder","2 -3   drops    green food coloring","1/4  cup   sweet dried cranberries","2   drops    red food coloring","1/2  teaspoon    almond extract"]  , 
        serving_size: "1 (601 g)" , 
        servings: "4" , 
        steps:['Cream butter and sugar till light and fluffy -- add egg and vanilla.', 'Gradually blend in flour, baking powder, and salt.', 'Divide dough into thirds.place each 1/3 in separate mixing bowls.', 'Stir green food coloring into 1/3; set aside.', 'Stir cranberries and red food coloring into 1/3; set aside.', 'Stir coconut and almond extract into last 1/3; set aside.', 'Line an 8x8-inch baking pan with plastic wrap; press green dough evenly to cover the bottom.', 'Layer with coconut mixture -- then cranberry mixture, pressing each layer gently to cover the layer below.', 'Cover dough and refrigerate for 8 hours.', 'Lift dough from pan by plastic wrap.', 'Cut dough into 5 equal sections.', 'Carefully cut each section into 1/8th inch slices.', 'Lay flat on ungreased baking sheet.', 'Bake at 375Â°F for 8-10 minutes.', 'Remove to wire rack to cool completely.']   
        },
        {
        name: "Honey Glazed Baby Carrots" , 
        description: "Tiramisu means Pick me up in Italian (Tira mi su). I was curious about the origin of this name, and when I asked Cristiano about it, he told me this rich cake full of calories (thus it would give you lots of energy) was served traditionally as a final dessert at weddings (the Italian weddings rival to those of Greeks, they keep on eating and eating all day and night!!). This was done to assure the newly weds very energetic and passionate honeymoon following the big feast!!" , 
        ingredients:['meat', 'garlic cloves', 'fresh gingerroot', 'dried red chilies', 'water', 'ground cumin', 'ground coriander', 'ground turmeric', 'vegetable oil', 'whole cumin seeds', 'salt', 'sugar', 'lemon juice']  , 
        quantity:["14 -18   ounces   of stir fry meat (or a combo of both meat and vegetables) or 14 -18   ounces   of your favorite stir fry vegetables (or a combo of both meat and vegetables)","5       garlic cloves (chopped)","  fresh gingerroot (a chunk approx. 1inch cube (or more, peeled \u0026 chopped)","1/2-2   small    dried red chilies or 1   teaspoon    black pepper","7   tablespoons    water","2   teaspoons    ground cumin","1   teaspoon    ground coriander","1/2  teaspoon    ground turmeric","4   tablespoons    vegetable oil","1 1/2  teaspoons    whole cumin seeds","1   teaspoon    salt","2   teaspoons    sugar","6   teaspoons    lemon juice (fresh is best)"]  , 
        serving_size: "1 (109 g)" , 
        servings: "6" , 
        steps:["Have the meat and/or veggies that you are going to saute' ready to go into the pan.", 'In a blender or processor add garlic, ginger, 3Tbsp water &amp; pepper-- (or you can add a 2 inch cube of Ginger &amp; leave out the pepper all together)blend until smooth. Add Cumin powder, Coriander powder, &amp; Turmeric powder &amp; blend until well mixed -- set this Spice Blend aside.', '(When you are ready to add the Spice Blend to the hot pan hold your face away from the area directly above the pan so you do not get fumes in your eyes &amp; nose.).', 'In a small container mix the Lemon, Sugar &amp; Salt -- set aside.', 'Turn on the vent-fan because the kitchen is about to be a very spicy place to be.', "In a 9 inch frying pan with a lid, add veg. Oil &amp; heat on med., when oil is hot add the cumin seeds. Shake the pan a little so they don't scorch. Turn the heat down a little as the seeds begin to sizzle.", 'Quickly (about 15 seconds or less after the seeds sizzle) add the Spice Blend. Stirring frequently cook for about 1 min., then add the the meat and/or veggies that you are going to cook &amp; the Lemon juice, Sugar, Salt &amp; just enough water to allow for simmering (approx. 4 Tbsp).Turn heat to low. Mix well , cover tightly &amp;  cook on low for 10 minutes or until  ingredients are tender.', 'Serve alone as a small side dish or with rice for a meal.']   
        },
        {
        name: "Beat and Bake Sponge Cake" , 
        description: "A spin off of the Hemingway Special Serve in a frosty glass over ice and you are set to sample a taste of the Caribbean!" , 
        ingredients:['ground chicken', 'seasoning', 'egg', 'parmesan cheese', 'italian seasoned breadcrumbs', 'parsley', 'extra virgin olive oil', 'garlic cloves', 'red pepper flakes', 'crushed tomatoes', 'chicken stock', 'salt', 'black pepper', 'fresh basil leaves', 'hoagie rolls', 'provolone cheese']  , 
        quantity:["1 1/2  lbs    ground chicken","1   tablespoon   grill seasoning","1       egg, beaten ","1   cup   grated parmesan cheese","1/2  cup    Italian seasoned breadcrumbs","  parsley","3   tablespoons    extra virgin olive oil, plus some for drizzling ","2   large    garlic cloves, cracked from skins and split ","1/4  teaspoon    red pepper flakes","1 (28   ounce) can   crushed tomatoes","1   cup    chicken stock","  salt","  black pepper","8 -10      torn fresh basil leaves","4      crusty hoagie rolls","1 1/2  cups   shredded provolone cheese"]  , 
        serving_size: "1 (86 g)" , 
        servings: "4" , 
        steps:['Preheat the oven to 425*F.', 'Place the chicken in a bowl and season it with the grill seasoning. Add the egg, half of the grated cheese, bread crumbs, parsley, and a big drizzle of the olive oil.', 'Combine the mixture and form 12 large meatballs, placing them on a baking sheet. Squish the balls to flatten them a bit - like mini oval meatloaves. Be careful not to form the balls wider than your bread. The flattened balls will stay put on your sub - no roll-aways! Bake the meatballs for 15 minutes, or until golden and firm.  Switch the broiler on.', 'While the chicken balls bake, heat a medium skillet over medium heat. Add the 3 Tablespoons of olive oil and the garlic and cook them for 5 minutes. Discard the garlic, add the red pepper flakes and the tomatoes, and stir in the chicken stock.  Season the sauce with salt and pepper and simmer for 10 minutes. Adjust the seasonings and stir in the basil.', 'Use a thin spatula to loosen the chicken balls from the baking sheet and add them to the sauce, turning the meatballs to coat.', "Cut the sub rolls, making the bottom a little deeper than the top. Hollow out a little of the bread and lightly toast the sub rolls under the broiler. Fill the bottoms of the breads with the sauced meatballs. Combine the provolone and the remaining parmesan cheese. Cover the meatballs with cheese and return to the broiler to melt the cheese until it's golden. Set the roll tops in place. Pour any leftover sauce into a bowl and serve at the table for dipping."]   
        },
        {
        name: "Bulgur and Pumpkin Pilaf" , 
        description: "This cornbread makes an excellent side for New Orleans Red Beans and Rice recipe #87365. This recipe also comes from the same cookbook, The New Orleans CookBook by Rima and Richard Collin. I highly recommend using bacon grease (I used pepper bacon) rather than shortening to grease the cast iron skillet. I have made this recipe both ways and the bacon adds that extra special touch that really gives a nice tie-in with the Red Beans and Rice." , 
        ingredients:['baby carrots', 'water', 'honey', 'butter', 'dark brown sugar', 'white wine vinegar', 'salt', 'ground allspice']  , 
        quantity:["1   lb   fresh baby carrots","1/4  cup    water","1/4  cup    honey","2   tablespoons    butter","2   tablespoons    dark brown sugar, firmly packed ","1   tablespoon    white wine vinegar","1/2  teaspoon    salt","1/8  teaspoon    ground allspice"]  , 
        serving_size: "1 (91 g)" , 
        servings: "6" , 
        steps:['In a large skillet, combine all ingredients over medium-high heat on stovetop.', 'Bring to a boil.', 'Reduce heat to medium; cover and simmer for approximately 20 minutes, or until carrots are almost tender.', 'Cook, uncovered, for approximately 10 minutes longer, or until carrots are tender and liquid is reduced to a glaze.']   
        },
        {
        name: "Fast and Easy Pork Chops" , 
        description: "A wonderful tasting and attractive hors dâ€™oeuvre that can easily be made ahead of time, to be baked later. I sampled these at a friends art opening and had to have the recipe. Everyone was raving over how good they were and could not believe that she hadnt hired someone to make them." , 
        ingredients:['margarine', 'sugar', 'flour', 'baking powder', 'milk', 'eggs', 'vanilla essence']  , 
        quantity:["125   g    margarine (soft not melted, I use Stork)","200   ml    sugar","300   ml    flour","2   teaspoons    baking powder (level spoons)","1/2  cup    milk","2       eggs","1   teaspoon    vanilla essence"]  , 
        serving_size: "1 (583 g)" , 
        servings: "4" , 
        steps:['Heat the oven to 180 deg Celsius.', 'Grease 2 16cm tins.', 'Put all ingredients into a bowl and beat slowly for 3 minutes.', 'When well mixed pour into the tins and bake for 25-30 minutes until golden brown.', 'Ice with your favourite recipe and flavour.']   
        },
        {
        name: "Red Snapper Provencal" , 
        description: "These are our familys favorite scalloped potatoes." , 
        ingredients:['vegetable oil', 'onion', 'pumpkin', 'cinnamon sticks', 'bay leaves', 'curry powder', 'bulgur', 'vegetable broth', 'salt', 'pepper']  , 
        quantity:["2   teaspoons    vegetable oil","1   cup    onion, finely chopped ","2   cups    pumpkin (peeled, seeded, and cut into 1/4-inch pieces ( or use canned pumpkin)","2       cinnamon sticks (about 2.5-inch long)","2       bay leaves","1 -2   teaspoon    curry powder (see note)","1   cup    bulgur, uncooked ","2   cups    vegetable broth","1/4  teaspoon    salt","1/4  teaspoon    pepper"]  , 
        serving_size: "1 (404 g)" , 
        servings: "4" , 
        steps:['NOTE:  For a really delicious flavor, use recipe #38702 for curry powder.', 'Heat oil in medium sauce pan over medium heat.  Add onion, pumpkin, and spices.  Cook, stirring frequently, until onion is tender (about 5 minutes).  If mixture starts to stick at all, add water as necessary.', "Add bulgur and stir to mix.  Cook and stir for about 2 minutes.  Stir in broth, salt, and pepper.  When mixture boils, cover saucepan, reduce heat to low, and cook 15 minutes or until liquid has been absorbed.  (Don't let it stick).", 'Fluff with fork before serving.']   
        },
        {
        name: "Pan-Fried Steak and Parsnip Salad" , 
        description: "Mashed potatoes for this special occasion" , 
        ingredients:['pork loin chops', 'beef broth', 'potatoes', 'onions', 'carrots', 'salt', 'pepper']  , 
        quantity:["4       pork loin chops (1 1/2 pounds) or 4       rib chops, 1 inch thick  (1 1/2 pounds)","1/4  cup    beef broth or 1/4  cup    chicken broth","4   medium    potatoes, cut into fourths ","4   medium    onions, cut into fourths ","2 -4   small    carrots, cut into 1 inch pieces ","3/4  teaspoon    salt","1/2  teaspoon    pepper"]  , 
        serving_size: "1 (148 g)" , 
        servings: "2" , 
        steps:['Spray 12-inch nonstick skillet with cooking spray.', 'Heat over medium high heat.', 'Cook pork in skillet about 5 minutes, turning once, until brown.', 'Add broth, potatoes, carrots and onions to the skillet.', 'Sprinkle seasonings.', 'Heat to boiling then reduce to simmer.', 'Cover and simmer for about 30 minutes or until vegetables are tender and pork done near the bone.']   
        },
        {
        name: "Egg Enchiladas" , 
        description: "The best blackberry sauce you can imagine, and SO easy! Serve with pancakes....waffles...or even over meats!" , 
        ingredients:['red snapper fillets', 'garlic cloves', 'olive oil', 'onion', 'celery', 'mushroom', 'tomatoes', 'tomato paste', 'white wine', 'clam juice', 'parsley', 'oregano', 'orange peel', 'cayenne pepper', 'salt and pepper', 'bay leaf']  , 
        quantity:["6       red snapper fillets, boneless and skinless ","2       garlic cloves, crushed ","3   ounces    olive oil","1/3  lb    onion, diced ","1/3  lb    celery, diced ","1/3  lb    mushroom, chopped ","1   lb    tomatoes, diced ","1 1/2  ounces    tomato paste","3/4  cup    white wine, dry ","3/4  cup    clam juice","2   tablespoons    parsley, chopped ","1/2  tablespoon    oregano","1   teaspoon    orange peel, grated ","1   dash    cayenne pepper","1   dash    salt and pepper","1       bay leaf"]  , 
        serving_size: "1 (266 g)" , 
        servings: "6" , 
        steps:['In large saucepan, heat olive oil and add garlic, onions, celery, and mushrooms.', 'SautÃ© vegetables until limp.', 'Add tomatoes, tomato paste, wine, and clam juice.', 'Bring to boil, and then reduce to simmer.', 'Add remaining ingredients, except fish.', 'Simmer 30 minutes.', 'Keep hot.', 'Place fish portions in 6 individual casserole dishes.', 'Top with sauce and bake in preheated 425 degree oven approximately 10 to 15 minutes or until fish flakes easily.', 'Note: May be baked in large baking dish, laying fish out side by side and topping with sauce.', 'Bake the same.', 'Garnish with lemon wedges.']   
        },
        {
        name: "Banana Oatmeal Cookies" , 
        description: "This soup is so tasty and good for you! Have as little or as much as you like! It is perfect for filling you up before your small meal of healthy stuff! I used this soup for colds/flus and even for dieting!!" , 
        ingredients:['sirloin steaks', 'parsnips', 'dates', 'mixed salad greens', 'mint leaves', 'low-fat creme fraiche', 'horseradish sauce', 'lemon juice']  , 
        quantity:["250   g    sirloin steaks, fat trimmed ","2       parsnips, peeled and coarsely grated ","4       dates, stoned and quartered lengthways ","150   g   ready mixed salad greens","2   tablespoons    mint leaves","3   tablespoons    low-fat creme fraiche","2   teaspoons    horseradish sauce","1 -2   teaspoon    lemon juice"]  , 
        serving_size: "1 (1079 g)" , 
        servings: "1" , 
        steps:['Heat griddle pan until very hot, season the steak and fry 1 1/2-2 1/2 minutes on each side (will give you rare steak, fry for longer if you like your steak more well done). Remove from pan and leave to rest 5 minutes, then slice thinly.', 'For dressing, whisk together creme fraiche, horseradish sauce and lemon juice in a large bowl.  Add parsnip and dates and toss.  Season to taste.', 'Divide salad leaves between two plates and lay parsnip-date mixture on top.  Garnish with mint leaves.']   
        },
        {
        name: "Sushi Rice" , 
        description: "Ive tried a lot of shrimp dip recipes, and I finally decided to be creative and make my own! This has a bit of heat, since Ive found that cream cheese- based dips are often bland." , 
        ingredients:['butter', 'onion', 'hard-boiled eggs', 'green chilies', 'monterey jack cheese', 'parmesan cheese', 'salt', 'corn tortillas', 'creamed corn', 'tomatoes', 'prepared mustard', 'sugar', 'onion powder', 'garlic powder', 'monterey jack cheese', 'sour cream', 'chives']  , 
        quantity:["","1   teaspoon    butter","1/4  cup   chopped onion","8       hard-boiled eggs, chopped ","1 (4   ounce) can  chopped green chilies, drained ","1/2  cup    monterey jack cheese, grated ","2   tablespoons    parmesan cheese, grated ","1/4  teaspoon    salt","12 (6   inch)    corn tortillas","","1 (14   ounce) can   creamed corn","2   small    tomatoes, seeded and diced ","1   teaspoon    prepared mustard","1/2  teaspoon    sugar","1/2  teaspoon    onion powder","1/2  teaspoon    garlic powder","1/2  cup    monterey jack cheese, grated ","  sour cream (garnish)"," chopped chives (garnish)"]  , 
        serving_size: "1 (171 g)" , 
        servings: "3" , 
        steps:['Filling:  Heat butter in saucepan.  Add onion.  Saute until soft.  Remove from heat.', 'Stir in next 5 ingredients.', 'Spoon 1/4 cup egg mixture down centre of each tortilla.  Roll snugly.  Place seam side down in baking dish large enough to hold single layer.  Cover with damp cloth while rolling remainder to prevent cracking.', 'Sauce:  Stir first 6 sauce ingredients together in bowl.  Pour over enchiladas.', 'Sprinkle with cheese.  Bake, uncovered, in 350 F oven for about 25 minutes until bubbly hot.', 'Spoon sour cream across enchiladas.  Top with chives.']   
        },
        {
        name: "Creole Macaroni" , 
        description: "We like this on buttery crackers, and celery sticks. Cooking time is chilling time." , 
        ingredients:['sugar', 'butter', 'eggs', 'mashed banana', 'vanilla', 'lemon juice', 'rolled oats', 'flour', 'baking soda', 'baking powder', 'salt', 'nuts']  , 
        quantity:["1   cup    sugar","2/3  cup    butter or 2/3  cup    shortening","2       eggs","3/4  cup    mashed banana","1/2  teaspoon    vanilla","1/2  teaspoon    lemon juice","1 1/2  cups    rolled oats (Not instant)","2   cups    flour","3/4  teaspoon    baking soda","1   teaspoon    baking powder","1   teaspoon    salt","1/2  cup    nuts, chopped "]  , 
        serving_size: "1 (432 g)" , 
        servings: "6" , 
        steps:['Sift flour, soda, baking powder and salt together.', 'Cream together sugar and shortening. Beat in well beaten eggs. Stir in the vanilla, lemon juice, and banana.', 'Add rolled oats and flour alternately to the banana mixture, mixing well after each addition. Stir in nuts.', 'Drop by teaspoonfuls onto greased baking sheet and bake in preheated 350Â° oven 15 to 18 minutes, or until golden.']   
        },
        {
        name: "Chinese Salad" , 
        description: "Im not sure where mom got this one from, but it looks really good!" , 
        ingredients:['medium grain rice', 'seasoning']  , 
        quantity:["3   cups    medium grain rice (1 C. \u003d 180 ml.) or 3   cups    short-grain rice (1 C. \u003d 180 ml.)","3   ounces   mitzukan sushi rice seasoning"]  , 
        serving_size: "1 (122 g)" , 
        servings: "8" , 
        steps:['Rinse rice with water about 5 times. Place rice in rice cooker and add the appropriate amount of water, reducing water by approximately 2 oz.', 'Cook the rice.  After it is cooked, rest rice for 10-20 minutes.', 'Spread cooked rice in a large shallow pan or bowl.  Pour sushi seasoning over the rice.', 'Mix well while the rice is very hot.', 'Spread rice mixture back out in the pan or bowl and allow it to sit for 10 minutes for cooling.', 'Rice is now ready to use in sushi.']   
        },
        {
        name: "Aromatic Basmati Rice (Rice Cooker)" , 
        description: "Change it up at your next BBQ!  Sauce with a clean fresh zing!  Saw this on food network and found the recipe on about.com   There are two others on zaar but this one is just a little different.  The longer you can wait to use it the better but can be used right away." , 
        ingredients:['ground beef', 'diced tomatoes', 'tomato paste', 'chili powder', 'paprika', 'garlic powder', 'salt and pepper', 'macaroni noodles']  , 
        quantity:["3   lbs    ground beef","3 (14   ounce) cans   diced tomatoes","9   ounces    tomato paste","1/4  cup   light chili powder","2   tablespoons    paprika","1   tablespoon    garlic powder","  salt and pepper","21   ounces    macaroni noodles"]  , 
        serving_size: "1 (181 g)" , 
        servings: "3" , 
        steps:['cook the meet til browned season it with salt and pepper,.', 'add tomato paste and water til its a thick meat sauce.', 'add diced tomatoes and seasonings and salt to taste.', 'Boil the past til done.', 'drain and add to the meat sauce.', 'mix and transfer to a baking dish top with shredded cheese and put in the over til cheese is melted through --  enjoy!']   
        },
        {
        name: "Pumpkin Chili" , 
        description: "This is one of my annual Christmas recipes...it keeps very well if wrapped properly and absolutely delicious to set out with your other holiday goodies." , 
        ingredients:['ramen noodles', 'broccoli', 'green onion', 'sunflower seeds', 'sliced almonds', 'oil', 'sugar', 'cider vinegar']  , 
        quantity:["2 (3   ounce) packages   ramen noodles, noddles broken up  (beef or chicken)","8   ounces    broccoli, slaw ","1/4  cup    green onion, chopped ","1/2  cup    sunflower seeds","1   cup    sliced almonds","1   cup    oil","1/2  cup    sugar","1/3  cup    cider vinegar"]  , 
        serving_size: "1 (336 g)" , 
        servings: "6" , 
        steps:['Mix ramen noodles (set flavor packets aside), broccoli slaw, and chopped green onions.', 'Toast the sunflower seeds and sliced almonds for 10 minutes @ 350.', 'Mix dressing ingredients; oil, sugar, vinegar, and flavor packets.', 'Also good with chopped chicken added.']   
        },
        {
        name: "Golden Gate Grilled Cheese" , 
        description: "Have not made these either..but really want to" , 
        ingredients:['basmati rice', 'water', 'salt', 'cinnamon stick', 'green cardamom pods']  , 
        quantity:["1   cup    basmati rice","1 1/2  cups    water","1/4  teaspoon    salt","1       cinnamon stick (4 inches)","3       green cardamom pods"]  , 
        serving_size: "1 (285 g)" , 
        servings: "2" , 
        steps:['Rinse the rice in a fine strainer, then drain thoroughly.', 'Place all ingredients in the rice cooker bowl, and swirl to combine.', 'Set the machine for the regular white rice cycle.', "When the machine shifts to 'keep warm', set a timer for 15 minutes.", 'After 15 minutes, fluff rice with the plastic paddle or a wooden spoon.', "Serve now, or leave on 'keep warm' for up to 4 hours."]   
        },
        {
        name: "AWESOME Coconut Cake With Glaze" , 
        description: "This is a fun & easy way to get an exotic spicy Indian style Saute using your own choice of ingredients." , 
        ingredients:['ground beef', 'pumpkin puree', 'kidney beans', 'corn', 'diced tomatoes with jalapenos', 'chili seasoning mix', 'allspice']  , 
        quantity:["1   lb    ground beef, browned and drained ","1 (15   ounce) can   pumpkin puree","1 (15   ounce) can   kidney beans, drained and rinsed ","1 (15   ounce) can   corn, drained ","1 (10   ounce) can   diced tomatoes with jalapenos (such as Ro*Tel)","1 (1 1/2  ounce) packet   chili seasoning mix","1   pinch    allspice"]  , 
        serving_size: "1 (101 g)" , 
        servings: "24" , 
        steps:['Combine all ingredients in slow cooker. Cook on high 4-5 hours or low 8-10 hours. Serve with cornbread.']   
        },
        {
        name: "Angel Food Pie" , 
        description: "A great tasting, easy recipe from Rachael Ray." , 
        ingredients:['butter', 'garlic', 'red chile', 'egg', 'milk', 'parmesan cheese', 'sourdough loaf', 'turkey', 'avocado', 'cilantro', 'muenster cheese']  , 
        quantity:["2   tablespoons   softened butter","1   teaspoon   minced garlic","1/2  teaspoon    red chile, flakes ","1   large    egg, lightly beaten ","1/4  cup    milk","1   cup   coarsely grated parmesan cheese","4      freshly cut slices from a sourdough loaf","6   ounces   thinly sliced turkey","1/2      avocado, thinly sliced ","1   tablespoon   chopped cilantro","2   slices    muenster cheese"]  , 
        serving_size: "1 (142 g)" , 
        servings: "6" , 
        steps:['In a small bowl, combine butter, garlic, and chile flakes. In a medium bowl, whisk egg and milk. Spread parmesan on a plate.', 'In a large frying pan, melt half the seasoned butter over medium heat. Dip 1 bread slice in egg mixture, coating one side only. Dip coated side into parmesan. Place to one side in frying pan, cheese side down. Repeat with 1 of remaining bread slices. Arrange turkey, avocado, cilantro, and muenster on slices, dividing evenly.', 'Dip remaining bread into egg and then into parmesan. Arrange on sandwiches, cheese side up, and cook over medium heat until undersides are golden brown, 3 to 4 minutes. Lift sandwiches and add remaining butter to pan; flip and cook until second side is golden brown, 3 to 4 minutes more.']   
        },
        {
        name: "Moms Bacon-Wrapped Meatloaf #RSC" , 
        description: "Great side dish with ham or chicken." , 
        ingredients:['sugar', 'oil', 'eggs', 'coconut extract', 'flour', 'buttermilk', 'baking powder', 'baking soda', 'shredded coconut', 'slivered almonds', 'sugar', 'powdered sugar', 'water', 'butter', 'coconut extract', 'butter', 'confectioners%27 sugar', 'vanilla', 'hot water', 'shredded coconut']  , 
        quantity:["","2   cups    sugar","1   cup    oil","4       eggs","2   tablespoons    coconut extract","3   cups    flour","1   cup    buttermilk","2   teaspoons    baking powder","2   teaspoons    baking soda","1   cup    shredded coconut","1   cup    slivered almonds","","1   cup    sugar","1/2  cup    powdered sugar","1/2  cup    water","1/2  cup    butter","1   tablespoon    coconut extract","","3   tablespoons    butter, melted ","1   cup    confectioners\u0027 sugar","3/4  teaspoon    vanilla","2   tablespoons    hot water","","1/2  cup    shredded coconut"]  , 
        serving_size: "1 (178 g)" , 
        servings: "8" , 
        steps:['Preheat oven to 350Â°.', 'Toast Coconut:', 'Start by spreading coconut on a microwave-safe plate. Microwave the coconut in 30-second bursts, gently stirring to redistribute each time. When the coconut is as brown as you like â€“ stop. Itâ€™s done. It took me 7 1/2 minutes to get to this point, but depends on the wattage of your microwave.', 'Cake:', 'Beat together sugar, oil, eggs, and coconut extract until well mixed.', 'In a separate bowl, mix together buttermilk, baking powder, and baking soda.', 'Beat together the buttermilk mixture into the sugar, oil, and egg mixture until well blended.', 'Gradually beat the flour mixture into the wet mixture until well mixed.', 'Fold in the coconut and almonds.', 'Pour into a greased baking pan and bake for about 30-45 minutes or when a toothpick is inserted into the center comes out clean. (I used a greased bundt pan).', 'Combine drizzle ingredients in a medium saucepan over medium-high heat until all the ingredients are incorporated.', 'Once the bread comes out of the oven, poke holes all over the bread and immediately pour drizzle over the bread and let soak inches.', 'Once the cake has cooled, pour on the glaze and sprinkle with toasted coconut.']   
        },
        {
        name: "Pasta Primavera" , 
        description: "I have tried other sponge cake recipes and they always flop for me.  My mother use to make this when we were kids.  She doubled the ingredients and made it in one of those large oven trays that often come with the oven.  It never lasted long enough to come out of the tray!  As a variation, you could add lemon or orange rind to the mix, or even granadilla seeds." , 
        ingredients:['sugar', 'cornstarch', 'salt', 'water', 'egg whites', 'vanilla', 'whipped cream']  , 
        quantity:["1 1/4  cups    sugar","3   tablespoons    cornstarch","1/4  teaspoon    salt","2   cups    water","3       egg whites","1   teaspoon    vanilla","  whipped cream"]  , 
        serving_size: "1 (254 g)" , 
        servings: "4" , 
        steps:['Cook flour, sugar, salt, and boiling water thoroughly. Pour over beaten whites. Chill and serve with whipped cream.']   
        },
        {
        name: "SWEET YOGURT WITH SAFFRON AND PISTACHIOS (SHRIKHAND)" , 
        description: "I havent made this yet ... it has been on my recipes to try list for over a year.  Im posting it for ZWT3 -- maybe Ill finally make it!" , 
        ingredients:['zucchini', 'onion', 'red bell pepper', 'cherry tomatoes', 'quick-cooking oats', 'panko breadcrumbs', 'lemon juice', 'lemon zest', 'egg', 'bacon', 'monterey jack cheese', 'monterey jack cheese', 'salsa', 'salsa', 'ground beef', 'reynolds wrap foil']  , 
        quantity:["1       zucchini, shredded ","1       onion, chopped ","1       red bell pepper, chopped ","1/2  cup    cherry tomatoes, cubed ","1/4  cup    quick-cooking oats","1/4  cup    panko breadcrumbs or 1/4  cup    breadcrumbs","1/8  cup    lemon juice","1   teaspoon    lemon zest","1       egg","8 -10   slices    bacon","1   cup   shredded monterey jack cheese, plus "," extra shredded monterey jack cheese, for topping ","1/2  cup    salsa, plus "," extra salsa, for topping ","1 1/2  lbs    ground beef (optional- half can be ground turkey)","  Reynolds Wrap Foil"]  , 
        serving_size: "1 (265 g)" , 
        servings: "6" , 
        steps:['Preheat oven to 350 degrees F if you are going to cook it after preparation.', 'Method:', '1. Line a 9 x 5 x 3 loaf pan generously (leave extra along the sides if you plan to freeze) with Reynolds Aluminum Foil.', '2. Place 4-5 bacon strips across the short side, long edges touching, to enfold the meatloaf.', '3. Combine first nine ingredients.  Fold in with the beef.', '4. Gently press meat mixture into the bacon-lined loaf pan.', '5. Fold the bacon over the top of the meatloaf.', '6. Lay remaining 4-5 bacon slices across the loaf.', '7. Bake uncovered for 50 minutes.', '8. Top with extra salsa and shredded Monterey Jack Cheese.', '9. Bake for another 15 minutes.', '*Freeze if not ready to cook.', 'Lift the foil wrapped meatloaf out of the loaf pan and you have freed your pan for other uses.']   
        },
        {
        name: "Noodle Pudding" , 
        description: "A neighbor gave me this recipe one evening when I was short on time to cook. It tastes like it took a long time but it was so easy." , 
        ingredients:['asparagus', 'broccoli', 'snow pea pods', 'yellow squash', 'zucchini', 'vegetables', 'mushrooms', 'garlic clove', 'water', 'linguine', 'dry white wine', 'chicken bouillon', 'skim milk', 'flour', 'parmesan cheese', 'parmesan cheese', 'fresh parsley', 'fresh basil', 'salt', 'pepper']  , 
        quantity:["4   ounces    asparagus, cut into 1 inch pieces ","1/2  cup    broccoli","1/2  cup   fresh snow pea pods, cut 1 inch ","1/2  cup    yellow squash, sliced ","1/2  cup    zucchini, sliced ","  vegetables, spray ","8   ounces    mushrooms, sliced ","1       garlic clove, chopped ","1   tablespoon    water","8   ounces    linguine, uncooked ","2   tablespoons    dry white wine","1/4  teaspoon    chicken bouillon","3/4  cup    skim milk","1   tablespoon    flour","1/4  cup    parmesan cheese","1   tablespoon    parmesan cheese","1   tablespoon   chopped fresh parsley","1 1/2  teaspoons   chopped fresh basil","1/8  teaspoon    salt","1/2  teaspoon    pepper"]  , 
        serving_size: "1 (1244 g)" , 
        servings: "1" , 
        steps:['arrange Aspargus, broccoli, snow peas, yellow squash and zucchini in a steamer over boiling water and steam 15 to 20 minutes or until vegetables are crisp-tender, set aside.', 'Coat a large nonstick skillet with cooking spray, place over medium-high heat until hot. Add mushrooms and garlic; saute 5 minutes or until mushrooms are tender. Add reserver vegetables, chives and 1 tablespoon water; reduce heat and simmer, uncovered, 5 minutes. Set vegetables aside.', 'Cook noodles, drain and set aside.', 'Combine 1/4 cup hot water, wine and boullon in a small saucepan. Bring mixture to a boil; cook until mixture is reduced to 2 tablespoons.', 'Combine milk and flour in a small bowl; stir well. gradually add flour mixture to wine mixture, stiring constantly, 5 minutes of until thickened and bubbly. Pour sauce over noodles and toss. add 1/4 cup parmesan cheese, parslet, basil, salt and pepper, toss.', 'Serve on a large platter and top with reserved vegetable mixture, sprinlke with remaining 1 tablespoon parmesan cheese.']   
        },
        {
        name: "Spinach and Feta Scones" , 
        description: "You can use other white fish fillets for this dish, but I prefer Red Snapper. My own personal choice. I use 6 fillets that weigh about 8-10 ounces each for this recipe." , 
        ingredients:['yogurt', 'saffron thread', 'milk', 'sugar', 'green cardamom seeds', 'pistachios']  , 
        quantity:["6   cups    yogurt","1   teaspoon    saffron thread","1   tablespoon   warm milk","1/2  cup    sugar (superfine)","1/2  teaspoon    green cardamom seeds, crushed ","10       pistachios, chopped "]  , 
        serving_size: "1 (95 g)" , 
        servings: "12" , 
        steps:['Cut 3 layers of cheesecloth into a 12" x 24" square. Put yogurt in middle of cheesecloth, bring up ends, and tie with kitchen twine. Tie cheesecloth-bound yogurt to the handle of a wooden spoon; set wooden spoon over a bowl. Chill yogurt and let drain overnight to a thicker consistency.', 'Combine saffron and milk and let steep for 30 minutes.', 'Put drained yogurt into a bowl; stir in saffron mixture and sugar.', 'Divide shrikhand between 6 small bowls and garnish with cardamom and pistachios.']   
        },
        {
        name: "Toms Vanilla Frozen Yogurt" , 
        description: "If you take nothing else from this recipe, note this: you can eat parsnips raw, grated, in salads.  That knowledge has revolutionised salad eating for me.  This is the recipe that taught me.  From Good Food magazine.  You could substitute plain yogurt for the creme fraiche." , 
        ingredients:['noodles', 'sugar', 'salt', 'eggs', 'large curd cottage cheese', 'cream cheese', 'butter', 'sour cream', 'raisins', 'cinnamon-sugar mixture']  , 
        quantity:["1/2  lb    noodles, cooked ","1   cup    sugar","1/2  teaspoon    salt","3       eggs, beaten ","1/2  lb    large curd cottage cheese, room temperature ","1/4  lb    cream cheese, softened ","1/4  cup    butter, softened ","1/2  pint    sour cream, room temperature ","1/4  cup    raisins","  cinnamon-sugar mixture"]  , 
        serving_size: "1 (194 g)" , 
        servings: "10" , 
        steps:['Preheat oven to 350 degrees F.', 'Generously grease an 8-inch square pan.', 'In a large bowl, combine all the above ingredients together; mix well.', 'Spread in the prepared pan.', 'Bake for 30 to 45 minutes.']   
        },
        {
        name: "Biryani" , 
        description: "A filling brunch dish, using hard-boiled eggs." , 
        ingredients:['vegetable oil', 'green onions', 'eggs', 'milk', 'all-purpose flour', 'sugar', 'baking powder', 'oregano', 'salt', 'garlic powder', 'frozen chopped spinach', 'feta cheese']  , 
        quantity:["1/3  cup    vegetable oil","5       green onions, chopped ","2       eggs","1/2  cup    milk","2   cups    all-purpose flour","2   teaspoons    sugar","1   tablespoon    baking powder","1   teaspoon   dry crumbled oregano","1/2  teaspoon    salt","1/2  teaspoon    garlic powder","1 (10   ounce) package   frozen chopped spinach, thawed and well drained ","7   ounces    feta cheese, cubed "]  , 
        serving_size: "1 (799 g)" , 
        servings: "6" , 
        steps:['Preheat oven to 375Â°F.', 'In 2 Tablespoons of the oil, sautÃ© onions until they begin to brown.', 'Let cool.', 'Beat eggs until foamy; blend in remaining oil, milk and sautÃ©ed onions.', 'Add flour, sugar, baking powder, oregano, salt and garlic powder.', 'Beat until smooth.', 'Stir in spinach and feta cheese.', 'Spoon into 12 greased muffin tins.', 'Bake 20 to 25 minutes.']   
        },
        {
        name: "Roasted Sweet Potato Side or Main" , 
        description: "A twist on an old favorite" , 
        ingredients:['sugar', 'unflavored gelatin', 'salt', 'skim milk', 'plain low-fat yogurt', 'vanilla extract']  , 
        quantity:["1   cup    sugar","2 (1/4  ounce) envelopes   unflavored gelatin","1   dash    salt","2   cups    skim milk","5   cups    plain low-fat yogurt","1   tablespoon    vanilla extract"]  , 
        serving_size: "1 (154 g)" , 
        servings: "6" , 
        steps:['Combine sugar, gelatin and salt in a medium saucepan; add milk and let stand one minute.', 'Cook over low heat, stirring constantly, five minutes or until gelatin and sugar dissolve; let cool.', 'Stir in yogurt and vanilla; chill.', 'Pour mixture into freezer can of a gallon freezer.', 'Serve immediately or let ripen 1 hour.', 'Yields 10- 1/2 cups.']   
        },
        {
        name: "Creamy Buffalo Dip" , 
        description: "Easy to make sushi rice." , 
        ingredients:['saffron', 'milk', 'hot green chili peppers', 'onions', 'garlic', 'clove', 'peppercorns', 'cardamom seed', 'coriander seed', 'cumin seed', 'poppy seed', 'mace', 'cilantro', 'fresh lemon juice', 'plain yogurt', 'boneless chicken', 'salt', 'vegetable oil', 'ghee', 'onion', 'tomatoes', 'basmati rice', 'raisins', 'cashews', 'almonds', 'eggs']  , 
        quantity:["1   tablespoon    saffron","4   teaspoons    milk, warm ","2       hot green chili peppers, as serranos -- seeded \u0026 stemmed ","2   large    onions, chopped ","8   cloves    garlic, peeled ","1/4  teaspoon    clove, ground ","8   whole    peppercorns","1/2  teaspoon    cardamom seed","1   teaspoon    coriander seed","1   teaspoon    cumin seed","1/4  teaspoon    poppy seed","1/4  teaspoon    mace, ground ","1/2  cup    cilantro or 1/2  cup    mint leaf","1/4  cup    fresh lemon juice","2   cups    plain yogurt","3   lbs    boneless chicken, cut into 1 inch pieces ","  salt","2   tablespoons    vegetable oil","1   tablespoon    ghee","1       onion, finely chopped ","8   large    tomatoes, chopped ","2   cups    basmati rice or 2   cups    long-grain rice, uncooked ","1/3  cup    raisins","1/3  cup    cashews","1/3  cup    almonds","6       eggs, hard-boiled, halved "]  , 
        serving_size: "1 (650 g)" , 
        servings: "1" , 
        steps:['Soak saffron in warm milk for 5 minutes and puree in blender.', 'Add chiles, onions, ginger, garlic, cloves, peppercorns, cardamom seeds, cinnamon, coriander and cumin seeds, poppy seeds, nutmeg, mace, cilantro or mint leaves and lemon juice. Blend into smooth paste. Put paste into large bowl, add yogurt and mix well.', 'Marinate chicken in yogurt mixture with salt, covered for at least 2 - 6 hours in refrigerator.', 'In skillet. heat oil over medium heat for 1 minute. Add ghee and 15 seconds later add onion and fry for about8 minutes.', 'Reserve for garnish.', 'In same skillet, cook chicken with its marinade with tomatoes for about 10 minutes over medium heat, uncovered.', 'Remove chicken pieces from the sauce and set aside. Add rice to sauce, bring to boil, and cook, covered over low heat for 15 minutes.', 'Return chicken and add raisins, cashews and almonds; mix well.', 'Simmer, covered for 5 minutes.', 'Place chicken, eggs and rice in large serving dish in such a way that yellow of the eggs, the saffron-colored rice, the nuts and the chicken make a colorful display.', 'Add reserved onion as garnish.']   
        },
        {
        name: "Frozen Coffee Cooler" , 
        description: "this is an excellent dish easy to make and fast! way better than hamburger helper cause its homemade" , 
        ingredients:['sweet potatoes', 'red bell pepper', 'red onion', 'olive oil', 'dried basil', 'sea salt', 'garlic powder', 'cheese']  , 
        quantity:["4   large    sweet potatoes (about 3 lb.)","1       red bell pepper (about 8 oz.)","1   medium    red onion","2   tablespoons    olive oil","2   tablespoons    dried basil","1   tablespoon    sea salt","1 1/2  tablespoons    garlic powder","1   cup   shredded cheese, of choice "]  , 
        serving_size: "1 (380 g)" , 
        servings: "8" , 
        steps:['Peel and chop the sweet potatoes, unless organic.', 'If organic, simply wash well and cut.', 'Cut the pepper and the red onion into a medium dice.', 'In a 11x14-inch roasting pan, put the potatoes, and drizzle with the olive oil.', 'Sprinkle with the basil and sea salt and garlic powder.', 'Toss them in the pan.', 'Bake in the oven at 350F until beginning to soften.', 'Add the bell pepper and onion; stir again.', 'Cook until onion caramelizes and potatoes are tender.', 'Add cheese if desired and turn oven up to 400Â°F.', 'Cook until cheese browns.', 'Serve as a side or main dish.']   
        },
        {
        name: "Broccoli and Egg Lasagna" , 
        description: "a salad that is a bit different but tasty.  Had it at a pot luck.  add the dressing at the last minute." , 
        ingredients:['onion', 'garlic', 'butter', 'dried ancho chile powder', 'paprika', 'dried chipotle powder', 'lime juice', 'salt', 'hot sauce', 'sour cream']  , 
        quantity:["1   large    onion, minced ","10   cloves    garlic, minced ","1/2  cup    butter","1   teaspoon    dried ancho chile powder","1   teaspoon    paprika","1/2  teaspoon    dried chipotle powder, to taste ","1   teaspoon    lime juice","1/4  teaspoon    salt","1/2  cup    hot sauce, to taste  (Frank\u0027s, Tapatio, etc)","1   cup    sour cream"]  , 
        serving_size: "1 (225 g)" , 
        servings: "8" , 
        steps:['Finely mince the onion (a food processor works great) and the garlic cloves.', "Melt the butter in a saucepan or skillet and sautÃ© the onions and garlic until they're soft, just beginning to brown, and the butter begins to separate from the veggies.", 'Add all remaining ingredients except the sour cream and stir well.', 'Place cooked mixture in a bowl and add sour cream.', 'Stir well and place in serving bowl.', 'Makes about 3 cups dip.']   
        },
        {
        name: "Healthy Breakfast Energy Bars" , 
        description: "From The Ultimate Rice Cooker Cookbook.  The authors specify a 6 cup rice cooker for this, but Ive had no problem with my 3 cup model.  This would be wonderful as a side to tandoori chicken.  Do not eat the whole spices. Cook time includes letting the rice rest on the keep warm setting." , 
        ingredients:['ice cubes', 'brewed coffee', 'coffee liqueur', 'sugar', 'ground cinnamon', 'half-and-half', 'whipped cream', 'cinnamon']  , 
        quantity:["6   cups    ice cubes","4   cups    brewed coffee, cooled ","1   cup    coffee liqueur (Kahlua)","3/4  cup    sugar","1   teaspoon    ground cinnamon","1   cup    half-and-half or 1   cup    milk","  whipped cream (for Garnish)","  cinnamon (for Garnish)"]  , 
        serving_size: "1 (640 g)" , 
        servings: "1" , 
        steps:['Process half of first 5 ingredients in a blender until smooth.', 'Pour coffee mixture into a large pitcher.', 'Repeat with next half and pour into pitcher.', 'Stir half and half into coffee minxture.', 'Pour into tall glasses and garnish as desired.', 'Serve immediately.']   
        },
        {
        name: "Crock Pot Jambalaya" , 
        description: "Add some fall flavor and some additional nutrition to your chili." , 
        ingredients:['butter', 'flour', 'salt and pepper', 'half-and-half', 'green onion', 'hot pepper sauce', 'lasagna noodles', 'cooked ham', 'frozen chopped broccoli', 'parmesan cheese', 'cheddar cheese', 'hard-boiled eggs']  , 
        quantity:["1/2  cup    butter","1/3  cup    flour","  salt and pepper","3   cups    half-and-half","1/4  cup   chopped green onion","1/4  teaspoon    hot pepper sauce","9       lasagna noodles, cooked and drained ","2 -2 1/2  cups    cooked ham, diced ","1 (10   ounce) package   frozen chopped broccoli, thawed  or 1 (10   ounce) package   fresh broccoli, cooked,drained and chopped ","1/2  cup   grated parmesan cheese","3 -4   cups   grated cheddar cheese","4       hard-boiled eggs, finely chopped "]  , 
        serving_size: "1 (675 g)" , 
        servings: "6" , 
        steps:['set oven to 350 degrees.', 'butter a 13x9 baking dish.', 'in a med saucepan, melt butter; stir in flour, salt and pepper until smooth gradually add half and half; bring to a light boil.', 'cook and stir for 2 minutes or until thickened.', 'remove from the heat; stir in onions and hot pepper sauce.', 'spread a fourth of the white sauce in prepared pan.', 'top with three noodles, half of the ham and broccoli, 3 tbsp Parmesan cheese, 1 cup cheddar cheese, half of the eggs, and a fourth of the white sauce repeat layers.', 'top with the remaining noodles, white sauce and cheeses.', 'bake, uncovered for 40-45 minutes or until bubbly.']   
        },
        {
        name: "Low Fat Wholesome Banana Bread" , 
        description: "From Sunset Magazine" , 
        ingredients:['rolled oats', 'whole wheat flour', 'shredded coconut', 'nuts', 'chocolate chips', 'honey', 'low-fat margarine', 'egg']  , 
        quantity:["2   cups    rolled oats (you can use flavoured oats)","1/2  cup    whole wheat flour","1/2  cup    shredded coconut","1/2  cup   chopped nuts (of your choice)","1/2  cup    chocolate chips or 1/2  cup    dried fruit","1/2  cup    honey","80   g    low-fat margarine","1       egg, lightly beaten "]  , 
        serving_size: "1 (77 g)" , 
        servings: "12" , 
        steps:['Mix oats, flour, coconut, nuts, chocolate chips or fruit together in a bowl.', 'Heat honey and low fat margarine in a saucepan or in the microwave until spread is melted and mixture combines when stirred.', 'Allow to cool slightly and whisk in egg.', 'Pour liquid into dry ingredients and mix well.', 'Line tray with baking paper and spread mixture out to about 2cm.', 'Bake in 180 Degrees C oven for 25 minutes.', 'Cut into 8-10 pieces whilst still warm, then transfer to airtight container to store.']   
        },
        {
        name: "Bean Stew With Cornmeal-Cheddar Dumplings" , 
        description: "This cake is absolutely delicious.  It is super moist.  Instead of icing, it is drizzled with a coconut glaze.  This cake never lasts more than a day." , 
        ingredients:['skinless chicken breasts', 'smoked sausage', 'prawns', 'green pepper', 'red pepper', 'yellow pepper', 'celery ribs', 'onion', 'baby corn', 'red chilies', 'garlic cloves', 'chopped tomatoes', 'tomato paste', 'beef stock', 'rice', 'black pepper', 'white pepper', 'cayenne pepper', 'paprika', 'ground cumin', 'dried basil', 'dried oregano', 'frying oil']  , 
        quantity:["5       skinless chicken breasts (cubed)","1 1/2  lbs    smoked sausage (Sliced)","1   lb    prawns (Cooked)","1       green pepper (chopped)","1       red pepper (chopped)","1       yellow pepper (chopped)","4       celery ribs (diced)","1   large    onion (chopped)","15       baby corn (chopped)","2       red chilies (seeded \u0026 finely chopped)","4       garlic cloves (finely chopped)","2 (800   ml) cans   chopped tomatoes","2   tablespoons    tomato paste","450   ml    beef stock","2 1/2  cups    rice (Cooked)","1   teaspoon    black pepper","1   teaspoon    white pepper","1   teaspoon    cayenne pepper","1   teaspoon    paprika","1   teaspoon    ground cumin","1/2  tablespoon    dried basil","1   tablespoon    dried oregano","3   tablespoons    frying oil (Groundnut)"]  , 
        serving_size: "1 (360 g)" , 
        servings: "6" , 
        steps:['Heat 1/2 the oil in a wok until just about smoking &amp; fry chicken until light golden (approx 5 mins), add to crock pot.', "Combine Chopped Green, Red, Yellow Peppers, Chopped Onion, Chopped Garlic, Sliced Celery &amp; chopped Red Chilli's, heat the remaining oil &amp; fry until Semi soft, add to crock pot.", 'Add all the remaining ingredients, herbs &amp; spices to the Crock pot except for the Rice &amp; Prawns give it a good stir.', 'Cook on Medium for 6 Hours.', '20 Mins from end add the hot cooked rice (Electric Rice cookers are a wonderful thing)&amp; the Prawns.']   
        },
        {
        name: "Beer-Braised Pot Roast and Vegetables With Polenta" , 
        description: "No specified time, so I just put 1 hour preparation time." , 
        ingredients:['bananas', 'whole wheat flour', 'egg whites', 'palm sugar', 'baking soda', 'salt', 'olive oil']  , 
        quantity:["2 1/2      bananas","2   cups    whole wheat flour","4       egg whites","1   cup    palm sugar","1   teaspoon    baking soda","1/4  teaspoon    salt","4   tablespoons    olive oil"]  , 
        serving_size: "1 (543 g)" , 
        servings: "8" , 
        steps:['mash bananas', 'beat egg whites until stiff peaks form.', 'mix wet ingredients and add the dry ones.', 'pour into greased loaf/cake pan at 350 degrees for about 30 minutes or until fork comes out clean.', 'cool and slice.']   
        },
        {
        name: "Waffle Topping" , 
        description: "Ready, Set, Cook!  Reynolds Wrap Contest Entry.  Its a complete meal- it contains protein, grains, and vegetables! It can be made ahead during spare time and its simple to make and tastes great!" , 
        ingredients:['onions', 'garlic', 'oil', 'jalapeno pepper', 'red bell pepper', 'yellow bell pepper', 'chili powder', 'cumin', 'oregano', 'whole tomatoes', 'zucchini', 'pinto beans', 'black beans', 'salt and pepper', 'flour', 'cornmeal', 'baking powder', 'salt', 'crisco shortening', 'cheddar cheese', 'half-and-half cream', 'cayenne pepper']  , 
        quantity:["2   large    onions, chopped ","2 -3   tablespoons   fresh minced garlic","3 -5   tablespoons    oil","1 -2       jalapeno pepper (seeded and finely chopped or use 1 poblano chile pepper)","1   large    red bell pepper, seeded and chopped ","1   large    yellow bell pepper, seeded and chopped ","3 -4   tablespoons    chili powder","1   teaspoon    cumin","2   teaspoons    oregano","1 (28   ounce) can   whole tomatoes (chopped and undrained)","2   small    zucchini (chopped into about 1-inch pieces)","1 (15   ounce) can   pinto beans, undrained ","1 (15   ounce) can   black beans, undrained ","  salt and pepper","","1/2  cup    flour","1/2  cup    cornmeal","1   teaspoon    baking powder","1/2  teaspoon    salt","2   tablespoons    Crisco shortening","1/3  cup   grated cheddar cheese","1/2  cup    half-and-half cream (or milk)","1/4  teaspoon    cayenne pepper (optional or to taste)"]  , 
        serving_size: "1 (202 g)" , 
        servings: "1" , 
        steps:['In a Dutch oven, heat oil over medium-high heat; add in the onions, garlic, bell peppers, jalapeno pepper (or the chile pepper) chili powder, cumin and oregano, saute for about 3 minutes.', 'Add in the chopped tomatoes with juice, zucchini, pinto beans with juice and black beans with juice; bring to a boil, reduce heat and simmer for about 20-25 minutes (or until the zucchini is tender) season with salt and pepper to taste.', 'In a bowl combine the flour, cornmeal, baking powder, 1/2 teaspoon salt and cayenne pepper (if using).', 'Cut in the shortening until crumbly.', 'Stir in the shredded cheese.', 'Add in half and half cream; stir JUST until moistened.', 'Drop the dough by heaping tablespoonfuls into the simmering mixture; cook 5 minutes, then cover with lid and continue to cook for 8-12 minutes more, or until the dumplings are done.']   
        },
        {
        name: "Soba Noodles With Green Onion Broth" , 
        description: "This is very yummy and is great in the summer when watching your calorie intake" , 
        ingredients:['bacon', 'boneless beef chuck roast', 'salt', 'black pepper', 'yellow onion', 'button mushrooms', 'garlic', 'fresh thyme leave', 'bay leaf', 'beer', 'beef stock', 'tomatoes', 'carrots', 'parsnip', 'turnip', 'fresh parsley leaves', 'prepared polenta']  , 
        quantity:["5   slices    bacon, diced ","1 (4 -4 1/2  lb)    boneless beef chuck roast","1 1/2  teaspoons    salt","1   teaspoon    black pepper","1   lb    yellow onion, thinly sliced  (about 4 cups)","8   ounces    button mushrooms, stems trimmed, wiped clean, and quartered ","1   tablespoon    garlic, minced ","1   teaspoon    fresh thyme leave, chopped ","1       bay leaf","1 (12   ounce)    beer","1   cup    beef stock or 1   cup    low sodium beef broth","3   cups    tomatoes, peeled diced and seeded and their juices ","4   large    carrots, peeled and cut into 3-inch sticks ","1/4  lb    parsnip, peeled and cut into 3-inch sticks ","1/2  lb    turnip, peeled and cut into 1 1/2-inch wedges ","1/4  cup    fresh parsley leaves, chopped ","  prepared polenta (see \u003ca href\u003d\"https://www.geniuskitchen.com/recipe/polenta-190876\"\u003ePolenta\u003c/a\u003e)"]  , 
        serving_size: "1 (500 g)" , 
        servings: "4" , 
        steps:['Preheat the oven to 325 degrees F.', 'Heat a large Dutch oven or roasting pan over medium heat. Add the bacon and cook until the bacon is brown and the fat is rendered, 7 to 8 minutes. Remove the bacon with a slotted spoon and set aside to drain on a paper towel-lined plate. Set aside. Leave the pot on the heat.', 'Season the roast on all sides with the salt and pepper. Add the roast to the bacon fat remaining in the pan and sear on all sides until well browned, 8 to 10 minutes. Remove the roast from the pan and set aside. Add the onions to the pan and cook until wilted and fragrant, 2 1/2 to 3 minutes. Add the mushrooms and cook stirring occasionally until the mushrooms are soft and are beginning to color, about 4 minutes. Add the garlic, thyme, and bay leaf and cook, stirring, until fragrant, 45 seconds. Add the beer, beef stock, tomatoes and their juices, and the roast to the pan and bring to a simmer. Cover the pot tightly, place in the oven, and bake for 1 1/2 hours.', 'Carefully remove the roast from the oven and add the carrots, parsnips and turnips. Turn the meat, basting with the pan juices. Cover tightly and return to the oven. Bake until the meat shreds easily and the vegetables are tender, 1 1/2 to 2 hours, depending upon the size of the meat.', 'Remove and discard the bay leaf. Remove the roast from the pan and let sit on a cutting board until cool enough to handle. Using two forks or a knife and form, shred the meat.', 'Skim the fat from the pan juices and discard. Return the meat to the pan, add the parsley, and stir well.', 'To serve, spoon the polenta into wide entree bowls and spoon the pot roast, vegetables, and gravy on top.']   
        },
        {
        name: "Strawberry-Basil Jam" , 
        description: "The recipe for this cool and creamy dessert is based on one in Pushpesh Pants India Cookbook. Time doesnt include draining the yogurt overnight." , 
        ingredients:['butter', 'cornstarch', 'honey']  , 
        quantity:["1/2  cup    butter","2   tablespoons    cornstarch","2   cups    honey"]  , 
        serving_size: "1 (1247 g)" , 
        servings: "1" , 
        steps:['Melt butter in sauce pan.', 'Stir in cornstarch slowly.', 'Add honey.', 'Stir constantly over low heat for 8 minutes.', 'Serve over hot waffles, pancakes or biscuits.']   
        },
        {
        name: "Jens Fresh and Spicy Salsa" , 
        description: "Interesting recipe given to me by a neighbor when I was 10 yrs. old and just beginning to cook. Our neighbor was Jewish and Im not sure if this recipe was to celebrate any of their religious holidays?" , 
        ingredients:['eggs', 'soba noodles', 'chicken broth', 'green onion', 'dry sherry', 'sugar', 'soy sauce', 'gingerroot']  , 
        quantity:["5       eggs","6 -8   ounces    soba noodles","3 (14 1/2  ounce) cans   chicken broth","1   bunch    green onion, sliced ","2   tablespoons    dry sherry","1   teaspoon    sugar","1/3  cup    soy sauce","1   teaspoon   jarred chopped gingerroot"]  , 
        serving_size: "1 (62 g)" , 
        servings: "10" , 
        steps:['Cook soba noodles according to package directions, drain and rinse with cold water.', 'Bring chicken broth, dry sherry, sugar, soy sauce, ginger and about 3/4 of the green onions to a boil.  Simmer while the egg is cooking.', 'Beat eggs in small bowl with a dash of soy sauce. Cook egg pancake in a covered omlette pan sprayed with Pam.  Cut into slices.', 'Arrange some noodles and egg slices in an individual serving bowl and garnish with some of the remaining green onions. Cover with broth.  Sprinkle hot pepper flakes on if desired.']   
        },
        {
        name: "A Lighter Side of Ccs Oven-Grilled Reuben Sandwiches" , 
        description: "Spinach and feta scones with a bit of green onion for added flavor. I admit I have not tried these. Im posting it for an ISO request on the recipe board." , 
        ingredients:['strawberries', 'gelling sugar', 'fresh basil', 'lime juice', 'lime peel']  , 
        quantity:["1200   g    strawberries (weight after hulling)","400   g   super gelling sugar (Dr. Oetker\u0027s 1-3)","3 1/2  tablespoons    fresh basil, coarsely chopped ","2 1/2  tablespoons    lime juice","2 1/2  teaspoons    lime peel, finely grated "]  , 
        serving_size: "1 (268 g)" , 
        servings: "2" , 
        steps:['Clean and hull strawberries. Cut strawberries into pieces. Then weight to make 1.2 kg fruit for jam.', 'In a suited pot mix strawberries, super gelling sugar and lime juice.', 'Let stand for 2 hours, mixing from time to time.', 'Over medium high heat bring to a boil stirring all the time.', 'Let boil strawberry mixture for 4 minutes, stirring all the time.', 'Remove from heat and add lime peel. Mix.', 'Add coarsely chopped basil and mix.', 'Fill into twist off preserving jars and close jars. Let stand for 1 minute and then turn up side down. Let stand for 10 minutes and turn over again. Let cool completely.', 'NOTE on "Dr. Oetker\'s Super Gelling Sugar 3:1". Dr. Oetker is a well known brand in Germany. There are several gelling sugars available. The "3:1" super gelling sugar already contains pectin and you only need 1/3 of sugar. If you can\'t get it, you could also use Dr. Oetker\'s 2:1 super gelling sugar. Follow the instructions on the package.']   
        },
        {
        name: "Grilled Aubergine and Mushroom Stack" , 
        description: "A very good low-fat treat." , 
        ingredients:['roma tomatoes', 'green onions', 'fresh jalapeno peppers', 'fresh cilantro', 'fresh lime juice', 'hot pepper sauce', 'ground black pepper', 'garlic powder', 'salt']  , 
        quantity:["6       roma tomatoes, seeded and chopped ","10       green onions, chopped ","2       fresh jalapeno peppers, seeded and chopped ","1/4  cup   chopped fresh cilantro","2   tablespoons    fresh lime juice","2   tablespoons    hot pepper sauce","1   teaspoon    ground black pepper","1   teaspoon    garlic powder","1   teaspoon    salt"]  , 
        serving_size: "1 (253 g)" , 
        servings: "4" , 
        steps:['Combine tomatoes, green onions, jalapenos, and cilantro.', 'You can pulse this in a blender or food processor to get this to the consistency you like.', 'Add remaining ingredients and mix well.', 'Keep refrigerated until serving.']   
        },
        {
        name: "1789  Apple  Arugula Salad With Aged Gouda and Crisped Pancetta" , 
        description: "Delhi, India" , 
        ingredients:['cider vinegar', 'instant apple cider drink mix', 'cabbage', 'reduced-fat mayonnaise', 'dijon mustard', 'rye bread', 'nonstick cooking spray', 'reduced-fat swiss cheese', 'corned beef']  , 
        quantity:["3   tablespoons    cider vinegar","1   tablespoon    instant apple cider drink mix","1/2  cup   shredded cabbage","1   tablespoon    reduced-fat mayonnaise","1   tablespoon    Dijon mustard","2   slices    rye bread","  nonstick cooking spray","4   slices    reduced-fat swiss cheese (about 1/2 pound)","1/2  lb    corned beef, lean and thinly sliced and julienne  (or shaved)"]  , 
        serving_size: "1 (355 g)" , 
        servings: "6" , 
        steps:['Adjust oven rack to middle position, place baking sheet on rack, and heat oven to 450 degrees.', 'In a small saucepan over medium heat, stir together vinegar and apple cider mix till dissolved. Add coleslaw, cover, and cook for 8-10 minutes, stirring occasionally, until coleslaw is tender.', 'Remove lid and simmer until liquid has evaporated, 1-2 minutes.', 'Line a baking sheet lined with parchment paper. Spray one side of each bread slice with non-stick cooking spray and turn over onto the parchment (so butter side is down).', 'Combine mayonnaise and mustard in small bowl. To each slice, spread mayo mixture, followed with 1 slice of cheese, the slaw, the corned beef, and then top with another slice of cheese. Bake until toasted, about 10 minutes.']   
        },
        {
        name: "Veal or Chicken Hanson" , 
        description: "A wonderful way to get beta carotene and not be stuck in the super sweet mode with sweet potatoes." , 
        ingredients:['aubergine', 'fennel bulb', 'red onion', 'mushrooms', 'olive oil', 'garlic cloves']  , 
        quantity:["1   large    aubergine, trimmed and cut lengthways into 1 . 5cm slices ","1       fennel bulb, trimmed and sliced ","1       red onion, peeled and finely sliced ","4   large   flat mushrooms, trimmed ","1   tablespoon    olive oil","4       garlic cloves, peeled and chopped "]  , 
        serving_size: "1 (280 g)" , 
        servings: "4" , 
        steps:['Preheat the oven to 200C.', 'Arrange the vegetables on a large baking sheet and glaze the aubergine, fennel slices and onion with olive oil using a partry brush.', 'Scatter the garlic over the vegetables.', 'Bake for 8 â€“ 10 minutes or until lightly coloured (make sure the aubergine is soft and cooked).', 'Arrange the aubergine on 4 warm serving plates, top with the fennel, then the onion and finally the whole mushroom.', 'Serve immediately with a green salad.']   
        },
        {
        name: "Scallops With Garlic Bread Crumbs-Weight Watchers" , 
        description: "Excellent as a dip for chips, fried shrimp, chicken tenders, jo-jos, you name it! My husband came up with this one night when I was craving spicy sauce." , 
        ingredients:['apple cider', 'shallots', 'fresh thyme', 'red wine vinegar', 'sherry wine vinegar', 'white vinegar', 'dijon mustard', 'olive oil', 'salt and pepper', 'pancetta', 'tart apples', 'gouda cheese', 'white cheddar cheese', 'red onion', 'arugula', 'salt and pepper']  , 
        quantity:["","2   cups   fresh apple cider","3       shallots, minced ","2   tablespoons    fresh thyme","2   ounces    red wine vinegar","2   ounces    sherry wine vinegar","2   ounces    white vinegar","1   teaspoon    Dijon mustard","2   cups    olive oil","  salt and pepper","","3 -4   ounces    pancetta, in 12 paper thin slices ","3       tart apples, crisp ","6   ounces   aged gouda cheese","3   ounces    white cheddar cheese","1   medium    red onion, thinly sliced ","6   cups    arugula","  salt and pepper"]  , 
        serving_size: "1 (156 g)" , 
        servings: "4" , 
        steps:['For the dressing:', 'Reduce the cider along with the sliced shallots and thyme in a non-reactive pan until reduced to almost a syrup or about 2 ounces.', 'Strain out the shallots and thyme and place the reduced cider into a bowl. Add the 3 vinegars, Dijon mustard, salt and pepper.', 'Slowly whisk in the olive oil until the mixture emulsifies. Stop after 1-1/2 cups and taste.', 'Continue adding oil if too acidic for your taste. More than two cups may be necessary depending on the vinegars used.', 'Adjust seasoning with salt and pepper.', 'Set aside until ready to use.', 'For the salad:', 'Lay the slices of pancetta on a cookie sheet and cook in a 350 degree oven until crispy. Set aside.', 'Slice one or two crisp apples on a mandoline, horizontally across the apple into 18 paper thin slices. Peel and shred the remaining apples to make one cup.', 'Shred the two cheeses.', 'Wash the arugula thoroughly in several changes of water and spin dry.', 'To serve: In a large bowl, mix the arugula, red onion and pancetta. Season with salt and pepper and toss with some cider vinaigrette.', 'Arrange 3 slices of apple on the bottom of each plate.', 'Top with a handful of arugula, sprinkle with the shredded chesses and apple.']   
        },
        {
        name: "Chicken Broccoli Shells" , 
        description: "This is from Southern Living. It is so much better than the ones you can buy at some coffee places. Very easy to make." , 
        ingredients:['veal loin', 'flour', 'butter', 'marsala wine', 'shiitake mushrooms', 'salt and pepper', 'olive oil', 'molasses', 'chicken stock', 'fettuccine pasta']  , 
        quantity:["2   lbs    veal loin or 2   lbs    chicken","  flour, for dredging ","3   tablespoons    butter","1/4  cup    marsala wine","1 1/2  cups    shiitake mushrooms, quartered ","  salt and pepper","3   tablespoons    olive oil","1   cup    molasses","1/4  cup    chicken stock","  fettuccine pasta"]  , 
        serving_size: "1 (121 g)" , 
        servings: "6" , 
        steps:['Take veal or chicken &amp; pound thin between 2 pieces of plastic wrap until 1/2" thick. Season lightly with salt &amp; pepper on both sides &amp; then dredge in flour.', 'Heat olive oil &amp; butter in a large pan over medium heat, shake off excess flour from veal &amp; saute about 2 minutes per side until lightly browned. Remove &amp; set aside.', 'To pan add molasses, wine &amp; stock. Let reduce on high heat for 5 minutes, after reduction  of 1/4th, add mushrooms. Reduce heat, cover &amp; simmer until mushrooms soften &amp; sauce thickens slightly, about 7 minutes.', 'Add veal back to pan &amp; warm.', 'Serve with fettucine that has been cooked &amp; then tossed with a little olive oil, parmesan cheese &amp; parsley.']   
        },
        {
        name: "Strawberry Summer Punch - German Erdbeerbowle-Adult Drink" , 
        description: "Here is a wonderful brunch recipe, I make it quite often at my house for weekend gatherings. I always prepare it a night before, refrigerate, then bake it before we eat, this saves a lot of time. This is also great for supper, with a salad on the side. Enjoy! Note: cooking time does not include cooking pasta." , 
        ingredients:['plain breadcrumbs', 'fresh parsley', 'garlic clove', 'butter', 'lemon zest', 'salt', 'black pepper', 'sea scallops']  , 
        quantity:["1/4  cup    plain breadcrumbs","2   tablespoons   finely chopped fresh parsley","1       garlic clove, minced ","1   tablespoon    butter, melted ","1   teaspoon   grated lemon zest","1/2  teaspoon    salt","1/4  teaspoon    black pepper","1 1/4  lbs    sea scallops"]  , 
        serving_size: "1 (71 g)" , 
        servings: "20" , 
        steps:['Spray the rack of a broiler pan with nonstick spray and preheat the broiler.', 'Combine all ingredients except scallops in a large bowl then add the scallops and toss to cover.', 'Place the scallops on the broiler rack in a single layer and lightly spray with nonstick spray. Broil 4 inches from the heat until golden brown, about 4 min., (do NOT turn).']   
        },
        {
        name: "Potato Spinach Soup" , 
        description: "Homemade breakfast bars full of goodness. Of course you can vary the fruit/chocolate chips etc..etc.. that you add." , 
        ingredients:['alfredo sauce', 'frozen chopped broccoli', 'cooked chicken', 'mozzarella cheese', 'parmesan cheese', 'jumbo pasta shells']  , 
        quantity:["1 (16   ounce) jar   alfredo sauce","2   cups    frozen chopped broccoli","2   cups   diced cooked chicken","1   cup   shredded mozzarella cheese","1/4  cup   shredded parmesan cheese","21       jumbo pasta shells"]  , 
        serving_size: "1 (437 g)" , 
        servings: "4" , 
        steps:['Prehead oven to 350.', 'Boil &amp; drain pasta shells according to package directions.', 'In a large bowl, combine Alfredo sauce, broccoli, chicken, and cheeses.', 'Spoon into pasta shells.', 'Place in a greased 13x9 inch baking dish.', 'Cover &amp; bake for 30-35 minute or until bubbly.']   
        },
        {
        name: "Tofu Boursin" , 
        description: "This is maybe not the Authentic way of cooking Jambalaya but I prepared it for a family Mothers day party alongside Deep fried Turkey and everyone seemed to like it" , 
        ingredients:['strawberries', 'sugar', 'lemons', '', '', 'mint']  , 
        quantity:["2   quarts    strawberries, washed, cored and sliced ","1/2  cup    sugar (to taste)","2       lemons","750   ml    , dry white wine ","750   ml    , white sparkling wine ","  mint or   lemon balm (to garnish)"]  , 
        serving_size: "1 (411 g)" , 
        servings: "1" , 
        steps:['Sprinkle the sugar over the sliced strawberries in a bowl. Zest the washed lemons and then squeeze the juice. Add both juice and zest to the strawberries and let sit for 2 hours in the refrigerator. Drain and reserve the strawberry juice. Add the white wine to the strawberries and marinate in the refrigerator for 1 hour, or until the guests start arriving. Pour the wine and berries into a punch bowl, add the reserved juice and stir. Pour the sparkling wine into the bowl and serve.', 'To serve, ladle punch and strawberries into the glass, garnish with mint, if desired, and serve with a cocktail pick, so that the guests can eat the strawberries.']   
        },
        {
        name: "Grilled Cuban Sandwich" , 
        description: "Delicious sweet banana bread for those wishing for a lighter fare, but who still possess their tastebuds!" , 
        ingredients:['potatoes', 'water', 'bay leaves', 'italian seasoning', 'salt', 'onion', 'chicken base', 'warm water', 'fresh spinach leaves']  , 
        quantity:["4   medium   large potatoes, peeled, cubed ","1 1/2  quarts    water","2       bay leaves","1/2  teaspoon    italian seasoning","1/4  teaspoon    salt","1   small    onion, diced ","","1 1/2  teaspoons   sysco chicken base or 4       chicken bouillon cubes","8   ounces    warm water","1 1/2  cups    fresh spinach leaves"]  , 
        serving_size: "1 (198 g)" , 
        servings: "4" , 
        steps:['In large 4 quart pot with lid, add potatoes, water, bay leaves, italian seasoning, salt and onion. Place lid on pot and bring to boil. Turn down heat to low,maintain low boil with lid.', 'While potatoes are boiling, add chicken base or bouillon cubes, warm water and spinach in blender.', 'Pulse 3 or 4 times.', 'Pour into pot. Stir and cook.', 'Total cooking time 20 minutes.', 'Take a potato masher and mash some of the potatoes in the pot if desired.', 'Serve. Salt and Pepper to taste at table.']   
        },
        {
        name: "Caramel Apple Nibbles" , 
        description: "This is a hearty vegetable stew. Adjust all seasonings to taste." , 
        ingredients:['firm tofu', 'vegan mayonnaise', 'umeboshi plum paste', 'dried basil', 'dried marjoram', 'dried thyme', 'garlic', 'pepper', 'ground rosemary']  , 
        quantity:["8   ounces    firm tofu, drained and broken into large chunks ","1/4  cup    vegan mayonnaise","1   tablespoon    umeboshi plum paste","1   teaspoon    dried basil","1   teaspoon    dried marjoram","1/2  teaspoon    dried thyme","2      cloves garlic, roasted  or 1/2  teaspoon    fresh garlic, crushed ","1/4  teaspoon    pepper (to taste)","1/8  teaspoon    ground rosemary"]  , 
        serving_size: "1 (182 g)" , 
        servings: "1" , 
        steps:['Place tofu in a saucepan and cover with water. Bring to a boil, reduce heat, and simmer 5 minutes. Drain well. Chill uncovered in the refrigerator until cool enough to handle.', 'Crumble tofu into a food processor and add remaining ingredients. Blend until a very thick, smooth paste forms, stopping to scrape down the sides of the work bowl as necessary.', 'Cover and chill several hours or overnight in order to allow the flavors to blend before serving.', 'Keeps 5 to 7 days in the refrigerator.']   
        },
        {
        name: "Cinnamon Roll Twists" , 
        description: "Courtesy of Emeril Lagasse" , 
        ingredients:['extra virgin olive oil', 'yellow mustard', 'ground cumin', 'smoked paprika', 'bread', 'black forest ham', 'turkey', 'swiss cheese', 'dill pickles', 'butter']  , 
        quantity:["1   tablespoon    extra virgin olive oil","2   tablespoons    yellow mustard","1/2  teaspoon    ground cumin","1/2  teaspoon    smoked paprika","8   slices   rustic bread","1/4  lb   thinly sliced black forest ham","6   ounces   sliced turkey","1/4  lb    swiss cheese","2       dill pickles, thinly sliced ","1 1/2  tablespoons   softened butter"]  , 
        serving_size: "1 (47 g)" , 
        servings: "12" , 
        steps:['In a small bowl, combine olive oil, mustard, cumin, paprika and a pinch of salt. Spread mixture on bread.', 'On four slices, layer ingredients in this order: cheese, ham, turkey, then pickles.', 'Top with remaining four slices of bread to form sandwiches, pressing down to compress filling.', 'Heat a large skillet, panini press or sandwich maker to medium-high heat.', 'Spread butter on bottom of each sandwich and place buttered side down on hot surface.', 'Butter top side of sandwich while in pan and grill until browned. Flip sandwich and grill on other side. If using a panini or sandwich press, close press.', 'Grill, pressing constantly, until sandwiches are browned and crisp on both sides and cheese is melted, about 10 -12 minutes.']   
        },
        {
        name: "Green Bean Artichoke Casserole" , 
        description: "This was in my Moms recipe cards.  I have not tried this." , 
        ingredients:['caramel sauce', 'apple', 'pecans']  , 
        quantity:["  caramel sauce (try \u003ca href\u003d\"https://www.geniuskitchen.com/recipe/caramel-in-a-can-477443\"\u003eCaramel in a Can\u003c/a\u003e as it is ridiculously simple and can be made ahead)","  apple, cut into chunks  (I like granny smith or other crisp and crunchy apples, use what you want.)","  pecans, chopped  (or walnuts or almonds, etc. Toast them if you want)"]  , 
        serving_size: "1 (281 g)" , 
        servings: "4" , 
        steps:['I like to heat the caramel just a bit in the microwave, about 20 seconds.  I think its easier to dip.  Recipe # 477443  it will do about 2 large apples or make your favorite or, if you must, melt caramels from the store.', 'When I cut the apples, I leave the skin on and cut each quarter into 3 slices and each slice into then 3 pieces.', "Try 1, if the caramel won't stay on the apple, consider towel drying the apples.", 'Place a toothpick in apple chunk, dip in the caramel (use your finger to spread it if it is not sticking well).', 'Then dip it in the nuts.  Feel free to use other stuff instead of nuts.  Coconut, graham cracker crumbs, shaved chocolate or mini chocolate chips, sprinkles are among those that come to mind.', 'Repeat until done.', 'These make great appetizers or dessert bites.', 'OR, put the caramel in a small heated container and put the nuts and other things around it.  Give your guests a long skinny fork, like a fondue fork and let them dip their own.']   
        },
        {
        name: "Sweet Chilli Prawn Cakes" , 
        description: "I had a bunch of green onions that were getting wilty and a craving for Japanese noodles and eggs.  This was a quick, easy and low fat fix to my craving!" , 
        ingredients:['puff pastry', 'butter', 'light brown sugar', 'ground cinnamon', 'light cream cheese', 'icing sugar', 'vanilla extract', 'milk']  , 
        quantity:["12   ounces   sheets ready rolled puff pastry","2   tablespoons    butter, melted and slightly cooled ","3   tablespoons    light brown sugar","3/4  teaspoon    ground cinnamon","1/2  cup    light cream cheese","1/4  cup    icing sugar, sifted ","1/4  teaspoon    vanilla extract","1   tablespoon    milk"]  , 
        serving_size: "1 (179 g)" , 
        servings: "4" , 
        steps:['Preheat oven to 400F and line 2 baking trays.', 'Place light brown sugar and cinnamon into a small bowl and stir until combined. Leave to one side.', 'Place ready rolled pastry sheet onto a cutting mat and brush melted butter all over.', "Sprinkle the cinnamon mix all over the pastry and press slightly with the back of a spoon, just to make sure it's stuck.", 'Slice into 12 strips, about 1 inch thick, but this will depend on the size of your sheet.', 'Take either end of the strip and twist; twist one hand away and the other towards until the twist meets in the middle.', 'Place twists on baking tray, 6 to a sheet with 2 inch gaps between them.', 'Place in oven for 10-12 minutes until risen, puffy and golden.', 'Leave to cool on the trays completely.', "Once cool, place the cream cheese, icing sugar and vanilla into a medium sized bowl and beat on med-high speed until light and creamy, about 1 minute. Add in 1/2tbsp milk and beat until combined. If required, add the other 1/2tbsp and mix. You want a consistency which will pour, but isn't so thin it won't stick to anything.", 'Either drizzle over the twists or place in a small bowl to dip the twists inches.', 'Twists will keep in an airtight container, at room temperature for 2 days, dip will keep covered in the fridge for 2 days.']   
        },
        {
        name: "American Blessing Mix" , 
        description: "Strawberry and Basil are a wonderful combination. The sweetness of the strawberries goes well together with the herbal flavors of basil. The lime adds the freshness, which I like about this jam. Im using here the Super Gelling Sugar from Dr. Oetker (German brand), which makes it possible to reduce the sugar amount to 1/3 of fruit weigth." , 
        ingredients:['french style green beans', 'water-packed artichoke hearts', 'extra virgin olive oil', 'parmesan cheese', 'breadcrumbs', 'french-fried onions', 'butter']  , 
        quantity:["1 (15   ounce) can   French style green beans, drained ","2 (10 1/4  ounce) cans   water-packed artichoke hearts, drained ","1/4-1/2  cup    extra virgin olive oil","1/2-3/4  cup    parmesan cheese","  breadcrumbs, enough to bind together  (about a cup?)","1 (4   ounce) can   French-fried onions","1   tablespoon    butter"]  , 
        serving_size: "1 (641 g)" , 
        servings: "1" , 
        steps:['Combine all ingredients except french fried onions in a casserole dish and mix well.', '(I usually do this with my hands so that the choke hearts get blended in well.) Top with onions and dot with butter.', 'Cover and bake in a 400F oven for 15 minutes.', 'Uncover and continue to bake for 15-20 minutes longer (or until onions start to brown).']   
        },
        {
        name: "Blue Cheese Meatballs" , 
        description: "This is the best homemade salsa ever! I originally found this on allrecipes.com. Everyone always requests it for potlucks and parties. This can be watery so I usually chop the tomatoes first and put them in a strainer basket while I do the rest. I have a small food chopper which really cuts down the prep time on this." , 
        ingredients:['prawns', 'egg white', 'fresh lime leaves', 'sweet chili sauce', 'corn flakes', 'rice flour', 'oil', 'sweet chili sauce']  , 
        quantity:["600   g   green prawns (raw)","1       egg white","2       fresh lime leaves, shredded ","3   tablespoons    sweet chili sauce","2   cups   fresh corn flakes, crushed finely ","3   tablespoons    rice flour","  oil, for shallow frying "," extra sweet chili sauce, to serve "]  , 
        serving_size: "1 (756 g)" , 
        servings: "1" , 
        steps:['Place prawn meat, egg white, lime leaves, sweet chili sauce, corn flakes and rice flour in a food processor and process till the mixture is combined, BUT not smooth.', 'With wet hands, shape the mixture into small cakes.', 'Heat enough oil in a frying pan over medium heat to shallow fry.', 'Add prawn cakes a few at a time and cook for 3 minutes on each side, or till golden brown.', 'Place the cooked prawn cakes on kitchen towels to soak up the excess oil.', 'Serve with the extra sweet chili sauce.']   
        },
        {
        name: "Steak Lo Mein" , 
        description: "This is an awesome reuben that uses a unique cole slaw rather than saurkraut. This is a wonderful taste sensation for Reuben lovers. We think you will be as amazed as we were. We tagged Recipe #260415 in the Make it Healthier game and did just that. We revised it to an open-faced sandwich and brought down the calories from 837, the fat from 50.5, and the carbs down from 52g. Thanks Chef #382123 for such a great perk to an old favorite." , 
        ingredients:['bugles original flavor snacks', 'small pretzels', 'candy corn', 'dried fruit', 'peanuts', 'm%26m%27s plain chocolate candy', 'milk chocolate kisses']  , 
        quantity:["2   cups    Bugles original flavor snacks","2   cups    small pretzels","1   cup    candy corn","1   cup    dried fruit or 1   cup    raisins","1   cup    peanuts or 1   cup    sunflower seeds","1   cup    M\u0026M\u0027s plain chocolate candy","16      hershey brand milk chocolate kisses"]  , 
        serving_size: "1 (198 g)" , 
        servings: "3" , 
        steps:['In a large bowl mix everything except the kisses.', 'Place 1/3-1/2 cups Blessing mix in small cellophane treat bags.', 'Add one kiss to each bag.', 'Close bag with chenille stem or twist tie.', "Bugles:Shaped like cornucopia or Horn of Plenty,a symbol of our Nation's abundance Pretzels:Arms folded in preyer,a freedom sought by the founders of our country Candy Corn:Sacrifices of the Pilgrim's first winter.", 'Food was so scarce that the settlers survived on just a few kernels of corn per day Nuts or seeds:Promise of a future harvest,one will reap only if seeds are planted and tended to with diligence.', 'Dried Fruites:Harvest gifts of our bountiful land.', 'M&amp;Ms:Memories of those who came before us to guide us to a blessed future.', "Hershey's Kiss:The love of family and friends that sweetens our lives."]   
        },
        {
        name: "Freezer-ready Streusel Mix" , 
        description: "A gourmet looking relatively simple yet delicious meal." , 
        ingredients:['lean ground beef', 'onion', 'blue cheese', 'garlic', 'worcestershire sauce', 'dry breadcrumbs', 'dried thyme', 'dried rosemary', 'parsley', 'milk']  , 
        quantity:["1   lb    lean ground beef","1   tablespoon   finely chopped onion","4   ounces    blue cheese, crumbled ","2   cloves    garlic, minced ","1   teaspoon    Worcestershire sauce","1/3  cup    dry breadcrumbs","1/4  teaspoon    dried thyme","1/4  teaspoon    dried rosemary","2   tablespoons   chopped parsley","1/2  cup    milk"]  , 
        serving_size: "1 (1213 g)" , 
        servings: "1" , 
        steps:['Add all the ingredients to a large mixing bowl; mix well to combine.', 'Form mixture into 1/2-inch balls.', 'Put the balls on a baking sheet with a rim.', 'Bake in a 375Â° oven for about 10 minutes or until browned.', 'Serve immediately with toothpicks for spearing.']   
        },
        {
        name: "Italian Chicken and Pasta" , 
        description: "Ris Lacoste was the chef at the 1789 Restaurant in Georgetown in Washington DC for ten years, til she left to open her own place.  This salad was a favorite on the menu.  The cider vinaigrette recipe makes a lot--but you can keep it in the fridge for about two weeks.  Bring it to room temperature before using." , 
        ingredients:['egg noodles', 'steak', 'red bell pepper', 'garlic clove', 'sesame oil', 'soy sauce', 'worcestershire sauce', 'adobo seasoning', 'garlic powder', 'scallion']  , 
        quantity:["10   ounces    egg noodles","1/2  lb    steak","1/2      red bell pepper","1       garlic clove","1   tablespoon    sesame oil","  soy sauce, adjusted to your taste ","1   teaspoon    Worcestershire sauce","1   tablespoon    adobo seasoning","  garlic powder","  scallion"]  , 
        serving_size: "1 (292 g)" , 
        servings: "4" , 
        steps:['Cut bell pepper into thin strips and fry until the texture is soft.  Add scallions about 5 minutes after the bell pepper.', "While the bell pepper is cooking cut steak into thin strips.  Coat with a little vegetable oil and then with adobo powder, Worcestershire sauce, and add garlic powder if you'd like.  Add to peppers and scallions and cook until it is no longer red.", 'Boil noodles according to directions (my package is 3 minutes), strain and add to steak and peppers. Add soy sauce little by little tasting in between to make sure you did not put in too much.  Add the sesame oil and mix well.  Enjoy!']   
        },
        {
        name: "Beef, Black Beans and Rice Noodles With Oyster Sauce" , 
        description: "Cut this out of a magazine probably 20 years ago. Love veal but it is almost as good with chicken. We serve over fettucine." , 
        ingredients:['walnuts', 'brown sugar', 'all-purpose flour', 'cinnamon', 'nutmeg', 'salt', 'vanilla', 'butter']  , 
        quantity:["2   cups    walnuts","3   cups   packed brown sugar","1/2  cup    all-purpose flour","2 -3   tablespoons    cinnamon","1/2  teaspoon    nutmeg","1   pinch    salt","1   tablespoon    vanilla","1   cup   very cold butter (cut into 16 chunks)"]  , 
        serving_size: "1 (119 g)" , 
        servings: "4" , 
        steps:['In a bowl of a food processor, place the walnuts, brown sugar, flour, cinnamon, nutmeg, salt and vanilla; pulse briefly to combine.', 'Add in the COLD butter chunks; process to make a coarse crumble mixture.', 'Freeze in a covered freezer container, or a ziploc freezer bag, and remove as needed.']   
        },
        {
        name: "Carrot-Cinnamon Marmalade" , 
        description: "From the Weight Watchers in 20 Minutes Cookbook.  As I am trying to get back to weight,eat healthy, and make foods family will enjoy I came across this cookbook and the recipes are very simple, 20 minute meals, and easy to keep on track with.  This is a super delightful recipe in 3 steps. and less than 10 minutes!  WW pts.4  Serving size 5 scallops" , 
        ingredients:['boneless skinless chicken breasts', 'rotini pasta', 'italian seasoning', 'salt', 'pepper', 'garlic cloves', 'olive oil flavored cooking spray', 'light pasta sauce', 'low fat mozzarella']  , 
        quantity:["4   large    boneless skinless chicken breasts","1   lb   barilla plus rotini pasta","1   teaspoon    italian seasoning","1/4  teaspoon    salt","1/4  teaspoon    pepper","4       garlic cloves","  olive oil flavored cooking spray","26   ounces    light pasta sauce","1 (8   ounce) package  shredded low fat mozzarella"]  , 
        serving_size: "1 (2155 g)" , 
        servings: "1" , 
        steps:['preheat oven to 450.', 'Spray pan with oil oil.', 'place chicken breasts in pan and spray with olive oil.', 'lightly salt and pepper chicken adding italian seasoning to taste.', 'cut garlic cloves in slices and lay on top of chicken breasts.', 'cook for 25 to thirty minutes or until done and juicy.', 'boil rotini according to package.', 'when done drain and add ragu sauce, just enough to cover all rotini, set aside in dish.', 'spoon ragu sauce over top of chicken till covered add mozzerella cheese and bake and additional 10 minutes or until cheese is melted.', 'place chicken breasts on top of rotini and serve.']   
        },
        {
        name: "St. Louis Style Gooey Butter Cake" , 
        description: "I found this recipe years ago on a box of pasta shells. It can be changed around so easily that it doesnt seem like the same recipe. The recipe that I am posting calls for alfredo sauce & broccoli but sometimes I use marinara sauce instead of alfredo and spinach instead of broccoli. You can do it so many ways!!" , 
        ingredients:['peanut oil', 'ginger', 'garlic', 'red chili pepper', 'filet of beef', 'fermented black beans', 'shiitake mushrooms', 'oyster mushrooms', 'rice wine', 'palm sugar', 'light soy sauce', 'oyster sauce', 'flat rice noodles', 'gai lan', 'spring onions', 'sesame oil', 'white pepper']  , 
        quantity:["1/4  cup    peanut oil","1   teaspoon    ginger, finely chopped ","1/2  teaspoon    garlic, finely chopped ","1      long red chili pepper, finely sliced on the diagonal ","200   g    filet of beef, finely sliced ","2   tablespoons    fermented black beans","4       shiitake mushrooms, stalks removed ","6       oyster mushrooms","2   tablespoons    rice wine (shao xing)","2   tablespoons    palm sugar","2   tablespoons    light soy sauce","4   tablespoons    oyster sauce","1   kg   fresh flat rice noodles or 1   kg   vietnamese rolled rice noodles","1/2  cup    gai lan (Chinese broccoli leaves)","2       spring onions, cut into 3cm lengths ","1/4  teaspoon    sesame oil","1   pinch    white pepper"]  , 
        serving_size: "1 (123 g)" , 
        servings: "10" , 
        steps:['Heat the oil in a wok until just smoking. Add the ginger, garlic and chilli and fry til fragrant.', 'Add the beef slices and stir-fry for one minute, then add the black beans, both sorts of mushrooms, shao xing, palm sugar, soy and oyster sauces and chicken stock. Stir fry for one minute.', 'Add the rice noodles, broccoli leaves and spring onions and cook for a further minute. Finally, add the sesame oil and remove from the heat.', 'Spoon into a large bowl or platter then sprinkle over the pepper.']   
        },
        {
        name: "Mom Harts Pie Crust" , 
        description: "Posting for ZWT 6 and found at About.com for German Recipes.  Recipe states:  Erdbeerbowle is a wine punch with strawberries served at summer parties and German BBQs. Made with sweetened strawberries, lemon, wine and sparkling wine (German Sekt), it sets the mood of warm summer nights and tiki torches. Serve with cocktail picks to spear the fruit.  Sounds like a yummy adult summer drink." , 
        ingredients:['carrots', 'orange juice', 'lemon%2c juice of', 'sugar', 'cinnamon']  , 
        quantity:["4   cups    carrots, grated  (you can use a food processor)","4   cups    orange juice","1       lemon, juice of","3   cups    sugar","1   teaspoon    cinnamon"]  , 
        serving_size: "1 (1518 g)" , 
        servings: "1" , 
        steps:['Cook carrots in orange juice over moderate heat for 30 minutes.', 'Add sugar and cinnamon.  Stir thoroughly and cook until thick.', 'Ladle into hot, sterilized jars and seal.']   
        },
        {
        name: "Chicken Thighs With Lemon &amp; Garlic" , 
        description: "This recipe is quick, easy. I needed a soup without milk or cheese.Chicken broth fit the bill. This is a rich smooth soup with small chunks of potato and small bits of onion.A good soup to serve on St. Patricks day. " , 
        ingredients:['butter', 'yellow cake mix', 'eggs', 'cream cheese', 'almond extract', 'confectioners%27 sugar']  , 
        quantity:["1/2  cup    butter (NOT MARGARINE!)","18   ounces    yellow cake mix (one box)","3       eggs","1 (8   ounce) package   cream cheese (cut into quarters)","1/2  teaspoon    almond extract or 1/2  teaspoon    pure vanilla extract","4   cups    confectioners\u0027 sugar (A.K.A. Powdered sugar)"]  , 
        serving_size: "1 (429 g)" , 
        servings: "4" , 
        steps:['Preheat oven to 350.', 'Lightly grease (or spray with Pam) one deep 9x13 rectangular cake pan. I would suggest a 4 in deep pan, as the cake rises when it is cooking, but a oven-safe disposable coffee cake pan from the grocery store would work fine too.', 'Melt butter. I do this by heating the the microwave on low power for 30 seconds.', 'Empty cake mix into a large bowl.', 'Stir melted butter, along with ONE egg, into the cake mix.', 'PRESS mixture into pan. Mixture will have the consistency of sticky dough. Using a spatula works for me, but pressing with clean fingers will do the trick as well.', 'In a large bowl, mix cream cheese, almond or vanilla extract, confectioners sugar and the remaining two eggs.', 'Beat for three minutes with an electric mixer set on medium high speed, or until smooth with NO lumps.', 'Pour evenly over top of the cake mixture in the pan. Use a spatula to spread.', 'Place a large cookie sheet on the rack below the cake. Sometimes when you use a cake pan with less depth, the cake bubbles and spills over. The cookie sheet will spare your oven! Bake at 350 for 30-45 minutes until golden brown on top. Cooking time is estimated, you will really have to watch it here! I always take the cake out when it turns a darkish golden brown. Note that there will be a paper thin sugar "crust" that will form while the cake is baking. It the top layer of sugar hardening, and this is what will turn golden brown. It adds great texture!', 'Allow cake to cool COMPLETELY. This is very important, as the cake will not cut easily until it is completely cool. You will notice that the cake has sunken and set. This is normal. Refrigeration is optional. I personally like it at room temperature.', 'Dust the top with confectionersâ€™ sugar.', 'Cut cake into bars and serve with or without utensils, but make sure you have plenty of napkins, because this treat will have you licking your fingers!  (Cake should be gooey underneath the sugar "crust", so don\'t over bake!).']   
        },
        {
        name: "Applesauce Muffins" , 
        description: "I serve with thick toasted bread slices. My husband ate two large bowls. Usually likes spinach cooked with or without vinegar. Now he has another favorite. A good recipe to use from your garden bounty! The chicken base is moist and it is 1 1/2 tsps or 4 chicken bouillon cubes. I have changed it in the recipe twice but it doesnt want to acknowledge the teaspoon measurement." , 
        ingredients:['flour', 'shortening', 'sugar', 'salt', 'ice water', 'white vinegar']  , 
        quantity:["6 1/2-7   cups    flour","2 1/4  cups    shortening","1/2  cup    sugar","2   teaspoons    salt","1/2  cup    ice water","1   tablespoon    white vinegar"]  , 
        serving_size: "1 (77 g)" , 
        servings: "24" , 
        steps:['Mix flour and shortening with pastry blender until crumbly.  Make well in the center.', 'Mix water and vinegar and then pour into well in flour mixture.  Stir with fork then use hand to finish mixing.  Form into 6 balls of dough.', 'Use one ball for bottom crust and one for top.', 'Freeze unused balls by wrapping in foil and placing in ziploc bags.', 'Use within 3 months.']   
        },
        {
        name: "Green Lentil Soup/Stew" , 
        description: "Based on a recipe from The Ultimate Uncheese Cookbook by Jo Stepaniak. The recipe intro says, â€œThis French-inspired garlic, black pepper, and herb uncheese is marvelous on bread or crackers and equally scrumptious piled on baked or steamed potatoes. Use it as a condiment scooped on top of pasta along with your favorite tomato-based sauce.â€ Cook time does not include chilling time." , 
        ingredients:['chicken stock', 'garlic cloves', 'butter', 'olive oil', 'chicken thighs', 'lemons', 'lemon%2c juice of', 'flour', 'dry white wine', 'fresh parsley']  , 
        quantity:["2 1/2  cups    chicken stock","20       garlic cloves, sliced thin ","2   teaspoons    butter","1   teaspoon    olive oil","8       chicken thighs","2       lemons, skinned and sliced ","1       lemon, juice of","3   teaspoons    flour","1/2  cup    dry white wine","2   teaspoons    fresh parsley, chopped "]  , 
        serving_size: "1 (511 g)" , 
        servings: "2" , 
        steps:['Preheat oven to 350Â°.', 'Bring stock, garlic to a boil, remove from heat add lemon juice and white wine.', 'Heat 1 tsp butter and oil in pan.  SautÃ© chicken skin side down until skin is crisp.', 'Put chicken in baking dish.', 'Make roux:  Heat 1 tsp butter and cook 3 tsp flour until lightly brown.', 'Add roux to stock and whisk until slightly thickened and smooth.', 'Pour stock and garlic over chicken.', 'Add lemon slices.', 'Bake 30 -40 minutes.', 'Top with parsley and serve.']   
        },
        {
        name: "Albers Sweet Corn Muffins" , 
        description: "A wonderful combo.  Should you have roast pork, throw that on, too." , 
        ingredients:['butter', 'sugar', 'eggs', 'vanilla extract', 'applesauce', 'all-purpose flour', 'baking soda', 'ground cinnamon', 'ground allspice', 'ground cloves', 'walnuts', 'cinnamon sugar']  , 
        quantity:["1   cup    butter, softened ","2   cups    sugar","2       eggs","1   teaspoon    vanilla extract","2   cups    applesauce","5   cups   freshly ground soft wheat flour or 5   cups    oat flour","1   teaspoon    baking soda","1   teaspoon    ground cinnamon","1   teaspoon    ground allspice","1/4  teaspoon    ground cloves","1   cup   chopped walnuts","  cinnamon sugar"]  , 
        serving_size: "1 (46 g)" , 
        servings: "18" , 
        steps:['In a mixing bowl, cream butter and sugar. Add eggs and vanilla; mix well.', 'Stir in applesauce.', 'Combine the flour, baking soda and spices;.', 'stir into creamed mixture.', 'Fold in nuts.', 'Fill greased or paper-lined muffin cups three-fourths full.', 'Bake at 350 for 20-25 minutes or until a toothpick comes out clean.', 'Cool for 5 minutes before removing from pans to wire racks.', 'Sprinkle with cinnamon-sugar if desired. Yield: about 2 dozen.']   
        },
        {
        name: "Savory Tomato Jam" , 
        description: "Amazingly simple and who doesnt like a caramel apple?  I like mine dipped in chopped pecans or toasted sliced almonds," , 
        ingredients:['onion', 'olive oil', 'carrots', 'chicken broth', 'water', 'green lentil', 'dried thyme', 'dried rosemary', 'salt and pepper']  , 
        quantity:["1/2  medium    onion, chopped ","2   tablespoons    olive oil","2   medium    carrots, chopped ","14   ounces    chicken broth (1 can)","1 1/4  cups    water","1/2  cup   french green lentil, rinsed ","1/4  teaspoon    dried thyme","1/4  teaspoon    dried rosemary","  salt and pepper"]  , 
        serving_size: "1 (1844 g)" , 
        servings: "2" , 
        steps:['Saute onion in olive oil.', 'Add chopped carrot.', 'Add remaining ingrediants and cook on medium heat until lentils are soft.', 'Salt and Pepper to taste.']   
        },
        {
        name: "Broccoli Casserole" , 
        description: "Love cinnamon rolls, but short on time? Now you can have all the elements of a roll in a super easy twist! Puff pastry is slathered in melted butter and sprinkled with cinnamon and sugar then baked until golden; from oven to plate in 20 minutes!" , 
        ingredients:['all-purpose flour', 'granulated sugar', 'yellow cornmeal', 'baking powder', 'salt', 'milk', 'eggs', 'vegetable oil', 'butter']  , 
        quantity:["1 1/2  cups    all-purpose flour","2/3  cup    granulated sugar","1/2  cup   albers yellow cornmeal","1   tablespoon    baking powder","1/2  teaspoon    salt","1 1/4  cups    milk","2   large    eggs, lightly beaten ","1/3  cup    vegetable oil","3   tablespoons    butter or 3   tablespoons    margarine, melted "]  , 
        serving_size: "1 (81 g)" , 
        servings: "8" , 
        steps:['Preheat oven to 350Â°F Grease or paper-line 18 to 20 muffin cups, or a pan for cornbread.', 'Combine flour, sugar, corn meal, baking powder, and salt in medium bowl.', 'Combine milk, eggs, vegetable oil, and butter in small bowl; mix well.', 'Add liquid mixture to flour mixture; stir until just blended.', 'Pour into prepared muffin cups filling 2/3 full.', 'Bake for 18-20 minutes or until wooden pick inserted in center comes out clean. Cool in pans on wire racks for 5 minutes, remove to wire racks to cool slightly. Serve warm and enjoy!', 'If you are making cornbread, pour into greased 8-inch square baking pan, and bake for 35 minutes.', 'For High Altitude bakers, change corn MUFFIN time to 20-24 minutes. Cornbread time remains unchanged.']   
        },
        {
        name: "Turkey Peppercorn Ranch Bites" , 
        description: "This is one of those this might be good type recipes. I tried it out and have been making it ever since. If you would like you could also add garlic and/or onion power for a little more flavor. Its also yummy as a dip. Recipe is easily doubled or tripled for large groups although I warn you, as you can see, I approximated the measurements." , 
        ingredients:['tomatoes', 'lemon zest', 'lemon juice', 'granulated sugar', 'white vinegar', 'ground cinnamon', 'pickling salt']  , 
        quantity:["5   lbs   ripe tomatoes","4   teaspoons   grated lemon zest","1/2  cup    lemon juice, fresh  (or bottled)","4   cups    granulated sugar","2   cups    white vinegar","2   teaspoons    ground cinnamon","1   teaspoon   coarse pickling salt"]  , 
        serving_size: "1 (43 g)" , 
        servings: "12" , 
        steps:['Dip tomatoes into boilnig water for about 1 minute until the skins crack slightly.  Peel, remove stem ends and cores and cut up.', 'Place in saucepan.  Bring to a boil slowly.  Stir often as it boils in uncovered saucepan.  Boil uncovered, about 20-30 minutes until liquid is reduced.', 'Add lemon rind, lemon juice, sugar, vingar, cinnamon and salt.  Stir as it returns to a boil.  Boil about 40 minutes, stirring often, until it thickens.', 'Fill hot sterilized half pint jars to within 1/4 inch of top.  Place sterilized metal lids on jars and screw metal bands on securely.  For added assurance against spoilage, you may choose to process in a boiling water bath for 5 minutes.']   
        },
        {
        name: "Buffalo &amp; Blue Cheese Double Dip (Meat-Free)" , 
        description: "These prawn cakes are a great appetizer or small finger food to serve with drinks. They can be made in huge batches, all shaped and kept in the freezer. And when you need them (which will be often), just take them out and shallow fry. It is ready to be served. Great for unexpected guest." , 
        ingredients:['frozen chopped broccoli', 'cream of mushroom soup', 'mayonnaise', 'eggs', 'sharp cheddar cheese', 'salt and pepper']  , 
        quantity:["2 (8   ounce) packages   frozen chopped broccoli","1 (10 3/4  ounce) can   cream of mushroom soup","1   cup    mayonnaise","2      beaten eggs","1   cup   grated sharp cheddar cheese","  salt and pepper"]  , 
        serving_size: "1 (29 g)" , 
        servings: "8" , 
        steps:['Cook the frozen broccoli 5 minutes then drain.', 'Mix with all other ingredients and place in 2 quart casserole dish.', 'Bake 45 minutes at 350 degrees.']   
        },
        {
        name: "Easy Lemon Citrus Prairie Cake" , 
        description: "I found this on the net" , 
        ingredients:['cream cheese', 'peppercorn ranch dressing', 'tortillas', 'deli turkey', 'parsley', 'fresh black pepper', 'pickle']  , 
        quantity:["2 -3   ounces    cream cheese (softened)","1/4  cup    peppercorn ranch dressing","4       tortillas (10 inch)","6   ounces    deli turkey","1   tablespoon    parsley (chopped or dried)","2   teaspoons    fresh black pepper","  pickle (I use hamburger pickles)"]  , 
        serving_size: "1 (148 g)" , 
        servings: "12" , 
        steps:['Mix cream cheese, dressing, parsley and pepper well.', 'Spread on tortilla leaving about half an inch around edge.', 'Top with turkey.', 'Roll up and cut off ends then cut into bite size pieces.', 'Top pieces with pickles and secure with a toothpick.']   
        },
        {
        name: "Garden Fresh Eggplant Parmesan" , 
        description: "I am not a huge blue cheese fan but these meatballs were very good. My sister made them and didnt tell me what was in them so, she really got me." , 
        ingredients:['blue cheese dressing', 'sour cream', 'mayonnaise', 'seasoning']  , 
        quantity:["1/2  cup    blue cheese dressing","3/4  cup    sour cream, divided ","3/4  cup    mayonnaise, divided ","2   tablespoons    seasoning, McCormick Original Buffalo Wings Seasoning dry mix  (usually can be found next to dry gravy mixes)"]  , 
        serving_size: "1 (487 g)" , 
        servings: "6" , 
        steps:['To make a combined dip, mix all ingredients.  For separate, side-by-side dips, follow the instructions below.', 'In a small bowl, mix blue cheese dressing, and half of the sour cream and mayonnaise (I just measure and mix mine in a 2-cup measuring cup to keep mess to a minimum).', 'In another small bowl, mix remaining sour cream, mayonnaise and seasoning mix.  This makes a slightly spicy dip, so increase or reduce the amount of seasoning according to preference.', 'Spoon both dips into a serving bowl so that they are side by side. You can do this freeform, straight down the middle, swirled, or in a yin-yang pattern.']   
        },
        {
        name: "Gluten-Free Zucchini Bread/Muffin Recipe" , 
        description: "I came up with this recipe watching my mother cooking as my base and then Americanizing it with my taste and what I had on hand.  The measurements are estimates and you could vary them to suit your taste." , 
        ingredients:['butter', 'sugar', 'eggs', 'all-purpose flour', 'carbonated lemon-lime beverage', 'lemon extract', 'clove']  , 
        quantity:["1 1/2  cups    butter","3   cups    sugar","5       eggs","3   cups    all-purpose flour","3/4  cup    carbonated lemon-lime beverage","2   tablespoons    lemon extract","","1 -3   teaspoon    clove"]  , 
        serving_size: "1 (38 g)" , 
        servings: "24" , 
        steps:['Grease and lightly flour a 10-inch fluted tube pan. Set aside.', 'In a large bowl, beat together sugar and butter until light and fluffy. Add eggs, one at a time, beating well after each addition.', 'Beat in flour, 1 cup at a time. Beat in lemon-lime carbonated beverage and lemon extract. Pour into prepared pan.', 'Bake in 350 degree F oven for 60 to 65 minutes or until a toothpick inserted near the center comes out clean. Cool on a wire rack for 10 minutes. Loosen side of cake; remove from pan. Cool. Makes 12 servings.']   
        },
        {
        name: "Bacon-Wrapped Apricots With Sage" , 
        description: "This is very handy to have ready in the freezer if you do a lot of baking. Of coarse, this mix may be refrigerated until ready to use, but it will keep almost indefinitely in the freezer." , 
        ingredients:['eggplants', 'flour', 'egg', 'water', 'parmesan cheese', 'panko breadcrumbs', 'salt', 'pepper', 'garlic powder', 'spaghetti', 'olive oil', 'spaghetti sauce', 'parmesan cheese']  , 
        quantity:["3   small    eggplants","1   cup    flour","1       egg","1   cup    water","1   tablespoon   grated parmesan cheese (or parmesan cheese substitute, like asiago)","1   cup    panko breadcrumbs or 1   cup   regular cracker crumb","1/2  teaspoon    salt","1/2  teaspoon    pepper","1/2  teaspoon    garlic powder","7   ounces    spaghetti or 7   ounces    angel hair pasta","1 1/2  tablespoons    olive oil","28   ounces    spaghetti sauce","1   cup   shredded parmesan cheese"]  , 
        serving_size: "1 (11 g)" , 
        servings: "24" , 
        steps:['I slice my eggplants the night before (into 1/4 inch thick circles) and soak them in salt water.  I hear it makes them softer and more tender but I suppose you could go straight to the frying pan with them too.', 'Mix salt, pepper, garlic powder, and grated cheese into the flour.  Beat egg into water to make an egg wash.  Set up a standard 3 stage dipping station for frying the eggplant, Hand dip in the seasoned flour, then into the egg wash and finally coat well in the breadcrumbs.', 'Start the pasta boiling in a separate pot while you start heating oil in a skillet to pan fry the eggplant.  Add a dash of olive oil or butter to the spaghetti water to keep it from boiling over.  The pasta can be just lightly cooked to al-dente stage, as it will finish off in the oven.', 'Pan fry the eggplant about 5 minutes on each side until nice and golden and drain on a plate.', 'Drain the spaghetti, and toss in a bowl with some olive oil.  Also start the oven to preheat at 350 at this time.', 'Get out a 3 x 9 x 12 inch casserole dish and spread a little marinara sauce to coat the bottom.  Now add all the pasta in a layer and then layer on the rest of the sauce.  Add the breaded eggplant slices in a layer on top of the sauce and finally top with fresh shredded Parmesan cheese.', 'Place in the oven to bake for 20 minutes or until the cheese is nice and bubbly on top.  Let it stand and cool for a couple minutes, serve and enjoy.']   
        },
        {
        name: "Apple Chicken Quesadilla" , 
        description: "I love italian food but I am a diabetic, so I came up with this recipe that I really enjoyed." , 
        ingredients:['sorghum flour', 'brown rice flour', 'tapioca flour', 'sucanat', 'baking powder', 'baking soda', 'sea salt', 'ground cinnamon', 'ground nutmeg', 'xanthan gum', 'fresh lemon juice', 'natural applesauce', 'non-dairy milk substitute', 'coconut oil', 'eggs', 'zucchini', 'cacao']  , 
        quantity:["1 1/2  cups    sorghum flour","1   cup    brown rice flour","1   cup    tapioca flour","1 1/2  cups    sucanat","1   tablespoon    baking powder","1   teaspoon    baking soda","1/2  teaspoon    sea salt","1   teaspoon    ground cinnamon","1   teaspoon    ground nutmeg","1 1/2  teaspoons    xanthan gum","2   teaspoons    fresh lemon juice","1/2  cup    natural applesauce","1/2  cup    non-dairy milk substitute (So Delicious coconut milk beverage)","1/3  cup    coconut oil or 1/3  cup    light olive oil","2       eggs","3   cups    zucchini, grated ","","1/3  cup    cacao, powder  or 1/2  cup   of allergen-free chocolate chips"]  , 
        serving_size: "1 (80 g)" , 
        servings: "4" , 
        steps:['Mix all the dry ingredients together first in a large mixing bowl, then add the wet ingredients and mix well. Lastly add the heaping 3 cups of grated zucchini. The way I grate zucchini is on a cheese grater over a plate and it usually takes about 1 large zucchini to get about 3 heaping cups. Use the juices and all the grated parts. Mix all together and it is ready for putting in pans.', 'Some baking options:', 'This recipe will make either 24 muffin cups, or 2 loaf pans. You could also use 2 8x8 pans for this recipe, or even 1 9x13 pan. It makes a beautiful cake, bread, and muffin, so use for what you desire most. The muffins should be baked at 350 degrees for 20-25 minutes, the bread loaves should be baked at around 35-40 minutes, and a cake in a 9x13 should be around 30-40 minutes. Just check on it and pull from the oven when it is a golden brown color and after tested with a pick comes out clean with nothing gooey. The best baking temp is at 350 degrees. After pulled from the oven, make sure you cool for at least 10-15 minutes before cutting into. And, let it be fully cooled before bagging up to freeze for best results.', 'Other option:', 'If you only want to make one loaf, then half this recipe and make just one loaf or 12 muffins.']   
        },
        {
        name: "Spaghetti Squash Pad Thai" , 
        description: "From famous Australian chef Neil Perry, these noodles from Wokpool Noodle Bar form a beautifully textured dish with a rich salty sweet flavour. My addition is the chilli! I hate mushrooms so dont use them, but Ive included them in the recipe for all you mushy lovers out there! The technique of adding the sesame oil last leaves the most beautiful flavour; I usually use ground szechuan pepper and salt rather than the white pepper." , 
        ingredients:['fresh sage leaves', 'dried apricots', 'bacon', 'pure maple syrup']  , 
        quantity:["24   small    fresh sage leaves","24   large    dried apricots","8   slices    bacon, cut crosswise into thirds ","2   tablespoons    pure maple syrup"]  , 
        serving_size: "1 (331 g)" , 
        servings: "4" , 
        steps:['Heat oven to 375Âº F. Place a sage leaf on each apricot, wrap with a piece of bacon, and place seam-side down on a baking sheet.', 'Bake until the bacon is beginning to crisp, 6 to 8 minutes PER SIDE.', 'Remove from oven and brush with the maple syrup. Serve with toothpicks.']   
        },
        {
        name: "Dublin Pork Spareribs with Apples" , 
        description: "This is from Anne Gardons Preserving for All Seasons.  I really like it, but then again, I love carrots and cinnamon together!  This is so very easy to make and is great for a gift when your markets fruit section is looking rather blah." , 
        ingredients:['flour tortillas', 'chicken meat', 'cheddar cheese', 'apple', 'salsa']  , 
        quantity:["4       flour tortillas, 8-inches in diameter ","1   cup   cooked chicken meat, shredded  or 1   cup   cooked chicken meat, chopped ","1/4  lb    cheddar cheese, grated, slices may be used  (Monterey jack cheese may be substituted)","1       apple, sliced ","1/4  cup    salsa"]  , 
        serving_size: "1 (377 g)" , 
        servings: "6" , 
        steps:['Heat a large skillet on medium high heat.  Place one tortilla in the skillet.  Flip it a couple of times with a spatula, then let it sit in the pan heating up until air pockets form and parts of the tortilla begin to puff up.  Flip it again.', 'Place cheese slices on half of the tortilla at least 1/2-inch from the edge of the tortilla.  Add chicken pieces on top of the cheese.  Fold the tortilla over like an omelet and press down on the folded tortilla with the spatula.  Lower the heat to medium.  At this point, if you have enough room in your skillet, you can add a second tortilla to the pan to begin to heat it up.', 'When the cheese inside the quesadilla has melted, remove the quesadilla to a cutting board.  Open it wide and lay on apple slices and salsa.  Fold the tortilla back again, and cut it into 3 equal triangles, as if you were cutting a pie.  A pizza cutter works well for cutting the quesadilla.', 'Repeat with remaining tortillas.']   
        },
        {
        name: "Antipasto Sandwich" , 
        description: "What is Gooey Butter Cake you ask? It is a super-sweet, rich, St.Louis original treat!  I have made this recipe hundreds of times to rave reviews. My fiances co workers even go as far as to trade work for Gooey Butter Cake!  But whats someone from out-of-town, or in my case, relocated Las Vegas, to do? Follow This Recipe! Its super easy...anyone can make it! ENJOY!" , 
        ingredients:['spaghetti squash', 'peanut oil', 'thai fish sauce', 'reduced-sodium tamari soy sauce', 'red pepper flakes', 'egg', 'garlic cloves', 'boneless skinless chicken breasts', 'sea salt', 'raw shrimp', 'carrots', 'mung bean sprouts', 'scallions', 'lime', 'roasted peanuts']  , 
        quantity:["1   large    spaghetti squash, halved and seeded ","1/4  cup    peanut oil","1   tablespoon    Thai fish sauce","2   teaspoons   gluten-free reduced-sodium tamari soy sauce","1/2  teaspoon    red pepper flakes","1   large    egg, beaten ","2       garlic cloves, minced ","4   ounces    boneless skinless chicken breasts, roughly chopped ","  sea salt","4   ounces    raw shrimp, peeled, deveined, and roughly chopped ","2   large    carrots, peeled and shredded ","2   cups    mung bean sprouts","6       scallions, finely chopped ","1       lime, halved ","1/4  cup    roasted peanuts (to garnish)"]  , 
        serving_size: "1 (421 g)" , 
        servings: "6" , 
        steps:['Brush the cut sides of the squash with 1 tablespoon of the peanut oil.', 'Place the squash, cut sides down, on a baking sheet and roast for 30 - 40 minutes.  The squash is cooked when a knife easily pierces through the skin and flesh.  Let cool, use a fork to shred the flesh into spaghetti like strands, and set aside.', 'In a small bowl, stir together the fish sauce, tamari, and red pepper flakes.', 'Set aside.', 'Heat 1 tablespoon of the oil in a large wok or large cast-iron pan over medium-high heat.  Add the egg and cook until scrambled, 30-60 seconds, breaking it up.  Transfer to a plate and reserve.', 'Pour another tablespoon of the oil into the wok and stir-fry the garlic until aromatic.  Season the chicken with a little salt and add it to the pan.  Stir-fry the chicken until golden brown, about 4 minutes.  Push the chicken to the side and add the shrimp in the center of the pan.  Stir frequently until the shrimp are pink and firm, and about 3 minutes.', 'Toss in the carrots and stir-fry them 1 minute.  Transfer the contents of the pan to a platter.', 'Add the remaining 1 tablespoon oil to the wok, spread the squash strands out in the pan and cook for 1 minute without stirring.  Flip the pile of strands over and brown them for 2 minutes on the other side.', 'Pour the sauce into the wok and add the chicken-shrimp mixture, egg, bean sprouts, and scallions.  Gently toss to heat through, and squeeze the juice of one lime half over all.  Garnish with the peanuts and serve with the other half lime available for table-side squeezing.  Any leftovers can be refrigerated for up to 4 days.']   
        },
        {
        name: "Hamburger-Vegetable Soup With Tortellini" , 
        description: "My mother-in-laws pie crust recipe." , 
        ingredients:['pork chops', 'cooking apples', 'onions', 'salt', 'fresh ground pepper', 'brown sugar', 'parsley', 'thyme', 'bay leaf', 'cider']  , 
        quantity:["6   slices   sparerib pork chops","4      sharp cooking apples","3       onions","  salt","  fresh ground pepper, to taste ","1   tablespoon    brown sugar","  parsley","  thyme","  bay leaf","6   fluid ounces   dry still cider (in Ireland, this would be hard alcoholic cider)"]  , 
        serving_size: "1 (443 g)" , 
        servings: "6" , 
        steps:['Tie parsley, thyme and bay leaf in a bunch.', 'Cut the outside fat and rind from the sparerib chops and cut them into thin strips (reserve the fat).', 'Peel, core and slice the apples thinly and cut the onions into thin slices.', 'Season the chops with salt and pepper.', 'Butter a wide casserole dish, put in a layer of apple slices, sprinkle them with half the sugar and spread half the onions over the top.', 'Season with salt and pepper and place the chops on top.', 'Place the bunch of herbs in the centre.', 'Cover with more onions, more apples and the remaining sugar.', 'Place the pieces of reserved pork fat criss-crossed in a lattice over the top, pour in the cider, cover the pot and bake at 180Â°C/ 350Â°F/ Gas Mark 4 for for 1 hour.', 'Lower the heat to 150Â°C/ 300Â°F/ Gas Mark 2 and cook for a further hour.', 'Skim off the excess fat from the top and turn up the heat to 220Â°C/ 425Â°F/ Gas Mark 7 to crisp the crackling and lightly brown the apples to a pale gold colour.']   
        },
        {
        name: "Chocolate Nut Crumb Bars" , 
        description: "This is a Mediterranean/Greek recipe. Its very easy and can even be cooked in a crockpot. Serve with rice/orzo or mash potatoes and big Greek salad." , 
        ingredients:['round loaf italian bread', 'romaine lettuce', 'roasted red pepper', 'sweet onions', 'provolone cheese', 'salami', 'mortadella', 'salami', 'tomatoes', 'green olives', 'black olives', 'pepperoncini pepper', 'mayonnaise']  , 
        quantity:["1       round loaf Italian bread","10   leaves    romaine lettuce, shredded ","1   cup    roasted red pepper","10      thin slices sweet onions","9      thin slices provolone cheese","10      thin slices italian salami","6   slices    mortadella","11   slices   coppa salami","12   slices    tomatoes","  green olives","  black olives","  pepperoncini pepper","  mayonnaise"]  , 
        serving_size: "1 (95 g)" , 
        servings: "15" , 
        steps:['Cut the bread horizontally into 5 slices.', 'Lay a large piece of plastic wrap on your work surface, the place the bottom layer of bread in the center.', 'Spread with a thin coat of mayonnaise (all layers will get a thin coat- this keeps the bread from getting soaked with juices), 1/2 the romaine, the roasted red peppers and the onion.', 'Add the next slice of bread, coat with mayonnaise, then all the provolone and salami.', 'Add the next slice, coat with mayo, then the remaining romaine, and the mortadella.', 'Next slice, mayo, tomato, coppa.', 'Top with the last slice of bread, press down on the sandwich lightly with your hands.', 'Wrap very tightly in plastic wrap, and refrigerate for at least 1 hour, but preferably 3-4.', 'Slice and serve with the olives and pepperoncini.']   
        },
        {
        name: "Angellas Sinful Shortbread Tarts With Cheese" , 
        description: "Adapted from Taste of Home.  We love these old fashioned tasty muffins.  I substitute freshly ground whole grain flour for the all-purpose.  These tender muffins freeze well. **PLEASE NOTE** If you substitute store-bought wheat flour for the all-purpose, you do not need to add the additional amount of flour - just use the same amount as all-purpose." , 
        ingredients:['lean ground beef', 'yellow onion', 'vegetable oil', 'tomatoes', 'beef stock', 'tomato juice', 'dried thyme', 'salt', 'fresh ground pepper', 'worcestershire sauce', 'tabasco sauce', 'frozen mixed vegetables', 'cheese-filled tortellini', 'parmesan cheese']  , 
        quantity:["1   lb    lean ground beef","1   cup   chopped yellow onion","1   teaspoon    vegetable oil, if needed ","1 (14 1/2  ounce) can   tomatoes, coarsely chopped, with juice ","6   cups    beef stock or 6   cups    broth","2   cups    tomato juice","1/2-1   teaspoon    dried thyme","1   teaspoon    salt","  fresh ground pepper","2   teaspoons    Worcestershire sauce","  Tabasco sauce (to taste)","1 (10   ounce) package   frozen mixed vegetables, rinsed  (I use soup vegetables)","1 (9   ounce) package   cheese-filled tortellini"," fresh grated parmesan cheese, for topping "]  , 
        serving_size: "1 (978 g)" , 
        servings: "1" , 
        steps:['In a large soup pot over medium heat, brown the ground beef with onion for about 5 minutes, or until meat is no longer pink; stir to crumble meat as you cook (add oil if needed to keep meat from sticking).', 'Add in tomatoes, stock, tomato juice, thyme, salt, pepper, Worcestershire sauce, and Tabasco sauce.', 'Bring to a boil.', 'Lower heat to medium-low; simmer, uncovered, for 30 minutes.', 'Increase heat to med-high; add in vegetables and tortellini; cook, uncovered for about 10 minutes or until vegetables/tortellini are tender.', 'Ladle into individual soup bowls; sprinkle cheese on top.']   
        },
        {
        name: "Sweet Potato and Pineapple Korma" , 
        description: "French green lentils allow you to cook this stew long enough to develop the flavors but will not get mushy. Flavorful, healthy and easy. A good warm supper when served with oven toasted french bread slices and a salad." , 
        ingredients:['butter', 'flour', 'sugar', 'salt', 'semisweet chocolate morsels', 'sweetened condensed milk', 'vanilla', 'walnuts']  , 
        quantity:["1   cup    butter or 1   cup    margarine, softened ","2   cups    flour","1/2  cup    sugar","1/4  teaspoon    salt","12   ounces    semisweet chocolate morsels, divided ","1 (14   ounce) can   sweetened condensed milk","1   teaspoon    vanilla","1   cup    walnuts or 1   cup    pecans, chopped "]  , 
        serving_size: "1 (1277 g)" , 
        servings: "1" , 
        steps:['Beat butter in a large mixing bowl until creamy.', 'Beat in flourm, sugar and salt until crumbly.', 'With floured fingers, press 2 cups crumb mixture onto bottom of a greased 13x9" baking dish.', 'Reserve remaining crumb mixture.', 'Bake in preheated 350 degree oven for 10-12 mins or until golden brown.', 'Warm 1-1/2 cups morsels and sweetend condensed milk in small heavy saucepan over low heat, stirring until smooth.', 'Stir in vanilla.', 'Spread over hot crust.', 'Stir walnuts and remaining morsels into reserved crumb mixture, sprinkle over chocolate filling.', 'Bake in 350 degree oven for 25-30 minutes or until center is set.', 'Cool in pan on wire rack.', 'Cut into 2" squares.']   
        },
        {
        name: "Quick &quot;beef&quot; Stir Fry" , 
        description: "I found this on the back of an Albers Cornmeal box. Sweet and fluffiness makes this a great combo for any meal. Works with cornbread as well. Copyright word-for-word by Albers. Im not sure if it works with other cornmeal, but Id reccomend Albers." , 
        ingredients:['butter', 'icing sugar', 'flour', 'cornstarch', 'cream cheese', 'sweetened condensed milk', 'lemon juice', 'vanilla']  , 
        quantity:["","1   cup    butter","1/2  cup    icing sugar","1 1/2  cups    flour","1   tablespoon    cornstarch","","1 (8   ounce) package   cream cheese","1 (5   ounce) can   sweetened condensed milk (Eagle Brand)","1/2  cup    lemon juice","1   teaspoon    vanilla"]  , 
        serving_size: "1 (128 g)" , 
        servings: "4" , 
        steps:['Use tiny muffin tins â€“ approximately 1 Â½â€ diameter.  This would yield about 3 dozen.', 'Mix ingredients for shortbread in mixmaster.  (butter, icing sugar, flour, cornstarch) Donâ€™t roll but pat into muffin tins with your fingers to form shells.  Prick the bottoms with a fork and bake 20 minutes at 300 to 325 degrees.  During baking time, prick bottoms again if the shells puff up.  These may be made in large quantity and frozen.', 'Cheese â€˜N Fruit Filling: In a large bowl beat cheese until fluffy.  Gradually beat in milk.  Stir in lemon juice and vanilla.', 'O.K. Now, fill tarts at least 2 hours before serving to allow flavors to blend.  Top with fresh fruit (i.e. kiwi, strawberries).']   
        },
        {
        name: "Simple Beef Stew" , 
        description: "From Companys Coming.  To spread on meat." , 
        ingredients:['curry paste', 'sweet potatoes', 'coconut milk', 'water', 'pineapple', 'coriander']  , 
        quantity:["2   tablespoons   korma curry paste","2       sweet potatoes, diced ","400   g    coconut milk","200   ml    water","400   g    pineapple, drained ","1/4  cup    coriander"]  , 
        serving_size: "1 (516 g)" , 
        servings: "8" , 
        steps:['Fry the paste and add the potato.', 'Put in the milk and water and simmer for 15 minutes', 'Add pineapple and simmer for 2 minutes.', 'season if required.', 'scatter with coriander and serve with rice or naan.']   
        },
        {
        name: "Frans Easy Shortbread Bars" , 
        description: "This recipe was handed down to me by my mother.  Holidays wouldnt be complete at our house, without it.  A fancy way to serve broccoli that kids and adults will enjoy.  I always get requests for this recipe.  Can be made ahead and refrigerated the day before, but needs more baking time if you do this. You just want to make sure it is completely set in the center.  Top will be a light brown.  You can also substitute any favorite cheese for the cheddar.  Ive used a pre-mixed shredded Mexican mix for convenience." , 
        ingredients:['yellow bell pepper', 'green bell pepper', 'red bell pepper', 'onion', 'garlic clove', 'mushrooms', 'morningstar farms grillers', 'vegetable broth', 'low sodium soy sauce']  , 
        quantity:["1/2      yellow bell pepper, sliced  (or frozed equiv)","1/2      green bell pepper, sliced  (or frozed equiv)","1/2      red bell pepper, sliced  (or frozed equiv)","1 -2   small    onion","1 -2       garlic clove","12       mushrooms, close-cap ","12   ounces    Morningstar Farms grillers, frozen beef strips ","1/4-1/2  cup    vegetable broth (add more if needed)","  low sodium soy sauce (to taste)"]  , 
        serving_size: "1 (1195 g)" , 
        servings: "1" , 
        steps:['Spray skillet or wok with cooking spray, heat over med-high heat until pan sizzles when a small water drops are placed in pan.', 'Saute bell peppers, onion and garlic for approx 5 min(if frozen peppers are used they will be softer than if fresh is used).', 'Add mushrooms, "beef" strips and vegetable broth and soy sauce.  Adjust temperature to ensure mixture doesn\'t burn.', 'Continue cooking until "beef" strips thaw and broth is reduced to desired amount.', 'Serve over rice or noodles.', 'NOTE: This is a meat-free dish.  The "beef" strips are made with soy.']   
        },
        {
        name: "Chicken Curry (Cambodian)" , 
        description: "Kraft recipe I found...tweaked a bit for us and good for a spring/summer party." , 
        ingredients:['olive oil', 'butter', 'flour', 'salt and pepper', 'lean beef', 'onions', 'garlic cloves', 'balsamic vinegar', 'beef stock', 'carrots', 'potatoes', 'crushed tomatoes in puree', 'bay leaf']  , 
        quantity:["2   tablespoons    olive oil","2   tablespoons    butter","1/4  cup    flour","  salt and pepper","1 1/2  lbs   super lean beef","3       onions","4       garlic cloves","3   tablespoons    balsamic vinegar","4   cups    beef stock","6       carrots","4       potatoes","28   ounces    crushed tomatoes in puree","  bay leaf"]  , 
        serving_size: "1 (623 g)" , 
        servings: "6" , 
        steps:['Chop veggies. Cube meat if not already done.', 'Heat oil and butter.', 'Coat meat in flour and season with salt and pepper.', 'Brown meat in oil/butter.', 'Add onions and garlic and keep cooking until translucent and meat is  well browned on all sides.', 'Add vinegar and stir it around.', 'Add stock, bay leaf and veggies.', 'Bring to boil and then reduce to a simmer for about 1 hour.']   
        },
        {
        name: "Quinoa Salad" , 
        description: "Vegetarians and carnivores unite!  This side-by-side creamy buffalo and blue cheese dip is perfect for crackers, chips, pretzels, fresh veggies, and more.  My sister cooked up some skewers of shrimp, chicken and onions over the weekend, and we found this to be a wonderful dipping sauce for them.  If you like it hot, try the spicy buffalo side, or cool off with the blue cheese side.  My personal preference is to dip a pretzel right in the middle for some of each.  Or you can mix the two dips completely together.  If you like, use light sour cream and dressing for a healthier dip. This recipe was inspired by a Wind & Willow dip mix.  Makes 2 cups." , 
        ingredients:['icing sugar', 'butter', 'flour', 'rice flour', 'sugar']  , 
        quantity:["1   cup    icing sugar","2   cups    butter","3 1/2  cups    flour","1   cup    rice flour","2   tablespoons    sugar"]  , 
        serving_size: "1 (82 g)" , 
        servings: "8" , 
        steps:['Cream icing sugar and butter until fluffy.', 'Combine flours and add to the butter mixture, in small portions.', 'Turn batter out into a sided 15 x 9 cookie pan or jelly roll pan.  Press to the sides and smooth with the back of a spoon.', 'Score into bars with a sharp knife and prick the surface with a fork.  Sprinkle with the 2 tbsp of sugar.', 'Bake 10 minutes at 350Â°, then lower the oven to 300Â°.  Bake for 30 - 40 minutes.', 'Remove from oven and immediately cut along the scored lines.', 'Cool, then store in an airtight container.']   
        },
        {
        name: "Broccoli Salad" , 
        description: "Great american favourite. Try it with lemon, lime, orange, grapefruit, or a mix of flavours!  Spice it up with cloves and/or cinnamon!" , 
        ingredients:['onions', 'garlic', 'butter', 'chili powder', 'curry powder', 'salt', 'coconut milk', 'fryer chickens', 'potatoes', 'peanuts']  , 
        quantity:["4   small    onions, peeled and cut into eighths ","2   teaspoons   finely minced garlic","1   teaspoon    butter","1   tablespoon    chili powder","2   tablespoons    curry powder","2   teaspoons    salt","3   cups    coconut milk","2 (2   lb)    fryer chickens (legs, wings or thighs) or 2 (2   lb)    chicken parts (legs, wings or thighs)","4       potatoes, peeled and cubed ","1/2  cup   chopped peanuts"]  , 
        serving_size: "1 (159 g)" , 
        servings: "4" , 
        steps:['Cook onions, garlic and butter on medium heat until onions are soft and yellow.', 'Stir in curry, chili powder and salt.', 'Add 2 cups of the coconut milk.', 'Add the chicken and the potatoes.', 'Cover tightly and simmer for 20-30 minutes, stirring occasionally, until chicken is tender.', 'Add remaining 1 cup of coconut milk and chopped peanuts.', 'Simmer for 10 minutes, then serve on Basmati rice!', "PS-You could easily use cut up chicken breasts, just watch the cooking time so they don't get too dry!"]   
        },
        {
        name: "Salmon Patties" ,  
        description: " description" , 
        ingredients:['quinoa', 'water', 'fresh mint leaves', 'fresh parsley leaves', 'fresh cilantro leaves', 'red onions', 'dried cranberries', 'walnuts', 'olive oil', 'fresh lemon juice', 'salt', 'fresh ground black pepper']  , 
        quantity:["1   cup    quinoa","1 1/4  cups    water","2   tablespoons    fresh mint leaves, finely minced ","1 1/2  tablespoons    fresh parsley leaves, finely minced ","1   tablespoon    fresh cilantro leaves, finely minced ","3   tablespoons    red onions, finely chopped ","3   tablespoons    dried cranberries, chopped ","3   tablespoons    walnuts, chopped ","3   tablespoons    olive oil","1/4  cup    fresh lemon juice","  salt","  fresh ground black pepper"]  , 
        serving_size: "1 (125 g)" , 
        servings: "5" , 
        steps:['Put the quinoa in a pot with the water. Bring to a boil, cover, lower the heat to low, and cook covered for 20 minutes.', 'Remove cooked quinoa immediately from pot into a large bowl, and air it with a wooden spoon to stop the cooking process. Let cool for a few minutes.', 'Add the onion, herbs, dried cranberries and walnuts. Mix well with a wooden spoon.', 'Add olive oil, lemon juice, salt and pepper. Taste and add more lemon juice if needed.']   
        },
        {
        name: "Nan-E Gerdui - Traditional Persian Walnut Cookies" , 
        description: "Drizzle with a simple white icing or add some spice by adding fruit peels and/or extracts to icing and perhaps some clove." , 
        ingredients:['broccoli', 'avocado', 'olive oil', 'lemon juice', 'dijon mustard']  , 
        quantity:["4   cups    broccoli","1   medium   ripe avocado","2   tablespoons    olive oil","2   tablespoons    lemon juice","1   tablespoon    Dijon mustard"]  , 
        serving_size: "1 (83 g)" , 
        servings: "5" , 
        steps:['Cut broccoli into bite size pieces.', 'Steam broccoli in pan until crunchy-tender. Drain the broccoli and cool completely.', 'Cube the avocado.', 'Add avocado to broccoli in bowl.', 'Whisk remaining items in a small bowl.', 'Toss the broccoli mix with the dressing.', 'Enjoy!']   
        },
        {
        name: "Middle Eastern Chicken Pot and Butter-Nut Couscous" , 
        description: "This year I finally mastered the art of growing eggplants. The trick I found was to keep them in pots on my porch where the bugs wont eat them as bad. Now that I have them growing good, eggplant Parmesan seemed like the next reasonable step." , 
        ingredients:['canned salmon', 'onion', 'eggs', 'ground pepper', 'fresh lemon juice', 'saltines']  , 
        quantity:["1 (14 3/4  ounce) can   canned salmon","1   medium    onion, chopped ","2       eggs","1   teaspoon    ground pepper","1   tablespoon    fresh lemon juice","36       saltines, crushed  (one sleeve)"]  , 
        serving_size: "1 (424 g)" , 
        servings: "6" , 
        steps:['Empty 1 can salmon with juice into a large bowl and remove bones. Add 2 eggs. Add lemon juice. Stir well. Add onion, pepper, crackers. Stir.', 'Form into 5 - 6 patties 3/4 to 1" thick. Set aside. Let set 5 minutes.', 'In large frying pan heat 1/2 inch cooking oilto medium high temperature When oil is hot, place patties in pan and cook 4 - 5 minutes per side. Make sure they cook all the way through.', 'Serve with more lemon juice.']   
        },
        {
        name: "Caramelized Onion, Gruyere, and Spinach Crustless Quiche" , 
        description: "Here is a simple, in-season, gluten-free bread recipe that will have you coming back for more and more. It is a simple, inexpensive, and tasty way to use up some of those large zucchini from the garden or farmers market this time of year. Enjoy! To find more recipes like this, visit: www.glutenfreehope.blogspot.com" , 
        ingredients:['egg yolks', 'confectioners%27 sugar', 'vanilla extract', 'walnuts', 'pistachios']  , 
        quantity:["5       egg yolks","3/4  cup    confectioners\u0027 sugar","1/4  teaspoon    vanilla extract","2   cups   chopped walnuts","2   tablespoons   ground pistachios (for decoration)"]  , 
        serving_size: "1 (182 g)" , 
        servings: "4" , 
        steps:['In a mixing bowl, beat egg yolks until creamy. Add the confectionersâ€™ sugar, vanilla, and walnuts. Beat thoroughly for a few minutes with a wooden spoon.', 'Preheat oven to 300Â°F Grease a cookie sheet. Drop batter by the teaspoonful on the sheet, leaving about 2 1/2 inches between cookies. Decorate each one with ground pistachios.', 'Bake 15 to 20 minutes in the center of the oven. Remove the cookies from the oven and cool. Lift the cookies off the sheet.', 'Arrange the cookies on a serving dish. Nush-e Jan!']   
        },
        {
        name: "Dutch Shrimp Roulade" , 
        description: "I recieved this tasty-sounding appetizer in and email from Real Simple.  Havent made it yet, but hopefully I will soon!" , 
        ingredients:['extra virgin olive oil', 'boneless skinless chicken thighs', 'onion', 'garlic cloves', 'carrot', 'fresh bay leaf', 'smoked paprika', 'ground cumin', 'coriander', 'ground cinnamon', 'salt %26 freshly ground black pepper', 'dried apricot', 'lemon%2c juice and zest of', 'kalamata olive', 'chicken stock', 'butter', 'pine nuts', 'sliced almonds', 'couscous', 'flat leaf parsley']  , 
        quantity:["1/4  cup    extra virgin olive oil","1 1/2  lbs    boneless skinless chicken thighs, chopped into bite-sized pieces ","1       onion, thinly sliced ","3       garlic cloves, grated ","1   cup    carrot, shredded ","1       fresh bay leaf","1   teaspoon    smoked paprika","1   teaspoon    ground cumin","1   teaspoon    coriander","1   pinch    ground cinnamon","  salt \u0026 freshly ground black pepper","3/4  cup    dried apricot, chopped ","1       lemon, juice and zest of","3/4  cup    kalamata olive, chopped ","4   cups    chicken stock","2   tablespoons    butter","3   tablespoons    pine nuts","1/4  cup    sliced almonds","1 1/2  cups    couscous","1/4  cup    flat leaf parsley, chopped "]  , 
        serving_size: "1 (64 g)" , 
        servings: "12" , 
        steps:['Heat the extra-virgin olive oil in a deep skillet over medium-high heat. When the oil ripples add the chicken and brown 3 to 4 minutes on each side. Add the onions, garlic, carrots, bay leaf and season with spices, salt and pepper, cook 5 to 6 minutes. Stir the fruits into the chicken and vegetables, add the zest of the lemon, olives and 2 1/2 cups of stock. Reduce heat to low and simmer 10 minutes more. Sprinkle with lemon juice and turn off heat. Remove bay leaf.', 'While chicken simmers, melt butter in a sauce pot over medium heat. Add nuts and lightly toast for a couple of minutes. Add 1 1/2 cups stock and bring up to a boil then stir in couscous. Cover and let stand 5 minutes.', 'Serve chicken over couscous, or vice versa, and garnish with parsley.', 'Prep Time:']   
        },
        {
        name: "Quick Quiche Lorraine" , 
        description: "I love quesadillas and frequently make one for my breakfast.  This is a delicious combination I found at simplyrecipes.com in the blog of someone named Elise." , 
        ingredients:['onion', 'frozen spinach', 'gruyere', 'eggs', 'milk', 'nutmeg', 'salt and pepper', 'canola oil']  , 
        quantity:["1 -2       onion, peeled and sliced ","1 (10   ounce) box   frozen spinach, thawed ","1   cup    gruyere, grated ","4       eggs","1 1/2  cups    milk (or cream)","  nutmeg","  salt and pepper","  canola oil"]  , 
        serving_size: "1 (142 g)" , 
        servings: "8" , 
        steps:['Preheat oven to 375 degrees.', 'With a little canola oil in a frying pan over medium high heat caramelize the onions, stirring occasionally. This takes about 15-20 minutes.', 'Squeeze the moisture out of the thawed spinach by wrapping it in a dish towel and squeezing.', 'Beat the eggs and add the milk and whisk well.', 'Season the egg mixture with salt and pepper and a few grinds of fresh nutmeg.', 'Spray or wipe oil all over a deep pie dish.', 'When the onions are well caramelized, place evenly over bottom of pie dish then evenly spread the spinach over the onions and follow up with the cheese.', 'Pour the egg mixture over the top and pop into the oven.', 'Bake until firm in the middle, about 40-45 minutes.', 'Serve with fresh fruit and popovers hot from the oven!']   
        },
        {
        name: "Creamy Ham, Potato &amp; Corn Casserole" , 
        description: "In this classic Thai dish, you can maximize your nutrition by trading carbohydrate rich rice noodles for low-glycemic and vitamin-A-rich spaghetti squash." , 
        ingredients:['butter', 'flour', 'milk', 'salt', 'black pepper', 'eggs', 'gouda cheese', 'shrimp', 'lemon juice', 'cayenne pepper', 'cream cheese', 'greek yogurt', 'chives', 'orange zest', 'lemon']  , 
        quantity:["","3   tablespoons    butter","1/3  cup    flour","1 1/4  cups    milk","  salt, to taste ","  black pepper, freshly ground, to taste ","4       eggs","1/2  cup    gouda cheese, grated  (mature)","","1/2  lb    shrimp, cooked  (either tiny pink or larger but finely chopped)","1   teaspoon    lemon juice","1   pinch    cayenne pepper","3   ounces    cream cheese","1/2  cup    Greek yogurt","1   tablespoon    chives, minced ","1   teaspoon    orange zest, grated ","1       lemon, paper thin slices "]  , 
        serving_size: "1 (421 g)" , 
        servings: "6" , 
        steps:['To make the roulade base: Grease the 8 x 10 inch baking sheet and line with greaseproof paper.', 'Preheat the oven to 390Â°F.', 'Melt the butter in a small pan, stir in the flour and cook for a few minutes. Add the milk and continue stirring; bring to the boil and cook until the mixture thickens.', 'Season with salt and pepper.', 'Transfer to a large bowl and cool slightly.', 'Separate the eggs.', 'Beating thoroughly, add the yolks to the sauce one at a time, then add the cheese.', 'Whisk the egg whites until stiff and fold them into the sauce.', 'Transfer the mixture to the prepared baking sheet spreading it evenly.', 'Bake for 25 minutes or until just golden brown.', 'Turn the cooked roulade base onto a second piece of greaseproof paper, peel off the bottom piece. Cover with clean kitchen towel.', 'Make the filling while the base is baking:', 'Mix the shrimps with the lemon juice and chilli pepper.', 'Beat the cream cheese with the umer, snip the chives and add with the orange zest.', 'Fold in the shrimps and season to taste.', 'Spread the shrimp mixture over the still warm roulade base.', 'Using the greaseproof paper as an aid, roll lengthwise.', 'Transfer to a long serving platter and slice.', 'Garnish with lemon slices.']   
        },
        {
        name: "Cinnamon Toast Ice Cream (Gourmet Magazine)" , 
        description: "In country households until the turn of the nineteenth century or even later, the pig was the gentleman that pays the rent and was a very prized possession. He met his end in the autumn when the main part of the pork would have been pickled or turned into hams to see the family through the winter, but a few dishes for fresh pork survive and this is one of them." , 
        ingredients:['deep dish pie shell', 'bacon', 'onion', 'eggs', 'half-and-half', 'swiss cheese', 'salt and pepper']  , 
        quantity:["1      nine inch frozed deep dish pie shell","8   ounces    bacon","1       onion","6   large    eggs","1   cup    half-and-half","1   cup   shredded swiss cheese","  salt and pepper, to taste "]  , 
        serving_size: "1 (143 g)" , 
        servings: "8" , 
        steps:['Preheat oven to 400Â°F Using a fork prick the inside of the frozen pie crust.', 'Bake for 8 minutes.', 'Remove from the oven and lower oven to 325F.', 'Meanwhile cook the bacon in a medium skillet on medium heat. Drain on paper towels.', 'Add chopped onion and salt and pepper to bacon fat. Saute over medium heat about 5 minutes.', 'Increase to heat to high and cook onions until golden.', 'Transfer onion to pie shell.', 'In a large bowl, beat the eggs with the half and half. Stir in the cheese and cooked bacon.', 'Pour this mixture into pie shell.', 'Bake until set, about 40 minutes.', 'Let stand 10 minutes before slicing.']   
        },
        {
        name: "Salmon With Spinach Stuffing Topping" , 
        description: "A perfect picnic sandwich. Easy to do the night before and refrigerate until ready to go. The flavors just melt together into one wonderful sensation." , 
        ingredients:['potatoes', 'butter', 'flour', 'salt', 'milk', 'worcestershire sauce', 'cooked ham', 'corn', 'cheddar cheese']  , 
        quantity:["6 -8   medium    potatoes, boiled and cubed ","1/4  cup    butter","1/4  cup    flour","1/2  teaspoon    salt","2   cups    milk","1/2  teaspoon    Worcestershire sauce","2   cups    cooked ham, cubed ","1 (10   ounce) can   corn","1   cup    cheddar cheese, grated "]  , 
        serving_size: "1 (357 g)" , 
        servings: "4" , 
        steps:['In a large saucepan, melt butter and add flour and salt. Stir until well blended.', 'Slowly add milk, stirring until thickened.', 'Stir in Wocestershire sauce, potatoes, ham and corn.', 'Pour mixture into a 1 1/2 quart baking dish and sprinkle top with Cheddar.', 'Bake at 350 for 40 minutes.']   
        },
        {
        name: "Rose and Jasmine Tisane" , 
        description: "Easy, tasty, and left-overs freeze well." , 
        ingredients:['whole milk', 'cinnamon sticks', 'sandwich bread', 'unsalted butter', 'light brown sugar', 'ground cinnamon', 'egg yolks', 'granulated sugar', 'molasses', 'heavy cream']  , 
        quantity:["2   cups    whole milk","2 (3   inch)    cinnamon sticks","5   slices   firm white sandwich bread","1/4  cup    unsalted butter, melted  (1/2 stick)","2   tablespoons   packed light brown sugar","1/2  teaspoon    ground cinnamon","6   large    egg yolks","1/2  cup    granulated sugar","1/4  teaspoon    molasses","1   cup    heavy cream"]  , 
        serving_size: "1 (237 g)" , 
        servings: "2" , 
        steps:['Bring milk and cinnamon sticks to a boil in a 2-quart heavy saucepan, then remove from heat and let steep, covered, 30 minutes.', 'While milk steeps, put oven racks in upper and lower thirds of oven and preheat oven to 300Â°F', 'Cut 3 slices bread into 1/4-inch cubes and transfer to a bowl. Quarter remaining 2 slices and pulse in a food processor to make bread crumbs. Whisk together butter, brown sugar, and ground cinnamon in another bowl. Drizzle 3 tablespoons butter mixture over bread cubes and stir to lightly coat. Spread in 1 layer in a shallow baking pan. Add bread crumbs to remaining butter mixture and stir to evenly coat. Spread crumbs evenly in another shallow baking pan.', 'Bake bread cubes and crumbs, stirring occasionally and switching position of pans halfway through baking, until golden brown and crisp, about 25 minutes total. Cool in pans on racks, then transfer bread crumbs to a bowl.', 'Return milk to a boil, then pour over bread crumbs and let stand 10 minutes. Pour milk through a fine-mesh sieve into saucepan, pressing hard on solids, then discarding them.', 'Whisk together yolks, granulated sugar, molasses, and a pinch of salt in a bowl. Return milk mixture to a boil and add half to yolk mixture in a slow stream, whisking until combined well. Add yolk mixture in a slow stream to milk in saucepan, whisking, then cook over low heat, stirring constantly, until mixture is thickened and thermometer registers 170 to 175Â°F (do not let boil).', "Remove from heat and immediately stir in cream, then pour custard through fine-mesh sieve into a metal bowl. Quick-chill custard by setting bowl into a larger bowl of ice and cold water and stirring occasionally until cold, about 15 minutes. Freeze custard in ice cream maker until almost firm. Fold bread cubes into ice cream, then transfer to an airtight container and put in freezer to harden, at least 2 hours.  Though the toast is crunchiest the first 2 days after it's made, the ice cream keeps 1 week."]   
        },
        {
        name: "Sweet Asian Chicken" , 
        description: "These are 3 layers and an appealing look to each bar.  Great for potlucks, buffets, entertaining, bake sales or when you want something a little different from the ordinary choc chip cookie." , 
        ingredients:['celery ribs', 'onion', 'bread', 'frozen spinach', 'salt and pepper', 'vegetable oil', 'salmon fillet', 'boiling water', 'chicken bouillon cube', 'water', 'lemon juice', 'dijon mustard', 'chicken bouillon cube', 'milk', 'butter']  , 
        quantity:["","2       celery ribs, finely chopped ","1/2  large    onion, finely chopped ","6   slices    bread, buttered and cubed ","8   ounces    frozen spinach, drained ","  salt and pepper","1   teaspoon    vegetable oil","1   large    salmon fillet","1   cup    boiling water","1       chicken bouillon cube","","1/2  cup    water","1   tablespoon    lemon juice","1/8  cup    Dijon mustard","1       chicken bouillon cube","1/8  cup    milk","1/2  cup    butter"]  , 
        serving_size: "1 (337 g)" , 
        servings: "4" , 
        steps:['Saute celery and onion in butter.  Add bread, spinach, salt and pepper and toss.', 'Rub salmon with oil.  Place skin side down in 9x13 pan.  Top with stuffing mixture.  Dissolve bouillon cube in water and pour around salmon filet.', 'Bake at 350 degrees for 45 minutes.', 'For sauce, combine water, lemon juice, mustard, and bouillon cube in a small saucepan.  Bring to a boil and cook for 5 minutes.', 'Add milk and return to boil.  Remove from heat and stir in butter.']   
        },
        {
        name: "Chicken in Orange-Riesling Sauce" , 
        description: "Pretty to look at -- more fun to eat! Angella  makes these delicious tarts that are unspeakably yummy. We begged her for the recipe. I still havent made it but I decided that the world would be better off if I posted it anyways. Enjoy!" , 
        ingredients:['rose petals', 'jasmine flower', 'tap water']  , 
        quantity:["2   tablespoons    rose petals","1 1/2  tablespoons    jasmine flower, blossoms ","3   cups   fresh tap water"]  , 
        serving_size: "1 (209 g)" , 
        servings: "4" , 
        steps:['Rinse out the inside of a small tea pot with hot water.', 'Bring 24 ounces of fresh water to a boil, and pour over rose petals and jasmine blossoms in a tea pot.', 'Let steep 5-10 minutes, then strain into a pretty china tea cup and enjoy!']   
        },
        {
        name: "Crockpot Ham and Bean Soup" , 
        description: "Fantastic in winter and an unusual dish. Very easy to make and double can also be frozen." , 
        ingredients:['chicken', 'bourbon', 'soy sauce', 'ginger', 'garlic clove', 'vinegar', 'brown sugar', 'cornstarch', 'water', 'oil']  , 
        quantity:["2   lbs    chicken, boneless, chopped ","1/2  cup    Bourbon","1/2  cup    soy sauce","1   teaspoon    ginger, grated ","1/2      garlic clove, chopped ","1/4  cup    vinegar","1/4  cup    brown sugar","1   tablespoon    cornstarch","1/4  cup    water","  oil"]  , 
        serving_size: "1 (423 g)" , 
        servings: "6" , 
        steps:['Add bourbon, soy sauce, ginger, garlic, vinegar and brown sugar to chicken. Let marinate about 30 minutes â€“ 2 hours. Drain chicken and reserve marinade.', 'Preheat a large skillet or wok. Drizzle wok or skillet with oil and add chicken. Stir fry until browned.', 'Add marinade. Stir to combine and bring to a boil. Reduce to a simmer and simmer for 15-20 minutes.', 'Dissolve 1 tablespoon cornstarch in 1/4 cup water and add to chicken. Bring back to a boil and continue to simmer until thickened.', 'Serve chicken over rice and garnish with chopped green onions if desired.']   
        },
        {
        name: "Summer Tomato Sauce" , 
        description: "A nutritious low fat recipe thats quick and easy to make." , 
        ingredients:['orange', 'boneless skinless chicken breast halves', 'salt', 'fresh ground black pepper', 'unsalted butter', 'shallot', 'riesling wine', 'fresh marjoram']  , 
        quantity:["1   large    orange","4       boneless skinless chicken breast halves (1 1/2 lb.)","  salt","  fresh ground black pepper","3   tablespoons    unsalted butter","1       shallot, minced ","1/2  cup    riesling wine","1   tablespoon   finely chopped fresh marjoram"]  , 
        serving_size: "1 (183 g)" , 
        servings: "6" , 
        steps:['Finely grate 2 teaspoons orange zest and squeeze Â¼ cup orange juice from the orange.', 'Set the zest and juice aside.', 'Place 1 chicken breast half between 2 sheets of waxed paper.', 'Using meat pounder or the flat bottom of a heavy pan, lightly pound the chicken until it is about Â½ inch thick.', 'Repeat with the remaining chicken breast halves.', 'Season generously with salt and pepper.', 'In a large frying pan over med-high heat, melt 2 T butter.', 'Working in batches, if needed, to avoid crowding, add the chicken and cook, turning once, until golden on both sides and opaque throughout, 6-8 minutes total.', 'Transfer the chicken to a plate.', 'Melt the remaining 1 T butter in the pan over medium heat.', 'Add the shallot and sautÃ© until lightly browned, about 1 minute.', 'Add the wine, marjoram, and reserved orange juice and zest.', 'Cook, stirring to scrape up the browned bits on the pan bottom, until the sauce is bubbly and slightly reduced, about 3 minutes.', 'Return the chicken and any juices from the plate to the pan and heat through, about 1 minute.', 'Season to taste with salt and pepper.', 'Transfer to a platter, spoon the sauce over the chicken and serve.']   
        },
        {
        name: "Jungle Gems Snack Mix" , 
        description: "This is my simplified version of beef stew." , 
        ingredients:['ham bone', 'dried great northern beans', 'water', 'chicken bouillon cubes', 'dried thyme', 'dried marjoram', 'pepper', 'rubbed sage', 'season-all salt', 'onion', 'carrots', 'celery ribs', 'potatoes']  , 
        quantity:["1   large   meaty ham bone","2   cups    dried great northern beans","8   cups    water","4       chicken bouillon cubes","1   teaspoon    dried thyme","1/2  teaspoon    dried marjoram","1/2  teaspoon    pepper","1/4  teaspoon    rubbed sage","1/4  teaspoon    Season-All salt","1       onion, chopped ","3       carrots, chopped ","2       celery ribs, choppped ","2   large    potatoes"]  , 
        serving_size: "1 (19 g)" , 
        servings: "20" , 
        steps:['Place ham bone in crockpot.', 'Cook overnight on low.', 'Remove the meat from the bone.', 'Rinse out the crockpot.', 'Add the ham meat and all of the other ingredients.', 'Cook on high 6-8 hours.', 'Enjoy!']   
        },
        {
        name: "Low Calorie Low Fat Carrot Cupcakes" , 
        description: "I received this recipe from a friend.  It is by far,  the tastiest and the easiest shortbread recipe.  It also works very well in moulded shortbread pans.  Its the only one I use.  Freezes well too." , 
        ingredients:['tomatoes', 'olive oil', 'dried oregano', 'dried parsley', 'dried basil', 'garlic clove', 'parmesan cheese', 'salt %26 pepper', 'pasta']  , 
        quantity:["2   lbs   ripe tomatoes, peeled \u0026 diced ","6   tablespoons    olive oil","1   teaspoon    dried oregano","1   tablespoon    dried parsley","1   tablespoon    dried basil","1       garlic clove, peeled \u0026 minced ","3   tablespoons   grated parmesan cheese, plus more for the table ","  salt \u0026 pepper","1   lb   good quality pasta"]  , 
        serving_size: "1 (92 g)" , 
        servings: "10" , 
        steps:['Combine all the ingredients, except the pasta.', 'Marinate for at least 2 hours.', 'The longer, the better.', 'Marinate at room temperature.', 'Cook the pasta in salted water until"al dente".', 'Drain thouroughly&amp; transfer to a bowl.', 'Add the sauce and toss.', 'Adjust your seasonings to taste and serve with extra parmesan cheese.', 'You may use spaghetti, zitis, shells or rotini.']   
        },
        {
        name: "Mediterranean Vegetable Pie" , 
        description: "This is a great, simple curry, with only a little bite!" , 
        ingredients:['cheerios toasted oat cereal', 'animal crackers', 'miniature pretzel twists', 'crackers', 'fruit snacks', 'raisins']  , 
        quantity:["6   cups   frosted Cheerios toasted oat cereal","1 1/2  cups    animal crackers","1 1/2  cups    miniature pretzel twists","1 1/2  cups   teddy grahams snack crackers","1 (5 1/2  ounce) box  sunkist fruit snacks","1   cup    raisins"]  , 
        serving_size: "1 (268 g)" , 
        servings: "6" , 
        steps:['Mix and munch.', 'Store unused portions in an airtight container.']   
        },
        {
        name: "Baked Taco Sandwiches" , 
        description: "The secret is to use fresh herbs, and cook the quinoa just right. Great for picnics, or served as a side dish. Keeps well in the fridge for a couple of days (maybe longer - but it never lasts more than that in our house :-)" , 
        ingredients:['cake flour', 'cake flour', 'baking powder', 'baking soda', 'salt', 'cinnamon', 'allspice', 'egg whites', 'splenda sugar substitute', 'applesauce', 'butter', 'honey', 'vanilla extract', 'canola oil', 'carrots', 'walnuts', 'pam cooking spray']  , 
        quantity:["3/4  cup    cake flour, plus ","2   tablespoons    cake flour","1   tablespoon    baking powder","1/2  teaspoon    baking soda","1/2  teaspoon    salt","1/2  teaspoon    cinnamon","1/4  teaspoon    allspice","4       egg whites","3/4  cup    Splenda sugar substitute","3   tablespoons    applesauce","3   tablespoons    butter","1/2  cup    honey","1   teaspoon    vanilla extract","1   tablespoon    canola oil","2 1/4  cups   shredded carrots","1/3  cup   chopped walnuts"," fat free butter flavor Pam cooking spray"]  , 
        serving_size: "1 (227 g)" , 
        servings: "4" , 
        steps:['Preheat oven to 350Â°F.', 'In medium bowl, combine: flour, baking powder, baking soda, salt, cinnamon, and allspice.', 'In a large bowl, whisk together Splenda, applesauce, honey, vanilla extract, egg WHITES, and canola oil.', 'Stir in the flour mixture.', 'Stir in carrots.', 'Stir in walnuts.', 'Spray muffin tray with fat free butter flavor PAM.', 'Pour batter into muffin tray and bake for 40 minutes, or until toothpick comes out clean.']   
        },
        {
        name: "Cucumber Yogurt Dip" , 
        description: "This is s treat! Great salad thats pretty healthy to eat." , 
        ingredients:['eggplant', 'salt', 'onion', 'green pepper', 'zucchini', 'garlic', 'oil', 'tomatoes', 'oregano', 'basil', 'salt', 'pepper', 'pie crust mix', 'parmesan cheese', 'mozzarella cheese']  , 
        quantity:["1   lb    eggplant, peeled 1/4 inch slices ","1   teaspoon    salt","1   large    onion, sliced ","1       green pepper, seeded and sliced ","1/2  lb    zucchini, sliced ","2   cloves    garlic, minced ","3/4  cup    oil","1   lb    tomatoes, cored seeded,sliced in 8 ths ","3/4  teaspoon    oregano","3/4  teaspoon    basil","1/2  teaspoon    salt","1/4  teaspoon    pepper","1   package    pie crust mix","1/2  cup   grated parmesan cheese","2   cups   shredded mozzarella cheese"]  , 
        serving_size: "1 (106 g)" , 
        servings: "4" , 
        steps:['Place eggplant slices between several thickness of paper toweling; sprinkle with 1 teaspoons salt.', 'Weigh down with something flat and heavy; let stand 30 minutes.', 'Cut into 1/4 inch cubes.', 'Heat 1/4 Cup oil in a large skillet.', 'Add eggplant all at once.', 'Quickly toss to coat.', 'Cook, stirring constantly until tender (about 5 minutes); remove to large bowl.', 'Pour remaining oil into skillet, add onion, green pepper, zucchini, and garlic.', 'Cook, stirring constantly, until tender (about 5 minutes).', 'Set aside.', 'Combine oregano, basil, remaining salt, and pepper in measuring cup.', 'Set aside.', 'Prepare crust according to directions for a 2 crust pie.', 'Divide dough into 2 balls, 1 slightly larger than the other.', 'roll out larger into 12 inch circle; fit into 10 inch pie plate.', 'Trim overhang to 1/2 inch.', 'Sprinkle with 3 tablespoons of Parmesan.', 'Spoon half eggplant into pie plate; then half vegetables; sprinkle with half of herbs mixture, 1 tablespoons parmesan and half mozzarella.', 'Repeat, reserving 1 tablespoons parmesan.', 'Roll out remaining pastry; cut into 1/2 inch strips; arrange lattice fashion over pie; trim to within 1/2 inch of plate; turn edges under; flute.', 'Brush lattice strips with water; sprinkle with remaining parmesan.', 'Bake at 425 degrees F.', 'for 25 minutes or until pastry is golden brown and pie just begins to bubble.', 'Let stand 15 minutes before serving.']   
        },
        {
        name: "Apple Crepes" , 
        description: "Yum!" , 
        ingredients:['ground beef', 'taco seasoning mix', 'bisquick baking mix', 'cold water', 'cheddar cheese', 'sour cream', 'lettuce', 'diced tomato', 'salsa']  , 
        quantity:["1   lb    ground beef","1 1/4  ounces    taco seasoning mix","1   cup    Bisquick baking mix","1/3  cup    cold water","1   cup    cheddar cheese, shredded ","  sour cream"," shredded lettuce","  diced tomato","  salsa"]  , 
        serving_size: "1 (54 g)" , 
        servings: "16" , 
        steps:['Cook and drain ground beef.', 'Add taco seasoning and water as directed on seasoning package. Simmer about 5 minutes.', 'Meanwhile, mix Bisquik and cold water. Pat into greased 8x8 pan.', 'Top with cooked meat mixture.', 'Bake at 375 degrees about 25 minutes, until a toothpick inserted into the crust comes out clean.', 'Sprinkle with shredded cheese. Return to oven to melt, about 5 minutes.', 'Serve with your choice of taco toppings.']   
        },
        {
        name: "Another Bread Bowl" , 
        description: "This really is a Persian classic & is easy to make. This recipe comes from the book New Food of Life by famous Iranian cook & bestselling author Najmieh Batmanglij." , 
        ingredients:['plain yogurt', 'lemon%2c juice of', 'garlic cloves', 'cucumber', 'dried dill', 'salt %26 pepper']  , 
        quantity:["8   ounces    plain yogurt, drained ","1/2      lemon, juice of","2       garlic cloves, finely grated ","1/2      cucumber, seeded and chopped fine ","1   teaspoon    dried dill","  salt \u0026 pepper"]  , 
        serving_size: "1 (109 g)" , 
        servings: "12" , 
        steps:['to drain the yogurt, line a mesh colandar with cheesecloth or a coffee filter and hang over a bowl. Let the yogurt drain at least an hour or two, but no big deal if it is easier for you the night before. If that is the case, make sure to cover the top and leave it in the fridge.', 'This can be skipped if you can get your hands on real Greek yogurt, which is thicker than most commerical brands.', 'Place the now thickened yorgurt to a bowl and add the other ingredients. Best if it sits for a bit to let the flavors combine, but with me, it is likely that it will get eaten long before.', 'You may keep leftovers in the fridge, but I find the raw garlic can get a bit intense upon sitting. Not that that is a bad thing, but consider yourself warned.']   
        },
        {
        name: "Mama Ortegas Green Chile Quesadillas" , 
        description: "This is a full meal and so good!!" , 
        ingredients:['eggs', 'milk', 'flour', 'cognac', 'butter', 'sugar', 'vanilla', 'tapioca pudding', 'apples', 'brandy', 'cinnamon', 'butter', 'sugar']  , 
        quantity:["","2       eggs","2/3  cup    milk","3/4  cup    flour","2   teaspoons    cognac or 2   teaspoons    brandy","2   tablespoons   melted butter","2   tablespoons    sugar","1   teaspoon    vanilla","","5   ounces    tapioca pudding","2   cups   finely diced apples","1/4  teaspoon    brandy or 1/4  teaspoon    rum flavoring","1/2  teaspoon    cinnamon","1   tablespoon    butter","2   teaspoons    sugar"]  , 
        serving_size: "1 (44 g)" , 
        servings: "10" , 
        steps:['Combine all ingredients below crepe mixture until smooth. Make shells like you would make manicotta shells. Yield 16-18 crepes.', 'Prepare pudding as directed. Saute apples about 10 minutes. Add sugar and seasonings. Combine apples and pudding; mix well and chill. Makes enough filling for 8 dessert crepes.', 'Just before serving, divide mixture evenly on crepes and pocket fold. Serve with whipped cream and powdered sugar.']   
        },
        {
        name: "Spinach and Rice Stuffed Chicken Breast" , 
        description: "Crustless quiche is a no brainer in our house. We regularly throw together leftover vegies, a little cheese, and eggs fresh from our chickens together, pop into the oven and Voila! Breakfast for everyone! The caramelized onion with spinach and Gruyere is my all-time favorite. I usually use fresh spinach but the frozen box is easy, too." , 
        ingredients:['cream cheese', 'sour cream', 'sharp cheddar cheese', 'pastrami', 'pepperoncini peppers', 'vegetables', 'butter']  , 
        quantity:["1 (8   ounce) package   cream cheese","1 (8   ounce) carton   sour cream","1   cup   shredded sharp cheddar cheese","8   ounces    pastrami or 8   ounces    dried beef, chopped ","1 (16   ounce) jar   pepperoncini peppers, drained and chopped "," carrot sticks or   radish, etc ","1/4  cup    butter, melted "]  , 
        serving_size: "1 (292 g)" , 
        servings: "4" , 
        steps:['Cut the top off the bread and scoop out contents leaving approximately 1 inch from the edge to make a bowl.Cut contents into 1 inch squares.and set aside.', 'In mixing bowl combine all ingredients,except butter and fill bread bowl.', 'Replace top and wrap bowl in 2 layers of heavy duty aluminum foil.', 'bake at 350* for 1hour.Remove last 10 minutes to brown bread.', 'In the meantime toss bread crumbs in melted butter and brown.When bread is done brown bread squares in 350* oven ,turning several times, until crisp and brown on all sides.', 'To serve Dip bread squares and vegies in bread bowl.']   
        },
        {
        name: "Mango Coconut Muffins" , 
        description: "This is an adapted recipe - adapted from a recipe that showed up in my email. It sounds like it would be very pretty on a buffet - bridal shower perhaps?" , 
        ingredients:['cheddar cheese', 'diced green chilies', 'whole kernel corn', 'green onion', 'fajita-size flour tortillas', 'salsa', 'fresh cilantro']  , 
        quantity:["2   cups   shredded cheddar cheese","1 (4   ounce) can   diced green chilies","1/2  cup    whole kernel corn","1/4  cup   sliced green onion","10 (6   inch)    fajita-size flour tortillas","  salsa"," chopped fresh cilantro"]  , 
        serving_size: "1 (107 g)" , 
        servings: "12" , 
        steps:['Combine chees,chiles, corn and green onion in medium bowl.  Spread 1/3 cup cheese mixture onto oe half of each tortilla; fold tortilla in half.', 'Spray large skillet with nonstick cooking spray; place two quesadillas in skillet.', 'Cook each side over medium-high heat until golden brown and cheese is melted.', 'Repeat with remaining ingredients.', 'Cut each tortilla in half.', 'Serve with salsa and cilantro.']   
        },
        {
        name: "Injera" , 
        description: "From Penzeys Spices and written by Howard Helmer, this recipe is so easy a novice can prepare it." , 
        ingredients:['boneless skinless chicken breasts', 'extra virgin olive oil', 'breadcrumbs', 'rice', 'cheese', 'sour cream', 'cream cheese', 'fresh spinach', 'fresh rosemary']  , 
        quantity:["4       boneless skinless chicken breasts","4   teaspoons    extra virgin olive oil","1   cup    breadcrumbs","2   cups    rice, under-cooked  (or use a package of seasoned flavored rice)","1/2  cup    cheese, shredded  (preferably a multi-cheese italian blend)","1/4  cup    sour cream","1/4  cup    cream cheese","1/4  cup    fresh spinach, chopped ","1   sprig    fresh rosemary"]  , 
        serving_size: "1 (49 g)" , 
        servings: "10" , 
        steps:['Prepare the rice until it is ALMOST done.  This is the base for the stuffing, and will continue to cook as the chicken cooks.', 'Combine rice, cream cheese, and sour cream in a mixing bowl.', 'Add spinach and rosemary to the stuffing mixture.', 'Add cheese to the stuffing mixture LAST (the stuffing is warm and the cheese will melt).', 'Pound the chicken breasts with a tenderizer so that they are flattenned.', 'Scoop stuffing (as much as will practicably fit) onto the flattenned chicken breasts.  Roll the chicken up and secure with toothpicks.', 'If you wish, coat each "roll" with olive oil and then with breadcrumbs.', 'Bake in a 425 degree preheated oven for about 30-40 minutes (depending on the thickness of the chicken).  The stuffing is already cooked, so just make sure that the chicken is done.', 'Serve with stuffing (Stove Top) and hearty green vegetables (asparagus, snap peas, etc.) and whatever else you like.  Pair with a sweet white wine (i.e. Riesling).']   
        },
        {
        name: "Chipotle Chicken Thighs" , 
        description: "So creamy, so yummy! I think its the Worcestershire sauce that does it." , 
        ingredients:['flour', 'baking soda', 'salt', 'butter', 'brown sugar', 'egg', 'buttermilk', 'pure vanilla extract', 'mango', 'sweetened flaked coconut', 'lime zest', 'honey']  , 
        quantity:["2 3/4  cups    flour","1   teaspoon    baking soda","1/2  teaspoon    salt","3/4  cup    butter, room temp ","1   cup   packed brown sugar","1   large    egg","1   cup    buttermilk","1   teaspoon    pure vanilla extract","1   cup   chopped mango","1/2  cup    sweetened flaked coconut","1   teaspoon   finely grated lime zest","2   tablespoons    honey"]  , 
        serving_size: "1 (165 g)" , 
        servings: "4" , 
        steps:['Preheat oven to 350 degrees.', 'Line muffin tins with cupcake liners or butter.', 'In a large bowl mix together the flour, baking soda and salt.', 'In a medium bowl beat together the butter and sugar.', 'Beat in egg, buttermilk and vanilla.', 'Gently stir in mango, coconut, and lime zest.', 'Pour over dry mixture, stirring until dry ingredients are just moistened.', 'Do not over mix.', 'Spoon into prepared muffin tin, each cup 3/4 full.', 'Bake for 30 minutes.', 'Brush tops with honey, remove from muffin tin and cool on wire rack.']   
        },
        {
        name: "Praline Cake Filling" , 
        description: "This unique and delicious combination of crispy, buttery cinnamon toast and rich, creamy ice cream is a perfect marriage of flavours and textures.  This recipe is a little bit of work; but its worth it!  Recipe is from Gourmet Magazine (Aug. 2006). " , 
        ingredients:['buckwheat pancake mix', 'bisquick', 'canola oil', 'water']  , 
        quantity:["1   cup    buckwheat pancake mix","1   cup    Bisquick","1   tablespoon    canola oil","1 1/2-2   cups    water"]  , 
        serving_size: "1 (1325 g)" , 
        servings: "1" , 
        steps:['Combin all ingredients with just enoough water for an easy pouring consistency.', 'Bring a 10-inch skillet or a handled griddle pan to medium heat uniformly over the flame. Do not let the pan get too hot.', 'Spray skillet with cooking spray.', 'Fill a measuring cup (with spout) or a large cream pitcher with batter.', 'Pour the mixture on the hot pan or griddle in a thin stream starting from the outside and going in circles to the center from left to right. As soon as it bubbles uniformly all over remove from heat. Pancakes should be 9 inches in diameter.', 'Place the pan in an oven at 325 for about 1 minute until the top is dry but not brown.', 'Arrange the five pancakes overlapping each other so as to completely cover a fifteen-inch tray, thus forming the Injera "tablecloth.".']   
        },
        {
        name: "Chicken Tortilla Soup" , 
        description: "Makes about 1 quart (you may want to double the recipe)." , 
        ingredients:['boneless skinless chicken thighs', 'white onion', 'green onion', 'green bell pepper', 'cilantro', 'cumin', 'chicken bouillon granules', 'pepper', 'salt', 'chipotle chiles in adobo', 'cooking oil', 'water']  , 
        quantity:["1 1/2-2   lbs    boneless skinless chicken thighs","1   cup   sliced white onion","1/4  cup   of diced green onion","1/2  cup   chopped green bell pepper","3 -4   sprigs    cilantro","  cumin","2   teaspoons    chicken bouillon granules (preffer knorr granulated chicken bullion) or 2       chicken bouillon cubes (preffer knorr granulated chicken bullion)","  pepper","  salt","7   ounces    chipotle chiles in adobo (you will use 1-2 peppers and about 2 tablespoons of the puree)","3   tablespoons    cooking oil","  water"]  , 
        serving_size: "1 (589 g)" , 
        servings: "4" , 
        steps:['Butterfly cut each thigh (Slice the inside of the thigh so that it will cook quicker and more evenly). Season each thigh front and back with cumin and pepper.', 'Heat oil in large frying pan over medium high. Add both of the onions and bell pepper, saute for about 5 minute.', 'Add chicken thighs and brown for about 10 minute turning over once to brown both sides.', 'Add the 2 tablespoons of chipotle puree and 2 peppers. Disolve and sprinkle the chicken bullion cubes over the chicken (or if you have granulated bullion, add 2 tablespoons).', 'Add about 2 cups water, or enough to barely cover the chicken. Mix the water in the pan a bit and taste if it needs more salt.', 'Cover and cook for about 20 mins on medium high or until the juices from the chicken run clear and the sauce has thickened enough for your taste. When done, turn pan off and add the cilantro.', 'Serve with rice.']   
        },
        {
        name: "Tarta De Maize (Corn Pudding)" , 
        description: "While I was in high school I came across this recipe in a cookbook and changed the ingredients up a bit to accommodate my LOVE of stuffings!  This has become a favorite of my family during Lent." , 
        ingredients:['butter', 'brown sugar', 'salt', 'evaporated milk', 'vanilla', 'pecans', 'powdered sugar', 'evaporated milk']  , 
        quantity:["1   cup    butter (2 Sticks)","2   cups   firmly packed brown sugar","1/8  teaspoon    salt","1 1/4  cups    evaporated milk","1   teaspoon    vanilla","2   cups   chopped pecans","1   cup    powdered sugar","  evaporated milk (as needed for thinning)"]  , 
        serving_size: "1 (274 g)" , 
        servings: "10" , 
        steps:['Melt butter in heavy saucepan over medium heat.', 'Add brown sugar and salt and bring to a boil.', 'Cook for 2 minutes, stirring constantly.', 'Remove from heat and slowly whisk in evaporated milk.', 'Return saucepan to stove and bring mixture to a boil again.', 'Boil, stirring constantly until mixture reaches 232 degrees.', 'Remove from heat, stirring for a few minutes and cool to lukewarm.', 'Add powdered sugar, vanilla and pecans.', 'Beat until mixture is smooth.', 'If mixture is too thick add evaporated milk one tablespoon at a time until mixture is of spreading consistency (approximately 1/4 cup or possibly a little more).']   
        },
        {
        name: "Greek Meatloaf" , 
        description: "A delightfully fragrant floral tea - tisane - infusion of roses and jasmine blossoms! Lovely with a madeleine cookie or fresh baked scones, for a morning or afternoon tea. Can be served either hot or iced. Would make a nice hostess or foodie gift in a jar, tea tin, or pretty china cup. Please note: Be sure to use organic pesticide free flowers, only." , 
        ingredients:['vegetable oil', 'onion', 'garlic cloves', 'chipotle chile in adobo', 'chili powder', 'kosher salt', 'low sodium chicken broth', 'frozen corn kernels', 'tomatoes', 'cooked chicken', 'cilantro leaf', 'fresh lime juice', 'corn tortilla chips', 'lime wedge']  , 
        quantity:["2   tablespoons    vegetable oil","1   medium    onion, chopped ","2       garlic cloves, sliced ","1       chipotle chile in adobo, minced ","1   tablespoon    chili powder","2   teaspoons    kosher salt","6   cups    low sodium chicken broth, canned ","1   cup    frozen corn kernels, thawed ","1      ripe tomatoes, chopped ","1   cup    cooked chicken, shredded ","1/2  cup    cilantro leaf","1/4  cup    fresh lime juice (about 2 limes)","1   dozen    corn tortilla chips, broken a bit ","  lime wedge"]  , 
        serving_size: "1 (186 g)" , 
        servings: "8" , 
        steps:['Heat the oil in a medium saucepan over medium heat.  Add the onion, garlic, chipotle, chili powder, and salt and cook until the onion softens, about 15 minutes.', 'Add the chicken broth, bring to a boil, reduce the heat slightly, and simmer, uncovered, for 10 minutes.', 'Add the corn and cook for 5 minutes more.', 'Pull the saucepan from the heat and stir in the tomato, chicken, cilantro, and lime juice.', 'Divide the tortilla chips among 4 warmed bowls, ladle the soup on top, and serve with the lime wedges, if desired.']   
        },
        {
        name: "Southwestern Omelet Wrap - Ziploc Steam Bags" , 
        description: "Everyones favorite" , 
        ingredients:['kernel corn', 'whole milk', 'butter', 'sugar', 'eggs', 'flour', 'baking powder', 'salt', 'vanilla']  , 
        quantity:["5   cups    kernel corn (3 large cans)","2   cups    whole milk","1/2  lb    butter","2   cups    sugar","5       eggs","2   cups    flour","4   teaspoons    baking powder","1   teaspoon    salt","1   teaspoon    vanilla"]  , 
        serving_size: "1 (226 g)" , 
        servings: "1" , 
        steps:['Beat butter, sugar and eggs until creamy.', 'In a blender, mix corn and milk.', 'Add corn mixture to butter, mixing well; add remaining ingredients until well blended.', 'Bake in a well greased 9x13 inch pan about 30 minutes - until the top is golden brown.']   
        },
        {
        name: "Korean Bean Paste Soup (Chigae)" , 
        description: "In â€˜ Williams-Sonoma: Simple Suppersâ€™" , 
        ingredients:['ground beef', 'ground lamb', 'eggs', 'fresh breadcrumb', 'green onion', 'feta cheese', 'fresh parsley', 'dried mint', 'olive oil', 'red wine vinegar', 'garlic cloves', 'olive', 'tomato paste', 'salt', 'ground black pepper']  , 
        quantity:["1   lb    ground beef","1   lb    ground lamb","2   large    eggs","1   cup    fresh breadcrumb","1   cup    green onion, finely chopped ","4   ounces    feta cheese, finely crumbled ","1/4  cup    fresh parsley, chopped ","1   tablespoon    dried mint","2   tablespoons    olive oil","1   tablespoon    red wine vinegar","2       garlic cloves, minced ","1/2  cup    olive, chopped  (green or black)","1   tablespoon    tomato paste (puree)","1/2  teaspoon    salt","1/4  teaspoon    ground black pepper"]  , 
        serving_size: "1 (452 g)" , 
        servings: "4" , 
        steps:['Preheat oven to 350Â°F', 'In large bowl, mix all ingredients just until well combined but not overmixed.', 'In 13x9 metal baking pan, shape meat mixture into 9x5 inch loaf.', 'Bake meat loaf 1 hour approx, drain fat half way through cooking,  if needed.', 'Let stand 10 minutes before slicing.']   
        },
        {
        name: "Chicken Breasts With Herbs" , 
        description: "A great way to use up leftover ham. Serves ALOT!" , 
        ingredients:['eggs', 'cheese', 'chopped tomatoes', 'chile', 'heavy cream', 'butter', 'hot sauce', 'salt']  , 
        quantity:["2       eggs","1   slice    cheese, chopped into small pieces  (about 2 Tablespoons) or 2   tablespoons   shredded cheese","2   tablespoons    chopped tomatoes","1   tablespoon   diced chile","2   tablespoons    heavy cream","1   teaspoon    butter","1/2  teaspoon    hot sauce (to taste)","1   pinch    salt, to taste  (about 1/16 teaspoon (or more)"]  , 
        serving_size: "1 (150 g)" , 
        servings: "4" , 
        steps:["Fold top edge of a Medium or Large ZiplocÂ® Brand Zip 'n Steamâ„¢ bag out and down to keep bag open. Crack 2 eggs directly into bag. (Alternately, crack eggs into small bowl and pour into bag.)", 'Add the rest of ingredients to bag.', 'Seal bag.', 'Squeeze eggs to break yolks. Continue squeezing or gently shaking bag until ingredients are thoroughly combined.', 'Place bag in microwave. Cook on full power for 2 1/2 minutes or until eggs are fully cooked and firm throughout, with no liquid egg remaining. If needed, continue microwaving at 30-second intervals until omelet is done.', 'Allow bag to stand for 1 minute before opening.', 'Carefully open bag and slide out omelet.', 'Fold omelet and place on flour tortilla. Spoon sour cream and salsa on omelet. Fold tortilla over omelet and serve.']   
        },
        {
        name: "Onion Jam" , 
        description: "Nothing is easier on a hot summer day than this recipe. Only fresh tomatoes, please. Its a hit with everyone who has had it!!! Cook time includes 2 hours to marinate." , 
        ingredients:['water', 'bean paste', 'garlic', 'dashi', 'hot pepper paste', 'zucchini', 'potato', 'fresh mushrooms', 'onion', 'soft tofu']  , 
        quantity:["3 1/2  cups    water","3   tablespoons   korean fermented bean paste (Denjang)","1   tablespoon    garlic, minced ","1/2  tablespoon    dashi, granules ","1/2  tablespoon   korean hot pepper paste (Gochujang)","1       zucchini, cubed ","1       potato, peeled and cubed ","1/4  lb    fresh mushrooms, quartered ","1       onion, chopped ","1 (12   ounce) package   soft tofu, cubed "]  , 
        serving_size: "1 (78 g)" , 
        servings: "12" , 
        steps:['In a large saucepan over medium heat, combine water, denjang, garlic, dashi and gochu jang.  Bring to a boil and let boil 2 minutes.', 'Stir in zucchini, potato, mushrooms and onions and boil for 5 to 7 minutes more.', 'Stir in tofu and cook until tofu has expanded and vegetables are tender.', 'Best served with rice and kimchi.']   
        },
        {
        name: "Apple Pandowdy" , 
        description: "Heres one the little tots will go bonkers over. The larger folks will be munching on it too!" , 
        ingredients:['flat-leaf italian parsley', 'fresh oregano', 'lemon peel', 'garlic cloves', 'butter', 'boneless skinless chicken breast halves', 'chicken broth']  , 
        quantity:["1/3  cup   chopped flat-leaf Italian parsley","1   tablespoon    fresh oregano, chopped ","1   tablespoon   grated lemon peel","3       garlic cloves, finely chopped ","3   tablespoons    butter","4       boneless skinless chicken breast halves","1/4  cup    chicken broth"]  , 
        serving_size: "1 (234 g)" , 
        servings: "6" , 
        steps:['In a bowl, stir together parsley, oregano, lemon peel and garlic. Set aside.', 'Season chicken with salt and pepper.', 'heat skillet to medium high heat. Cook chicken 3 minutes on each side in butter. Transfer to plate. Remove skillet from heat. Stir in half herb mixture. Return to heat, add broth and bring to a boil. Stir to scrape up bits from the bottom. return chicken to pan, reduce heat and simmer, covered for 8 minutes or until chicken is no longer pink.', 'Serve with pan sauce. sprinkle with remaining herb mixture.']   
        },
        {
        name: "Spicy Carrot and Zucchini Bhaji" , 
        description: "Low Cal, Low Fat...great moisture and texture. This is sure to satisfy the sweet tooth! Thank goodness for honey! Enjoy." , 
        ingredients:['olive oil', 'onions', 'sea salt', 'balsamic vinegar', 'port wine', 'fresh thyme', 'muscovado sugar', 'mustard seeds', 'red pepper flakes', 'tomatoes']  , 
        quantity:["1/4  cup    olive oil","6       onions, medium, sliced thinly ","1   pinch    sea salt","1   tablespoon    balsamic vinegar","1/4  cup    port wine","1   sprig    fresh thyme","1/2  cup    muscovado sugar","1   teaspoon    mustard seeds","1/2  teaspoon    red pepper flakes","1/4  cup    tomatoes, finely chopped "]  , 
        serving_size: "1 (121 g)" , 
        servings: "4" , 
        steps:['Heat oil in heavy frying pan, then add onions &amp; saute untils slightly brown.', 'Season with salt, then reduce heat &amp; continue to cook, stirring constantly, until caramelized &amp; tender.', 'Add rest of ingredients EXCEPT the tomato, &amp; cook on low heat for 30 minutes, stirring occasionally.', 'Add tomato &amp; cook 15 more minutes.', 'Remove from heat &amp; let cool.', 'Store in a jar in the refrigerator for up to 2 weeks.']   
        },
        {
        name: "Buttery Apples and Cabbage" , 
        description: "while going through my grandmothers house when she died, I came across a box of recipes in the attic. This is one of the ones that caught my attention." , 
        ingredients:['apples', 'water', 'sugar', 'cinnamon', 'bisquick baking mix', 'sugar', 'butter', 'milk']  , 
        quantity:["6       apples, pared and cored ","2   tablespoons    water","1/3  cup    sugar","1   teaspoon    cinnamon","1   cup    Bisquick baking mix","1   tablespoon    sugar","1   tablespoon    butter or 1   tablespoon    margarine, melted ","1/4  cup    milk"]  , 
        serving_size: "1 (139 g)" , 
        servings: "6" , 
        steps:['Heat oven to 425*. Place apples close together in greased oblong dish, 10x6x1-1/2 inches, or square pan, 9x9x2". Sprinkle with water, 1/3 cup sugar and the cinnamon. Heat in oven 20 minutes while preparing topping. Stir remaining ingredients to a soft dough. Gently smooth dough into a ball on floured board. Knead 8-10 minutes. Roll dough into a rectangle, 10x6 inches, and place over hot apples. Cut a small crisscross in dough on top of each apple. Bake 20 to 25 minutes.']   
        },
        {
        name: "Low Calorie Pancakes" , 
        description: "I got this recipe from Kraft Kitchens. It was fast and easy to make, and the whole family enjoyed it." , 
        ingredients:['besan flour', 'salt', 'cold water', 'ground turmeric', 'chili powder', 'garam masala', 'garlic cloves', 'brown onions', 'carrot', 'zucchini', 'coriander leaves', 'vegetable oil', 'mango chutney']  , 
        quantity:["1   cup    besan flour (chickpea flour 150grams)","2   teaspoons   cooking salt","1/2  cup    cold water","1/4  teaspoon    ground turmeric","1   teaspoon    chili powder","1   teaspoon    garam masala","2       garlic cloves (crushed)","2   small    brown onions (160 grams sliced thinly)","1       carrot (medium 120 grams grated coarsely)","1 (120   g)    zucchini (grated coarsely)","1/2  cup    coriander leaves (loosely packed fresh)","  vegetable oil (for deep frying)","1   cup    mango chutney"]  , 
        serving_size: "1 (69 g)" , 
        servings: "8" , 
        steps:['Whisk besan (chickpea flour), salt and the water in medium bowl until mixture forms a smooth thick batter.', 'Stir in spices, garlic, onion, carrot, zucchini and coriander.', 'Heat oil in wok, deep fry tablespoons of mixture, in batches, until vegetables are tender and bhaji are browned lightly.', 'Drain on paper towel.', 'Serve with mango chutney.']   
        },
        {
        name: "Flavorful Pizza Sauce" , 
        description: "I can not get enough of this recipe for this cucumber-yogurt dip/sauce.  Works well on roasted meats, in wraps, on rice, as a dip with vegetables or pita (or just baguette) on a spoon.... I used it on my curried chicken and rice recipe and it added a little coolness to the spices." , 
        ingredients:['cabbage', 'tart apples', 'water', 'butter', 'salt', 'nutmeg', 'fresh parsley']  , 
        quantity:["4   cups    cabbage, cubed ","2   cups    tart apples (unpeeled and cubed)","1   cup    water","1/4  cup    butter","1/2  teaspoon    salt","1/4  teaspoon    nutmeg","2   tablespoons    fresh parsley (chopped)"]  , 
        serving_size: "1 (841 g)" , 
        servings: "1" , 
        steps:['in a pot stir in 1 cup water add cabbage, cover and cook until cabbage is crisp but tender, drain.', 'in a pan add the butter, salt, nutmeg stir until butter is melted.', 'add the apples, cover and stir occasionally until apples are crisp tender.', 'sprinkle with parsley and serve while hot.']   
        },
        {
        name: "Italiano Chicken Pasta &amp; Vegetable Medley" , 
        description: "I just love to make them!" , 
        ingredients:['whole wheat flour', 'baking soda', 'splenda sugar substitute', 'skim milk', 'egg substitute', 'vanilla extract', 'ground cinnamon']  , 
        quantity:["1 1/4  cups    whole wheat flour","1   teaspoon    baking soda","4   teaspoons    Splenda sugar substitute","1   cup    skim milk","1/2  cup    egg substitute (like Eggbeaters)","1   tablespoon    vanilla extract","2   tablespoons    ground cinnamon"]  , 
        serving_size: "1 (211 g)" , 
        servings: "6" , 
        steps:['Preheat skillet over medium/low heat, spray with 0-Calorie cooking spray.', 'Mix flour, baking soda, and sugar in medium bowl, set aside.', 'Beat together milk, eggs, and vanilla in another bowl. Fold mixture into dry ingredients, being careful not to overmix it. Then, stir in cinnamont.', 'Using a 1/3 cup measuring cup, pour pancakes onto skillet. Cook until both sides are golden.']   
        },
        {
        name: "Preschool Chocolate Milk Cupcakes" , 
        description: "My friends are always glad when I bring this to a party.It is great for tail-gaiting or just watching the game with friends or at a casual holiday get together." , 
        ingredients:['tomato sauce', 'tomato paste', 'worcestershire sauce', 'dried parsley flakes', 'italian seasoning', 'garlic powder', 'sugar', 'dried basil', 'dried oregano', 'salt', 'pepper']  , 
        quantity:["2 (8   ounce) cans   tomato sauce","1 (12   ounce) can   tomato paste","4   teaspoons    Worcestershire sauce","1   tablespoon    dried parsley flakes","1   tablespoon    italian seasoning","1 1/2  teaspoons    garlic powder","1   teaspoon    sugar","1   teaspoon    dried basil","1   teaspoon    dried oregano","3/4  teaspoon    salt","1/4  teaspoon    pepper"]  , 
        serving_size: "1 (46 g)" , 
        servings: "24" , 
        steps:['In a large bowl, combine all of the ingredients.  Transfer to a storage container.Cover and refrigerate for up to 1 week.']   
        },
        {
        name: "Turkey Tortilla Soup" , 
        description: "This is an Ortega Recipe.  Really quick, and super tasty." , 
        ingredients:['boneless skinless chicken breast', 'reduced-sodium fat-free chicken broth', 'garlic powder', 'italian seasoning', 'whole wheat spiral pasta', 'frozen mixed vegetables', 'reduced-fat parmesan cheese']  , 
        quantity:["1   lb    boneless skinless chicken breast, cut up ","2 (14 1/2  ounce) cans   reduced-sodium fat-free chicken broth","1/2  teaspoon    garlic powder","1   tablespoon    italian seasoning","3   cups    whole wheat spiral pasta, uncooked ","1 (16   ounce) package   frozen mixed vegetables","2   tablespoons    reduced-fat parmesan cheese"]  , 
        serving_size: "1 (449 g)" , 
        servings: "4" , 
        steps:['Cook chicken in nonstick skillet until browned, stirring often.', 'Add broth, Italian seasoning and garlic. Heat to a boil. Stir in pasta. Cook over medium heat 10 minutes.', 'Add vegetables and cheese. Heat to a boil. Cook 5 minutes more or until pasta is done.', 'Sever with additional cheese if desired.']   
        },
        {
        name: "Lee Bros. Country Captain (Throwdown)" , 
        description: "A VERY good, and VERY easy dinner thats guaranteed to impress." , 
        ingredients:['whole wheat flour', 'unbleached all-purpose flour', 'wheat germ', 'baking powder', 'unsweetened cocoa', 'vegetable oil', 'apple juice concentrate', 'whole milk', 'nonfat dry milk powder', 'eggs', 'egg white', 'vanilla extract']  , 
        quantity:["1   cup    whole wheat flour","1/4  cup    unbleached all-purpose flour","1/2  cup    wheat germ","2   teaspoons    baking powder","2/3  cup    unsweetened cocoa","1/4  cup    vegetable oil","1 3/4  cups    apple juice concentrate","1/2  cup    whole milk","5   tablespoons    nonfat dry milk powder","2       eggs","1       egg white","1   teaspoon    vanilla extract"]  , 
        serving_size: "1 (707 g)" , 
        servings: "6" , 
        steps:['Preheat the oven to 325Â°F  Line muffin tins with cupcake liners.', 'Place the flours, wheat germ, baking powder, cocoa, oil, juice concentrate, and milks in a large mixing bowl; beat until smooth.', 'Add the eggs, egg white and vanilla and beat until thoroughly mixed.', 'Pour the batter into the prepared baking pan.  Bake until the top springs back when lightly pressed, about 35 minutes.', 'Cool slightly in the pan before turning out onto a rack to cool completely.', 'Use whipped cream for icing once completely cooled.  You can use food coloring or different flavored whipped cream to add to the fun.']   
        },
        {
        name: "Easy Vegetable Soup" , 
        description: "A nice twist on breakfast muffins!" , 
        ingredients:['cooking oil', 'salsa verde', 'chicken broth', 'carrot', 'cumin', 'paprika', 'red pepper flakes', 'celery rib', 'bell pepper', 'onion', 'garlic', 'cooked turkey', 'white kidney beans']  , 
        quantity:["2   tablespoons    cooking oil","1   cup    salsa verde","1 (48   ounce) carton   chicken broth, reduced sodium ","1       carrot, sliced thinly ","3   teaspoons    cumin","1   teaspoon    paprika","1   teaspoon    red pepper flakes","1       celery rib, sliced ","1/2      bell pepper, sliced ","1/2      onion, sliced ","1   teaspoon    garlic, minced ","2   cups    cooked turkey, cubed ","1 (15 1/2  ounce) can   white kidney beans, rinsed and drained "]  , 
        serving_size: "1 (429 g)" , 
        servings: "6" , 
        steps:['Add Olive Oil to pot and heat.', 'Add celery, onion, garlic, and pepper.', 'Saute until Al Dente.', 'Add cumin, paprika, red pepper flakes and salsa verde.', 'Mix together while heating to allow flavors to blend.', 'Add cooked turkey and beans.', 'Once heated; add reduced sodium chicken broth.', 'Bring to a boil.', 'If desired, serve soup with cilantro, sour cream, fresh squeezed lime juice, and tortilla strips.']   
        },
        {
        name: "Sauteed Swiss Chard With Raisins and Pine Nuts" , 
        description: "This unleavened bread of Ethiopia is really a huge pancake made in special large pans with heavy covers.   The combination of buckwheat flour mix and biscuit mix seems to produce the closest substitute for the sponginess of this Ethiopian bread." , 
        ingredients:['chicken broth', 'dried currants', 'curry powder', 'garam masala', 'kosher salt', 'black pepper', 'bacon', 'chicken thighs', 'chile', 'carrots', 'yellow bell peppers', 'yellow onions', 'garlic', 'crushed tomatoes', 'fresh ginger', 'cooked white rice', 'toasted almond', 'fresh flat-leaf parsley']  , 
        quantity:["1/2  cup    chicken broth","1/2  cup    dried currants or 1/2  cup    raisins","1   tablespoon    curry powder","1   tablespoon    garam masala","1 1/2  teaspoons    kosher salt, plus more for seasoning ","1/2  teaspoon   freshly ground black pepper, plus more for seasoning ","1/4  lb   slab bacon or 1/4  lb   fatty country ham, chopped ","12       chicken thighs, skin on, trimmed of excess skin and fat ","1   large   dried chile, pepper split and seeds removed  (such as guajillo or pasilla)","2 1/3  cups   peeled and sliced carrots (1/4-inch thick rounds, about 1 1/4 pound bunch weighed with tops)","2      diced yellow bell peppers","2   medium    yellow onions, diced ","3      cloves garlic, unpeeled ","28   ounces    crushed tomatoes, with juice ","2   tablespoons   grated fresh ginger","4   cups    cooked white rice","2/3  cup   slivered toasted almond, chopped ","1/2  cup   chopped fresh flat-leaf parsley"]  , 
        serving_size: "1 (220 g)" , 
        servings: "4" , 
        steps:['Preheat the oven to 350 degrees F.', 'Pour the broth into a small saucepan and bring to a boil over high heat. Put the currants in a small bowl and pour enough broth over them to cover. Set aside. In another small bowl, combine the curry powder, garam masala, salt, and black pepper and reserve.', 'Scatter the bacon in a 4 to 6 quart enameled cast-iron pot or Dutch oven over medium-high heat. Stir the pieces around occasionally until the bacon is firm and just golden brown, about 5 minutes. With the slotted spoon, transfer the bacon to a small bowl and reserve.', 'Pour off all but 2 tablespoons of fat from the pot, reserving the excess fat in a small bowl. Brown the chicken thighs in batches over medium-high heat, taking care not to crowd them in the pot, until they are golden brown, about 5 minutes per side. Add the reserved bacon fat, 1 teaspoon at a time, if the pot becomes too dry. Remove the chicken and reserve in a medium bowl.', 'Add 2 teaspoons reserved bacon fat to the pot (if there is none left, use 2 teaspoons canola or vegetable oil). Add the chile and toast the chile in the fat, about 30 seconds per side, until very fragrant.', 'Add the carrots, bell peppers, onions, and garlic and cook until slightly softened, about 6 minutes. Add the tomatoes, spice mixture, ginger, and the currants and their broth. Reduce the heat to medium-low, and simmer until the tomatoes have cooked down to a puree and the sauce has thickened around the vegetables, about 8 minutes.', 'Nest the chicken thighs gently in the vegetable sauce so that the skin side faces up and is above the surface of the gravy. Tent the pot loosely with foil and transfer to the middle rack of the oven. Bake until the country captain resembles a roiling stew around the chicken thighs, about 20 minutes. Remove the foil and bake until the sauce has thickened further and the chicken skin is just beginning to crisp, about 15 minutes more.', 'Remove from the oven, skim any excess fat from the surface, and season to taste with salt and pepper. Discard the chile. With tongs, transfer 3 thighs to each of 4 wide, deep bowls filled with 1 cup hot white rice. Spoon the sauce over the chicken and the rice and garnish with the reserved bacon, almonds, and parsley.']   
        },
        {
        name: "Spicy Mexican Rice With Corn" , 
        description: "Easy to make on a weeknight. I actually just threw this together and it came out pretty good." , 
        ingredients:['olive oil', 'leeks', 'garlic cloves', 'potatoes', 'carrots', 'red bell pepper', 'french beans', 'chicken stock', 'canned tomatoes', 'sweetcorn', 'kidney beans', 'dried thyme', 'tabasco sauce', 'salt and pepper']  , 
        quantity:["3   tablespoons    olive oil","2   medium    leeks, white part only, cut into rings ","4       garlic cloves, finely chopped ","200   g   waxy potatoes, finely diced ","2       carrots, finely diced ","1       red bell pepper, finely diced ","150   g    French beans, cut into 1cm lengths ","1   liter    chicken stock or 1   liter    vegetable stock","800   g    canned tomatoes","400   g   tinned sweetcorn","400   g    kidney beans","1   tablespoon    dried thyme","  Tabasco sauce, to taste ","  salt and pepper, to taste "]  , 
        serving_size: "1 (184 g)" , 
        servings: "8" , 
        steps:['Heat the oil in a large pan. Add the leeks and garlic, cover and sweat over a low-medium heat for 8 minutes, until tender.', 'Add the potatoes, carrots, bell pepper and beans and heat for another 5 minutes, stirring occasionally.', 'Pour over the stock and tomatoes, including their juice. If using whole plum tomatoes, chop them slightly in the pan (I prefer them to be in largish chunks rather than using pre-chopped tomatoes).', 'Bring to the boil. Add the thyme and simmer for 25 minutes (or until the vegetables are cooked to your liking).', 'Add the kidney beans and sweetcorn, then season to taste with salt, pepper and Tabasco.']   
        },
        {
        name: "Borscht II" , 
        description: "I was looking for a praline cake filling and found this on the internet.  I found the original recipe to be too thick.  While it didnt harden like a praline, it was just simply too thick.  Ive adjusted the quantities of milk and powdered sugar in order to have a filling that is spreadable.  After it cools, you may need to thin it with a little more evaporated milk.  If its too thick start adding one tablespoon at a time until you get a consistency that can easily be spread on a cake without tearing the cake.  You are looking for a consistency that will slowly drip off of your mixing spoon.  There are other recipes for praline fillings that arent cooked.  However, I find that the cooking of the mixture adds extra flavor and a richness that will not achieve by just mixing the ingredients together.  I love to make a yellow cake and use this filling and ice with a chocolate buttercream frosting and then pour a chocolate ganache over the top of the cake and let it drip down the sides." , 
        ingredients:['swiss chard', 'pine nuts', 'olive oil', 'golden raisin', 'garlic cloves', 'balsamic vinegar', 'salt and pepper']  , 
        quantity:["2   bunches   about 1 1/2 pounds total swiss chard, stalks cut crosswise into 1-inch pieces, leaves torn into 2-inch pieces  (keep stalks and leaves separate)","2   tablespoons    pine nuts","2   tablespoons    olive oil","1/3  cup    golden raisin","2       garlic cloves, minced ","1   tablespoon    balsamic vinegar"," coarse salt and pepper"]  , 
        serving_size: "1 (543 g)" , 
        servings: "6" , 
        steps:['Wash chard, leaving some water clinging to stalks and leaves; set aside. In a large saucepan with a lid, toast the pine nuts over medium-high heat, shaking pan to brown evenly, 2 to 4 minutes. Remove from pan; set aside.', 'In same saucepan, heat oil over medium-high. Add stalks, and cook until beginning to soften, about 4 minutes. Add leaves, raisins, and garlic. Cover, reduce heat to medium-low, and cook until tender, 6 to 10 minutes, stirring occasionally.', 'Pull lid back slightly, and tilt pan to pour off water. Stir in vinegar and pine nuts; season with salt and pepper. Serve.']   
        },
        {
        name: "Chicken Raviolini Soup" , 
        description: "This is a wonderful full flavored tortilla soup.  The mixture of chipotle in adobo sauce and chili powder gives this soup a great rich flavor.  This recipe is from the Food Network Kitchens." , 
        ingredients:['long grain white rice', 'chicken broth', 'tomato sauce', 'whole kernel corn', 'seeds', 'onion', 'garlic', 'cumin', 'chili powder', 'salt', 'black pepper', 'vegetable oil']  , 
        quantity:["3   cups    long grain white rice","3   cups    chicken broth (water with bullion can substitute)"," two 8 oz. cans el pato tomato sauce (regular tomato sauce is ok if El Pato is unavailable)"," one 14 . 5 oz. can whole kernel corn, undrained ","2 -4      jalapenos minced with seeds (vary number of chiles depending on heat desired)","1   medium    onion, finely diced ","3   tablespoons   minced garlic","1   teaspoon    cumin","1   teaspoon    chili powder","1   teaspoon    salt","1/2  teaspoon    black pepper","3   tablespoons    vegetable oil"]  , 
        serving_size: "1 (354 g)" , 
        servings: "10" , 
        steps:['Heat oil over medium high heat in an 8 quart pot, then add rice, stirring frequently until you see some grains turning a golden color (about 5 minutes).', 'Add minced Jalapenos and diced Onion, stir an additional 2 minutes.', 'Add minced Garlic and all spices, stir an additional minute.', 'Add all liquids and corn (with its liquid) and allow to come to a low boil, stirring occaisionally as it heats.', 'Cover pot with a lid, turn heat to low and allow to cook for 20 to 22 minutes.', 'Fluff rice to mix in all ingredients and serve.']   
        },
        {
        name: "Broiled Soft Shelled Crabs" , 
        description: "I got this recipe from the wife of one of the doctors I work with - she made it for a party and we all went nuts over it.  It is so rich and moist and sweet -you cant stop eating it - its almost like a corn, bread pudding!!" , 
        ingredients:['beef stew meat', 'chicken stock', 'beets', 'onion', 'tomatoes', 'lime%2c juice of', 'sugar', 'salt and pepper', 'sour cream']  , 
        quantity:["1   lb    beef stew meat, cut into cubes  (chuck or round)","12   cups    chicken stock (and/or water) or 12   cups    beef stock (and/or water)","6   large    beets, tops removed ","1   large    onion, minced ","4       tomatoes, peeled and seeded (canned works fine) ","1 -2       lime, juice of","2   tablespoons    sugar (I like less)","  salt and pepper","  to taste    sour cream (and/or snipped chives for garnish)"]  , 
        serving_size: "1 (117 g)" , 
        servings: "6" , 
        steps:['Combine the first five ingredients in a large non-reactive pot.  Bring to a boil, then reduce heat and allow the soup to simmer for 2= hours.', 'Half an hour before serving, remove beets, keeping the broth at a simmer.', 'When beets are cool enough to handle, peel and grate them (the peels should slip right off).  Then  return them to the pot.  Stir in lime juice and sugar, then season with salt and pepper.', 'Serve, garnished with a dollop of sour cream and/or some snipped chives.']   
        },
        {
        name: "Easy Crab Soup" , 
        description: "Leftovers are great for sandwiches." , 
        ingredients:['water', 'chicken broth', 'cream of chicken soup', 'cooked chicken', 'onion', 'carrot', 'garlic cloves', 'basil leaves', 'oregano leaves', 'cheese ravioli', 'frozen broccoli', 'parmesan cheese']  , 
        quantity:["6   cups    water","3 (10 3/4  ounce) cans   chicken broth","1 (10 3/4  ounce) can   cream of chicken soup","2   cups   cubed and cooked chicken","1   cup    onion (chopped)","1   cup    carrot (Sliced)","2       garlic cloves (minced)","1/2  teaspoon    basil leaves","1/2  teaspoon    oregano leaves","1 (8 7/8  ounce) package   cheese ravioli or 1 (7   ounce) package   cheese tortellini","1 (9   ounce) package   frozen broccoli (Thawed)"," grated parmesan cheese, to sprinkle over bowl of soup "]  , 
        serving_size: "1 (309 g)" , 
        servings: "4" , 
        steps:['In a large Dutch oven, combine all ingredients (except the ravioli or tortellini and broccoli).  Bring to a boil, then add the ravioli or tortellini.', 'Simmer for 30 minutes, uncovered.', 'Add thawed broccoli and simmer for 10 minutes longer, or till broccoli is done.', 'Serve (1-1/2 cup servings) hot with parmesan cheese sprinkled over top.', 'Great with hot crusty bread.']   
        },
        {
        name: "Ceci E Pasta" , 
        description: "Convenient omelet recipe made with my favorite gadget of the moment, the Ziploc Steam Bags.  Hubby and I are collecting recipes for this and its made life quick, easy and more healthy for us." , 
        ingredients:['soft shelled crabs', 'milk', 'old bay seasoning', 'salt', 'black pepper', 'all-purpose flour', 'butter']  , 
        quantity:["12       soft shelled crabs, thawed ","1   cup    milk","1   tablespoon    Old Bay Seasoning (or Cajun seasoning)","1   teaspoon    salt","1/4  teaspoon    black pepper","12   tablespoons    all-purpose flour","1/2  cup   melted butter"]  , 
        serving_size: "1 (487 g)" , 
        servings: "4" , 
        steps:['Season the milk with the Old Bay, salt and pepper.', 'Soak the crabs in the seasoned milk for 15 minutes then drain.', 'Sprinkle each crab all over with 1 tablespoon flour.', 'Brush the bottom side of each crab with melted butter.', 'Broil, top side down, for 8 minutes.', 'Flip them over, brush the top side with butter and broil for about 7 more minutes or until golden brown.', 'Garnish with chopped parsley and serve with lemon wedges.']   
        },
        {
        name: "Berry Orange Smoothies" , 
        description: "We love this soup at Korean Restaurants!  It is hot and spicy and so fast to make.  Its best served with rice and kimchi." , 
        ingredients:['butter', 'all-purpose flour', 'old bay seasoning', 'worcestershire sauce', 'chicken broth', 'dry white wine', 'heavy cream', 'country cream gravy', 'backfin crab meat', 'tabasco sauce']  , 
        quantity:["8   tablespoons    butter","1/3  cup    all-purpose flour","1   teaspoon    Old Bay Seasoning","1   tablespoon    Worcestershire sauce","1 (14 1/2  ounce) can   chicken broth","1/2-1   cup    dry white wine (depending on taste)","1   cup    heavy cream","1 (12   ounce) jar   country cream gravy","8   ounces    backfin crab meat","1   dash    Tabasco sauce"]  , 
        serving_size: "1 (197 g)" , 
        servings: "2" , 
        steps:['Melt butter in a large saucepan over low heat.', 'Stir in flour and cook 2 minutes.', 'Stir in remaining ingredients.', 'Simmer 10 minutes, stirring occasionally.', 'Season with salt, pepper, and additonal Tabasco if desired.', 'Thin if needed with milk or cream.']   
        },
        {
        name: "Pumpkin Pie Cake" , 
        description: "From Melanie Barnard in BH&G april 2008." , 
        ingredients:['extra virgin olive oil', 'onion', 'garlic cloves', 'carrot', 'tomatoes with juice', 'garbanzo beans', 'medium pasta shells', 'salt', 'italian parsley', 'parmigiano-reggiano cheese']  , 
        quantity:["1/4  cup    extra virgin olive oil","1   medium    onion, chopped ","3       garlic cloves, thinly sliced ","1/2      carrot, chopped ","1 (28   ounce) can   tomatoes with juice","1 (17   ounce) can   garbanzo beans, rinsed and drained ","16   ounces    medium pasta shells or 16   ounces    elbow macaroni","  salt, to taste ","1/4  cup   chopped Italian parsley"," grated parmigiano-reggiano cheese"]  , 
        serving_size: "1 (112 g)" , 
        servings: "12" , 
        steps:['Add the oil, onion, garlic, and carrot to a large skillet; cook over low heat; stir/saute for about 10 minutes or until the onion is tender (do not brown).', 'Add in the tomatoes and garbanzo beans; simmer over low heat for about 20 minutes.', 'Meanwhile, cook the pasta according to package directions until al dente; ladle out 1 cup of the cooking water and set aside.', 'Drain the pasta and immediately add to the skillet.', 'Stir to blend; add in the reserved cooking water as needed for extra moistness (the mixture should be very juicy).', 'Season to taste with salt.', 'Ladle into soup bowls; sprinkle with parsley and cheese.']   
        },
        {
        name: "Berks County Bread Machine Pizza Crust" , 
        description: "This recipe was in The Ontario Seasonal Cookbook, 2007, which I recieved in a cookbook swap! This savory jam is delicious served with meats, & is also a great appetizer spread!" , 
        ingredients:['orange juice', 'banana', 'berries', 'low-fat vanilla yogurt']  , 
        quantity:["1   cup    orange juice","1   small    banana, peeled, cut up, and frozen ","1/4  cup   fresh berries or 1/4  cup   frozen berries","3   tablespoons    low-fat vanilla yogurt"]  , 
        serving_size: "1 (857 g)" , 
        servings: "1" , 
        steps:['In a blender container combine orange juice, frozen banana pieces, desired berries, and yogurt. Cover and blend until smooth.']   
        },
        {
        name: "Roasted Garlic Skordalia" , 
        description: "Another thrifty recipe from Strictly Thrifty Menus." , 
        ingredients:['pumpkin puree', 'evaporated milk', 'eggs', 'sugar', 'salt', 'cinnamon', 'yellow cake mix', 'butter', 'walnuts']  , 
        quantity:["1 (29   ounce) can   pumpkin puree","1 (5   ounce) can   evaporated milk","3       eggs, lightly beaten ","1   cup    sugar","1/2  teaspoon    salt","2   teaspoons    cinnamon","1 (18   ounce) box   yellow cake mix","1/2  lb    butter, melted ","1 1/2  cups   chopped walnuts"]  , 
        serving_size: "1 (628 g)" , 
        servings: "1" , 
        steps:['Preheat oven to 350. Grease 9x13-inch baking pan. Mix together pumpkin, milk, eggs, sugar, salt, and cinnamon. Pour into pan. Sprinkle cake mix over top. Distribute chopped nuts over cake mix and drizzle melted butter over all. Bake 1 hour. Set one hour before serving or can serve chilled. Drizzle caramel over plate or simply top with a dollop of whipped cream.']   
        },
        {
        name: "Pumpkin Maple Bread" , 
        description: "Posted for the Asian forums Eat Your Veggies December 2008/January 2009.  Taken from the Australian Womens Weekly New Asian cookbook." , 
        ingredients:['water', 'olive oil', 'flour', 'salt', 'active dry yeast']  , 
        quantity:["1 1/3  cups    water","2   tablespoons    olive oil","4   cups    flour","1   teaspoon    salt","2   teaspoons    active dry yeast"]  , 
        serving_size: "1 (261 g)" , 
        servings: "6" , 
        steps:['Add the ingredients to the bread machine in the order given by the manufacturer (liquids first, followed by drys, and finally yeast).', 'Process on the "dough" cycle for 1 1/2 hours then turn out onto a floured surface.', 'Divide into (2) equal sized dough balls. Knead each ball in your hands for a few minutes, then set under a towel for 15-20 minutes to rest.', 'Stretch or roll each dough ball seperately into a 14-inch circle, and prebake on a lightly oiled pizza pan, or cornmeal dusted pizza stone for approximately 5 minutes in a 375 degree oven.', 'Refrigerate crusts up to a week. Freeze for even longer if necessary.']   
        },
        {
        name: "Moms Shrimp Jambalaya" , 
        description: "This makes a great side dish when serving roast or whole chicken,  Also great and easy for the vegetarian." , 
        ingredients:['garlic', 'garlic clove', 'extra virgin olive oil', 'small white potatoes', 'fresh lemon juice', 'warm water', 'coarse salt', 'fresh ground black pepper']  , 
        quantity:["1/2  head    garlic, cloves broken but not peeled ","1       garlic clove, peeled ","1/2-3/4  cup    extra virgin olive oil","1   lb    small white potatoes, scrubbed ","1 -2   tablespoon    fresh lemon juice","  warm water or   chicken stock","  coarse salt","  fresh ground black pepper"]  , 
        serving_size: "1 (361 g)" , 
        servings: "5" , 
        steps:['Heat the oven to 350 degrees Fahrenheit.', 'Put unpeeled garlic on a piece of foil. Drizzle with about 1 teaspoon of the oil, season with salt and pepper. Fold the foil in to form a neat little package. Roast for about 30 minutes, until the garlic is soft but not caramelized.', 'Boil the potatoes until they are very tender, and drain. Let cool slightly.', 'Puree the one garlic clove into a smooth paste, using a mortar and a pestle. Add a pinch of salt and place in a bowl.', 'Cut off the heads of the roasted garlic cloves with scissors and squeeze the pulp into the bowl. Combine with the raw garlic. Drizzle in the wonderful oil from the foil package also.', 'When the potatoes are cool enough to handle, but still warm, peel them and add one at a time to the garlic. You can fluff them in with a fork and mix until smooth.', 'Drizzle in the remaining olive oil a bit a time, making sure to have a smooth puree before adding more oil. Season with the lemon juice, salt and black pepper.', 'If you want a looser sauce, add some warm water or chicken stock.', 'Serve right away, or keep at room temperature for few hours. If you need to keep it longer than that, refrigerate but return to room temperature before serving.']   
        },
        {
        name: "Low Fat Smothered Sirloin Steak-Kraft Foods" , 
        description: "ive been looking for a low calorie low fat recipe for pancakes and finally found one that looks like its worth trying" , 
        ingredients:['all-purpose flour', 'baking powder', 'baking soda', 'salt', 'cinnamon', 'allspice', 'eggs', 'pumpkin', 'light brown sugar', 'maple syrup', 'vegetable oil', 'golden raisin', 'pecans']  , 
        quantity:["3   cups    all-purpose flour","2   teaspoons    baking powder","1   teaspoon    baking soda","1 1/2  teaspoons    salt","1   teaspoon    cinnamon","1/2  teaspoon    allspice","2       eggs","1 (16   ounce) can   pumpkin","1   cup    light brown sugar, firmly packed ","1/2  cup    maple syrup","1/2  cup    vegetable oil","1/2  cup    golden raisin","1/2  cup    pecans, chopped "]  , 
        serving_size: "1 (194 g)" , 
        servings: "4" , 
        steps:['Preheat oven to 325Â°F.', 'Grease a 9x5x3-inch loaf pan. Dust with flour. Set aside.', 'Sift flour, baking powder, baking soda, salt,.', 'cinnamon and allspice in large bowl. Mix with whisk.', 'Beat eggs with pumpkin, brown sugar, maple syrup, and oil in a medium bowl.', 'Stir egg mixture into flour mixture until just moistened. Gently fold in raisins and nuts.', 'Spoon batter evenly into prepared pan.', 'Bake 1  hour and 15 minutes,or until toothpick test indicates done.', "Author's note: my oven takes 1 hour and 30 minutes for this bread at 325Â°F using a stoneware bread pan.", 'Cool in pan for 10 minutes and turn out on rack.']   
        },
        {
        name: "Thai Sweet Potato and Leek Soup" , 
        description: "From Taste of Home Celebrations Cookbook 2008." , 
        ingredients:['cooked rice', 'shrimp', 'oil', 'onion', 'garlic cloves', 'celery', 'green bell pepper', 'tomato paste', 'sugar', 'salt', 'black pepper', 'cayenne pepper', 'cornstarch', 'green onion top']  , 
        quantity:["4   cups    cooked rice","1   lb    shrimp, peeled and deveined ","1   cup    oil","1   cup    onion, chopped ","4       garlic cloves, minced ","1/2  cup    celery, chopped ","1/2  cup    green bell pepper, chopped ","2   tablespoons    tomato paste","1   teaspoon    sugar","  salt","  black pepper","  cayenne pepper","2   teaspoons    cornstarch","1/2  cup    green onion top, finely chopped  (the green part)"]  , 
        serving_size: "1 (137 g)" , 
        servings: "6" , 
        steps:['Cook rice separately.', 'Chop shrimp and set aside.', 'Heat oil in heavy pot.  Add onion, celery, green pepper and garlic.  Cook uncovered over medium heat until onions are wilted.', 'Add tomato paste and cook, stirring constantly, for about 15 minutes.', 'Add 1.5 cups water.  Season to taste with salt, black and cayenne pepper.  Add sugar and cook uncovered over medium heat for about 50 minutes, stirring occasionally, or until oil floats to the top.', 'Add shrimp; continue cooking and stirring another 20 minutes.', 'Dissolve cornstarch in 1/2 cup water and add to pan; cook another 5 minutes.', 'Mix it with previously-cooked rice.  Add green onion tops.  Mix well.']   
        },
        {
        name: "Mincemeat Pear Pie" , 
        description: "This is a go to recipe in my house. It can be thrown together really quickly and even my very picky kids (and husband) love it!" , 
        ingredients:['reduced-fat italian salad dressing', 'beef sirloin steak', 'fat free sour cream', 'parmesan cheese', 'black pepper', 'onion']  , 
        quantity:["1/2  cup    reduced-fat Italian salad dressing","1   lb    beef sirloin steak, well-trimmed ","1/3  cup    fat free sour cream","4 1/2  teaspoons   grated parmesan cheese","  black pepper","1   medium    onion, thinly sliced "]  , 
        serving_size: "1 (165 g)" , 
        servings: "10" , 
        steps:['POUR 1/4 cup of the dressing over steak in resealable plastic bag.', 'Seal bag; turn to coat.', 'Refrigerate 30 minute or overnight to marinate.', 'Combine sour cream, 2 tablespoons of the remaining dressing, the Parmesan cheese and pepper.', 'Refrigerate until serving time.', 'HEAT remaining 2 tablespoons dressing in large nonstick skillet on medium heat.', 'Add onions; cook 7 to 8 minute or until golden brown, stirring frequently.', 'Remove onions; set aside.', 'DRAIN steak; discard marinade.', 'Cook steak in same skillet on medium heat 3 to 4 minute on each side for medium doneness.', 'Place on cutting board; slice crosswise into thin strips.', 'Serve steak topped with sauce and onions.']   
        },
        {
        name: "Plantation Beef Hash" , 
        description: "A healthy alternative for toddler and pre-school birthday parties and celebrations." , 
        ingredients:['onion', 'red chili pepper', 'leeks', 'sweet potatoes', 'garlic cloves', 'vegetable stock', 'coconut milk']  , 
        quantity:["1       onion","1       red chili pepper","2       leeks","2       sweet potatoes","2       garlic cloves","2   pints    vegetable stock","8   ounces    coconut milk"]  , 
        serving_size: "1 (181 g)" , 
        servings: "6" , 
        steps:['Put chopped onion into a pot and stir until soft.', 'Add the chopped red chili (with or without seed).', 'Add 2 chopped leeks.', 'Add chopped garlic.', 'Fill with vegetable stock.', 'Bring to the boil.', 'Add the chopped sweet potatoes.', 'Salt/pepper to taste.', 'Simmer for 20 minutes.', 'Take off the heat.', 'Add coconut cream or milk.', 'Blend until smooth.', 'Enjoy with chunky fresh bread.']   
        },
        {
        name: "Snickers Bar Salad" , 
        description: "Adapted from Better Homes and Gardens.  I dont care for a lot of heat; recipe can be changed to taste." , 
        ingredients:['mincemeat', 'pears', 'walnuts', 'lemon zest', 'ground ginger', 'granulated sugar', 'pastry for a double-crust 9-inch pie']  , 
        quantity:["1 (27   ounce) jar   mincemeat","1 (15   ounce) can   pears, chopped ","1/2  cup    walnuts, chopped ","2   tablespoons    lemon zest","1/4  teaspoon    ground ginger","2   teaspoons    granulated sugar","1       pastry for a double-crust 9-inch pie"]  , 
        serving_size: "1 (203 g)" , 
        servings: "10" , 
        steps:['Preheat oven to 425 degrees F.', 'Prepare pastry for a 2-crust, 9 1/2" deep dish pie.', 'In large bowl, combine mince, pears, nuts, zest &amp; ginger, then spoon into prepared pie shell.', 'Top with 2nd crust, then flute &amp; cut several slits in top.', 'Sprinkle with sugar &amp; bake 35-45 minutes, until golden brown.', 'If necessary, cover edges with foil to keep from over-browning or burning.']   
        },
        {
        name: "Philly Beef n Pepper Strata" , 
        description: "From Throwdown by Bobby Flay" , 
        ingredients:['cooked beef', 'baking potatoes', 'onions', 'green bell pepper', 'celery ribs', 'dry mustard', 'salt', 'garlic powder', 'ground thyme', 'beef broth']  , 
        quantity:["3   cups    cooked beef, coarsely chopped  (use leftover pot roast, oven roast, corned beef, etc.)","2   large    baking potatoes, peeled and diced ","2   medium    onions, chopped ","1       green bell pepper, chopped ","2       celery ribs, finely chopped ","1   teaspoon    dry mustard","1   teaspoon    salt","1   teaspoon    garlic powder","1/4  teaspoon    ground thyme","1 1/2  cups    beef broth (*)"]  , 
        serving_size: "1 (129 g)" , 
        servings: "12" , 
        steps:['*If you have a cup or so of leftover gravy, use gravy with water or broth to make 1 1/2 cups.', 'Combine all ingredients and pack into a well-greased shallow baking pan.', 'Cover with foil and bake at 375Â° for 45 minutes.', 'Uncover and brown under broiler.']   
        },
        {
        name: "Sun-Dried Tomato Chicken Pesto Couscous Salad" , 
        description: "I threw together this vegetable soup for lunch the other day. It was really tasty and warming, with the Tabasco giving a good little zing. Its also super healthy, which is a bonus. I diced all my vegetables into about 5mm - 1cm cubes. Vary it according to how you like it, but be aware that the chunkier they are, the longer itll take to cook." , 
        ingredients:['cool whip', 'instant vanilla pudding', 'green apples', 'snickers candy bars']  , 
        quantity:["16   ounces    Cool Whip","1 (5 1/8  ounce) box   instant vanilla pudding","6       green apples (cut in chunks)","6       Snickers candy bars (refridgerate for an hour then cut into pieces)"]  , 
        serving_size: "1 (649 g)" , 
        servings: "2" , 
        steps:['Mix cool whip with pudding. Fold in apples and snicker bars. Chill about 1 hour.']   
        },
        {
        name: "Lighter Boston Cream Pie" , 
        description: "This recipe is a lovely way to prepare chard.  We often pair with burgers or other red meats.  I like to first blanche the chard in boiling water for one minutes and shock in ice water before proceeding with the recipe below.  Found in Marthastewart.com" , 
        ingredients:['italian bread', 'frozen peppers and onions', 'cooked beef', 'monterey jack cheese', 'eggs', 'milk', 'dijon mustard', 'pepper', 'salt']  , 
        quantity:["7   cups    Italian bread, cubed ","16   ounces    frozen peppers and onions, stir-fry blend ","3/4  lb    cooked beef, cut into strips ","2   cups   shredded monterey jack cheese","8       eggs","2 1/4  cups    milk","2   tablespoons    Dijon mustard","1/2  teaspoon    pepper","1/2  teaspoon    salt"]  , 
        serving_size: "1 (92 g)" , 
        servings: "12" , 
        steps:['Place a third of the bread cubes in a greased 13 x 9 inches baking dish.  Layer with a third of the pepper/onion blend, roast beef, and cheese.  Repeat layers twice.', 'In a large bowl, whisk the eggs, milk, mustard, salt and pepper, pour over the top.', 'Cover and refrigerate for 8 hours or overnight.', 'Remove from refrigerator 30 minutes before baking.', 'Bake, covered at 325 for 1 hour.', 'Uncover and bake 15-20 minutes longer or until a knife inserted in the middle comes out clean.  let stand for 10 minutes before serving.']   
        },
        {
        name: "Orzo With Asiago and Parsley" , 
        description: "This is a spicy rice dish with a touch of sweetness from corn. A great side to any Mexican dish" , 
        ingredients:['olive oil', 'chicken breasts', 'sun-dried tomato pesto', 'quick-cooking couscous', 'water', 'instant chicken bouillon granules', 'lemon rind', 'lemon juice', 'sun-dried tomatoes', 'sun-dried tomato pesto', 'rocket']  , 
        quantity:["  olive oil","2       chicken breasts","2   tablespoons    sun-dried tomato pesto","2 (100   g)   sachets quick-cooking couscous (this makes enough for 4 but I make this amount as I like to take the couscous to work the next day f)","700   ml    water","1   teaspoon    instant chicken bouillon granules","2   teaspoons    lemon rind, finely grated ","2   tablespoons    lemon juice","4       sun-dried tomatoes, chopped finely ","2   tablespoons    sun-dried tomato pesto (Extra)","60   g    rocket"]  , 
        serving_size: "1 (51 g)" , 
        servings: "4" , 
        steps:['Bring the water and stock to the boil, add sachets cook according to packet instructions. (Mine is 2 minutes) Cut sachets open and pour couscous into a large bowl, fluff with fork.', 'Add juice, rind, pesto and chopped sun-dried tomatoes, stir gently to combine.', 'Add a little oil to a fry pan, rub 1 tablespoon of pesto over each breast, cook chicken on both sides until browned and cooked through.', 'Toss rocket gently into couscous.', 'To Serve: place couscous on a plate top with sliced pesto chicken.']   
        },
        {
        name: "Chris Mexican Salsa" , 
        description: "Borscht is like chili; theres no one recipe for it.  This recipe is somewhat unusual because it does not have cabbage; the addition of lime juice and sugar may also not be traditional.  My mother did get it from a Russian coworker.  It is the borscht I grew up with and I love it." , 
        ingredients:['butter', 'sugar', 'eggs', 'unsweetened applesauce', 'vanilla extract', 'cake flour', 'baking powder', 'salt', 'nonfat milk', 'nonfat milk', 'sugar-free instant pudding mix', 'confectioners%27 sugar', 'baking powder', 'vanilla extract', 'nonfat milk']  , 
        quantity:["1/3  cup    butter, softened ","3/4  cup    sugar","2       eggs, lightly beaten ","1/3  cup    unsweetened applesauce","1 1/2  teaspoons    vanilla extract","2 1/4  cups    cake flour","2   teaspoons    baking powder","1/2  teaspoon    salt","1/2  cup    nonfat milk","","1/8  cup   cold nonfat milk","1 (1   ounce) package   sugar-free instant pudding mix","","1 1/4  cups    confectioners\u0027 sugar","2   tablespoons    baking powder","1/2  teaspoon    vanilla extract","1 -2   tablespoon    nonfat milk"]  , 
        serving_size: "1 (3178 g)" , 
        servings: "1" , 
        steps:['In a large mixing bowl, beat butter and sugar until crumbly.  Add eggs and mix well.  Beat in applesauce and vanilla.  Combine the flour, baking powder, and salt.  Add dry mixture to the butter mixture alternately with milk until blended.', 'Coat two 9 inch round baking pans with cooking spray and sprinkle with flour; add batter.  Bake at 350Â°F for 12-15 minutes or until a toothpick comes out clean.  cool for 100 minutes before removing from pant to wire racks.  Let cool completely on wracks.', 'For Filling, in a small bowl, whisk milk and pudding mix for 2 minutes.  Let stand for 2 minutes or until soft-set.  Place one cake layer on a serving plate; top with filling and remaining cake layer.', 'For glaze, in a small bowl, combine confectionery sugar, cocoa, and vanilla.  Add enough milk to achieve desire consistency.  spread over top of cake, allowing some glaze to drape down the sides.']   
        },
        {
        name: "Spinach Stuffed Portabella" , 
        description: "This is a great soup served on a cold day. Talk about your comfort food--Yum!" , 
        ingredients:['orzo pasta', 'asiago cheese', 'butter', 'fresh parsley']  , 
        quantity:["1   cup    orzo pasta","1/2  cup   crumbled asiago cheese, ceese ","2   tablespoons    butter","2   tablespoons   chopped fresh parsley"]  , 
        serving_size: "1 (226 g)" , 
        servings: "6" , 
        steps:['Cook orzo in plenty of boiling salted water. Drain.', 'Return to saucepan with cheese, butter and parsley. Toss to blend and serve.']   
        },
        {
        name: "Red Beans With Bell Pepper" , 
        description: "I havent tried this recipe yet, but it sounds awfully good and it seems like a lot less work than frying." , 
        ingredients:['tomatoes', 'onions', 'green peppers', 'jalapeno pepper', 'garlic cloves', 'cumin', 'pepper', 'cayenne', 'canning salt', 'sugar', 'vinegar', 'lime juice', 'tomato sauce', 'tomato paste']  , 
        quantity:["8   cups    tomatoes, peeled, chopped and drained ","2 1/2  cups    onions, chopped ","1 1/2  cups    green peppers","1   cup    jalapeno pepper, chopped ","6       garlic cloves, minced ","2   teaspoons    cumin","2   teaspoons    pepper","1/4  teaspoon    cayenne","1/8  cup    canning salt","1/4  cup    sugar","1/3  cup    vinegar","4   tablespoons    lime juice","1 (15   ounce) can   tomato sauce","1 (12   ounce) can   tomato paste"]  , 
        serving_size: "1 (213 g)" , 
        servings: "4" , 
        steps:['Mix all together and bring to a slow boil for 20 minutes.']   
        },
        {
        name: "Spaghetti a La Melissa" , 
        description: "This soup is delicious and easy." , 
        ingredients:['portabella mushroom caps', 'button mushrooms', 'frozen chopped spinach', 'cream cheese', 'romano cheese', 'bacon', 'mayonnaise', 'garlic cloves', 'olive oil', 'balsamic vinegar', 'tarragon', 'italian seasoned breadcrumbs', 'salt %26 pepper']  , 
        quantity:["6       portabella mushroom caps","8       button mushrooms, chopped fine ","1 (10   ounce) box   frozen chopped spinach","8   ounces    cream cheese","1/3  cup    romano cheese","6   slices    bacon, cooked crisp and crushed fine ","1   tablespoon    mayonnaise","2   teaspoons    garlic cloves, chopped fine ","2   tablespoons    olive oil","2   tablespoons    balsamic vinegar","1   teaspoon    tarragon","1   cup    Italian seasoned breadcrumbs","  salt \u0026 pepper"]  , 
        serving_size: "1 (262 g)" , 
        servings: "8" , 
        steps:['Saute bacon until crisp and drain well on paper towels until cool,  reserving two tablespoons of bacon fat.', 'Saute chopped mushrooms and garlic in bacon fat on medium heat being careful not to burn the garlic about 5 minutes.', 'Add chopped spinach and saute until water is absorbed.', 'Reduce heat to low and add cream cheese, romano, crushed bacon, mayonnaise and tarragon, let mixture cool.', 'Brush Portabella caps with balsamic vinegar and then olive oil, salt and pepper, grill over medium heat 4 minutes on each side.', 'Spread with spinach mixture evenly over the mushroom caps and sprinkle lightly with Italian breadcrumbs. Put in baking dish and bake 15 minutes at 375.']   
        },
        {
        name: "Excellent Brunch Sandwiches" , 
        description: "Pasta and beans--yummy and good for you." , 
        ingredients:['red beans', 'green bell pepper', 'sausage']  , 
        quantity:["1 (27   ounce) can   red beans (I like Blue Runner beans or what you prefer)","1/2-1      whole green bell pepper (if you really like bell pepper,use more)","1   lb    sausage (of your choice)"]  , 
        serving_size: "1 (78 g)" , 
        servings: "12" , 
        steps:['Heat beans or make the way you prefer.', 'In the last 15-20 minutes of cooking the beans,clean and chop bell pepper.Add to pot.', 'Simmer until bell pepper is soft and had slighty flavored the beans.']   
        },
        {
        name: "Sausage Frittata" , 
        description: "Keep the ingredients for this recipe on hand to make a healthful after-school snack." , 
        ingredients:['olive oil', 'beef mince', 'fresh sage', 'fresh rosemary', 'garlic cloves', 'brown onion', 'celery ribs', 'celery salt', 'carrot', 'diced tomatoes', 'chicken', 'worcestershire sauce', 'red wine', 'water', 'salt and pepper', 'spaghetti', 'parmesan cheese']  , 
        quantity:["1   tablespoon    olive oil","500   g    beef mince","1   tablespoon    fresh sage, sliced ","1   tablespoon    fresh rosemary, sliced ","4   big    garlic cloves, minced ","1       brown onion, finely diced ","4       celery ribs, finely chopped ","3   teaspoons    celery salt","1       carrot, grated ","2 (400   g) cans   diced tomatoes","3   teaspoons    chicken or 3   teaspoons    vegetable stock","1 1/2  tablespoons    Worcestershire sauce","1/3  cup    red wine","1 -1 1/2  cup    water","  salt and pepper","  spaghetti, cooked and drained ","  parmesan cheese, to serve "]  , 
        serving_size: "1 (149 g)" , 
        servings: "6" , 
        steps:['In a skillet cook mince, rosemary and sage in olive oil on medium until golden brown.', 'Take out of pan but do not drain.', 'Add some more oil along with the garlic and onion and cook until lightly browned (do not burn). About 2 minutes.', 'Add chopped celery and cook another 2 minutes or until soften.', 'Add 1 teaspoon celery salt and stir well.', 'Add carrot and 2 more teaspoons of celery salt, stir for 1 minute.', 'Add 2 tins of tomatoes and 3 teaspoons of dry chicken stock along with the Worcestershire sauce, red wine and 1 cup of water.', 'Stir well and cook on low heat for 4 minutes.', 'Add mince back into mixture and cook everything on low heat for 20 minutes.', 'Taste, and add more salt and pepper, stock or another 1/2 cup of water only if required.', 'Serve over Spaghetti, and use quality Parmesan that you have grated yourself.']   
        },
        {
        name: "Taras Spicy Vegetable Beef Soup" , 
        description: "This recipe is easy and fun to make (and the final product tastes delicious!). I like it served chilled with both caramel and whipped cream." , 
        ingredients:['dinner rolls', 'deli ham', 'swiss cheese', 'worcestershire sauce', 'mustard', 'poppy seed', 'butter', 'brown sugar']  , 
        quantity:["12      king\u0027s hawaiian dinner rolls","1/2  lb    deli ham, sliced thin ","1/2  lb    swiss cheese, sliced ","1   tablespoon    Worcestershire sauce","1   tablespoon    mustard","1   tablespoon    poppy seed","1/2  cup    butter","2   tablespoons    brown sugar"]  , 
        serving_size: "1 (362 g)" , 
        servings: "10" , 
        steps:['Cut rolls in half.', 'Cut ham and cheese into pieces so that it fits in the rolls.', 'Divide ham and cheese and place on bottom half of rolls.', 'Put tops back on rolls.', 'Arrange filled rolls in a 9 x 13 baking dish.', 'Combine remaining ingredients in a saucepan and bring to a boil.', 'Mix well and pour over rolls.', 'Refrigerate four hours or more.', 'Bake at 350 degrees for 15 minutes or until cheese melts and rolls are crusty.', 'These can be served warm or at room temperature.', 'Great as left overs, too.']   
        },
        {
        name: "Dairy Council Sugar Cookies" , 
        description: "I have tried dozens of pizza crust recipes, and this one stands out as the very best as far as taste, and ease of preparation. I usually make about a dozen and freeze as necessary to always have them on hand when needed (which is often)." , 
        ingredients:['chipolata sausages', 'red onion', 'cooking spray', 'salami', 'red capsicum', 'eggs', 'cream', 'tasty cheese', 'flat leaf parsley']  , 
        quantity:["400   g   beef chipolata sausages","1   medium    red onion, finely chopped ","  cooking spray","50   g    salami, cut into 2cm pieces ","1   medium    red capsicum, chopped finely ","8       eggs","1/2  cup    cream","1/2  cup    tasty cheese, coarsely grated ","1/2  cup    flat leaf parsley, chopped "]  , 
        serving_size: "1 (65 g)" , 
        servings: "22" , 
        steps:['Preheat oven to 200Â°C  Lightly grease a 6 cup square casserole dish.', 'Heat a large frying pan over moderate heat.  Cook and turn chipolatas for 4-5 minutes or until cooked.  Drain on paper towels.  Spray onion with oil.  Add to pan.  Cook and stir for 3 minutes.  Add salami and casicum, cook for 4 minutes more or until vegies soften.  Transfer to a medium bowl, let cool.', 'Whisk egg, cream, cheese and parsley in a large jug.  Stir into onion mixture.  Pour into prepared dish. Top with chipolatas.  Bake, uncovered, for 30-35 minutes or until mixture is set.', 'To serve, cut frittata into slices.']   
        },
        {
        name: "Spiced Apple Muffins" , 
        description: "This is a variation of the Greek potato-garlic puree made using roasted garlics which makes the taste more mellow. Its great on toast or crusty bread, or as a dip with veggies. From One Potato, Two Potato cookbook." , 
        ingredients:['soup mix', 'ground beef', 'corn', 'green beans', 'tomato sauce', 'picante sauce', 'water']  , 
        quantity:["1   package   of mrs grass hearty soup mix (Homestyle Beef Vegetable)","1   lb    ground beef","1 (15   ounce) can   corn","1 (15   ounce) can   green beans","1 (15   ounce) can   tomato sauce"," tapatio salsa picante sauce","8   cups    water"]  , 
        serving_size: "1 (74 g)" , 
        servings: "12" , 
        steps:['1. Brown ground beef in 8 quart sauce pan and drain grease.', '2. Whisk toghter 8 cups water and soup mix and ground beef.', '3. Add corn, green beans, and tomato sauce.', '4. Bring to a boil.', '5. Reduce heat, cover pot and simmer for 30 minutes.', '6. Add Tapatio Salsa Picante 15 to 20 shakes. (or to your taste).', "You're done. Serve it up and enjoy.", 'For a healthier recepie my wife uses ground turkey instead of beef.', 'I like to add some fresh sliced up corn tortillas to my bowl. It reminds me of chicken tortilla soup.', 'Enjoy :).']   
        },
        {
        name: "Strawberries and Cream Coffee" , 
        description: "Pumpkin Bread  enhanced with real maple syrup and plump  golden raisins. This recipe makes a very large loaf that rises well and is a moist bread. I usually double the recipe. Delicious served presliced and spread with cinnamon cream cheese spread. Great for a buffet." , 
        ingredients:['sifted flour', 'salt', 'baking soda', 'baking powder', 'ground nutmeg', 'butter', 'sugar', 'eggs', 'sour cream', 'vanilla extract']  , 
        quantity:["4 1/2  cups    sifted flour","1   teaspoon    salt","1   teaspoon    baking soda","1   teaspoon    baking powder","1/2  teaspoon    ground nutmeg","1   cup    butter","1 1/2  cups    sugar","2       eggs","1   cup    sour cream","1 1/2  teaspoons    vanilla extract"]  , 
        serving_size: "1 (375 g)" , 
        servings: "2" , 
        steps:['Sift flour, measure; resift with salt, soda, baking powder, and nutmeg.', 'Cream butter with sugar until fluffy.', 'Add eggs, one at a time, beating well after each addition.', 'Add dry ingredients alternately with sour cream, mixing until smooth after each addition.', 'Blend in vanilla.', 'Wrap in waxed paper and chill until firm enough to roll.', 'Roll on floured board to about 1/4 inch thick, cut with cup or cookie cutter.', 'Place on ungreased baking sheet.', 'Sprinkle with sugar and bake at 375 degrees for 12 minutes or until browned.']   
        },
        {
        name: "Feta and Sundried Tomato Chicken" , 
        description: "She got this recipe while we lived in Louisiana, during my early childhood.  It was love at first bite.  The only thing that changed over time was how much cayenne pepper I used on it.  If you just lightly spice it during cooking, then everyone can add their own cayenne pepper at the table." , 
        ingredients:['flour', 'baking powder', 'salt', 'granulated sugar', 'apple', 'egg', 'milk', 'butter', 'brown sugar', 'cinnamon', 'nutmeg']  , 
        quantity:["2   cups    flour","3 1/2  teaspoons    baking powder","1/2  teaspoon    salt","1/2  cup    granulated sugar","1   cup   chopped peeled apple","1       egg, lightly beaten ","1   cup    milk","1/3  cup   melted butter","2   tablespoons    brown sugar","1/4  teaspoon    cinnamon","1/4  teaspoon    nutmeg"]  , 
        serving_size: "1 (219 g)" , 
        servings: "3" , 
        steps:['Pre-heat oven to 400Â°F.', 'Mix together flour, baking powder, salt and sugar.', 'Mix in apple, cover completely.', 'Add egg, milk, and butter.', 'Pour 3/4 full into greased muffin tins.', 'Mix topping together and sprinkle over unbaked muffins.', 'Bake for 15-20 minutes or until brown.', 'Eat them.']   
        },
        {
        name: "Easy Spinach and Sausage Pie" , 
        description: "From Kraft Foods newsletter" , 
        ingredients:['coffee', 'strawberry', 'strawberry jam', 'vanilla ice cream', 'ice cubes']  , 
        quantity:["1   cup    coffee, freshly brewed ","1   cup    strawberry, sliced frozen ","1/4  cup    strawberry jam","2   scoops    vanilla ice cream","6       ice cubes"]  , 
        serving_size: "1 (196 g)" , 
        servings: "6" , 
        steps:['Pour the hot coffee into a blender.', 'Add the strawberries, jam, and ice cream and blend together.', 'With the blender motor running at the highest speed, drop in the ice cubes, one at a time, and mix until mixture is very cold and frothy.', 'Pour into one large or two medium-sized glasses and serve immediately.']   
        },
        {
        name: "Homemade Vanilla Wafer Cookies!" , 
        description: "This is a quick, easy and heart warming soup; simple to make. Makes a warm, thick creamy soup in 22 minutes." , 
        ingredients:['boneless skinless chicken breasts', 'onion', 'garlic cloves', 'sun-dried tomatoes', 'thyme', 'feta cheese', 'oat bran', 'flax seed', 'dried chili', 'salt', 'pepper', 'string']  , 
        quantity:["3       boneless skinless chicken breasts, 8 oz each, pounded thin ","1/2      onion, diced 0 ","3       garlic cloves, minced ","1 1/2  ounces    sun-dried tomatoes, diced ","1   teaspoon    thyme","6   ounces    feta cheese, crumbled finely ","1   tablespoon    oat bran","1   tablespoon    flax seed, ground ","1       dried chili, ground ","  salt","  pepper"," butcher string"]  , 
        serving_size: "1 (8 g)" , 
        servings: "82" , 
        steps:['SautÃ© onion for 10 minutes.', 'Put aside to cool.', 'In a bowl, combine Feta cheese, flax seed, oat bran, thyme, sun-dried tomatoes, and garlic and chilli, mix with onion.', 'Toss until well mixed (this will be your "stuffing").', 'Lay a flattened piece of chicken breast on a cutting board or your counter.', 'Put a 1/3 of the above mixture on the flattened chicken breast like you would be making a burrito and roll as tight as you can get it.', 'Secure it with butcher string.', 'Place chicken breast "roll" on a baking sheet and season with salt and pepper.', 'Preheat oven to 350Â°F.', 'Cook for about 35 minutes or until the internal temperature reaches 180Â°F.']   
        },
        {
        name: "Venison Summer Sausage" , 
        description: "When it comes to mincemeat, my collection is almost endless, & the same goes for pies! For this pie, sometimes instead of chopping the pears, I slice them lengthwise." , 
        ingredients:['spinach', 'pie crusts', 'sausage', 'mozzarella cheese', 'egg']  , 
        quantity:["1 (10   ounce) bag   spinach","18   inches    pie crusts","1 (8   ounce) package   sausage","8   ounces    mozzarella cheese, grated ","1       egg, scrambled "]  , 
        serving_size: "1 (2316 g)" , 
        servings: "1" , 
        steps:['in saute pan brown sausage, add spinach and cook down.', 'in medium mixing bowl add sausage and spinach mixture, egg, and cheese. mix well.', 'add mixture to nine inch pie crust.', 'cover with the second pie crust and pinch edges together.', 'cover edges with foil bake at 450 for 20 minutes remove foil and continue to bake for 15 more minutes.']   
        },
        {
        name: "Plain-Old Brownies" , 
        description: "This is an easy beef hash, made with leftover beef, potatoes, and vegetables, along with seasonings." , 
        ingredients:['rolled oats', 'boiling water', 'butter', 'sugar', 'vanilla', 'eggs', 'flour', 'baking soda', 'salt', 'cinnamon', 'nutmeg', 'butter', 'brown sugar', 'cream', 'coconut', 'nuts']  , 
        quantity:["","1   cup   uncooked rolled oats (instant or regular, I used rolled oats)","1 1/4  cups    boiling water","1/2  cup    butter or 1/2  cup    margarine","1   cup   granulated sugar","1   teaspoon    vanilla","2       eggs","1 1/2  cups    flour","1   teaspoon    baking soda","1/2  teaspoon    salt","3/4  teaspoon    cinnamon","1/4  teaspoon    nutmeg","","1/4  cup    butter or 1/4  cup    margarine, melted ","1/2  cup    brown sugar","3   tablespoons    cream or 3   tablespoons    milk","3/4  cup   flaked coconut","1/3  cup   chopped nuts"]  , 
        serving_size: "1 (45 g)" , 
        servings: "24" , 
        steps:['In a shallow bowl soak oats in boiling water for 20 minutes.', 'Meanwhile proceed by measuring butter and sugars into beater bowl and beating until light.', 'Beat in eggs and vanilla.', 'Sift and measure flour, sifting again with the soda and spices.', 'By this time the oats will be soaked and cool.', 'Remove beaters from creamed mixture and fold in soaked oats.', 'Sift flour mixture over and fold in.', 'Turn in a buttered 9x9" pan and bake at 350Â°F for 40-50 minutes .', 'Mix all the topping ingredients.', 'Do not remove cake from pan but while still hot spread topping over and put under the broiler until bubbly and tinged with gold.', 'Watch carefully.']   
        },
        {
        name: "Swiss Cheese Potato Bake" , 
        description: "The easiest form of Snicker bar salad out there!!! Amazing flavor" , 
        ingredients:['shortening', 'egg', 'low-fat milk', 'sugar', 'vanilla extract', 'cake flour', 'salt', 'baking powder']  , 
        quantity:["1/2  cup    shortening","1      beaten egg","1/4  cup    low-fat milk (nofat,or whole is fine)","1   cup    sugar","3   teaspoons    vanilla extract","2   cups    cake flour","1/2  teaspoon    salt","2   teaspoons    baking powder"]  , 
        serving_size: "1 (194 g)" , 
        servings: "6" , 
        steps:['Heat oven to 300Â°F.', 'Cream together the sugar and shortening.', 'Beat in egg and add vanilla extract and milk.', 'Sift together dry ingredients.', 'Add the wet mixture to dry mixture alternatly to cream mixture.', 'Drop by teaspoonfuls onto a greased baking sheet.', 'Bake 20 minutes.']   
        },
        {
        name: "Blueberry Mini-cakes (muffins)" , 
        description: "This is a recipe I found in Taste of Home Magazine.  I havent tried it yet but it sounds awesome!" , 
        ingredients:['ground venison', 'lean ground beef', 'water', 'onion powder', 'garlic powder', 'cracked black pepper', 'mustard seeds', 'liquid smoke', 'morton tender quick salt']  , 
        quantity:["3   lbs    ground venison (deer, elk, antelope This MUST be ground lean, as the tallow on venison is what gives it the \"wild\" t)","1   lb    lean ground beef","2   cups    water","1   teaspoon    onion powder","1/4  teaspoon    garlic powder (or a tad more)","4   teaspoons    cracked black pepper","2   teaspoons    mustard seeds","2   teaspoons    liquid smoke","4   tablespoons    Morton Tender Quick salt"]  , 
        serving_size: "1 (39 g)" , 
        servings: "24" , 
        steps:['Mix all together thoroughly.', 'Form into 2-21/2" logs about 8" long.', 'Pack tightly as possible.', 'Wrap in aluminum foil, shiny side inches.', 'Refrigerate for 24 hours.', 'Take out, turn over and pierce foil several times with a fork.', 'Bake on a sprayed broiler rack over broiler pan at 325Â°F for 1 1/2 hour.', 'Unwrap and remove to rack to finish dripping.', 'Rewrap and refrigerate or freeze.']   
        },
        
        ];



// Check if ingredientButtons is already defined
if (typeof ingredientButtons === 'undefined') {
    // If not defined, get all ingredient buttons
    const ingredientButtons = document.querySelectorAll('.ingredient-button');
    
    // Add click event listeners to ingredient buttons
    ingredientButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Get the selected ingredient text
            const selectedIngredient = button.value;
    
            // Call a function to filter and display recipes based on the selected ingredient
            filterAndDisplayRecipes(selectedIngredient);
        });
    });
}



function filterAndDisplayRecipes(selectedIngredient) {
    // Clear the current recipe card content
    clearRecipeCard();

    // Filter recipes that include the selected ingredient
    const matchingRecipes = recipes.filter(recipe => recipe.ingredients.includes(selectedIngredient));

    // Display the matching recipes on the recipe card
    matchingRecipes.forEach(recipe => {
        const recipeCard = createRecipeCard(recipe);
        recipeOutput.appendChild(recipeCard);
    });
}


function clearRecipeCard() {
    recipeOutput.innerHTML = '';
}


function createRecipeCard(recipe) {
    const card = document.createElement('div');
    card.className = 'recipe-card';

    // Add recipe name and ingredient count to the card
    const recipeName = document.createElement('h3');
    recipeName.textContent = recipe.name;
    const ingredientCount = document.createElement('p');
    ingredientCount.textContent = `Ingredients: ${recipe.ingredients.length}`;

    card.appendChild(recipeName);
    card.appendChild(ingredientCount);

    // Add a button to view the full recipe details (you can customize this part)
    const viewButton = document.createElement('button');
    viewButton.textContent = 'View Recipe';
    viewButton.addEventListener('click', () => {
        // Show the full recipe details in a popup or a separate page
        // You can implement this part based on your specific requirements
        showRecipeDetails(recipe);
    });

    card.appendChild(viewButton);

    return card;
}




        



//     // Function to toggle ingredient selection
//     function toggleIngredient(ingredient) {
//         // Convert ingredient name to lowercase for case-insensitive matching
//         const lowerCaseIngredient = ingredient.toLowerCase();
//         if (selectedIngredients.has(lowerCaseIngredient)) {
//             selectedIngredients.delete(lowerCaseIngredient);
//         } else {
//             selectedIngredients.add(lowerCaseIngredient);
//         }
//         displaySelectedIngredients();
//     }

//     // Function to display selected ingredients
//     function displaySelectedIngredients() {
//         const selectedIngredientsDiv = document.getElementById('selectedIngredients');
//         selectedIngredientsDiv.innerHTML = Array.from(selectedIngredients).join(', ');
//     }

//     // Function to mark a recipe as a favorite
//     function markAsFavorite(recipeName) {
//         const recipe = recipes.find(recipe => recipe.name === recipeName);
//         if (recipe && !favoriteRecipes.some(favRecipe => favRecipe.name === recipeName)) {
//             favoriteRecipes.push(recipe);

//             // Store favorite recipes in local storage
//             localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));

//             displayFavoriteRecipes();
//         }
//     }

//     // Function to display favorite recipes
//     function displayFavoriteRecipes() {
//         const favoriteRecipesDiv = document.getElementById('favoriteRecipes');
//         favoriteRecipesDiv.innerHTML = "";

//         if (favoriteRecipes.length > 0) {
//             for (const favoriteRecipe of favoriteRecipes) {
//                 const recipeElement = document.createElement('div');
//                 recipeElement.innerHTML = `
//                     <h3>${favoriteRecipe.name}</h3>
//                     <p>Description: ${favoriteRecipe.description}</p>
//                     <h4>Ingredients:</h4>
//                     <ul>
//                         ${favoriteRecipe.ingredients.map((ingredient, index) => `<li>${ingredient}: ${favoriteRecipe.quantity[index]}</li>`).join('')}
//                     </ul>
//                     <h4>Serving Size:</h4>
//                     <p>${favoriteRecipe.serving_size}</p>
//                     <h4>Servings:</h4>
//                     <p>${favoriteRecipe.servings}</p>
//                     <h4>Steps:</h4>
//                     <ol>
//                         ${favoriteRecipe.steps.map(step => `<li>${step}</li>`).join('')}
//                     </ol>
//                     <button onclick="removeFromFavorites('${favoriteRecipe.name}')">Remove from Favorites</button>
//                 `;
//                 favoriteRecipesDiv.appendChild(recipeElement);
//             }
//         } else {
//             favoriteRecipesDiv.innerHTML = "<p>No favorite recipes selected.</p>";
//         }
//     }

//     // Function to remove a recipe from favorites
//     function removeFromFavorites(recipeName) {
//         // Retrieve favorite recipes from local storage
//         const storedFavoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));

//         if (storedFavoriteRecipes && storedFavoriteRecipes.length > 0) {
//             // Find the index of the recipe to remove
//             const indexToRemove = storedFavoriteRecipes.findIndex(recipe => recipe.name === recipeName);

//             if (indexToRemove !== -1) {
//                 // Remove the recipe from the stored favorites
//                 storedFavoriteRecipes.splice(indexToRemove, 1);

//                 // Update the local storage with the modified favorites
//                 localStorage.setItem('favoriteRecipes', JSON.stringify(storedFavoriteRecipes));

//                 // Re-display the favorite recipes
//                 displayFavoriteRecipes();
//             }
//         }
//     }

//     // Function to show/hide favorite recipes
//     function showFavorites() {
//         window.open('favorites.html', '_blank'); // Open favorites.html in a new window or tab
//     }

//     // Function to generate multiple recipes based on selected ingredients
//     function generateRecipes() {
//         // Convert all selected ingredients to lowercase for case-insensitive matching
//         const selectedIngredientsLower = Array.from(selectedIngredients).map(ingredient => ingredient.toLowerCase());

//         // Filter recipes based on matching ingredients
//         const matchingRecipes = recipes.filter(recipe =>
//             selectedIngredientsLower.every(ingredient => recipe.ingredients.includes(ingredient))
//         );

//         // Shuffle the matching recipes to randomize the order
//         const shuffledRecipes = shuffleArray(matchingRecipes);

//         // Display up to 5 matching recipes
//         const recipeOutput = document.getElementById('recipeOutput');
//         recipeOutput.innerHTML = "";

//         if (shuffledRecipes.length > 0) {
//             for (let i = 0; i < Math.min(5, shuffledRecipes.length); i++) {
//                 const selectedRecipe = shuffledRecipes[i];
//                 const recipeElement = document.createElement('div');
//                 recipeElement.innerHTML = `
//                     <h3>${selectedRecipe.name}</h3>
//                     <p>Description: ${selectedRecipe.description}</p>
//                     <h4>Ingredients:</h4>
//                     <ul>
//                         ${selectedRecipe.ingredients.map((ingredient, index) => `<li>${ingredient}: ${selectedRecipe.quantity[index]}</li>`).join('')}
//                     </ul>
//                     <h4>Serving Size:</h4>
//                     <p>${selectedRecipe.serving_size}</p>
//                     <h4>Servings:</h4>
//                     <p>${selectedRecipe.servings}</p>
//                     <h4>Steps:</h4>
//                     <ol>
//                         ${selectedRecipe.steps.map(step => `<li>${step}</li>`).join('')}
//                     </ol>
//                     <button onclick="markAsFavorite('${selectedRecipe.name}')">Add to Favorites</button>
//                 `;
//                 recipeOutput.appendChild(recipeElement);
//             }
//         } else {
//             recipeOutput.innerHTML = "<p>No matching recipes found.</p>";
//         }
//     }




//     function displayMatchingRecipes(matchingRecipes) {
//         matchingRecipes.forEach((recipe) => {
//             const recipeCard = document.querySelector(`[data-card-id="${recipe.name}"]`);
//             if (recipeCard) {
//                 const ingredientCountPlaceholder = recipeCard.querySelector(".ingredient-count-placeholder");
//                 if (ingredientCountPlaceholder) {
//                     ingredientCountPlaceholder.textContent = recipe.ingredientCount;
//                 }
//                 recipeCard.style.display = "block"; // Show the matching recipe card
//             }
//         });
//     }

    


//     const ingredientsButton = document.getElementById("ingredients-button");

// ingredientsButton.addEventListener("click", () => {
//     const selectedIngredients = getSelectedIngredients(); // Replace with your code to get selected ingredients
//     const matchingRecipes = matchRecipes(selectedIngredients);
//     displayMatchingRecipes(matchingRecipes);
// });







//     function matchRecipes(selectedIngredients) {
//         const matchingRecipes = [];
    
//         // Loop through each recipe in your array
//         recipes.forEach((recipe) => {
//             // Check if any of the selected ingredients are included in the recipe's ingredients
//             const matchingIngredients = selectedIngredients.filter((ingredient) =>
//                 recipe.ingredients.includes(ingredient)
//             );
    
//             // If there are matching ingredients, add the recipe to the list
//             if (matchingIngredients.length > 0) {
//                 matchingRecipes.push({
//                     name: recipe.name,
//                     ingredientCount: matchingIngredients.length,
//                 });
//             }
//         });
    
//         return matchingRecipes;
//     }
    













    // Function to open the popup
    function openPopup() {
        const popup = document.getElementById("popup");
        popup.style.display = "block";
    }

    // Function to close the popup
    function closePopup() {
        const popup = document.getElementById("popup");
        popup.style.display = "none";
    }

    // Get all elements with class "openPopupButton"
    const openButtons = document.querySelectorAll(".openPopupButton");

    // Get the close button by its ID
    const closeButton = document.getElementById("close-popup");

    // Add event listeners to all "View Recipe" buttons
    openButtons.forEach((button) => {
        button.addEventListener("click", openPopup);
    });

    // Event listener for the close button
    closeButton.addEventListener("click", closePopup);



    const favoriteButtons = document.querySelectorAll(".favoriteButton");

    favoriteButtons.forEach((button) => {
        button.addEventListener("click", () => {
            // Toggle the red color by adding/removing a CSS class
            button.classList.toggle("red-heart");
        });
    });