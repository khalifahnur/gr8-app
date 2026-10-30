import { useAppStore } from "@/components/appState";
import { useRouter } from "expo-router";
import {
  Alert,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Svg, { Path, Rect } from "react-native-svg";

export default function OrdersTabScreen() {
  const router = useRouter();
  const { cart, updateQuantity, clearCart, checkoutCart } = useAppStore();

  const totalDeposit = cart.reduce(
    (sum, c) => sum + c.item.depositAmount * c.quantity,
    0,
  );
  const totalDaily = cart.reduce(
    (sum, c) => sum + c.item.dailyRate * c.quantity,
    0,
  );

  const handleCheckout = () => {
    checkoutCart();
    Alert.alert(
      "Daily Plan Activated",
      "Your order has been placed! You can track it in Profile -> Order History.",
      [
        { text: "Stay Here", style: "cancel" },
        { text: "View History", onPress: () => router.push("/profile") },
      ],
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top"]}>
      <ScrollView
        className="flex-1 bg-background"
        contentContainerClassName="flex-grow p-4 pb-8"
        showsVerticalScrollIndicator={false}
      >
        <View className="mb-1 flex-row items-center justify-between">
          <Text className="text-[22px] font-extrabold text-text">
            Orders & Cart
          </Text>
          {cart.length > 0 && (
            <TouchableOpacity onPress={clearCart}>
              <Text className="text-xs font-bold text-red-500">Clear Cart</Text>
            </TouchableOpacity>
          )}
        </View>
        <Text className="mb-6 text-xs text-text-muted">
          Manage your GardaState eBike installments or Huduma Credit pre-orders
        </Text>

        {cart.length === 0 ? (
          <View className="my-auto items-center justify-center rounded-3xl border border-border bg-background px-6 py-10">
            <View className="mb-4 h-20 w-20 items-center justify-center rounded-full bg-primary-soft">
              <Svg width={36} height={36} viewBox="0 0 24 24" fill="none">
                <Rect
                  x={4}
                  y={8}
                  width={16}
                  height={12}
                  rx={2.5}
                  stroke="#141414"
                  strokeWidth={1.8}
                />
                <Path
                  d="M8 8V6.5C8 4.567 9.567 3 11.5 3H12.5C14.433 3 16 4.567 16 6.5V8"
                  stroke="#141414"
                  strokeWidth={1.8}
                />
                <Path
                  d="M9.5 13.5H14.5"
                  stroke="#E2A41B"
                  strokeWidth={1.8}
                  strokeLinecap="round"
                />
              </Svg>
            </View>

            <Text className="text-lg font-extrabold text-text">
              Your cart is empty
            </Text>
            <Text className="mt-1.5 text-center text-xs leading-5 text-text-muted">
              You have no active orders or items in your cart yet. Explore our
              stores to start a flexible daily payment plan.
            </Text>

            <TouchableOpacity
              activeOpacity={0.88}
              onPress={() => router.push("/discover")}
              className="mt-5 rounded-full bg-primary px-6 py-3"
            >
              <Text className="text-xs font-extrabold text-text">
                Browse Items
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View className="gap-3">
            {cart.map(({ item, quantity }) => (
              <View
                key={item.id}
                className="flex-row items-center gap-3 rounded-2xl border border-border bg-background p-3"
              >
                <View className="h-16 w-16 items-center justify-center rounded-xl bg-primary-soft/60 p-2">
                  <Image
                    source={item.image}
                    className="h-full w-full"
                    resizeMode="contain"
                  />
                </View>

                <View className="flex-1">
                  <Text className="text-sm font-extrabold text-text">
                    {item.title}
                  </Text>
                  <Text className="mt-0.5 text-xs font-bold text-accent">
                    KSh {(item.dailyRate * quantity).toLocaleString()}/day
                  </Text>
                  <Text className="mt-0.5 text-[11px] text-text-muted">
                    Deposit: KSh{" "}
                    {(item.depositAmount * quantity).toLocaleString()}
                  </Text>
                </View>

                <View className="flex-row items-center gap-2 rounded-xl border border-border bg-background px-2 py-1">
                  <TouchableOpacity
                    onPress={() => updateQuantity(item.id, -1)}
                    className="h-7 w-7 items-center justify-center rounded-lg bg-border"
                  >
                    <Text className="text-sm font-extrabold text-text">−</Text>
                  </TouchableOpacity>
                  <Text className="min-w-[16px] text-center text-xs font-extrabold text-text">
                    {quantity}
                  </Text>
                  <TouchableOpacity
                    onPress={() => updateQuantity(item.id, 1)}
                    className="h-7 w-7 items-center justify-center rounded-lg bg-primary"
                  >
                    <Text className="text-sm font-extrabold text-text">+</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}

            <View className="mt-2 rounded-2xl border border-border bg-background p-4">
              <Text className="mb-3 text-sm font-extrabold text-text">
                Installment Summary
              </Text>
              <View className="mb-2 flex-row justify-between">
                <Text className="text-xs text-text-muted">
                  Initial Deposit Due Today
                </Text>
                <Text className="text-xs font-extrabold text-text">
                  KSh {totalDeposit.toLocaleString()}
                </Text>
              </View>
              <View className="mb-4 flex-row justify-between">
                <Text className="text-xs text-text-muted">
                  Daily Installment Rate
                </Text>
                <Text className="text-xs font-extrabold text-secondary">
                  KSh {totalDaily.toLocaleString()}/day
                </Text>
              </View>

              <TouchableOpacity
                activeOpacity={0.88}
                onPress={handleCheckout}
                className="h-12 items-center justify-center rounded-xl bg-secondary"
              >
                <Text className="text-xs font-extrabold text-white">
                  Confirm & Start Daily Plan (KSh{" "}
                  {totalDeposit.toLocaleString()})
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        <View className="mt-6 rounded-[22px] border border-primary/50 bg-primary-soft p-4">
          <View className="mb-3.5 flex-row items-center gap-3">
            <Image
              source={require("@/assets/gr8.png")}
              className="h-11 w-11"
              resizeMode="contain"
            />
            <View className="flex-1">
              <Text className="text-[15px] font-extrabold text-text">
                Start Your First Daily Plan
              </Text>
              <Text className="mt-0.5 text-xs text-text-muted">
                Choose GardaState Store or Huduma Credit · GR8
              </Text>
            </View>
          </View>

          <View className="flex-row gap-2.5">
            <TouchableOpacity
              activeOpacity={0.88}
              onPress={() =>
                router.push({
                  pathname: "/hello/[store]",
                  params: { store: "gardastate" },
                })
              }
              className="h-11 flex-1 items-center justify-center rounded-[14px] bg-secondary"
            >
              <Text className="text-xs font-bold text-white">
                Open GardaState
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.88}
              onPress={() =>
                router.push({
                  pathname: "/hello/[store]",
                  params: { store: "gr8" },
                })
              }
              className="h-11 flex-1 items-center justify-center rounded-[14px] bg-primary"
            >
              <Text className="text-xs font-bold text-text">
                Open Huduma · GR8
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
