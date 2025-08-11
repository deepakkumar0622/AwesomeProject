import CustomButton from "@/components/CustomButton";
import CustomeInput from "@/components/CustomeInput";
import { SignInParams } from "@/type";
import { Link, router } from "expo-router";
import React, { useState } from "react";
import { Alert, Text, View } from "react-native";

const SignIn = ({ email, password }: SignInParams) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({ email: "", passsword: "" });

  const submit = async () => {
    if (!form.email || !form.passsword)
      return Alert.alert(
        "Error",
        "Please enter valid email address & password"
      );
    setIsSubmitting(true);

    try {
      Alert.alert("Success", "User Signed in successfully");
      router.replace("/");
    } catch (err: any) {
      Alert.alert("Error", err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View className="gap-10 bg-white rounded-lg p-5 mt-5">
      <CustomeInput
        placeholder="Enter Your Email"
        value={form.email}
        onChangeText={(text) => setForm((prev) => ({ ...prev, email: text }))}
        label="Email"
        keyboardType="email-address"
      />
      <CustomeInput
        placeholder="Enter Your Password"
        value={form.passsword}
        onChangeText={(text) =>
          setForm((prev) => ({ ...prev, passsword: text }))
        }
        label="Password"
        secureTextEntry={true}
      />

      <CustomButton title="Sign in" onPress={submit} isLoading={isSubmitting} />
      <View className="flex justify-center mt-5 flex-row gap-2">
        <Text className="base-regular text-gray-100">
          Don&apos;t have an account?
        </Text>
        <Link href={"/SignUp"} className="base-bold text-primary">
          Sign Up
        </Link>
      </View>
    </View>
  );
};

export default SignIn;
