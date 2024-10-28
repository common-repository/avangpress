(function() {
    if (!window.avangpress) {
        window.avangpress = {
            listeners: [],
            forms: {
                on: function(event, callback) {
                    window.avangpress.listeners.push({
                        event: event,
                        callback: callback
                    });
                }
            }
        }
    }
})();