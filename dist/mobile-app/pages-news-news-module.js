(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["pages-news-news-module"],{

/***/ "./node_modules/@ngui/auto-complete/dist/auto-complete.component.js":
/*!**************************************************************************!*\
  !*** ./node_modules/@ngui/auto-complete/dist/auto-complete.component.js ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var auto_complete_1 = __webpack_require__(/*! ./auto-complete */ "./node_modules/@ngui/auto-complete/dist/auto-complete.js");
/**
 * show a selected date in monthly calendar
 * Each filteredList item has the following property in addition to data itself
 *   1. displayValue as string e.g. Allen Kim
 *   2. dataValue as any e.g.
 */
var NguiAutoCompleteComponent = /** @class */ (function () {
    /**
     * constructor
     */
    function NguiAutoCompleteComponent(elementRef, autoComplete) {
        var _this = this;
        this.autoComplete = autoComplete;
        /**
         * public input properties
         */
        this.autocomplete = false;
        this.minChars = 0;
        this.acceptUserInput = true;
        this.loadingText = 'Loading';
        this.loadingTemplate = null;
        this.showInputTag = true;
        this.showDropdownOnInit = false;
        this.tabToSelect = true;
        this.matchFormatted = false;
        this.autoSelectFirstItem = false;
        this.selectOnBlur = false;
        this.reFocusAfterSelect = true;
        this.headerItemTemplate = null;
        this.ignoreAccents = true;
        this.valueSelected = new core_1.EventEmitter();
        this.customSelected = new core_1.EventEmitter();
        this.textEntered = new core_1.EventEmitter();
        this.dropdownVisible = false;
        this.isLoading = false;
        this.filteredList = [];
        this.minCharsEntered = false;
        this.itemIndex = null;
        this.timer = 0;
        this.delay = (function () {
            var timer = 0;
            return function (callback, ms) {
                clearTimeout(timer);
                timer = setTimeout(callback, ms);
            };
        })();
        this.selectOnEnter = false;
        this.reloadListInDelay = function (evt) {
            var delayMs = _this.isSrcArr() ? 10 : 500;
            var keyword = evt.target.value;
            // executing after user stopped typing
            _this.delay(function () { return _this.reloadList(keyword); }, delayMs);
        };
        this.inputElKeyHandler = function (evt) {
            var totalNumItem = _this.filteredList.length;
            switch (evt.keyCode) {
                case 27:// ESC, hide auto complete
                    _this.selectOnEnter = false;
                    _this.selectOne(undefined);
                    break;
                case 38:// UP, select the previous li el
                    if (0 === totalNumItem) {
                        return;
                    }
                    _this.selectOnEnter = true;
                    _this.itemIndex = (totalNumItem + _this.itemIndex - 1) % totalNumItem;
                    _this.scrollToView(_this.itemIndex);
                    break;
                case 40:// DOWN, select the next li el or the first one
                    if (0 === totalNumItem) {
                        return;
                    }
                    _this.selectOnEnter = true;
                    _this.dropdownVisible = true;
                    var sum = _this.itemIndex;
                    sum = (_this.itemIndex === null) ? 0 : sum + 1;
                    _this.itemIndex = (totalNumItem + sum) % totalNumItem;
                    _this.scrollToView(_this.itemIndex);
                    break;
                case 13:// ENTER, choose it!!
                    if (_this.selectOnEnter) {
                        _this.selectOne(_this.filteredList[_this.itemIndex]);
                    }
                    evt.preventDefault();
                    break;
                case 9:// TAB, choose if tab-to-select is enabled
                    if (_this.tabToSelect) {
                        _this.selectOne(_this.filteredList[_this.itemIndex]);
                    }
                    break;
            }
        };
        this.el = elementRef.nativeElement;
    }
    /**
     * user enters into input el, shows list to select, then select one
     */
    NguiAutoCompleteComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.autoComplete.source = this.source;
        this.autoComplete.pathToData = this.pathToData;
        this.autoComplete.listFormatter = this.listFormatter;
        if (this.autoSelectFirstItem) {
            this.itemIndex = 0;
        }
        setTimeout(function () {
            if (_this.autoCompleteInput && _this.reFocusAfterSelect) {
                _this.autoCompleteInput.nativeElement.focus();
            }
            if (_this.showDropdownOnInit) {
                _this.showDropdownList({ target: { value: '' } });
            }
        });
    };
    NguiAutoCompleteComponent.prototype.isSrcArr = function () {
        return Array.isArray(this.source);
    };
    NguiAutoCompleteComponent.prototype.showDropdownList = function (event) {
        this.dropdownVisible = true;
        this.reloadList(event.target.value);
    };
    NguiAutoCompleteComponent.prototype.hideDropdownList = function () {
        this.selectOnEnter = false;
        this.dropdownVisible = false;
    };
    NguiAutoCompleteComponent.prototype.findItemFromSelectValue = function (selectText) {
        var matchingItems = this.filteredList.filter(function (item) { return ('' + item) === selectText; });
        return matchingItems.length ? matchingItems[0] : null;
    };
    NguiAutoCompleteComponent.prototype.reloadList = function (keyword) {
        var _this = this;
        this.filteredList = [];
        if (keyword.length < (this.minChars || 0)) {
            this.minCharsEntered = false;
            return;
        }
        else {
            this.minCharsEntered = true;
        }
        if (this.isSrcArr()) {
            this.isLoading = false;
            this.filteredList = this.autoComplete.filter(this.source, keyword, this.matchFormatted, this.ignoreAccents);
            if (this.maxNumList) {
                this.filteredList = this.filteredList.slice(0, this.maxNumList);
            }
        }
        else {
            this.isLoading = true;
            if (typeof this.source === 'function') {
                // custom function that returns observable
                this.source(keyword).subscribe(function (resp) {
                    if (_this.pathToData) {
                        var paths = _this.pathToData.split('.');
                        paths.forEach(function (prop) { return resp = resp[prop]; });
                    }
                    _this.filteredList = resp;
                    if (_this.maxNumList) {
                        _this.filteredList = _this.filteredList.slice(0, _this.maxNumList);
                    }
                }, function (error) { return null; }, function () { return _this.isLoading = false; } // complete
                );
            }
            else {
                // remote source
                this.autoComplete.getRemoteData(keyword).subscribe(function (resp) {
                    _this.filteredList = resp ? resp : [];
                    if (_this.maxNumList) {
                        _this.filteredList = _this.filteredList.slice(0, _this.maxNumList);
                    }
                }, function (error) { return null; }, function () { return _this.isLoading = false; } // complete
                );
            }
        }
    };
    NguiAutoCompleteComponent.prototype.selectOne = function (data) {
        if (!!data || data === '') {
            this.valueSelected.emit(data);
        }
        else {
            this.customSelected.emit(this.keyword);
        }
    };
    NguiAutoCompleteComponent.prototype.enterText = function (data) {
        this.textEntered.emit(data);
    };
    NguiAutoCompleteComponent.prototype.blurHandler = function (evt) {
        if (this.selectOnBlur) {
            this.selectOne(this.filteredList[this.itemIndex]);
        }
        this.hideDropdownList();
    };
    NguiAutoCompleteComponent.prototype.scrollToView = function (index) {
        var container = this.autoCompleteContainer.nativeElement;
        var ul = container.querySelector('ul');
        var li = ul.querySelector('li'); // just sample the first li to get height
        var liHeight = li.offsetHeight;
        var scrollTop = ul.scrollTop;
        var viewport = scrollTop + ul.offsetHeight;
        var scrollOffset = liHeight * index;
        if (scrollOffset < scrollTop || (scrollOffset + liHeight) > viewport) {
            ul.scrollTop = scrollOffset;
        }
    };
    NguiAutoCompleteComponent.prototype.trackByIndex = function (index, item) {
        return index;
    };
    Object.defineProperty(NguiAutoCompleteComponent.prototype, "emptyList", {
        get: function () {
            return !(this.isLoading ||
                (this.minCharsEntered && !this.isLoading && !this.filteredList.length) ||
                (this.filteredList.length));
        },
        enumerable: true,
        configurable: true
    });
    NguiAutoCompleteComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'ngui-auto-complete',
                    template: "\n        <div #autoCompleteContainer class=\"ngui-auto-complete\">\n            <!-- keyword input -->\n            <input *ngIf=\"showInputTag\"\n                   #autoCompleteInput class=\"keyword\"\n                   [attr.autocomplete]=\"autocomplete ? 'null' : 'off'\"\n                   placeholder=\"{{placeholder}}\"\n                   (focus)=\"showDropdownList($event)\"\n                   (blur)=\"blurHandler($event)\"\n                   (keydown)=\"inputElKeyHandler($event)\"\n                   (input)=\"reloadListInDelay($event)\"\n                   [(ngModel)]=\"keyword\"/>\n\n            <!-- dropdown that user can select -->\n            <ul *ngIf=\"dropdownVisible\" [class.empty]=\"emptyList\">\n                <li *ngIf=\"isLoading && loadingTemplate\" class=\"loading\"\n                    [innerHTML]=\"loadingTemplate\"></li>\n                <li *ngIf=\"isLoading && !loadingTemplate\" class=\"loading\">{{loadingText}}</li>\n                <li *ngIf=\"minCharsEntered && !isLoading && !filteredList.length\"\n                    (mousedown)=\"selectOne('')\"\n                    class=\"no-match-found\">{{noMatchFoundText || 'No Result Found'}}\n                </li>\n                <li *ngIf=\"headerItemTemplate && filteredList.length\" class=\"header-item\"\n                    [innerHTML]=\"headerItemTemplate\"></li>\n                <li *ngIf=\"blankOptionText && filteredList.length\"\n                    (mousedown)=\"selectOne('')\"\n                    class=\"blank-item\">{{blankOptionText}}\n                </li>\n                <li class=\"item\"\n                    *ngFor=\"let item of filteredList; let i=index; trackBy: trackByIndex\"\n                    (mousedown)=\"selectOne(item)\"\n                    [ngClass]=\"{selected: i === itemIndex}\"\n                    [innerHtml]=\"autoComplete.getFormattedListItem(item)\">\n                </li>\n            </ul>\n\n        </div>",
                    providers: [auto_complete_1.NguiAutoComplete],
                    styles: ["\n        @keyframes slideDown {\n            0% {\n                transform: translateY(-10px);\n            }\n            100% {\n                transform: translateY(0px);\n            }\n        }\n\n        .ngui-auto-complete {\n            background-color: transparent;\n        }\n\n        .ngui-auto-complete > input {\n            outline: none;\n            border: 0;\n            padding: 2px;\n            box-sizing: border-box;\n            background-clip: content-box;\n        }\n\n        .ngui-auto-complete > ul {\n            background-color: #fff;\n            margin: 0;\n            width: 100%;\n            overflow-y: auto;\n            list-style-type: none;\n            padding: 0;\n            border: 1px solid #ccc;\n            box-sizing: border-box;\n            animation: slideDown 0.1s;\n        }\n\n        .ngui-auto-complete > ul.empty {\n            display: none;\n        }\n\n        .ngui-auto-complete > ul li {\n            padding: 2px 5px;\n            border-bottom: 1px solid #eee;\n        }\n\n        .ngui-auto-complete > ul li.selected {\n            background-color: #ccc;\n        }\n\n        .ngui-auto-complete > ul li:last-child {\n            border-bottom: none;\n        }\n\n        .ngui-auto-complete > ul li:not(.header-item):hover {\n            background-color: #ccc;\n        }"
                    ],
                    encapsulation: core_1.ViewEncapsulation.None
                },] },
    ];
    /** @nocollapse */
    NguiAutoCompleteComponent.ctorParameters = function () { return [
        { type: core_1.ElementRef },
        { type: auto_complete_1.NguiAutoComplete }
    ]; };
    NguiAutoCompleteComponent.propDecorators = {
        autocomplete: [{ type: core_1.Input, args: ['autocomplete',] }],
        listFormatter: [{ type: core_1.Input, args: ['list-formatter',] }],
        source: [{ type: core_1.Input, args: ['source',] }],
        pathToData: [{ type: core_1.Input, args: ['path-to-data',] }],
        minChars: [{ type: core_1.Input, args: ['min-chars',] }],
        placeholder: [{ type: core_1.Input, args: ['placeholder',] }],
        blankOptionText: [{ type: core_1.Input, args: ['blank-option-text',] }],
        noMatchFoundText: [{ type: core_1.Input, args: ['no-match-found-text',] }],
        acceptUserInput: [{ type: core_1.Input, args: ['accept-user-input',] }],
        loadingText: [{ type: core_1.Input, args: ['loading-text',] }],
        loadingTemplate: [{ type: core_1.Input, args: ['loading-template',] }],
        maxNumList: [{ type: core_1.Input, args: ['max-num-list',] }],
        showInputTag: [{ type: core_1.Input, args: ['show-input-tag',] }],
        showDropdownOnInit: [{ type: core_1.Input, args: ['show-dropdown-on-init',] }],
        tabToSelect: [{ type: core_1.Input, args: ['tab-to-select',] }],
        matchFormatted: [{ type: core_1.Input, args: ['match-formatted',] }],
        autoSelectFirstItem: [{ type: core_1.Input, args: ['auto-select-first-item',] }],
        selectOnBlur: [{ type: core_1.Input, args: ['select-on-blur',] }],
        reFocusAfterSelect: [{ type: core_1.Input, args: ['re-focus-after-select',] }],
        headerItemTemplate: [{ type: core_1.Input, args: ['header-item-template',] }],
        ignoreAccents: [{ type: core_1.Input, args: ['ignore-accents',] }],
        valueSelected: [{ type: core_1.Output }],
        customSelected: [{ type: core_1.Output }],
        textEntered: [{ type: core_1.Output }],
        autoCompleteInput: [{ type: core_1.ViewChild, args: ['autoCompleteInput',] }],
        autoCompleteContainer: [{ type: core_1.ViewChild, args: ['autoCompleteContainer',] }]
    };
    return NguiAutoCompleteComponent;
}());
exports.NguiAutoCompleteComponent = NguiAutoCompleteComponent;
//# sourceMappingURL=auto-complete.component.js.map

/***/ }),

/***/ "./node_modules/@ngui/auto-complete/dist/auto-complete.directive.js":
/*!**************************************************************************!*\
  !*** ./node_modules/@ngui/auto-complete/dist/auto-complete.directive.js ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var auto_complete_component_1 = __webpack_require__(/*! ./auto-complete.component */ "./node_modules/@ngui/auto-complete/dist/auto-complete.component.js");
var forms_1 = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/**
 * display auto-complete section with input and dropdown list when it is clicked
 */
