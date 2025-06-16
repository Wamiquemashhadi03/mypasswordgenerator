import { useState, useCallback, useEffect, useRef } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumber] = useState(false);
  const [charAllowed, setChar] = useState(false);
  const [password, setPassword] = useState("");
  const passwordRef = useRef(null);
  const [copied, setCopied] = useState(false);


  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*-_+=[]{}~`";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numberAllowed, charAllowed, setPassword]);

  const copyPasswordToClipboard = useCallback(() => {
    if (passwordRef.current) {
      // passwordRef.current.select();
      window.navigator.clipboard.writeText(password);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500); // revert back after 1.5s
    }
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);
  return (
    <div className="w-full max-w-md mx-auto rounded-xl px-6 py-6 my-10 bg-gray-800 text-white shadow-lg">
      <h1 className="text-white text-center text-xl font-semibold mb-5">
        Password generator
      </h1>

      <div className="flex items-center bg-white rounded-lg overflow-hidden shadow-inner">
        <input
          type="text"
          value={password}
          placeholder="Password"
          readOnly
          ref={passwordRef}
          className="flex-grow px-4 py-2 text-black text-lg focus:outline-none"
        />
        <button
          onClick={copyPasswordToClipboard}
          className={`px-5 py-2 text-sm font-medium rounded-none transition duration-300 
    ${copied ? "bg-green-600" : "bg-blue-600 hover:bg-blue-700"} text-white`}
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
      <div className="flex text-sm gap-x-2">
        <div className="flex items-center gap-x-1">
          <input
            type="range"
            min={6}
            max={25}
            className="cursor-pointer"
            onChange={(e) => {
              setLength(e.target.value);
            }}
          />
          <label>Length:{length}</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            defaultChecked={numberAllowed}
            id="numberInput"
            onChange={() => {
              setNumber((prev) => !prev);
            }}
          />
          <label htmlFor="numberInput">Numbers</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            defaultChecked={charAllowed}
            id="characterInput"
            onChange={() => {
              setChar((prev) => !prev);
            }}
          />
          <label htmlFor="characterInput">Characters</label>
        </div>
      </div>
    </div>
  );
}

export default App;
