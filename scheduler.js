/**
 * scheduler.js
 */

const recipes = require("./recipes.js");

const DAY_THEMES = {
  1: "chicken",    // Monday
  2: "mexican",    // Tuesday
  3: "casserole",  // Wednesday
  4: "crockpot",   // Thursday
};

function getScheduledDaysNextMonth() {
  const now = new Date();
  const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);
  const year = nextMonth.getFullYear();
  const month = nextMonth.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const scheduledDays = [];

  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day);
    const dayOfWeek = date.getDay();
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

function assignRecipes(scheduledDays) {
  const usageCounters = {
    chicken: 0,
    mexican: 0,
    casserole: 0,
    crockpot: 0,
  };

  const now = new Date();
  const nextMonthNumber = (now.getMonth() + 1) % 12;

  return scheduledDays.map(({ date, theme, dayOfWeek }) => {
    const pool = recipes[theme];
    const count = usageCounters[theme];
    const index = (count + nextMonthNumber) % pool.length;
    usageCounters[theme]++;
    return {
      date,
      theme,
      recipe: pool[index],
    };
  });
}

function buildNextMonthSchedule() {
  const scheduledDays = getScheduledDaysNextMonth();
  const schedule = assignRecipes(scheduledDays);

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