var NguiAutoCompleteDirective = /** @class */ (function () {
    function NguiAutoCompleteDirective(resolver, viewContainerRef, parentForm) {
        var _this = this;
        this.resolver = resolver;
        this.viewContainerRef = viewContainerRef;
        this.parentForm = parentForm;
        this.autocomplete = false;
        this.acceptUserInput = true;
        this.loadingTemplate = null;
        this.loadingText = 'Loading';
        this.tabToSelect = true;
        this.selectOnBlur = false;
        this.matchFormatted = false;
        this.autoSelectFirstItem = false;
        this.openOnFocus = true;
        this.closeOnFocusOut = true;
        this.reFocusAfterSelect = true;
        this.headerItemTemplate = null;
        this.ignoreAccents = true;
        this.zIndex = '1';
        this.isRtl = false;
        this.ngModelChange = new core_1.EventEmitter();
        this.valueChanged = new core_1.EventEmitter();
        this.customSelected = new core_1.EventEmitter();
        // show auto-complete list below the current element
        this.showAutoCompleteDropdown = function (event) {
            if (_this.dropdownJustHidden) {
                return;
            }
            _this.hideAutoCompleteDropdown();
            _this.scheduledBlurHandler = null;
            var factory = _this.resolver.resolveComponentFactory(auto_complete_component_1.NguiAutoCompleteComponent);
            _this.componentRef = _this.viewContainerRef.createComponent(factory);
            var component = _this.componentRef.instance;
            component.keyword = _this.inputEl.value;
            component.showInputTag = false; // Do NOT display autocomplete input tag separately
            component.pathToData = _this.pathToData;
            component.minChars = _this.minChars;
            component.source = _this.source;
            component.placeholder = _this.autoCompletePlaceholder;
            component.acceptUserInput = _this.acceptUserInput;
            component.maxNumList = parseInt(_this.maxNumList, 10);
            component.loadingText = _this.loadingText;
            component.loadingTemplate = _this.loadingTemplate;
            component.listFormatter = _this.listFormatter;
            component.blankOptionText = _this.blankOptionText;
            component.noMatchFoundText = _this.noMatchFoundText;
            component.tabToSelect = _this.tabToSelect;
            component.selectOnBlur = _this.selectOnBlur;
            component.matchFormatted = _this.matchFormatted;
            component.autoSelectFirstItem = _this.autoSelectFirstItem;
            component.headerItemTemplate = _this.headerItemTemplate;
            component.ignoreAccents = _this.ignoreAccents;
            component.valueSelected.subscribe(_this.selectNewValue);
            component.textEntered.subscribe(_this.enterNewText);
            component.customSelected.subscribe(_this.selectCustomValue);
            _this.acDropdownEl = _this.componentRef.location.nativeElement;
            _this.acDropdownEl.style.display = 'none';
            // if this element is not an input tag, move dropdown after input tag
            // so that it displays correctly
            if (_this.el.tagName !== 'INPUT' && _this.acDropdownEl) {
                _this.inputEl.parentElement.insertBefore(_this.acDropdownEl, _this.inputEl.nextSibling);
            }
            _this.revertValue = typeof _this.ngModel !== 'undefined' ? _this.ngModel : _this.inputEl.value;
            setTimeout(function () {
                component.reloadList(_this.inputEl.value);
                _this.styleAutoCompleteDropdown();
                component.dropdownVisible = true;
            });
        };
        this.hideAutoCompleteDropdown = function (event) {
            if (_this.componentRef) {
                var currentItem = void 0;
                var hasRevertValue = (typeof _this.revertValue !== 'undefined');
                if (_this.inputEl && hasRevertValue && _this.acceptUserInput === false) {
                    currentItem = _this.componentRef.instance.findItemFromSelectValue(_this.inputEl.value);
                }
                _this.componentRef.destroy();
                _this.componentRef = undefined;
                if (_this.inputEl && hasRevertValue && _this.acceptUserInput === false && currentItem === null) {
                    _this.selectNewValue(_this.revertValue);
                }
                else if (_this.inputEl && _this.acceptUserInput === true && typeof currentItem === 'undefined' && event && event.target.value) {
                    _this.enterNewText(event.target.value);
                }
            }
            _this.dropdownJustHidden = true;
            setTimeout(function () { return _this.dropdownJustHidden = false; }, 100);
        };
        this.styleAutoCompleteDropdown = function () {
            if (_this.componentRef) {
                var component = _this.componentRef.instance;
                /* setting width/height auto complete */
                var thisElBCR = _this.el.getBoundingClientRect();
                var thisInputElBCR = _this.inputEl.getBoundingClientRect();
                var closeToBottom = thisInputElBCR.bottom + 100 > window.innerHeight;
                var directionOfStyle = _this.isRtl ? 'right' : 'left';
                _this.acDropdownEl.style.width = thisInputElBCR.width + 'px';
                _this.acDropdownEl.style.position = 'absolute';
                _this.acDropdownEl.style.zIndex = _this.zIndex;
                _this.acDropdownEl.style[directionOfStyle] = '0';
                _this.acDropdownEl.style.display = 'inline-block';
                if (closeToBottom) {
                    _this.acDropdownEl.style.bottom = thisInputElBCR.height + "px";
                }
                else {
                    _this.acDropdownEl.style.top = thisInputElBCR.height + "px";
                }
            }
        };
        this.selectNewValue = function (item) {
            // make displayable value
            if (item && typeof item === 'object') {
                item = _this.setToStringFunction(item);
            }
            _this.renderValue(item);
            // make return value
            var val = item;
            if (_this.selectValueOf && item[_this.selectValueOf]) {
                val = item[_this.selectValueOf];
            }
            if ((_this.parentForm && _this.formControlName) || _this.extFormControl) {
                if (!!val) {
                    _this.formControl.patchValue(val);
                }
            }
            if (val !== _this.ngModel) {
                _this.ngModelChange.emit(val);
            }
            _this.valueChanged.emit(val);
            _this.hideAutoCompleteDropdown();
            setTimeout(function () {
                if (_this.reFocusAfterSelect) {
                    _this.inputEl.focus();
                }
                return _this.inputEl;
            });
        };
        this.selectCustomValue = function (text) {
            _this.customSelected.emit(text);
            _this.hideAutoCompleteDropdown();
            setTimeout(function () {
                if (_this.reFocusAfterSelect) {
                    _this.inputEl.focus();
                }
                return _this.inputEl;
            });
        };
        this.enterNewText = function (value) {
            _this.renderValue(value);
            _this.ngModelChange.emit(value);
            _this.valueChanged.emit(value);
            _this.hideAutoCompleteDropdown();
        };
        this.keydownEventHandler = function (evt) {
            if (_this.componentRef) {
                var component = _this.componentRef.instance;
                component.inputElKeyHandler(evt);
            }
        };
        this.inputEventHandler = function (evt) {
            if (_this.componentRef) {
                var component = _this.componentRef.instance;
                component.dropdownVisible = true;
                component.keyword = evt.target.value;
                component.reloadListInDelay(evt);
            }
            else {
                _this.showAutoCompleteDropdown();
            }
        };
        this.el = this.viewContainerRef.element.nativeElement;
    }
    NguiAutoCompleteDirective.prototype.ngOnInit = function () {
        var _this = this;
        // Blur event is handled only after a click event. This is to prevent handling of blur events resulting from interacting with a scrollbar
        // introduced by content overflow (Internet explorer issue).
        // See issue description here: http://stackoverflow.com/questions/2023779/clicking-on-a-divs-scroll-bar-fires-the-blur-event-in-ie
        this.documentClickListener = function (e) {
            if (_this.scheduledBlurHandler) {
                _this.scheduledBlurHandler();
                _this.scheduledBlurHandler = null;
            }
        };
        document.addEventListener('click', this.documentClickListener);
        // wrap this element with <div class="ngui-auto-complete">
        this.wrapperEl = document.createElement('div');
        this.wrapperEl.className = 'ngui-auto-complete-wrapper';
        this.wrapperEl.style.position = 'relative';
        this.el.parentElement.insertBefore(this.wrapperEl, this.el.nextSibling);
        this.wrapperEl.appendChild(this.el);
        // Check if we were supplied with a [formControlName] and it is inside a [form]
        // else check if we are supplied with a [FormControl] regardless if it is inside a [form] tag
        if (this.parentForm && this.formControlName) {
            if (this.parentForm['form']) {
                this.formControl = this.parentForm['form'].get(this.formControlName);
            }
            else if (this.parentForm instanceof forms_1.FormGroupName) {
                this.formControl = this.parentForm.control.controls[this.formControlName];
            }
        }
        else if (this.extFormControl) {
            this.formControl = this.extFormControl;
        }
        // apply toString() method for the object
        if (!!this.ngModel) {
            this.selectNewValue(this.ngModel);
        }
        else if (!!this.formControl && this.formControl.value) {
            this.selectNewValue(this.formControl.value);
        }
    };
    NguiAutoCompleteDirective.prototype.ngAfterViewInit = function () {
        var _this = this;
        // if this element is not an input tag, move dropdown after input tag
        // so that it displays correctly
        this.inputEl = this.el.tagName === 'INPUT' ? this.el : this.el.querySelector('input');
        if (this.openOnFocus) {
            this.inputEl.addEventListener('focus', function (e) { return _this.showAutoCompleteDropdown(e); });
        }
        if (this.closeOnFocusOut) {
            this.inputEl.addEventListener('focusout', function (e) { return _this.hideAutoCompleteDropdown(e); });
        }
        if (!this.autocomplete) {
            this.inputEl.setAttribute('autocomplete', 'off');
        }
        this.inputEl.addEventListener('blur', function (e) {
            _this.scheduledBlurHandler = function () {
                return _this.blurHandler(e);
            };
        });
        this.inputEl.addEventListener('keydown', function (e) { return _this.keydownEventHandler(e); });
        this.inputEl.addEventListener('input', function (e) { return _this.inputEventHandler(e); });
    };
    NguiAutoCompleteDirective.prototype.ngOnDestroy = function () {
        if (this.componentRef) {
            this.componentRef.instance.valueSelected.unsubscribe();
            this.componentRef.instance.textEntered.unsubscribe();
        }
        if (this.documentClickListener) {
            document.removeEventListener('click', this.documentClickListener);
        }
    };
    NguiAutoCompleteDirective.prototype.ngOnChanges = function (changes) {
        if (changes['ngModel']) {
            this.ngModel = this.setToStringFunction(changes['ngModel'].currentValue);
            this.renderValue(this.ngModel);
        }
    };
    NguiAutoCompleteDirective.prototype.blurHandler = function (event) {
        if (this.componentRef) {
            var component = this.componentRef.instance;
            if (this.selectOnBlur) {
                component.selectOne(component.filteredList[component.itemIndex]);
            }
            if (this.closeOnFocusOut) {
                this.hideAutoCompleteDropdown(event);
            }
        }
    };
    NguiAutoCompleteDirective.prototype.setToStringFunction = function (item) {
        if (item && typeof item === 'object') {
            var displayVal_1;
            if (typeof this.valueFormatter === 'string') {
                var matches = this.valueFormatter.match(/[a-zA-Z0-9_\$]+/g);
                var formatted_1 = this.valueFormatter;
                if (matches && typeof item !== 'string') {
                    matches.forEach(function (key) {
                        formatted_1 = formatted_1.replace(key, item[key]);
                    });
                }
                displayVal_1 = formatted_1;
            }
            else if (typeof this.valueFormatter === 'function') {
                displayVal_1 = this.valueFormatter(item);
            }
            else if (this.displayPropertyName) {
                displayVal_1 = item[this.displayPropertyName];
            }
            else if (typeof this.listFormatter === 'string' && this.listFormatter.match(/^\w+$/)) {
                displayVal_1 = item[this.listFormatter];
            }
            else {
                displayVal_1 = item.value;
            }
            item.toString = function () { return displayVal_1; };
        }
        return item;
    };
    NguiAutoCompleteDirective.prototype.renderValue = function (item) {
        if (!!this.inputEl) {
            this.inputEl.value = '' + item;
        }
    };
    NguiAutoCompleteDirective.decorators = [
        { type: core_1.Directive, args: [{
                    selector: '[auto-complete], [ngui-auto-complete]'
                },] },
    ];
    /** @nocollapse */
    NguiAutoCompleteDirective.ctorParameters = function () { return [
        { type: core_1.ComponentFactoryResolver },
        { type: core_1.ViewContainerRef },
        { type: forms_1.ControlContainer, decorators: [{ type: core_1.Optional }, { type: core_1.Host }, { type: core_1.SkipSelf }] }
    ]; };
    NguiAutoCompleteDirective.propDecorators = {
        autocomplete: [{ type: core_1.Input, args: ['autocomplete',] }],
        autoCompletePlaceholder: [{ type: core_1.Input, args: ['auto-complete-placeholder',] }],
        source: [{ type: core_1.Input, args: ['source',] }],
        pathToData: [{ type: core_1.Input, args: ['path-to-data',] }],
        minChars: [{ type: core_1.Input, args: ['min-chars',] }],
        displayPropertyName: [{ type: core_1.Input, args: ['display-property-name',] }],
        acceptUserInput: [{ type: core_1.Input, args: ['accept-user-input',] }],
        maxNumList: [{ type: core_1.Input, args: ['max-num-list',] }],
        selectValueOf: [{ type: core_1.Input, args: ['select-value-of',] }],
        loadingTemplate: [{ type: core_1.Input, args: ['loading-template',] }],
        listFormatter: [{ type: core_1.Input, args: ['list-formatter',] }],
        loadingText: [{ type: core_1.Input, args: ['loading-text',] }],
        blankOptionText: [{ type: core_1.Input, args: ['blank-option-text',] }],
        noMatchFoundText: [{ type: core_1.Input, args: ['no-match-found-text',] }],
        valueFormatter: [{ type: core_1.Input, args: ['value-formatter',] }],
        tabToSelect: [{ type: core_1.Input, args: ['tab-to-select',] }],
        selectOnBlur: [{ type: core_1.Input, args: ['select-on-blur',] }],
        matchFormatted: [{ type: core_1.Input, args: ['match-formatted',] }],
        autoSelectFirstItem: [{ type: core_1.Input, args: ['auto-select-first-item',] }],
        openOnFocus: [{ type: core_1.Input, args: ['open-on-focus',] }],
        closeOnFocusOut: [{ type: core_1.Input, args: ['close-on-focusout',] }],
        reFocusAfterSelect: [{ type: core_1.Input, args: ['re-focus-after-select',] }],
        headerItemTemplate: [{ type: core_1.Input, args: ['header-item-template',] }],
        ignoreAccents: [{ type: core_1.Input, args: ['ignore-accents',] }],
        ngModel: [{ type: core_1.Input }],
        formControlName: [{ type: core_1.Input, args: ['formControlName',] }],
        extFormControl: [{ type: core_1.Input, args: ['formControl',] }],
        zIndex: [{ type: core_1.Input, args: ['z-index',] }],
        isRtl: [{ type: core_1.Input, args: ['is-rtl',] }],
        ngModelChange: [{ type: core_1.Output }],
        valueChanged: [{ type: core_1.Output }],
        customSelected: [{ type: core_1.Output }]
    };
    return NguiAutoCompleteDirective;
}());
exports.NguiAutoCompleteDirective = NguiAutoCompleteDirective;
//# sourceMappingURL=auto-complete.directive.js.map

/***/ }),

/***/ "./node_modules/@ngui/auto-complete/dist/auto-complete.js":
/*!****************************************************************!*\
  !*** ./node_modules/@ngui/auto-complete/dist/auto-complete.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var http_1 = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
var operators_1 = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/**
 * provides auto-complete related utility functions
 */
