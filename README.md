## 1) var, let, const
- `var`: function scoped, can redeclare & reassign  
- `let`: block scoped, cannot redeclare, can reassign  
- `const`: block scoped, cannot redeclare or reassign  

## 2) map(), forEach(), filter()
- `forEach`: loop over array, no return  
- `map`: loop & return new array  
- `filter`: return array with elements that meet condition  

## 3) Arrow Functions
- Shorter way to write functions  
- Does not create its own `this`  

## 4) Destructuring
Extract values from arrays/objects

- For Example:
const [x, y] = [1, 2];
const {name} = {name:'Afnan'};

## 5) Template Literals
- Use backticks ` for strings
- Can embed variables and make multi-line strings

- For Example:
const name = 'Afnan';
console.log(`Hello ${name}`);
