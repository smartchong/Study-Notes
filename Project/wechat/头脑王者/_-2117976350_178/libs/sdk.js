function e(e, n) {
    if (!(e instanceof n)) throw new TypeError("Cannot call a class as a function");
}

var n = function() {
    function e(e, n) {
        for (var t = 0; t < n.length; t++) {
            var o = n[t];
            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), 
            Object.defineProperty(e, o.key, o);
        }
    }
    return function(n, t, o) {
        return t && e(n.prototype, t), o && e(n, o), n;
    };
}(), t = (require("../base/util.js"), {});

t.NetURL = {
    Dev: {
        HOST: "https://wxmini-test.hortorgames.com",
        Log_HOST: "https://wxmini-test.hortorgames.com",
        Serve_HOST: "https://platform-test.hortorgames.com"
    },
    Test: {
        HOST: "https://wxmini-test.hortorgames.com",
        Log_HOST: "https://wxmini-test.hortorgames.com",
        Serve_HOST: "https://platform-test.hortorgames.com"
    },
    Prod: {
        HOST: "https://wxmini.hortorgames.com",
        Log_HOST: "https://wxmini-log.hortorgames.com",
        Serve_HOST: "https://platform.hortorgames.com"
    }
}, t.Version = "0.1.6", t.MessageHead = {
    Login: "/mini/api/v1/code",
    SetUserInfo: "/mini/api/v1/userinfo",
    ShareInfo: "/mini/api/v1/shareinfo",
    Log: "/mini/api/v1/log",
    CreateWXOrder: "/mini/api/v1/pay/miniprogram",
    GetOrderInfo: "/mini/api/v1/pay/orderInfo",
    IpCheck: "/ipregion/api/v1/blockstatus"
}, t.Errors = {
    NetWorkErr: {
        errCode: 1e3,
        errMsg: "网络错误"
    },
    UserInfoErr: {
        errCode: 1e3,
        errMsg: "获取用户信息失败"
    },
    PayCancel: {
        errCode: 1002,
        errMsg: "支付取消"
    },
    PayFail: {
        errCode: 1003,
        errMsg: "支付失败"
    },
    WXCodeErr: {
        errCode: 1001,
        errMsg: "微信Code获取失败"
    },
    WXSessionFail: {
        errCode: 1004,
        errMsg: "微信session获取失败"
    },
    WXGetShareInfoFail: {
        errCode: 1005,
        errMsg: "获取分享数据失败"
    }
}, t.StorageKeys = {
    UserInfo: "__miniSDK_User_Info",
    RunMode: "__miniSDK_Run_Mode",
    SaveTime: "__miniSDK_Save_Time",
    LastLogReportTime: "__miniSDK_Last_Log_Report_Time",
    LastLogReportStr: "__miniSDK_Last_Log_Report_Str"
}, t.LogType = {
    Scene: 1,
    Share: 2,
    Login: 3,
    Channel: 4,
    Signup: 5,
    Flag: 6,
    Err: 7,
    OrderPaySuccess: 9,
    AuthFailed: 10,
    ShareShowCount: 11,
    ShareSuccessCount: 12
};

