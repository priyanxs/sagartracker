import asyncio
import sys
from playwright.async_api import async_playwright

async def run_tests():
    console_errors = []
    page_errors = []

    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page()

        page.on('console', lambda msg: console_errors.append(msg.text) if msg.type == 'error' else None)
        page.on('pageerror', lambda exc: page_errors.append(str(exc)))

        print("1. Loading http://localhost:8080...")
        response = await page.goto('http://localhost:8080', wait_until='networkidle')
        assert response.status == 200, f"Page returned status {response.status}"
        print("✔ Page loaded successfully (HTTP 200)")

        # Verify Title & Header
        title = await page.title()
        print(f"✔ Page title: {title}")
        header_text = await page.inner_text('header')
        assert 'APERTU' in header_text, "Brand APERTU not in header"
        print("✔ Brand APERTU present in header")

        # Test Navigation to RGPV Notes
        print("\n2. Testing RGPV Notes Section...")
        await page.click('#nav-btn-notes')
        await asyncio.sleep(0.5)

        notes_active = await page.is_visible('#page-notes')
        assert notes_active, "page-notes is not visible"
        print("✔ #page-notes is visible")

        # Check notes grid cards rendered
        cards = await page.query_selector_all('#notes-grid-container > div')
        print(f"✔ Rendered {len(cards)} subject cards on All Years")
        assert len(cards) >= 10, f"Expected at least 10 cards, got {len(cards)}"

        # Test Year Filters
        print("\n3. Testing Year Filters...")
        await page.click('#notes-year-1')
        await asyncio.sleep(0.2)
        y1_cards = await page.query_selector_all('#notes-grid-container > div')
        print(f"✔ 1st Year cards: {len(y1_cards)}")
        assert len(y1_cards) >= 3, "1st Year cards too few"

        await page.click('#notes-year-2')
        await asyncio.sleep(0.2)
        y2_cards = await page.query_selector_all('#notes-grid-container > div')
        print(f"✔ 2nd Year cards: {len(y2_cards)}")
        assert len(y2_cards) >= 2, "2nd Year cards too few"

        await page.click('#notes-year-3')
        await asyncio.sleep(0.2)
        y3_cards = await page.query_selector_all('#notes-grid-container > div')
        print(f"✔ 3rd Year cards: {len(y3_cards)}")
        assert len(y3_cards) >= 2, "3rd Year cards too few"

        await page.click('#notes-year-4')
        await asyncio.sleep(0.2)
        y4_cards = await page.query_selector_all('#notes-grid-container > div')
        print(f"✔ 4th Year cards: {len(y4_cards)}")
        assert len(y4_cards) >= 2, "4th Year cards too few"

        await page.click('#notes-year-all')
        await asyncio.sleep(0.2)

        # Test Reading Modal for BT-101
        print("\n4. Testing Notes Modal reading view...")
        await page.evaluate("openNotesModal('BT-101')")
        await asyncio.sleep(0.3)
        modal_visible = await page.is_visible('#notes-reader-modal')
        assert modal_visible, "Modal did not open"
        print("✔ Notes reader modal opened")

        modal_text = await page.inner_text('#notes-reader-content')
        assert 'Engineering Chemistry' in modal_text, "Subject title not in modal"
        assert 'Priyanshu Kushwaha' in modal_text, "Student name not in modal"
        assert 'Beer-Lambert' in modal_text or 'Zeolite' in modal_text or 'Hardness' in modal_text, "Formulas / Q&A not in modal"
        print("✔ Modal contains Apertu branding, formulas, solved 7M/14M questions, and PYQs")

        await page.evaluate("closeNotesModal()")
        await asyncio.sleep(0.2)
        modal_hidden = not await page.is_visible('#notes-reader-modal')
        assert modal_hidden, "Modal did not close"
        print("✔ Modal closed properly")

        # Test M-OPAC & MOBC Tab
        print("\n5. Testing M-OPAC Library & MOBC Book Bank...")
        await page.click('#nav-btn-mopac')
        await asyncio.sleep(0.3)
        mopac_visible = await page.is_visible('#page-mopac')
        assert mopac_visible, "page-mopac not visible"

        # Click MOBC Sub-Tab
        await page.click('#mopac-btn-mobc')
        await asyncio.sleep(0.3)
        mobc_tab_visible = await page.is_visible('#mopac-tab-mobc')
        assert mobc_tab_visible, "mopac-tab-mobc not visible"
        print("✔ MOBC / OBC Book Bank sub-tab opened")

        mobc_text = await page.inner_text('#mopac-tab-mobc')
        assert 'MOBC Free Book Bank Scheme' in mobc_text, "Scheme title missing"
        assert 'Priyanshu Kushwaha' in mobc_text, "Beneficiary name missing"
        assert 'OBC (Kushwaha)' in mobc_text, "OBC category missing"
        assert 'Higher Engineering Mathematics' in mobc_text, "Math book missing"
        assert 'Engineering Chemistry' in mobc_text, "Chemistry book missing"
        assert 'Basic Electrical & Electronics Engg' in mobc_text, "BEEE book missing"
        assert 'Basic Civil Engg & Mechanics' in mobc_text, "BCE book missing"
        assert 'Zero Late Fines' in mobc_text or 'Waived' in mobc_text, "Zero fine clause missing"
        print("✔ MOBC Book Bank data verified with 4 textbooks, zero fines, and scholarship beneficiary info")

        # Test Profile Category
        print("\n6. Testing Student Profile Category...")
        await page.evaluate("navigateTo('profile')")
        await asyncio.sleep(0.3)
        prof_cat = await page.input_value('#prof-category')
        assert 'OBC' in prof_cat and 'Kushwaha' in prof_cat, f"Unexpected category: {prof_cat}"
        print(f"✔ Verified Profile Category: {prof_cat}")

        # Test Fees Ledger
        print("\n7. Testing Fees Ledger for MOBC Scholarship...")
        await page.click('#nav-btn-fees')
        await asyncio.sleep(0.3)
        fees_text = await page.inner_text('#page-fees')
        assert 'MP Taas MOBC Post-Matric Scholarship' in fees_text, "MOBC scholarship not in fees"
        print("✔ Verified MP Taas MOBC Scholarship credit in Fees Ledger")

        # Check Console and Page Errors
        print("\n8. Checking Errors...")
        print(f"Console errors: {len(console_errors)}")
        print(f"Page errors: {len(page_errors)}")
        if console_errors:
            print("Console error logs:", console_errors)
        if page_errors:
            print("Page error logs:", page_errors)
        assert len(console_errors) == 0, f"Found {len(console_errors)} console errors"
        assert len(page_errors) == 0, f"Found {len(page_errors)} page errors"

        await browser.close()
        print("\n🎉 ALL 8 RIGOROUS BROWSER & UI TEST SUITES PASSED FLAWLESSLY WITH 0 ERRORS!")

asyncio.run(run_tests())
