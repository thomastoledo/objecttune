export class ObjectTuner {
    private obj: Record<string, any>;

    private constructor(obj: Record<string, any>) {
        this.obj = obj;
    }

    static of(obj: Record<string, any>): ObjectTuner {
        return new ObjectTuner(obj);
    }

    map(predicate: (value: any) => boolean, replacement: any): Record<string, any> {
        const result: Record<string, any> = {};
        for (const key in this.obj) {
            if (this.obj.hasOwnProperty(key)) {
                result[key] = predicate(this.obj[key]) ? replacement : this.obj[key];
            }
        }
        return result;
    }

    filter(predicate: (key: string, value: any) => boolean): Record<string, any> {
        const result: Record<string, any> = {};
        for (const key in this.obj) {
            if (this.obj.hasOwnProperty(key) && predicate(key, this.obj[key])) {
                result[key] = this.obj[key];
            }
        }
        return result;
    }

    deepMap(predicate: (value: any) => boolean, replacement: any): Record<string, any> {
        const recurse = (obj: any): any => {
            if (obj && typeof obj === 'object' && !Array.isArray(obj)) {
                const result: Record<string, any> = {};
                for (const key in obj) {
                    if (obj.hasOwnProperty(key)) {
                        result[key] = predicate(obj[key]) ? replacement : recurse(obj[key]);
                    }
                }
                return result;
            }
            return obj;
        };
        return recurse(this.obj);
    }

    renameKeys(mapping: Record<string, string>): Record<string, any> {
        const result: Record<string, any> = {};
        for (const key in this.obj) {
            if (this.obj.hasOwnProperty(key)) {
                const newKey = mapping[key] || key;
                result[newKey] = this.obj[key];
            }
        }
        return result;
    }
}

export const ObjectTune = (obj: Record<string, any>) => ObjectTuner.of(obj);
