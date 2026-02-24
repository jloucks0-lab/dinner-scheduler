/**
 * calendar.js
 * 
 * Google Calendar API helper.
 * Handles OAuth2 authentication via a Service Account and creates dinner events.
 */

const { google } = require("googleapis");

/**
 * Build an authenticated Google Calendar client using a Service Account.
 * The service account JSON credentials are passed in via environment variables.
 */
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

/**
 * Format a recipe into a rich, readable calendar event description.
 */
function formatEventDescription(recipe, theme) {
  const themeEmoji = {
    chicken:   "🍗",
    mexican:   "🌮",
    casserole: "🍝",
    crockpot:  "🥘",
  };

  const themeTitle = {
    chicken:   "MONDAY CHICKEN NIGHT",
    mexican:   "TUESDAY MEXICAN NIGHT",
    casserole: "WEDNESDAY CASSEROLE & PASTA NIGHT",
    crockpot:  "THURSDAY CROCKPOT NIGHT",
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

/**
 * Format the event title with emoji.
 */
function formatEventTitle(recipe, theme) {
  const emoji = {
    chicken:   "🍗",
    mexican:   "🌮",
    casserole: "🍝",
    crockpot:  "🥘",
  };

  const label = {
    chicken:   "Monday Chicken Night",
    mexican:   "Tuesday Mexican Night",
    casserole: "Wednesday Casserole & Pasta Night",
    crockpot:  "Thursday Crockpot Night",
  };

  return `${emoji[theme] || "🍽️"} ${label[theme]} — ${recipe.name}`;
}

/**
 * Create a single Google Calendar dinner event.
 *
 * @param {object} calendar  - Authenticated Google Calendar client
 * @param {object} recipe    - Recipe object from recipes.js
 * @param {string} theme     - 'chicken' | 'mexican' | 'casserole' | 'crockpot'
 * @param {Date}   date      - JS Date object for the event date
 * @param {string} calendarId - Target Google Calendar ID (email address)
 */
async function createDinnerEvent(calendar, recipe, theme, date, calendarId) {
  // Crockpot events start at 5:00 PM (need to arrive home and prep sides)
  // All other dinners start at 6:00 PM
  const startHour = theme === "crockpot" ? 17 : 18;
  const durationMinutes = theme === "crockpot" ? 90 : 60;

  const startDate = new Date(date);
  startDate.setHours(startHour, 0, 0, 0);

  const endDate = new Date(startDate);
  endDate.setMinutes(endDate.getMinutes() + durationMinutes);

  // Format as ISO strings with timezone offset
  const tzOffset = -5; // EST (UTC-5). Adjust if needed: -4 for EDT
  const formatISO = (d) => {
    const offset = tzOffset * 60;
    const localDate = new Date(d.getTime() - offset * 60 * 1000);
    return localDate.toISOString().replace("Z", `${tzOffset < 0 ? "-" : "+"}${String(Math.abs(tzOffset)).padStart(2, "0")}:00`);
  };

  const event = {
    summary: formatEventTitle(recipe, theme),
    description: formatEventDescription(recipe, theme),
    start: {
      dateTime: formatISO(startDate),
      timeZone: "America/New_York",
    },
    end: {
      dateTime: formatISO(endDate),
      timeZone: "America/New_York",
    },
    reminders: {
      useDefault: false,
      overrides: [
        { method: "popup", minutes: 60 },   // 1 hr before: reminder to start cooking
        { method: "popup", minutes: 480 },  // 8 hrs before: crockpot reminder (morning)
      ],
    },
    colorId: {
      chicken:   "6",  // Tangerine (orange)
      mexican:   "2",  // Sage (green)
      casserole: "9",  // Blueberry
      crockpot:  "4",  // Flamingo (pink)
    }[theme] || "1",
  };

  const response = await calendar.events.insert({
    calendarId,
    resource: event,
  });

  return response.data;
}

module.exports = { getCalendarClient, createDinnerEvent };
