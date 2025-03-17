import { test, expect } from '@playwright/test';

// ゲームボードが表示される
test('ゲームボードが表示される', async ({ page }) => {
  await page.goto('/');
  
  // タイトルが表示されていることを確認
  await expect(page.locator('h1')).toHaveText('五目並べ');
  
  // ゲームステータスが表示されていることを確認
  await expect(page.locator('div.text-xl')).toContainText('次のプレイヤー: ●');
  
  // リセットボタンが表示されていることを確認
  await expect(page.getByRole('button', { name: 'リセット' })).toBeVisible();
});

// 石を置いて交互にプレイできる
test('石を置いて交互にプレイできる', async ({ page }) => {
  await page.goto('/');
  
  // 中央付近に黒石を置く
  await page.locator('button[aria-label="交点"]').nth(112).click();
  
  // プレイヤーが白に切り替わることを確認
  await expect(page.locator('div.text-xl')).toContainText('次のプレイヤー: ○');
  
  // 別の場所に白石を置く
  await page.locator('button[aria-label="交点"]').nth(113).click();
  
  // プレイヤーが黒に切り替わることを確認
  await expect(page.locator('div.text-xl')).toContainText('次のプレイヤー: ●');
});

// リセットボタンでゲームをリセットできる
test('リセットボタンでゲームをリセットできる', async ({ page }) => {
  await page.goto('/');
  
  // いくつかの石を置く
  await page.locator('button[aria-label="交点"]').first().click();
  await page.locator('button[aria-label="交点"]').nth(1).click();
  
  // リセットボタンをクリック
  await page.getByRole('button', { name: 'リセット' }).click();
  
  // プレイヤーが黒にリセットされることを確認
  await expect(page.locator('div.text-xl')).toContainText('次のプレイヤー: ●');
});
