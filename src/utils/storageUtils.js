var PSS_APP_ACCOUNT = 'PSS-APP-ACCOUNT';
var PSS_APP_TOKEN = 'PSS-APP-TOKEN';
var StorageUtils = (function () {
    function StorageUtils() {
    }
    StorageUtils.getItem = function (itemName) {
        return JSON.parse(localStorage.getItem(itemName));
    };
    StorageUtils.hasToken = function () {
        return !!this.getItem(PSS_APP_TOKEN);
    };
    StorageUtils.getToken = function () {
        if (this.hasToken()) {
            return this.getItem(PSS_APP_TOKEN);
        }
    };
    StorageUtils.setToken = function (token) {
        localStorage.setItem(PSS_APP_TOKEN, JSON.stringify(token));
    };
    StorageUtils.removeToken = function () {
        localStorage.removeItem(PSS_APP_TOKEN);
    };
    StorageUtils.hasAccount = function () {
        return !!this.getItem(PSS_APP_ACCOUNT);
    };
    StorageUtils.getAccount = function () {
        if (this.hasAccount()) {
            return this.getItem(PSS_APP_ACCOUNT);
        }
    };
    StorageUtils.setAccount = function (account) {
        localStorage.setItem(PSS_APP_ACCOUNT, JSON.stringify(account));
    };
    StorageUtils.removeAccount = function () {
        localStorage.removeItem(PSS_APP_ACCOUNT);
    };
    return StorageUtils;
}());
export { StorageUtils };
//# sourceMappingURL=storageUtils.js.map