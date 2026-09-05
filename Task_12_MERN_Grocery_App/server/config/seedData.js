import Product from "../models/Product.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";

export const initialGroceryProducts = [
  // Vegetables
  {
    name: "Fresh Potato (Aaloo)",
    category: "Vegetables",
    price: 30,
    offerPrice: 24,
    unit: "1 kg",
    image: [
      "https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=600&q=80",
    ],
    description: [
      "Fresh, farm-harvested organic potatoes",
      "Rich in carbohydrates and potassium",
      "Perfect for curries, fries, and roasting",
      "No artificial ripening or chemicals",
    ],
    inStock: true,
  },
  {
    name: "Ripe Hybrid Tomatoes",
    category: "Vegetables",
    price: 45,
    offerPrice: 38,
    unit: "1 kg",
    image: [
      "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=600&q=80",
    ],
    description: [
      "Juicy and nutrient-dense farm tomatoes",
      "High in Vitamin C and antioxidant Lycopene",
      "Ideal for salads, gravies, and fresh sauces",
    ],
    inStock: true,
  },
  {
    name: "Crunchy Orange Carrots",
    category: "Vegetables",
    price: 35,
    offerPrice: 29,
    unit: "500 g",
    image: [
      "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?auto=format&fit=crop&w=600&q=80",
    ],
    description: [
      "Sweet, crisp, and freshly harvested carrots",
      "Excellent source of Beta Carotene and Vitamin A",
      "Great for juices, raw snacking, and salads",
    ],
    inStock: true,
  },
  {
    name: "Organic Baby Spinach (Palak)",
    category: "Vegetables",
    price: 25,
    offerPrice: 19,
    unit: "250 g",
    image: [
      "https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=600&q=80",
    ],
    description: [
      "Tender, iron-rich fresh spinach leaves",
      "Hydroponically grown and double washed",
      "Perfect for healthy smoothies and Indian curries",
    ],
    inStock: true,
  },
  {
    name: "Red Onions (Pyaaz)",
    category: "Vegetables",
    price: 32,
    offerPrice: 26,
    unit: "1 kg",
    image: [
      "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&w=600&q=80",
    ],
    description: [
      "Pungent, flavorful premium red onions",
      "Kitchen staple for aromatics and daily cooking",
      "Long shelf-life and dry outer skin",
    ],
    inStock: true,
  },

  // Fruits
  {
    name: "Royal Gala Fresh Apples",
    category: "Fruits",
    price: 150,
    offerPrice: 129,
    unit: "1 kg (4-5 pcs)",
    image: [
      "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=600&q=80",
    ],
    description: [
      "Crisp, sweet, and aromatic Himalayan apples",
      "Packed with dietary fiber and Vitamin C",
      "Handpicked and wax-free",
    ],
    inStock: true,
  },
  {
    name: "Nagpur Sweet Oranges",
    category: "Fruits",
    price: 90,
    offerPrice: 75,
    unit: "1 kg",
    image: [
      "https://images.unsplash.com/photo-1582979512210-99b6a53386f9?auto=format&fit=crop&w=600&q=80",
    ],
    description: [
      "Juicy and refreshing citrus oranges",
      "Natural immunity booster with pure Vitamin C",
      "Perfect for morning fresh-pressed juice",
    ],
    inStock: true,
  },
  {
    name: "Robusta Fresh Bananas",
    category: "Fruits",
    price: 55,
    offerPrice: 42,
    unit: "1 kg (6-8 pcs)",
    image: [
      "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=600&q=80",
    ],
    description: [
      "Naturally ripened sweet robusta bananas",
      "High in potassium and instant energy booster",
      "Great for smoothies and fitness snacks",
    ],
    inStock: true,
  },
  {
    name: "Alphonso King Mangoes",
    category: "Fruits",
    price: 240,
    offerPrice: 199,
    unit: "1 kg (3-4 pcs)",
    image: [
      "https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=600&q=80",
    ],
    description: [
      "Finest Ratnagiri Alphonso mangoes",
      "Rich golden pulp with unmatched aroma and sweetness",
      "Carbide-free and naturally ripened",
    ],
    inStock: true,
  },
  {
    name: "Seedless Black Grapes",
    category: "Fruits",
    price: 95,
    offerPrice: 79,
    unit: "500 g",
    image: [
      "https://images.unsplash.com/photo-1537640538966-79f369143f8f?auto=format&fit=crop&w=600&q=80",
    ],
    description: [
      "Sweet, crisp seedless black grapes",
      "Rich in powerful antioxidants and resveratrol",
      "Carefully cleaned and hygienically packed",
    ],
    inStock: true,
  },

  // Dairy Products
  {
    name: "Amul Taaza Homogenised Milk",
    category: "Dairy",
    price: 66,
    offerPrice: 62,
    unit: "1 Litre",
    image: [
      "https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=600&q=80",
    ],
    description: [
      "Pasteurised toned milk with 3.0% fat",
      "Rich in calcium, protein, and essential Vitamin D",
      "No preservatives added",
    ],
    inStock: true,
  },
  {
    name: "Fresh Malai Paneer",
    category: "Dairy",
    price: 110,
    offerPrice: 95,
    unit: "200 g",
    image: [
      "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=600&q=80",
    ],
    description: [
      "Super soft and rich cow milk cottage cheese",
      "High protein content (18g per 100g)",
      "Mouth-watering texture for Shahi Paneer & Tikka",
    ],
    inStock: true,
  },
  {
    name: "Farm Fresh Brown Eggs",
    category: "Dairy",
    price: 115,
    offerPrice: 99,
    unit: "Pack of 12",
    image: [
      "https://images.unsplash.com/photo-1506976785307-8732e854ad03?auto=format&fit=crop&w=600&q=80",
    ],
    description: [
      "Free-range vegetarian fed hen eggs",
      "Rich in Omega-3 and high biological value protein",
      "UV sanitized and sorted for consistency",
    ],
    inStock: true,
  },
  {
    name: "Amul Processed Cheddar Cheese",
    category: "Dairy",
    price: 155,
    offerPrice: 139,
    unit: "200 g block",
    image: [
      "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?auto=format&fit=crop&w=600&q=80",
    ],
    description: [
      "Creamy, easy-melting cheese block",
      "Perfect for sandwiches, pizzas, and pastas",
      "High calcium goodness",
    ],
    inStock: true,
  },

  // Cold Drinks & Beverages
  {
    name: "Coca-Cola Zero Sugar",
    category: "Drinks",
    price: 45,
    offerPrice: 39,
    unit: "750 ml Bottle",
    image: [
      "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=600&q=80",
    ],
    description: [
      "Iconic crisp Coca-Cola taste with zero calories",
      "Best served chilled with ice and lemon",
      "Perfect party refresher",
    ],
    inStock: true,
  },
  {
    name: "Pepsi Refreshing Cola",
    category: "Drinks",
    price: 75,
    offerPrice: 65,
    unit: "1.25 Litre",
    image: [
      "https://images.unsplash.com/photo-1554866585-cd94860890b7?auto=format&fit=crop&w=600&q=80",
    ],
    description: [
      "Bold, fizzy, and thirst-quenching cola drink",
      "Great companion for snacks and meals",
    ],
    inStock: true,
  },
  {
    name: "Sprite Clear Lemon-Lime",
    category: "Drinks",
    price: 45,
    offerPrice: 38,
    unit: "750 ml",
    image: [
      "https://images.unsplash.com/photo-1625772299848-391b6a87d7b3?auto=format&fit=crop&w=600&q=80",
    ],
    description: [
      "Crisp, clear citrus lemon-lime soda",
      "100% natural flavors and maximum refreshment",
    ],
    inStock: true,
  },
  {
    name: "Fanta Orange Fizzy Soda",
    category: "Drinks",
    price: 45,
    offerPrice: 38,
    unit: "750 ml",
    image: [
      "https://images.unsplash.com/photo-1624517452488-04869289c4ca?auto=format&fit=crop&w=600&q=80",
    ],
    description: [
      "Vibrant and fruity orange flavored soda",
      "Fun burst of bubbles and zest",
    ],
    inStock: true,
  },

  // Bakery & Breads
  {
    name: "100% Whole Wheat Brown Bread",
    category: "Bakery",
    price: 50,
    offerPrice: 42,
    unit: "400 g",
    image: [
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80",
    ],
    description: [
      "Freshly baked artisan whole wheat sandwich bread",
      "Zero maida, high dietary fiber",
      "Soft slices ideal for healthy morning toasts",
    ],
    inStock: true,
  },
  {
    name: "French Butter Croissants",
    category: "Bakery",
    price: 90,
    offerPrice: 79,
    unit: "Pack of 2",
    image: [
      "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=600&q=80",
    ],
    description: [
      "Authentic flaky and golden butter croissants",
      "Laminated with pure European dairy butter",
      "Crispy exterior with soft honeycomb layers inside",
    ],
    inStock: true,
  },
  {
    name: "Dark Chocolate Truffle Cake",
    category: "Bakery",
    price: 399,
    offerPrice: 349,
    unit: "500 g",
    image: [
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=600&q=80",
    ],
    description: [
      "Decadent Belgian dark chocolate ganache cake",
      "Moist sponge layers with premium cocoa glaze",
      "Perfect for birthdays and celebrations",
    ],
    inStock: true,
  },

  // Grains & Cereals
  {
    name: "Daawat Royal Basmati Rice",
    category: "Grains",
    price: 650,
    offerPrice: 569,
    unit: "5 kg Bag",
    image: [
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=600&q=80",
    ],
    description: [
      "Aged long-grain aromatic royal basmati rice",
      "Elongates to over 2x length after cooking",
      "Non-sticky grains for exquisite Biryani and Pulao",
    ],
    inStock: true,
  },
  {
    name: "Aashirvaad Superior Sharbati Atta",
    category: "Grains",
    price: 290,
    offerPrice: 255,
    unit: "5 kg",
    image: [
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80",
    ],
    description: [
      "100% pure Sharbati whole wheat flour",
      "Absorbs more water to make softer rotis longer",
      "Stone ground with bran lock technology",
    ],
    inStock: true,
  },
  {
    name: "Organic White Quinoa",
    category: "Grains",
    price: 380,
    offerPrice: 320,
    unit: "500 g",
    image: [
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=600&q=80",
    ],
    description: [
      "Nutrient-dense superfood grain",
      "Gluten-free, complete protein with all 9 amino acids",
      "Great substitute for white rice in salads and bowls",
    ],
    inStock: true,
  },

  // Instant Foods
  {
    name: "Maggi 2-Minute Masala Noodles",
    category: "Instant",
    price: 60,
    offerPrice: 52,
    unit: "Pack of 4 (280g)",
    image: [
      "https://images.unsplash.com/photo-1612927601601-6638404737ce?auto=format&fit=crop&w=600&q=80",
    ],
    description: [
      "India's favorite instant noodle with signature masala tastemaker",
      "Fortified with iron and goodness of roasted spices",
      "Ready in under 2 minutes",
    ],
    inStock: true,
  },
  {
    name: "Knorr Classic Sweet Corn Veg Soup",
    category: "Instant",
    price: 45,
    offerPrice: 38,
    unit: "43 g Pack",
    image: [
      "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=600&q=80",
    ],
    description: [
      "Restaurant-quality thick sweet corn vegetable soup",
      "Real sweet corn bits and garden vegetables",
      "100% real ingredients with no added MSG",
    ],
    inStock: true,
  },
  {
    name: "Sunfeast YiPPee! Magic Masala",
    category: "Instant",
    price: 55,
    offerPrice: 48,
    unit: "Pack of 4 (260g)",
    image: [
      "https://images.unsplash.com/photo-1612927601601-6638404737ce?auto=format&fit=crop&w=600&q=80",
    ],
    description: [
      "Non-sticky round block instant noodles",
      "Infused with 5 signature spices and dehydrated veggies",
      "Long slurpy noodles every time",
    ],
    inStock: true,
  },
];

