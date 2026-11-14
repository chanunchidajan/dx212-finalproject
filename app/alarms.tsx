import React, { useState } from "react";
import { StyleSheet, Text, View, Pressable, ScrollView } from "react-native";
import { Stack } from "expo-router";
import { COLORS, SPACING } from "./lib/theme";
import BottomNav from "../components/BottomNav";

export default function AlarmsScreen() {
  const [subTab, setSubTab] = useState<"classes" | "members" | "wake">("classes");
  const [nudgeLogs, setNudgeLogs] = useState<string[]>([
    "🔔 ส่งเสียงกระตุ้นปลุกถึง ธัญญ์ธิดา (11:32 AM)",
    "🔔 ส่งเสียงกระตุ้นปลุกถึง ศุภณัฐ (11:25 AM)",
  ]);

  const classes = [
    { day: "Mon-Wed", name: "Mon-Wed Morning BIO", date: "17.06-9.4 2569", time: "07:00", color: COLORS.mintLight },
    { day: "Tue", name: "Tus Cheerlatty", date: "17.06-9.4 2569", time: "07:00", color: COLORS.peachLight },
    { day: "Fri", name: "Group Project Meet", date: "17.06-9.4 2569", time: "07:30", color: COLORS.purpleLight },
  ];

  const members = [
    { name: "ศุภณัฐ พรษคา", status: "Confirmed", badgeColor: COLORS.mint, icon: "👨🏻‍🎓" },
    { name: "ธัญญ์ธิดา", status: "Sleeping zZZ", badgeColor: COLORS.peach, icon: "👩🏻‍🎓" },
    { name: "อชิรญา", status: "Confirmed", badgeColor: COLORS.mint, icon: "👩🏼‍💻" },
    { name: "ปุณยวีร์", status: "Not Confirmed", badgeColor: COLORS.danger, icon: "🧑🏻‍🔬" },
  ];

  const handleNudge = (friendName: string) => {
    const now = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    setNudgeLogs([`⚡ กระตุ้นปลุก ${friendName} สำเร็จ! (${now})`, ...nudgeLogs]);
    alert(`ส่งสัญญาณปลุกดังสนั่นไปหา ${friendName} แล้ว!`);
  };

  return (
    <View style={styles.wrapper}>
      <Stack.Screen options={{ headerShown: false }} />

      <View style={styles.header}>
        <Text style={styles.headerTitle}>ติดตามสถานะกลุ่มและคลาสปลุก</Text>
        <View style={styles.tabRow}>
          <Pressable
            style={[styles.tabBtn, subTab === "classes" && styles.tabBtnActive]}
            onPress={() => setSubTab("classes")}
          >
            <Text style={[styles.tabText, subTab === "classes" && styles.tabTextActive]}>All Alarms</Text>
          </Pressable>
          <Pressable
            style={[styles.tabBtn, subTab === "members" && styles.tabBtnActive]}
            onPress={() => setSubTab("members")}
          >
            <Text style={[styles.tabText, subTab === "members" && styles.tabTextActive]}>สมาชิกกลุ่ม</Text>
          </Pressable>
          <Pressable
            style={[styles.tabBtn, subTab === "wake" && styles.tabBtnActive]}
            onPress={() => setSubTab("wake")}
          >
            <Text style={[styles.tabText, subTab === "wake" && styles.tabTextActive]}>กระตุ้นปลุก</Text>
          </Pressable>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        {subTab === "classes" && (
          <View>
            {classes.map((item, idx) => (
              <View key={idx} style={[styles.classCard, { backgroundColor: item.color }]}>
                <View style={styles.dayBadge}>
                  <Text style={styles.dayText}>{item.day}</Text>
                </View>
                <Text style={styles.className}>{item.name}</Text>
                <Text style={styles.classDate}>{item.date}</Text>
                <View style={styles.classFooter}>
                  <Text style={styles.classTime}>⏰ {item.time}</Text>
                  <Pressable style={styles.detailBtn} onPress={() => setSubTab("members")}>
                    <Text style={styles.detailBtnText}>เช็กชื่อเพื่อน →</Text>
                  </Pressable>
                </View>
              </View>
            ))}
          </View>
        )}

        {subTab === "members" && (
          <View>
            <View style={styles.summaryCard}>
              <Text style={styles.summaryTitle}>BIO 101 • สถานะการตื่น</Text>
              <Text style={styles.summarySub}>ตื่นแล้ว 2/4 คน • กำลังนอน 2 คน</Text>
            </View>

            {members.map((m, idx) => (
              <View key={idx} style={styles.memberCard}>
                <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
                  <Text style={{ fontSize: 24 }}>{m.icon}</Text>
                  <Text style={styles.memberName}>{m.name}</Text>
                </View>
                <View style={[styles.statusBadge, { backgroundColor: m.badgeColor }]}>
                  <Text style={styles.statusText}>{m.status}</Text>
                </View>
              </View>
            ))}
          </View>
        )}

        {subTab === "wake" && (
          <View>
            <View style={styles.actionRow}>
              <Pressable style={[styles.bigActionBtn, { backgroundColor: COLORS.mint }]} onPress={() => handleNudge("ธัญญ์ธิดา")}>
                <Text style={styles.bigActionText}>⚡ กระตุ้นปลุกเพื่อน</Text>
              </Pressable>
              <Pressable style={[styles.bigActionBtn, { backgroundColor: COLORS.peach }]} onPress={() => alert("กำลังโทรปลุกกลุ่ม BIO 101...")}>
                <Text style={styles.bigActionText}>📞 โทรหาเพื่อน</Text>
              </Pressable>
            </View>

            <Text style={styles.logTitle}>ประวัติการส่งเสียงปลุก</Text>
            {nudgeLogs.map((log, i) => (
              <View key={i} style={styles.logCard}>
                <Text style={styles.logText}>{log}</Text>
              </View>
            ))}
          </View>
        )}
      </ScrollView>

      <BottomNav active="alarms" />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { flex: 1, backgroundColor: COLORS.bg },
  header: {
    backgroundColor: COLORS.mintLight,
    paddingTop: 50,
    paddingBottom: 14,
    paddingHorizontal: SPACING.lg,
    borderBottomWidth: 1,
    borderBottomColor: "#DCEAD5",
  },
  headerTitle: { fontSize: 18, fontWeight: "bold", color: COLORS.text, marginBottom: 12 },
  tabRow: { flexDirection: "row", gap: 8 },
  tabBtn: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 14,
    backgroundColor: COLORS.white,
    alignItems: "center",
  },
  tabBtnActive: { backgroundColor: COLORS.primary },
  tabText: { fontSize: 12, fontWeight: "bold", color: COLORS.muted },
  tabTextActive: { color: COLORS.white },
  container: { padding: SPACING.lg },
  classCard: {
    padding: 16,
    borderRadius: 20,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#E0D9CA",
  },
  dayBadge: {
    alignSelf: "flex-start",
    backgroundColor: COLORS.white,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
    marginBottom: 6,
  },
  dayText: { fontSize: 11, fontWeight: "bold", color: COLORS.primaryDark },
  className: { fontSize: 18, fontWeight: "bold", color: COLORS.text },
  classDate: { fontSize: 12, color: COLORS.muted, marginBottom: 10 },
  classFooter: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  classTime: { fontSize: 16, fontWeight: "bold", color: COLORS.primaryDark },
  detailBtn: { backgroundColor: COLORS.white, paddingHorizontal: 12, paddingVertical: 6, borderRadius: 12 },
  detailBtnText: { fontSize: 12, fontWeight: "bold", color: COLORS.text },
  summaryCard: {
    backgroundColor: COLORS.peachLight,
    padding: 16,
    borderRadius: 18,
    marginBottom: 14,
    alignItems: "center",
  },
  summaryTitle: { fontSize: 16, fontWeight: "bold", color: COLORS.text },
  summarySub: { fontSize: 13, color: COLORS.muted, marginTop: 4 },
  memberCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: COLORS.white,
    padding: 14,
    borderRadius: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#E6DFD3",
  },
  memberName: { fontSize: 15, fontWeight: "600", color: COLORS.text },
  statusBadge: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 12 },
  statusText: { color: COLORS.white, fontSize: 12, fontWeight: "bold" },
  actionRow: { flexDirection: "row", gap: 10, marginBottom: 18 },
  bigActionBtn: { flex: 1, paddingVertical: 14, borderRadius: 18, alignItems: "center" },
  bigActionText: { color: COLORS.white, fontWeight: "bold", fontSize: 14 },
  logTitle: { fontSize: 15, fontWeight: "bold", color: COLORS.text, marginBottom: 10 },
  logCard: {
    backgroundColor: COLORS.white,
    padding: 14,
    borderRadius: 14,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#E6DFD3",
  },
  logText: { fontSize: 13, color: COLORS.text },
});