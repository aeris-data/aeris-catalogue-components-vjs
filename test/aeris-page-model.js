// see doc http://devexpress.github.io/testcafe/documentation/test-api/
import { Selector } from 'testcafe';

export default class Page {
    constructor () {
        // buttons
    	this.aerisTest = Selector('a[href="/aeris"]');
        this.searchButton = Selector('button[title=Search]');
        this.resetButton = Selector('button[title=Reset]');
        // criteria
        this.openPlatformCriteria = Selector('aeris-platform-search-criteria .box-heading-buttons i');
        this.instrumentSearchCriteria = Selector('aeris-instrument-search-criteria');
        this.openInstrumentCriteria = Selector('aeris-instrument-search-criteria .box-heading-buttons i');
        // specific data values
    	// platform
        this.aircraftPlatformValue = Selector('#PlatformAIRCRAFT');
        this.spacestationCriteria = Selector('#PlatformSPACESTATION');      
        this.cats2Summary= Selector('aeris-catalog-default-summary[value*="21c5fa49-34b9-47b3-9340-521727574da1"]');
        // instrument
        this.optdetectorInstrumentValue = Selector('#InstrumentOPTICAL_DETECTORS');
        this.chemicalmetersInstrumentValue = Selector('#InstrumentCHEMICAL_METERS');        
        this.escompteDummyTest= Selector('aeris-catalog-default-summary[value*="76d9a59d-bfc5-3939-42e7-69dc2a8ff80c"]');
    }
}