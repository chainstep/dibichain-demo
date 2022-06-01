export abstract class AInMemoryStore {
    public abstract store: unknown[];


    protected _upsert(object: unknown, key: string): void {
        const index = this.store.findIndex((_object) => {
            return (<never> _object)[key] === (<never> object)[key];
        });
        if (index === -1) {
            this.store.push(this.deepCopy(object));
        } else {
            this.store[index] = this.deepCopy(object);
        }
    }

    private deepCopy<T>(object: T): T {
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