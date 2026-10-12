const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });

  // Click Arène des QCMs
  await page.click('button:has-text("Arène des QCMs")');
  await page.waitForTimeout(600);
  await page.screenshot({ path: 'C:/Users/hp/.gemini/antigravity/brain/db98719a-8309-4d01-9c63-8f835b7ba35a/JPA_ACADEMY_QUIZ.png', fullPage: true });

  // Click Dojo des Mini-Jeux
  await page.click('button:has-text("Dojo des Mini-Jeux")');
  await page.waitForTimeout(600);
  await page.screenshot({ path: 'C:/Users/hp/.gemini/antigravity/brain/db98719a-8309-4d01-9c63-8f835b7ba35a/JPA_ACADEMY_GAMES.png', fullPage: true });

  console.log('Screenshots captured successfully!');
  await browser.close();
})();
