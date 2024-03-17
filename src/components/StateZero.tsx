import mainimg from "../assets/main_img.png";
export default function StateZero() {
  return (
    <div className="flex">
      <img src={mainimg} alt="Main" height="100%" className="w-1/2" />
      <p className="leading-7 [&:not(:first-child)]:mt-6">
        Add a new birthday, anniversary or an important event. It will be
        highlighted when date is within 7 days.
      </p>
    </div>
  );
}
