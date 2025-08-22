export interface Warranty {
  years: number;
  type: string;
  coverage: string[];
}

export interface Review {
  id: number;
  rating: number;
  comment: string;
  reviewer: string;
  reviewerEmail: string;
  date: string; // ISO date string
  verified: boolean;
  helpful: number;
}

export interface Specifications {
  processor: string;
  memory: string;
  storage: string;
  display: string;
  camera: string;
  battery: string;
  os: string;
  connectivity: string[];
}

export interface Pricing {
  original: number;
  current: number;
  discount: number;
  currency: string;
  tax: number;
}

export interface Inventory {
  stock: number;
  reserved: number;
  available: number;
  reorderLevel: number;
  supplier: string;
  nextDelivery: string; // ISO date string
}

export interface Shipping {
  weight: number;
  dimensions: {
    length: number;
    width: number;
    height: number;
  };
  freeShipping: boolean;
  estimatedDays: number;
  shippingMethods: string[];
}

export interface SEO {
  title: string;
  description: string;
  keywords: string[];
  slug: string;
}

export interface Analytics {
  views: number;
  purchases: number;
  conversionRate: number;
  averageRating: number;
  totalReviews: number;
}

export interface Product {
  id?: number;
  name?: string;
  isAvailable?: boolean;
  price?: number;
  priceFloat?: number;
  description?: string;
  manufacturer?: string | null;
  warranty?: Warranty;
  createdAt?: string;
  updatedAt?: string;
  tags?: string[];
  reviews?: Review[];
  specifications?: Specifications;
  categories?: string[];
  pricing?: Pricing;
  inventory?: Inventory;
  shipping?: Shipping;
  seo?: SEO;
  analytics?: Analytics;
}

export class ProductBuilder {
  private data: Product;

  constructor() {
    this.data = {
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  }

  withId(id: number) {
    this.data.id = id;
    return this;
  }

  withName(name: string) {
    this.data.name = name;
    return this;
  }

  withAvailability(isAvailable: boolean) {
    this.data.isAvailable = isAvailable;
    return this;
  }

  withPrice(price: number) {
    this.data.price = price;
    return this;
  }

  withPriceFloat(priceFloat: number) {
    this.data.priceFloat = priceFloat;
    return this;
  }

  withDescription(description: string) {
    this.data.description = description;
    return this;
  }

  withManufacturer(manufacturer: string | null) {
    this.data.manufacturer = manufacturer;
    return this;
  }

  withWarranty(warranty: Warranty) {
    this.data.warranty = warranty;
    return this;
  }

  withTags(tags: string[]) {
    this.data.tags = tags;
    return this;
  }

  withReviews(reviews: Review[]) {
    this.data.reviews = reviews;
    return this;
  }

  withSpecifications(specs: Specifications) {
    this.data.specifications = specs;
    return this;
  }

  withCategories(categories: string[]) {
    this.data.categories = categories;
    return this;
  }

  withPricing(pricing: Pricing) {
    this.data.pricing = pricing;
    return this;
  }

  withInventory(inventory: Inventory) {
    this.data.inventory = inventory;
    return this;
  }

  withShipping(shipping: Shipping) {
    this.data.shipping = shipping;
    return this;
  }

  withSEO(seo: SEO) {
    this.data.seo = seo;
    return this;
  }

  withAnalytics(analytics: Analytics) {
    this.data.analytics = analytics;
    return this;
  }

  withCreatedAt(date: string) {
    this.data.createdAt = date;
    return this;
  }

  withUpdatedAt(date: string) {
    this.data.updatedAt = date;
    return this;
  }

  build() {
    if (!this.data.name) {
      throw Error("Name is required");
    }

    return this.data;
  }
}

const product = new ProductBuilder()
  .withId(125)
  .withName("Smartphone X200")
  .withPrice(799)
  .withPriceFloat(799.99)
  .withDescription("The latest Smartphone X200 with cutting-edge features.")
  .withManufacturer("TechCorp")
  .withAvailability(true)
  .withWarranty({ years: 2, type: "Limited", coverage: ["hardware", "software", "battery"] })
  .withTags(["electronics", "smartphone", "new"])
  .withSpecifications({
    processor: "Octa-core 3.0 GHz",
    memory: "8GB RAM",
    storage: "128GB",
    display: "6.5-inch OLED",
    camera: "48MP + 12MP Dual Camera",
    battery: "4000mAh",
    os: "Android 12",
    connectivity: ["5G", "WiFi 6", "Bluetooth 5.2"],
  })
  .withCategories(["Electronics", "Mobile Phones"])
  .build();

console.log(product);