var NguiAutoComplete = /** @class */ (function () {
    function NguiAutoComplete(http) {
        this.http = http;
        // ...
    }
    NguiAutoComplete.prototype.filter = function (list, keyword, matchFormatted, accentInsensitive) {
        var _this = this;
        return accentInsensitive
            ? list.filter(function (el) {
                var objStr = matchFormatted ? _this.getFormattedListItem(el).toLowerCase() : JSON.stringify(el).toLowerCase();
                keyword = keyword.toLowerCase();
                return objStr.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
                    .indexOf(keyword.normalize('NFD').replace(/[\u0300-\u036f]/g, '')) !== -1;
            })
            : list.filter(function (el) {
                var objStr = matchFormatted ? _this.getFormattedListItem(el).toLowerCase() : JSON.stringify(el).toLowerCase();
                keyword = keyword.toLowerCase();
                return objStr.indexOf(keyword) !== -1;
            });
    };
    NguiAutoComplete.prototype.getFormattedListItem = function (data) {
        var formatted;
        var formatter = this.listFormatter || '(id) value';
        if (typeof formatter === 'function') {
            formatted = formatter.apply(this, [data]);
        }
        else if (typeof data !== 'object') {
            formatted = data;
        }
        else if (typeof formatter === 'string') {
            formatted = formatter;
            var matches = formatter.match(/[a-zA-Z0-9_\$]+/g);
            if (matches && typeof data !== 'string') {
                matches.forEach(function (key) {
                    formatted = formatted.replace(key, data[key]);
                });
            }
        }
        return formatted;
    };
    /**
     * return remote data from the given source and options, and data path
     */
    NguiAutoComplete.prototype.getRemoteData = function (keyword) {
        var _this = this;
        if (typeof this.source !== 'string') {
            throw new TypeError('Invalid type of source, must be a string. e.g. http://www.google.com?q=:my_keyword');
        }
        else if (!this.http) {
            throw new Error('Http is required.');
        }
        var matches = this.source.match(/:[a-zA-Z_]+/);
        if (matches === null) {
            throw new Error('Replacement word is missing.');
        }
        var replacementWord = matches[0];
        var url = this.source.replace(replacementWord, keyword);
        return this.http.get(url)
            .pipe(operators_1.map(function (list) {
            if (_this.pathToData) {
                var paths = _this.pathToData.split('.');
                paths.forEach(function (prop) { return list = list[prop]; });
            }
            return list;
        }));
    };
    NguiAutoComplete.decorators = [
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    NguiAutoComplete.ctorParameters = function () { return [
        { type: http_1.HttpClient, decorators: [{ type: core_1.Optional }] }
    ]; };
    return NguiAutoComplete;
}());
exports.NguiAutoComplete = NguiAutoComplete;
//# sourceMappingURL=auto-complete.js.map

/***/ }),

/***/ "./node_modules/@ngui/auto-complete/dist/auto-complete.module.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@ngui/auto-complete/dist/auto-complete.module.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var common_1 = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
var forms_1 = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
var auto_complete_component_1 = __webpack_require__(/*! ./auto-complete.component */ "./node_modules/@ngui/auto-complete/dist/auto-complete.component.js");
var auto_complete_directive_1 = __webpack_require__(/*! ./auto-complete.directive */ "./node_modules/@ngui/auto-complete/dist/auto-complete.directive.js");
var auto_complete_1 = __webpack_require__(/*! ./auto-complete */ "./node_modules/@ngui/auto-complete/dist/auto-complete.js");
var NguiAutoCompleteModule = /** @class */ (function () {
    function NguiAutoCompleteModule() {
    }
    NguiAutoCompleteModule.forRoot = function () {
        return {
            ngModule: NguiAutoCompleteModule,
            providers: [auto_complete_1.NguiAutoComplete]
        };
    };
    NguiAutoCompleteModule.decorators = [
        { type: core_1.NgModule, args: [{
                    imports: [common_1.CommonModule, forms_1.FormsModule],
                    declarations: [auto_complete_component_1.NguiAutoCompleteComponent, auto_complete_directive_1.NguiAutoCompleteDirective],
                    exports: [auto_complete_component_1.NguiAutoCompleteComponent, auto_complete_directive_1.NguiAutoCompleteDirective],
                    entryComponents: [auto_complete_component_1.NguiAutoCompleteComponent]
                },] },
    ];
    return NguiAutoCompleteModule;
}());
exports.NguiAutoCompleteModule = NguiAutoCompleteModule;
//# sourceMappingURL=auto-complete.module.js.map

/***/ }),

/***/ "./node_modules/@ngui/auto-complete/dist/index.js":
/*!********************************************************!*\
  !*** ./node_modules/@ngui/auto-complete/dist/index.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var auto_complete_1 = __webpack_require__(/*! ./auto-complete */ "./node_modules/@ngui/auto-complete/dist/auto-complete.js");
exports.NguiAutoComplete = auto_complete_1.NguiAutoComplete;
var auto_complete_module_1 = __webpack_require__(/*! ./auto-complete.module */ "./node_modules/@ngui/auto-complete/dist/auto-complete.module.js");
exports.NguiAutoCompleteModule = auto_complete_module_1.NguiAutoCompleteModule;
var auto_complete_component_1 = __webpack_require__(/*! ./auto-complete.component */ "./node_modules/@ngui/auto-complete/dist/auto-complete.component.js");
exports.NguiAutoCompleteComponent = auto_complete_component_1.NguiAutoCompleteComponent;
var auto_complete_directive_1 = __webpack_require__(/*! ./auto-complete.directive */ "./node_modules/@ngui/auto-complete/dist/auto-complete.directive.js");
exports.NguiAutoCompleteDirective = auto_complete_directive_1.NguiAutoCompleteDirective;
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/ngx-wig/ngx-wig.umd.js":
/*!*********************************************!*\
  !*** ./node_modules/ngx-wig/ngx-wig.umd.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

(function (global, factory) {
	 true ? factory(exports, __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js"), __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js"), __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js")) :
	undefined;
}(this, (function (exports,core,common,forms) { 'use strict';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var NgxWigToolbarService = (function () {
    function NgxWigToolbarService() {
        this._buttonLibrary = {
            list1: { title: 'Unordered List', command: 'insertunorderedlist', styleClass: 'list-ul' },
            list2: { title: 'Ordered List', command: 'insertorderedlist', styleClass: 'list-ol' },
            bold: { title: 'Bold', command: 'bold', styleClass: 'bold' },
            italic: { title: 'Italic', command: 'italic', styleClass: 'italic' },
            link: { title: 'Link', command: 'createlink', styleClass: 'link' },
            underline: { title: 'Underline', command: 'underline', styleClass: 'format-underlined' }
        };
        this._defaultButtonsList = ['list1', 'list2', 'bold', 'italic', 'link'];
    }
    /**
     * @param {?} buttons
     * @return {?}
     */
    NgxWigToolbarService.prototype.setButtons = /**
     * @param {?} buttons
     * @return {?}
     */
    function (buttons) {
        // if(!angular.isArray(buttons)) {
        //   throw 'Argument "buttons" should be an array';
        // }
        this._defaultButtonsList = buttons;
    };
    
    /**
     * @param {?} name
     * @param {?} title
     * @param {?} command
     * @param {?} styleClass
     * @return {?}
     */
    NgxWigToolbarService.prototype.addStandardButton = /**
     * @param {?} name
     * @param {?} title
     * @param {?} command
     * @param {?} styleClass
     * @return {?}
     */
    function (name, title, command, styleClass) {
        if (!name || !title || !command) {
            throw 'Arguments "name", "title" and "command" are required';
        }
        styleClass = styleClass || '';
        this._buttonLibrary[name] = { title: title, command: command, styleClass: styleClass };
        this._defaultButtonsList.push(name);
    };
    /**
     * @param {?} name
     * @param {?} pluginName
     * @return {?}
     */
    NgxWigToolbarService.prototype.addCustomButton = /**
     * @param {?} name
     * @param {?} pluginName
     * @return {?}
     */
    function (name, pluginName) {
        if (!name || !pluginName) {
            throw 'Arguments "name" and "pluginName" are required';
        }
        this._buttonLibrary[name] = { pluginName: pluginName, isComplex: true };
        this._defaultButtonsList.push(name);
    };
    /**
     * @param {?=} buttonsList
     * @return {?}
     */
    NgxWigToolbarService.prototype.getToolbarButtons = /**
     * @param {?=} buttonsList
     * @return {?}
     */
    function (buttonsList) {
        var _this = this;
        var /** @type {?} */ buttons = this._defaultButtonsList;
        var /** @type {?} */ toolbarButtons = [];
        if (typeof buttonsList !== 'undefined') {
            buttons = string2array(buttonsList);
        }
        buttons.forEach(function (buttonKey) {
            if (!buttonKey) {
                return;
            }
            if (!_this._buttonLibrary[buttonKey]) {
                throw 'There is no "' + buttonKey + '" in your library. Possible variants: ' + Object.keys(_this._buttonLibrary);
            }
            var /** @type {?} */ button = Object.assign({}, _this._buttonLibrary[buttonKey]);
            // button.isActive = () => {return !!this.command && document.queryCommandState(this.command);}
            toolbarButtons.push(button);
        });
        return toolbarButtons;
    };
    return NgxWigToolbarService;
}());
/**
 * @param {?} keysString
 * @return {?}
 */
function string2array(keysString) {
    return keysString.split(',').map(Function.prototype.call, String.prototype.trim);
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var NgxWigComponent = (function () {
    function NgxWigComponent(_ngWigToolbarService) {
        this._ngWigToolbarService = _ngWigToolbarService;
        this.isSourceModeAllowed = false;
        this.contentChange = new core.EventEmitter();
        this.editMode = false;
        this.toolbarButtons = [];
        this.hasFocus = false;
        this.propagateChange = function (_) { };
        this.propagateTouched = function () { };
        // hardcoded icons theme for now
        this.iconsTheme = "nw-button-mdi";
    }
    /**
     * @return {?}
     */
    NgxWigComponent.prototype.toggleEditMode = /**
     * @return {?}
     */
    function () {
        this.editMode = !this.editMode;
    };
    /**
     * @param {?} command
     * @param {?} options
     * @return {?}
     */
    NgxWigComponent.prototype.execCommand = /**
     * @param {?} command
     * @param {?} options
     * @return {?}
     */
    function (command, options) {
        if (this.editMode) {
            return false;
        }
        if (document.queryCommandSupported && !document.queryCommandSupported(command)) {
            throw 'The command "' + command + '" is not supported';
        }
        if (command === 'createlink' || command === 'insertImage') {
            options = window.prompt('Please enter the URL', 'http://');
            if (!options) {
                return;
            }
        }
        this.container.focus();
        // use insertHtml for `createlink` command to account for IE/Edge purposes, in case there is no selection
        var /** @type {?} */ selection = document.getSelection().toString();
        if (command === 'createlink' && selection === '') {
            document.execCommand('insertHtml', false, '<a href="' + options + '">' + options + '</a>');
        }
        else {
            document.execCommand(command, false, options);
        }
        this.onContentChange(this.container.innerHTML);
    };
    /**
     * @return {?}
     */
    NgxWigComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.toolbarButtons = this._ngWigToolbarService.getToolbarButtons(this.buttons);
        this.container = this.ngxWigEditable.nativeElement;
        if (this.content) {
            this.container.innerHTML = this.content;
        }
    };
    /**
     * @param {?} newContent
     * @return {?}
     */
    NgxWigComponent.prototype.onContentChange = /**
     * @param {?} newContent
     * @return {?}
     */
    function (newContent) {
        this.content = newContent;
        this.contentChange.emit(this.content);
        this.propagateChange(this.content);
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    NgxWigComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        if (this.container && changes['content']) {
            // clear the previous content
            this.container.innerHTML = '';
            // add the new content
            this.pasteHtmlAtCaret(changes['content'].currentValue);
        }
    };
    /**
     * @param {?} newContent
     * @return {?}
     */
    NgxWigComponent.prototype.onTextareaChange = /**
     * @param {?} newContent
     * @return {?}
     */
    function (newContent) {
        // model -> view
        this.container.innerHTML = newContent;
        this.onContentChange(newContent);
    };
    /**
     * @param {?} value
     * @return {?}
     */
    NgxWigComponent.prototype.writeValue = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        if (!value) {
            value = '';
        }
        this.container.innerHTML = value;
        this.onContentChange(value);
    };
    /**
     * @return {?}
     */
    NgxWigComponent.prototype.shouldShowPlaceholder = /**
     * @return {?}
     */
    function () {
        return this.placeholder
            && !this.container.innerText;
    };
    /**
     * @param {?} html
     * @return {?}
     */
    NgxWigComponent.prototype.pasteHtmlAtCaret = /**
     * @param {?} html
     * @return {?}
     */
    function (html) {
        var /** @type {?} */ sel, /** @type {?} */ range;
        if (window.getSelection) {
            sel = window.getSelection();
            if (sel.getRangeAt && sel.rangeCount) {
                range = sel.getRangeAt(0);
                range.deleteContents();
                // append the content in a temporary div
                var /** @type {?} */ el = document.createElement('div');
                el.innerHTML = html;
                var /** @type {?} */ frag = document.createDocumentFragment(), /** @type {?} */ node = void 0, /** @type {?} */ lastNode = void 0;
                while ((node = el.firstChild)) {
                    lastNode = frag.appendChild(node);
                }
                range.insertNode(frag);
                // Preserve the selection
                if (lastNode) {
                    range = range.cloneRange();
                    range.setStartAfter(lastNode);
                    range.collapse(true);
                    sel.removeAllRanges();
                    sel.addRange(range);
                }
            }
        }
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    NgxWigComponent.prototype.registerOnChange = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.propagateChange = fn;
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    NgxWigComponent.prototype.registerOnTouched = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.propagateTouched = fn;
    };
    /**
     * @return {?}
     */
    NgxWigComponent.prototype.onBlur = /**
     * @return {?}
     */
    function () {
        this.hasFocus = false;
        this.propagateTouched();
    };
    /**
     * @param {?} isDisabled
     * @return {?}
     */
    NgxWigComponent.prototype.setDisabledState = /**
     * @param {?} isDisabled
     * @return {?}
     */
    function (isDisabled) {
        this.disabled = isDisabled;
    };
    NgxWigComponent.decorators = [
        { type: core.Component, args: [{
                    selector: 'ngx-wig',
                    template: "<div class=\"ng-wig\"> <ul *ngIf=\"toolbarButtons.length\" class=\"nw-toolbar\"> <li *ngFor=\"let button of toolbarButtons\" class=\"nw-toolbar__item\"> <div *ngIf=\"!button.isComplex\"> <button type=\"button\" class=\"nw-button\" [ngClass]=\"[button.styleClass, iconsTheme]\" [title]=\"button.title\" (click)=\"execCommand(button.command)\" [disabled]=\"disabled\" tabindex=\"-1\"> {{ button.title }} </button> </div> </li><!-- --><li class=\"nw-toolbar__item\"> <button type=\"button\" class=\"nw-button nw-button--source\" title=\"Edit HTML\" [class.nw-button--active] = \"editMode\" [ngClass]=\"iconsTheme\" *ngIf=\"isSourceModeAllowed\" (click)=\"toggleEditMode()\" [disabled]=\"disabled\" tabindex=\"-1\"> Edit HTML </button> </li> </ul> <div class=\"nw-editor-container\" (click)=\"container.focus()\" [ngClass]=\"{ 'nw-editor-container--with-toolbar': toolbarButtons.length }\"> <div *ngIf=\"editMode\" class=\"nw-editor__src-container\"> <textarea [ngModel]=\"content\" (ngModelChange)=\"onTextareaChange($event)\" (blur)=\"propagateTouched()\" class=\"nw-editor__src\"> </textarea> </div> <div class=\"nw-editor\" [ngClass]=\"{ 'nw-disabled': disabled,'nw-invisible': editMode }\"> <div *ngIf=\"shouldShowPlaceholder()\" class=\"nw-editor__placeholder\" [innerText]=\"placeholder\"> </div> <div #ngWigEditable class=\"nw-editor__res\" [attr.contenteditable]=\"!disabled\" [ngClass]=\"{ disabled: disabled}\" (focus)=\"hasFocus = true\" (blur)=\"onBlur()\" (input)=\"onContentChange(ngWigEditable.innerHTML)\"><!-- --></div> </div> </div> </div> ",
                    styles: ["/* -------- NG-WIG -------- */ /** * *  RESET BOX MODEL * */ .ng-wig, [class^=\"nw-\"] { -webkit-box-sizing: border-box; -moz-box-sizing: border-box; -o-box-sizing: border-box; -ms-box-sizing: border-box; box-sizing: border-box; } /** *   main wrapper for the editor * *  .ngx-wig * */ .ng-wig { display: block; padding: 0; margin: 0; } /** *  styling for toolbar and its items * *  .nw-toolbar *    &__item * */ .nw-toolbar { display: block; margin: 0; padding: 0; list-style: none; font-size: 12px; color: #6B7277; background: -webkit-linear-gradient(90deg, #ffffff 0%, #f9f9f9 100%); background: -moz-linear-gradient(90deg, #ffffff 0%, #f9f9f9 100%); background: linear-gradient(180deg, #ffffff 0%, #f9f9f9 100%); border: 1px solid #CCCCCC; border-radius: 3px 3px 0 0; } .nw-toolbar__item { display: inline-block; vertical-align: top; margin: 0; border-right: 1px solid #DEDEDE; } .nw-toolbar label { line-height: 30px; display: inline-block; padding: 0 6px 0 3px; } .nw-toolbar input[type=checkbox] { vertical-align: -3px; margin-right: -1px; } /** *  styling for the editor part: source code (original textarea) and resulting div * *  .nw-editor *    &__src *    &__res * */ .nw-editor { /* Default when height is not set */ display: block; position: relative; height: 300px; background: #fff; cursor: text; width: 100%; overflow-y: auto; } .nw-editor-container { border: 1px solid #CCCCCC; border-radius: 0 0 3px 3px; position: relative; } .nw-editor-container--with-toolbar { border-top: none; } .nw-editor__res { display: block; min-height: 100%; padding: 1px 8px; } .nw-editor__placeholder { display: block; position: absolute; padding: 1px 8px; color: lightgray; width: 100%; } .nw-editor__src, .nw-editor__res { width: 100%; outline: none; box-sizing: border-box; border: none; margin: 0; } .nw-editor__res.disabled { opacity: 0.5; } .nw-editor__src-container { position: absolute; left: 0; top: 0; right: 0; bottom: 0; } .nw-editor__src { height: 100%; resize: none; padding: 1px 8px; } .nw-editor--fixed .nw-editor { display: block; overflow-y: auto; } .nw-editor--fixed .nw-editor__res { padding: 1px 8px; display: block; } .nw-invisible { visibility: hidden; } .nw-editor--fixed .nw-invisible { display: none; } .nw-editor.nw-disabled { cursor: default; } /** *  styling for toolbar button, has two modifiers: active and type of icon for background * *  .nw-button *    &--active *    &--{button type} * */ .nw-button { -webkit-appearance: none; -moz-appearance: none; appearance: none; display: block; width: 30px; height: 30px; margin: 0; padding: 0; opacity: 0.5; line-height: 30px; background-color: transparent; background-position: center center; background-repeat: no-repeat; border: none; border-radius: 2px; font-size: 0; cursor: pointer; } .nw-button-fa:before { font-size: 12px; font-family: FontAwesome; } .nw-button-fa.bold:before { content: '\\f032'; } .nw-button-fa.italic:before { content: '\\f033'; } .nw-button-fa.list-ul:before { content: '\\f0ca'; } .nw-button-fa.list-ol:before { content: '\\f0cb'; } .nw-button-fa.link:before { content: '\\f0c1'; } .nw-button-fa.format-underlined:before { content: '\\f0cd'; } .nw-button-fa.font-color:before { content: '\\f031'; } .nw-button-fa.nw-button--source:before { content: '\\f040'; } .nw-button-fa.clear-styles:before { content: '\\f12d'; } .nw-button-mdi:before { vertical-align: middle; font-size: 14px; font-family: \"Material Design Icons\"; } .nw-button-mdi.bold:before { content: '\\f264'; } .nw-button-mdi.italic:before { content: '\\f277'; } .nw-button-mdi.list-ul:before { content: '\\f279'; } .nw-button-mdi.list-ol:before { content: '\\f27B'; } .nw-button-mdi.link:before { content: '\\f339'; } .nw-button-mdi.format-underlined:before { content: '\\f287'; } .nw-button-mdi.font-color:before { content: '\\f6D5'; } .nw-button-mdi.nw-button--source:before { content: '\\f3EB'; } .nw-button-mdi.clear-styles:before { content: '\\f1fE'; } .nw-button:focus { outline: none; } .nw-button:hover, .nw-button.nw-button--active { opacity: 1 } .nw-button--active { background-color: #EEEEEE; } .nw-button:disabled { cursor: default; } .nw-button:disabled:hover { opacity: 0.5; } /** *  styling & formatting of content inside contenteditable div * *  .nw-content * */ .nw-content { padding: 12px; margin: 0; font-family: sans-serif; font-size: 14px; line-height: 24px; } .nw-select { height: 30px; padding: 6px; color: #555; background-color: inherit; border: 0; } .nw-select:disabled { opacity: 0.5; } .nw-select:focus { outline: none; } .nw-button:focus { border-color: lightgray; border-style: solid; } [contenteditable]:empty:before { content: attr(placeholder); color: grey; display: inline-block; } "],
                    providers: [
                        NgxWigToolbarService,
                        {
                            provide: forms.NG_VALUE_ACCESSOR,
                            useExisting: core.forwardRef(function () { return NgxWigComponent; }),
                            multi: true
                        }
                    ],
                    encapsulation: core.ViewEncapsulation.None
                },] },
    ];
    /** @nocollapse */
    NgxWigComponent.ctorParameters = function () { return [
        { type: NgxWigToolbarService, },
    ]; };
    NgxWigComponent.propDecorators = {
        "content": [{ type: core.Input },],
        "placeholder": [{ type: core.Input },],
        "buttons": [{ type: core.Input },],
        "disabled": [{ type: core.Input },],
        "isSourceModeAllowed": [{ type: core.Input },],
        "contentChange": [{ type: core.Output },],
        "ngxWigEditable": [{ type: core.ViewChild, args: ['ngWigEditable',] },],
    };
    return NgxWigComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var NgxWigModule = (function () {
    function NgxWigModule() {
    }
    NgxWigModule.decorators = [
        { type: core.NgModule, args: [{
                    imports: [
                        common.CommonModule,
                        forms.FormsModule,
                        forms.ReactiveFormsModule
                    ],
                    declarations: [
                        NgxWigComponent,
                    ],
                    exports: [
                        NgxWigComponent,
                    ],
                    providers: [NgxWigToolbarService]
                },] },
    ];
    return NgxWigModule;
}());

exports.NgxWigModule = NgxWigModule;
exports.NgxWigComponent = NgxWigComponent;
exports.NgxWigToolbarService = NgxWigToolbarService;

Object.defineProperty(exports, '__esModule', { value: true });

})));


