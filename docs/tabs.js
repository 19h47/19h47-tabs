function v(i) {
  const t = i.indexOf("#");
  return t === -1 ? "" : i.substring(t + 1);
}
const f = !0, p = 0;
class g {
  constructor(t) {
    this.delete = () => {
      var s;
      return (s = this.el.parentElement) == null ? void 0 : s.removeChild(this.el);
    }, this.el = t, this.id = t.id;
  }
  deactivate() {
    this.el.setAttribute("hidden", "true"), this.el.classList.remove("is-active");
  }
  activate() {
    this.el.removeAttribute("hidden"), this.el.classList.add("is-active");
  }
  destroy() {
    this.el.removeAttribute("hidden"), this.el.classList.remove("is-active");
  }
}
function d(i, t = {}, s = "") {
  const e = new CustomEvent(`Tab.${s}`, {
    bubbles: !1,
    cancelable: !0,
    detail: t
  });
  return i.dispatchEvent(e);
}
class m {
  constructor(t, s) {
    var e;
    this.active = !1, this.id = "", this.init = () => this.initEvents(), this.initEvents = () => this.el.addEventListener("click", this.handleClick), this.handleClick = () => this.toggle(), this.focus = () => this.el.focus(), this.delete = () => {
      var a;
      d(this.el, { controls: this.controls, element: this.el }, "delete"), (a = this.el.parentElement) == null || a.removeChild(this.el);
    }, this.el = t, this.id = t.id, this.controls = ((e = t.getAttribute("aria-controls")) == null ? void 0 : e.trim().split(" ")[0]) || "", this.active = JSON.parse(t.getAttribute("aria-selected")), this.callback = s;
  }
  /**
   * Toggle
   *
   * @param {boolean} focus
   */
  async toggle(t = !0) {
    this.active || (await this.callback(), d(this.el, { controls: this.controls, element: this.el }, "activate"), this.activate(t));
  }
  /**
   * Activate tab
   *
   * @param {boolean} focus
   * @return void
   */
  activate(t = !0) {
    this.active = !0, this.el.setAttribute("tabindex", "0"), this.el.setAttribute("aria-selected", "true"), this.el.classList.add("is-active"), t && this.focus();
  }
  /**
   * Deactivate tab
   *
   * @return void
   */
  deactivate() {
    this.active = !1, this.el.setAttribute("tabindex", "-1"), this.el.setAttribute("aria-selected", "false"), this.el.classList.remove("is-active");
  }
  destroy() {
    this.el.removeAttribute("tabindex"), this.el.removeAttribute("aria-selected"), this.el.classList.remove("is-active"), this.el.removeEventListener("click", this.handleClick);
  }
}
const y = {
  hash: f,
  delay: p,
  callback() {
  }
};
class E {
  constructor(t, s = {}) {
    this.current = 0, this.tabPanels = [], this.tabs = [], this.href = "", this.handleKeydown = (e) => {
      const { key: a, code: u, target: b } = e, h = JSON.parse(
        b.getAttribute("aria-selected")
      ), r = () => {
        this.current = 0 > this.current - 1 ? this.tabs.length - 1 : this.current - 1, this.tabs[this.current].focus(), this.options.delay && setTimeout(() => {
          this.tabs[this.current].toggle(!1);
        }, this.options.delay);
      }, l = () => {
        this.current = this.current + 1 > this.tabs.length - 1 ? 0 : this.current + 1, this.tabs[this.current].focus(), this.options.delay && setTimeout(() => {
          this.tabs[this.current].toggle(!1);
        }, this.options.delay);
      }, n = () => {
        e.preventDefault(), this.current = 0, this.tabs[this.current].toggle();
      }, c = () => {
        e.preventDefault(), this.current = this.tabs.length - 1, this.tabs[this.current].toggle();
      }, o = {
        ArrowUp: r,
        ArrowLeft: r,
        ArrowDown: l,
        ArrowRight: l,
        End: c,
        Home: n,
        PageUp: n,
        PageDown: c,
        Delete: () => h && this.delete(e),
        Backspace: () => h && this.delete(e),
        default: () => !1
      };
      return (o[a || u] || o.default)();
    }, this.deactivateTabs = () => this.tabs.forEach((e) => e.deactivate()), this.deactivateTabPanels = () => this.tabPanels.forEach((e) => e.deactivate()), this.create = () => this.init(), this.el = t, this.$tabList = this.el.querySelector('[role="tablist"]'), this.options = { ...y, ...s }, this.href = this.options.hash && v(window.location.hash) || "";
  }
  init() {
    this.tabs = [...this.$tabList.querySelectorAll('[role="tab"]')].map(
      // @ts-ignore
      (t) => new m(t, this.options.callback)
    ), this.tabs.forEach((t, s) => {
      this.tabPanels.push(
        new g(this.el.querySelector(`#${t.controls}[role="tabpanel"]`))
      ), t.init(), t.el.addEventListener("Tab.activate", () => {
        this.current = s, this.deactivateTabs(), this.deactivateTabPanels(), this.tabPanels.find((e) => e.id === t.controls).activate(), this.options.hash && (this.href = t.id, window.location.hash = t.id);
      }), (t.active || t.id === this.href || this.current === s) && (this.deactivateTabs(), this.deactivateTabPanels(), t.activate(!1), this.tabPanels.find((e) => e.id === t.controls).activate());
    }), this.initEvents();
  }
  initEvents() {
    var t;
    (t = this.$tabList) == null || t.addEventListener("keydown", this.handleKeydown);
  }
  /**
   * Delete
   *
   * @param  {KeyboardEvent} event
   *
   * @return {boolean}
   */
  delete({ target: t }) {
    return t.getAttribute("data-deletable") === null ? !1 : (this.tabs[this.current].delete(), this.tabPanels[this.current].delete(), this.tabs.splice(this.current, 1), this.tabPanels.splice(this.current, 1), 0 > this.current - 1 ? this.current = 0 : this.current = this.current - 1, this.tabs[this.current].toggle(), !0);
  }
  destroy() {
    var t;
    (t = this.$tabList) == null || t.removeEventListener("keydown", this.handleKeydown), this.tabs.forEach((s) => s.destroy()), this.tabPanels.forEach((s) => s.destroy()), this.tabs = [], this.tabPanels = [];
  }
}
export {
  E as default
};
