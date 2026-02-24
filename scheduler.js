/**
 * scheduler.js
 * 
 * Core scheduling logic.
 * Figures out which days of next month fall on Mon/Tue/Wed/Thu,
 * assigns a unique recipe to each day from the recipe bank,
 * and returns a structured list of events ready to be created.
 */

const recipes = require("./recipes.js");

/**
 * Day-of-week → theme mapping.
 * 1 = Monday, 2 = Tuesday, 3 = Wednesday, 4 = Thursday
 * (JS getDay() is 0=Sun, 1=Mon... 6=Sat)
 */
const DAY_THEMES = {
  1: "chicken",    // Monday
  2: "mexican",    // Tuesday
  3: "casserole",  // Wednesday
  4: "crockpot",   // Thursday
};

/**
 * Get all days in the next calendar month that fall on
 * Monday, Tuesday, Wednesday, or Thursday.
 *
 * @returns {Array<{ date: Date, theme: string }>}
 */
function getScheduledDaysNextMonth() {
  const now = new Date();

  // Move to the first day of next month
  const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);
  const year = nextMonth.getFullYear();
  const month = nextMonth.getMonth();

  // Figure out the total days in next month
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const scheduledDays = [];

  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day);
    const dayOfWeek = date.getDay(); // 0=Sun, 1=Mon, ..., 6=Sat

    if (DAY_THEMES[dayOfWeek]) {
      scheduledDays.push({
        date,
        theme: DAY_THEMES[dayOfWeek],
        dayOfWeek,
      });
    }
  }

  return scheduledDays;
}

/**
 * Pick a unique recipe for each scheduled day from the recipe bank.
 * Uses a rotating index based on the month number to ensure variety
 * month to month without fully random selection.
 *
 * @param {Array} scheduledDays - Output from getScheduledDaysNextMonth()
 * @returns {Array<{ date, theme, recipe }>}
 */
function assignRecipes(scheduledDays) {
  // Track how many of each theme we've used so far this run
  const usageCounters = {
    chicken:   0,
    mexican:   0,
    casserole: 0,
    crockpot:  0,
  };

  // Offset by the next month's number for variety across months
  const now = new Date();
  const nextMonthNumber = (now.getMonth() + 1) % 12; // 0-11

  return scheduledDays.map(({ date, theme, dayOfWeek }) => {
    const pool = recipes[theme];
    const count = usageCounters[theme];

    // Pick recipe by rotating through the pool, offset by month number
    const index = (count + nextMonthNumber) % pool.length;
    usageCounters[theme]++;

    return {
      date,
      theme,
      recipe: pool[index],
    };
  });
}

/**
 * Build the full schedule for next month.
 * Returns an array of { date, theme, recipe } objects.
 */
function buildNextMonthSchedule() {
  const scheduledDays = getScheduledDaysNextMonth();
  const schedule = assignRecipes(scheduledDays);

  // Log a summary to console for visibility
  const nextMonth = new Date();
  nextMonth.setMonth(nextMonth.getMonth() + 1);
  const monthName = nextMonth.toLocaleString("default", { month: "long", year: "numeric" });

  console.log(`\n📅 Building dinner schedule for ${monthName}`);
  console.log(`   Found ${scheduledDays.length} dinner nights to schedule:\n`);

  schedule.forEach(({ date, theme, recipe }) => {
    const dateStr = date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
    console.log(`   ${dateStr} [${theme.toUpperCase()}] → ${recipe.name}`);
  });

  console.log("");

  return schedule;
}

module.exports = { buildNextMonthSchedule };
