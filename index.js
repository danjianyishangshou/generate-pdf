const puppeteer = require('puppeteer');

const generate_pdf = async (contractNumber, token) => {
    try {
        const browser = await puppeteer.launch({
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-dev-shm-usage',
                '--disable-gpu',
                '--headless',
            ],
            headless: false,
            defaultViewport: { width: 1800, height: 900 },
            ignoreHTTPSErrors: true,
        });
        const page = await browser.newPage();

        await page.goto(`https://fx.izihun.com/generatepdf/?contractNumber=${contractNumber}&token=${token}`, { waitUntil: 'networkidle0' });

        // 等待页面中的特定条件达成
        await page.waitForFunction(() => {
            return document.body.getAttribute('data-pdf-generated') === 'true';
        }, { timeout: 30000 }); // 增加超时时间为60秒

        await browser.close();
        return true
    } catch (error) {
        throw error;
    }
};

module.exports = generate_pdf;

