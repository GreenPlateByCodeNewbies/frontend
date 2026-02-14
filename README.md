# 🌱 GreenPlate

**Sustainable Food Waste Reduction Platform**

A React-based mobile application that connects students and staff with surplus cafeteria food, reducing waste and promoting sustainability.

## ✨ Features

- 🍽️ Browse available surplus food deals from campus cafeterias
- 🎯 Reserve meals at discounted prices
- 📍 Interactive cafeteria map view
- 👨‍🍳 Staff interface for posting food deals
- 🤖 AI-powered food analysis using Google Gemini
- 📊 Track carbon footprint savings
- 🎨 Beautiful animations with Framer Motion
- 📱 Mobile-first responsive design

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# App will open automatically at http://localhost:5000
```

## 🛠️ Tech Stack

- **React 18** - UI framework with concurrent features
- **TypeScript** - Type-safe development
- **Vite** - Lightning-fast build tool
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Smooth animations
- **Lucide React** - Beautiful icons
- **Google Generative AI** - AI-powered food analysis
- **Firebase** - Authentication and database
- **Axios** - HTTP client for API requests

## 📂 Project Structure

```
frontend/
├── Pages/              # Page components
│   ├── Auth.tsx        # User authentication & login
│   ├── UserHome.tsx    # User dashboard & food deals
│   ├── StaffDashboard.tsx # Staff interface
│   ├── CreatePost.tsx  # Create new food deal post
│   ├── DealDetails.tsx # View deal information
│   ├── MyOrder.tsx     # User's reservations
│   ├── IncomingReservations.tsx # Staff incoming orders
│   ├── MapView.tsx     # Cafeteria location map
│   ├── QueueManager.tsx # Queue management
│   ├── Profile.tsx     # User profile
│   ├── Onboarding.tsx  # App onboarding flow
│   └── Splash.tsx      # Splash screen
├── Layouts/            # Layout wrappers
│   ├── UserLayout.tsx  # User layout
│   ├── StaffLayout.tsx # Staff layout
│   └── StudentLayout.tsx # Student layout
├── context/            # React context (state)
│   └── AppContext.tsx  # Global app state
```

## 🎯 Available Scripts

```bash
npm run dev         # Start development server
npm run build       # Build for production
npm run preview     # Preview production build
npm run lint        # Run ESLint
npm run type-check  # Check TypeScript types
```

# 📌 Capacitor Setup (with Vite)

## 1. Install Capacitor Dependencies
```bash
npm install @capacitor/core @capacitor/cli
```

## 2. Build Your Vite App
```bash
npm run build
```

## 3. Initialize Capacitor
```bash
npx cap init
```

When prompted:

- **App name:** `GreenPlate`  
- **App ID:** `com.greenplate.app`

## 4. Add Android Platform
```bash
npm install @capacitor/android
npx cap add android
```

## 5. Sync Web Assets

Every time you update your web build:

```bash
npm run build
npx cap sync
```

## 6. Open in Android Studio
```bash
npx cap open android
```

---

# 🌐 Finding Your Local IP Address

You need your local IP address to test API calls from a physical Android device.

---

# 🪟 Windows – Get Local IP

## Step 1 — Open Command Prompt

Press:

```
Win + R
```

Type:

```
cmd
```

Press **Enter**

## Step 2 — Get IP Address

Run:

```bash
ipconfig
```

Find your active adapter (Wi-Fi or Ethernet). Look for:

```
IPv4 Address . . . . . . . . . : 192.168.x.x
```

Example:

```
192.168.1.7
```

## Step 3 — Update API Base URL

Open:

```
src/services/api.ts
```

Update the base URL:

```ts
export const API_BASE_URL =
  Capacitor.isNativePlatform()
    ? 'http://192.168.1.7:8000'
    : import.meta.env.VITE_API_BASE_URL;
```

Replace `192.168.1.7` with your actual local IP address.

## Step 4 — Rebuild and Sync

```bash
npm run build
npx cap sync
```

---

# 🍏 macOS – Get Local IP

## Method 1 — Using Terminal

Open **Terminal**.

### For Wi-Fi:

```bash
ipconfig getifaddr en0
```

### For Ethernet:

```bash
ipconfig getifaddr en1
```

You will see something like:

```
192.168.1.7
```

This is your local IPv4 address.

---

## Method 2 — Using System Settings

1. Open **System Settings**
2. Go to **Network → Wi-Fi**
3. Click the connected network
4. Look for:

```
IP Address: 192.168.x.x
```

---

# 🔁 Update API Base URL (macOS)

Open:

```
src/api/api.ts
```

Update:

```ts
const BASE_URL = "http://192.168.1.7:5000";
```

Replace `192.168.1.7` with your actual IP address.

---

# 🚀 Final Steps

After updating the API URL:

```bash
npm run build
npx cap sync
```

---

# ⚠️ Important Notes

- Phone and laptop must be on the same Wi-Fi network  
- Backend server must be running  
- Firewall must allow the backend port  
- `localhost` will NOT work on physical Android devices  


## 🌐 Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_KEY=your_google_gemini_api_key
VITE_API_URL=http://localhost:8000
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_FIREBASE_DATABASE_URL=your_firebase_database_url
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
VITE_FIREBASE_APP_ID=your_firebase_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_firebase_measurement_id
VITE_RAZORPAY_KEY_ID=your_razorpay_key_id

```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## 📄 License

See [LICENSE](./LICENSE) file for details.

## 🆘 Support

Having issues? Check:
- [DEPENDENCIES.md](./DEPENDENCIES.md) for dependency info
- Project issues on GitHub

---

**Built with 💚 for a sustainable future**
