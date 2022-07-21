class Cluster<K, V> extends Map<K, V> {
    ensure(key: K, value: any) {
        if (this.has(key)) return this.get(key);
        else this.set(key, value);

        return value;
    }

    hasAll(keys: Array<K>) {
        return keys.every(key => super.has(key));
    }
    
    hasAny(keys: Array<K>) {
        return keys.some(key => super.has(key));
    }

    first(key = false) {
        return this[key ? 'keys' : 'values']().next().value;
    }

    random(key = false) {
        return [...this[key ? 'keys' : 'values']()][Math.floor(Math.random() * this.size)];
    }

    find(filter: Function) {
        if (typeof filter !== 'function') return;
        // @ts-ignore
        return [...this.values()].filter(filter)[0]; 
    }
}

export default Cluster;