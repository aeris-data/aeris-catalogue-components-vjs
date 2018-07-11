// to run the tests install testcafe globaly : npm install -g testcafe
// to run one test file : testcafe chromium test/aeris-test.js / testcafe firefox test/aeris-test.js 
//			(the browser has to be installed on the machine where you run the test)
import Page from './aeris-page-model-fr';

fixture `FirstTest`
    .page `http://localhost:8080/`;

const page = new Page();

test('Aeris catalog test', async t => {
    await t
    .click(page.aerisTest)
    .expect(page.searchButton.exists).ok("search button ok")
    .expect(page.aircraftPlatformValue.exists).ok("aircraft ok")
    .click(page.openPlatformCriteria)
    .click(page.spacestationCriteria)
    .click(page.searchButton)
    .expect(page.cats2Summary.exists).ok("cats level 2 summary ok")
    .click(page.resetButton)
    .expect(page.instrumentSearchCriteria.exists).ok("instrument search criteria ok")
    .expect(page.optdetectorInstrumentValue.exists).ok("optical detector ok")
    .click(page.openInstrumentCriteria)
    .click(page.hygrometersInstrumentValue)
    .click(page.searchButton)
    .expect(page.hygrometersTest.exists).ok("dummy instrument summary ok");
});    