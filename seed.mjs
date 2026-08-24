import { MongoClient } from 'mongodb';
import bcrypt from 'bcryptjs';

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/ecommerce';

async function seed() {
  console.log('🌱 Starting database seed...');
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db();
    
    console.log('Creating admin account...');
    
    // Load env vars if they aren't loaded yet (useful if run directly without Next.js)
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@ejadastore.com';
    const adminPassword = process.env.ADMIN_PASSWORD || 'secure_admin_password_123';
    
    // Clear admins
    await db.collection('admins').deleteMany({});
    
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(adminPassword, salt);
    
    await db.collection('admins').insertOne({
      name: 'Super Admin',
      email: adminEmail,
      passwordHash: passwordHash,
    });
    console.log(`✅ Admin created with email: ${adminEmail}`);

    const productCount = await db.collection('products').countDocuments();
    if (productCount > 0) {
      console.log('✅ Products already seeded. Skipping product fetch...');
      return;
    }

    console.log('Fetching data from Platzi FakeStore API...');
    const response = await fetch('https://api.escuelajs.co/api/v1/products?limit=20');
    const fakeProducts = await response.json();

    if (!fakeProducts || fakeProducts.length === 0) {
      console.error('❌ Failed to fetch products from Platzi API');
      return;
    }

    console.log('Clearing existing collections...');
    await db.collection('products').deleteMany({});
    await db.collection('categories').deleteMany({});

    const categoryMap = new Map();
    const categoriesToInsert = [];

    // Extract unique categories
    for (const p of fakeProducts) {
      if (p.category && p.category.name && !categoryMap.has(p.category.name)) {
        categoryMap.set(p.category.name, p.category.name); // Temporary placeholder
        categoriesToInsert.push({ name: p.category.name });
      }
    }

    if (categoriesToInsert.length > 0) {
      const catResult = await db.collection('categories').insertMany(categoriesToInsert);
      // Map category names back to their new ObjectIds
      let index = 0;
      for (const catName of categoryMap.keys()) {
        categoryMap.set(catName, catResult.insertedIds[index]);
        index++;
      }
    }

    const productsToInsert = fakeProducts.map(p => ({
      categoryId: categoryMap.get(p.category.name),
      name: p.title,
      price: p.price,
      stock: Math.floor(Math.random() * 100) + 10,
      imageUrl: p.images && p.images.length > 0 ? p.images[0] : 'https://via.placeholder.com/150',
    }));

    if (productsToInsert.length > 0) {
      const prodResult = await db.collection('products').insertMany(productsToInsert);
      console.log(`✅ Seeded ${catResult?.insertedCount || 0} categories and ${prodResult.insertedCount} products!`);
    }

  } catch (err) {
    console.error('❌ Error during seeding:', err);
  } finally {
    await client.close();
  }
}

seed();
