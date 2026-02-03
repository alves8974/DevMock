const express = require('express');
const cors = require('cors');
const { faker } = require('@faker-js/faker');
const QRCode = require('qrcode');
const { v4: uuidv4, v1: uuidv1 } = require('uuid');
const CryptoJS = require('crypto-js');
const { LoremIpsum } = require('lorem-ipsum');
const Color = require('color');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Helper function for password generation
function generatePassword(length = 12, options = {}) {
    const charset = {
        lowercase: 'abcdefghijklmnopqrstuvwxyz',
        uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
        numbers: '0123456789',
        symbols: '!@#$%^&*()_+~`|}{[]:;?><,./-='
    };

    let chars = charset.lowercase + charset.uppercase; // Default
    if (options.numbers) chars += charset.numbers;
    if (options.symbols) chars += charset.symbols;

    let password = '';
    for (let i = 0; i < length; i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
}

// 1. Password Generator
app.post('/api/generate/password', (req, res) => {
    try {
        const { length, numbers, symbols } = req.body;
        const password = generatePassword(length || 16, { numbers, symbols });
        res.json({ result: password });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 2. QR Code Generator
app.post('/api/generate/qr-code', async (req, res) => {
    try {
        const { text } = req.body;
        if (!text) return res.status(400).json({ error: 'Text input is required' });

        const qrDataURL = await QRCode.toDataURL(text);
        res.json({ result: qrDataURL });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 3. UUID Generator
app.post('/api/generate/uuid', (req, res) => {
    try {
        const { version } = req.body; // 'v1' or 'v4'
        const uuid = version === 'v1' ? uuidv1() : uuidv4();
        res.json({ result: uuid });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 4. Hash Generator
app.post('/api/generate/hash', (req, res) => {
    try {
        const { text, type } = req.body; // type: 'MD5', 'SHA1', 'SHA256'
        if (!text) return res.status(400).json({ error: 'Text input is required' });

        let hash = '';
        switch (type?.toUpperCase()) {
            case 'MD5': hash = CryptoJS.MD5(text).toString(); break;
            case 'SHA1': hash = CryptoJS.SHA1(text).toString(); break;
            case 'SHA512': hash = CryptoJS.SHA512(text).toString(); break;
            case 'SHA256':
            default:
                hash = CryptoJS.SHA256(text).toString();
        }
        res.json({ result: hash });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 5. Lorem Ipsum Generator
app.post('/api/generate/lorem', (req, res) => {
    try {
        const { count, type } = req.body; // type: 'paragraphs', 'sentences', 'words'
        const lorem = new LoremIpsum();
        let result = '';

        const num = count || 3;

        switch (type) {
            case 'words': result = lorem.generateWords(num); break;
            case 'sentences': result = lorem.generateSentences(num); break;
            case 'paragraphs':
            default:
                result = lorem.generateParagraphs(num);
        }

        res.json({ result });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 6. Random Color Generator
app.post('/api/generate/color', (req, res) => {
    try {
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
        const color = Color.rgb(r, g, b);

        res.json({
            hex: color.hex(),
            rgb: color.rgb().string(),
            hsl: color.hsl().string(),
            object: { r, g, b }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 7. Fake Name & Address Generator (Safe Data Only)
app.post('/api/generate/nameaddress', (req, res) => {
    try {
        // Force locale to US/UK or simple EN based on random choice or input?
        // Let's stick to US for default simplicity or provide locale
        /* 
           Note: Faker locales are now handled differently in newer versions.
        */

        const firstName = faker.person.firstName();
        const lastName = faker.person.lastName();
        const street = faker.location.streetAddress();
        const city = faker.location.city();
        const state = faker.location.state();
        const zip = faker.location.zipCode();
        const country = 'United States'; // Hardcoded for "US Context" as requested essentially

        const fullAddress = `${street}, ${city}, ${state} ${zip}, ${country}`;

        res.json({
            name: `${firstName} ${lastName}`,
            address: fullAddress,
            details: {
                firstName,
                lastName,
                street,
                city,
                state,
                zip,
                country
            }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 8. Address Generator (Multi-country)
const { allFakers } = require('@faker-js/faker');

app.post('/api/generate/address', (req, res) => {
    try {
        const { countryCode } = req.body; // 'US', 'CA', 'GB', 'DE', 'FR', 'IT', 'ES', 'NL'

        let selectedFaker = allFakers.en_US; // Default
        let countryName = 'United States';

        switch (countryCode) {
            case 'CA': selectedFaker = allFakers.en_CA; countryName = 'Canada'; break;
            case 'GB': selectedFaker = allFakers.en_GB; countryName = 'United Kingdom'; break;
            case 'DE': selectedFaker = allFakers.de; countryName = 'Germany'; break;
            case 'FR': selectedFaker = allFakers.fr; countryName = 'France'; break;
            case 'IT': selectedFaker = allFakers.it; countryName = 'Italy'; break;
            case 'ES': selectedFaker = allFakers.es; countryName = 'Spain'; break;
            case 'NL': selectedFaker = allFakers.nl; countryName = 'Netherlands'; break;
            case 'US':
            default:
                selectedFaker = allFakers.en_US;
                countryName = 'United States';
                break;
        }

        const street = selectedFaker.location.streetAddress();
        const city = selectedFaker.location.city();
        const state = selectedFaker.location.state(); // or region/province depending on locale
        const zip = selectedFaker.location.zipCode();

        const fullAddress = `${street}, ${city}, ${state} ${zip}, ${countryName}`;

        res.json({
            address: fullAddress,
            details: {
                street,
                city,
                state,
                zip,
                country: countryName
            }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
