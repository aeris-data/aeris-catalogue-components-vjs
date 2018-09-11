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
        this.platformSearchCriteria = Selector('aeris-platform-search-criteria');
        this.parameterSearchCriteria = Selector('aeris-parameter-search-criteria');
        this.projectSearchCriteria = Selector('aeris-project-search-criteria');
        this.openInstrumentCriteria = Selector('aeris-instrument-search-criteria .box-heading-buttons i');
        this.openAnalysersInstrumentCriteria = Selector('aeris-thesaurus-item-tree-checkbox-layout[name="Instrument"] div.first-level i.fa-plus-square-o');
        this.openParameterCriteria = Selector('aeris-parameter-search-criteria .box-heading-buttons i');
        this.openProjectCriteria = Selector('aeris-project-search-criteria .box-heading-buttons i');

    	// platform
        this.aircraftPlatformValue = Selector('#PlatformAIRCRAFT');
        this.insituPlatfformValue = Selector('#PlatformIN_SITU_LAND_BASED_PLATFORMS');
        this.groundStationPlatformValue = Selector('#PlatformIN_SITU_LAND_BASED_PLATFORMSGROUND_STATIONS');
        this.raingaugeMSECTest= Selector('aeris-catalog-default-summary[value*="88343406-2d0b-388e-9cf7-61c020170f3d"]');
        // instrument
        this.optdetectorInstrumentValue = Selector('#InstrumentPHOTON_OPTICAL_DETECTORS');
        this.ozoneMonitorsInstrumentValue = Selector('#InstrumentCHEMICAL_METERS_ANALYZERSOZONE_MONITORS');        
        this.verticalProfileIagosTest= Selector('aeris-catalog-default-summary[value*="575882c0-64ce-4648-bb19-00030d5d63af"]');
        // parameter
        this.atmosphericChemistry = Selector("#ParameterATMOSPHERIC_CHEMISTRY");
        this.nitrogenCompoundsTest= Selector('aeris-catalog-default-summary[value*="61e54760-86ba-4b69-804b-06a7793f9104"]');
        //project
        this.groundData = Selector('#ProjectGROUND_DATA');
        this.pm10Test= Selector('aeris-catalog-default-summary[value*="52fcc14c-7c82-36e9-8906-26101dfa90c9"]');
    }
}