import { PICKUP_HUBS, PickupHub } from "@/components/appState";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Image,
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Svg, { Path } from "react-native-svg";

export default function HomeScreen() {
  const router = useRouter();
  const [selectedHub, setSelectedHub] = useState<PickupHub>(PICKUP_HUBS[0]);
  const [isLocationModalVisible, setIsLocationModalVisible] = useState(false);

  const openDestination = (store: "gardastate" | "gr8") => {
    router.push({
      pathname: "/hello/[store]",
      params: { store, hubName: selectedHub.name },
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-primary" edges={["top"]}>
      <ScrollView
        className="flex-1 bg-background"
        contentContainerClassName="flex-grow"
        showsVerticalScrollIndicator={false}
      >
        <View className="relative bg-primary px-4 pt-4 pb-[60px]">
          <View className="flex-row items-center justify-center gap-6 py-[18px]">
            <TouchableOpacity
              onPress={() => openDestination("gardastate")}
              activeOpacity={0.9}
              className="items-center"
            >
              <View className="h-[144px] w-[148px] items-center justify-center rounded-[74px] bg-primary-soft/75">
                <View className="h-[134px] w-[138px] items-center justify-center rounded-[69px] bg-primary-deep">
                  <View className="h-[126px] w-[130px] items-center justify-center rounded-[65px] bg-text px-3 pb-1.5">
                    <Image
                      source={require("@/assets/gardastate.png")}
                      className="h-12 w-[98px]"
                      resizeMode="contain"
                    />
                    <Text className="mt-1 text-[10px] font-semibold text-text-muted">
                      Used & New eBikes
                    </Text>
                  </View>
                </View>
              </View>
              <View className="-mt-3.5 rounded-full border-2 border-primary-deep bg-background px-4 py-1">
                <Text className="text-[13px] font-semibold text-text">
                  GardaState
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => openDestination("gr8")}
              activeOpacity={0.9}
              className="items-center"
            >
              <View className="h-[144px] w-[148px] items-center justify-center rounded-[74px] bg-primary-soft/75">
                <View className="h-[134px] w-[138px] items-center justify-center rounded-[69px] bg-primary-deep">
                  <View className="h-[126px] w-[130px] items-center justify-center rounded-[65px] bg-text px-3 pb-1.5">
                    <Image
                      source={require("@/assets/huduma-credit.png")}
                      className="h-[52px] w-[68px]"
                      resizeMode="contain"
                    />
                    <Text className="mt-1 text-[10px] font-semibold text-text-muted">
                      Pre-Order Credit
                    </Text>
                  </View>
                </View>
              </View>
              <View className="-mt-3.5 rounded-full border-2 border-primary-deep bg-background px-4 py-1">
                <Text className="text-[13px] font-semibold text-text">
                  Huduma · GR8
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          <View className="absolute right-0 bottom-0 left-0 h-11">
            <Svg
              width="100%"
              height={44}
              viewBox="0 0 390 46"
              preserveAspectRatio="none"
            >
              <Path d="M0 24 Q195 -6 390 24 L390 46 L0 46 Z" fill="#15e66b" />
              <Path d="M0 31 Q195 4 390 31 L390 46 L0 46 Z" fill="#cffce2" />
              <Path d="M0 38 Q195 12 390 38 L390 46 L0 46 Z" fill="#f9fafb" />
            </Svg>
          </View>
        </View>

        <View className="flex-1 bg-text px-4 pt-3 pb-4">
          <View className="mb-3.5 flex-row items-center justify-between">
            <Text className="text-xl font-extrabold text-background">
              khalifa, these are for you
            </Text>
            <View className="h-[22px] w-[22px] items-center justify-center rounded-full border-[1.8px] border-background">
              <Text className="text-xs font-extrabold text-background">i</Text>
            </View>
          </View>

          <View className="flex-row justify-between gap-2.5">
            <TouchableOpacity
              onPress={() => openDestination("gardastate")}
              activeOpacity={0.85}
              className="flex-1 items-center"
            >
              <View className="aspect-square w-full items-center justify-center rounded-[20px] bg-border p-2">
                <Image
                  source={require("@/assets/gardastate.png")}
                  className="h-9 w-14"
                  resizeMode="contain"
                />
              </View>
              <Text className="mt-1.5 text-xs text-background">
                Garda Bikes
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => openDestination("gr8")}
              activeOpacity={0.85}
              className="flex-1 items-center"
            >
              <View className="aspect-square w-full items-center justify-center rounded-[20px] bg-border p-2">
                <Image
                  source={require("@/assets/huduma-credit.png")}
                  className="h-11 w-11"
                  resizeMode="contain"
                />
              </View>
              <Text className="mt-1.5 text-xs text-background">
                Spiro eBike
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => openDestination("gr8")}
              activeOpacity={0.85}
              className="flex-1 items-center"
            >
              <View className="aspect-square w-full items-center justify-center rounded-[20px] bg-border p-2">
                <Image
                  source={require("@/assets/gr8.png")}
                  className="h-11 w-11"
                  resizeMode="contain"
                />
              </View>
              <Text className="mt-1.5 text-xs text-background">Phones</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => openDestination("gardastate")}
              activeOpacity={0.85}
              className="flex-1 items-center"
            >
              <View className="aspect-square w-full items-center justify-center rounded-[20px] bg-border p-2">
                <View className="h-11 w-11 items-center justify-center rounded-[14px] bg-secondary-soft">
                  <Text className="text-[10px] font-extrabold text-secondary">
                    KSh
                  </Text>
                  <Text className="text-xs font-extrabold text-accent">
                    245
                  </Text>
                </View>
              </View>
              <Text className="mt-1.5 text-xs text-background">Pay Daily</Text>
            </TouchableOpacity>
          </View>

          <View className="my-3.5 flex-row items-center justify-center gap-1.5">
            <View className="h-2 w-2 rounded-full bg-text" />
            <View className="h-2 w-2 rounded-full bg-border" />
          </View>

          <TouchableOpacity
            onPress={() => openDestination("gardastate")}
            activeOpacity={0.9}
            className="mt-auto flex-row items-center justify-between rounded-[20px] border border-border bg-background p-4"
          >
            <View className="flex-1 pr-2">
              <View className="self-start rounded-[6px] bg-secondary px-2 py-[3px]">
                <Text className="text-[10px] font-extrabold text-white">
                  ★ DAILY PLAN
                </Text>
              </View>
              <Text className="mt-1.5 text-base font-extrabold text-text">
                Pay in flexible daily plans
              </Text>
              <Text className="mt-0.5 text-xs text-text-muted">
                Deposit from KSh 7,500 · KSh 245/day
              </Text>
            </View>
            <View className="relative h-[72px] w-24 items-center justify-center rounded-l-[40px] bg-secondary-soft">
              <Image
                source={require("@/assets/gr8.png")}
                className="h-12 w-12"
                resizeMode="contain"
              />
              <View className="absolute right-2 bottom-1.5 h-[26px] w-[26px] items-center justify-center rounded-full bg-background">
                <Text className="text-base font-extrabold text-text">›</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>

        <Modal
          visible={isLocationModalVisible}
          transparent
          animationType="slide"
          onRequestClose={() => setIsLocationModalVisible(false)}
        >
          <View className="flex-1 justify-end bg-black/50">
            <View className="rounded-t-[28px] bg-background p-5">
              <View className="mb-4 h-1.5 w-10 self-center rounded-full bg-border" />
              <Text className="mb-3 text-base font-extrabold text-text">
                Choose Nairobi Location
              </Text>
              {PICKUP_HUBS.map((hub) => {
                const isSelected = hub.id === selectedHub.id;
                return (
                  <TouchableOpacity
                    key={hub.id}
                    onPress={() => {
                      setSelectedHub(hub);
                      setIsLocationModalVisible(false);
                    }}
                    className={`mb-2.5 flex-row items-center justify-between rounded-2xl border p-3.5 ${
                      isSelected
                        ? "border-secondary bg-secondary-soft"
                        : "border-border"
                    }`}
                  >
                    <View>
                      <Text className="text-sm font-bold text-text">
                        {hub.name}
                      </Text>
                      <Text className="mt-0.5 text-xs text-text-muted">
                        {hub.address}
                      </Text>
                    </View>
                    <Text className="text-xs font-semibold text-text-muted">
                      {hub.eta}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
}
