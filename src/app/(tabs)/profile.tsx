import { PICKUP_HUBS, useAppStore } from "@/components/appState";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Modal,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const FAQ_ITEMS = [
  {
    q: "How do daily M-Pesa installments work?",
    a: "After paying your initial deposit, you pay a fixed daily rate via M-Pesa STK push or Paybill. Once your total installment term is completed, full ownership transfers to you.",
  },
  {
    q: "What happens if I miss a daily payment?",
    a: "You get a 48-hour grace period per month. If you need to pause your plan for an emergency, contact support through the app before your due time.",
  },
  {
    q: "Are battery swaps and maintenance included?",
    a: "All GardaState and Spiro eBikes include a 12-month battery and motor warranty, plus access to Nairobi swap stations at discounted rider rates.",
  },
  {
    q: "What do I need to qualify for Huduma Credit · GR8?",
    a: "You need a valid Kenyan National ID, an active M-Pesa number registered in your name, and the initial deposit for your selected device or eBike.",
  },
];

export default function ProfileTabScreen() {
  const router = useRouter();
  const { profile, orders, updateProfile } = useAppStore();

  const [activeModal, setActiveModal] = useState<
    "account" | "faqs" | "history" | null
  >(null);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);

  const [nameInput, setNameInput] = useState(profile.name);
  const [phoneInput, setPhoneInput] = useState(profile.phone);
  const [idInput, setIdInput] = useState(profile.nationalId);
  const [hubInput, setHubInput] = useState(profile.hub);

  const openAccountModal = () => {
    setNameInput(profile.name);
    setPhoneInput(profile.phone);
    setIdInput(profile.nationalId);
    setHubInput(profile.hub);
    setActiveModal("account");
  };

  const saveAccountDetails = () => {
    updateProfile({
      name: nameInput.trim() || profile.name,
      phone: phoneInput.trim() || profile.phone,
      nationalId: idInput.trim() || profile.nationalId,
      hub: hubInput,
    });
    setActiveModal(null);
  };

  const handleLogout = () => {
    Alert.alert(
      "Log Out",
      "Are you sure you want to log out of your account?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Log Out",
          style: "destructive",
          onPress: () => router.replace("/"),
        },
      ],
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top"]}>
      <ScrollView
        className="flex-1 bg-background"
        contentContainerClassName="p-4 pb-10"
        showsVerticalScrollIndicator={false}
      >
        <View className="mb-6 flex-row items-center justify-between rounded-3xl border border-border bg-background p-4">
          <View className="flex-row items-center gap-3.5">
            <View className="h-14 w-14 items-center justify-center rounded-full bg-primary">
              <Text className="text-[22px] font-extrabold text-text uppercase">
                {profile.name.charAt(0)}
              </Text>
            </View>
            <View>
              <Text className="text-lg font-extrabold text-text">
                {profile.name}
              </Text>
            </View>
          </View>
          <View className="rounded-full bg-secondary-soft px-3 py-1">
            <Text className="text-[11px] font-bold text-secondary">
              Verified
            </Text>
          </View>
        </View>

        <Text className="mb-2.5 px-1 text-xs font-extrabold tracking-wider text-text-muted uppercase">
          Orders & Plans
        </Text>
        <View className="mb-5 gap-2">
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={() => setActiveModal("history")}
            className="flex-row items-center justify-between rounded-2xl border border-border bg-background p-4"
          >
            <View className="flex-1 pr-2">
              <View className="flex-row items-center gap-2">
                <Text className="text-[13px] font-bold text-text">
                  Order History
                </Text>
                {orders.length > 0 && (
                  <View className="rounded-full bg-secondary px-2 py-0.5">
                    <Text className="text-[10px] font-extrabold text-white">
                      {orders.length}
                    </Text>
                  </View>
                )}
              </View>
              <Text className="mt-0.5 text-[11px] text-text-muted">
                View past purchases & active daily installment plans
              </Text>
            </View>
            <Text className="text-base font-extrabold text-text-muted">›</Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.85}
            onPress={() =>
              router.push({
                pathname: "/hello/[store]",
                params: { store: "gardastate" },
              })
            }
            className="flex-row items-center justify-between rounded-2xl border border-border bg-background p-4"
          >
            <Text className="text-[13px] font-bold text-text">
              GardaState Store
            </Text>
            <Text className="text-[15px] font-extrabold text-secondary">↗</Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.85}
            onPress={() =>
              router.push({
                pathname: "/hello/[store]",
                params: { store: "gr8" },
              })
            }
            className="flex-row items-center justify-between rounded-2xl border border-border bg-background p-4"
          >
            <Text className="text-[13px] font-bold text-text">
              Huduma Credit · GR8
            </Text>
            <Text className="text-[15px] font-extrabold text-accent">↗</Text>
          </TouchableOpacity>
        </View>

        <Text className="mb-2.5 px-1 text-xs font-extrabold tracking-wider text-text-muted uppercase">
          Account
        </Text>
        <View className="mb-5 gap-2">
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={openAccountModal}
            className="flex-row items-center justify-between rounded-2xl border border-border bg-background p-4"
          >
            <View>
              <Text className="text-[13px] font-bold text-text">
                Account Details
              </Text>
              <Text className="mt-0.5 text-[11px] text-text-muted">
                {profile.phone} · ID {profile.nationalId}
              </Text>
            </View>
            <Text className="text-base font-extrabold text-text-muted">›</Text>
          </TouchableOpacity>
        </View>

        <Text className="mb-2.5 px-1 text-xs font-extrabold tracking-wider text-text-muted uppercase">
          Support & App
        </Text>
        <View className="mb-6 gap-2">
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={() => setActiveModal("faqs")}
            className="flex-row items-center justify-between rounded-2xl border border-border bg-background p-4"
          >
            <View>
              <Text className="text-[13px] font-bold text-text">
                FAQs & Help Center
              </Text>
              <Text className="mt-0.5 text-[11px] text-text-muted">
                How daily deposits, warranty & battery swaps work
              </Text>
            </View>
            <Text className="text-base font-extrabold text-text-muted">›</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          activeOpacity={0.85}
          onPress={handleLogout}
          className="items-center justify-center rounded-2xl border border-red-500/30 bg-red-500/10 p-4"
        >
          <Text className="text-[13px] font-extrabold text-red-600">
            Log Out
          </Text>
        </TouchableOpacity>

        <Modal
          visible={activeModal === "account"}
          transparent
          animationType="slide"
          onRequestClose={() => setActiveModal(null)}
        >
          <View className="flex-1 justify-end bg-black/50">
            <View className="rounded-t-[28px] bg-background p-5">
              <View className="mb-4 h-1.5 w-10 self-center rounded-full bg-border" />
              <Text className="mb-4 text-lg font-extrabold text-text">
                Account Details
              </Text>

              <Text className="mb-1 text-xs font-bold text-text-muted">
                Full Name
              </Text>
              <TextInput
                value={nameInput}
                onChangeText={setNameInput}
                className="mb-3 h-11 rounded-xl border border-border bg-background px-3.5 text-xs font-semibold text-text"
              />

              <Text className="mb-1 text-xs font-bold text-text-muted">
                M-Pesa Phone Number
              </Text>
              <TextInput
                value={phoneInput}
                onChangeText={setPhoneInput}
                keyboardType="phone-pad"
                className="mb-3 h-11 rounded-xl border border-border bg-background px-3.5 text-xs font-semibold text-text"
              />

              <Text className="mb-1 text-xs font-bold text-text-muted">
                National ID Number
              </Text>
              <TextInput
                value={idInput}
                onChangeText={setIdInput}
                keyboardType="number-pad"
                className="mb-3 h-11 rounded-xl border border-border bg-background px-3.5 text-xs font-semibold text-text"
              />

              <Text className="mb-2 text-xs font-bold text-text-muted">
                Default Pickup Hub
              </Text>
              <View className="mb-4 gap-2">
                {PICKUP_HUBS.map((hub) => {
                  const selected = hubInput === hub.name;
                  return (
                    <TouchableOpacity
                      key={hub.id}
                      onPress={() => setHubInput(hub.name)}
                      className={`flex-row items-center justify-between rounded-xl border p-3 ${
                        selected
                          ? "border-secondary bg-secondary-soft"
                          : "border-border bg-background"
                      }`}
                    >
                      <Text className="text-xs font-bold text-text">
                        {hub.name}
                      </Text>
                      <Text className="text-[11px] text-text-muted">
                        {hub.eta}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>

              <View className="flex-row gap-2.5">
                <TouchableOpacity
                  onPress={() => setActiveModal(null)}
                  className="h-11 flex-1 items-center justify-center rounded-xl border border-border"
                >
                  <Text className="text-xs font-bold text-text-muted">
                    Cancel
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={saveAccountDetails}
                  className="h-11 flex-1 items-center justify-center rounded-xl bg-primary"
                >
                  <Text className="text-xs font-extrabold text-text">
                    Save Changes
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        <Modal
          visible={activeModal === "faqs"}
          transparent
          animationType="slide"
          onRequestClose={() => setActiveModal(null)}
        >
          <View className="flex-1 justify-end bg-black/50">
            <View className="max-h-[80%] rounded-t-[28px] bg-background p-5">
              <View className="mb-4 h-1.5 w-10 self-center rounded-full bg-border" />
              <Text className="mb-4 text-lg font-extrabold text-text">
                FAQs & Help Center
              </Text>

              <ScrollView showsVerticalScrollIndicator={false}>
                <View className="gap-2.5 pb-4">
                  {FAQ_ITEMS.map((faq, idx) => {
                    const isOpen = expandedFaq === idx;
                    return (
                      <TouchableOpacity
                        key={faq.q}
                        activeOpacity={0.85}
                        onPress={() => setExpandedFaq(isOpen ? null : idx)}
                        className="rounded-2xl border border-border bg-background p-4"
                      >
                        <View className="flex-row items-center justify-between">
                          <Text className="flex-1 pr-2 text-xs font-extrabold text-text">
                            {faq.q}
                          </Text>
                          <Text className="text-sm font-extrabold text-text-muted">
                            {isOpen ? "−" : "+"}
                          </Text>
                        </View>
                        {isOpen && (
                          <Text className="mt-2 text-xs leading-5 text-text-muted">
                            {faq.a}
                          </Text>
                        )}
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </ScrollView>

              <TouchableOpacity
                onPress={() => setActiveModal(null)}
                className="mt-2 h-11 items-center justify-center rounded-xl bg-primary"
              >
                <Text className="text-xs font-extrabold text-text">Done</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <Modal
          visible={activeModal === "history"}
          transparent
          animationType="slide"
          onRequestClose={() => setActiveModal(null)}
        >
          <View className="flex-1 justify-end bg-black/50">
            <View className="max-h-[80%] rounded-t-[28px] bg-background p-5">
              <View className="mb-4 h-1.5 w-10 self-center rounded-full bg-border" />
              <Text className="mb-4 text-lg font-extrabold text-text">
                Order History
              </Text>

              {orders.length === 0 ? (
                <View className="items-center py-8">
                  <Text className="text-sm font-extrabold text-text">
                    No active plans yet
                  </Text>
                  <Text className="mt-1 text-center text-xs text-text-muted">
                    Add items from the Discover tab and confirm your plan in the
                    Orders tab.
                  </Text>
                </View>
              ) : (
                <ScrollView showsVerticalScrollIndicator={false}>
                  <View className="gap-3 pb-4">
                    {orders.map((order) => (
                      <View
                        key={order.id}
                        className="rounded-2xl border border-border bg-background p-4"
                      >
                        <View className="mb-2 flex-row items-center justify-between">
                          <Text className="text-xs font-extrabold text-text">
                            {order.id} · {order.date}
                          </Text>
                          <View className="rounded-full bg-secondary-soft px-2.5 py-0.5">
                            <Text className="text-[10px] font-extrabold text-secondary">
                              {order.status}
                            </Text>
                          </View>
                        </View>
                        {order.items.map(({ item, quantity }) => (
                          <Text
                            key={item.id}
                            className="text-xs text-text-muted"
                          >
                            {quantity}x {item.title}
                          </Text>
                        ))}
                        <View className="mt-2.5 flex-row justify-between border-t border-border pt-2">
                          <Text className="text-[11px] font-bold text-text">
                            Deposit: KSh {order.totalDeposit.toLocaleString()}
                          </Text>
                          <Text className="text-[11px] font-extrabold text-accent">
                            KSh {order.totalDaily.toLocaleString()}/day
                          </Text>
                        </View>
                      </View>
                    ))}
                  </View>
                </ScrollView>
              )}

              <TouchableOpacity
                onPress={() => setActiveModal(null)}
                className="mt-2 h-11 items-center justify-center rounded-xl bg-primary"
              >
                <Text className="text-xs font-extrabold text-text">Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
}
