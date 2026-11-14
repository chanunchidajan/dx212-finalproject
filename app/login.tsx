import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, Pressable } from "react-native";
import { Link, useRouter, Stack } from "expo-router";
import { COLORS, SPACING } from "./lib/theme";

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("suphanat@tu.ac.th");
  const [password, setPassword] = useState("123456");

  const handleLogin = () => {
    if (!email || !password) {
      alert("กรุณากรอกอีเมลและรหัสผ่าน");
      return;
    }
    router.replace("/home");
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "เข้าสู่ระบบ", headerStyle: { backgroundColor: COLORS.bg } }} />

      <View style={styles.header}>
        <Text style={styles.title}>เข้าสู่ระบบ</Text>
        <Text style={styles.subtitle}>ยินดีต้อนรับกลับมาสู่ จะตื่นป่ะ(ท์)!</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>อีเมลนักศึกษา / ผู้ใช้งาน</Text>
        <TextInput
          style={styles.input}
          placeholder="example@email.com"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
        />

        <Text style={styles.label}>รหัสผ่าน</Text>
        <TextInput
          style={styles.input}
          placeholder="••••••••"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <Pressable style={styles.primaryBtn} onPress={handleLogin}>
          <Text style={styles.primaryBtnText}>เข้าสู่ระบบ</Text>
        </Pressable>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>ยังไม่มีบัญชี? </Text>
        <Link href="/register" asChild>
          <Pressable>
            <Text style={styles.linkText}>สมัครสมาชิก</Text>
          </Pressable>
        </Link>
      </View>

      <Link href="/" asChild>
        <Pressable style={{ marginTop: 16, alignSelf: "center" }}>
          <Text style={{ color: COLORS.muted, fontSize: 13 }}>← กลับหน้าเริ่มต้น</Text>
        </Pressable>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg, paddingHorizontal: SPACING.lg, justifyContent: "center" },
  header: { marginBottom: SPACING.lg, alignItems: "center" },
  title: { fontSize: 28, fontWeight: "bold", color: COLORS.primaryDark, marginBottom: 6 },
  subtitle: { fontSize: 15, color: COLORS.muted },
  card: {
    backgroundColor: COLORS.white,
    padding: SPACING.lg,
    borderRadius: 24,
    borderWidth: 1.5,
    borderColor: "#E6DFD3",
  },
  label: { fontSize: 14, fontWeight: "600", color: COLORS.text, marginBottom: 6 },
  input: {
    backgroundColor: COLORS.bg,
    borderRadius: 14,
    paddingHorizontal: SPACING.md,
    paddingVertical: 12,
    fontSize: 15,
    color: COLORS.text,
    marginBottom: SPACING.md,
    borderWidth: 1,
    borderColor: "#E2DDF0",
  },
  primaryBtn: {
    backgroundColor: COLORS.primary,
    paddingVertical: 14,
    borderRadius: 25,
    alignItems: "center",
    marginTop: 8,
  },
  primaryBtnText: { color: COLORS.white, fontSize: 16, fontWeight: "bold" },
  footer: { flexDirection: "row", justifyContent: "center", marginTop: SPACING.lg },
  footerText: { color: COLORS.muted, fontSize: 14 },
  linkText: { color: COLORS.primaryDark, fontSize: 14, fontWeight: "bold" },
});