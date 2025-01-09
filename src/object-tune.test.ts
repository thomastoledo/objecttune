import { ObjectTune } from './object-tune';

describe('ObjectTune', () => {
    const obj = {
        description: 'ALL',
        client: 'ALL',
        statut: 'Active',
        clientGroup: 'ALL',
        nested: { key1: 'ALL', key2: 'value2' },
    };

    it('should map values correctly', () => {
        const result = ObjectTune(obj).map(value => value === 'ALL', null);
        expect(result).toEqual({
            description: null,
            client: null,
            statut: 'Active',
            clientGroup: null,
            nested: { key1: 'ALL', key2: 'value2' },
        });
    });

    it('should filter keys correctly', () => {
        const result = ObjectTune(obj).filter((key, value) => value !== 'ALL');
        expect(result).toEqual({
            statut: 'Active',
            nested: { key1: 'ALL', key2: 'value2' },
        });
    });

    it('should deep map values correctly', () => {
        const result = ObjectTune(obj).deepMap(value => value === 'ALL', null);
        expect(result).toEqual({
            description: null,
            client: null,
            statut: 'Active',
            clientGroup: null,
            nested: { key1: null, key2: 'value2' },
        });
    });

    it('should rename keys correctly', () => {
        const mapping = { description: 'desc', client: 'customer', statut: 'status' };
        const result = ObjectTune(obj).renameKeys(mapping);
        expect(result).toEqual({
            desc: 'ALL',
            customer: 'ALL',
            status: 'Active',
            clientGroup: 'ALL',
            nested: { key1: 'ALL', key2: 'value2' },
        });
    });
});
