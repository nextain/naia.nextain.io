import fs from 'fs/promises';
import path from 'path';
import enDict from '../src/i18n/dictionaries/en';

const langs = ["ja", "zh", "fr", "de", "ru", "es", "ar", "hi", "bn", "pt", "id", "vi"];

async function translateChunk(textChunk: string, targetLang: string) {
    let urlLang = targetLang;
    if (targetLang === 'zh') urlLang = 'zh-CN';
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${urlLang}&dt=t&q=${encodeURIComponent(textChunk)}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error("Translation failed");
    const json = await res.json();
    return json[0].map((x: any) => x[0]).join("");
}

async function translateAll() {
    const flatStrings: {path: string[], val: string}[] = [];
    function traverse(obj: any, currentPath: string[]) {
        for (const [k, v] of Object.entries(obj)) {
            if (k === 'locale') continue; // Skip locale key
            if (typeof v === 'string') {
                flatStrings.push({path: [...currentPath, k], val: v});
            } else if (Array.isArray(v)) {
                v.forEach((item, i) => flatStrings.push({path: [...currentPath, k, String(i)], val: item}));
            } else if (typeof v === 'object') {
                traverse(v, [...currentPath, k]);
            }
        }
    }
    traverse(enDict, []);

    for (const lang of langs) {
        console.log(`Translating Web to ${lang}...`);
        const newObj = JSON.parse(JSON.stringify(enDict));
        newObj.locale = lang;

        const chunks = [];
        let currentChunk = [];
        let currentLen = 0;
        for (const {val} of flatStrings) {
            const safeVal = val.replace(/\{([^}]+)\}/g, '~$1~');
            if (currentLen + safeVal.length > 2000) {
                chunks.push(currentChunk);
                currentChunk = [];
                currentLen = 0;
            }
            currentChunk.push(safeVal);
            currentLen += safeVal.length + 5;
        }
        if (currentChunk.length > 0) chunks.push(currentChunk);

        let translatedStrings: string[] = [];
        for (const chunk of chunks) {
            const textToTranslate = chunk.join("\n|||\n");
            let translatedText = "";
            try {
                translatedText = await translateChunk(textToTranslate, lang);
            } catch (e) {
                console.error(`Failed to translate chunk for ${lang}`);
                translatedText = chunk.join("\n|||\n");
            }
            
            const split = translatedText.split(/\n?\|\|\|\n?/);
            if (split.length !== chunk.length) {
                console.warn(`Chunk mismatch for ${lang}. Expected ${chunk.length}, got ${split.length}. Falling back to individual translation...`);
                for (const single of chunk) {
                    try {
                        translatedStrings.push(await translateChunk(single, lang));
                    } catch {
                        translatedStrings.push(single);
                    }
                }
            } else {
                translatedStrings.push(...split);
            }
        }

        for (let i = 0; i < flatStrings.length; i++) {
            const {path} = flatStrings[i];
            let translated = translatedStrings[i] || flatStrings[i].val;
            translated = translated.replace(/~([^~]+)~/g, '{$1}'); // Restore variables
            
            let curr = newObj;
            for (let j = 0; j < path.length - 1; j++) {
                curr = curr[path[j]];
            }
            curr[path[path.length - 1]] = translated.trim();
        }

        const outPath = path.join(process.cwd(), `src/i18n/dictionaries/${lang}.ts`);
        const content = `import type { Dictionary } from "./types";\n\nconst ${lang}: Dictionary = ${JSON.stringify(newObj, null, 2)};\n\nexport default ${lang};\n`;
        await fs.writeFile(outPath, content);
    }
    console.log("Web translation complete.");
}

translateAll().catch(console.error);
