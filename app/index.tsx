import React from "react";
import { StyleSheet, Text, View, Pressable, ScrollView } from "react-native";
import { Link, Stack } from "expo-router";

export default function LandingScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.heroBox}>
        <View style={styles.clockBadge}>
          <Text style={{ fontSize: 44 }}>⏰</Text>
        </View>
        <Text style={styles.title}>จะตื่นป่ะ(ท์)</Text>
        <Text style={styles.subtitle}>ปลุกตัวเอง... ไม่ต้องพึ่งเสียงแม่เรียก</Text>
      </View>

      <View style={styles.previewCard}>
        <View style={styles.challengeRow}>
          <View>
            <Text style={styles.cardHeading}>Term 1 Early Wake Challenge</Text>
            <Text style={styles.cardSub}>ภารกิจตื่นเช้าพร้อมเพื่อนร่วมคลาส</Text>
          </View>
          <View style={styles.completedBadge}>
            <Text style={styles.completedText}>Active</Text>
          </View>
        </View>
        <View style={styles.starsRow}>
          <Text style={styles.starText}>⭐ 47   ⭐ 970   🌟 Group Streak</Text>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <Link href="/register" asChild>
          <Pressable style={styles.primaryBtn}>
            <Text style={styles.primaryBtnText}>เริ่มต้นใช้งาน</Text>
          </Pressable>
        </Link>
        <Link href="/login" asChild>
          <Pressable style={styles.secondaryBtn}>
            <Text style={styles.secondaryBtnText}>เข้าสู่ระบบ</Text>
          </Pressable>
        </Link>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, backgroundColor: "#EAF3FA", justifyContent: "space-between", alignItems: "center", paddingVertical: 50, paddingHorizontal: 20 },
  heroBox: { alignItems: "center", marginTop: 20 },
  clockBadge: { width: 96, height: 96, borderRadius: 48, backgroundColor: "#FDF8E8", justifyContent: "center", alignItems: "center", marginBottom: 16, borderWidth: 3, borderColor: "#8E7CC3" },
  title: { fontSize: 34, fontWeight: "bold", color: "#6E5BA6", marginBottom: 6 },
  subtitle: { fontSize: 15, color: "#3D374A", textAlign: "center" },
  previewCard: { width: "100%", backgroundColor: "#FDF8E8", borderRadius: 20, padding: 16, borderWidth: 1.5, borderColor: "#E2DDF0", marginVertical: 20 },
  challengeRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  cardHeading: { fontSize: 14, fontWeight: "bold", color: "#3D374A" },
  cardSub: { fontSize: 12, color: "#8C859B", marginTop: 2 },
  completedBadge: { backgroundColor: "#F6B26B", paddingHorizontal: 12, paddingVertical: 6, borderRadius: 12 },
  completedText: { color: "#FFFFFF", fontWeight: "bold", fontSize: 12 },
  starsRow: { marginTop: 12, paddingTop: 10, borderTopWidth: 1, borderTopColor: "#EAE2D0", alignItems: "center" },
  starText: { fontSize: 13, color: "#6E5BA6", fontWeight: "600" },
  buttonContainer: { width: "100%", gap: 12, alignItems: "center" },
  primaryBtn: { width: "100%", backgroundColor: "#8E7CC3", paddingVertical: 15, borderRadius: 25, alignItems: "center" },
  primaryBtnText: { color: "#FFFFFF", fontSize: 16, fontWeight: "bold" },
  secondaryBtn: { width: "100%", backgroundColor: "#FFFFFF", borderWidth: 1.5, borderColor: "#8E7CC3", paddingVertical: 15, borderRadius: 25, alignItems: "center" },
  secondaryBtnText: { color: "#6E5BA6", fontSize: 16, fontWeight: "bold" },
});