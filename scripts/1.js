// function one() {
//   console.log(this.name);
// }

// const obj = {
//   name: 'John',
// };

// const obj2 = {
//   name: 'Ivan',
// };

// obj.printName = one;

// obj2.printName = one;

// const newName = obj.printName;

// obj.printName();

// const boundOne = newName.bind(obj);
// const boundTwo = newName.bind(obj2);

// boundOne();
// boundTwo();

// let foo = () => {};

// let foo = function () {};

// function foo() {}



class First {
  name = 'hok';

  method(arg) {
    console.log(arg);
  }
  arrMethod() {
    [1, 2, 3].forEach((item) => {
      this.method(item)
    })
  }

  arrMethodTwo() {
    // let self = this;
    // [1, 2, 3].forEach(function (item) {
    //   self.method(item)
    // })
 
    let func = function (item) {
      this.method(item)
    };
    
    let boundFunc = func.bind(this);

    [1, 2, 3].forEach(boundFunc)
  }
}

const first = new First()
// first.arrMethodTwo();

const arr = [4, 5, 6];
arr.forEach(console.log)


