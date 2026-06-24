import { writeFile } from "node:fs/promises";
import path from "node:path";

const uid = process.env.DEMO_USER_UID || "WiIKxxa28abvJzcfpVdmBJ0gmeJ3";
const startDate = new Date("2026-04-13T00:00:00-05:00");
const dayCount = 56;
const generatedAt = "2026-06-24T00:00:00.000Z";

const categories = {
  dairy: "dairy",
  gluten: "gluten",
  fodmap: "fodmap",
  fat: "fat",
  spice: "spice",
  caffeine: "caffeine",
  alcohol: "alcohol",
  additive: "additive",
  fiber: "fiber",
  other: "other",
};

const breakfasts = [
  mealTemplate("Greek yogurt, granola, blueberries, and coffee", "Greek yogurt and granola", ["Greek yogurt", "granola", "blueberries", "coffee"], [
    irritant("lactose", categories.dairy, 0.68, "Greek yogurt can contain lactose."),
    irritant("caffeine", categories.caffeine, 0.55, "Coffee adds caffeine exposure."),
  ]),
  mealTemplate("Everything bagel with cream cheese and iced coffee", "Bagel with cream cheese", ["everything bagel", "cream cheese", "iced coffee"], [
    irritant("wheat gluten", categories.gluten, 0.72, "Bagel is wheat based."),
    irritant("lactose", categories.dairy, 0.63, "Cream cheese contains dairy."),
    irritant("caffeine", categories.caffeine, 0.55, "Iced coffee adds caffeine."),
  ]),
  mealTemplate("Two scrambled eggs, toast, orange juice, and coffee", "Eggs and toast", ["scrambled eggs", "toast", "orange juice", "coffee"], [
    irritant("wheat gluten", categories.gluten, 0.62, "Toast is commonly wheat based."),
    irritant("caffeine", categories.caffeine, 0.55, "Coffee adds caffeine exposure."),
  ]),
  mealTemplate("Breakfast burrito with eggs, sausage, cheese, salsa, and coffee", "Breakfast burrito", ["flour tortilla", "eggs", "sausage", "cheese", "salsa", "coffee"], [
    irritant("wheat gluten", categories.gluten, 0.65, "Flour tortilla is wheat based."),
    irritant("high fat", categories.fat, 0.66, "Sausage and cheese make this a higher-fat meal."),
    irritant("lactose", categories.dairy, 0.6, "Cheese may contain lactose."),
    irritant("capsaicin", categories.spice, 0.53, "Salsa may add spice."),
    irritant("caffeine", categories.caffeine, 0.55, "Coffee adds caffeine."),
  ]),
  mealTemplate("Oatmeal with banana, peanut butter, and black coffee", "Oatmeal with banana", ["oatmeal", "banana", "peanut butter", "black coffee"], [
    irritant("fiber load", categories.fiber, 0.52, "Oats and banana add fiber."),
    irritant("caffeine", categories.caffeine, 0.55, "Black coffee adds caffeine."),
  ]),
  mealTemplate("No breakfast, just a large latte after a rushed morning", "Large latte", ["large latte"], [
    irritant("lactose", categories.dairy, 0.72, "A latte contains milk."),
    irritant("caffeine", categories.caffeine, 0.65, "A large latte adds caffeine."),
  ]),
];

