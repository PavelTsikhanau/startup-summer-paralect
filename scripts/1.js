function one () {
  console.log(this.name)
}

const obj = {
  name: 'John'
}

const obj2 = {
  name: 'Ivan'
}

obj.printName = one;

obj2.printName = one;

const newName = obj.printName;

obj.printName()

const boundOne =  newName.bind(obj)
const boundTwo =  newName.bind(obj2)

boundOne();
boundTwo()
