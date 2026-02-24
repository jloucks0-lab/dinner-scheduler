/**
 * index.js
 * 
 * Main entry point for the Dinner Scheduler.
 * 
 * This script is triggered by Railway's cron scheduler on the last day
 * of every month. It will:
 *   1. Build the dinner schedule for next month
 *   2. Authenticate with Google Calendar via Service Account
 *   3. Create a calendar event for every Mon/Tue/Wed/Thu of next month
 *   4. Log a summary of what was created
 */

require("dotenv").config();

const { getCalendarClient, createDinnerEvent } = require("./calendar.js");
const { buildNextMonthSchedule } = require("./scheduler.js");

// ─────────────────────────────────────────
// Configuration — set these in Railway env
// ─────────────────────────────────────────
const CALENDAR_ID = process.env.CALENDAR_ID || "jloucks0@gmail.com";

// ─────────────────────────────────────────
// Guard: only run on the actual last day of the month
// ─────────────────────────────────────────
function isLastDayOfMonth() {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  // If tomorrow is the 1st, today is the last day
  return tomorrow.getDate() === 1;
}

// ─────────────────────────────────────────
// Main runner
// ─────────────────────────────────────────
async function run() {
  console.log("╔══════════════════════════════════════════════════╗");
  console.log("║         🍽️  DINNER SCHEDULER — STARTING          ║");
  console.log("╚══════════════════════════════════════════════════╝");
  console.log(`   Run Time : ${new Date().toLocaleString()}`);
  console.log(`   Calendar : ${CALENDAR_ID}\n`);

  // Validate required environment variables
  const required = [
    "GOOGLE_PROJECT_ID",
    "GOOGLE_PRIVATE_KEY_ID",
    "GOOGLE_PRIVATE_KEY",
    "GOOGLE_CLIENT_EMAIL",
    "GOOGLE_CLIENT_ID",
    "CALENDAR_ID",
  ];

  const missing = required.filter((key) => !process.env[key]);
  if (missing.length > 0) {
    console.error(`❌ Missing required environment variables:\n   ${missing.join("\n   ")}`);
    console.error("\n   Please set these in your Railway environment settings.");
    process.exit(1);
  }

  try {
    // Step 1: Build the schedule
    const schedule = buildNextMonthSchedule();

    if (schedule.length === 0) {
      console.log("⚠️  No dinner nights found for next month. Nothing to create.");
      return;
    }

    // Step 2: Get authenticated calendar client
    console.log("🔐 Authenticating with Google Calendar...");
    const calendar = getCalendarClient();
    console.log("   ✅ Authenticated successfully\n");

    // Step 3: Create each event
    console.log("📆 Creating calendar events...\n");

    let successCount = 0;
    let errorCount = 0;

    for (const { date, theme, recipe } of schedule) {
      const dateStr = date.toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
      });

      try {
        const event = await createDinnerEvent(
          calendar,
          recipe,
          theme,
          date,
          CALENDAR_ID
        );

        console.log(`   ✅ ${dateStr}`);
        console.log(`      ${recipe.name}`);
        console.log(`      Event ID: ${event.id}\n`);
        successCount++;

        // Small delay to be polite to the Google API
        await new Promise((resolve) => setTimeout(resolve, 300));

      } catch (err) {
        console.error(`   ❌ Failed to create event for ${dateStr}`);
        console.error(`      ${err.message}\n`);
        errorCount++;
      }
    }

    // Step 4: Final summary
    console.log("╔══════════════════════════════════════════════════╗");
    console.log("║               📊 RUN SUMMARY                    ║");
    console.log("╚══════════════════════════════════════════════════╝");
    console.log(`   Total events attempted : ${schedule.length}`);
    console.log(`   ✅ Successfully created : ${successCount}`);
    if (errorCount > 0) {
      console.log(`   ❌ Failed               : ${errorCount}`);
    }
    console.log(`\n   Dinner Scheduler complete! Bon appétit! 🍽️\n`);

  } catch (err) {
    console.error("\n❌ Fatal error during Dinner Scheduler run:");
    console.error(err);
    process.exit(1);
  }
}

run();
