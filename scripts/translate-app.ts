import fs from 'fs';
import path from 'path';

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

async function translateApp() {
    const filePath = path.join(process.cwd(), '../naia-os/shell/src/lib/i18n.ts');
    let content = fs.readFileSync(filePath, 'utf-8');

    const regex = /"([^"]+)"\s*:\s*\{\s*ko:\s*"([^"]*)",\s*en:\s*"([^"]*)"/g;
    const items = [];
    let match;
    while ((match = regex.exec(content)) !== null) {
        items.push({
            key: match[1],
            ko: match[2],
            en: match[3],
        });
    }

    console.log(`Found ${items.length} items to translate.`);

    const translatedByLang: Record<string, string[]> = {};

    for (const lang of langs) {
        console.log(`Translating App to ${lang}...`);
        
        const chunks = [];
        let currentChunk = [];
        let currentLen = 0;
        for (const {en} of items) {
            const safeVal = en.replace(/\{([^}]+)\}/g, '~$1~');
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
            const textToTranslate = chunk.join("\n___\n");
            let translatedText = "";
            try {
                translatedText = await translateChunk(textToTranslate, lang);
            } catch (e) {
                translatedText = chunk.join("\n___\n");
            }
            
            const split = translatedText.split(/\n?___\n?/);
            if (split.length !== chunk.length) {
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
        
        translatedByLang[lang] = translatedStrings.map(s => s.replace(/~([^~]+)~/g, '{$1}').replace(/"/g, '\\"').trim());
    }

    for (let i = 0; i < items.length; i++) {
        const item = items[i];
        
        // Use a safe regex to find the object block for this key
        const searchPattern = new RegExp(`("${item.key}"\\s*:\\s*\\{\\s*ko:\\s*"[^"]*",\\s*en:\\s*"[^"]*")[^}]*\\}`, 'g');
        
        let repl = `$1`;
        for (const lang of langs) {
            repl += `, ${lang}: "${translatedByLang[lang][i]}"`;
        }
        repl += ` }`;
        
        content = content.replace(searchPattern, repl);
    }

    fs.writeFileSync(filePath, content, 'utf-8');
    console.log("App translation complete.");
}

translateApp().catch(console.error);
