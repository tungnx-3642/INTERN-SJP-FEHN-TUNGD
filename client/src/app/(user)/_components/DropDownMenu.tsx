import Link from "next/link";
import Image from "next/image";

const categories = [
  {
    title: "Rượu ngoại",
    items: [
      "Rượu chivas",
      "Rượu độc - Rượu độc đáo",
      "Johhnie walker",
      "Rượu wisky",
      "Rượu Remi Martin",
      "Rượu glenmoraince",
    ],
  },
  {
    title: "Rượu vang",
    items: [
      "Rượu chivas",
      "Rượu độc - Rượu độc đáo",
      "Johhnie walker",
      "Rượu wisky",
      "Rượu Remi Martin",
      "Rượu glenmoraince",
    ],
  },
  {
    title: "Rượu ngoại",
    items: [
      "Rượu chivas",
      "Rượu độc - Rượu độc đáo",
      "Johhnie walker",
      "Rượu wisky",
      "Rượu Remi Martin",
      "Rượu glenmoraince",
    ],
  },
];

function DropDownMenu() {
  return (
    <div className="hidden absolute bottom-0 group-hover:grid w-5xl grid-cols-4 p-8 translate-y-full normal-case bg-background text-foreground border-2 border-amber-400 rounded drop-shadow-2xl popover-arrow">
      {categories.map(({ title, items }, i) => (
        <div key={i}>
          <h3 className="text-2xl font-semibold mb-2">{title}</h3>
          <ul>
            {items.map((item, j) => (
              <li key={j}>
                <Link href="#">{item}</Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
      <Image
        alt="dropdown-placeholder"
        src="/dropdown.jpg"
        width={500}
        height={300}
      />
    </div>
  );
}

export default DropDownMenu;
