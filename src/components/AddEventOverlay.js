import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { IconSquareRoundedX } from "@tabler/icons-react";
export default function AddEventOverlay({ requestClose, children, }) {
    return (_jsx("div", { className: "fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-75 z-50", children: _jsxs("div", { className: "bg-white p-8 rounded", children: [_jsx("div", { className: "relative", children: _jsx(IconSquareRoundedX, { className: "absolute -top-6 -right-5 m-1 text-red-800 hover:text-red-700 cursor-pointer", size: 24, onClick: requestClose }) }), children] }) }));
}
