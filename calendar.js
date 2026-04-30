/**
 * calendar.js
 */

const { google } = require("googleapis");

function getCalendarClient() {
  const credentials = {
    type: "service_account",
    project_id: process.env.GOOGLE_PROJECT_ID,
    private_key_id: process.env.GOOGLE_PRIVATE_KEY_ID,
    private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    client_id: process.env.GOOGLE_CLIENT_ID,
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
  };

  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ["https://www.googleapis.com/auth/calendar"],
  });

  return google.calendar({ version: "v3", auth });
}

function formatEventDescription(recipe, theme) {
  const themeEmoji = {
    chicken: "🍗",
    mexican: "🌮",
    casserole: "🍝",
    crockpot: "🥘",
  };

  const themeTitle = {
    chicken: "MONDAY CHICKEN NIGHT",
    mexican: "TUESDAY MEXICAN NIGHT",
    casserole: "WEDNESDAY CASSEROLE & PASTA NIGHT",
    crockpot: "THURSDAY CROCKPOT NIGHT",
  };

  const emoji = themeEmoji[theme] || "🍽️";
  const title = themeTitle[theme] || "DINNER NIGHT";

  let description = `${title} ${emoji}\n\n`;
  description += `Recipe: ${recipe.name}\n`;
  description += `Prep: ${recipe.prepTime} | Cook: ${recipe.cookTime} | Total: ${recipe.totalTime}\n`;

  if (recipe.crockpot) {
    description += `\n⏰ CROCKPOT REMINDER: Start this in the morning!\n`;
  }

  description += `\nIngredients:\n`;
  recipe.ingredients.forEach((ing) => {
    description += `  - ${ing}\n`;
  });

  description += `\nInstructions:\n`;
  recipe.steps.forEach((step, i) => {
    description += `  ${i + 1}. ${step}\n`;
  });

  description += `\nFull Recipe: ${recipe.url}`;

  return description;
}

function formatEventTitle(recipe, theme) {
  const emoji = {
    chicken: "🍗",
    mexican: "🌮",
    casserole: "🍝",
    crockpot: "🥘",
  };

  const label = {
    chicken: "Monday Chicken Night",
    mexican: "Tuesday Mexican Night",
    casserole: "Wednesday Casserole & Pasta Night",
    crockpot: "Thursday Crockpot Night",
  };

  return `${emoji[theme] || "🍽️"} ${label[theme]} — ${recipe.name}`;
}

async function createDinnerEvent(calendar, recipe, theme, date, calendarId) {
  // All events: 8:00 AM - 9:00 AM
  const startDate = new Date(date);
  startDate.setHours(8, 0, 0, 0);

  const endDate = new Date(date);
  endDate.setHours(9, 0, 0, 0);

  const event = {
    summary: formatEventTitle(recipe, theme),
    descr