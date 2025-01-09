# ObjectTuner

`ObjectTuner` is a TypeScript utility class for manipulating objects in a functional way. It provides methods for replacing, filtering, mapping, merging, picking, omitting, and cloning object properties.

## Installation

To install the package, use npm or yarn:

```bash
npm install object-tune
# or
yarn add object-tune
```

## Usage

### Creating an ObjectTuner

To create an `ObjectTuner` instance, use the `ObjectTune` function:

```typescript
import { ObjectTune } from 'object-tune';

const obj = { a: 1, b: 2, c: 3 };
const tuner = ObjectTune(obj);
```

### Methods

#### `replace(predicate: (value: any) => boolean, replacement: any): ObjectTuner<T>`

Replaces values in the object that match the predicate with the replacement value.

```typescript
const updated = tuner.replace(value => value === 2, 42).value();
console.log(updated); // { a: 1, b: 42, c: 3 }
```

#### `filter(predicate: (key: keyof T, value: T[keyof T]) => boolean): ObjectTuner<Partial<T>>`

Filters the object properties based on the predicate.

```typescript
const filtered = tuner.filter((key, value) => value > 1).value();
console.log(filtered); // { b: 2, c: 3 }
```

#### `deepReplace(predicate: (value: any) => boolean, replacement: any): ObjectTuner<T>`

Recursively replaces values in the object that match the predicate with the replacement value.

```typescript
const deepObj = { a: 1, b: { c: 2, d: 3 } };
const deepTuner = ObjectTune(deepObj);
const deepUpdated = deepTuner.deepReplace(value => value === 2, 42).value();
console.log(deepUpdated); // { a: 1, b: { c: 42, d: 3 } }
```

#### `map<U>(fn: (value: T[keyof T], key: keyof T) => U): ObjectTuner<Record<keyof T, U>>`

Maps the object properties using the provided function.

```typescript
const mapped = tuner.map(value => value * 2).value();
console.log(mapped); // { a: 2, b: 4, c: 6 }
```

#### `merge<U extends Record<string, any>>(other: U): ObjectTuner<T & U>`

Merges the object with another object.

```typescript
const merged = tuner.merge({ d: 4 }).value();
console.log(merged); // { a: 1, b: 2, c: 3, d: 4 }
```

#### `pick<K extends keyof T>(keys: K[]): ObjectTuner<Pick<T, K>>`

Picks the specified keys from the object.

```typescript
const picked = tuner.pick(['a', 'c']).value();
console.log(picked); // { a: 1, c: 3 }
```

#### `omit<K extends keyof T>(keys: K[]): ObjectTuner<Omit<T, K>>`

Omits the specified keys from the object.

```typescript
const omitted = tuner.omit(['b']).value();
console.log(omitted); // { a: 1, c: 3 }
```

#### `deepClone(): ObjectTuner<T>`

Creates a deep clone of the object.

```typescript
const cloned = tuner.deepClone().value();
console.log(cloned); // { a: 1, b: 2, c: 3 }
```

#### `hasKey(key: keyof T): boolean`

Checks if the object has the specified key.

```typescript
const hasKey = tuner.hasKey('a');
console.log(hasKey); // true
```

#### `get<K extends keyof T>(key: K, defaultValue?: T[K]): T[K]`

Gets the value of the specified key, or returns the default value if the key does not exist.

```typescript
const value = tuner.get('b', 0);
console.log(value); // 2
```

#### `deleteProperties(keys: string[]): ObjectTuner`

Deletes the specified properties from the object.

```typescript
const cleaned = tuner.deleteProperties(['b']).value();
console.log(cleaned); // { a: 1, c: 3 }
```

#### `value(): T`

Returns the current value of the object.

```typescript
const value = tuner.value();
console.log(value); // { a: 1, b: 2, c: 3 }
```

## License

This project is licensed under the MIT License.