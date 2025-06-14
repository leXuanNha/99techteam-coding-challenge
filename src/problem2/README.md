# Token Swap Form

A simple token swap interface built with React, TypeScript, Vite, and Tailwind CSS.

## Features

- Swap between different tokens (ETH, USDC, USDT, ATOM)
- Real-time exchange rates from Switcheo API
- Form validation with balance checking
- Responsive design

## Tech Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- react-hook-form + Zod
- shadcn/ui components

## Getting Started

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Run the development server**

   ```bash
   npm run dev
   ```

3. **Open [http://localhost:5173](http://localhost:5173)**

## Usage

1. Select your source token and enter amount
2. Choose destination token
3. Review the exchange rate
4. Click "Swap" to complete

## Project Structure

```
src/
├── @types/                 # Types
├── assets/                 # SVG files
├── api/                    # API call
├── components/             # React components
├── constants/              # App constants
├── hooks/                  # Custom hooks
├── utils/                  # Utilities
├── App.tsx                 # Main app component
└── main.tsx                # Entry point
```

## Build

```bash
npm run build
```

## API

Uses Switcheo API for exchange rates:

```
https://interview.switcheo.com/prices.json
```

### Demo video

https://jam.dev/c/498144a5-373c-4942-9c68-cfd1035f69fa

_Demo showing the token swap functionality with real-time exchange rates and form validation_