var o = function() {
    function o() {
        e(this, o);
    }
    return n(o, null, [ {
        key: "showLoading",
        value: function(e) {
            !this.loading && wx.showLoading && (this.loading = !0, wx.showLoading({
                title: e,
                mask: !0
            }));
        }
    }, {
        key: "hideLoading",
        value: function(e) {
            this.loading = !1, wx.showLoading && wx.hideLoading();
        }
    }, {
        key: "assign",
        value: function(e, n) {
            if (Object.assign) return Object.assign(e, n);
            for (var t in n) e[t] = n[t];
            return e;
        }
    }, {
        key: "jsonToQuery",
        value: function(e, n) {
            if (!e) return "";
            var t = [];
            for (var o in e) {
                var s = n ? encodeURIComponent(e[o]) : e[o];
                t.push(o + "=" + s);
            }
            return t.join("&");
        }
    }, {
        key: "queryToJson",
        value: function(e) {
            var n = {};
            if (!e) return n;
            var t = decodeURIComponent(e).split("&");
            for (var o in t) {
                var s = t[o].split("=");
                n[s[0]] = s[1];
            }
            return n;
        }
    }, {
        key: "resetBaseDef",
        value: function(e, n) {
            e = e || {}, n = n || {};
            for (var t in n) e[t] = void 0 !== e[t] ? e[t] : n[t];
            return e;
        }
    }, {
        key: "getWXErrInfo",
        value: function(e) {
            return (e && e.errMsg ? e.errMsg.split(" ") : []).slice(1).join(" ");
        }
    }, {
        key: "utf8_decode",
        value: function(e) {
            for (var n = "", t = 0, o = 0, s = 0, i = 0; t < e.length; ) (o = e.charCodeAt(t)) < 128 ? (n += String.fromCharCode(o), 
            t++) : o > 191 && o < 224 ? (s = e.charCodeAt(t + 1), n += String.fromCharCode((31 & o) << 6 | 63 & s), 
            t += 2) : (s = e.charCodeAt(t + 1), i = e.charCodeAt(t + 2), n += String.fromCharCode((15 & o) << 12 | (63 & s) << 6 | 63 & i), 
            t += 3);
            return n;
        }
    }, {
        key: "base64Decode",
        value: function(e) {
            var n, t, s, i, r, a, u = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", c = "", h = 0;
            for (e = e.replace(/[^A-Za-z0-9\+\/\=]/g, ""); h < e.length; ) n = u.indexOf(e.charAt(h++)) << 2 | (i = u.indexOf(e.charAt(h++))) >> 4, 
            t = (15 & i) << 4 | (r = u.indexOf(e.charAt(h++))) >> 2, s = (3 & r) << 6 | (a = u.indexOf(e.charAt(h++))), 
            c += String.fromCharCode(n), 64 != r && (c += String.fromCharCode(t)), 64 != a && (c += String.fromCharCode(s));
            return o.utf8_decode(c);
        }
    }, {
        key: "getSystemInfo",
        value: function() {
            return this.systemInfo ? this.systemInfo : (this.systemInfo = wx.getSystemInfoSync(), 
            this.systemInfo.hortorSDKVersion = t.Version, this.systemInfo);
        }
    }, {
        key: "getSystemInfoStr",
        value: function() {
            if (this.systemInfoStr) return this.systemInfoStr;
            var e = [ "SDKVersion", "brand", "model", "system", "version", "hortorSDKVersion", "screenWidth", "screenHeight", "windowWidth", "windowHeight" ], n = this.sliceJson(this.getSystemInfo(), e);
            return this.systemInfoStr = JSON.stringify(n), this.systemInfoStr;
        }
    }, {
        key: "isSystem",
        value: function(e) {
            e = e.toLowerCase();
            var n = this.is || {};
            if (void 0 !== n[e]) return n[e];
            var t = this.getSystemInfo().system.toLowerCase();
            return n[e] = t.indexOf(e) > -1, this.is = n, n[e];
        }
    }, {
        key: "isIOS",
        value: function() {
            return this.isSystem("ios");
        }
    }, {
        key: "isAndroid",
        value: function() {
            return this.isSystem("android");
        }
    }, {
        key: "compareVersion",
        value: function(e, n) {
            e = e.split("."), n = n.split(".");
            for (var t = Math.max(e.length, n.length); e.length < t; ) e.push("0");
            for (;n.length < t; ) n.push("0");
            for (var o = 0; o < t; o++) {
                var s = parseInt(e[o]), i = parseInt(n[o]);
                if (s > i) return 1;
                if (s < i) return -1;
            }
            return 0;
        }
    }, {
        key: "geVersion",
        value: function(e) {
            return this.compareVersion(this.getSystemInfo().SDKVersion, e) >= 0;
        }
    }, {
        key: "ltVersion",
        value: function(e) {
            return this.compareVersion(this.getSystemInfo().SDKVersion, e) < 0;
        }
    }, {
        key: "isFun",
        value: function(e) {
            return e && "function" == typeof e;
        }
    }, {
        key: "getNowSec",
        value: function() {
            return Math.floor(new Date().getTime() / 1e3);
        }
    }, {
        key: "sliceJson",
        value: function(e, n, t) {
            if (!e || !n) return {};
            "string" == typeof n && (n = n.replace(/\s+/g, "").split(","));
            var o = {};
            return n.map(function(n) {
                o[n] = e[n], t && delete e[n];
            }), o;
        }
    }, {
        key: "splitJson",
        value: function(e, n) {
            return this.sliceJson(e, n, !0);
        }
    }, {
        key: "setStorage",
        value: function(e, n) {
            var o = t.StorageKeys[e];
            o && void 0 !== n && wx.setStorageSync(o, n);
        }
    }, {
        key: "getStorage",
        value: function(e) {
            var n = t.StorageKeys[e];
            return n ? wx.getStorageSync(n) : "";
        }
    }, {
        key: "clearStorage",
        value: function(e) {
            wx.removeStorageSync(t.StorageKeys[e]);
        }
    }, {
        key: "setStorageUser",
        value: function(e) {
            this.userInfo = e, this.setStorage("UserInfo", e);
        }
    }, {
        key: "getStorageUser",
        value: function() {
            return this.userInfo = this.userInfo || this.getStorage("UserInfo"), this.userInfo;
        }
    }, {
        key: "getUserSdk",
        value: function() {
            var e = this.getStorageUser();
            return e ? e.userSdk : {};
        }
    }, {
        key: "clearStorageUser",
        value: function() {
            this.userInfo = null, this.clearStorage("UserInfo");
        }
    }, {
        key: "wxPromisify",
        value: function(e) {
            return function() {
                var n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                return new Promise(function(t, o) {
                    n.success = function(e) {
                        t(e);
                    }, n.fail = function(e) {
                        o(e);
                    }, e(n);
                });
            };
        }
    }, {
        key: "canIUserNav",
        value: function() {
            return wx.canIUse && wx.canIUse("navigateToMiniProgram");
        }
    }, {
        key: "goApp",
        value: function(e, n, t) {
            if (!e || !e.appId) return !1;
            if (!this.canIUserNav()) return !1;
            var o = e.appId, s = e.path, i = void 0 === s ? "game.js" : s, r = e.envVersion, a = void 0 === r ? "develop" : r, u = {};
            wx.navigateToMiniProgram({
                appId: o,
                path: i,
                envVersion: a,
                extraData: u,
                success: function() {
                    n && n("success"), console.log("[SDK] go app success");
                },
                fail: function(e) {
                    t && t("fail"), console.log("[SDK] go app fail", e);
                }
            });
        }
    }, {
        key: "getVersion",
        value: function() {
            return t.Version;
        }
    } ]), o;
}(), s = function() {
    function t(n) {
        e(this, t), this.conf = n, this.sdkEvents = [], this.events = {}, this.addEvent("_sdkMethodAdded", this._sdkMethodHandle.bind(this));
    }
    return n(t, [ {
        key: "addEvent",
        value: function(e, n) {
            var t = this.events[e] || [];
            t.push(n), this.events[e] = t, this.dispatchEvent("_sdkMethodAdded", e);
        }
    }, {
        key: "removeEvent",
        value: function(e, n) {
            delete this.events[e];
        }
    }, {
        key: "dispatchEvent",
        value: function(e, n) {
            var t = this.events[e];
            if (t) for (var o = 0; o < t.length; o++) (0, t[o])(n);
        }
    }, {
        key: "_callHandle",
        value: function(e, n) {
            if (e) for (var t = 0; t < e.length; t++) (0, e[t])(n);
        }
    }, {
        key: "_sdkMethodHandle",
        value: function(e) {
            if (this.sdkEvents.indexOf(e) >= 0) for (var n = 0; n < this.sdkEvents.length; n++) {
                var t = this.sdkEvents[n], o = this.events[t];
                this._callHandle(o, obj);
            }
        }
    } ], [ {
        key: "getInstance",
        value: function(e) {
            return this.instance = this.instance || new t(e), this.instance;
        }
    } ]), t;
}(), i = function() {
    function s(n) {
        e(this, s);
        var o = t.NetURL[n.env];
        this.HOST = n.HOST || o.HOST, this.Log_HOST = o.Log_HOST, this.Serve_HOST = o.Serve_HOST, 
        this.defHeader = {};
    }
    return n(s, [ {
        key: "setHeader",
        value: function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            this.defHeader = o.assign(this.defHeader, e);
        }
    }, {
        key: "request",
        value: function(e, n, s, i) {
            var r = /^(https?:\/\/)/.test(n) ? n : this.HOST + n, a = o.assign({}, s.params);
            a.sysInfo = o.getSystemInfoStr();
            var u = o.assign(this.defHeader, {
                "content-type": i ? "application/json" : "application/x-www-form-urlencoded"
            }), c = function(e) {
                var n = {
                    errMsg: e.errMsg || e || "",
                    errCode: e.errCode || t.Errors.NetWorkErr.errCode
                };
                o.isFun(s.fail) ? s.fail(n) : console.warn("[SDK] request fail: ", n);
            };
            return wx.request({
                url: r,
                data: a,
                method: e,
                header: u,
                success: function(e) {
                    var n = e.data;
                    return 200 != e.statusCode ? c(n) : 0 != n.meta.errCode ? c(n.meta) : void (o.isFun(s.success) && s.success(n.data));
                },
                complete: function(e) {
                    o.isFun(s.complete) && s.complete();
                },
                fail: c
            });
        }
    }, {
        key: "get",
        value: function(e, n) {
            return this.request("GET", e, n);
        }
    }, {
        key: "post",
        value: function(e, n) {
            return this.request("POST", e, n);
        }
    }, {
        key: "getJSON",
        value: function(e, n) {
            return this.request("GET", e, n, !0);
        }
    }, {
        key: "postJSON",
        value: function(e, n) {
            return this.request("POST", e, n, !0);
        }
    }, {
        key: "wxPromisify",
        value: function(e) {
            return function() {
                var n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                return new Promise(function(t, o) {
                    n.success = function(e) {
                        t(e);
                    }, n.fail = function(e) {
                        o(e);
                    }, e(n.url, n);
                });
            };
        }
    }, {
        key: "promise",
        value: function(e, n) {
            return this.wxPromisify(this[e].bind(this))(n);
        }
    } ]), s;
}(), r = function() {
    function s(n) {
        e(this, s), this.conf = n, this.network = new i(n), this.base = {}, this.params = {};
    }
    return n(s, [ {
        key: "init",
        value: function(e) {
            var n = e.query, t = this.conf.gameId, s = parseInt(e.scene), i = n.shareConfigId || "", r = n.h_shareCode || "", a = n.scene || "", u = a ? o.queryToJson(a) : {}, c = 1074 == s ? n : {}, h = u.channel || n.channel || "hortor";
            this.params = {
                shareConfigId: i,
                h_shareCode: r,
                pageQuery: a,
                sceneQuery: c
            }, this.base = {
                gameId: t,
                channel: h,
                scene: s
            };
        }
    }, {
        key: "postLog",
        value: function(e, n) {
            if (!e.userId && !e.uniqueId) {
                var s = o.getUserSdk(), i = s.userId, r = s.uniqueId;
                e = o.assign(e, {
                    userId: i,
                    uniqueId: r
                });
            }
            e = o.assign(e, this.base);
            var a = o.assign({
                params: e
            }, n);
            this.network.postJSON("" + this.network.Log_HOST + t.MessageHead.Log, a);
        }
    } ], [ {
        key: "getInstance",
        value: function(e) {
            return this.instance = this.instance || new s(e), this.instance;
        }
    } ]), s;
}(), a = function() {
    function s(n) {
        e(this, s), this.conf = n, this.network = new i(n), this.log = r.getInstance(n), 
        this.useBtnGetUserInfo = o.geVersion("2.0.2");
    }
    return n(s, [ {
        key: "postLog",
        value: function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : t.LogType.Login;
            this.log.postLog({
                logType: e
            });
        }
    }, {
        key: "checkStorage",
        value: function() {
            var e = o.getStorageUser();
            if (!e) return null;
            this._isAuthorizeLogin && !e.userSdk.hasUserInfo && (e = null);
            var n = o.getStorage("SaveTime");
            return n ? n + (this.conf.Expire_Time - 0 || 86400) < o.getNowSec() && (o.clearStorage("SaveTime"), 
            e = null) : e = null, e;
        }
    }, {
        key: "setStorage",
        value: function(e) {
            if (!e.encryptUserInfo) return !1;
            o.setStorageUser(e), o.setStorage("RunMode", this.conf.env), o.setStorage("SaveTime", o.getNowSec());
        }
    }, {
        key: "checkSession",
        value: function(e) {
            var n = this;
            wx.checkSession({
                success: function() {
                    console.log("[SDK] checkSession 1"), e(n.checkStorage(), null);
                },
                fail: function() {
                    console.log("[SDK] checkSession 0"), o.clearStorageUser(), e(null, t.Errors.WXSessionFail);
                }
            });
        }
    }, {
        key: "wxLogin",
        value: function(e) {
            var n = function(n) {
                console.log("[SDK] wxlogin 0 ", n.errMsg), e(null, t.Errors.WXCodeErr);
            };
            wx.login({
                success: function(t) {
                    if (!t.code) return n(t);
                    console.log("[SDK] wxlogin 1"), e(t.code, null);
                },
                fail: n
            });
        }
    }, {
        key: "entry",
        value: function(e, n) {
            var s = this, i = {
                code: e,
                version: t.Version,
                gameId: this.conf.gameId,
                channel: this.log.base.channel,
                query: this.log.params.pageQuery,
                shareConfigId: this.log.params.shareConfigId,
                h_shareCode: this.log.params.h_shareCode,
                isWeak: !this._isAuthorizeLogin
            };
            this.network.post(t.MessageHead.Login, {
                params: i,
                success: function(e) {
                    console.log("[SDK] entry 1 ", e), s.setStorage(e), n(e, null);
                },
                fail: function(e) {
                    console.log("[SDK] entry 0 ", e), o.clearStorageUser(), n(null, e);
                }
            });
        }
    }, {
        key: "postUserInfo",
        value: function(e) {
            var n = this;
            if (o.hideLoading(), !e) return console.log("[SDK] post userInfo null");
            var s = o.getUserSdk(), i = {
                entryAlias: "miniprogram",
                gameId: this.conf.gameId,
                userId: s.userId,
                uniqueId: s.uniqueId,
                encryptedData: e.encryptedData,
                iv: e.iv
            };
            this.network.post(t.MessageHead.SetUserInfo, {
                params: i,
                success: function(e) {
                    n.setStorage(e), n.onLogin(e, null);
                },
                fail: function(e) {
                    n.onLogin(null, e);
                }
            });
        }
    }, {
        key: "_checkAuth",
        value: function(e, n) {
            if (console.log("[SDK] _checkAuth"), !o.isFun(e)) return !1;
            var t = function(e) {
                o.isFun(n) && n();
            };
            wx.getSetting({
                success: function(n) {
                    n.authSetting["scope.userInfo"] ? e() : t();
                },
                fail: t
            });
        }
    }, {
        key: "_showSetModal",
        value: function(e) {
            var n = this;
            wx.showModal({
                title: "提示",
                content: "需要设置开启微信访问信息权限",
                showCancel: !0,
                cancelText: "知道了",
                confirmText: "去设置",
                success: function(t) {
                    t.confirm && n._toSetting(e);
                }
            });
        }
    }, {
        key: "_toSetting",
        value: function(e) {
            var n = this;
            if (!o.isFun(e)) return !1;
            var t = function(t) {
                n._showSetModal(e);
            };
            wx.openSetting({
                success: function(n) {
                    n.authSetting["scope.userInfo"] ? e() : t();
                },
                fail: t
            });
        }
    }, {
        key: "_wxAuthorize",
        value: function(e) {
            var n = this;
            if (console.log("[SDK] _wxAuthorize"), !o.isFun(e)) return !1;
            wx.authorize({
                scope: "scope.userInfo",
                success: e,
                fail: function() {
                    n._toSetting(e);
                }
            });
        }
    }, {
        key: "fetchUserInfo",
        value: function() {
            var e = this;
            console.log("[SDK] fetchUserInfo"), wx.getUserInfo({
                lang: "zh_CN",
                success: function(n) {
                    e.postUserInfo(n);
                },
                fail: function(n) {
                    e.onLogin(null, t.Errors.NetWorkErr);
                }
            });
        }
    }, {
        key: "getAuth",
        value: function() {
            o.hideLoading(), this.useBtnGetUserInfo && o.isFun(this.onShowBtn) ? this._checkAuth(this.fetchUserInfo.bind(this), this.onShowBtn) : this._wxAuthorize(this.fetchUserInfo.bind(this));
        }
    }, {
        key: "onLogin",
        value: function(e, n) {
            o.hideLoading();
            var t = e ? e.encryptUserInfo : null;
            t ? (this.postLog(), o.isFun(this.opt.success) && this.opt.success(t)) : o.isFun(this.opt.fail) && this.opt.fail(n);
        }
    }, {
        key: "_doLogin",
        value: function(e) {
            var n = this, t = e.loadingText, s = void 0 === t ? "登录中..." : t;
            o.showLoading(s), this.opt = e, this.checkSession(function(e, t) {
                var s = !t;
                if (o.getStorage("RunMode") !== n.conf.env && (s = !1), s && e) return n.onLogin(e, null);
                n.wxLogin(function(e, t) {
                    if (t) return n.onLogin(null, t);
                    n.entry(e, function(e, t) {
                        if (t) return n.onLogin(null, t);
                        e.userSdk.isAuth ? n.onLogin(e, null) : n.getAuth();
                    });
                });
            });
        }
    }, {
        key: "bindShowBtn",
        value: function(e) {
            this.onShowBtn = o.isFun(e) ? e : "";
        }
    }, {
        key: "getUserInfoSuccess",
        value: function(e) {
            var n = e && (e.detail || e);
            n && n.encryptedData ? (console.log("[SDK] getUserInfoSuccess", n), this.postUserInfo(n)) : this.postLog(t.LogType.AuthFailed);
        }
    }, {
        key: "loginFun",
        value: function(e, n) {
            this._isAuthorizeLogin = !!n, this._doLogin(e);
        }
    }, {
        key: "login",
        value: function(e) {
            this.loginFun(e, !0);
        }
    }, {
        key: "weakLogin",
        value: function(e) {
            this.loginFun(e, !1);
        }
    } ]), s;
}(), u = function() {
    function s(n) {
        e(this, s), this.log = r.getInstance(n);
    }
    return n(s, [ {
        key: "_getChannel",
        value: function(e) {
            return e ? /_$/.test(e) ? e : e + "_" : "hortor_";
        }
    }, {
        key: "_setPath",
        value: function(e) {
            var n = e.split("?"), t = o.queryToJson(n[1] || ""), s = o.getUserSdk(), i = o.assign({
                channel: this._getChannel(s.channel),
                h_shareCode: s.h_shareCode || "",
                shareConfigId: t.shareConfigId || ""
            }, t);
            return (n[0] || "/") + "?" + o.jsonToQuery(i);
        }
    }, {
        key: "postLog",
        value: function(e) {
            var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : t.LogType.Share;
            this.log.postLog({
                shareConfigId: e.shareConfigId,
                logType: n,
                content: e
            });
        }
    }, {
        key: "onShare",
        value: function(e) {
            e.path = this._setPath(e.path || ""), console.log("[SDK] share data", e), this.postLog(e);
        }
    } ]), s;
}(), c = function() {
    function s(n) {
        e(this, s), this.conf = n, this.network = new i(n), this.log = r.getInstance(n);
    }
    return n(s, [ {
        key: "postLog",
        value: function(e, n) {
            var o = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : t.LogType.Err;
            this.log.postLog({
                logType: o,
                orderId: e,
                errMsg: encodeURIComponent(JSON.stringify(n || ""))
            });
        }
    }, {
        key: "getOrderInfo",
        value: function(e) {
            var n = e.orderId, o = e.success, s = e.fail;
            this.network.get(t.MessageHead.GetOrderInfo, {
                params: {
                    orderId: n
                },
                success: o,
                fail: s
            });
        }
    }, {
        key: "pay",
        value: function(e) {
            var n = this, t = (e.param, e.success), s = e.fail, i = o.assign({}, e.param);
            this._createWXOrder({
                orderId: i.orderId,
                userId: i.uniqueId,
                appId: i.appId
            }, {
                success: function(e) {
                    console.log("[SDK] pay success", e), o.isFun(t) && t(e);
                },
                fail: function(e) {
                    console.log("[SDK] pay fail", e), n.postLog(orderId, e), o.isFun(s) && s(e);
                }
            });
        }
    }, {
        key: "_createWXOrder",
        value: function(e, n) {
            var o = this;
            this.network.post(t.MessageHead.CreateWXOrder, {
                params: e,
                success: function(e) {
                    o._requestPayment(e, n);
                },
                fail: n.fail
            });
        }
    }, {
        key: "_requestPayment",
        value: function(e, n) {
            var s = {
                timeStamp: "",
                nonceStr: "",
                package: "",
                signType: "",
                paySign: "",
                success: n.success,
                fail: function(e) {
                    var s = o.getWXErrInfo(e), i = "cancel" == s ? t.Errors.PayCancel : t.Errors.PayFail;
                    i.errMsg = s, n.fail(i);
                }
            };
            o.assign(s, e), wx.requestPayment(s);
        }
    } ]), s;
}();

