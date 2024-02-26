# About
This is a simple project to create customizable timers. This project can be used for games, activities,...
It is written in Typescript, HTML and CSS and can be hosted on a simple server app like [Simple Web Server](https://simplewebserver.org/).

# Usage
You can add timers and customize them in the settings.json file.
Here is an example:
```json
{
    "timers": [
        {
            "title": "Mon first timer",
            "duration": 10,
            "options": [1, 60, 120, 180],
            "alarm": {
                "sound": "clock-alarm.mp3",
                "repeat": 1
            }
        },
        {
            "title": "My second timer",
            "duration": 120,
            "options": [1, 60, 120],
            "alarm": {
                "sound": "beep-warning.mp3",
                "repeat": 3
            }
        }
    ]
}
```

You can customize, for each timer, these elements:
- title: the timer title.
- duration: the initial duration.
- options: an array of options. Each option is a number of seconds
- alarm:
  - sound: sound to play
  - repeat: number of time to repeat the sound

**Options** are turned into + and - buttons that allow you to add or substract seconds from the timer.
If you define an **Alarm**, a sound will be played when the timer reach zero. The sound files must be placed into the assets/sound folder.

If you want to change the view style, you can modify the `style.css` file. There are multiples variables at the begining of the file that you can change according to your need.

# Contributing
If you want to contribute, please fork the repository and create a pull request. You can also post issues.

To begin:
1. Fork and clone the repository
2. Execute the command `npm i` (you need **Node.js** installed)
3. Execute the command `npm run build` to build the project and generate the js files
4. You can also use `npm run watch` to generate js files on file change.
 
