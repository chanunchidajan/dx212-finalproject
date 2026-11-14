import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { COLORS } from "../app/lib/theme";

type TabName = "home" | "alarms" | "social" | "chat" | "profile";

export default function BottomNav({ active }: { active: TabName }) {
  const router = useRouter();

  const menus: { key: TabName; icon: string; label: string; route: string }[] = [
    { key: "home", icon: "🏠", label: "หน้าหลัก", route: "/home" },
    { key: "alarms", icon: "⏰", label: "คลาสปลุก", route: "/alarms" },
    { key: "social", icon: "🏆", label: "ชาเลนจ์", route: "/social?tab=challenge" },
    { key: "chat", icon: "💬", label: "แชทปลุก", route: "/social?tab=chat" },
    { key: "profile", icon: "👤", label: "โปรไฟล์", route: "/profile" },
  ];

  return (
    <View style={styles.navBar}>
      {menus.map((item) => {
        const isActive = active === item.key;
        return (
          <Pressable
            key={item.key}
            style={[styles.navItem, isActive && styles.navItemActive]}
            onPress={() => router.replace(item.route as any)}
          >
            <Text style={styles.icon}>{item.icon}</Text>
            <Text style={[styles.label, isActive && styles.labelActive]}>
              {item.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  navBar: {
    flexDirection: "row",
    backgroundColor: COLORS.white,
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderTopWidth: 1,
    borderTopColor: "#EDE6D6",
    justifyContent: "space-around",
  },
  navItem: {
    alignItems: "center",
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 14,
  },
  navItemActive: {
    backgroundColor: COLORS.purpleLight,
  },
  icon: { fontSize: 18, marginBottom: 2 },
  label: { fontSize: 11, color: COLORS.muted, fontWeight: "600" },
  labelActive: { color: COLORS.primaryDark, fontWeight: "bold" },
});