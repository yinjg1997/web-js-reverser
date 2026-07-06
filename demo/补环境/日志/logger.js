var logger = {
    log: console.log,
    info: function () {
        return this.log.apply(this, arguments);
    }
}