import commonEvents from './modules/common-events.js'
import helpEvents from './modules/help-events.js'
import catalogueEvents from './modules/catalogue-events.js'

export default function listen(store) {

  commonEvents.listen(store);
  helpEvents.listen(store);
  catalogueEvents.listen(store);
}
