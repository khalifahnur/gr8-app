import { HUB_DESTINATIONS, PICKUP_HUBS } from "@/components/appState";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HelloStoreScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{
    store?: string;
    hubName?: string;
  }>();

  const destinationId: "gardastate" | "gr8" =
    params.store === "gr8" ? "gr8" : "gardastate";
  const activeHubName = params.hubName || PICKUP_HUBS[0].name;

  const destination = HUB_DESTINATIONS[destinationId];
  const isGarda = destinationId === "gardastate";
  const siblingId = isGarda ? "gr8" : "gardastate";
  const siblingName = isGarda ? "Huduma · GR8" : "GardaState";

  const logoSource = isGarda
    ? require("@/assets/gardastate.png")
    : require("@/assets/huduma-credit.png");

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Top Golden Header */}
        <View style={styles.headerStage}>
          <View style={styles.topNavRow}>
            <TouchableOpacity
              onPress={() => router.replace("/(tabs)")}
              activeOpacity={0.85}
              style={styles.navPill}
            >
              <Text style={styles.navPillText}>← Back to Home</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                router.replace({
                  pathname: "/hello/[store]",
                  params: { store: siblingId, hubName: activeHubName },
                })
              }
              activeOpacity={0.85}
              style={styles.navPill}
            >
              <Text style={styles.navPillText}>⇄ Switch to {siblingName}</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.heroRow}>
            <View style={styles.logoCircle}>
              <Image
                source={logoSource}
                style={styles.logoImage}
                resizeMode="contain"
              />
            </View>
            <View style={styles.heroTextCol}>
              <Text style={styles.helloSubtitle}>
                {destination.helloSubtitle}
              </Text>
              <Text style={styles.helloTitle}>{destination.helloTitle}</Text>
            </View>
          </View>
        </View>

        {/* White Body */}
        <View style={styles.body}>
          <View style={styles.messageCard}>
            <Text style={styles.messageText}>{destination.helloMessage}</Text>
            <View style={styles.messageFooter}>
              <TouchableOpacity
                onPress={() => Linking.openURL(destination.externalUrl)}
              >
                <Text style={styles.linkText}>
                  {destination.externalUrl.replace("https://", "")} ↗
                </Text>
              </TouchableOpacity>
              <Text style={styles.hubBadgeText}>📍 {activeHubName}</Text>
            </View>
          </View>

          <View style={styles.metricsRow}>
            {destination.metrics.map((m) => (
              <View key={m.label} style={styles.metricCard}>
                <Text style={styles.metricLabel}>{m.label}</Text>
                <Text style={styles.metricValue}>{m.value}</Text>
                <Text style={styles.metricSubtext}>{m.subtext}</Text>
              </View>
            ))}
          </View>

          <View style={styles.highlightsList}>
            {destination.highlights.map((item) => (
              <View key={item} style={styles.highlightRow}>
                <Text style={styles.checkMark}>✓</Text>
                <Text style={styles.highlightText}>{item}</Text>
              </View>
            ))}
          </View>

          <TouchableOpacity
            onPress={() => router.replace("/(tabs)")}
            activeOpacity={0.9}
            style={styles.returnButton}
          >
            <Text style={styles.returnButtonText}>← Back to Home Hub</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F7BE38",
  },
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  scrollContent: {
    flexGrow: 1,
  },
  headerStage: {
    backgroundColor: "#F7BE38",
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 24,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },
  topNavRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 14,
  },
  navPill: {
    backgroundColor: "#FCE097",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
  },
  navPillText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#141414",
  },
  heroRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  logoCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: "#FFFFFF",
    borderWidth: 2,
    borderColor: "#E2A41B",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  logoImage: {
    width: "100%",
    height: "100%",
  },
  heroTextCol: {
    flex: 1,
  },
  helloSubtitle: {
    fontSize: 11,
    fontWeight: "700",
    color: "rgba(20,20,20,0.7)",
  },
  helloTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#141414",
    marginTop: 2,
  },
  body: {
    flex: 1,
    padding: 16,
    justifyContent: "space-between",
  },
  messageCard: {
    backgroundColor: "#F3F4F6",
    borderRadius: 20,
    padding: 14,
  },
  messageText: {
    fontSize: 12,
    lineHeight: 18,
    color: "#1F2937",
    fontWeight: "500",
  },
  messageFooter: {
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  linkText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#00A64C",
  },
  hubBadgeText: {
    fontSize: 11,
    color: "#6B7280",
  },
  metricsRow: {
    flexDirection: "row",
    gap: 10,
    marginTop: 12,
  },
  metricCard: {
    flex: 1,
    backgroundColor: "#F3F4F6",
    borderRadius: 20,
    padding: 12,
  },
  metricLabel: {
    fontSize: 11,
    fontWeight: "600",
    color: "#6B7280",
  },
  metricValue: {
    fontSize: 16,
    fontWeight: "800",
    color: "#141414",
    marginTop: 4,
  },
  metricSubtext: {
    fontSize: 10,
    color: "#6B7280",
    marginTop: 2,
  },
  highlightsList: {
    marginTop: 14,
    gap: 8,
  },
  highlightRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  checkMark: {
    fontSize: 14,
    fontWeight: "800",
    color: "#00A64C",
  },
  highlightText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#1F2937",
    flex: 1,
  },
  returnButton: {
    marginTop: 20,
    height: 46,
    borderRadius: 16,
    backgroundColor: "#F7BE38",
    alignItems: "center",
    justifyContent: "center",
  },
  returnButtonText: {
    fontSize: 13,
    fontWeight: "800",
    color: "#141414",
  },
});
