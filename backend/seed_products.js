import https from 'https';
import fs from 'fs';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: './.env' });

// Download helper with redirect support
const downloadFile = (url, dest) => {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (response) => {
      if (response.statusCode === 301 || response.statusCode === 302) {
        file.close();
        fs.unlinkSync(dest);
        return downloadFile(response.headers.location, dest).then(resolve).catch(reject);
      }
      if (response.statusCode !== 200) {
        file.close();
        return reject(new Error(`Failed to get '${url}' (${response.statusCode})`));
      }
      response.pipe(file);
      file.on('finish', () => file.close(resolve));
    }).on('error', (err) => {
      fs.unlink(dest, () => reject(err));
    });
  });
};

// Product definitions with Unsplash image URLs
const newProducts = [
  {
    title: "Casio FX-991EX Scientific Calculator",
    description: "Advanced scientific calculator, perfect for engineering and math courses. Natural textbook display, 552 functions. Used for just one semester.",
    price: 850,
    category: "Electronics",
    status: "available",
    location: "North Campus",
    views: 67,
    rating: 4.7,
    numReviews: 9,
    imageUrl: "https://images.unsplash.com/photo-1564466809058-bf4114d55352?q=80&w=800&auto=format&fit=crop",
    imageName: "calculator.png"
  },
  {
    title: "Wildcraft College Backpack 35L",
    description: "Spacious 35-litre laptop backpack with rain cover. Multiple compartments for books, laptop, and water bottle. Great for daily commute.",
    price: 1200,
    category: "Others",
    status: "available",
    location: "South Campus",
    views: 145,
    rating: 4.3,
    numReviews: 15,
    imageUrl: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=800&auto=format&fit=crop",
    imageName: "backpack.png"
  },
  {
    title: "JBL Tune 510BT Wireless Headphones",
    description: "Bluetooth headphones with 40-hour battery life. Perfect for library study sessions and online classes. Barely used, like new condition.",
    price: 2200,
    category: "Electronics",
    status: "available",
    location: "Hostel Area",
    views: 210,
    rating: 4.6,
    numReviews: 18,
    imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800&auto=format&fit=crop",
    imageName: "headphones.png"
  },
  {
    title: "Engineering Drawing Kit (Rotring)",
    description: "Complete drafting set with compass, divider, mini drafter, and protractor. Essential for first-year engineering students. All pieces intact.",
    price: 650,
    category: "Others",
    status: "available",
    location: "East Block",
    views: 52,
    rating: 4.4,
    numReviews: 6,
    imageUrl: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=800&auto=format&fit=crop",
    imageName: "drawing_kit.png"
  },
  {
    title: "Data Structures & Algorithms in Python",
    description: "Comprehensive textbook covering arrays, trees, graphs, sorting, and dynamic programming. Highlighted in some chapters but otherwise clean.",
    price: 320,
    category: "Books",
    status: "available",
    location: "West Block",
    views: 98,
    rating: 4.9,
    numReviews: 11,
    imageUrl: "https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=800&auto=format&fit=crop",
    imageName: "dsa_book.png"
  },
  {
    title: "LED Desk Lamp with USB Charging",
    description: "Adjustable LED study lamp with 3 brightness modes and USB charging port. Eye-friendly warm light. Perfect for late-night study sessions.",
    price: 750,
    category: "Electronics",
    status: "available",
    location: "Hostel Area",
    views: 134,
    rating: 4.5,
    numReviews: 14,
    imageUrl: "https://images.unsplash.com/photo-1517999144091-3d9dca6d1e43?q=80&w=800&auto=format&fit=crop",
    imageName: "desk_lamp.png"
  },
  {
    title: "Yamaha F280 Acoustic Guitar",
    description: "Great beginner guitar for hostel jam sessions. Comes with a carry bag, capo, and extra strings. Minor scratches on body.",
    price: 4500,
    category: "Others",
    status: "available",
    location: "Hostel Area",
    views: 178,
    rating: 4.8,
    numReviews: 7,
    imageUrl: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?q=80&w=800&auto=format&fit=crop",
    imageName: "guitar.png"
  },
  {
    title: "HP LaserJet Printer (Black & White)",
    description: "Compact laser printer, great for printing assignments and project reports. Includes a half-full toner cartridge. USB and WiFi connectivity.",
    price: 5500,
    category: "Electronics",
    status: "available",
    location: "North Campus",
    views: 89,
    rating: 4.2,
    numReviews: 5,
    imageUrl: "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?q=80&w=800&auto=format&fit=crop",
    imageName: "printer.png"
  }
];

async function main() {
  // Ensure uploads dir exists
  const uploadsDir = './uploads';
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }

  // Download all images
  console.log("📸 Downloading product images...");
  for (const product of newProducts) {
    const dest = path.join(uploadsDir, product.imageName);
    try {
      await downloadFile(product.imageUrl, dest);
      console.log(`  ✅ ${product.imageName}`);
    } catch (err) {
      console.error(`  ❌ ${product.imageName}: ${err.message}`);
    }
  }

  // Connect to MongoDB
  console.log("\n🔗 Connecting to MongoDB...");
  await mongoose.connect(process.env.DB_URL);
  console.log("  ✅ Connected");

  // Get sellers (use all existing users to distribute products)
  const User = mongoose.model('User', new mongoose.Schema({}, { strict: false }));
  const users = await User.find();
  if (users.length === 0) {
    console.error("❌ No user found in database. Please register a user first.");
    process.exit(1);
  }
  console.log(`  👤 Found ${users.length} users in database.`);

  // Insert products
  const Product = mongoose.model('Product', new mongoose.Schema({}, { strict: false }), 'products');
  
  console.log("\n🧹 Clearing existing products to avoid duplicates...");
  await Product.deleteMany({});
  console.log("  ✅ Cleared existing products");

  const docs = newProducts.map((p, idx) => {
    const assignedSeller = users[idx % users.length];
    console.log(`  🔗 Assigning product "${p.title}" to seller: ${assignedSeller.name}`);
    return {
      title: p.title,
      description: p.description,
      price: p.price,
      category: p.category,
      images: [`http://localhost:5000/uploads/${p.imageName}`],
      seller: assignedSeller._id,
      status: p.status,
      location: p.location,
      views: p.views,
      rating: p.rating,
      numReviews: p.numReviews,
      reviews: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  });

  console.log("\n📦 Inserting products...");
  const result = await Product.insertMany(docs);
  console.log(`  ✅ Inserted ${result.length} new products distributed among sellers!`);

  // Summary
  const total = await Product.countDocuments();
  console.log(`\n🎉 Total products in database: ${total}`);

  await mongoose.disconnect();
  console.log("✅ Done!");
}

main().catch(err => {
  console.error("Fatal error:", err);
  process.exit(1);
});
