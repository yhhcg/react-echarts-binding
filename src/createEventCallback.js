/**
 * Event callback factory
 * By reading and executing callback function from props every time
 * the event callback is called, changes made to event callbacks will
 * be honoured.
 * By contrast, one may cancel an event listener and attach a new listener
 * if props get updated.
 * @param {string} callbackName - Function name on props
 * @param {Object} target - Target component instance
 * @return {Function} - Function to be called as event callback.
 * followed by target component instance,
 * followed by event parameters.
 * instances
 */
export default function(callbackName) {
  return function(...params) {
    const callback = this.props[callbackName];
    if (typeof callback === 'function') {
      callback(this.echartsInstance, ...params);
    }
  };
}
