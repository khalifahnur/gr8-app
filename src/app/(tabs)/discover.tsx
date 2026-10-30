import {
  CATALOG_ITEMS,
  HUB_DESTINATIONS,
  useAppStore,
} from "@/components/appState";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Svg, { Circle, Path } from "react-native-svg";

const CATEGORIES = ["All", "eBikes", "Phones", "Stores"];

export default function DiscoverTabScreen() {
  const router = useRouter();
  const { cart, cartCount, addToCart, updateQuantity } = useAppStore();
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const q = query.trim().toLowerCase();

  const allStores = [HUB_DESTINATIONS.gardastate, HUB_DESTINATIONS.gr8];
  const filteredStores = allStores.filter((store) => {
    if (activeCategory !== "All" && activeCategory !== "Stores") return false;
    if (!q) return true;
    return (
      store.name.toLowerCase().includes(q) ||
      store.tagline.toLowerCase().includes(q) ||
      store.badgeText.toLowerCase().includes(q)
    );
  });

  const filteredItems = CATALOG_ITEMS.filter((item) => {
    const matchesCategory =
      activeCategory === "All" || item.category === activeCategory;
    const matchesQuery =
      !q ||
      item.title.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q) ||
      item.price.toLowerCase().includes(q);
    return matchesCategory && matchesQuery;
  });

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top"]}>
      <ScrollView
        className="flex-1 bg-background"
        contentContainerClassName="p-4 pb-8"
        showsVerticalScrollIndicator={false}
      >
        <View className="mb-3 flex-row items-center justify-between">
          <Text className="text-[22px] font-extrabold text-text">Discover</Text>
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={() => router.push("/orders")}
            className="flex-row items-center gap-1.5 rounded-full bg-primary-soft px-3.5 py-1.5"
          >
            <Text className="text-xs font-extrabold text-text">Cart</Text>
            <View className="h-5 min-w-[20px] items-center justify-center rounded-full bg-primary px-1">
              <Text className="text-[11px] font-extrabold text-text">
                {cartCount}
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <View className="mb-3.5 h-12 flex-row items-center rounded-full border border-border bg-background-element/40 px-4">
          <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
            <Circle cx={11} cy={11} r={7} stroke="#687076" strokeWidth={2} />
            <Path
              d="M16.2 16.2L20.5 20.5"
              stroke="#687076"
              strokeWidth={2}
              strokeLinecap="round"
            />
          </Svg>
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Search eBikes, phones, or stores..."
            placeholderTextColor="#687076"
            className="ml-2.5 flex-1 text-[13px] font-medium text-text"
          />
          {query.length > 0 && (
            <TouchableOpacity onPress={() => setQuery("")}>
              <Text className="text-xs font-bold text-text-muted">✕</Text>
            </TouchableOpacity>
          )}
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerClassName="gap-2 mb-5"
        >
          {CATEGORIES.map((category) => {
            const isSelected = activeCategory === category;
            return (
              <TouchableOpacity
                key={category}
                activeOpacity={0.85}
                onPress={() => setActiveCategory(category)}
                className={`rounded-full px-4 py-2 ${
                  isSelected
                    ? "bg-primary"
                    : "border border-border bg-background"
                }`}
              >
                <Text
                  className={`text-xs font-bold ${
                    isSelected ? "text-text" : "text-text-muted"
                  }`}
                >
                  {category}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {filteredItems.length > 0 && (
          <View className="mb-6">
            <Text className="mb-3 text-base font-extrabold text-text">
              Available on Daily Plans
            </Text>
            <View className="flex-row flex-wrap justify-between gap-y-3">
              {filteredItems.map((item) => {
                const cartEntry = cart.find((c) => c.item.id === item.id);
                const quantity = cartEntry?.quantity ?? 0;

                return (
                  <View
                    key={item.id}
                    className="w-[48%] justify-between rounded-[20px] border border-border bg-background p-3"
                  >
                    <TouchableOpacity
                      activeOpacity={0.88}
                      onPress={() =>
                        router.push({
                          pathname: "/hello/[store]",
                          params: { store: item.store },
                        })
                      }
                    >
                      <View className="mb-2.5 h-28 w-full items-center justify-center rounded-2xl bg-primary-soft/50 p-3">
                        <Image
                          source={item.image}
                          className="h-full w-full"
                          resizeMode="contain"
                        />
                      </View>
                      <View className="self-start rounded-md bg-secondary-soft px-2 py-0.5">
                        <Text className="text-[10px] font-bold text-secondary">
                          {item.category}
                        </Text>
                      </View>
                      <Text
                        className="mt-1.5 text-sm font-extrabold text-text"
                        numberOfLines={1}
                      >
                        {item.title}
                      </Text>
                      <Text className="mt-0.5 text-xs font-bold text-accent">
                        {item.price}
                      </Text>
                      <Text className="mt-0.5 text-[11px] text-text-muted">
                        {item.deposit}
                      </Text>
                    </TouchableOpacity>

                    {quantity === 0 ? (
                      <TouchableOpacity
                        activeOpacity={0.85}
                        onPress={() => addToCart(item)}
                        className="mt-3 items-center justify-center rounded-xl bg-primary py-2"
                      >
                        <Text className="text-xs font-extrabold text-text">
                          + Add to Cart
                        </Text>
                      </TouchableOpacity>
                    ) : (
                      <View className="mt-3 flex-row items-center justify-between rounded-xl bg-secondary-soft px-2 py-1">
                        <TouchableOpacity
                          onPress={() => updateQuantity(item.id, -1)}
                          className="h-7 w-7 items-center justify-center rounded-lg bg-background"
                        >
                          <Text className="text-sm font-extrabold text-text">
                            −
                          </Text>
                        </TouchableOpacity>
                        <Text className="text-xs font-extrabold text-secondary">
                          {quantity} in cart
                        </Text>
                        <TouchableOpacity
                          onPress={() => updateQuantity(item.id, 1)}
                          className="h-7 w-7 items-center justify-center rounded-lg bg-secondary"
                        >
                          <Text className="text-sm font-extrabold text-white">
                            +
                          </Text>
                        </TouchableOpacity>
                      </View>
                    )}
                  </View>
                );
              })}
            </View>
          </View>
        )}

        {filteredStores.length > 0 && (
          <View>
            <Text className="mb-3 text-base font-extrabold text-text">
              Partner Stores
            </Text>
            <View className="gap-3">
              {filteredStores.map((dest) => (
                <TouchableOpacity
                  key={dest.id}
                  activeOpacity={0.88}
                  onPress={() =>
                    router.push({
                      pathname: "/hello/[store]",
                      params: { store: dest.id },
                    })
                  }
                  className="flex-row items-center gap-3 rounded-[22px] border border-border bg-background p-3.5"
                >
                  <View className="h-14 w-14 items-center justify-center rounded-2xl border border-primary/45 bg-primary-soft p-2">
                    <Image
                      source={
                        dest.id === "gardastate"
                          ? require("@/assets/gardastate.png")
                          : require("@/assets/huduma-credit.png")
                      }
                      className="h-full w-full"
                      resizeMode="contain"
                    />
                  </View>
                  <View className="flex-1">
                    <Text className="text-[15px] font-extrabold text-text">
                      {dest.name}
                    </Text>
                    <Text
                      className="mt-0.5 text-xs text-text-muted"
                      numberOfLines={1}
                    >
                      {dest.tagline}
                    </Text>
                    <Text className="mt-1 text-[11px] font-bold text-secondary">
                      {dest.badgeText}
                    </Text>
                  </View>
                  <View className="h-9 w-9 items-center justify-center rounded-full bg-primary">
                    <Text className="text-[15px] font-extrabold text-text">
                      ↗
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {filteredItems.length === 0 && filteredStores.length === 0 && (
          <View className="mt-12 items-center justify-center px-6">
            <Text className="text-base font-extrabold text-text">
              No results found
            </Text>
            <Text className="mt-1 text-center text-xs text-text-muted">
              Try searching for another item or clearing your filter.
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
