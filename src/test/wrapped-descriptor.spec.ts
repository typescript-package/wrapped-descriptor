import { WrappedDescriptor } from '../lib';
import { Person } from "./person.test";
import { WrappedPropertyDescriptor } from '@typedly/descriptor';

console.group('WrappedDescriptor');

// describe('WrappedDescriptor should ', () => {
//   let key = 'age' as keyof Person;
//   let person = new Person();
//   let zeroWrap = new WrappedDescriptor(person, key);

//   beforeEach(() => {
//     person = new Person();
//     zeroWrap = new WrappedDescriptor(person, key);
//   });

//   it('create a zero-wrap descriptor', () => {
//     expect(zeroWrap).toBeInstanceOf(WrappedDescriptor);
//     expect(zeroWrap.key).toBe(key);
//     expect(person.age).toBe(27);
//   });
//   it('have a privateKey', () => {
//     expect(zeroWrap.privateKey).toBe('_age');
//   });
//   it('have a previousDescriptor', () => {
//     expect(zeroWrap.previousDescriptor).toBeDefined();
//   });
//   it('have a configurable property', () => {
//     expect(zeroWrap.configurable).toBeUndefined();
//   });
//   it('have an enumerable property', () => {
//     expect(zeroWrap.enumerable).toBeUndefined();
//   });
//   it('have an active state', () => {
//     expect(zeroWrap.active).toBe(true);
//   });
//   it('have an enabled state', () => {
//     expect(zeroWrap.enabled).toBe(true);
//   });
//   it('have an index', () => {
//     expect(zeroWrap.index).toBeUndefined();
//   });
//   it('have an onGet method', () => {
//     expect(zeroWrap.onGet).toBeUndefined();
//   });
//   it('have an onSet method', () => {
//     expect(zeroWrap.onSet).toBeUndefined(); // The zero-wrap descriptor does not have onGet and onSet methods.
//   });
//   it('have a get method', () => {
//     expect(zeroWrap.get).toBeDefined();
//     expect(typeof zeroWrap.get).toBe('function');
//   });
//   it('have a set method', () => {
//     expect(zeroWrap.set).toBeDefined();
//     expect(typeof zeroWrap.set).toBe('function');
//   });
//   it('have a value changed', () => {
//     person.age = 37;
//     expect(person.age).toBe(37);
//   });
//   it('have a tagName', () => {
//     expect(zeroWrap[Symbol.toStringTag]).toBe('WrappedDescriptor');
//   });
// });

const person = new Person();

// 1. Wrap the `age` property of the `Person` instance with a `WrappedDescriptor`.
const firstWrap = new WrappedDescriptor(person, 'age', {
  active: true as boolean,
  onGet: (key, previousValue, value) => (console.debug(`#1. Get value: ${value} for key: ${key}`, previousValue), value),
  onSet: (value, previousValue, key) => (console.debug(`#1. Set value: ${value}`, previousValue, key), value),
  previousDescriptor: Object.getOwnPropertyDescriptor(person, 'age'),
  // previousDescriptor: new WrappedDescriptor(person, 'age', { active: false })
});

Object.defineProperty(person, 'age', firstWrap);

console.log('WrappedDescriptor instance:', firstWrap);
// console.log('WrappedDescriptor configurable:', firstWrap.configurable);
// console.log('WrappedDescriptor enumerable:', firstWrap.enumerable);

// // firstWrap.controller.activate();

// console.debug(`person.age = 30 `, (person.age = 30));

// Wrap the age property with a modified `set` to use `descriptor` properties.
const secondWrap = new WrappedDescriptor(person, 'age', {
  active: true as boolean,
  onSet(value, previousValue, key) {
    console.log(`#2 Setting age to: ${value}`, previousValue);
    return value;
  },
  previousDescriptor: firstWrap
}); 

Object.defineProperty(person, 'age', secondWrap);

// // firstWrap.deactivate();
// secondWrap.activate();

console.debug(`person.age = 137 `, (person.age = 137));
console.debug(`person.age = 127 `, (person.age = 127));

// const thirdWrap = new WrappedDescriptor(person, 'age', {
//   active: false,
//   previousDescriptor: secondWrap,
//   set(value, descriptor) {
//     console.log(`#3 Setting age to: ${value}`, descriptor);
//   },
//   get(this: Person, descriptor) {
//     console.log(`#3 Getting age value`, descriptor?.previousDescriptor);
//     return this[descriptor!.privateKey as keyof Person] as number;
//   },
// });

// Object.defineProperty(person, 'age', thirdWrap);

// person.age = 147;

console.groupEnd();
