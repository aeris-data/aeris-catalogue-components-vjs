require("exports-loader?!./l.min.js")
import Vue from 'vue'

import AerisCatalogueComponents from './aeris-catalogue-components.js'

const VueCustomElementRecorder = {

  run() {

    ljs.addAliases({
      dep: [
        'https://unpkg.com/vuelayers/lib/style.css',
        'https://unpkg.com/vuelayers',
        'https://cdnjs.cloudflare.com/ajax/libs/jquery.perfect-scrollbar/0.7.0/css/perfect-scrollbar.min.css',
        'https://cdnjs.cloudflare.com/ajax/libs/jquery.perfect-scrollbar/0.7.0/js/perfect-scrollbar.min.js',
        'https://cdnjs.cloudflare.com/ajax/libs/ol3/4.2.0/ol.css',
        'https://cdnjs.cloudflare.com/ajax/libs/prism/1.6.0/themes/prism-okaidia.css',
        'https://cdnjs.cloudflare.com/ajax/libs/ol3/4.2.0/ol-debug.js',
        'https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css',
        'https://cdnjs.cloudflare.com/ajax/libs/document-register-element/1.4.1/document-register-element.js',
        'https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.18.1/moment-with-locales.min.js',
        'https://cdnjs.cloudflare.com/ajax/libs/moment-range/3.0.3/moment-range.min.js',
        'https://cdnjs.cloudflare.com/ajax/libs/prism/1.6.0/prism.min.js',
        'https://cdnjs.cloudflare.com/ajax/libs/prism/1.6.0/components/prism-bash.min.js',
        'https://cdnjs.cloudflare.com/ajax/libs/FileSaver.js/1.3.3/FileSaver.js'
      ]
    })

    ljs.load('dep', function() {

      if (!window.registredAerisElements) {
        window.registredAerisElements = [];
      }

      window.ol = ol;
      var timer;
      var bundleName = "aeris-catalogue-components-vjs";

      function stopTimer() {
        clearInterval(timer);
      }

      function registerComponents() {

        if ((window.registredAerisElements.indexOf("aeris-commons-components-vjs") > -1) && (window.registredAerisElements.indexOf("aeris-metadata-components-vjs") > -1)) {
          console.info("trying to register aeris catalogue components");
          console.info("Début registration des aeris catalogue components");
          console.info("Registred elements at this time: " + window.registredAerisElements);

          for (let component in AerisCatalogueComponents) {
            if (AerisCatalogueComponents[component] && component !== 'install') {
              if (window.registredAerisElements.indexOf(AerisCatalogueComponents[component].name) < 0) {
                let registrable = true;
                if (window.aerisexclusions) {
                  let aux = window.aerisexclusions[bundleName];
                  if (aux) {
                    if (aux.indexOf(AerisCatalogueComponents[component].name) >= 0) {
                      console.log("Aeris - Exclusion of " + AerisCatalogueComponents[component].name);
                      registrable = false;
                    }
                  }
                }
                if (registrable) {
                  console.log("Aeris - Registration of " + AerisCatalogueComponents[component].name);
                  Vue.customElement(AerisCatalogueComponents[component].name, AerisCatalogueComponents[component]);
                  window.registredAerisElements.push(AerisCatalogueComponents[component].name);
                }
              }
            }
          }

          window.registredAerisElements.push('aeris-catalogue-components-vjs');
          stopTimer();
          console.info("aeris catalogue components registration complete");
        }
      }

      timer = setInterval(function() {
        registerComponents();
      }, 1000);
    })
  }
}

export default VueCustomElementRecorder;
