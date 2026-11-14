import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, Pressable, ScrollView } from "react-native";
import { Link, useRouter, Stack } from "expo-router";
import { COLORS, SPACING } from "./lib/theme";

export default function RegisterScreen() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = () => {
    if (!name || !email || !password) {
      alert("กรุณากรอกข้อมูลให้ครบทุกช่อง");
      return;
    }
    router.replace("/home");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Stack.Screen options={{ title: "สมัครสมาชิก", headerStyle: { backgroundColor: COLORS.bg } }} />

      <View style={styles.header}>
        <Text style={styles.title}>สมัครสมาชิก</Text>
        <Text style={styles.subtitle}>สร้างบัญชีใหม่เพื่อเริ่มตื่นไปพร้อมเพื่อน</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>ชื่อ-นามสกุล</Text>
        <TextInput style={styles.input} placeholder="นายศุภณัฐ พรษคา" value={name} onChangeText={setName} />

        <Text style={styles.label}>อีเมล</Text>
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

        <Pressable style={styles.primaryBtn} onPress={handleRegister}>
          <Text style={styles.primaryBtnText}>ยืนยันการสมัคร</Text>
        </Pressable>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>มีบัญชีอยู่แล้ว? </Text>
        <Link href="/login" asChild>
          <Pressable>
            <Text style={styles.linkText}>เข้าสู่ระบบ</Text>
          </Pressable>
        </Link>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, backgroundColor: COLORS.bg, paddingHorizontal: SPACING.lg, justifyContent: "center" },
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
    backgroundColor: COLORS.mint,
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