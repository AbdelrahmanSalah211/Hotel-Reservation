# How to use select-menu component in HTML

Like other HTML elements place it in the file

## Input

```HTML
<select-menu>
</select-menu>
```

## Output

```HTML
<select-menu>
  <label></label>
  <select></select>
</select-menu>
```

## Attributes

select-menu tag can take one attribute that is label to specify the text shown by generated label inside the tag.
label attribute can accept html tags

## Input

```HTML
<select-menu label="<span>text shown by generated label</span>">
</select-menu>
```

## Output

```HTML
<select-menu>
  <label>
    <span>text shown by generated label</span>
  </label>
  <select></select>
</select-menu>
```

## Classes

select-menu tag have default class assigned to it called select-menu-container

label do not have default class assigned to it

select tag have default class assigned to it called custom-select

option tag have default call assigned to it called select-menu-child


## Capilities

can access the value of selected option directly on the select-menu element by accessing value properety.
however if the child options were appended using JavaScript not specified in the html file you need to initilize a promise that resolves to the value of selected option by using setTimeout inside the promise


1) creating options using JavaScript

```JavaScript
const select = document.createElement('select-menu');


const option1 = document.createElement('option');
option1.value = 'apple';
option1.textContent = 'Apple';
option1.selected = true;
const option2 = document.createElement('option');
option2.value = 'orange';
option2.textContent = 'Orange';
const option3 = document.createElement('option');
option3.value = 'banana';
option3.textContent = 'Banana';

const myPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(select.value); // should print apple
  }, 1)
});

myPromise.then((selectedValue => {
  console.log(selectedValue);
}))
```

2) creating options in html file

```HTML
<select-menu label="selected value example">
  <option value="apple" selected>Apple</option>
  <option value="orange" >Orange</option>
  <option value="banana" >Banana</option>
</select-menu>
```

```JavaScript
const select = document.querySelector('select-menu');

console.log(selectedValue); // should print apple
```

## Append and Remove Children

you can directly append a child on select-menu and they will be added to inner select element
you need to access inner select element to remove a child