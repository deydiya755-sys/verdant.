export const PLANTS = [
  {
    id: "monstera-deliciosa",
    name: "Monstera Deliciosa",
    scientificName: "Swiss Cheese Plant",
    price: 65.00,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAUW0gAgCOQAPDZ4O1mCHjicS60SxDn7od8mYQCCbWKP49aT1QpzQ6JC0swe6sPIZDPvwvJy-l1xd4yPshLcVMzcLFwZnuwuX8WdCqxRYD5YnhXxtmkEiCUAB_7UmplqHU27ZJ7u2muq4FUtoA84EYlV9miANHH31ZaoYuYHGnd-6N9bFz2qjflFwNKARAKKZsj2NSG8sqD-bUx96yIgfMzOMr9nf7JwbftpmToexQ9rdsRWfwIczWG",
    heroImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuDGWHeb1lb85niXmKBfOnu1KD54hrh1rs8QZjtdGNkNOGUFbO43DbOdBx3elm3VcJJH-39ngO_g9jY_8XqKjK-MFh-Vd4wx3dQSwKpXiL8SPpt3zd81CY0BrnofbCFpazOkawnpUBhxubRMe7Oa7gYr87I17DUNQ4YhqRQmdclrVS7ojWE8y6Y7KNENLBd5lthoQzQWtqYrSnXeoPHcJr-P_zxgT15DsnhRHOtgnwU1vZz5s0xFOa71",
    gallery: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDGWHeb1lb85niXmKBfOnu1KD54hrh1rs8QZjtdGNkNOGUFbO43DbOdBx3elm3VcJJH-39ngO_g9jY_8XqKjK-MFh-Vd4wx3dQSwKpXiL8SPpt3zd81CY0BrnofbCFpazOkawnpUBhxubRMe7Oa7gYr87I17DUNQ4YhqRQmdclrVS7ojWE8y6Y7KNENLBd5lthoQzQWtqYrSnXeoPHcJr-P_zxgT15DsnhRHOtgnwU1vZz5s0xFOa71",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAUW0gAgCOQAPDZ4O1mCHjicS60SxDn7od8mYQCCbWKP49aT1QpzQ6JC0swe6sPIZDPvwvJy-l1xd4yPshLcVMzcLFwZnuwuX8WdCqxRYD5YnhXxtmkEiCUAB_7UmplqHU27ZJ7u2muq4FUtoA84EYlV9miANHH31ZaoYuYHGnd-6N9bFz2qjflFwNKARAKKZsj2NSG8sqD-bUx96yIgfMzOMr9nf7JwbftpmToexQ9rdsRWfwIczWG",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuChj86yAN_cR4z_tFB3od1rFeuwIz5YpwyvjsX13lVitEGbQEJhmrDjMPTYFBaN1sHGAhHRVssRuVK2ca0alzoKcqMznhGqptzfb1RSrWTFnBkpyRN9cltqKLMynsIcvhpgcq8UBwcovfewlTa985j3DwIxyiHgRpo_8Yj0ja9J1Vjag9ghxVmB7lrY-K4Hn8IaWJugxSlhLxgniVt5a74oV3HMB9naZ843rYl11kIF1A62w1KFpCCo",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB20vkrdpCSMv3bpx9P2gQE6CDJALMSPaftnITYK6s3m8i59PV_j6GD2QezdhFzu8oAF1JARS8yCPOxkYTu91WT8mb98VgIeQLNTmTjhpWEOwWf9AYIWluferryX9QYSVSCPXZi1lm99MBXFEU1-JOM-QKZ62tHv_f4GxUIscVNxdoQJn9zsT8QJusm_PNLYqakiAag_0Ig6sH7KzUY9fP3aXoo-MBF8XAlWMbku2ApE4G9X7sk90bm"
    ],
    badge: "Best Seller",
    lightLevel: "Bright Indirect",
    lightDescription: "Thrives in bright indirect light; avoid direct midday scorching rays.",
    watering: "Every 1-2 Weeks",
    wateringSchedule: "Allow top 2-3 inches of soil to dry out between waterings.",
    petFriendly: false,
    difficulty: "Easy",
    difficultyRating: 1,
    size: "Medium",
    potSizes: [
      { name: 'Small (4")', inStock: true, priceDelta: -15 },
      { name: 'Medium (6")', inStock: true, priceDelta: 0 },
      { name: 'Large (8")', inStock: false, priceDelta: 25 }
    ],
    planters: [
      { name: "None", color: "#fcf9f8", border: true, price: 0 },
      { name: "Terracotta Clay", color: "#b65a3a", border: false, price: 24 },
      { name: "Sand Ceramic", color: "#e4e2e1", border: false, price: 28 },
      { name: "Forest Moss", color: "#546b47", border: false, price: 28 }
    ],
    description: "Famous for its large, glossy, fenestrated leaves, the Monstera Deliciosa is a stunning architectural plant that brings an instant tropical, editorial feel to any space. Native to the rainforests of Central America, it is a vigorous grower that will climb or trail depending on how it is supported.",
    secondaryDescription: "Also known as the 'Swiss Cheese Plant,' its iconic leaf holes naturally develop as the plant matures—an evolutionary adaptation to allow sunlight and heavy rain to pass through in its native jungle canopy.",
    airPurifying: "Excellent at filtering airborne toxins from your indoor environment.",
    growthHabit: "Vining plant; benefits from a moss pole or trellis as it matures.",
    reviewsCount: 24,
    rating: 4.9
  },
  {
    id: "ficus-elastica-burgundy",
    name: "Ficus Elastica",
    scientificName: "Rubber Tree 'Burgundy'",
    price: 45.00,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCFNanNZZFzVG5YGjkcbr3DvxwOmgL_btDCHNGZKIBa7O4LI1mCv4-rKP7fw6cjJL1cdrtylAPDCUWFbtcj-jAbAraLjemfdxt2YL6sImLtr5OiiJPQ6FFymuqfZOByAmpNbn0DqOCkttIsrf5U6vlphPZ3qtd4_oLqXftjO_3ZsQTgFII_VjT3T5pZ5-18Hb4GlbbEqh1fU60b1tmxU6S82vn2s3pVNPeLgCYWTs_yrm4OfK8DpOnK",
    gallery: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCFNanNZZFzVG5YGjkcbr3DvxwOmgL_btDCHNGZKIBa7O4LI1mCv4-rKP7fw6cjJL1cdrtylAPDCUWFbtcj-jAbAraLjemfdxt2YL6sImLtr5OiiJPQ6FFymuqfZOByAmpNbn0DqOCkttIsrf5U6vlphPZ3qtd4_oLqXftjO_3ZsQTgFII_VjT3T5pZ5-18Hb4GlbbEqh1fU60b1tmxU6S82vn2s3pVNPeLgCYWTs_yrm4OfK8DpOnK",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDtabeJgb4oiZuN2Mm71dl_mADiyKsLgUGPneNFXsBIFDh5XDcchEOern6LvPOoGe9JnATTIhJM0px1K-HnlM06vaRnQQayJBv7zhFhBS2Gi8_M0HvKb8Q7BBzKzYdEOAw_UozDzsWvcTQHT0cLDB1Stl8nK4ZIJ6vNZVNQTJ7LaxueGwiVD-gTUMdWws6ndYm8hGa4vbNSWjNERewuZXa894F3machqfnNNrXD2e8Xptp7I5HEh976"
    ],
    badge: "Popular",
    lightLevel: "Bright Indirect",
    lightDescription: "Needs abundant bright, indirect light to maintain its rich deep-burgundy foliage.",
    watering: "Every 1-2 Weeks",
    wateringSchedule: "Allow top soil to dry completely between sessions. Avoid overwatering.",
    petFriendly: false,
    difficulty: "Moderate",
    difficultyRating: 2,
    size: "Medium",
    potSizes: [
      { name: 'Small (4")', inStock: true, priceDelta: -10 },
      { name: 'Medium (6")', inStock: true, priceDelta: 0 },
      { name: 'Large (8")', inStock: true, priceDelta: 20 }
    ],
    planters: [
      { name: "None", color: "#fcf9f8", border: true, price: 0 },
      { name: "Terracotta Clay", color: "#b65a3a", border: false, price: 24 },
      { name: "Sand Ceramic", color: "#e4e2e1", border: false, price: 28 }
    ],
    description: "The Burgundy Rubber Tree makes an impressive architectural statement with its glossy, deep maroon leaves and sturdy, upright silhouette.",
    secondaryDescription: "Native to Southeast Asia, this hardy ficus develops woody stems and thrives in bright interior spaces with steady watering.",
    airPurifying: "High capacity for particulate filtration and oxygen enrichment.",
    growthHabit: "Upright tree-form; can reach ceiling heights indoors with proper pruning.",
    reviewsCount: 19,
    rating: 4.8
  },
  {
    id: "pilea-peperomioides",
    name: "Pilea Peperomioides",
    scientificName: "Chinese Money Plant",
    price: 32.00,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBDqW-3SL5EQKnHRHUFthpRNdjh_2qpjBedYwTPvIWiiFIMJjGVQjdLU7rNtd0uqWbv-i3eXi1_7oqcE4hJGM-mzvUKPab1DMhuaeUxrEGsf35PCPGJqXXyg4hv4ve4as82E4H2e1hQMnmYPAB9vQRSXLiPpUaalX33OYPRCNhepJlwdJ3XlhycSiMi3HRvuguaN1Il8YRmh2GSyH6HFoOJ9u7D1m-L_IXK7sr9HHIvlJsx5OW1_pJm",
    gallery: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBDqW-3SL5EQKnHRHUFthpRNdjh_2qpjBedYwTPvIWiiFIMJjGVQjdLU7rNtd0uqWbv-i3eXi1_7oqcE4hJGM-mzvUKPab1DMhuaeUxrEGsf35PCPGJqXXyg4hv4ve4as82E4H2e1hQMnmYPAB9vQRSXLiPpUaalX33OYPRCNhepJlwdJ3XlhycSiMi3HRvuguaN1Il8YRmh2GSyH6HFoOJ9u7D1m-L_IXK7sr9HHIvlJsx5OW1_pJm"
    ],
    badge: "Pet Safe",
    lightLevel: "Bright Indirect",
    lightDescription: "Prefers lots of bright indirect light; rotate weekly for symmetrical leaf growth.",
    watering: "Weekly",
    wateringSchedule: "Water when soil is mostly dry. Leaves will droop slightly when thirsty.",
    petFriendly: true,
    difficulty: "Easy",
    difficultyRating: 1,
    size: "Small",
    potSizes: [
      { name: 'Small (4")', inStock: true, priceDelta: 0 },
      { name: 'Medium (6")', inStock: true, priceDelta: 12 }
    ],
    planters: [
      { name: "None", color: "#fcf9f8", border: true, price: 0 },
      { name: "Terracotta Clay", color: "#b65a3a", border: false, price: 18 }
    ],
    description: "Famous for its circular, pancake-shaped leaves that sprout effortlessly from slender stems, the Pilea brings playful geometric charm to credenzas and desks.",
    secondaryDescription: "Also known as the 'Pass It On Plant' because it readily produces small plantlets (pups) that you can separate and share with friends.",
    airPurifying: "Safe, non-toxic companion for homes with curious cats and dogs.",
    growthHabit: "Compact domed growth, sprouting offsets around the base.",
    reviewsCount: 31,
    rating: 4.9
  },
  {
    id: "calathea-orbifolia",
    name: "Calathea Orbifolia",
    scientificName: "Prayer Plant",
    price: 55.00,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDMOtR2_qIk0ugrmSVk9ykwBDTWppVehSaIVq0KHyl8qD66hG-PxH5eUO4-Tk_ZWVmvRS3UUH2c2yZhoxWlZAHWBu6JAjdMx-E1NzeVSDfGQVvmlyG7N89ZO8CfElTpM5jPeMjj3Cix2A6XUBWwRyL218fxOmThBrfsZdNvo272iTIhfeQ5UWflfiFXzcXYL_YoyXvXN-7ZnnBdYpGCr126aIiHRjUFbP2o26QBV9sYMTmbg_zlKaR-",
    gallery: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDMOtR2_qIk0ugrmSVk9ykwBDTWppVehSaIVq0KHyl8qD66hG-PxH5eUO4-Tk_ZWVmvRS3UUH2c2yZhoxWlZAHWBu6JAjdMx-E1NzeVSDfGQVvmlyG7N89ZO8CfElTpM5jPeMjj3Cix2A6XUBWwRyL218fxOmThBrfsZdNvo272iTIhfeQ5UWflfiFXzcXYL_YoyXvXN-7ZnnBdYpGCr126aIiHRjUFbP2o26QBV9sYMTmbg_zlKaR-",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDI4cRDyMg9IvQrRJ9DKj4_tIxX7S3oBdilAq4FQGxlyBnHRNUjsKBfQA6KoIryHDcVLrPvdFJyO_pG7vO70k1J2f22JRb76CRcYtBIAdUeDlpKyzBl8WnNdDM0EC7maLUHoBMeBe_vVhM7QiMhSPpo6l_pmcfNjjdn1U1pw6zNnzRDKW7CKSYTZVRMNLrHKsQLlunl4haC_poBbPnzRa13UJhHXwJkHQSbdWDN7dkbXhu0hE1v5Lmm"
    ],
    badge: "Pet Safe",
    lightLevel: "Medium Light",
    lightDescription: "Medium indirect light. Direct sunlight can scorch or bleach the silver striping.",
    watering: "Weekly",
    wateringSchedule: "Keep soil consistently lightly moist; sensitive to fluoridated tap water (distilled or filtered preferred).",
    petFriendly: true,
    difficulty: "Advanced",
    difficultyRating: 3,
    size: "Medium",
    potSizes: [
      { name: 'Medium (6")', inStock: true, priceDelta: 0 },
      { name: 'Large (8")', inStock: true, priceDelta: 20 }
    ],
    planters: [
      { name: "None", color: "#fcf9f8", border: true, price: 0 },
      { name: "Sand Ceramic", color: "#e4e2e1", border: false, price: 28 },
      { name: "Forest Moss", color: "#546b47", border: false, price: 28 }
    ],
    description: "One of the most sought-after prayer plants, the Calathea Orbifolia features immense, circular leaves painted with delicate silver metallic brushstrokes.",
    secondaryDescription: "Its leaves raise and lower throughout the circadian cycle, mimicking praying hands at twilight.",
    airPurifying: "High humidity lover; completely pet non-toxic.",
    growthHabit: "Mounding, lush clumping foliage.",
    reviewsCount: 16,
    rating: 4.7
  },
  {
    id: "zz-plant",
    name: "ZZ Plant",
    scientificName: "Zamioculcas Zamiifolia",
    price: 48.00,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBPHLFLdPiB2JJplOFI55aSAVX2ILI-nPUdVxXJe8bAXeutY-vJr-j6igKh-n2ISQHeq2-FKUj9CHqIRwcwVcwpoAqmRv-p8S3W5__OpH_gP5lPImXn23_fxbrGifUyLaoZgvkfoQl329s7ZiIQnJayI4lS70XxWMTH2XaF5tukRbvxoFnyzgNdPFJFQv5OqhMqLY_WuztDq1GPlITeeRPuxyKqb1xZgWpbO-Gf5e8y-s94W8tHFsUB",
    gallery: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBPHLFLdPiB2JJplOFI55aSAVX2ILI-nPUdVxXJe8bAXeutY-vJr-j6igKh-n2ISQHeq2-FKUj9CHqIRwcwVcwpoAqmRv-p8S3W5__OpH_gP5lPImXn23_fxbrGifUyLaoZgvkfoQl329s7ZiIQnJayI4lS70XxWMTH2XaF5tukRbvxoFnyzgNdPFJFQv5OqhMqLY_WuztDq1GPlITeeRPuxyKqb1xZgWpbO-Gf5e8y-s94W8tHFsUB",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB8EwUz3jNPYkyt06Bcd3IahrF9zBOtviIFFfktcL5pXVWAzWwHOr3x3WCRsFl8Iz-ZJziCNNKneFqEfkuCByrEQLj0sEcg2QeYBGcOt8jF9zQaAZjl6YlVf_ywQ_W3LLvXB-wPbg9jHFpP-ZgkNJFrh4vwPYJq1EHP0uMF98nSMgs_s4j92iq3RI9G5gBCeyuDrricBilCP5GgYFJwcqjbQUhdP8R8j23nflJqEBK1CKjmsOhs3tvP"
    ],
    badge: "Low Light",
    lightLevel: "Low Light",
    lightDescription: "Thrives in low light, fluorescent office lights, or indirect window sun.",
    watering: "Every 2-3 Weeks",
    wateringSchedule: "Extremely drought-tolerant. Rhizomes store water; better under-watered than over-watered.",
    petFriendly: false,
    difficulty: "Easy",
    difficultyRating: 1,
    size: "Medium",
    potSizes: [
      { name: 'Small (4")', inStock: true, priceDelta: -10 },
      { name: 'Medium (6")', inStock: true, priceDelta: 0 },
      { name: 'Large (8")', inStock: true, priceDelta: 22 }
    ],
    planters: [
      { name: "None", color: "#fcf9f8", border: true, price: 0 },
      { name: "Terracotta Clay", color: "#b65a3a", border: false, price: 24 }
    ],
    description: "The ultimate unkillable companion for modern spaces. Features wand-like stems covered in thick, naturally glossy emerald leaflets.",
    secondaryDescription: "With underground potato-like rhizomes that hold reservoirs of water, the ZZ plant easily forgives extended absences.",
    airPurifying: "Filters indoor airborne particulate matter.",
    growthHabit: "Arching, feather-like compound stems.",
    reviewsCount: 42,
    rating: 5.0
  },
  {
    id: "golden-pothos",
    name: "Golden Pothos",
    scientificName: "Epipremnum Aureum",
    price: 36.00,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBBWB1SINQrM9M7N9f-3zcm1PGV1FUqTsQHOLQJe5N5Nw-K07qN7C59e1UgfIGLL3byq0nAX2XYyyVpecYJjPdvT3Nqgu5_xb3299fOOCKnMkroHDE01YTkznxSPqO-B997M1IJq6aToUHc1i5oW8kFhmooLwk4J5V8IBOr6A6wZ09tb2YhHGZpEiLb6zELaEzrGqiJE98ESY9BxxjjCMedk_nIYxsI3OKzDsjPFXOfYt-syp0v6jSv",
    gallery: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBBWB1SINQrM9M7N9f-3zcm1PGV1FUqTsQHOLQJe5N5Nw-K07qN7C59e1UgfIGLL3byq0nAX2XYyyVpecYJjPdvT3Nqgu5_xb3299fOOCKnMkroHDE01YTkznxSPqO-B997M1IJq6aToUHc1i5oW8kFhmooLwk4J5V8IBOr6A6wZ09tb2YhHGZpEiLb6zELaEzrGqiJE98ESY9BxxjjCMedk_nIYxsI3OKzDsjPFXOfYt-syp0v6jSv",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDk4lj0ix4UIqSgHEIKg_3OTDxHmQOiUXH9PDFpJo6EUfYseQHn1y0MuvFg0YEAlkoGeCl2ZJryorYSH3ar3Q9wIl18dHVv-ulsBLFXj4uyTFCKF1MUZziEWuyJ-aWmoG-q_-04LRF10gXBxhyOFB4j2-jw3ETmrgwAbPOJbNeXAqhVAsUiBTnxvoUlj8lbv-ZwxiVIzZ1K4EyxbrfJQ32uRrH_SH6C-RAMrXzbkASly9UztXBTX_XK"
    ],
    badge: "Beginner",
    lightLevel: "Low to Medium",
    lightDescription: "Low to bright indirect light. Variegation intensifies in brighter spots.",
    watering: "Every 1-2 Weeks",
    wateringSchedule: "Water when the top 50% of the potting soil feels dry.",
    petFriendly: false,
    difficulty: "Easy",
    difficultyRating: 1,
    size: "Small",
    potSizes: [
      { name: 'Small (4")', inStock: true, priceDelta: -8 },
      { name: 'Medium (6")', inStock: true, priceDelta: 0 }
    ],
    planters: [
      { name: "None", color: "#fcf9f8", border: true, price: 0 },
      { name: "Terracotta Clay", color: "#b65a3a", border: false, price: 20 }
    ],
    description: "Cascading golden-green heart leaves make this trailing vine the quintessential plant for hanging baskets, high shelving, and mantels.",
    secondaryDescription: "Fast-growing and resilient, it roots easily in water and thrives in nearly all home lighting setups.",
    airPurifying: "High formal filtration capacity.",
    growthHabit: "Trailing vine or climbing habit.",
    reviewsCount: 38,
    rating: 4.9
  },
  {
    id: "string-of-hearts",
    name: "String of Hearts",
    scientificName: "Ceropegia Woodii",
    price: 38.00,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB70aKwPiTF78F94K_45tDeF1dsZvX59sC1oiKxG_WXcfbsmacqnrvQbBprrUsJW3tdWCSUwwkl_o-3v-OUm6X75LKSeHbHBKPwDTGnDaiXQ-kTKdH4wAN2t3k8re1DMk4IuV_q6rMXfTd5CM-YyZ-fPGMPW1yVyLcWbtu603M3m8nSWngfInkyfXDpqhx5DwuVdU-XDVeQgjzhVYcqH0ArBr6ANW7CyxJGuCA3dEWUgWfwWiER8Znj",
    gallery: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB70aKwPiTF78F94K_45tDeF1dsZvX59sC1oiKxG_WXcfbsmacqnrvQbBprrUsJW3tdWCSUwwkl_o-3v-OUm6X75LKSeHbHBKPwDTGnDaiXQ-kTKdH4wAN2t3k8re1DMk4IuV_q6rMXfTd5CM-YyZ-fPGMPW1yVyLcWbtu603M3m8nSWngfInkyfXDpqhx5DwuVdU-XDVeQgjzhVYcqH0ArBr6ANW7CyxJGuCA3dEWUgWfwWiER8Znj"
    ],
    badge: "Pet Safe",
    lightLevel: "Bright Direct",
    lightDescription: "Loves bright indirect sunlight with gentle direct morning or late afternoon sun.",
    watering: "Every 2 Weeks",
    wateringSchedule: "Allow soil to completely dry out; behaves like a succulent.",
    petFriendly: true,
    difficulty: "Easy",
    difficultyRating: 1,
    size: "Small",
    potSizes: [
      { name: 'Small (4")', inStock: true, priceDelta: 0 }
    ],
    planters: [
      { name: "None", color: "#fcf9f8", border: true, price: 0 },
      { name: "Terracotta Clay", color: "#b65a3a", border: false, price: 18 }
    ],
    description: "A delicate, trailing succulent vine with heart-shaped mottled silver and green leaves and purple underbellies.",
    secondaryDescription: "A showstopper in bright, sunny windows that is totally non-toxic to household pets.",
    airPurifying: "Subtle indoor aesthetic enhancer.",
    growthHabit: "Delicate cascading trails up to 6 feet long.",
    reviewsCount: 22,
    rating: 4.8
  },
  {
    id: "bird-of-paradise",
    name: "Giant Bird of Paradise",
    scientificName: "Strelitzia Nicolai",
    price: 185.00,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBvQ91jK9B3zdHum_cj7Gn9Elo7hs1MwWxoAOa1v4JRIWB8cdlURNQlHt56IYBKBAO2LAj5OqtHjSNT9LoYNfRsAhxXLnOvlPmpUOjmDG1JwI_ABMm9rPCITc9UM-UlnY063eqgbqJT9F0QB6v3t7Zo4VEB9CXZH4oJDUcw3N3cCi8lFlPAopccfA8TbXvwBmDmqsTSvYbPKM6vX7SbWALHQ3rLGVEFkMUOVsKlQ1AN8UXAlNeeM9vA",
    gallery: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBvQ91jK9B3zdHum_cj7Gn9Elo7hs1MwWxoAOa1v4JRIWB8cdlURNQlHt56IYBKBAO2LAj5OqtHjSNT9LoYNfRsAhxXLnOvlPmpUOjmDG1JwI_ABMm9rPCITc9UM-UlnY063eqgbqJT9F0QB6v3t7Zo4VEB9CXZH4oJDUcw3N3cCi8lFlPAopccfA8TbXvwBmDmqsTSvYbPKM6vX7SbWALHQ3rLGVEFkMUOVsKlQ1AN8UXAlNeeM9vA"
    ],
    badge: "Statement",
    lightLevel: "Bright Direct",
    lightDescription: "Direct sunlight lovers. Flourishes right by large south or west-facing windows.",
    watering: "Weekly",
    wateringSchedule: "Thorough watering once top 2 inches dry. Mist leaves regularly.",
    petFriendly: false,
    difficulty: "Moderate",
    difficultyRating: 2,
    size: "Extra Large",
    potSizes: [
      { name: 'Large (10")', inStock: true, priceDelta: 0 },
      { name: 'Extra Large (14")', inStock: true, priceDelta: 65 }
    ],
    planters: [
      { name: "None", color: "#fcf9f8", border: true, price: 0 },
      { name: "Terracotta Urn", color: "#b65a3a", border: false, price: 45 }
    ],
    description: "A monumental centerpiece with broad, paddle-shaped banana-like foliage that creates an instant architectural canopy indoors.",
    secondaryDescription: "Native to South Africa, it naturally tears its leaves in windy jungle conditions—this is healthy and expected.",
    airPurifying: "High transpiration rate naturally humidifies living rooms.",
    growthHabit: "Towering sculptural fan form.",
    reviewsCount: 15,
    rating: 4.9
  }
];

