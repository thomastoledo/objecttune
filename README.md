# ObjectTune

**ObjectTune** is a lightweight TypeScript library for dynamically transforming, filtering, and restructuring object properties based on custom rules. It simplifies handling complex object transformations with a clean and intuitive API.

---

## Features

- **Dynamic Property Mapping**: Replace object property values using custom predicates.
- **Property Filtering**: Remove or keep properties based on key-value conditions.
- **Recursive Transformation**: Apply transformations deeply to nested objects.
- **Key Renaming**: Easily rename object keys with a mapping.

---

## Installation

```bash
npm install object-tune
```

---

## Usage

```typescript
import { ObjectTune } from 'object-tune';

const obj = {
    description: 'ALL',
    age: 'ALL',
    status: 'Active',
    classroom: 'ALL',
    nested: { key1: 'ALL', key2: 'value2' },
};

// Replace all 'ALL' values with null
const mapped = ObjectTune(obj).map(value => value === 'ALL', null);
console.log(mapped);

// Filter out keys where the value is 'ALL'
const filtered = ObjectTune(obj).filter((key, value) => value !== 'ALL');
console.log(filtered);

// Recursively replace 'ALL' with null
const deepMapped = ObjectTune(obj).deepMap(value => value === 'ALL', null);
console.log(deepMapped);

// Rename object keys
const renamed = ObjectTune(obj).renameKeys({ description: 'desc', classroom: 'group' });
console.log(renamed);
```

---

## API

### `map(predicate, replacement)`
Maps property values based on the given predicate.

### `filter(predicate)`
Filters properties based on key-value conditions.

### `deepMap(predicate, replacement)`
Recursively maps values in deeply nested objects.

### `renameKeys(mapping)`
Renames keys based on a provided mapping.

---

## License
MIT