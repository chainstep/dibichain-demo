export abstract class AInMemoryStore {
    public abstract store: unknown[];


    protected _upsert(object: unknown, keys: string[]): void {
        const index = this.store.findIndex(_object => this.hasSameValues(_object, object, keys));

        if (index === -1) {
            this.store.push(this.deepCopy(object));
        } else {
            this.store[index] = this.deepCopy(object);
        }
    }

    private hasSameValues(_object: unknown, object: unknown, keys: string[]): boolean {
        const sameValues = <boolean[]> [];
        keys.forEach(key => sameValues.push(false));
        keys.forEach((key, i) => sameValues[i] = (<never> _object)[key] === (<never> object)[key]);

        for (let i = 0 ; i < sameValues.length ; i++) {
            const sameValue = sameValues[i];
            if (!sameValue) {
                return false;
            }
        }
        return true;
    }

    protected deepCopy<T>(object: T): T {
        return JSON.parse(JSON.stringify(object));
    }


    protected _find<T>(key: string, value: string | boolean | number): T[] {
        return (<T[]> this.store).filter(object => (<never> object)[key] === value);
    }


    protected _delete(key: string, value: string | boolean | number): void {
        this.store = this.store.filter(object => (<never> object)[key]!== value);
    }


    public clear(): void {
        this.store = [];
    }
}