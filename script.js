import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue,
  remove,
} from "https://www.gstatic.com/firebasejs/9.22.1/firebase-database.js";
const firebaseConfig = {
  apiKey: "AIzaSyCUDPk7yCFOF8n5-n4j5d-EH6qfvbHuNRg",
  authDomain: "addtocart-3df3c.firebaseapp.com",
  databaseURL:
    "https://addtocart-3df3c-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "addtocart-3df3c",
  storageBucket: "addtocart-3df3c.appspot.com",
  messagingSenderId: "726856681666",
  appId: "1:726856681666:web:e6cd6dba577d7b813f135b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const shoppingListInDB = ref(database, "shoppingList");

const inputFieldEl = document.getElementById("input-field");
const addButtonEl = document.getElementById("add-button");
const shoppingListEl = document.getElementById("shopping-list");

addButtonEl.addEventListener("click", function () {
  let inputValue = inputFieldEl.value;

  push(shoppingListInDB, inputValue);

  clearInputFieldEl();
});

onValue(shoppingListInDB, function (snapshot) {
  if (snapshot.exists()) {
    let itemsArray = Object.entries(snapshot.val());

    clearShoppingListEl();

    for (let i = 0; i < itemsArray.length; i++) {
      let currentItem = itemsArray[i];
      appendItemToShoppingListEl(currentItem);
    }
  } else {
    shoppingListEl.innerHTML = "No items here... yet"
  }
});

function clearShoppingListEl() {
  shoppingListEl.innerHTML = "";
}

function clearInputFieldEl() {
  inputFieldEl.value = "";
}

function appendItemToShoppingListEl(item) {
  let itemID = item[0];
  let itemValue = item[1];

  let newEl = document.createElement("li");

  newEl.textContent = itemValue;

  newEl.addEventListener("dblclick", function () {
    let exactLocationOfItemInDb = ref(database, `shoppingList/${itemID}`);
    remove(exactLocationOfItemInDb);
  });

  shoppingListEl.append(newEl);
}
