"use client";
import { ChangeEvent, useState, FormEvent } from "react";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { signUp } from "next-auth-sanity/client";
import { signIn, useSession } from "next-auth/react";
import toast from "react-hot-toast";

const defaultFormData = {
  email: "",
  name: "",
  password: "",
};

const Auth = () => {
  const [formData, setFormData] = useState(defaultFormData);

  const inputStyles =
    "border border-gray-300 sm:text-sm text-black rounded:lg block w-full p-2.5 focus:outline-none";

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value }); //newone
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const user = await signUp(formData);
      if (user) {
        toast.success("Success. Please sign in");
      }
      console.log(formData);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setFormData(formData);
    }
  };

  return (
    <section className="container mx-auto ">
      <div className="p-6 space-y-4 md:space-y-6 sm:p-8 w-80 md:w-[70%] mx-auto">
        <div className="flex mb-8 flex-col md:flex-row items-center justify-between">
          <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl">
            Create an account
          </h1>
          <p>OR</p>
          <span className="inline-flex items-center ">
            <AiFillGithub className="mr-3 text-4xl cursor-pointer text-black dark:text-yellow-300" />
            {" | "}
            <FcGoogle className="ml-3 text-4xl cursor-pointer" />
          </span>
        </div>

        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="name@company.com"
            required
            className={inputStyles}
            value={formData.email}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="name"
            id="name"
            placeholder="John Doe"
            required
            className={inputStyles}
            value={formData.name}
            onChange={handleInputChange}
          />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="password"
            required
            minLength={6}
            className={inputStyles}
            value={formData.password}
            onChange={handleInputChange}
          />

          <button
            type="submit"
            className="w-full bg-tertiary-dark focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Sign Up
          </button>

          <button className="text-bl700 underline">Login</button>
        </form>
      </div>
    </section>
  );
};

export default Auth;
