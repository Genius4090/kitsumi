export type ProductType = {
    id: number;
    title: string;
    description: string;
    isEco: boolean;
    price: number;
    image: string;
    categoryId: number;
  };
  
  export type CategoryType = {
    id: number;
    title: string;
    slug: string;
  };
  
  export const categories: CategoryType[] = [
    { id: 1, title: "All", slug: "all" },
    { id: 2, title: "Maki", slug: "maki" },
    { id: 3, title: "Uramaki", slug: "uramaki" },
    { id: 4, title: "Special Rolls", slug: "special-rolls" },
  ];
  
  export const products: ProductType[] = [
    // ---------- MAKI (categoryId: 2) ----------
    {
      id: 1,
      title: "Spicy Tuna Maki",
      description:
        "A tantalizing blend of spicy tuna, cucumber, and avocado, harmoniously rolled in nori and seasoned rice.",
      isEco: true,
      price: 5,
      image: "/images/menu/product1.png",
      categoryId: 2,
    },
    {
      id: 2,
      title: "Mango Maki",
      description:
        "Tempura-fried shrimp, cucumber, and cream cheese embrace a center of fresh avocado, delivering a satisfying contrast of textures.",
      isEco: false,
      price: 5,
      image: "/images/menu/product2.png",
      categoryId: 2,
    },
    {
      id: 3,
      title: "Salmon Maki",
      description:
        "Shiitake mushrooms, avocado, and pickled daikon radish nestle within a roll of seasoned rice, coated with nutty sesame seeds.",
      isEco: false,
      price: 5,
      image: "/images/menu/product3.png",
      categoryId: 2,
    },
    {
      id: 4,
      title: "Tuna Maki",
      description:
        "A vibrant assortment of julienned carrots, bell peppers, and cucumber, tightly encased in a nori-wrapped rice roll.",
      isEco: false,
      price: 5,
      image: "/images/menu/product4.png",
      categoryId: 2,
    },
  
    // ---------- URAMAKI (categoryId: 3) ----------
    {
      id: 5,
      title: "Volcano Delight",
      description:
        "Creamy crab salad, avocado, and cucumber rolled inside, topped with spicy tuna and drizzled with fiery sriracha sauce.",
      isEco: true,
      price: 12,
      image: "/images/menu/product5.png",
      categoryId: 3,
    },
    {
      id: 6,
      title: "Rainbow Fusion",
      description:
        "A colorful blend of fresh tuna, salmon, yellowtail, and avocado, enveloping a core of cucumber and crab stick.",
      isEco: false,
      price: 12,
      image: "/images/menu/product6.png",
      categoryId: 3,
    },
    {
      id: 7,
      title: "Dragon Elegance",
      description:
        "Grilled eel and avocado nestled within the roll, draped with slices of ripe avocado resembling dragon scales.",
      isEco: false,
      price: 12,
      image: "/images/menu/product7.png",
      categoryId: 3,
    },
    {
      id: 8,
      title: "Sunset Serenity",
      description:
        "Tempura shrimp, cucumber, and spicy mayo embraced by a roll of soy paper, crowned with slices of creamy mango.",
      isEco: false,
      price: 12,
      image: "/images/menu/product8.png",
      categoryId: 3,
    },
    {
      id: 9,
      title: "Mystic Garden",
      description:
        "Shiitake mushrooms, asparagus, and cucumber intermingle with crispy tempura bits, blanketed by a layer of sesame seeds.",
      isEco: false,
      price: 12,
      image: "/images/menu/product9.png",
      categoryId: 3,
    },
    {
      id: 10,
      title: "Ocean Breeze",
      description:
        "A medley of fresh shrimp, crab stick, and avocado, laced with a gentle touch of zesty yuzu-infused tobiko.",
      isEco: false,
      price: 12,
      image: "/images/menu/product10.png",
      categoryId: 3,
    },
    {
      id: 11,
      title: "Tokyo Blossom",
      description:
        "Delicate pink soy paper envelopes a blend of tuna, crab stick, and cucumber, embellished with edible flower petals.",
      isEco: false,
      price: 12,
      image: "/images/menu/product11.png",
      categoryId: 3,
    },
  
    // ---------- SPECIAL ROLLS (categoryId: 4) ----------
    {
      id: 12,
      title: "Sunrise Bliss",
      description:
        "A delicate combination of fresh salmon, cream cheese, and asparagus, rolled in orange-hued tobiko for a burst of sunrise-inspired flavors.",
      isEco: true,
      price: 16,
      image: "/images/menu/product12.png",
      categoryId: 4,
    },
    {
      id: 13,
      title: "Mango Tango Fusion",
      description:
        "Tempura shrimp, cucumber, and avocado dance alongside sweet mango slices, drizzled with a tangy mango sauce.",
      isEco: true,
      price: 16,
      image: "/images/menu/product13.png",
      categoryId: 4,
    },
    {
      id: 14,
      title: "Truffle Indulgence",
      description:
        "Decadent slices of black truffle grace a roll of succulent wagyu beef, cucumber, and microgreens, culminating in an exquisite umami symphony.",
      isEco: true,
      price: 16,
      image: "/images/menu/product14.png",
      categoryId: 4,
    },
    {
      id: 15,
      title: "Pacific Firecracker",
      description:
        "Spicy crab salad, tempura shrimp, and jalapeño peppers combine in a fiery ensemble, accented with a chili-infused aioli.",
      isEco: true,
      price: 16,
      image: "/images/menu/product15.png",
      categoryId: 4,
    },
    {
      id: 16,
      title: "Eternal Eel Enchantment",
      description:
        "An enchanting blend of eel tempura, foie gras, and cucumber, elegantly layered with truffle oil and gold leaf for a touch of opulence.",
      isEco: true,
      price: 16,
      image: "/images/menu/product16.png",
      categoryId: 4,
    },
  ];