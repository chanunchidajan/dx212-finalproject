import React, { useState } from "react";
import { StyleSheet, Text, View, Pressable, ScrollView, Switch } from "react-native";
import { Stack, useRouter } from "expo-router";
import { COLORS, SPACING } from "./lib/theme";
import BottomNav from "../components/BottomNav";

export default function ProfileScreen() {
  const router = useRouter();
  const [soundOn, setSoundOn] = useState(true);
  const [vibrateOn, setVibrateOn] = useState(true);

  const handleLogout = () => {
    router.replace("/login");
  };

  return (
    <View style={styles.wrapper}>
      <Stack.Screen options={{ headerShown: false }} />

      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile & App Settings</Text>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.profileCard}>
          <View style={styles.avatarCircle}>
            <Text style={{ fontSize: 40 }}>👨🏻‍🎓</Text>
          </View>
          <Text style={styles.userName}>นายศุภณัฐ พรษคา</Text>
          <Text style={styles.userId}>รหัสนักศึกษา: 6609610008</Text>

          <View style={styles.roomBadge}>
            <Text style={styles.roomBadgeText}>ห้องที่กำลังเข้าร่วม: Morning BIO 101</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>⚙️ App Settings (ตั้งค่าการปลุก)</Text>
        <View style={styles.settingCard}>
          <View style={styles.settingRow}>
            <Text style={styles.settingLabel}>🔊 เสียงปลุกกลุ่มอัตโนมัติ</Text>
            <Switch value={soundOn} onValueChange={setSoundOn} trackColor={{ true: COLORS.primary }} />
          </View>

          <View style={styles.divider} />

          <View style={styles.settingRow}>
            <Text style={styles.settingLabel}>📳 สั่นแจ้งเตือนเมื่อเพื่อนกระตุ้น</Text>
            <Switch value={vibrateOn} onValueChange={setVibrateOn} trackColor={{ true: COLORS.primary }} />
          </View>
        </View>

        <Pressable style={styles.logoutBtn} onPress={handleLogout}>
          <Text style={styles.logoutText}>🚪 ออกจากระบบ (กลับไปหน้า Login)</Text>
        </Pressable>
      </ScrollView>

      <BottomNav active="profile" />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { flex: 1, backgroundColor: COLORS.bg },
  header: {
    backgroundColor: COLORS.blueLight,
    paddingTop: 50,
    paddingBottom: 16,
    paddingHorizontal: SPACING.lg,
  },
  headerTitle: { fontSize: 20, fontWeight: "bold", color: COLORS.text },
  container: { padding: SPACING.lg },
  profileCard: {
    backgroundColor: COLORS.white,
    borderRadius: 24,
    padding: 20,
    alignItems: "center",
    marginBottom: 20,
    borderWidth: 1.5,
    borderColor: "#E6DFD3",
  },
  avatarCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.blueLight,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  userName: { fontSize: 20, fontWeight: "bold", color: COLORS.text },
  userId: { fontSize: 13, color: COLORS.muted, marginTop: 2 },
  roomBadge: {
    backgroundColor: COLORS.mintLight,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 14,
    marginTop: 12,
  },
  roomBadgeText: { fontSize: 12, fontWeight: "bold", color: COLORS.text },
  sectionTitle: { fontSize: 15, fontWeight: "bold", color: COLORS.text, marginBottom: 10 },
  settingCard: {
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "#E6DFD3",
  },
  settingRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingVertical: 6 },
  settingLabel: { fontSize: 14, color: COLORS.text, fontWeight: "500" },
  divider: { height: 1, backgroundColor: "#F0EAE1", marginVertical: 8 },
  logoutBtn: {
    backgroundColor: COLORS.white,
    borderWidth: 1.5,
    borderColor: COLORS.danger,
    paddingVertical: 14,
    borderRadius: 22,
    alignItems: "center",
  },
  logoutText: { color: COLORS.danger, fontWeight: "bold", fontSize: 15 },
});