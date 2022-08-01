
export abstract class AInMemoryStore {
    public abstract store: object[];


    protected _upsert(filter: object, update: object): void {
        const docs = this._find(filter);

        if (docs.length === 0) {
            this.store.push(this.deepCopy(update));
        } else {
            docs.forEach((doc) => {
                const index = this.store.findIndex((_doc) => {
                    return doc === _doc;
                });
                this.store[index] = { ...this.store[index], ...update };
            });
        }
    }

    private deepCopy<T>(object: T): T {
        return JSON.parse(JSON.stringify(object));
    }


    protected _find<T>(filter: object): T[] {
        const keys = Object.keys(filter);
        const values = Object.values(filter);

        return <T[]> <unknown> this.store.filter((object) => {
            for (let i = 0 ; i < keys.length ; i++) {
                if ((<never> object)[keys[i]] !== values[i]) {
                    return false;
                }
            }
            return true;
        });
    }


    protected _delete(filter: object): void {
        const docs = this._find(filter);
        docs.forEach((doc) => {
            this.store = this.store.filter(_doc => doc !== doc);
        });
    }


    public clear(): void {
        this.store = [];
    }
}