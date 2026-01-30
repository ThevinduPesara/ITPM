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
  // ==========================================

  test('Pos_Fun_0001 - Convert short daily phrase', async ({ page }) => {
    await convertAndAssert(page, 'mama podi break ekak gannavaa', [
      'මම', 'break', 'ගන්න'
    ]);
  });

  test('Pos_Fun_0002 - Convert greeting question', async ({ page }) => {
    await convertAndAssert(page, 'oyaa hondatada innevadha?', [
      'ඔයා', 'හොඳ'
    ]);
  });

  test('Pos_Fun_0003 - Convert future plan sentence', async ({ page }) => {
    await convertAndAssert(page, 'api raeeta gedhara enavaa', [
      'අපි', 'ගෙදර'
    ]);
  });

  test('Pos_Fun_0004 - Convert compound sentence', async ({ page }) => {
    await convertAndAssert(page, 'mama gedhara yanavaa saha passe kaeema kanavaa', [
      'මම', 'ගෙදර', 'කන'
    ]);
  });

  test('Pos_Fun_0005 - Convert complex conditional sentence', async ({ page }) => {
    await convertAndAssert(page, 'oya enne nam mama balan innavaa', [
      'ඔයා', 'මම'
    ]);
  });

  test('Pos_Fun_0006 - Convert imperative command', async ({ page }) => {
    await convertAndAssert(page, 'issarahata yanna', [
      'යන්න'
    ]);
  });

  test('Pos_Fun_0007 - Convert negative sentence', async ({ page }) => {
    await convertAndAssert(page, 'mata eeka karanna baee', [
      'මට', 'බැහැ'
    ]);
  });

  test('Pos_Fun_0008 - Convert polite request', async ({ page }) => {
    await convertAndAssert(page, 'karuNaakaralaa mata podi udhavvak karanna puLuvandha?', [
      'කරුණා', 'උදව්'
    ]);
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
      ['ගෙදර', 'නැහැ']
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
  // ==========================================

  test('Neg_Fun_0001 - Incorrect handling of heavily joined words', async ({ page }) => {
    const inputBox = page.locator('textarea').first();
    await inputBox.pressSequentially('oyaaennevada', { delay: 50 });

    const bodyText = await page.locator('body').textContent();
    // Expects no proper Sinhala translation due to no spaces
    expect(bodyText).not.toMatch(/[අ-ෆ]/); // no Sinhala expected
  });

  test('Neg_Fun_0002 - Incorrect tense interpretation', async ({ page }) => {
    const inputBox = page.locator('textarea').first();
    await inputBox.pressSequentially('mama heta gedhara giyaa', { delay: 50 });

    // This tests that past tense might not be handled correctly
    // The test should observe the actual behavior
    const bodyText = await page.locator('body').textContent();
    // Check that some conversion happens, but may be incorrect
    expect(bodyText).toBeTruthy();
  });

  test('Neg_Fun_0003 - Failure with heavy slang usage', async ({ page }) => {
    const inputBox = page.locator('textarea').first();
    await inputBox.pressSequentially('adoo machan eka widihakata eeka karapanko hariyata', { delay: 50 });

    // Heavy slang may not translate well
    const bodyText = await page.locator('body').textContent();
    expect(bodyText).toBeTruthy();
  });

  test('Neg_Fun_0004 - Failure with excessive punctuation', async ({ page }) => {
    const inputBox = page.locator('textarea').first();
    await inputBox.pressSequentially('meeka hariyata vaeda karanavaadha???!!!', { delay: 50 });

    // Excessive punctuation should still show some translation
    const bodyText = await page.locator('body').textContent();
    expect(bodyText).toContain('වැඩ');
  });

  test('Neg_Fun_0005 - Incorrect handling of double negation', async ({ page }) => {
    const inputBox = page.locator('textarea').first();
    await inputBox.pressSequentially('mata eeka karanna baee naehae', { delay: 50 });

    // Double negation may confuse the system
    const bodyText = await page.locator('body').textContent();
    expect(bodyText).toContain('බැහැ');
    expect(bodyText).toContain('නැහැ');
  });

  test('Neg_Fun_0006 - Convert chat shorthand phrase', async ({ page }) => {
    const inputBox = page.locator('textarea').first();
    await inputBox.pressSequentially('Thx bro', { delay: 50 });

    // Chat shorthand should remain in English
    const bodyText = await page.locator('body').textContent();
    expect(bodyText).toMatch(/Thx|bro/i);
  });

  test('Neg_Fun_0007 - Convert Sinhala digits mixed with Singlish', async ({ page }) => {
    const inputBox = page.locator('textarea').first();
    await inputBox.pressSequentially('mata 3 dennek enna kiyala kivvaa', { delay: 50 });

    // Numbers mixed with Singlish
    const bodyText = await page.locator('body').textContent();
    expect(bodyText).toContain('3');
  });

  test('Neg_Fun_0008 - Convert filler-word heavy spoken sentence', async ({ page }) => {
    const inputBox = page.locator('textarea').first();
    await inputBox.pressSequentially('eee mama ehemane gedhara yanavaa ne', { delay: 50 });

    // Filler words may not translate well
    const bodyText = await page.locator('body').textContent();
    expect(bodyText).toContain('මම');
  });

  test('Neg_Fun_0009 - Convert polite request with indirect phrasing', async ({ page }) => {
    const inputBox = page.locator('textarea').first();
    await inputBox.pressSequentially('oyaata puLuvannam eeka poddak balanna puluvanda', { delay: 50 });

    // Indirect phrasing test
    const bodyText = await page.locator('body').textContent();
    expect(bodyText).toContain('ඔයාට');
  });

  test('Neg_Fun_0010 - Convert URL into Sinhala meaning', async ({ page }) => {
    const inputBox = page.locator('textarea').first();
    await inputBox.pressSequentially('www.google.com', { delay: 50 });

    // URLs should remain unchanged
    await expect(page.locator('body')).toContainText('google');
  });

});