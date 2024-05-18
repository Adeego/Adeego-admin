import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import staffStore from "../Store/UserStore";
import "../CSS/Login.css"; // import the CSS file
import app from "../../firebaseConfig";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { CircleCheck } from "lucide-react";

function Login() {
  const setStaff = staffStore((state) => state.setStaff);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [passcode, setPasscode] = useState("");
  const navigate = useNavigate();

  const verifyStaff = async () => {
    try {
      // Check if user exists in the database
      const db = getFirestore(app);
      const number = phoneNumber;
      const userRef = collection(db, "Staff");
      const userQuery = query(userRef, where("Phone", "==", number));
      const querySnapshot = await getDocs(userQuery);
      // Check if any documents match the query
      if (querySnapshot.empty) {
        alert(`${phoneNumber} does not exist! Sign up`);
      } else {
        const pass = querySnapshot.docs[0].data().Passcode;
        if (pass != passcode) {
          alert("Invalid passcode");
        } else {
          const userData = querySnapshot.docs[0].data();
          const userId = querySnapshot.docs[0].id;
          const user = {
            UserId: userId,
            FirstName: userData.FirstName,
            LastName: userData.LastName,
            Phone: userData.Phone,
            Role: userData.Role,
          };
          setStaff(user);

          toast(
            <div className="p-3 bg-white border border-neutral-300 rounded-[0.4rem] flex items-center gap-2 w-full">
              <CircleCheck
                size={16}
                className="stroke-neutral-600 md:text-sm text-neutral-800"
              />
              Login successful.
            </div>
          );
          navigate("/");
        }
      }
    } catch (err) {
      alert(`An error occurred ${err}`);
    }
  };

  const handlePhone = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handlePasscode = (e) => {
    setPasscode(e.target.value);
  };

  return (
    <div className="w-full h-screen grid place-items-center">
      <Card className="w-full max-w-sm rounded-[0.3rem] border-neutral-300">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your credentials below to login to your account.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label
              className="font-medium text-xs md:text-sm select-none pointer-events-none"
              htmlFor="number"
            >
              Phone Number
            </Label>
            <Input
              id="number"
              type="number"
              value={phoneNumber}
              onChange={handlePhone}
              placeholder="Phone Number"
              className="border-neutral-200 rounded-[0.4rem] text-xs md:text-sm focus:border-neutral-600 placeholder:text-neutral-500 w-full"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label
              className="font-medium text-xs md:text-sm select-none pointer-events-none"
              htmlFor="password"
            >
              Password
            </Label>
            <Input
              className="border-neutral-200 rounded-[0.4rem] text-xs md:text-sm focus:border-neutral-600 placeholder:text-neutral-500 w-full"
              id="password"
              type="password"
              placeholder="Passcode"
              value={passcode}
              onChange={handlePasscode}
              required
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              verifyStaff();
            }}
            className="w-full bg-[#1e1e1e] hover:bg-black text-white rounded-[0.4rem]"
          >
            Sign in
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default Login;
