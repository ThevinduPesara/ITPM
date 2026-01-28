const { test, expect } = require('@playwright/test');

async function convertAndAssert(page, inputText, expectedSinhala) {
  const inputBox = page.locator('textarea').first();
  await inputBox.fill(inputText);

  await page.waitForFunction(
    (text) => document.body.innerText.includes(text),
    expectedSinhala
  );
}

test('Pos_Fun_0001 - Simple daily sentence', async ({ page }) => {
  await page.goto('https://www.swifttranslator.com/');
  await convertAndAssert(page, 'mama gedhara yanavaa', 'මම ගෙදර යනවා');
});

test('Pos_Fun_0002 - Simple daily sentence', async ({ page }) => {
  await page.goto('https://www.swifttranslator.com/');
  await convertAndAssert(page, 'mata bath oonee.', 'මට බත් ඕනේ.');
});

test('Pos_Fun_0003 - Simple daily sentence', async ({ page }) => {
  await page.goto('https://www.swifttranslator.com/');
  await convertAndAssert(page, 'api paasal yanavaa.', 'අපි පාසල් යනවා.');
});

test('Pos_Fun_0004 - Compound', async ({ page }) => {
  await page.goto('https://www.swifttranslator.com/');
  await convertAndAssert(page, 'api kaeema kanna yanavaa saha passe chithrapatayakuth balanavaa.', 'අපි කෑම කන්න යනවා සහ පස්සෙ චිත්‍රපටයකුත් බලනවා.');
});

test('Pos_Fun_0005 - Compound', async ({ page }) => {
  await page.goto('https://www.swifttranslator.com/');
  await convertAndAssert(page, 'oyaa hari, ehenam api yamu.', 'ඔයා හරි, එහෙනම් අපි යමු.');
});

test('Pos_Fun_0006 - Compound', async ({ page }) => {
  await page.goto('https://www.swifttranslator.com/');
  await convertAndAssert(page, 'mama gedhara yanavaa, haebaeyi vahina nisaa dhaenma yannee naee.', 'මම ගෙදර යනවා, හැබැයි වහින නිසා දැන්ම යන්නේ නෑ.');
});

test('Pos_Fun_0007 - Complex', async ({ page }) => {
  await page.goto('https://www.swifttranslator.com/');
  await convertAndAssert(page, 'mama heta enavaa', 'හෙට');
});

test('Pos_Fun_0008 - Complex', async ({ page }) => {
  await page.goto('https://www.swifttranslator.com/');
  await convertAndAssert(page, 'oya enavaanam mama balan innavaa.', 'ඔය එනවානම් මම බලන් ඉන්නවා.');
});

test('Pos_Fun_0009 - Complex', async ({ page }) => {
  await page.goto('https://www.swifttranslator.com/');
  await convertAndAssert(page, 'vaessa unath api yanna epaeyi.', 'වැස්ස උනත් අපි යන්න එපැයි.');
});

test('Pos_Fun_0010 - Complex', async ({ page }) => {
  await page.goto('https://www.swifttranslator.com/');
  await convertAndAssert(page, 'mama sunaQQgu vunee maarga thadhabadhaya nisaa.', 'මම සුනංගු වුනේ මාර්ග තදබදය නිසා.');
});

test('Pos_Fun_0010 - Question', async ({ page }) => {
  await page.goto('https://www.swifttranslator.com/');
  await convertAndAssert(page, 'oyaata kohomadha', 'ඔයාට කොහොමද');
});

test('Pos_Fun_0011 - Question', async ({ page }) => {
  await page.goto('https://www.swifttranslator.com/');
  await convertAndAssert(page, 'oyaa kavadhdha enna hithan inne', 'ඔයා කවද්ද එන්න හිතන් ඉන්නේ');
});

test('Pos_Fun_0012 - Question', async ({ page }) => {
  await page.goto('https://www.swifttranslator.com/');
  await convertAndAssert(page, 'meeka hariyata vaeda karanavaadha', 'මේක හරියට වැඩ කරනවාද');
});

