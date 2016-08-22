const Markov = require('markov-strings');
const shuffle = require('shuffle-array');
const fs = require('fs');


// Generate very random sentences
const loose_options = {
  stateSize: 1,
  maxLength: 140,
  minWords: 4,
  minScore: 15,
  checker: sentence => {
    return sentence.endsWith('.') || sentence.endsWith(',');
  }
};

// Generate better but less random sentences
const tight_options = {
  stateSize : 2,
  maxLength : 140,
  minWords : 4,
  minScore: 15,
  checker: sentence => {
    return sentence.endsWith('.') || sentence.endsWith(',');
  }
};

const high = 4, low = 1;

module.exports =  class SportsGenerator {

  constructor() {

    // Read interview cliches from disk
    const data = fs.readFileSync('interviews.txt').toString().split('\n');

    // Instantiate the generators
    const loose_markov = new Markov(data, loose_options);
    const tight_markov = new Markov(data, tight_options);

    // Build the corpora
    Promise.all([loose_markov.buildCorpus(), tight_markov.buildCorpus()])

  }

  generate() {
    const num_loose = Math.floor(Math.random() * (high - low) + low);
    const num_tight = Math.floor(Math.random() * (high - low) + low);
    var res = [];

    const build_res = (num_sentences, model, cb) => {
      for (let i = 0; i < num_sentences; i++) {
        model.generateSentence()
        .then(result => {
          res.push(result);
          if (i + 1 == num_sentences) {
            cb(res)
          }
        });
      }
    }
    
    const p1 = new Promise(function(resolve,reject) {
      return build_res(num_loose, loose_markov, resolve);
    });

    const p2 = new Promise(function(resolve,reject) {
      return build_res(num_tight, tight_markov, resolve);
    });
    
    Promise.all([p1, p2]).then( (vals) => {
        // randomize results
        shuffle(res);
        console.log('here');

        // for apperance, we want the first sentence to make sense
        // so let's force it with the tighter chain
        tight_markov.generateSentence()
        .then(result => {
          res.unshift(result);
          // Set picks out the uniq's, and concat each string
          var interview = [...new Set(res)].map( item => {
            return item.string
          }).join(' ');

          console.log(interview);
        });
      });
  }
}

