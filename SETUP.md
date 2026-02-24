# 🍽️ Dinner Scheduler — Setup Guide

Complete walkthrough to get this script running automatically on Railway,
triggered on the last day of every month.

---

## Overview of Steps

1. Push the project to GitHub
2. Set up Google Cloud Service Account
3. Share your Google Calendar with the Service Account
4. Deploy to Railway
5. Configure environment variables in Railway
6. Test the deployment
7. Verify the cron schedule

---

## Step 1 — Push to GitHub

The script needs to live in a GitHub repo so Railway can pull from it.

```bash
# In the dinner-scheduler folder:
git init
git add .
git commit -m "Initial dinner scheduler"

# Create a new repo on GitHub (github.com → New repository → name it "dinner-scheduler")
# Then link and push:
git remote add origin https://github.com/YOUR_USERNAME/dinner-scheduler.git
git branch -M main
git push -u origin main
```

---

## Step 2 — Set Up Google Cloud Service Account

This is how the script gets permission to write to your Google Calendar
without needing you to be logged in.

### 2a. Create a Google Cloud Project

1. Go to [console.cloud.google.com](https://console.cloud.google.com)
2. Click **Select a project** → **New Project**
3. Name it `dinner-scheduler` → Click **Create**
4. Make sure this new project is selected in the top dropdown

### 2b. Enable the Google Calendar API

1. In the left sidebar → **APIs & Services** → **Library**
2. Search for **Google Calendar API**
3. Click it → Click **Enable**

### 2c. Create a Service Account

1. In the left sidebar → **APIs & Services** → **Credentials**
2. Click **+ Create Credentials** → **Service Account**
3. Fill in:
   - **Name:** `dinner-scheduler`
   - **ID:** auto-filled (e.g., `dinner-scheduler@your-project.iam.gserviceaccount.com`)
4. Click **Create and Continue**
5. Skip the optional role and user steps → Click **Done**

### 2d. Download the Service Account Key

1. On the Credentials page, click your new service account name
2. Go to the **Keys** tab
3. Click **Add Key** → **Create new key** → Select **JSON** → Click **Create**
4. A `.json` file will download to your computer — **keep this safe!**

The JSON file looks like this:
```json
{
  "type": "service_account",
  "project_id": "dinner-scheduler-123456",
  "private_key_id": "abc123...",
  "private_key": "-----BEGIN RSA PRIVATE KEY-----\n...\n-----END RSA PRIVATE KEY-----\n",
  "client_email": "dinner-scheduler@dinner-scheduler-123456.iam.gserviceaccount.com",
  "client_id": "123456789012345678901",
  ...
}
```

You'll need these values for Railway environment variables in Step 5.

---

## Step 3 — Share Your Calendar with the Service Account

The service account needs explicit permission to create events on your calendar.

1. Open [Google Calendar](https://calendar.google.com)
2. In the left sidebar, find your calendar → click the **⋮** (three dots) next to it
3. Click **Settings and sharing**
4. Scroll down to **Share with specific people or groups**
5. Click **+ Add people and groups**
6. Enter the service account email from your JSON file:
   `dinner-scheduler@YOUR-PROJECT-ID.iam.gserviceaccount.com`
7. Set permission to **Make changes to events**
8. Click **Send**

✅ The service account can now create events on your calendar.

---

## Step 4 — Deploy to Railway

1. Go to [railway.app](https://railway.app) and log in
2. Click **New Project** → **Deploy from GitHub repo**
3. Authorize Railway to access your GitHub (if not already done)
4. Select your `dinner-scheduler` repository
5. Railway will detect the project and start a deployment

> **Note:** The first deploy will likely fail because env vars aren't set yet. That's expected — we'll fix that in Step 5.

---

## Step 5 — Configure Environment Variables in Railway

1. In your Railway project, click on your service
2. Go to the **Variables** tab
3. Add each of the following variables:

| Variable | Value | Where to find it |
|----------|-------|-----------------|
| `CALENDAR_ID` | `jloucks0@gmail.com` | Your Gmail address |
| `GOOGLE_PROJECT_ID` | Value from JSON key | `project_id` field |
| `GOOGLE_PRIVATE_KEY_ID` | Value from JSON key | `private_key_id` field |
| `GOOGLE_PRIVATE_KEY` | Value from JSON key | `private_key` field (include the full `-----BEGIN...-----END-----` block) |
| `GOOGLE_CLIENT_EMAIL` | Value from JSON key | `client_email` field |
| `GOOGLE_CLIENT_ID` | Value from JSON key | `client_id` field |

### ⚠️ Important: GOOGLE_PRIVATE_KEY formatting

The private key in the JSON file has literal `\n` characters. In Railway,
paste the key **exactly as it appears** in the JSON file, including the 
`-----BEGIN RSA PRIVATE KEY-----` and `-----END RSA PRIVATE KEY-----` lines.

Railway will preserve the newlines correctly.

---

## Step 6 — Configure the Cron Schedule in Railway

1. In your Railway service, go to the **Settings** tab
2. Scroll down to **Cron Schedule**
3. Set the schedule to:
   ```
   0 9 28-31 * *
   ```
   This runs at **9:00 AM UTC (4:00 AM EST)** on days 28 through 31 of every month.
   The script automatically checks if today is the actual last day and skips if not.

4. Set the **Start Command** to:
   ```
   node src/index.js
   ```

5. Click **Save**

---

## Step 7 — Test the Deployment

### Run it manually from Railway

1. In your Railway service → **Deployments** tab
2. Click **Deploy** to trigger a manual run
3. Click on the deployment to see the live logs

You should see output like:
```
╔══════════════════════════════════════════════════╗
║         🍽️  DINNER SCHEDULER — STARTING          ║
╚══════════════════════════════════════════════════╝
   Run Time : [date]
   Calendar : jloucks0@gmail.com

ℹ️  Today is not the last day of the month. Skipping run.
   (The cron fires on days 28-31 to cover all month lengths)
```

This is correct! It's saying the guard worked. To force a full test run,
temporarily edit `src/index.js` and comment out the `isLastDayOfMonth()` guard,
push to GitHub, let Railway redeploy, and check your Google Calendar.

### Run the test script locally

```bash
node src/test.js
```

This verifies all recipe data and schedule logic without touching Google Calendar.

---

## How It Works — Month by Month

```
Last day of January  → Script runs → Creates all Mon/Tue/Wed/Thu events for February
Last day of February → Script runs → Creates all Mon/Tue/Wed/Thu events for March
Last day of March    → Script runs → Creates all Mon/Tue/Wed/Thu events for April
...and so on, forever.
```

---

## Troubleshooting

**"The caller does not have permission" error**
→ Make sure you shared your calendar with the service account email in Step 3.

**"Error reading credentials" or auth failures**
→ Check that GOOGLE_PRIVATE_KEY is pasted correctly with the full BEGIN/END block.

**No events being created**
→ Check the Railway logs. The guard may be blocking — see Step 7 for test instructions.

**Want to add more recipes?**
→ Edit `src/recipes.js` — just follow the existing format and add to the array.
   More recipes = less repetition across months.

---

## File Structure

```
dinner-scheduler/
├── src/
│   ├── index.js      ← Main entry point (runs on Railway)
│   ├── scheduler.js  ← Schedule logic (what day gets what theme)
│   ├── calendar.js   ← Google Calendar API helper
│   ├── recipes.js    ← All recipes (6 per category = 24 total)
│   └── test.js       ← Local test runner (no API calls)
├── .env.example      ← Template for environment variables
├── .gitignore        ← Keeps .env and node_modules out of git
├── package.json      ← Project config & dependencies
├── railway.toml      ← Railway cron configuration
└── SETUP.md          ← This file
```