test('Pos_Fun_0013 - Command', async ({ page }) => {
  await page.goto('https://www.swifttranslator.com/');
  await convertAndAssert(page, 'vahaama enna', 'වහාම එන්න');
});

test('Pos_Fun_0014 - Command', async ({ page }) => {
  await page.goto('https://www.swifttranslator.com/');
  await convertAndAssert(page, 'issarahata yanna', 'ඉස්සරහට යන්න');
});

test('Pos_Fun_0015 - Command', async ({ page }) => {
  await page.goto('https://www.swifttranslator.com/');
  await convertAndAssert(page, 'mata kiyanna', 'මට කියන්න');
});

test('Pos_Fun_0016 - Greeting', async ({ page }) => {
  await page.goto('https://www.swifttranslator.com/');
  await convertAndAssert(page, 'aayuboovan', 'ආයුබෝවන්');
});

test('Pos_Fun_0017 - Request', async ({ page }) => {
  await page.goto('https://www.swifttranslator.com/');
  await convertAndAssert(page, 'karuNaakaralaa eka poddak balanna', 'කරුණාකරලා එක පොඩ්ඩක් බලන්න');
});

test('Pos_Fun_0018 - Response', async ({ page }) => {
  await page.goto('https://www.swifttranslator.com/');
  await convertAndAssert(page, 'hari, mama karannam', 'හරි, මම කරන්නම්');
});

test('Pos_Fun_0019 - Polite', async ({ page }) => {
  await page.goto('https://www.swifttranslator.com/');
  await convertAndAssert(page, 'karuNaakaralaa mata podi udhavvak karanna puLuvandha', 'කරුණාකරලා මට පොඩි උදව්වක් කරන්න පුළුවන්ද');
});

test('Pos_Fun_0020 - Informal', async ({ page }) => {
  await page.goto('https://www.swifttranslator.com/');
  await convertAndAssert(page, 'eeyi, ooka dhiyan', 'ඒයි, ඕක දියන්');
});

test('Pos_Fun_0021 - Informal Command', async ({ page }) => {
  await page.goto('https://www.swifttranslator.com/');
  await convertAndAssert(page, 'ehema karapan', 'එහෙම කරපන්');
});

test('Pos_Fun_0022 - Past Tense', async ({ page }) => {
  await page.goto('https://www.swifttranslator.com/');
  await convertAndAssert(page, 'mama iiyee gedhara giyaa', 'මම ඊයේ ගෙදර ගියා');
});

test('Pos_Fun_0023 - Present Tense', async ({ page }) => {
  await page.goto('https://www.swifttranslator.com/');
  await convertAndAssert(page, 'mama dhaen vaeda karanavaa', 'මම දැන් වැඩ කරනවා');
});

test('Pos_Fun_0024 - Future Tense', async ({ page }) => {
  await page.goto('https://www.swifttranslator.com/');
  await convertAndAssert(page, 'api iiLaGa sathiyee gedhara yamu', 'අපි ඊළඟ සතියේ ගෙදර යමු');
});
test('Pos_Fun_0026 - Future Tense', async ({ page }) => {
  await page.goto('https://www.swifttranslator.com/');
  await convertAndAssert(page, 'adoo vaedak baaragaththaanam eeka hariyata karapanko bQQ.', 'අඩෝ වැඩක් බාරගත්තානම් ඒක හරියට කරපන්කො .');
});

test('Neg_Fun_0001 - Joined words without spaces', async ({ page }) => {
  await page.goto('https://www.swifttranslator.com/');

  const inputBox = page.locator('textarea').first();
  await inputBox.fill('mamagedharayanavaa');

  await page.waitForTimeout(3000);

  const pageText = await page.textContent('body');
  expect(pageText).toContain('මමගෙදරයනවා');
});

