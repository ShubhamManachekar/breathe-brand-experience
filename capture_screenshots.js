import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

const PORT = 8080;
const BASE_URL = `http://192.168.1.60:${PORT}`;
const OUTPUT_DIR = path.join(process.cwd(), 'figma-wireframes');

const routes = [
    { name: 'shop-home', path: '/shop' },
    { name: 'shop-products', path: '/shop/products' },
    { name: 'shop-aromas', path: '/shop/aromas' },
    { name: 'shop-cart', path: '/shop/cart' },
    { name: 'shop-checkout', path: '/shop/checkout' },
    { name: 'shop-contact', path: '/shop/contact' },
    { name: 'shop-login', path: '/shop/login' },
    { name: 'shop-dashboard', path: '/shop/dashboard' },

    { name: 'business-home', path: '/business' },
    { name: 'business-why-scent-marketing', path: '/business/why-scent-marketing' },
    { name: 'business-solutions', path: '/business/solutions' },
    { name: 'business-hospitality', path: '/business/solutions/hospitality' },
    { name: 'business-retail', path: '/business/solutions/retail' },
    { name: 'business-corporate', path: '/business/solutions/corporate' },
    { name: 'business-wellness', path: '/business/solutions/wellness' },
    { name: 'business-products', path: '/business/products' },
    { name: 'business-aromas', path: '/business/aromas' },
    { name: 'business-contact', path: '/business/contact' },
    { name: 'business-login', path: '/business/login' },
    { name: 'business-dashboard', path: '/business/dashboard' },

    { name: 'about-us', path: '/about-us' }
];

const viewports = [
    { name: 'desktop', width: 1920, height: 1080 },
    { name: 'mobile', width: 390, height: 844, isMobile: true }
];

const themes = ['dark', 'light'];

async function autoScroll(page) {
    await page.evaluate(async () => {
        await new Promise((resolve) => {
            let totalHeight = 0;
            const distance = 100;
            const timer = setInterval(() => {
                const scrollHeight = document.body.scrollHeight;
                window.scrollBy(0, distance);
                totalHeight += distance;

                if (totalHeight >= scrollHeight - window.innerHeight) {
                    clearInterval(timer);
                    resolve();
                }
            }, 50); // Speed of scroll
        });
    });
}

async function capture() {
    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR);
    } else {
        // Optional: clean up the directory before running
        // fs.rmSync(OUTPUT_DIR, { recursive: true, force: true });
        // fs.mkdirSync(OUTPUT_DIR);
    }

    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();

    for (const route of routes) {
        for (const vp of viewports) {
            for (const theme of themes) {
                await page.setViewport({ width: vp.width, height: vp.height, isMobile: vp.isMobile || false });
                const url = `${BASE_URL}${route.path}`;
                console.log(`Capturing ${theme} mode on ${vp.name} for: ${url}`);

                try {
                    // Navigate to page and wait for no network connections
                    await page.goto(url, { waitUntil: 'networkidle0', timeout: 60000 });

                    // Force apply Theme using Shadcn standard vite-ui-theme and tailwind 'dark' class
                    await page.evaluate((theme) => {
                        localStorage.setItem('vite-ui-theme', theme);
                        localStorage.setItem('theme', theme);

                        if (theme === 'dark') {
                            document.documentElement.classList.add('dark');
                            document.documentElement.classList.remove('light');
                        } else {
                            document.documentElement.classList.add('light');
                            document.documentElement.classList.remove('dark');
                        }
                    }, theme);

                    // Wait for themes and basic animations to settle
                    await new Promise(r => setTimeout(r, 1000));

                    // Auto scroll to bottom to trigger lazy loading features and Framer Motion effects
                    await autoScroll(page);

                    // Scroll back to the top seamlessly
                    await page.evaluate(() => window.scrollTo(0, 0));

                    // Give it a final second to settle positions
                    await new Promise(r => setTimeout(r, 1000));

                    const filename = path.join(OUTPUT_DIR, `${route.name}-${vp.name}-${theme}.png`);
                    await page.screenshot({ path: filename, fullPage: true });
                    console.log(`Saved ${filename}`);

                } catch (e) {
                    console.error(`Failed to capture ${route.name} ${vp.name} ${theme}:`, e.message);
                }
            }
        }
    }

    await browser.close();
    console.log('Capture complete. All screenshots saved to', OUTPUT_DIR);
}

capture();
