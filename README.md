next-css-snow
=============

As this year's winter season is in its final death throes, it is giving up its last spurt of snow up here in Hokkaido. Like the song by Manic Street Preachers, it is [Still Snowing in Sapporo](https://www.songfacts.com/facts/manic-street-preachers/still-snowing-in-sapporo) today. With this melacholy bite, so I decided to make some fun exercise - falling snow effect using CSS! No canvas. Just CSS. Of course, with a dash of Javascript to make the CSS come alive.

This project is using [Next.js](https://nextjs.org) React framework specifically because I wanted to use the `styled-jsx` (CSS-in-JS library), which Next.js has a built-in support, for the snow effect.

## Description

For the CSS, I use `radial-gradient` to draw the snow.

```css
background-image: radial-gradient(circle 3px at 10px 10px, #ffffff, transparent)
```

I just generate a simple particle system, manipulating the size and position of each snow particle.

There are two implementations to make things a bit interesting. 

* The first one uses a [Web Worker](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API) to prepare the background-image value.

* The second one uses [window.requestAnimationFrame()](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame) to simulate animation.


## Known Issue

Sometimes the background image flickers. It happen when the browser somehow has problem interpreting the background image as either text or image. Check the browser's Developer Tools to see this behavior. I have not yet found any solution to this. Just refresh the browser when this occurs.


## Available Scripts

In the project directory, you can run:

### `npm install`

To install the required modules.

### `npm run dev`

Runs the app in the development mode.<br>
Open [http://localhost:8080](http://localhost:8080) to view it in the browser.