const lunches = [
  mealTemplate("Turkey sandwich on wheat bread, chips, pickle, and diet cola", "Turkey sandwich and chips", ["turkey sandwich", "wheat bread", "chips", "pickle", "diet cola"], [
    irritant("wheat gluten", categories.gluten, 0.68, "Wheat bread is gluten-containing."),
    irritant("additives", categories.additive, 0.45, "Chips and diet cola can include additives."),
    irritant("caffeine", categories.caffeine, 0.45, "Diet cola may contain caffeine."),
  ]),
  mealTemplate("Chicken Caesar salad with croutons and creamy dressing", "Chicken Caesar salad", ["chicken", "romaine", "croutons", "creamy Caesar dressing"], [
    irritant("wheat gluten", categories.gluten, 0.55, "Croutons are usually wheat based."),
    irritant("high fat", categories.fat, 0.52, "Creamy dressing can be higher fat."),
    irritant("lactose", categories.dairy, 0.42, "Caesar dressing may contain dairy."),
  ]),
  mealTemplate("Leftover spaghetti with meat sauce and parmesan", "Spaghetti with meat sauce", ["spaghetti", "meat sauce", "parmesan"], [
    irritant("wheat gluten", categories.gluten, 0.74, "Spaghetti is commonly wheat pasta."),
    irritant("garlic and onion", categories.fodmap, 0.64, "Meat sauce often contains onion and garlic."),
    irritant("lactose", categories.dairy, 0.4, "Parmesan adds dairy exposure."),
  ]),
  mealTemplate("Bean and cheese burrito with hot sauce", "Bean and cheese burrito", ["flour tortilla", "beans", "cheese", "hot sauce"], [
    irritant("GOS from beans", categories.fodmap, 0.72, "Beans are a common GOS/FODMAP source."),
    irritant("wheat gluten", categories.gluten, 0.62, "Flour tortilla is wheat based."),
    irritant("lactose", categories.dairy, 0.58, "Cheese contains dairy."),
    irritant("capsaicin", categories.spice, 0.6, "Hot sauce adds spice."),
  ]),
  mealTemplate("Sushi rolls, miso soup, and sparkling water", "Sushi and miso soup", ["sushi rolls", "miso soup", "sparkling water"], [
    irritant("carbonation", categories.other, 0.35, "Sparkling water adds carbonation."),
  ]),
  mealTemplate("Drive-through cheeseburger, fries, and cola", "Cheeseburger and fries", ["cheeseburger", "fries", "cola"], [
    irritant("high fat", categories.fat, 0.78, "Burger and fries are high-fat foods."),
    irritant("wheat gluten", categories.gluten, 0.62, "Burger bun is wheat based."),
    irritant("lactose", categories.dairy, 0.55, "Cheese adds dairy."),
    irritant("caffeine", categories.caffeine, 0.42, "Cola may contain caffeine."),
    irritant("carbonation", categories.other, 0.45, "Cola is carbonated."),
  ]),
  mealTemplate("Falafel pita with hummus, cucumber, onion, and tahini", "Falafel pita", ["falafel", "pita", "hummus", "cucumber", "onion", "tahini"], [
    irritant("chickpea GOS", categories.fodmap, 0.72, "Falafel and hummus are chickpea based."),
    irritant("wheat gluten", categories.gluten, 0.62, "Pita is wheat based."),
    irritant("onion fructans", categories.fodmap, 0.62, "Raw onion is a common fructan source."),
  ]),
];

const dinners = [
  mealTemplate("Chicken tacos on corn tortillas with avocado, salsa, and rice", "Chicken tacos", ["corn tortillas", "chicken", "avocado", "salsa", "rice"], [
    irritant("polyols from avocado", categories.fodmap, 0.48, "Avocado can contribute polyols depending on portion."),
    irritant("capsaicin", categories.spice, 0.52, "Salsa may add spice."),
  ]),
  mealTemplate("Pepperoni pizza, side salad with ranch, and beer", "Pepperoni pizza and beer", ["pepperoni pizza", "side salad", "ranch", "beer"], [
    irritant("wheat gluten", categories.gluten, 0.78, "Pizza crust is wheat based."),
    irritant("high fat", categories.fat, 0.76, "Pepperoni, cheese, and ranch increase fat."),
    irritant("lactose", categories.dairy, 0.64, "Pizza cheese and ranch add dairy."),
    irritant("alcohol", categories.alcohol, 0.62, "Beer adds alcohol exposure."),
    irritant("carbonation", categories.other, 0.45, "Beer is carbonated."),
  ]),
  mealTemplate("Salmon, roasted potatoes, broccoli, and a glass of white wine", "Salmon dinner", ["salmon", "roasted potatoes", "broccoli", "white wine"], [
    irritant("cruciferous vegetables", categories.fodmap, 0.42, "Broccoli can bother some people."),
    irritant("alcohol", categories.alcohol, 0.48, "White wine adds alcohol exposure."),
  ]),
  mealTemplate("Thai green curry with coconut milk, chicken, vegetables, and rice", "Thai green curry", ["green curry", "coconut milk", "chicken", "vegetables", "rice"], [
    irritant("capsaicin", categories.spice, 0.68, "Green curry is spicy."),
    irritant("high fat", categories.fat, 0.52, "Coconut milk adds fat."),
  ]),
  mealTemplate("Steak, mac and cheese, green beans, and two whiskey cocktails", "Steak and mac", ["steak", "mac and cheese", "green beans", "whiskey cocktails"], [
    irritant("high fat", categories.fat, 0.78, "Steak and mac and cheese are rich foods."),
    irritant("lactose", categories.dairy, 0.72, "Mac and cheese contains dairy."),
    irritant("wheat gluten", categories.gluten, 0.58, "Macaroni is wheat based."),
    irritant("alcohol", categories.alcohol, 0.75, "Two cocktails add alcohol exposure."),
  ]),
  mealTemplate("Frozen chicken nuggets, boxed mac and cheese, and lemonade", "Nuggets and boxed mac", ["chicken nuggets", "boxed mac and cheese", "lemonade"], [
    irritant("high fat", categories.fat, 0.62, "Nuggets and cheese sauce add fat."),
    irritant("wheat gluten", categories.gluten, 0.66, "Nugget breading and pasta are wheat based."),
    irritant("lactose", categories.dairy, 0.68, "Mac and cheese contains dairy."),
    irritant("additives", categories.additive, 0.5, "Packaged foods can include additives."),
  ]),
  mealTemplate("Big bowl of chili with beans, onions, cheese, and cornbread", "Bean chili", ["chili", "beans", "onions", "cheese", "cornbread"], [
    irritant("GOS from beans", categories.fodmap, 0.76, "Beans are a common GOS/FODMAP source."),
    irritant("onion fructans", categories.fodmap, 0.65, "Onions add fructans."),
    irritant("lactose", categories.dairy, 0.54, "Cheese adds dairy."),
    irritant("capsaicin", categories.spice, 0.48, "Chili seasoning may add spice."),
  ]),
  mealTemplate("Late work dinner: instant ramen with egg and sriracha", "Instant ramen", ["instant ramen", "egg", "sriracha"], [
    irritant("wheat gluten", categories.gluten, 0.7, "Ramen noodles are wheat based."),
    irritant("additives", categories.additive, 0.55, "Instant ramen seasoning is processed."),
    irritant("capsaicin", categories.spice, 0.62, "Sriracha adds spice."),
  ]),
];