test('Neg_Fun_0002 - Joined words without spaces (variant)', async ({ page }) => {
  await page.goto('https://www.swifttranslator.com/');

  const inputBox = page.locator('textarea').first();
  await inputBox.fill('matapaankannaoonee');

  await page.waitForTimeout(3000);

  const pageText = await page.textContent('body');
  expect(pageText).not.toContain('බත්');
});

test('Neg_Fun_0003 - Missing spaces', async ({ page }) => {
  await page.goto('https://www.swifttranslator.com/');

  const inputBox = page.locator('textarea').first();
  await inputBox.fill('hetaapiyanavaa');

  await page.waitForTimeout(3000);

  const pageText = await page.textContent('body');
  expect(pageText).not.toContain('අපි');
});

test('Neg_Fun_0004 - Repeated emphasis + slang words', async ({ page }) => {
  await page.goto('https://www.swifttranslator.com/');

  const inputBox = page.locator('textarea').first();
  await inputBox.fill('ela machan! supiri!!');

  await page.waitForTimeout(3000);

  const pageText = await page.textContent('body');
  expect(pageText).not.toContain('ඇල්ල');
});

test('Neg_Fun_0005 - Heavy slang sentence + typos', async ({ page }) => {
  await page.goto('https://www.swifttranslator.com/');

  const inputBox = page.locator('textarea').first();
  await inputBox.fill('adoo vaedak baaragaththaanam eeka hariyata karapanko bQQ.');

  await page.waitForTimeout(3000);

  const pageText = await page.textContent('body');
  expect(pageText).not.toContain('අඩෝ වැඩක් බාරගත්තානම් ඒක හරියට කරපන්කො බං.');
});

test('Neg_Fun_0006 - Punctuation stress (!!!)', async ({ page }) => {
  await page.goto('https://www.swifttranslator.com/');

  const inputBox = page.locator('textarea').first();
  await inputBox.fill('mama gedhara yanavaa!!!');

  await page.waitForTimeout(3000);

  const pageText = await page.textContent('body');
  expect(pageText).not.toContain('මම ගෙදර යනවා!!!');
});

test('Neg_Fun_0007 - Mixed English + abbreviations', async ({ page }) => {
  await page.goto('https://www.swifttranslator.com/');

  const inputBox = page.locator('textarea').first();
  await inputBox.fill('Zoom meeting ekak thiyennee. ID eka dhenna.');

  await page.waitForTimeout(3000);

  const pageText = await page.textContent('body');
  expect(pageText).not.toContain('අයිඩී');
});

test('Neg_Fun_0008 - Date formats in one input (multiple styles)', async ({ page }) => {
  await page.goto('https://www.swifttranslator.com/');

  const inputBox = page.locator('textarea').first();
  await inputBox.fill('dhesaembar 25 / 25/12/2025 / 2026-05-21');

  await page.waitForTimeout(3000);

  const pageText = await page.textContent('body');
  // basic negative: should not hallucinate month translation as a Sinhala word if parsing fails
  expect(pageText).not.toContain('දෙසැම්බර් 25 / 25/12/2025 / 2026-05-21');
});

test('Neg_Fun_0009 - Time + currency mixed', async ({ page }) => {
  await page.goto('https://www.swifttranslator.com/');

  const inputBox = page.locator('textarea').first();
  await inputBox.fill('Rs. 5343 7.30 AM');

  await page.waitForTimeout(3000);

  const pageText = await page.textContent('body');
  expect(pageText).not.toContain('රුපියල්');
});

test('Neg_Fun_0010 - Multi-line input stability (paragraphs)', async ({ page }) => {
  await page.goto('https://www.swifttranslator.com/');

  const inputBox = page.locator('textarea').first();
  await inputBox.fill(
`karuNaakaralaa mata podi udhavvak karanna puLuvandha?

mama dhaen vaeda karanavaa.
api iiLaGa sathiyee gedhara yamu.`
  );

  await page.waitForTimeout(3000);

  const pageText = await page.textContent('body');
  // negative: should not crash / blank out / show obvious error text
  expect(pageText).not.toContain('Error');
  expect(pageText).not.toContain('Something went wrong');
});
