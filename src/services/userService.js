const pool = require('../db/pool');

async function insertUsers(users) {
    const client = await pool.connect();

    try {
        await client.query('BEGIN');

        const insertQuery = `
            INSERT INTO users(name, age, address, additional_info)
            VALUES($1, $2, $3, $4)
        `;

        for (const user of users) {
            await client.query(insertQuery, [
                user.name,
                user.age,
                user.address ? JSON.stringify(user.address) : null,
                Object.keys(user.additional_info).length ? JSON.stringify(user.additional_info) : null
            ]);
        }

        await client.query('COMMIT');
    } catch (err) {
        await client.query('ROLLBACK');
        throw err;
    } finally {
        client.release();
    }
}

async function printAgeDistribution() {
    const res = await pool.query('SELECT age FROM users');
    const ages = res.rows.map(row => row.age);

    const distribution = {
        '<20': 0,
        '20-40': 0,
        '40-60': 0,
        '>60': 0
    };

    ages.forEach(age => {
        if (age < 20) distribution['<20']++;
        else if (age <= 40) distribution['20-40']++;
        else if (age <= 60) distribution['40-60']++;
        else distribution['>60']++;
    });

    const total = ages.length;

    console.log("Age Group % Distribution");
    for (const [group, count] of Object.entries(distribution)) {
        const percent = ((count / total) * 100).toFixed(2);
        console.log(`${group}: ${percent}%`);
    }
}

module.exports = {
    insertUsers,
    printAgeDistribution
};
