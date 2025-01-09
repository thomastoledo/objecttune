import { ObjectTune } from '../src/object-tune';

describe('ObjectTuner', () => {
    it('should replace values based on predicate', () => {
        const obj = { a: 1, b: 2, c: 3 };
        const result = ObjectTune(obj).replace(value => value > 1, 0).value();
        expect(result).toEqual({ a: 1, b: 0, c: 0 });
    });

    it('should filter values based on predicate', () => {
        const obj = { a: 1, b: 2, c: 3 };
        const result = ObjectTune(obj).filter((key, value) => value > 1).value();
        expect(result).toEqual({ b: 2, c: 3 });
    });

    it('should deep replace values based on predicate', () => {
        const obj = { a: 1, b: { c: 2, d: 3 } };
        const result = ObjectTune(obj).deepReplace(value => value > 1, 0).value();
        expect(result).toEqual({ a: 1, b: { c: 0, d: 0 } });
    });

    it('should map values based on function', () => {
        const obj = { a: 1, b: 2, c: 3 };
        const result = ObjectTune(obj).map(value => value * 2).value();
        expect(result).toEqual({ a: 2, b: 4, c: 6 });
    });

    it('should merge objects', () => {
        const obj = { a: 1, b: 2 };
        const other = { c: 3, d: 4 };
        const result = ObjectTune(obj).merge(other).value();
        expect(result).toEqual({ a: 1, b: 2, c: 3, d: 4 });
    });

    it('should pick specified keys', () => {
        const obj = { a: 1, b: 2, c: 3 };
        const result = ObjectTune(obj).pick(['a', 'c']).value();
        expect(result).toEqual({ a: 1, c: 3 });
    });

    it('should omit specified keys', () => {
        const obj = { a: 1, b: 2, c: 3 };
        const result = ObjectTune(obj).omit(['b']).value();
        expect(result).toEqual({ a: 1, c: 3 });
    });

    it('should deep clone the object', () => {
        const obj = { a: 1, b: { c: 2 } };
        const result = ObjectTune(obj).deepClone().value();
        expect(result).toEqual(obj);
        expect(result.b).not.toBe(obj.b);
    });

    it('should check if key exists', () => {
        const obj = { a: 1, b: 2 };
        const result = ObjectTune(obj).hasKey('a');
        expect(result).toBe(true);
    });

    it('should get value by key with default', () => {
        const obj = { a: 1, b: 2 };
        const result = ObjectTune<any>(obj).get('c', 3);
        expect(result).toBe(3);
    });

    it('should delete specified properties', () => {
        const obj = { a: 1, b: 2, c: 3 };
        const result = ObjectTune(obj).deleteProperties(['b']).value();
        expect(result).toEqual({ a: 1, c: 3 });
    });
});