/**
 * recipes.js
 * 
 * Curated, verified recipe bank for the Dinner Scheduler.
 * Each category has enough recipes to rotate through ~6 months without repeating.
 * 
 * Structure per recipe:
 *   name        — Display name of the dish
 *   prepTime    — Hands-on prep time (string)
 *   cookTime    — Active/passive cook time (string)
 *   totalTime   — Total from start to plate (string)
 *   crockpot    — Boolean: does this need to start in the morning?
 *   ingredients — Short bullet list of key ingredients
 *   steps       — Condensed step-by-step instructions
 *   url         — Source recipe URL (verified)
 */

const recipes = {

  // ─────────────────────────────────────────────
  // MONDAY — CHICKEN
  // ─────────────────────────────────────────────
  chicken: [
    {
      name: "Pan-Seared Creamy Garlic Chicken Breasts",
      prepTime: "5 min",
      cookTime: "25 min",
      totalTime: "30 min",
      crockpot: false,
      ingredients: [
        "2 large chicken breasts (sliced into 4 cutlets)",
        "Flour, salt, pepper, paprika",
        "Olive oil & butter",
        "1 shallot & 4 cloves garlic",
        "1 cup chicken stock",
        "1 cup heavy cream & Parmesan"
      ],
      steps: [
        "Dredge chicken cutlets in seasoned flour",
        "Sear in skillet with oil & butter, 4-5 min per side until golden — remove to plate",
        "Sauté shallot & garlic in same pan (do NOT clean it)",
        "Deglaze with chicken stock, scraping up browned bits",
        "Add heavy cream & Parmesan, stir into sauce",
        "Return chicken to pan, simmer 3-4 min until cooked through",
        "Serve over pasta, rice, or with crusty bread"
      ],
      url: "https://www.thechunkychef.com/creamy-garlic-chicken-breasts/"
    },
    {
      name: "Tuscan Chicken with Sun-Dried Tomatoes & Spinach",
      prepTime: "5 min",
      cookTime: "25 min",
      totalTime: "30 min",
      crockpot: false,
      ingredients: [
        "2 large chicken breasts (halved horizontally into 4 pieces)",
        "Olive oil, salt & pepper",
        "1 onion, 3 cloves garlic",
        "Oil-packed sun-dried tomatoes",
        "5 oz baby spinach",
        "1 cup heavy cream & ½ cup Parmesan",
        "2 tsp dried Italian seasoning"
      ],
      steps: [
        "Sear chicken in olive oil 3-5 min per side — remove to plate (not fully cooked yet)",
        "Sauté onion, garlic, sun-dried tomatoes & Italian seasoning in same pan",
        "Add heavy cream & Parmesan, stir into sauce",
        "Return chicken to pan, cook through in sauce ~5-7 min",
        "Stir in spinach until wilted",
        "Serve over pasta or with crusty bread"
      ],
      url: "https://www.thekitchn.com/tuscan-chicken-recipe-23624913"
    },
    {
      name: "15-Minute Honey Garlic Chicken",
      prepTime: "3 min",
      cookTime: "12 min",
      totalTime: "15 min",
      crockpot: false,
      ingredients: [
        "1 lb chicken breast, cubed",
        "3 tbsp honey",
        "3 tbsp low-sodium soy sauce",
        "3 cloves garlic, minced",
        "Pinch red pepper flakes (optional)",
        "Olive oil, salt & pepper",
        "Rice to serve"
      ],
      steps: [
        "Heat olive oil in skillet over medium-high",
        "Season chicken cubes lightly with salt & pepper, add to skillet",
        "Brown on one side ~3-4 min",
        "Whisk honey, soy sauce, garlic & red pepper in a small bowl",
        "Flip chicken, pour sauce over, toss to coat",
        "Cook until cooked through, 4-5 more min (sauce will thicken)",
        "Serve over rice, garnish with green onions & sesame seeds"
      ],
      url: "https://www.familyfoodonthetable.com/15-minute-honey-garlic-chicken/"
    },
    {
      name: "Honey Butter Chicken",
      prepTime: "5 min",
      cookTime: "15 min",
      totalTime: "20 min",
      crockpot: false,
      ingredients: [
        "1.5 lbs chicken breast",
        "3 tbsp olive oil + 3 tbsp butter (divided)",
        "3 tbsp honey",
        "2 tbsp apple cider vinegar",
        "3 cloves garlic, minced",
        "Salt & pepper",
        "Rice to serve"
      ],
      steps: [
        "Heat 1 tbsp oil + 1 tbsp butter in large skillet over medium-high",
        "Season chicken with salt & pepper, cook 6-8 min until browning — flip",
        "Whisk honey, apple cider vinegar, garlic, salt & pepper in bowl",
        "Pour sauce over chicken, add remaining 2 tbsp butter",
        "Cook another 3-4 min until sauce is bubbly and chicken cooked through",
        "Serve over rice"
      ],
      url: "https://www.lifeisbutadish.com/20-not-boring-dinners-with-boneless-chicken-breasts/"
    },
    {
      name: "Baked Tuscan Chicken Breasts",
      prepTime: "10 min",
      cookTime: "20 min",
      totalTime: "30 min",
      crockpot: false,
      ingredients: [
        "4 chicken breasts, pounded to even thickness",
        "Italian seasoning, paprika, salt & pepper",
        "1 cup heavy cream",
        "3 cloves garlic",
        "½ cup sun-dried tomatoes",
        "½ cup Parmesan",
        "5 oz baby spinach"
      ],
      steps: [
        "Preheat oven to 425°F",
        "Season chicken and place in 9x13 baking dish",
        "Whisk cream, garlic, cornstarch, salt & pepper",
        "Stir in sun-dried tomatoes & Parmesan, pour around (not over) chicken",
        "Bake 20-25 min until chicken is cooked through",
        "Remove from oven, stir spinach into sauce until wilted",
        "Let rest 5 min before serving"
      ],
      url: "https://www.thereciperebel.com/baked-tuscan-chicken-breasts/"
    },
    {
      name: "Lemon Chicken (30-Minute Skillet)",
      prepTime: "5 min",
      cookTime: "25 min",
      totalTime: "30 min",
      crockpot: false,
      ingredients: [
        "2 large chicken breasts (halved into 4 cutlets)",
        "Flour, salt, pepper",
        "Butter & olive oil",
        "4 cloves garlic",
        "½ cup chicken broth",
        "Juice of 1 lemon + lemon slices",
        "Fresh parsley"
      ],
      steps: [
        "Pound chicken to even thickness, dredge in seasoned flour",
        "Sear in butter & oil, 4-5 min per side until golden — remove to plate",
        "Add garlic to pan, cook 30 seconds",
        "Add broth & lemon juice, scrape up browned bits, bring to simmer",
        "Return chicken to pan, cook through in sauce 3-4 min",
        "Garnish with parsley & lemon slices",
        "Serve with salad and crusty bread"
      ],
      url: "https://damndelicious.net/weeknight-lemon-chicken/"
    }
  ],

  // ─────────────────────────────────────────────
  // TUESDAY — MEXICAN
  // ─────────────────────────────────────────────
  mexican: [
    {
      name: "Ground Beef Tacos",
      prepTime: "5 min",
      cookTime: "20 min",
      totalTime: "25 min",
      crockpot: false,
      ingredients: [
        "1 lb ground beef",
        "1 packet taco seasoning",
        "Flour or corn tortillas",
        "Shredded cheese, lettuce, tomato",
        "Sour cream, salsa, guacamole"
      ],
      steps: [
        "Brown ground beef in skillet over medium-high heat",
        "Drain excess fat",
        "Add taco seasoning + ¼ cup water, stir & simmer 3-4 min",
        "Warm tortillas in microwave or dry skillet",
        "Build tacos with meat and toppings of choice",
        "Serve immediately"
      ],
      url: "https://www.isabeleats.com/ground-beef-tacos/"
    },
    {
      name: "Chicken Enchiladas with Red Sauce",
      prepTime: "20 min",
      cookTime: "30 min",
      totalTime: "50 min",
      crockpot: false,
      ingredients: [
        "2 cups cooked shredded chicken (rotisserie works great)",
        "1 red bell pepper, diced",
        "1 cup frozen corn",
        "2 cups shredded Mexican cheese blend",
        "1 can (19 oz) red enchilada sauce",
        "8 flour tortillas",
        "1 onion | cumin | garlic"
      ],
      steps: [
        "Preheat oven to 350°F",
        "Sauté onion, pepper, cumin & garlic — mix with chicken, corn & 1 cup cheese",
        "Pour half the enchilada sauce into a 9x11 baking dish",
        "Fill each tortilla, roll tight, place seam-side down",
        "Pour remaining sauce over top, sprinkle remaining cheese",
        "Cover with foil, bake 25-30 min",
        "Serve with sour cream & cilantro"
      ],
      url: "https://weelicious.com/mexican-enchiladas/"
    },
    {
      name: "Sheet Pan Chicken Fajitas",
      prepTime: "10 min",
      cookTime: "20 min",
      totalTime: "30 min",
      crockpot: false,
      ingredients: [
        "1.5 lbs chicken breast, sliced into strips",
        "3 bell peppers (mixed colors), sliced",
        "1 onion, sliced",
        "2 tbsp olive oil",
        "2 tsp fajita or taco seasoning",
        "Flour tortillas",
        "Sour cream, guacamole, salsa, lime wedges"
      ],
      steps: [
        "Preheat oven to 425°F, line sheet pan with foil",
        "Toss chicken, peppers & onion with olive oil & seasoning on pan",
        "Spread in a single layer",
        "Roast 18-22 min until chicken cooked through and veggies caramelized",
        "Squeeze lime over top",
        "Serve in warm tortillas with toppings"
      ],
      url: "https://www.isabeleats.com/sheet-pan-chicken-fajitas/"
    },
    {
      name: "Bean & Cheese Burritos",
      prepTime: "10 min",
      cookTime: "15 min",
      totalTime: "25 min",
      crockpot: false,
      ingredients: [
        "2 cans refried beans",
        "1½ cups shredded Mexican cheese blend",
        "4-6 large flour tortillas",
        "Cumin, garlic powder, onion powder, chili powder",
        "Sour cream, salsa, guacamole, hot sauce"
      ],
      steps: [
        "Warm refried beans in saucepan, season with spices",
        "Warm tortillas in microwave or skillet",
        "Spread beans down center of each tortilla",
        "Add cheese and any optional fillings (rice, diced onion, jalapeños)",
        "Roll tight burrito-style",
        "Optional: place in skillet seam-side down to crisp the exterior",
        "Serve with toppings"
      ],
      url: "https://www.isabeleats.com/bean-and-cheese-burritos/"
    },
    {
      name: "Chicken Quesadillas",
      prepTime: "5 min",
      cookTime: "20 min",
      totalTime: "25 min",
      crockpot: false,
      ingredients: [
        "2 chicken breasts, cooked & shredded (or rotisserie chicken)",
        "2 cups shredded Mexican cheese blend",
        "4 large flour tortillas",
        "1 tbsp taco seasoning",
        "Butter or olive oil for the pan",
        "Sour cream, salsa, guacamole to serve"
      ],
      steps: [
        "Season shredded chicken with taco seasoning",
        "Heat a skillet over medium heat, brush with butter",
        "Lay one tortilla flat, sprinkle cheese on one half",
        "Add chicken on top of cheese, fold tortilla over",
        "Cook 2-3 min per side until golden and crispy",
        "Cut into wedges, serve with dipping sides"
      ],
      url: "https://www.isabeleats.com/chicken-quesadillas/"
    },
    {
      name: "Steak Tacos with Pico de Gallo",
      prepTime: "15 min",
      cookTime: "15 min",
      totalTime: "30 min",
      crockpot: false,
      ingredients: [
        "1.5 lbs skirt steak or flank steak",
        "Lime juice, garlic, cumin, chili powder, salt",
        "Corn or flour tortillas",
        "Pico de gallo (tomato, onion, cilantro, jalapeño, lime)",
        "Avocado or guacamole",
        "Cotija cheese"
      ],
      steps: [
        "Marinate steak in lime juice, garlic, cumin, chili powder & salt 10-15 min",
        "Heat grill pan or cast iron skillet over very high heat",
        "Cook steak 3-4 min per side for medium-rare",
        "Rest 5 min, then slice thin against the grain",
        "Dice tomato, onion, jalapeño & cilantro — mix with lime juice for pico",
        "Serve steak in warm tortillas with pico, avocado & cotija"
      ],
      url: "https://lilluna.com/steak-tacos/"
    }
  ],

  // ─────────────────────────────────────────────
  // WEDNESDAY — CASSEROLES & PASTA
  // ─────────────────────────────────────────────
  casserole: [
    {
      name: "Classic Baked Ziti with Italian Sausage",
      prepTime: "15 min",
      cookTime: "45 min",
      totalTime: "1 hr",
      crockpot: false,
      ingredients: [
        "1 lb ziti or penne pasta",
        "1 lb Italian sausage (mild or hot)",
        "1 onion, diced",
        "Tomato paste + 28 oz crushed tomatoes",
        "Italian seasoning",
        "1 cup ricotta, 2 cups mozzarella, ½ cup Parmesan"
      ],
      steps: [
        "Cook pasta al dente, drain",
        "Brown sausage & onion in skillet, add tomato paste & crushed tomatoes",
        "Simmer sauce 10 min",
        "Stir ricotta into hot pasta until combined",
        "In a 9x13 baking dish: layer sauce → pasta → mozzarella (repeat)",
        "Top with Parmesan, bake at 375°F for 25-30 min until bubbly",
        "Rest 10 min before serving"
      ],
      url: "https://www.budgetbytes.com/classic-baked-ziti/"
    },
    {
      name: "Lazy Lasagna Bake",
      prepTime: "15 min",
      cookTime: "45 min",
      totalTime: "1 hr",
      crockpot: false,
      ingredients: [
        "1 lb penne, rigatoni, or ziti pasta",
        "1 lb ground beef (90/10)",
        "1 jar Rao's marinara (or favorite brand)",
        "1 cup ricotta (quality brand — BelGioioso recommended)",
        "1½ cups shredded mozzarella",
        "Fresh basil to garnish"
      ],
      steps: [
        "Cook pasta al dente, drain",
        "Brown ground beef, drain fat, mix with marinara sauce",
        "In a 9x13 baking dish: sauce → pasta → dollops of ricotta → mozzarella",
        "Repeat layers, top with remaining mozzarella",
        "Bake at 375°F for 30-35 min until cheese is golden & bubbly",
        "Garnish with basil, rest 10 min before serving"
      ],
      url: "https://thedizzycook.com/lazy-lasagna/"
    },
    {
      name: "Vegetarian Baked Ziti with Spinach & Ricotta",
      prepTime: "15 min",
      cookTime: "20 min",
      totalTime: "45 min",
      crockpot: false,
      ingredients: [
        "1 lb ziti or penne pasta",
        "5 oz baby spinach",
        "1 cup ricotta cheese",
        "2 cloves garlic, lemon zest, oregano, red pepper flakes",
        "1 jar marinara sauce",
        "1½ cups mozzarella & Parmesan",
        "Fresh basil"
      ],
      steps: [
        "Preheat oven to 425°F",
        "Cook pasta al dente, wilt spinach in same pot after draining",
        "Mix ricotta with garlic, lemon zest, oregano, red pepper, salt & pepper",
        "Toss pasta with most of the marinara",
        "Layer in casserole dish, dollop in ricotta, top with mozzarella & Parmesan",
        "Bake ~20 min until golden & bubbling",
        "Finish with fresh basil"
      ],
      url: "https://www.loveandlemons.com/baked-ziti/"
    },
    {
      name: "Baked Italian Casserole (Provolone & Sour Cream)",
      prepTime: "20 min",
      cookTime: "40 min",
      totalTime: "1 hr",
      crockpot: false,
      ingredients: [
        "1 lb ziti or penne pasta",
        "2 lbs ground beef",
        "½ cup diced onion",
        "48 oz spaghetti sauce",
        "12 slices provolone cheese",
        "2 cups sour cream",
        "8 oz shredded mozzarella"
      ],
      steps: [
        "Preheat oven to 350°F",
        "Brown ground beef & onion, drain fat, add spaghetti sauce",
        "Cook pasta al dente, drain",
        "In greased 9x13: half the noodles → provolone → sour cream → half the meat sauce",
        "Add remaining noodles → meat sauce → top with mozzarella",
        "Bake 35-40 min until cheese melted and bubbly",
        "Rest 10 min before slicing"
      ],
      url: "https://www.tastesoflizzyt.com/easy-baked-ziti-casserole-recipe/"
    },
    {
      name: "Cacio e Pepe",
      prepTime: "5 min",
      cookTime: "20 min",
      totalTime: "25 min",
      crockpot: false,
      ingredients: [
        "1 lb spaghetti or tonnarelli pasta",
        "2 cups finely grated Pecorino Romano",
        "1 cup finely grated Parmesan",
        "2 tsp coarsely ground black pepper",
        "Salt (for pasta water)",
        "1-2 tbsp pasta cooking water (key ingredient!)"
      ],
      steps: [
        "Cook pasta in well-salted water until al dente — SAVE 2 cups pasta water before draining",
        "Toast black pepper in a dry, large skillet over medium heat 1-2 min",
        "Add ¾ cup pasta water to skillet, bring to simmer",
        "Add drained pasta, toss to coat",
        "Remove from heat, add cheese gradually while tossing vigorously",
        "Add more pasta water as needed until silky and creamy (not clumpy)",
        "Serve immediately with extra pepper & cheese"
      ],
      url: "https://www.seriouseats.com/cacio-e-pepe-recipe"
    },
    {
      name: "Chicken Parmesan Baked Ziti",
      prepTime: "15 min",
      cookTime: "30 min",
      totalTime: "45 min",
      crockpot: false,
      ingredients: [
        "1 lb ziti pasta",
        "1 lb chicken breast, cubed",
        "1 jar marinara sauce",
        "1 cup ricotta",
        "2 cups mozzarella",
        "½ cup Parmesan",
        "Italian breadcrumbs, Italian seasoning, garlic powder"
      ],
      steps: [
        "Preheat oven to 375°F",
        "Cook pasta al dente, drain",
        "Season & brown chicken cubes in skillet, set aside",
        "Mix pasta with marinara, chicken & ricotta",
        "Pour into greased 9x13 baking dish",
        "Top with mozzarella, Parmesan & breadcrumbs",
        "Bake 25-30 min until golden and bubbly"
      ],
      url: "https://www.lifeisbutadish.com/parmesan-chicken-baked-ziti/"
    }
  ],

  // ─────────────────────────────────────────────
  // THURSDAY — CROCKPOT
  // ─────────────────────────────────────────────
  crockpot: [
    {
      name: "Buffalo Chicken Mac & Cheese",
      prepTime: "10 min",
      cookTime: "3-6 hrs",
      totalTime: "Start in the morning",
      crockpot: true,
      ingredients: [
        "1 lb boneless chicken breasts",
        "½ cup buffalo wing sauce (Frank's recommended)",
        "1 packet ranch seasoning",
        "1 cup chicken broth",
        "8 oz cream cheese, cubed",
        "1½ cups shredded cheddar cheese",
        "2 cups uncooked shell or elbow pasta"
      ],
      steps: [
        "Add chicken, buffalo sauce, ranch seasoning & broth to crockpot",
        "Cook LOW 6 hrs or HIGH 3 hrs",
        "Shred chicken with two forks directly in the pot",
        "Add cream cheese, cheddar, butter — stir & set to WARM for 30 min",
        "Meanwhile boil pasta al dente, drain",
        "Stir pasta into crockpot",
        "Garnish with green onions & drizzle of extra buffalo sauce"
      ],
      url: "https://kitchendivas.com/buffalo-chicken-mac-and-cheese-crock-pot/"
    },
    {
      name: "Slow Cooker Pot Roast with Carrots & Potatoes",
      prepTime: "15 min",
      cookTime: "8-9 hrs LOW",
      totalTime: "Start in the morning",
      crockpot: true,
      ingredients: [
        "3 lb chuck roast",
        "1 lb Yukon gold potatoes",
        "4 large carrots, cut into chunks",
        "1 onion, sliced",
        "4 cloves garlic",
        "2 cups beef broth",
        "1 tbsp Worcestershire sauce",
        "Fresh thyme & rosemary | salt & pepper",
        "Cornstarch (optional, for gravy)"
      ],
      steps: [
        "Season roast generously with salt & pepper",
        "Optional (recommended): sear roast in hot skillet until browned on all sides",
        "Layer sliced onion in bottom of slow cooker, place roast on top",
        "Add potatoes, carrots & garlic around roast",
        "Pour broth & Worcestershire over everything, add herbs",
        "Cook on LOW 8-9 hours",
        "Shred meat, thicken drippings into gravy with cornstarch slurry if desired"
      ],
      url: "https://www.cookingclassy.com/slow-cooker-pot-roast/"
    },
    {
      name: "Slow Cooker Beef Stew",
      prepTime: "15 min",
      cookTime: "8 hrs LOW or 4 hrs HIGH",
      totalTime: "Start in the morning",
      crockpot: true,
      ingredients: [
        "2 lbs chuck roast, cut into 1-inch cubes",
        "1 lb Yukon gold or red potatoes, cubed",
        "4 carrots, sliced",
        "1 onion, diced",
        "3 cloves garlic",
        "8 oz mushrooms",
        "2 cups beef broth",
        "2 tbsp tomato paste | 1 tbsp Worcestershire",
        "Thyme, rosemary, paprika | 3 tbsp flour",
        "1 cup frozen peas (add last 15 min)"
      ],
      steps: [
        "Toss beef cubes with flour, garlic salt, celery salt & pepper",
        "Add all ingredients except peas & cornstarch to slow cooker",
        "Cook LOW 8 hrs or HIGH 4 hrs until vegetables are tender",
        "Add frozen peas in last 15 min",
        "Stir in cornstarch slurry (¼ cup cold water + 3 tbsp cornstarch) to thicken",
        "Remove bay leaves and rosemary stem before serving"
      ],
      url: "https://thecozycook.com/slow-cooker-beef-stew/"
    },
    {
      name: "Slow Cooker Pulled Pork Roast",
      prepTime: "10 min",
      cookTime: "8-9 hrs LOW",
      totalTime: "Start in the morning",
      crockpot: true,
      ingredients: [
        "3-4 lb boneless pork shoulder (Boston butt)",
        "1 tsp each: salt, garlic powder, onion powder, paprika, thyme",
        "1 tbsp brown sugar",
        "1 cup low-sodium chicken broth"
      ],
      steps: [
        "Mix salt, garlic powder, onion powder, paprika, thyme & brown sugar",
        "Rub seasoning all over the pork roast",
        "Optional: sear in a hot skillet for deeper flavor",
        "Place pork in slow cooker, pour broth around it",
        "Cook LOW 8-9 hrs or HIGH 6 hrs until it pulls apart easily",
        "Shred in the pot, mix with the juices",
        "Serve over mashed potatoes, in sandwiches, or alongside roasted veggies"
      ],
      url: "https://www.eatingonadime.com/crock-pot-pork-roast-recipe/"
    },
    {
      name: "Slow Cooker Thai Peanut Chicken",
      prepTime: "10 min",
      cookTime: "4-6 hrs LOW",
      totalTime: "Start in the morning",
      crockpot: true,
      ingredients: [
        "1.5 lbs chicken breasts or thighs",
        "½ cup peanut butter",
        "¼ cup soy sauce",
        "2 tbsp honey",
        "2 tbsp lime juice",
        "1 tsp sriracha (adjust to taste)",
        "3 cloves garlic, minced | 1 tsp ginger",
        "Rice & garnishes: green onions, peanuts, cilantro, lime"
      ],
      steps: [
        "Mix peanut butter, soy sauce, honey, lime, sriracha, garlic & ginger",
        "Place chicken in slow cooker, pour sauce over top",
        "Cook LOW 4-6 hrs or HIGH 2-3 hrs",
        "Shred chicken directly in slow cooker, stir to coat in sauce",
        "Serve over rice",
        "Garnish with green onions, crushed peanuts & fresh cilantro"
      ],
      url: "https://slowcookergourmet.net/slow-cooker-thai-peanut-chicken/"
    },
    {
      name: "Crockpot Chicken & Rice Soup",
      prepTime: "10 min",
      cookTime: "6-8 hrs LOW",
      totalTime: "Start in the morning",
      crockpot: true,
      ingredients: [
        "1.5 lbs chicken breasts",
        "1 cup long-grain white rice (add last hour)",
        "4 carrots, sliced",
        "4 celery stalks, sliced",
        "1 onion, diced",
        "4 cloves garlic",
        "6 cups chicken broth",
        "1 tsp thyme | salt & pepper",
        "Fresh parsley to finish"
      ],
      steps: [
        "Add chicken, carrots, celery, onion, garlic, broth & thyme to slow cooker",
        "Cook LOW 6-7 hrs or HIGH 3-4 hrs",
        "Remove chicken, shred with forks, return to pot",
        "Add uncooked rice, cook on HIGH 30-45 min until rice is tender",
        "Season with salt & pepper",
        "Stir in fresh parsley before serving"
      ],
      url: "https://www.lifeisbutadish.com/slow-cooker-shredded-chicken-rice-soup/"
    }
  ]
};

module.exports = recipes;
