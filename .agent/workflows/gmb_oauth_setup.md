---
description: Setup Google Business Profile API OAuth
---

# 1. Enable APIs
1. Go to [Google Cloud Console](https://console.cloud.google.com/).
2. Select your project.
3. Search for **"Google My Business API"** (or "Google Business Profile Performance API", the names change often).
   * Note: You might need to join the [Waitlist/Request Access](https://developers.google.com/my-business/content/prereqs) if it's not visible, but often "Business Profile Performance API" is open.
   * *Critical:* Enable **"Google Business Profile API"** and **"My Business Business Information API"**.

# 2. Configure OAuth Consent Screen
1. Go to **APIs & Services > OAuth consent screen**.
2. Select **External** (User Type).
3. Fill in App Name (e.g., "MGC Automation") and Support Email.
4. Add Developer Contact Email.
5. **Scopes**: Add `https://www.googleapis.com/auth/business.manage`.
6. **Test Users**: Add your own Google Email (the one that owns the GMB profile).

# 3. Create Credentials
1. Go to **APIs & Services > Credentials**.
2. Click **Create Credentials > OAuth client ID**.
3. Application Type: **Desktop app** (Simplest for scripts).
4. Name: "GMB Script".
5. Click **Create**.
6. **Download JSON**: Click the generic "Download JSON" button.
7. Rename the file to `client_secret.json` and move it to:
   `/home/chris/Code/client-mgc-reparation/client_secret.json`

# 4. Ready
Once the file is in place, tell me "Ready" and I will run the auth script.
