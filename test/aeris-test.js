// to run the tests install testcafe globaly : npm install -g testcafe
// to run one test file : testcafe chromium test/aeris-test.js --selector-timeout 500000 / testcafe firefox test/aeris-test.js --selector-timeout 500000
//			(the browser has to be installed on the machine where you run the test)
import Page from './aeris-page-model-fr';

fixture `FirstTest`
    .page `http://localhost:8080/`;

const page = new Page();

test('Aeris catalog test', async t => {
    await t
    .click(page.aerisTest)
    .expect(page.searchButton.exists).ok("search button ok")
    .expect(page.instrumentSearchCriteria.exists).ok("instrument search criteria ok")
    .expect(page.optdetectorInstrumentValue.exists).ok("optical detector ok")
});    

test('Aeris instrument test', async t => {
    await t
    .click(page.aerisTest)
    .expect(page.searchButton.exists).ok("search button ok")
    .expect(page.instrumentSearchCriteria.exists).ok("instrument search criteria ok")
    .expect(page.optdetectorInstrumentValue.exists).ok("optical detector ok")
    .click(page.openInstrumentCriteria)
    .click(page.hygrometersInstrumentValue)
    .click(page.searchButton)
    .expect(page.hygrometersTest.exists).ok("dummy instrument summary ok");
});    

test('Aeris platform test', async t => {
   await t
   .click(page.aerisTest)
   .click(page.openPlatformCriteria)
   .click(page.insituPlatfformValue)
   .expect(page.asosPlatformValue.exists).ok("asos value ok")
   .click(page.searchButton)
   .expect(page.asosTest.exists).ok("dumb platform summary found")
});

test('Aeris parameter test', async t => {
   await t
   .click(page.aerisTest)
   .click(page.openParameterCriteria)
   .expect(page.atmosphericChemistry.exists).ok("atmospheric chemistry value ok")
   .click(page.atmosphericChemistry)
   .click(page.searchButton)
   .expect(page.nitrogenCompoundsTest.exists).ok("dumb parameter summary found")
});