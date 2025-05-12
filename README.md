# OrderBook Visualizer
An Angular web application that allows you to **visually explore and interact with order book snapshots** from a trading system.  
The project provides an intuitive way to **analyze market depth**, **watch bid/ask levels change over time**, and **replay historical snapshots** like a time-lapse.
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.2.3.

---

## 🧰 Tech Stack

- **Angular**
- **TypeScript**
- **Tailwind CSS**
- **Static JSON snapshot data**

---

## ✨ Features

- 📊 **Dynamic Order Book View**  
  Visualizes bid and ask sizes as horizontal bars with color coding (blue for bids, orange for asks).
  
- ⏮️ **Manual Navigation**  
  Use **Prev / Next** buttons to move between snapshots and observe how the market evolves frame by frame.

- ⌛ **Replay Mode**  
  Click **▶ Replay** to animate the order book updates in sequence at a consistent pace.  
  Use **⏸ Pause** or **⏹ Stop** at any time to control the flow.

- ⌚ **Snapshot Time Selector**  
  Use the dropdown to jump to a specific timestamp of interest.

- 📁 **Based on Static Data**  
  Uses JSON snapshot data (`tradingdata.json`) that simulates a real-time feed.

---

## 🧪 How to Use

After launching the app (locally or via GitHub Pages):

1. The default snapshot is displayed with a visual breakdown of price levels and sizes.
2. Use the `Prev` / `Next` buttons or the dropdown menu to switch snapshots manually.
3. Click `▶ Replay` to watch the order book evolve over time — this mimics live market activity.
4. Pause or stop the animation at any moment.

It's perfect for:
- Trading UI prototyping
- Teaching how order books work
- Analyzing how bids and asks respond over time

---

## 📦 Run Locally
```bash
npm install
ng serve
```
Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

---

## 🚀 Live Demo
[👉 View on GitHub Pages](https://lbmrytskv.github.io/order-book/)

---

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

---

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

---

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

---

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

---

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