/***/ }),

/***/ "./src/mobile-app/pages/news/components/content/content.component.css":
/*!****************************************************************************!*\
  !*** ./src/mobile-app/pages/news/components/content/content.component.css ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".font-size{\r\n    font-size:12px;\r\n}\r\n.seen{\r\n    color:green;\r\n}\r\n.received{\r\n    color: red;\r\n}\r\n.newsText{\r\n  color: #007bff;\r\n}\r\n.newsSubject{\r\n  color: #28a745;\r\n}\r\n.html-binder .ql-editor{\r\n    border: 0;\r\n}"

/***/ }),

/***/ "./src/mobile-app/pages/news/components/content/content.component.html":
/*!*****************************************************************************!*\
  !*** ./src/mobile-app/pages/news/components/content/content.component.html ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<i class=\"fa fa-window-close \" size=\"3x\" mat-raised-button (click)=\"onNoClick()\">&nbsp;</i>\r\n<mat-card>\r\n  <mat-card-header>\r\n    <mat-card-title class=\"newsSubject\">\r\n      <b>موضوع:{{data.newsData.subject}}</b>\r\n    </mat-card-title>\r\n  </mat-card-header>\r\n  <mat-card-header>\r\n    <mat-card-title>\r\n      <!--<mat-expansion-panel *ngIf=\"data.type=='outbox'\">-->\r\n      <!--<mat-expansion-panel-header>-->\r\n      <!--<mat-panel-title>-->\r\n      گیرندگان\r\n      <!--</mat-panel-title>-->\r\n      <!--</mat-expansion-panel-header>-->\r\n      <div class=\"font-size\">\r\n        <div *ngFor=\"let d of data.newsData.userNews\">\r\n          <div *ngIf=\"d.seen_time!=null && d.receiver_time!=null\" class=\"seen\">\r\n            <p>\r\n              {{d.receiver.firstname}} {{d.receiver.lastname}} {{usersService.getUserPosition(d.receiver.id)}} (زمان رسیدن به دست گیرنده:{{d.receiver_time|\r\n              jalali}}) (زمان خواندن خبر:{{d.seen_time| jalali}})\r\n            </p>\r\n          </div>\r\n          <div *ngIf=\"d.seen_time==null\">\r\n            <p>\r\n              {{d.receiver.firstname}} {{d.receiver.lastname}} {{usersService.getUserPosition(d.receiver.id)}} (خوانده نشده)\r\n            </p>\r\n          </div>\r\n        </div>\r\n      </div>\r\n      <!--</mat-expansion-panel>-->\r\n      <div *ngIf=\"data.type=='inbox'\" class=\"font-size\">\r\n        فرستنده:{{data.newsData.sender.firstname}} {{data.newsData.sender.lastname}} {{usersService.getUserPosition(data.newsData.sender.id)}}\r\n      </div>\r\n      <br>\r\n      <mat-divider></mat-divider>\r\n      <br>\r\n    </mat-card-title>\r\n    <mat-card-subtitle>\r\n      <div *ngIf=\"data.type=='outbox'\">\r\n        <div>زمان ارسال:{{data.newsData.sender_time | jalali}}</div>\r\n      </div>\r\n      <div *ngIf=\"data.type=='inbox'\"> \r\n        <div>زمان ارسال:{{data.newsData.sender_time | jalali}}</div>\r\n        <!-- <div *ngIf=\"data.newsData.receiver_time!=null\">زمان رسیدن به دست گیرنده:{{data.newsData.receiver_time | jalali}}</div>\r\n        <div *ngIf=\"data.newsData.seen_time!=null\">زمان خواندن خبر:{{data.newsData.seen_time | jalali}}</div>\r\n        <div *ngIf=\"data.newsData.seen_time==null\">زمان خواندن خبر: خوانده نشده</div> -->\r\n      </div>\r\n    </mat-card-subtitle>\r\n    <mat-card-subtitle>\r\n      منبع: {{data.newsData.sourceNews.name}}\r\n    </mat-card-subtitle>\r\n    <mat-card-subtitle>\r\n      اهمیت: {{data.newsData.importantNews.name}}\r\n    </mat-card-subtitle>\r\n    <mat-card-subtitle>\r\n      فوریت: {{data.newsData.urgentNews.name}}\r\n    </mat-card-subtitle>\r\n    <mat-card-subtitle>\r\n      طبقه بندی: {{data.newsData.archiveNews.name}}\r\n    </mat-card-subtitle>\r\n  </mat-card-header>\r\n  <mat-divider></mat-divider>\r\n  <br>\r\n  <mat-card-content class=\"html-binder\">\r\n    <div >متن خبر:\r\n      <!-- <h6 [innerHTML]=\"data.newsData.text\"></h6> -->\r\n      <quill-editor\r\n      [modules]='{toolbar: false}'\r\n       [readOnly]=\"true\"\r\n       [style]=\"{height: '150px'}\"\r\n        dir=\"rtl\"\r\n         [(ngModel)]=\"data.newsData.text\"\r\n      >\r\n        </quill-editor>\r\n    </div>\r\n    <div *ngIf=\"data.newsData.localAttachment\">الصاقیات:\r\n      <div *ngFor=\"let localAttachment of data.newsData.localAttachment \">\r\n        <a target=\"blank\" href=\"{{downloadBaseUrl + localAttachment}}\">{{localAttachment}}</a>\r\n      </div>\r\n    </div>\r\n  </mat-card-content>\r\n  <mat-card-footer></mat-card-footer>\r\n</mat-card>"

/***/ }),

/***/ "./src/mobile-app/pages/news/components/content/content.component.ts":
/*!***************************************************************************!*\
  !*** ./src/mobile-app/pages/news/components/content/content.component.ts ***!
  \***************************************************************************/
/*! exports provided: ContentComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ContentComponent", function() { return ContentComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var src_services_news_news_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/services/news/news.service */ "./src/services/news/news.service.ts");
/* harmony import */ var src_services_config_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/services/config.service */ "./src/services/config.service.ts");
/* harmony import */ var _services_users_users_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../../services/users/users.service */ "./src/services/users/users.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (undefined && undefined.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};





var ContentComponent = /** @class */ (function () {
    function ContentComponent(newsService, configService, dialogRef, data, usersService) {
        this.newsService = newsService;
        this.configService = configService;
        this.dialogRef = dialogRef;
        this.data = data;
        this.usersService = usersService;
    }
    ContentComponent.prototype.onNoClick = function () {
        this.dialogRef.close();
    };
    ContentComponent.prototype.ngOnInit = function () {
        this.downloadBaseUrl = this.configService.localVariables.baseUrl + '/message/download/';
        if (this.data.newsData.attachment)
            this.data.newsData['localAttachment'] = this.data.newsData.attachment.split(",");
    };
    ContentComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'mobile-app-content',
            template: __webpack_require__(/*! ./content.component.html */ "./src/mobile-app/pages/news/components/content/content.component.html"),
            styles: [__webpack_require__(/*! ./content.component.css */ "./src/mobile-app/pages/news/components/content/content.component.css")]
        }),
        __param(3, Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"])(_angular_material__WEBPACK_IMPORTED_MODULE_1__["MAT_DIALOG_DATA"])),
        __metadata("design:paramtypes", [src_services_news_news_service__WEBPACK_IMPORTED_MODULE_2__["NewsService"],
            src_services_config_service__WEBPACK_IMPORTED_MODULE_3__["ConfigService"],
            _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatDialogRef"], Object, _services_users_users_service__WEBPACK_IMPORTED_MODULE_4__["UsersService"]])
    ], ContentComponent);
    return ContentComponent;
}());



/***/ }),

/***/ "./src/mobile-app/pages/news/components/crud/crud.component.css":
/*!**********************************************************************!*\
  !*** ./src/mobile-app/pages/news/components/crud/crud.component.css ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".sender{\r\n    /* min-width: 150px; */\r\n    /* max-width: 500px; */\r\n    /* width: 100%; */\r\n}\r\n\r\n.sender-full-width{\r\n    /* width: 100%; */\r\n}\r\n\r\n.titr{\r\n    text-align: center;\r\n    font-weight: bold;\r\n\r\n}\r\n\r\n.titrCard{\r\n    position: static;\r\n    background-color: rgba(244,168,54,0.1)\r\n\r\n   }\r\n\r\n.newsBox {\r\n\r\n    overflow-y: auto\r\n  }\r\n\r\nform{\r\n    overflow:scroll;\r\n    overflow-x:hidden;\r\n  }\r\n\r\n.sendBtn{\r\n    /* color: orange; */\r\n    background-color: rgba(0, 0, 0, 0.7);\r\n    margin: 0 5px;\r\n    }\r\n\r\n.draftBtn{\r\n        margin: 0 5px;\r\n        background-color: orange;\r\n    }\r\n\r\n.receiverBox{\r\n      width: 200px;\r\n  }\r\n\r\nmat-card{\r\n    background-color: #f0f8ff00\r\n  }\r\n\r\ndiv{\r\n      text-align: right\r\n  }\r\n\r\ndiv .ql-editor .ql-blank{\r\n      text-align: right\r\n  }\r\n\r\n.ql-editor.ql-blank {\r\n    text-align: center !important;\r\n}"

/***/ }),

