import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App.js";

// renders React Component "Root" into the DOM element with ID "root"
ReactDOM.render(<App />, document.getElementById("root"));

// allows for live updating
module.hot.accept();

// import React from "react";
// import ReactDOM from "react-dom";
// import "./index.css";
// import App from "./App";
// import reportWebVitals from "./reportWebVitals";

// const CurrentDate = () => {
//   const months = [
//     "January",
//     "February",
//     "March",
//     "April",
//     "May",
//     "June",
//     "July",
//     "August",
//     "September",
//     "October",
//     "November",
//     "December",
//   ];

//   const today = new Date();

//   const dateToString = (today) => {
//     const day = String(today.getDate());
//     const month = months[today.getMonth()];
//     const year = String(today.getFullYear());
//     return `${month} ${day}, ${year}`;
//   };
//   return <div>{dateToString(today)}</div>;
// };

// const Prompt = () => {
//   return <div>What did you do today?</div>;
// };

// const MainAnswer = () => {
//   return (
//     <div>
//       <div>#</div>
//       <div>I finished reading Our Women On The Ground</div>
//     </div>
//   );
// };

// const Commentary = () => {
//   return (
//     <div>
//       <div>##</div>
//       <div>
//         Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
//         tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
//         veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
//         commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
//         velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
//         occaecat cupidatat non proident, sunt in culpa qui officia deserunt
//         mollit anim id est laborum.
//       </div>
//     </div>
//   );
// };

// const Answer = () => {
//   return (
//     <div>
//       <MainAnswer />
//       <Commentary />
//     </div>
//   );
// };

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById("root")
// );

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
