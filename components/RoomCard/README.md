# How to uses the compoent in HTML?
Like any other HTML element
<room-card>
  <!-- add img -->
  <!-- add any text element -->
</room-card>

# How to use it in JS
```javascript
const myCard = document.createElement("room-card");
myCard.appendChild(YourImg);
myCard.appendChild(YourElemnts);
```

## Note
- Image will always pop in its place no matter the order of HTML tag placement
- only one image (the last image) will be rendered
- you can append to the text body of the card freely any element but images

# the internal DOM structure of the component
```HTML
<div class="cntnr card">
    <div class="imgCntnr">
        <img src="room1.jpg" alt="room1Img">
    </div>
    <div class="bodyCntnr">
        <div class="textBody">
          enter you body of text here
        </div>
        <button class="bookBtn">Book</button>
    </div>
</div>
```
