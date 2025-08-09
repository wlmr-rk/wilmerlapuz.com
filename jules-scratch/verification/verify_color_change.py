from playwright.sync_api import sync_playwright, expect

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    page = browser.new_page()
    page.goto("http://localhost:3000")

    # 1. Take a screenshot of the Overview tab
    stats_section = page.locator("#stats")
    expect(stats_section).to_be_visible()
    stats_section.scroll_into_view_if_needed()

    # Check that the spotify section is not there
    spotify_section = page.locator("text=Now Playing")
    expect(spotify_section).not_to_be_visible()

    page.screenshot(path="jules-scratch/verification/overview_red.png")

    # 2. Click on the Coding tab and take a screenshot
    coding_tab = page.get_by_role("button", name="Coding")
    coding_tab.click()
    expect(page.locator("text=6-Month Trend")).to_be_visible()
    page.screenshot(path="jules-scratch/verification/coding_red.png")

    # 3. Click on the Fitness tab and take a screenshot
    fitness_tab = page.get_by_role("button", name="Fitness")
    fitness_tab.click()
    expect(page.locator("text=Monthly Progress")).to_be_visible()
    page.screenshot(path="jules-scratch/verification/fitness_red.png")

    # 4. Click on the Learning tab and take a screenshot
    learning_tab = page.get_by_role("button", name="Learning")
    learning_tab.click()
    expect(page.locator("text=Card Types")).to_be_visible()
    page.screenshot(path="jules-scratch/verification/learning_red.png")

    browser.close()

with sync_playwright() as playwright:
    run(playwright)
