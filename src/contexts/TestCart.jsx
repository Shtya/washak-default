// TestCartComponent.jsx
import React, { useState } from "react";
import { CartProvider, useCartContext } from "./cartContext";

function TestCart() {
    const {
        cartItems,
        count,
        addItem,
        removeItem,
        increaseQty,
        decreaseQty,
        setSelectedOptions,
        setSpecificOption,
    } = useCartContext();

    // Local state for dynamic inputs
    const [idInput, setIdInput] = useState("");
    const [optsInput, setOptsInput] = useState("");
    const [variantInput, setVariantInput] = useState("");
    const [optionInput, setOptionInput] = useState("");

    // Parse comma-separated options into trimmed array
    const parseOpts = () =>
        optsInput
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean);

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <h2 className="text-2xl font-bold mb-4">🛒 Cart Tester</h2>

            <div className="mb-6 space-y-4">
                <div className="flex space-x-2">
                    <input
                        type="text"
                        placeholder="Product ID"
                        value={idInput}
                        onChange={(e) => setIdInput(e.target.value)}
                        className="flex-1 px-3 py-2 border rounded"
                    />
                    <input
                        type="text"
                        placeholder="Options (e.g. color_red, size_m)"
                        value={optsInput}
                        onChange={(e) => setOptsInput(e.target.value)}
                        className="flex-2 px-3 py-2 border rounded"
                    />
                </div>

                <div className="flex space-x-2">
                    <button
                        onClick={() =>
                            addItem({ id: idInput, quantity: 1, selectedOptions: parseOpts() })
                        }
                        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                    >
                        Add / Merge Item
                    </button>
                    <button
                        onClick={() => removeItem({ id: idInput })}
                        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                        Remove All of ID
                    </button>
                </div>

                <div className="flex space-x-2">
                    <button
                        onClick={() =>
                            increaseQty({ id: idInput, selectedOptions: parseOpts() })
                        }
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        + Qty
                    </button>
                    <button
                        onClick={() =>
                            decreaseQty({ id: idInput, selectedOptions: parseOpts() })
                        }
                        className="px-4 py-2 bg-blue-300 text-white rounded hover:bg-blue-400"
                    >
                        – Qty
                    </button>
                </div>

                <div className="flex space-x-2">
                    <button
                        onClick={() =>
                            setSelectedOptions({ id: idInput, selectedOptions: parseOpts() })
                        }
                        className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                    >
                        Overwrite All Options
                    </button>
                    <input
                        type="text"
                        placeholder="Variant key (e.g. color)"
                        value={variantInput}
                        onChange={(e) => setVariantInput(e.target.value)}
                        className="px-3 py-2 border rounded w-32"
                    />
                    <input
                        type="text"
                        placeholder="Option key (e.g. blue)"
                        value={optionInput}
                        onChange={(e) => setOptionInput(e.target.value)}
                        className="px-3 py-2 border rounded w-32"
                    />
                    <button
                        onClick={() => {
                            setSpecificOption({
                                id: idInput,
                                variantId: variantInput,
                                optionId: optionInput,
                            })
                        }
                        }
                        className="px-4 py-2 bg-yellow-300 text-white rounded hover:bg-yellow-400"
                    >
                        Set One Option
                    </button>
                </div>
            </div>

            <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Current Cart</h3>
                <p className="mb-4">
                    Total quantity across all items:{" "}
                    <span className="font-mono">{count}</span>
                </p>

                <ul className="space-y-3">
                    {cartItems.map((item, idx) => (
                        <li
                            key={idx}
                            className="bg-white p-4 rounded shadow flex justify-between items-center"
                        >
                            <div>
                                <p>
                                    <span className="font-semibold">ID:</span> {item.id}
                                </p>
                                <p>
                                    <span className="font-semibold">Qty:</span> {item.quantity}
                                </p>
                                <p>
                                    <span className="font-semibold">Opts:</span>{" "}
                                    {item.selectedOptions.join(", ") || "—"}
                                </p>
                            </div>
                            <div className="flex space-x-2">
                                <button
                                    onClick={() =>
                                        increaseQty({ id: item.id, selectedOptions: item.selectedOptions })
                                    }
                                    className="px-3 py-1 bg-blue-500 text-white rounded"
                                >
                                    +
                                </button>
                                <button
                                    onClick={() =>
                                        decreaseQty({ id: item.id, selectedOptions: item.selectedOptions })
                                    }
                                    className="px-3 py-1 bg-blue-300 text-white rounded"
                                >
                                    –
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            <div>
                <h3 className="text-lg font-semibold mb-2">Raw cartItems JSON</h3>
                <pre className="bg-gray-800 text-gray-50 p-4 rounded overflow-auto">
                    {JSON.stringify(cartItems, null, 2)}
                </pre>
            </div>
        </div>
    );
}

export default function TestApp() {
    return (
        <CartProvider>
            <TestCart />
        </CartProvider>
    );
}
