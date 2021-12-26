const MORSE_TABLE = {
    '.-':     'a',
    '-...':   'b',
    '-.-.':   'c',
    '-..':    'd',
    '.':      'e',
    '..-.':   'f',
    '--.':    'g',
    '....':   'h',
    '..':     'i',
    '.---':   'j',
    '-.-':    'k',
    '.-..':   'l',
    '--':     'm',
    '-.':     'n',
    '---':    'o',
    '.--.':   'p',
    '--.-':   'q',
    '.-.':    'r',
    '...':    's',
    '-':      't',
    '..-':    'u',
    '...-':   'v',
    '.--':    'w',
    '-..-':   'x',
    '-.--':   'y',
    '--..':   'z',
    '.----':  '1',
    '..---':  '2',
    '...--':  '3',
    '....-':  '4',
    '.....':  '5',
    '-....':  '6',
    '--...':  '7',
    '---..':  '8',
    '----.':  '9',
    '-----':  '0',
};

const REVERSE_MORSE = Object.entries(MORSE_TABLE)
    .reduce((X, [key, value]) => (X[value] = key, X), {});

const CODES_REVERSE_MORSE = Object.entries(REVERSE_MORSE)
    .reduce((X, [key, value]) => (X[key] = value.replace(/./g, c => ({'.': '10', '-': '11'})[c]).padStart(10, '0'), X), {});

function encode(expr) {
    return expr
        .split(' ')
        .map(word => word.replace(/./g, c => CODES_REVERSE_MORSE[c]))
        .join('**********');
}

function decodeWord(word) {
    return word
        .match(/.{10}/g)
        .map(ten => ten.replace(/.{2}/g, c => ({'00': '', '10': '.', '11': '-'})[c]))
        .map(x => MORSE_TABLE[x])
        .join('');
}

function decode(expr) {
    return expr
        .split('**********')
        .map(decodeWord)
        .join(' ');
}

module.exports = {
    decode
}