/***/ "./src/mobile-app/pages/news/components/crud/crud.component.html":
/*!***********************************************************************!*\
  !*** ./src/mobile-app/pages/news/components/crud/crud.component.html ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<form class=\"newsBox\" (ngSubmit)=\"send()\">\r\n  <div class=\"mainForm\">\r\n    <mat-card-content>\r\n      <mat-card>\r\n        <p>\r\n          <label (click)=\"openReceiversDialog()\">انتخاب گیرندگان*</label>\r\n          <i class=\"fa fa-address-book-o \" size=\"2x\" (click)=\"openReceiversDialog()\"> </i>\r\n          <span *ngFor=\"let u of  crudModel.userNews; let i = index\">\r\n            <label>&nbsp;{{u.receiver.firstname}} {{u.receiver.lastname}}&nbsp; {{usersService.getUserPosition(u.receiver.id)}}\r\n            </label>\r\n            <i class=\"fa fa-times\" (click)=\"removeReceivers(u, i)\"></i>\r\n          </span>\r\n        </p>\r\n\r\n        <mat-form-field class=\"col-4\" *ngIf=\"filteredOptions\">\r\n          <input type=\"text\"\r\n                 dir=\"ltr\"\r\n                 matInput\r\n                 aria-label=\"Number\"\r\n                 placeholder=\"منبع خبر*\"\r\n                 [formControl]=\"myControl\"\r\n                 [matAutocomplete]=\"auto\"\r\n          >\r\n          <mat-autocomplete #auto=\"matAutocomplete\" dir=\"ltr\" [displayWith]=\"displayFn\"\r\n                            (optionSelected)=\"initSourceNews($event.option.value)\">\r\n            <mat-option *ngFor=\"let option of filteredOptions | async\" [value]=\"option\">\r\n              {{option['name']}}\r\n            </mat-option>\r\n          </mat-autocomplete>\r\n        </mat-form-field>\r\n\r\n        <mat-form-field class=\"col-2\" *ngIf=\"crudCreator.newsTruth\">\r\n          <mat-select placeholder=\"صحت خبر*\" [(value)]=\"crudModel.newsTruth.id\">\r\n            <mat-option *ngFor=\"let newsTruth of crudCreator.newsTruth\" [value]=\"newsTruth.id\">\r\n              {{newsTruth.name}}\r\n            </mat-option>\r\n          </mat-select>\r\n        </mat-form-field>\r\n        <mat-form-field class=\"col-2\" *ngIf=\"crudCreator.urgentNews\">\r\n          <mat-select placeholder=\"فوریت خبر*\" [(value)]=\"crudModel.urgentNews.id\">\r\n            <mat-option *ngFor=\"let urgentNews of crudCreator.urgentNews\" [ngClass]=\"\r\n  (urgentNews.id && urgentNews.id==1) ? 'danger' : 'light'&&\r\n  (urgentNews.id && urgentNews.id==2) ? 'warning' : 'light'&&\r\n  (urgentNews.id && urgentNews.id==3) ? 'success' : 'light'\" [value]=\"urgentNews.id\">\r\n              {{urgentNews.name}}\r\n            </mat-option>\r\n          </mat-select>\r\n        </mat-form-field>\r\n        <mat-form-field class=\"col-2\" *ngIf=\"crudCreator.importantNews\">\r\n          <mat-select placeholder=\"اهمیت خبر*\" [(value)]=\"crudModel.importantNews.id\">\r\n            <mat-option *ngFor=\"let crudItems of crudCreator.importantNews\" [value]=\"crudItems.id\">\r\n              {{crudItems.name}}\r\n            </mat-option>\r\n          </mat-select>\r\n        </mat-form-field>\r\n        <mat-form-field class=\"col-2\" *ngIf=\"crudCreator.archiveNews\">\r\n          <mat-select placeholder=\"طبقه بندی*\" [(value)]=\"crudModel.archiveNews.id\">\r\n            <mat-option *ngFor=\"let crudItems of crudCreator.archiveNews\" [value]=\"crudItems.id\">\r\n              {{crudItems.name}}\r\n            </mat-option>\r\n          </mat-select>\r\n        </mat-form-field>\r\n      </mat-card>\r\n      <mat-divider></mat-divider>\r\n\r\n      <mat-divider></mat-divider>\r\n      <!--<mat-card>-->\r\n\r\n      <!--</mat-card>-->\r\n      <mat-card>\r\n        <mat-form-field class=\"sender-full-width col-6\">\r\n          <input name=\"subject\" matInput placeholder=\"موضوع*\" #newsSubject=\"ngModel\" [(ngModel)]=\"crudModel.subject\">\r\n        </mat-form-field>\r\n        <p class=\"myEditor\">\r\n          <quill-editor [modules]='textEditorModule' [style]=\"{height: '200px'}\" dir=\"rtl\" placeholder=\"درج خبر...\"\r\n                        name=\"newsText\" [(ngModel)]=\"crudModel.text\"></quill-editor>\r\n        </p>\r\n      </mat-card>\r\n    </mat-card-content>\r\n    <button class=\"fa fa-space-shuttle sendBtn\" mat-raised-button type=\"submit\" color=\"primary\"> ارسال خبر</button>\r\n    <label class=\"draftBtn btn btn-orange\" (click)=\"saveAsDraft()\" color=\"orange\">\r\n      <span class=\"fa fa-save \"></span> ذخیره در پیش نویس ها\r\n    </label>\r\n    <label for=\"uploadFile\" class=\"float-left\">\r\n      <fa for=\"uploadFile\" name=\"fas fa-paperclip\" class=float-left size=\"2x\">send</fa>\r\n    </label>\r\n    <div *ngIf=\"crudModel.localAttachment\">\r\n      <div *ngFor=\"let localAttachment of crudModel.localAttachment;let i = index\">{{localAttachment}}</div>\r\n      <i class=\"fa fa-times\" (click)=\"removeReceivers(u, i)\"></i>\r\n    </div>\r\n  </div>\r\n</form>\r\n<input type=\"file\" (change)=\"fileChange($event)\" placeholder=\"Upload file\" id=\"uploadFile\" class=\"d-none\">\r\n"

/***/ }),

/***/ "./src/mobile-app/pages/news/components/crud/crud.component.ts":
/*!*********************************************************************!*\
  !*** ./src/mobile-app/pages/news/components/crud/crud.component.ts ***!
  \*********************************************************************/
/*! exports provided: CrudComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CrudComponent", function() { return CrudComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_config_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../services/config.service */ "./src/services/config.service.ts");
/* harmony import */ var _services_news_news_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../services/news/news.service */ "./src/services/news/news.service.ts");
/* harmony import */ var src_services_users_users_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/services/users/users.service */ "./src/services/users/users.service.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _services_messages_messages_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../../services/messages/messages.service */ "./src/services/messages/messages.service.ts");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _multi_select_multi_select_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../multi-select/multi-select.component */ "./src/mobile-app/pages/news/components/multi-select/multi-select.component.ts");
/* harmony import */ var src_services_socket_socket_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/services/socket/socket.service */ "./src/services/socket/socket.service.ts");
/* harmony import */ var _dashboard_dashboard_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../dashboard/dashboard.component */ "./src/mobile-app/pages/dashboard/dashboard.component.ts");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};













var CrudComponent = /** @class */ (function () {
    // @ViewChild('subject') subjectt;
    function CrudComponent(newsService, dashboard, usersService, formBuilder, messagesService, dialog, socket, configService) {
        this.newsService = newsService;
        this.dashboard = dashboard;
        this.usersService = usersService;
        this.formBuilder = formBuilder;
        this.messagesService = messagesService;
        this.dialog = dialog;
        this.socket = socket;
        this.configService = configService;
        this.myControl = new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"]();
        this.textEditorModule = this.configService.textEditorModule;
        this.composeForm = formBuilder.group({
            username: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required],
            password: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required]
        });
    }
    CrudComponent.prototype._filter = function (value) {
        return this.crudCreator.sourceNews.filter(function (option) { return option.name.includes(value); });
    };
    CrudComponent.prototype.ngOnInit = function () {
        this.crudCreator = {};
        this.crudCreator.receivers = [];
        this.crudModel = {};
        this.crudModel.sourceNews = {};
        this.crudModel.importantNews = {};
        this.crudModel.urgentNews = {};
        this.crudModel.newsTruth = {};
        this.crudModel.archiveNews = {};
        // this.crudModel.userNews = [];
        this.getReceivers();
        this.getSourceNews();
        if (this.crudModelData)
            this.crudModel = this.crudModelData;
        var activeUserInfo = this.usersService.getUserInfo();
        this.currentUserId = activeUserInfo.id;
        this.currentUserFullName = activeUserInfo.firstname + activeUserInfo.lastname;
    };
    CrudComponent.prototype.ngOnDestroy = function () {
        var myForm = this.crudModel;
        if (myForm.sourceNews.id != null ||
            myForm.userNews != null ||
            myForm.newsTruth.id != null ||
            myForm.urgentNews.id != null ||
            myForm.importantNews.id != null ||
            myForm.text != null)
            this.saveAsDraft();
    };
    CrudComponent.prototype.getReceivers = function () {
        this.crudCreator.receivers = this.newsService.getOfflineMailbox('newsReceiver');
        // this.newsService.getNewsRecivers().subscribe(
        //   (data) => {
        //     this.crudCreator.receivers = this.newsService.getOfflineMailbox('ReciversOfNews');
        //     // this.newsService.setMailbox(data, 'ReciversOfNews');
        //     this.crudCreator.receivers = data;
        //   },
        //   (error) => {
        //     this.crudCreator.receivers = this.newsService.getOfflineMailbox('ReciversOfNews');
        //     console.log(error);
        //   });
    };
    CrudComponent.prototype.openReceiversDialog = function () {
        var _this = this;
        var dialogRef = this.dialog.open(_multi_select_multi_select_component__WEBPACK_IMPORTED_MODULE_7__["MultiSelectComponent"], {
            data: this.crudCreator.receivers
        });
        dialogRef.afterClosed().subscribe(function (data) {
            if (data) {
                console.log('dataa', data);
                _this.crudModel.userNews = [];
                data.forEach(function (element) {
                    if (element.checked == true) {
                        //this.comboItems.push(element);
                        _this.crudModel.userNews.push({
                            receiver: element
                        });
                    }
                });
            }
        });
    };
    CrudComponent.prototype.removeReceivers = function (u, userIndex) {
        this.crudCreator.receivers.forEach(function (element) {
            if (element.id == u.receiver.id)
                element['checked'] = false;
        });
        this.crudModel.userNews.splice(userIndex, 1);
    };
    CrudComponent.prototype.getSourceNews = function () {
        var _this = this;
        this.crudCreator.sourceNews = this.newsService.getOfflineSources('sourceNews');
        this.filteredOptions = this.myControl.valueChanges.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_10__["startWith"])(''), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_10__["map"])(function (value) { return _this._filter(value); }));
        this.crudCreator.urgentNews = this.newsService.getOfflineSources('urgentNews');
        this.crudCreator.importantNews = this.newsService.getOfflineSources('importantNews');
        this.crudCreator.newsTruth = this.newsService.getOfflineSources('truthNews');
        this.crudCreator.archiveNews = this.newsService.getOfflineSources('archiveNews');
    };
    CrudComponent.prototype.saveAsDraft = function () {
        this.crudModel.sender_time = Date.now();
        console.log(this.crudModel);
        this.newsService.saveDraft(this.crudModel);
        this.dashboard.showEventMessage("خبر در پیش نویس ها ذخیره شد");
    };
    CrudComponent.prototype.send = function () {
        var _this = this;
        // debugger
        +new Date;
        //for getting userMission and append in to crudModel
        this.userMission = this.usersService.getMission();
        this.crudModel.mission = { "id": this.userMission.id };
        this.crudModel.sender_time = Date.now();
        var temp = this.crudModel.id;
        delete this.crudModel.id;
        this.crudModel.userNews.forEach(function (element) {
            delete element.receiver['authorities'];
        });
        if (this.crudModel.localAttachment)
            this.crudModel.attachment = this.crudModel.localAttachment.toString();
        this.newsService.putNews(this.crudModel).subscribe(function (data) {
            _this.socket.sendNews(_this.crudModel.userNews, _this.crudModel.subject, 'news', _this.crudModel.importantNews.id);
            _this.dashboard.showEventMessage("خبر با موفقیت ارسال شد");
            if (temp) {
                _this.newsService.removeListRow(temp, 'draft');
            }
            _this.newsService.addListRow(data, 'outbox');
            _this.crudModel = {};
            _this.crudModel.sourceNews = {};
            _this.crudModel.importantNews = {};
            _this.crudModel.urgentNews = {};
            _this.crudModel.newsTruth = {};
            _this.crudModel.archiveNews = {};
        }, function (error) {
            _this.dashboard.showEventMessage("خبر ارسال نشد و در پیش نویس ها ذخیره شد");
            _this.saveAsDraft();
        });
    };
    CrudComponent.prototype.fileChange = function (event) {
        var _this = this;
        //debugger;
        var fileList = event.target.files;
        if (fileList.length > 0) {
            var file = fileList[0];
            var formData = new FormData();
            formData.append('file', file, file.name);
            console.log('file.name', file.name);
            var headers = new Headers();
            this.messagesService.uploadFile(formData).subscribe(function (res) {
                if (!_this.crudModel.localAttachment)
                    _this.crudModel.localAttachment = [];
                _this.crudModel.localAttachment.push(res[0]);
            });
        }
    };
    CrudComponent.prototype.displayFn = function (opt) {
        return opt ? opt.name : undefined;
    };
    CrudComponent.prototype.initSourceNews = function (value) {
        this.crudModel.sourceNews.id = value.id;
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], CrudComponent.prototype, "crudModelData", void 0);
    CrudComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'mobile-app-crud',
            template: __webpack_require__(/*! ./crud.component.html */ "./src/mobile-app/pages/news/components/crud/crud.component.html"),
            styles: [__webpack_require__(/*! ./crud.component.css */ "./src/mobile-app/pages/news/components/crud/crud.component.css")]
        }),
        __metadata("design:paramtypes", [_services_news_news_service__WEBPACK_IMPORTED_MODULE_2__["NewsService"],
            _dashboard_dashboard_component__WEBPACK_IMPORTED_MODULE_9__["DashboardComponent"],
            src_services_users_users_service__WEBPACK_IMPORTED_MODULE_3__["UsersService"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormBuilder"],
            _services_messages_messages_service__WEBPACK_IMPORTED_MODULE_5__["MessagesService"],
            _angular_material__WEBPACK_IMPORTED_MODULE_6__["MatDialog"],
            src_services_socket_socket_service__WEBPACK_IMPORTED_MODULE_8__["SocketService"],
            _services_config_service__WEBPACK_IMPORTED_MODULE_1__["ConfigService"]])
    ], CrudComponent);
    return CrudComponent;
}());



/***/ }),

/***/ "./src/mobile-app/pages/news/components/list/list.component.css":
/*!**********************************************************************!*\
  !*** ./src/mobile-app/pages/news/components/list/list.component.css ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\r\n\r\n\r\n  .list-table{\r\n    width: 100%;\r\n    direction: rtl;\r\n       }\r\n  .list-table th.mat-header-cell{\r\n    text-align: right;\r\n  }\r\n  .news-item{\r\n    font-weight: normal;\r\n    padding-right: 0.5% ;\r\n  }\r\n  .unreadElement{\r\n    font-weight: bolder;\r\n    text-shadow: 0px 0px 20px rgba(150, 150, 150, 1);\r\n  }\r\n  .success{\r\n    background-color:#95ffa9;\r\n\r\n  }\r\n  .light{\r\n    background-color: #f8f9fa;\r\n  }\r\n  .warning{\r\n    background-color:#ffeeb0\r\n  }\r\n  .info{\r\n    background-color: #4885ed;\r\n  }\r\n  .rows{\r\n    cursor: pointer;\r\n  }\r\n  .dangerNews .mat-cell{\r\n    color: #F44336;\r\n  }\r\n  .warningNews .mat-cell{\r\n    color: #FF9800;\r\n  }\r\n  .successNews .mat-cell{\r\n    color: #28a745;\r\n  }\r\n  .lightNews .mat-cell{\r\n    color: #6c757d;\r\n  }\r\n"

/***/ }),

