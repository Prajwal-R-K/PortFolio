export const projectList = [
  {
    title: "💬 Chat App",
    description: `
Tech Stack: Flutter, Firebase, Dart
✅ Real-time messaging with Firebase Auth & Realtime Database
✅ Cross-platform UI with chat history, group chats, and sign-in
✅ Clean, responsive design with reliable message sync
    `,
    tech: "Flutter, Firebase, Dart",
    github: "https://github.com/Prajwal-R-K/Flutter_demo_chatApp",
    image: "/certificates/chat_preview.jpg",
  },
  {
    title: "🎅 Secret Santa",
    description: `
Tech Stack: Java 17, Spring Boot, Thymeleaf, Bootstrap 5, MySQL
✅ Create and join groups via key; no self-matching enforced
✅ Admin dashboard to manage participants and assignments
✅ Wish lists, deadlines, budgets, and festive reveal animations
    `,
    tech: "Java 17, Spring Boot, Thymeleaf, Bootstrap 5, MySQL",
    github: "https://github.com/Prajwal-R-K/santagame",
    image: `${process.env.PUBLIC_URL}/projects/SantaGame.png`,
    fallbackImage: `${process.env.PUBLIC_URL}/projects/SantaGame.png`,
    caption: "Web App",
  },
  {
    title: "🏦 Bank Manager",
    description: `
Tech Stack: Python (CLI)
✅ Core features: deposit, withdraw, balance check, account simulation
✅ File-based storage, modular design, and input validation
✅ Built as part of Samsung Innovation Campus – Python Certification
  `,
    tech: "Python (CLI)",
    github: null,
    image: "/certificates/bank_system.jpg",
  },
  {
    title: "🔢 ProCalc",
    description: `
Tech Stack: Spring Boot, Thymeleaf, Bootstrap 5, Java 17
✅ Scientific calculator UI (Thymeleaf + Bootstrap 5) with basic + scientific keys, collapsible panels, themes, and keyboard shortcuts
✅ History management: search, filters, favorites, copy/reuse; includes memory keys (MC / MR / M+ / M–)
✅ Interactive mini-plot: type expressions with x (e.g., sin(x)) to instantly view a live graph next to the result
    `,
    tech: "Spring Boot, Thymeleaf, Bootstrap 5, Java 17",
    github: "https://github.com/Prajwal-R-K/calculator-button-app.git",
    live: "https://calculator-button-app.onrender.com/",
    image: `${process.env.PUBLIC_URL}/projects/Calculator.png`,
    fallbackImage: `${process.env.PUBLIC_URL}/projects/Calculator.png`,
  },
  {
    title: "🧮 Basic Calculator",
    description: `
Tech Stack: Java 17, Spring Boot, React, REST API, Maven
✅ UI and REST API for +, −, ×, ÷, %, ^ operations
✅ Robust error handling (e.g., divide-by-zero) with unit tests
✅ Quickstart via Maven; clean, documented endpoints
    `,
    tech: "Java 17, Spring Boot, React, REST API, Maven",
    github: "https://github.com/Prajwal-R-K/calculator-app.git",
    live: null,
    image: `${process.env.PUBLIC_URL}/projects/BasicCalculator.png`,
    fallbackImage: `${process.env.PUBLIC_URL}/projects/BasicCalculator.png`,
  },
  {
    title: "🧵 Parallel Computing Hub",
    description: `
Tech Stack: React (TypeScript), Vite, OpenMP (C/C++ examples)
✅ Side-by-side serial vs. parallel code with clear explanations
✅ Interactive visuals: data splits, threads, performance notes
✅ Reusable UI components and syntax-highlighted code snippets
    `,
    tech: "React (TS), Vite, OpenMP (C/C++ examples)",
    github: "https://github.com/Prajwal-R-K/parllel_computing.git",
    live: "https://prajwal-r-k.github.io/parllel_computing/",
    image: `${process.env.PUBLIC_URL}/projects/ParallelComputing.png`,
    fallbackImage: `${process.env.PUBLIC_URL}/projects/ParallelComputing.png`,
    caption: "Educational App",
  },
  {
    title: "🌦️ Weather Pro",
    description: `
Tech Stack: React, TypeScript, Vite, Tailwind, PWA, Leaflet
✅ Offline-capable PWA with smart caching
✅ Current, hourly (48h), and 7‑day views; shareable routes
✅ Map view, dynamic themes, accessibility, and shortcuts
    `,
    tech: "React, TypeScript, Vite, Tailwind, Framer Motion, Recharts, Leaflet, PWA",
    github: "https://github.com/Prajwal-R-K/Weather-App",
    live: "https://prajwal-r-k.github.io/Weather-App/",
    image: `${process.env.PUBLIC_URL}/projects/WhetherPro.png`,
    fallbackImage: `${process.env.PUBLIC_URL}/projects/WhetherPro.png`,
    caption: "PWA",
  }
];