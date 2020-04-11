import PropTypes from 'prop-types';
// import io from 'socket.io-client';
import dateformat from 'dateformat';
const $ = window.$;
const Swal = window.Swal;

const T = {
    PropTypes,

    sexes: ['male', 'female'],

    randomPassword: length => Math.random().toString(36).slice(-length),

    isDebug: (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'),

    download: (url, fileName) => {
        let link = document.createElement('a');
        link.target = '_blank';
        link.download = fileName;
        link.href = url;
        link.click();
    },

    getCookie: cname => {
        const name = cname + '=';
        const ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i].trimStart();
            if (c.indexOf(name) === 0) {
                try {
                    return JSON.parse(c.substring(name.length, c.length));
                } catch {
                    return {};
                }
            }
        }
        return {};
    },

    setCookie: (cname, cvalue, exdays) => {
        let d = new Date();
        d.setTime(d.getTime() + ((exdays === undefined ? 60 : exdays) * 24 * 60 * 60 * 1000));
        document.cookie = cname + '=' + JSON.stringify(cvalue) + ';expires=' + d.toUTCString() + ';path=/';
    },

    validateEmail: email => (/^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i).test(String(email).toLowerCase()),

    dateToText: (date, format) => dateformat(date, format ? format : 'dd/mm/yyyy HH:MM:ss'),

    numberDisplay: number => number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'),

    NOTIFY_TYPE: {
        DANGER: 'danger',
        SUCCESS: 'success',
        INFO: 'info',
        WARNING: 'warning'
    },
    notify: (message, type) => $.notify({ message }, { type, placement: { from: 'bottom' }, z_index: 2000 }),

    ALERT_TYPE: {
        WARNING: 'warning',
        ERROR: 'error',
        SUCCESS: 'success',
        INFO: 'info',
        QUESTION: 'question'
    },
    alert: (text, type, isShowButton, timer) => {
        let options = { text };
        if (type) {
            if (typeof type == 'boolean') {
                options.showConfirmButton = type;
                options.icon = 'success';
                if (timer) options.timer = timer;
            }
            else if (typeof type == 'number') {
                options.timer = type;
                options.icon = 'success';
            }
            else options.icon = type;
            if (isShowButton !== undefined) {
                if (typeof isShowButton == 'number') {
                    options.timer = options.showConfirmButton;
                    options.showConfirmButton = true;
                }
                else {
                    options.showConfirmButton = isShowButton;
                    if (timer) options.timer = timer;
                }
            }
            else options.showConfirmButton = true;
        }
        else {
            options.icon = 'success';
            options.showConfirmButton = true;
        }
        Swal.fire(options);
    },

    confirm: (title, html, type, isFocusCancel, done) => {
        if (typeof type == 'function') {
            done = type;
            type = 'warning';
            isFocusCancel = false;
        } else if (typeof type == 'boolean') {
            done = isFocusCancel;
            isFocusCancel = type;
            type = 'warning';
        } else if (typeof isFocusCancel == 'function') {
            done = isFocusCancel;
            isFocusCancel = false;
        }
        Swal.fire({ icon: type, title, html, focusCancel: isFocusCancel, showConfirmButton: true, showCancelButton: true, }).then(done);
    },

    dateFormat: { format: 'dd/mm/yyyy hh:ii', autoclose: true, todayBtn: true },

    birthdayFormat: { format: 'dd/mm/yyyy', autoclose: true, todayBtn: true },

    formatDate: str => {
        try {
            let [strDate, strTime] = str.split(' '),
                [date, month, year] = strDate.split('/'),
                [hours, minutes] = strTime ? strTime.split(':') : [0, 0];
            return new Date(year, month - 1, date, hours, minutes);
        } catch (ex) {
            return null;
        }
    },

    get2: x => ('0' + x).slice(-2)
};

['get', 'post', 'put', 'delete'].forEach(method => T[method] = (url, data, success, error) => {
    url = process.env.REACT_APP_API_URL + url + (url.indexOf('?') === -1 ? '?t=' : '&t=') + new Date().getTime()
    if (typeof data === 'function') {
        error = success;
        success = data;
    }
    $.ajax({
        url,
        data,
        dataType: 'json',
        type: method.toUpperCase(),
        success: data => success && success(data),
        error: data => {
            console.error('Ajax (' + method.toUpperCase() + ' => ' + url + ') has error. Error:', data);
            error && error(data.responseJSON)
        }
    })
});

// T.socket = T.debug ? io() : io.connect(T.rootUrl, { secure: true });

// T.socket.on('connect', () => {
//     if (T.connected === 0) {
//         T.connected = true;
//     } else if (T.debug) {
//         window.location.reload();
//     }
// });
// if (T.debug) {
//     T.connected = 0;
//     T.socket.on('reconnect_attempt', attemptNumber => T.connected = -attemptNumber);
//     T.socket.on('debug', type => (type === 'reload') && window.location.reload());
// }

export default T;

/*eslint no-extend-native: ["error", { "exceptions": ["String", "Date", "Array"] }]*/

String.prototype.getText = function () {
    return T.language.parse(this);
};

String.prototype.viText = function () {
    return T.language.parse(this, true).vi;
};

String.prototype.replaceAll = function (search, replacement) {
    return this.replace(new RegExp(search, 'g'), replacement);
};

String.prototype.upFirstChar = function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
};

//Array prototype -----------------------------------------------------------------------------------------------------
Array.prototype.contains = function (...pattern) {
    return pattern.reduce((result, item) => result && this.includes(item), true);
};

Date.prototype.getText = function () {
    return T.language.getMonth()[this.getMonth()] + ' ' + T.get2(this.getDate()) + ', ' + this.getFullYear() + ' ' + T.get2(this.getHours()) + ':' + T.get2(this.getMinutes());
};
Date.prototype.getDateText = function () {
    return T.language.getMonth()[this.getMonth()] + ' ' + T.get2(this.getDate()) + ', ' + this.getFullYear();
};
Date.prototype.strNgay = function () {
    return T.get2(this.getDate()) + '/' + T.get2(this.getMonth()) + '/' + this.getFullYear();
};
Date.prototype.getTimeText = function () {
    return T.get2(this.getHours()) + ':' + T.get2(this.getMinutes());
};
Date.prototype.getShortText = function () {
    return this.getFullYear() + '/' + T.get2(this.getMonth() + 1) + '/' + T.get2(this.getDate()) + ' ' + T.get2(this.getHours()) + ':' + T.get2(this.getMinutes());
};
Date.prototype.ddmmyyyy = function () {
    return this.getDate() ? (T.get2(this.getDate()) + '/' + T.get2(this.getMonth() + 1) + '/' + this.getFullYear()) : '';
};
Date.prototype.mmyyyy = function () {
    return this.getDate() ? (T.get2(this.getMonth() + 1) + '/' + this.getFullYear()) : '';
};