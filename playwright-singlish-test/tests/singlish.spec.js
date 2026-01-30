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
  // 2. POSITIVE FUNCTIONAL SCENARIOS
  // ==========================================

  test('Pos_Fun_0001 - Simple Sentence', async ({ page }) => {
    await convertAndAssert(page, 'mama podi break ekak gannavaa', [
      'මම', 'break', 'ගන්න'
    ]);
  });

  test('Pos_Fun_0002 - Question Sentence', async ({ page }) => {
    await convertAndAssert(page, 'oyaa hondatada innevadha?', [
      'ඔයා', 'හොඳ'
    ]);
  });

  test('Pos_Fun_0003 - Compound Sentence', async ({ page }) => {
    await convertAndAssert(page, 'api raeeta gedhara enavaa', [
      'අපි', 'ගෙදර'
    ]);
  });

  test('Pos_Fun_0004 - Connector Usage', async ({ page }) => {
    await convertAndAssert(page, 'mama gedhara yanavaa saha passe kaeema kanavaa', [
      'මම', 'ගෙදර', 'කන'
    ]);
  });

  test('Pos_Fun_0005 - Conditional Sentence', async ({ page }) => {
    await convertAndAssert(page, 'oya enne nam mama balan innavaa', [
      'ඔයා', 'මම'
    ]);
  });

  test('Pos_Fun_0006 - Imperative', async ({ page }) => {
    await convertAndAssert(page, 'issarahata yanna', [
      'යන්න'
    ]);
  });

  test('Pos_Fun_0007 - Negative Form', async ({ page }) => {
    await convertAndAssert(page, 'mata eeka karanna baee', [
      'මට', 'බැහැ'
    ]);
  });

  test('Pos_Fun_0008 - Polite Request', async ({ page }) => {
    await convertAndAssert(page, 'karunakarala mata podi udhavvak karanna puluvandha', [
      'කරුණා', 'උදව්'
    ]);
  });

  test('Pos_Fun_0009 - Slang Command', async ({ page }) => {
    await convertAndAssert(page, 'ehema karapan', [
      'කර'
    ]);
  });

  test('Pos_Fun_0010 - Emotion Expression', async ({ page }) => {
    await convertAndAssert(page, 'mata baya hithenavaa', [
      'බය'
    ]);
  });

  test('Pos_Fun_0011 - Present Tense', async ({ page }) => {
    await convertAndAssert(page, 'hariyata vaeda karanavaa', [
      'වැඩ'
    ]);
  });

  test('Pos_Fun_0012 - Mixed English + Sinhala', async ({ page }) => {
    await convertAndAssert(
      page,
      'mama adha office yanna kalin email ekak check karalaa Zoom meeting ekata ready venavaa',
      ['මම', 'office', 'email', 'meeting']
    );
  });

  test('Pos_Fun_0013 - Future Tense', async ({ page }) => {
    await convertAndAssert(page, 'api passe kathaa karamu', [
      'අපි', 'කතා'
    ]);
  });

  test('Pos_Fun_0014 - Negation', async ({ page }) => {
    await convertAndAssert(page, 'api heta ennee naehae', [
      'නැහැ'
    ]);
  });

  test('Pos_Fun_0015 - Request with Condition', async ({ page }) => {
    await convertAndAssert(
      page,
      'puluvannam magee documents tika attach karalaa email ekak evanna',
      ['documents', 'email']
    );
  });

  test('Pos_Fun_0016 - Proper Nouns', async ({ page }) => {
    await convertAndAssert(page, 'api Kandy valata yamu', [
      'Kandy'
    ]);
  });

  test('Pos_Fun_0017 - Numbers & Currency', async ({ page }) => {
    await convertAndAssert(page, 'mata Rs. 5000 gewanna thiyenavaa', [
      'Rs.', '5000'
    ]);
  });

  test('Pos_Fun_0018 - Contrast Sentence', async ({ page }) => {
    await convertAndAssert(
      page,
      'mama gedhara yanavaa habaeeyi vahina nisaa dhaenma yannee naehae',
      ['ගෙදර', 'නැහැ']
    );
  });

  test('Pos_Fun_0019 - Official Terms', async ({ page }) => {
    await convertAndAssert(
      page,
      'mata OTP eka enna thiyenavaa saha NIC eka office ekata genna oonee',
      ['OTP', 'NIC']
    );
  });

  test('Pos_Fun_0020 - Informal Question', async ({ page }) => {
    await convertAndAssert(
      page,
      'meeka hariyata vaeda karanavaadha?',
      ['වැඩ']
    );
  });

  test('Pos_Fun_0021 - Date & Time', async ({ page }) => {
    await convertAndAssert(
      page,
      'adha 7.30 AM venakota Rs. 5343 gewalaa report eka submit karanna oonee',
      ['AM', 'Rs.', 'report']
    );
  });

  test('Pos_Fun_0022 - Spacing Robustness', async ({ page }) => {
    await convertAndAssert(
      page,
      'mama gedhara   yanavaa.oyaa enavadha',
      ['මම', 'ගෙදර']
    );
  });

  test('Pos_Fun_0023 - Long Paragraph', async ({ page }) => {
    await convertAndAssert(
      page,
      'dhitvaa suLi kuNaatuva samaGa aethi vuu gQQvathura',
      ['ගංවතුර']
    );
  });

  test('Pos_Fun_0024 - Punctuation Handling', async ({ page }) => {
    await convertAndAssert(
      page,
      'ela machan! dhaen ithin monavadha karanne?',
      ['මචන්']
    );
  });

  // ==========================================
  // 3. NEGATIVE / ROBUSTNESS SCENARIOS
  // ==========================================

  test('Neg_Fun_0001 - No Spaces', async ({ page }) => {
    const inputBox = page.locator('textarea').first();
    await inputBox.pressSequentially('oyaaennevada', { delay: 50 });

    const bodyText = await page.locator('body').textContent();
    expect(bodyText).not.toMatch(/[අ-ෆ]/); // no Sinhala expected
  });

  test('Neg_Fun_0002 - Heavy Abbreviation', async ({ page }) => {
    const inputBox = page.locator('textarea').first();
    await inputBox.pressSequentially('u ok bro', { delay: 50 });

    const bodyText = await page.locator('body').textContent();
    expect(bodyText).toMatch(/[a-zA-Z]/);
  });

  test('Neg_Fun_0003 - URL Input', async ({ page }) => {
    const inputBox = page.locator('textarea').first();
    await inputBox.pressSequentially('www.google.com', { delay: 50 });

    await expect(page.locator('body')).toContainText('google');
  });

});
