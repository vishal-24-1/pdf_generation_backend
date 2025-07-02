const puppeteer = require("puppeteer");

(async () => {
    const browser = await puppeteer.launch({
        headless: "new",
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();

    await page.goto("https://main.d2tv1dv1yi6ad.amplifyapp.com/report", {
        waitUntil: "networkidle0",
    });

    // 🔁 Wait until the charts/data have finished rendering
    await page.waitForFunction(() => window.__PDF_READY__ === true, {
        timeout: 10000,
    });

    await page.pdf({
        path: "inzighted_report.pdf",
        format: "A4",
        printBackground: true,
    });

    await browser.close();
    console.log("✅ PDF Generated: inzighted_report.pdf");
})();
