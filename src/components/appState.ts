export type ScreenId = "splash" | "hub" | "gardastate" | "gr8";

export type MobileTabId = "home" | "discover" | "orders" | "profile";

export interface HubDestination {
  id: "gardastate" | "gr8";
  name: string;
  pillLabel: string;
  externalUrl: string;
  tagline: string;
  badgeText: string;
  helloTitle: string;
  helloSubtitle: string;
  helloMessage: string;
  metrics: {
    label: string;
    value: string;
    subtext: string;
  }[];
  highlights: string[];
}

export interface PickupHub {
  id: string;
  name: string;
  area: string;
  eta: string;
  address: string;
}

export const PICKUP_HUBS: PickupHub[] = [
  {
    id: "stockwell",
    name: "Stockwell Homes",
    area: "Nairobi West",
    eta: "12–20 min",
    address: "Stockwell Homes Pickup & Delivery Zone",
  },
  {
    id: "mama-ngina",
    name: "Mama Ngina St HQ",
    area: "Nairobi CBD",
    eta: "15–25 min",
    address: "International House, Mezzanine Floor, Mama Ngina Street",
  },
  {
    id: "westlands",
    name: "Westlands Swap Hub",
    area: "Westlands",
    eta: "20–30 min",
    address: "Mpaka Road Electric Swap & Service Point",
  },
];

export const HUB_DESTINATIONS: Record<"gardastate" | "gr8", HubDestination> = {
  gardastate: {
    id: "gardastate",
    name: "GardaState Store",
    pillLabel: "GardaState",
    externalUrl: "https://store.gardastate.com/",
    tagline: "Quality Used & New Electric Bikes · Spares",
    badgeText: "KSh 245/day",
    helloTitle: "Hello from GardaState!",
    helloSubtitle: "store.gardastate.com · Nairobi",
    helloMessage:
      "Hello! Welcome to GardaState Store. Browse quality inspected, road-ready electric bikes and genuine spares with a KSh 7,500 deposit and KSh 245/day installments.",
    metrics: [
      {
        label: "Starter Deposit",
        value: "KSh 7,500",
        subtext: "Road-ready electric bikes",
      },
      {
        label: "Daily Installment",
        value: "KSh 245/day",
        subtext: "Flexible M-Pesa wallet plan",
      },
    ],
    highlights: [
      "Quality Inspected & Road-Ready Used Electric Bikes",
      "Affordable Daily Installments (KSh 245/day)",
      "Genuine Spares & Pickup at Mama Ngina Street, Nairobi",
    ],
  },
  gr8: {
    id: "gr8",
    name: "Huduma Credit · GR8",
    pillLabel: "Huduma · GR8",
    externalUrl: "https://pre-order.hudumacredit.com/",
    tagline: "Pre-Order eBikes & Phones · No Paperwork",
    badgeText: "KSh 150–270/day",
    helloTitle: "Hello from GR8 & Huduma Credit!",
    helloSubtitle: "pre-order.hudumacredit.com · Powered by GR8",
    helloMessage:
      "Hello! Welcome to GR8 & Huduma Credit Pre-Order. Pick your Spiro eBike (KSh 270/day) or Smartphone (KSh 150/day) with flexible daily M-Pesa payments and zero paperwork.",
    metrics: [
      {
        label: "Spiro eBike Plan",
        value: "KSh 270/day",
        subtext: "Deposit KSh 15,000 · 415+ stations",
      },
      {
        label: "Smartphone Plan",
        value: "KSh 150/day",
        subtext: "98% fast approval rate",
      },
    ],
    highlights: [
      "Pre-Order Spiro eBikes (KSh 270/day) & Smartphones (KSh 150/day)",
      "15,000+ Happy Customers & 415+ Battery Swap Stations",
      "Instant M-Pesa STK Push Deposit & Automated Daily Wallet",
    ],
  },
};

import { useEffect, useState } from "react";

export interface CatalogItem {
  id: string;
  title: string;
  category: "eBikes" | "Phones";
  dailyRate: number;
  depositAmount: number;
  price: string;
  deposit: string;
  store: "gardastate" | "gr8";
  image: any;
}