export const seedDatabase = async () => {
  try {
    const productCount = await Product.countDocuments();
    if (productCount === 0) {
      console.log("Seeding initial grocery products...");
      await Product.insertMany(initialGroceryProducts);
      console.log(`Successfully seeded ${initialGroceryProducts.length} grocery items!`);
    }

    // Seed default admin seller if not exists
    const adminEmail = process.env.ADMIN_EMAIL || "seller@greencart.com";
    const existingSeller = await User.findOne({ email: adminEmail });
    if (!existingSeller) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD || "seller123", salt);
      await User.create({
        name: "GreenCart Official Seller",
        email: adminEmail,
        password: hashedPassword,
        role: "seller",
        phone: "+91 9876543210",
      });
      console.log(`Created default seller account: ${adminEmail}`);
    }

    // Seed default customer if not exists
    const customerEmail = "customer@greencart.com";
    const existingCustomer = await User.findOne({ email: customerEmail });
    if (!existingCustomer) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash("customer123", salt);
      await User.create({
        name: "Rajdeep Sharma",
        email: customerEmail,
        password: hashedPassword,
        role: "customer",
        phone: "+91 9123456780",
      });
      console.log(`Created demo customer account: ${customerEmail}`);
    }
  } catch (error) {
    console.error("Database seeding notice:", error.message);
  }
};
