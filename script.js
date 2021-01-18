var UI = {
  box1: {
    io: document.querySelector(".box1 .io"),
    figure: document.querySelector(".box1 .square")
  },
  box2: {
    io: document.querySelector(".box2 .io"),
    figure: document.querySelector(".box2 .square")
  }
};

var App = {
  init: function () {
    this.bindEvents();
    UI.box1.io.textContent = "Hello World!";
    UI.box2.io.innerHTML = this.toBinary(UI.box1.io.textContent);
  },

  bindEvents: function () {
    var _this = this;

    helpers.addEvent(UI.box1.io, "keyup", function (ev) {
      UI.box2.figure.classList.add("active");
      UI.box1.figure.classList.remove("active");
      var t = setTimeout(function () {
        clearTimeout(t);
        UI.box2.figure.classList.remove("active");
      }, 1000);
      UI.box2.io.innerHTML = _this.toBinary(UI.box1.io.textContent);
    });

    helpers.addEvent(UI.box2.io, "keyup", function (ev) {
      UI.box1.figure.classList.add("active");
      UI.box1.figure.classList.add("active");
      UI.box1.io.innerHTML = _this.toBox1(UI.box2.io.textContent);
    });
  },

  toBinary: function (text) {
    var _this = this,
      length = text.length,
      binary = "";
    for (var i = 0; i < length; i += 1) {
      binary += _this.pad(text.charCodeAt(i).toString(2)) + " ";
    }
    return binary;
  },

  toBox1: function (text) {
    var arr = text.trim().split(/\s+/gi),
      result = "";
    arr.forEach(function (a) {
      result += String.fromCharCode(parseInt(a, 2));
    });
    return result;
  },

  pad: function (number) {
    var eight = number;
    while (eight.length < 8) {
      eight = "0" + eight;
    }
    return eight;
  }
};

var helpers = {
  addEvent: function (obj, type, fn) {
    if (obj.addEventListener) {
      obj.addEventListener(type, fn, false);
    } else if (obj.attachEvent) {
      obj["e" + type + fn] = fn;
      obj[type + fn] = function () {
        obj["e" + type + fn](window.event);
      };
      obj.attachEvent("on" + type, obj[type + fn]);
    }
  },
  triggerEvent: function (el, type) {
    if ((el[type] || false) && typeof el[type] == "function") {
      el[type](el);
    }
  }
};

App.init();