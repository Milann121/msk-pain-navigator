import { promises as fs } from 'fs';
import path from 'path';

const LOCALES_DIR = path.join(process.cwd(), 'src', 'locales');
const EN_DIR = path.join(LOCALES_DIR, 'en');

async function readJson(file: string) {
  const content = await fs.readFile(file, 'utf8');
  return JSON.parse(content);
}

function collectKeys(obj: Record<string, any>, prefix = ''): string[] {
  let keys: string[] = [];
  for (const [key, value] of Object.entries(obj)) {
    const newPrefix = prefix ? `${prefix}.${key}` : key;
    if (value && typeof value === 'object') {
      keys = keys.concat(collectKeys(value, newPrefix));
    } else {
      keys.push(newPrefix);
    }
  }
  return keys;
}

async function verifyTranslation(langDir: string, canonicalKeys: string[]) {
  const file = path.join(langDir, 'translation.json');
  const json = await readJson(file);
  const keys = collectKeys(json);
  const missing = canonicalKeys.filter(k => !keys.includes(k));
  return missing;
}

async function main() {
  const enFile = path.join(EN_DIR, 'translation.json');
  const enJson = await readJson(enFile);
  const canonicalKeys = collectKeys(enJson);

  const languages = await fs.readdir(LOCALES_DIR);
  let hadMissing = false;

  for (const lang of languages) {
    if (lang === 'en') continue;
    const langDir = path.join(LOCALES_DIR, lang);
    try {
      const missing = await verifyTranslation(langDir, canonicalKeys);
      if (missing.length) {
        hadMissing = true;
        console.error(`Missing keys in ${lang}:`);
        for (const key of missing) {
          console.error(`  ${key}`);
        }
      }
    } catch (err) {
      hadMissing = true;
      console.error(`Error processing ${langDir}: ${(err as Error).message}`);
    }
  }

  if (hadMissing) {
    process.exit(1);
  } else {
    console.log('All translation files contain the required keys.');
  }
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