!function(e) {
    function n(e) {
        console.log("[SDK] onLance", e), this.sdk = new r(this), this.sdk.setOptions(e);
    }
    function t(e) {
        console.log("[SDK] onShow", e), this.sdk.setOptions(e);
    }
    function o(e) {
        getApp().sdk.share.onShare(e[1]);
    }
    var s = function(e, n, t) {
        if (e[n]) {
            var o = e[n];
            e[n] = function(e) {
                t.call(this, e, n), o.call(this, e);
            };
        } else e[n] = function(e) {
            t.call(this, e, n);
        };
    }, i = function(e, n, t) {
        if (e[n]) {
            var o = e[n];
            e[n] = function(e) {
                var s = o.call(this, e);
                return t.call(this, [ e, s ], n), s;
            };
        } else e[n] = function(e) {
            t.call(this, e, n);
        };
    }, r = function(e) {
        this.app = e;
    };
    r.prototype = e;
    var a = App;
    App = function(e) {
        s(e, "onLaunch", n), s(e, "onShow", t), a(e);
    };
    var u = Page;
    Page = function(e) {
        void 0 !== e.onShareAppMessage && i(e, "onShareAppMessage", o), u(e);
    };
}({
    login: function() {
        var e;
        (e = this.loginManager).login.apply(e, arguments);
    },
    weakLogin: function() {
        var e;
        (e = this.loginManager).weakLogin.apply(e, arguments);
    },
    bindShowBtn: function() {
        var e;
        (e = this.loginManager).bindShowBtn.apply(e, arguments);
    },
    getUserInfoSuccess: function() {
        var e;
        (e = this.loginManager).getUserInfoSuccess.apply(e, arguments);
    },
    pay: function() {
        var e;
        (e = this.payManager).pay.apply(e, arguments);
    },
    getOrderInfo: function() {
        var e;
        (e = this.payManager).getOrderInfo.apply(e, arguments);
    },
    setOptions: function(e) {
        this.options = e, this.log && this.log.init(e);
    },
    init: function(e) {
        this.util = o, this.conf = e, this.core = s.getInstance(e), this.log = r.getInstance(e), 
        this.log.init(this.options || {}), this.network = new i(e), this.loginManager = new a(e), 
        this.share = new u(e), this.payManager = new c(e);
    }
});