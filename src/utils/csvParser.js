const fs = require('fs');

function parseCSVToJSON(filePath) {
    const data = fs.readFileSync(filePath, 'utf8');
    const lines = data.trim().split('\n');
    const headers = lines[0].split(',').map(h => h.trim());

    const result = [];

    for (let i = 1; i < lines.length; i++) {
        const obj = {};
        const additional = {};
        const nested = {};
        const values = lines[i].split(',').map(v => v.trim());

        for (let j = 0; j < headers.length; j++) {
            const key = headers[j];
            const value = values[j];
            setNestedProperty(nested, key, value);
        }

        const name = `${nested.name.firstName} ${nested.name.lastName}`;
        const age = parseInt(nested.age, 10);
        const address = nested.address || null;

        delete nested.name;
        delete nested.age;
        delete nested.address;

        result.push({
            name,
            age,
            address,
            additional_info: nested
        });
    }

    return result;
}

function setNestedProperty(obj, path, value) {
    const keys = path.split('.');
    let current = obj;
    for (let i = 0; i < keys.length - 1; i++) {
        const key = keys[i];
        if (!current[key]) current[key] = {};
        current = current[key];
    }
    current[keys[keys.length - 1]] = value;
}

module.exports = {
    parseCSVToJSON
};
