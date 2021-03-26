// export const takeScreenshot =
//     functions.https.onRequest(takeScreenShotOnRequest);
//
// async function takeScreenShotOnRequest(request, response) {
//     try {
//         const imageBuffer = await generateScreenShot();
//         await saveScreenShot(imageBuffer);
//     } catch (err) {
//         console.error(err);
//     }
// }
// function generateScreenShot() {
//     return new Promise (async (resolve, reject) => {
//         try {
//             const browser =
//                 await puppeteer.launch({args: ['--no-sandbox']});
//
//             const page = await browser.newPage();
//
//             // Screenshot size
//             await page.setViewport({width: 1024, height: 576});
//
//             // Go to your website
//             await page.goto('https://deckdeckgo.com');
//
//             // Disable service workers
//             await (page as any)._client
//                 .send('ServiceWorker.enable');
//             await (page as any)._client
//                 .send('ServiceWorker.stopAllWorkers');
//
//             // Wait for a particular components to be loaded
//             await page
//                 .waitForFunction('document.querySelector("deckgo-deck  > *")');
//
//             // Take the screenshot
//             const imageBuffer = await page.screenshot();
//
//             await browser.close();
//             // Replace with the same code as in previous chapter
//             resolve();
//         } catch (err) {
//             reject(err);
//         }
//     });
// }
//
// function saveScreenShot(imageBuffer) {
//     return new (async (resolve, reject) => {
//         if (!imageBuffer || imageBuffer === '') {
//             reject('No screenshot');
//             return;
//         }
//
//         try {
//             // We get the instance of our default bucket
//             const bucket = admin.storage().bucket();
//
//             // Create a file object
//             const file = bucket.file(`/screenshots/deckdeckgo.png`);
//
//             // Save the image
//             await file.save(imageBuffer);
//
//             resolve();
//         } catch (err) {
//             reject(err);
//         }
//     });
// }
//
//

