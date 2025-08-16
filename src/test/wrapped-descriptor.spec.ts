import { WrappedDescriptor } from '../lib';
import { Person } from "./person.test";

console.group('WrappedDescriptor');

describe('WrappedDescriptor should ', () => {
  let key = 'age' as keyof Person;
  let person = new Person();
  let zeroWrap = new WrappedDescriptor(person, key);

  beforeEach(() => {
    person = new Person();
    zeroWrap = new WrappedDescriptor(person, key);
  });

  it('create a zero-wrap descriptor', () => {
    expect(zeroWrap).toBeInstanceOf(WrappedDescriptor);
    expect(zeroWrap.key).toBe(key);
    expect(person.age).toBe(27);
  });
  it('have a privateKey', () => {
    expect(zeroWrap.privateKey).toBe('_age');
  });
  it('have a previousDescriptor undefined', () => {
    expect(zeroWrap.previousDescriptor).toBeUndefined();
  });
  it('have a configurable property', () => {
    expect(zeroWrap.configurable).toBeUndefined();
  });
  it('have an enumerable property', () => {
    expect(zeroWrap.enumerable).toBeUndefined();
  });
  it('have an active state', () => {
    expect(zeroWrap.active).toBe(true);
  });
  it('have an enabled state', () => {
    expect(zeroWrap.enabled).toBe(true);
  });
  it('have an index', () => {
    expect(zeroWrap.index).toBeUndefined();
  });
  it('have an onGet method', () => {
    expect(zeroWrap.onGet).toBeUndefined();
  });
  it('have an onSet method', () => {
    expect(zeroWrap.onSet).toBeUndefined(); // The zero-wrap descriptor does not have onGet and onSet methods.
  });
  it('have a get method', () => {
    expect(zeroWrap.get).toBeDefined();
    expect(typeof zeroWrap.get).toBe('function');
  });
  it('have a set method', () => {
    expect(zeroWrap.set).toBeDefined();
    expect(typeof zeroWrap.set).toBe('function');
  });
  it('have a value changed', () => {
    person.age = 37;
    expect(person.age).toBe(37);
  });
  it('have a tagName', () => {
    expect(zeroWrap[Symbol.toStringTag]).toBe('WrappedDescriptor');
  });
});

console.groupEnd();