const snacks = [
  mealTemplate("Apple slices with peanut butter", "Apple and peanut butter", ["apple", "peanut butter"], [
    irritant("excess fructose", categories.fodmap, 0.58, "Apple can be high in excess fructose."),
  ]),
  mealTemplate("Protein bar and cold brew", "Protein bar and cold brew", ["protein bar", "cold brew"], [
    irritant("additives", categories.additive, 0.48, "Protein bars often contain additives or sugar alcohols."),
    irritant("caffeine", categories.caffeine, 0.66, "Cold brew adds caffeine."),
  ]),
  mealTemplate("Nacho chips with queso", "Chips and queso", ["nacho chips", "queso"], [
    irritant("lactose", categories.dairy, 0.66, "Queso contains dairy."),
    irritant("high fat", categories.fat, 0.58, "Queso and chips add fat."),
    irritant("additives", categories.additive, 0.42, "Packaged chips can include additives."),
  ]),
  mealTemplate("Ice cream straight from the pint", "Ice cream", ["ice cream"], [
    irritant("lactose", categories.dairy, 0.78, "Ice cream is a lactose-containing dairy food."),
    irritant("high fat", categories.fat, 0.52, "Ice cream can be high in fat."),
  ]),
  mealTemplate("Popcorn, gummy candy, and a hard seltzer", "Movie snacks", ["popcorn", "gummy candy", "hard seltzer"], [
    irritant("additives", categories.additive, 0.42, "Candy may contain additives."),
    irritant("alcohol", categories.alcohol, 0.48, "Hard seltzer adds alcohol."),
    irritant("carbonation", categories.other, 0.48, "Hard seltzer is carbonated."),
  ]),
  mealTemplate("Midnight cereal with milk", "Midnight cereal", ["cereal", "milk"], [
    irritant("lactose", categories.dairy, 0.72, "Milk contains lactose."),
    irritant("wheat gluten", categories.gluten, 0.45, "Some cereals contain wheat or malt."),
  ]),
  mealTemplate("Leftover pizza slice eaten after midnight", "Midnight pizza slice", ["leftover pizza"], [
    irritant("wheat gluten", categories.gluten, 0.74, "Pizza crust is wheat based."),
    irritant("lactose", categories.dairy, 0.62, "Pizza cheese adds dairy."),
    irritant("high fat", categories.fat, 0.62, "Pizza is a rich snack."),
  ]),
];

const eventPatterns = [
  { offsetHours: 3, severity: 5, symptoms: ["bloating", "cramps"], stoolType: 5, durationMinutes: 45, notes: "Uncomfortable but manageable after lunch." },
  { offsetHours: 10, severity: 6, symptoms: ["gas", "urgency"], stoolType: 6, durationMinutes: 35, notes: "Felt unsettled through the evening." },
  { offsetHours: 18, severity: 7, symptoms: ["cramps", "urgency", "diarrhea"], stoolType: 7, durationMinutes: 60, notes: "Rough morning, may be related to last night's dinner." },
  { offsetHours: 30, severity: 4, symptoms: ["constipation", "bloating"], stoolType: 2, durationMinutes: 30, notes: "Sluggish digestion and bloating." },
  { offsetHours: 5, severity: 3, symptoms: ["reflux"], durationMinutes: 25, notes: "Mild reflux after a heavier meal." },
];

