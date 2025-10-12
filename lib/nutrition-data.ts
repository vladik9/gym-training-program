export const pfcInfo = {
  protein: {
    name: "Protein",
    description: "Essential for building and repairing tissues and for metabolic reactions",
    caloriesPerGram: 4,
    recommendation: "1g per 1kg of body weight",
    bulking: "2g per 1kg of body weight",
  },
  fats: {
    name: "Fats",
    description: "Help absorb certain vitamins and produce hormones",
    caloriesPerGram: 9,
    recommendation: "1g per 1kg of body weight",
    bulking: "0.8g per 1kg of body weight (minimum)",
  },
  carbohydrates: {
    name: "Carbohydrates",
    description: "Provide energy and strength",
    caloriesPerGram: 4,
    recommendation: "Weight multiplied by 4g",
    bulking: "Twice as many grams as protein",
  },
}

export const macroRatios = {
  bulking: {
    men: { protein: "20-30%", fats: "10-20%", carbs: "50-60%" },
    women: { protein: "20-30%", fats: "10-20%", carbs: "50-60%" },
  },
  cutting: {
    protein: "40%",
    fats: "20%",
    carbs: "40%",
  },
}

export const sampleMenus = [
  {
    name: "Menu 1",
    calories: "~3000 kcal",
    meals: {
      breakfast: [
        "100g dry oatmeal with 200ml 1.5% milk",
        "3 boiled eggs (2 whites + 1 whole egg)",
        "1 slice of whole wheat toast",
      ],
      secondBreakfast: ["1 banana", "1 poppy seed roll"],
      lunch: ["100g dry white rice", "1/2 chicken breast", "100g vegetables", "1 slice of whole-grain bread"],
      afternoonSnack: ["100g cooked rice", "1/2 chicken breast"],
      dinner: ["100g vegetable salad", "200g pollack", "150g potatoes", "150g vegetable salad with sour cream"],
      lastMeal: ["150g skimmed cottage cheese", "150g kefir (1%)"],
    },
  },
  {
    name: "Menu 2",
    calories: "~3000 kcal",
    meals: {
      breakfast: [
        "100g dry buckwheat porridge",
        "An omelet made of 1 egg and 2 egg whites",
        "1 slice of whole wheat toast",
        "30g hard cheese",
      ],
      secondBreakfast: ["1 apple", "100g dried apricots/raisins/other dried fruits"],
      lunch: ["100g dry wheat porridge", "200g turkey filet/steak", "100g vinaigrette", "1 slice of grain bread"],
      afternoonSnack: ["100g cooked wheat porridge", "200g turkey filet", "100g vinaigrette"],
      dinner: ["200g hake", "100g green beans/stewed vegetables", "150g vegetable salad with sour cream"],
      lastMeal: ["150g cottage cheese", "1 banana"],
    },
  },
  {
    name: "Menu 3",
    calories: "~3000 kcal",
    meals: {
      breakfast: [
        "100g corn porridge with 200ml 1.5% milk",
        "1 sunny side up egg and 2 egg whites",
        "1 slice of corn bread",
        "1 tsp. butter",
      ],
      secondBreakfast: ["1 pear", "30g nuts (walnut, peanut, almond)", "100g marshmallow (marmalade)"],
      lunch: ["100g dry pearl porridge", "200g beef goulash/steak", "150g vegetable salad", "1 slice of rye bread"],
      afternoonSnack: ["100g cooked pearl porridge", "200g beef goulash/red meat", "150g vegetable salad"],
      dinner: ["1/2 chicken breast", "150g canned/fresh vegetables", "100g dry rice"],
      lastMeal: ["150g low-fat cottage cheese", "1 cup of ryazhenka"],
    },
  },
]

export const cuttingStages = [
  {
    stage: 1,
    name: "First stage (losing weight/shredding)",
    duration: "4 weeks",
    ratio: "Protein 50%; fat 20%; carbohydrates 30%",
    meals: {
      breakfast: ["nonfat cottage cheese - 200 g", "wholemeal toast", "fruit"],
      lunch: [
        "steamed fish, braised breast or beef - 200 g",
        "porridge boiled in water without sugar, milk and butter (any kind, except white rice) - 100 g",
        "vegetables - 100 g",
      ],
      dinner: ["poultry - 150g", "stewed vegetables - 100g", "porridge - 100g"],
    },
  },
  {
    stage: 2,
    name: "Second stage (no carbohydrate)",
    duration: "7 days",
    ratio: "70% proteins, 20% fats, and 10% carbohydrates",
    notes:
      "Only complex carbohydrates are allowed (in the first half of the day). Toast and any bread, even wholemeal, are excluded, fruit - too. The amount of cooked porridge is drastically reduced.",
    meals: {
      breakfast: ["nonfat cottage cheese - 200 g", "bread", "fruit"],
      lunch: [
        "steamed fish or stewed breast or beef - 200 g",
        "porridge boiled on water without sugar, milk and butter (any kind, except white rice) - 100 g",
        "salad with fresh vegetables - 100 g",
      ],
      dinner: ["poultry - 150g", "stewed vegetables - 100g"],
    },
  },
  {
    stage: 3,
    name: "Third stage (water elimination)",
    duration: "7 days",
    notes:
      "During this period of drying all carbohydrates are excluded from the menu, and regular water is replaced by distilled water. Other products from the first stage remain in limited quantities.",
    meals: {
      breakfast: [
        "salad with fresh vegetables - 120 g",
        "boiled white egg - 7 pcs",
        "1 tbsp. spoon of any boiled grits",
      ],
      secondBreakfast: ["2 tbsp. any boiled grits", "chicken breast-120 g", "fresh vegetables"],
      lunch: ["fish stew or steamed - 200g", "salad with fresh vegetables without any salt"],
      afternoonSnack: ["sport nutrition"],
      dinner: ["boiled or steamed seafood - 200 grams", "greens"],
    },
  },
]

