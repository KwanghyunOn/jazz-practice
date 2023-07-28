import { useState } from "react";

export function MessageButton() {
  return (
    <button class="px-4 py-1 rounded-full text-sm text-white font-semibold bg-violet-500 hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-300">
      Message
    </button>
  );
}

function SignupElement({
  label,
  inputType,
  value,
  placeholder,
  onChange,
  warning,
}) {
  return (
    <label class="block py-2">
      <span class="block text-sm font-medium text-slate-700">{label}</span>
      <input
        type={inputType}
        value={value}
        placeholder={placeholder}
        class="peer mt-1 block w-full px-3 py-2 bg-white text-sm text-slate-700 border border-slate-300 shadow-sm rounded-md
            focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
            disabled:bg-slate-50 disabled:text-slate-400 disabled:border-slate-200 disabled:shadow-none
            invalid:border-pink-500 invalid:text-pink-600
            focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
        onChange={onChange}
      />
      {warning && (
        <p class="hidden peer-invalid:block mt-1 text-pink-600 text-sm">
          {warning}
        </p>
      )}
    </label>
  );
}

export function SignupForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <form class="w-80">
      <SignupElement
        label="Username"
        inputType="text"
        placeholder={"Username"}
        value={username}
        onChange={(e) => {
          setUsername(e.target.value);
        }}
      />
      <SignupElement
        label="Email"
        inputType="email"
        placeholder={"you@example.com"}
        warning={"Please provide a valid email address."}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <SignupElement
        label="Password"
        inputType="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <div class="flex justify-end">
        <button
          class="block mt-2 px-4 py-2 text-sm text-white font-semibold bg-sky-500 rounded-md shadow-sm
          hover:bg-sky-700
          disabled:bg-slate-200 disabled:text-slate-400"
        >
          Sign up
        </button>
      </div>
    </form>
  );
}

export function LinkCard() {
  return (
    <a
      href="#"
      class="group block p-6 rounded-lg bg-white border border-slate-300
      hover:bg-pink-500 hover:border-pink-500"
    >
      <h3 class="py-2 text-slate-900 group-hover:text-white text-md font-semibold">
        New project
      </h3>
      <p class="py-2 text-slate-500 group-hover:text-white text-sm">
        Create a new project from a variety of starting templates.
      </p>
    </a>
  );
}

export function AddressBook() {
  const friendList = [
    {
      name: "Elon Musk",
      title: "CEO of Tesla",
      imageUrl:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Elon_Musk_Colorado_2022_%28cropped2%29.jpg/440px-Elon_Musk_Colorado_2022_%28cropped2%29.jpg",
    },
    {
      name: "Vinícius Júnior",
      title: "Footballer, Real Madrid",
      imageUrl:
        "https://cdn.vox-cdn.com/thumbor/_CQMH9U9y_F3YThpnGztYAljTk0=/0x0:4282x2854/1200x800/filters:focal(1793x296:2477x980)/cdn.vox-cdn.com/uploads/chorus_image/image/71992605/1247273146.0.jpg",
    },
    {
      name: "Conor McGregor",
      title: "UFC Champion",
      imageUrl:
        "https://i.insider.com/63dc9ea2e33c4000193acb36?width=1136&format=jpeg",
    },
  ];

  return (
    <ul role="list" class="w-96 p-4 border border-slate-300 rounded-lg">
      {friendList.map((person) => (
        <li class="group/item flex flex-row items-center p-4 bg-white hover:bg-slate-100 rounded-lg">
          <img
            src={person.imageUrl}
            alt={person.name}
            class="h-16 w-16 rounded-full object-cover"
          />
          <div class="ml-4">
            <p class="pb-1 text-md font-semibold">{person.name}</p>
            <p class="text-sm font-medium text-slate-500">{person.title}</p>
          </div>
          <a
            href="#"
            class="group/call invisible group-hover/item:visible ml-auto px-4 py-1 rounded-full hover:bg-slate-200"
          >
            <span class="text-sm font-semibold text-slate-500 group-hover/call:text-slate-700">
              Call...
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}

export function Details() {
  return (
    <div class="w-full max-w-lg mx-auto p-8">
      <details
        class="open:bg-white open:ring-1 open:ring-black/5 open:shadow-lg p-6 rounded-lg"
        open
      >
        <summary class="text-sm leading-6 text-slate-900 font-semibold select-none">
          Why do they call it Ovaltine?
        </summary>
        <div class="mt-3 text-sm leading-6 text-slate-600">
          <p>
            The mug is round. The jar is round. They should call it Roundtine.
          </p>
        </div>
      </details>
    </div>
  );
}