/***/ "./src/mobile-app/pages/news/components/list/list.component.html":
/*!***********************************************************************!*\
  !*** ./src/mobile-app/pages/news/components/list/list.component.html ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "&nbsp;\r\n<fa for=\"uploadFile\" (click)=\"deleteSelectedNews()\"\r\n    name=\"fas fa-trash\"\r\n    class=\"float-right text-danger\"\r\n    *ngIf=\"selection.selected.length>0\"\r\n    size=\"2x\">حذف\r\n</fa>\r\n<mat-form-field>\r\n  <input matInput (keyup)=\"applySearch($event.target.value)\" placeholder=\"جستجو\"/>\r\n</mat-form-field>\r\n<mat-form-field class=\"col-2\" *ngIf=\"crudCreator.archiveNews\">\r\n  <mat-select placeholder=\"طبقه بندی\" [(value)]=\"selectedArchiveNews\"\r\n              (selectionChange)=\"applyFilter('archiveNews',$event.value)\">\r\n    <mat-option [value]=\"all\">\r\n      همه\r\n    </mat-option>\r\n    <mat-option *ngFor=\"let archiveNews of crudCreator.archiveNews\" [value]=\"archiveNews.id\">\r\n      {{archiveNews.name}}\r\n    </mat-option>\r\n  </mat-select>\r\n</mat-form-field>\r\n<mat-form-field class=\"col-2\" *ngIf=\"crudCreator.sourceNews\">\r\n  <mat-select placeholder=\"منبع خبر\" [(value)]=\"selectedSourceNews\"\r\n              (selectionChange)=\"applyFilter('sourceNews',$event.value)\">\r\n    <mat-option [value]=\"all\">\r\n      همه\r\n    </mat-option>\r\n    <mat-option *ngFor=\"let sourceNews of crudCreator.sourceNews\" [value]=\"sourceNews.id\">\r\n      {{sourceNews.name}}\r\n    </mat-option>\r\n  </mat-select>\r\n</mat-form-field>\r\n<mat-form-field class=\"col-2\" *ngIf=\"crudCreator.importantNews\">\r\n  <mat-select placeholder=\"اهمیت خبر\" [(value)]=\"selectedImportantNews\"\r\n              (selectionChange)=\"applyFilter('importantNews',$event.value)\">\r\n    <mat-option [value]=\"all\">\r\n      همه\r\n    </mat-option>\r\n    <mat-option *ngFor=\"let importantNews of crudCreator.importantNews\" [value]=\"importantNews.id\">\r\n      {{importantNews.name}}\r\n    </mat-option>\r\n  </mat-select>\r\n</mat-form-field>\r\n\r\n<mat-form-field class=\"col-2\" *ngIf=\"crudCreator.urgentNews\">\r\n  <mat-select placeholder=\"فوریت خبر\" [(value)]=\"selectedUrgentNews\"\r\n              (selectionChange)=\"applyFilter('urgentNews',$event.value)\">\r\n    <mat-option [value]=\"all\">\r\n      همه\r\n    </mat-option>\r\n    <mat-option *ngFor=\"let urgentNews of crudCreator.urgentNews\"\r\n                [ngClass]=\"\r\n    (urgentNews.id && urgentNews.id==1) ? 'danger' : 'light'&&\r\n    (urgentNews.id && urgentNews.id==2) ? 'warning' : 'light'&&\r\n    (urgentNews.id && urgentNews.id==3) ? 'success' : 'light'\" [value]=\"urgentNews.id\">\r\n      {{urgentNews.name}}\r\n    </mat-option>\r\n  </mat-select>\r\n</mat-form-field>\r\n\r\n<mat-form-field class=\"col-2\" *ngIf=\"crudCreator.newsTruth\">\r\n  <mat-select placeholder=\"صحت خبر\" [(value)]=\"selectedNewsTruth\"\r\n              (selectionChange)=\"applyFilter('newsTruth', $event.value)\">\r\n    <mat-option [value]=\"all\">\r\n      همه\r\n    </mat-option>\r\n    <mat-option *ngFor=\"let newsTruth of crudCreator.newsTruth\" [value]=\"newsTruth.id\">\r\n      {{newsTruth.name}}\r\n    </mat-option>\r\n  </mat-select>\r\n</mat-form-field>\r\n\r\n<table mat-table matSort (matSortChange)=\"sortData($event)\" dir=\"rtl\" [dataSource]=\"dataSource\" class=\"list-table\">\r\n  <!-- Position Column -->\r\n  <ng-container matColumnDef=\"select\">\r\n    <th mat-header-cell *matHeaderCellDef>\r\n      <mat-checkbox (change)=\"$event ? masterToggle():null\" [checked]=\"selection.hasValue() && isAllSelected()\"\r\n                    [indeterminate]=\"selection.hasValue() && !isAllSelected()\">\r\n      </mat-checkbox>\r\n    </th>\r\n    <td mat-cell *matCellDef=\"let row\">\r\n      <mat-checkbox (click)=\"$event.stopPropagation()\" (change)=\"$event?selection.toggle(row) :null\"\r\n                    [checked]=\"selection.isSelected(row)\">\r\n      </mat-checkbox>\r\n    </td>\r\n    <!-- <td mat-cell *matCellDef=\"let row; let index = index\"\r\n    [ngClass] = \"row.seen_time ? 'readElement' : 'unreadElement'\"> {{column.cell(row, index)}} </td> -->\r\n  </ng-container>\r\n  <!-- Position Column -->\r\n  <ng-container *ngFor=\"let column of columns\" matColumnDef=\"{{column.columnDef}}\">\r\n    <div *ngIf=\"column.columnDef!='details' && column.columnDef!='attachment'\">\r\n      <th mat-header-cell mat-sort-header *matHeaderCellDef> {{column.label}}{{column.show}}</th>\r\n    </div>\r\n    <div *ngIf=\"column.columnDef=='details' || column.columnDef=='attachment'\">\r\n      <th mat-header-cell *matHeaderCellDef> {{column.label}}{{column.show}}</th>\r\n    </div>\r\n\r\n    <td mat-cell *matCellDef=\"let row; let index = index\" class=\"mail-item\"\r\n        [ngClass]=\"(!row.seen_time && type == 'inbox') ? 'unreadElement' : 'readElement'\"\r\n        [innerHTML]=\"column.cell(row, index)\"></td>\r\n  </ng-container>\r\n\r\n  <tr mat-header-row *matHeaderRowDef=\"displayedColumns\"></tr>\r\n  <tr (click)=\"showContent(row)\" class=\"rows\" [ngClass]=\"\r\n  (row.urgentNews && row.urgentNews.id==1) ? 'dangerNews' : 'lightNews'&&\r\n  (row.urgentNews && row.urgentNews.id==2) ? 'warningNews' : 'lightNews'&&\r\n  (row.urgentNews && row.urgentNews.id==3) ? 'successNews' : 'lightNews'\" mat-row\r\n      *matRowDef=\"let row; columns: displayedColumns;\"></tr>\r\n</table>\r\n<mat-paginator [pageSizeOptions]=\"[8, 20]\"></mat-paginator>\r\n"

/***/ }),

/***/ "./src/mobile-app/pages/news/components/list/list.component.ts":
/*!*********************************************************************!*\
  !*** ./src/mobile-app/pages/news/components/list/list.component.ts ***!
  \*********************************************************************/
/*! exports provided: ListComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ListComponent", function() { return ListComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_news_news_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../services/news/news.service */ "./src/services/news/news.service.ts");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _content_content_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../content/content.component */ "./src/mobile-app/pages/news/components/content/content.component.ts");
/* harmony import */ var _services_users_users_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../../services/users/users.service */ "./src/services/users/users.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_cdk_collections__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/cdk/collections */ "./node_modules/@angular/cdk/esm5/collections.es5.js");
/* harmony import */ var src_services_accessible_accessible_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/services/accessible/accessible.service */ "./src/services/accessible/accessible.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var ListComponent = /** @class */ (function () {
    function ListComponent(newsService, myRoute, usersService, dialog, accessibleService) {
        this.newsService = newsService;
        this.myRoute = myRoute;
        this.usersService = usersService;
        this.dialog = dialog;
        this.accessibleService = accessibleService;
        this.selection = new _angular_cdk_collections__WEBPACK_IMPORTED_MODULE_6__["SelectionModel"](true, []);
    }
    ListComponent.prototype.ngOnInit = function () {
        this.crudCreator = {};
        this.paginator._intl.itemsPerPageLabel = 'تعداد خبر در صفحه';
        this.paginator._intl.nextPageLabel = 'بعدی';
        this.paginator._intl.previousPageLabel = 'قبلی';
        this.paginator._intl.getRangeLabel = function (page, pageSize, length) {
            return "";
        };
        this.activeUserId = this.usersService.getUserInfo().id;
        this.displayedColumns = this.columns.map(function (c) { return c.columnDef; });
        this.displayedColumns.splice(0, 0, 'select');
        this.dataSource = new _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatTableDataSource"](this.mailBoxList);
        this.dataSource.paginator = this.paginator;
        this.userInfo = this.usersService.getUserInfo();
        this.getNewsFilters('sourceNews');
        this.getNewsFilters('importantNews');
        this.getNewsFilters('newsTruth');
        this.getNewsFilters('urgentNews');
        this.getNewsFilters('archiveNews');
        if (this.dataSource)
            this.dataSource.sort = this.sort;
    };
    ListComponent.prototype.sortData = function (sort) {
        var _this = this;
        var temp = this.mailBoxList.slice();
        var item;
        console.log(temp);
        this.columns.forEach(function (i) {
            if (i.columnDef === sort.active) {
                item = i;
            }
        });
        this.dataSource.data = temp.sort(function (a, b) {
            var isA = sort.direction === 'asc';
            return _this.compare(item.cell(a), item.cell(b), isA);
        });
    };
    ListComponent.prototype.compare = function (a, b, isA) {
        return (a < b ? -1 : 1) * (isA ? 1 : -1);
    };
    ListComponent.prototype.isAllSelected = function () {
        var numSelected = this.selection.selected.length;
        var numRows = this.dataSource.data.length;
        return numSelected === numRows;
    };
    ListComponent.prototype.masterToggle = function () {
        var _this = this;
        this.isAllSelected() ?
            this.selection.clear() :
            this.dataSource.data.forEach(function (row) { return _this.selection.select(row); });
    };
    ListComponent.prototype.deleteSelectedNews = function () {
        var _this = this;
        if (this.selection.selected.length > 0) {
            this.accessibleService.showConfirm().subscribe((function (data) {
                if (data == 1) {
                    _this.selection.selected.forEach(function (row) {
                        if (_this.type == "drafts") {
                            _this.splice(row.id);
                            _this.dataSource.data = _this.mailBoxList;
                            _this.newsService.setMailbox(_this.dataSource.data, 'draft');
                        }
                        else {
                            //delete from server
                            _this.newsService.deleteList(row.id, _this.type).subscribe(function (data) {
                                _this.splice(row.id);
                                _this.dataSource.data = _this.mailBoxList;
                            }, function (error) {
                                console.log('حذف انجام نشد');
                            });
                        }
                        _this.selection.clear();
                    });
                }
            }));
        }
    };
    ListComponent.prototype.splice = function (id) {
        for (var i = this.dataSource.data.length - 1; i >= 0; i--) {
            if (id == this.dataSource.data[i].id) {
                this.dataSource.data.splice(i, 1);
                this.paginator._changePageSize(this.paginator.pageSize);
                //delete from local storage
                this.newsService.deleteLocalList(this.dataSource.data, this.type);
            }
        }
    };
    ListComponent.prototype.getNewsFilters = function (label) {
        this.crudCreator[label] = this.newsService.getOfflineSources(label);
    };
    ListComponent.prototype.ngOnChanges = function () {
        if (this.dataSource) {
            this.dataSource.data = this.mailBoxList;
            this.dataSource.paginator = this.paginator;
        }
        //this.paginator._changePageSize(this.paginator.pageSize);
    };
    ListComponent.prototype.applyFilter = function (label, id) {
        this.dataSource.filterPredicate = function (row, filter) {
            if (filter == 'all')
                return true;
            return row[label].id == filter;
        };
        this.dataSource.filter = id;
    };
    ListComponent.prototype.applySearch = function (value) {
        // this.dataSource.filterPredicate = (row, filter) => {
        //   if (row['subject'].trim().toLowerCase().indexOf(filter) >= 0 ||
        //     row['text'].trim().toLowerCase().indexOf(filter) >= 0 ||
        //     row['sender'].lastname.trim().toLowerCase().indexOf(filter) >= 0 ||
        //     row['sender'].firstname.trim().toLowerCase().indexOf(filter) >= 0)
        //     return true;
        //   return false;
        //
        // }
        // let values = value.split(" ");
        // values.forEach(
        // (val) => {
        // this.dataSource.filter = val.trim().toLowerCase();
        // }
        // )
        this.dataSource.filter = value.trim().toLowerCase();
        this.dataSource.filterPredicate = function (row, filter) {
            if (JSON.stringify(row).indexOf(filter) >= 0)
                return true;
            return false;
        };
    };
    ListComponent.prototype.showContent = function (row) {
        var _this = this;
        if (this.type === 'drafts') {
            this.myRoute.navigate(['news/compose', row.id]);
        }
        else {
            if (this.type == "inbox" && !row['seen_time']) {
                // ;
                this.newsService.seen(row.id).subscribe(function (data) {
                    row['seen_time'] = data['seen_time'];
                    _this.newsService.setMailbox(_this.dataSource.data, 'inbox');
                });
            }
            var dialogRef = this.dialog.open(_content_content_component__WEBPACK_IMPORTED_MODULE_3__["ContentComponent"], {
                data: {
                    newsData: row,
                    type: this.type
                },
                width: "50%"
            });
            dialogRef.afterClosed().subscribe(function (data) {
                if (data) {
                    row = data;
                }
            });
        }
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])(_angular_material__WEBPACK_IMPORTED_MODULE_2__["MatPaginator"]),
        __metadata("design:type", _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatPaginator"])
    ], ListComponent.prototype, "paginator", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])(_angular_material__WEBPACK_IMPORTED_MODULE_2__["MatSort"]),
        __metadata("design:type", _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatSort"])
    ], ListComponent.prototype, "sort", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], ListComponent.prototype, "mailBoxList", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], ListComponent.prototype, "type", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], ListComponent.prototype, "columns", void 0);
    ListComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'mobile-app-list',
            template: __webpack_require__(/*! ./list.component.html */ "./src/mobile-app/pages/news/components/list/list.component.html"),
            styles: [__webpack_require__(/*! ./list.component.css */ "./src/mobile-app/pages/news/components/list/list.component.css")]
        }),
        __metadata("design:paramtypes", [_services_news_news_service__WEBPACK_IMPORTED_MODULE_1__["NewsService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_5__["Router"],
            _services_users_users_service__WEBPACK_IMPORTED_MODULE_4__["UsersService"],
            _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatDialog"],
            src_services_accessible_accessible_service__WEBPACK_IMPORTED_MODULE_7__["AccessibleService"]])
    ], ListComponent);
    return ListComponent;
}());



/***/ }),

