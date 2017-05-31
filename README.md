# Calendar
> A native javascript plugin that provides multiple choice by holding down the shift key.

 ## Usage
  - Add a dom to the document like `<div id="calender" class="calender"></div>`
  - Add the style and the script where can be used for rendering the dom content.
    * ```<link rel="stylesheet" type="text/css" href="./calendar.css">```
    * ```<script type="text/javascript" src='./calendar.js'></script>```
  - Init the calendar component and configure it 
    * ` var Calendar = new InitCalendar();` 
    * `Calendar.init(document.getElementById('calender'),{rangeMonth: 3 });`
  - The rangeMonth parameter means future several months that can be choosed.
  - When all the above have been done, you can try to hold down the shift key for multiple selection.
## Preview
 [Calendar](https://jsfiddle.net/douglasvegas/5fL5af9o/)
## Tips

This is just written for  company work, so the function may be too simple.But it let you get rid of using the huge JQuery-Ui and also 
you can expand the function by yourself easily.
