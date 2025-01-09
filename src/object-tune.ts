export class ObjectTuner<T extends Record<string, any> = Record<string, any>> {
    private obj: T;

    private constructor(obj: T) {
        this.obj = obj;
    }

    static of<T extends Record<string, any>>(obj: T): ObjectTuner<T> {
        return new ObjectTuner<T>(obj);
    }

    replace(predicate: (value: any) => boolean, replacement: any): ObjectTuner<T> {
        const result = {} as T;
        for (const key in this.obj) {
            if (Object.prototype.hasOwnProperty.call(this.obj, key)) {
                result[key] = predicate(this.obj[key]) ? replacement : this.obj[key];
            }
        }
        return new ObjectTuner(result);
    }

    filter(predicate: (key: keyof T, value: T[keyof T]) => boolean): ObjectTuner<Partial<T>> {
        const result = {} as Partial<T>;
        for (const key in this.obj) {
            if (Object.prototype.hasOwnProperty.call(this.obj, key) && predicate(key, this.obj[key])) {
                result[key] = this.obj[key];
            }
        }
        return new ObjectTuner(result);
    }

    deepReplace(predicate: (value: any) => boolean, replacement: any): ObjectTuner<T> {
        const recurse = (obj: any): any => {
            if (obj && typeof obj === 'object' && !Array.isArray(obj)) {
                const result: Record<string, any> = {};
                for (const key in obj) {
                    if (Object.prototype.hasOwnProperty.call(obj, key)) {
                        result[key] = predicate(obj[key]) ? replacement : recurse(obj[key]);
                    }
                }
                return result;
            }
            return obj;
        };
        return new ObjectTuner(recurse(this.obj));
    }

    map<U>(fn: (value: T[keyof T], key: keyof T) => U): ObjectTuner<Record<keyof T, U>> {
        const result = {} as Record<keyof T, U>;
        for (const key in this.obj) {
            if (Object.prototype.hasOwnProperty.call(this.obj, key)) {
                result[key] = fn(this.obj[key], key);
            }
        }
        return new ObjectTuner(result);
    }

    merge<U extends Record<string, any>>(other: U): ObjectTuner<T & U> {
        return new ObjectTuner({ ...this.obj, ...other });
    }

    pick<K extends keyof T>(keys: K[]): ObjectTuner<Pick<T, K>> {
        return this.filter((key) => keys.includes(key as K)) as unknown as ObjectTuner<Pick<T, K>>;
    }

    omit<K extends keyof T>(keys: K[]): ObjectTuner<Omit<T, K>> {
        return this.filter((key) => !keys.includes(key as K)) as unknown as ObjectTuner<Omit<T, K>>;
    }

    deepClone(): ObjectTuner<T> {
        return this.deepReplace(() => false, null);
    }

    hasKey(key: keyof T): boolean {
        return key in this.obj;
    }

    get<K extends keyof T>(key: K, defaultValue?: T[K]): T[K] {
        return key in this.obj ? this.obj[key] : (defaultValue as T[K]);
    }

    deleteProperties(keys: string[]): ObjectTuner {
        const result: Record<string, any> = {};
        for (const key in this.obj) {
            if (this.obj.hasOwnProperty(key) && !keys.includes(key)) {
                result[key] = this.obj[key];
            }
        }
        return new ObjectTuner(result);
    }

    value(): T {
        return this.obj;
    }
}

export const ObjectTune = <T extends Record<string, any>>(obj: T) => ObjectTuner.of(obj);