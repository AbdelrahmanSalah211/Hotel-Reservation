# How to use nav-bar component

Using classes [nav-logo, nav-item] to place each of them in their correct container.

If multiple instances of "nav-logo" exist, nav-bar will take the last instance ignoring the other.

## Input

```HTML
<nav-bar>
    <p class="nav-logo">ITI<br>Hotels</p>
    <p class="nav-item">Home</p>
    <p class="nav-item">Rooms</p>
    <p class="nav-item">Contact Us</p>
    <p class="nav-item">Book Now</p>
    <button type="button" class="nav-item">Logout</button>
</nav-bar>
```

## Output

```HTML
<nav-bar>
    <nav class="nav-bar">
        <div class="nav-logo-container">
            <p class="nav-logo">ITI<br>Hotels</p>
        </div>
        <ul class="nav-list">
            <li class="nav-item-container"><p class="">Home</p></li>
            <li class="nav-item-container"><p class="">Rooms</p></li>
            <li class="nav-item-container"><p class="">Contact Us</p></li>
            <li class="nav-item-container"><p class="">Book Now</p></li>
            <li class="nav-item-container"><button type="button" class="button">Logout</button></li>
        </ul>
    </nav>
</nav-bar>
```

## To remove nav-bar children in different screen sizes you can use 'rm-tablet' and 'rm-mobile'

```HTML
<nav-bar>
    <p class="nav-logo rm-tablet">ITI<br>Hotels</p>
    <p class="nav-item rm-tablet">Home</p>
    <p class="nav-item rm-tablet">Rooms</p>
    <p class="nav-item rm-tablet">Contact Us</p>
    <p class="nav-item rm-mobile">Book Now</p>
    <button type="button" class="nav-item">Logout</button>
</nav-bar>
```