// Each js/units/uN.js calls UNIT({...}). Format:
// topics: [topic, title, guide HTML]
// q:      [topic, question, [4 options], correctIndex, explanation]
// cards:  [topic, term, definition]
// frq:    [topic, prompt, modelAnswer]
const UNITS=[];
function UNIT(u){UNITS[u.n-1]=u}
