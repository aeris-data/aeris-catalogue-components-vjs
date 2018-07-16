// see doc http://devexpress.github.io/testcafe/documentation/test-api/
import { Selector } from 'testcafe';

export default class Page {
    constructor () {
        // buttons
    	this.aerisTest = Selector('a[href="/aeris"]');
        this.searchButton = Selector('button[title=Chercher]');
        this.resetButton = Selector('button[title=Réinitialiser]');
        // criteria
        this.openPlatformCriteria = Selector('aeris-platform-search-criteria .box-heading-buttons i');
        this.instrumentSearchCriteria = Selector('aeris-instrument-search-criteria');
        this.openInstrumentCriteria = Selector('aeris-instrument-search-criteria .box-heading-buttons i');
        // specific data values
    	// platform
        this.aircraftPlatformValue = Selector('#PlatformAIRCRAFT');
        this.insituPlatfformValue = Selector('#PlatformIN_SITU_LAND_BASED_PLATFORMS');
        this.asosPlatformValue = Selector('#PlatformIN_SITU_LAND_BASED_PLATFORMSASOS');
        this.cats2Summary= Selector('aeris-catalog-default-summary[value*="21c5fa49-34b9-47b3-9340-521727574da1"]');
        this.asosTest= Selector('aeris-catalog-default-summary[value*="marinaplatform"]');
        // instrument
        this.optdetectorInstrumentValue = Selector('#InstrumentOPTICAL_DETECTORS');
        this.hygrometersInstrumentValue = Selector('#InstrumentTEMP_HUM_SENSORS');        
        this.hygrometersTest= Selector('aeris-catalog-default-summary[value*="61e54760-86ba-4b69-804b-06a7793f9104"]');
    }
}