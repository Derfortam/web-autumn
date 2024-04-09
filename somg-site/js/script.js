"use strict"
import {initializeApp} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import {getDatabase, ref, onValue, push} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const searchInput = document.getElementById("search")
const cards = document.querySelectorAll(".cards__item")

searchInput.addEventListener("input", function () {
   const query = this.value.toLowerCase()

   cards.forEach(function (card) {
      const title = card.querySelector(".cards__title").textContent.toLowerCase()
      const number = card.querySelector(".cards__number").textContent // Отримуємо текст номера без перетворення до нижнього регістру

      // Перевіряємо, чи включає текст заголовка або номера карти запит
      if (title.includes(query) || number.includes(query)) {
         card.style.display = "flex"
      } else {
         card.style.display = "none"
      }
   })
})

const appSettings = {
   databaseURL: "https://songs-ecde1-default-rtdb.europe-west1.firebasedatabase.app/",
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const songInDB = ref(database, "songs")

// const inputFieldEl = document.getElementById("input-field")
// const addButtonEl = document.getElementById("add-button")

// addButtonEl.addEventListener("click", function () {
//    let inputValue = inputFieldEl.value

//    push(moviesInDB, inputValue)

//    console.log(`${inputValue} added to database`)
// })

const link = document.querySelectorAll(".cards__link")
const close = document.querySelectorAll(".song__button")

document.addEventListener("click", documentAction)

function documentAction(e) {
   const targetElement = e.target
   if (targetElement.closest(".cards__link")) {
      const currentLink = targetElement.closest(".cards__link")
      console.log(currentLink)
      let number = currentLink.dataset.id
      console.log(number)

      number = parseInt(number)
      const songText = document.querySelector(".song")
      songText.classList.add("active")
      onValue(songInDB, function (snapshot) {
         // now it is array
         if (snapshot.exists()) {
            let songArray = Object.values(snapshot.val())
            let currentBook = songArray[number - 1]
            const songInput = document.querySelector("#song")
            if (songInput) {
               songInput.innerHTML = currentBook
            }
            if (currentBook === undefined) {
               songInput.innerHTML = songArray[songArray.length - 1]
            }

            // console.log(songArray[songArray.length - 1])
         } else {
            // let currentBook = songArray[songArray.length - 1]
            // const songInput = document.querySelector("#song")
            // if (songInput) {
            //    songInput.innerHTML = songArray[songArray.length - 1]
            // }
         }
      })
   }
   if (targetElement.closest(".song__button")) {
      const songText = document.querySelector(".song")
      songText.classList.remove("active")
   }
}

// if (text !== undefined) {
//    const songText = document.querySelector(".song")
//    if (songText) {
//       songText.textContent = text
//    }
// }