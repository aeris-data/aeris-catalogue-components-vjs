// to run the tests install testcafe globaly : npm install -g testcafe
// to run one test file : testcafe chromium test/aeris-test.js --selector-timeout 50000 / testcafe firefox test/aeris-test.js --selector-timeout 50000
//			(the browser has to be installed on the machine where you run the test)
import Page from './aeris-page-model-en';

fixture `FirstTest`
    .page `http://localhost:8080/`;

const page = new Page();

test('Aeris catalog test', async t => {
    await t
    .click(page.aerisTest)
    .expect(page.searchButton.exists).ok("search button ok")
    .expect(page.instrumentSearchCriteria.exists).ok("instrument search criteria ok")
    .expect(page.platformSearchCriteria.exists).ok("platform search criteria ok")
    .expect(page.parameterSearchCriteria.exists).ok("parameter search criteria ok")
    .expect(page.projectSearchCriteria.exists).ok("project search criteria ok")
});    

test('Aeris instrument test', async t => {
    await t
    .click(page.aerisTest)
    .expect(page.searchButton.exists).ok("search button ok")
    .expect(page.instrumentSearchCriteria.exists).ok("instrument search criteria ok")
    .expect(page.optdetectorInstrumentValue.exists).ok("optical detector ok")
    .click(page.openInstrumentCriteria)
    .click(page.openAnalysersInstrumentCriteria)
    .click(page.ozoneMonitorsInstrumentValue)
    .click(page.searchButton)
    .expect(page.verticalProfileIagosTest.exists).ok("instrument summary ok");
});    

test('Aeris platform test', async t => {
   await t
   .click(page.aerisTest)
   .click(page.openPlatformCriteria)
   .click(page.insituPlatfformValue)
   .expect(page.groundStationPlatformValue.exists).ok("asos value ok")
   .click(page.searchButton)
   .expect(page.raingaugeMSECTest.exists).ok("platform summary found")
});

test('Aeris parameter test', async t => {
   await t
   .click(page.aerisTest)
   .click(page.openParameterCriteria)
   .expect(page.atmosphericChemistry.exists).ok("atmospheric chemistry value ok")
   .click(page.atmosphericChemistry)
   .click(page.searchButton)
   .expect(page.nitrogenCompoundsTest.exists).ok("parameter summary found")
});

test('Aeris project test', async t => {
    await t
    .click(page.aerisTest)
    .click(page.openProjectCriteria)
    .expect(page.groundData.exists).ok("ground data value ok")
    .click(page.groundData)
    .click(page.searchButton)
    .expect(page.pm10Test.exists).ok("project summary found")
})