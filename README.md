# inquisitor

> A test-runner task packages for Grimoire.js

## What the features would be provided?

* Build for testing (Considering the packages that depends on as grimoire addons)
* Run the test(With the funtastic test runner `ava`)

## Configurations

This package is depends on `grimoirejs-cauldron` which is the standard builder for grimoire.js.
Therefore, this package also use `grimoire` section in the root element of `package.json`.

**NOTE test section can be used in grimoirejs-cauldron also for scaffolding test files**


```json
"grimoire": {
    "ts": {
        "lib": "./lib-es6",
        "temp": "./lib-ts",
        "src": "./src-debug",
        "es5": "./lib-es5"
    },
    "main": "test.ts",
    "test": {
        "defaultGlob": "**/*Test.js",
        "src": "./test",
        "temp": "./lib-test"
    },
    "out": {
        "es6": "./product/grimoire.es2016.js",
        "es5": "./product/grimoire.js"
    },
    "txt-exts": [
        ".txt"
    ],
    "doc": {
        "src": "./doc",
        "header": "./doc/header.md",
        "footer": "./doc/footer.md",
        "dest": "./lib-md/index.md"
    }
}
```

Most of the property is also used in `grimoirejs-cauldron`. However, `test.defaultGlob` and `test.temp` is also necessary property for grimoirejs-inquisitor.

## How to test packages?

To learn how to write test code, please refer the web site of `ava`.(https://github.com/avajs/ava)
This website should be helpful for you.

We would like to provide some of features for mocking components,nodes or some of the base objects can be extended.

However,we are in lack of time. We didn't do anything about this. But, that must be provided surely.

So,I'm very sorry to trouble you, but please use `sinon` or something mocking packages to test your components.
