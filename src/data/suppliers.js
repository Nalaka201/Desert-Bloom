import ceylonLogo from '../assets/ceylon.png';
import islandLogo from '../assets/island.png';
import ecoLogo from '../assets/eco.png';
import agritechLogo from '../assets/agritech.png';
import greenLogo from '../assets/green.png';
import lankaLogo from '../assets/lanka.png';

export const suppliers = [
    {
        id: 'ceylon-seeds',
        name: 'Ceylon Seeds Ltd.',
        logo: ceylonLogo,
        rating: 4.9,
        reviews: 60,
        location: 'Colombo, Sri Lanka',
        products: '50 Products available',
        category: 'all',
        desc: 'Premium quality rice and vegetables seeds for Sri Lankan farmers.',
        about: 'Ceylon Seeds Ltd is a leading seed supplier in Sri Lanka, committed to providing farmers with high-quality, certified seeds for optimal crop yields. With over 15 years of experience in the agricultural sector, we understand the challenges farmers face and provide solutions through superior seed varieties.',
        stats: [
            { label: 'Years Experience', value: '15+' },
            { label: 'Happy Farmers', value: '2000+' },
            { label: 'Seeds Varieties', value: '50+' },
            { label: 'Satisfaction', value: '95%' }
        ],
        seeds: [
            {
                id: 1,
                name: 'Brown Rice',
                code: 'BR-01',
                weight: '1 kg',
                price: 650.00,
                image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?q=80&w=400&auto=format&fit=crop',
                season: 'May - Oct',
                reviews: 20,
                days: 60,
                rating: 4.7,
                category: 'Grains'
            },
            {
                id: 2,
                name: 'Sweet Corn',
                code: 'SC-02',
                weight: '1 kg',
                price: 1200.00,
                image: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?q=80&w=400&auto=format&fit=crop',
                season: 'May - Nov',
                reviews: 16,
                days: 90,
                rating: 4.5,
                category: 'Grains'
            },
            {
                id: 3,
                name: 'Tomato',
                code: 'TM-03',
                weight: '1 kg',
                price: 450.00,
                image: 'https://images.unsplash.com/photo-1592924357228-91a1ad907bc6?q=80&w=400&auto=format&fit=crop',
                season: 'Apr - Sep',
                reviews: 14,
                days: 45,
                rating: 4.5,
                category: 'Vegetables'
            },
            {
                id: 4,
                name: 'Pumpkin',
                code: 'PK-04',
                weight: '1 kg',
                price: 1000.00,
                image: 'https://images.unsplash.com/photo-1506867051823-eac2228b80ee?q=80&w=400&auto=format&fit=crop',
                season: 'Feb - Jun',
                reviews: 10,
                days: 120,
                rating: 4.5,
                category: 'Vegetables'
            },
        ]
    },
    {
        id: 'island-harvest',
        name: 'Island Harvest Co.',
        logo: islandLogo,
        rating: 4.8,
        reviews: 45,
        location: 'Anuradhapura, Sri Lanka',
        products: '25 Products available',
        category: 'veg',
        desc: 'Organic and traditional seed varieties for sustainable farming.',
        about: 'Island Harvest Co. specializes in preserving traditional Sri Lankan seed varieties. We focus on organic farming practices and sustainable agriculture to empower local farming communities.',
        stats: [
            { label: 'Years Experience', value: '10+' },
            { label: 'Happy Farmers', value: '1200+' },
            { label: 'Seeds Varieties', value: '30+' },
            { label: 'Satisfaction', value: '92%' }
        ],
        seeds: [
            { id: 1, name: 'Keeri Samba', code: 'KS-01', weight: '10 kg', price: 12000.00 },
            { id: 2, name: 'Suwandel', code: 'SW-02', weight: '5 kg', price: 8000.00 },
            { id: 3, name: 'Kalu Heenati', code: 'KH-03', weight: '5 kg', price: 9500.00 },
        ]
    },
    {
        id: 'eco-farm',
        name: 'Eco Farm Seeds',
        logo: ecoLogo,
        rating: 4.5,
        reviews: 30,
        location: 'Kurunegala, Sri Lanka',
        products: '30 Products available',
        category: 'fruit',
        desc: 'Certified seeds aimed with sustainable farming practices.',
        about: 'Eco Farm Seeds is dedicated to providing environmentally friendly agricultural solutions. Our seeds are non-GMO and certified for organic growth across various climates in Sri Lanka.',
        stats: [
            { label: 'Years Experience', value: '8+' },
            { label: 'Happy Farmers', value: '800+' },
            { label: 'Seeds Varieties', value: '40+' },
            { label: 'Satisfaction', value: '88%' }
        ],
        seeds: [
            { id: 1, name: 'Hybrid Papaya', code: 'HP-10', weight: '1 kg', price: 4500.00 },
            { id: 2, name: 'Mango Saplings', code: 'MG-20', weight: 'Pack of 5', price: 3500.00 },
            { id: 3, name: 'Passion Fruit', code: 'PF-30', weight: '500g', price: 2500.00 },
        ]
    },
    {
        id: 'agritech',
        name: 'AgriTech Solutions',
        logo: agritechLogo,
        rating: 4.7,
        reviews: 55,
        location: 'Kandy, Sri Lanka',
        products: '40 Products available',
        category: 'veg',
        desc: 'Hybrid varieties for high yield.',
        about: 'AgriTech Solutions brings the latest in agricultural technology to Sri Lankan farmers. Our hybrid seed varieties are engineered for maximum yield and disease resistance.',
        stats: [
            { label: 'Years Experience', value: '12+' },
            { label: 'Happy Farmers', value: '1800+' },
            { label: 'Seeds Varieties', value: '60+' },
            { label: 'Satisfaction', value: '94%' }
        ],
        seeds: [
            { id: 1, name: 'Hybrid Tomato', code: 'HT-01', weight: '500g', price: 5500.00 },
            { id: 2, name: 'Bell Pepper', code: 'BP-05', weight: '250g', price: 4200.00 },
            { id: 3, name: 'Cucumber Hybrid', code: 'CH-12', weight: '1 kg', price: 3800.00 },
        ]
    },
    {
        id: 'green-valley',
        name: 'Green Valley',
        logo: greenLogo,
        rating: 4.6,
        reviews: 40,
        location: 'Badulla, Sri Lanka',
        products: '20 Products available',
        category: 'veg',
        desc: 'Specialized in hill country vegetables.',
        about: 'Green Valley provides premium seeds specifically suited for the cooler climates of the Sri Lankan hill country. We specialize in exotic vegetables and high-altitude crops.',
        stats: [
            { label: 'Years Experience', value: '7+' },
            { label: 'Happy Farmers', value: '950+' },
            { label: 'Seeds Varieties', value: '25+' },
            { label: 'Satisfaction', value: '90%' }
        ],
        seeds: [
            { id: 1, name: 'Carrot Nantes', code: 'CN-22', weight: '1 kg', price: 2800.00 },
            { id: 2, name: 'Leeks Highland', code: 'LH-33', weight: '500g', price: 3200.00 },
            { id: 3, name: 'Cabbage Green', code: 'CG-44', weight: '1 kg', price: 2500.00 },
        ]
    },
    {
        id: 'lanka-pohora',
        name: 'Lanka Pohora',
        logo: lankaLogo,
        rating: 4.4,
        reviews: 25,
        location: 'Galle, Sri Lanka',
        products: '15 Products available',
        category: 'fruit',
        desc: 'Fruit saplings and fertilizer.',
        about: 'Lanka Pohora combines high-quality fruit saplings with specialized fertilizers to ensure your orchard thrives. We provide end-to-end solutions for fruit farmers in the southern province.',
        stats: [
            { label: 'Years Experience', value: '20+' },
            { label: 'Happy Farmers', value: '3000+' },
            { label: 'Seeds Varieties', value: '20+' },
            { label: 'Satisfaction', value: '85%' }
        ],
        seeds: [
            { id: 1, name: 'Coconut Sapling', code: 'CS-99', weight: 'Single', price: 850.00 },
            { id: 2, name: 'Sweet Corn', code: 'OF-50', weight: '50 kg', price: 4500.00 },
            { id: 3, name: 'Banana Suckers', code: 'BS-10', weight: 'Bundle of 10', price: 2000.00 },
        ]
    }
];
