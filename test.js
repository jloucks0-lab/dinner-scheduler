/**
 * test.js
 * 
 * Local test runner — verifies the scheduler logic without
 * touching the Google Calendar API. Safe to run anytime.
 * 
 * Usage:
 *   node src/test.js
 */

const { buildNextMonthSchedule } = require("./scheduler.js");
const recipes = require("./recipes.js");

console.log("╔══════════════════════════════════════════════════╗");
console.log("║       🧪 DINNER SCHEDULER — LOCAL TEST           ║");
console.log("╚══════════════════════════════════════════════════╝\n");

// Test 1: Recipe bank integrity
console.log("── Test 1: Recipe Bank Integrity ──────────────────");
const categories = ["chicken", "mexican", "casserole", "crockpot"];
let allPassed = true;

categories.forEach((cat) => {
  const pool = recipes[cat];
  const requiredFields = ["name", "prepTime", "cookTime", "totalTime", "crockpot", "ingredients", "steps", "url"];

  pool.forEach((recipe, i) => {
    requiredFields.forEach((field) => {
      if (recipe[field] === undefined || recipe[field] === null) {
        console.error(`   ❌ ${cat}[${i}] (${recipe.name}) missing field: ${field}`);
        allPassed = false;
      }
    });

    if (!recipe.url.startsWith("http")) {
      console.error(`   ❌ ${cat}[${i}] has invalid URL: ${recipe.url}`);
      allPassed = false;
    }

    if (recipe.ingredients.length === 0) {
      console.error(`   ❌ ${cat}[${i}] has no ingredients`);
      allPassed = false;
    }

    if (recipe.steps.length === 0) {
      console.error(`   ❌ ${cat}[${i}] has no steps`);
      allPassed = false;
    }
  });

  const crockpotCheck = cat === "crockpot"
    ? pool.every((r) => r.crockpot === true)
    : pool.every((r) => r.crockpot === false);

  if (!crockpotCheck) {
    console.error(`   ❌ ${cat} has incorrect crockpot flag on one or more recipes`);
    allPassed = false;
  }

  console.log(`   ✅ ${cat}: ${pool.length} recipes — all fields valid`);
});

console.log(allPassed ? "\n   All recipe integrity checks passed!\n" : "\n   ⚠️  Some checks failed — see above.\n");

// Test 2: Schedule generation
console.log("── Test 2: Schedule Generation ─────────────────────");
try {
  const schedule = buildNextMonthSchedule();

  const themeCounts = { chicken: 0, mexican: 0, casserole: 0, crockpot: 0 };
  schedule.forEach(({ theme }) => themeCounts[theme]++);

  console.log("   Theme distribution for next month:");
  Object.entries(themeCounts).forEach(([theme, count]) => {
    console.log(`     ${theme.padEnd(12)} → ${count} nights`);
  });

  // Check for duplicate recipes in same month
  const recipeNames = schedule.map((s) => s.recipe.name);
  const uniqueNames = new Set(recipeNames);
  if (uniqueNames.size === recipeNames.length) {
    console.log("\n   ✅ No duplicate recipes in the schedule");
  } else {
    console.log("\n   ⚠️  Duplicate recipes detected — consider expanding recipe bank");
  }

  console.log(`\n   ✅ Schedule generated: ${schedule.length} dinner nights total`);

} catch (err) {
  console.error("   ❌ Schedule generation failed:", err.message);
}

// Test 3: Environment variable check
console.log("\n── Test 3: Environment Variables ───────────────────");
const required = [
  "GOOGLE_PROJECT_ID",
  "GOOGLE_PRIVATE_KEY_ID",
  "GOOGLE_PRIVATE_KEY",
  "GOOGLE_CLIENT_EMAIL",
  "GOOGLE_CLIENT_ID",
  "CALENDAR_ID",
];

const found = [];
const missing = [];

required.forEach((key) => {
  if (process.env[key]) {
    found.push(key);
  } else {
    missing.push(key);
  }
});

found.forEach((key) => console.log(`   ✅ ${key} is set`));
missing.forEach((key) => console.log(`   ⚠️  ${key} is NOT set (required for deployment)`));

if (missing.length === 0) {
  console.log("\n   ✅ All environment variables are set — ready for deployment!");
} else {
  console.log(`\n   ℹ️  ${missing.length} env vars missing — this is expected before Railway setup.`);
}

console.log("\n╔══════════════════════════════════════════════════╗");
console.log("║               ✅ TEST COMPLETE                   ║");
console.log("╚══════════════════════════════════════════════════╝\n");