const meals = [];
const events = [];

for (let day = 0; day < dayCount; day += 1) {
  const date = addDays(startDate, day);
  const weekday = date.getDay();
  const irregular = day % 9 === 4 || day % 13 === 8;
  const weekend = weekday === 0 || weekday === 6;

  if (day % 10 !== 3) {
    addMeal(day, pick(breakfasts, day + (weekend ? 2 : 0)), date, weekend ? "09:25" : irregular ? "10:40" : "07:45");
  }

  if (day % 14 !== 6) {
    addMeal(day, pick(lunches, day * 2 + (irregular ? 4 : 0)), date, irregular ? "14:15" : "12:35");
  }

  addMeal(day, pick(dinners, day * 3 + (weekend ? 1 : 0)), date, irregular ? "21:10" : weekend ? "20:05" : "18:50");

  if (day % 2 === 0 || irregular) {
    addMeal(day, pick(snacks, day + 1), date, weekend ? "16:45" : "15:30");
  }

  if (day % 11 === 5 || day % 17 === 9) {
    addMeal(day, pick(snacks, day + 5), addDays(date, 1), "00:35");
  }

  if ([1, 3, 6, 9, 12, 15, 18, 22, 25, 28, 31, 34, 37, 40, 44, 47, 50, 53].includes(day)) {
    addEvent(day, addHours(date, eventPatterns[day % eventPatterns.length].offsetHours + 19), eventPatterns[day % eventPatterns.length]);
  }

  if ([7, 20, 36, 49].includes(day)) {
    addEvent(day, addHours(date, 36), {
      severity: 2,
      symptoms: ["bloating"],
      stoolType: 4,
      durationMinutes: 20,
      notes: "Mild bloating; not a major disruption.",
    });
  }
}

const seed = {
  meals,
  events,
};

const outputPath = path.resolve("data/demo-seed.json");
await writeFile(outputPath, `${JSON.stringify(seed, null, 2)}\n`);
console.log(`Wrote ${meals.length} meals and ${events.length} events to ${outputPath}`);

function addMeal(day, template, date, time) {
  const [hours, minutes] = time.split(":").map(Number);
  const eatenAt = new Date(date);
  eatenAt.setHours(hours, minutes, 0, 0);
  const id = `demo-meal-${String(meals.length + 1).padStart(3, "0")}`;
  meals.push({
    id,
    uid,
    inputMode: "text",
    rawInput: template.text,
    interpretedText: template.text,
    eatenAt: eatenAt.toISOString(),
    ...(day % 8 === 0 ? { notes: "Logged from memory later in the day." } : {}),
    status: "analyzed",
    analysis: {
      mealName: template.name,
      foods: template.foods,
      irritants: template.irritants,
      summary: template.text,
    },
    createdAt: addMinutes(eatenAt, day % 8 === 0 ? 180 : 8).toISOString(),
    updatedAt: addMinutes(eatenAt, day % 8 === 0 ? 180 : 8).toISOString(),
  });
}

function addEvent(day, occurredAt, pattern) {
  const id = `demo-event-${String(events.length + 1).padStart(3, "0")}`;
  events.push({
    id,
    uid,
    occurredAt: occurredAt.toISOString(),
    severity: pattern.severity,
    symptoms: pattern.symptoms,
    ...(pattern.notes ? { notes: pattern.notes } : {}),
    ...(pattern.stoolType ? { stoolType: pattern.stoolType } : {}),
    ...(pattern.durationMinutes ? { durationMinutes: pattern.durationMinutes } : {}),
    createdAt: addMinutes(occurredAt, 10 + (day % 4) * 5).toISOString(),
  });
}

function mealTemplate(text, name, foods, irritants) {
  return { text, name, foods, irritants };
}

function irritant(name, category, confidence, evidence) {
  return { name, category, confidence, evidence };
}

function pick(items, index) {
  return items[index % items.length];
}

function addDays(date, days) {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
}

function addHours(date, hours) {
  const next = new Date(date);
  next.setHours(next.getHours() + hours);
  return next;
}

function addMinutes(date, minutes) {
  const next = new Date(date);
  next.setMinutes(next.getMinutes() + minutes);
  return next;
}
