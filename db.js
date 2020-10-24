// db.js  ----[json server]
module.exports = () => {
    function uuid() {
        return Math.random().toString(16).slice(2)
    }

    function getRandomNumber(max, min=0) {
        return Math.floor(Math.random() * (max - min) + min);
    }

    const type = ["Ram", "Motherboard", "Graphics Card"];

    const name = [
        [
            {"name": "Corsair Vengeance LED",          "details": "Best RAM",                    "url": "https://cdn.mos.cms.futurecdn.net/SWkrDZbyjj7EsW8mBLhpHT-970-80.jpg.webp"},
            {"name": "G.Skill Trident Z RGB",          "details": "Best DDR4 RAM",               "url": "https://cdn.mos.cms.futurecdn.net/Vqoha9GFY6krezcWbon7oa-970-80.jpg.webp"},
            {"name": "Kingston HyperX Predator",       "details": "Best DDR3 RAM",               "url": "https://cdn.mos.cms.futurecdn.net/Gjnwh5NDUiqkL6RM6EXt2R-970-80.jpg.webp"},
            {"name": "Kingston HyperX Fury",           "details": "Best Budget RAM",             "url": "https://cdn.mos.cms.futurecdn.net/AzZwmE54LL8jEvJYiVJkrd-970-80.jpg.webp"},
            {"name": "Corsair Dominator Platinum RGB", "details": "Best High-end RAM",           "url": "https://cdn.mos.cms.futurecdn.net/cYzqxcFCdUGopbsC4s8uZQ-970-80.jpg.webp"},
            {"name": "HyperX Fury RGB 3733MHz",        "details": "Best high frequency RAM",     "url": "https://cdn.mos.cms.futurecdn.net/oRy2ZtLE8CBL9zbP72Hqmc-970-80.jpg.webp"},
            {"name": "G.Skill Trident Z RGB DC",       "details": "Best double capacity memory", "url": "https://cdn.mos.cms.futurecdn.net/qPo53hpm9RyqTbFJeuLhxD-970-80.jpg.webp"},
            {"name": "Adata Spectrix D80",             "details": "Best gaming RAM",             "url": "https://cdn.mos.cms.futurecdn.net/nnG7XDX4xKkiRFwcnk9R2h-970-80.jpg.webp"},
            {"name": "G.Skill TridentZ Royal",         "details": "Best RGB RAM",                "url": "https://cdn.mos.cms.futurecdn.net/C2CXmj4v3vDzAzuzMEUT86-970-80.png.webp"},
            {"name": "Corsair Vengeance LPX",          "details": "Best Low-Profile RAM",        "url": "https://cdn.mos.cms.futurecdn.net/dgyur9TLCPPw2X6PZPXqUe-970-80.jpg.webp"},
            {"name": "G.Skill Mac RAM",                "details": "Best Mac RAM",                "url": "https://cdn.mos.cms.futurecdn.net/EuXkpL4SPCkARn6xyQYSWP-970-80.jpg.webp"},
            {"name": "Crucial Ballistix Sport",        "details": "Best Laptop RAM",             "url": "https://cdn.mos.cms.futurecdn.net/smQjxBsCaVLxrffZqA5P3i-970-80.jpg.webp"},
        ],
        [
            {"name": "Asus ROG Maximus XII HERO" ,    "details": "Best Intel motherboard",                  "url": "https://cdn.mos.cms.futurecdn.net/dqDQXC3TudrkCcAyxrjf5D-970-80.jpg.webp"},
            {"name": "MSI MEG Z490 Godlike" ,         "details": "Best high-end Intel motherboard",         "url": "https://cdn.mos.cms.futurecdn.net/v6YQ5ZWBQXDJrGo8zBYN2E-970-80.jpg.webp"},
            {"name": "GIGABYTE Z490 Gaming X" ,       "details": "Best budget Intel motherboard",           "url": "https://cdn.mos.cms.futurecdn.net/LA8uDEnevevMrABwcXPfqD-970-80.jpg.webp"},
            {"name": "MSI MPG Z390M Gaming Edge AC" , "details": "Best Intel micro-ATX motherboard",        "url": "https://cdn.mos.cms.futurecdn.net/vsm44DawcepTCxYLe9JZ3F-970-80.jpg.webp"},
            {"name": "Asus ROG Strix Z390-I Gaming" , "details": "Best Intel mini-ITX motherboard",         "url": "https://cdn.mos.cms.futurecdn.net/Coaffnt8hKNirJfFyZei3d-970-80.jpg.webp"},
            {"name": "ASRock X570 Phantom Gaming X" , "details": "Best AMD motherboard",                    "url": "https://cdn.mos.cms.futurecdn.net/a5LZ6vdHXJ33n7tNRnzptC-970-80.jpg.webp"},
            {"name": "Aorus X570 Master" ,            "details": "Best high performance AMD motherboard",   "url": "https://cdn.mos.cms.futurecdn.net/NjdLEEQXtPvw8pp43WKkfD-970-80.jpg.webp"},
            {"name": "Asus ROG Strix B550-E Gaming" , "details": "Best budget AMD motherboard",             "url": "https://cdn.mos.cms.futurecdn.net/wKhGHtinaAFKFQMJLAkaHD-970-80.jpg.webp"},
            {"name": "Asus TUF Gaming B550M-PLUS" ,   "details": "Best AMD micro-ATX motherboard",          "url": "https://cdn.mos.cms.futurecdn.net/TT8ByRv9MxffqzyicDGNXD-970-80.jpg.webp"},
            {"name": "ASUS ROG Strix X470-I" ,        "details": "Best AMD mini-ITX motherboard",           "url": "https://cdn.mos.cms.futurecdn.net/oHNviqHPfygT9U5yLrQAd3-970-80.jpg.webp"},
            {"name": "ASRock X299 Taichi" ,           "details": "Best Intel Core X-series motherboard",    "url": "https://cdn.mos.cms.futurecdn.net/NpyritF2izByK7Y6opJDyF-970-80.jpg.webp"},
            {"name": "MSI Creator TRX40" ,            "details": "Best AMD Ryzen Threadripper motherboard", "url": "https://cdn.mos.cms.futurecdn.net/sexGYGN2PSd42ehHBaYjF9-970-80.jpg.webp"}
        ],
        [
            {"name": "Nvidia GeForce RTX 3080",                "details": " ",     "url": "https://cdn.mos.cms.futurecdn.net/s4XSnWxxfAdEjEuGEvQ6kJ-970-80.jpg.webp"},
            {"name": "AMD Radeon RX 5700",                     "details": " ",     "url": "https://cdn.mos.cms.futurecdn.net/qJos4NYu8ZNWh7L53qkeH5-970-80.jpg.webp"},
            {"name": "Nvidia GeForce RTX 3090",                "details": " ",     "url": "https://cdn.mos.cms.futurecdn.net/dWNESQ3Pf7fsGFoouKzDG7-970-80.jpg.webp"},
            {"name": "AMD Radeon RX 5600 XT",                  "details": " ",     "url": "https://cdn.mos.cms.futurecdn.net/9xQ9U2RmVT3xNusoHua7kD-970-80.jpg.webp"},
            {"name": "Nvidia GeForce RTX 2070 Super",          "details": " ",     "url": "https://cdn.mos.cms.futurecdn.net/EnKTWqEHGGmNADQMerqDk5-970-80.jpg.webp"},
            {"name": "Nvidia GeForce GTX 1660 Super",          "details": " ",     "url": "https://cdn.mos.cms.futurecdn.net/jAqXGERX8yKiGeDoARWuY5-970-80.jpg.webp"},
            {"name": "Nvidia GeForce RTX 2080 Ti",             "details": " ",     "url": "https://cdn.mos.cms.futurecdn.net/oqMDcxz6kNtx3Un5Ch2vu5-970-80.jpg.webp"},
            {"name": "Zotac GeForce RTX 2060 Super Mini",      "details": " ",     "url": "https://cdn.mos.cms.futurecdn.net/YUFTh3KE83yYFZ3Weqkma4-970-80.jpg.webp"},
            {"name": "Gigabyte GeForce GTX 1660 OC 6G",        "details": " ",     "url": "https://cdn.mos.cms.futurecdn.net/truqMKZ7gMmfrCjtibV9T5-970-80.jpg.webp"},
            {"name": "PNY GeForce GTX 1660 Ti XLR8 Gaming OC", "details": " ",     "url": "https://cdn.mos.cms.futurecdn.net/9LxEnGxEydmfa3Yqvmf966-970-80.jpg.webp"}
        ]
    ];
    
    const database = { "products": [] }
    // Create 1000 users
    for (let i = 0; i < 300; i++) {
        let randomNumber = getRandomNumber(2);
        let len = name[randomNumber].length;
        let temp = {
            id: uuid(),
            type: type[randomNumber],
            about: name[randomNumber][getRandomNumber(len-1)],
            price: getRandomNumber(100, 300),
            profitMargin: getRandomNumber(35, 10)       // getRandomNumber(max, min)
        }

        database.products.push(temp)
    }

    database['admin'] = [
        {
            id: '0000',
            username: "admin",
            password: "1234"
        }
    ]

    database['userIDs'] = [];
    database['user'] = [];

    for(let i=0; i<1; i++){
        let id = uuid();
        database.userIDs.push(id);
        database.user.push(
            {
                id,
                username: "user",
                password: "1234"
            }
        )
    }

    return database
}