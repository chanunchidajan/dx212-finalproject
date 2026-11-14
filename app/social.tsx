import React, { useState } from "react";
import { StyleSheet, Text, View, Pressable, ScrollView, TextInput } from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";
import { COLORS, SPACING } from "./lib/theme";
import BottomNav from "../components/BottomNav";

export default function SocialScreen() {
  const { tab } = useLocalSearchParams<{ tab?: string }>();
  const [activeView, setActiveView] = useState<"challenge" | "chat">(
    tab === "chat" ? "chat" : "challenge"
  );

  const [message, setMessage] = useState("");
  const [chats, setChats] = useState([
    { sender: "ธัญญ์ธิดา", text: "ตื่นยังทุกคนนน ใกล้ 7 โมงแล้ว!", isMe: false },
    { sender: "ฉัน", text: "ตื่นแล้วๆ กำลังอาบน้ำครับ 🚿", isMe: true },
    { sender: "อชิรญา", text: "ฝากโทรปลุกปุณยวีร์หน่อย ยังไม่กดยืนยันเลย", isMe: false },
  ]);

  const sendMessage = () => {
    if (!message.trim()) return;
    setChats([...chats, { sender: "ฉัน", text: message, isMe: true }]);
    setMessage("");
  };

  const progressBars = [
    { label: "วันที่ 1 - จันทร์", score: "7/7", color: COLORS.mint },
    { label: "วันที่ 2 - อังคาร", score: "6/7", color: COLORS.blue },
    { label: "วันที่ 3 - พุธ", score: "7/7", color: COLORS.primary },
    { label: "วันที่ 4 - พฤหัสบดี", score: "5/7", color: COLORS.peach },
  ];

  return (
    <View style={styles.wrapper}>
      <Stack.Screen options={{ headerShown: false }} />

      <View style={styles.header}>
        <Text style={styles.headerTitle}>
          {activeView === "challenge" ? "🏆 Wake-up Challenge" : "💬 Help-Wake Chat"}
        </Text>
        <View style={styles.switchRow}>
          <Pressable
            style={[styles.switchBtn, activeView === "challenge" && styles.switchActive]}
            onPress={() => setActiveView("challenge")}
          >
            <Text style={[styles.switchText, activeView === "challenge" && { color: COLORS.white }]}>
              ภารกิจ 7 วัน
            </Text>
          </Pressable>
          <Pressable
            style={[styles.switchBtn, activeView === "chat" && styles.switchActive]}
            onPress={() => setActiveView("chat")}
          >
            <Text style={[styles.switchText, activeView === "chat" && { color: COLORS.white }]}>
              แชทปลุกเพื่อน
            </Text>
          </Pressable>
        </View>
      </View>

      {activeView === "challenge" ? (
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.challengeBanner}>
            <Text style={{ fontSize: 40 }}>🏅</Text>
            <Text style={styles.bannerTitle}>ตื่นพร้อมกันทั้งห้องครบ 7 วัน</Text>
            <Text style={styles.bannerSub}>รับเหรียญรางวัลและคะแนนพิเศษประจำกลุ่ม!</Text>
          </View>

          {progressBars.map((bar, idx) => (
            <View key={idx} style={styles.barCard}>
              <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 6 }}>
                <Text style={styles.barLabel}>{bar.label}</Text>
                <Text style={styles.barScore}>{bar.score}</Text>
              </View>
              <View style={styles.track}>
                <View style={[styles.fill, { backgroundColor: bar.color, width: "85%" }]} />
              </View>
            </View>
          ))}
        </ScrollView>
      ) : (
        <View style={{ flex: 1 }}>
          <ScrollView contentContainerStyle={styles.container}>
            {chats.map((c, i) => (
              <View
                key={i}
                style={[
                  styles.chatBubble,
                  c.isMe ? styles.myBubble : styles.friendBubble,
                ]}
              >
                <Text style={styles.senderName}>{c.sender}</Text>
                <Text style={styles.chatText}>{c.text}</Text>
              </View>
            ))}
          </ScrollView>

          <View style={styles.inputRow}>
            <TextInput
              style={styles.chatInput}
              placeholder="พิมพ์ข้อความปลุกเพื่อน..."
              value={message}
              onChangeText={setMessage}
            />
            <Pressable style={styles.sendBtn} onPress={sendMessage}>
              <Text style={{ color: COLORS.white, fontWeight: "bold" }}>ส่ง</Text>
            </Pressable>
          </View>
        </View>
      )}

      <BottomNav active={activeView === "chat" ? "chat" : "social"} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { flex: 1, backgroundColor: COLORS.bg },
  header: {
    backgroundColor: COLORS.purpleLight,
    paddingTop: 50,
    paddingBottom: 14,
    paddingHorizontal: SPACING.lg,
  },
  headerTitle: { fontSize: 20, fontWeight: "bold", color: COLORS.primaryDark, marginBottom: 10 },
  switchRow: { flexDirection: "row", gap: 10 },
  switchBtn: { flex: 1, paddingVertical: 8, borderRadius: 14, backgroundColor: COLORS.white, alignItems: "center" },
  switchActive: { backgroundColor: COLORS.primary },
  switchText: { fontWeight: "bold", fontSize: 13, color: COLORS.text },
  container: { padding: SPACING.lg },
  challengeBanner: {
    backgroundColor: COLORS.white,
    padding: 20,
    borderRadius: 22,
    alignItems: "center",
    marginBottom: 16,
    borderWidth: 1.5,
    borderColor: "#E6DFD3",
  },
  bannerTitle: { fontSize: 18, fontWeight: "bold", color: COLORS.text, marginTop: 8 },
  bannerSub: { fontSize: 13, color: COLORS.muted, marginTop: 4 },
  barCard: {
    backgroundColor: COLORS.white,
    padding: 14,
    borderRadius: 16,
    marginBottom: 10,
  },
  barLabel: { fontSize: 14, fontWeight: "600", color: COLORS.text },
  barScore: { fontSize: 14, fontWeight: "bold", color: COLORS.primaryDark },
  track: { height: 10, backgroundColor: COLORS.bg, borderRadius: 5, overflow: "hidden" },
  fill: { height: "100%", borderRadius: 5 },
  chatBubble: {
    padding: 12,
    borderRadius: 18,
    marginBottom: 10,
    maxWidth: "80%",
  },
  myBubble: { backgroundColor: COLORS.peachLight, alignSelf: "flex-end" },
  friendBubble: { backgroundColor: COLORS.white, alignSelf: "flex-start" },
  senderName: { fontSize: 11, fontWeight: "bold", color: COLORS.muted, marginBottom: 2 },
  chatText: { fontSize: 14, color: COLORS.text },
  inputRow: {
    flexDirection: "row",
    padding: 12,
    backgroundColor: COLORS.white,
    gap: 8,
    borderTopWidth: 1,
    borderTopColor: "#E6DFD3",
  },
  chatInput: { flex: 1, backgroundColor: COLORS.bg, borderRadius: 20, paddingHorizontal: 14, paddingVertical: 10 },
  sendBtn: { backgroundColor: COLORS.primary, paddingHorizontal: 18, justifyContent: "center", borderRadius: 20 },
});