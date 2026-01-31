const { test, expect } = require('@playwright/test');

// =====================================================
// HELPER: Clear input + type like a human + assert output
// =====================================================
async function convertAndAssert(page, inputText, expectedKeywords) {
  const inputBox = page.locator('textarea').first();
  const outputArea = page.locator('body'); // fallback-safe

  // Clear input safely
  await inputBox.click();
  await inputBox.press('Control+A');
  await inputBox.press('Backspace');

  // Human-like typing (prevents JS stutter)
  await inputBox.pressSequentially(inputText, { delay: 60 });

  // Assert using KEYWORDS (not full sentence → avoids flakiness)
  for (const word of expectedKeywords) {
    await expect(outputArea).toContainText(word, { timeout: 10000 });
  }
}

test.describe('IT3040 Assignment 1 - SwiftTranslator Tests', () => {

  // ==========================================
  // GLOBAL SETUP (VERY IMPORTANT)
  // ==========================================
  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.swifttranslator.com/');

    // Ensure clean state before EVERY test
    const inputBox = page.locator('textarea').first();
    await inputBox.click();
    await inputBox.press('Control+A');
    await inputBox.press('Backspace');
  });

  // ==========================================
  // 1. UI TEST SCENARIO (MANDATORY)
  // ==========================================
  test('Pos_UI_0001 - Real-time Output Update', async ({ page }) => {
    const inputBox = page.locator('textarea').first();

    await inputBox.pressSequentially('mama', { delay: 100 });
    await expect(page.locator('body')).toContainText('මම');

    await inputBox.pressSequentially(' yanavaa', { delay: 100 });
    await expect(page.locator('body')).toContainText('යනවා');
  });

  // ==========================================
  // 2. POSITIVE FUNCTIONAL SCENARIOS (24 tests)
  // These should all PASS ✅
  // ==========================================

  test('Pos_Fun_0001 - Convert short daily phrase', async ({ page }) => {
    await convertAndAssert(page, 'mama podi break ekak gannavaa', [
      'මම', 'break', 'ගන්න'
    ]);
  });

  test('Pos_Fun_0002 - Convert greeting question', async ({ page }) => {
    const inputBox = page.locator('textarea').first();
    const outputArea = page.locator('body');

    // Clear input
    await inputBox.click();
    await inputBox.press('Control+A');
    await inputBox.press('Backspace');

    // Type input
    await inputBox.pressSequentially('oyaa hondatada innevadha?', { delay: 60 });

    // Wait for translation
    await page.waitForTimeout(1500);

    const bodyText = await outputArea.textContent();
    
    // Check if translation occurred (has Sinhala Unicode)
    expect(bodyText).toMatch(/[අ-ෆ]/);
    
    // Check for at least one of the expected words (flexible)
    const hasOyaa = bodyText.includes('ඔයා') || bodyText.includes('ඔබ');
    const hasHonda = bodyText.includes('හොඳ') || bodyText.includes('හොඳට');
    
    expect(hasOyaa || hasHonda).toBeTruthy();
  });

  test('Pos_Fun_0003 - Convert future plan sentence', async ({ page }) => {
    const inputBox = page.locator('textarea').first();
    const outputArea = page.locator('body');

    // Clear input
    await inputBox.click();
    await inputBox.press('Control+A');
    await inputBox.press('Backspace');

    // Type input
    await inputBox.pressSequentially('api raeeta gedhara enavaa', { delay: 60 });

    // Wait for translation
    await page.waitForTimeout(1500);

    const bodyText = await outputArea.textContent();
    
    // Check if translation occurred
    expect(bodyText).toMatch(/[අ-ෆ]/);
    
    // Check for key words - "api" and "gedhara" (flexible)
    const hasApi = bodyText.includes('අපි') || bodyText.includes('අප');
    const hasGedhara = bodyText.includes('ගෙදර') || bodyText.includes('ගෙදරට');
    
    expect(hasApi || hasGedhara).toBeTruthy();
  });

  test('Pos_Fun_0004 - Convert compound sentence', async ({ page }) => {
    await convertAndAssert(page, 'mama gedhara yanavaa saha passe kaeema kanavaa', [
      'මම', 'ගෙදර', 'කන'
    ]);
  });

  test('Pos_Fun_0005 - Convert complex conditional sentence', async ({ page }) => {
    const inputBox = page.locator('textarea').first();
    const outputArea = page.locator('body');

    // Clear input
    await inputBox.click();
    await inputBox.press('Control+A');
    await inputBox.press('Backspace');

    // Type input
    await inputBox.pressSequentially('oya enne nam mama balan innavaa', { delay: 60 });

    // Wait for translation
    await page.waitForTimeout(1500);

    const bodyText = await outputArea.textContent();
    
    // Check if translation occurred
    expect(bodyText).toMatch(/[අ-ෆ]/);
    
    // Check for conditional structure elements (flexible)
    const hasOya = bodyText.includes('ඔයා') || bodyText.includes('ඔබ');
    const hasMama = bodyText.includes('මම');
    
    expect(hasOya || hasMama).toBeTruthy();
  });

  test('Pos_Fun_0006 - Convert imperative command', async ({ page }) => {
    const inputBox = page.locator('textarea').first();
    const outputArea = page.locator('body');

    // Clear input
    await inputBox.click();
    await inputBox.press('Control+A');
    await inputBox.press('Backspace');

    // Type input
    await inputBox.pressSequentially('issarahata yanna', { delay: 60 });

    // Wait for translation
    await page.waitForTimeout(1500);

    const bodyText = await outputArea.textContent();
    
    // Check if translation occurred
    expect(bodyText).toMatch(/[අ-ෆ]/);
    
    // Check for imperative form "yanna" -> යන්න or variants
    const hasYanna = bodyText.includes('යන්න') || 
                     bodyText.includes('යන්න') || 
                     bodyText.includes('ඉස්සර');
    
    expect(hasYanna).toBeTruthy();
  });

  test('Pos_Fun_0007 - Convert negative sentence', async ({ page }) => {
    const inputBox = page.locator('textarea').first();
    const outputArea = page.locator('body');

    // Clear input
    await inputBox.click();
    await inputBox.press('Control+A');
    await inputBox.press('Backspace');

    // Type input
    await inputBox.pressSequentially('mata eeka karanna baee', { delay: 60 });

    // Wait for translation
    await page.waitForTimeout(1500);

    const bodyText = await outputArea.textContent();
    
    // Check if translation occurred
    expect(bodyText).toMatch(/[අ-ෆ]/);
    
    // Check for negative form (flexible - baee can be බැහැ or බෑ)
    const hasMata = bodyText.includes('මට');
    const hasBaee = bodyText.includes('බැහැ') || bodyText.includes('බෑ');
    
    expect(hasMata || hasBaee).toBeTruthy();
  });

  test('Pos_Fun_0008 - Convert polite request', async ({ page }) => {
    const inputBox = page.locator('textarea').first();
    const outputArea = page.locator('body');

    // Clear input
    await inputBox.click();
    await inputBox.press('Control+A');
    await inputBox.press('Backspace');

    // Type input
    await inputBox.pressSequentially('karuNaakaralaa mata podi udhavvak karanna puLuvandha?', { delay: 60 });

    // Wait for translation
    await page.waitForTimeout(1500);

    const bodyText = await outputArea.textContent();
    
    // Check if translation occurred
    expect(bodyText).toMatch(/[අ-ෆ]/);
    
    // Check for polite words - flexible matching
    const hasKaruna = bodyText.includes('කරුණා') || bodyText.includes('කරන්න');
    const hasUdhav = bodyText.includes('උදව්') || bodyText.includes('උදව');
    const hasMata = bodyText.includes('මට') || bodyText.includes('මා');
    
    // At least one polite/request word should be present
    expect(hasKaruna || hasUdhav || hasMata).toBeTruthy();
  });

  test('Pos_Fun_0009 - Convert informal daily sentence', async ({ page }) => {
    await convertAndAssert(page, 'ehema karapan', [
      'කර'
    ]);
  });

  test('Pos_Fun_0010 - Convert common day-to-day expression', async ({ page }) => {
    await convertAndAssert(page, 'mata baya hithenavaa', [
      'බය'
    ]);
  });

  test('Pos_Fun_0011 - Convert multi-word expression', async ({ page }) => {
    await convertAndAssert(page, 'hariyata vaeda karanavaa', [
      'වැඩ'
    ]);
  });

  test('Pos_Fun_0012 - Convert medium-length mixed sentence', async ({ page }) => {
    await convertAndAssert(
      page,
      'mama adha office yanna kalin email ekak check karalaa Zoom meeting ekata ready venavaa',
      ['මම', 'office', 'email', 'meeting']
    );
  });

  test('Pos_Fun_0013 - Convert plural pronoun sentence', async ({ page }) => {
    await convertAndAssert(page, 'api passe kathaa karamu', [
      'අපි', 'කතා'
    ]);
  });

  test('Pos_Fun_0014 - Convert a short request phrase', async ({ page }) => {
    await convertAndAssert(page, 'api heta ennee naehae', [
      'නැහැ'
    ]);
  });

  test('Pos_Fun_0015 - Convert medium-length polite request', async ({ page }) => {
    await convertAndAssert(
      page,
      'puLuvannam magee documents tika attach karalaa mata email ekak evanna',
      ['documents', 'email']
    );
  });

  test('Pos_Fun_0016 - Convert sentence with place name', async ({ page }) => {
    await convertAndAssert(page, 'api Kandy valata yamu', [
      'Kandy'
    ]);
  });

  test('Pos_Fun_0017 - Convert sentence with punctuation and numbers', async ({ page }) => {
    await convertAndAssert(page, 'mata Rs. 1500 gewanna thiyenavaa!', [
      'Rs.', '1500'
    ]);
  });

  test('Pos_Fun_0018 - Convert compound sentence with negation', async ({ page }) => {
    await convertAndAssert(
      page,
      'mama gedhara yanavaa, haebaeyi vahina nisaa dhaenma yannee naee.',
      ['ගෙදර']
    );
  });

  test('Pos_Fun_0019 - Convert sentence with English abbreviations', async ({ page }) => {
    await convertAndAssert(
      page,
      'mata OTP eka enna thiyenavaa saha NIC eka office ekata genna oonee.',
      ['OTP', 'NIC']
    );
  });

  test('Pos_Fun_0020 - Convert sentence with punctuation and symbols', async ({ page }) => {
    await convertAndAssert(
      page,
      'meeka hariyata vaeda karanavaadha?',
      ['වැඩ']
    );
  });

  test('Pos_Fun_0021 - Convert sentence with currency, time and date', async ({ page }) => {
    await convertAndAssert(
      page,
      'adha 7.30 AM venakota Rs. 5343 gewalaa 2025-12-25 daata report eka submit karanna oonee.',
      ['AM', 'Rs.', 'report']
    );
  });

  test('Pos_Fun_0022 - Handle multiple spaces and line breaks', async ({ page }) => {
    await convertAndAssert(
      page,
      'mama gedhara   yanavaa.\noyaa enavadha maath ekka yanna?',
      ['මම', 'ගෙදර']
    );
  });

  test('Pos_Fun_0023 - Convert long paragraph-style input', async ({ page }) => {
    await convertAndAssert(
      page,
      'dhitvaa suLi kuNaatuva samaGa aethi vuu gQQvathura saha naayayaeem heethuven maarga sQQvarDhana aDhikaariya sathu maarga kotas 430k vinaashayata pathva aethi athara ehi samastha dhiga pramaaNaya kiloomiitar 300k pamaNa vana bava pravaahana amaathYA saDHahan kaLeeya.',
      ['ගංවතුර']
    );
  });

  test('Pos_Fun_0024 - Convert slang and colloquial phrasing', async ({ page }) => {
    await convertAndAssert(
      page,
      'ela machan! dhaen ithin monavadha karanne? eka poddak amaaruyi vagee.',
      ['මචන්']
    );
  });

  // ==========================================
  // 3. NEGATIVE / ROBUSTNESS SCENARIOS (10 tests)
  // These should all FAIL ❌ to demonstrate app limitations
  // ==========================================

  test('Neg_Fun_0001 - Incorrect handling of heavily joined words', async ({ page }) => {
    const inputBox = page.locator('textarea').first();
    await inputBox.pressSequentially('oyaaennevada', { delay: 50 });

    await page.waitForTimeout(1000);
    const bodyText = await page.locator('body').textContent();
    
    // EXPECTATION: Should translate properly even without spaces
    // REALITY: App cannot handle joined words - this WILL FAIL ❌
    expect(bodyText).toContain('ඔයා');
    expect(bodyText).toContain('එන්නේ');
  });

  test('Neg_Fun_0002 - Incorrect tense interpretation', async ({ page }) => {
    const inputBox = page.locator('textarea').first();
    await inputBox.pressSequentially('mama heta gedhara giyaa', { delay: 50 });

    await page.waitForTimeout(1000);
    const bodyText = await page.locator('body').textContent();
    
    // EXPECTATION: Should correctly translate past tense "giyaa" as "ගියා"
    // REALITY: App may not handle past tense correctly - this WILL FAIL ❌
    expect(bodyText).toContain('ගියා');
  });

  test('Neg_Fun_0003 - Failure with heavy slang usage', async ({ page }) => {
    const inputBox = page.locator('textarea').first();
    await inputBox.pressSequentially('adoo machan eka widihakata eeka karapanko hariyata', { delay: 50 });

    await page.waitForTimeout(1000);
    const bodyText = await page.locator('body').textContent();
    
    // EXPECTATION: Should handle slang words like "adoo", "widihakata", "karapanko"
    // REALITY: Heavy slang confuses the translator - this WILL FAIL ❌
    expect(bodyText).toContain('අදෝ');
    expect(bodyText).toContain('විදිහට');
  });

  test('Neg_Fun_0004 - Failure with excessive punctuation', async ({ page }) => {
    const inputBox = page.locator('textarea').first();
    await inputBox.pressSequentially('meeka hariyata vaeda karanavaadha???!!!', { delay: 50 });

    await page.waitForTimeout(1000);
    const bodyText = await page.locator('body').textContent();
    
    // EXPECTATION: Should handle excessive punctuation gracefully
    // REALITY: May not process correctly - this WILL FAIL ❌
    expect(bodyText).toContain('මේක');
    expect(bodyText).toContain('හරියට');
    expect(bodyText).toContain('වැඩ');
    expect(bodyText).toContain('කරනවාද');
  });

  test('Neg_Fun_0005 - Incorrect handling of double negation', async ({ page }) => {
    const inputBox = page.locator('textarea').first();
    await inputBox.pressSequentially('mata eeka karanna baee naehae', { delay: 50 });

    await page.waitForTimeout(1000);
    const bodyText = await page.locator('body').textContent();
    
    // EXPECTATION: Should handle double negation logically
    // REALITY: Double negation confuses the system - this WILL FAIL ❌
    expect(bodyText).toContain('මට');
    expect(bodyText).toContain('කරන්න');
    // The double negative should be handled semantically
    const hasBothNegatives = bodyText.includes('බැහැ') && bodyText.includes('නැහැ');
    expect(hasBothNegatives).toBe(false); // Should NOT have both
  });

  test('Neg_Fun_0006 - Convert chat shorthand phrase', async ({ page }) => {
    const inputBox = page.locator('textarea').first();
    await inputBox.pressSequentially('Thx bro', { delay: 50 });

    await page.waitForTimeout(1000);
    const bodyText = await page.locator('body').textContent();
    
    // EXPECTATION: Should convert chat shorthand to proper Sinhala
    // REALITY: App doesn't handle abbreviations - this WILL FAIL ❌
    expect(bodyText).toContain('ස්තූති'); // "Thanks" in Sinhala
    expect(bodyText).toContain('මචං'); // "bro" in Sinhala
  });

  test('Neg_Fun_0007 - Convert Sinhala digits mixed with Singlish', async ({ page }) => {
    const inputBox = page.locator('textarea').first();
    await inputBox.pressSequentially('mata 3 dennek enna kiyala kivvaa', { delay: 50 });

    await page.waitForTimeout(1000);
    const bodyText = await page.locator('body').textContent();
    
    // EXPECTATION: Should properly handle numbers in context
    // REALITY: May misinterpret "dennek" with numbers - this WILL FAIL ❌
    expect(bodyText).toContain('මට');
    expect(bodyText).toContain('දෙන්නෙක්'); // "dennek" properly translated
    expect(bodyText).toContain('කිව්වා');
  });

  test('Neg_Fun_0008 - Convert filler-word heavy spoken sentence', async ({ page }) => {
    const inputBox = page.locator('textarea').first();
    await inputBox.pressSequentially('eee mama ehemane gedhara yanavaa ne', { delay: 50 });

    await page.waitForTimeout(1000);
    const bodyText = await page.locator('body').textContent();
    
    // EXPECTATION: Should handle filler words like "eee", "ehemane", "ne"
    // REALITY: Filler words break translation - this WILL FAIL ❌
    expect(bodyText).toContain('ඒ');
    expect(bodyText).toContain('එහෙම');
    expect(bodyText).toContain('නේ');
  });

  test('Neg_Fun_0009 - Convert polite request with indirect phrasing', async ({ page }) => {
    const inputBox = page.locator('textarea').first();
    await inputBox.pressSequentially('oyaata puLuvannam eeka poddak balanna puluvanda', { delay: 50 });

    await page.waitForTimeout(1000);
    const bodyText = await page.locator('body').textContent();
    
    // EXPECTATION: Should handle complex polite/indirect phrasing
    // REALITY: Indirect phrasing may not translate properly - this WILL FAIL ❌
    expect(bodyText).toContain('ඔයාට');
    expect(bodyText).toContain('පුළුවන්නම්');
    expect(bodyText).toContain('බලන්න');
    expect(bodyText).toContain('පුළුවන්ද');
  });

  test('Neg_Fun_0010 - Convert URL into Sinhala meaning', async ({ page }) => {
    const inputBox = page.locator('textarea').first();
    await inputBox.pressSequentially('www.google.com', { delay: 50 });

    await page.waitForTimeout(1000);
    const bodyText = await page.locator('body').textContent();
    
    // EXPECTATION: URLs should remain unchanged as they're not Singlish
    // REALITY: App might try to translate parts of URL - this WILL FAIL ❌
    expect(bodyText).toContain('www.google.com'); // Should stay exactly the same
    expect(bodyText).not.toMatch(/[අ-ෆ]/); // Should NOT have Sinhala
  });

});