/***/ "./src/mobile-app/pages/news/components/multi-select/multi-select.component.css":
/*!**************************************************************************************!*\
  !*** ./src/mobile-app/pages/news/components/multi-select/multi-select.component.css ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/mobile-app/pages/news/components/multi-select/multi-select.component.html":
/*!***************************************************************************************!*\
  !*** ./src/mobile-app/pages/news/components/multi-select/multi-select.component.html ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<mat-list-item *ngFor=\"let d of data\">\r\n  <mat-checkbox [(ngModel)]=\"d.checked\"></mat-checkbox>\r\n  {{d.firstname}} {{d.lastname}}\r\n  {{usersService.getUserPosition(d.id)}}\r\n</mat-list-item>\r\n<button class=\"fa fa-check-square-o btn btn-secondary\" mat-raised-button (click)=\"onNoClick()\"> تایید</button>\r\n"

/***/ }),

/***/ "./src/mobile-app/pages/news/components/multi-select/multi-select.component.ts":
/*!*************************************************************************************!*\
  !*** ./src/mobile-app/pages/news/components/multi-select/multi-select.component.ts ***!
  \*************************************************************************************/
/*! exports provided: MultiSelectComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MultiSelectComponent", function() { return MultiSelectComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _services_users_users_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../services/users/users.service */ "./src/services/users/users.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (undefined && undefined.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};




var MultiSelectComponent = /** @class */ (function () {
    function MultiSelectComponent(dialogRef, data, usersService) {
        this.dialogRef = dialogRef;
        this.data = data;
        this.usersService = usersService;
    }
    MultiSelectComponent.prototype.onNoClick = function () {
        this.dialogRef.close(this.data);
    };
    MultiSelectComponent.prototype.ngOnInit = function () {
    };
    MultiSelectComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'mobile-app-multi-select',
            template: __webpack_require__(/*! ./multi-select.component.html */ "./src/mobile-app/pages/news/components/multi-select/multi-select.component.html"),
            styles: [__webpack_require__(/*! ./multi-select.component.css */ "./src/mobile-app/pages/news/components/multi-select/multi-select.component.css")]
        }),
        __param(1, Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"])(_angular_material__WEBPACK_IMPORTED_MODULE_1__["MAT_DIALOG_DATA"])),
        __metadata("design:paramtypes", [_angular_material__WEBPACK_IMPORTED_MODULE_1__["MatDialogRef"], Object, _services_users_users_service__WEBPACK_IMPORTED_MODULE_2__["UsersService"]])
    ], MultiSelectComponent);
    return MultiSelectComponent;
}());



/***/ }),

/***/ "./src/mobile-app/pages/news/compose/compose.component.css":
/*!*****************************************************************!*\
  !*** ./src/mobile-app/pages/news/compose/compose.component.css ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/mobile-app/pages/news/compose/compose.component.html":
/*!******************************************************************!*\
  !*** ./src/mobile-app/pages/news/compose/compose.component.html ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<mobile-app-crud [crudModelData] = \"crudModel\"></mobile-app-crud>\r\n"

/***/ }),

/***/ "./src/mobile-app/pages/news/compose/compose.component.ts":
/*!****************************************************************!*\
  !*** ./src/mobile-app/pages/news/compose/compose.component.ts ***!
  \****************************************************************/
/*! exports provided: ComposeComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ComposeComponent", function() { return ComposeComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var src_services_news_news_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/services/news/news.service */ "./src/services/news/news.service.ts");
/* harmony import */ var _services_common_common_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../services/common/common.service */ "./src/services/common/common.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ComposeComponent = /** @class */ (function () {
    function ComposeComponent(route, commonService, newsService) {
        this.route = route;
        this.commonService = commonService;
        this.newsService = newsService;
        this.crudModel = null;
    }
    ComposeComponent.prototype.ngOnInit = function () {
        var _this = this;
        console.log(this.crudModel);
        this.route.params.subscribe(function (data) {
            if (data.id) {
                _this.crudModel = _this.newsService.getNewsDraftById(data.id);
                console.log(_this.crudModel);
            }
        });
    };
    ComposeComponent.prototype.ngOnDestroy = function () {
    };
    ComposeComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'mobile-app-compose',
            template: __webpack_require__(/*! ./compose.component.html */ "./src/mobile-app/pages/news/compose/compose.component.html"),
            styles: [__webpack_require__(/*! ./compose.component.css */ "./src/mobile-app/pages/news/compose/compose.component.css")]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"], _services_common_common_service__WEBPACK_IMPORTED_MODULE_3__["CommonService"], src_services_news_news_service__WEBPACK_IMPORTED_MODULE_2__["NewsService"]])
    ], ComposeComponent);
    return ComposeComponent;
}());



/***/ }),

/***/ "./src/mobile-app/pages/news/draft/draft.component.css":
/*!*************************************************************!*\
  !*** ./src/mobile-app/pages/news/draft/draft.component.css ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".titr {\r\n  text-align: center;\r\n  font-weight: bold;\r\n\r\n}\r\n\r\n.titrCard {\r\n  position: static;\r\n  background-color: rgba(244, 168, 54, 0.1)\r\n\r\n}\r\n"

/***/ }),

/***/ "./src/mobile-app/pages/news/draft/draft.component.html":
/*!**************************************************************!*\
  !*** ./src/mobile-app/pages/news/draft/draft.component.html ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<mobile-app-list [columns]=\"draftColumns\" [mailBoxList]=\"mailBoxList\" type=\"drafts\" ></mobile-app-list>\r\n"

/***/ }),

/***/ "./src/mobile-app/pages/news/draft/draft.component.ts":
/*!************************************************************!*\
  !*** ./src/mobile-app/pages/news/draft/draft.component.ts ***!
  \************************************************************/
/*! exports provided: DraftComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DraftComponent", function() { return DraftComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var src_services_users_users_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/services/users/users.service */ "./src/services/users/users.service.ts");
/* harmony import */ var src_services_news_news_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/services/news/news.service */ "./src/services/news/news.service.ts");
/* harmony import */ var src_web_app_pipes_jalali_pipe__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/web-app/pipes/jalali.pipe */ "./src/web-app/pipes/jalali.pipe.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var DraftComponent = /** @class */ (function () {
    function DraftComponent(newsService, usersService) {
        this.newsService = newsService;
        this.usersService = usersService;
        this.draftColumns = [
            {
                columnDef: 'id',
                label: 'ردیف',
                cell: function (row, index) { return index + 1; }
            },
            {
                columnDef: 'sender_time',
                label: 'آخرین ویرایش',
                cell: function (row) { return new src_web_app_pipes_jalali_pipe__WEBPACK_IMPORTED_MODULE_3__["JalaliPipe"]().transform(row.sender_time); }
            },
            {
                columnDef: 'subject',
                label: 'موضوع',
                cell: function (row) { return row.subject; }
            }
        ];
    }
    DraftComponent.prototype.ngOnInit = function () {
        this.draft();
    };
    DraftComponent.prototype.draft = function () {
        this.mailBoxList = this.newsService.getOfflineMailbox('draft');
    };
    DraftComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'mobile-app-draft',
            template: __webpack_require__(/*! ./draft.component.html */ "./src/mobile-app/pages/news/draft/draft.component.html"),
            styles: [__webpack_require__(/*! ./draft.component.css */ "./src/mobile-app/pages/news/draft/draft.component.css")]
        }),
        __metadata("design:paramtypes", [src_services_news_news_service__WEBPACK_IMPORTED_MODULE_2__["NewsService"],
            src_services_users_users_service__WEBPACK_IMPORTED_MODULE_1__["UsersService"]])
    ], DraftComponent);
    return DraftComponent;
}());



/***/ }),

/***/ "./src/mobile-app/pages/news/inbox/inbox.component.css":
/*!*************************************************************!*\
  !*** ./src/mobile-app/pages/news/inbox/inbox.component.css ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".titr{\r\n    text-align: center;\r\n    font-weight: bold;\r\n  \r\n}\r\n.titrCard{\r\n    position: static;\r\n    background-color: rgba(244,168,54,0.1)\r\n   \r\n   }\r\n "

/***/ }),

/***/ "./src/mobile-app/pages/news/inbox/inbox.component.html":
/*!**************************************************************!*\
  !*** ./src/mobile-app/pages/news/inbox/inbox.component.html ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<mobile-app-list *ngIf=\"mailBoxList\" [columns]=\"inboxColumns\" [mailBoxList]=\"mailBoxList\" type=\"inbox\" ></mobile-app-list>\r\n\r\n"

/***/ }),

/***/ "./src/mobile-app/pages/news/inbox/inbox.component.ts":
/*!************************************************************!*\
  !*** ./src/mobile-app/pages/news/inbox/inbox.component.ts ***!
  \************************************************************/
/*! exports provided: InboxComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InboxComponent", function() { return InboxComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_news_news_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../services/news/news.service */ "./src/services/news/news.service.ts");
/* harmony import */ var _services_users_users_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../services/users/users.service */ "./src/services/users/users.service.ts");
/* harmony import */ var src_services_socket_socket_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/services/socket/socket.service */ "./src/services/socket/socket.service.ts");
/* harmony import */ var _web_app_pipes_jalali_pipe__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../web-app/pipes/jalali.pipe */ "./src/web-app/pipes/jalali.pipe.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var InboxComponent = /** @class */ (function () {
    function InboxComponent(newsService, usersService, socket) {
        var _this = this;
        this.newsService = newsService;
        this.usersService = usersService;
        this.socket = socket;
        this.inboxColumns = [
            {
                columnDef: 'id',
                label: 'ردیف',
                cell: function (row, index) {
                    return index + 1;
                }
            },
            {
                columnDef: 'subject',
                label: 'موضوع',
                cell: function (row) {
                    return row.subject;
                }
            },
            {
                columnDef: 'sender',
                label: 'فرستنده',
                cell: function (row) {
                    return row.sender.firstname +
                        ' ' + row.sender.lastname +
                        ' ' + _this.usersService.getUserPosition(row.sender.id);
                }
            },
            {
                columnDef: 'importantNews',
                label: 'اهمیت',
                cell: function (row) {
                    return row.importantNews.name;
                }
            },
            {
                columnDef: 'archiveNews',
                label: 'طبقه بندی',
                cell: function (row) {
                    return row.archiveNews.name;
                }
            },
            {
                columnDef: 'sourceNews',
                label: 'منبع',
                cell: function (row) {
                    return row.sourceNews.name;
                }
            },
            {
                columnDef: 'sender_time',
                label: 'تاریخ',
                cell: function (row) {
                    return new _web_app_pipes_jalali_pipe__WEBPACK_IMPORTED_MODULE_4__["JalaliPipe"]().transform(row.sender_time);
                }
            },
            {
                columnDef: 'details',
                label: 'جزئیات',
                cell: function (row) { return "<h3>...</h3>"; }
            }
        ];
    }
    InboxComponent.prototype.ngOnInit = function () {
        this.activeUserId = this.usersService.getUserInfo().id;
        this.inbox();
        this.watchNewsSocket();
    };
    InboxComponent.prototype.watchNewsSocket = function () {
        var _this = this;
        this.socket.socketEvent.subscribe(function (event) {
            console.log('event', event.data);
            var x = event.data.split("|");
            var receiver = x[1];
            if (x[3] && x[3].indexOf('news') >= 0) {
                _this.inbox();
            }
        });
    };
    InboxComponent.prototype.inbox = function () {
        var _this = this;
        // this.mailBoxList = this.newsService.getOfflineMailbox('inbox');
        this.newsService.buildInbox().subscribe(function (data) {
            _this.mailBoxList = _this.newsService.getOfflineMailbox('inbox');
        });
        // this.mailBoxList = this.newsService.getOfflineMailbox('inbox');
        // this.newsService.getInbox().subscribe(
        //   (data) => {
        //     // ;
        //     // data.push(this.mailBoxList)
        //     this.mailBoxList = data.concat(this.mailBoxList);
        //     this.newsService.setMailbox(this.mailBoxList, 'inbox');
        //   },
        //   (error) => {
        //     this.mailBoxList = this.newsService.getOfflineMailbox('inbox');
        //     // console.log('offline', this.mailBoxList);
        //   });
    };
    InboxComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-inbox',
            template: __webpack_require__(/*! ./inbox.component.html */ "./src/mobile-app/pages/news/inbox/inbox.component.html"),
            styles: [__webpack_require__(/*! ./inbox.component.css */ "./src/mobile-app/pages/news/inbox/inbox.component.css")]
        }),
        __metadata("design:paramtypes", [_services_news_news_service__WEBPACK_IMPORTED_MODULE_1__["NewsService"],
            _services_users_users_service__WEBPACK_IMPORTED_MODULE_2__["UsersService"],
            src_services_socket_socket_service__WEBPACK_IMPORTED_MODULE_3__["SocketService"]])
    ], InboxComponent);
    return InboxComponent;
}());



/***/ }),

/***/ "./src/mobile-app/pages/news/index/index.component.css":
/*!*************************************************************!*\
  !*** ./src/mobile-app/pages/news/index/index.component.css ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".nav-bar{\r\n  position: absolute;\r\n  bottom: 0;\r\n  width: 100%;\r\n  background-color: #eee\r\n}\r\n\r\n.mat-tab-link {\r\n  color: black;\r\n}\r\n\r\n.example-container {\r\n  width: 100%;\r\n  position: fixed;\r\n  left: 0;\r\n  top: 0;\r\n  bottom:65px;\r\n}\r\n\r\nmat-sidenav{\r\n  /* width: 15%; */\r\n  direction: rtl;\r\n  background-color: rgba(0, 0, 0, 0.45);\r\n}\r\n\r\nfa{\r\n  float:left;\r\n  padding: 1%;\r\n  color: orange;\r\n}\r\n\r\n/* .button{\r\ncolor: rgba(0, 0, 0, 0.45);\r\n} */\r\n\r\nmat-sidenav-content{\r\n    padding-right: 0%;\r\n  }\r\n\r\nmat-list-item{\r\n    cursor: pointer;\r\n    direction: ltr;\r\n  }\r\n\r\n/* .button{ */\r\n\r\n/* z-index: 11; */\r\n\r\n/* color: azure; */\r\n\r\n/* position: absolute; */\r\n\r\n/* } */\r\n\r\n.label{\r\n    color: azure;\r\n    padding-left: 10px;\r\n    white-space: nowrap;\r\n  }\r\n\r\n.sidNavTitle{\r\n    background: orange;\r\n   }\r\n\r\n.toggle{\r\n     color: black\r\n   }\r\n\r\n.titleCard{\r\n  position: static;\r\n  background-color: #6c757d;\r\n  color: #f8f9fa;\r\n\r\n}\r\n\r\n.titleBar{\r\n  text-align: center;\r\n  font-weight: bold;\r\n\r\n}\r\n\r\nmat-sidenav-content{\r\n  background-image: url('envelope-solid.png');\r\n  background-repeat: no-repeat;\r\n  background-position: center;\r\n  background-size: contain;\r\n}\r\n"

/***/ }),

