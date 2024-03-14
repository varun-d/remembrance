import { jsx as _jsx } from "react/jsx-runtime";
// Define the functional component
const Header = (props) => {
    const { title } = props;
    return (_jsx("header", { className: "container mx-auto p-4", children: _jsx("h1", { className: "scroll-m-20 text-xl font-semibold tracking-tight", children: title }) }));
};
export default Header;
