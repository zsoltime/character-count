(function() {
  const counter = {
    counters: {
      chars: 0,
      words: 0,
      sentences: 0,
      paragraphs: 0,
      whitespace: 0,
      withoutSpaces: 0, // @todo wouldn't it be better?
      time: '<1 min'
    },
    init: function() {
      this.cacheDOM();
      this.bindEvents();
      this.render();
    },
    cacheDOM: function() {
      this.textarea = document.getElementById('text');
      this.characters = document.getElementById('chars');
      this.words = document.getElementById('words');
      this.sentences = document.getElementById('sentences');
      this.paragraphs = document.getElementById('paragraphs');
      this.whitespace = document.getElementById('whitespace');
      this.time = document.getElementById('time');
    },
    bindEvents: function() {
      this.textarea.addEventListener('keyup', this.count.bind(this));
    },
    render: function() {
      // @todo add countup to the counters
      this.characters.textContent = this.counters.chars;
      this.words.textContent = this.counters.words;
      this.sentences.textContent = this.counters.sentences;
      this.paragraphs.textContent = this.counters.paragraphs;
      this.whitespace.textContent = this.counters.whitespace;
      this.time.textContent = this.counters.time;
    },
    count: function() {
      const text = this.textarea.value;
      const words = text.match(/\b\w+\b/g); // @todo include 's
      const sentences = text.match(/\b[.|?|!]+/g);
      const whitespaces = text.match(/\s/g);

      this.counters.chars = text.length;
      this.counters.words = words === null ? 0 : words.length;
      this.counters.sentences = sentences === null ? 0 : sentences.length;
      this.counters.paragraphs = text.replace(/\n$/gm, '').split(/\n/).length;
      this.counters.whitespace = whitespaces === null? 0 : whitespaces.length;

      this.counters.time = (this.counters.words / 275 < 1) ?
        '<1 min' :
        Math.ceil(this.counters.words / 275) + ' mins';

      this.render();
    }
  };
  counter.init();
})();