/***/ "./src/mobile-app/pages/news/index/index.component.html":
/*!**************************************************************!*\
  !*** ./src/mobile-app/pages/news/index/index.component.html ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!-- disabledClose:booledan -->\r\n<mat-sidenav-container class=\"example-container\" autosize hasBackdrop=\"true\">\r\n  <mat-sidenav opened=true position=\"end\" #drawer mode=\"over\">\r\n    <mat-list role=\"list\">\r\n      <mat-list-item class=\"sidNavTitle\">\r\n        <fa name=\"fas fa-align-justify\" size=\"1x\" (click)=\"drawer.toggle()\" class=\"toggle\"></fa>\r\n        <span class=\"label\">خبرها</span>\r\n      </mat-list-item>\r\n      <mat-list-item role=\"listitem\" *ngFor=\"let link of navlinks\" [routerLink]=\"link.path\"\r\n                     (click)=\"setLabel(link.label)\">\r\n        <fa [name]=link.icon size=\"1x\" class=\"icon\"></fa>\r\n        <span class=\"label\">{{link.label}}</span>\r\n\r\n        <mat-divider>\r\n        </mat-divider>\r\n      </mat-list-item>\r\n    </mat-list>\r\n  </mat-sidenav>\r\n  <mat-sidenav-content>\r\n    <fa name=\"fas fa-align-justify\" class=\"button\" size=\"1x\" (click)=\"drawer.toggle()\"></fa>\r\n    <mat-card class=\"titleCard\">\r\n      <h5 class=\"titleBar\">\r\n        {{label}}\r\n      </h5>\r\n    </mat-card>\r\n    <router-outlet></router-outlet>\r\n  </mat-sidenav-content>\r\n</mat-sidenav-container>\r\n"

/***/ }),

/***/ "./src/mobile-app/pages/news/index/index.component.ts":
/*!************************************************************!*\
  !*** ./src/mobile-app/pages/news/index/index.component.ts ***!
  \************************************************************/
/*! exports provided: IndexComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IndexComponent", function() { return IndexComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var IndexComponent = /** @class */ (function () {
    function IndexComponent() {
        this.label = 'خبر';
        this.navlinks = [
            { label: ' ایجاد خبر', path: "compose", icon: "fas fa-pencil-square-o" },
            { label: 'صندوق ورودی', path: "inbox", icon: "fas fa-inbox" },
            { label: ' صندوق خروجی', path: "outbox", icon: "fas fa-paper-plane-o" },
            { label: '  پیش نویس ها', path: "draft", icon: "fas fa-envelope-open-o" },
        ];
    }
    IndexComponent.prototype.ngOnInit = function () {
    };
    IndexComponent.prototype.setLabel = function (label) {
        this.label = label;
    };
    IndexComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-index',
            template: __webpack_require__(/*! ./index.component.html */ "./src/mobile-app/pages/news/index/index.component.html"),
            styles: [__webpack_require__(/*! ./index.component.css */ "./src/mobile-app/pages/news/index/index.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], IndexComponent);
    return IndexComponent;
}());



/***/ }),

/***/ "./src/mobile-app/pages/news/news-routing.module.ts":
/*!**********************************************************!*\
  !*** ./src/mobile-app/pages/news/news-routing.module.ts ***!
  \**********************************************************/
/*! exports provided: NewsRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NewsRoutingModule", function() { return NewsRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _index_index_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./index/index.component */ "./src/mobile-app/pages/news/index/index.component.ts");
/* harmony import */ var _inbox_inbox_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./inbox/inbox.component */ "./src/mobile-app/pages/news/inbox/inbox.component.ts");
/* harmony import */ var _draft_draft_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./draft/draft.component */ "./src/mobile-app/pages/news/draft/draft.component.ts");
/* harmony import */ var _out_box_out_box_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./out-box/out-box.component */ "./src/mobile-app/pages/news/out-box/out-box.component.ts");
/* harmony import */ var _compose_compose_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./compose/compose.component */ "./src/mobile-app/pages/news/compose/compose.component.ts");
/* harmony import */ var _components_crud_crud_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./components/crud/crud.component */ "./src/mobile-app/pages/news/components/crud/crud.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};








var routes = [{
        path: '',
        component: _index_index_component__WEBPACK_IMPORTED_MODULE_2__["IndexComponent"],
        children: [
            {
                path: 'inbox',
                component: _inbox_inbox_component__WEBPACK_IMPORTED_MODULE_3__["InboxComponent"]
            },
            {
                path: 'draft',
                component: _draft_draft_component__WEBPACK_IMPORTED_MODULE_4__["DraftComponent"]
            },
            {
                path: 'compose/:id',
                component: _compose_compose_component__WEBPACK_IMPORTED_MODULE_6__["ComposeComponent"],
            },
            {
                path: 'compose',
                component: _compose_compose_component__WEBPACK_IMPORTED_MODULE_6__["ComposeComponent"],
            },
            {
                path: 'outbox',
                component: _out_box_out_box_component__WEBPACK_IMPORTED_MODULE_5__["OutBoxComponent"]
            },
            {
                path: 'crudForm',
                component: _components_crud_crud_component__WEBPACK_IMPORTED_MODULE_7__["CrudComponent"]
            }
        ]
    }
];
var NewsRoutingModule = /** @class */ (function () {
    function NewsRoutingModule() {
    }
    NewsRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
        })
    ], NewsRoutingModule);
    return NewsRoutingModule;
}());



/***/ }),

/***/ "./src/mobile-app/pages/news/news.module.ts":
/*!**************************************************!*\
  !*** ./src/mobile-app/pages/news/news.module.ts ***!
  \**************************************************/
/*! exports provided: NewsModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NewsModule", function() { return NewsModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var angular_font_awesome__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! angular-font-awesome */ "./node_modules/angular-font-awesome/dist/angular-font-awesome.es5.js");
/* harmony import */ var _news_routing_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./news-routing.module */ "./src/mobile-app/pages/news/news-routing.module.ts");
/* harmony import */ var _index_index_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./index/index.component */ "./src/mobile-app/pages/news/index/index.component.ts");
/* harmony import */ var _inbox_inbox_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./inbox/inbox.component */ "./src/mobile-app/pages/news/inbox/inbox.component.ts");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _draft_draft_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./draft/draft.component */ "./src/mobile-app/pages/news/draft/draft.component.ts");
/* harmony import */ var _out_box_out_box_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./out-box/out-box.component */ "./src/mobile-app/pages/news/out-box/out-box.component.ts");
/* harmony import */ var _components_list_list_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./components/list/list.component */ "./src/mobile-app/pages/news/components/list/list.component.ts");
/* harmony import */ var _compose_compose_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./compose/compose.component */ "./src/mobile-app/pages/news/compose/compose.component.ts");
/* harmony import */ var _components_crud_crud_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./components/crud/crud.component */ "./src/mobile-app/pages/news/components/crud/crud.component.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _components_multi_select_multi_select_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./components/multi-select/multi-select.component */ "./src/mobile-app/pages/news/components/multi-select/multi-select.component.ts");
/* harmony import */ var _pipes_pipes_module__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../../pipes/pipes.module */ "./src/pipes/pipes.module.ts");
/* harmony import */ var _components_content_content_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./components/content/content.component */ "./src/mobile-app/pages/news/components/content/content.component.ts");
/* harmony import */ var _ngui_auto_complete__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @ngui/auto-complete */ "./node_modules/@ngui/auto-complete/dist/index.js");
/* harmony import */ var _ngui_auto_complete__WEBPACK_IMPORTED_MODULE_16___default = /*#__PURE__*/__webpack_require__.n(_ngui_auto_complete__WEBPACK_IMPORTED_MODULE_16__);
/* harmony import */ var ngx_wig__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ngx-wig */ "./node_modules/ngx-wig/ngx-wig.umd.js");
/* harmony import */ var ngx_wig__WEBPACK_IMPORTED_MODULE_17___default = /*#__PURE__*/__webpack_require__.n(ngx_wig__WEBPACK_IMPORTED_MODULE_17__);
/* harmony import */ var ngx_quill__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ngx-quill */ "./node_modules/ngx-quill/fesm5/ngx-quill.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



















var NewsModule = /** @class */ (function () {
    function NewsModule() {
    }
    NewsModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _pipes_pipes_module__WEBPACK_IMPORTED_MODULE_14__["PipesModule"],
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_6__["MatSidenavModule"], _angular_material__WEBPACK_IMPORTED_MODULE_6__["MatSelectModule"], _angular_material__WEBPACK_IMPORTED_MODULE_6__["MatInputModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_12__["ReactiveFormsModule"], _angular_material__WEBPACK_IMPORTED_MODULE_6__["MatCheckboxModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_6__["MatFormFieldModule"], _angular_material__WEBPACK_IMPORTED_MODULE_6__["MatCardModule"], _angular_material__WEBPACK_IMPORTED_MODULE_6__["MatTabsModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_12__["FormsModule"], _angular_material__WEBPACK_IMPORTED_MODULE_6__["MatIconModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_6__["MatButtonModule"], _angular_material__WEBPACK_IMPORTED_MODULE_6__["MatListModule"], _news_routing_module__WEBPACK_IMPORTED_MODULE_3__["NewsRoutingModule"], _angular_material__WEBPACK_IMPORTED_MODULE_6__["MatCheckboxModule"], _angular_material__WEBPACK_IMPORTED_MODULE_6__["MatTableModule"],
                angular_font_awesome__WEBPACK_IMPORTED_MODULE_2__["AngularFontAwesomeModule"], _angular_material__WEBPACK_IMPORTED_MODULE_6__["MatDialogModule"], _angular_material__WEBPACK_IMPORTED_MODULE_6__["MatPaginatorModule"], _angular_material__WEBPACK_IMPORTED_MODULE_6__["MatExpansionModule"], _angular_material__WEBPACK_IMPORTED_MODULE_6__["MatSortModule"], ngx_wig__WEBPACK_IMPORTED_MODULE_17__["NgxWigModule"],
                ngx_quill__WEBPACK_IMPORTED_MODULE_18__["QuillModule"], _angular_material__WEBPACK_IMPORTED_MODULE_6__["MatAutocompleteModule"], _ngui_auto_complete__WEBPACK_IMPORTED_MODULE_16__["NguiAutoCompleteModule"]
            ],
            entryComponents: [_components_multi_select_multi_select_component__WEBPACK_IMPORTED_MODULE_13__["MultiSelectComponent"], _components_content_content_component__WEBPACK_IMPORTED_MODULE_15__["ContentComponent"]],
            declarations: [_index_index_component__WEBPACK_IMPORTED_MODULE_4__["IndexComponent"], _inbox_inbox_component__WEBPACK_IMPORTED_MODULE_5__["InboxComponent"], _draft_draft_component__WEBPACK_IMPORTED_MODULE_7__["DraftComponent"], _out_box_out_box_component__WEBPACK_IMPORTED_MODULE_8__["OutBoxComponent"], _components_list_list_component__WEBPACK_IMPORTED_MODULE_9__["ListComponent"],
                _compose_compose_component__WEBPACK_IMPORTED_MODULE_10__["ComposeComponent"], _components_crud_crud_component__WEBPACK_IMPORTED_MODULE_11__["CrudComponent"], _components_content_content_component__WEBPACK_IMPORTED_MODULE_15__["ContentComponent"], _components_multi_select_multi_select_component__WEBPACK_IMPORTED_MODULE_13__["MultiSelectComponent"], _components_content_content_component__WEBPACK_IMPORTED_MODULE_15__["ContentComponent"]],
            exports: []
        })
    ], NewsModule);
    return NewsModule;
}());



/***/ }),

/***/ "./src/mobile-app/pages/news/out-box/out-box.component.css":
/*!*****************************************************************!*\
  !*** ./src/mobile-app/pages/news/out-box/out-box.component.css ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".titr{\r\n    text-align: center;\r\n    font-weight: bold;\r\n  \r\n}\r\n.titrCard{\r\n    position: static;\r\n    background-color: rgba(244,168,54,0.1)\r\n   \r\n   }\r\n "

/***/ }),

/***/ "./src/mobile-app/pages/news/out-box/out-box.component.html":
/*!******************************************************************!*\
  !*** ./src/mobile-app/pages/news/out-box/out-box.component.html ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<mobile-app-list *ngIf=\"mailBoxList\" [columns]=\"outboxColumns\" [mailBoxList]=\"mailBoxList\" type=\"outbox\"></mobile-app-list>\r\n"

/***/ }),

/***/ "./src/mobile-app/pages/news/out-box/out-box.component.ts":
/*!****************************************************************!*\
  !*** ./src/mobile-app/pages/news/out-box/out-box.component.ts ***!
  \****************************************************************/
/*! exports provided: OutBoxComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OutBoxComponent", function() { return OutBoxComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_news_news_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../services/news/news.service */ "./src/services/news/news.service.ts");
/* harmony import */ var src_web_app_pipes_jalali_pipe__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/web-app/pipes/jalali.pipe */ "./src/web-app/pipes/jalali.pipe.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var OutBoxComponent = /** @class */ (function () {
    function OutBoxComponent(newsService) {
        this.newsService = newsService;
        this.outboxColumns = [
            {
                columnDef: 'id',
                label: 'ردیف',
                cell: function (row, index) { return index + 1; }
            },
            {
                columnDef: 'subject',
                label: 'موضوع',
                cell: function (row) { return row.subject; }
            },
            {
                columnDef: 'importantNews',
                label: 'اهمیت',
                cell: function (row) {
                    return row.importantNews.name;
                }
            },
            {
                columnDef: 'archiveNews',
                label: 'طبقه بندی',
                cell: function (row) {
                    return row.archiveNews.name;
                }
            },
            {
                columnDef: 'sourceNews',
                label: 'منبع',
                cell: function (row) {
                    return row.sourceNews.name;
                }
            },
            {
                columnDef: 'attachment',
                label: 'الصاق',
                cell: function (row) {
                    if (row.attachment != null)
                        return "<i class='fa fa-paperclip'></i>";
                }
            },
            {
                columnDef: 'sender_time',
                label: 'تاریخ',
                cell: function (row) { return new src_web_app_pipes_jalali_pipe__WEBPACK_IMPORTED_MODULE_2__["JalaliPipe"]().transform(row.sender_time); }
            },
            {
                columnDef: 'details',
                label: 'جزئیات',
                cell: function (row) { return "<h3>...</h3>"; }
            }
            // {
            //   columnDef: 'receiver',
            //   label: 'گیرندگان',
            //   cell: (row) => { return row.userNews.seen_time + ' ' + row.userNews.receiver.lastname }
            // }
            // ,
            // {
            //   columnDef: 'receiver_time',
            //   label: 'زمان رسیدن به دست گیرنده',
            //   cell: (row) => {
            //     if (row.userNews.receiver_time != null)
            //       return new JalaliPipe().transform(row.userNews.receiver_time)
            //     return row.userNews.receiver_time
            //   }
            // }
            // ,
            // {
            //   columnDef: 'seen_time',
            //   label: ' زمان خواندن خبر ',
            //   cell: (row) => {
            //     if (row.userNews.seen_time != null)
            //       return new JalaliPipe().transform(row.userNews.seen_time)
            //     return row.userNews.seen_time
            //   }
            // }
        ];
        this.outBox();
    }
    OutBoxComponent.prototype.ngOnInit = function () {
    };
    OutBoxComponent.prototype.outBox = function () {
        var _this = this;
        this.newsService.getOutBox().subscribe(function (data) {
            _this.mailBoxList = data;
            _this.newsService.setMailbox(data, 'outbox');
            console.log('online', _this.mailBoxList);
        }, function (error) {
            _this.mailBoxList = _this.newsService.getOfflineMailbox('outbox');
            console.log('offline', _this.mailBoxList);
        });
    };
    OutBoxComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'mobile-app-out-box',
            template: __webpack_require__(/*! ./out-box.component.html */ "./src/mobile-app/pages/news/out-box/out-box.component.html"),
            styles: [__webpack_require__(/*! ./out-box.component.css */ "./src/mobile-app/pages/news/out-box/out-box.component.css")]
        }),
        __metadata("design:paramtypes", [_services_news_news_service__WEBPACK_IMPORTED_MODULE_1__["NewsService"]])
    ], OutBoxComponent);
    return OutBoxComponent;
}());



/***/ })

}]);
//# sourceMappingURL=pages-news-news-module.js.map