import { faker } from "@faker-js/faker";
import {
  Product,
  Warranty,
  Review,
  Specifications,
  Pricing,
  Inventory,
  Shipping,
  SEO,
  Analytics,
} from "./ProductBuilder";

export class ProductFactory {
  static createValidProduct(): Product {
    return {
      id: faker.number.int({ min: 10000, max: 99999 }),
      name: faker.commerce.productName(),
      isAvailable: true,
      price: faker.number.int({ min: 10000, max: 99900 }),
      priceFloat: parseFloat(faker.commerce.price({ min: 100, max: 999 })),
      description: faker.commerce.productDescription(),
      manufacturer: faker.company.name(),
      warranty: this.generateWarranty(),
      createdAt: faker.date.past().toISOString(),
      updatedAt: faker.date.recent().toISOString(),
      tags: faker.helpers.arrayElements(["5G", "smartphone", "premium", "mobile", "android"]),
      reviews: this.generateReviews(faker.number.int({min: 3, max: 5})),
      specifications: this.generateSpecifications(),
      categories: ["electronics", "smartphones", "premium"],
      pricing: this.generatePricing(),
      inventory: this.generateInventory(),
      shipping: this.generateShipping(),
      seo: this.generateSEO(),
      analytics: this.generateAnalytics(),
    };
  }

  static createValidProducts(count: number): Product[] {
    return Array.from({ length: count }, () => this.createValidProduct());
  }

  static createProductWithoutPricing(): Product {
    const product = this.createValidProduct();
    delete product.pricing;
    return product;
  }

  static createProductWithInvalidData(): any {
    return {
      id: "invalid_id",
      name: 123,
      isAvailable: "yes",
      price: "high",
      warranty: {
        years: "two",
        type: null,
        coverage: "everything",
      },
      // Invalid fields and missing required structure
    };
  }

  // ---------- Modular Generators Below ----------

  static generateWarranty(): Warranty {
    return {
      years: faker.number.int({ min: 1, max: 5 }),
      type: faker.helpers.arrayElement(["limited", "extended", "lifetime"]),
      coverage: faker.helpers.arrayElements(["hardware", "software", "battery", "display"], { min: 1, max: 3 }),
    };
  }

  static generateSpecifications(): Specifications {
    return {
      processor: faker.commerce.productAdjective() + " Processor",
      memory: "8GB RAM",
      storage: "256GB",
      display: "6.7 inch OLED",
      camera: "50MP triple camera",
      battery: "4500mAh",
      os: "Android 14",
      connectivity: ["5G", "WiFi 6E", "Bluetooth 5.3", "NFC"],
    };
  }

  static generatePricing(): Pricing {
    return {
      original: 99900,
      current: 89900,
      discount: 10,
      currency: "USD",
      tax: 8.5,
    };
  }

  static generateInventory(): Inventory {
    return {
      stock: faker.number.int({ min: 50, max: 500 }),
      reserved: faker.number.int({ min: 0, max: 50 }),
      available: faker.number.int({ min: 0, max: 500 }),
      reorderLevel: faker.number.int({ min: 10, max: 100 }),
      supplier: faker.company.name(),
      nextDelivery: faker.date.future().toISOString(),
    };
  }

  static generateShipping(): Shipping {
    return {
      weight: faker.number.float({ min: 0.1, max: 1.0, multipleOf: 0.01 }),
      dimensions: {
        length: faker.number.float({ min: 10, max: 20, multipleOf: 0.1  }),
        width: faker.number.float({ min: 5, max: 10, multipleOf: 0.1  }),
        height: faker.number.float({ min: 0.5, max: 2, multipleOf: 0.1  }),
      },
      freeShipping: faker.datatype.boolean(),
      estimatedDays: faker.number.int({ min: 1, max: 5 }),
      shippingMethods: ["standard", "express", "overnight"],
    };
  }

  static generateSEO(): SEO {
    const productName = faker.commerce.productName();
    return {
      title: `${productName} - Premium Mobile`,
      description: `Discover the new ${productName} with cutting-edge features and 5G connectivity.`,
      keywords: ["smartphone", "5G", "premium", "camera", "android"],
      slug: faker.helpers.slugify(productName).toLowerCase(),
    };
  }

  static generateAnalytics(): Analytics {
    return {
      views: faker.number.int({ min: 1000, max: 20000 }),
      purchases: faker.number.int({ min: 100, max: 1000 }),
      conversionRate: faker.number.float({ min: 1, max: 10, multipleOf: 0.1 }),
      averageRating: faker.number.float({ min: 3, max: 5, multipleOf: 0.1 }),
      totalReviews: faker.number.int({ min: 10, max: 300 }),
    };
  }

  static generateReviews(count: number): Review[] {
    return Array.from({ length: count }, (_, i) => ({
      id: i + 1,
      rating: faker.number.int({ min: 1, max: 5 }),
      comment: faker.lorem.sentence(),
      reviewer: faker.person.fullName(),
      reviewerEmail: faker.internet.email(),
      date: faker.date.past().toISOString(),
      verified: faker.datatype.boolean(),
      helpful: faker.number.int({ min: 0, max: 100 }),
    }));
  }
}

const product = ProductFactory.createValidProduct();
console.log(product)