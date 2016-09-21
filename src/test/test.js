import {
    writeFileAsync,
    readFileAsync,
    spawnAsync,
    execAsync,
    copyDirAsync,
    watchItr
} from "../async-helper";
import chalk from "chalk";
import {
    argv
} from "yargs";
const parseConfig = async() => {
    const config = JSON.parse(await readFileAsync("./package.json"));
    config.grimoire = config.grimoire ? config.grimoire : {};
    return config;
};

const test = async(config) => {
    const filePath = `${config.test.temp}/${argv.files?argv.files:config.test.defaultGlob}`;
    await execAsync(`./node_modules/.bin/babel ${config.test.src} --out-dir ${config.test.temp} --presets es2015,stage-2 --plugins transform-runtime`);
    await spawnAsync("./node_modules/.bin/cauldron", ["txt2js", `--src ${config.test.src}`, `--dest ${config.test.temp}`, `--noDts`, `--isCjs`]);
    const result = await spawnAsync(`./node_modules/.bin/ava`, [filePath, '--verbose']);
};

const buildForTest = async(config) => {
    try {
        await spawnAsync("./node_modules/.bin/cauldron", ["build", "--noBundle", "--babelSeparated"]);
    } catch (e) {
        console.log(e);
    }
}

const watchForSource = async(config) => {
    for (let changedChunk of watchItr(config.ts.src, {
            interval: 500
        })) {
        await changedChunk;
        console.log(chalk.black.bgWhite("Changing source code was detected. Test would start after building."));
        await buildForTest();
        await test();
    }
};

const watchForTest = async(config) => {
    let i = 0;
    for (let changedChunk of watchItr(config.test.src, {
            interval: 500
        })) {
        if (i === 0) continue;
        i++;
        await changedChunk;
        console.log(chalk.black.bgWhite("Changing source code of test was detected. Starting test..."));
        await test();
    }
};

const main = async() => {
    const config = (await parseConfig()).grimoire;
    if (!argv.watch) {
        await buildForTest(config);
        await test(config)
    } else {
        watchForSource(config);
        watchForTest(config);
    }
};

main();
