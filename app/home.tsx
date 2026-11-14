import React, { useState } from "react";
import { StyleSheet, Text, View, Pressable, ScrollView, Modal, TextInput } from "react-native";
import { Stack, useRouter } from "expo-router";
import { COLORS, SPACING } from "./lib/theme";
import BottomNav from "../components/BottomNav";

export default function HomeScreen() {
  const router = useRouter();
  const [roomName, setRoomName] = useState("Morning BIO 101");
  const [alarmTime, setAlarmTime] = useState("07:00");
  const [secondTime, setSecondTime] = useState("07:30");
  const [membersCount, setMembersCount] = useState("4");

  const [showCreateRoom, setShowCreateRoom] = useState(false);
  const [showEditAlarm, setShowEditAlarm] = useState(false);
  const [showInviteJoin, setShowInviteJoin] = useState<"invite" | "join" | null>(null);
  const [joinCode, setJoinCode] = useState("");

  return (
    <View style={styles.wrapper}>
      <Stack.Screen options={{ headerShown: false }} />

      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.topHeader}>
          <View>
            <Text style={styles.greeting}>สวัสดี, นายศุภณัฐ พรษคา 👋</Text>
            <Text style={styles.subGreeting}>เตรียมตัวตื่นไปเรียนเช้านี้กันเถอะ!</Text>
          </View>
          <Pressable style={styles.qrBtn} onPress={() => setShowInviteJoin("invite")}>
            <Text style={{ fontSize: 18 }}>📲</Text>
          </Pressable>
        </View>

        <View style={styles.todayCard}>
          <View style={styles.cardTopRow}>
            <Text style={styles.sectionBadge}>⏰ การปลุกวันนี้</Text>
            <Pressable onPress={() => setShowEditAlarm(true)}>
              <Text style={styles.editLink}>แก้ไขเวลา ⚙️</Text>
            </Pressable>
          </View>

          <Text style={styles.roomTitle}>{roomName}</Text>
          <Text style={styles.classDate}>Classes • 15 พ.ย. 2569</Text>

          <View style={styles.timeBox}>
            <Text style={styles.timeText}>{alarmTime}</Text>
            <Text style={styles.timeDivider}>:</Text>
            <Text style={styles.timeText}>{secondTime}</Text>
          </View>

          <View style={styles.memberRow}>
            <Text style={styles.avatars}>👩🏻‍🎓 👨🏻‍🎓 👩🏼‍💻 🧑🏻‍🔬</Text>
            <Text style={styles.memberText}>{membersCount} members</Text>
          </View>

          <Pressable style={styles.createRoomBtn} onPress={() => setShowCreateRoom(true)}>
            <Text style={styles.createRoomText}>+ สร้างห้องปลุก</Text>
          </Pressable>
        </View>

        <Text style={styles.menuHeader}>ศูนย์กลางคลาสและการปลุก</Text>
        <View style={styles.quickGrid}>
          <Pressable style={[styles.quickCard, { backgroundColor: COLORS.mintLight }]} onPress={() => router.push("/alarms")}>
            <Text style={styles.quickIcon}>📋</Text>
            <Text style={styles.quickTitle}>All Class Alarms</Text>
            <Text style={styles.quickSub}>ดูคลาสปลุกทั้งหมด</Text>
          </Pressable>

          <Pressable style={[styles.quickCard, { backgroundColor: COLORS.purpleLight }]} onPress={() => setShowEditAlarm(true)}>
            <Text style={styles.quickIcon}>🕰️</Text>
            <Text style={styles.quickTitle}>Add/Edit Alarm</Text>
            <Text style={styles.quickSub}>ตั้งหน้าปัดเวลาปลุก</Text>
          </Pressable>

          <Pressable style={[styles.quickCard, { backgroundColor: COLORS.peachLight }]} onPress={() => setShowInviteJoin("invite")}>
            <Text style={styles.quickIcon}>🔗</Text>
            <Text style={styles.quickTitle}>Invite (QR Code)</Text>
            <Text style={styles.quickSub}>ชวนเพื่อนเข้าห้อง</Text>
          </Pressable>

          <Pressable style={[styles.quickCard, { backgroundColor: COLORS.blueLight }]} onPress={() => setShowInviteJoin("join")}>
            <Text style={styles.quickIcon}>🎟️</Text>
            <Text style={styles.quickTitle}>Join Room</Text>
            <Text style={styles.quickSub}>ใส่รหัสเข้าร่วมกลุ่ม</Text>
          </Pressable>
        </View>
      </ScrollView>

      <Modal visible={showCreateRoom} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Create Room (สร้างห้องปลุก)</Text>
              <Pressable onPress={() => setShowCreateRoom(false)}>
                <Text style={styles.closeBtn}>✕</Text>
              </Pressable>
            </View>

            <Text style={styles.label}>ชื่อคลาส / ชื่อห้อง</Text>
            <TextInput style={styles.input} value={roomName} onChangeText={setRoomName} />

            <Text style={styles.label}>เวลาปลุกหลัก - ปลุกซ้ำ</Text>
            <View style={{ flexDirection: "row", gap: 10 }}>
              <TextInput style={[styles.input, { flex: 1 }]} value={alarmTime} onChangeText={setAlarmTime} />
              <TextInput style={[styles.input, { flex: 1 }]} value={secondTime} onChangeText={setSecondTime} />
            </View>

            <Text style={styles.label}>จำนวนสมาชิกสูงสุด (คน)</Text>
            <TextInput style={styles.input} value={membersCount} onChangeText={setMembersCount} keyboardType="numeric" />

            <Pressable style={styles.saveBtn} onPress={() => setShowCreateRoom(false)}>
              <Text style={styles.saveBtnText}>สร้างห้อง</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <Modal visible={showEditAlarm} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Add / Edit Alarm</Text>
              <Pressable onPress={() => setShowEditAlarm(false)}>
                <Text style={styles.closeBtn}>✕</Text>
              </Pressable>
            </View>

            <View style={styles.timeBox}>
              <Text style={styles.timeText}>{alarmTime}</Text>
              <Text style={styles.timeDivider}>:</Text>
              <Text style={styles.timeText}>{secondTime}</Text>
            </View>

            <View style={styles.analogClock}>
              <Text style={styles.clockNumTop}>12</Text>
              <View style={styles.clockMiddleRow}>
                <Text style={styles.clockNum}>9</Text>
                <View style={styles.clockCenter}>
                  <Text style={{ fontSize: 26 }}>⏰</Text>
                  <Text style={{ fontSize: 11, color: COLORS.primaryDark, fontWeight: "bold" }}>AM</Text>
                </View>
                <Text style={styles.clockNum}>3</Text>
              </View>
              <Text style={styles.clockNumBottom}>6</Text>
            </View>

            <View style={{ flexDirection: "row", gap: 10, marginTop: 12 }}>
              <Pressable
                style={[styles.presetBtn, { backgroundColor: COLORS.purpleLight }]}
                onPress={() => { setAlarmTime("07:00"); setSecondTime("07:30"); }}
              >
                <Text style={styles.presetText}>07:00 / 07:30</Text>
              </Pressable>
              <Pressable
                style={[styles.presetBtn, { backgroundColor: COLORS.mintLight }]}
                onPress={() => { setAlarmTime("08:00"); setSecondTime("08:15"); }}
              >
                <Text style={styles.presetText}>08:00 / 08:15</Text>
              </Pressable>
            </View>

            <Pressable style={styles.saveBtn} onPress={() => setShowEditAlarm(false)}>
              <Text style={styles.saveBtnText}>บันทึกเวลาปลุก</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <Modal visible={showInviteJoin !== null} animationType="fade" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                {showInviteJoin === "invite" ? "Invite Friends (QR)" : "Join Room"}
              </Text>
              <Pressable onPress={() => setShowInviteJoin(null)}>
                <Text style={styles.closeBtn}>✕</Text>
              </Pressable>
            </View>

            {showInviteJoin === "invite" ? (
              <View style={{ alignItems: "center", paddingVertical: 16 }}>
                <View style={styles.qrMock}>
                  <Text style={{ fontSize: 64 }}>📱</Text>
                  <Text style={{ fontWeight: "bold", color: COLORS.text, marginTop: 6 }}>QR: Wake-BIO</Text>
                </View>
                <View style={styles.codeBadge}>
                  <Text style={styles.codeBadgeText}>รหัสห้อง: Wake-BIO</Text>
                </View>
              </View>
            ) : (
              <View style={{ paddingVertical: 12 }}>
                <Text style={styles.label}>กรอกรหัสห้องจากเพื่อน (เช่น Wake-BIO)</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Wake-BIO"
                  value={joinCode}
                  onChangeText={setJoinCode}
                />
                <Pressable
                  style={[styles.saveBtn, { backgroundColor: COLORS.peach }]}
                  onPress={() => {
                    alert(`เข้าร่วมห้อง ${joinCode || "Wake-BIO"} สำเร็จ!`);
                    setShowInviteJoin(null);
                  }}
                >
                  <Text style={styles.saveBtnText}>เข้าร่วมห้องปลุก</Text>
                </Pressable>
              </View>
            )}
          </View>
        </View>
      </Modal>

      <BottomNav active="home" />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { flex: 1, backgroundColor: COLORS.bg },
  container: { padding: SPACING.lg, paddingTop: 50, paddingBottom: 30 },
  topHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 18,
  },
  greeting: { fontSize: 20, fontWeight: "bold", color: COLORS.text },
  subGreeting: { fontSize: 13, color: COLORS.muted, marginTop: 2 },
  qrBtn: {
    backgroundColor: COLORS.white,
    padding: 10,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#E5DEC9",
  },
  todayCard: {
    backgroundColor: COLORS.white,
    borderRadius: 24,
    padding: SPACING.lg,
    borderWidth: 1.5,
    borderColor: "#E6DFD3",
    marginBottom: 22,
  },
  cardTopRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 8 },
  sectionBadge: { fontSize: 13, fontWeight: "bold", color: COLORS.primaryDark },
  editLink: { fontSize: 13, color: COLORS.primary, fontWeight: "600" },
  roomTitle: { fontSize: 22, fontWeight: "bold", color: COLORS.text },
  classDate: { fontSize: 12, color: COLORS.muted, marginBottom: 12 },
  timeBox: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.bg,
    paddingVertical: 14,
    borderRadius: 18,
    marginBottom: 12,
  },
  timeText: { fontSize: 32, fontWeight: "bold", color: COLORS.primaryDark },
  timeDivider: { fontSize: 28, fontWeight: "bold", color: COLORS.muted, marginHorizontal: 14 },
  memberRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 14 },
  avatars: { fontSize: 18 },
  memberText: { fontSize: 13, color: COLORS.muted, fontWeight: "600" },
  createRoomBtn: {
    backgroundColor: COLORS.mint,
    paddingVertical: 13,
    borderRadius: 20,
    alignItems: "center",
  },
  createRoomText: { color: COLORS.white, fontSize: 15, fontWeight: "bold" },
  menuHeader: { fontSize: 16, fontWeight: "bold", color: COLORS.text, marginBottom: 12 },
  quickGrid: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between", gap: 12 },
  quickCard: {
    width: "48%",
    padding: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#E5DEC9",
  },
  quickIcon: { fontSize: 24, marginBottom: 6 },
  quickTitle: { fontSize: 14, fontWeight: "bold", color: COLORS.text },
  quickSub: { fontSize: 12, color: COLORS.muted, marginTop: 2 },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    padding: 20,
  },
  modalBox: {
    backgroundColor: COLORS.white,
    borderRadius: 24,
    padding: 20,
  },
  modalHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 16 },
  modalTitle: { fontSize: 18, fontWeight: "bold", color: COLORS.primaryDark },
  closeBtn: { fontSize: 18, color: COLORS.muted, padding: 4 },
  label: { fontSize: 13, fontWeight: "600", color: COLORS.text, marginBottom: 6 },
  input: {
    backgroundColor: COLORS.bg,
    borderRadius: 12,
    padding: 12,
    fontSize: 15,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E2DDF0",
  },
  saveBtn: {
    backgroundColor: COLORS.primary,
    paddingVertical: 14,
    borderRadius: 22,
    alignItems: "center",
    marginTop: 8,
  },
  saveBtnText: { color: COLORS.white, fontWeight: "bold", fontSize: 15 },
  analogClock: {
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: COLORS.blueLight,
    alignSelf: "center",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
    borderWidth: 3,
    borderColor: COLORS.primary,
  },
  clockNumTop: { fontWeight: "bold", color: COLORS.text },
  clockNumBottom: { fontWeight: "bold", color: COLORS.text },
  clockMiddleRow: { flexDirection: "row", width: "100%", justifyContent: "space-between", alignItems: "center" },
  clockNum: { fontWeight: "bold", color: COLORS.text },
  clockCenter: { alignItems: "center" },
  presetBtn: { flex: 1, paddingVertical: 10, borderRadius: 12, alignItems: "center" },
  presetText: { fontSize: 12, fontWeight: "bold", color: COLORS.text },
  qrMock: {
    width: 160,
    height: 160,
    borderRadius: 20,
    backgroundColor: COLORS.bg,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: COLORS.text,
  },
  codeBadge: {
    backgroundColor: COLORS.peach,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 16,
    marginTop: 14,
  },
  codeBadgeText: { color: COLORS.white, fontWeight: "bold", fontSize: 15 },
});