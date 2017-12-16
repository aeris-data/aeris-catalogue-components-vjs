import commonEvents from './modules/common-events.js'

export default function listen(store) {

  commonEvents.listen(store);
}
