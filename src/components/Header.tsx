// Simple typescript header component with a title on the left styled with tailwindcss
interface HeaderProps {
  title: string;
}

// Define the functional component
const Header = (props: HeaderProps) => {
  const { title } = props;

  return (
    <header className="container mx-auto p-4">
      <h1 className="scroll-m-20 text-xl font-semibold tracking-tight">
        {title}
      </h1>
    </header>
  );
};

export default Header;