export const ACCESSORIES = [
  {
    id: "terracotta-planter",
    name: "Classic Terracotta Planter",
    price: 28.00,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB4k70KQkCvmXdD1KjfZxUaMEm7x513RgIHqfUDJYcR6OlxEIN6vk64zTf4WZnlhlho7LWaLKWVkh0iHT1WbMxqmdhmllkvWg66TnGA8hAiO2dysPwjQXKTxB-ztSbV_1ev6AB0u1Q3lGfLjcKGsEC1-F925nulTvFoMqumHiowfsug5vXovSTxz7kD1y9lFOCyu_vTNZ4--cC2gQCMdNXlZXkqEkcmwGigoQAwf5pPdJrxyCAW3P07"
  },
  {
    id: "extendable-moss-pole",
    name: "Extendable Moss Pole",
    price: 18.00,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAV4UreBv1dng5DiPRKZEKxvdmHg-2gpSLVRettjKKGbJyjjdQPyu_Lw5100kmlRXRgXcHGTAeluvPscedLI6siPf0v29-8MauAiOYuwlGmyjgEU-zmKrlCw6nUBrQK-ozh18HW_AjZjV9Biqpn92J4BaKM0M6IKVEqiKcOFXrMO5Ur4DQ1zmWV2XvT0_KmzJv56MNcrjfuD_HLm2KX9Fcts2qf0TYAAAHr1GhFvwDHRcGH-KUvfdU8"
  },
  {
    id: "minimalist-watering-can",
    name: "Minimalist Watering Can",
    price: 45.00,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBnZp5ddsZPdaGAWsH55Bu9XJKtqaDgZ30tOElWIfDAOeCbx0u4DvXbcKX4ylNgSWL4vJyIiyx-bJRQSIXhurfqtWk3Z7n9oE4Ot_LapEErgjvrTMdZ7JinnyDUOr55fmYJtTOW8TyWvNrOB5ZTfLdsWHnuEnQUoCh1xC_NpBrHzdlq71qUtTWGyeG9kz2hFwWhNFQIuvxR3EglfCotzJ4Vbf30bnEPEB8X99jOW-e03WUHDrkOyIxg"
  },
  {
    id: "premium-aroid-mix",
    name: "Premium Aroid Mix",
    price: 14.00,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAmBZ2E4LKUJ035QgL9sZBMVQFJWpnSIY1bilciSLLNtTAh1SAnc72lI5IiD0hFhZjhpKK-iCrRXyQhcDrNVioQ5sFFWZPysJsoX5bhYWANgBvn9Y1-pt_EYx1ufdYNJML_MZC4rOnN2jGOW8um7j5Vsj5nXj9jMDVtMihhafN3sNJsKJsCBNLtRyO6Xae71h4m85fBS-za4IFibQEiU4Xmciwul4dpMfo8apTzQFLqdHMb5zGEVR7U"
  }
];

export const UPSELL_TOOLKIT = {
  id: "plant-care-essentials",
  name: "Plant Care Essentials Toolkit",
  subtitle: "Keep your new arrivals thriving with our curated brass mister, pruning shears, and organic nutrients.",
  price: 24.00,
  image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBdGA78CYTlMJ6SQh_9kmObu10o-O3-7D6VTl0k1E9UTp1BUtbx2ptqSQ4gCx2TA3YdPPtfvylnMZAkUKixoBdOdfpHBsvHI56QnBDkstnTFw_2vuvrMr6mrLIJjrc7dOu-USq2O55eHDY6kMn4NUC191wkPVgSTKdaNYg5rBqPQ6h3ih1WezBk9h3bMcoAqD9DjW027FphCef0dDQXY2Q0MVtjPM_sNHOpicap8dS6a-XCqe8CRMyL"
};
