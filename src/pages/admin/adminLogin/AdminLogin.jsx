import React, { useContext, useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";
import MyContext from "../../../context/data/MyContext";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase/FirebaseConfig";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function AdminLogin() {
  const context = useContext(MyContext);
  const { mode } = context;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Login Function
  const login = async () => {
    if (!email || !password) {
      return toast.error("Enter all fields");
    }
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      toast.success("Login Successful");
      localStorage.setItem("admin", JSON.stringify(res));
      navigate("/dashboard");
    } catch (error) {
      toast.error("There is something wrong");
      console.log(error);
    }
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex justify-center items-center h-screen">
      {/* Card  */}
      <Card
        className="w-full max-w-[24rem]"
        style={{
          background:
            mode === "dark" ? "rgb(30, 41, 59)" : "rgb(226, 232, 240)",
        }}
      >
        {/* CardHeader */}
        <CardHeader
          color="blue"
          floated={false}
          shadow={false}
          className="m-0 grid place-items-center rounded-b-none py-8 px-4 text-center"
          style={{
            background:
              mode === "dark" ? "rgb(226, 232, 240)" : "rgb(30, 41, 59)",
          }}
        >
          <div className="mb-4 rounded-full border border-white/10 bg-white/10 p-2 text-white">
            <div className=" flex justify-center">
              {/* Image  */}
              <img
                alt=""
                src="https://cdn-icons-png.flaticon.com/128/727/727399.png"
                className="h-20 w-20"
              />
            </div>
          </div>

          {/* Top Haeding  */}
          <Typography
            variant="h4"
            style={{
              color: mode === "dark" ? "rgb(30, 41, 59)" : "rgb(226, 232, 240)",
            }}
          >
            Admin Login
          </Typography>
        </CardHeader>

        {/* CardBody */}
        <CardBody>
          <form className=" flex flex-col gap-4">
            {/* First Input  */}
            <div>
              <Input
                type="email"
                label="Email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            {/* Second Input  */}
            <div>
              <Input
                type="password"
                label="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {/* Login Button  */}
            <Button
              onClick={login}
              style={{
                background:
                  mode === "dark" ? "rgb(226, 232, 240)" : "rgb(30, 41, 59)",
                color:
                  mode === "dark" ? "rgb(30, 41, 59)" : "rgb(226, 232, 240)",
              }}
            >
              Login
            </Button>
          </form>
        </CardBody>
      </Card>
    </div>
  );
}