export interface CartItem {
  item: CatalogItem;
  quantity: number;
}

export interface OrderRecord {
  id: string;
  date: string;
  items: CartItem[];
  totalDeposit: number;
  totalDaily: number;
  status: "Active Plan" | "Pending Pickup";
}

export interface UserProfile {
  name: string;
  phone: string;
  nationalId: string;
  hub: string;
}

export const CATALOG_ITEMS: CatalogItem[] = [
  {
    id: "garda-ebike",
    title: "Garda City eBike",
    category: "eBikes",
    dailyRate: 245,
    depositAmount: 7500,
    price: "KSh 245/day",
    deposit: "Deposit KSh 7,500",
    store: "gardastate",
    image: require("@/assets/gardastate.png"),
  },
  {
    id: "spiro-ebike",
    title: "Spiro Commuter eBike",
    category: "eBikes",
    dailyRate: 290,
    depositAmount: 8500,
    price: "KSh 290/day",
    deposit: "Deposit KSh 8,500",
    store: "gr8",
    image: require("@/assets/huduma-credit.png"),
  },
  {
    id: "smartphones",
    title: "4G & 5G Smartphones",
    category: "Phones",
    dailyRate: 150,
    depositAmount: 3500,
    price: "KSh 150/day",
    deposit: "Deposit KSh 3,500",
    store: "gr8",
    image: require("@/assets/gr8.png"),
  },
  {
    id: "cargo-ebike",
    title: "Garda Delivery eBike",
    category: "eBikes",
    dailyRate: 310,
    depositAmount: 9000,
    price: "KSh 310/day",
    deposit: "Deposit KSh 9,000",
    store: "gardastate",
    image: require("@/assets/gardastate.png"),
  },
];

let cartState: CartItem[] = [];
let ordersState: OrderRecord[] = [];
let profileState: UserProfile = {
  name: "khalifa",
  phone: "+254 712 345 678",
  nationalId: "34567890",
  hub: "Stockwell Homes · Nairobi",
};

const listeners = new Set<() => void>();
const notify = () => listeners.forEach((l) => l());

export function useAppStore() {
  const [, setTick] = useState(0);

  useEffect(() => {
    const listener = () => setTick((t) => t + 1);
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  }, []);

  const addToCart = (item: CatalogItem) => {
    const existing = cartState.find((c) => c.item.id === item.id);
    if (existing) {
      cartState = cartState.map((c) =>
        c.item.id === item.id ? { ...c, quantity: c.quantity + 1 } : c,
      );
    } else {
      cartState = [...cartState, { item, quantity: 1 }];
    }
    notify();
  };

  const updateQuantity = (id: string, delta: number) => {
    cartState = cartState
      .map((c) =>
        c.item.id === id ? { ...c, quantity: c.quantity + delta } : c,
      )
      .filter((c) => c.quantity > 0);
    notify();
  };

  const clearCart = () => {
    cartState = [];
    notify();
  };

  const checkoutCart = () => {
    if (cartState.length === 0) return;
    const totalDeposit = cartState.reduce(
      (sum, c) => sum + c.item.depositAmount * c.quantity,
      0,
    );
    const totalDaily = cartState.reduce(
      (sum, c) => sum + c.item.dailyRate * c.quantity,
      0,
    );
    const newOrder: OrderRecord = {
      id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      date: new Date().toLocaleDateString("en-KE", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
      items: [...cartState],
      totalDeposit,
      totalDaily,
      status: "Active Plan",
    };
    ordersState = [newOrder, ...ordersState];
    cartState = [];
    notify();
  };

  const updateProfile = (next: Partial<UserProfile>) => {
    profileState = { ...profileState, ...next };
    notify();
  };

  const cartCount = cartState.reduce((sum, c) => sum + c.quantity, 0);

  return {
    cart: cartState,
    cartCount,
    orders: ordersState,
    profile: profileState,
    addToCart,
    updateQuantity,
    clearCart,
    checkoutCart,
    updateProfile,
  };
}
