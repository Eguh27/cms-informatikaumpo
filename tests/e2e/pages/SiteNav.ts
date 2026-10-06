import type { Page } from '@playwright/test'

/**
 * Page Object for the site header navigation.
 * All locators are role/name based so styling refactors don't break the suite.
 */
export class SiteNav {
  readonly page: Page

  constructor(page: Page) {
    this.page = page
  }

  get header() {
    return this.page.getByRole('navigation', { name: 'Navigasi utama' })
  }

  submenuToggle(label: string) {
    return this.header.getByRole('button', { name: new RegExp(`submenu ${label}`, 'i') })
  }

  submenu(label: string) {
    return this.header.getByRole('list', { name: `Submenu ${label}` })
  }

  async openSubmenu(label: string) {
    // Open via keyboard (focus + Enter): a real click always hovers first,
    // and hover already opens the menu, so click would toggle it shut.
    const list = this.submenu(label)
    if (await list.isVisible()) return
    await this.submenuToggle(label).focus()
    await this.page.keyboard.press('Enter')
    await list.waitFor({ state: 'visible' })
  }

  async closeSubmenu(label: string) {
    await this.page.keyboard.press('Escape')
    await this.submenu(label).waitFor({ state: 'hidden' })
  }

  get hamburger() {
    return this.page.getByRole('button', { name: /buka menu|tutup menu/i })
  }

  mobileAccordion(label: string) {
    return this.page.getByRole('button', { name: new RegExp(`^${label}$`, 'i') }).first()
  }
}
