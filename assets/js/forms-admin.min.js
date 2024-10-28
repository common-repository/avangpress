! function() {
    var e = void 0,
        t = void 0;
    ! function() {
        return function t(r, n, i) {
            function o(l, s) {
                if (!n[l]) {
                    if (!r[l]) {
                        var c = "function" == typeof e && e;
                        if (!s && c) return c(l, !0);
                        if (a) return a(l, !0);
                        var u = new Error("Cannot find module '" + l + "'");
                        throw u.code = "MODULE_NOT_FOUND", u
                    }
                    var d = n[l] = {
                        exports: {}
                    };
                    r[l][0].call(d.exports, function(e) {
                        var t = r[l][1][e];
                        return o(t || e)
                    }, d, d.exports, t, r, n, i)
                }
                return n[l].exports
            }
            for (var a = "function" == typeof e && e, l = 0; l < i.length; l++) o(i[l]);
            return o
        }
    }()({
        1: [function(e, t, r) {
            "use strict";
            t.exports = function(e, t) {
                var r = {
                    showType: function(r) {
                        var n = r.type();
                        return n = n.charAt(0).toUpperCase() + n.slice(1), e("div", [e("label", t.fieldType), e("span", n)])
                    },
                    label: function(r) {
                        return e("div", [e("label", t.fieldLabel), e("input.widefat", {
                            type: "text",
                            value: r.label(),
                            onchange: e.withAttr("value", r.label),
                            placeholder: r.title()
                        })])
                    },
                    value: function(r) {
                        var n = "hidden" === r.type();
                        return e("div", [e("label", [n ? t.value : t.initialValue, " ", n ? "" : e("small", {
                            style: "float: right; font-weight: normal;"
                        }, t.optional)]), e("input.widefat", {
                            type: "text",
                            value: r.value(),
                            onchange: e.withAttr("value", r.value)
                        }), n ? "" : e("p.help", t.valueHelp)])
                    },
                    numberMinMax: function(r) {
                        return e("div", [e("div.row", [e("div.col.col-3", [e("label", t.min), e("input", {
                            type: "number",
                            onchange: e.withAttr("value", r.min)
                        })]), e("div.col.col-3", [e("label", t.max), e("input", {
                            type: "number",
                            onchange: e.withAttr("value", r.max)
                        })])])])
                    },
                    isRequired: function(r) {
                        var n = {
                                type: "checkbox",
                                checked: r.required(),
                                onchange: e.withAttr("checked", r.required)
                            },
                            i = void 0;
                        return r.forceRequired() && (n.required = !0, n.disabled = !0, i = e("p.help", t.forceRequired)), e("div", [e("label.cb-wrap", [e("input", n), t.isFieldRequired]), i])
                    },
                    placeholder: function(r) {
                        return e("div", [e("label", [t.placeholder, " ", e("small", {
                            style: "float: right; font-weight: normal;"
                        }, t.optional)]), e("input.widefat", {
                            type: "text",
                            value: r.placeholder(),
                            onchange: e.withAttr("value", r.placeholder),
                            placeholder: ""
                        }), e("p.help", t.placeholderHelp)])
                    },
                    useParagraphs: function(r) {
                        return e("div", [e("label.cb-wrap", [e("input", {
                            type: "checkbox",
                            checked: r.wrap(),
                            onchange: e.withAttr("checked", r.wrap)
                        }), t.wrapInParagraphTags])])
                    },
                    choiceType: function(r) {
                        var n = [e("option", {
                            value: "select",
                            selected: "select" === r.type() && "selected"
                        }, t.dropdown), e("option", {
                            value: "radio",
                            selected: "radio" === r.type() && "selected"
                        }, t.radioButtons)];
                        return r.acceptsMultipleValues && n.push(e("option", {
                            value: "checkbox",
                            selected: "checkbox" === r.type() && "selected"
                        }, t.checkboxes)), e("div", [e("label", t.choiceType), e("select", {
                            value: r.type(),
                            onchange: e.withAttr("value", r.type)
                        }, n)])
                    },
                    choices: function(r) {
                        var n = [];
                        return n.push(e("div", [e("label", t.choices), e("div.limit-height", [e("table", [r.choices().map(function(n, i) {
                            return e("tr", {
                                "data-id": i
                            }, [e("td.cb", e("input", {
                                name: "selected",
                                type: "checkbox" === r.type() ? "checkbox" : "radio",
                                onchange: e.withAttr("value", r.selectChoice.bind(r)),
                                checked: n.selected(),
                                value: n.value(),
                                title: t.preselect
                            })), e("td.stretch", e("input.widefat", {
                                type: "text",
                                value: n.label(),
                                placeholder: n.title(),
                                onchange: e.withAttr("value", n.label)
                            })), e("td", e("span", {
                                title: t.remove,
                                class: "dashicons dashicons-no-alt hover-activated",
                                onclick: function(e) {
                                    this.choices().splice(e, 1)
                                }.bind(r, i)
                            }, ""))])
                        })])])])), n
                    },
                    linkToTerms: function(r) {
                        return e("div", [e("label", t.agreeToTermsLink), e("input.widefat", {
                            type: "text",
                            value: r.link,
                            onchange: e.withAttr("value", r.link),
                            placeholder: "https://..."
                        })])
                    }
                };
                return r
            }
        }, {}],
        2: [function(e, t, r) {
            "use strict";
            t.exports = function(t, r) {
                var n = {},
                    i = e("./field-forms-rows.js")(t, r);
                return n.render = function(e) {
                    var t = e.type();
                    if ("function" == typeof n[t]) return n[t](e);
                    switch (t) {
                        case "select":
                        case "radio":
                        case "checkbox":
                            return n.choice(e)
                    }
                    return n.text(e)
                }, n.text = function(e) {
                    return [i.label(e), i.placeholder(e), i.value(e), i.isRequired(e), i.useParagraphs(e)]
                }, n.choice = function(e) {
                    var t = [i.label(e), i.choiceType(e), i.choices(e)];
                    return "select" === e.type() && t.push(i.placeholder(e)), t.push(i.useParagraphs(e)), "select" !== e.type() && "radio" !== e.type() || t.push(i.isRequired(e)), t
                }, n.hidden = function(e) {
                    return e.placeholder(""), e.label(""), e.wrap(!1), [i.showType(e), i.value(e)]
                }, n.submit = function(e) {
                    return e.label(""), e.placeholder(""), [i.value(e), i.useParagraphs(e)]
                }, n["terms-checkbox"] = function(e) {
                    return [i.label(e), i.linkToTerms(e), i.isRequired(e), i.useParagraphs(e)]
                }, n.number = function(e) {
                    return [n.text(e), i.numberMinMax(e)]
                }, n
            }
        }, {
            "./field-forms-rows.js": 1
        }],
        3: [function(e, t, r) {
            "use strict";
            var n = e("html"),
                i = function(e) {
                    e.dom.checked && e.dom.setAttribute("checked", "true"), e.dom.value && e.dom.setAttribute("value", e.dom.value), e.dom.selected && e.dom.setAttribute("selected", "true")
                };
            t.exports = function(e) {
                var t = {};
                return t.select = function(t) {
                        var r = {
                                name: t.name(),
                                required: t.required()
                            },
                            n = !1,
                            o = t.choices().map(function(t) {
                                return t.selected() && (n = !0), e("option", {
                                    value: t.value() !== t.label() ? t.value() : void 0,
                                    selected: t.selected(),
                                    oncreate: i
                                }, t.label())
                            }),
                            a = t.placeholder();
                        return a.length > 0 && o.unshift(e("option", {
                            disabled: !0,
                            value: "",
                            selected: !n,
                            oncreate: i
                        }, a)), e("select", r, o)
                    }, t["terms-checkbox"] = function(t) {
                        var r = void 0;
                        return r = t.link().length > 0 ? e("a", {
                            href: t.link(),
                            target: "_blank"
                        }, t.label()) : t.label(), e("label", [e("input", {
                            name: t.name(),
                            type: "checkbox",
                            value: t.value(),
                            required: t.required()
                        }), " ", r])
                    }, t.checkbox = function(t) {
                        return t.choices().map(function(r) {
                            var n = t.name() + ("checkbox" === t.type() ? "[]" : ""),
                                o = t.required() && "radio" === t.type();
                            return e("label", [e("input", {
                                name: n,
                                type: t.type(),
                                value: r.value(),
                                checked: r.selected(),
                                required: o,
                                oncreate: i
                            }), " ", e("span", r.label())])
                        })
                    }, t.radio = t.checkbox, t.default = function(t) {
                        var r = {
                            type: t.type()
                        };
                        return t.name() && (r.name = t.name()), t.min() && (r.min = t.min()), t.max() && (r.max = t.max()), t.value().length > 0 && (r.value = t.value()), t.placeholder().length > 0 && (r.placeholder = t.placeholder()), r.required = t.required(), r.oncreate = i, e("input", r)
                    },
                    function(r) {
                        var i, o, a, l = document.createElement("div");
                        return i = r.label().length > 0 && r.showLabel() ? e("label", {}, r.label()) : "", o = "function" == typeof t[r.type()] ? t[r.type()](r) : t.default(r), a = r.wrap() ? e("p", [i, o]) : [i, o], e.render(l, a), n.prettyPrint(l.innerHTML) + "\n"
                    }
            }
        }, {
            html: 22
        }],
        4: [function(e, t, r) {
            "use strict";
            t.exports = function(t, r, n, i, o, a) {
                var l, s = e("./field-generator.js")(t),
                    c = e("./overlay.js")(t, a),
                    u = e("./field-forms.js")(t, a);

                function d(e) {
                    (l = i.get(e)) && l.choices().length > 0 && l.value(l.choices().map(function(e) {
                        return e.label()
                    }).join("|")), t.redraw()
                }

                function f() {
                    var e = s(l);
                    n.insert(e), d(""), t.redraw()
                }
                return n.on("blur", t.redraw), {
                    view: function() {
                        var e = i.getCategories(),
                            r = i.getAll(),
                            n = t("div.available-fields.small-margin", [t("h4", a.chooseField), e.map(function(e) {
                                var n = r.filter(function(t) {
                                    return t.category === e
                                });
                                if (n.length) return t("div.tiny-margin", [t("strong", e), n.map(function(e) {
                                    var r = "button";
                                    e.forceRequired() && (r += " is-required");
                                    var n = e.inFormContent();
                                    return null !== n && (r += " " + (n ? "in-form" : "not-in-form")), t("button", {
                                        className: r,
                                        type: "button",
                                        onclick: t.withAttr("value", d),
                                        value: e.index
                                    }, e.title())
                                })])
                            })]),
                            o = null;
                        return l && (o = t(c(t("div.field-wizard", [t("h3", [l.title(), l.forceRequired() ? t("span.red", "*") : "", l.name().length ? t("code", l.name()) : ""]), l.help().length ? t("p", t.trust(l.help())) : "", u.render(l), t("p", [t("button", {
                            class: "button-primary",
                            type: "button",
                            onkeydown: function(e) {
                                13 == (e = e || window.event).keyCode && f()
                            },
                            onclick: f
                        }, a.addToForm)])]), d))), [n, o]
                    },
                    controller: function() {}
                }
            }
        }, {
            "./field-forms.js": 2,
            "./field-generator.js": 3,
            "./overlay.js": 10
        }],
        5: [function(e, t, r) {
            "use strict";
            t.exports = function(e, t) {
                var r = [];

                function n(t, n, i) {
                    var o = e.register(t, n);
                    i || r.push(o)
                }

                function i(e) {
                    var t = {
                        phone: "tel",
                        dropdown: "select",
                        checkboxes: "checkbox",
                        birthday: "text"
                    };
                    return void 0 !== t[e] ? t[e] : e
                }

                function o(e) {
                    if (console.log(e), null != e) {
                        var r = t.listFields,
                            o = i(e.field_type),
                            a = {
                                name: e.tag,
                                title: e.name,
                                required: e.required,
                                forceRequired: e.required,
                                type: o,
                                choices: e.choices,
                                acceptsMultipleValues: !1
                            };
                        return "address" !== a.type ? n(r, a, !1) : (n(r, {
                            name: a.name + "[addr1]",
                            type: "text",
                            mailType: "address",
                            title: t.streetAddress
                        }), n(r, {
                            name: a.name + "[city]",
                            type: "text",
                            mailType: "address",
                            title: t.city
                        }), n(r, {
                            name: a.name + "[state]",
                            type: "text",
                            mailType: "address",
                            title: t.state
                        }), n(r, {
                            name: a.name + "[zip]",
                            type: "text",
                            mailType: "address",
                            title: t.zip
                        }), n(r, {
                            name: a.name + "[country]",
                            type: "select",
                            mailType: "address",
                            title: t.country,
                            choices: avangpress_vars.countries
                        })), !0
                    }
                }

                function a(e) {
                    if (null != e) {
                        var r = t.interestCategories,
                            o = i(e.field_type);
                        n(r, {
                            title: e.name,
                            name: "INTERESTS[" + e.id + "]",
                            type: o,
                            choices: e.interests,
                            acceptsMultipleValues: "checkbox" === o
                        }, !1)
                    }
                }

                function l(e) {
                    e.merge_fields = e.merge_fields.sort(function(e, t) {
                        return "EMAIL" === e.tag || e.public && !t.public ? -1 : !e.public && t.public ? 1 : 0
                    }), e.merge_fields.forEach(o), e.interest_categories.forEach(a)
                }
                return {
                    registerCustomFields: function(e) {
                        var r, i = t.formFields;
                        n(i, {
                            name: "",
                            value: t.subscribe,
                            type: "submit",
                            title: t.submitButton
                        }, !0), r = {};
                        for (var o in e) r[e[o].id] = e[o].name;
                        n(i, {
                            name: "avangpress_lists",
                            type: "checkbox",
                            title: t.listChoice,
                            choices: r,
                            help: t.listChoiceDescription,
                            acceptsMultipleValues: !0
                        }, !0), r = {
                            subscribe: "Subscribe",
                            unsubscribe: "Unsubscribe"
                        }, n(i, {
                            name: "avangpress_action",
                            type: "radio",
                            title: t.formAction,
                            choices: r,
                            value: "subscribe",
                            help: t.formActionDescription
                        }, !0), n(i, {
                            name: "AGREE_TO_TERMS",
                            value: 1,
                            type: "terms-checkbox",
                            label: t.agreeToTerms,
                            title: t.agreeToTermsShort,
                            showLabel: !1,
                            required: !0
                        }, !0)
                    },
                    registerListFields: l,
                    registerListsFields: function(t) {
                        r.forEach(e.deregister), t.forEach(l)
                    }
                }
            }
        }, {}],
        6: [function(e, t, r) {
            "use strict";
            var n = e("mithril/stream");
            t.exports = function(e, t) {
                var r, i = [],
                    o = [],
                    a = function(e) {
                        this.name = n(e.name), this.title = n(e.title || e.name), this.type = n(e.type), this.mailType = n(e.mailType || ""), this.label = n(e.label || e.title || ""), this.showLabel = n(void 0 === e.showLabel || e.showLabel), this.value = n(e.value || ""), this.placeholder = n(e.placeholder || ""), this.required = n(e.required || !1), this.forceRequired = n(e.forceRequired || !1), this.wrap = n(void 0 === e.wrap || e.wrap), this.min = n(e.min || null), this.max = n(e.max || null), this.help = n(e.help || ""), this.choices = n(e.choices || []), this.inFormContent = n(null), this.acceptsMultipleValues = e.acceptsMultipleValues, this.link = n(e.link || ""), this.selectChoice = function(e) {
                            var t = this;
                            this.choices(this.choices().map(function(r) {
                                return r.value() === e ? r.selected(!0) : "checkbox" !== t.type() && r.selected(!1), r
                            }))
                        }
                    },
                    l = function(e) {
                        this.label = n(e.label), this.title = n(e.title || e.label), this.selected = n(e.selected || !1), this.value = n(e.value || e.label)
                    };

                function s(e, t) {
                    return i.filter(function(r) {
                        return r[e]() === t
                    })
                }
                return {
                    get: function(e) {
                        return i[e]
                    },
                    getAll: function() {
                        return i = i.map(function(e, t) {
                            return e.index = t, e
                        })
                    },
                    getCategories: function() {
                        return o
                    },
                    deregister: function(t) {
                        var r = i.indexOf(t);
                        r > -1 && (delete i[r], e.redraw())
                    },
                    register: function(n, c) {
                        var u, d, f = s("name", c.name).shift();
                        if (!f) return c.choices && (c.choices = "function" == typeof(d = c.choices).map ? d.map(function(e) {
                            return new l({
                                label: e
                            })
                        }) : Object.keys(d).map(function(e) {
                            var t = d[e];
                            return new l({
                                label: t,
                                value: e
                            })
                        }), c.value && (c.choices = c.choices.map(function(e) {
                            return e.value() === c.value && e.selected(!0), e
                        }))), o.indexOf(n) < 0 && o.push(n), (u = new a(c)).category = n, i.push(u), r && window.clearTimeout(r), r = window.setTimeout(e.redraw, 200), t.trigger("fields.change"), u;
                        !f.forceRequired() && c.forceRequired && f.forceRequired(!0)
                    },
                    getAllWhere: s
                }
            }
        }, {
            "mithril/stream": 23
        }],
        7: [function(e, t, r) {
            "use strict";
            var n = e("codemirror");
            e("codemirror/mode/xml/xml"), e("codemirror/mode/javascript/javascript"), e("codemirror/mode/css/css"), e("codemirror/mode/htmlmixed/htmlmixed"), e("codemirror/addon/fold/xml-fold.js"), e("codemirror/addon/edit/matchtags.js"), e("codemirror/addon/edit/closetag.js"), e("codemirror/addon/selection/active-line.js"), e("codemirror/addon/edit/matchbrackets.js");
            var i, o, a = {},
                l = document.createElement("form"),
                s = !1,
                c = document.getElementById("avangpress-form-content"),
                u = document.getElementById("avangpress-form-preview"),
                d = /\{[^{}]+\}/g;

            function f() {
                var e = u.contentDocument || u.contentWindow.document;
                (o = e.querySelector(".avangpress-form-fields")) && h()
            }

            function h() {
                var e = a.getValue();
                e = e.replace(d, "").replace(d, ""), o.innerHTML = e, o.dispatchEvent(new Event("avangpress-refresh"))
            }

            function p() {
                return s && (l.innerHTML = a.getValue().toLowerCase(), s = !1), l
            }
            window.addEventListener("load", function() {
                n.signal(i, "change")
            }), c.addEventListener("change", function() {
                s = !0, h()
            }), a.getValue = function() {
                return i ? i.getValue() : c.value
            }, a.query = function(e) {
                return p().querySelectorAll(e.toLowerCase())
            }, a.containsField = function(e) {
                return null !== p().elements.namedItem(e.toLowerCase())
            }, a.insert = function(e) {
                i ? (i.replaceSelection(e), i.focus()) : c.value += e
            }, a.on = function(e, t) {
                return i ? (e = "input" === e ? "changes" : e, i.on(e, t)) : c.addEventListener(e, t)
            }, a.refresh = function() {
                i && i.refresh()
            }, l.innerHTML = c.value.toLowerCase(), n && (i = n.fromTextArea(c, {
                selectionPointer: !0,
                mode: "htmlmixed",
                htmlMode: !0,
                autoCloseTags: !0,
                autoRefresh: !0,
                styleActiveLine: !0,
                matchBrackets: !0,
                matchTags: {
                    bothTags: !0
                }
            }), window.dispatchEvent && i.on("change", function() {
                if ("function" == typeof Event) {
                    var e = new Event("change", {
                        bubbles: !0
                    });
                    c.dispatchEvent(e)
                }
            })), u.addEventListener("load", f), f.call(), t.exports = a
        }, {
            codemirror: 17,
            "codemirror/addon/edit/closetag.js": 12,
            "codemirror/addon/edit/matchbrackets.js": 13,
            "codemirror/addon/edit/matchtags.js": 14,
            "codemirror/addon/fold/xml-fold.js": 15,
            "codemirror/addon/selection/active-line.js": 16,
            "codemirror/mode/css/css": 18,
            "codemirror/mode/htmlmixed/htmlmixed": 19,
            "codemirror/mode/javascript/javascript": 20,
            "codemirror/mode/xml/xml": 21
        }],
        8: [function(e, t, r) {
            "use strict";
            t.exports = function(e, t, r, n, i, o) {
                var a = document.getElementById("required-fields");

                function l() {
                    var r, i;
                    n.getAll().forEach(function(e) {
                        if (!(e.name().length <= 0)) {
                            var r = e.name();
                            "checkbox" === e.type() && (r += "[]");
                            var n = t.containsField(r);
                            if (e.inFormContent(n), "address" === e.mailType()) {
                                e.originalRequiredValue = void 0 === e.originalRequiredValue ? e.forceRequired() : e.originalRequiredValue;
                                var i = e.name().replace(/\[(\w+)\]/g, "");
                                t.query('[name^="' + i + '"]').length > 0 ? (void 0 === e.originalRequiredValue && (e.originalRequiredValue = e.forceRequired()), e.forceRequired(!0)) : e.forceRequired(e.originalRequiredValue)
                            }
                        }
                    }), r = n.getAllWhere("forceRequired", !0).map(function(e) {
                        return e.name().toUpperCase().replace(/\[(\w+)\]/g, ".$1")
                    }), i = t.query("[required]"), Array.prototype.forEach.call(i, function(e) {
                        var t = e.name;
                        if (t && !(t.length < 0) && "_" !== t[0]) {
                            var n = (t = (t = t.replace(/\[(\w+)\]/g, ".$1")).replace(/\[\]$/, "")).indexOf(".");
                            n = n > 0 ? n : t.length, t = t.substr(0, n).toUpperCase() + t.substr(n), -1 === r.indexOf(t) && r.push(t)
                        }
                    }), a.value = r.join(","), e.redraw()
                }
                t.on("change", o.debounce(l, 500)), i.on("fields.change", o.debounce(l, 500))
            }
        }, {}],
        9: [function(e, t, r) {
            "use strict";
            var n = {};

            function i(e, t) {
                n[e] = t, a()
            }

            function o(e) {
                delete n[e], a()
            }

            function a() {
                var e = "";
                for (var t in n) e += '<div class="notice notice-warning inline"><p>' + n[t] + "</p></div>";
                var r = document.querySelector(".avangpress-notices");
                if (!r) {
                    (r = document.createElement("div")).className = "avangpress-notices";
                    var i = document.querySelector("h1, h2");
                    i.parentNode.insertBefore(r, i.nextSibling)
                }
                r.innerHTML = e
            }
            t.exports = {
                init: function(e, t) {
                    var r = function() {
                            e.getValue().toLowerCase().indexOf('name="groupings') > -1 ? i("deprecated_groupings", "Your form contains old style <code>GROUPINGS</code> fields. <br /><br />Please remove these fields from your form and then re-add them through the available field buttons to make sure your data is getting through to AvangPress correctly.") : o("deprecated_groupings")
                        },
                        n = function() {
                            var r = t.getAllWhere("forceRequired", !0).filter(function(t) {
                                    return !e.containsField(t.name().toUpperCase())
                                }),
                                n = "<strong>Heads up!</strong> Your form is missing list fields that are required in AvangPress. Either add these fields to your form or mark them as optional in AvangPress.";
                            n += '<br /><ul class="ul-square" style="margin-bottom: 0;"><li>' + r.map(function(e) {
                                return e.title()
                            }).join("</li><li>") + "</li></ul>", r.length > 0 ? i("required_fields_missing", n) : o("required_fields_missing")
                        };
                    r(), e.on("focus", r), e.on("blur", r), n(), e.on("blur", n), e.on("focus", n)
                }
            }
        }, {}],
        10: [function(e, t, r) {
            "use strict";
            t.exports = function(e, t) {
                var r = void 0,
                    n = void 0;

                function i() {
                    document.removeEventListener("keydown", o), window.removeEventListener("resize", a), n()
                }

                function o(e) {
                    27 == (e = e || window.event).keyCode && i(), 13 == e.keyCode && e.preventDefault()
                }

                function a() {
                    if (r) {
                        var e = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
                            t = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight,
                            n = (e - r.clientWidth - 40) / 2,
                            i = (t - r.clientHeight - 40) / 2;
                        r.style.left = (n > 0 ? n : 0) + "px", r.style.top = (i > 0 ? i : 0) + "px"
                    }
                }

                function l(e) {
                    r = e.dom, a()
                }
                return function(r, s) {
                    return n = s, {
                        oncreate: function() {
                            document.addEventListener("keydown", o), window.addEventListener("resize", a)
                        },
                        onremove: function() {
                            document.removeEventListener("keydown", o), window.removeEventListener("resize", a)
                        },
                        view: function() {
                            return [e("div.overlay-wrap", e("div.overlay", {
                                oncreate: l
                            }, [e("span", {
                                class: "close dashicons dashicons-no",
                                title: t.close,
                                onclick: i
                            }), r])), e("div.overlay-background", {
                                title: t.close,
                                onclick: i
                            })]
                        }
                    }
                }
            }
        }, {}],
        11: [function(e, t, r) {
            "use strict";
            var n = window.avangpress_forms_i18n,
                i = window.avangpress.deps.mithril,
                o = avangpress.events,
                a = avangpress.settings,
                l = avangpress.helpers,
                s = avangpress.tabs,
                c = e("./admin/form-watcher.js"),
                u = e("./admin/form-editor.js"),
                d = e("./admin/field-helper.js"),
                f = e("./admin/fields-factory.js"),
                h = e("./admin/fields.js")(i, o),
                p = window.formEditor = u,
                m = (new c(i, formEditor, a, h, o, l), new d(i, s, formEditor, h, o, n)),
                g = e("./admin/notices");
            i.mount(document.getElementById("avangpress-field-wizard"), m);
            var v = new f(h, n);
            o.on("selectedLists.change", v.registerListsFields), v.registerListsFields(a.getSelectedLists()), v.registerCustomFields(avangpress_vars.mail.lists), window.setTimeout(function() {
                i.redraw()
            }, 2e3), g.init(p, h), window.avangpress = window.avangpress || {}, window.avangpress.forms = window.avangpress.forms || {}, window.avangpress.forms.editor = p, window.avangpress.forms.fields = h
        }, {
            "./admin/field-helper.js": 4,
            "./admin/fields-factory.js": 5,
            "./admin/fields.js": 6,
            "./admin/form-editor.js": 7,
            "./admin/form-watcher.js": 8,
            "./admin/notices": 9
        }],
        12: [function(e, r, n) {
            var i;
            i = function(e) {
                e.defineOption("autoCloseTags", !1, function(a, l, s) {
                    if (s != e.Init && s && a.removeKeyMap("autoCloseTags"), l) {
                        var c = {
                            name: "autoCloseTags"
                        };
                        ("object" != typeof l || l.whenClosing) && (c["'/'"] = function(t) {
                            return (r = t).getOption("disableInput") ? e.Pass : n(r, !0);
                            var r
                        }), ("object" != typeof l || l.whenOpening) && (c["'>'"] = function(n) {
                            return function(n) {
                                if (n.getOption("disableInput")) return e.Pass;
                                for (var a = n.listSelections(), l = [], s = 0; s < a.length; s++) {
                                    if (!a[s].empty()) return e.Pass;
                                    var c = a[s].head,
                                        u = n.getTokenAt(c),
                                        d = e.innerMode(n.getMode(), u.state),
                                        f = d.state;
                                    if ("xml" != d.mode.name || !f.tagName) return e.Pass;
                                    var h = n.getOption("autoCloseTags"),
                                        p = "html" == d.mode.configuration,
                                        m = "object" == typeof h && h.dontCloseTags || p && t,
                                        g = "object" == typeof h && h.indentTags || p && r,
                                        v = f.tagName;
                                    u.end > c.ch && (v = v.slice(0, v.length - u.end + c.ch));
                                    var y = v.toLowerCase();
                                    if (!v || "string" == u.type && (u.end != c.ch || !/[\"\']/.test(u.string.charAt(u.string.length - 1)) || 1 == u.string.length) || "tag" == u.type && "closeTag" == f.type || u.string.indexOf("/") == u.string.length - 1 || m && i(m, y) > -1 || o(n, v, c, f, !0)) return e.Pass;
                                    var b = g && i(g, y) > -1;
                                    l[s] = {
                                        indent: b,
                                        text: ">" + (b ? "\n\n" : "") + "</" + v + ">",
                                        newPos: b ? e.Pos(c.line + 1, 0) : e.Pos(c.line, c.ch + 1)
                                    }
                                }
                                for (var s = a.length - 1; s >= 0; s--) {
                                    var w = l[s];
                                    n.replaceRange(w.text, a[s].head, a[s].anchor, "+insert");
                                    var x = n.listSelections().slice(0);
                                    x[s] = {
                                        head: w.newPos,
                                        anchor: w.newPos
                                    }, n.setSelections(x), w.indent && (n.indentLine(w.newPos.line, null, !0), n.indentLine(w.newPos.line + 1, null, !0))
                                }
                            }(n)
                        }), a.addKeyMap(c)
                    }
                });
                var t = ["area", "base", "br", "col", "command", "embed", "hr", "img", "input", "keygen", "link", "meta", "param", "source", "track", "wbr"],
                    r = ["applet", "blockquote", "body", "button", "div", "dl", "fieldset", "form", "frameset", "h1", "h2", "h3", "h4", "h5", "h6", "head", "html", "iframe", "layer", "legend", "object", "ol", "p", "select", "table", "ul"];

                function n(t, r) {
                    for (var n = t.listSelections(), i = [], a = r ? "/" : "</", l = 0; l < n.length; l++) {
                        if (!n[l].empty()) return e.Pass;
                        var s, c = n[l].head,
                            u = t.getTokenAt(c),
                            d = e.innerMode(t.getMode(), u.state),
                            f = d.state;
                        if (r && ("string" == u.type || "<" != u.string.charAt(0) || u.start != c.ch - 1)) return e.Pass;
                        if ("xml" != d.mode.name)
                            if ("htmlmixed" == t.getMode().name && "javascript" == d.mode.name) s = a + "script";
                            else {
                                if ("htmlmixed" != t.getMode().name || "css" != d.mode.name) return e.Pass;
                                s = a + "style"
                            }
                        else {
                            if (!f.context || !f.context.tagName || o(t, f.context.tagName, c, f)) return e.Pass;
                            s = a + f.context.tagName
                        }
                        ">" != t.getLine(c.line).charAt(u.end) && (s += ">"), i[l] = s
                    }
                    t.replaceSelections(i), n = t.listSelections();
                    for (l = 0; l < n.length; l++)(l == n.length - 1 || n[l].head.line < n[l + 1].head.line) && t.indentLine(n[l].head.line)
                }

                function i(e, t) {
                    if (e.indexOf) return e.indexOf(t);
                    for (var r = 0, n = e.length; r < n; ++r)
                        if (e[r] == t) return r;
                    return -1
                }

                function o(t, r, n, i, o) {
                    if (!e.scanForClosingTag) return !1;
                    var a = Math.min(t.lastLine() + 1, n.line + 500),
                        l = e.scanForClosingTag(t, n, null, a);
                    if (!l || l.tag != r) return !1;
                    for (var s = i.context, c = o ? 1 : 0; s && s.tagName == r; s = s.prev) ++c;
                    n = l.to;
                    for (var u = 1; u < c; u++) {
                        var d = e.scanForClosingTag(t, n, null, a);
                        if (!d || d.tag != r) return !1;
                        n = d.to
                    }
                    return !0
                }
                e.commands.closeTag = function(e) {
                    return n(e)
                }
            }, "object" == typeof n && "object" == typeof r ? i(e("../../lib/codemirror"), e("../fold/xml-fold")) : "function" == typeof t && t.amd ? t(["../../lib/codemirror", "../fold/xml-fold"], i) : i(CodeMirror)
        }, {
            "../../lib/codemirror": 17,
            "../fold/xml-fold": 15
        }],
        13: [function(e, r, n) {
            var i;
            i = function(e) {
                var t = /MSIE \d/.test(navigator.userAgent) && (null == document.documentMode || document.documentMode < 8),
                    r = e.Pos,
                    n = {
                        "(": ")>",
                        ")": "(<",
                        "[": "]>",
                        "]": "[<",
                        "{": "}>",
                        "}": "{<"
                    };

                function i(e, t, i) {
                    var a = e.getLineHandle(t.line),
                        l = t.ch - 1,
                        s = i && i.afterCursor;
                    null == s && (s = /(^| )cm-fat-cursor($| )/.test(e.getWrapperElement().className));
                    var c = !s && l >= 0 && n[a.text.charAt(l)] || n[a.text.charAt(++l)];
                    if (!c) return null;
                    var u = ">" == c.charAt(1) ? 1 : -1;
                    if (i && i.strict && u > 0 != (l == t.ch)) return null;
                    var d = e.getTokenTypeAt(r(t.line, l + 1)),
                        f = o(e, r(t.line, l + (u > 0 ? 1 : 0)), u, d || null, i);
                    return null == f ? null : {
                        from: r(t.line, l),
                        to: f && f.pos,
                        match: f && f.ch == c.charAt(0),
                        forward: u > 0
                    }
                }

                function o(e, t, i, o, a) {
                    for (var l = a && a.maxScanLineLength || 1e4, s = a && a.maxScanLines || 1e3, c = [], u = a && a.bracketRegex ? a.bracketRegex : /[(){}[\]]/, d = i > 0 ? Math.min(t.line + s, e.lastLine() + 1) : Math.max(e.firstLine() - 1, t.line - s), f = t.line; f != d; f += i) {
                        var h = e.getLine(f);
                        if (h) {
                            var p = i > 0 ? 0 : h.length - 1,
                                m = i > 0 ? h.length : -1;
                            if (!(h.length > l))
                                for (f == t.line && (p = t.ch - (i < 0 ? 1 : 0)); p != m; p += i) {
                                    var g = h.charAt(p);
                                    if (u.test(g) && (void 0 === o || e.getTokenTypeAt(r(f, p + 1)) == o))
                                        if (">" == n[g].charAt(1) == i > 0) c.push(g);
                                        else {
                                            if (!c.length) return {
                                                pos: r(f, p),
                                                ch: g
                                            };
                                            c.pop()
                                        }
                                }
                        }
                    }
                    return f - i != (i > 0 ? e.lastLine() : e.firstLine()) && null
                }

                function a(e, n, o) {
                    for (var a = e.state.matchBrackets.maxHighlightLineLength || 1e3, l = [], s = e.listSelections(), c = 0; c < s.length; c++) {
                        var u = s[c].empty() && i(e, s[c].head, o);
                        if (u && e.getLine(u.from.line).length <= a) {
                            var d = u.match ? "CodeMirror-matchingbracket" : "CodeMirror-nonmatchingbracket";
                            l.push(e.markText(u.from, r(u.from.line, u.from.ch + 1), {
                                className: d
                            })), u.to && e.getLine(u.to.line).length <= a && l.push(e.markText(u.to, r(u.to.line, u.to.ch + 1), {
                                className: d
                            }))
                        }
                    }
                    if (l.length) {
                        t && e.state.focused && e.focus();
                        var f = function() {
                            e.operation(function() {
                                for (var e = 0; e < l.length; e++) l[e].clear()
                            })
                        };
                        if (!n) return f;
                        setTimeout(f, 800)
                    }
                }
                var l = null;

                function s(e) {
                    e.operation(function() {
                        l && (l(), l = null), l = a(e, !1, e.state.matchBrackets)
                    })
                }
                e.defineOption("matchBrackets", !1, function(t, r, n) {
                    n && n != e.Init && (t.off("cursorActivity", s), l && (l(), l = null)), r && (t.state.matchBrackets = "object" == typeof r ? r : {}, t.on("cursorActivity", s))
                }), e.defineExtension("matchBrackets", function() {
                    a(this, !0)
                }), e.defineExtension("findMatchingBracket", function(e, t, r) {
                    return (r || "boolean" == typeof t) && (r ? (r.strict = t, t = r) : t = t ? {
                        strict: !0
                    } : null), i(this, e, t)
                }), e.defineExtension("scanForBracket", function(e, t, r, n) {
                    return o(this, e, t, r, n)
                })
            }, "object" == typeof n && "object" == typeof r ? i(e("../../lib/codemirror")) : "function" == typeof t && t.amd ? t(["../../lib/codemirror"], i) : i(CodeMirror)
        }, {
            "../../lib/codemirror": 17
        }],
        14: [function(e, r, n) {
            var i;
            i = function(e) {
                "use strict";

                function t(e) {
                    e.state.tagHit && e.state.tagHit.clear(), e.state.tagOther && e.state.tagOther.clear(), e.state.tagHit = e.state.tagOther = null
                }

                function r(r) {
                    r.state.failedTagMatch = !1, r.operation(function() {
                        if (t(r), !r.somethingSelected()) {
                            var n = r.getCursor(),
                                i = r.getViewport();
                            i.from = Math.min(i.from, n.line), i.to = Math.max(n.line + 1, i.to);
                            var o = e.findMatchingTag(r, n, i);
                            if (o) {
                                if (r.state.matchBothTags) {
                                    var a = "open" == o.at ? o.open : o.close;
                                    a && (r.state.tagHit = r.markText(a.from, a.to, {
                                        className: "CodeMirror-matchingtag"
                                    }))
                                }
                                var l = "close" == o.at ? o.open : o.close;
                                l ? r.state.tagOther = r.markText(l.from, l.to, {
                                    className: "CodeMirror-matchingtag"
                                }) : r.state.failedTagMatch = !0
                            }
                        }
                    })
                }

                function n(e) {
                    e.state.failedTagMatch && r(e)
                }
                e.defineOption("matchTags", !1, function(i, o, a) {
                    a && a != e.Init && (i.off("cursorActivity", r), i.off("viewportChange", n), t(i)), o && (i.state.matchBothTags = "object" == typeof o && o.bothTags, i.on("cursorActivity", r), i.on("viewportChange", n), r(i))
                }), e.commands.toMatchingTag = function(t) {
                    var r = e.findMatchingTag(t, t.getCursor());
                    if (r) {
                        var n = "close" == r.at ? r.open : r.close;
                        n && t.extendSelection(n.to, n.from)
                    }
                }
            }, "object" == typeof n && "object" == typeof r ? i(e("../../lib/codemirror"), e("../fold/xml-fold")) : "function" == typeof t && t.amd ? t(["../../lib/codemirror", "../fold/xml-fold"], i) : i(CodeMirror)
        }, {
            "../../lib/codemirror": 17,
            "../fold/xml-fold": 15
        }],
        15: [function(e, r, n) {
            var i;
            i = function(e) {
                "use strict";
                var t = e.Pos;
                var r = "A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD",
                    n = new RegExp("<(/?)([" + r + "][A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD-:.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*)", "g");

                function i(e, t, r, n) {
                    this.line = t, this.ch = r, this.cm = e, this.text = e.getLine(t), this.min = n ? Math.max(n.from, e.firstLine()) : e.firstLine(), this.max = n ? Math.min(n.to - 1, e.lastLine()) : e.lastLine()
                }

                function o(e, r) {
                    var n = e.cm.getTokenTypeAt(t(e.line, r));
                    return n && /\btag\b/.test(n)
                }

                function a(e) {
                    if (!(e.line >= e.max)) return e.ch = 0, e.text = e.cm.getLine(++e.line), !0
                }

                function l(e) {
                    if (!(e.line <= e.min)) return e.text = e.cm.getLine(--e.line), e.ch = e.text.length, !0
                }

                function s(e) {
                    for (;;) {
                        var t = e.text.indexOf(">", e.ch);
                        if (-1 == t) {
                            if (a(e)) continue;
                            return
                        }
                        if (o(e, t + 1)) {
                            var r = e.text.lastIndexOf("/", t),
                                n = r > -1 && !/\S/.test(e.text.slice(r + 1, t));
                            return e.ch = t + 1, n ? "selfClose" : "regular"
                        }
                        e.ch = t + 1
                    }
                }

                function c(e) {
                    for (;;) {
                        var t = e.ch ? e.text.lastIndexOf("<", e.ch - 1) : -1;
                        if (-1 == t) {
                            if (l(e)) continue;
                            return
                        }
                        if (o(e, t + 1)) {
                            n.lastIndex = t, e.ch = t;
                            var r = n.exec(e.text);
                            if (r && r.index == t) return r
                        } else e.ch = t
                    }
                }

                function u(e) {
                    for (;;) {
                        n.lastIndex = e.ch;
                        var t = n.exec(e.text);
                        if (!t) {
                            if (a(e)) continue;
                            return
                        }
                        if (o(e, t.index + 1)) return e.ch = t.index + t[0].length, t;
                        e.ch = t.index + 1
                    }
                }

                function d(e) {
                    for (;;) {
                        var t = e.ch ? e.text.lastIndexOf(">", e.ch - 1) : -1;
                        if (-1 == t) {
                            if (l(e)) continue;
                            return
                        }
                        if (o(e, t + 1)) {
                            var r = e.text.lastIndexOf("/", t),
                                n = r > -1 && !/\S/.test(e.text.slice(r + 1, t));
                            return e.ch = t + 1, n ? "selfClose" : "regular"
                        }
                        e.ch = t
                    }
                }

                function f(e, r) {
                    for (var n = [];;) {
                        var i, o = u(e),
                            a = e.line,
                            l = e.ch - (o ? o[0].length : 0);
                        if (!o || !(i = s(e))) return;
                        if ("selfClose" != i)
                            if (o[1]) {
                                for (var c = n.length - 1; c >= 0; --c)
                                    if (n[c] == o[2]) {
                                        n.length = c;
                                        break
                                    }
                                if (c < 0 && (!r || r == o[2])) return {
                                    tag: o[2],
                                    from: t(a, l),
                                    to: t(e.line, e.ch)
                                }
                            } else n.push(o[2])
                    }
                }

                function h(e, r) {
                    for (var n = [];;) {
                        var i = d(e);
                        if (!i) return;
                        if ("selfClose" != i) {
                            var o = e.line,
                                a = e.ch,
                                l = c(e);
                            if (!l) return;
                            if (l[1]) n.push(l[2]);
                            else {
                                for (var s = n.length - 1; s >= 0; --s)
                                    if (n[s] == l[2]) {
                                        n.length = s;
                                        break
                                    }
                                if (s < 0 && (!r || r == l[2])) return {
                                    tag: l[2],
                                    from: t(e.line, e.ch),
                                    to: t(o, a)
                                }
                            }
                        } else c(e)
                    }
                }
                e.registerHelper("fold", "xml", function(e, r) {
                    for (var n = new i(e, r.line, 0);;) {
                        var o, a = u(n);
                        if (!a || n.line != r.line || !(o = s(n))) return;
                        if (!a[1] && "selfClose" != o) {
                            var l = t(n.line, n.ch),
                                c = f(n, a[2]);
                            return c && {
                                from: l,
                                to: c.from
                            }
                        }
                    }
                }), e.findMatchingTag = function(e, r, n) {
                    var o = new i(e, r.line, r.ch, n);
                    if (-1 != o.text.indexOf(">") || -1 != o.text.indexOf("<")) {
                        var a = s(o),
                            l = a && t(o.line, o.ch),
                            u = a && c(o);
                        if (a && u && (p = r, !(((d = o).line - p.line || d.ch - p.ch) > 0))) {
                            var d, p, m = {
                                from: t(o.line, o.ch),
                                to: l,
                                tag: u[2]
                            };
                            return "selfClose" == a ? {
                                open: m,
                                close: null,
                                at: "open"
                            } : u[1] ? {
                                open: h(o, u[2]),
                                close: m,
                                at: "close"
                            } : {
                                open: m,
                                close: f(o = new i(e, l.line, l.ch, n), u[2]),
                                at: "open"
                            }
                        }
                    }
                }, e.findEnclosingTag = function(e, t, r, n) {
                    for (var o = new i(e, t.line, t.ch, r);;) {
                        var a = h(o, n);
                        if (!a) break;
                        var l = f(new i(e, t.line, t.ch, r), a.tag);
                        if (l) return {
                            open: a,
                            close: l
                        }
                    }
                }, e.scanForClosingTag = function(e, t, r, n) {
                    return f(new i(e, t.line, t.ch, n ? {
                        from: 0,
                        to: n
                    } : null), r)
                }
            }, "object" == typeof n && "object" == typeof r ? i(e("../../lib/codemirror")) : "function" == typeof t && t.amd ? t(["../../lib/codemirror"], i) : i(CodeMirror)
        }, {
            "../../lib/codemirror": 17
        }],
        16: [function(e, r, n) {
            var i;
            i = function(e) {
                "use strict";
                var t = "CodeMirror-activeline",
                    r = "CodeMirror-activeline-background",
                    n = "CodeMirror-activeline-gutter";

                function i(e) {
                    for (var i = 0; i < e.state.activeLines.length; i++) e.removeLineClass(e.state.activeLines[i], "wrap", t), e.removeLineClass(e.state.activeLines[i], "background", r), e.removeLineClass(e.state.activeLines[i], "gutter", n)
                }

                function o(e, o) {
                    for (var a = [], l = 0; l < o.length; l++) {
                        var s = o[l],
                            c = e.getOption("styleActiveLine");
                        if ("object" == typeof c && c.nonEmpty ? s.anchor.line == s.head.line : s.empty()) {
                            var u = e.getLineHandleVisualStart(s.head.line);
                            a[a.length - 1] != u && a.push(u)
                        }
                    }(function(e, t) {
                        if (e.length != t.length) return !1;
                        for (var r = 0; r < e.length; r++)
                            if (e[r] != t[r]) return !1;
                        return !0
                    })(e.state.activeLines, a) || e.operation(function() {
                        i(e);
                        for (var o = 0; o < a.length; o++) e.addLineClass(a[o], "wrap", t), e.addLineClass(a[o], "background", r), e.addLineClass(a[o], "gutter", n);
                        e.state.activeLines = a
                    })
                }

                function a(e, t) {
                    o(e, t.ranges)
                }
                e.defineOption("styleActiveLine", !1, function(t, r, n) {
                    var l = n != e.Init && n;
                    r != l && (l && (t.off("beforeSelectionChange", a), i(t), delete t.state.activeLines), r && (t.state.activeLines = [], o(t, t.listSelections()), t.on("beforeSelectionChange", a)))
                })
            }, "object" == typeof n && "object" == typeof r ? i(e("../../lib/codemirror")) : "function" == typeof t && t.amd ? t(["../../lib/codemirror"], i) : i(CodeMirror)
        }, {
            "../../lib/codemirror": 17
        }],
        17: [function(e, r, n) {
            var i, o;
            i = this, o = function() {
                "use strict";
                var e = navigator.userAgent,
                    t = navigator.platform,
                    r = /gecko\/\d/i.test(e),
                    n = /MSIE \d/.test(e),
                    i = /Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(e),
                    o = /Edge\/(\d+)/.exec(e),
                    a = n || i || o,
                    l = a && (n ? document.documentMode || 6 : +(o || i)[1]),
                    s = !o && /WebKit\//.test(e),
                    c = s && /Qt\/\d+\.\d+/.test(e),
                    u = !o && /Chrome\//.test(e),
                    d = /Opera\//.test(e),
                    f = /Apple Computer/.test(navigator.vendor),
                    h = /Mac OS X 1\d\D([8-9]|\d\d)\D/.test(e),
                    p = /PhantomJS/.test(e),
                    m = !o && /AppleWebKit/.test(e) && /Mobile\/\w+/.test(e),
                    g = /Android/.test(e),
                    v = m || g || /webOS|BlackBerry|Opera Mini|Opera Mobi|IEMobile/i.test(e),
                    y = m || /Mac/.test(t),
                    b = /\bCrOS\b/.test(e),
                    w = /win/i.test(t),
                    x = d && e.match(/Version\/(\d*\.\d*)/);
                x && (x = Number(x[1])), x && x >= 15 && (d = !1, s = !0);
                var k = y && (c || d && (null == x || x < 12.11)),
                    C = r || a && l >= 9;

                function T(e) {
                    return new RegExp("(^|\\s)" + e + "(?:$|\\s)\\s*")
                }
                var S, L = function(e, t) {
                    var r = e.className,
                        n = T(t).exec(r);
                    if (n) {
                        var i = r.slice(n.index + n[0].length);
                        e.className = r.slice(0, n.index) + (i ? n[1] + i : "")
                    }
                };

                function M(e) {
                    for (var t = e.childNodes.length; t > 0; --t) e.removeChild(e.firstChild);
                    return e
                }

                function A(e, t) {
                    return M(e).appendChild(t)
                }

                function O(e, t, r, n) {
                    var i = document.createElement(e);
                    if (r && (i.className = r), n && (i.style.cssText = n), "string" == typeof t) i.appendChild(document.createTextNode(t));
                    else if (t)
                        for (var o = 0; o < t.length; ++o) i.appendChild(t[o]);
                    return i
                }

                function N(e, t, r, n) {
                    var i = O(e, t, r, n);
                    return i.setAttribute("role", "presentation"), i
                }

                function _(e, t) {
                    if (3 == t.nodeType && (t = t.parentNode), e.contains) return e.contains(t);
                    do {
                        if (11 == t.nodeType && (t = t.host), t == e) return !0
                    } while (t = t.parentNode)
                }

                function E() {
                    var e;
                    try {
                        e = document.activeElement
                    } catch (t) {
                        e = document.body || null
                    }
                    for (; e && e.shadowRoot && e.shadowRoot.activeElement;) e = e.shadowRoot.activeElement;
                    return e
                }

                function W(e, t) {
                    var r = e.className;
                    T(t).test(r) || (e.className += (r ? " " : "") + t)
                }

                function F(e, t) {
                    for (var r = e.split(" "), n = 0; n < r.length; n++) r[n] && !T(r[n]).test(t) && (t += " " + r[n]);
                    return t
                }
                S = document.createRange ? function(e, t, r, n) {
                    var i = document.createRange();
                    return i.setEnd(n || e, r), i.setStart(e, t), i
                } : function(e, t, r) {
                    var n = document.body.createTextRange();
                    try {
                        n.moveToElementText(e.parentNode)
                    } catch (e) {
                        return n
                    }
                    return n.collapse(!0), n.moveEnd("character", r), n.moveStart("character", t), n
                };
                var D = function(e) {
                    e.select()
                };

                function z(e) {
                    var t = Array.prototype.slice.call(arguments, 1);
                    return function() {
                        return e.apply(null, t)
                    }
                }

                function P(e, t, r) {
                    t || (t = {});
                    for (var n in e) !e.hasOwnProperty(n) || !1 === r && t.hasOwnProperty(n) || (t[n] = e[n]);
                    return t
                }

                function H(e, t, r, n, i) {
                    null == t && -1 == (t = e.search(/[^\s\u00a0]/)) && (t = e.length);
                    for (var o = n || 0, a = i || 0;;) {
                        var l = e.indexOf("\t", o);
                        if (l < 0 || l >= t) return a + (t - o);
                        a += l - o, a += r - a % r, o = l + 1
                    }
                }
                m ? D = function(e) {
                    e.selectionStart = 0, e.selectionEnd = e.value.length
                } : a && (D = function(e) {
                    try {
                        e.select()
                    } catch (e) {}
                });
                var I = function() {
                    this.id = null
                };

                function R(e, t) {
                    for (var r = 0; r < e.length; ++r)
                        if (e[r] == t) return r;
                    return -1
                }
                I.prototype.set = function(e, t) {
                    clearTimeout(this.id), this.id = setTimeout(t, e)
                };
                var j = 30,
                    B = {
                        toString: function() {
                            return "CodeMirror.Pass"
                        }
                    },
                    q = {
                        scroll: !1
                    },
                    U = {
                        origin: "*mouse"
                    },
                    K = {
                        origin: "+move"
                    };

                function V(e, t, r) {
                    for (var n = 0, i = 0;;) {
                        var o = e.indexOf("\t", n); - 1 == o && (o = e.length);
                        var a = o - n;
                        if (o == e.length || i + a >= t) return n + Math.min(a, t - i);
                        if (i += o - n, n = o + 1, (i += r - i % r) >= t) return n
                    }
                }
                var G = [""];

                function $(e) {
                    for (; G.length <= e;) G.push(Y(G) + " ");
                    return G[e]
                }

                function Y(e) {
                    return e[e.length - 1]
                }

                function X(e, t) {
                    for (var r = [], n = 0; n < e.length; n++) r[n] = t(e[n], n);
                    return r
                }

                function Z() {}

                function J(e, t) {
                    var r;
                    return Object.create ? r = Object.create(e) : (Z.prototype = e, r = new Z), t && P(t, r), r
                }
                var Q = /[\u00df\u0587\u0590-\u05f4\u0600-\u06ff\u3040-\u309f\u30a0-\u30ff\u3400-\u4db5\u4e00-\u9fcc\uac00-\ud7af]/;

                function ee(e) {
                    return /\w/.test(e) || e > "" && (e.toUpperCase() != e.toLowerCase() || Q.test(e))
                }

                function te(e, t) {
                    return t ? !!(t.source.indexOf("\\w") > -1 && ee(e)) || t.test(e) : ee(e)
                }

                function re(e) {
                    for (var t in e)
                        if (e.hasOwnProperty(t) && e[t]) return !1;
                    return !0
                }
                var ne = /[\u0300-\u036f\u0483-\u0489\u0591-\u05bd\u05bf\u05c1\u05c2\u05c4\u05c5\u05c7\u0610-\u061a\u064b-\u065e\u0670\u06d6-\u06dc\u06de-\u06e4\u06e7\u06e8\u06ea-\u06ed\u0711\u0730-\u074a\u07a6-\u07b0\u07eb-\u07f3\u0816-\u0819\u081b-\u0823\u0825-\u0827\u0829-\u082d\u0900-\u0902\u093c\u0941-\u0948\u094d\u0951-\u0955\u0962\u0963\u0981\u09bc\u09be\u09c1-\u09c4\u09cd\u09d7\u09e2\u09e3\u0a01\u0a02\u0a3c\u0a41\u0a42\u0a47\u0a48\u0a4b-\u0a4d\u0a51\u0a70\u0a71\u0a75\u0a81\u0a82\u0abc\u0ac1-\u0ac5\u0ac7\u0ac8\u0acd\u0ae2\u0ae3\u0b01\u0b3c\u0b3e\u0b3f\u0b41-\u0b44\u0b4d\u0b56\u0b57\u0b62\u0b63\u0b82\u0bbe\u0bc0\u0bcd\u0bd7\u0c3e-\u0c40\u0c46-\u0c48\u0c4a-\u0c4d\u0c55\u0c56\u0c62\u0c63\u0cbc\u0cbf\u0cc2\u0cc6\u0ccc\u0ccd\u0cd5\u0cd6\u0ce2\u0ce3\u0d3e\u0d41-\u0d44\u0d4d\u0d57\u0d62\u0d63\u0dca\u0dcf\u0dd2-\u0dd4\u0dd6\u0ddf\u0e31\u0e34-\u0e3a\u0e47-\u0e4e\u0eb1\u0eb4-\u0eb9\u0ebb\u0ebc\u0ec8-\u0ecd\u0f18\u0f19\u0f35\u0f37\u0f39\u0f71-\u0f7e\u0f80-\u0f84\u0f86\u0f87\u0f90-\u0f97\u0f99-\u0fbc\u0fc6\u102d-\u1030\u1032-\u1037\u1039\u103a\u103d\u103e\u1058\u1059\u105e-\u1060\u1071-\u1074\u1082\u1085\u1086\u108d\u109d\u135f\u1712-\u1714\u1732-\u1734\u1752\u1753\u1772\u1773\u17b7-\u17bd\u17c6\u17c9-\u17d3\u17dd\u180b-\u180d\u18a9\u1920-\u1922\u1927\u1928\u1932\u1939-\u193b\u1a17\u1a18\u1a56\u1a58-\u1a5e\u1a60\u1a62\u1a65-\u1a6c\u1a73-\u1a7c\u1a7f\u1b00-\u1b03\u1b34\u1b36-\u1b3a\u1b3c\u1b42\u1b6b-\u1b73\u1b80\u1b81\u1ba2-\u1ba5\u1ba8\u1ba9\u1c2c-\u1c33\u1c36\u1c37\u1cd0-\u1cd2\u1cd4-\u1ce0\u1ce2-\u1ce8\u1ced\u1dc0-\u1de6\u1dfd-\u1dff\u200c\u200d\u20d0-\u20f0\u2cef-\u2cf1\u2de0-\u2dff\u302a-\u302f\u3099\u309a\ua66f-\ua672\ua67c\ua67d\ua6f0\ua6f1\ua802\ua806\ua80b\ua825\ua826\ua8c4\ua8e0-\ua8f1\ua926-\ua92d\ua947-\ua951\ua980-\ua982\ua9b3\ua9b6-\ua9b9\ua9bc\uaa29-\uaa2e\uaa31\uaa32\uaa35\uaa36\uaa43\uaa4c\uaab0\uaab2-\uaab4\uaab7\uaab8\uaabe\uaabf\uaac1\uabe5\uabe8\uabed\udc00-\udfff\ufb1e\ufe00-\ufe0f\ufe20-\ufe26\uff9e\uff9f]/;

                function ie(e) {
                    return e.charCodeAt(0) >= 768 && ne.test(e)
                }

                function oe(e, t, r) {
                    for (;
                        (r < 0 ? t > 0 : t < e.length) && ie(e.charAt(t));) t += r;
                    return t
                }

                function ae(e, t, r) {
                    for (var n = t > r ? -1 : 1;;) {
                        if (t == r) return t;
                        var i = (t + r) / 2,
                            o = n < 0 ? Math.ceil(i) : Math.floor(i);
                        if (o == t) return e(o) ? t : r;
                        e(o) ? r = o : t = o + n
                    }
                }

                function le(e, t) {
                    if ((t -= e.first) < 0 || t >= e.size) throw new Error("There is no line " + (t + e.first) + " in the document.");
                    for (var r = e; !r.lines;)
                        for (var n = 0;; ++n) {
                            var i = r.children[n],
                                o = i.chunkSize();
                            if (t < o) {
                                r = i;
                                break
                            }
                            t -= o
                        }
                    return r.lines[t]
                }

                function se(e, t, r) {
                    var n = [],
                        i = t.line;
                    return e.iter(t.line, r.line + 1, function(e) {
                        var o = e.text;
                        i == r.line && (o = o.slice(0, r.ch)), i == t.line && (o = o.slice(t.ch)), n.push(o), ++i
                    }), n
                }

                function ce(e, t, r) {
                    var n = [];
                    return e.iter(t, r, function(e) {
                        n.push(e.text)
                    }), n
                }

                function ue(e, t) {
                    var r = t - e.height;
                    if (r)
                        for (var n = e; n; n = n.parent) n.height += r
                }

                function de(e) {
                    if (null == e.parent) return null;
                    for (var t = e.parent, r = R(t.lines, e), n = t.parent; n; t = n, n = n.parent)
                        for (var i = 0; n.children[i] != t; ++i) r += n.children[i].chunkSize();
                    return r + t.first
                }

                function fe(e, t) {
                    var r = e.first;
                    e: do {
                        for (var n = 0; n < e.children.length; ++n) {
                            var i = e.children[n],
                                o = i.height;
                            if (t < o) {
                                e = i;
                                continue e
                            }
                            t -= o, r += i.chunkSize()
                        }
                        return r
                    } while (!e.lines);
                    for (var a = 0; a < e.lines.length; ++a) {
                        var l = e.lines[a].height;
                        if (t < l) break;
                        t -= l
                    }
                    return r + a
                }

                function he(e, t) {
                    return t >= e.first && t < e.first + e.size
                }

                function pe(e, t) {
                    return String(e.lineNumberFormatter(t + e.firstLineNumber))
                }

                function me(e, t, r) {
                    if (void 0 === r && (r = null), !(this instanceof me)) return new me(e, t, r);
                    this.line = e, this.ch = t, this.sticky = r
                }

                function ge(e, t) {
                    return e.line - t.line || e.ch - t.ch
                }

                function ve(e, t) {
                    return e.sticky == t.sticky && 0 == ge(e, t)
                }

                function ye(e) {
                    return me(e.line, e.ch)
                }

                function be(e, t) {
                    return ge(e, t) < 0 ? t : e
                }

                function we(e, t) {
                    return ge(e, t) < 0 ? e : t
                }

                function xe(e, t) {
                    return Math.max(e.first, Math.min(t, e.first + e.size - 1))
                }

                function ke(e, t) {
                    if (t.line < e.first) return me(e.first, 0);
                    var r, n, i, o = e.first + e.size - 1;
                    return t.line > o ? me(o, le(e, o).text.length) : (r = t, n = le(e, t.line).text.length, null == (i = r.ch) || i > n ? me(r.line, n) : i < 0 ? me(r.line, 0) : r)
                }

                function Ce(e, t) {
                    for (var r = [], n = 0; n < t.length; n++) r[n] = ke(e, t[n]);
                    return r
                }
                var Te = !1,
                    Se = !1;

                function Le(e, t, r) {
                    this.marker = e, this.from = t, this.to = r
                }

                function Me(e, t) {
                    if (e)
                        for (var r = 0; r < e.length; ++r) {
                            var n = e[r];
                            if (n.marker == t) return n
                        }
                }

                function Ae(e, t) {
                    for (var r, n = 0; n < e.length; ++n) e[n] != t && (r || (r = [])).push(e[n]);
                    return r
                }

                function Oe(e, t) {
                    if (t.full) return null;
                    var r = he(e, t.from.line) && le(e, t.from.line).markedSpans,
                        n = he(e, t.to.line) && le(e, t.to.line).markedSpans;
                    if (!r && !n) return null;
                    var i = t.from.ch,
                        o = t.to.ch,
                        a = 0 == ge(t.from, t.to),
                        l = function(e, t, r) {
                            var n;
                            if (e)
                                for (var i = 0; i < e.length; ++i) {
                                    var o = e[i],
                                        a = o.marker;
                                    if (null == o.from || (a.inclusiveLeft ? o.from <= t : o.from < t) || o.from == t && "bookmark" == a.type && (!r || !o.marker.insertLeft)) {
                                        var l = null == o.to || (a.inclusiveRight ? o.to >= t : o.to > t);
                                        (n || (n = [])).push(new Le(a, o.from, l ? null : o.to))
                                    }
                                }
                            return n
                        }(r, i, a),
                        s = function(e, t, r) {
                            var n;
                            if (e)
                                for (var i = 0; i < e.length; ++i) {
                                    var o = e[i],
                                        a = o.marker;
                                    if (null == o.to || (a.inclusiveRight ? o.to >= t : o.to > t) || o.from == t && "bookmark" == a.type && (!r || o.marker.insertLeft)) {
                                        var l = null == o.from || (a.inclusiveLeft ? o.from <= t : o.from < t);
                                        (n || (n = [])).push(new Le(a, l ? null : o.from - t, null == o.to ? null : o.to - t))
                                    }
                                }
                            return n
                        }(n, o, a),
                        c = 1 == t.text.length,
                        u = Y(t.text).length + (c ? i : 0);
                    if (l)
                        for (var d = 0; d < l.length; ++d) {
                            var f = l[d];
                            if (null == f.to) {
                                var h = Me(s, f.marker);
                                h ? c && (f.to = null == h.to ? null : h.to + u) : f.to = i
                            }
                        }
                    if (s)
                        for (var p = 0; p < s.length; ++p) {
                            var m = s[p];
                            if (null != m.to && (m.to += u), null == m.from) Me(l, m.marker) || (m.from = u, c && (l || (l = [])).push(m));
                            else m.from += u, c && (l || (l = [])).push(m)
                        }
                    l && (l = Ne(l)), s && s != l && (s = Ne(s));
                    var g = [l];
                    if (!c) {
                        var v, y = t.text.length - 2;
                        if (y > 0 && l)
                            for (var b = 0; b < l.length; ++b) null == l[b].to && (v || (v = [])).push(new Le(l[b].marker, null, null));
                        for (var w = 0; w < y; ++w) g.push(v);
                        g.push(s)
                    }
                    return g
                }

                function Ne(e) {
                    for (var t = 0; t < e.length; ++t) {
                        var r = e[t];
                        null != r.from && r.from == r.to && !1 !== r.marker.clearWhenEmpty && e.splice(t--, 1)
                    }
                    return e.length ? e : null
                }

                function _e(e) {
                    var t = e.markedSpans;
                    if (t) {
                        for (var r = 0; r < t.length; ++r) t[r].marker.detachLine(e);
                        e.markedSpans = null
                    }
                }

                function Ee(e, t) {
                    if (t) {
                        for (var r = 0; r < t.length; ++r) t[r].marker.attachLine(e);
                        e.markedSpans = t
                    }
                }

                function We(e) {
                    return e.inclusiveLeft ? -1 : 0
                }

                function Fe(e) {
                    return e.inclusiveRight ? 1 : 0
                }

                function De(e, t) {
                    var r = e.lines.length - t.lines.length;
                    if (0 != r) return r;
                    var n = e.find(),
                        i = t.find(),
                        o = ge(n.from, i.from) || We(e) - We(t);
                    if (o) return -o;
                    var a = ge(n.to, i.to) || Fe(e) - Fe(t);
                    return a || t.id - e.id
                }

                function ze(e, t) {
                    var r, n = Se && e.markedSpans;
                    if (n)
                        for (var i = void 0, o = 0; o < n.length; ++o)(i = n[o]).marker.collapsed && null == (t ? i.from : i.to) && (!r || De(r, i.marker) < 0) && (r = i.marker);
                    return r
                }

                function Pe(e) {
                    return ze(e, !0)
                }

                function He(e) {
                    return ze(e, !1)
                }

                function Ie(e, t, r, n, i) {
                    var o = le(e, t),
                        a = Se && o.markedSpans;
                    if (a)
                        for (var l = 0; l < a.length; ++l) {
                            var s = a[l];
                            if (s.marker.collapsed) {
                                var c = s.marker.find(0),
                                    u = ge(c.from, r) || We(s.marker) - We(i),
                                    d = ge(c.to, n) || Fe(s.marker) - Fe(i);
                                if (!(u >= 0 && d <= 0 || u <= 0 && d >= 0) && (u <= 0 && (s.marker.inclusiveRight && i.inclusiveLeft ? ge(c.to, r) >= 0 : ge(c.to, r) > 0) || u >= 0 && (s.marker.inclusiveRight && i.inclusiveLeft ? ge(c.from, n) <= 0 : ge(c.from, n) < 0))) return !0
                            }
                        }
                }

                function Re(e) {
                    for (var t; t = Pe(e);) e = t.find(-1, !0).line;
                    return e
                }

                function je(e, t) {
                    var r = le(e, t),
                        n = Re(r);
                    return r == n ? t : de(n)
                }

                function Be(e, t) {
                    if (t > e.lastLine()) return t;
                    var r, n = le(e, t);
                    if (!qe(e, n)) return t;
                    for (; r = He(n);) n = r.find(1, !0).line;
                    return de(n) + 1
                }

                function qe(e, t) {
                    var r = Se && t.markedSpans;
                    if (r)
                        for (var n = void 0, i = 0; i < r.length; ++i)
                            if ((n = r[i]).marker.collapsed) {
                                if (null == n.from) return !0;
                                if (!n.marker.widgetNode && 0 == n.from && n.marker.inclusiveLeft && Ue(e, t, n)) return !0
                            }
                }

                function Ue(e, t, r) {
                    if (null == r.to) {
                        var n = r.marker.find(1, !0);
                        return Ue(e, n.line, Me(n.line.markedSpans, r.marker))
                    }
                    if (r.marker.inclusiveRight && r.to == t.text.length) return !0;
                    for (var i = void 0, o = 0; o < t.markedSpans.length; ++o)
                        if ((i = t.markedSpans[o]).marker.collapsed && !i.marker.widgetNode && i.from == r.to && (null == i.to || i.to != r.from) && (i.marker.inclusiveLeft || r.marker.inclusiveRight) && Ue(e, t, i)) return !0
                }

                function Ke(e) {
                    for (var t = 0, r = (e = Re(e)).parent, n = 0; n < r.lines.length; ++n) {
                        var i = r.lines[n];
                        if (i == e) break;
                        t += i.height
                    }
                    for (var o = r.parent; o; o = (r = o).parent)
                        for (var a = 0; a < o.children.length; ++a) {
                            var l = o.children[a];
                            if (l == r) break;
                            t += l.height
                        }
                    return t
                }

                function Ve(e) {
                    if (0 == e.height) return 0;
                    for (var t, r = e.text.length, n = e; t = Pe(n);) {
                        var i = t.find(0, !0);
                        n = i.from.line, r += i.from.ch - i.to.ch
                    }
                    for (n = e; t = He(n);) {
                        var o = t.find(0, !0);
                        r -= n.text.length - o.from.ch, r += (n = o.to.line).text.length - o.to.ch
                    }
                    return r
                }

                function Ge(e) {
                    var t = e.display,
                        r = e.doc;
                    t.maxLine = le(r, r.first), t.maxLineLength = Ve(t.maxLine), t.maxLineChanged = !0, r.iter(function(e) {
                        var r = Ve(e);
                        r > t.maxLineLength && (t.maxLineLength = r, t.maxLine = e)
                    })
                }
                var $e = null;

                function Ye(e, t, r) {
                    var n;
                    $e = null;
                    for (var i = 0; i < e.length; ++i) {
                        var o = e[i];
                        if (o.from < t && o.to > t) return i;
                        o.to == t && (o.from != o.to && "before" == r ? n = i : $e = i), o.from == t && (o.from != o.to && "before" != r ? n = i : $e = i)
                    }
                    return null != n ? n : $e
                }
                var Xe = function() {
                    var e = "bbbbbbbbbtstwsbbbbbbbbbbbbbbssstwNN%%%NNNNNN,N,N1111111111NNNNNNNLLLLLLLLLLLLLLLLLLLLLLLLLLNNNNNNLLLLLLLLLLLLLLLLLLLLLLLLLLNNNNbbbbbbsbbbbbbbbbbbbbbbbbbbbbbbbbb,N%%%%NNNNLNNNNN%%11NLNNN1LNNNNNLLLLLLLLLLLLLLLLLLLLLLLNLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLN",
                        t = "nnnnnnNNr%%r,rNNmmmmmmmmmmmrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrmmmmmmmmmmmmmmmmmmmmmnnnnnnnnnn%nnrrrmrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrmmmmmmmnNmmmmmmrrmmNmmmmrr1111111111";
                    var r = /[\u0590-\u05f4\u0600-\u06ff\u0700-\u08ac]/,
                        n = /[stwN]/,
                        i = /[LRr]/,
                        o = /[Lb1n]/,
                        a = /[1n]/;

                    function l(e, t, r) {
                        this.level = e, this.from = t, this.to = r
                    }
                    return function(s, c) {
                        var u = "ltr" == c ? "L" : "R";
                        if (0 == s.length || "ltr" == c && !r.test(s)) return !1;
                        for (var d, f = s.length, h = [], p = 0; p < f; ++p) h.push((d = s.charCodeAt(p)) <= 247 ? e.charAt(d) : 1424 <= d && d <= 1524 ? "R" : 1536 <= d && d <= 1785 ? t.charAt(d - 1536) : 1774 <= d && d <= 2220 ? "r" : 8192 <= d && d <= 8203 ? "w" : 8204 == d ? "b" : "L");
                        for (var m = 0, g = u; m < f; ++m) {
                            var v = h[m];
                            "m" == v ? h[m] = g : g = v
                        }
                        for (var y = 0, b = u; y < f; ++y) {
                            var w = h[y];
                            "1" == w && "r" == b ? h[y] = "n" : i.test(w) && (b = w, "r" == w && (h[y] = "R"))
                        }
                        for (var x = 1, k = h[0]; x < f - 1; ++x) {
                            var C = h[x];
                            "+" == C && "1" == k && "1" == h[x + 1] ? h[x] = "1" : "," != C || k != h[x + 1] || "1" != k && "n" != k || (h[x] = k), k = C
                        }
                        for (var T = 0; T < f; ++T) {
                            var S = h[T];
                            if ("," == S) h[T] = "N";
                            else if ("%" == S) {
                                var L = void 0;
                                for (L = T + 1; L < f && "%" == h[L]; ++L);
                                for (var M = T && "!" == h[T - 1] || L < f && "1" == h[L] ? "1" : "N", A = T; A < L; ++A) h[A] = M;
                                T = L - 1
                            }
                        }
                        for (var O = 0, N = u; O < f; ++O) {
                            var _ = h[O];
                            "L" == N && "1" == _ ? h[O] = "L" : i.test(_) && (N = _)
                        }
                        for (var E = 0; E < f; ++E)
                            if (n.test(h[E])) {
                                var W = void 0;
                                for (W = E + 1; W < f && n.test(h[W]); ++W);
                                for (var F = "L" == (E ? h[E - 1] : u), D = F == ("L" == (W < f ? h[W] : u)) ? F ? "L" : "R" : u, z = E; z < W; ++z) h[z] = D;
                                E = W - 1
                            }
                        for (var P, H = [], I = 0; I < f;)
                            if (o.test(h[I])) {
                                var R = I;
                                for (++I; I < f && o.test(h[I]); ++I);
                                H.push(new l(0, R, I))
                            } else {
                                var j = I,
                                    B = H.length;
                                for (++I; I < f && "L" != h[I]; ++I);
                                for (var q = j; q < I;)
                                    if (a.test(h[q])) {
                                        j < q && H.splice(B, 0, new l(1, j, q));
                                        var U = q;
                                        for (++q; q < I && a.test(h[q]); ++q);
                                        H.splice(B, 0, new l(2, U, q)), j = q
                                    } else ++q;
                                j < I && H.splice(B, 0, new l(1, j, I))
                            }
                        return "ltr" == c && (1 == H[0].level && (P = s.match(/^\s+/)) && (H[0].from = P[0].length, H.unshift(new l(0, 0, P[0].length))), 1 == Y(H).level && (P = s.match(/\s+$/)) && (Y(H).to -= P[0].length, H.push(new l(0, f - P[0].length, f)))), "rtl" == c ? H.reverse() : H
                    }
                }();

                function Ze(e, t) {
                    var r = e.order;
                    return null == r && (r = e.order = Xe(e.text, t)), r
                }
                var Je = [],
                    Qe = function(e, t, r) {
                        if (e.addEventListener) e.addEventListener(t, r, !1);
                        else if (e.attachEvent) e.attachEvent("on" + t, r);
                        else {
                            var n = e._handlers || (e._handlers = {});
                            n[t] = (n[t] || Je).concat(r)
                        }
                    };

                function et(e, t) {
                    return e._handlers && e._handlers[t] || Je
                }

                function tt(e, t, r) {
                    if (e.removeEventListener) e.removeEventListener(t, r, !1);
                    else if (e.detachEvent) e.detachEvent("on" + t, r);
                    else {
                        var n = e._handlers,
                            i = n && n[t];
                        if (i) {
                            var o = R(i, r);
                            o > -1 && (n[t] = i.slice(0, o).concat(i.slice(o + 1)))
                        }
                    }
                }

                function rt(e, t) {
                    var r = et(e, t);
                    if (r.length)
                        for (var n = Array.prototype.slice.call(arguments, 2), i = 0; i < r.length; ++i) r[i].apply(null, n)
                }

                function nt(e, t, r) {
                    return "string" == typeof t && (t = {
                        type: t,
                        preventDefault: function() {
                            this.defaultPrevented = !0
                        }
                    }), rt(e, r || t.type, e, t), ct(t) || t.codemirrorIgnore
                }

                function it(e) {
                    var t = e._handlers && e._handlers.cursorActivity;
                    if (t)
                        for (var r = e.curOp.cursorActivityHandlers || (e.curOp.cursorActivityHandlers = []), n = 0; n < t.length; ++n) - 1 == R(r, t[n]) && r.push(t[n])
                }

                function ot(e, t) {
                    return et(e, t).length > 0
                }

                function at(e) {
                    e.prototype.on = function(e, t) {
                        Qe(this, e, t)
                    }, e.prototype.off = function(e, t) {
                        tt(this, e, t)
                    }
                }

                function lt(e) {
                    e.preventDefault ? e.preventDefault() : e.returnValue = !1
                }

                function st(e) {
                    e.stopPropagation ? e.stopPropagation() : e.cancelBubble = !0
                }

                function ct(e) {
                    return null != e.defaultPrevented ? e.defaultPrevented : 0 == e.returnValue
                }

                function ut(e) {
                    lt(e), st(e)
                }

                function dt(e) {
                    return e.target || e.srcElement
                }

                function ft(e) {
                    var t = e.which;
                    return null == t && (1 & e.button ? t = 1 : 2 & e.button ? t = 3 : 4 & e.button && (t = 2)), y && e.ctrlKey && 1 == t && (t = 3), t
                }
                var ht, pt, mt = function() {
                    if (a && l < 9) return !1;
                    var e = O("div");
                    return "draggable" in e || "dragDrop" in e
                }();

                function gt(e) {
                    if (null == ht) {
                        var t = O("span", "​");
                        A(e, O("span", [t, document.createTextNode("x")])), 0 != e.firstChild.offsetHeight && (ht = t.offsetWidth <= 1 && t.offsetHeight > 2 && !(a && l < 8))
                    }
                    var r = ht ? O("span", "​") : O("span", " ", null, "display: inline-block; width: 1px; margin-right: -1px");
                    return r.setAttribute("cm-text", ""), r
                }

                function vt(e) {
                    if (null != pt) return pt;
                    var t = A(e, document.createTextNode("AخA")),
                        r = S(t, 0, 1).getBoundingClientRect(),
                        n = S(t, 1, 2).getBoundingClientRect();
                    return M(e), !(!r || r.left == r.right) && (pt = n.right - r.right < 3)
                }
                var yt, bt = 3 != "\n\nb".split(/\n/).length ? function(e) {
                        for (var t = 0, r = [], n = e.length; t <= n;) {
                            var i = e.indexOf("\n", t); - 1 == i && (i = e.length);
                            var o = e.slice(t, "\r" == e.charAt(i - 1) ? i - 1 : i),
                                a = o.indexOf("\r"); - 1 != a ? (r.push(o.slice(0, a)), t += a + 1) : (r.push(o), t = i + 1)
                        }
                        return r
                    } : function(e) {
                        return e.split(/\r\n?|\n/)
                    },
                    wt = window.getSelection ? function(e) {
                        try {
                            return e.selectionStart != e.selectionEnd
                        } catch (e) {
                            return !1
                        }
                    } : function(e) {
                        var t;
                        try {
                            t = e.ownerDocument.selection.createRange()
                        } catch (e) {}
                        return !(!t || t.parentElement() != e) && 0 != t.compareEndPoints("StartToEnd", t)
                    },
                    xt = "oncopy" in (yt = O("div")) || (yt.setAttribute("oncopy", "return;"), "function" == typeof yt.oncopy),
                    kt = null;
                var Ct = {},
                    Tt = {};

                function St(e) {
                    if ("string" == typeof e && Tt.hasOwnProperty(e)) e = Tt[e];
                    else if (e && "string" == typeof e.name && Tt.hasOwnProperty(e.name)) {
                        var t = Tt[e.name];
                        "string" == typeof t && (t = {
                            name: t
                        }), (e = J(t, e)).name = t.name
                    } else {
                        if ("string" == typeof e && /^[\w\-]+\/[\w\-]+\+xml$/.test(e)) return St("application/xml");
                        if ("string" == typeof e && /^[\w\-]+\/[\w\-]+\+json$/.test(e)) return St("application/json")
                    }
                    return "string" == typeof e ? {
                        name: e
                    } : e || {
                        name: "null"
                    }
                }

                function Lt(e, t) {
                    t = St(t);
                    var r = Ct[t.name];
                    if (!r) return Lt(e, "text/plain");
                    var n = r(e, t);
                    if (Mt.hasOwnProperty(t.name)) {
                        var i = Mt[t.name];
                        for (var o in i) i.hasOwnProperty(o) && (n.hasOwnProperty(o) && (n["_" + o] = n[o]), n[o] = i[o])
                    }
                    if (n.name = t.name, t.helperType && (n.helperType = t.helperType), t.modeProps)
                        for (var a in t.modeProps) n[a] = t.modeProps[a];
                    return n
                }
                var Mt = {};

                function At(e, t) {
                    P(t, Mt.hasOwnProperty(e) ? Mt[e] : Mt[e] = {})
                }

                function Ot(e, t) {
                    if (!0 === t) return t;
                    if (e.copyState) return e.copyState(t);
                    var r = {};
                    for (var n in t) {
                        var i = t[n];
                        i instanceof Array && (i = i.concat([])), r[n] = i
                    }
                    return r
                }

                function Nt(e, t) {
                    for (var r; e.innerMode && (r = e.innerMode(t)) && r.mode != e;) t = r.state, e = r.mode;
                    return r || {
                        mode: e,
                        state: t
                    }
                }

                function _t(e, t, r) {
                    return !e.startState || e.startState(t, r)
                }
                var Et = function(e, t, r) {
                    this.pos = this.start = 0, this.string = e, this.tabSize = t || 8, this.lastColumnPos = this.lastColumnValue = 0, this.lineStart = 0, this.lineOracle = r
                };
                Et.prototype.eol = function() {
                    return this.pos >= this.string.length
                }, Et.prototype.sol = function() {
                    return this.pos == this.lineStart
                }, Et.prototype.peek = function() {
                    return this.string.charAt(this.pos) || void 0
                }, Et.prototype.next = function() {
                    if (this.pos < this.string.length) return this.string.charAt(this.pos++)
                }, Et.prototype.eat = function(e) {
                    var t = this.string.charAt(this.pos);
                    if ("string" == typeof e ? t == e : t && (e.test ? e.test(t) : e(t))) return ++this.pos, t
                }, Et.prototype.eatWhile = function(e) {
                    for (var t = this.pos; this.eat(e););
                    return this.pos > t
                }, Et.prototype.eatSpace = function() {
                    for (var e = this.pos;
                        /[\s\u00a0]/.test(this.string.charAt(this.pos));) ++this.pos;
                    return this.pos > e
                }, Et.prototype.skipToEnd = function() {
                    this.pos = this.string.length
                }, Et.prototype.skipTo = function(e) {
                    var t = this.string.indexOf(e, this.pos);
                    if (t > -1) return this.pos = t, !0
                }, Et.prototype.backUp = function(e) {
                    this.pos -= e
                }, Et.prototype.column = function() {
                    return this.lastColumnPos < this.start && (this.lastColumnValue = H(this.string, this.start, this.tabSize, this.lastColumnPos, this.lastColumnValue), this.lastColumnPos = this.start), this.lastColumnValue - (this.lineStart ? H(this.string, this.lineStart, this.tabSize) : 0)
                }, Et.prototype.indentation = function() {
                    return H(this.string, null, this.tabSize) - (this.lineStart ? H(this.string, this.lineStart, this.tabSize) : 0)
                }, Et.prototype.match = function(e, t, r) {
                    if ("string" != typeof e) {
                        var n = this.string.slice(this.pos).match(e);
                        return n && n.index > 0 ? null : (n && !1 !== t && (this.pos += n[0].length), n)
                    }
                    var i = function(e) {
                        return r ? e.toLowerCase() : e
                    };
                    if (i(this.string.substr(this.pos, e.length)) == i(e)) return !1 !== t && (this.pos += e.length), !0
                }, Et.prototype.current = function() {
                    return this.string.slice(this.start, this.pos)
                }, Et.prototype.hideFirstChars = function(e, t) {
                    this.lineStart += e;
                    try {
                        return t()
                    } finally {
                        this.lineStart -= e
                    }
                }, Et.prototype.lookAhead = function(e) {
                    var t = this.lineOracle;
                    return t && t.lookAhead(e)
                }, Et.prototype.baseToken = function() {
                    var e = this.lineOracle;
                    return e && e.baseToken(this.pos)
                };
                var Wt = function(e, t) {
                        this.state = e, this.lookAhead = t
                    },
                    Ft = function(e, t, r, n) {
                        this.state = t, this.doc = e, this.line = r, this.maxLookAhead = n || 0, this.baseTokens = null, this.baseTokenPos = 1
                    };

                function Dt(e, t, r, n) {
                    var i = [e.state.modeGen],
                        o = {};
                    Ut(e, t.text, e.doc.mode, r, function(e, t) {
                        return i.push(e, t)
                    }, o, n);
                    for (var a = r.state, l = function(n) {
                            r.baseTokens = i;
                            var l = e.state.overlays[n],
                                s = 1,
                                c = 0;
                            r.state = !0, Ut(e, t.text, l.mode, r, function(e, t) {
                                for (var r = s; c < e;) {
                                    var n = i[s];
                                    n > e && i.splice(s, 1, e, i[s + 1], n), s += 2, c = Math.min(e, n)
                                }
                                if (t)
                                    if (l.opaque) i.splice(r, s - r, e, "overlay " + t), s = r + 2;
                                    else
                                        for (; r < s; r += 2) {
                                            var o = i[r + 1];
                                            i[r + 1] = (o ? o + " " : "") + "overlay " + t
                                        }
                            }, o), r.state = a, r.baseTokens = null, r.baseTokenPos = 1
                        }, s = 0; s < e.state.overlays.length; ++s) l(s);
                    return {
                        styles: i,
                        classes: o.bgClass || o.textClass ? o : null
                    }
                }

                function zt(e, t, r) {
                    if (!t.styles || t.styles[0] != e.state.modeGen) {
                        var n = Pt(e, de(t)),
                            i = t.text.length > e.options.maxHighlightLength && Ot(e.doc.mode, n.state),
                            o = Dt(e, t, n);
                        i && (n.state = i), t.stateAfter = n.save(!i), t.styles = o.styles, o.classes ? t.styleClasses = o.classes : t.styleClasses && (t.styleClasses = null), r === e.doc.highlightFrontier && (e.doc.modeFrontier = Math.max(e.doc.modeFrontier, ++e.doc.highlightFrontier))
                    }
                    return t.styles
                }

                function Pt(e, t, r) {
                    var n = e.doc,
                        i = e.display;
                    if (!n.mode.startState) return new Ft(n, !0, t);
                    var o = function(e, t, r) {
                            for (var n, i, o = e.doc, a = r ? -1 : t - (e.doc.mode.innerMode ? 1e3 : 100), l = t; l > a; --l) {
                                if (l <= o.first) return o.first;
                                var s = le(o, l - 1),
                                    c = s.stateAfter;
                                if (c && (!r || l + (c instanceof Wt ? c.lookAhead : 0) <= o.modeFrontier)) return l;
                                var u = H(s.text, null, e.options.tabSize);
                                (null == i || n > u) && (i = l - 1, n = u)
                            }
                            return i
                        }(e, t, r),
                        a = o > n.first && le(n, o - 1).stateAfter,
                        l = a ? Ft.fromSaved(n, a, o) : new Ft(n, _t(n.mode), o);
                    return n.iter(o, t, function(r) {
                        Ht(e, r.text, l);
                        var n = l.line;
                        r.stateAfter = n == t - 1 || n % 5 == 0 || n >= i.viewFrom && n < i.viewTo ? l.save() : null, l.nextLine()
                    }), r && (n.modeFrontier = l.line), l
                }

                function Ht(e, t, r, n) {
                    var i = e.doc.mode,
                        o = new Et(t, e.options.tabSize, r);
                    for (o.start = o.pos = n || 0, "" == t && It(i, r.state); !o.eol();) Rt(i, o, r.state), o.start = o.pos
                }

                function It(e, t) {
                    if (e.blankLine) return e.blankLine(t);
                    if (e.innerMode) {
                        var r = Nt(e, t);
                        return r.mode.blankLine ? r.mode.blankLine(r.state) : void 0
                    }
                }

                function Rt(e, t, r, n) {
                    for (var i = 0; i < 10; i++) {
                        n && (n[0] = Nt(e, r).mode);
                        var o = e.token(t, r);
                        if (t.pos > t.start) return o
                    }
                    throw new Error("Mode " + e.name + " failed to advance stream.")
                }
                Ft.prototype.lookAhead = function(e) {
                    var t = this.doc.getLine(this.line + e);
                    return null != t && e > this.maxLookAhead && (this.maxLookAhead = e), t
                }, Ft.prototype.baseToken = function(e) {
                    if (!this.baseTokens) return null;
                    for (; this.baseTokens[this.baseTokenPos] <= e;) this.baseTokenPos += 2;
                    var t = this.baseTokens[this.baseTokenPos + 1];
                    return {
                        type: t && t.replace(/( |^)overlay .*/, ""),
                        size: this.baseTokens[this.baseTokenPos] - e
                    }
                }, Ft.prototype.nextLine = function() {
                    this.line++, this.maxLookAhead > 0 && this.maxLookAhead--
                }, Ft.fromSaved = function(e, t, r) {
                    return t instanceof Wt ? new Ft(e, Ot(e.mode, t.state), r, t.lookAhead) : new Ft(e, Ot(e.mode, t), r)
                }, Ft.prototype.save = function(e) {
                    var t = !1 !== e ? Ot(this.doc.mode, this.state) : this.state;
                    return this.maxLookAhead > 0 ? new Wt(t, this.maxLookAhead) : t
                };
                var jt = function(e, t, r) {
                    this.start = e.start, this.end = e.pos, this.string = e.current(), this.type = t || null, this.state = r
                };

                function Bt(e, t, r, n) {
                    var i, o, a = e.doc,
                        l = a.mode,
                        s = le(a, (t = ke(a, t)).line),
                        c = Pt(e, t.line, r),
                        u = new Et(s.text, e.options.tabSize, c);
                    for (n && (o = []);
                        (n || u.pos < t.ch) && !u.eol();) u.start = u.pos, i = Rt(l, u, c.state), n && o.push(new jt(u, i, Ot(a.mode, c.state)));
                    return n ? o : new jt(u, i, c.state)
                }

                function qt(e, t) {
                    if (e)
                        for (;;) {
                            var r = e.match(/(?:^|\s+)line-(background-)?(\S+)/);
                            if (!r) break;
                            e = e.slice(0, r.index) + e.slice(r.index + r[0].length);
                            var n = r[1] ? "bgClass" : "textClass";
                            null == t[n] ? t[n] = r[2] : new RegExp("(?:^|s)" + r[2] + "(?:$|s)").test(t[n]) || (t[n] += " " + r[2])
                        }
                    return e
                }

                function Ut(e, t, r, n, i, o, a) {
                    var l = r.flattenSpans;
                    null == l && (l = e.options.flattenSpans);
                    var s, c = 0,
                        u = null,
                        d = new Et(t, e.options.tabSize, n),
                        f = e.options.addModeClass && [null];
                    for ("" == t && qt(It(r, n.state), o); !d.eol();) {
                        if (d.pos > e.options.maxHighlightLength ? (l = !1, a && Ht(e, t, n, d.pos), d.pos = t.length, s = null) : s = qt(Rt(r, d, n.state, f), o), f) {
                            var h = f[0].name;
                            h && (s = "m-" + (s ? h + " " + s : h))
                        }
                        if (!l || u != s) {
                            for (; c < d.start;) i(c = Math.min(d.start, c + 5e3), u);
                            u = s
                        }
                        d.start = d.pos
                    }
                    for (; c < d.pos;) {
                        var p = Math.min(d.pos, c + 5e3);
                        i(p, u), c = p
                    }
                }
                var Kt = function(e, t, r) {
                    this.text = e, Ee(this, t), this.height = r ? r(this) : 1
                };
                Kt.prototype.lineNo = function() {
                    return de(this)
                }, at(Kt);
                var Vt = {},
                    Gt = {};

                function $t(e, t) {
                    if (!e || /^\s*$/.test(e)) return null;
                    var r = t.addModeClass ? Gt : Vt;
                    return r[e] || (r[e] = e.replace(/\S+/g, "cm-$&"))
                }

                function Yt(e, t) {
                    var r = N("span", null, null, s ? "padding-right: .1px" : null),
                        n = {
                            pre: N("pre", [r], "CodeMirror-line"),
                            content: r,
                            col: 0,
                            pos: 0,
                            cm: e,
                            trailingSpace: !1,
                            splitSpaces: (a || s) && e.getOption("lineWrapping")
                        };
                    t.measure = {};
                    for (var i = 0; i <= (t.rest ? t.rest.length : 0); i++) {
                        var o = i ? t.rest[i - 1] : t.line,
                            l = void 0;
                        n.pos = 0, n.addToken = Zt, vt(e.display.measure) && (l = Ze(o, e.doc.direction)) && (n.addToken = Jt(n.addToken, l)), n.map = [], er(o, n, zt(e, o, t != e.display.externalMeasured && de(o))), o.styleClasses && (o.styleClasses.bgClass && (n.bgClass = F(o.styleClasses.bgClass, n.bgClass || "")), o.styleClasses.textClass && (n.textClass = F(o.styleClasses.textClass, n.textClass || ""))), 0 == n.map.length && n.map.push(0, 0, n.content.appendChild(gt(e.display.measure))), 0 == i ? (t.measure.map = n.map, t.measure.cache = {}) : ((t.measure.maps || (t.measure.maps = [])).push(n.map), (t.measure.caches || (t.measure.caches = [])).push({}))
                    }
                    if (s) {
                        var c = n.content.lastChild;
                        (/\bcm-tab\b/.test(c.className) || c.querySelector && c.querySelector(".cm-tab")) && (n.content.className = "cm-tab-wrap-hack")
                    }
                    return rt(e, "renderLine", e, t.line, n.pre), n.pre.className && (n.textClass = F(n.pre.className, n.textClass || "")), n
                }

                function Xt(e) {
                    var t = O("span", "•", "cm-invalidchar");
                    return t.title = "\\u" + e.charCodeAt(0).toString(16), t.setAttribute("aria-label", t.title), t
                }

                function Zt(e, t, r, n, i, o, s) {
                    if (t) {
                        var c, u = e.splitSpaces ? function(e, t) {
                                if (e.length > 1 && !/  /.test(e)) return e;
                                for (var r = t, n = "", i = 0; i < e.length; i++) {
                                    var o = e.charAt(i);
                                    " " != o || !r || i != e.length - 1 && 32 != e.charCodeAt(i + 1) || (o = " "), n += o, r = " " == o
                                }
                                return n
                            }(t, e.trailingSpace) : t,
                            d = e.cm.state.specialChars,
                            f = !1;
                        if (d.test(t)) {
                            c = document.createDocumentFragment();
                            for (var h = 0;;) {
                                d.lastIndex = h;
                                var p = d.exec(t),
                                    m = p ? p.index - h : t.length - h;
                                if (m) {
                                    var g = document.createTextNode(u.slice(h, h + m));
                                    a && l < 9 ? c.appendChild(O("span", [g])) : c.appendChild(g), e.map.push(e.pos, e.pos + m, g), e.col += m, e.pos += m
                                }
                                if (!p) break;
                                h += m + 1;
                                var v = void 0;
                                if ("\t" == p[0]) {
                                    var y = e.cm.options.tabSize,
                                        b = y - e.col % y;
                                    (v = c.appendChild(O("span", $(b), "cm-tab"))).setAttribute("role", "presentation"), v.setAttribute("cm-text", "\t"), e.col += b
                                } else "\r" == p[0] || "\n" == p[0] ? ((v = c.appendChild(O("span", "\r" == p[0] ? "␍" : "␤", "cm-invalidchar"))).setAttribute("cm-text", p[0]), e.col += 1) : ((v = e.cm.options.specialCharPlaceholder(p[0])).setAttribute("cm-text", p[0]), a && l < 9 ? c.appendChild(O("span", [v])) : c.appendChild(v), e.col += 1);
                                e.map.push(e.pos, e.pos + 1, v), e.pos++
                            }
                        } else e.col += t.length, c = document.createTextNode(u), e.map.push(e.pos, e.pos + t.length, c), a && l < 9 && (f = !0), e.pos += t.length;
                        if (e.trailingSpace = 32 == u.charCodeAt(t.length - 1), r || n || i || f || s) {
                            var w = r || "";
                            n && (w += n), i && (w += i);
                            var x = O("span", [c], w, s);
                            return o && (x.title = o), e.content.appendChild(x)
                        }
                        e.content.appendChild(c)
                    }
                }

                function Jt(e, t) {
                    return function(r, n, i, o, a, l, s) {
                        i = i ? i + " cm-force-border" : "cm-force-border";
                        for (var c = r.pos, u = c + n.length;;) {
                            for (var d = void 0, f = 0; f < t.length && !((d = t[f]).to > c && d.from <= c); f++);
                            if (d.to >= u) return e(r, n, i, o, a, l, s);
                            e(r, n.slice(0, d.to - c), i, o, null, l, s), o = null, n = n.slice(d.to - c), c = d.to
                        }
                    }
                }

                function Qt(e, t, r, n) {
                    var i = !n && r.widgetNode;
                    i && e.map.push(e.pos, e.pos + t, i), !n && e.cm.display.input.needsContentAttribute && (i || (i = e.content.appendChild(document.createElement("span"))), i.setAttribute("cm-marker", r.id)), i && (e.cm.display.input.setUneditable(i), e.content.appendChild(i)), e.pos += t, e.trailingSpace = !1
                }

                function er(e, t, r) {
                    var n = e.markedSpans,
                        i = e.text,
                        o = 0;
                    if (n)
                        for (var a, l, s, c, u, d, f, h = i.length, p = 0, m = 1, g = "", v = 0;;) {
                            if (v == p) {
                                s = c = u = d = l = "", f = null, v = 1 / 0;
                                for (var y = [], b = void 0, w = 0; w < n.length; ++w) {
                                    var x = n[w],
                                        k = x.marker;
                                    "bookmark" == k.type && x.from == p && k.widgetNode ? y.push(k) : x.from <= p && (null == x.to || x.to > p || k.collapsed && x.to == p && x.from == p) ? (null != x.to && x.to != p && v > x.to && (v = x.to, c = ""), k.className && (s += " " + k.className), k.css && (l = (l ? l + ";" : "") + k.css), k.startStyle && x.from == p && (u += " " + k.startStyle), k.endStyle && x.to == v && (b || (b = [])).push(k.endStyle, x.to), k.title && !d && (d = k.title), k.collapsed && (!f || De(f.marker, k) < 0) && (f = x)) : x.from > p && v > x.from && (v = x.from)
                                }
                                if (b)
                                    for (var C = 0; C < b.length; C += 2) b[C + 1] == v && (c += " " + b[C]);
                                if (!f || f.from == p)
                                    for (var T = 0; T < y.length; ++T) Qt(t, 0, y[T]);
                                if (f && (f.from || 0) == p) {
                                    if (Qt(t, (null == f.to ? h + 1 : f.to) - p, f.marker, null == f.from), null == f.to) return;
                                    f.to == p && (f = !1)
                                }
                            }
                            if (p >= h) break;
                            for (var S = Math.min(h, v);;) {
                                if (g) {
                                    var L = p + g.length;
                                    if (!f) {
                                        var M = L > S ? g.slice(0, S - p) : g;
                                        t.addToken(t, M, a ? a + s : s, u, p + M.length == v ? c : "", d, l)
                                    }
                                    if (L >= S) {
                                        g = g.slice(S - p), p = S;
                                        break
                                    }
                                    p = L, u = ""
                                }
                                g = i.slice(o, o = r[m++]), a = $t(r[m++], t.cm.options)
                            }
                        } else
                            for (var A = 1; A < r.length; A += 2) t.addToken(t, i.slice(o, o = r[A]), $t(r[A + 1], t.cm.options))
                }

                function tr(e, t, r) {
                    this.line = t, this.rest = function(e) {
                        for (var t, r; t = He(e);) e = t.find(1, !0).line, (r || (r = [])).push(e);
                        return r
                    }(t), this.size = this.rest ? de(Y(this.rest)) - r + 1 : 1, this.node = this.text = null, this.hidden = qe(e, t)
                }

                function rr(e, t, r) {
                    for (var n, i = [], o = t; o < r; o = n) {
                        var a = new tr(e.doc, le(e.doc, o), o);
                        n = o + a.size, i.push(a)
                    }
                    return i
                }
                var nr = null;
                var ir = null;

                function or(e, t) {
                    var r = et(e, t);
                    if (r.length) {
                        var n, i = Array.prototype.slice.call(arguments, 2);
                        nr ? n = nr.delayedCallbacks : ir ? n = ir : (n = ir = [], setTimeout(ar, 0));
                        for (var o = function(e) {
                                n.push(function() {
                                    return r[e].apply(null, i)
                                })
                            }, a = 0; a < r.length; ++a) o(a)
                    }
                }

                function ar() {
                    var e = ir;
                    ir = null;
                    for (var t = 0; t < e.length; ++t) e[t]()
                }

                function lr(e, t, r, n) {
                    for (var i = 0; i < t.changes.length; i++) {
                        var o = t.changes[i];
                        "text" == o ? ur(e, t) : "gutter" == o ? fr(e, t, r, n) : "class" == o ? dr(e, t) : "widget" == o && hr(e, t, n)
                    }
                    t.changes = null
                }

                function sr(e) {
                    return e.node == e.text && (e.node = O("div", null, null, "position: relative"), e.text.parentNode && e.text.parentNode.replaceChild(e.node, e.text), e.node.appendChild(e.text), a && l < 8 && (e.node.style.zIndex = 2)), e.node
                }

                function cr(e, t) {
                    var r = e.display.externalMeasured;
                    return r && r.line == t.line ? (e.display.externalMeasured = null, t.measure = r.measure, r.built) : Yt(e, t)
                }

                function ur(e, t) {
                    var r = t.text.className,
                        n = cr(e, t);
                    t.text == t.node && (t.node = n.pre), t.text.parentNode.replaceChild(n.pre, t.text), t.text = n.pre, n.bgClass != t.bgClass || n.textClass != t.textClass ? (t.bgClass = n.bgClass, t.textClass = n.textClass, dr(e, t)) : r && (t.text.className = r)
                }

                function dr(e, t) {
                    ! function(e, t) {
                        var r = t.bgClass ? t.bgClass + " " + (t.line.bgClass || "") : t.line.bgClass;
                        if (r && (r += " CodeMirror-linebackground"), t.background) r ? t.background.className = r : (t.background.parentNode.removeChild(t.background), t.background = null);
                        else if (r) {
                            var n = sr(t);
                            t.background = n.insertBefore(O("div", null, r), n.firstChild), e.display.input.setUneditable(t.background)
                        }
                    }(e, t), t.line.wrapClass ? sr(t).className = t.line.wrapClass : t.node != t.text && (t.node.className = "");
                    var r = t.textClass ? t.textClass + " " + (t.line.textClass || "") : t.line.textClass;
                    t.text.className = r || ""
                }

                function fr(e, t, r, n) {
                    if (t.gutter && (t.node.removeChild(t.gutter), t.gutter = null), t.gutterBackground && (t.node.removeChild(t.gutterBackground), t.gutterBackground = null), t.line.gutterClass) {
                        var i = sr(t);
                        t.gutterBackground = O("div", null, "CodeMirror-gutter-background " + t.line.gutterClass, "left: " + (e.options.fixedGutter ? n.fixedPos : -n.gutterTotalWidth) + "px; width: " + n.gutterTotalWidth + "px"), e.display.input.setUneditable(t.gutterBackground), i.insertBefore(t.gutterBackground, t.text)
                    }
                    var o = t.line.gutterMarkers;
                    if (e.options.lineNumbers || o) {
                        var a = sr(t),
                            l = t.gutter = O("div", null, "CodeMirror-gutter-wrapper", "left: " + (e.options.fixedGutter ? n.fixedPos : -n.gutterTotalWidth) + "px");
                        if (e.display.input.setUneditable(l), a.insertBefore(l, t.text), t.line.gutterClass && (l.className += " " + t.line.gutterClass), !e.options.lineNumbers || o && o["CodeMirror-linenumbers"] || (t.lineNumber = l.appendChild(O("div", pe(e.options, r), "CodeMirror-linenumber CodeMirror-gutter-elt", "left: " + n.gutterLeft["CodeMirror-linenumbers"] + "px; width: " + e.display.lineNumInnerWidth + "px"))), o)
                            for (var s = 0; s < e.options.gutters.length; ++s) {
                                var c = e.options.gutters[s],
                                    u = o.hasOwnProperty(c) && o[c];
                                u && l.appendChild(O("div", [u], "CodeMirror-gutter-elt", "left: " + n.gutterLeft[c] + "px; width: " + n.gutterWidth[c] + "px"))
                            }
                    }
                }

                function hr(e, t, r) {
                    t.alignable && (t.alignable = null);
                    for (var n = t.node.firstChild, i = void 0; n; n = i) i = n.nextSibling, "CodeMirror-linewidget" == n.className && t.node.removeChild(n);
                    pr(e, t, r)
                }

                function pr(e, t, r) {
                    if (mr(e, t.line, t, r, !0), t.rest)
                        for (var n = 0; n < t.rest.length; n++) mr(e, t.rest[n], t, r, !1)
                }

                function mr(e, t, r, n, i) {
                    if (t.widgets)
                        for (var o = sr(r), a = 0, l = t.widgets; a < l.length; ++a) {
                            var s = l[a],
                                c = O("div", [s.node], "CodeMirror-linewidget");
                            s.handleMouseEvents || c.setAttribute("cm-ignore-events", "true"), gr(s, c, r, n), e.display.input.setUneditable(c), i && s.above ? o.insertBefore(c, r.gutter || r.text) : o.appendChild(c), or(s, "redraw")
                        }
                }

                function gr(e, t, r, n) {
                    if (e.noHScroll) {
                        (r.alignable || (r.alignable = [])).push(t);
                        var i = n.wrapperWidth;
                        t.style.left = n.fixedPos + "px", e.coverGutter || (i -= n.gutterTotalWidth, t.style.paddingLeft = n.gutterTotalWidth + "px"), t.style.width = i + "px"
                    }
                    e.coverGutter && (t.style.zIndex = 5, t.style.position = "relative", e.noHScroll || (t.style.marginLeft = -n.gutterTotalWidth + "px"))
                }

                function vr(e) {
                    if (null != e.height) return e.height;
                    var t = e.doc.cm;
                    if (!t) return 0;
                    if (!_(document.body, e.node)) {
                        var r = "position: relative;";
                        e.coverGutter && (r += "margin-left: -" + t.display.gutters.offsetWidth + "px;"), e.noHScroll && (r += "width: " + t.display.wrapper.clientWidth + "px;"), A(t.display.measure, O("div", [e.node], null, r))
                    }
                    return e.height = e.node.parentNode.offsetHeight
                }

                function yr(e, t) {
                    for (var r = dt(t); r != e.wrapper; r = r.parentNode)
                        if (!r || 1 == r.nodeType && "true" == r.getAttribute("cm-ignore-events") || r.parentNode == e.sizer && r != e.mover) return !0
                }

                function br(e) {
                    return e.lineSpace.offsetTop
                }

                function wr(e) {
                    return e.mover.offsetHeight - e.lineSpace.offsetHeight
                }

                function xr(e) {
                    if (e.cachedPaddingH) return e.cachedPaddingH;
                    var t = A(e.measure, O("pre", "x")),
                        r = window.getComputedStyle ? window.getComputedStyle(t) : t.currentStyle,
                        n = {
                            left: parseInt(r.paddingLeft),
                            right: parseInt(r.paddingRight)
                        };
                    return isNaN(n.left) || isNaN(n.right) || (e.cachedPaddingH = n), n
                }

                function kr(e) {
                    return j - e.display.nativeBarWidth
                }

                function Cr(e) {
                    return e.display.scroller.clientWidth - kr(e) - e.display.barWidth
                }

                function Tr(e) {
                    return e.display.scroller.clientHeight - kr(e) - e.display.barHeight
                }

                function Sr(e, t, r) {
                    if (e.line == t) return {
                        map: e.measure.map,
                        cache: e.measure.cache
                    };
                    for (var n = 0; n < e.rest.length; n++)
                        if (e.rest[n] == t) return {
                            map: e.measure.maps[n],
                            cache: e.measure.caches[n]
                        };
                    for (var i = 0; i < e.rest.length; i++)
                        if (de(e.rest[i]) > r) return {
                            map: e.measure.maps[i],
                            cache: e.measure.caches[i],
                            before: !0
                        }
                }

                function Lr(e, t, r, n) {
                    return Or(e, Ar(e, t), r, n)
                }

                function Mr(e, t) {
                    if (t >= e.display.viewFrom && t < e.display.viewTo) return e.display.view[on(e, t)];
                    var r = e.display.externalMeasured;
                    return r && t >= r.lineN && t < r.lineN + r.size ? r : void 0
                }

                function Ar(e, t) {
                    var r = de(t),
                        n = Mr(e, r);
                    n && !n.text ? n = null : n && n.changes && (lr(e, n, r, Qr(e)), e.curOp.forceUpdate = !0), n || (n = function(e, t) {
                        var r = de(t = Re(t)),
                            n = e.display.externalMeasured = new tr(e.doc, t, r);
                        n.lineN = r;
                        var i = n.built = Yt(e, n);
                        return n.text = i.pre, A(e.display.lineMeasure, i.pre), n
                    }(e, t));
                    var i = Sr(n, t, r);
                    return {
                        line: t,
                        view: n,
                        rect: null,
                        map: i.map,
                        cache: i.cache,
                        before: i.before,
                        hasHeights: !1
                    }
                }

                function Or(e, t, r, n, i) {
                    t.before && (r = -1);
                    var o, s = r + (n || "");
                    return t.cache.hasOwnProperty(s) ? o = t.cache[s] : (t.rect || (t.rect = t.view.text.getBoundingClientRect()), t.hasHeights || (! function(e, t, r) {
                        var n = e.options.lineWrapping,
                            i = n && Cr(e);
                        if (!t.measure.heights || n && t.measure.width != i) {
                            var o = t.measure.heights = [];
                            if (n) {
                                t.measure.width = i;
                                for (var a = t.text.firstChild.getClientRects(), l = 0; l < a.length - 1; l++) {
                                    var s = a[l],
                                        c = a[l + 1];
                                    Math.abs(s.bottom - c.bottom) > 2 && o.push((s.bottom + c.top) / 2 - r.top)
                                }
                            }
                            o.push(r.bottom - r.top)
                        }
                    }(e, t.view, t.rect), t.hasHeights = !0), (o = function(e, t, r, n) {
                        var i, o = Er(t.map, r, n),
                            s = o.node,
                            c = o.start,
                            u = o.end,
                            d = o.collapse;
                        if (3 == s.nodeType) {
                            for (var f = 0; f < 4; f++) {
                                for (; c && ie(t.line.text.charAt(o.coverStart + c));) --c;
                                for (; o.coverStart + u < o.coverEnd && ie(t.line.text.charAt(o.coverStart + u));) ++u;
                                if ((i = a && l < 9 && 0 == c && u == o.coverEnd - o.coverStart ? s.parentNode.getBoundingClientRect() : Wr(S(s, c, u).getClientRects(), n)).left || i.right || 0 == c) break;
                                u = c, c -= 1, d = "right"
                            }
                            a && l < 11 && (i = function(e, t) {
                                if (!window.screen || null == screen.logicalXDPI || screen.logicalXDPI == screen.deviceXDPI || ! function(e) {
                                        if (null != kt) return kt;
                                        var t = A(e, O("span", "x")),
                                            r = t.getBoundingClientRect(),
                                            n = S(t, 0, 1).getBoundingClientRect();
                                        return kt = Math.abs(r.left - n.left) > 1
                                    }(e)) return t;
                                var r = screen.logicalXDPI / screen.deviceXDPI,
                                    n = screen.logicalYDPI / screen.deviceYDPI;
                                return {
                                    left: t.left * r,
                                    right: t.right * r,
                                    top: t.top * n,
                                    bottom: t.bottom * n
                                }
                            }(e.display.measure, i))
                        } else {
                            var h;
                            c > 0 && (d = n = "right"), i = e.options.lineWrapping && (h = s.getClientRects()).length > 1 ? h["right" == n ? h.length - 1 : 0] : s.getBoundingClientRect()
                        }
                        if (a && l < 9 && !c && (!i || !i.left && !i.right)) {
                            var p = s.parentNode.getClientRects()[0];
                            i = p ? {
                                left: p.left,
                                right: p.left + Jr(e.display),
                                top: p.top,
                                bottom: p.bottom
                            } : _r
                        }
                        for (var m = i.top - t.rect.top, g = i.bottom - t.rect.top, v = (m + g) / 2, y = t.view.measure.heights, b = 0; b < y.length - 1 && !(v < y[b]); b++);
                        var w = b ? y[b - 1] : 0,
                            x = y[b],
                            k = {
                                left: ("right" == d ? i.right : i.left) - t.rect.left,
                                right: ("left" == d ? i.left : i.right) - t.rect.left,
                                top: w,
                                bottom: x
                            };
                        i.left || i.right || (k.bogus = !0);
                        e.options.singleCursorHeightPerLine || (k.rtop = m, k.rbottom = g);
                        return k
                    }(e, t, r, n)).bogus || (t.cache[s] = o)), {
                        left: o.left,
                        right: o.right,
                        top: i ? o.rtop : o.top,
                        bottom: i ? o.rbottom : o.bottom
                    }
                }
                var Nr, _r = {
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom: 0
                };

                function Er(e, t, r) {
                    for (var n, i, o, a, l, s, c = 0; c < e.length; c += 3)
                        if (l = e[c], s = e[c + 1], t < l ? (i = 0, o = 1, a = "left") : t < s ? o = (i = t - l) + 1 : (c == e.length - 3 || t == s && e[c + 3] > t) && (i = (o = s - l) - 1, t >= s && (a = "right")), null != i) {
                            if (n = e[c + 2], l == s && r == (n.insertLeft ? "left" : "right") && (a = r), "left" == r && 0 == i)
                                for (; c && e[c - 2] == e[c - 3] && e[c - 1].insertLeft;) n = e[2 + (c -= 3)], a = "left";
                            if ("right" == r && i == s - l)
                                for (; c < e.length - 3 && e[c + 3] == e[c + 4] && !e[c + 5].insertLeft;) n = e[(c += 3) + 2], a = "right";
                            break
                        }
                    return {
                        node: n,
                        start: i,
                        end: o,
                        collapse: a,
                        coverStart: l,
                        coverEnd: s
                    }
                }

                function Wr(e, t) {
                    var r = _r;
                    if ("left" == t)
                        for (var n = 0; n < e.length && (r = e[n]).left == r.right; n++);
                    else
                        for (var i = e.length - 1; i >= 0 && (r = e[i]).left == r.right; i--);
                    return r
                }

                function Fr(e) {
                    if (e.measure && (e.measure.cache = {}, e.measure.heights = null, e.rest))
                        for (var t = 0; t < e.rest.length; t++) e.measure.caches[t] = {}
                }

                function Dr(e) {
                    e.display.externalMeasure = null, M(e.display.lineMeasure);
                    for (var t = 0; t < e.display.view.length; t++) Fr(e.display.view[t])
                }

                function zr(e) {
                    Dr(e), e.display.cachedCharWidth = e.display.cachedTextHeight = e.display.cachedPaddingH = null, e.options.lineWrapping || (e.display.maxLineChanged = !0), e.display.lineNumChars = null
                }

                function Pr() {
                    return u && g ? -(document.body.getBoundingClientRect().left - parseInt(getComputedStyle(document.body).marginLeft)) : window.pageXOffset || (document.documentElement || document.body).scrollLeft
                }

                function Hr() {
                    return u && g ? -(document.body.getBoundingClientRect().top - parseInt(getComputedStyle(document.body).marginTop)) : window.pageYOffset || (document.documentElement || document.body).scrollTop
                }

                function Ir(e) {
                    var t = 0;
                    if (e.widgets)
                        for (var r = 0; r < e.widgets.length; ++r) e.widgets[r].above && (t += vr(e.widgets[r]));
                    return t
                }

                function Rr(e, t, r, n, i) {
                    if (!i) {
                        var o = Ir(t);
                        r.top += o, r.bottom += o
                    }
                    if ("line" == n) return r;
                    n || (n = "local");
                    var a = Ke(t);
                    if ("local" == n ? a += br(e.display) : a -= e.display.viewOffset, "page" == n || "window" == n) {
                        var l = e.display.lineSpace.getBoundingClientRect();
                        a += l.top + ("window" == n ? 0 : Hr());
                        var s = l.left + ("window" == n ? 0 : Pr());
                        r.left += s, r.right += s
                    }
                    return r.top += a, r.bottom += a, r
                }

                function jr(e, t, r) {
                    if ("div" == r) return t;
                    var n = t.left,
                        i = t.top;
                    if ("page" == r) n -= Pr(), i -= Hr();
                    else if ("local" == r || !r) {
                        var o = e.display.sizer.getBoundingClientRect();
                        n += o.left, i += o.top
                    }
                    var a = e.display.lineSpace.getBoundingClientRect();
                    return {
                        left: n - a.left,
                        top: i - a.top
                    }
                }

                function Br(e, t, r, n, i) {
                    return n || (n = le(e.doc, t.line)), Rr(e, n, Lr(e, n, t.ch, i), r)
                }

                function qr(e, t, r, n, i, o) {
                    function a(t, a) {
                        var l = Or(e, i, t, a ? "right" : "left", o);
                        return a ? l.left = l.right : l.right = l.left, Rr(e, n, l, r)
                    }
                    n = n || le(e.doc, t.line), i || (i = Ar(e, n));
                    var l = Ze(n, e.doc.direction),
                        s = t.ch,
                        c = t.sticky;
                    if (s >= n.text.length ? (s = n.text.length, c = "before") : s <= 0 && (s = 0, c = "after"), !l) return a("before" == c ? s - 1 : s, "before" == c);

                    function u(e, t, r) {
                        var n = 1 == l[t].level;
                        return a(r ? e - 1 : e, n != r)
                    }
                    var d = Ye(l, s, c),
                        f = $e,
                        h = u(s, d, "before" == c);
                    return null != f && (h.other = u(s, f, "before" != c)), h
                }

                function Ur(e, t) {
                    var r = 0;
                    t = ke(e.doc, t), e.options.lineWrapping || (r = Jr(e.display) * t.ch);
                    var n = le(e.doc, t.line),
                        i = Ke(n) + br(e.display);
                    return {
                        left: r,
                        right: r,
                        top: i,
                        bottom: i + n.height
                    }
                }

                function Kr(e, t, r, n, i) {
                    var o = me(e, t, r);
                    return o.xRel = i, n && (o.outside = !0), o
                }

                function Vr(e, t, r) {
                    var n = e.doc;
                    if ((r += e.display.viewOffset) < 0) return Kr(n.first, 0, null, !0, -1);
                    var i = fe(n, r),
                        o = n.first + n.size - 1;
                    if (i > o) return Kr(n.first + n.size - 1, le(n, o).text.length, null, !0, 1);
                    t < 0 && (t = 0);
                    for (var a = le(n, i);;) {
                        var l = Xr(e, a, i, t, r),
                            s = He(a),
                            c = s && s.find(0, !0);
                        if (!s || !(l.ch > c.from.ch || l.ch == c.from.ch && l.xRel > 0)) return l;
                        i = de(a = c.to.line)
                    }
                }

                function Gr(e, t, r, n) {
                    n -= Ir(t);
                    var i = t.text.length,
                        o = ae(function(t) {
                            return Or(e, r, t - 1).bottom <= n
                        }, i, 0);
                    return {
                        begin: o,
                        end: i = ae(function(t) {
                            return Or(e, r, t).top > n
                        }, o, i)
                    }
                }

                function $r(e, t, r, n) {
                    return r || (r = Ar(e, t)), Gr(e, t, r, Rr(e, t, Or(e, r, n), "line").top)
                }

                function Yr(e, t, r, n) {
                    return !(e.bottom <= r) && (e.top > r || (n ? e.left : e.right) > t)
                }

                function Xr(e, t, r, n, i) {
                    i -= Ke(t);
                    var o = Ar(e, t),
                        a = Ir(t),
                        l = 0,
                        s = t.text.length,
                        c = !0,
                        u = Ze(t, e.doc.direction);
                    if (u) {
                        var d = (e.options.lineWrapping ? function(e, t, r, n, i, o, a) {
                            var l = Gr(e, t, n, a),
                                s = l.begin,
                                c = l.end;
                            /\s/.test(t.text.charAt(c - 1)) && c--;
                            for (var u = null, d = null, f = 0; f < i.length; f++) {
                                var h = i[f];
                                if (!(h.from >= c || h.to <= s)) {
                                    var p = 1 != h.level,
                                        m = Or(e, n, p ? Math.min(c, h.to) - 1 : Math.max(s, h.from)).right,
                                        g = m < o ? o - m + 1e9 : m - o;
                                    (!u || d > g) && (u = h, d = g)
                                }
                            }
                            u || (u = i[i.length - 1]);
                            u.from < s && (u = {
                                from: s,
                                to: u.to,
                                level: u.level
                            });
                            u.to > c && (u = {
                                from: u.from,
                                to: c,
                                level: u.level
                            });
                            return u
                        } : function(e, t, r, n, i, o, a) {
                            var l = ae(function(l) {
                                    var s = i[l],
                                        c = 1 != s.level;
                                    return Yr(qr(e, me(r, c ? s.to : s.from, c ? "before" : "after"), "line", t, n), o, a, !0)
                                }, 0, i.length - 1),
                                s = i[l];
                            if (l > 0) {
                                var c = 1 != s.level,
                                    u = qr(e, me(r, c ? s.from : s.to, c ? "after" : "before"), "line", t, n);
                                Yr(u, o, a, !0) && u.top > a && (s = i[l - 1])
                            }
                            return s
                        })(e, t, r, o, u, n, i);
                        l = (c = 1 != d.level) ? d.from : d.to - 1, s = c ? d.to : d.from - 1
                    }
                    var f, h, p = null,
                        m = null,
                        g = ae(function(t) {
                            var r = Or(e, o, t);
                            return r.top += a, r.bottom += a, !!Yr(r, n, i, !1) && (r.top <= i && r.left <= n && (p = t, m = r), !0)
                        }, l, s),
                        v = !1;
                    if (m) {
                        var y = n - m.left < m.right - n,
                            b = y == c;
                        g = p + (b ? 0 : 1), h = b ? "after" : "before", f = y ? m.left : m.right
                    } else {
                        c || g != s && g != l || g++, h = 0 == g ? "after" : g == t.text.length ? "before" : Or(e, o, g - (c ? 1 : 0)).bottom + a <= i == c ? "after" : "before";
                        var w = qr(e, me(r, g, h), "line", t, o);
                        f = w.left, v = i < w.top || i >= w.bottom
                    }
                    return Kr(r, g = oe(t.text, g, 1), h, v, n - f)
                }

                function Zr(e) {
                    if (null != e.cachedTextHeight) return e.cachedTextHeight;
                    if (null == Nr) {
                        Nr = O("pre");
                        for (var t = 0; t < 49; ++t) Nr.appendChild(document.createTextNode("x")), Nr.appendChild(O("br"));
                        Nr.appendChild(document.createTextNode("x"))
                    }
                    A(e.measure, Nr);
                    var r = Nr.offsetHeight / 50;
                    return r > 3 && (e.cachedTextHeight = r), M(e.measure), r || 1
                }

                function Jr(e) {
                    if (null != e.cachedCharWidth) return e.cachedCharWidth;
                    var t = O("span", "xxxxxxxxxx"),
                        r = O("pre", [t]);
                    A(e.measure, r);
                    var n = t.getBoundingClientRect(),
                        i = (n.right - n.left) / 10;
                    return i > 2 && (e.cachedCharWidth = i), i || 10
                }

                function Qr(e) {
                    for (var t = e.display, r = {}, n = {}, i = t.gutters.clientLeft, o = t.gutters.firstChild, a = 0; o; o = o.nextSibling, ++a) r[e.options.gutters[a]] = o.offsetLeft + o.clientLeft + i, n[e.options.gutters[a]] = o.clientWidth;
                    return {
                        fixedPos: en(t),
                        gutterTotalWidth: t.gutters.offsetWidth,
                        gutterLeft: r,
                        gutterWidth: n,
                        wrapperWidth: t.wrapper.clientWidth
                    }
                }

                function en(e) {
                    return e.scroller.getBoundingClientRect().left - e.sizer.getBoundingClientRect().left
                }

                function tn(e) {
                    var t = Zr(e.display),
                        r = e.options.lineWrapping,
                        n = r && Math.max(5, e.display.scroller.clientWidth / Jr(e.display) - 3);
                    return function(i) {
                        if (qe(e.doc, i)) return 0;
                        var o = 0;
                        if (i.widgets)
                            for (var a = 0; a < i.widgets.length; a++) i.widgets[a].height && (o += i.widgets[a].height);
                        return r ? o + (Math.ceil(i.text.length / n) || 1) * t : o + t
                    }
                }

                function rn(e) {
                    var t = e.doc,
                        r = tn(e);
                    t.iter(function(e) {
                        var t = r(e);
                        t != e.height && ue(e, t)
                    })
                }

                function nn(e, t, r, n) {
                    var i = e.display;
                    if (!r && "true" == dt(t).getAttribute("cm-not-content")) return null;
                    var o, a, l = i.lineSpace.getBoundingClientRect();
                    try {
                        o = t.clientX - l.left, a = t.clientY - l.top
                    } catch (t) {
                        return null
                    }
                    var s, c = Vr(e, o, a);
                    if (n && 1 == c.xRel && (s = le(e.doc, c.line).text).length == c.ch) {
                        var u = H(s, s.length, e.options.tabSize) - s.length;
                        c = me(c.line, Math.max(0, Math.round((o - xr(e.display).left) / Jr(e.display)) - u))
                    }
                    return c
                }

                function on(e, t) {
                    if (t >= e.display.viewTo) return null;
                    if ((t -= e.display.viewFrom) < 0) return null;
                    for (var r = e.display.view, n = 0; n < r.length; n++)
                        if ((t -= r[n].size) < 0) return n
                }

                function an(e) {
                    e.display.input.showSelection(e.display.input.prepareSelection())
                }

                function ln(e, t) {
                    void 0 === t && (t = !0);
                    for (var r = e.doc, n = {}, i = n.cursors = document.createDocumentFragment(), o = n.selection = document.createDocumentFragment(), a = 0; a < r.sel.ranges.length; a++)
                        if (t || a != r.sel.primIndex) {
                            var l = r.sel.ranges[a];
                            if (!(l.from().line >= e.display.viewTo || l.to().line < e.display.viewFrom)) {
                                var s = l.empty();
                                (s || e.options.showCursorWhenSelecting) && sn(e, l.head, i), s || un(e, l, o)
                            }
                        }
                    return n
                }

                function sn(e, t, r) {
                    var n = qr(e, t, "div", null, null, !e.options.singleCursorHeightPerLine),
                        i = r.appendChild(O("div", " ", "CodeMirror-cursor"));
                    if (i.style.left = n.left + "px", i.style.top = n.top + "px", i.style.height = Math.max(0, n.bottom - n.top) * e.options.cursorHeight + "px", n.other) {
                        var o = r.appendChild(O("div", " ", "CodeMirror-cursor CodeMirror-secondarycursor"));
                        o.style.display = "", o.style.left = n.other.left + "px", o.style.top = n.other.top + "px", o.style.height = .85 * (n.other.bottom - n.other.top) + "px"
                    }
                }

                function cn(e, t) {
                    return e.top - t.top || e.left - t.left
                }

                function un(e, t, r) {
                    var n = e.display,
                        i = e.doc,
                        o = document.createDocumentFragment(),
                        a = xr(e.display),
                        l = a.left,
                        s = Math.max(n.sizerWidth, Cr(e) - n.sizer.offsetLeft) - a.right,
                        c = "ltr" == i.direction;

                    function u(e, t, r, n) {
                        t < 0 && (t = 0), t = Math.round(t), n = Math.round(n), o.appendChild(O("div", null, "CodeMirror-selected", "position: absolute; left: " + e + "px;\n                             top: " + t + "px; width: " + (null == r ? s - e : r) + "px;\n                             height: " + (n - t) + "px"))
                    }

                    function d(t, r, n) {
                        var o, a, d = le(i, t),
                            f = d.text.length;

                        function h(r, n) {
                            return Br(e, me(t, r), "div", d, n)
                        }

                        function p(t, r, n) {
                            var i = $r(e, d, null, t),
                                o = "ltr" == r == ("after" == n) ? "left" : "right";
                            return h("after" == n ? i.begin : i.end - (/\s/.test(d.text.charAt(i.end - 1)) ? 2 : 1), o)[o]
                        }
                        var m = Ze(d, i.direction);
                        return function(e, t, r, n) {
                            if (!e) return n(t, r, "ltr", 0);
                            for (var i = !1, o = 0; o < e.length; ++o) {
                                var a = e[o];
                                (a.from < r && a.to > t || t == r && a.to == t) && (n(Math.max(a.from, t), Math.min(a.to, r), 1 == a.level ? "rtl" : "ltr", o), i = !0)
                            }
                            i || n(t, r, "ltr")
                        }(m, r || 0, null == n ? f : n, function(e, t, i, d) {
                            var g = "ltr" == i,
                                v = h(e, g ? "left" : "right"),
                                y = h(t - 1, g ? "right" : "left"),
                                b = null == r && 0 == e,
                                w = null == n && t == f,
                                x = 0 == d,
                                k = !m || d == m.length - 1;
                            if (y.top - v.top <= 3) {
                                var C = (c ? w : b) && k,
                                    T = (c ? b : w) && x ? l : (g ? v : y).left,
                                    S = C ? s : (g ? y : v).right;
                                u(T, v.top, S - T, v.bottom)
                            } else {
                                var L, M, A, O;
                                g ? (L = c && b && x ? l : v.left, M = c ? s : p(e, i, "before"), A = c ? l : p(t, i, "after"), O = c && w && k ? s : y.right) : (L = c ? p(e, i, "before") : l, M = !c && b && x ? s : v.right, A = !c && w && k ? l : y.left, O = c ? p(t, i, "after") : s), u(L, v.top, M - L, v.bottom), v.bottom < y.top && u(l, v.bottom, null, y.top), u(A, y.top, O - A, y.bottom)
                            }(!o || cn(v, o) < 0) && (o = v), cn(y, o) < 0 && (o = y), (!a || cn(v, a) < 0) && (a = v), cn(y, a) < 0 && (a = y)
                        }), {
                            start: o,
                            end: a
                        }
                    }
                    var f = t.from(),
                        h = t.to();
                    if (f.line == h.line) d(f.line, f.ch, h.ch);
                    else {
                        var p = le(i, f.line),
                            m = le(i, h.line),
                            g = Re(p) == Re(m),
                            v = d(f.line, f.ch, g ? p.text.length + 1 : null).end,
                            y = d(h.line, g ? 0 : null, h.ch).start;
                        g && (v.top < y.top - 2 ? (u(v.right, v.top, null, v.bottom), u(l, y.top, y.left, y.bottom)) : u(v.right, v.top, y.left - v.right, v.bottom)), v.bottom < y.top && u(l, v.bottom, null, y.top)
                    }
                    r.appendChild(o)
                }

                function dn(e) {
                    if (e.state.focused) {
                        var t = e.display;
                        clearInterval(t.blinker);
                        var r = !0;
                        t.cursorDiv.style.visibility = "", e.options.cursorBlinkRate > 0 ? t.blinker = setInterval(function() {
                            return t.cursorDiv.style.visibility = (r = !r) ? "" : "hidden"
                        }, e.options.cursorBlinkRate) : e.options.cursorBlinkRate < 0 && (t.cursorDiv.style.visibility = "hidden")
                    }
                }

                function fn(e) {
                    e.state.focused || (e.display.input.focus(), pn(e))
                }

                function hn(e) {
                    e.state.delayingBlurEvent = !0, setTimeout(function() {
                        e.state.delayingBlurEvent && (e.state.delayingBlurEvent = !1, mn(e))
                    }, 100)
                }

                function pn(e, t) {
                    e.state.delayingBlurEvent && (e.state.delayingBlurEvent = !1), "nocursor" != e.options.readOnly && (e.state.focused || (rt(e, "focus", e, t), e.state.focused = !0, W(e.display.wrapper, "CodeMirror-focused"), e.curOp || e.display.selForContextMenu == e.doc.sel || (e.display.input.reset(), s && setTimeout(function() {
                        return e.display.input.reset(!0)
                    }, 20)), e.display.input.receivedFocus()), dn(e))
                }

                function mn(e, t) {
                    e.state.delayingBlurEvent || (e.state.focused && (rt(e, "blur", e, t), e.state.focused = !1, L(e.display.wrapper, "CodeMirror-focused")), clearInterval(e.display.blinker), setTimeout(function() {
                        e.state.focused || (e.display.shift = !1)
                    }, 150))
                }

                function gn(e) {
                    for (var t = e.display, r = t.lineDiv.offsetTop, n = 0; n < t.view.length; n++) {
                        var i = t.view[n],
                            o = void 0;
                        if (!i.hidden) {
                            if (a && l < 8) {
                                var s = i.node.offsetTop + i.node.offsetHeight;
                                o = s - r, r = s
                            } else {
                                var c = i.node.getBoundingClientRect();
                                o = c.bottom - c.top
                            }
                            var u = i.line.height - o;
                            if (o < 2 && (o = Zr(t)), (u > .005 || u < -.005) && (ue(i.line, o), vn(i.line), i.rest))
                                for (var d = 0; d < i.rest.length; d++) vn(i.rest[d])
                        }
                    }
                }

                function vn(e) {
                    if (e.widgets)
                        for (var t = 0; t < e.widgets.length; ++t) {
                            var r = e.widgets[t],
                                n = r.node.parentNode;
                            n && (r.height = n.offsetHeight)
                        }
                }

                function yn(e, t, r) {
                    var n = r && null != r.top ? Math.max(0, r.top) : e.scroller.scrollTop;
                    n = Math.floor(n - br(e));
                    var i = r && null != r.bottom ? r.bottom : n + e.wrapper.clientHeight,
                        o = fe(t, n),
                        a = fe(t, i);
                    if (r && r.ensure) {
                        var l = r.ensure.from.line,
                            s = r.ensure.to.line;
                        l < o ? (o = l, a = fe(t, Ke(le(t, l)) + e.wrapper.clientHeight)) : Math.min(s, t.lastLine()) >= a && (o = fe(t, Ke(le(t, s)) - e.wrapper.clientHeight), a = s)
                    }
                    return {
                        from: o,
                        to: Math.max(a, o + 1)
                    }
                }

                function bn(e) {
                    var t = e.display,
                        r = t.view;
                    if (t.alignWidgets || t.gutters.firstChild && e.options.fixedGutter) {
                        for (var n = en(t) - t.scroller.scrollLeft + e.doc.scrollLeft, i = t.gutters.offsetWidth, o = n + "px", a = 0; a < r.length; a++)
                            if (!r[a].hidden) {
                                e.options.fixedGutter && (r[a].gutter && (r[a].gutter.style.left = o), r[a].gutterBackground && (r[a].gutterBackground.style.left = o));
                                var l = r[a].alignable;
                                if (l)
                                    for (var s = 0; s < l.length; s++) l[s].style.left = o
                            }
                        e.options.fixedGutter && (t.gutters.style.left = n + i + "px")
                    }
                }

                function wn(e) {
                    if (!e.options.lineNumbers) return !1;
                    var t = e.doc,
                        r = pe(e.options, t.first + t.size - 1),
                        n = e.display;
                    if (r.length != n.lineNumChars) {
                        var i = n.measure.appendChild(O("div", [O("div", r)], "CodeMirror-linenumber CodeMirror-gutter-elt")),
                            o = i.firstChild.offsetWidth,
                            a = i.offsetWidth - o;
                        return n.lineGutter.style.width = "", n.lineNumInnerWidth = Math.max(o, n.lineGutter.offsetWidth - a) + 1, n.lineNumWidth = n.lineNumInnerWidth + a, n.lineNumChars = n.lineNumInnerWidth ? r.length : -1, n.lineGutter.style.width = n.lineNumWidth + "px", oi(e), !0
                    }
                    return !1
                }

                function xn(e, t) {
                    var r = e.display,
                        n = Zr(e.display);
                    t.top < 0 && (t.top = 0);
                    var i = e.curOp && null != e.curOp.scrollTop ? e.curOp.scrollTop : r.scroller.scrollTop,
                        o = Tr(e),
                        a = {};
                    t.bottom - t.top > o && (t.bottom = t.top + o);
                    var l = e.doc.height + wr(r),
                        s = t.top < n,
                        c = t.bottom > l - n;
                    if (t.top < i) a.scrollTop = s ? 0 : t.top;
                    else if (t.bottom > i + o) {
                        var u = Math.min(t.top, (c ? l : t.bottom) - o);
                        u != i && (a.scrollTop = u)
                    }
                    var d = e.curOp && null != e.curOp.scrollLeft ? e.curOp.scrollLeft : r.scroller.scrollLeft,
                        f = Cr(e) - (e.options.fixedGutter ? r.gutters.offsetWidth : 0),
                        h = t.right - t.left > f;
                    return h && (t.right = t.left + f), t.left < 10 ? a.scrollLeft = 0 : t.left < d ? a.scrollLeft = Math.max(0, t.left - (h ? 0 : 10)) : t.right > f + d - 3 && (a.scrollLeft = t.right + (h ? 0 : 10) - f), a
                }

                function kn(e, t) {
                    null != t && (Sn(e), e.curOp.scrollTop = (null == e.curOp.scrollTop ? e.doc.scrollTop : e.curOp.scrollTop) + t)
                }

                function Cn(e) {
                    Sn(e);
                    var t = e.getCursor();
                    e.curOp.scrollToPos = {
                        from: t,
                        to: t,
                        margin: e.options.cursorScrollMargin
                    }
                }

                function Tn(e, t, r) {
                    null == t && null == r || Sn(e), null != t && (e.curOp.scrollLeft = t), null != r && (e.curOp.scrollTop = r)
                }

                function Sn(e) {
                    var t = e.curOp.scrollToPos;
                    t && (e.curOp.scrollToPos = null, Ln(e, Ur(e, t.from), Ur(e, t.to), t.margin))
                }

                function Ln(e, t, r, n) {
                    var i = xn(e, {
                        left: Math.min(t.left, r.left),
                        top: Math.min(t.top, r.top) - n,
                        right: Math.max(t.right, r.right),
                        bottom: Math.max(t.bottom, r.bottom) + n
                    });
                    Tn(e, i.scrollLeft, i.scrollTop)
                }

                function Mn(e, t) {
                    Math.abs(e.doc.scrollTop - t) < 2 || (r || ii(e, {
                        top: t
                    }), An(e, t, !0), r && ii(e), Qn(e, 100))
                }

                function An(e, t, r) {
                    t = Math.min(e.display.scroller.scrollHeight - e.display.scroller.clientHeight, t), (e.display.scroller.scrollTop != t || r) && (e.doc.scrollTop = t, e.display.scrollbars.setScrollTop(t), e.display.scroller.scrollTop != t && (e.display.scroller.scrollTop = t))
                }

                function On(e, t, r, n) {
                    t = Math.min(t, e.display.scroller.scrollWidth - e.display.scroller.clientWidth), (r ? t == e.doc.scrollLeft : Math.abs(e.doc.scrollLeft - t) < 2) && !n || (e.doc.scrollLeft = t, bn(e), e.display.scroller.scrollLeft != t && (e.display.scroller.scrollLeft = t), e.display.scrollbars.setScrollLeft(t))
                }

                function Nn(e) {
                    var t = e.display,
                        r = t.gutters.offsetWidth,
                        n = Math.round(e.doc.height + wr(e.display));
                    return {
                        clientHeight: t.scroller.clientHeight,
                        viewHeight: t.wrapper.clientHeight,
                        scrollWidth: t.scroller.scrollWidth,
                        clientWidth: t.scroller.clientWidth,
                        viewWidth: t.wrapper.clientWidth,
                        barLeft: e.options.fixedGutter ? r : 0,
                        docHeight: n,
                        scrollHeight: n + kr(e) + t.barHeight,
                        nativeBarWidth: t.nativeBarWidth,
                        gutterWidth: r
                    }
                }
                var _n = function(e, t, r) {
                    this.cm = r;
                    var n = this.vert = O("div", [O("div", null, null, "min-width: 1px")], "CodeMirror-vscrollbar"),
                        i = this.horiz = O("div", [O("div", null, null, "height: 100%; min-height: 1px")], "CodeMirror-hscrollbar");
                    e(n), e(i), Qe(n, "scroll", function() {
                        n.clientHeight && t(n.scrollTop, "vertical")
                    }), Qe(i, "scroll", function() {
                        i.clientWidth && t(i.scrollLeft, "horizontal")
                    }), this.checkedZeroWidth = !1, a && l < 8 && (this.horiz.style.minHeight = this.vert.style.minWidth = "18px")
                };
                _n.prototype.update = function(e) {
                    var t = e.scrollWidth > e.clientWidth + 1,
                        r = e.scrollHeight > e.clientHeight + 1,
                        n = e.nativeBarWidth;
                    if (r) {
                        this.vert.style.display = "block", this.vert.style.bottom = t ? n + "px" : "0";
                        var i = e.viewHeight - (t ? n : 0);
                        this.vert.firstChild.style.height = Math.max(0, e.scrollHeight - e.clientHeight + i) + "px"
                    } else this.vert.style.display = "", this.vert.firstChild.style.height = "0";
                    if (t) {
                        this.horiz.style.display = "block", this.horiz.style.right = r ? n + "px" : "0", this.horiz.style.left = e.barLeft + "px";
                        var o = e.viewWidth - e.barLeft - (r ? n : 0);
                        this.horiz.firstChild.style.width = Math.max(0, e.scrollWidth - e.clientWidth + o) + "px"
                    } else this.horiz.style.display = "", this.horiz.firstChild.style.width = "0";
                    return !this.checkedZeroWidth && e.clientHeight > 0 && (0 == n && this.zeroWidthHack(), this.checkedZeroWidth = !0), {
                        right: r ? n : 0,
                        bottom: t ? n : 0
                    }
                }, _n.prototype.setScrollLeft = function(e) {
                    this.horiz.scrollLeft != e && (this.horiz.scrollLeft = e), this.disableHoriz && this.enableZeroWidthBar(this.horiz, this.disableHoriz, "horiz")
                }, _n.prototype.setScrollTop = function(e) {
                    this.vert.scrollTop != e && (this.vert.scrollTop = e), this.disableVert && this.enableZeroWidthBar(this.vert, this.disableVert, "vert")
                }, _n.prototype.zeroWidthHack = function() {
                    var e = y && !h ? "12px" : "18px";
                    this.horiz.style.height = this.vert.style.width = e, this.horiz.style.pointerEvents = this.vert.style.pointerEvents = "none", this.disableHoriz = new I, this.disableVert = new I
                }, _n.prototype.enableZeroWidthBar = function(e, t, r) {
                    e.style.pointerEvents = "auto", t.set(1e3, function n() {
                        var i = e.getBoundingClientRect();
                        ("vert" == r ? document.elementFromPoint(i.right - 1, (i.top + i.bottom) / 2) : document.elementFromPoint((i.right + i.left) / 2, i.bottom - 1)) != e ? e.style.pointerEvents = "none" : t.set(1e3, n)
                    })
                }, _n.prototype.clear = function() {
                    var e = this.horiz.parentNode;
                    e.removeChild(this.horiz), e.removeChild(this.vert)
                };
                var En = function() {};

                function Wn(e, t) {
                    t || (t = Nn(e));
                    var r = e.display.barWidth,
                        n = e.display.barHeight;
                    Fn(e, t);
                    for (var i = 0; i < 4 && r != e.display.barWidth || n != e.display.barHeight; i++) r != e.display.barWidth && e.options.lineWrapping && gn(e), Fn(e, Nn(e)), r = e.display.barWidth, n = e.display.barHeight
                }

                function Fn(e, t) {
                    var r = e.display,
                        n = r.scrollbars.update(t);
                    r.sizer.style.paddingRight = (r.barWidth = n.right) + "px", r.sizer.style.paddingBottom = (r.barHeight = n.bottom) + "px", r.heightForcer.style.borderBottom = n.bottom + "px solid transparent", n.right && n.bottom ? (r.scrollbarFiller.style.display = "block", r.scrollbarFiller.style.height = n.bottom + "px", r.scrollbarFiller.style.width = n.right + "px") : r.scrollbarFiller.style.display = "", n.bottom && e.options.coverGutterNextToScrollbar && e.options.fixedGutter ? (r.gutterFiller.style.display = "block", r.gutterFiller.style.height = n.bottom + "px", r.gutterFiller.style.width = t.gutterWidth + "px") : r.gutterFiller.style.display = ""
                }
                En.prototype.update = function() {
                    return {
                        bottom: 0,
                        right: 0
                    }
                }, En.prototype.setScrollLeft = function() {}, En.prototype.setScrollTop = function() {}, En.prototype.clear = function() {};
                var Dn = {
                    native: _n,
                    null: En
                };

                function zn(e) {
                    e.display.scrollbars && (e.display.scrollbars.clear(), e.display.scrollbars.addClass && L(e.display.wrapper, e.display.scrollbars.addClass)), e.display.scrollbars = new Dn[e.options.scrollbarStyle](function(t) {
                        e.display.wrapper.insertBefore(t, e.display.scrollbarFiller), Qe(t, "mousedown", function() {
                            e.state.focused && setTimeout(function() {
                                return e.display.input.focus()
                            }, 0)
                        }), t.setAttribute("cm-not-content", "true")
                    }, function(t, r) {
                        "horizontal" == r ? On(e, t) : Mn(e, t)
                    }, e), e.display.scrollbars.addClass && W(e.display.wrapper, e.display.scrollbars.addClass)
                }
                var Pn = 0;

                function Hn(e) {
                    var t;
                    e.curOp = {
                        cm: e,
                        viewChanged: !1,
                        startHeight: e.doc.height,
                        forceUpdate: !1,
                        updateInput: null,
                        typing: !1,
                        changeObjs: null,
                        cursorActivityHandlers: null,
                        cursorActivityCalled: 0,
                        selectionChanged: !1,
                        updateMaxLine: !1,
                        scrollLeft: null,
                        scrollTop: null,
                        scrollToPos: null,
                        focus: !1,
                        id: ++Pn
                    }, t = e.curOp, nr ? nr.ops.push(t) : t.ownsGroup = nr = {
                        ops: [t],
                        delayedCallbacks: []
                    }
                }

                function In(e) {
                    ! function(e, t) {
                        var r = e.ownsGroup;
                        if (r) try {
                            ! function(e) {
                                var t = e.delayedCallbacks,
                                    r = 0;
                                do {
                                    for (; r < t.length; r++) t[r].call(null);
                                    for (var n = 0; n < e.ops.length; n++) {
                                        var i = e.ops[n];
                                        if (i.cursorActivityHandlers)
                                            for (; i.cursorActivityCalled < i.cursorActivityHandlers.length;) i.cursorActivityHandlers[i.cursorActivityCalled++].call(null, i.cm)
                                    }
                                } while (r < t.length)
                            }(r)
                        } finally {
                            nr = null, t(r)
                        }
                    }(e.curOp, function(e) {
                        for (var t = 0; t < e.ops.length; t++) e.ops[t].cm.curOp = null;
                        ! function(e) {
                            for (var t = e.ops, r = 0; r < t.length; r++) Rn(t[r]);
                            for (var n = 0; n < t.length; n++)(i = t[n]).updatedDisplay = i.mustUpdate && ri(i.cm, i.update);
                            var i;
                            for (var o = 0; o < t.length; o++) jn(t[o]);
                            for (var a = 0; a < t.length; a++) Bn(t[a]);
                            for (var l = 0; l < t.length; l++) qn(t[l])
                        }(e)
                    })
                }

                function Rn(e) {
                    var t, r, n = e.cm,
                        i = n.display;
                    !(r = (t = n).display).scrollbarsClipped && r.scroller.offsetWidth && (r.nativeBarWidth = r.scroller.offsetWidth - r.scroller.clientWidth, r.heightForcer.style.height = kr(t) + "px", r.sizer.style.marginBottom = -r.nativeBarWidth + "px", r.sizer.style.borderRightWidth = kr(t) + "px", r.scrollbarsClipped = !0), e.updateMaxLine && Ge(n), e.mustUpdate = e.viewChanged || e.forceUpdate || null != e.scrollTop || e.scrollToPos && (e.scrollToPos.from.line < i.viewFrom || e.scrollToPos.to.line >= i.viewTo) || i.maxLineChanged && n.options.lineWrapping, e.update = e.mustUpdate && new ti(n, e.mustUpdate && {
                        top: e.scrollTop,
                        ensure: e.scrollToPos
                    }, e.forceUpdate)
                }

                function jn(e) {
                    var t = e.cm,
                        r = t.display;
                    e.updatedDisplay && gn(t), e.barMeasure = Nn(t), r.maxLineChanged && !t.options.lineWrapping && (e.adjustWidthTo = Lr(t, r.maxLine, r.maxLine.text.length).left + 3, t.display.sizerWidth = e.adjustWidthTo, e.barMeasure.scrollWidth = Math.max(r.scroller.clientWidth, r.sizer.offsetLeft + e.adjustWidthTo + kr(t) + t.display.barWidth), e.maxScrollLeft = Math.max(0, r.sizer.offsetLeft + e.adjustWidthTo - Cr(t))), (e.updatedDisplay || e.selectionChanged) && (e.preparedSelection = r.input.prepareSelection())
                }

                function Bn(e) {
                    var t = e.cm;
                    null != e.adjustWidthTo && (t.display.sizer.style.minWidth = e.adjustWidthTo + "px", e.maxScrollLeft < t.doc.scrollLeft && On(t, Math.min(t.display.scroller.scrollLeft, e.maxScrollLeft), !0), t.display.maxLineChanged = !1);
                    var r = e.focus && e.focus == E();
                    e.preparedSelection && t.display.input.showSelection(e.preparedSelection, r), (e.updatedDisplay || e.startHeight != t.doc.height) && Wn(t, e.barMeasure), e.updatedDisplay && ai(t, e.barMeasure), e.selectionChanged && dn(t), t.state.focused && e.updateInput && t.display.input.reset(e.typing), r && fn(e.cm)
                }

                function qn(e) {
                    var t = e.cm,
                        r = t.display,
                        n = t.doc;
                    (e.updatedDisplay && ni(t, e.update), null == r.wheelStartX || null == e.scrollTop && null == e.scrollLeft && !e.scrollToPos || (r.wheelStartX = r.wheelStartY = null), null != e.scrollTop && An(t, e.scrollTop, e.forceScroll), null != e.scrollLeft && On(t, e.scrollLeft, !0, !0), e.scrollToPos) && function(e, t) {
                        if (!nt(e, "scrollCursorIntoView")) {
                            var r = e.display,
                                n = r.sizer.getBoundingClientRect(),
                                i = null;
                            if (t.top + n.top < 0 ? i = !0 : t.bottom + n.top > (window.innerHeight || document.documentElement.clientHeight) && (i = !1), null != i && !p) {
                                var o = O("div", "​", null, "position: absolute;\n                         top: " + (t.top - r.viewOffset - br(e.display)) + "px;\n                         height: " + (t.bottom - t.top + kr(e) + r.barHeight) + "px;\n                         left: " + t.left + "px; width: " + Math.max(2, t.right - t.left) + "px;");
                                e.display.lineSpace.appendChild(o), o.scrollIntoView(i), e.display.lineSpace.removeChild(o)
                            }
                        }
                    }(t, function(e, t, r, n) {
                        var i;
                        null == n && (n = 0), e.options.lineWrapping || t != r || (r = "before" == (t = t.ch ? me(t.line, "before" == t.sticky ? t.ch - 1 : t.ch, "after") : t).sticky ? me(t.line, t.ch + 1, "before") : t);
                        for (var o = 0; o < 5; o++) {
                            var a = !1,
                                l = qr(e, t),
                                s = r && r != t ? qr(e, r) : l,
                                c = xn(e, i = {
                                    left: Math.min(l.left, s.left),
                                    top: Math.min(l.top, s.top) - n,
                                    right: Math.max(l.left, s.left),
                                    bottom: Math.max(l.bottom, s.bottom) + n
                                }),
                                u = e.doc.scrollTop,
                                d = e.doc.scrollLeft;
                            if (null != c.scrollTop && (Mn(e, c.scrollTop), Math.abs(e.doc.scrollTop - u) > 1 && (a = !0)), null != c.scrollLeft && (On(e, c.scrollLeft), Math.abs(e.doc.scrollLeft - d) > 1 && (a = !0)), !a) break
                        }
                        return i
                    }(t, ke(n, e.scrollToPos.from), ke(n, e.scrollToPos.to), e.scrollToPos.margin));
                    var i = e.maybeHiddenMarkers,
                        o = e.maybeUnhiddenMarkers;
                    if (i)
                        for (var a = 0; a < i.length; ++a) i[a].lines.length || rt(i[a], "hide");
                    if (o)
                        for (var l = 0; l < o.length; ++l) o[l].lines.length && rt(o[l], "unhide");
                    r.wrapper.offsetHeight && (n.scrollTop = t.display.scroller.scrollTop), e.changeObjs && rt(t, "changes", t, e.changeObjs), e.update && e.update.finish()
                }

                function Un(e, t) {
                    if (e.curOp) return t();
                    Hn(e);
                    try {
                        return t()
                    } finally {
                        In(e)
                    }
                }

                function Kn(e, t) {
                    return function() {
                        if (e.curOp) return t.apply(e, arguments);
                        Hn(e);
                        try {
                            return t.apply(e, arguments)
                        } finally {
                            In(e)
                        }
                    }
                }

                function Vn(e) {
                    return function() {
                        if (this.curOp) return e.apply(this, arguments);
                        Hn(this);
                        try {
                            return e.apply(this, arguments)
                        } finally {
                            In(this)
                        }
                    }
                }

                function Gn(e) {
                    return function() {
                        var t = this.cm;
                        if (!t || t.curOp) return e.apply(this, arguments);
                        Hn(t);
                        try {
                            return e.apply(this, arguments)
                        } finally {
                            In(t)
                        }
                    }
                }

                function $n(e, t, r, n) {
                    null == t && (t = e.doc.first), null == r && (r = e.doc.first + e.doc.size), n || (n = 0);
                    var i = e.display;
                    if (n && r < i.viewTo && (null == i.updateLineNumbers || i.updateLineNumbers > t) && (i.updateLineNumbers = t), e.curOp.viewChanged = !0, t >= i.viewTo) Se && je(e.doc, t) < i.viewTo && Xn(e);
                    else if (r <= i.viewFrom) Se && Be(e.doc, r + n) > i.viewFrom ? Xn(e) : (i.viewFrom += n, i.viewTo += n);
                    else if (t <= i.viewFrom && r >= i.viewTo) Xn(e);
                    else if (t <= i.viewFrom) {
                        var o = Zn(e, r, r + n, 1);
                        o ? (i.view = i.view.slice(o.index), i.viewFrom = o.lineN, i.viewTo += n) : Xn(e)
                    } else if (r >= i.viewTo) {
                        var a = Zn(e, t, t, -1);
                        a ? (i.view = i.view.slice(0, a.index), i.viewTo = a.lineN) : Xn(e)
                    } else {
                        var l = Zn(e, t, t, -1),
                            s = Zn(e, r, r + n, 1);
                        l && s ? (i.view = i.view.slice(0, l.index).concat(rr(e, l.lineN, s.lineN)).concat(i.view.slice(s.index)), i.viewTo += n) : Xn(e)
                    }
                    var c = i.externalMeasured;
                    c && (r < c.lineN ? c.lineN += n : t < c.lineN + c.size && (i.externalMeasured = null))
                }

                function Yn(e, t, r) {
                    e.curOp.viewChanged = !0;
                    var n = e.display,
                        i = e.display.externalMeasured;
                    if (i && t >= i.lineN && t < i.lineN + i.size && (n.externalMeasured = null), !(t < n.viewFrom || t >= n.viewTo)) {
                        var o = n.view[on(e, t)];
                        if (null != o.node) {
                            var a = o.changes || (o.changes = []); - 1 == R(a, r) && a.push(r)
                        }
                    }
                }

                function Xn(e) {
                    e.display.viewFrom = e.display.viewTo = e.doc.first, e.display.view = [], e.display.viewOffset = 0
                }

                function Zn(e, t, r, n) {
                    var i, o = on(e, t),
                        a = e.display.view;
                    if (!Se || r == e.doc.first + e.doc.size) return {
                        index: o,
                        lineN: r
                    };
                    for (var l = e.display.viewFrom, s = 0; s < o; s++) l += a[s].size;
                    if (l != t) {
                        if (n > 0) {
                            if (o == a.length - 1) return null;
                            i = l + a[o].size - t, o++
                        } else i = l - t;
                        t += i, r += i
                    }
                    for (; je(e.doc, r) != r;) {
                        if (o == (n < 0 ? 0 : a.length - 1)) return null;
                        r += n * a[o - (n < 0 ? 1 : 0)].size, o += n
                    }
                    return {
                        index: o,
                        lineN: r
                    }
                }

                function Jn(e) {
                    for (var t = e.display.view, r = 0, n = 0; n < t.length; n++) {
                        var i = t[n];
                        i.hidden || i.node && !i.changes || ++r
                    }
                    return r
                }

                function Qn(e, t) {
                    e.doc.highlightFrontier < e.display.viewTo && e.state.highlight.set(t, z(ei, e))
                }

                function ei(e) {
                    var t = e.doc;
                    if (!(t.highlightFrontier >= e.display.viewTo)) {
                        var r = +new Date + e.options.workTime,
                            n = Pt(e, t.highlightFrontier),
                            i = [];
                        t.iter(n.line, Math.min(t.first + t.size, e.display.viewTo + 500), function(o) {
                            if (n.line >= e.display.viewFrom) {
                                var a = o.styles,
                                    l = o.text.length > e.options.maxHighlightLength ? Ot(t.mode, n.state) : null,
                                    s = Dt(e, o, n, !0);
                                l && (n.state = l), o.styles = s.styles;
                                var c = o.styleClasses,
                                    u = s.classes;
                                u ? o.styleClasses = u : c && (o.styleClasses = null);
                                for (var d = !a || a.length != o.styles.length || c != u && (!c || !u || c.bgClass != u.bgClass || c.textClass != u.textClass), f = 0; !d && f < a.length; ++f) d = a[f] != o.styles[f];
                                d && i.push(n.line), o.stateAfter = n.save(), n.nextLine()
                            } else o.text.length <= e.options.maxHighlightLength && Ht(e, o.text, n), o.stateAfter = n.line % 5 == 0 ? n.save() : null, n.nextLine();
                            if (+new Date > r) return Qn(e, e.options.workDelay), !0
                        }), t.highlightFrontier = n.line, t.modeFrontier = Math.max(t.modeFrontier, n.line), i.length && Un(e, function() {
                            for (var t = 0; t < i.length; t++) Yn(e, i[t], "text")
                        })
                    }
                }
                var ti = function(e, t, r) {
                    var n = e.display;
                    this.viewport = t, this.visible = yn(n, e.doc, t), this.editorIsHidden = !n.wrapper.offsetWidth, this.wrapperHeight = n.wrapper.clientHeight, this.wrapperWidth = n.wrapper.clientWidth, this.oldDisplayWidth = Cr(e), this.force = r, this.dims = Qr(e), this.events = []
                };

                function ri(e, t) {
                    var r = e.display,
                        n = e.doc;
                    if (t.editorIsHidden) return Xn(e), !1;
                    if (!t.force && t.visible.from >= r.viewFrom && t.visible.to <= r.viewTo && (null == r.updateLineNumbers || r.updateLineNumbers >= r.viewTo) && r.renderedView == r.view && 0 == Jn(e)) return !1;
                    wn(e) && (Xn(e), t.dims = Qr(e));
                    var i = n.first + n.size,
                        o = Math.max(t.visible.from - e.options.viewportMargin, n.first),
                        a = Math.min(i, t.visible.to + e.options.viewportMargin);
                    r.viewFrom < o && o - r.viewFrom < 20 && (o = Math.max(n.first, r.viewFrom)), r.viewTo > a && r.viewTo - a < 20 && (a = Math.min(i, r.viewTo)), Se && (o = je(e.doc, o), a = Be(e.doc, a));
                    var l, c, u, d, f = o != r.viewFrom || a != r.viewTo || r.lastWrapHeight != t.wrapperHeight || r.lastWrapWidth != t.wrapperWidth;
                    c = o, u = a, 0 == (d = (l = e).display).view.length || c >= d.viewTo || u <= d.viewFrom ? (d.view = rr(l, c, u), d.viewFrom = c) : (d.viewFrom > c ? d.view = rr(l, c, d.viewFrom).concat(d.view) : d.viewFrom < c && (d.view = d.view.slice(on(l, c))), d.viewFrom = c, d.viewTo < u ? d.view = d.view.concat(rr(l, d.viewTo, u)) : d.viewTo > u && (d.view = d.view.slice(0, on(l, u)))), d.viewTo = u, r.viewOffset = Ke(le(e.doc, r.viewFrom)), e.display.mover.style.top = r.viewOffset + "px";
                    var h = Jn(e);
                    if (!f && 0 == h && !t.force && r.renderedView == r.view && (null == r.updateLineNumbers || r.updateLineNumbers >= r.viewTo)) return !1;
                    var p = function(e) {
                        if (e.hasFocus()) return null;
                        var t = E();
                        if (!t || !_(e.display.lineDiv, t)) return null;
                        var r = {
                            activeElt: t
                        };
                        if (window.getSelection) {
                            var n = window.getSelection();
                            n.anchorNode && n.extend && _(e.display.lineDiv, n.anchorNode) && (r.anchorNode = n.anchorNode, r.anchorOffset = n.anchorOffset, r.focusNode = n.focusNode, r.focusOffset = n.focusOffset)
                        }
                        return r
                    }(e);
                    return h > 4 && (r.lineDiv.style.display = "none"),
                        function(e, t, r) {
                            var n = e.display,
                                i = e.options.lineNumbers,
                                o = n.lineDiv,
                                a = o.firstChild;

                            function l(t) {
                                var r = t.nextSibling;
                                return s && y && e.display.currentWheelTarget == t ? t.style.display = "none" : t.parentNode.removeChild(t), r
                            }
                            for (var c = n.view, u = n.viewFrom, d = 0; d < c.length; d++) {
                                var f = c[d];
                                if (f.hidden);
                                else if (f.node && f.node.parentNode == o) {
                                    for (; a != f.node;) a = l(a);
                                    var h = i && null != t && t <= u && f.lineNumber;
                                    f.changes && (R(f.changes, "gutter") > -1 && (h = !1), lr(e, f, u, r)), h && (M(f.lineNumber), f.lineNumber.appendChild(document.createTextNode(pe(e.options, u)))), a = f.node.nextSibling
                                } else {
                                    var p = (v = u, b = r, void 0, w = cr(m = e, g = f), g.text = g.node = w.pre, w.bgClass && (g.bgClass = w.bgClass), w.textClass && (g.textClass = w.textClass), dr(m, g), fr(m, g, v, b), pr(m, g, b), g.node);
                                    o.insertBefore(p, a)
                                }
                                u += f.size
                            }
                            var m, g, v, b, w;
                            for (; a;) a = l(a)
                        }(e, r.updateLineNumbers, t.dims), h > 4 && (r.lineDiv.style.display = ""), r.renderedView = r.view,
                        function(e) {
                            if (e && e.activeElt && e.activeElt != E() && (e.activeElt.focus(), e.anchorNode && _(document.body, e.anchorNode) && _(document.body, e.focusNode))) {
                                var t = window.getSelection(),
                                    r = document.createRange();
                                r.setEnd(e.anchorNode, e.anchorOffset), r.collapse(!1), t.removeAllRanges(), t.addRange(r), t.extend(e.focusNode, e.focusOffset)
                            }
                        }(p), M(r.cursorDiv), M(r.selectionDiv), r.gutters.style.height = r.sizer.style.minHeight = 0, f && (r.lastWrapHeight = t.wrapperHeight, r.lastWrapWidth = t.wrapperWidth, Qn(e, 400)), r.updateLineNumbers = null, !0
                }

                function ni(e, t) {
                    for (var r = t.viewport, n = !0;
                        (n && e.options.lineWrapping && t.oldDisplayWidth != Cr(e) || (r && null != r.top && (r = {
                            top: Math.min(e.doc.height + wr(e.display) - Tr(e), r.top)
                        }), t.visible = yn(e.display, e.doc, r), !(t.visible.from >= e.display.viewFrom && t.visible.to <= e.display.viewTo))) && ri(e, t); n = !1) {
                        gn(e);
                        var i = Nn(e);
                        an(e), Wn(e, i), ai(e, i), t.force = !1
                    }
                    t.signal(e, "update", e), e.display.viewFrom == e.display.reportedViewFrom && e.display.viewTo == e.display.reportedViewTo || (t.signal(e, "viewportChange", e, e.display.viewFrom, e.display.viewTo), e.display.reportedViewFrom = e.display.viewFrom, e.display.reportedViewTo = e.display.viewTo)
                }

                function ii(e, t) {
                    var r = new ti(e, t);
                    if (ri(e, r)) {
                        gn(e), ni(e, r);
                        var n = Nn(e);
                        an(e), Wn(e, n), ai(e, n), r.finish()
                    }
                }

                function oi(e) {
                    var t = e.display.gutters.offsetWidth;
                    e.display.sizer.style.marginLeft = t + "px"
                }

                function ai(e, t) {
                    e.display.sizer.style.minHeight = t.docHeight + "px", e.display.heightForcer.style.top = t.docHeight + "px", e.display.gutters.style.height = t.docHeight + e.display.barHeight + kr(e) + "px"
                }

                function li(e) {
                    var t = e.display.gutters,
                        r = e.options.gutters;
                    M(t);
                    for (var n = 0; n < r.length; ++n) {
                        var i = r[n],
                            o = t.appendChild(O("div", null, "CodeMirror-gutter " + i));
                        "CodeMirror-linenumbers" == i && (e.display.lineGutter = o, o.style.width = (e.display.lineNumWidth || 1) + "px")
                    }
                    t.style.display = n ? "" : "none", oi(e)
                }

                function si(e) {
                    var t = R(e.gutters, "CodeMirror-linenumbers"); - 1 == t && e.lineNumbers ? e.gutters = e.gutters.concat(["CodeMirror-linenumbers"]) : t > -1 && !e.lineNumbers && (e.gutters = e.gutters.slice(0), e.gutters.splice(t, 1))
                }
                ti.prototype.signal = function(e, t) {
                    ot(e, t) && this.events.push(arguments)
                }, ti.prototype.finish = function() {
                    for (var e = 0; e < this.events.length; e++) rt.apply(null, this.events[e])
                };
                var ci = 0,
                    ui = null;

                function di(e) {
                    var t = e.wheelDeltaX,
                        r = e.wheelDeltaY;
                    return null == t && e.detail && e.axis == e.HORIZONTAL_AXIS && (t = e.detail), null == r && e.detail && e.axis == e.VERTICAL_AXIS ? r = e.detail : null == r && (r = e.wheelDelta), {
                        x: t,
                        y: r
                    }
                }

                function fi(e) {
                    var t = di(e);
                    return t.x *= ui, t.y *= ui, t
                }

                function hi(e, t) {
                    var n = di(t),
                        i = n.x,
                        o = n.y,
                        a = e.display,
                        l = a.scroller,
                        c = l.scrollWidth > l.clientWidth,
                        u = l.scrollHeight > l.clientHeight;
                    if (i && c || o && u) {
                        if (o && y && s) e: for (var f = t.target, h = a.view; f != l; f = f.parentNode)
                            for (var p = 0; p < h.length; p++)
                                if (h[p].node == f) {
                                    e.display.currentWheelTarget = f;
                                    break e
                                }
                        if (i && !r && !d && null != ui) return o && u && Mn(e, Math.max(0, l.scrollTop + o * ui)), On(e, Math.max(0, l.scrollLeft + i * ui)), (!o || o && u) && lt(t), void(a.wheelStartX = null);
                        if (o && null != ui) {
                            var m = o * ui,
                                g = e.doc.scrollTop,
                                v = g + a.wrapper.clientHeight;
                            m < 0 ? g = Math.max(0, g + m - 50) : v = Math.min(e.doc.height, v + m + 50), ii(e, {
                                top: g,
                                bottom: v
                            })
                        }
                        ci < 20 && (null == a.wheelStartX ? (a.wheelStartX = l.scrollLeft, a.wheelStartY = l.scrollTop, a.wheelDX = i, a.wheelDY = o, setTimeout(function() {
                            if (null != a.wheelStartX) {
                                var e = l.scrollLeft - a.wheelStartX,
                                    t = l.scrollTop - a.wheelStartY,
                                    r = t && a.wheelDY && t / a.wheelDY || e && a.wheelDX && e / a.wheelDX;
                                a.wheelStartX = a.wheelStartY = null, r && (ui = (ui * ci + r) / (ci + 1), ++ci)
                            }
                        }, 200)) : (a.wheelDX += i, a.wheelDY += o))
                    }
                }
                a ? ui = -.53 : r ? ui = 15 : u ? ui = -.7 : f && (ui = -1 / 3);
                var pi = function(e, t) {
                    this.ranges = e, this.primIndex = t
                };
                pi.prototype.primary = function() {
                    return this.ranges[this.primIndex]
                }, pi.prototype.equals = function(e) {
                    if (e == this) return !0;
                    if (e.primIndex != this.primIndex || e.ranges.length != this.ranges.length) return !1;
                    for (var t = 0; t < this.ranges.length; t++) {
                        var r = this.ranges[t],
                            n = e.ranges[t];
                        if (!ve(r.anchor, n.anchor) || !ve(r.head, n.head)) return !1
                    }
                    return !0
                }, pi.prototype.deepCopy = function() {
                    for (var e = [], t = 0; t < this.ranges.length; t++) e[t] = new mi(ye(this.ranges[t].anchor), ye(this.ranges[t].head));
                    return new pi(e, this.primIndex)
                }, pi.prototype.somethingSelected = function() {
                    for (var e = 0; e < this.ranges.length; e++)
                        if (!this.ranges[e].empty()) return !0;
                    return !1
                }, pi.prototype.contains = function(e, t) {
                    t || (t = e);
                    for (var r = 0; r < this.ranges.length; r++) {
                        var n = this.ranges[r];
                        if (ge(t, n.from()) >= 0 && ge(e, n.to()) <= 0) return r
                    }
                    return -1
                };
                var mi = function(e, t) {
                    this.anchor = e, this.head = t
                };

                function gi(e, t) {
                    var r = e[t];
                    e.sort(function(e, t) {
                        return ge(e.from(), t.from())
                    }), t = R(e, r);
                    for (var n = 1; n < e.length; n++) {
                        var i = e[n],
                            o = e[n - 1];
                        if (ge(o.to(), i.from()) >= 0) {
                            var a = we(o.from(), i.from()),
                                l = be(o.to(), i.to()),
                                s = o.empty() ? i.from() == i.head : o.from() == o.head;
                            n <= t && --t, e.splice(--n, 2, new mi(s ? l : a, s ? a : l))
                        }
                    }
                    return new pi(e, t)
                }

                function vi(e, t) {
                    return new pi([new mi(e, t || e)], 0)
                }

                function yi(e) {
                    return e.text ? me(e.from.line + e.text.length - 1, Y(e.text).length + (1 == e.text.length ? e.from.ch : 0)) : e.to
                }

                function bi(e, t) {
                    if (ge(e, t.from) < 0) return e;
                    if (ge(e, t.to) <= 0) return yi(t);
                    var r = e.line + t.text.length - (t.to.line - t.from.line) - 1,
                        n = e.ch;
                    return e.line == t.to.line && (n += yi(t).ch - t.to.ch), me(r, n)
                }

                function wi(e, t) {
                    for (var r = [], n = 0; n < e.sel.ranges.length; n++) {
                        var i = e.sel.ranges[n];
                        r.push(new mi(bi(i.anchor, t), bi(i.head, t)))
                    }
                    return gi(r, e.sel.primIndex)
                }

                function xi(e, t, r) {
                    return e.line == t.line ? me(r.line, e.ch - t.ch + r.ch) : me(r.line + (e.line - t.line), e.ch)
                }

                function ki(e) {
                    e.doc.mode = Lt(e.options, e.doc.modeOption), Ci(e)
                }

                function Ci(e) {
                    e.doc.iter(function(e) {
                        e.stateAfter && (e.stateAfter = null), e.styles && (e.styles = null)
                    }), e.doc.modeFrontier = e.doc.highlightFrontier = e.doc.first, Qn(e, 100), e.state.modeGen++, e.curOp && $n(e)
                }

                function Ti(e, t) {
                    return 0 == t.from.ch && 0 == t.to.ch && "" == Y(t.text) && (!e.cm || e.cm.options.wholeLineUpdateBefore)
                }

                function Si(e, t, r, n) {
                    function i(e) {
                        return r ? r[e] : null
                    }

                    function o(e, r, i) {
                        ! function(e, t, r, n) {
                            e.text = t, e.stateAfter && (e.stateAfter = null), e.styles && (e.styles = null), null != e.order && (e.order = null), _e(e), Ee(e, r);
                            var i = n ? n(e) : 1;
                            i != e.height && ue(e, i)
                        }(e, r, i, n), or(e, "change", e, t)
                    }

                    function a(e, t) {
                        for (var r = [], o = e; o < t; ++o) r.push(new Kt(c[o], i(o), n));
                        return r
                    }
                    var l = t.from,
                        s = t.to,
                        c = t.text,
                        u = le(e, l.line),
                        d = le(e, s.line),
                        f = Y(c),
                        h = i(c.length - 1),
                        p = s.line - l.line;
                    if (t.full) e.insert(0, a(0, c.length)), e.remove(c.length, e.size - c.length);
                    else if (Ti(e, t)) {
                        var m = a(0, c.length - 1);
                        o(d, d.text, h), p && e.remove(l.line, p), m.length && e.insert(l.line, m)
                    } else if (u == d)
                        if (1 == c.length) o(u, u.text.slice(0, l.ch) + f + u.text.slice(s.ch), h);
                        else {
                            var g = a(1, c.length - 1);
                            g.push(new Kt(f + u.text.slice(s.ch), h, n)), o(u, u.text.slice(0, l.ch) + c[0], i(0)), e.insert(l.line + 1, g)
                        }
                    else if (1 == c.length) o(u, u.text.slice(0, l.ch) + c[0] + d.text.slice(s.ch), i(0)), e.remove(l.line + 1, p);
                    else {
                        o(u, u.text.slice(0, l.ch) + c[0], i(0)), o(d, f + d.text.slice(s.ch), h);
                        var v = a(1, c.length - 1);
                        p > 1 && e.remove(l.line + 1, p - 1), e.insert(l.line + 1, v)
                    }
                    or(e, "change", e, t)
                }

                function Li(e, t, r) {
                    ! function e(n, i, o) {
                        if (n.linked)
                            for (var a = 0; a < n.linked.length; ++a) {
                                var l = n.linked[a];
                                if (l.doc != i) {
                                    var s = o && l.sharedHist;
                                    r && !s || (t(l.doc, s), e(l.doc, n, s))
                                }
                            }
                    }(e, null, !0)
                }

                function Mi(e, t) {
                    if (t.cm) throw new Error("This document is already in use.");
                    e.doc = t, t.cm = e, rn(e), ki(e), Ai(e), e.options.lineWrapping || Ge(e), e.options.mode = t.modeOption, $n(e)
                }

                function Ai(e) {
                    ("rtl" == e.doc.direction ? W : L)(e.display.lineDiv, "CodeMirror-rtl")
                }

                function Oi(e) {
                    this.done = [], this.undone = [], this.undoDepth = 1 / 0, this.lastModTime = this.lastSelTime = 0, this.lastOp = this.lastSelOp = null, this.lastOrigin = this.lastSelOrigin = null, this.generation = this.maxGeneration = e || 1
                }

                function Ni(e, t) {
                    var r = {
                        from: ye(t.from),
                        to: yi(t),
                        text: se(e, t.from, t.to)
                    };
                    return Di(e, r, t.from.line, t.to.line + 1), Li(e, function(e) {
                        return Di(e, r, t.from.line, t.to.line + 1)
                    }, !0), r
                }

                function _i(e) {
                    for (; e.length;) {
                        if (!Y(e).ranges) break;
                        e.pop()
                    }
                }

                function Ei(e, t, r, n) {
                    var i = e.history;
                    i.undone.length = 0;
                    var o, a, l, s = +new Date;
                    if ((i.lastOp == n || i.lastOrigin == t.origin && t.origin && ("+" == t.origin.charAt(0) && e.cm && i.lastModTime > s - e.cm.options.historyEventDelay || "*" == t.origin.charAt(0))) && (l = i, o = i.lastOp == n ? (_i(l.done), Y(l.done)) : l.done.length && !Y(l.done).ranges ? Y(l.done) : l.done.length > 1 && !l.done[l.done.length - 2].ranges ? (l.done.pop(), Y(l.done)) : void 0)) a = Y(o.changes), 0 == ge(t.from, t.to) && 0 == ge(t.from, a.to) ? a.to = yi(t) : o.changes.push(Ni(e, t));
                    else {
                        var c = Y(i.done);
                        for (c && c.ranges || Fi(e.sel, i.done), o = {
                                changes: [Ni(e, t)],
                                generation: i.generation
                            }, i.done.push(o); i.done.length > i.undoDepth;) i.done.shift(), i.done[0].ranges || i.done.shift()
                    }
                    i.done.push(r), i.generation = ++i.maxGeneration, i.lastModTime = i.lastSelTime = s, i.lastOp = i.lastSelOp = n, i.lastOrigin = i.lastSelOrigin = t.origin, a || rt(e, "historyAdded")
                }

                function Wi(e, t, r, n) {
                    var i, o, a, l, s, c = e.history,
                        u = n && n.origin;
                    r == c.lastSelOp || u && c.lastSelOrigin == u && (c.lastModTime == c.lastSelTime && c.lastOrigin == u || (i = e, o = u, a = Y(c.done), l = t, "*" == (s = o.charAt(0)) || "+" == s && a.ranges.length == l.ranges.length && a.somethingSelected() == l.somethingSelected() && new Date - i.history.lastSelTime <= (i.cm ? i.cm.options.historyEventDelay : 500))) ? c.done[c.done.length - 1] = t : Fi(t, c.done), c.lastSelTime = +new Date, c.lastSelOrigin = u, c.lastSelOp = r, n && !1 !== n.clearRedo && _i(c.undone)
                }

                function Fi(e, t) {
                    var r = Y(t);
                    r && r.ranges && r.equals(e) || t.push(e)
                }

                function Di(e, t, r, n) {
                    var i = t["spans_" + e.id],
                        o = 0;
                    e.iter(Math.max(e.first, r), Math.min(e.first + e.size, n), function(r) {
                        r.markedSpans && ((i || (i = t["spans_" + e.id] = {}))[o] = r.markedSpans), ++o
                    })
                }

                function zi(e) {
                    if (!e) return null;
                    for (var t, r = 0; r < e.length; ++r) e[r].marker.explicitlyCleared ? t || (t = e.slice(0, r)) : t && t.push(e[r]);
                    return t ? t.length ? t : null : e
                }

                function Pi(e, t) {
                    var r = function(e, t) {
                            var r = t["spans_" + e.id];
                            if (!r) return null;
                            for (var n = [], i = 0; i < t.text.length; ++i) n.push(zi(r[i]));
                            return n
                        }(e, t),
                        n = Oe(e, t);
                    if (!r) return n;
                    if (!n) return r;
                    for (var i = 0; i < r.length; ++i) {
                        var o = r[i],
                            a = n[i];
                        if (o && a) e: for (var l = 0; l < a.length; ++l) {
                            for (var s = a[l], c = 0; c < o.length; ++c)
                                if (o[c].marker == s.marker) continue e;
                            o.push(s)
                        } else a && (r[i] = a)
                    }
                    return r
                }

                function Hi(e, t, r) {
                    for (var n = [], i = 0; i < e.length; ++i) {
                        var o = e[i];
                        if (o.ranges) n.push(r ? pi.prototype.deepCopy.call(o) : o);
                        else {
                            var a = o.changes,
                                l = [];
                            n.push({
                                changes: l
                            });
                            for (var s = 0; s < a.length; ++s) {
                                var c = a[s],
                                    u = void 0;
                                if (l.push({
                                        from: c.from,
                                        to: c.to,
                                        text: c.text
                                    }), t)
                                    for (var d in c)(u = d.match(/^spans_(\d+)$/)) && R(t, Number(u[1])) > -1 && (Y(l)[d] = c[d], delete c[d])
                            }
                        }
                    }
                    return n
                }

                function Ii(e, t, r, n) {
                    if (n) {
                        var i = e.anchor;
                        if (r) {
                            var o = ge(t, i) < 0;
                            o != ge(r, i) < 0 ? (i = t, t = r) : o != ge(t, r) < 0 && (t = r)
                        }
                        return new mi(i, t)
                    }
                    return new mi(r || t, t)
                }

                function Ri(e, t, r, n, i) {
                    null == i && (i = e.cm && (e.cm.display.shift || e.extend)), Ki(e, new pi([Ii(e.sel.primary(), t, r, i)], 0), n)
                }

                function ji(e, t, r) {
                    for (var n = [], i = e.cm && (e.cm.display.shift || e.extend), o = 0; o < e.sel.ranges.length; o++) n[o] = Ii(e.sel.ranges[o], t[o], null, i);
                    Ki(e, gi(n, e.sel.primIndex), r)
                }

                function Bi(e, t, r, n) {
                    var i = e.sel.ranges.slice(0);
                    i[t] = r, Ki(e, gi(i, e.sel.primIndex), n)
                }

                function qi(e, t, r, n) {
                    Ki(e, vi(t, r), n)
                }

                function Ui(e, t, r) {
                    var n = e.history.done,
                        i = Y(n);
                    i && i.ranges ? (n[n.length - 1] = t, Vi(e, t, r)) : Ki(e, t, r)
                }

                function Ki(e, t, r) {
                    Vi(e, t, r), Wi(e, e.sel, e.cm ? e.cm.curOp.id : NaN, r)
                }

                function Vi(e, t, r) {
                    var n, i, o, a;
                    (ot(e, "beforeSelectionChange") || e.cm && ot(e.cm, "beforeSelectionChange")) && (n = e, o = r, a = {
                        ranges: (i = t).ranges,
                        update: function(e) {
                            this.ranges = [];
                            for (var t = 0; t < e.length; t++) this.ranges[t] = new mi(ke(n, e[t].anchor), ke(n, e[t].head))
                        },
                        origin: o && o.origin
                    }, rt(n, "beforeSelectionChange", n, a), n.cm && rt(n.cm, "beforeSelectionChange", n.cm, a), t = a.ranges != i.ranges ? gi(a.ranges, a.ranges.length - 1) : i), Gi(e, Yi(e, t, r && r.bias || (ge(t.primary().head, e.sel.primary().head) < 0 ? -1 : 1), !0)), r && !1 === r.scroll || !e.cm || Cn(e.cm)
                }

                function Gi(e, t) {
                    t.equals(e.sel) || (e.sel = t, e.cm && (e.cm.curOp.updateInput = e.cm.curOp.selectionChanged = !0, it(e.cm)), or(e, "cursorActivity", e))
                }

                function $i(e) {
                    Gi(e, Yi(e, e.sel, null, !1))
                }

                function Yi(e, t, r, n) {
                    for (var i, o = 0; o < t.ranges.length; o++) {
                        var a = t.ranges[o],
                            l = t.ranges.length == e.sel.ranges.length && e.sel.ranges[o],
                            s = Zi(e, a.anchor, l && l.anchor, r, n),
                            c = Zi(e, a.head, l && l.head, r, n);
                        (i || s != a.anchor || c != a.head) && (i || (i = t.ranges.slice(0, o)), i[o] = new mi(s, c))
                    }
                    return i ? gi(i, t.primIndex) : t
                }

                function Xi(e, t, r, n, i) {
                    var o = le(e, t.line);
                    if (o.markedSpans)
                        for (var a = 0; a < o.markedSpans.length; ++a) {
                            var l = o.markedSpans[a],
                                s = l.marker;
                            if ((null == l.from || (s.inclusiveLeft ? l.from <= t.ch : l.from < t.ch)) && (null == l.to || (s.inclusiveRight ? l.to >= t.ch : l.to > t.ch))) {
                                if (i && (rt(s, "beforeCursorEnter"), s.explicitlyCleared)) {
                                    if (o.markedSpans) {
                                        --a;
                                        continue
                                    }
                                    break
                                }
                                if (!s.atomic) continue;
                                if (r) {
                                    var c = s.find(n < 0 ? 1 : -1),
                                        u = void 0;
                                    if ((n < 0 ? s.inclusiveRight : s.inclusiveLeft) && (c = Ji(e, c, -n, c && c.line == t.line ? o : null)), c && c.line == t.line && (u = ge(c, r)) && (n < 0 ? u < 0 : u > 0)) return Xi(e, c, t, n, i)
                                }
                                var d = s.find(n < 0 ? -1 : 1);
                                return (n < 0 ? s.inclusiveLeft : s.inclusiveRight) && (d = Ji(e, d, n, d.line == t.line ? o : null)), d ? Xi(e, d, t, n, i) : null
                            }
                        }
                    return t
                }

                function Zi(e, t, r, n, i) {
                    var o = n || 1,
                        a = Xi(e, t, r, o, i) || !i && Xi(e, t, r, o, !0) || Xi(e, t, r, -o, i) || !i && Xi(e, t, r, -o, !0);
                    return a || (e.cantEdit = !0, me(e.first, 0))
                }

                function Ji(e, t, r, n) {
                    return r < 0 && 0 == t.ch ? t.line > e.first ? ke(e, me(t.line - 1)) : null : r > 0 && t.ch == (n || le(e, t.line)).text.length ? t.line < e.first + e.size - 1 ? me(t.line + 1, 0) : null : new me(t.line, t.ch + r)
                }

                function Qi(e) {
                    e.setSelection(me(e.firstLine(), 0), me(e.lastLine()), q)
                }

                function eo(e, t, r) {
                    var n = {
                        canceled: !1,
                        from: t.from,
                        to: t.to,
                        text: t.text,
                        origin: t.origin,
                        cancel: function() {
                            return n.canceled = !0
                        }
                    };
                    return r && (n.update = function(t, r, i, o) {
                        t && (n.from = ke(e, t)), r && (n.to = ke(e, r)), i && (n.text = i), void 0 !== o && (n.origin = o)
                    }), rt(e, "beforeChange", e, n), e.cm && rt(e.cm, "beforeChange", e.cm, n), n.canceled ? null : {
                        from: n.from,
                        to: n.to,
                        text: n.text,
                        origin: n.origin
                    }
                }

                function to(e, t, r) {
                    if (e.cm) {
                        if (!e.cm.curOp) return Kn(e.cm, to)(e, t, r);
                        if (e.cm.state.suppressEdits) return
                    }
                    if (!(ot(e, "beforeChange") || e.cm && ot(e.cm, "beforeChange")) || (t = eo(e, t, !0))) {
                        var n = Te && !r && function(e, t, r) {
                            var n = null;
                            if (e.iter(t.line, r.line + 1, function(e) {
                                    if (e.markedSpans)
                                        for (var t = 0; t < e.markedSpans.length; ++t) {
                                            var r = e.markedSpans[t].marker;
                                            !r.readOnly || n && -1 != R(n, r) || (n || (n = [])).push(r)
                                        }
                                }), !n) return null;
                            for (var i = [{
                                    from: t,
                                    to: r
                                }], o = 0; o < n.length; ++o)
                                for (var a = n[o], l = a.find(0), s = 0; s < i.length; ++s) {
                                    var c = i[s];
                                    if (!(ge(c.to, l.from) < 0 || ge(c.from, l.to) > 0)) {
                                        var u = [s, 1],
                                            d = ge(c.from, l.from),
                                            f = ge(c.to, l.to);
                                        (d < 0 || !a.inclusiveLeft && !d) && u.push({
                                            from: c.from,
                                            to: l.from
                                        }), (f > 0 || !a.inclusiveRight && !f) && u.push({
                                            from: l.to,
                                            to: c.to
                                        }), i.splice.apply(i, u), s += u.length - 3
                                    }
                                }
                            return i
                        }(e, t.from, t.to);
                        if (n)
                            for (var i = n.length - 1; i >= 0; --i) ro(e, {
                                from: n[i].from,
                                to: n[i].to,
                                text: i ? [""] : t.text,
                                origin: t.origin
                            });
                        else ro(e, t)
                    }
                }

                function ro(e, t) {
                    if (1 != t.text.length || "" != t.text[0] || 0 != ge(t.from, t.to)) {
                        var r = wi(e, t);
                        Ei(e, t, r, e.cm ? e.cm.curOp.id : NaN), oo(e, t, r, Oe(e, t));
                        var n = [];
                        Li(e, function(e, r) {
                            r || -1 != R(n, e.history) || (co(e.history, t), n.push(e.history)), oo(e, t, null, Oe(e, t))
                        })
                    }
                }

                function no(e, t, r) {
                    if (!e.cm || !e.cm.state.suppressEdits || r) {
                        for (var n, i = e.history, o = e.sel, a = "undo" == t ? i.done : i.undone, l = "undo" == t ? i.undone : i.done, s = 0; s < a.length && (n = a[s], r ? !n.ranges || n.equals(e.sel) : n.ranges); s++);
                        if (s != a.length) {
                            for (i.lastOrigin = i.lastSelOrigin = null;
                                (n = a.pop()).ranges;) {
                                if (Fi(n, l), r && !n.equals(e.sel)) return void Ki(e, n, {
                                    clearRedo: !1
                                });
                                o = n
                            }
                            var c = [];
                            Fi(o, l), l.push({
                                changes: c,
                                generation: i.generation
                            }), i.generation = n.generation || ++i.maxGeneration;
                            for (var u = ot(e, "beforeChange") || e.cm && ot(e.cm, "beforeChange"), d = function(r) {
                                    var i = n.changes[r];
                                    if (i.origin = t, u && !eo(e, i, !1)) return a.length = 0, {};
                                    c.push(Ni(e, i));
                                    var o = r ? wi(e, i) : Y(a);
                                    oo(e, i, o, Pi(e, i)), !r && e.cm && e.cm.scrollIntoView({
                                        from: i.from,
                                        to: yi(i)
                                    });
                                    var l = [];
                                    Li(e, function(e, t) {
                                        t || -1 != R(l, e.history) || (co(e.history, i), l.push(e.history)), oo(e, i, null, Pi(e, i))
                                    })
                                }, f = n.changes.length - 1; f >= 0; --f) {
                                var h = d(f);
                                if (h) return h.v
                            }
                        }
                    }
                }

                function io(e, t) {
                    if (0 != t && (e.first += t, e.sel = new pi(X(e.sel.ranges, function(e) {
                            return new mi(me(e.anchor.line + t, e.anchor.ch), me(e.head.line + t, e.head.ch))
                        }), e.sel.primIndex), e.cm)) {
                        $n(e.cm, e.first, e.first - t, t);
                        for (var r = e.cm.display, n = r.viewFrom; n < r.viewTo; n++) Yn(e.cm, n, "gutter")
                    }
                }

                function oo(e, t, r, n) {
                    if (e.cm && !e.cm.curOp) return Kn(e.cm, oo)(e, t, r, n);
                    if (t.to.line < e.first) io(e, t.text.length - 1 - (t.to.line - t.from.line));
                    else if (!(t.from.line > e.lastLine())) {
                        if (t.from.line < e.first) {
                            var i = t.text.length - 1 - (e.first - t.from.line);
                            io(e, i), t = {
                                from: me(e.first, 0),
                                to: me(t.to.line + i, t.to.ch),
                                text: [Y(t.text)],
                                origin: t.origin
                            }
                        }
                        var o = e.lastLine();
                        t.to.line > o && (t = {
                            from: t.from,
                            to: me(o, le(e, o).text.length),
                            text: [t.text[0]],
                            origin: t.origin
                        }), t.removed = se(e, t.from, t.to), r || (r = wi(e, t)), e.cm ? function(e, t, r) {
                            var n = e.doc,
                                i = e.display,
                                o = t.from,
                                a = t.to,
                                l = !1,
                                s = o.line;
                            e.options.lineWrapping || (s = de(Re(le(n, o.line))), n.iter(s, a.line + 1, function(e) {
                                if (e == i.maxLine) return l = !0, !0
                            }));
                            n.sel.contains(t.from, t.to) > -1 && it(e);
                            Si(n, t, r, tn(e)), e.options.lineWrapping || (n.iter(s, o.line + t.text.length, function(e) {
                                var t = Ve(e);
                                t > i.maxLineLength && (i.maxLine = e, i.maxLineLength = t, i.maxLineChanged = !0, l = !1)
                            }), l && (e.curOp.updateMaxLine = !0));
                            (function(e, t) {
                                if (e.modeFrontier = Math.min(e.modeFrontier, t), !(e.highlightFrontier < t - 10)) {
                                    for (var r = e.first, n = t - 1; n > r; n--) {
                                        var i = le(e, n).stateAfter;
                                        if (i && (!(i instanceof Wt) || n + i.lookAhead < t)) {
                                            r = n + 1;
                                            break
                                        }
                                    }
                                    e.highlightFrontier = Math.min(e.highlightFrontier, r)
                                }
                            })(n, o.line), Qn(e, 400);
                            var c = t.text.length - (a.line - o.line) - 1;
                            t.full ? $n(e) : o.line != a.line || 1 != t.text.length || Ti(e.doc, t) ? $n(e, o.line, a.line + 1, c) : Yn(e, o.line, "text");
                            var u = ot(e, "changes"),
                                d = ot(e, "change");
                            if (d || u) {
                                var f = {
                                    from: o,
                                    to: a,
                                    text: t.text,
                                    removed: t.removed,
                                    origin: t.origin
                                };
                                d && or(e, "change", e, f), u && (e.curOp.changeObjs || (e.curOp.changeObjs = [])).push(f)
                            }
                            e.display.selForContextMenu = null
                        }(e.cm, t, n) : Si(e, t, n), Vi(e, r, q)
                    }
                }

                function ao(e, t, r, n, i) {
                    var o;
                    (n || (n = r), ge(n, r) < 0) && (r = (o = [n, r])[0], n = o[1]);
                    "string" == typeof t && (t = e.splitLines(t)), to(e, {
                        from: r,
                        to: n,
                        text: t,
                        origin: i
                    })
                }

                function lo(e, t, r, n) {
                    r < e.line ? e.line += n : t < e.line && (e.line = t, e.ch = 0)
                }

                function so(e, t, r, n) {
                    for (var i = 0; i < e.length; ++i) {
                        var o = e[i],
                            a = !0;
                        if (o.ranges) {
                            o.copied || ((o = e[i] = o.deepCopy()).copied = !0);
                            for (var l = 0; l < o.ranges.length; l++) lo(o.ranges[l].anchor, t, r, n), lo(o.ranges[l].head, t, r, n)
                        } else {
                            for (var s = 0; s < o.changes.length; ++s) {
                                var c = o.changes[s];
                                if (r < c.from.line) c.from = me(c.from.line + n, c.from.ch), c.to = me(c.to.line + n, c.to.ch);
                                else if (t <= c.to.line) {
                                    a = !1;
                                    break
                                }
                            }
                            a || (e.splice(0, i + 1), i = 0)
                        }
                    }
                }

                function co(e, t) {
                    var r = t.from.line,
                        n = t.to.line,
                        i = t.text.length - (n - r) - 1;
                    so(e.done, r, n, i), so(e.undone, r, n, i)
                }

                function uo(e, t, r, n) {
                    var i = t,
                        o = t;
                    return "number" == typeof t ? o = le(e, xe(e, t)) : i = de(t), null == i ? null : (n(o, i) && e.cm && Yn(e.cm, i, r), o)
                }

                function fo(e) {
                    this.lines = e, this.parent = null;
                    for (var t = 0, r = 0; r < e.length; ++r) e[r].parent = this, t += e[r].height;
                    this.height = t
                }

                function ho(e) {
                    this.children = e;
                    for (var t = 0, r = 0, n = 0; n < e.length; ++n) {
                        var i = e[n];
                        t += i.chunkSize(), r += i.height, i.parent = this
                    }
                    this.size = t, this.height = r, this.parent = null
                }
                mi.prototype.from = function() {
                    return we(this.anchor, this.head)
                }, mi.prototype.to = function() {
                    return be(this.anchor, this.head)
                }, mi.prototype.empty = function() {
                    return this.head.line == this.anchor.line && this.head.ch == this.anchor.ch
                }, fo.prototype = {
                    chunkSize: function() {
                        return this.lines.length
                    },
                    removeInner: function(e, t) {
                        for (var r, n = e, i = e + t; n < i; ++n) {
                            var o = this.lines[n];
                            this.height -= o.height, (r = o).parent = null, _e(r), or(o, "delete")
                        }
                        this.lines.splice(e, t)
                    },
                    collapse: function(e) {
                        e.push.apply(e, this.lines)
                    },
                    insertInner: function(e, t, r) {
                        this.height += r, this.lines = this.lines.slice(0, e).concat(t).concat(this.lines.slice(e));
                        for (var n = 0; n < t.length; ++n) t[n].parent = this
                    },
                    iterN: function(e, t, r) {
                        for (var n = e + t; e < n; ++e)
                            if (r(this.lines[e])) return !0
                    }
                }, ho.prototype = {
                    chunkSize: function() {
                        return this.size
                    },
                    removeInner: function(e, t) {
                        this.size -= t;
                        for (var r = 0; r < this.children.length; ++r) {
                            var n = this.children[r],
                                i = n.chunkSize();
                            if (e < i) {
                                var o = Math.min(t, i - e),
                                    a = n.height;
                                if (n.removeInner(e, o), this.height -= a - n.height, i == o && (this.children.splice(r--, 1), n.parent = null), 0 == (t -= o)) break;
                                e = 0
                            } else e -= i
                        }
                        if (this.size - t < 25 && (this.children.length > 1 || !(this.children[0] instanceof fo))) {
                            var l = [];
                            this.collapse(l), this.children = [new fo(l)], this.children[0].parent = this
                        }
                    },
                    collapse: function(e) {
                        for (var t = 0; t < this.children.length; ++t) this.children[t].collapse(e)
                    },
                    insertInner: function(e, t, r) {
                        this.size += t.length, this.height += r;
                        for (var n = 0; n < this.children.length; ++n) {
                            var i = this.children[n],
                                o = i.chunkSize();
                            if (e <= o) {
                                if (i.insertInner(e, t, r), i.lines && i.lines.length > 50) {
                                    for (var a = i.lines.length % 25 + 25, l = a; l < i.lines.length;) {
                                        var s = new fo(i.lines.slice(l, l += 25));
                                        i.height -= s.height, this.children.splice(++n, 0, s), s.parent = this
                                    }
                                    i.lines = i.lines.slice(0, a), this.maybeSpill()
                                }
                                break
                            }
                            e -= o
                        }
                    },
                    maybeSpill: function() {
                        if (!(this.children.length <= 10)) {
                            var e = this;
                            do {
                                var t = new ho(e.children.splice(e.children.length - 5, 5));
                                if (e.parent) {
                                    e.size -= t.size, e.height -= t.height;
                                    var r = R(e.parent.children, e);
                                    e.parent.children.splice(r + 1, 0, t)
                                } else {
                                    var n = new ho(e.children);
                                    n.parent = e, e.children = [n, t], e = n
                                }
                                t.parent = e.parent
                            } while (e.children.length > 10);
                            e.parent.maybeSpill()
                        }
                    },
                    iterN: function(e, t, r) {
                        for (var n = 0; n < this.children.length; ++n) {
                            var i = this.children[n],
                                o = i.chunkSize();
                            if (e < o) {
                                var a = Math.min(t, o - e);
                                if (i.iterN(e, a, r)) return !0;
                                if (0 == (t -= a)) break;
                                e = 0
                            } else e -= o
                        }
                    }
                };
                var po = function(e, t, r) {
                    if (r)
                        for (var n in r) r.hasOwnProperty(n) && (this[n] = r[n]);
                    this.doc = e, this.node = t
                };

                function mo(e, t, r) {
                    Ke(t) < (e.curOp && e.curOp.scrollTop || e.doc.scrollTop) && kn(e, r)
                }
                po.prototype.clear = function() {
                    var e = this.doc.cm,
                        t = this.line.widgets,
                        r = this.line,
                        n = de(r);
                    if (null != n && t) {
                        for (var i = 0; i < t.length; ++i) t[i] == this && t.splice(i--, 1);
                        t.length || (r.widgets = null);
                        var o = vr(this);
                        ue(r, Math.max(0, r.height - o)), e && (Un(e, function() {
                            mo(e, r, -o), Yn(e, n, "widget")
                        }), or(e, "lineWidgetCleared", e, this, n))
                    }
                }, po.prototype.changed = function() {
                    var e = this,
                        t = this.height,
                        r = this.doc.cm,
                        n = this.line;
                    this.height = null;
                    var i = vr(this) - t;
                    i && (ue(n, n.height + i), r && Un(r, function() {
                        r.curOp.forceUpdate = !0, mo(r, n, i), or(r, "lineWidgetChanged", r, e, de(n))
                    }))
                }, at(po);
                var go = 0,
                    vo = function(e, t) {
                        this.lines = [], this.type = t, this.doc = e, this.id = ++go
                    };

                function yo(e, t, r, n, i) {
                    if (n && n.shared) return function(e, t, r, n, i) {
                        (n = P(n)).shared = !1;
                        var o = [yo(e, t, r, n, i)],
                            a = o[0],
                            l = n.widgetNode;
                        return Li(e, function(e) {
                            l && (n.widgetNode = l.cloneNode(!0)), o.push(yo(e, ke(e, t), ke(e, r), n, i));
                            for (var s = 0; s < e.linked.length; ++s)
                                if (e.linked[s].isParent) return;
                            a = Y(o)
                        }), new bo(o, a)
                    }(e, t, r, n, i);
                    if (e.cm && !e.cm.curOp) return Kn(e.cm, yo)(e, t, r, n, i);
                    var o = new vo(e, i),
                        a = ge(t, r);
                    if (n && P(n, o, !1), a > 0 || 0 == a && !1 !== o.clearWhenEmpty) return o;
                    if (o.replacedWith && (o.collapsed = !0, o.widgetNode = N("span", [o.replacedWith], "CodeMirror-widget"), n.handleMouseEvents || o.widgetNode.setAttribute("cm-ignore-events", "true"), n.insertLeft && (o.widgetNode.insertLeft = !0)), o.collapsed) {
                        if (Ie(e, t.line, t, r, o) || t.line != r.line && Ie(e, r.line, t, r, o)) throw new Error("Inserting collapsed marker partially overlapping an existing one");
                        Se = !0
                    }
                    o.addToHistory && Ei(e, {
                        from: t,
                        to: r,
                        origin: "markText"
                    }, e.sel, NaN);
                    var l, s = t.line,
                        c = e.cm;
                    if (e.iter(s, r.line + 1, function(e) {
                            var n, i;
                            c && o.collapsed && !c.options.lineWrapping && Re(e) == c.display.maxLine && (l = !0), o.collapsed && s != t.line && ue(e, 0), n = e, i = new Le(o, s == t.line ? t.ch : null, s == r.line ? r.ch : null), n.markedSpans = n.markedSpans ? n.markedSpans.concat([i]) : [i], i.marker.attachLine(n), ++s
                        }), o.collapsed && e.iter(t.line, r.line + 1, function(t) {
                            qe(e, t) && ue(t, 0)
                        }), o.clearOnEnter && Qe(o, "beforeCursorEnter", function() {
                            return o.clear()
                        }), o.readOnly && (Te = !0, (e.history.done.length || e.history.undone.length) && e.clearHistory()), o.collapsed && (o.id = ++go, o.atomic = !0), c) {
                        if (l && (c.curOp.updateMaxLine = !0), o.collapsed) $n(c, t.line, r.line + 1);
                        else if (o.className || o.title || o.startStyle || o.endStyle || o.css)
                            for (var u = t.line; u <= r.line; u++) Yn(c, u, "text");
                        o.atomic && $i(c.doc), or(c, "markerAdded", c, o)
                    }
                    return o
                }
                vo.prototype.clear = function() {
                    var e = this;
                    if (!this.explicitlyCleared) {
                        var t = this.doc.cm,
                            r = t && !t.curOp;
                        if (r && Hn(t), ot(this, "clear")) {
                            var n = this.find();
                            n && or(this, "clear", n.from, n.to)
                        }
                        for (var i = null, o = null, a = 0; a < this.lines.length; ++a) {
                            var l = e.lines[a],
                                s = Me(l.markedSpans, e);
                            t && !e.collapsed ? Yn(t, de(l), "text") : t && (null != s.to && (o = de(l)), null != s.from && (i = de(l))), l.markedSpans = Ae(l.markedSpans, s), null == s.from && e.collapsed && !qe(e.doc, l) && t && ue(l, Zr(t.display))
                        }
                        if (t && this.collapsed && !t.options.lineWrapping)
                            for (var c = 0; c < this.lines.length; ++c) {
                                var u = Re(e.lines[c]),
                                    d = Ve(u);
                                d > t.display.maxLineLength && (t.display.maxLine = u, t.display.maxLineLength = d, t.display.maxLineChanged = !0)
                            }
                        null != i && t && this.collapsed && $n(t, i, o + 1), this.lines.length = 0, this.explicitlyCleared = !0, this.atomic && this.doc.cantEdit && (this.doc.cantEdit = !1, t && $i(t.doc)), t && or(t, "markerCleared", t, this, i, o), r && In(t), this.parent && this.parent.clear()
                    }
                }, vo.prototype.find = function(e, t) {
                    var r, n;
                    null == e && "bookmark" == this.type && (e = 1);
                    for (var i = 0; i < this.lines.length; ++i) {
                        var o = this.lines[i],
                            a = Me(o.markedSpans, this);
                        if (null != a.from && (r = me(t ? o : de(o), a.from), -1 == e)) return r;
                        if (null != a.to && (n = me(t ? o : de(o), a.to), 1 == e)) return n
                    }
                    return r && {
                        from: r,
                        to: n
                    }
                }, vo.prototype.changed = function() {
                    var e = this,
                        t = this.find(-1, !0),
                        r = this,
                        n = this.doc.cm;
                    t && n && Un(n, function() {
                        var i = t.line,
                            o = de(t.line),
                            a = Mr(n, o);
                        if (a && (Fr(a), n.curOp.selectionChanged = n.curOp.forceUpdate = !0), n.curOp.updateMaxLine = !0, !qe(r.doc, i) && null != r.height) {
                            var l = r.height;
                            r.height = null;
                            var s = vr(r) - l;
                            s && ue(i, i.height + s)
                        }
                        or(n, "markerChanged", n, e)
                    })
                }, vo.prototype.attachLine = function(e) {
                    if (!this.lines.length && this.doc.cm) {
                        var t = this.doc.cm.curOp;
                        t.maybeHiddenMarkers && -1 != R(t.maybeHiddenMarkers, this) || (t.maybeUnhiddenMarkers || (t.maybeUnhiddenMarkers = [])).push(this)
                    }
                    this.lines.push(e)
                }, vo.prototype.detachLine = function(e) {
                    if (this.lines.splice(R(this.lines, e), 1), !this.lines.length && this.doc.cm) {
                        var t = this.doc.cm.curOp;
                        (t.maybeHiddenMarkers || (t.maybeHiddenMarkers = [])).push(this)
                    }
                }, at(vo);
                var bo = function(e, t) {
                    this.markers = e, this.primary = t;
                    for (var r = 0; r < e.length; ++r) e[r].parent = this
                };

                function wo(e) {
                    return e.findMarks(me(e.first, 0), e.clipPos(me(e.lastLine())), function(e) {
                        return e.parent
                    })
                }

                function xo(e) {
                    for (var t = function(t) {
                            var r = e[t],
                                n = [r.primary.doc];
                            Li(r.primary.doc, function(e) {
                                return n.push(e)
                            });
                            for (var i = 0; i < r.markers.length; i++) {
                                var o = r.markers[i]; - 1 == R(n, o.doc) && (o.parent = null, r.markers.splice(i--, 1))
                            }
                        }, r = 0; r < e.length; r++) t(r)
                }
                bo.prototype.clear = function() {
                    if (!this.explicitlyCleared) {
                        this.explicitlyCleared = !0;
                        for (var e = 0; e < this.markers.length; ++e) this.markers[e].clear();
                        or(this, "clear")
                    }
                }, bo.prototype.find = function(e, t) {
                    return this.primary.find(e, t)
                }, at(bo);
                var ko = 0,
                    Co = function(e, t, r, n, i) {
                        if (!(this instanceof Co)) return new Co(e, t, r, n, i);
                        null == r && (r = 0), ho.call(this, [new fo([new Kt("", null)])]), this.first = r, this.scrollTop = this.scrollLeft = 0, this.cantEdit = !1, this.cleanGeneration = 1, this.modeFrontier = this.highlightFrontier = r;
                        var o = me(r, 0);
                        this.sel = vi(o), this.history = new Oi(null), this.id = ++ko, this.modeOption = t, this.lineSep = n, this.direction = "rtl" == i ? "rtl" : "ltr", this.extend = !1, "string" == typeof e && (e = this.splitLines(e)), Si(this, {
                            from: o,
                            to: o,
                            text: e
                        }), Ki(this, vi(o), q)
                    };
                Co.prototype = J(ho.prototype, {
                    constructor: Co,
                    iter: function(e, t, r) {
                        r ? this.iterN(e - this.first, t - e, r) : this.iterN(this.first, this.first + this.size, e)
                    },
                    insert: function(e, t) {
                        for (var r = 0, n = 0; n < t.length; ++n) r += t[n].height;
                        this.insertInner(e - this.first, t, r)
                    },
                    remove: function(e, t) {
                        this.removeInner(e - this.first, t)
                    },
                    getValue: function(e) {
                        var t = ce(this, this.first, this.first + this.size);
                        return !1 === e ? t : t.join(e || this.lineSeparator())
                    },
                    setValue: Gn(function(e) {
                        var t = me(this.first, 0),
                            r = this.first + this.size - 1;
                        to(this, {
                            from: t,
                            to: me(r, le(this, r).text.length),
                            text: this.splitLines(e),
                            origin: "setValue",
                            full: !0
                        }, !0), this.cm && Tn(this.cm, 0, 0), Ki(this, vi(t), q)
                    }),
                    replaceRange: function(e, t, r, n) {
                        ao(this, e, t = ke(this, t), r = r ? ke(this, r) : t, n)
                    },
                    getRange: function(e, t, r) {
                        var n = se(this, ke(this, e), ke(this, t));
                        return !1 === r ? n : n.join(r || this.lineSeparator())
                    },
                    getLine: function(e) {
                        var t = this.getLineHandle(e);
                        return t && t.text
                    },
                    getLineHandle: function(e) {
                        if (he(this, e)) return le(this, e)
                    },
                    getLineNumber: function(e) {
                        return de(e)
                    },
                    getLineHandleVisualStart: function(e) {
                        return "number" == typeof e && (e = le(this, e)), Re(e)
                    },
                    lineCount: function() {
                        return this.size
                    },
                    firstLine: function() {
                        return this.first
                    },
                    lastLine: function() {
                        return this.first + this.size - 1
                    },
                    clipPos: function(e) {
                        return ke(this, e)
                    },
                    getCursor: function(e) {
                        var t = this.sel.primary();
                        return null == e || "head" == e ? t.head : "anchor" == e ? t.anchor : "end" == e || "to" == e || !1 === e ? t.to() : t.from()
                    },
                    listSelections: function() {
                        return this.sel.ranges
                    },
                    somethingSelected: function() {
                        return this.sel.somethingSelected()
                    },
                    setCursor: Gn(function(e, t, r) {
                        qi(this, ke(this, "number" == typeof e ? me(e, t || 0) : e), null, r)
                    }),
                    setSelection: Gn(function(e, t, r) {
                        qi(this, ke(this, e), ke(this, t || e), r)
                    }),
                    extendSelection: Gn(function(e, t, r) {
                        Ri(this, ke(this, e), t && ke(this, t), r)
                    }),
                    extendSelections: Gn(function(e, t) {
                        ji(this, Ce(this, e), t)
                    }),
                    extendSelectionsBy: Gn(function(e, t) {
                        ji(this, Ce(this, X(this.sel.ranges, e)), t)
                    }),
                    setSelections: Gn(function(e, t, r) {
                        if (e.length) {
                            for (var n = [], i = 0; i < e.length; i++) n[i] = new mi(ke(this, e[i].anchor), ke(this, e[i].head));
                            null == t && (t = Math.min(e.length - 1, this.sel.primIndex)), Ki(this, gi(n, t), r)
                        }
                    }),
                    addSelection: Gn(function(e, t, r) {
                        var n = this.sel.ranges.slice(0);
                        n.push(new mi(ke(this, e), ke(this, t || e))), Ki(this, gi(n, n.length - 1), r)
                    }),
                    getSelection: function(e) {
                        for (var t, r = this.sel.ranges, n = 0; n < r.length; n++) {
                            var i = se(this, r[n].from(), r[n].to());
                            t = t ? t.concat(i) : i
                        }
                        return !1 === e ? t : t.join(e || this.lineSeparator())
                    },
                    getSelections: function(e) {
                        for (var t = [], r = this.sel.ranges, n = 0; n < r.length; n++) {
                            var i = se(this, r[n].from(), r[n].to());
                            !1 !== e && (i = i.join(e || this.lineSeparator())), t[n] = i
                        }
                        return t
                    },
                    replaceSelection: function(e, t, r) {
                        for (var n = [], i = 0; i < this.sel.ranges.length; i++) n[i] = e;
                        this.replaceSelections(n, t, r || "+input")
                    },
                    replaceSelections: Gn(function(e, t, r) {
                        for (var n = [], i = this.sel, o = 0; o < i.ranges.length; o++) {
                            var a = i.ranges[o];
                            n[o] = {
                                from: a.from(),
                                to: a.to(),
                                text: this.splitLines(e[o]),
                                origin: r
                            }
                        }
                        for (var l = t && "end" != t && function(e, t, r) {
                                for (var n = [], i = me(e.first, 0), o = i, a = 0; a < t.length; a++) {
                                    var l = t[a],
                                        s = xi(l.from, i, o),
                                        c = xi(yi(l), i, o);
                                    if (i = l.to, o = c, "around" == r) {
                                        var u = e.sel.ranges[a],
                                            d = ge(u.head, u.anchor) < 0;
                                        n[a] = new mi(d ? c : s, d ? s : c)
                                    } else n[a] = new mi(s, s)
                                }
                                return new pi(n, e.sel.primIndex)
                            }(this, n, t), s = n.length - 1; s >= 0; s--) to(this, n[s]);
                        l ? Ui(this, l) : this.cm && Cn(this.cm)
                    }),
                    undo: Gn(function() {
                        no(this, "undo")
                    }),
                    redo: Gn(function() {
                        no(this, "redo")
                    }),
                    undoSelection: Gn(function() {
                        no(this, "undo", !0)
                    }),
                    redoSelection: Gn(function() {
                        no(this, "redo", !0)
                    }),
                    setExtending: function(e) {
                        this.extend = e
                    },
                    getExtending: function() {
                        return this.extend
                    },
                    historySize: function() {
                        for (var e = this.history, t = 0, r = 0, n = 0; n < e.done.length; n++) e.done[n].ranges || ++t;
                        for (var i = 0; i < e.undone.length; i++) e.undone[i].ranges || ++r;
                        return {
                            undo: t,
                            redo: r
                        }
                    },
                    clearHistory: function() {
                        this.history = new Oi(this.history.maxGeneration)
                    },
                    markClean: function() {
                        this.cleanGeneration = this.changeGeneration(!0)
                    },
                    changeGeneration: function(e) {
                        return e && (this.history.lastOp = this.history.lastSelOp = this.history.lastOrigin = null), this.history.generation
                    },
                    isClean: function(e) {
                        return this.history.generation == (e || this.cleanGeneration)
                    },
                    getHistory: function() {
                        return {
                            done: Hi(this.history.done),
                            undone: Hi(this.history.undone)
                        }
                    },
                    setHistory: function(e) {
                        var t = this.history = new Oi(this.history.maxGeneration);
                        t.done = Hi(e.done.slice(0), null, !0), t.undone = Hi(e.undone.slice(0), null, !0)
                    },
                    setGutterMarker: Gn(function(e, t, r) {
                        return uo(this, e, "gutter", function(e) {
                            var n = e.gutterMarkers || (e.gutterMarkers = {});
                            return n[t] = r, !r && re(n) && (e.gutterMarkers = null), !0
                        })
                    }),
                    clearGutter: Gn(function(e) {
                        var t = this;
                        this.iter(function(r) {
                            r.gutterMarkers && r.gutterMarkers[e] && uo(t, r, "gutter", function() {
                                return r.gutterMarkers[e] = null, re(r.gutterMarkers) && (r.gutterMarkers = null), !0
                            })
                        })
                    }),
                    lineInfo: function(e) {
                        var t;
                        if ("number" == typeof e) {
                            if (!he(this, e)) return null;
                            if (t = e, !(e = le(this, e))) return null
                        } else if (null == (t = de(e))) return null;
                        return {
                            line: t,
                            handle: e,
                            text: e.text,
                            gutterMarkers: e.gutterMarkers,
                            textClass: e.textClass,
                            bgClass: e.bgClass,
                            wrapClass: e.wrapClass,
                            widgets: e.widgets
                        }
                    },
                    addLineClass: Gn(function(e, t, r) {
                        return uo(this, e, "gutter" == t ? "gutter" : "class", function(e) {
                            var n = "text" == t ? "textClass" : "background" == t ? "bgClass" : "gutter" == t ? "gutterClass" : "wrapClass";
                            if (e[n]) {
                                if (T(r).test(e[n])) return !1;
                                e[n] += " " + r
                            } else e[n] = r;
                            return !0
                        })
                    }),
                    removeLineClass: Gn(function(e, t, r) {
                        return uo(this, e, "gutter" == t ? "gutter" : "class", function(e) {
                            var n = "text" == t ? "textClass" : "background" == t ? "bgClass" : "gutter" == t ? "gutterClass" : "wrapClass",
                                i = e[n];
                            if (!i) return !1;
                            if (null == r) e[n] = null;
                            else {
                                var o = i.match(T(r));
                                if (!o) return !1;
                                var a = o.index + o[0].length;
                                e[n] = i.slice(0, o.index) + (o.index && a != i.length ? " " : "") + i.slice(a) || null
                            }
                            return !0
                        })
                    }),
                    addLineWidget: Gn(function(e, t, r) {
                        return i = e, o = new po(n = this, t, r), (a = n.cm) && o.noHScroll && (a.display.alignWidgets = !0), uo(n, i, "widget", function(e) {
                            var t = e.widgets || (e.widgets = []);
                            if (null == o.insertAt ? t.push(o) : t.splice(Math.min(t.length - 1, Math.max(0, o.insertAt)), 0, o), o.line = e, a && !qe(n, e)) {
                                var r = Ke(e) < n.scrollTop;
                                ue(e, e.height + vr(o)), r && kn(a, o.height), a.curOp.forceUpdate = !0
                            }
                            return !0
                        }), or(a, "lineWidgetAdded", a, o, "number" == typeof i ? i : de(i)), o;
                        var n, i, o, a
                    }),
                    removeLineWidget: function(e) {
                        e.clear()
                    },
                    markText: function(e, t, r) {
                        return yo(this, ke(this, e), ke(this, t), r, r && r.type || "range")
                    },
                    setBookmark: function(e, t) {
                        var r = {
                            replacedWith: t && (null == t.nodeType ? t.widget : t),
                            insertLeft: t && t.insertLeft,
                            clearWhenEmpty: !1,
                            shared: t && t.shared,
                            handleMouseEvents: t && t.handleMouseEvents
                        };
                        return yo(this, e = ke(this, e), e, r, "bookmark")
                    },
                    findMarksAt: function(e) {
                        var t = [],
                            r = le(this, (e = ke(this, e)).line).markedSpans;
                        if (r)
                            for (var n = 0; n < r.length; ++n) {
                                var i = r[n];
                                (null == i.from || i.from <= e.ch) && (null == i.to || i.to >= e.ch) && t.push(i.marker.parent || i.marker)
                            }
                        return t
                    },
                    findMarks: function(e, t, r) {
                        e = ke(this, e), t = ke(this, t);
                        var n = [],
                            i = e.line;
                        return this.iter(e.line, t.line + 1, function(o) {
                            var a = o.markedSpans;
                            if (a)
                                for (var l = 0; l < a.length; l++) {
                                    var s = a[l];
                                    null != s.to && i == e.line && e.ch >= s.to || null == s.from && i != e.line || null != s.from && i == t.line && s.from >= t.ch || r && !r(s.marker) || n.push(s.marker.parent || s.marker)
                                }++i
                        }), n
                    },
                    getAllMarks: function() {
                        var e = [];
                        return this.iter(function(t) {
                            var r = t.markedSpans;
                            if (r)
                                for (var n = 0; n < r.length; ++n) null != r[n].from && e.push(r[n].marker)
                        }), e
                    },
                    posFromIndex: function(e) {
                        var t, r = this.first,
                            n = this.lineSeparator().length;
                        return this.iter(function(i) {
                            var o = i.text.length + n;
                            if (o > e) return t = e, !0;
                            e -= o, ++r
                        }), ke(this, me(r, t))
                    },
                    indexFromPos: function(e) {
                        var t = (e = ke(this, e)).ch;
                        if (e.line < this.first || e.ch < 0) return 0;
                        var r = this.lineSeparator().length;
                        return this.iter(this.first, e.line, function(e) {
                            t += e.text.length + r
                        }), t
                    },
                    copy: function(e) {
                        var t = new Co(ce(this, this.first, this.first + this.size), this.modeOption, this.first, this.lineSep, this.direction);
                        return t.scrollTop = this.scrollTop, t.scrollLeft = this.scrollLeft, t.sel = this.sel, t.extend = !1, e && (t.history.undoDepth = this.history.undoDepth, t.setHistory(this.getHistory())), t
                    },
                    linkedDoc: function(e) {
                        e || (e = {});
                        var t = this.first,
                            r = this.first + this.size;
                        null != e.from && e.from > t && (t = e.from), null != e.to && e.to < r && (r = e.to);
                        var n = new Co(ce(this, t, r), e.mode || this.modeOption, t, this.lineSep, this.direction);
                        return e.sharedHist && (n.history = this.history), (this.linked || (this.linked = [])).push({
                                doc: n,
                                sharedHist: e.sharedHist
                            }), n.linked = [{
                                doc: this,
                                isParent: !0,
                                sharedHist: e.sharedHist
                            }],
                            function(e, t) {
                                for (var r = 0; r < t.length; r++) {
                                    var n = t[r],
                                        i = n.find(),
                                        o = e.clipPos(i.from),
                                        a = e.clipPos(i.to);
                                    if (ge(o, a)) {
                                        var l = yo(e, o, a, n.primary, n.primary.type);
                                        n.markers.push(l), l.parent = n
                                    }
                                }
                            }(n, wo(this)), n
                    },
                    unlinkDoc: function(e) {
                        if (e instanceof wa && (e = e.doc), this.linked)
                            for (var t = 0; t < this.linked.length; ++t) {
                                if (this.linked[t].doc == e) {
                                    this.linked.splice(t, 1), e.unlinkDoc(this), xo(wo(this));
                                    break
                                }
                            }
                        if (e.history == this.history) {
                            var r = [e.id];
                            Li(e, function(e) {
                                return r.push(e.id)
                            }, !0), e.history = new Oi(null), e.history.done = Hi(this.history.done, r), e.history.undone = Hi(this.history.undone, r)
                        }
                    },
                    iterLinkedDocs: function(e) {
                        Li(this, e)
                    },
                    getMode: function() {
                        return this.mode
                    },
                    getEditor: function() {
                        return this.cm
                    },
                    splitLines: function(e) {
                        return this.lineSep ? e.split(this.lineSep) : bt(e)
                    },
                    lineSeparator: function() {
                        return this.lineSep || "\n"
                    },
                    setDirection: Gn(function(e) {
                        var t;
                        ("rtl" != e && (e = "ltr"), e != this.direction) && (this.direction = e, this.iter(function(e) {
                            return e.order = null
                        }), this.cm && Un(t = this.cm, function() {
                            Ai(t), $n(t)
                        }))
                    })
                }), Co.prototype.eachLine = Co.prototype.iter;
                var To = 0;

                function So(e) {
                    var t = this;
                    if (Lo(t), !nt(t, e) && !yr(t.display, e)) {
                        lt(e), a && (To = +new Date);
                        var r = nn(t, e, !0),
                            n = e.dataTransfer.files;
                        if (r && !t.isReadOnly())
                            if (n && n.length && window.FileReader && window.File)
                                for (var i = n.length, o = Array(i), l = 0, s = function(e, n) {
                                        if (!t.options.allowDropFileTypes || -1 != R(t.options.allowDropFileTypes, e.type)) {
                                            var a = new FileReader;
                                            a.onload = Kn(t, function() {
                                                var e = a.result;
                                                if (/[\x00-\x08\x0e-\x1f]{2}/.test(e) && (e = ""), o[n] = e, ++l == i) {
                                                    var s = {
                                                        from: r = ke(t.doc, r),
                                                        to: r,
                                                        text: t.doc.splitLines(o.join(t.doc.lineSeparator())),
                                                        origin: "paste"
                                                    };
                                                    to(t.doc, s), Ui(t.doc, vi(r, yi(s)))
                                                }
                                            }), a.readAsText(e)
                                        }
                                    }, c = 0; c < i; ++c) s(n[c], c);
                            else {
                                if (t.state.draggingText && t.doc.sel.contains(r) > -1) return t.state.draggingText(e), void setTimeout(function() {
                                    return t.display.input.focus()
                                }, 20);
                                try {
                                    var u = e.dataTransfer.getData("Text");
                                    if (u) {
                                        var d;
                                        if (t.state.draggingText && !t.state.draggingText.copy && (d = t.listSelections()), Vi(t.doc, vi(r, r)), d)
                                            for (var f = 0; f < d.length; ++f) ao(t.doc, "", d[f].anchor, d[f].head, "drag");
                                        t.replaceSelection(u, "around", "paste"), t.display.input.focus()
                                    }
                                } catch (e) {}
                            }
                    }
                }

                function Lo(e) {
                    e.display.dragCursor && (e.display.lineSpace.removeChild(e.display.dragCursor), e.display.dragCursor = null)
                }

                function Mo(e) {
                    if (document.getElementsByClassName)
                        for (var t = document.getElementsByClassName("CodeMirror"), r = 0; r < t.length; r++) {
                            var n = t[r].CodeMirror;
                            n && e(n)
                        }
                }
                var Ao = !1;

                function Oo() {
                    var e;
                    Ao || (Qe(window, "resize", function() {
                        null == e && (e = setTimeout(function() {
                            e = null, Mo(No)
                        }, 100))
                    }), Qe(window, "blur", function() {
                        return Mo(mn)
                    }), Ao = !0)
                }

                function No(e) {
                    var t = e.display;
                    t.lastWrapHeight == t.wrapper.clientHeight && t.lastWrapWidth == t.wrapper.clientWidth || (t.cachedCharWidth = t.cachedTextHeight = t.cachedPaddingH = null, t.scrollbarsClipped = !1, e.setSize())
                }
                for (var _o = {
                        3: "Enter",
                        8: "Backspace",
                        9: "Tab",
                        13: "Enter",
                        16: "Shift",
                        17: "Ctrl",
                        18: "Alt",
                        19: "Pause",
                        20: "CapsLock",
                        27: "Esc",
                        32: "Space",
                        33: "PageUp",
                        34: "PageDown",
                        35: "End",
                        36: "Home",
                        37: "Left",
                        38: "Up",
                        39: "Right",
                        40: "Down",
                        44: "PrintScrn",
                        45: "Insert",
                        46: "Delete",
                        59: ";",
                        61: "=",
                        91: "Mod",
                        92: "Mod",
                        93: "Mod",
                        106: "*",
                        107: "=",
                        109: "-",
                        110: ".",
                        111: "/",
                        127: "Delete",
                        173: "-",
                        186: ";",
                        187: "=",
                        188: ",",
                        189: "-",
                        190: ".",
                        191: "/",
                        192: "`",
                        219: "[",
                        220: "\\",
                        221: "]",
                        222: "'",
                        63232: "Up",
                        63233: "Down",
                        63234: "Left",
                        63235: "Right",
                        63272: "Delete",
                        63273: "Home",
                        63275: "End",
                        63276: "PageUp",
                        63277: "PageDown",
                        63302: "Insert"
                    }, Eo = 0; Eo < 10; Eo++) _o[Eo + 48] = _o[Eo + 96] = String(Eo);
                for (var Wo = 65; Wo <= 90; Wo++) _o[Wo] = String.fromCharCode(Wo);
                for (var Fo = 1; Fo <= 12; Fo++) _o[Fo + 111] = _o[Fo + 63235] = "F" + Fo;
                var Do = {};

                function zo(e) {
                    var t, r, n, i, o = e.split(/-(?!$)/);
                    e = o[o.length - 1];
                    for (var a = 0; a < o.length - 1; a++) {
                        var l = o[a];
                        if (/^(cmd|meta|m)$/i.test(l)) i = !0;
                        else if (/^a(lt)?$/i.test(l)) t = !0;
                        else if (/^(c|ctrl|control)$/i.test(l)) r = !0;
                        else {
                            if (!/^s(hift)?$/i.test(l)) throw new Error("Unrecognized modifier name: " + l);
                            n = !0
                        }
                    }
                    return t && (e = "Alt-" + e), r && (e = "Ctrl-" + e), i && (e = "Cmd-" + e), n && (e = "Shift-" + e), e
                }

                function Po(e) {
                    var t = {};
                    for (var r in e)
                        if (e.hasOwnProperty(r)) {
                            var n = e[r];
                            if (/^(name|fallthrough|(de|at)tach)$/.test(r)) continue;
                            if ("..." == n) {
                                delete e[r];
                                continue
                            }
                            for (var i = X(r.split(" "), zo), o = 0; o < i.length; o++) {
                                var a = void 0,
                                    l = void 0;
                                o == i.length - 1 ? (l = i.join(" "), a = n) : (l = i.slice(0, o + 1).join(" "), a = "...");
                                var s = t[l];
                                if (s) {
                                    if (s != a) throw new Error("Inconsistent bindings for " + l)
                                } else t[l] = a
                            }
                            delete e[r]
                        }
                    for (var c in t) e[c] = t[c];
                    return e
                }

                function Ho(e, t, r, n) {
                    var i = (t = Bo(t)).call ? t.call(e, n) : t[e];
                    if (!1 === i) return "nothing";
                    if ("..." === i) return "multi";
                    if (null != i && r(i)) return "handled";
                    if (t.fallthrough) {
                        if ("[object Array]" != Object.prototype.toString.call(t.fallthrough)) return Ho(e, t.fallthrough, r, n);
                        for (var o = 0; o < t.fallthrough.length; o++) {
                            var a = Ho(e, t.fallthrough[o], r, n);
                            if (a) return a
                        }
                    }
                }

                function Io(e) {
                    var t = "string" == typeof e ? e : _o[e.keyCode];
                    return "Ctrl" == t || "Alt" == t || "Shift" == t || "Mod" == t
                }

                function Ro(e, t, r) {
                    var n = e;
                    return t.altKey && "Alt" != n && (e = "Alt-" + e), (k ? t.metaKey : t.ctrlKey) && "Ctrl" != n && (e = "Ctrl-" + e), (k ? t.ctrlKey : t.metaKey) && "Cmd" != n && (e = "Cmd-" + e), !r && t.shiftKey && "Shift" != n && (e = "Shift-" + e), e
                }

                function jo(e, t) {
                    if (d && 34 == e.keyCode && e.char) return !1;
                    var r = _o[e.keyCode];
                    return null != r && !e.altGraphKey && Ro(r, e, t)
                }

                function Bo(e) {
                    return "string" == typeof e ? Do[e] : e
                }

                function qo(e, t) {
                    for (var r = e.doc.sel.ranges, n = [], i = 0; i < r.length; i++) {
                        for (var o = t(r[i]); n.length && ge(o.from, Y(n).to) <= 0;) {
                            var a = n.pop();
                            if (ge(a.from, o.from) < 0) {
                                o.from = a.from;
                                break
                            }
                        }
                        n.push(o)
                    }
                    Un(e, function() {
                        for (var t = n.length - 1; t >= 0; t--) ao(e.doc, "", n[t].from, n[t].to, "+delete");
                        Cn(e)
                    })
                }

                function Uo(e, t, r) {
                    var n = oe(e.text, t + r, r);
                    return n < 0 || n > e.text.length ? null : n
                }

                function Ko(e, t, r) {
                    var n = Uo(e, t.ch, r);
                    return null == n ? null : new me(t.line, n, r < 0 ? "after" : "before")
                }

                function Vo(e, t, r, n, i) {
                    if (e) {
                        var o = Ze(r, t.doc.direction);
                        if (o) {
                            var a, l = i < 0 ? Y(o) : o[0],
                                s = i < 0 == (1 == l.level) ? "after" : "before";
                            if (l.level > 0 || "rtl" == t.doc.direction) {
                                var c = Ar(t, r);
                                a = i < 0 ? r.text.length - 1 : 0;
                                var u = Or(t, c, a).top;
                                a = ae(function(e) {
                                    return Or(t, c, e).top == u
                                }, i < 0 == (1 == l.level) ? l.from : l.to - 1, a), "before" == s && (a = Uo(r, a, 1))
                            } else a = i < 0 ? l.to : l.from;
                            return new me(n, a, s)
                        }
                    }
                    return new me(n, i < 0 ? r.text.length : 0, i < 0 ? "before" : "after")
                }
                Do.basic = {
                    Left: "goCharLeft",
                    Right: "goCharRight",
                    Up: "goLineUp",
                    Down: "goLineDown",
                    End: "goLineEnd",
                    Home: "goLineStartSmart",
                    PageUp: "goPageUp",
                    PageDown: "goPageDown",
                    Delete: "delCharAfter",
                    Backspace: "delCharBefore",
                    "Shift-Backspace": "delCharBefore",
                    Tab: "defaultTab",
                    "Shift-Tab": "indentAuto",
                    Enter: "newlineAndIndent",
                    Insert: "toggleOverwrite",
                    Esc: "singleSelection"
                }, Do.pcDefault = {
                    "Ctrl-A": "selectAll",
                    "Ctrl-D": "deleteLine",
                    "Ctrl-Z": "undo",
                    "Shift-Ctrl-Z": "redo",
                    "Ctrl-Y": "redo",
                    "Ctrl-Home": "goDocStart",
                    "Ctrl-End": "goDocEnd",
                    "Ctrl-Up": "goLineUp",
                    "Ctrl-Down": "goLineDown",
                    "Ctrl-Left": "goGroupLeft",
                    "Ctrl-Right": "goGroupRight",
                    "Alt-Left": "goLineStart",
                    "Alt-Right": "goLineEnd",
                    "Ctrl-Backspace": "delGroupBefore",
                    "Ctrl-Delete": "delGroupAfter",
                    "Ctrl-S": "save",
                    "Ctrl-F": "find",
                    "Ctrl-G": "findNext",
                    "Shift-Ctrl-G": "findPrev",
                    "Shift-Ctrl-F": "replace",
                    "Shift-Ctrl-R": "replaceAll",
                    "Ctrl-[": "indentLess",
                    "Ctrl-]": "indentMore",
                    "Ctrl-U": "undoSelection",
                    "Shift-Ctrl-U": "redoSelection",
                    "Alt-U": "redoSelection",
                    fallthrough: "basic"
                }, Do.emacsy = {
                    "Ctrl-F": "goCharRight",
                    "Ctrl-B": "goCharLeft",
                    "Ctrl-P": "goLineUp",
                    "Ctrl-N": "goLineDown",
                    "Alt-F": "goWordRight",
                    "Alt-B": "goWordLeft",
                    "Ctrl-A": "goLineStart",
                    "Ctrl-E": "goLineEnd",
                    "Ctrl-V": "goPageDown",
                    "Shift-Ctrl-V": "goPageUp",
                    "Ctrl-D": "delCharAfter",
                    "Ctrl-H": "delCharBefore",
                    "Alt-D": "delWordAfter",
                    "Alt-Backspace": "delWordBefore",
                    "Ctrl-K": "killLine",
                    "Ctrl-T": "transposeChars",
                    "Ctrl-O": "openLine"
                }, Do.macDefault = {
                    "Cmd-A": "selectAll",
                    "Cmd-D": "deleteLine",
                    "Cmd-Z": "undo",
                    "Shift-Cmd-Z": "redo",
                    "Cmd-Y": "redo",
                    "Cmd-Home": "goDocStart",
                    "Cmd-Up": "goDocStart",
                    "Cmd-End": "goDocEnd",
                    "Cmd-Down": "goDocEnd",
                    "Alt-Left": "goGroupLeft",
                    "Alt-Right": "goGroupRight",
                    "Cmd-Left": "goLineLeft",
                    "Cmd-Right": "goLineRight",
                    "Alt-Backspace": "delGroupBefore",
                    "Ctrl-Alt-Backspace": "delGroupAfter",
                    "Alt-Delete": "delGroupAfter",
                    "Cmd-S": "save",
                    "Cmd-F": "find",
                    "Cmd-G": "findNext",
                    "Shift-Cmd-G": "findPrev",
                    "Cmd-Alt-F": "replace",
                    "Shift-Cmd-Alt-F": "replaceAll",
                    "Cmd-[": "indentLess",
                    "Cmd-]": "indentMore",
                    "Cmd-Backspace": "delWrappedLineLeft",
                    "Cmd-Delete": "delWrappedLineRight",
                    "Cmd-U": "undoSelection",
                    "Shift-Cmd-U": "redoSelection",
                    "Ctrl-Up": "goDocStart",
                    "Ctrl-Down": "goDocEnd",
                    fallthrough: ["basic", "emacsy"]
                }, Do.default = y ? Do.macDefault : Do.pcDefault;
                var Go = {
                    selectAll: Qi,
                    singleSelection: function(e) {
                        return e.setSelection(e.getCursor("anchor"), e.getCursor("head"), q)
                    },
                    killLine: function(e) {
                        return qo(e, function(t) {
                            if (t.empty()) {
                                var r = le(e.doc, t.head.line).text.length;
                                return t.head.ch == r && t.head.line < e.lastLine() ? {
                                    from: t.head,
                                    to: me(t.head.line + 1, 0)
                                } : {
                                    from: t.head,
                                    to: me(t.head.line, r)
                                }
                            }
                            return {
                                from: t.from(),
                                to: t.to()
                            }
                        })
                    },
                    deleteLine: function(e) {
                        return qo(e, function(t) {
                            return {
                                from: me(t.from().line, 0),
                                to: ke(e.doc, me(t.to().line + 1, 0))
                            }
                        })
                    },
                    delLineLeft: function(e) {
                        return qo(e, function(e) {
                            return {
                                from: me(e.from().line, 0),
                                to: e.from()
                            }
                        })
                    },
                    delWrappedLineLeft: function(e) {
                        return qo(e, function(t) {
                            var r = e.charCoords(t.head, "div").top + 5;
                            return {
                                from: e.coordsChar({
                                    left: 0,
                                    top: r
                                }, "div"),
                                to: t.from()
                            }
                        })
                    },
                    delWrappedLineRight: function(e) {
                        return qo(e, function(t) {
                            var r = e.charCoords(t.head, "div").top + 5,
                                n = e.coordsChar({
                                    left: e.display.lineDiv.offsetWidth + 100,
                                    top: r
                                }, "div");
                            return {
                                from: t.from(),
                                to: n
                            }
                        })
                    },
                    undo: function(e) {
                        return e.undo()
                    },
                    redo: function(e) {
                        return e.redo()
                    },
                    undoSelection: function(e) {
                        return e.undoSelection()
                    },
                    redoSelection: function(e) {
                        return e.redoSelection()
                    },
                    goDocStart: function(e) {
                        return e.extendSelection(me(e.firstLine(), 0))
                    },
                    goDocEnd: function(e) {
                        return e.extendSelection(me(e.lastLine()))
                    },
                    goLineStart: function(e) {
                        return e.extendSelectionsBy(function(t) {
                            return $o(e, t.head.line)
                        }, {
                            origin: "+move",
                            bias: 1
                        })
                    },
                    goLineStartSmart: function(e) {
                        return e.extendSelectionsBy(function(t) {
                            return Yo(e, t.head)
                        }, {
                            origin: "+move",
                            bias: 1
                        })
                    },
                    goLineEnd: function(e) {
                        return e.extendSelectionsBy(function(t) {
                            return function(e, t) {
                                var r = le(e.doc, t),
                                    n = function(e) {
                                        for (var t; t = He(e);) e = t.find(1, !0).line;
                                        return e
                                    }(r);
                                n != r && (t = de(n));
                                return Vo(!0, e, r, t, -1)
                            }(e, t.head.line)
                        }, {
                            origin: "+move",
                            bias: -1
                        })
                    },
                    goLineRight: function(e) {
                        return e.extendSelectionsBy(function(t) {
                            var r = e.cursorCoords(t.head, "div").top + 5;
                            return e.coordsChar({
                                left: e.display.lineDiv.offsetWidth + 100,
                                top: r
                            }, "div")
                        }, K)
                    },
                    goLineLeft: function(e) {
                        return e.extendSelectionsBy(function(t) {
                            var r = e.cursorCoords(t.head, "div").top + 5;
                            return e.coordsChar({
                                left: 0,
                                top: r
                            }, "div")
                        }, K)
                    },
                    goLineLeftSmart: function(e) {
                        return e.extendSelectionsBy(function(t) {
                            var r = e.cursorCoords(t.head, "div").top + 5,
                                n = e.coordsChar({
                                    left: 0,
                                    top: r
                                }, "div");
                            return n.ch < e.getLine(n.line).search(/\S/) ? Yo(e, t.head) : n
                        }, K)
                    },
                    goLineUp: function(e) {
                        return e.moveV(-1, "line")
                    },
                    goLineDown: function(e) {
                        return e.moveV(1, "line")
                    },
                    goPageUp: function(e) {
                        return e.moveV(-1, "page")
                    },
                    goPageDown: function(e) {
                        return e.moveV(1, "page")
                    },
                    goCharLeft: function(e) {
                        return e.moveH(-1, "char")
                    },
                    goCharRight: function(e) {
                        return e.moveH(1, "char")
                    },
                    goColumnLeft: function(e) {
                        return e.moveH(-1, "column")
                    },
                    goColumnRight: function(e) {
                        return e.moveH(1, "column")
                    },
                    goWordLeft: function(e) {
                        return e.moveH(-1, "word")
                    },
                    goGroupRight: function(e) {
                        return e.moveH(1, "group")
                    },
                    goGroupLeft: function(e) {
                        return e.moveH(-1, "group")
                    },
                    goWordRight: function(e) {
                        return e.moveH(1, "word")
                    },
                    delCharBefore: function(e) {
                        return e.deleteH(-1, "char")
                    },
                    delCharAfter: function(e) {
                        return e.deleteH(1, "char")
                    },
                    delWordBefore: function(e) {
                        return e.deleteH(-1, "word")
                    },
                    delWordAfter: function(e) {
                        return e.deleteH(1, "word")
                    },
                    delGroupBefore: function(e) {
                        return e.deleteH(-1, "group")
                    },
                    delGroupAfter: function(e) {
                        return e.deleteH(1, "group")
                    },
                    indentAuto: function(e) {
                        return e.indentSelection("smart")
                    },
                    indentMore: function(e) {
                        return e.indentSelection("add")
                    },
                    indentLess: function(e) {
                        return e.indentSelection("subtract")
                    },
                    insertTab: function(e) {
                        return e.replaceSelection("\t")
                    },
                    insertSoftTab: function(e) {
                        for (var t = [], r = e.listSelections(), n = e.options.tabSize, i = 0; i < r.length; i++) {
                            var o = r[i].from(),
                                a = H(e.getLine(o.line), o.ch, n);
                            t.push($(n - a % n))
                        }
                        e.replaceSelections(t)
                    },
                    defaultTab: function(e) {
                        e.somethingSelected() ? e.indentSelection("add") : e.execCommand("insertTab")
                    },
                    transposeChars: function(e) {
                        return Un(e, function() {
                            for (var t = e.listSelections(), r = [], n = 0; n < t.length; n++)
                                if (t[n].empty()) {
                                    var i = t[n].head,
                                        o = le(e.doc, i.line).text;
                                    if (o)
                                        if (i.ch == o.length && (i = new me(i.line, i.ch - 1)), i.ch > 0) i = new me(i.line, i.ch + 1), e.replaceRange(o.charAt(i.ch - 1) + o.charAt(i.ch - 2), me(i.line, i.ch - 2), i, "+transpose");
                                        else if (i.line > e.doc.first) {
                                        var a = le(e.doc, i.line - 1).text;
                                        a && (i = new me(i.line, 1), e.replaceRange(o.charAt(0) + e.doc.lineSeparator() + a.charAt(a.length - 1), me(i.line - 1, a.length - 1), i, "+transpose"))
                                    }
                                    r.push(new mi(i, i))
                                }
                            e.setSelections(r)
                        })
                    },
                    newlineAndIndent: function(e) {
                        return Un(e, function() {
                            for (var t = e.listSelections(), r = t.length - 1; r >= 0; r--) e.replaceRange(e.doc.lineSeparator(), t[r].anchor, t[r].head, "+input");
                            t = e.listSelections();
                            for (var n = 0; n < t.length; n++) e.indentLine(t[n].from().line, null, !0);
                            Cn(e)
                        })
                    },
                    openLine: function(e) {
                        return e.replaceSelection("\n", "start")
                    },
                    toggleOverwrite: function(e) {
                        return e.toggleOverwrite()
                    }
                };

                function $o(e, t) {
                    var r = le(e.doc, t),
                        n = Re(r);
                    return n != r && (t = de(n)), Vo(!0, e, n, t, 1)
                }

                function Yo(e, t) {
                    var r = $o(e, t.line),
                        n = le(e.doc, r.line),
                        i = Ze(n, e.doc.direction);
                    if (!i || 0 == i[0].level) {
                        var o = Math.max(0, n.text.search(/\S/)),
                            a = t.line == r.line && t.ch <= o && t.ch;
                        return me(r.line, a ? 0 : o, r.sticky)
                    }
                    return r
                }

                function Xo(e, t, r) {
                    if ("string" == typeof t && !(t = Go[t])) return !1;
                    e.display.input.ensurePolled();
                    var n = e.display.shift,
                        i = !1;
                    try {
                        e.isReadOnly() && (e.state.suppressEdits = !0), r && (e.display.shift = !1), i = t(e) != B
                    } finally {
                        e.display.shift = n, e.state.suppressEdits = !1
                    }
                    return i
                }
                var Zo = new I;

                function Jo(e, t, r, n) {
                    var i = e.state.keySeq;
                    if (i) {
                        if (Io(t)) return "handled";
                        if (/\'$/.test(t) ? e.state.keySeq = null : Zo.set(50, function() {
                                e.state.keySeq == i && (e.state.keySeq = null, e.display.input.reset())
                            }), Qo(e, i + " " + t, r, n)) return !0
                    }
                    return Qo(e, t, r, n)
                }

                function Qo(e, t, r, n) {
                    var i = function(e, t, r) {
                        for (var n = 0; n < e.state.keyMaps.length; n++) {
                            var i = Ho(t, e.state.keyMaps[n], r, e);
                            if (i) return i
                        }
                        return e.options.extraKeys && Ho(t, e.options.extraKeys, r, e) || Ho(t, e.options.keyMap, r, e)
                    }(e, t, n);
                    return "multi" == i && (e.state.keySeq = t), "handled" == i && or(e, "keyHandled", e, t, r), "handled" != i && "multi" != i || (lt(r), dn(e)), !!i
                }

                function ea(e, t) {
                    var r = jo(t, !0);
                    return !!r && (t.shiftKey && !e.state.keySeq ? Jo(e, "Shift-" + r, t, function(t) {
                        return Xo(e, t, !0)
                    }) || Jo(e, r, t, function(t) {
                        if ("string" == typeof t ? /^go[A-Z]/.test(t) : t.motion) return Xo(e, t)
                    }) : Jo(e, r, t, function(t) {
                        return Xo(e, t)
                    }))
                }
                var ta = null;

                function ra(e) {
                    if (this.curOp.focus = E(), !nt(this, e)) {
                        a && l < 11 && 27 == e.keyCode && (e.returnValue = !1);
                        var t = e.keyCode;
                        this.display.shift = 16 == t || e.shiftKey;
                        var r = ea(this, e);
                        d && (ta = r ? t : null, !r && 88 == t && !xt && (y ? e.metaKey : e.ctrlKey) && this.replaceSelection("", null, "cut")), 18 != t || /\bCodeMirror-crosshair\b/.test(this.display.lineDiv.className) || function(e) {
                            var t = e.display.lineDiv;

                            function r(e) {
                                18 != e.keyCode && e.altKey || (L(t, "CodeMirror-crosshair"), tt(document, "keyup", r), tt(document, "mouseover", r))
                            }
                            W(t, "CodeMirror-crosshair"), Qe(document, "keyup", r), Qe(document, "mouseover", r)
                        }(this)
                    }
                }

                function na(e) {
                    16 == e.keyCode && (this.doc.sel.shift = !1), nt(this, e)
                }

                function ia(e) {
                    if (!(yr(this.display, e) || nt(this, e) || e.ctrlKey && !e.altKey || y && e.metaKey)) {
                        var t = e.keyCode,
                            r = e.charCode;
                        if (d && t == ta) return ta = null, void lt(e);
                        if (!d || e.which && !(e.which < 10) || !ea(this, e)) {
                            var n, i = String.fromCharCode(null == r ? t : r);
                            if ("\b" != i)
                                if (!Jo(n = this, "'" + i + "'", e, function(e) {
                                        return Xo(n, e, !0)
                                    })) this.display.input.onKeyPress(e)
                        }
                    }
                }
                var oa, aa, la = function(e, t, r) {
                    this.time = e, this.pos = t, this.button = r
                };

                function sa(e) {
                    var t = this,
                        r = t.display;
                    if (!(nt(t, e) || r.activeTouch && r.input.supportsTouch()))
                        if (r.input.ensurePolled(), r.shift = e.shiftKey, yr(r, e)) s || (r.scroller.draggable = !1, setTimeout(function() {
                            return r.scroller.draggable = !0
                        }, 100));
                        else if (!da(t, e)) {
                        var n, i, o, c = nn(t, e),
                            u = ft(e),
                            d = c ? (n = c, i = u, o = +new Date, aa && aa.compare(o, n, i) ? (oa = aa = null, "triple") : oa && oa.compare(o, n, i) ? (aa = new la(o, n, i), oa = null, "double") : (oa = new la(o, n, i), aa = null, "single")) : "single";
                        window.focus(), 1 == u && t.state.selectingText && t.state.selectingText(e), c && function(e, t, r, n, i) {
                            var o = "Click";
                            "double" == n ? o = "Double" + o : "triple" == n && (o = "Triple" + o);
                            return Jo(e, Ro(o = (1 == t ? "Left" : 2 == t ? "Middle" : "Right") + o, i), i, function(t) {
                                if ("string" == typeof t && (t = Go[t]), !t) return !1;
                                var n = !1;
                                try {
                                    e.isReadOnly() && (e.state.suppressEdits = !0), n = t(e, r) != B
                                } finally {
                                    e.state.suppressEdits = !1
                                }
                                return n
                            })
                        }(t, u, c, d, e) || (1 == u ? c ? function(e, t, r, n) {
                            a ? setTimeout(z(fn, e), 0) : e.curOp.focus = E();
                            var i, o = function(e, t, r) {
                                    var n = e.getOption("configureMouse"),
                                        i = n ? n(e, t, r) : {};
                                    if (null == i.unit) {
                                        var o = b ? r.shiftKey && r.metaKey : r.altKey;
                                        i.unit = o ? "rectangle" : "single" == t ? "char" : "double" == t ? "word" : "line"
                                    }(null == i.extend || e.doc.extend) && (i.extend = e.doc.extend || r.shiftKey);
                                    null == i.addNew && (i.addNew = y ? r.metaKey : r.ctrlKey);
                                    null == i.moveOnDrag && (i.moveOnDrag = !(y ? r.altKey : r.ctrlKey));
                                    return i
                                }(e, r, n),
                                c = e.doc.sel;
                            e.options.dragDrop && mt && !e.isReadOnly() && "single" == r && (i = c.contains(t)) > -1 && (ge((i = c.ranges[i]).from(), t) < 0 || t.xRel > 0) && (ge(i.to(), t) > 0 || t.xRel < 0) ? function(e, t, r, n) {
                                var i = e.display,
                                    o = !1,
                                    c = Kn(e, function(t) {
                                        s && (i.scroller.draggable = !1), e.state.draggingText = !1, tt(document, "mouseup", c), tt(document, "mousemove", u), tt(i.scroller, "dragstart", d), tt(i.scroller, "drop", c), o || (lt(t), n.addNew || Ri(e.doc, r, null, null, n.extend), s || a && 9 == l ? setTimeout(function() {
                                            document.body.focus(), i.input.focus()
                                        }, 20) : i.input.focus())
                                    }),
                                    u = function(e) {
                                        o = o || Math.abs(t.clientX - e.clientX) + Math.abs(t.clientY - e.clientY) >= 10
                                    },
                                    d = function() {
                                        return o = !0
                                    };
                                s && (i.scroller.draggable = !0);
                                e.state.draggingText = c, c.copy = !n.moveOnDrag, i.scroller.dragDrop && i.scroller.dragDrop();
                                Qe(document, "mouseup", c), Qe(document, "mousemove", u), Qe(i.scroller, "dragstart", d), Qe(i.scroller, "drop", c), hn(e), setTimeout(function() {
                                    return i.input.focus()
                                }, 20)
                            }(e, n, t, o) : function(e, t, r, n) {
                                var i = e.display,
                                    o = e.doc;
                                lt(t);
                                var a, l, s = o.sel,
                                    c = s.ranges;
                                n.addNew && !n.extend ? (l = o.sel.contains(r), a = l > -1 ? c[l] : new mi(r, r)) : (a = o.sel.primary(), l = o.sel.primIndex);
                                if ("rectangle" == n.unit) n.addNew || (a = new mi(r, r)), r = nn(e, t, !0, !0), l = -1;
                                else {
                                    var u = ca(e, r, n.unit);
                                    a = n.extend ? Ii(a, u.anchor, u.head, n.extend) : u
                                }
                                n.addNew ? -1 == l ? (l = c.length, Ki(o, gi(c.concat([a]), l), {
                                    scroll: !1,
                                    origin: "*mouse"
                                })) : c.length > 1 && c[l].empty() && "char" == n.unit && !n.extend ? (Ki(o, gi(c.slice(0, l).concat(c.slice(l + 1)), 0), {
                                    scroll: !1,
                                    origin: "*mouse"
                                }), s = o.sel) : Bi(o, l, a, U) : (l = 0, Ki(o, new pi([a], 0), U), s = o.sel);
                                var d = r;

                                function f(t) {
                                    if (0 != ge(d, t))
                                        if (d = t, "rectangle" == n.unit) {
                                            for (var i = [], c = e.options.tabSize, u = H(le(o, r.line).text, r.ch, c), f = H(le(o, t.line).text, t.ch, c), h = Math.min(u, f), p = Math.max(u, f), m = Math.min(r.line, t.line), g = Math.min(e.lastLine(), Math.max(r.line, t.line)); m <= g; m++) {
                                                var v = le(o, m).text,
                                                    y = V(v, h, c);
                                                h == p ? i.push(new mi(me(m, y), me(m, y))) : v.length > y && i.push(new mi(me(m, y), me(m, V(v, p, c))))
                                            }
                                            i.length || i.push(new mi(r, r)), Ki(o, gi(s.ranges.slice(0, l).concat(i), l), {
                                                origin: "*mouse",
                                                scroll: !1
                                            }), e.scrollIntoView(t)
                                        } else {
                                            var b, w = a,
                                                x = ca(e, t, n.unit),
                                                k = w.anchor;
                                            ge(x.anchor, k) > 0 ? (b = x.head, k = we(w.from(), x.anchor)) : (b = x.anchor, k = be(w.to(), x.head));
                                            var C = s.ranges.slice(0);
                                            C[l] = function(e, t) {
                                                var r = t.anchor,
                                                    n = t.head,
                                                    i = le(e.doc, r.line);
                                                if (0 == ge(r, n) && r.sticky == n.sticky) return t;
                                                var o = Ze(i);
                                                if (!o) return t;
                                                var a = Ye(o, r.ch, r.sticky),
                                                    l = o[a];
                                                if (l.from != r.ch && l.to != r.ch) return t;
                                                var s, c = a + (l.from == r.ch == (1 != l.level) ? 0 : 1);
                                                if (0 == c || c == o.length) return t;
                                                if (n.line != r.line) s = (n.line - r.line) * ("ltr" == e.doc.direction ? 1 : -1) > 0;
                                                else {
                                                    var u = Ye(o, n.ch, n.sticky),
                                                        d = u - a || (n.ch - r.ch) * (1 == l.level ? -1 : 1);
                                                    s = u == c - 1 || u == c ? d < 0 : d > 0
                                                }
                                                var f = o[c + (s ? -1 : 0)],
                                                    h = s == (1 == f.level),
                                                    p = h ? f.from : f.to,
                                                    m = h ? "after" : "before";
                                                return r.ch == p && r.sticky == m ? t : new mi(new me(r.line, p, m), n)
                                            }(e, new mi(ke(o, k), b)), Ki(o, gi(C, l), U)
                                        }
                                }
                                var h = i.wrapper.getBoundingClientRect(),
                                    p = 0;

                                function m(t) {
                                    e.state.selectingText = !1, p = 1 / 0, lt(t), i.input.focus(), tt(document, "mousemove", g), tt(document, "mouseup", v), o.history.lastSelOrigin = null
                                }
                                var g = Kn(e, function(t) {
                                        ft(t) ? function t(r) {
                                            var a = ++p;
                                            var l = nn(e, r, !0, "rectangle" == n.unit);
                                            if (!l) return;
                                            if (0 != ge(l, d)) {
                                                e.curOp.focus = E(), f(l);
                                                var s = yn(i, o);
                                                (l.line >= s.to || l.line < s.from) && setTimeout(Kn(e, function() {
                                                    p == a && t(r)
                                                }), 150)
                                            } else {
                                                var c = r.clientY < h.top ? -20 : r.clientY > h.bottom ? 20 : 0;
                                                c && setTimeout(Kn(e, function() {
                                                    p == a && (i.scroller.scrollTop += c, t(r))
                                                }), 50)
                                            }
                                        }(t) : m(t)
                                    }),
                                    v = Kn(e, m);
                                e.state.selectingText = v, Qe(document, "mousemove", g), Qe(document, "mouseup", v)
                            }(e, n, t, o)
                        }(t, c, d, e) : dt(e) == r.scroller && lt(e) : 2 == u ? (c && Ri(t.doc, c), setTimeout(function() {
                            return r.input.focus()
                        }, 20)) : 3 == u && (C ? fa(t, e) : hn(t)))
                    }
                }

                function ca(e, t, r) {
                    if ("char" == r) return new mi(t, t);
                    if ("word" == r) return e.findWordAt(t);
                    if ("line" == r) return new mi(me(t.line, 0), ke(e.doc, me(t.line + 1, 0)));
                    var n = r(e, t);
                    return new mi(n.from, n.to)
                }

                function ua(e, t, r, n) {
                    var i, o;
                    if (t.touches) i = t.touches[0].clientX, o = t.touches[0].clientY;
                    else try {
                        i = t.clientX, o = t.clientY
                    } catch (t) {
                        return !1
                    }
                    if (i >= Math.floor(e.display.gutters.getBoundingClientRect().right)) return !1;
                    n && lt(t);
                    var a = e.display,
                        l = a.lineDiv.getBoundingClientRect();
                    if (o > l.bottom || !ot(e, r)) return ct(t);
                    o -= l.top - a.viewOffset;
                    for (var s = 0; s < e.options.gutters.length; ++s) {
                        var c = a.gutters.childNodes[s];
                        if (c && c.getBoundingClientRect().right >= i) return rt(e, r, e, fe(e.doc, o), e.options.gutters[s], t), ct(t)
                    }
                }

                function da(e, t) {
                    return ua(e, t, "gutterClick", !0)
                }

                function fa(e, t) {
                    yr(e.display, t) || function(e, t) {
                        if (!ot(e, "gutterContextMenu")) return !1;
                        return ua(e, t, "gutterContextMenu", !1)
                    }(e, t) || nt(e, t, "contextmenu") || e.display.input.onContextMenu(t)
                }

                function ha(e) {
                    e.display.wrapper.className = e.display.wrapper.className.replace(/\s*cm-s-\S+/g, "") + e.options.theme.replace(/(^|\s)\s*/g, " cm-s-"), zr(e)
                }
                la.prototype.compare = function(e, t, r) {
                    return this.time + 400 > e && 0 == ge(t, this.pos) && r == this.button
                };
                var pa = {
                        toString: function() {
                            return "CodeMirror.Init"
                        }
                    },
                    ma = {},
                    ga = {};

                function va(e) {
                    li(e), $n(e), bn(e)
                }

                function ya(e, t, r) {
                    if (!t != !(r && r != pa)) {
                        var n = e.display.dragFunctions,
                            i = t ? Qe : tt;
                        i(e.display.scroller, "dragstart", n.start), i(e.display.scroller, "dragenter", n.enter), i(e.display.scroller, "dragover", n.over), i(e.display.scroller, "dragleave", n.leave), i(e.display.scroller, "drop", n.drop)
                    }
                }

                function ba(e) {
                    e.options.lineWrapping ? (W(e.display.wrapper, "CodeMirror-wrap"), e.display.sizer.style.minWidth = "", e.display.sizerWidth = null) : (L(e.display.wrapper, "CodeMirror-wrap"), Ge(e)), rn(e), $n(e), zr(e), setTimeout(function() {
                        return Wn(e)
                    }, 100)
                }

                function wa(e, t) {
                    var n = this;
                    if (!(this instanceof wa)) return new wa(e, t);
                    this.options = t = t ? P(t) : {}, P(ma, t, !1), si(t);
                    var i = t.value;
                    "string" == typeof i && (i = new Co(i, t.mode, null, t.lineSeparator, t.direction)), this.doc = i;
                    var o = new wa.inputStyles[t.inputStyle](this),
                        c = this.display = new function(e, t, n) {
                            var i = this;
                            this.input = n, i.scrollbarFiller = O("div", null, "CodeMirror-scrollbar-filler"), i.scrollbarFiller.setAttribute("cm-not-content", "true"), i.gutterFiller = O("div", null, "CodeMirror-gutter-filler"), i.gutterFiller.setAttribute("cm-not-content", "true"), i.lineDiv = N("div", null, "CodeMirror-code"), i.selectionDiv = O("div", null, null, "position: relative; z-index: 1"), i.cursorDiv = O("div", null, "CodeMirror-cursors"), i.measure = O("div", null, "CodeMirror-measure"), i.lineMeasure = O("div", null, "CodeMirror-measure"), i.lineSpace = N("div", [i.measure, i.lineMeasure, i.selectionDiv, i.cursorDiv, i.lineDiv], null, "position: relative; outline: none");
                            var o = N("div", [i.lineSpace], "CodeMirror-lines");
                            i.mover = O("div", [o], null, "position: relative"), i.sizer = O("div", [i.mover], "CodeMirror-sizer"), i.sizerWidth = null, i.heightForcer = O("div", null, null, "position: absolute; height: " + j + "px; width: 1px;"), i.gutters = O("div", null, "CodeMirror-gutters"), i.lineGutter = null, i.scroller = O("div", [i.sizer, i.heightForcer, i.gutters], "CodeMirror-scroll"), i.scroller.setAttribute("tabIndex", "-1"), i.wrapper = O("div", [i.scrollbarFiller, i.gutterFiller, i.scroller], "CodeMirror"), a && l < 8 && (i.gutters.style.zIndex = -1, i.scroller.style.paddingRight = 0), s || r && v || (i.scroller.draggable = !0), e && (e.appendChild ? e.appendChild(i.wrapper) : e(i.wrapper)), i.viewFrom = i.viewTo = t.first, i.reportedViewFrom = i.reportedViewTo = t.first, i.view = [], i.renderedView = null, i.externalMeasured = null, i.viewOffset = 0, i.lastWrapHeight = i.lastWrapWidth = 0, i.updateLineNumbers = null, i.nativeBarWidth = i.barHeight = i.barWidth = 0, i.scrollbarsClipped = !1, i.lineNumWidth = i.lineNumInnerWidth = i.lineNumChars = null, i.alignWidgets = !1, i.cachedCharWidth = i.cachedTextHeight = i.cachedPaddingH = null, i.maxLine = null, i.maxLineLength = 0, i.maxLineChanged = !1, i.wheelDX = i.wheelDY = i.wheelStartX = i.wheelStartY = null, i.shift = !1, i.selForContextMenu = null, i.activeTouch = null, n.init(i)
                        }(e, i, o);
                    c.wrapper.CodeMirror = this, li(this), ha(this), t.lineWrapping && (this.display.wrapper.className += " CodeMirror-wrap"), zn(this), this.state = {
                            keyMaps: [],
                            overlays: [],
                            modeGen: 0,
                            overwrite: !1,
                            delayingBlurEvent: !1,
                            focused: !1,
                            suppressEdits: !1,
                            pasteIncoming: !1,
                            cutIncoming: !1,
                            selectingText: !1,
                            draggingText: !1,
                            highlight: new I,
                            keySeq: null,
                            specialChars: null
                        }, t.autofocus && !v && c.input.focus(), a && l < 11 && setTimeout(function() {
                            return n.display.input.reset(!0)
                        }, 20),
                        function(e) {
                            var t = e.display;
                            Qe(t.scroller, "mousedown", Kn(e, sa)), Qe(t.scroller, "dblclick", a && l < 11 ? Kn(e, function(t) {
                                if (!nt(e, t)) {
                                    var r = nn(e, t);
                                    if (r && !da(e, t) && !yr(e.display, t)) {
                                        lt(t);
                                        var n = e.findWordAt(r);
                                        Ri(e.doc, n.anchor, n.head)
                                    }
                                }
                            }) : function(t) {
                                return nt(e, t) || lt(t)
                            });
                            C || Qe(t.scroller, "contextmenu", function(t) {
                                return fa(e, t)
                            });
                            var r, n = {
                                end: 0
                            };

                            function i() {
                                t.activeTouch && (r = setTimeout(function() {
                                    return t.activeTouch = null
                                }, 1e3), (n = t.activeTouch).end = +new Date)
                            }

                            function o(e, t) {
                                if (null == t.left) return !0;
                                var r = t.left - e.left,
                                    n = t.top - e.top;
                                return r * r + n * n > 400
                            }
                            Qe(t.scroller, "touchstart", function(i) {
                                if (!nt(e, i) && ! function(e) {
                                        if (1 != e.touches.length) return !1;
                                        var t = e.touches[0];
                                        return t.radiusX <= 1 && t.radiusY <= 1
                                    }(i) && !da(e, i)) {
                                    t.input.ensurePolled(), clearTimeout(r);
                                    var o = +new Date;
                                    t.activeTouch = {
                                        start: o,
                                        moved: !1,
                                        prev: o - n.end <= 300 ? n : null
                                    }, 1 == i.touches.length && (t.activeTouch.left = i.touches[0].pageX, t.activeTouch.top = i.touches[0].pageY)
                                }
                            }), Qe(t.scroller, "touchmove", function() {
                                t.activeTouch && (t.activeTouch.moved = !0)
                            }), Qe(t.scroller, "touchend", function(r) {
                                var n = t.activeTouch;
                                if (n && !yr(t, r) && null != n.left && !n.moved && new Date - n.start < 300) {
                                    var a, l = e.coordsChar(t.activeTouch, "page");
                                    a = !n.prev || o(n, n.prev) ? new mi(l, l) : !n.prev.prev || o(n, n.prev.prev) ? e.findWordAt(l) : new mi(me(l.line, 0), ke(e.doc, me(l.line + 1, 0))), e.setSelection(a.anchor, a.head), e.focus(), lt(r)
                                }
                                i()
                            }), Qe(t.scroller, "touchcancel", i), Qe(t.scroller, "scroll", function() {
                                t.scroller.clientHeight && (Mn(e, t.scroller.scrollTop), On(e, t.scroller.scrollLeft, !0), rt(e, "scroll", e))
                            }), Qe(t.scroller, "mousewheel", function(t) {
                                return hi(e, t)
                            }), Qe(t.scroller, "DOMMouseScroll", function(t) {
                                return hi(e, t)
                            }), Qe(t.wrapper, "scroll", function() {
                                return t.wrapper.scrollTop = t.wrapper.scrollLeft = 0
                            }), t.dragFunctions = {
                                enter: function(t) {
                                    nt(e, t) || ut(t)
                                },
                                over: function(t) {
                                    nt(e, t) || (! function(e, t) {
                                        var r = nn(e, t);
                                        if (r) {
                                            var n = document.createDocumentFragment();
                                            sn(e, r, n), e.display.dragCursor || (e.display.dragCursor = O("div", null, "CodeMirror-cursors CodeMirror-dragcursors"), e.display.lineSpace.insertBefore(e.display.dragCursor, e.display.cursorDiv)), A(e.display.dragCursor, n)
                                        }
                                    }(e, t), ut(t))
                                },
                                start: function(t) {
                                    return function(e, t) {
                                        if (a && (!e.state.draggingText || +new Date - To < 100)) ut(t);
                                        else if (!nt(e, t) && !yr(e.display, t) && (t.dataTransfer.setData("Text", e.getSelection()), t.dataTransfer.effectAllowed = "copyMove", t.dataTransfer.setDragImage && !f)) {
                                            var r = O("img", null, null, "position: fixed; left: 0; top: 0;");
                                            r.src = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==", d && (r.width = r.height = 1, e.display.wrapper.appendChild(r), r._top = r.offsetTop), t.dataTransfer.setDragImage(r, 0, 0), d && r.parentNode.removeChild(r)
                                        }
                                    }(e, t)
                                },
                                drop: Kn(e, So),
                                leave: function(t) {
                                    nt(e, t) || Lo(e)
                                }
                            };
                            var s = t.input.getField();
                            Qe(s, "keyup", function(t) {
                                return na.call(e, t)
                            }), Qe(s, "keydown", Kn(e, ra)), Qe(s, "keypress", Kn(e, ia)), Qe(s, "focus", function(t) {
                                return pn(e, t)
                            }), Qe(s, "blur", function(t) {
                                return mn(e, t)
                            })
                        }(this), Oo(), Hn(this), this.curOp.forceUpdate = !0, Mi(this, i), t.autofocus && !v || this.hasFocus() ? setTimeout(z(pn, this), 20) : mn(this);
                    for (var u in ga) ga.hasOwnProperty(u) && ga[u](n, t[u], pa);
                    wn(this), t.finishInit && t.finishInit(this);
                    for (var h = 0; h < xa.length; ++h) xa[h](n);
                    In(this), s && t.lineWrapping && "optimizelegibility" == getComputedStyle(c.lineDiv).textRendering && (c.lineDiv.style.textRendering = "auto")
                }
                wa.defaults = ma, wa.optionHandlers = ga;
                var xa = [];

                function ka(e, t, r, n) {
                    var i, o = e.doc;
                    null == r && (r = "add"), "smart" == r && (o.mode.indent ? i = Pt(e, t).state : r = "prev");
                    var a = e.options.tabSize,
                        l = le(o, t),
                        s = H(l.text, null, a);
                    l.stateAfter && (l.stateAfter = null);
                    var c, u = l.text.match(/^\s*/)[0];
                    if (n || /\S/.test(l.text)) {
                        if ("smart" == r && ((c = o.mode.indent(i, l.text.slice(u.length), l.text)) == B || c > 150)) {
                            if (!n) return;
                            r = "prev"
                        }
                    } else c = 0, r = "not";
                    "prev" == r ? c = t > o.first ? H(le(o, t - 1).text, null, a) : 0 : "add" == r ? c = s + e.options.indentUnit : "subtract" == r ? c = s - e.options.indentUnit : "number" == typeof r && (c = s + r), c = Math.max(0, c);
                    var d = "",
                        f = 0;
                    if (e.options.indentWithTabs)
                        for (var h = Math.floor(c / a); h; --h) f += a, d += "\t";
                    if (f < c && (d += $(c - f)), d != u) return ao(o, d, me(t, 0), me(t, u.length), "+input"), l.stateAfter = null, !0;
                    for (var p = 0; p < o.sel.ranges.length; p++) {
                        var m = o.sel.ranges[p];
                        if (m.head.line == t && m.head.ch < u.length) {
                            var g = me(t, u.length);
                            Bi(o, p, new mi(g, g));
                            break
                        }
                    }
                }
                wa.defineInitHook = function(e) {
                    return xa.push(e)
                };
                var Ca = null;

                function Ta(e) {
                    Ca = e
                }

                function Sa(e, t, r, n, i) {
                    var o = e.doc;
                    e.display.shift = !1, n || (n = o.sel);
                    var a, l = e.state.pasteIncoming || "paste" == i,
                        s = bt(t),
                        c = null;
                    if (l && n.ranges.length > 1)
                        if (Ca && Ca.text.join("\n") == t) {
                            if (n.ranges.length % Ca.text.length == 0) {
                                c = [];
                                for (var u = 0; u < Ca.text.length; u++) c.push(o.splitLines(Ca.text[u]))
                            }
                        } else s.length == n.ranges.length && e.options.pasteLinesPerSelection && (c = X(s, function(e) {
                            return [e]
                        }));
                    for (var d = n.ranges.length - 1; d >= 0; d--) {
                        var f = n.ranges[d],
                            h = f.from(),
                            p = f.to();
                        f.empty() && (r && r > 0 ? h = me(h.line, h.ch - r) : e.state.overwrite && !l ? p = me(p.line, Math.min(le(o, p.line).text.length, p.ch + Y(s).length)) : Ca && Ca.lineWise && Ca.text.join("\n") == t && (h = p = me(h.line, 0))), a = e.curOp.updateInput;
                        var m = {
                            from: h,
                            to: p,
                            text: c ? c[d % c.length] : s,
                            origin: i || (l ? "paste" : e.state.cutIncoming ? "cut" : "+input")
                        };
                        to(e.doc, m), or(e, "inputRead", e, m)
                    }
                    t && !l && Ma(e, t), Cn(e), e.curOp.updateInput = a, e.curOp.typing = !0, e.state.pasteIncoming = e.state.cutIncoming = !1
                }

                function La(e, t) {
                    var r = e.clipboardData && e.clipboardData.getData("Text");
                    if (r) return e.preventDefault(), t.isReadOnly() || t.options.disableInput || Un(t, function() {
                        return Sa(t, r, 0, null, "paste")
                    }), !0
                }

                function Ma(e, t) {
                    if (e.options.electricChars && e.options.smartIndent)
                        for (var r = e.doc.sel, n = r.ranges.length - 1; n >= 0; n--) {
                            var i = r.ranges[n];
                            if (!(i.head.ch > 100 || n && r.ranges[n - 1].head.line == i.head.line)) {
                                var o = e.getModeAt(i.head),
                                    a = !1;
                                if (o.electricChars) {
                                    for (var l = 0; l < o.electricChars.length; l++)
                                        if (t.indexOf(o.electricChars.charAt(l)) > -1) {
                                            a = ka(e, i.head.line, "smart");
                                            break
                                        }
                                } else o.electricInput && o.electricInput.test(le(e.doc, i.head.line).text.slice(0, i.head.ch)) && (a = ka(e, i.head.line, "smart"));
                                a && or(e, "electricInput", e, i.head.line)
                            }
                        }
                }

                function Aa(e) {
                    for (var t = [], r = [], n = 0; n < e.doc.sel.ranges.length; n++) {
                        var i = e.doc.sel.ranges[n].head.line,
                            o = {
                                anchor: me(i, 0),
                                head: me(i + 1, 0)
                            };
                        r.push(o), t.push(e.getRange(o.anchor, o.head))
                    }
                    return {
                        text: t,
                        ranges: r
                    }
                }

                function Oa(e, t) {
                    e.setAttribute("autocorrect", "off"), e.setAttribute("autocapitalize", "off"), e.setAttribute("spellcheck", !!t)
                }

                function Na() {
                    var e = O("textarea", null, null, "position: absolute; bottom: -1em; padding: 0; width: 1px; height: 1em; outline: none"),
                        t = O("div", [e], null, "overflow: hidden; position: relative; width: 3px; height: 0px;");
                    return s ? e.style.width = "1000px" : e.setAttribute("wrap", "off"), m && (e.style.border = "1px solid black"), Oa(e), t
                }

                function _a(e, t, r, n, i) {
                    var o = t,
                        a = r,
                        l = le(e, t.line);

                    function s(n) {
                        var o, a;
                        if (null == (o = i ? function(e, t, r, n) {
                                var i = Ze(t, e.doc.direction);
                                if (!i) return Ko(t, r, n);
                                r.ch >= t.text.length ? (r.ch = t.text.length, r.sticky = "before") : r.ch <= 0 && (r.ch = 0, r.sticky = "after");
                                var o = Ye(i, r.ch, r.sticky),
                                    a = i[o];
                                if ("ltr" == e.doc.direction && a.level % 2 == 0 && (n > 0 ? a.to > r.ch : a.from < r.ch)) return Ko(t, r, n);
                                var l, s = function(e, r) {
                                        return Uo(t, e instanceof me ? e.ch : e, r)
                                    },
                                    c = function(r) {
                                        return e.options.lineWrapping ? (l = l || Ar(e, t), $r(e, t, l, r)) : {
                                            begin: 0,
                                            end: t.text.length
                                        }
                                    },
                                    u = c("before" == r.sticky ? s(r, -1) : r.ch);
                                if ("rtl" == e.doc.direction || 1 == a.level) {
                                    var d = 1 == a.level == n < 0,
                                        f = s(r, d ? 1 : -1);
                                    if (null != f && (d ? f <= a.to && f <= u.end : f >= a.from && f >= u.begin)) {
                                        var h = d ? "before" : "after";
                                        return new me(r.line, f, h)
                                    }
                                }
                                var p = function(e, t, n) {
                                        for (var o = function(e, t) {
                                                return t ? new me(r.line, s(e, 1), "before") : new me(r.line, e, "after")
                                            }; e >= 0 && e < i.length; e += t) {
                                            var a = i[e],
                                                l = t > 0 == (1 != a.level),
                                                c = l ? n.begin : s(n.end, -1);
                                            if (a.from <= c && c < a.to) return o(c, l);
                                            if (c = l ? a.from : s(a.to, -1), n.begin <= c && c < n.end) return o(c, l)
                                        }
                                    },
                                    m = p(o + n, n, u);
                                if (m) return m;
                                var g = n > 0 ? u.end : s(u.begin, -1);
                                return null == g || n > 0 && g == t.text.length || !(m = p(n > 0 ? 0 : i.length - 1, n, c(g))) ? null : m
                            }(e.cm, l, t, r) : Ko(l, t, r))) {
                            if (n || (a = t.line + r) < e.first || a >= e.first + e.size || (t = new me(a, t.ch, t.sticky), !(l = le(e, a)))) return !1;
                            t = Vo(i, e.cm, l, t.line, r)
                        } else t = o;
                        return !0
                    }
                    if ("char" == n) s();
                    else if ("column" == n) s(!0);
                    else if ("word" == n || "group" == n)
                        for (var c = null, u = "group" == n, d = e.cm && e.cm.getHelper(t, "wordChars"), f = !0; !(r < 0) || s(!f); f = !1) {
                            var h = l.text.charAt(t.ch) || "\n",
                                p = te(h, d) ? "w" : u && "\n" == h ? "n" : !u || /\s/.test(h) ? null : "p";
                            if (!u || f || p || (p = "s"), c && c != p) {
                                r < 0 && (r = 1, s(), t.sticky = "after");
                                break
                            }
                            if (p && (c = p), r > 0 && !s(!f)) break
                        }
                    var m = Zi(e, t, o, a, !0);
                    return ve(o, m) && (m.hitSide = !0), m
                }

                function Ea(e, t, r, n) {
                    var i, o, a = e.doc,
                        l = t.left;
                    if ("page" == n) {
                        var s = Math.min(e.display.wrapper.clientHeight, window.innerHeight || document.documentElement.clientHeight),
                            c = Math.max(s - .5 * Zr(e.display), 3);
                        i = (r > 0 ? t.bottom : t.top) + r * c
                    } else "line" == n && (i = r > 0 ? t.bottom + 3 : t.top - 3);
                    for (;
                        (o = Vr(e, l, i)).outside;) {
                        if (r < 0 ? i <= 0 : i >= a.height) {
                            o.hitSide = !0;
                            break
                        }
                        i += 5 * r
                    }
                    return o
                }
                var Wa = function(e) {
                    this.cm = e, this.lastAnchorNode = this.lastAnchorOffset = this.lastFocusNode = this.lastFocusOffset = null, this.polling = new I, this.composing = null, this.gracePeriod = !1, this.readDOMTimeout = null
                };

                function Fa(e, t) {
                    var r = Mr(e, t.line);
                    if (!r || r.hidden) return null;
                    var n = le(e.doc, t.line),
                        i = Sr(r, n, t.line),
                        o = Ze(n, e.doc.direction),
                        a = "left";
                    o && (a = Ye(o, t.ch) % 2 ? "right" : "left");
                    var l = Er(i.map, t.ch, a);
                    return l.offset = "right" == l.collapse ? l.end : l.start, l
                }

                function Da(e, t) {
                    return t && (e.bad = !0), e
                }

                function za(e, t, r) {
                    var n;
                    if (t == e.display.lineDiv) {
                        if (!(n = e.display.lineDiv.childNodes[r])) return Da(e.clipPos(me(e.display.viewTo - 1)), !0);
                        t = null, r = 0
                    } else
                        for (n = t;; n = n.parentNode) {
                            if (!n || n == e.display.lineDiv) return null;
                            if (n.parentNode && n.parentNode == e.display.lineDiv) break
                        }
                    for (var i = 0; i < e.display.view.length; i++) {
                        var o = e.display.view[i];
                        if (o.node == n) return Pa(o, t, r)
                    }
                }

                function Pa(e, t, r) {
                    var n = e.text.firstChild,
                        i = !1;
                    if (!t || !_(n, t)) return Da(me(de(e.line), 0), !0);
                    if (t == n && (i = !0, t = n.childNodes[r], r = 0, !t)) {
                        var o = e.rest ? Y(e.rest) : e.line;
                        return Da(me(de(o), o.text.length), i)
                    }
                    var a = 3 == t.nodeType ? t : null,
                        l = t;
                    for (a || 1 != t.childNodes.length || 3 != t.firstChild.nodeType || (a = t.firstChild, r && (r = a.nodeValue.length)); l.parentNode != n;) l = l.parentNode;
                    var s = e.measure,
                        c = s.maps;

                    function u(t, r, n) {
                        for (var i = -1; i < (c ? c.length : 0); i++)
                            for (var o = i < 0 ? s.map : c[i], a = 0; a < o.length; a += 3) {
                                var l = o[a + 2];
                                if (l == t || l == r) {
                                    var u = de(i < 0 ? e.line : e.rest[i]),
                                        d = o[a] + n;
                                    return (n < 0 || l != t) && (d = o[a + (n ? 1 : 0)]), me(u, d)
                                }
                            }
                    }
                    var d = u(a, l, r);
                    if (d) return Da(d, i);
                    for (var f = l.nextSibling, h = a ? a.nodeValue.length - r : 0; f; f = f.nextSibling) {
                        if (d = u(f, f.firstChild, 0)) return Da(me(d.line, d.ch - h), i);
                        h += f.textContent.length
                    }
                    for (var p = l.previousSibling, m = r; p; p = p.previousSibling) {
                        if (d = u(p, p.firstChild, -1)) return Da(me(d.line, d.ch + m), i);
                        m += p.textContent.length
                    }
                }
                Wa.prototype.init = function(e) {
                    var t = this,
                        r = this,
                        n = r.cm,
                        i = r.div = e.lineDiv;

                    function o(e) {
                        if (!nt(n, e)) {
                            if (n.somethingSelected()) Ta({
                                lineWise: !1,
                                text: n.getSelections()
                            }), "cut" == e.type && n.replaceSelection("", null, "cut");
                            else {
                                if (!n.options.lineWiseCopyCut) return;
                                var t = Aa(n);
                                Ta({
                                    lineWise: !0,
                                    text: t.text
                                }), "cut" == e.type && n.operation(function() {
                                    n.setSelections(t.ranges, 0, q), n.replaceSelection("", null, "cut")
                                })
                            }
                            if (e.clipboardData) {
                                e.clipboardData.clearData();
                                var o = Ca.text.join("\n");
                                if (e.clipboardData.setData("Text", o), e.clipboardData.getData("Text") == o) return void e.preventDefault()
                            }
                            var a = Na(),
                                l = a.firstChild;
                            n.display.lineSpace.insertBefore(a, n.display.lineSpace.firstChild), l.value = Ca.text.join("\n");
                            var s = document.activeElement;
                            D(l), setTimeout(function() {
                                n.display.lineSpace.removeChild(a), s.focus(), s == i && r.showPrimarySelection()
                            }, 50)
                        }
                    }
                    Oa(i, n.options.spellcheck), Qe(i, "paste", function(e) {
                        nt(n, e) || La(e, n) || l <= 11 && setTimeout(Kn(n, function() {
                            return t.updateFromDOM()
                        }), 20)
                    }), Qe(i, "compositionstart", function(e) {
                        t.composing = {
                            data: e.data,
                            done: !1
                        }
                    }), Qe(i, "compositionupdate", function(e) {
                        t.composing || (t.composing = {
                            data: e.data,
                            done: !1
                        })
                    }), Qe(i, "compositionend", function(e) {
                        t.composing && (e.data != t.composing.data && t.readFromDOMSoon(), t.composing.done = !0)
                    }), Qe(i, "touchstart", function() {
                        return r.forceCompositionEnd()
                    }), Qe(i, "input", function() {
                        t.composing || t.readFromDOMSoon()
                    }), Qe(i, "copy", o), Qe(i, "cut", o)
                }, Wa.prototype.prepareSelection = function() {
                    var e = ln(this.cm, !1);
                    return e.focus = this.cm.state.focused, e
                }, Wa.prototype.showSelection = function(e, t) {
                    e && this.cm.display.view.length && ((e.focus || t) && this.showPrimarySelection(), this.showMultipleSelections(e))
                }, Wa.prototype.showPrimarySelection = function() {
                    var e = window.getSelection(),
                        t = this.cm,
                        n = t.doc.sel.primary(),
                        i = n.from(),
                        o = n.to();
                    if (t.display.viewTo == t.display.viewFrom || i.line >= t.display.viewTo || o.line < t.display.viewFrom) e.removeAllRanges();
                    else {
                        var a = za(t, e.anchorNode, e.anchorOffset),
                            l = za(t, e.focusNode, e.focusOffset);
                        if (!a || a.bad || !l || l.bad || 0 != ge(we(a, l), i) || 0 != ge(be(a, l), o)) {
                            var s = t.display.view,
                                c = i.line >= t.display.viewFrom && Fa(t, i) || {
                                    node: s[0].measure.map[2],
                                    offset: 0
                                },
                                u = o.line < t.display.viewTo && Fa(t, o);
                            if (!u) {
                                var d = s[s.length - 1].measure,
                                    f = d.maps ? d.maps[d.maps.length - 1] : d.map;
                                u = {
                                    node: f[f.length - 1],
                                    offset: f[f.length - 2] - f[f.length - 3]
                                }
                            }
                            if (c && u) {
                                var h, p = e.rangeCount && e.getRangeAt(0);
                                try {
                                    h = S(c.node, c.offset, u.offset, u.node)
                                } catch (e) {}
                                h && (!r && t.state.focused ? (e.collapse(c.node, c.offset), h.collapsed || (e.removeAllRanges(), e.addRange(h))) : (e.removeAllRanges(), e.addRange(h)), p && null == e.anchorNode ? e.addRange(p) : r && this.startGracePeriod()), this.rememberSelection()
                            } else e.removeAllRanges()
                        }
                    }
                }, Wa.prototype.startGracePeriod = function() {
                    var e = this;
                    clearTimeout(this.gracePeriod), this.gracePeriod = setTimeout(function() {
                        e.gracePeriod = !1, e.selectionChanged() && e.cm.operation(function() {
                            return e.cm.curOp.selectionChanged = !0
                        })
                    }, 20)
                }, Wa.prototype.showMultipleSelections = function(e) {
                    A(this.cm.display.cursorDiv, e.cursors), A(this.cm.display.selectionDiv, e.selection)
                }, Wa.prototype.rememberSelection = function() {
                    var e = window.getSelection();
                    this.lastAnchorNode = e.anchorNode, this.lastAnchorOffset = e.anchorOffset, this.lastFocusNode = e.focusNode, this.lastFocusOffset = e.focusOffset
                }, Wa.prototype.selectionInEditor = function() {
                    var e = window.getSelection();
                    if (!e.rangeCount) return !1;
                    var t = e.getRangeAt(0).commonAncestorContainer;
                    return _(this.div, t)
                }, Wa.prototype.focus = function() {
                    "nocursor" != this.cm.options.readOnly && (this.selectionInEditor() || this.showSelection(this.prepareSelection(), !0), this.div.focus())
                }, Wa.prototype.blur = function() {
                    this.div.blur()
                }, Wa.prototype.getField = function() {
                    return this.div
                }, Wa.prototype.supportsTouch = function() {
                    return !0
                }, Wa.prototype.receivedFocus = function() {
                    var e = this;
                    this.selectionInEditor() ? this.pollSelection() : Un(this.cm, function() {
                        return e.cm.curOp.selectionChanged = !0
                    }), this.polling.set(this.cm.options.pollInterval, function t() {
                        e.cm.state.focused && (e.pollSelection(), e.polling.set(e.cm.options.pollInterval, t))
                    })
                }, Wa.prototype.selectionChanged = function() {
                    var e = window.getSelection();
                    return e.anchorNode != this.lastAnchorNode || e.anchorOffset != this.lastAnchorOffset || e.focusNode != this.lastFocusNode || e.focusOffset != this.lastFocusOffset
                }, Wa.prototype.pollSelection = function() {
                    if (null == this.readDOMTimeout && !this.gracePeriod && this.selectionChanged()) {
                        var e = window.getSelection(),
                            t = this.cm;
                        if (g && u && this.cm.options.gutters.length && function(e) {
                                for (var t = e; t; t = t.parentNode)
                                    if (/CodeMirror-gutter-wrapper/.test(t.className)) return !0;
                                return !1
                            }(e.anchorNode)) return this.cm.triggerOnKeyDown({
                            type: "keydown",
                            keyCode: 8,
                            preventDefault: Math.abs
                        }), this.blur(), void this.focus();
                        if (!this.composing) {
                            this.rememberSelection();
                            var r = za(t, e.anchorNode, e.anchorOffset),
                                n = za(t, e.focusNode, e.focusOffset);
                            r && n && Un(t, function() {
                                Ki(t.doc, vi(r, n), q), (r.bad || n.bad) && (t.curOp.selectionChanged = !0)
                            })
                        }
                    }
                }, Wa.prototype.pollContent = function() {
                    null != this.readDOMTimeout && (clearTimeout(this.readDOMTimeout), this.readDOMTimeout = null);
                    var e, t, r, n = this.cm,
                        i = n.display,
                        o = n.doc.sel.primary(),
                        a = o.from(),
                        l = o.to();
                    if (0 == a.ch && a.line > n.firstLine() && (a = me(a.line - 1, le(n.doc, a.line - 1).length)), l.ch == le(n.doc, l.line).text.length && l.line < n.lastLine() && (l = me(l.line + 1, 0)), a.line < i.viewFrom || l.line > i.viewTo - 1) return !1;
                    a.line == i.viewFrom || 0 == (e = on(n, a.line)) ? (t = de(i.view[0].line), r = i.view[0].node) : (t = de(i.view[e].line), r = i.view[e - 1].node.nextSibling);
                    var s, c, u = on(n, l.line);
                    if (u == i.view.length - 1 ? (s = i.viewTo - 1, c = i.lineDiv.lastChild) : (s = de(i.view[u + 1].line) - 1, c = i.view[u + 1].node.previousSibling), !r) return !1;
                    for (var d = n.doc.splitLines(function(e, t, r, n, i) {
                            var o = "",
                                a = !1,
                                l = e.doc.lineSeparator();

                            function s() {
                                a && (o += l, a = !1)
                            }

                            function c(e) {
                                e && (s(), o += e)
                            }

                            function u(t) {
                                if (1 == t.nodeType) {
                                    var r = t.getAttribute("cm-text");
                                    if (null != r) return void c(r || t.textContent.replace(/\u200b/g, ""));
                                    var o, d = t.getAttribute("cm-marker");
                                    if (d) {
                                        var f = e.findMarks(me(n, 0), me(i + 1, 0), (m = +d, function(e) {
                                            return e.id == m
                                        }));
                                        return void(f.length && (o = f[0].find(0)) && c(se(e.doc, o.from, o.to).join(l)))
                                    }
                                    if ("false" == t.getAttribute("contenteditable")) return;
                                    var h = /^(pre|div|p)$/i.test(t.nodeName);
                                    h && s();
                                    for (var p = 0; p < t.childNodes.length; p++) u(t.childNodes[p]);
                                    h && (a = !0)
                                } else 3 == t.nodeType && c(t.nodeValue);
                                var m
                            }
                            for (; u(t), t != r;) t = t.nextSibling;
                            return o
                        }(n, r, c, t, s)), f = se(n.doc, me(t, 0), me(s, le(n.doc, s).text.length)); d.length > 1 && f.length > 1;)
                        if (Y(d) == Y(f)) d.pop(), f.pop(), s--;
                        else {
                            if (d[0] != f[0]) break;
                            d.shift(), f.shift(), t++
                        }
                    for (var h = 0, p = 0, m = d[0], g = f[0], v = Math.min(m.length, g.length); h < v && m.charCodeAt(h) == g.charCodeAt(h);) ++h;
                    for (var y = Y(d), b = Y(f), w = Math.min(y.length - (1 == d.length ? h : 0), b.length - (1 == f.length ? h : 0)); p < w && y.charCodeAt(y.length - p - 1) == b.charCodeAt(b.length - p - 1);) ++p;
                    if (1 == d.length && 1 == f.length && t == a.line)
                        for (; h && h > a.ch && y.charCodeAt(y.length - p - 1) == b.charCodeAt(b.length - p - 1);) h--, p++;
                    d[d.length - 1] = y.slice(0, y.length - p).replace(/^\u200b+/, ""), d[0] = d[0].slice(h).replace(/\u200b+$/, "");
                    var x = me(t, h),
                        k = me(s, f.length ? Y(f).length - p : 0);
                    return d.length > 1 || d[0] || ge(x, k) ? (ao(n.doc, d, x, k, "+input"), !0) : void 0
                }, Wa.prototype.ensurePolled = function() {
                    this.forceCompositionEnd()
                }, Wa.prototype.reset = function() {
                    this.forceCompositionEnd()
                }, Wa.prototype.forceCompositionEnd = function() {
                    this.composing && (clearTimeout(this.readDOMTimeout), this.composing = null, this.updateFromDOM(), this.div.blur(), this.div.focus())
                }, Wa.prototype.readFromDOMSoon = function() {
                    var e = this;
                    null == this.readDOMTimeout && (this.readDOMTimeout = setTimeout(function() {
                        if (e.readDOMTimeout = null, e.composing) {
                            if (!e.composing.done) return;
                            e.composing = null
                        }
                        e.updateFromDOM()
                    }, 80))
                }, Wa.prototype.updateFromDOM = function() {
                    var e = this;
                    !this.cm.isReadOnly() && this.pollContent() || Un(this.cm, function() {
                        return $n(e.cm)
                    })
                }, Wa.prototype.setUneditable = function(e) {
                    e.contentEditable = "false"
                }, Wa.prototype.onKeyPress = function(e) {
                    0 != e.charCode && (e.preventDefault(), this.cm.isReadOnly() || Kn(this.cm, Sa)(this.cm, String.fromCharCode(null == e.charCode ? e.keyCode : e.charCode), 0))
                }, Wa.prototype.readOnlyChanged = function(e) {
                    this.div.contentEditable = String("nocursor" != e)
                }, Wa.prototype.onContextMenu = function() {}, Wa.prototype.resetPosition = function() {}, Wa.prototype.needsContentAttribute = !0;
                var Ha, Ia, Ra, ja = function(e) {
                    this.cm = e, this.prevInput = "", this.pollingFast = !1, this.polling = new I, this.hasSelection = !1, this.composing = null
                };
                ja.prototype.init = function(e) {
                        var t = this,
                            r = this,
                            n = this.cm,
                            i = this.wrapper = Na(),
                            o = this.textarea = i.firstChild;

                        function s(e) {
                            if (!nt(n, e)) {
                                if (n.somethingSelected()) Ta({
                                    lineWise: !1,
                                    text: n.getSelections()
                                });
                                else {
                                    if (!n.options.lineWiseCopyCut) return;
                                    var t = Aa(n);
                                    Ta({
                                        lineWise: !0,
                                        text: t.text
                                    }), "cut" == e.type ? n.setSelections(t.ranges, null, q) : (r.prevInput = "", o.value = t.text.join("\n"), D(o))
                                }
                                "cut" == e.type && (n.state.cutIncoming = !0)
                            }
                        }
                        e.wrapper.insertBefore(i, e.wrapper.firstChild), m && (o.style.width = "0px"), Qe(o, "input", function() {
                            a && l >= 9 && t.hasSelection && (t.hasSelection = null), r.poll()
                        }), Qe(o, "paste", function(e) {
                            nt(n, e) || La(e, n) || (n.state.pasteIncoming = !0, r.fastPoll())
                        }), Qe(o, "cut", s), Qe(o, "copy", s), Qe(e.scroller, "paste", function(t) {
                            yr(e, t) || nt(n, t) || (n.state.pasteIncoming = !0, r.focus())
                        }), Qe(e.lineSpace, "selectstart", function(t) {
                            yr(e, t) || lt(t)
                        }), Qe(o, "compositionstart", function() {
                            var e = n.getCursor("from");
                            r.composing && r.composing.range.clear(), r.composing = {
                                start: e,
                                range: n.markText(e, n.getCursor("to"), {
                                    className: "CodeMirror-composing"
                                })
                            }
                        }), Qe(o, "compositionend", function() {
                            r.composing && (r.poll(), r.composing.range.clear(), r.composing = null)
                        })
                    }, ja.prototype.prepareSelection = function() {
                        var e = this.cm,
                            t = e.display,
                            r = e.doc,
                            n = ln(e);
                        if (e.options.moveInputWithCursor) {
                            var i = qr(e, r.sel.primary().head, "div"),
                                o = t.wrapper.getBoundingClientRect(),
                                a = t.lineDiv.getBoundingClientRect();
                            n.teTop = Math.max(0, Math.min(t.wrapper.clientHeight - 10, i.top + a.top - o.top)), n.teLeft = Math.max(0, Math.min(t.wrapper.clientWidth - 10, i.left + a.left - o.left))
                        }
                        return n
                    }, ja.prototype.showSelection = function(e) {
                        var t = this.cm.display;
                        A(t.cursorDiv, e.cursors), A(t.selectionDiv, e.selection), null != e.teTop && (this.wrapper.style.top = e.teTop + "px", this.wrapper.style.left = e.teLeft + "px")
                    }, ja.prototype.reset = function(e) {
                        if (!this.contextMenuPending && !this.composing) {
                            var t = this.cm;
                            if (t.somethingSelected()) {
                                this.prevInput = "";
                                var r = t.getSelection();
                                this.textarea.value = r, t.state.focused && D(this.textarea), a && l >= 9 && (this.hasSelection = r)
                            } else e || (this.prevInput = this.textarea.value = "", a && l >= 9 && (this.hasSelection = null))
                        }
                    }, ja.prototype.getField = function() {
                        return this.textarea
                    }, ja.prototype.supportsTouch = function() {
                        return !1
                    }, ja.prototype.focus = function() {
                        if ("nocursor" != this.cm.options.readOnly && (!v || E() != this.textarea)) try {
                            this.textarea.focus()
                        } catch (e) {}
                    }, ja.prototype.blur = function() {
                        this.textarea.blur()
                    }, ja.prototype.resetPosition = function() {
                        this.wrapper.style.top = this.wrapper.style.left = 0
                    }, ja.prototype.receivedFocus = function() {
                        this.slowPoll()
                    }, ja.prototype.slowPoll = function() {
                        var e = this;
                        this.pollingFast || this.polling.set(this.cm.options.pollInterval, function() {
                            e.poll(), e.cm.state.focused && e.slowPoll()
                        })
                    }, ja.prototype.fastPoll = function() {
                        var e = !1,
                            t = this;
                        t.pollingFast = !0, t.polling.set(20, function r() {
                            t.poll() || e ? (t.pollingFast = !1, t.slowPoll()) : (e = !0, t.polling.set(60, r))
                        })
                    }, ja.prototype.poll = function() {
                        var e = this,
                            t = this.cm,
                            r = this.textarea,
                            n = this.prevInput;
                        if (this.contextMenuPending || !t.state.focused || wt(r) && !n && !this.composing || t.isReadOnly() || t.options.disableInput || t.state.keySeq) return !1;
                        var i = r.value;
                        if (i == n && !t.somethingSelected()) return !1;
                        if (a && l >= 9 && this.hasSelection === i || y && /[\uf700-\uf7ff]/.test(i)) return t.display.input.reset(), !1;
                        if (t.doc.sel == t.display.selForContextMenu) {
                            var o = i.charCodeAt(0);
                            if (8203 != o || n || (n = "​"), 8666 == o) return this.reset(), this.cm.execCommand("undo")
                        }
                        for (var s = 0, c = Math.min(n.length, i.length); s < c && n.charCodeAt(s) == i.charCodeAt(s);) ++s;
                        return Un(t, function() {
                            Sa(t, i.slice(s), n.length - s, null, e.composing ? "*compose" : null), i.length > 1e3 || i.indexOf("\n") > -1 ? r.value = e.prevInput = "" : e.prevInput = i, e.composing && (e.composing.range.clear(), e.composing.range = t.markText(e.composing.start, t.getCursor("to"), {
                                className: "CodeMirror-composing"
                            }))
                        }), !0
                    }, ja.prototype.ensurePolled = function() {
                        this.pollingFast && this.poll() && (this.pollingFast = !1)
                    }, ja.prototype.onKeyPress = function() {
                        a && l >= 9 && (this.hasSelection = null), this.fastPoll()
                    }, ja.prototype.onContextMenu = function(e) {
                        var t = this,
                            r = t.cm,
                            n = r.display,
                            i = t.textarea,
                            o = nn(r, e),
                            c = n.scroller.scrollTop;
                        if (o && !d) {
                            r.options.resetSelectionOnContextMenu && -1 == r.doc.sel.contains(o) && Kn(r, Ki)(r.doc, vi(o), q);
                            var u = i.style.cssText,
                                f = t.wrapper.style.cssText;
                            t.wrapper.style.cssText = "position: absolute";
                            var h, p = t.wrapper.getBoundingClientRect();
                            if (i.style.cssText = "position: absolute; width: 30px; height: 30px;\n      top: " + (e.clientY - p.top - 5) + "px; left: " + (e.clientX - p.left - 5) + "px;\n      z-index: 1000; background: " + (a ? "rgba(255, 255, 255, .05)" : "transparent") + ";\n      outline: none; border-width: 0; outline: none; overflow: hidden; opacity: .05; filter: alpha(opacity=5);", s && (h = window.scrollY), n.input.focus(), s && window.scrollTo(null, h), n.input.reset(), r.somethingSelected() || (i.value = t.prevInput = " "), t.contextMenuPending = !0, n.selForContextMenu = r.doc.sel, clearTimeout(n.detectingSelectAll), a && l >= 9 && g(), C) {
                                ut(e);
                                var m = function() {
                                    tt(window, "mouseup", m), setTimeout(v, 20)
                                };
                                Qe(window, "mouseup", m)
                            } else setTimeout(v, 50)
                        }

                        function g() {
                            if (null != i.selectionStart) {
                                var e = r.somethingSelected(),
                                    o = "​" + (e ? i.value : "");
                                i.value = "⇚", i.value = o, t.prevInput = e ? "" : "​", i.selectionStart = 1, i.selectionEnd = o.length, n.selForContextMenu = r.doc.sel
                            }
                        }

                        function v() {
                            if (t.contextMenuPending = !1, t.wrapper.style.cssText = f, i.style.cssText = u, a && l < 9 && n.scrollbars.setScrollTop(n.scroller.scrollTop = c), null != i.selectionStart) {
                                (!a || a && l < 9) && g();
                                var e = 0,
                                    o = function() {
                                        n.selForContextMenu == r.doc.sel && 0 == i.selectionStart && i.selectionEnd > 0 && "​" == t.prevInput ? Kn(r, Qi)(r) : e++ < 10 ? n.detectingSelectAll = setTimeout(o, 500) : (n.selForContextMenu = null, n.input.reset())
                                    };
                                n.detectingSelectAll = setTimeout(o, 200)
                            }
                        }
                    }, ja.prototype.readOnlyChanged = function(e) {
                        e || this.reset(), this.textarea.disabled = "nocursor" == e
                    }, ja.prototype.setUneditable = function() {}, ja.prototype.needsContentAttribute = !1,
                    function(e) {
                        var t = e.optionHandlers;

                        function r(r, n, i, o) {
                            e.defaults[r] = n, i && (t[r] = o ? function(e, t, r) {
                                r != pa && i(e, t, r)
                            } : i)
                        }
                        e.defineOption = r, e.Init = pa, r("value", "", function(e, t) {
                            return e.setValue(t)
                        }, !0), r("mode", null, function(e, t) {
                            e.doc.modeOption = t, ki(e)
                        }, !0), r("indentUnit", 2, ki, !0), r("indentWithTabs", !1), r("smartIndent", !0), r("tabSize", 4, function(e) {
                            Ci(e), zr(e), $n(e)
                        }, !0), r("lineSeparator", null, function(e, t) {
                            if (e.doc.lineSep = t, t) {
                                var r = [],
                                    n = e.doc.first;
                                e.doc.iter(function(e) {
                                    for (var i = 0;;) {
                                        var o = e.text.indexOf(t, i);
                                        if (-1 == o) break;
                                        i = o + t.length, r.push(me(n, o))
                                    }
                                    n++
                                });
                                for (var i = r.length - 1; i >= 0; i--) ao(e.doc, t, r[i], me(r[i].line, r[i].ch + t.length))
                            }
                        }), r("specialChars", /[\u0000-\u001f\u007f-\u009f\u00ad\u061c\u200b-\u200f\u2028\u2029\ufeff]/g, function(e, t, r) {
                            e.state.specialChars = new RegExp(t.source + (t.test("\t") ? "" : "|\t"), "g"), r != pa && e.refresh()
                        }), r("specialCharPlaceholder", Xt, function(e) {
                            return e.refresh()
                        }, !0), r("electricChars", !0), r("inputStyle", v ? "contenteditable" : "textarea", function() {
                            throw new Error("inputStyle can not (yet) be changed in a running editor")
                        }, !0), r("spellcheck", !1, function(e, t) {
                            return e.getInputField().spellcheck = t
                        }, !0), r("rtlMoveVisually", !w), r("wholeLineUpdateBefore", !0), r("theme", "default", function(e) {
                            ha(e), va(e)
                        }, !0), r("keyMap", "default", function(e, t, r) {
                            var n = Bo(t),
                                i = r != pa && Bo(r);
                            i && i.detach && i.detach(e, n), n.attach && n.attach(e, i || null)
                        }), r("extraKeys", null), r("configureMouse", null), r("lineWrapping", !1, ba, !0), r("gutters", [], function(e) {
                            si(e.options), va(e)
                        }, !0), r("fixedGutter", !0, function(e, t) {
                            e.display.gutters.style.left = t ? en(e.display) + "px" : "0", e.refresh()
                        }, !0), r("coverGutterNextToScrollbar", !1, function(e) {
                            return Wn(e)
                        }, !0), r("scrollbarStyle", "native", function(e) {
                            zn(e), Wn(e), e.display.scrollbars.setScrollTop(e.doc.scrollTop), e.display.scrollbars.setScrollLeft(e.doc.scrollLeft)
                        }, !0), r("lineNumbers", !1, function(e) {
                            si(e.options), va(e)
                        }, !0), r("firstLineNumber", 1, va, !0), r("lineNumberFormatter", function(e) {
                            return e
                        }, va, !0), r("showCursorWhenSelecting", !1, an, !0), r("resetSelectionOnContextMenu", !0), r("lineWiseCopyCut", !0), r("pasteLinesPerSelection", !0), r("readOnly", !1, function(e, t) {
                            "nocursor" == t && (mn(e), e.display.input.blur()), e.display.input.readOnlyChanged(t)
                        }), r("disableInput", !1, function(e, t) {
                            t || e.display.input.reset()
                        }, !0), r("dragDrop", !0, ya), r("allowDropFileTypes", null), r("cursorBlinkRate", 530), r("cursorScrollMargin", 0), r("cursorHeight", 1, an, !0), r("singleCursorHeightPerLine", !0, an, !0), r("workTime", 100), r("workDelay", 100), r("flattenSpans", !0, Ci, !0), r("addModeClass", !1, Ci, !0), r("pollInterval", 100), r("undoDepth", 200, function(e, t) {
                            return e.doc.history.undoDepth = t
                        }), r("historyEventDelay", 1250), r("viewportMargin", 10, function(e) {
                            return e.refresh()
                        }, !0), r("maxHighlightLength", 1e4, Ci, !0), r("moveInputWithCursor", !0, function(e, t) {
                            t || e.display.input.resetPosition()
                        }), r("tabindex", null, function(e, t) {
                            return e.display.input.getField().tabIndex = t || ""
                        }), r("autofocus", null), r("direction", "ltr", function(e, t) {
                            return e.doc.setDirection(t)
                        }, !0)
                    }(wa), Ia = (Ha = wa).optionHandlers, Ra = Ha.helpers = {}, Ha.prototype = {
                        constructor: Ha,
                        focus: function() {
                            window.focus(), this.display.input.focus()
                        },
                        setOption: function(e, t) {
                            var r = this.options,
                                n = r[e];
                            r[e] == t && "mode" != e || (r[e] = t, Ia.hasOwnProperty(e) && Kn(this, Ia[e])(this, t, n), rt(this, "optionChange", this, e))
                        },
                        getOption: function(e) {
                            return this.options[e]
                        },
                        getDoc: function() {
                            return this.doc
                        },
                        addKeyMap: function(e, t) {
                            this.state.keyMaps[t ? "push" : "unshift"](Bo(e))
                        },
                        removeKeyMap: function(e) {
                            for (var t = this.state.keyMaps, r = 0; r < t.length; ++r)
                                if (t[r] == e || t[r].name == e) return t.splice(r, 1), !0
                        },
                        addOverlay: Vn(function(e, t) {
                            var r = e.token ? e : Ha.getMode(this.options, e);
                            if (r.startState) throw new Error("Overlays may not be stateful.");
                            ! function(e, t, r) {
                                for (var n = 0, i = r(t); n < e.length && r(e[n]) <= i;) n++;
                                e.splice(n, 0, t)
                            }(this.state.overlays, {
                                mode: r,
                                modeSpec: e,
                                opaque: t && t.opaque,
                                priority: t && t.priority || 0
                            }, function(e) {
                                return e.priority
                            }), this.state.modeGen++, $n(this)
                        }),
                        removeOverlay: Vn(function(e) {
                            for (var t = this.state.overlays, r = 0; r < t.length; ++r) {
                                var n = t[r].modeSpec;
                                if (n == e || "string" == typeof e && n.name == e) return t.splice(r, 1), this.state.modeGen++, void $n(this)
                            }
                        }),
                        indentLine: Vn(function(e, t, r) {
                            "string" != typeof t && "number" != typeof t && (t = null == t ? this.options.smartIndent ? "smart" : "prev" : t ? "add" : "subtract"), he(this.doc, e) && ka(this, e, t, r)
                        }),
                        indentSelection: Vn(function(e) {
                            for (var t = this.doc.sel.ranges, r = -1, n = 0; n < t.length; n++) {
                                var i = t[n];
                                if (i.empty()) i.head.line > r && (ka(this, i.head.line, e, !0), r = i.head.line, n == this.doc.sel.primIndex && Cn(this));
                                else {
                                    var o = i.from(),
                                        a = i.to(),
                                        l = Math.max(r, o.line);
                                    r = Math.min(this.lastLine(), a.line - (a.ch ? 0 : 1)) + 1;
                                    for (var s = l; s < r; ++s) ka(this, s, e);
                                    var c = this.doc.sel.ranges;
                                    0 == o.ch && t.length == c.length && c[n].from().ch > 0 && Bi(this.doc, n, new mi(o, c[n].to()), q)
                                }
                            }
                        }),
                        getTokenAt: function(e, t) {
                            return Bt(this, e, t)
                        },
                        getLineTokens: function(e, t) {
                            return Bt(this, me(e), t, !0)
                        },
                        getTokenTypeAt: function(e) {
                            e = ke(this.doc, e);
                            var t, r = zt(this, le(this.doc, e.line)),
                                n = 0,
                                i = (r.length - 1) / 2,
                                o = e.ch;
                            if (0 == o) t = r[2];
                            else
                                for (;;) {
                                    var a = n + i >> 1;
                                    if ((a ? r[2 * a - 1] : 0) >= o) i = a;
                                    else {
                                        if (!(r[2 * a + 1] < o)) {
                                            t = r[2 * a + 2];
                                            break
                                        }
                                        n = a + 1
                                    }
                                }
                            var l = t ? t.indexOf("overlay ") : -1;
                            return l < 0 ? t : 0 == l ? null : t.slice(0, l - 1)
                        },
                        getModeAt: function(e) {
                            var t = this.doc.mode;
                            return t.innerMode ? Ha.innerMode(t, this.getTokenAt(e).state).mode : t
                        },
                        getHelper: function(e, t) {
                            return this.getHelpers(e, t)[0]
                        },
                        getHelpers: function(e, t) {
                            var r = [];
                            if (!Ra.hasOwnProperty(t)) return r;
                            var n = Ra[t],
                                i = this.getModeAt(e);
                            if ("string" == typeof i[t]) n[i[t]] && r.push(n[i[t]]);
                            else if (i[t])
                                for (var o = 0; o < i[t].length; o++) {
                                    var a = n[i[t][o]];
                                    a && r.push(a)
                                } else i.helperType && n[i.helperType] ? r.push(n[i.helperType]) : n[i.name] && r.push(n[i.name]);
                            for (var l = 0; l < n._global.length; l++) {
                                var s = n._global[l];
                                s.pred(i, this) && -1 == R(r, s.val) && r.push(s.val)
                            }
                            return r
                        },
                        getStateAfter: function(e, t) {
                            var r = this.doc;
                            return Pt(this, (e = xe(r, null == e ? r.first + r.size - 1 : e)) + 1, t).state
                        },
                        cursorCoords: function(e, t) {
                            var r = this.doc.sel.primary();
                            return qr(this, null == e ? r.head : "object" == typeof e ? ke(this.doc, e) : e ? r.from() : r.to(), t || "page")
                        },
                        charCoords: function(e, t) {
                            return Br(this, ke(this.doc, e), t || "page")
                        },
                        coordsChar: function(e, t) {
                            return Vr(this, (e = jr(this, e, t || "page")).left, e.top)
                        },
                        lineAtHeight: function(e, t) {
                            return e = jr(this, {
                                top: e,
                                left: 0
                            }, t || "page").top, fe(this.doc, e + this.display.viewOffset)
                        },
                        heightAtLine: function(e, t, r) {
                            var n, i = !1;
                            if ("number" == typeof e) {
                                var o = this.doc.first + this.doc.size - 1;
                                e < this.doc.first ? e = this.doc.first : e > o && (e = o, i = !0), n = le(this.doc, e)
                            } else n = e;
                            return Rr(this, n, {
                                top: 0,
                                left: 0
                            }, t || "page", r || i).top + (i ? this.doc.height - Ke(n) : 0)
                        },
                        defaultTextHeight: function() {
                            return Zr(this.display)
                        },
                        defaultCharWidth: function() {
                            return Jr(this.display)
                        },
                        getViewport: function() {
                            return {
                                from: this.display.viewFrom,
                                to: this.display.viewTo
                            }
                        },
                        addWidget: function(e, t, r, n, i) {
                            var o, a, l, s = this.display,
                                c = (e = qr(this, ke(this.doc, e))).bottom,
                                u = e.left;
                            if (t.style.position = "absolute", t.setAttribute("cm-ignore-events", "true"), this.display.input.setUneditable(t), s.sizer.appendChild(t), "over" == n) c = e.top;
                            else if ("above" == n || "near" == n) {
                                var d = Math.max(s.wrapper.clientHeight, this.doc.height),
                                    f = Math.max(s.sizer.clientWidth, s.lineSpace.clientWidth);
                                ("above" == n || e.bottom + t.offsetHeight > d) && e.top > t.offsetHeight ? c = e.top - t.offsetHeight : e.bottom + t.offsetHeight <= d && (c = e.bottom), u + t.offsetWidth > f && (u = f - t.offsetWidth)
                            }
                            t.style.top = c + "px", t.style.left = t.style.right = "", "right" == i ? (u = s.sizer.clientWidth - t.offsetWidth, t.style.right = "0px") : ("left" == i ? u = 0 : "middle" == i && (u = (s.sizer.clientWidth - t.offsetWidth) / 2), t.style.left = u + "px"), r && (o = this, a = {
                                left: u,
                                top: c,
                                right: u + t.offsetWidth,
                                bottom: c + t.offsetHeight
                            }, null != (l = xn(o, a)).scrollTop && Mn(o, l.scrollTop), null != l.scrollLeft && On(o, l.scrollLeft))
                        },
                        triggerOnKeyDown: Vn(ra),
                        triggerOnKeyPress: Vn(ia),
                        triggerOnKeyUp: na,
                        triggerOnMouseDown: Vn(sa),
                        execCommand: function(e) {
                            if (Go.hasOwnProperty(e)) return Go[e].call(null, this)
                        },
                        triggerElectric: Vn(function(e) {
                            Ma(this, e)
                        }),
                        findPosH: function(e, t, r, n) {
                            var i = 1;
                            t < 0 && (i = -1, t = -t);
                            for (var o = ke(this.doc, e), a = 0; a < t && !(o = _a(this.doc, o, i, r, n)).hitSide; ++a);
                            return o
                        },
                        moveH: Vn(function(e, t) {
                            var r = this;
                            this.extendSelectionsBy(function(n) {
                                return r.display.shift || r.doc.extend || n.empty() ? _a(r.doc, n.head, e, t, r.options.rtlMoveVisually) : e < 0 ? n.from() : n.to()
                            }, K)
                        }),
                        deleteH: Vn(function(e, t) {
                            var r = this.doc.sel,
                                n = this.doc;
                            r.somethingSelected() ? n.replaceSelection("", null, "+delete") : qo(this, function(r) {
                                var i = _a(n, r.head, e, t, !1);
                                return e < 0 ? {
                                    from: i,
                                    to: r.head
                                } : {
                                    from: r.head,
                                    to: i
                                }
                            })
                        }),
                        findPosV: function(e, t, r, n) {
                            var i = 1,
                                o = n;
                            t < 0 && (i = -1, t = -t);
                            for (var a = ke(this.doc, e), l = 0; l < t; ++l) {
                                var s = qr(this, a, "div");
                                if (null == o ? o = s.left : s.left = o, (a = Ea(this, s, i, r)).hitSide) break
                            }
                            return a
                        },
                        moveV: Vn(function(e, t) {
                            var r = this,
                                n = this.doc,
                                i = [],
                                o = !this.display.shift && !n.extend && n.sel.somethingSelected();
                            if (n.extendSelectionsBy(function(a) {
                                    if (o) return e < 0 ? a.from() : a.to();
                                    var l = qr(r, a.head, "div");
                                    null != a.goalColumn && (l.left = a.goalColumn), i.push(l.left);
                                    var s = Ea(r, l, e, t);
                                    return "page" == t && a == n.sel.primary() && kn(r, Br(r, s, "div").top - l.top), s
                                }, K), i.length)
                                for (var a = 0; a < n.sel.ranges.length; a++) n.sel.ranges[a].goalColumn = i[a]
                        }),
                        findWordAt: function(e) {
                            var t = le(this.doc, e.line).text,
                                r = e.ch,
                                n = e.ch;
                            if (t) {
                                var i = this.getHelper(e, "wordChars");
                                "before" != e.sticky && n != t.length || !r ? ++n : --r;
                                for (var o = t.charAt(r), a = te(o, i) ? function(e) {
                                        return te(e, i)
                                    } : /\s/.test(o) ? function(e) {
                                        return /\s/.test(e)
                                    } : function(e) {
                                        return !/\s/.test(e) && !te(e)
                                    }; r > 0 && a(t.charAt(r - 1));) --r;
                                for (; n < t.length && a(t.charAt(n));) ++n
                            }
                            return new mi(me(e.line, r), me(e.line, n))
                        },
                        toggleOverwrite: function(e) {
                            null != e && e == this.state.overwrite || ((this.state.overwrite = !this.state.overwrite) ? W(this.display.cursorDiv, "CodeMirror-overwrite") : L(this.display.cursorDiv, "CodeMirror-overwrite"), rt(this, "overwriteToggle", this, this.state.overwrite))
                        },
                        hasFocus: function() {
                            return this.display.input.getField() == E()
                        },
                        isReadOnly: function() {
                            return !(!this.options.readOnly && !this.doc.cantEdit)
                        },
                        scrollTo: Vn(function(e, t) {
                            Tn(this, e, t)
                        }),
                        getScrollInfo: function() {
                            var e = this.display.scroller;
                            return {
                                left: e.scrollLeft,
                                top: e.scrollTop,
                                height: e.scrollHeight - kr(this) - this.display.barHeight,
                                width: e.scrollWidth - kr(this) - this.display.barWidth,
                                clientHeight: Tr(this),
                                clientWidth: Cr(this)
                            }
                        },
                        scrollIntoView: Vn(function(e, t) {
                            var r, n;
                            null == e ? (e = {
                                from: this.doc.sel.primary().head,
                                to: null
                            }, null == t && (t = this.options.cursorScrollMargin)) : "number" == typeof e ? e = {
                                from: me(e, 0),
                                to: null
                            } : null == e.from && (e = {
                                from: e,
                                to: null
                            }), e.to || (e.to = e.from), e.margin = t || 0, null != e.from.line ? (n = e, Sn(r = this), r.curOp.scrollToPos = n) : Ln(this, e.from, e.to, e.margin)
                        }),
                        setSize: Vn(function(e, t) {
                            var r = this,
                                n = function(e) {
                                    return "number" == typeof e || /^\d+$/.test(String(e)) ? e + "px" : e
                                };
                            null != e && (this.display.wrapper.style.width = n(e)), null != t && (this.display.wrapper.style.height = n(t)), this.options.lineWrapping && Dr(this);
                            var i = this.display.viewFrom;
                            this.doc.iter(i, this.display.viewTo, function(e) {
                                if (e.widgets)
                                    for (var t = 0; t < e.widgets.length; t++)
                                        if (e.widgets[t].noHScroll) {
                                            Yn(r, i, "widget");
                                            break
                                        }++i
                            }), this.curOp.forceUpdate = !0, rt(this, "refresh", this)
                        }),
                        operation: function(e) {
                            return Un(this, e)
                        },
                        startOperation: function() {
                            return Hn(this)
                        },
                        endOperation: function() {
                            return In(this)
                        },
                        refresh: Vn(function() {
                            var e = this.display.cachedTextHeight;
                            $n(this), this.curOp.forceUpdate = !0, zr(this), Tn(this, this.doc.scrollLeft, this.doc.scrollTop), oi(this), (null == e || Math.abs(e - Zr(this.display)) > .5) && rn(this), rt(this, "refresh", this)
                        }),
                        swapDoc: Vn(function(e) {
                            var t = this.doc;
                            return t.cm = null, Mi(this, e), zr(this), this.display.input.reset(), Tn(this, e.scrollLeft, e.scrollTop), this.curOp.forceScroll = !0, or(this, "swapDoc", this, t), t
                        }),
                        getInputField: function() {
                            return this.display.input.getField()
                        },
                        getWrapperElement: function() {
                            return this.display.wrapper
                        },
                        getScrollerElement: function() {
                            return this.display.scroller
                        },
                        getGutterElement: function() {
                            return this.display.gutters
                        }
                    }, at(Ha), Ha.registerHelper = function(e, t, r) {
                        Ra.hasOwnProperty(e) || (Ra[e] = Ha[e] = {
                            _global: []
                        }), Ra[e][t] = r
                    }, Ha.registerGlobalHelper = function(e, t, r, n) {
                        Ha.registerHelper(e, t, n), Ra[e]._global.push({
                            pred: r,
                            val: n
                        })
                    };
                var Ba, qa = "iter insert remove copy getEditor constructor".split(" ");
                for (var Ua in Co.prototype) Co.prototype.hasOwnProperty(Ua) && R(qa, Ua) < 0 && (wa.prototype[Ua] = function(e) {
                    return function() {
                        return e.apply(this.doc, arguments)
                    }
                }(Co.prototype[Ua]));
                return at(Co), wa.inputStyles = {
                    textarea: ja,
                    contenteditable: Wa
                }, wa.defineMode = function(e) {
                    wa.defaults.mode || "null" == e || (wa.defaults.mode = e),
                        function(e, t) {
                            arguments.length > 2 && (t.dependencies = Array.prototype.slice.call(arguments, 2)), Ct[e] = t
                        }.apply(this, arguments)
                }, wa.defineMIME = function(e, t) {
                    Tt[e] = t
                }, wa.defineMode("null", function() {
                    return {
                        token: function(e) {
                            return e.skipToEnd()
                        }
                    }
                }), wa.defineMIME("text/plain", "null"), wa.defineExtension = function(e, t) {
                    wa.prototype[e] = t
                }, wa.defineDocExtension = function(e, t) {
                    Co.prototype[e] = t
                }, wa.fromTextArea = function(e, t) {
                    if ((t = t ? P(t) : {}).value = e.value, !t.tabindex && e.tabIndex && (t.tabindex = e.tabIndex), !t.placeholder && e.placeholder && (t.placeholder = e.placeholder), null == t.autofocus) {
                        var r = E();
                        t.autofocus = r == e || null != e.getAttribute("autofocus") && r == document.body
                    }

                    function n() {
                        e.value = l.getValue()
                    }
                    var i;
                    if (e.form && (Qe(e.form, "submit", n), !t.leaveSubmitMethodAlone)) {
                        var o = e.form;
                        i = o.submit;
                        try {
                            var a = o.submit = function() {
                                n(), o.submit = i, o.submit(), o.submit = a
                            }
                        } catch (e) {}
                    }
                    t.finishInit = function(t) {
                        t.save = n, t.getTextArea = function() {
                            return e
                        }, t.toTextArea = function() {
                            t.toTextArea = isNaN, n(), e.parentNode.removeChild(t.getWrapperElement()), e.style.display = "", e.form && (tt(e.form, "submit", n), "function" == typeof e.form.submit && (e.form.submit = i))
                        }
                    }, e.style.display = "none";
                    var l = wa(function(t) {
                        return e.parentNode.insertBefore(t, e.nextSibling)
                    }, t);
                    return l
                }, (Ba = wa).off = tt, Ba.on = Qe, Ba.wheelEventPixels = fi, Ba.Doc = Co, Ba.splitLines = bt, Ba.countColumn = H, Ba.findColumn = V, Ba.isWordChar = ee, Ba.Pass = B, Ba.signal = rt, Ba.Line = Kt, Ba.changeEnd = yi, Ba.scrollbarModel = Dn, Ba.Pos = me, Ba.cmpPos = ge, Ba.modes = Ct, Ba.mimeModes = Tt, Ba.resolveMode = St, Ba.getMode = Lt, Ba.modeExtensions = Mt, Ba.extendMode = At, Ba.copyState = Ot, Ba.startState = _t, Ba.innerMode = Nt, Ba.commands = Go, Ba.keyMap = Do, Ba.keyName = jo, Ba.isModifierKey = Io, Ba.lookupKey = Ho, Ba.normalizeKeyMap = Po, Ba.StringStream = Et, Ba.SharedTextMarker = bo, Ba.TextMarker = vo, Ba.LineWidget = po, Ba.e_preventDefault = lt, Ba.e_stopPropagation = st, Ba.e_stop = ut, Ba.addClass = W, Ba.contains = _, Ba.rmClass = L, Ba.keyNames = _o, wa.version = "5.32.0", wa
            }, "object" == typeof n && void 0 !== r ? r.exports = o() : "function" == typeof t && t.amd ? t(o) : i.CodeMirror = o()
        }, {}],
        18: [function(e, r, n) {
            var i;
            i = function(e) {
                "use strict";

                function t(e) {
                    for (var t = {}, r = 0; r < e.length; ++r) t[e[r].toLowerCase()] = !0;
                    return t
                }
                e.defineMode("css", function(t, r) {
                    var n = r.inline;
                    r.propertyKeywords || (r = e.resolveMode("text/css"));
                    var i, o, a = t.indentUnit,
                        l = r.tokenHooks,
                        s = r.documentTypes || {},
                        c = r.mediaTypes || {},
                        u = r.mediaFeatures || {},
                        d = r.mediaValueKeywords || {},
                        f = r.propertyKeywords || {},
                        h = r.nonStandardPropertyKeywords || {},
                        p = r.fontProperties || {},
                        m = r.counterDescriptors || {},
                        g = r.colorKeywords || {},
                        v = r.valueKeywords || {},
                        y = r.allowNested,
                        b = r.lineComment,
                        w = !0 === r.supportsAtComponent;

                    function x(e, t) {
                        return i = t, e
                    }

                    function k(e) {
                        return function(t, r) {
                            for (var n, i = !1; null != (n = t.next());) {
                                if (n == e && !i) {
                                    ")" == e && t.backUp(1);
                                    break
                                }
                                i = !i && "\\" == n
                            }
                            return (n == e || !i && ")" != e) && (r.tokenize = null), x("string", "string")
                        }
                    }

                    function C(e, t) {
                        return e.next(), e.match(/\s*[\"\')]/, !1) ? t.tokenize = null : t.tokenize = k(")"), x(null, "(")
                    }

                    function T(e, t, r) {
                        this.type = e, this.indent = t, this.prev = r
                    }

                    function S(e, t, r, n) {
                        return e.context = new T(r, t.indentation() + (!1 === n ? 0 : a), e.context), r
                    }

                    function L(e) {
                        return e.context.prev && (e.context = e.context.prev), e.context.type
                    }

                    function M(e, t, r) {
                        return N[r.context.type](e, t, r)
                    }

                    function A(e, t, r, n) {
                        for (var i = n || 1; i > 0; i--) r.context = r.context.prev;
                        return M(e, t, r)
                    }

                    function O(e) {
                        var t = e.current().toLowerCase();
                        o = v.hasOwnProperty(t) ? "atom" : g.hasOwnProperty(t) ? "keyword" : "variable"
                    }
                    var N = {
                        top: function(e, t, r) {
                            if ("{" == e) return S(r, t, "block");
                            if ("}" == e && r.context.prev) return L(r);
                            if (w && /@component/.test(e)) return S(r, t, "atComponentBlock");
                            if (/^@(-moz-)?document$/.test(e)) return S(r, t, "documentTypes");
                            if (/^@(media|supports|(-moz-)?document|import)$/.test(e)) return S(r, t, "atBlock");
                            if (/^@(font-face|counter-style)/.test(e)) return r.stateArg = e, "restricted_atBlock_before";
                            if (/^@(-(moz|ms|o|webkit)-)?keyframes$/.test(e)) return "keyframes";
                            if (e && "@" == e.charAt(0)) return S(r, t, "at");
                            if ("hash" == e) o = "builtin";
                            else if ("word" == e) o = "tag";
                            else {
                                if ("variable-definition" == e) return "maybeprop";
                                if ("interpolation" == e) return S(r, t, "interpolation");
                                if (":" == e) return "pseudo";
                                if (y && "(" == e) return S(r, t, "parens")
                            }
                            return r.context.type
                        },
                        block: function(e, t, r) {
                            if ("word" == e) {
                                var n = t.current().toLowerCase();
                                return f.hasOwnProperty(n) ? (o = "property", "maybeprop") : h.hasOwnProperty(n) ? (o = "string-2", "maybeprop") : y ? (o = t.match(/^\s*:(?:\s|$)/, !1) ? "property" : "tag", "block") : (o += " error", "maybeprop")
                            }
                            return "meta" == e ? "block" : y || "hash" != e && "qualifier" != e ? N.top(e, t, r) : (o = "error", "block")
                        },
                        maybeprop: function(e, t, r) {
                            return ":" == e ? S(r, t, "prop") : M(e, t, r)
                        },
                        prop: function(e, t, r) {
                            if (";" == e) return L(r);
                            if ("{" == e && y) return S(r, t, "propBlock");
                            if ("}" == e || "{" == e) return A(e, t, r);
                            if ("(" == e) return S(r, t, "parens");
                            if ("hash" != e || /^#([0-9a-fA-f]{3,4}|[0-9a-fA-f]{6}|[0-9a-fA-f]{8})$/.test(t.current())) {
                                if ("word" == e) O(t);
                                else if ("interpolation" == e) return S(r, t, "interpolation")
                            } else o += " error";
                            return "prop"
                        },
                        propBlock: function(e, t, r) {
                            return "}" == e ? L(r) : "word" == e ? (o = "property", "maybeprop") : r.context.type
                        },
                        parens: function(e, t, r) {
                            return "{" == e || "}" == e ? A(e, t, r) : ")" == e ? L(r) : "(" == e ? S(r, t, "parens") : "interpolation" == e ? S(r, t, "interpolation") : ("word" == e && O(t), "parens")
                        },
                        pseudo: function(e, t, r) {
                            return "meta" == e ? "pseudo" : "word" == e ? (o = "variable-3", r.context.type) : M(e, t, r)
                        },
                        documentTypes: function(e, t, r) {
                            return "word" == e && s.hasOwnProperty(t.current()) ? (o = "tag", r.context.type) : N.atBlock(e, t, r)
                        },
                        atBlock: function(e, t, r) {
                            if ("(" == e) return S(r, t, "atBlock_parens");
                            if ("}" == e || ";" == e) return A(e, t, r);
                            if ("{" == e) return L(r) && S(r, t, y ? "block" : "top");
                            if ("interpolation" == e) return S(r, t, "interpolation");
                            if ("word" == e) {
                                var n = t.current().toLowerCase();
                                o = "only" == n || "not" == n || "and" == n || "or" == n ? "keyword" : c.hasOwnProperty(n) ? "attribute" : u.hasOwnProperty(n) ? "property" : d.hasOwnProperty(n) ? "keyword" : f.hasOwnProperty(n) ? "property" : h.hasOwnProperty(n) ? "string-2" : v.hasOwnProperty(n) ? "atom" : g.hasOwnProperty(n) ? "keyword" : "error"
                            }
                            return r.context.type
                        },
                        atComponentBlock: function(e, t, r) {
                            return "}" == e ? A(e, t, r) : "{" == e ? L(r) && S(r, t, y ? "block" : "top", !1) : ("word" == e && (o = "error"), r.context.type)
                        },
                        atBlock_parens: function(e, t, r) {
                            return ")" == e ? L(r) : "{" == e || "}" == e ? A(e, t, r, 2) : N.atBlock(e, t, r)
                        },
                        restricted_atBlock_before: function(e, t, r) {
                            return "{" == e ? S(r, t, "restricted_atBlock") : "word" == e && "@counter-style" == r.stateArg ? (o = "variable", "restricted_atBlock_before") : M(e, t, r)
                        },
                        restricted_atBlock: function(e, t, r) {
                            return "}" == e ? (r.stateArg = null, L(r)) : "word" == e ? (o = "@font-face" == r.stateArg && !p.hasOwnProperty(t.current().toLowerCase()) || "@counter-style" == r.stateArg && !m.hasOwnProperty(t.current().toLowerCase()) ? "error" : "property", "maybeprop") : "restricted_atBlock"
                        },
                        keyframes: function(e, t, r) {
                            return "word" == e ? (o = "variable", "keyframes") : "{" == e ? S(r, t, "top") : M(e, t, r)
                        },
                        at: function(e, t, r) {
                            return ";" == e ? L(r) : "{" == e || "}" == e ? A(e, t, r) : ("word" == e ? o = "tag" : "hash" == e && (o = "builtin"), "at")
                        },
                        interpolation: function(e, t, r) {
                            return "}" == e ? L(r) : "{" == e || ";" == e ? A(e, t, r) : ("word" == e ? o = "variable" : "variable" != e && "(" != e && ")" != e && (o = "error"), "interpolation")
                        }
                    };
                    return {
                        startState: function(e) {
                            return {
                                tokenize: null,
                                state: n ? "block" : "top",
                                stateArg: null,
                                context: new T(n ? "block" : "top", e || 0, null)
                            }
                        },
                        token: function(e, t) {
                            if (!t.tokenize && e.eatSpace()) return null;
                            var r = (t.tokenize || function(e, t) {
                                var r = e.next();
                                if (l[r]) {
                                    var n = l[r](e, t);
                                    if (!1 !== n) return n
                                }
                                return "@" == r ? (e.eatWhile(/[\w\\\-]/), x("def", e.current())) : "=" == r || ("~" == r || "|" == r) && e.eat("=") ? x(null, "compare") : '"' == r || "'" == r ? (t.tokenize = k(r), t.tokenize(e, t)) : "#" == r ? (e.eatWhile(/[\w\\\-]/), x("atom", "hash")) : "!" == r ? (e.match(/^\s*\w*/), x("keyword", "important")) : /\d/.test(r) || "." == r && e.eat(/\d/) ? (e.eatWhile(/[\w.%]/), x("number", "unit")) : "-" !== r ? /[,+>*\/]/.test(r) ? x(null, "select-op") : "." == r && e.match(/^-?[_a-z][_a-z0-9-]*/i) ? x("qualifier", "qualifier") : /[:;{}\[\]\(\)]/.test(r) ? x(null, r) : "u" == r && e.match(/rl(-prefix)?\(/) || "d" == r && e.match("omain(") || "r" == r && e.match("egexp(") ? (e.backUp(1), t.tokenize = C, x("property", "word")) : /[\w\\\-]/.test(r) ? (e.eatWhile(/[\w\\\-]/), x("property", "word")) : x(null, null) : /[\d.]/.test(e.peek()) ? (e.eatWhile(/[\w.%]/), x("number", "unit")) : e.match(/^-[\w\\\-]+/) ? (e.eatWhile(/[\w\\\-]/), e.match(/^\s*:/, !1) ? x("variable-2", "variable-definition") : x("variable-2", "variable")) : e.match(/^\w+-/) ? x("meta", "meta") : void 0
                            })(e, t);
                            return r && "object" == typeof r && (i = r[1], r = r[0]), o = r, "comment" != i && (t.state = N[t.state](i, e, t)), o
                        },
                        indent: function(e, t) {
                            var r = e.context,
                                n = t && t.charAt(0),
                                i = r.indent;
                            return "prop" != r.type || "}" != n && ")" != n || (r = r.prev), r.prev && ("}" != n || "block" != r.type && "top" != r.type && "interpolation" != r.type && "restricted_atBlock" != r.type ? (")" != n || "parens" != r.type && "atBlock_parens" != r.type) && ("{" != n || "at" != r.type && "atBlock" != r.type) || (i = Math.max(0, r.indent - a)) : i = (r = r.prev).indent), i
                        },
                        electricChars: "}",
                        blockCommentStart: "/*",
                        blockCommentEnd: "*/",
                        blockCommentContinue: " * ",
                        lineComment: b,
                        fold: "brace"
                    }
                });
                var r = ["domain", "regexp", "url", "url-prefix"],
                    n = t(r),
                    i = ["all", "aural", "braille", "handheld", "print", "projection", "screen", "tty", "tv", "embossed"],
                    o = t(i),
                    a = ["width", "min-width", "max-width", "height", "min-height", "max-height", "device-width", "min-device-width", "max-device-width", "device-height", "min-device-height", "max-device-height", "aspect-ratio", "min-aspect-ratio", "max-aspect-ratio", "device-aspect-ratio", "min-device-aspect-ratio", "max-device-aspect-ratio", "color", "min-color", "max-color", "color-index", "min-color-index", "max-color-index", "monochrome", "min-monochrome", "max-monochrome", "resolution", "min-resolution", "max-resolution", "scan", "grid", "orientation", "device-pixel-ratio", "min-device-pixel-ratio", "max-device-pixel-ratio", "pointer", "any-pointer", "hover", "any-hover"],
                    l = t(a),
                    s = ["landscape", "portrait", "none", "coarse", "fine", "on-demand", "hover", "interlace", "progressive"],
                    c = t(s),
                    u = ["align-content", "align-items", "align-self", "alignment-adjust", "alignment-baseline", "anchor-point", "animation", "animation-delay", "animation-direction", "animation-duration", "animation-fill-mode", "animation-iteration-count", "animation-name", "animation-play-state", "animation-timing-function", "appearance", "azimuth", "backface-visibility", "background", "background-attachment", "background-blend-mode", "background-clip", "background-color", "background-image", "background-origin", "background-position", "background-repeat", "background-size", "baseline-shift", "binding", "bleed", "bookmark-label", "bookmark-level", "bookmark-state", "bookmark-target", "border", "border-bottom", "border-bottom-color", "border-bottom-left-radius", "border-bottom-right-radius", "border-bottom-style", "border-bottom-width", "border-collapse", "border-color", "border-image", "border-image-outset", "border-image-repeat", "border-image-slice", "border-image-source", "border-image-width", "border-left", "border-left-color", "border-left-style", "border-left-width", "border-radius", "border-right", "border-right-color", "border-right-style", "border-right-width", "border-spacing", "border-style", "border-top", "border-top-color", "border-top-left-radius", "border-top-right-radius", "border-top-style", "border-top-width", "border-width", "bottom", "box-decoration-break", "box-shadow", "box-sizing", "break-after", "break-before", "break-inside", "caption-side", "caret-color", "clear", "clip", "color", "color-profile", "column-count", "column-fill", "column-gap", "column-rule", "column-rule-color", "column-rule-style", "column-rule-width", "column-span", "column-width", "columns", "content", "counter-increment", "counter-reset", "crop", "cue", "cue-after", "cue-before", "cursor", "direction", "display", "dominant-baseline", "drop-initial-after-adjust", "drop-initial-after-align", "drop-initial-before-adjust", "drop-initial-before-align", "drop-initial-size", "drop-initial-value", "elevation", "empty-cells", "fit", "fit-position", "flex", "flex-basis", "flex-direction", "flex-flow", "flex-grow", "flex-shrink", "flex-wrap", "float", "float-offset", "flow-from", "flow-into", "font", "font-feature-settings", "font-family", "font-kerning", "font-language-override", "font-size", "font-size-adjust", "font-stretch", "font-style", "font-synthesis", "font-variant", "font-variant-alternates", "font-variant-caps", "font-variant-east-asian", "font-variant-ligatures", "font-variant-numeric", "font-variant-position", "font-weight", "grid", "grid-area", "grid-auto-columns", "grid-auto-flow", "grid-auto-rows", "grid-column", "grid-column-end", "grid-column-gap", "grid-column-start", "grid-gap", "grid-row", "grid-row-end", "grid-row-gap", "grid-row-start", "grid-template", "grid-template-areas", "grid-template-columns", "grid-template-rows", "hanging-punctuation", "height", "hyphens", "icon", "image-orientation", "image-rendering", "image-resolution", "inline-box-align", "justify-content", "justify-items", "justify-self", "left", "letter-spacing", "line-break", "line-height", "line-stacking", "line-stacking-ruby", "line-stacking-shift", "line-stacking-strategy", "list-style", "list-style-image", "list-style-position", "list-style-type", "margin", "margin-bottom", "margin-left", "margin-right", "margin-top", "marks", "marquee-direction", "marquee-loop", "marquee-play-count", "marquee-speed", "marquee-style", "max-height", "max-width", "min-height", "min-width", "move-to", "nav-down", "nav-index", "nav-left", "nav-right", "nav-up", "object-fit", "object-position", "opacity", "order", "orphans", "outline", "outline-color", "outline-offset", "outline-style", "outline-width", "overflow", "overflow-style", "overflow-wrap", "overflow-x", "overflow-y", "padding", "padding-bottom", "padding-left", "padding-right", "padding-top", "page", "page-break-after", "page-break-before", "page-break-inside", "page-policy", "pause", "pause-after", "pause-before", "perspective", "perspective-origin", "pitch", "pitch-range", "place-content", "place-items", "place-self", "play-during", "position", "presentation-level", "punctuation-trim", "quotes", "region-break-after", "region-break-before", "region-break-inside", "region-fragment", "rendering-intent", "resize", "rest", "rest-after", "rest-before", "richness", "right", "rotation", "rotation-point", "ruby-align", "ruby-overhang", "ruby-position", "ruby-span", "shape-image-threshold", "shape-inside", "shape-margin", "shape-outside", "size", "speak", "speak-as", "speak-header", "speak-numeral", "speak-punctuation", "speech-rate", "stress", "string-set", "tab-size", "table-layout", "target", "target-name", "target-new", "target-position", "text-align", "text-align-last", "text-decoration", "text-decoration-color", "text-decoration-line", "text-decoration-skip", "text-decoration-style", "text-emphasis", "text-emphasis-color", "text-emphasis-position", "text-emphasis-style", "text-height", "text-indent", "text-justify", "text-outline", "text-overflow", "text-shadow", "text-size-adjust", "text-space-collapse", "text-transform", "text-underline-position", "text-wrap", "top", "transform", "transform-origin", "transform-style", "transition", "transition-delay", "transition-duration", "transition-property", "transition-timing-function", "unicode-bidi", "user-select", "vertical-align", "visibility", "voice-balance", "voice-duration", "voice-family", "voice-pitch", "voice-range", "voice-rate", "voice-stress", "voice-volume", "volume", "white-space", "widows", "width", "will-change", "word-break", "word-spacing", "word-wrap", "z-index", "clip-path", "clip-rule", "mask", "enable-background", "filter", "flood-color", "flood-opacity", "lighting-color", "stop-color", "stop-opacity", "pointer-events", "color-interpolation", "color-interpolation-filters", "color-rendering", "fill", "fill-opacity", "fill-rule", "image-rendering", "marker", "marker-end", "marker-mid", "marker-start", "shape-rendering", "stroke", "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke-width", "text-rendering", "baseline-shift", "dominant-baseline", "glyph-orientation-horizontal", "glyph-orientation-vertical", "text-anchor", "writing-mode"],
                    d = t(u),
                    f = ["scrollbar-arrow-color", "scrollbar-base-color", "scrollbar-dark-shadow-color", "scrollbar-face-color", "scrollbar-highlight-color", "scrollbar-shadow-color", "scrollbar-3d-light-color", "scrollbar-track-color", "shape-inside", "searchfield-cancel-button", "searchfield-decoration", "searchfield-results-button", "searchfield-results-decoration", "zoom"],
                    h = t(f),
                    p = t(["font-family", "src", "unicode-range", "font-variant", "font-feature-settings", "font-stretch", "font-weight", "font-style"]),
                    m = t(["additive-symbols", "fallback", "negative", "pad", "prefix", "range", "speak-as", "suffix", "symbols", "system"]),
                    g = ["aliceblue", "antiquewhite", "aqua", "aquamarine", "azure", "beige", "bisque", "black", "blanchedalmond", "blue", "blueviolet", "brown", "burlywood", "cadetblue", "chartreuse", "chocolate", "coral", "cornflowerblue", "cornsilk", "crimson", "cyan", "darkblue", "darkcyan", "darkgoldenrod", "darkgray", "darkgreen", "darkkhaki", "darkmagenta", "darkolivegreen", "darkorange", "darkorchid", "darkred", "darksalmon", "darkseagreen", "darkslateblue", "darkslategray", "darkturquoise", "darkviolet", "deeppink", "deepskyblue", "dimgray", "dodgerblue", "firebrick", "floralwhite", "forestgreen", "fuchsia", "gainsboro", "ghostwhite", "gold", "goldenrod", "gray", "grey", "green", "greenyellow", "honeydew", "hotpink", "indianred", "indigo", "ivory", "khaki", "lavender", "lavenderblush", "lawngreen", "lemonchiffon", "lightblue", "lightcoral", "lightcyan", "lightgoldenrodyellow", "lightgray", "lightgreen", "lightpink", "lightsalmon", "lightseagreen", "lightskyblue", "lightslategray", "lightsteelblue", "lightyellow", "lime", "limegreen", "linen", "magenta", "maroon", "mediumaquamarine", "mediumblue", "mediumorchid", "mediumpurple", "mediumseagreen", "mediumslateblue", "mediumspringgreen", "mediumturquoise", "mediumvioletred", "midnightblue", "mintcream", "mistyrose", "moccasin", "navajowhite", "navy", "oldlace", "olive", "olivedrab", "orange", "orangered", "orchid", "palegoldenrod", "palegreen", "paleturquoise", "palevioletred", "papayawhip", "peachpuff", "peru", "pink", "plum", "powderblue", "purple", "rebeccapurple", "red", "rosybrown", "royalblue", "saddlebrown", "salmon", "sandybrown", "seagreen", "seashell", "sienna", "silver", "skyblue", "slateblue", "slategray", "snow", "springgreen", "steelblue", "tan", "teal", "thistle", "tomato", "turquoise", "violet", "wheat", "white", "whitesmoke", "yellow", "yellowgreen"],
                    v = t(g),
                    y = ["above", "absolute", "activeborder", "additive", "activecaption", "afar", "after-white-space", "ahead", "alias", "all", "all-scroll", "alphabetic", "alternate", "always", "amharic", "amharic-abegede", "antialiased", "appworkspace", "arabic-indic", "armenian", "asterisks", "attr", "auto", "auto-flow", "avoid", "avoid-column", "avoid-page", "avoid-region", "background", "backwards", "baseline", "below", "bidi-override", "binary", "bengali", "blink", "block", "block-axis", "bold", "bolder", "border", "border-box", "both", "bottom", "break", "break-all", "break-word", "bullets", "button", "button-bevel", "buttonface", "buttonhighlight", "buttonshadow", "buttontext", "calc", "cambodian", "capitalize", "caps-lock-indicator", "caption", "captiontext", "caret", "cell", "center", "checkbox", "circle", "cjk-decimal", "cjk-earthly-branch", "cjk-heavenly-stem", "cjk-ideographic", "clear", "clip", "close-quote", "col-resize", "collapse", "color", "color-burn", "color-dodge", "column", "column-reverse", "compact", "condensed", "contain", "content", "contents", "content-box", "context-menu", "continuous", "copy", "counter", "counters", "cover", "crop", "cross", "crosshair", "currentcolor", "cursive", "cyclic", "darken", "dashed", "decimal", "decimal-leading-zero", "default", "default-button", "dense", "destination-atop", "destination-in", "destination-out", "destination-over", "devanagari", "difference", "disc", "discard", "disclosure-closed", "disclosure-open", "document", "dot-dash", "dot-dot-dash", "dotted", "double", "down", "e-resize", "ease", "ease-in", "ease-in-out", "ease-out", "element", "ellipse", "ellipsis", "embed", "end", "ethiopic", "ethiopic-abegede", "ethiopic-abegede-am-et", "ethiopic-abegede-gez", "ethiopic-abegede-ti-er", "ethiopic-abegede-ti-et", "ethiopic-halehame-aa-er", "ethiopic-halehame-aa-et", "ethiopic-halehame-am-et", "ethiopic-halehame-gez", "ethiopic-halehame-om-et", "ethiopic-halehame-sid-et", "ethiopic-halehame-so-et", "ethiopic-halehame-ti-er", "ethiopic-halehame-ti-et", "ethiopic-halehame-tig", "ethiopic-numeric", "ew-resize", "exclusion", "expanded", "extends", "extra-condensed", "extra-expanded", "fantasy", "fast", "fill", "fixed", "flat", "flex", "flex-end", "flex-start", "footnotes", "forwards", "from", "geometricPrecision", "georgian", "graytext", "grid", "groove", "gujarati", "gurmukhi", "hand", "hangul", "hangul-consonant", "hard-light", "hebrew", "help", "hidden", "hide", "higher", "highlight", "highlighttext", "hiragana", "hiragana-iroha", "horizontal", "hsl", "hsla", "hue", "icon", "ignore", "inactiveborder", "inactivecaption", "inactivecaptiontext", "infinite", "infobackground", "infotext", "inherit", "initial", "inline", "inline-axis", "inline-block", "inline-flex", "inline-grid", "inline-table", "inset", "inside", "intrinsic", "invert", "italic", "japanese-formal", "japanese-informal", "justify", "kannada", "katakana", "katakana-iroha", "keep-all", "khmer", "korean-hangul-formal", "korean-hanja-formal", "korean-hanja-informal", "landscape", "lao", "large", "larger", "left", "level", "lighter", "lighten", "line-through", "linear", "linear-gradient", "lines", "list-item", "listbox", "listitem", "local", "logical", "loud", "lower", "lower-alpha", "lower-armenian", "lower-greek", "lower-hexadecimal", "lower-latin", "lower-norwegian", "lower-roman", "lowercase", "ltr", "luminosity", "malayalam", "match", "matrix", "matrix3d", "media-controls-background", "media-current-time-display", "media-fullscreen-button", "media-mute-button", "media-play-button", "media-return-to-realtime-button", "media-rewind-button", "media-seek-back-button", "media-seek-forward-button", "media-slider", "media-sliderthumb", "media-time-remaining-display", "media-volume-slider", "media-volume-slider-container", "media-volume-sliderthumb", "medium", "menu", "menulist", "menulist-button", "menulist-text", "menulist-textfield", "menutext", "message-box", "middle", "min-intrinsic", "mix", "mongolian", "monospace", "move", "multiple", "multiply", "myanmar", "n-resize", "narrower", "ne-resize", "nesw-resize", "no-close-quote", "no-drop", "no-open-quote", "no-repeat", "none", "normal", "not-allowed", "nowrap", "ns-resize", "numbers", "numeric", "nw-resize", "nwse-resize", "oblique", "octal", "opacity", "open-quote", "optimizeLegibility", "optimizeSpeed", "oriya", "oromo", "outset", "outside", "outside-shape", "overlay", "overline", "padding", "padding-box", "painted", "page", "paused", "persian", "perspective", "plus-darker", "plus-lighter", "pointer", "polygon", "portrait", "pre", "pre-line", "pre-wrap", "preserve-3d", "progress", "push-button", "radial-gradient", "radio", "read-only", "read-write", "read-write-plaintext-only", "rectangle", "region", "relative", "repeat", "repeating-linear-gradient", "repeating-radial-gradient", "repeat-x", "repeat-y", "reset", "reverse", "rgb", "rgba", "ridge", "right", "rotate", "rotate3d", "rotateX", "rotateY", "rotateZ", "round", "row", "row-resize", "row-reverse", "rtl", "run-in", "running", "s-resize", "sans-serif", "saturation", "scale", "scale3d", "scaleX", "scaleY", "scaleZ", "screen", "scroll", "scrollbar", "scroll-position", "se-resize", "searchfield", "searchfield-cancel-button", "searchfield-decoration", "searchfield-results-button", "searchfield-results-decoration", "self-start", "self-end", "semi-condensed", "semi-expanded", "separate", "serif", "show", "sidama", "simp-chinese-formal", "simp-chinese-informal", "single", "skew", "skewX", "skewY", "skip-white-space", "slide", "slider-horizontal", "slider-vertical", "sliderthumb-horizontal", "sliderthumb-vertical", "slow", "small", "small-caps", "small-caption", "smaller", "soft-light", "solid", "somali", "source-atop", "source-in", "source-out", "source-over", "space", "space-around", "space-between", "space-evenly", "spell-out", "square", "square-button", "start", "static", "status-bar", "stretch", "stroke", "sub", "subpixel-antialiased", "super", "sw-resize", "symbolic", "symbols", "system-ui", "table", "table-caption", "table-cell", "table-column", "table-column-group", "table-footer-group", "table-header-group", "table-row", "table-row-group", "tamil", "telugu", "text", "text-bottom", "text-top", "textarea", "textfield", "thai", "thick", "thin", "threeddarkshadow", "threedface", "threedhighlight", "threedlightshadow", "threedshadow", "tibetan", "tigre", "tigrinya-er", "tigrinya-er-abegede", "tigrinya-et", "tigrinya-et-abegede", "to", "top", "trad-chinese-formal", "trad-chinese-informal", "transform", "translate", "translate3d", "translateX", "translateY", "translateZ", "transparent", "ultra-condensed", "ultra-expanded", "underline", "unset", "up", "upper-alpha", "upper-armenian", "upper-greek", "upper-hexadecimal", "upper-latin", "upper-norwegian", "upper-roman", "uppercase", "urdu", "url", "var", "vertical", "vertical-text", "visible", "visibleFill", "visiblePainted", "visibleStroke", "visual", "w-resize", "wait", "wave", "wider", "window", "windowframe", "windowtext", "words", "wrap", "wrap-reverse", "x-large", "x-small", "xor", "xx-large", "xx-small"],
                    b = t(y),
                    w = r.concat(i).concat(a).concat(s).concat(u).concat(f).concat(g).concat(y);

                function x(e, t) {
                    for (var r, n = !1; null != (r = e.next());) {
                        if (n && "/" == r) {
                            t.tokenize = null;
                            break
                        }
                        n = "*" == r
                    }
                    return ["comment", "comment"]
                }
                e.registerHelper("hintWords", "css", w), e.defineMIME("text/css", {
                    documentTypes: n,
                    mediaTypes: o,
                    mediaFeatures: l,
                    mediaValueKeywords: c,
                    propertyKeywords: d,
                    nonStandardPropertyKeywords: h,
                    fontProperties: p,
                    counterDescriptors: m,
                    colorKeywords: v,
                    valueKeywords: b,
                    tokenHooks: {
                        "/": function(e, t) {
                            return !!e.eat("*") && (t.tokenize = x, x(e, t))
                        }
                    },
                    name: "css"
                }), e.defineMIME("text/x-scss", {
                    mediaTypes: o,
                    mediaFeatures: l,
                    mediaValueKeywords: c,
                    propertyKeywords: d,
                    nonStandardPropertyKeywords: h,
                    colorKeywords: v,
                    valueKeywords: b,
                    fontProperties: p,
                    allowNested: !0,
                    lineComment: "//",
                    tokenHooks: {
                        "/": function(e, t) {
                            return e.eat("/") ? (e.skipToEnd(), ["comment", "comment"]) : e.eat("*") ? (t.tokenize = x, x(e, t)) : ["operator", "operator"]
                        },
                        ":": function(e) {
                            return !!e.match(/\s*\{/, !1) && [null, null]
                        },
                        $: function(e) {
                            return e.match(/^[\w-]+/), e.match(/^\s*:/, !1) ? ["variable-2", "variable-definition"] : ["variable-2", "variable"]
                        },
                        "#": function(e) {
                            return !!e.eat("{") && [null, "interpolation"]
                        }
                    },
                    name: "css",
                    helperType: "scss"
                }), e.defineMIME("text/x-less", {
                    mediaTypes: o,
                    mediaFeatures: l,
                    mediaValueKeywords: c,
                    propertyKeywords: d,
                    nonStandardPropertyKeywords: h,
                    colorKeywords: v,
                    valueKeywords: b,
                    fontProperties: p,
                    allowNested: !0,
                    lineComment: "//",
                    tokenHooks: {
                        "/": function(e, t) {
                            return e.eat("/") ? (e.skipToEnd(), ["comment", "comment"]) : e.eat("*") ? (t.tokenize = x, x(e, t)) : ["operator", "operator"]
                        },
                        "@": function(e) {
                            return e.eat("{") ? [null, "interpolation"] : !e.match(/^(charset|document|font-face|import|(-(moz|ms|o|webkit)-)?keyframes|media|namespace|page|supports)\b/, !1) && (e.eatWhile(/[\w\\\-]/), e.match(/^\s*:/, !1) ? ["variable-2", "variable-definition"] : ["variable-2", "variable"])
                        },
                        "&": function() {
                            return ["atom", "atom"]
                        }
                    },
                    name: "css",
                    helperType: "less"
                }), e.defineMIME("text/x-gss", {
                    documentTypes: n,
                    mediaTypes: o,
                    mediaFeatures: l,
                    propertyKeywords: d,
                    nonStandardPropertyKeywords: h,
                    fontProperties: p,
                    counterDescriptors: m,
                    colorKeywords: v,
                    valueKeywords: b,
                    supportsAtComponent: !0,
                    tokenHooks: {
                        "/": function(e, t) {
                            return !!e.eat("*") && (t.tokenize = x, x(e, t))
                        }
                    },
                    name: "css",
                    helperType: "gss"
                })
            }, "object" == typeof n && "object" == typeof r ? i(e("../../lib/codemirror")) : "function" == typeof t && t.amd ? t(["../../lib/codemirror"], i) : i(CodeMirror)
        }, {
            "../../lib/codemirror": 17
        }],
        19: [function(e, r, n) {
            var i;
            i = function(e) {
                "use strict";
                var t = {
                    script: [
                        ["lang", /(javascript|babel)/i, "javascript"],
                        ["type", /^(?:text|application)\/(?:x-)?(?:java|ecma)script$|^module$|^$/i, "javascript"],
                        ["type", /./, "text/plain"],
                        [null, null, "javascript"]
                    ],
                    style: [
                        ["lang", /^css$/i, "css"],
                        ["type", /^(text\/)?(x-)?(stylesheet|css)$/i, "css"],
                        ["type", /./, "text/plain"],
                        [null, null, "css"]
                    ]
                };
                var r = {};

                function n(e, t) {
                    var n, i = e.match(r[n = t] || (r[n] = new RegExp("\\s+" + n + "\\s*=\\s*('|\")?([^'\"]+)('|\")?\\s*")));
                    return i ? /^\s*(.*?)\s*$/.exec(i[2])[1] : ""
                }

                function i(e, t) {
                    return new RegExp((t ? "^" : "") + "</s*" + e + "s*>", "i")
                }

                function o(e, t) {
                    for (var r in e)
                        for (var n = t[r] || (t[r] = []), i = e[r], o = i.length - 1; o >= 0; o--) n.unshift(i[o])
                }
                e.defineMode("htmlmixed", function(r, a) {
                    var l = e.getMode(r, {
                            name: "xml",
                            htmlMode: !0,
                            multilineTagIndentFactor: a.multilineTagIndentFactor,
                            multilineTagIndentPastTag: a.multilineTagIndentPastTag
                        }),
                        s = {},
                        c = a && a.tags,
                        u = a && a.scriptTypes;
                    if (o(t, s), c && o(c, s), u)
                        for (var d = u.length - 1; d >= 0; d--) s.script.unshift(["type", u[d].matches, u[d].mode]);

                    function f(t, o) {
                        var a, c = l.token(t, o.htmlState),
                            u = /\btag\b/.test(c);
                        if (u && !/[<>\s\/]/.test(t.current()) && (a = o.htmlState.tagName && o.htmlState.tagName.toLowerCase()) && s.hasOwnProperty(a)) o.inTag = a + " ";
                        else if (o.inTag && u && />$/.test(t.current())) {
                            var d = /^([\S]+) (.*)/.exec(o.inTag);
                            o.inTag = null;
                            var h = ">" == t.current() && function(e, t) {
                                    for (var r = 0; r < e.length; r++) {
                                        var i = e[r];
                                        if (!i[0] || i[1].test(n(t, i[0]))) return i[2]
                                    }
                                }(s[d[1]], d[2]),
                                p = e.getMode(r, h),
                                m = i(d[1], !0),
                                g = i(d[1], !1);
                            o.token = function(e, t) {
                                return e.match(m, !1) ? (t.token = f, t.localState = t.localMode = null, null) : (r = e, n = g, i = t.localMode.token(e, t.localState), o = r.current(), (a = o.search(n)) > -1 ? r.backUp(o.length - a) : o.match(/<\/?$/) && (r.backUp(o.length), r.match(n, !1) || r.match(o)), i);
                                var r, n, i, o, a
                            }, o.localMode = p, o.localState = e.startState(p, l.indent(o.htmlState, ""))
                        } else o.inTag && (o.inTag += t.current(), t.eol() && (o.inTag += " "));
                        return c
                    }
                    return {
                        startState: function() {
                            return {
                                token: f,
                                inTag: null,
                                localMode: null,
                                localState: null,
                                htmlState: e.startState(l)
                            }
                        },
                        copyState: function(t) {
                            var r;
                            return t.localState && (r = e.copyState(t.localMode, t.localState)), {
                                token: t.token,
                                inTag: t.inTag,
                                localMode: t.localMode,
                                localState: r,
                                htmlState: e.copyState(l, t.htmlState)
                            }
                        },
                        token: function(e, t) {
                            return t.token(e, t)
                        },
                        indent: function(t, r, n) {
                            return !t.localMode || /^\s*<\//.test(r) ? l.indent(t.htmlState, r) : t.localMode.indent ? t.localMode.indent(t.localState, r, n) : e.Pass
                        },
                        innerMode: function(e) {
                            return {
                                state: e.localState || e.htmlState,
                                mode: e.localMode || l
                            }
                        }
                    }
                }, "xml", "javascript", "css"), e.defineMIME("text/html", "htmlmixed")
            }, "object" == typeof n && "object" == typeof r ? i(e("../../lib/codemirror"), e("../xml/xml"), e("../javascript/javascript"), e("../css/css")) : "function" == typeof t && t.amd ? t(["../../lib/codemirror", "../xml/xml", "../javascript/javascript", "../css/css"], i) : i(CodeMirror)
        }, {
            "../../lib/codemirror": 17,
            "../css/css": 18,
            "../javascript/javascript": 20,
            "../xml/xml": 21
        }],
        20: [function(e, r, n) {
            var i;
            i = function(e) {
                "use strict";
                e.defineMode("javascript", function(t, r) {
                    var n, i, o = t.indentUnit,
                        a = r.statementIndent,
                        l = r.jsonld,
                        s = r.json || l,
                        c = r.typescript,
                        u = r.wordCharacters || /[\w$\xa1-\uffff]/,
                        d = function() {
                            function e(e) {
                                return {
                                    type: e,
                                    style: "keyword"
                                }
                            }
                            var t = e("keyword a"),
                                r = e("keyword b"),
                                n = e("keyword c"),
                                i = e("keyword d"),
                                o = e("operator"),
                                a = {
                                    type: "atom",
                                    style: "atom"
                                },
                                l = {
                                    if: e("if"),
                                    while: t,
                                    with: t,
                                    else: r,
                                    do: r,
                                    try: r,
                                    finally: r,
                                    return: i,
                                    break: i,
                                    continue: i,
                                    new: e("new"),
                                    delete: n,
                                    void: n,
                                    throw: n,
                                    debugger: e("debugger"),
                                    var: e("var"),
                                    const: e("var"),
                                    let: e("var"),
                                    function: e("function"),
                                    catch: e("catch"),
                                    for: e("for"),
                                    switch: e("switch"),
                                    case: e("case"),
                                    default: e("default"),
                                    in: o,
                                    typeof: o,
                                    instanceof: o,
                                    true: a,
                                    false: a,
                                    null: a,
                                    undefined: a,
                                    NaN: a,
                                    Infinity: a,
                                    this: e("this"),
                                    class: e("class"),
                                    super: e("atom"),
                                    yield: n,
                                    export: e("export"),
                                    import: e("import"),
                                    extends: n,
                                    await: n
                                };
                            if (c) {
                                var s = {
                                        type: "variable",
                                        style: "type"
                                    },
                                    u = {
                                        interface: e("class"),
                                        implements: n,
                                        namespace: n,
                                        public: e("modifier"),
                                        private: e("modifier"),
                                        protected: e("modifier"),
                                        abstract: e("modifier"),
                                        readonly: e("modifier"),
                                        string: s,
                                        number: s,
                                        boolean: s,
                                        any: s
                                    };
                                for (var d in u) l[d] = u[d]
                            }
                            return l
                        }(),
                        f = /[+\-*&%=<>!?|~^@]/,
                        h = /^@(context|id|value|language|type|container|list|set|reverse|index|base|vocab|graph)"/;

                    function p(e, t, r) {
                        return n = e, i = r, t
                    }

                    function m(e, t) {
                        var r, n = e.next();
                        if ('"' == n || "'" == n) return t.tokenize = (r = n, function(e, t) {
                            var n, i = !1;
                            if (l && "@" == e.peek() && e.match(h)) return t.tokenize = m, p("jsonld-keyword", "meta");
                            for (; null != (n = e.next()) && (n != r || i);) i = !i && "\\" == n;
                            return i || (t.tokenize = m), p("string", "string")
                        }), t.tokenize(e, t);
                        if ("." == n && e.match(/^\d+(?:[eE][+\-]?\d+)?/)) return p("number", "number");
                        if ("." == n && e.match("..")) return p("spread", "meta");
                        if (/[\[\]{}\(\),;\:\.]/.test(n)) return p(n);
                        if ("=" == n && e.eat(">")) return p("=>", "operator");
                        if ("0" == n && e.eat(/x/i)) return e.eatWhile(/[\da-f]/i), p("number", "number");
                        if ("0" == n && e.eat(/o/i)) return e.eatWhile(/[0-7]/i), p("number", "number");
                        if ("0" == n && e.eat(/b/i)) return e.eatWhile(/[01]/i), p("number", "number");
                        if (/\d/.test(n)) return e.match(/^\d*(?:\.\d*)?(?:[eE][+\-]?\d+)?/), p("number", "number");
                        if ("/" == n) return e.eat("*") ? (t.tokenize = g, g(e, t)) : e.eat("/") ? (e.skipToEnd(), p("comment", "comment")) : He(e, t, 1) ? (function(e) {
                            for (var t, r = !1, n = !1; null != (t = e.next());) {
                                if (!r) {
                                    if ("/" == t && !n) return;
                                    "[" == t ? n = !0 : n && "]" == t && (n = !1)
                                }
                                r = !r && "\\" == t
                            }
                        }(e), e.match(/^\b(([gimyu])(?![gimyu]*\2))+\b/), p("regexp", "string-2")) : (e.eat("="), p("operator", "operator", e.current()));
                        if ("`" == n) return t.tokenize = v, v(e, t);
                        if ("#" == n) return e.skipToEnd(), p("error", "error");
                        if (f.test(n)) return ">" == n && t.lexical && ">" == t.lexical.type || (e.eat("=") ? "!" != n && "=" != n || e.eat("=") : /[<>*+\-]/.test(n) && (e.eat(n), ">" == n && e.eat(n))), p("operator", "operator", e.current());
                        if (u.test(n)) {
                            e.eatWhile(u);
                            var i = e.current();
                            if ("." != t.lastType) {
                                if (d.propertyIsEnumerable(i)) {
                                    var o = d[i];
                                    return p(o.type, o.style, i)
                                }
                                if ("async" == i && e.match(/^(\s|\/\*.*?\*\/)*[\(\w]/, !1)) return p("async", "keyword", i)
                            }
                            return p("variable", "variable", i)
                        }
                    }

                    function g(e, t) {
                        for (var r, n = !1; r = e.next();) {
                            if ("/" == r && n) {
                                t.tokenize = m;
                                break
                            }
                            n = "*" == r
                        }
                        return p("comment", "comment")
                    }

                    function v(e, t) {
                        for (var r, n = !1; null != (r = e.next());) {
                            if (!n && ("`" == r || "$" == r && e.eat("{"))) {
                                t.tokenize = m;
                                break
                            }
                            n = !n && "\\" == r
                        }
                        return p("quasi", "string-2", e.current())
                    }
                    var y = "([{}])";

                    function b(e, t) {
                        t.fatArrowAt && (t.fatArrowAt = null);
                        var r = e.string.indexOf("=>", e.start);
                        if (!(r < 0)) {
                            if (c) {
                                var n = /:\s*(?:\w+(?:<[^>]*>|\[\])?|\{[^}]*\})\s*$/.exec(e.string.slice(e.start, r));
                                n && (r = n.index)
                            }
                            for (var i = 0, o = !1, a = r - 1; a >= 0; --a) {
                                var l = e.string.charAt(a),
                                    s = y.indexOf(l);
                                if (s >= 0 && s < 3) {
                                    if (!i) {
                                        ++a;
                                        break
                                    }
                                    if (0 == --i) {
                                        "(" == l && (o = !0);
                                        break
                                    }
                                } else if (s >= 3 && s < 6) ++i;
                                else if (u.test(l)) o = !0;
                                else {
                                    if (/["'\/]/.test(l)) return;
                                    if (o && !i) {
                                        ++a;
                                        break
                                    }
                                }
                            }
                            o && !i && (t.fatArrowAt = a)
                        }
                    }
                    var w = {
                        atom: !0,
                        number: !0,
                        variable: !0,
                        string: !0,
                        regexp: !0,
                        this: !0,
                        "jsonld-keyword": !0
                    };

                    function x(e, t, r, n, i, o) {
                        this.indented = e, this.column = t, this.type = r, this.prev = i, this.info = o, null != n && (this.align = n)
                    }

                    function k(e, t) {
                        for (var r = e.localVars; r; r = r.next)
                            if (r.name == t) return !0;
                        for (var n = e.context; n; n = n.prev)
                            for (r = n.vars; r; r = r.next)
                                if (r.name == t) return !0
                    }
                    var C = {
                        state: null,
                        column: null,
                        marked: null,
                        cc: null
                    };

                    function T() {
                        for (var e = arguments.length - 1; e >= 0; e--) C.cc.push(arguments[e])
                    }

                    function S() {
                        return T.apply(null, arguments), !0
                    }

                    function L(e) {
                        function t(t) {
                            for (var r = t; r; r = r.next)
                                if (r.name == e) return !0;
                            return !1
                        }
                        var n = C.state;
                        if (C.marked = "def", n.context) {
                            if (t(n.localVars)) return;
                            n.localVars = {
                                name: e,
                                next: n.localVars
                            }
                        } else {
                            if (t(n.globalVars)) return;
                            r.globalVars && (n.globalVars = {
                                name: e,
                                next: n.globalVars
                            })
                        }
                    }
                    var M = {
                        name: "this",
                        next: {
                            name: "arguments"
                        }
                    };

                    function A() {
                        C.state.context = {
                            prev: C.state.context,
                            vars: C.state.localVars
                        }, C.state.localVars = M
                    }

                    function O() {
                        C.state.localVars = C.state.context.vars, C.state.context = C.state.context.prev
                    }

                    function N(e, t) {
                        var r = function() {
                            var r = C.state,
                                n = r.indented;
                            if ("stat" == r.lexical.type) n = r.lexical.indented;
                            else
                                for (var i = r.lexical; i && ")" == i.type && i.align; i = i.prev) n = i.indented;
                            r.lexical = new x(n, C.stream.column(), e, null, r.lexical, t)
                        };
                        return r.lex = !0, r
                    }

                    function _() {
                        var e = C.state;
                        e.lexical.prev && (")" == e.lexical.type && (e.indented = e.lexical.indented), e.lexical = e.lexical.prev)
                    }

                    function E(e) {
                        return function t(r) {
                            return r == e ? S() : ";" == e ? T() : S(t)
                        }
                    }

                    function W(e, t) {
                        return "var" == e ? S(N("vardef", t.length), fe, E(";"), _) : "keyword a" == e ? S(N("form"), z, W, _) : "keyword b" == e ? S(N("form"), W, _) : "keyword d" == e ? C.stream.match(/^\s*$/, !1) ? S() : S(N("stat"), H, E(";"), _) : "debugger" == e ? S(E(";")) : "{" == e ? S(N("}"), ee, _) : ";" == e ? S() : "if" == e ? ("else" == C.state.lexical.info && C.state.cc[C.state.cc.length - 1] == _ && C.state.cc.pop()(), S(N("form"), z, W, _, ve)) : "function" == e ? S(Ce) : "for" == e ? S(N("form"), ye, W, _) : "variable" == e ? c && "type" == t ? (C.marked = "keyword", S(ie, E("operator"), ie, E(";"))) : c && "declare" == t ? (C.marked = "keyword", S(W)) : c && ("module" == t || "enum" == t) && C.stream.match(/^\s*\w/, !1) ? (C.marked = "keyword", S(N("form"), he, E("{"), N("}"), ee, _, _)) : S(N("stat"), G) : "switch" == e ? S(N("form"), z, E("{"), N("}", "switch"), ee, _, _) : "case" == e ? S(F, E(":")) : "default" == e ? S(E(":")) : "catch" == e ? S(N("form"), A, E("("), Te, E(")"), W, _, O) : "class" == e ? S(N("form"), Le, _) : "export" == e ? S(N("stat"), Ne, _) : "import" == e ? S(N("stat"), Ee, _) : "async" == e ? S(W) : "@" == t ? S(F, W) : T(N("stat"), F, E(";"), _)
                    }

                    function F(e) {
                        return P(e, !1)
                    }

                    function D(e) {
                        return P(e, !0)
                    }

                    function z(e) {
                        return "(" != e ? T() : S(N(")"), F, E(")"), _)
                    }

                    function P(e, t) {
                        if (C.state.fatArrowAt == C.stream.start) {
                            var r = t ? U : q;
                            if ("(" == e) return S(A, N(")"), J(Te, ")"), _, E("=>"), r, O);
                            if ("variable" == e) return T(A, he, E("=>"), r, O)
                        }
                        var n, i = t ? R : I;
                        return w.hasOwnProperty(e) ? S(i) : "function" == e ? S(Ce, i) : "class" == e ? S(N("form"), Se, _) : "keyword c" == e || "async" == e ? S(t ? D : F) : "(" == e ? S(N(")"), H, E(")"), _, i) : "operator" == e || "spread" == e ? S(t ? D : F) : "[" == e ? S(N("]"), Pe, _, i) : "{" == e ? Q(Y, "}", null, i) : "quasi" == e ? T(j, i) : "new" == e ? S((n = t, function(e) {
                            return "." == e ? S(n ? V : K) : "variable" == e && c ? S(ce, n ? R : I) : T(n ? D : F)
                        })) : S()
                    }

                    function H(e) {
                        return e.match(/[;\}\)\],]/) ? T() : T(F)
                    }

                    function I(e, t) {
                        return "," == e ? S(F) : R(e, t, !1)
                    }

                    function R(e, t, r) {
                        var n = 0 == r ? I : R,
                            i = 0 == r ? F : D;
                        return "=>" == e ? S(A, r ? U : q, O) : "operator" == e ? /\+\+|--/.test(t) || c && "!" == t ? S(n) : c && "<" == t && C.stream.match(/^([^>]|<.*?>)*>\s*\(/, !1) ? S(N(">"), J(ie, ">"), _, n) : "?" == t ? S(F, E(":"), i) : S(i) : "quasi" == e ? T(j, n) : ";" != e ? "(" == e ? Q(D, ")", "call", n) : "." == e ? S($, n) : "[" == e ? S(N("]"), H, E("]"), _, n) : c && "as" == t ? (C.marked = "keyword", S(ie, n)) : "regexp" == e ? (C.state.lastType = C.marked = "operator", C.stream.backUp(C.stream.pos - C.stream.start - 1), S(i)) : void 0 : void 0
                    }

                    function j(e, t) {
                        return "quasi" != e ? T() : "${" != t.slice(t.length - 2) ? S(j) : S(F, B)
                    }

                    function B(e) {
                        if ("}" == e) return C.marked = "string-2", C.state.tokenize = v, S(j)
                    }

                    function q(e) {
                        return b(C.stream, C.state), T("{" == e ? W : F)
                    }

                    function U(e) {
                        return b(C.stream, C.state), T("{" == e ? W : D)
                    }

                    function K(e, t) {
                        if ("target" == t) return C.marked = "keyword", S(I)
                    }

                    function V(e, t) {
                        if ("target" == t) return C.marked = "keyword", S(R)
                    }

                    function G(e) {
                        return ":" == e ? S(_, W) : T(I, E(";"), _)
                    }

                    function $(e) {
                        if ("variable" == e) return C.marked = "property", S()
                    }

                    function Y(e, t) {
                        if ("async" == e) return C.marked = "property", S(Y);
                        if ("variable" == e || "keyword" == C.style) {
                            return C.marked = "property", "get" == t || "set" == t ? S(X) : (c && C.state.fatArrowAt == C.stream.start && (r = C.stream.match(/^\s*:\s*/, !1)) && (C.state.fatArrowAt = C.stream.pos + r[0].length), S(Z));
                            var r
                        } else {
                            if ("number" == e || "string" == e) return C.marked = l ? "property" : C.style + " property", S(Z);
                            if ("jsonld-keyword" == e) return S(Z);
                            if ("modifier" == e) return S(Y);
                            if ("[" == e) return S(F, E("]"), Z);
                            if ("spread" == e) return S(D, Z);
                            if ("*" == t) return C.marked = "keyword", S(Y);
                            if (":" == e) return T(Z)
                        }
                    }

                    function X(e) {
                        return "variable" != e ? T(Z) : (C.marked = "property", S(Ce))
                    }

                    function Z(e) {
                        return ":" == e ? S(D) : "(" == e ? T(Ce) : void 0
                    }

                    function J(e, t, r) {
                        function n(i, o) {
                            if (r ? r.indexOf(i) > -1 : "," == i) {
                                var a = C.state.lexical;
                                return "call" == a.info && (a.pos = (a.pos || 0) + 1), S(function(r, n) {
                                    return r == t || n == t ? T() : T(e)
                                }, n)
                            }
                            return i == t || o == t ? S() : S(E(t))
                        }
                        return function(r, i) {
                            return r == t || i == t ? S() : T(e, n)
                        }
                    }

                    function Q(e, t, r) {
                        for (var n = 3; n < arguments.length; n++) C.cc.push(arguments[n]);
                        return S(N(t, r), J(e, t), _)
                    }

                    function ee(e) {
                        return "}" == e ? S() : T(W, ee)
                    }

                    function te(e, t) {
                        if (c) {
                            if (":" == e) return S(ie);
                            if ("?" == t) return S(te)
                        }
                    }

                    function re(e) {
                        if (c && ":" == e) return C.stream.match(/^\s*\w+\s+is\b/, !1) ? S(F, ne, ie) : S(ie)
                    }

                    function ne(e, t) {
                        if ("is" == t) return C.marked = "keyword", S()
                    }

                    function ie(e, t) {
                        return "variable" == e || "void" == t ? "keyof" == t ? (C.marked = "keyword", S(ie)) : (C.marked = "type", S(se)) : "string" == e || "number" == e || "atom" == e ? S(se) : "[" == e ? S(N("]"), J(ie, "]", ","), _, se) : "{" == e ? S(N("}"), J(ae, "}", ",;"), _, se) : "(" == e ? S(J(le, ")"), oe) : void 0
                    }

                    function oe(e) {
                        if ("=>" == e) return S(ie)
                    }

                    function ae(e, t) {
                        return "variable" == e || "keyword" == C.style ? (C.marked = "property", S(ae)) : "?" == t ? S(ae) : ":" == e ? S(ie) : "[" == e ? S(F, te, E("]"), ae) : void 0
                    }

                    function le(e) {
                        return "variable" == e ? S(le) : ":" == e ? S(ie) : void 0
                    }

                    function se(e, t) {
                        return "<" == t ? S(N(">"), J(ie, ">"), _, se) : "|" == t || "." == e ? S(ie) : "[" == e ? S(E("]"), se) : "extends" == t ? S(ie) : void 0
                    }

                    function ce(e, t) {
                        if ("<" == t) return S(N(">"), J(ie, ">"), _, se)
                    }

                    function ue() {
                        return T(ie, de)
                    }

                    function de(e, t) {
                        if ("=" == t) return S(ie)
                    }

                    function fe() {
                        return T(he, te, me, ge)
                    }

                    function he(e, t) {
                        return "modifier" == e ? S(he) : "variable" == e ? (L(t), S()) : "spread" == e ? S(he) : "[" == e ? Q(he, "]") : "{" == e ? Q(pe, "}") : void 0
                    }

                    function pe(e, t) {
                        return "variable" != e || C.stream.match(/^\s*:/, !1) ? ("variable" == e && (C.marked = "property"), "spread" == e ? S(he) : "}" == e ? T() : S(E(":"), he, me)) : (L(t), S(me))
                    }

                    function me(e, t) {
                        if ("=" == t) return S(D)
                    }

                    function ge(e) {
                        if ("," == e) return S(fe)
                    }

                    function ve(e, t) {
                        if ("keyword b" == e && "else" == t) return S(N("form", "else"), W, _)
                    }

                    function ye(e) {
                        if ("(" == e) return S(N(")"), be, E(")"), _)
                    }

                    function be(e) {
                        return "var" == e ? S(fe, E(";"), xe) : ";" == e ? S(xe) : "variable" == e ? S(we) : T(F, E(";"), xe)
                    }

                    function we(e, t) {
                        return "in" == t || "of" == t ? (C.marked = "keyword", S(F)) : S(I, xe)
                    }

                    function xe(e, t) {
                        return ";" == e ? S(ke) : "in" == t || "of" == t ? (C.marked = "keyword", S(F)) : T(F, E(";"), ke)
                    }

                    function ke(e) {
                        ")" != e && S(F)
                    }

                    function Ce(e, t) {
                        return "*" == t ? (C.marked = "keyword", S(Ce)) : "variable" == e ? (L(t), S(Ce)) : "(" == e ? S(A, N(")"), J(Te, ")"), _, re, W, O) : c && "<" == t ? S(N(">"), J(ue, ">"), _, Ce) : void 0
                    }

                    function Te(e, t) {
                        return "@" == t && S(F, Te), "spread" == e || "modifier" == e ? S(Te) : T(he, te, me)
                    }

                    function Se(e, t) {
                        return "variable" == e ? Le(e, t) : Me(e, t)
                    }

                    function Le(e, t) {
                        if ("variable" == e) return L(t), S(Me)
                    }

                    function Me(e, t) {
                        return "<" == t ? S(N(">"), J(ue, ">"), _, Me) : "extends" == t || "implements" == t || c && "," == e ? S(c ? ie : F, Me) : "{" == e ? S(N("}"), Ae, _) : void 0
                    }

                    function Ae(e, t) {
                        return "modifier" == e || "async" == e || "variable" == e && ("static" == t || "get" == t || "set" == t) && C.stream.match(/^\s+[\w$\xa1-\uffff]/, !1) ? (C.marked = "keyword", S(Ae)) : "variable" == e || "keyword" == C.style ? (C.marked = "property", S(c ? Oe : Ce, Ae)) : "[" == e ? S(F, E("]"), c ? Oe : Ce, Ae) : "*" == t ? (C.marked = "keyword", S(Ae)) : ";" == e ? S(Ae) : "}" == e ? S() : "@" == t ? S(F, Ae) : void 0
                    }

                    function Oe(e, t) {
                        return "?" == t ? S(Oe) : ":" == e ? S(ie, me) : "=" == t ? S(D) : T(Ce)
                    }

                    function Ne(e, t) {
                        return "*" == t ? (C.marked = "keyword", S(ze, E(";"))) : "default" == t ? (C.marked = "keyword", S(F, E(";"))) : "{" == e ? S(J(_e, "}"), ze, E(";")) : T(W)
                    }

                    function _e(e, t) {
                        return "as" == t ? (C.marked = "keyword", S(E("variable"))) : "variable" == e ? T(D, _e) : void 0
                    }

                    function Ee(e) {
                        return "string" == e ? S() : T(We, Fe, ze)
                    }

                    function We(e, t) {
                        return "{" == e ? Q(We, "}") : ("variable" == e && L(t), "*" == t && (C.marked = "keyword"), S(De))
                    }

                    function Fe(e) {
                        if ("," == e) return S(We, Fe)
                    }

                    function De(e, t) {
                        if ("as" == t) return C.marked = "keyword", S(We)
                    }

                    function ze(e, t) {
                        if ("from" == t) return C.marked = "keyword", S(F)
                    }

                    function Pe(e) {
                        return "]" == e ? S() : T(J(D, "]"))
                    }

                    function He(e, t, r) {
                        return t.tokenize == m && /^(?:operator|sof|keyword [bcd]|case|new|export|default|spread|[\[{}\(,;:]|=>)$/.test(t.lastType) || "quasi" == t.lastType && /\{\s*$/.test(e.string.slice(0, e.pos - (r || 0)))
                    }
                    return _.lex = !0, {
                        startState: function(e) {
                            var t = {
                                tokenize: m,
                                lastType: "sof",
                                cc: [],
                                lexical: new x((e || 0) - o, 0, "block", !1),
                                localVars: r.localVars,
                                context: r.localVars && {
                                    vars: r.localVars
                                },
                                indented: e || 0
                            };
                            return r.globalVars && "object" == typeof r.globalVars && (t.globalVars = r.globalVars), t
                        },
                        token: function(e, t) {
                            if (e.sol() && (t.lexical.hasOwnProperty("align") || (t.lexical.align = !1), t.indented = e.indentation(), b(e, t)), t.tokenize != g && e.eatSpace()) return null;
                            var r = t.tokenize(e, t);
                            return "comment" == n ? r : (t.lastType = "operator" != n || "++" != i && "--" != i ? n : "incdec", function(e, t, r, n, i) {
                                var o = e.cc;
                                for (C.state = e, C.stream = i, C.marked = null, C.cc = o, C.style = t, e.lexical.hasOwnProperty("align") || (e.lexical.align = !0);;)
                                    if ((o.length ? o.pop() : s ? F : W)(r, n)) {
                                        for (; o.length && o[o.length - 1].lex;) o.pop()();
                                        return C.marked ? C.marked : "variable" == r && k(e, n) ? "variable-2" : t
                                    }
                            }(t, r, n, i, e))
                        },
                        indent: function(t, n) {
                            if (t.tokenize == g) return e.Pass;
                            if (t.tokenize != m) return 0;
                            var i, l = n && n.charAt(0),
                                s = t.lexical;
                            if (!/^\s*else\b/.test(n))
                                for (var c = t.cc.length - 1; c >= 0; --c) {
                                    var u = t.cc[c];
                                    if (u == _) s = s.prev;
                                    else if (u != ve) break
                                }
                            for (;
                                ("stat" == s.type || "form" == s.type) && ("}" == l || (i = t.cc[t.cc.length - 1]) && (i == I || i == R) && !/^[,\.=+\-*:?[\(]/.test(n));) s = s.prev;
                            a && ")" == s.type && "stat" == s.prev.type && (s = s.prev);
                            var d, h, p = s.type,
                                v = l == p;
                            return "vardef" == p ? s.indented + ("operator" == t.lastType || "," == t.lastType ? s.info + 1 : 0) : "form" == p && "{" == l ? s.indented : "form" == p ? s.indented + o : "stat" == p ? s.indented + (h = n, "operator" == (d = t).lastType || "," == d.lastType || f.test(h.charAt(0)) || /[,.]/.test(h.charAt(0)) ? a || o : 0) : "switch" != s.info || v || 0 == r.doubleIndentSwitch ? s.align ? s.column + (v ? 0 : 1) : s.indented + (v ? 0 : o) : s.indented + (/^(?:case|default)\b/.test(n) ? o : 2 * o)
                        },
                        electricInput: /^\s*(?:case .*?:|default:|\{|\})$/,
                        blockCommentStart: s ? null : "/*",
                        blockCommentEnd: s ? null : "*/",
                        blockCommentContinue: s ? null : " * ",
                        lineComment: s ? null : "//",
                        fold: "brace",
                        closeBrackets: "()[]{}''\"\"``",
                        helperType: s ? "json" : "javascript",
                        jsonldMode: l,
                        jsonMode: s,
                        expressionAllowed: He,
                        skipExpression: function(e) {
                            var t = e.cc[e.cc.length - 1];
                            t != F && t != D || e.cc.pop()
                        }
                    }
                }), e.registerHelper("wordChars", "javascript", /[\w$]/), e.defineMIME("text/javascript", "javascript"), e.defineMIME("text/ecmascript", "javascript"), e.defineMIME("application/javascript", "javascript"), e.defineMIME("application/x-javascript", "javascript"), e.defineMIME("application/ecmascript", "javascript"), e.defineMIME("application/json", {
                    name: "javascript",
                    json: !0
                }), e.defineMIME("application/x-json", {
                    name: "javascript",
                    json: !0
                }), e.defineMIME("application/ld+json", {
                    name: "javascript",
                    jsonld: !0
                }), e.defineMIME("text/typescript", {
                    name: "javascript",
                    typescript: !0
                }), e.defineMIME("application/typescript", {
                    name: "javascript",
                    typescript: !0
                })
            }, "object" == typeof n && "object" == typeof r ? i(e("../../lib/codemirror")) : "function" == typeof t && t.amd ? t(["../../lib/codemirror"], i) : i(CodeMirror)
        }, {
            "../../lib/codemirror": 17
        }],
        21: [function(e, r, n) {
            var i;
            i = function(e) {
                "use strict";
                var t = {
                        autoSelfClosers: {
                            area: !0,
                            base: !0,
                            br: !0,
                            col: !0,
                            command: !0,
                            embed: !0,
                            frame: !0,
                            hr: !0,
                            img: !0,
                            input: !0,
                            keygen: !0,
                            link: !0,
                            meta: !0,
                            param: !0,
                            source: !0,
                            track: !0,
                            wbr: !0,
                            menuitem: !0
                        },
                        implicitlyClosed: {
                            dd: !0,
                            li: !0,
                            optgroup: !0,
                            option: !0,
                            p: !0,
                            rp: !0,
                            rt: !0,
                            tbody: !0,
                            td: !0,
                            tfoot: !0,
                            th: !0,
                            tr: !0
                        },
                        contextGrabbers: {
                            dd: {
                                dd: !0,
                                dt: !0
                            },
                            dt: {
                                dd: !0,
                                dt: !0
                            },
                            li: {
                                li: !0
                            },
                            option: {
                                option: !0,
                                optgroup: !0
                            },
                            optgroup: {
                                optgroup: !0
                            },
                            p: {
                                address: !0,
                                article: !0,
                                aside: !0,
                                blockquote: !0,
                                dir: !0,
                                div: !0,
                                dl: !0,
                                fieldset: !0,
                                footer: !0,
                                form: !0,
                                h1: !0,
                                h2: !0,
                                h3: !0,
                                h4: !0,
                                h5: !0,
                                h6: !0,
                                header: !0,
                                hgroup: !0,
                                hr: !0,
                                menu: !0,
                                nav: !0,
                                ol: !0,
                                p: !0,
                                pre: !0,
                                section: !0,
                                table: !0,
                                ul: !0
                            },
                            rp: {
                                rp: !0,
                                rt: !0
                            },
                            rt: {
                                rp: !0,
                                rt: !0
                            },
                            tbody: {
                                tbody: !0,
                                tfoot: !0
                            },
                            td: {
                                td: !0,
                                th: !0
                            },
                            tfoot: {
                                tbody: !0
                            },
                            th: {
                                td: !0,
                                th: !0
                            },
                            thead: {
                                tbody: !0,
                                tfoot: !0
                            },
                            tr: {
                                tr: !0
                            }
                        },
                        doNotIndent: {
                            pre: !0
                        },
                        allowUnquoted: !0,
                        allowMissing: !0,
                        caseFold: !0
                    },
                    r = {
                        autoSelfClosers: {},
                        implicitlyClosed: {},
                        contextGrabbers: {},
                        doNotIndent: {},
                        allowUnquoted: !1,
                        allowMissing: !1,
                        caseFold: !1
                    };
                e.defineMode("xml", function(n, i) {
                    var o, a, l = n.indentUnit,
                        s = {},
                        c = i.htmlMode ? t : r;
                    for (var u in c) s[u] = c[u];
                    for (var u in i) s[u] = i[u];

                    function d(e, t) {
                        function r(r) {
                            return t.tokenize = r, r(e, t)
                        }
                        var n = e.next();
                        return "<" == n ? e.eat("!") ? e.eat("[") ? e.match("CDATA[") ? r(h("atom", "]]>")) : null : e.match("--") ? r(h("comment", "--\x3e")) : e.match("DOCTYPE", !0, !0) ? (e.eatWhile(/[\w\._\-]/), r(function e(t) {
                            return function(r, n) {
                                for (var i; null != (i = r.next());) {
                                    if ("<" == i) return n.tokenize = e(t + 1), n.tokenize(r, n);
                                    if (">" == i) {
                                        if (1 == t) {
                                            n.tokenize = d;
                                            break
                                        }
                                        return n.tokenize = e(t - 1), n.tokenize(r, n)
                                    }
                                }
                                return "meta"
                            }
                        }(1))) : null : e.eat("?") ? (e.eatWhile(/[\w\._\-]/), t.tokenize = h("meta", "?>"), "meta") : (o = e.eat("/") ? "closeTag" : "openTag", t.tokenize = f, "tag bracket") : "&" == n ? (e.eat("#") ? e.eat("x") ? e.eatWhile(/[a-fA-F\d]/) && e.eat(";") : e.eatWhile(/[\d]/) && e.eat(";") : e.eatWhile(/[\w\.\-:]/) && e.eat(";")) ? "atom" : "error" : (e.eatWhile(/[^&<]/), null)
                    }

                    function f(e, t) {
                        var r, n, i = e.next();
                        if (">" == i || "/" == i && e.eat(">")) return t.tokenize = d, o = ">" == i ? "endTag" : "selfcloseTag", "tag bracket";
                        if ("=" == i) return o = "equals", null;
                        if ("<" == i) {
                            t.tokenize = d, t.state = g, t.tagName = t.tagStart = null;
                            var a = t.tokenize(e, t);
                            return a ? a + " tag error" : "tag error"
                        }
                        return /[\'\"]/.test(i) ? (t.tokenize = (r = i, (n = function(e, t) {
                            for (; !e.eol();)
                                if (e.next() == r) {
                                    t.tokenize = f;
                                    break
                                }
                            return "string"
                        }).isInAttribute = !0, n), t.stringStartCol = e.column(), t.tokenize(e, t)) : (e.match(/^[^\s\u00a0=<>\"\']*[^\s\u00a0=<>\"\'\/]/), "word")
                    }

                    function h(e, t) {
                        return function(r, n) {
                            for (; !r.eol();) {
                                if (r.match(t)) {
                                    n.tokenize = d;
                                    break
                                }
                                r.next()
                            }
                            return e
                        }
                    }

                    function p(e) {
                        e.context && (e.context = e.context.prev)
                    }

                    function m(e, t) {
                        for (var r;;) {
                            if (!e.context) return;
                            if (r = e.context.tagName, !s.contextGrabbers.hasOwnProperty(r) || !s.contextGrabbers[r].hasOwnProperty(t)) return;
                            p(e)
                        }
                    }

                    function g(e, t, r) {
                        return "openTag" == e ? (r.tagStart = t.column(), v) : "closeTag" == e ? y : g
                    }

                    function v(e, t, r) {
                        return "word" == e ? (r.tagName = t.current(), a = "tag", x) : (a = "error", v)
                    }

                    function y(e, t, r) {
                        if ("word" == e) {
                            var n = t.current();
                            return r.context && r.context.tagName != n && s.implicitlyClosed.hasOwnProperty(r.context.tagName) && p(r), r.context && r.context.tagName == n || !1 === s.matchClosing ? (a = "tag", b) : (a = "tag error", w)
                        }
                        return a = "error", w
                    }

                    function b(e, t, r) {
                        return "endTag" != e ? (a = "error", b) : (p(r), g)
                    }

                    function w(e, t, r) {
                        return a = "error", b(e, 0, r)
                    }

                    function x(e, t, r) {
                        if ("word" == e) return a = "attribute", k;
                        if ("endTag" == e || "selfcloseTag" == e) {
                            var n = r.tagName,
                                i = r.tagStart;
                            return r.tagName = r.tagStart = null, "selfcloseTag" == e || s.autoSelfClosers.hasOwnProperty(n) ? m(r, n) : (m(r, n), r.context = new function(e, t, r) {
                                this.prev = e.context, this.tagName = t, this.indent = e.indented, this.startOfLine = r, (s.doNotIndent.hasOwnProperty(t) || e.context && e.context.noIndent) && (this.noIndent = !0)
                            }(r, n, i == r.indented)), g
                        }
                        return a = "error", x
                    }

                    function k(e, t, r) {
                        return "equals" == e ? C : (s.allowMissing || (a = "error"), x(e, 0, r))
                    }

                    function C(e, t, r) {
                        return "string" == e ? T : "word" == e && s.allowUnquoted ? (a = "string", x) : (a = "error", x(e, 0, r))
                    }

                    function T(e, t, r) {
                        return "string" == e ? T : x(e, 0, r)
                    }
                    return d.isInText = !0, {
                        startState: function(e) {
                            var t = {
                                tokenize: d,
                                state: g,
                                indented: e || 0,
                                tagName: null,
                                tagStart: null,
                                context: null
                            };
                            return null != e && (t.baseIndent = e), t
                        },
                        token: function(e, t) {
                            if (!t.tagName && e.sol() && (t.indented = e.indentation()), e.eatSpace()) return null;
                            o = null;
                            var r = t.tokenize(e, t);
                            return (r || o) && "comment" != r && (a = null, t.state = t.state(o || r, e, t), a && (r = "error" == a ? r + " error" : a)), r
                        },
                        indent: function(t, r, n) {
                            var i = t.context;
                            if (t.tokenize.isInAttribute) return t.tagStart == t.indented ? t.stringStartCol + 1 : t.indented + l;
                            if (i && i.noIndent) return e.Pass;
                            if (t.tokenize != f && t.tokenize != d) return n ? n.match(/^(\s*)/)[0].length : 0;
                            if (t.tagName) return !1 !== s.multilineTagIndentPastTag ? t.tagStart + t.tagName.length + 2 : t.tagStart + l * (s.multilineTagIndentFactor || 1);
                            if (s.alignCDATA && /<!\[CDATA\[/.test(r)) return 0;
                            var o = r && /^<(\/)?([\w_:\.-]*)/.exec(r);
                            if (o && o[1])
                                for (; i;) {
                                    if (i.tagName == o[2]) {
                                        i = i.prev;
                                        break
                                    }
                                    if (!s.implicitlyClosed.hasOwnProperty(i.tagName)) break;
                                    i = i.prev
                                } else if (o)
                                    for (; i;) {
                                        var a = s.contextGrabbers[i.tagName];
                                        if (!a || !a.hasOwnProperty(o[2])) break;
                                        i = i.prev
                                    }
                            for (; i && i.prev && !i.startOfLine;) i = i.prev;
                            return i ? i.indent + l : t.baseIndent || 0
                        },
                        electricInput: /<\/[\s\w:]+>$/,
                        blockCommentStart: "\x3c!--",
                        blockCommentEnd: "--\x3e",
                        configuration: s.htmlMode ? "html" : "xml",
                        helperType: s.htmlMode ? "html" : "xml",
                        skipAttribute: function(e) {
                            e.state == C && (e.state = x)
                        }
                    }
                }), e.defineMIME("text/xml", "xml"), e.defineMIME("application/xml", "xml"), e.mimeModes.hasOwnProperty("text/html") || e.defineMIME("text/html", {
                    name: "xml",
                    htmlMode: !0
                })
            }, "object" == typeof n && "object" == typeof r ? i(e("../../lib/codemirror")) : "function" == typeof t && t.amd ? t(["../../lib/codemirror"], i) : i(CodeMirror)
        }, {
            "../../lib/codemirror": 17
        }],
        22: [function(e, t, r) {
            t.exports = {
                prettyPrint: function(e, t) {
                    var r, n, i, o, a, l;
                    for (n = (t = t || {}).indent_size || 4, i = t.indent_char || " ", a = t.brace_style || "collapse", o = 0 == t.max_char ? 1 / 0 : t.max_char || 70, l = t.unformatted || ["a", "span", "bdo", "em", "strong", "dfn", "code", "samp", "kbd", "var", "cite", "abbr", "acronym", "q", "sub", "sup", "tt", "i", "b", "big", "small", "u", "s", "strike", "font", "ins", "del", "pre", "address", "dt", "h1", "h2", "h3", "h4", "h5", "h6"], (r = new function() {
                            return this.pos = 0, this.token = "", this.current_mode = "CONTENT", this.tags = {
                                parent: "parent1",
                                parentcount: 1,
                                parent1: ""
                            }, this.tag_type = "", this.token_text = this.last_token = this.last_text = this.token_type = "", this.Utils = {
                                whitespace: "\n\r\t ".split(""),
                                single_token: "br,input,link,meta,!doctype,basefont,base,area,hr,wbr,param,img,isindex,?xml,embed,?php,?,?=".split(","),
                                extra_liners: "head,body,/html".split(","),
                                in_array: function(e, t) {
                                    for (var r = 0; r < t.length; r++)
                                        if (e === t[r]) return !0;
                                    return !1
                                }
                            }, this.get_content = function() {
                                for (var e = "", t = [], r = !1;
                                    "<" !== this.input.charAt(this.pos);) {
                                    if (this.pos >= this.input.length) return t.length ? t.join("") : ["", "TK_EOF"];
                                    if (e = this.input.charAt(this.pos), this.pos++, this.line_char_count++, this.Utils.in_array(e, this.Utils.whitespace)) t.length && (r = !0), this.line_char_count--;
                                    else {
                                        if (r) {
                                            if (this.line_char_count >= this.max_char) {
                                                t.push("\n");
                                                for (var n = 0; n < this.indent_level; n++) t.push(this.indent_string);
                                                this.line_char_count = 0
                                            } else t.push(" "), this.line_char_count++;
                                            r = !1
                                        }
                                        t.push(e)
                                    }
                                }
                                return t.length ? t.join("") : ""
                            }, this.get_contents_to = function(e) {
                                if (this.pos == this.input.length) return ["", "TK_EOF"];
                                var t = "",
                                    r = new RegExp("</" + e + "\\s*>", "igm");
                                r.lastIndex = this.pos;
                                var n = r.exec(this.input),
                                    i = n ? n.index : this.input.length;
                                return this.pos < i && (t = this.input.substring(this.pos, i), this.pos = i), t
                            }, this.record_tag = function(e) {
                                this.tags[e + "count"] ? (this.tags[e + "count"]++, this.tags[e + this.tags[e + "count"]] = this.indent_level) : (this.tags[e + "count"] = 1, this.tags[e + this.tags[e + "count"]] = this.indent_level), this.tags[e + this.tags[e + "count"] + "parent"] = this.tags.parent, this.tags.parent = e + this.tags[e + "count"]
                            }, this.retrieve_tag = function(e) {
                                if (this.tags[e + "count"]) {
                                    for (var t = this.tags.parent; t && e + this.tags[e + "count"] !== t;) t = this.tags[t + "parent"];
                                    t && (this.indent_level = this.tags[e + this.tags[e + "count"]], this.tags.parent = this.tags[t + "parent"]), delete this.tags[e + this.tags[e + "count"] + "parent"], delete this.tags[e + this.tags[e + "count"]], 1 == this.tags[e + "count"] ? delete this.tags[e + "count"] : this.tags[e + "count"]--
                                }
                            }, this.get_tag = function() {
                                var e, t, r = "",
                                    n = [],
                                    i = !1;
                                do {
                                    if (this.pos >= this.input.length) return n.length ? n.join("") : ["", "TK_EOF"];
                                    r = this.input.charAt(this.pos), this.pos++, this.line_char_count++, this.Utils.in_array(r, this.Utils.whitespace) ? (i = !0, this.line_char_count--) : ("'" !== r && '"' !== r || n[1] && "!" === n[1] || (r += this.get_unformatted(r), i = !0), "=" === r && (i = !1), n.length && "=" !== n[n.length - 1] && ">" !== r && i && (this.line_char_count >= this.max_char ? (this.print_newline(!1, n), this.line_char_count = 0) : (n.push(" "), this.line_char_count++), i = !1), "<" === r && (e = this.pos - 1), n.push(r))
                                } while (">" !== r);
                                var o, a = n.join("");
                                o = -1 != a.indexOf(" ") ? a.indexOf(" ") : a.indexOf(">");
                                var s = a.substring(1, o).toLowerCase();
                                if ("/" === a.charAt(a.length - 2) || this.Utils.in_array(s, this.Utils.single_token)) this.tag_type = "SINGLE";
                                else if ("script" === s) this.record_tag(s), this.tag_type = "SCRIPT";
                                else if ("style" === s) this.record_tag(s), this.tag_type = "STYLE";
                                else if (this.Utils.in_array(s, l)) {
                                    var c = this.get_unformatted("</" + s + ">", a);
                                    n.push(c), e > 0 && this.Utils.in_array(this.input.charAt(e - 1), this.Utils.whitespace) && n.splice(0, 0, this.input.charAt(e - 1)), t = this.pos - 1, this.Utils.in_array(this.input.charAt(t + 1), this.Utils.whitespace) && n.push(this.input.charAt(t + 1)), this.tag_type = "SINGLE"
                                } else "!" === s.charAt(0) ? -1 != s.indexOf("[if") ? (-1 != a.indexOf("!IE") && (c = this.get_unformatted("--\x3e", a), n.push(c)), this.tag_type = "START") : -1 != s.indexOf("[endif") ? (this.tag_type = "END", this.unindent()) : -1 != s.indexOf("[cdata[") ? (c = this.get_unformatted("]]>", a), n.push(c), this.tag_type = "SINGLE") : (c = this.get_unformatted("--\x3e", a), n.push(c), this.tag_type = "SINGLE") : ("/" === s.charAt(0) ? (this.retrieve_tag(s.substring(1)), this.tag_type = "END") : (this.record_tag(s), this.tag_type = "START"), this.Utils.in_array(s, this.Utils.extra_liners) && this.print_newline(!0, this.output));
                                return n.join("")
                            }, this.get_unformatted = function(e, t) {
                                if (t && -1 != t.toLowerCase().indexOf(e)) return "";
                                var r = "",
                                    n = "",
                                    i = !0;
                                do {
                                    if (this.pos >= this.input.length) return n;
                                    if (r = this.input.charAt(this.pos), this.pos++, this.Utils.in_array(r, this.Utils.whitespace)) {
                                        if (!i) {
                                            this.line_char_count--;
                                            continue
                                        }
                                        if ("\n" === r || "\r" === r) {
                                            n += "\n", this.line_char_count = 0;
                                            continue
                                        }
                                    }
                                    n += r, this.line_char_count++, i = !0
                                } while (-1 == n.toLowerCase().indexOf(e));
                                return n
                            }, this.get_token = function() {
                                var e;
                                if ("TK_TAG_SCRIPT" === this.last_token || "TK_TAG_STYLE" === this.last_token) {
                                    var t = this.last_token.substr(7);
                                    return "string" != typeof(e = this.get_contents_to(t)) ? e : [e, "TK_" + t]
                                }
                                return "CONTENT" === this.current_mode ? "string" != typeof(e = this.get_content()) ? e : [e, "TK_CONTENT"] : "TAG" === this.current_mode ? "string" != typeof(e = this.get_tag()) ? e : [e, "TK_TAG_" + this.tag_type] : void 0
                            }, this.get_full_indent = function(e) {
                                return (e = this.indent_level + e || 0) < 1 ? "" : Array(e + 1).join(this.indent_string)
                            }, this.printer = function(e, t, r, n, i) {
                                this.input = e || "", this.output = [], this.indent_character = t, this.indent_string = "", this.indent_size = r, this.brace_style = i, this.indent_level = 0, this.max_char = n, this.line_char_count = 0;
                                for (var o = 0; o < this.indent_size; o++) this.indent_string += this.indent_character;
                                this.print_newline = function(e, t) {
                                    if (this.line_char_count = 0, t && t.length) {
                                        if (!e)
                                            for (; this.Utils.in_array(t[t.length - 1], this.Utils.whitespace);) t.pop();
                                        t.push("\n");
                                        for (var r = 0; r < this.indent_level; r++) t.push(this.indent_string)
                                    }
                                }, this.print_token = function(e) {
                                    this.output.push(e)
                                }, this.indent = function() {
                                    this.indent_level++
                                }, this.unindent = function() {
                                    this.indent_level > 0 && this.indent_level--
                                }
                            }, this
                        }).printer(e, i, n, o, a);;) {
                        var s = r.get_token();
                        if (r.token_text = s[0], r.token_type = s[1], "TK_EOF" === r.token_type) break;
                        switch (r.token_type) {
                            case "TK_TAG_START":
                                r.print_newline(!1, r.output), r.print_token(r.token_text), r.indent(), r.current_mode = "CONTENT";
                                break;
                            case "TK_TAG_STYLE":
                            case "TK_TAG_SCRIPT":
                                r.print_newline(!1, r.output), r.print_token(r.token_text), r.current_mode = "CONTENT";
                                break;
                            case "TK_TAG_END":
                                if ("TK_CONTENT" === r.last_token && "" === r.last_text) {
                                    var c = r.token_text.match(/\w+/)[0],
                                        u = r.output[r.output.length - 1].match(/<\s*(\w+)/);
                                    null !== u && u[1] === c || r.print_newline(!0, r.output)
                                }
                                r.print_token(r.token_text), r.current_mode = "CONTENT";
                                break;
                            case "TK_TAG_SINGLE":
                                var d = r.token_text.match(/^\s*<([a-z]+)/i);
                                d && r.Utils.in_array(d[1], l) || r.print_newline(!1, r.output), r.print_token(r.token_text), r.current_mode = "CONTENT";
                                break;
                            case "TK_CONTENT":
                                "" !== r.token_text && r.print_token(r.token_text), r.current_mode = "TAG";
                                break;
                            case "TK_STYLE":
                            case "TK_SCRIPT":
                                if ("" !== r.token_text) {
                                    r.output.push("\n");
                                    var f = r.token_text;
                                    if ("TK_SCRIPT" == r.token_type) var h = "function" == typeof js_beautify && js_beautify;
                                    else "TK_STYLE" == r.token_type && (h = "function" == typeof css_beautify && css_beautify);
                                    if ("keep" == t.indent_scripts) var p = 0;
                                    else p = "separate" == t.indent_scripts ? -r.indent_level : 1;
                                    var m = r.get_full_indent(p);
                                    if (h) f = h(f.replace(/^\s*/, m), t);
                                    else {
                                        var g = f.match(/^\s*/)[0].match(/[^\n\r]*$/)[0].split(r.indent_string).length - 1,
                                            v = r.get_full_indent(p - g);
                                        f = f.replace(/^\s*/, m).replace(/\r\n|\r|\n/g, "\n" + v).replace(/\s*$/, "")
                                    }
                                    f && (r.print_token(f), r.print_newline(!0, r.output))
                                }
                                r.current_mode = "TAG"
                        }
                        r.last_token = r.token_type, r.last_text = r.token_text
                    }
                    return r.output.join("")
                }
            }
        }, {}],
        23: [function(e, t, r) {
            "use strict";
            t.exports = e("./stream/stream")
        }, {
            "./stream/stream": 24
        }],
        24: [function(e, t, r) {
            ! function() {
                "use strict";
                var e = 0,
                    r = {};

                function n() {
                    function t() {
                        return arguments.length > 0 && arguments[0] !== r && i(t, arguments[0]), t._state.value
                    }
                    var o;
                    return (o = t).constructor = n, o._state = {
                        id: e++,
                        value: void 0,
                        state: 0,
                        derive: void 0,
                        recover: void 0,
                        deps: {},
                        parents: [],
                        endStream: void 0,
                        unregister: void 0
                    }, o.map = o["fantasy-land/map"] = c, o["fantasy-land/ap"] = u, o["fantasy-land/of"] = n, o.valueOf = d, o.toJSON = f, o.toString = d, Object.defineProperties(o, {
                        end: {
                            get: function() {
                                if (!o._state.endStream) {
                                    var e = n();
                                    e.map(function(t) {
                                        return !0 === t && (s(o), e._state.unregister = function() {
                                            s(e)
                                        }), t
                                    }), o._state.endStream = e
                                }
                                return o._state.endStream
                            }
                        }
                    }), arguments.length > 0 && arguments[0] !== r && i(t, arguments[0]), t
                }

                function i(e, t) {
                    o(e, t);
                    for (var r in e._state.deps) a(e._state.deps[r], !1);
                    null != e._state.unregister && e._state.unregister(),
                        function(e) {
                            e._state.changed = !1;
                            for (var t in e._state.deps) e._state.deps[t]._state.changed = !1
                        }(e)
                }

                function o(e, t) {
                    e._state.value = t, e._state.changed = !0, 2 !== e._state.state && (e._state.state = 1)
                }

                function a(e, t) {
                    var n = e._state.parents;
                    if (n.length > 0 && n.every(p) && (t || n.some(m))) {
                        var i = e._state.derive();
                        if (i === r) return !1;
                        o(e, i)
                    }
                }

                function l(e, t) {
                    if (!t.every(h)) throw new Error("Ensure that each item passed to stream.combine/stream.merge is a stream");
                    return r = n(), i = t, o = function() {
                            return e.apply(this, t.concat([t.filter(m)]))
                        }, (l = r._state).derive = o, l.parents = i.filter(g),
                        function e(t, r) {
                            for (var n = 0; n < r.length; n++) r[n]._state.deps[t._state.id] = t, e(t, r[n]._state.parents)
                        }(r, l.parents), a(r, !0), r;
                    var r, i, o, l
                }

                function s(e) {
                    for (var t = 0; t < e._state.parents.length; t++) {
                        delete e._state.parents[t]._state.deps[e._state.id]
                    }
                    for (var r in e._state.deps) {
                        var n = e._state.deps[r],
                            i = n._state.parents.indexOf(e);
                        i > -1 && n._state.parents.splice(i, 1)
                    }
                    e._state.state = 2, e._state.deps = {}
                }

                function c(e) {
                    return l(function(t) {
                        return e(t())
                    }, [this])
                }

                function u(e) {
                    return l(function(e, t) {
                        return e()(t())
                    }, [e, this])
                }

                function d() {
                    return this._state.value
                }

                function f() {
                    return null != this._state.value && "function" == typeof this._state.value.toJSON ? this._state.value.toJSON() : this._state.value
                }

                function h(e) {
                    return e._state
                }

                function p(e) {
                    return 1 === e._state.state
                }

                function m(e) {
                    return e._state.changed
                }

                function g(e) {
                    return 2 !== e._state.state
                }
                n["fantasy-land/of"] = n, n.merge = function(e) {
                    return l(function() {
                        return e.map(function(e) {
                            return e()
                        })
                    }, e)
                }, n.combine = l, n.scan = function(e, t, r) {
                    var n = l(function(r) {
                        return t = e(t, r._state.value)
                    }, [r]);
                    return 0 === n._state.state && n(t), n
                }, n.scanMerge = function(e, t) {
                    var r = e.map(function(e) {
                        var t = e[0];
                        return 0 === t._state.state && t(void 0), t
                    });
                    return l(function() {
                        var n = arguments[arguments.length - 1];
                        return r.forEach(function(r, i) {
                            n.indexOf(r) > -1 && (t = e[i][1](t, r._state.value))
                        }), t
                    }, r)
                }, n.HALT = r, void 0 !== t ? t.exports = n : "function" != typeof window.m || "stream" in window.m ? window.m = {
                    stream: n
                } : window.m.stream = n
            }()
        }, {}]
    }, {}, [11])
}();