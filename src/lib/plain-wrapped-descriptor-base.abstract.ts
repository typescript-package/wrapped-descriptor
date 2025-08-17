// Abstract.
import { WrappedDescriptorCore } from './wrapped-descriptor-core.abstract';
// Interface.
import { WrappedPropertyDescriptor } from '@typedly/descriptor';
// Type.
import { SetterCallback, GetterCallback } from '@typedly/callback';
/**
 * @description The base abstraction class for plain wrapped descriptors.
 * @export
 * @abstract
 * @class PlainWrappedDescriptorBase
 * @template [O=any] The type of the object to define the descriptor on.
 * @template {keyof O} [K=keyof O] The key of the object to define the descriptor on.
 * @template {K extends keyof O ? O[K] : any} [V=K extends keyof O ? O[K] : any] The value type of the key in the object.
 * @template {boolean} [A=boolean] The type of active.
 * @template {boolean} [N=boolean] The type of enabled.
 * @template {boolean} [C=boolean] The type of configurable.
 * @template {boolean} [E=boolean] The type of enumerable.
 * @template {PlainWrappedDescriptorBase<O, K, V, A, N, C, E, D> | PropertyDescriptor} [D=PlainWrappedDescriptorBase<O, K, V, A, N, C, E, any>] 
 * @extends {WrappedDescriptorCore<O, K, V, A, N, C, E, D>}
 */
export abstract class PlainWrappedDescriptorBase<
  // Object.
  O = any,
  // Key.
  K extends keyof O = keyof O,
  // Value.
  V extends K extends keyof O ? O[K] : any = K extends keyof O ? O[K] : any,
  // Active.
  A extends boolean = boolean,
  // Enabled.
  N extends boolean = boolean,
  // Configurable.
  C extends boolean = boolean,
  // Enumerable.
  E extends boolean = boolean,
  // The type of the previous descriptor.
  D extends PlainWrappedDescriptorBase<O, K, V, A, N, C, E, D> | PropertyDescriptor = PlainWrappedDescriptorBase<O, K, V, A, N, C, E, any>,
> extends WrappedDescriptorCore<O, K, V, A, N, C, E, D> {
  /**
   * @description The active state of the descriptor.
   * @public
   * @type {(A | { onGet?: boolean; onSet?: boolean })}
   */
  public active: A | { onGet?: boolean; onSet?: boolean };
  
  /**
   * @description The enabled state of the descriptor.
   * @public
   * @type {N}
   */
  public enabled: N;
  
  /**
   * @description The index of the descriptor in the chain.
   * @public
   * @type {?number}
   */
  public index?: number;

  /**
   * @description The optional `get` method for the descriptor.
   * @public
   * @type {(this: O, descriptor?: D) => V}
   */
  public get: (this: O, descriptor?: D) => V;
  
  /**
   * @description The key of the descriptor.
   * @public
   * @type {K}
   */
  public key: K;
  
  /**
   * @description The on get hook function for the descriptor.
   * @public
   * @type {?GetterCallback<O, K>}
   */
  public onGet?: GetterCallback<O, K>;

  /**
   * @description The on set hook function for the descriptor.
   * @public
   * @type {?SetterCallback<O, K>}
   */
  public onSet?: SetterCallback<O, K>;
  
  /**
   * @description The previous descriptor.
   * @public
   * @type {D}
   */
  public previousDescriptor: D;

  /**
   * @description The private key for the descriptor.
   * @public
   * @type {PropertyKey}
   */
  public privateKey: PropertyKey;

  /**
   * @description The optional `set` method for the descriptor.
   * @public
   * @type {(this: O, value: V, descriptor?: D) => void}
   */
  public set: (this: O, value: V, descriptor?: D) => void;

  /**
   * Creates an instance of `WrappedDescriptorBase` child class.
   * @constructor
   * @param {O} object The object to define the descriptor on.
   * @param {K} key The key of the object to define the descriptor on.
   * @param {Partial<WrappedPropertyDescriptor<O, K, V, A, N, C, E, D>>} attributes The property descriptor to wrap.
   */
  constructor(
    object: O,
    key: K, 
    attributes: Partial<WrappedPropertyDescriptor<O, K, V, A, N, C, E, D>>,
  ) {
    super(attributes);

    delete this.index;
    delete this.onGet;
    delete this.onSet;
    // delete this.previousDescriptor;

    // Assign the properties.
    // Required.
    this.active = typeof attributes.active === 'boolean' || typeof attributes.active === 'object' ? attributes.active : PlainWrappedDescriptorBase.active as A;
    this.enabled = typeof attributes.enabled === 'boolean' || typeof attributes.enabled === 'object' ? attributes.enabled : PlainWrappedDescriptorBase.enabled as N;
    this.key = key;
    this.previousDescriptor = (attributes.previousDescriptor || Object.getOwnPropertyDescriptor(object, key)) as any;
    this.privateKey = attributes.privateKey || `_${String(key)}`;

    // Optional.
    attributes.index && (this.index = attributes.index);
    attributes.onGet && (this.onGet = attributes.onGet);
    attributes.onSet && (this.onSet = attributes.onSet);

    // Wraps the `get` getter and `set` setter  of the descriptor.
    const {get, set} = super.wrap(attributes);
    // Assigns the wrapped `get` getter and `set` setter to the descriptor.
    this.get = get!
    this.set = set!;
  }
}