export const foodGuidelines = {
  avoid: [
    "Sausages, pates",
    "Sweets, crisps",
    "Fast food, ready meals",
    "White bread, rolls",
    "Sweetened yogurts",
    "Sweet drinks (juices, lemonade, coke)",
    "Fried foods (very high in calories)",
  ],
  moderation: [
    "Dried fruit",
    "Potatoes (preferably baked, boiled, or grilled)",
    "Alcohol (has a lot of calories and increases appetite)",
    "Fatty meats",
    "Refined products (pasta, rice)",
  ],
  tips: [
    "It is better to eat several smaller meals than to eat one big meal",
    "Drink plenty of water, it fills your stomach and speeds up your metabolism",
    "Prepare meals in advance so you don't have to reach for unhealthy snacks out of desperation",
    "Read labels carefully",
    "The most important thing is a well-thought-out goal and consistency",
    "Don't give up when you fail, everyone fails sometimes. It's the ability to get up and keep going that counts",
  ],
}

export const vitaminsAndMinerals = [
  {
    name: "Vitamin A (Retinol)",
    function: "Plays a crucial role in bone fusion, the formation of new bone cells, and vision",
  },
  {
    name: "Vitamin D (Calciferol)",
    function: "Influences bone strength and regulates phosphorus and calcium metabolism",
  },
  {
    name: "Vitamin E (Tocopherol)",
    function: "Slows down cell oxidation, strengthens the heart muscle, and prevents blood clots",
  },
  {
    name: "Vitamin K",
    function:
      "Participates in connective tissue and bone metabolism, helps with normal blood clotting, and improves muscle function",
  },
  {
    name: "Vitamin C (Ascorbic acid)",
    function: "Is vital in collagen fiber synthesis, metabolism, and overall body development",
  },
  {
    name: "Vitamin B1 (Thiamine)",
    function:
      "Helps the body to assimilate carbohydrates completely, and its deficiency can cause nervous system disorders",
  },
  {
    name: "Vitamin B2 (Riboflavin)",
    function: "Is essential for healthy skin and mucous membrane, and a deficiency can cause stunted growth",
  },
  {
    name: "Vitamin B6 (Pyridoxine)",
    function: "Is crucial for amino acid formation, and a deficiency can lead to impairment in the process",
  },
  {
    name: "Vitamin B9 (Folic acid)",
    function: "Is responsible for normal hematopoiesis, and its deficiency can lead to various forms of anemia",
  },
  {
    name: "Vitamin B12 (Cyanocobalamin)",
    function: "Is involved in the process of protein synthesis, promotes the creation of red blood cells",
  },
  { name: "Chromium", function: "Accelerates insulin production and improves carbohydrate metabolism" },
  {
    name: "Copper",
    function: "Is involved in the process of pigmentation and collagen formation. Helps with the absorption of iron",
  },
  {
    name: "Iron",
    function:
      "Is an essential component of hemoglobin, a protein in red blood cells that helps carry oxygen throughout the body",
  },
  {
    name: "Zinc",
    function:
      "Helps regulate metabolism, plays a role in the production of hormones, and supports reproductive function",
  },
]

export const aminoAcids = [
  {
    name: "Glutamine",
    function:
      "Essential amino acid that is particularly important for the immune system. Helps boost resistance to infections",
  },
  {
    name: "Leucine, Isoleucine, and Valine",
    function:
      "Branched-chain amino acids crucial for muscle building and recovery. Serve as a reserve source of energy",
  },
  {
    name: "Ornithine",
    function: "Promotes fat burning and enhances metabolic processes. Increases growth hormone levels",
  },
  {
    name: "Carnitine",
    function: "Known for its ability to promote fat loss. Helps boost weight loss efforts while preserving muscle mass",
  },
  {
    name: "Creatine Monohydrate",
    function:
      "One of the most popular sports supplements for muscle building. Increases muscle mass and strength at 7g per day",
  },
]
