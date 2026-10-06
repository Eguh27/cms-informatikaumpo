import { test, expect } from '@playwright/test'
import { SiteNav } from './pages/SiteNav'

const BASE = 'http://localhost:3000'

test.describe('Navbar Pendaftaran & Akademik', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(BASE)
    await expect(page.getByRole('navigation', { name: 'Navigasi utama' })).toBeVisible()
  })

  test('dropdown Pendaftaran menampilkan 4 submenu dengan target benar', async ({ page }) => {
    const nav = new SiteNav(page)
    // Hover path: mouse users open without clicking
    await nav.submenuToggle('Pendaftaran').hover()
    await expect(nav.submenu('Pendaftaran')).toBeVisible()

    const menu = nav.submenu('Pendaftaran')
    await expect(menu.getByRole('link', { name: /magang/i })).toHaveAttribute('href', '/pendaftaran/magang')
    await expect(menu.getByRole('link', { name: /kkn/i })).toHaveAttribute('href', 'https://giat.umpo.ac.id/')
    await expect(menu.getByRole('link', { name: /skripsi/i })).toHaveAttribute(
      'href',
      'https://siskrip.simakumpo.com/',
    )
    for (const name of [/kkn/i, /skripsi/i]) {
      const link = menu.getByRole('link', { name })
      await expect(link).toHaveAttribute('target', '_blank')
      await expect(link).toHaveAttribute('rel', 'noopener noreferrer')
    }
    // Organisasi: baris non-navigasi, bukan tautan mati
    await expect(menu.getByText('Organisasi', { exact: true })).toBeVisible()
    await expect(menu.getByRole('link', { name: /^organisasi/i })).toHaveCount(0)
  })

  test('keyboard: Enter membuka, Escape menutup dan fokus kembali', async ({ page }) => {
    const nav = new SiteNav(page)
    const toggle = nav.submenuToggle('Pendaftaran')
    await toggle.focus()
    await page.keyboard.press('Enter')
    await expect(nav.submenu('Pendaftaran')).toBeVisible()
    await page.keyboard.press('Escape')
    await expect(nav.submenu('Pendaftaran')).toBeHidden()
    await expect(toggle).toBeFocused()
  })

  test('keyboard: Tab keluar menu menutup panel', async ({ page }) => {
    const nav = new SiteNav(page)
    await nav.openSubmenu('Pendaftaran')
    // 3 links inside (Magang, KKN, Skripsi — Organisasi is a non-link span);
    // the 4th Tab leaves the menu and must close the panel
    await page.keyboard.press('Tab')
    await page.keyboard.press('Tab')
    await page.keyboard.press('Tab')
    await page.keyboard.press('Tab')
    await expect(nav.submenu('Pendaftaran')).toBeHidden()
  })

  test('dropdown Profil memuat Kontak di dalamnya, tanpa tautan Kontak mandiri', async ({ page }) => {
    const nav = new SiteNav(page)
    await nav.openSubmenu('Profil')

    const menu = nav.submenu('Profil')
    await expect(menu.getByRole('link', { name: /kontak/i })).toHaveAttribute('href', '/kontak')
    await expect(menu.getByRole('link', { name: /visi/i })).toHaveAttribute(
      'href',
      '/profil#visimisi',
    )
    await expect(nav.header.getByRole('link', { name: 'Kontak', exact: true })).toHaveCount(0)
    await expect(nav.header.getByRole('link', { name: 'Profil', exact: true })).toHaveAttribute(
      'href',
      '/profil',
    )
  })

  test('dropdown Akademik memuat Jadwal Kuliah dan induk tetap tautan', async ({ page }) => {
    const nav = new SiteNav(page)
    await nav.openSubmenu('Akademik')

    const menu = nav.submenu('Akademik')
    await expect(menu.getByRole('link', { name: /jadwal kuliah/i })).toHaveAttribute(
      'href',
      '/akademik/jadwal-kuliah',
    )
    await expect(nav.header.getByRole('link', { name: 'Akademik', exact: true })).toHaveAttribute(
      'href',
      '/akademik',
    )

    await menu.getByRole('link', { name: /jadwal kuliah/i }).click()
    await expect(page).toHaveURL(/\/akademik\/jadwal-kuliah/)
    await expect(page.getByRole('heading', { name: /jadwal kuliah/i })).toBeVisible()
  })

  test('halaman Magang memuat alur dan rak berkas tanpa console error', async ({ page }) => {
    const errors: string[] = []
    page.on('pageerror', (e) => errors.push(e.message))
    await page.goto(`${BASE}/pendaftaran/magang`)
    await expect(page.getByRole('heading', { name: /pendaftaran magang/i })).toBeVisible()
    await expect(page.getByText(/semester 6/i).first()).toBeVisible()
    expect(errors).toEqual([])
  })

  test('tidak ada horizontal overflow di 1024 dan 1440', async ({ page }) => {
    for (const width of [1024, 1440]) {
      await page.setViewportSize({ width, height: 900 })
      await page.goto(BASE)
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
      )
      expect(overflow).toBeLessThanOrEqual(0)
    }
  })
})

test.describe('Menu seluler', () => {
  test.use({ viewport: { width: 390, height: 844 } })

  test('akordeon Pendaftaran dan Akademik memuat semua tautan', async ({ page }) => {
    await page.goto(BASE)
    const nav = new SiteNav(page)
    await nav.hamburger.click()
    await expect(page.getByRole('button', { name: /^pendaftaran$/i })).toBeVisible()

    await page.getByRole('button', { name: /^pendaftaran$/i }).click()
    const panel = page.getByRole('list', { name: 'Submenu Pendaftaran' })
    await expect(panel).toBeVisible()
    await expect(panel.getByRole('link', { name: /magang/i })).toHaveAttribute(
      'href',
      '/pendaftaran/magang',
    )
    await expect(panel.getByRole('link', { name: /kkn/i })).toHaveAttribute(
      'href',
      'https://giat.umpo.ac.id/',
    )
    await expect(panel.getByRole('link', { name: /skripsi/i })).toHaveAttribute(
      'href',
      'https://siskrip.simakumpo.com/',
    )

    await page.getByRole('button', { name: /submenu akademik/i }).click()
    const akademik = page.getByRole('list', { name: 'Submenu Akademik' })
    await expect(akademik.getByRole('link', { name: /jadwal kuliah/i })).toHaveAttribute(
      'href',
      '/akademik/jadwal-kuliah',
    )

    await page.getByRole('button', { name: /submenu profil/i }).click()
    const profil = page.getByRole('list', { name: 'Submenu Profil' })
    await expect(profil.getByRole('link', { name: /kontak/i })).toHaveAttribute(
      'href',
      '/kontak',
    )
  })
})
