# devvit-common-operations

some opertations i thought many people need.

note: this is unofficial;

## collaborating, howto?

i dont know either, but i feel like making a pull request is the best way.

[if you know how to manage this or have hints or questions please feel free to message this person](https://www.reddit.com/message/compose/?to=antboiy&subject=https%3A%2F%2Fgithub.com%2FDNSCond%2Fdevvit-common-operations&message=please%20be%20detailed%20as%20possible%2C%20i%20will%20most%20likely%20not%20respond%20to%20messages%20without%20context%2C%20the%20url%20is%20context%20enough%2C%20also%20please%20do%20not%20send%20this%20prefilled%20message%20without%20editing)

please be detailed as possible, i will most likely not respond to messages without context, the url is context enough,
also please do not send this prefilled message without editing.

https://docs.github.com/en/get-started/exploring-projects-on-github/contributing-to-a-project

also i dont know how to make the licensing work

## repository folder structure

```
src / (the root of all code)
| - devvit / (everything devvit. aka all of it)
  | - mod / (mod tools with "@devvit/public-api")
  | - web / (devvit web with "@devvit/web")
    | - server (devvit web server)
    | - client (devvit web client)
```

plewase name your files as the function they contain. and put your name and reddit url with it.

`u/antboiy <https://reddit.com/u/antboiy/>`.

## how to use

1. look for a file you want to include in your project.
2. create a file in your project's relavant folder with the same name or a name you choose.
3. copy the text of the file.
4. paste the contents in the file.
5. either use `npm install <dependancy>` or add the dependancy to the `package.json` of the dependancys listed by the creator.
6. `npm install`.
7. [`import`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import) it in your project.
8. now you can use a single function or multiple!

## how to nme things. (and code style)

to have this work, we (or just me) need a usage style, while i wont make a fuss about arrow function
(n => n) or keyword functions (function (n) {return n;}) some might. but thats just an example.

- when naming settings, prefix them with the filename, for example `upgradeNotifcation`'s
  settings will be prefixed with "upgradeNotifcation-". this prevents 2 files sharing the same setting name.
- when possible make it easy to follow, and if not, please do weirdness that is standardized.
- add types as much as possible, even if its unessary. this only applies to functionallity a user of your file will use, internal things can go untyped.

## github URL

https://github.com/DNSCond/devvit-common-operations
