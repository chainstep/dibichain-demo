export abstract class AInMemoryStore {
    public abstract store: unknown;

    protected deepCopy<T>(object: T): T {
        return JSON.parse(JSON.stringify(object));
    }

    public clear(): void {
        this.store = [];
    }
}