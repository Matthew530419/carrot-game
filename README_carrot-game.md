### 1. Project name: Creating application of carrot-game

### 2. Period : 1 day

### 3. Concept of game

- Please consider architecture of application in advance, at least on concept stage.

- The game should be played with timer that could discount 10s when clicking start symbol button. The start symbol button should be simultaneously changed to pause symbol button. It would be better to put button and spans in section named header. div is also good. The reason why use section is that I want to divide sections definitely no matter who looks at it.

- Images of carrots and bugs should be positioned randomly on the section named field whenever clicking not only start button but also pause button.

- Image of carrots should be deleted when clicking the image. In case of carrot image empty before timeout, winner pop up message should be operated with icon of replay. In contrast, in case of clicking insect image, loser pop up message should be operated with icon of replay.

### 4. Basic carrot game

#### 4-1. HTML file

- Tag named `body` is divided into two sections named `game` and `pop-up`. In case you want to hide some of divs usually and to express those at the time you want, use option of CSS property like `.pop-up--hide{}` on CSS file and class name should be changed from `pop-up` to `pop-up pop-up--hide`. In case you want to express text on window tab, it would be better to use tag named `span`, rather than `div` because `div` needs innertext or innerHTML to express the text. I think it is waste and it is not optimized to use memory.

- `<body>`
  `<section class="game">`
  `<section class="game__header">`
  `<button class="game__start">`
  `<i class="fas fa-play"></i>`
  `</button>`
  `<span class="game__timer" >0:0</span>`
  `<span class="game__score">10</span>`
  `</section>`
  `<section class="game__field"></section>`
  `</section>`
  `<section class="pop-up pop-up--hide">`
  `<button class="pop-up__refresh">`
  `<i class="fas fa-redo"></i>`
  `</button>`
  `<span class="pop-up__message">hello</span>`
  `</section>`
  `</body>`

#### 4-2. CSS file

-

#### 4-3. Javascript file

- The reason why I use `'use strict'` is that javascript language is very flexible, so you can assign value of variable even though the variable is not defined. `'use strict'` helps assign value of variable after you define variable. Type error would be displayed on console if you do not define variable when use `'use strict'`.

- In case assigned reference like `item.style.position` should be refered and value is `'absolute'`, datas of `field.appendchild(item);` should be positioned on default coordinates like direction of northwest. This is because `field` of `field.appendchild(item)` is parent node of `item` and this has default value of position named `static`. So, should be changed to `relative` to put icons on the area of `field`. Please consider image size when defining variables related with coordinate. It is possible for image to be outside the area of `field` if not considered.

-`'use strict';`
`const field` = document.querySelector('.game\_\_field');
`const fieldRect` = `field.getBoundingClientRect();`
`const carrotSize = 80;`
`function initGame()` {
console.log(fieldRect);
`addItem('carrot', 5, 'img/carrot.png');`
`addItem('bug', 5, 'img/bug.png');`
}
`function addItem(className, count, imgPath)` {
const x1 = 0;
const y1 = 0;
`const x2 = fieldRect.width - carrotSize;`
`const y2 = fieldRect.height - carrotSize;`
`for(let i=0; i < count; i++)` {
`const item = document.createElement('img');`
`item.setAttribute('class', className);`
`item.setAttribute('src', imgPath);`
`item.style.position = 'absolute';`
`const x = randomNumber(x1, x2);`
`const y = randomNumber(y1, y2);`
item.style.left = `${x}px`;
item.style.top = `${y}px`;
`field.appendChild(item);`
console.log(`X: ${x}px, Y: ${y}px`);
}
}
`function randomNumber(min, max)` {
`return Math.random() * (max - min) + min;`
}
`initGame();`
